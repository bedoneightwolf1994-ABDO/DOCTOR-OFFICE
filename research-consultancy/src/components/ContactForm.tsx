'use client'
import { useState, useRef } from 'react'
import { submitContactRequest } from '@/lib/actions/public'
import toast from 'react-hot-toast'

export default function ContactForm() {
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
        <p className="font-serif text-xl font-bold text-navy-950">Thank you for reaching out!</p>
        <p className="text-gray-600 mt-2">Your request has been received. You'll be contacted shortly.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className="card p-8 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Name *</label>
          <input name="name" required className="input" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input name="email" type="email" required className="input" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">WhatsApp Number</label>
          <input name="whatsapp" className="input" />
        </div>
        <div>
          <label className="label">Research Field</label>
          <input name="research_field" className="input" />
        </div>
      </div>
      <div>
        <label className="label">Service Required</label>
        <input name="service_required" className="input" placeholder="e.g. Systematic Review" />
      </div>
      <div>
        <label className="label">Project Description</label>
        <textarea name="project_description" rows={4} className="input" />
      </div>
      <div>
        <label className="label">Preferred Contact Method</label>
        <select name="preferred_contact_method" className="input">
          <option>Email</option>
          <option>WhatsApp</option>
          <option>Phone Call</option>
        </select>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  )
}
