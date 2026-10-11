import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { createClient } from '@/lib/supabase/server'
import { getLang } from '@/lib/lang'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').single()
  const lang = getLang()
  const isAr = lang === 'ar'
  // Default transparent research background (public/research-bg.png).
  // If a custom image is set in Admin > Website Settings, that one wins.
  const bg = settings?.hero_background_url || '/research-bg.png'

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} lang={lang} className={`relative ${isAr ? 'font-arabic' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bg} alt="" aria-hidden="true" className="fixed inset-0 w-full h-full object-cover opacity-60 -z-10 pointer-events-none" />
      <Navbar />
      <main>{children}</main>
      <Footer />
      {settings?.whatsapp_button_enabled !== false && (
        <WhatsAppButton
          whatsappNumber={settings?.whatsapp_number || null}
          defaultMessage={settings?.whatsapp_default_message || 'Hello, I would like to inquire about your research services.'}
          lang={lang}
        />
      )}
    </div>
  )
}
