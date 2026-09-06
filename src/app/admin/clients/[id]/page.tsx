import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientEditForm from './ClientEditForm'
import { PROJECT_STATUSES } from '@/lib/types'

export const revalidate = 0

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: client } = await supabase.from('clients').select('*').eq('id', params.id).single()
  if (!client) return notFound()

  const { data: projects } = await supabase.from('projects').select('*').eq('client_id', params.id).order('created_at', { ascending: false })

  return (
    <div>
      <Link href="/admin/clients" className="text-sm text-teal-600 hover:underline">← Back to Clients</Link>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mt-2 mb-6">{client.full_name}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card p-5">
            <h3 className="font-semibold text-navy-950 mb-3">Client Details</h3>
            <ClientEditForm client={client} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-navy-950">Projects</h3>
            <Link href={`/admin/projects/new?client=${client.id}`} className="btn-secondary text-sm py-2">+ Add Project</Link>
          </div>
          <div className="space-y-3">
            {projects?.map(p => (
              <Link key={p.id} href={`/admin/projects/${p.id}`} className="card p-4 block hover:border-teal-400">
                <div className="flex justify-between">
                  <p className="font-medium text-navy-900">{p.title}</p>
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded h-fit">{p.status}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                  <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${p.progress_percent}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{p.progress_percent}% complete</p>
              </Link>
            ))}
            {(!projects || projects.length === 0) && <p className="text-gray-400 text-sm">No projects yet for this client.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
