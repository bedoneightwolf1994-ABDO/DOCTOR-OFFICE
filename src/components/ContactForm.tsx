'use client'
import { useState, useRef } from 'react'
import { submitContactRequest } from '@/lib/actions/public'
import toast from 'react-hot-toast'
import { getDict } from '@/lib/i18n'
import type { Lang } from '@/lib/lang'

export default function ContactForm({ lang = 'en' }: { lang?: Lang }) {
  const t = getDict(lang)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    const res = await submitContactRequest(formData)
    setSubmitting(false)
    if (res?.error) {
      toast.error(res.error)
    } else {
      setDone(true)
      formRef.current?.reset()
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center">
        <p className="font-serif text-xl font-bold text-navy-950">{t.thanks_title}</p>
        <p className="text-gray-600 mt-2">{t.thanks_desc}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className="card p-8 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">{t.f_name} *</label>
          <input name="name" required className="input" />
        </div>
        <div>
          <label className="label">{t.f_email} *</label>
          <input name="email" type="email" required className="input" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">{t.f_whatsapp}</label>
          <input name="whatsapp" className="input" />
        </div>
        <div>
          <label className="label">{t.f_field}</label>
          <input name="research_field" className="input" />
        </div>
      </div>
      <div>
        <label className="label">{t.f_service}</label>
        <input name="service_required" className="input" placeholder={t.f_service_ph} />
      </div>
      <div>
        <label className="label">{t.f_desc}</label>
        <textarea name="project_description" rows={4} className="input" />
      </div>
      <div>
        <label className="label">{t.f_method}</label>
        <select name="preferred_contact_method" className="input">
          <option value="Email">{t.m_email}</option>
          <option value="WhatsApp">{t.m_whatsapp}</option>
          <option value="Phone Call">{t.m_phone}</option>
        </select>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? t.sending : t.send}
      </button>
    </form>
  )
}
