import { createClient } from '@/lib/supabase/server'
import { SectionHeading, StarRating, SampleBadge, EmptyState } from '@/components/ui'
import { displayReviewerName } from '@/lib/types'
import type { Review } from '@/lib/types'
import ReviewForm from '@/components/ReviewForm'

export const revalidate = 0

export default async function ReviewsPage() {
  const supabase = createClient()
  const { data: reviews } = await supabase.from('reviews').select('*').eq('status', 'approved').order('created_at', { ascending: false })

  const ratings = (reviews || []).map(r => r.rating)
  const avg = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0
  const fiveStarPct = ratings.length ? Math.round((ratings.filter(r => r === 5).length / ratings.length) * 100) : 0

  return (
    <div className="container-page section">
      <SectionHeading eyebrow="Testimonials" title="Client Reviews" description="Statistics below are calculated automatically — never hard-coded." />

      <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
        <div className="card p-5 text-center">
          <p className="text-3xl font-bold text-navy-950">{avg.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">Average Rating</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-3xl font-bold text-navy-950">{ratings.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Reviews</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-3xl font-bold text-navy-950">{fiveStarPct}%</p>
          <p className="text-xs text-gray-500 mt-1">5-Star Reviews</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {reviews && reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {(reviews as Review[]).map(r => (
                <div key={r.id} className="card p-6">
                  <StarRating rating={r.rating} />
                  {r.reviewer_name.startsWith('[SAMPLE]') && <div className="mt-2"><SampleBadge /></div>}
                  <p className="text-gray-700 mt-3 text-sm leading-relaxed">"{r.review_text}"</p>
                  <p className="font-medium text-navy-900 mt-4 text-sm">{displayReviewerName(r)}</p>
                  <p className="text-gray-500 text-xs">{r.profession} {r.research_field && `· ${r.research_field}`}</p>
                </div>
              ))}
            </div>
          ) : <EmptyState text="No approved reviews yet." />}
        </div>
        <div>
          <ReviewForm />
        </div>
      </div>
    </div>
  )
}
