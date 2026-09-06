import { createClient } from '@/lib/supabase/server'
import { Users, FolderKanban, CheckCircle2, Star, TrendingUp, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = createClient()

  const [
    { count: totalClients },
    { count: activeProjects },
    { count: completedProjects },
    { count: pendingReviews },
    { data: approvedReviews },
    { count: newRequests },
  ] = await Promise.all([
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).neq('status', 'Completed'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'Completed'),
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('reviews').select('rating').eq('status', 'approved'),
    supabase.from('contact_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ])

  const avgRating = approvedReviews && approvedReviews.length
    ? (approvedReviews.reduce((a, r) => a + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '—'

  const stats = [
    { label: 'Total Clients', value: totalClients ?? 0, icon: Users, href: '/admin/clients' },
    { label: 'Active Projects', value: activeProjects ?? 0, icon: FolderKanban, href: '/admin/projects' },
    { label: 'Completed Projects', value: completedProjects ?? 0, icon: CheckCircle2, href: '/admin/projects' },
    { label: 'Pending Reviews', value: pendingReviews ?? 0, icon: Star, href: '/admin/reviews' },
    { label: 'Average Rating', value: avgRating, icon: TrendingUp, href: '/admin/reviews' },
    { label: 'New Contact Requests', value: newRequests ?? 0, icon: MessageSquare, href: '/admin/messages' },
  ]

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-1">Dashboard Overview</h1>
      <p className="text-gray-500 mb-8">Welcome back. Here's what's happening across your practice.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="card p-6 hover:border-teal-400">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{s.label}</p>
              <s.icon size={20} className="text-teal-600" />
            </div>
            <p className="text-3xl font-bold text-navy-950 mt-2">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        <div className="card p-6">
          <h3 className="font-semibold text-navy-950 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/portfolio/new" className="btn-secondary text-sm py-2">+ Add Portfolio</Link>
            <Link href="/admin/clients" className="btn-secondary text-sm py-2">+ Add Client</Link>
            <Link href="/admin/services/new" className="btn-secondary text-sm py-2">+ Add Service</Link>
            <Link href="/admin/publications/new" className="btn-secondary text-sm py-2">+ Add Publication</Link>
          </div>
        </div>
        <div className="card p-6 bg-teal-50 border-teal-200">
          <h3 className="font-semibold text-navy-950 mb-2">First time here?</h3>
          <p className="text-sm text-gray-600">Your site currently shows sample placeholder data marked <span className="badge-sample">SAMPLE DATA</span>. Replace it section by section — start with Profile and Website Settings, then add your real Services, Portfolio, and Publications.</p>
        </div>
      </div>
    </div>
  )
}
