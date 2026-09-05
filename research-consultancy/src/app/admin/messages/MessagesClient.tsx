'use client'
import { useState } from 'react'
import { setContactRequestStatus, deleteContactRequest } from '@/lib/actions/contact'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'
import { Search } from 'lucide-react'

const statusColor: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-yellow-50 text-yellow-700',
  converted: 'bg-green-50 text-green-700',
  archived: 'bg-gray-100 text-gray-500',
}

export default function MessagesClient({ requests }: { requests: any[] }) {
  const [query, setQuery] = useState('')

  const filtered = requests.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.email.toLowerCase().includes(query.toLowerCase()) ||
    (r.service_required || '').toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-1">Contact Requests</h1>
      <p className="text-gray-500 text-sm mb-6">Consultation requests submitted from the public Contact page.</p>

      <div className="relative max-w-sm mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search requests..." className="input pl-9" />
      </div>

      <div className="space-y-3">
        {filtered.map(r => (
          <div key={r.id} className="card p-5">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-navy-950">{r.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColor[r.status]}`}>{r.status}</span>
                </div>
                <p className="text-sm text-gray-500">{r.email} {r.whatsapp && `· ${r.whatsapp}`}</p>
                <p className="text-sm text-gray-500 mt-1">{r.service_required} {r.research_field && `· ${r.research_field}`}</p>
                {r.project_description && <p className="text-sm text-gray-600 mt-2 max-w-xl">{r.project_description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <select value={r.status} onChange={e => setContactRequestStatus(r.id, e.target.value as any)} className="input !w-auto text-sm">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>
                <ConfirmDeleteButton onConfirm={() => deleteContactRequest(r.id)} />
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-400">No contact requests yet.</p>}
      </div>
    </div>
  )
}
