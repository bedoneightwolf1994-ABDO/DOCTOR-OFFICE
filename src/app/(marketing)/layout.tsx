import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { createClient } from '@/lib/supabase/server'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').single()

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {settings?.whatsapp_button_enabled !== false && (
        <WhatsAppButton
          whatsappNumber={settings?.whatsapp_number || null}
          defaultMessage={settings?.whatsapp_default_message || 'Hello, I would like to inquire about your research services.'}
        />
      )}
    </>
  )
}
