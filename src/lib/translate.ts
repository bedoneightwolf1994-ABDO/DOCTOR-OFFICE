import { createHash } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { localize, type Lang } from '@/lib/lang'

// Automatic English -> Arabic translation of dashboard content.
// Every translated string is cached in the `translation_cache` table, so each
// text is translated only once (and re-translated automatically if you edit it).
// If translation fails for any reason, the original text is shown instead.

const AR_RE = /[؀-ۿ]/
const hash = (s: string) => createHash('sha1').update(s).digest('hex')

// Which fields of each content type are translated.
export const FIELDS = {
  settings: ['homepage_headline', 'homepage_description', 'cta_text', 'footer_text'],
  profile: ['professional_title', 'biography', 'qualifications', 'specializations', 'research_interests', 'achievements'],
  service: ['title', 'short_description', 'full_description', 'features', 'price_label'],
  portfolio: ['title', 'category', 'research_field', 'description', 'services_provided', 'tags'],
  publication: ['title', 'research_field', 'summary'],
  review: ['review_text', 'profession', 'research_field'],
} as const
export type Kind = keyof typeof FIELDS

// Split long text into <= max-char pieces on paragraph/sentence boundaries.
function chunk(text: string, max = 1500): string[] {
  if (text.length <= max) return [text]
  const parts = text.split(/(?<=[\n.!?؟])\s*/)
  const out: string[] = []
  let cur = ''
  for (const p of parts) {
    if ((cur + ' ' + p).length > max && cur) { out.push(cur); cur = p } else cur = cur ? cur + ' ' + p : p
  }
  if (cur) out.push(cur)
  return out.flatMap(c => (c.length > max ? c.match(new RegExp(`.{1,${max}}`, 'gs')) || [c] : [c]))
}

async function googleTranslate(text: string): Promise<string | null> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'q=' + encodeURIComponent(text),
      signal: ctrl.signal,
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    const segs: any[] = data?.[0]
    if (!Array.isArray(segs)) return null
    const out = segs.map(s => (s && s[0]) || '').join('')
    return out.trim() ? out : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function translateOne(text: string): Promise<string | null> {
  const pieces = chunk(text)
  const res = await Promise.all(pieces.map(googleTranslate))
  if (res.some(r => r === null)) return null
  return res.join(' ')
}

async function translateMany(texts: string[]): Promise<Map<string, string>> {
  const result = new Map<string, string>()
  const unique = Array.from(new Set(texts))
  if (!unique.length) return result

  let admin: ReturnType<typeof createAdminClient> | null = null
  try { admin = createAdminClient() } catch { admin = null }

  // 1) read cache
  const byHash = new Map(unique.map(t => [hash(t), t]))
  if (admin) {
    try {
      const { data } = await admin.from('translation_cache').select('hash, translated').eq('lang', 'ar').in('hash', Array.from(byHash.keys()))
      for (const row of data || []) {
        const src = byHash.get(row.hash)
        if (src) result.set(src, row.translated)
      }
    } catch { /* cache unavailable — translate directly */ }
  }

  // 2) translate misses
  const misses = unique.filter(t => !result.has(t))
  const fresh: { hash: string; lang: string; source: string; translated: string }[] = []
  await Promise.all(misses.map(async t => {
    const tr = await translateOne(t)
    if (tr) { result.set(t, tr); fresh.push({ hash: hash(t), lang: 'ar', source: t, translated: tr }) }
  }))

  // 3) save to cache
  if (admin && fresh.length) {
    try { await admin.from('translation_cache').upsert(fresh, { onConflict: 'hash,lang' }) } catch { /* ignore */ }
  }
  return result
}

function needsTranslation(s: unknown): s is string {
  return typeof s === 'string' && s.trim().length > 0 && !AR_RE.test(s)
}

// Keep a leading "[SAMPLE]" marker intact (the site checks for it).
function splitSample(s: string): [string, string] {
  return s.startsWith('[SAMPLE]') ? ['[SAMPLE] ', s.slice(8).trim()] : ['', s]
}

export async function localizeAuto<T>(items: T[] | null | undefined, kind: Kind, lang: Lang): Promise<T[]> {
  const list = items || []
  if (lang !== 'ar' || !list.length) return list
  // 1) manual Arabic from the dashboard (*_ar fields) wins
  const base: any[] = list.map(i => localize(i, lang))
  // 2) auto-translate everything that is still English
  const keys = FIELDS[kind]
  const texts: string[] = []
  for (const it of base) for (const k of keys) {
    const v = it?.[k]
    if (Array.isArray(v)) v.forEach(x => needsTranslation(x) && texts.push(splitSample(x)[1]))
    else if (needsTranslation(v)) texts.push(splitSample(v)[1])
  }
  if (!texts.length) return base
  const map = await translateMany(texts)
  const tr = (s: string) => { const [p, rest] = splitSample(s); return p + (map.get(rest) ?? rest) }
  return base.map(it => {
    const o = { ...it }
    for (const k of keys) {
      const v = o[k]
      if (Array.isArray(v)) o[k] = v.map(x => (needsTranslation(x) ? tr(x) : x))
      else if (needsTranslation(v)) o[k] = tr(v)
    }
    return o
  }) as T[]
}

export async function localizeAutoOne<T>(item: T | null | undefined, kind: Kind, lang: Lang): Promise<T | null> {
  if (!item) return null
  return (await localizeAuto([item], kind, lang))[0]
}
