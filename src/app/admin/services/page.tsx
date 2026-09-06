import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Service } from '@/lib/types'
import ServiceRow from './ServiceRow'

export const revalidate = 0

export default async function AdminServicesPage() {
  const supabase = createClient()
  const { data: items } = await supabase.from('services').select('*').order('sort_order')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">Services</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the services listed on your public Services page.</p>
        </div>
        <Link href="/admin/services/new" className="btn-primary text-sm py-2.5">+ Add Service</Link>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(items as Service[] | null)?.map(item => <ServiceRow key={item.id} item={item} />)}
            {(!items || items.length === 0) && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">No services yet. Click "+ Add Service" to create your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
