import { createClient } from '@/lib/supabase/server'
import type { Review } from '@/lib/types'
import ReviewCard from './ReviewCard'

export const revalidate = 0

export default async function AdminReviewsPage() {
  const supabase = createClient()
  const { data: reviews } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })

  const pending = (reviews as Review[] | null)?.filter(r => r.status === 'pending') || []
  const others = (reviews as Review[] | null)?.filter(r => r.status !== 'pending') || []

  const approved = others.filter(r => r.status === 'approved')
  const avg = approved.length ? (approved.reduce((a, r) => a + r.rating, 0) / approved.length).toFixed(1) : '—'
  const fiveStarPct = approved.length ? Math.round((approved.filter(r => r.rating === 5).length / approved.length) * 100) : 0

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-1">Reviews</h1>
      <p className="text-gray-500 text-sm mb-6">Approve, reject, edit, hide, or delete client reviews.</p>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg">
        <div className="card p-4 text-center"><p className="text-2xl font-bold text-navy-950">{avg}</p><p className="text-xs text-gray-500">Avg Rating</p></div>
        <div className="card p-4 text-center"><p className="text-2xl font-bold text-navy-950">{approved.length}</p><p className="text-xs text-gray-500">Approved</p></div>
        <div className="card p-4 text-center"><p className="text-2xl font-bold text-navy-950">{fiveStarPct}%</p><p className="text-xs text-gray-500">5-Star</p></div>
      </div>

      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="font-semibold text-navy-950 mb-3">Pending Approval ({pending.length})</h2>
          <div className="space-y-3">{pending.map(r => <ReviewCard key={r.id} review={r} />)}</div>
        </div>
      )}

      <h2 className="font-semibold text-navy-950 mb-3">All Reviews</h2>
      <div className="space-y-3">
        {others.map(r => <ReviewCard key={r.id} review={r} />)}
        {others.length === 0 && pending.length === 0 && <p className="text-gray-400">No reviews submitted yet.</p>}
      </div>
    </div>
  )
}
