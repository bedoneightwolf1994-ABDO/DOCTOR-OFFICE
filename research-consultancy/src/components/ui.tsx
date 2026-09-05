import { Star } from 'lucide-react'

export function SampleBadge() {
  return <span className="badge-sample">SAMPLE DATA</span>
}

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl mb-12">
      {eyebrow && <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider mb-2">{eyebrow}</p>}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-950">{title}</h2>
      {description && <p className="mt-4 text-gray-600 text-lg">{description}</p>}
    </div>
  )
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-16 text-gray-500 border border-dashed border-gray-300 rounded-lg">
      {text}
    </div>
  )
}
