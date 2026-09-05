'use client'
import { useState, useRef } from 'react'
import { submitReview } from '@/lib/actions/public'
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'

export default function ReviewForm() {
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    formData.set('rating', String(rating))
    const res = await submitReview(formData)
    setSubmitting(false)
    if (res?.error) {
      toast.error(res.error)
    } else {
      setDone(true)
      formRef.current?.reset()
      toast.success('Thank you! Your review will appear after approval.')
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <p className="font-serif text-xl font-bold text-navy-950">Thank you for your review!</p>
        <p className="text-gray-600 mt-2">It's now pending approval and will appear on the site once approved by Dr. Abdelrahman.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className="card p-8 space-y-4">
      <h3 className="font-serif text-xl font-bold text-navy-950">Submit a Review</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Name *</label>
          <input name="reviewer_name" required className="input" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label">Profession</label>
          <input name="profession" className="input" placeholder="PhD Candidate" />
        </div>
      </div>
      <div>
        <label className="label">Research Field</label>
        <input name="research_field" className="input" placeholder="Public Health" />
      </div>
      <div>
        <label className="label">Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button type="button" key={i} onClick={() => setRating(i)}>
              <Star size={26} className={i <= rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Your Review *</label>
        <textarea name="review_text" required rows={4} className="input" placeholder="Share your experience..." />
      </div>
      <div>
        <label className="label">How should your name be displayed?</label>
        <select name="display_preference" className="input">
          <option value="full_name">Full Name</option>
          <option value="first_name" selected>First Name Only</option>
          <option value="initials">Initials Only</option>
          <option value="anonymous">Anonymous</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="permission_to_publish" defaultChecked />
        I give permission to publish this review on the website.
      </label>
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
