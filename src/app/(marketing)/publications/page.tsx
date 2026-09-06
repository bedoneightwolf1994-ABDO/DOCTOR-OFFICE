import { createClient } from '@/lib/supabase/server'
import { SectionHeading, SampleBadge, EmptyState } from '@/components/ui'
import type { Publication } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

export const revalidate = 0

export default async function PublicationsPage() {
  const supabase = createClient()
  const { data: pubs } = await supabase.from('publications').select('*').eq('is_published', true).order('sort_order').order('year', { ascending: false })

  return (
    <div className="container-page section">
      <SectionHeading eyebrow="Publications" title="Scientific Publications" />
      {pubs && pubs.length > 0 ? (
        <div className="space-y-6 max-w-4xl">
          {(pubs as Publication[]).map(p => (
            <div key={p.id} className="card p-6 flex gap-6">
              {p.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt={p.title} className="w-28 h-28 object-cover rounded shrink-0 hidden sm:block" />
              )}
              <div>
                <div className="flex gap-2 flex-wrap">
                  {p.is_featured && <span className="text-xs bg-gold-500/20 text-gold-500 px-2 py-0.5 rounded font-semibold">FEATURED</span>}
                  {p.title.startsWith('[SAMPLE]') && <SampleBadge />}
                </div>
                <h3 className="font-serif text-lg font-bold text-navy-950 mt-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.authors}</p>
                <p className="text-sm text-gray-500 italic">{p.journal} {p.year && `(${p.year})`}</p>
                {p.summary && <p className="text-gray-600 text-sm mt-2">{p.summary}</p>}
                <div className="flex gap-4 mt-3 text-sm">
                  {p.doi && <span className="text-gray-400">DOI: {p.doi}</span>}
                  {p.url && <a href={p.url} target="_blank" className="text-teal-600 inline-flex items-center gap-1">View <ExternalLink size={14} /></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState text="No publications published yet. Add them from Admin > Publications." />}
    </div>
  )
}
