'use client'
import { useState } from 'react'
import type { Client } from '@/lib/types'
import { updateClient } from '@/lib/actions/clients'
import toast from 'react-hot-toast'

export default function ClientEditForm({ client }: { client: Client }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    const res = await updateClient(client.id, formData)
    setSubmitting(false)
    if (res?.error) toast.error(res.error); else toast.success('Saved')
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <div><label className="label">Name</label><input name="full_name" defaultValue={client.full_name} className="input" /></div>
      <div><label className="label">Email</label><input name="email" defaultValue={client.email} className="input" /></div>
      <div><label className="label">Phone</label><input name="phone" defaultValue={client.phone || ''} className="input" /></div>
      <div><label className="label">Research Field</label><input name="research_field" defaultValue={client.research_field || ''} className="input" /></div>
      <div><label className="label">Notes</label><textarea name="notes" defaultValue={client.notes || ''} rows={3} className="input" /></div>
      {client.auth_user_id && <p className="text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded">This client has Client Portal access.</p>}
      <button type="submit" disabled={submitting} className="btn-primary w-full text-sm py-2">{submitting ? 'Saving...' : 'Save Changes'}</button>
    </form>
  )
}
