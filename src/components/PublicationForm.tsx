'use client'
import { useState } from 'react'
import type { Publication } from '@/lib/types'
import FileUploadField from './FileUploadField'
import toast from 'react-hot-toast'

export default function PublicationForm({ item, action }: {
  item?: Publication
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
        <label className="label">Title *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div>
        <label className="label">Authors *</label>
        <input name="authors" required defaultValue={item?.authors} className="input" placeholder="A. Author, B. Author" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Journal</label>
          <input name="journal" defaultValue={item?.journal || ''} className="input" />
        </div>
        <div>
          <label className="label">Year</label>
          <input name="year" type="number" defaultValue={item?.year || ''} className="input" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">DOI</label>
          <input name="doi" defaultValue={item?.doi || ''} className="input" />
        </div>
        <div>
          <label className="label">URL</label>
          <input name="url" defaultValue={item?.url || ''} className="input" />
        </div>
      </div>
      <div>
        <label className="label">Research Field</label>
        <input name="research_field" defaultValue={item?.research_field || ''} className="input" />
      </div>
      <div>
        <label className="label">Abstract / Summary</label>
        <textarea name="summary" rows={4} defaultValue={item?.summary || ''} className="input" />
      </div>
      <FileUploadField name="image_url" label="Publication Image" accept="image/*" defaultValue={item?.image_url || ''} />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" defaultChecked={item?.is_featured} /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> Published</label>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Publication'}</button>
    </form>
  )
}
