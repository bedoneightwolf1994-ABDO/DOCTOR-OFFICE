import { Star } from 'lucide-react'
import { displayReviewerName } from '@/lib/types'
import type { Review } from '@/lib/types'

// A continuously auto-scrolling ticker of approved reviews, shown as a thin
// banner at the very top of the homepage (above the hero). Pure CSS
// animation (no JS) so it's fast and works even with JS disabled.
export default function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null

  // Duplicate the list so the scroll loop is seamless.
  const items = [...reviews, ...reviews]

  return (
    <div className="bg-gold-500/10 border-b border-gold-500/20 overflow-hidden py-2.5 group">
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((r, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 shrink-0 text-sm text-navy-900">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={12} className={n <= r.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} />
              ))}
            </div>
            <span className="font-medium">{displayReviewerName(r)}:</span>
            <span className="text-gray-600 max-w-[280px] truncate">"{r.review_text}"</span>
          </div>
        ))}
      </div>
    </div>
  )
}
