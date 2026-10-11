import { cookies } from 'next/headers'

export type Lang = 'en' | 'ar'

export function getLang(): Lang {
  try {
    return cookies().get('lang')?.value === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

// Returns a copy of `obj` where every field that has a non-empty "<field>_ar"
// sibling is replaced by its Arabic value (only when lang === 'ar').
// Falls back to the English value automatically when no Arabic was entered.
export function localize<T>(obj: T, lang: Lang): T {
  if (!obj || lang !== 'ar') return obj
  const out: any = { ...(obj as any) }
  for (const key of Object.keys(out)) {
    if (key.endsWith('_ar')) continue
    const ar = out[`${key}_ar`]
    if (Array.isArray(ar) ? ar.length > 0 : typeof ar === 'string' && ar.trim() !== '') {
      out[key] = ar
    }
  }
  return out
}

export function localizeAll<T>(list: T[] | null | undefined, lang: Lang): T[] {
  return (list || []).map(i => localize(i, lang))
}
