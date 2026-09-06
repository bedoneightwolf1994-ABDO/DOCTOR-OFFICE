'use client'
import { useState } from 'react'
import type { PortfolioProject } from '@/lib/types'
import FileUploadField from './FileUploadField'
import toast from 'react-hot-toast'

export default function PortfolioForm({ item, action }: {
  item?: PortfolioProject
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
        <label className="label">Project Title *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Category</label>
          <input name="category" defaultValue={item?.category || ''} className="input" placeholder="Systematic Review" />
        </div>
        <div>
          <label className="label">Research Field</label>
          <input name="research_field" defaultValue={item?.research_field || ''} className="input" />
        </div>
      </div>
      <div>
        <label className="label">Description</label>
        <textarea name="description" rows={4} defaultValue={item?.description || ''} className="input" />
      </div>
      <div>
        <label className="label">Services Provided (comma-separated)</label>
        <input name="services_provided" defaultValue={item?.services_provided?.join(', ') || ''} className="input" placeholder="Systematic Review, Statistical Analysis" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Year</label>
          <input name="year" type="number" defaultValue={item?.year || ''} className="input" />
        </div>
        <div>
          <label className="label">Project Status</label>
          <select name="project_status" defaultValue={item?.project_status || 'Completed'} className="input">
            <option>Completed</option><option>Ongoing</option><option>Archived</option>
          </select>
        </div>
      </div>

      <FileUploadField name="featured_image_url" label="Featured Image" accept="image/*" defaultValue={item?.featured_image_url || ''} />
      <div>
        <label className="label">Additional Image URLs (comma-separated)</label>
        <input name="additional_images" defaultValue={item?.additional_images?.join(', ') || ''} className="input" />
      </div>
      <FileUploadField name="pdf_url" label="PDF Attachment" accept=".pdf" defaultValue={item?.pdf_url || ''} />
      <div>
        <label className="label">External Link</label>
        <input name="external_link" defaultValue={item?.external_link || ''} className="input" placeholder="https://..." />
      </div>
      <div>
        <label className="label">Tags (comma-separated)</label>
        <input name="tags" defaultValue={item?.tags?.join(', ') || ''} className="input" placeholder="clinical, epidemiology" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 pt-2">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" defaultChecked={item?.is_featured} /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} /> Published</label>
        <div>
          <label className="label">Visibility</label>
          <select name="visibility" defaultValue={item?.visibility || 'public'} className="input">
            <option value="public">Public</option>
            <option value="private">Private (confidential)</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Portfolio Project'}</button>
    </form>
  )
}
