import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Login page renders its own full-screen layout — skip the guard/sidebar there.
  // (Middleware already protects every other /admin/* route.)
  if (!user) {
    return <>{children}</>
  }

  const { data: admin } = await supabase.from('admins').select('id, full_name').eq('auth_user_id', user.id).single()
  if (!admin) redirect('/admin/login')

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
