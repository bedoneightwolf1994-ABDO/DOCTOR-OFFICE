import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SampleBadge } from '@/components/ui'
import { FileText, ExternalLink } from 'lucide-react'
import ImageWithSkeleton from '@/components/ImageWithSkeleton'
import ShareButton from '@/components/ShareButton'

export const revalidate = 0

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: p } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .eq('visibility', 'public')
    .single()

  if (!p) return notFound()

  return (
    <div className="container-page section max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          {p.title.startsWith('[SAMPLE]') && <SampleBadge />}
          <h1 className="font-serif text-4xl font-bold text-navy-950 mt-3">{p.title}</h1>
          <p className="text-gray-500 mt-2">{p.category} · {p.research_field} · {p.year}</p>
        </div>
        <ShareButton title={p.title} path={`/portfolio/${p.slug}`} className="shrink-0 mt-1" />
      </div>

      {p.featured_image_url && (
        <div className="w-full rounded-lg mt-8 aspect-video overflow-hidden">
          <ImageWithSkeleton src={p.featured_image_url} alt={p.title} className="w-full h-full object-cover" />
        </div>
      )}

      <p className="text-gray-700 leading-relaxed mt-8 whitespace-pre-line">{p.description}</p>

      {p.services_provided?.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-xl font-bold text-navy-950 mb-3">Services Provided</h3>
          <div className="flex flex-wrap gap-2">
            {p.services_provided.map((s: string, i: number) => (
              <span key={i} className="bg-teal-50 text-teal-700 text-sm px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      )}

      {p.additional_images?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {p.additional_images.map((img: string, i: number) => (
            <div key={i} className="rounded-lg w-full aspect-video overflow-hidden">
              <ImageWithSkeleton src={img} alt={`${p.title} ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-8">
        {p.pdf_url && <a href={p.pdf_url} target="_blank" className="btn-secondary text-sm"><FileText size={16} /> View PDF</a>}
        {p.external_link && <a href={p.external_link} target="_blank" className="btn-secondary text-sm"><ExternalLink size={16} /> External Link</a>}
      </div>

      {p.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {p.tags.map((t: string, i: number) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">#{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
