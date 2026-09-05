import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { PortfolioProject } from '@/lib/types'
import PortfolioRow from './PortfolioRow'

export const revalidate = 0

export default async function AdminPortfolioPage() {
  const supabase = createClient()
  const { data: items } = await supabase.from('portfolio_projects').select('*').order('sort_order')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the projects shown on your public portfolio page.</p>
        </div>
        <Link href="/admin/portfolio/new" className="btn-primary text-sm py-2.5">+ Add Portfolio Project</Link>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(items as PortfolioProject[] | null)?.map(item => (
              <PortfolioRow key={item.id} item={item} />
            ))}
            {(!items || items.length === 0) && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">No portfolio projects yet. Click "+ Add Portfolio Project" to create your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
