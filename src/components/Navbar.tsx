import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getLang, localize } from '@/lib/lang'
import { getDict } from '@/lib/i18n'
import { setLanguage } from '@/lib/actions/lang'

export default async function Navbar() {
  const supabase = createClient()
  const { data: rawSettings } = await supabase.from('site_settings').select('*').single()
  const lang = getLang()
  const t = getDict(lang)
  const settings = localize(rawSettings, lang)

  const links = [
    { href: '/', label: t.nav_home },
    { href: '/about', label: t.nav_about },
    { href: '/services', label: t.nav_services },
    { href: '/portfolio', label: t.nav_portfolio },
    { href: '/reviews', label: t.nav_reviews },
    { href: '/publications', label: t.nav_publications },
    { href: '/contact', label: t.nav_contact },
  ]

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-40">
      <div className="container-page flex items-center justify-between h-20 gap-3">
        <Link href="/" className="flex items-center gap-3">
          {settings?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logo_url} alt="Logo" className="h-10 w-auto" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-navy-900 flex items-center justify-center text-teal-400 font-serif font-bold">DA</div>
          )}
          <div className="leading-tight">
            <p className="font-serif font-bold text-navy-900 text-base">{lang === 'ar' ? 'د. عبدالرحمن أحمد' : 'Dr. Abdelrahman Ahmed'}</p>
            <p className="text-[11px] uppercase tracking-wider text-teal-600">{t.brand_sub}</p>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-navy-800">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-teal-600 transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <form action={setLanguage}>
            <input type="hidden" name="lang" value={lang === 'ar' ? 'en' : 'ar'} />
            <button type="submit" className="border border-navy-800/30 hover:border-teal-600 hover:text-teal-600 text-navy-900 text-sm font-semibold px-3 py-2 rounded-md transition-colors" aria-label="Switch language">
              🌐 {t.lang_switch}
            </button>
          </form>
          <Link href="/contact" className="btn-primary text-sm py-2.5 hidden sm:inline-flex">
            {settings?.cta_text || t.book}
          </Link>
        </div>
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
