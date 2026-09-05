import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Footer() {
  const supabase = createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').single()
  const { data: profile } = await supabase.from('profile').select('*').single()

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
          <p className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/services" className="hover:text-teal-400">Services</Link>
            <Link href="/portfolio" className="hover:text-teal-400">Portfolio</Link>
            <Link href="/publications" className="hover:text-teal-400">Publications</Link>
            <Link href="/contact" className="hover:text-teal-400">Contact</Link>
            <Link href="/client/login" className="hover:text-teal-400">Client Portal</Link>
          </div>
        </div>
        <div>
          <p className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            {settings?.contact_email && <p>{settings.contact_email}</p>}
            {settings?.contact_phone && <p>{settings.contact_phone}</p>}
            {settings?.whatsapp_number && <p>WhatsApp: {settings.whatsapp_number}</p>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        {settings?.footer_text || '© Dr. Abdelrahman Ahmed. All rights reserved.'}
      </div>
    </footer>
  )
}
