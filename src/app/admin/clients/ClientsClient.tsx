'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Client } from '@/lib/types'
import { createClient_, deleteClient, updateClient } from '@/lib/actions/clients'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'
import { Pencil, Search, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ClientsClient({ clients, projects }: { clients: Client[]; projects: any[] }) {
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const filtered = clients.filter(c =>
    c.full_name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase()) ||
    (c.research_field || '').toLowerCase().includes(query.toLowerCase())
  )

  async function handleCreate(formData: FormData) {
    setSubmitting(true)
    const res = await createClient_(formData)
    setSubmitting(false)
    if (res?.error) toast.error(res.error)
    else setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">Clients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your clients and (optionally) their portal login access.</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="btn-primary text-sm py-2.5">
          {showForm ? 'Cancel' : '+ Add Client'}
        </button>
      </div>

      {showForm && (
        <form action={handleCreate} className="card p-6 mb-8 space-y-4 max-w-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Client Name *</label><input name="full_name" required className="input" /></div>
            <div><label className="label">Email *</label><input name="email" type="email" required className="input" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Phone</label><input name="phone" className="input" /></div>
            <div><label className="label">Research Field</label><input name="research_field" className="input" /></div>
          </div>
          <div><label className="label">Notes</label><textarea name="notes" rows={2} className="input" /></div>
          <div className="border-t pt-4">
            <label className="flex items-center gap-2 text-sm mb-2"><input type="checkbox" name="create_login" /> Create Client Portal login for this client</label>
            <label className="label">Portal Password (only used if creating login)</label>
            <input name="password" type="text" className="input" placeholder="Set a temporary password" />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Client'}</button>
        </form>
      )}

      <div className="relative max-w-sm mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search clients..." className="input pl-9" />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Research Field</th><th className="px-4 py-3">Portal Access</th><th className="px-4 py-3">Projects</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(c => (
              <ClientRow key={c.id} client={c} projects={projects.filter(p => p.client_id === c.id)} editing={editingId === c.id} onEdit={() => setEditingId(c.id)} onCancelEdit={() => setEditingId(null)} />
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No clients found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ClientRow({ client, projects, editing, onEdit, onCancelEdit }: any) {
  if (editing) {
    return (
      <tr>
        <td colSpan={6} className="px-4 py-4 bg-gray-50">
          <form action={async (fd) => { await updateClient(client.id, fd); onCancelEdit() }} className="grid md:grid-cols-2 gap-3">
            <input name="full_name" defaultValue={client.full_name} className="input" />
            <input name="email" defaultValue={client.email} className="input" />
            <input name="phone" defaultValue={client.phone || ''} className="input" placeholder="Phone" />
            <input name="research_field" defaultValue={client.research_field || ''} className="input" placeholder="Research Field" />
            <textarea name="notes" defaultValue={client.notes || ''} className="input md:col-span-2" placeholder="Notes" />
            <div className="flex gap-2 md:col-span-2">
              <button type="submit" className="btn-primary text-sm py-2">Save</button>
              <button type="button" onClick={onCancelEdit} className="btn-secondary text-sm py-2">Cancel</button>
            </div>
          </form>
        </td>
      </tr>
    )
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-navy-900">{client.full_name}</td>
      <td className="px-4 py-3 text-gray-500">{client.email}</td>
      <td className="px-4 py-3 text-gray-500">{client.research_field}</td>
      <td className="px-4 py-3">
        {client.auth_user_id ? <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">Enabled</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">None</span>}
      </td>
      <td className="px-4 py-3 text-gray-500">{projects.length}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end items-center gap-3">
          <Link href={`/admin/clients/${client.id}`} className="text-xs text-teal-600 font-medium hover:underline">View Profile</Link>
          <button onClick={onEdit} className="text-gray-400 hover:text-teal-600"><Pencil size={16} /></button>
          <ConfirmDeleteButton onConfirm={() => deleteClient(client.id)} />
        </div>
      </td>
    </tr>
  )
}
