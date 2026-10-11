import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getLang, localize } from '@/lib/lang'
import { getDict } from '@/lib/i18n'

export default async function Footer() {
  const supabase = createClient()
  const lang = getLang()
  const t = getDict(lang)
  const { data: rawSettings } = await supabase.from('site_settings').select('*').single()
  const { data: rawProfile } = await supabase.from('profile').select('*').single()
  const settings = localize(rawSettings, lang)
  const profile = localize(rawProfile, lang)

  return (
    <footer className="bg-navy-950 text-gray-300 mt-24">
      <div className="container-page py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-white text-lg font-bold">{profile?.full_name || 'Dr. Abdelrahman Ahmed'}</p>
          <p className="text-sm text-gray-400 mt-2">{profile?.professional_title}</p>
          <div className="flex gap-4 mt-4 text-sm">
            {settings?.linkedin_url && <a href={settings.linkedin_url} className="hover:text-teal-400">LinkedIn</a>}
            {settings?.twitter_url && <a href={settings.twitter_url} className="hover:text-teal-400">Twitter</a>}
            {settings?.facebook_url && <a href={settings.facebook_url} className="hover:text-teal-400">Facebook</a>}
          </div>
        </div>
        <div>
          <p className="text-white font-medium mb-3 text-sm uppercase tracking-wide">{t.quick_links}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/services" className="hover:text-teal-400">{t.nav_services}</Link>
            <Link href="/portfolio" className="hover:text-teal-400">{t.nav_portfolio}</Link>
            <Link href="/publications" className="hover:text-teal-400">{t.nav_publications}</Link>
            <Link href="/contact" className="hover:text-teal-400">{t.nav_contact}</Link>
            <Link href="/client/login" className="hover:text-teal-400">{t.client_portal}</Link>
          </div>
        </div>
        <div>
          <p className="text-white font-medium mb-3 text-sm uppercase tracking-wide">{t.contact_h}</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            {settings?.contact_email && <p>{settings.contact_email}</p>}
            {settings?.contact_phone && <p>{settings.contact_phone}</p>}
            {settings?.whatsapp_number && <p>{t.whatsapp}: {settings.whatsapp_number}</p>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        {settings?.footer_text || t.rights}
      </div>
    </footer>
  )
}
