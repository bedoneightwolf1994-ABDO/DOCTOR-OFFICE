import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/publications', label: 'Publications' },
  { href: '/contact', label: 'Contact' },
]

export default async function Navbar() {
  const supabase = createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').single()

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-40">
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          {settings?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logo_url} alt="Logo" className="h-10 w-auto" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-navy-900 flex items-center justify-center text-teal-400 font-serif font-bold">DA</div>
          )}
          <div className="leading-tight">
            <p className="font-serif font-bold text-navy-900 text-base">Dr. Abdelrahman Ahmed</p>
            <p className="text-[11px] uppercase tracking-wider text-teal-600">Scientific Research Consultancy</p>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-navy-800">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-teal-600 transition-colors">{l.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="btn-primary text-sm py-2.5">
          {settings?.cta_text || 'Book a Consultation'}
        </Link>
      </div>
      {/* mobile nav */}
      <nav className="lg:hidden flex overflow-x-auto gap-5 px-6 pb-3 text-sm font-medium text-navy-800">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-teal-600">{l.label}</Link>
        ))}
      </nav>
    </header>
  )
}
