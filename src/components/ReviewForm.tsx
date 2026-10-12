'use client'
import { useState, useRef } from 'react'
import { submitReview } from '@/lib/actions/public'
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'
import { getDict } from '@/lib/i18n'
import type { Lang } from '@/lib/lang'

export default function ReviewForm({ lang = 'en' }: { lang?: Lang }) {
  const t = getDict(lang)
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
      toast.success(t.rf_toast)
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <p className="font-serif text-xl font-bold text-navy-950">{t.rf_done_title}</p>
        <p className="text-gray-600 mt-2">{t.rf_done_desc}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className="card p-8 space-y-4">
      <h3 className="font-serif text-xl font-bold text-navy-950">{t.rf_title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">{t.f_name} *</label>
          <input name="reviewer_name" required className="input" placeholder={t.rf_name_ph} />
        </div>
        <div>
          <label className="label">{t.rf_prof}</label>
          <input name="profession" className="input" placeholder={t.rf_prof_ph} />
        </div>
      </div>
      <div>
        <label className="label">{t.f_email} *</label>
        <input name="reviewer_email" type="email" required className="input" placeholder="name@example.com" dir="ltr" />
        <p className="text-xs text-gray-400 mt-1">{t.rf_email_note}</p>
      </div>
      <div>
        <label className="label">{t.f_field}</label>
        <input name="research_field" className="input" placeholder={t.rf_field_ph} />
      </div>
      <div>
        <label className="label">{t.rf_rating} *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button type="button" key={i} onClick={() => setRating(i)}>
              <Star size={26} className={i <= rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">{t.rf_text} *</label>
        <textarea name="review_text" required rows={4} className="input" placeholder={t.rf_text_ph} />
      </div>
      <div>
        <label className="label">{t.rf_display}</label>
        <select name="display_preference" defaultValue="first_name" className="input">
          <option value="full_name">{t.rf_full}</option>
          <option value="first_name">{t.rf_first}</option>
          <option value="initials">{t.rf_initials}</option>
          <option value="anonymous">{t.rf_anon}</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="permission_to_publish" defaultChecked />
        {t.rf_perm}
      </label>
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? t.rf_submitting : t.rf_submit}
      </button>
    </form>
  )
}
