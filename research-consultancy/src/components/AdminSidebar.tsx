'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/actions/auth'
import {
  LayoutDashboard, Users, FolderKanban, Image as ImageIcon, Star,
  Wrench, BookOpen, UserCircle, Settings, FileStack, MessageSquare, LogOut, ExternalLink
} from 'lucide-react'

const items = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/publications', label: 'Publications', icon: BookOpen },
  { href: '/admin/profile', label: 'Profile', icon: UserCircle },
  { href: '/admin/media', label: 'Media / Files', icon: FileStack },
  { href: '/admin/messages', label: 'Contact Requests', icon: MessageSquare },
  { href: '/admin/settings', label: 'Website Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-navy-950 min-h-screen flex flex-col shrink-0">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-white font-serif font-bold">Dr. Abdelrahman Ahmed</p>
        <p className="text-teal-400 text-xs mt-1">Admin Dashboard</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className={`admin-sidebar-link ${active ? 'active' : ''}`}>
              <Icon size={18} /> {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link href="/" target="_blank" className="admin-sidebar-link"><ExternalLink size={18} /> View Site</Link>
        <form action={signOut}>
          <button className="admin-sidebar-link w-full text-left"><LogOut size={18} /> Sign Out</button>
        </form>
      </div>
    </aside>
  )
}
