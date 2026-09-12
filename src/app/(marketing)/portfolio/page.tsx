import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SectionHeading, SampleBadge, EmptyState } from '@/components/ui'
import type { PortfolioProject } from '@/lib/types'
import ImageWithSkeleton from '@/components/ImageWithSkeleton'
import ShareButton from '@/components/ShareButton'

export const revalidate = 0

export default async function PortfolioPage() {
  const supabase = createClient()
  const { data: items } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('is_published', true)
    .eq('visibility', 'public')
    .order('sort_order')

  return (
    <div className="container-page section">
      <SectionHeading eyebrow="Portfolio" title="Previous Work" description="A selection of completed research projects. Confidential projects are kept private and never shown here." />
      {items && items.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {(items as PortfolioProject[]).map(p => (
            <div key={p.id} className="card overflow-hidden group">
              <Link href={`/portfolio/${p.slug}`}>
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {p.featured_image_url ? (
                    <ImageWithSkeleton src={p.featured_image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>}
                </div>
              </Link>
              <div className="p-5">
                <div className="flex gap-2 flex-wrap">
                  {p.is_featured && <span className="text-xs bg-gold-500/20 text-gold-500 px-2 py-0.5 rounded font-semibold">FEATURED</span>}
                  {p.title.startsWith('[SAMPLE]') && <SampleBadge />}
                </div>
                <Link href={`/portfolio/${p.slug}`}>
                  <h3 className="font-serif font-bold text-navy-950 mt-2 hover:text-teal-600 transition-colors">{p.title}</h3>
                </Link>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500">{p.category} · {p.year}</p>
                  <ShareButton title={p.title} path={`/portfolio/${p.slug}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState text="No public portfolio items yet. Add one from Admin > Portfolio." />}
    </div>
  )
}
