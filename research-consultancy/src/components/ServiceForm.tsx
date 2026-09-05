'use client'
import { useState } from 'react'
import type { Service } from '@/lib/types'
import toast from 'react-hot-toast'

const ICONS = ['FlaskConical', 'FileText', 'Search', 'BarChart3', 'PenTool', 'BookOpen', 'Edit3', 'CheckCircle2', 'Microscope', 'GraduationCap']

export default function ServiceForm({ item, action }: {
  item?: Service
  action: (formData: FormData) => Promise<{ error?: string } | undefined>
}) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    const res = await action(formData)
    setSubmitting(false)
    if (res?.error) toast.error(res.error)
  }

  return (
    <form action={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="label">Service Title *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div>
        <label className="label">Short Description</label>
        <input name="short_description" defaultValue={item?.short_description || ''} className="input" placeholder="One-line summary shown on cards" />
      </div>
      <div>
        <label className="label">Full Description</label>
        <textarea name="full_description" rows={4} defaultValue={item?.full_description || ''} className="input" />
      </div>
      <div>
        <label className="label">Features (comma-separated)</label>
        <input name="features" defaultValue={item?.features?.join(', ') || ''} className="input" placeholder="PRISMA-compliant, Fast turnaround" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Price Label</label>
          <input name="price_label" defaultValue={item?.price_label || ''} className="input" placeholder="Starting at $150" />
        </div>
        <div>
          <label className="label">Icon</label>
          <select name="icon" defaultValue={item?.icon || 'FlaskConical'} className="input">
            {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" defaultChecked={item?.is_featured} /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> Published</label>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Service'}</button>
    </form>
  )
}
