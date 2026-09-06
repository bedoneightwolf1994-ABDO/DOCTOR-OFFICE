import { signOut } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { LogOut } from 'lucide-react'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Login page renders its own full-screen layout — skip the header there.
  if (!user) return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy-950 text-white">
        <div className="container-page flex items-center justify-between h-16">
          <Link href="/client" className="font-serif font-bold">Client Portal</Link>
          <form action={signOut}>
            <button className="text-sm text-gray-300 hover:text-white inline-flex items-center gap-1"><LogOut size={16} /> Sign Out</button>
          </form>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  )
}
