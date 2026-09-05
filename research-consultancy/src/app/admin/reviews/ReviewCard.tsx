'use client'
import { useState } from 'react'
import type { Review } from '@/lib/types'
import { StarRating, SampleBadge } from '@/components/ui'
import { setReviewStatus, deleteReview, updateReview } from '@/lib/actions/reviews'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'
import { Check, X, EyeOff, Pencil } from 'lucide-react'

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
  hidden: 'bg-gray-100 text-gray-600',
}

export default function ReviewCard({ review }: { review: Review }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <form action={async (fd) => { await updateReview(review.id, fd); setEditing(false) }} className="card p-5 space-y-3">
        <input name="reviewer_name" defaultValue={review.reviewer_name} className="input" />
        <div className="grid grid-cols-2 gap-3">
          <input name="profession" defaultValue={review.profession || ''} className="input" placeholder="Profession" />
          <input name="research_field" defaultValue={review.research_field || ''} className="input" placeholder="Research Field" />
        </div>
        <textarea name="review_text" defaultValue={review.review_text} className="input" rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <select name="rating" defaultValue={review.rating} className="input">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} stars</option>)}
          </select>
          <select name="display_preference" defaultValue={review.display_preference} className="input">
            <option value="full_name">Full Name</option>
            <option value="first_name">First Name</option>
            <option value="initials">Initials</option>
            <option value="anonymous">Anonymous</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn-primary text-sm py-2">Save</button>
          <button type="button" onClick={() => setEditing(false)} className="btn-secondary text-sm py-2">Cancel</button>
        </div>
      </form>
    )
  }

  return (
    <div className="card p-5 flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <StarRating rating={review.rating} size={14} />
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColor[review.status]}`}>{review.status}</span>
          {review.reviewer_name.startsWith('[SAMPLE]') && <SampleBadge />}
        </div>
        <p className="text-sm text-gray-700 mt-2">"{review.review_text}"</p>
        <p className="text-sm font-medium text-navy-900 mt-2">{review.reviewer_name} <span className="text-gray-400 font-normal">· {review.profession} · displays as "{review.display_preference.replace('_', ' ')}"</span></p>
      </div>
      <div className="flex gap-2 shrink-0">
        {review.status !== 'approved' && (
          <button onClick={() => setReviewStatus(review.id, 'approved')} className="p-2 rounded bg-green-50 text-green-700 hover:bg-green-100" title="Approve"><Check size={16} /></button>
        )}
        {review.status !== 'rejected' && (
          <button onClick={() => setReviewStatus(review.id, 'rejected')} className="p-2 rounded bg-red-50 text-red-700 hover:bg-red-100" title="Reject"><X size={16} /></button>
        )}
        {review.status === 'approved' && (
          <button onClick={() => setReviewStatus(review.id, 'hidden')} className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200" title="Hide"><EyeOff size={16} /></button>
        )}
        <button onClick={() => setEditing(true)} className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200" title="Edit"><Pencil size={16} /></button>
        <ConfirmDeleteButton onConfirm={() => deleteReview(review.id)} />
      </div>
    </div>
  )
}
