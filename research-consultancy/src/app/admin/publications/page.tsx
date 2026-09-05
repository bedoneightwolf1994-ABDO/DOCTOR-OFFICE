import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Publication } from '@/lib/types'
import PublicationRow from './PublicationRow'

export const revalidate = 0

export default async function AdminPublicationsPage() {
  const supabase = createClient()
  const { data: items } = await supabase.from('publications').select('*').order('sort_order').order('year', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">Publications</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your published scientific works.</p>
        </div>
        <Link href="/admin/publications/new" className="btn-primary text-sm py-2.5">+ Add Publication</Link>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Journal</th><th className="px-4 py-3">Year</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(items as Publication[] | null)?.map(item => <PublicationRow key={item.id} item={item} />)}
            {(!items || items.length === 0) && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">No publications yet. Click "+ Add Publication" to add your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
