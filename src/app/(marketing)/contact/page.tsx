import { createClient } from '@/lib/supabase/server'
import { SectionHeading } from '@/components/ui'
import ContactForm from '@/components/ContactForm'
import InstapayButton from '@/components/InstapayButton'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { getLang, localize, localizeAll } from '@/lib/lang'
import { getDict } from '@/lib/i18n'

export const revalidate = 0

export default async function ContactPage() {
  const supabase = createClient()
  const lang = getLang()
  const t = getDict(lang)
  const { data: settings } = await supabase.from('site_settings').select('*').single()

  return (
    <div className="container-page section">
      <SectionHeading eyebrow={t.contact_eyebrow} title={t.contact_title} description={t.contact_desc} />
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ContactForm lang={lang} />
        </div>
        <div className="space-y-4">
          {settings?.contact_email && (
            <div className="card p-5 flex items-center gap-3">
              <Mail className="text-teal-600" />
              <div><p className="text-xs text-gray-500">{t.email}</p><p className="font-medium">{settings.contact_email}</p></div>
            </div>
          )}
          {settings?.contact_phone && (
            <div className="card p-5 flex items-center gap-3">
              <Phone className="text-teal-600" />
              <div><p className="text-xs text-gray-500">{t.phone}</p><p className="font-medium">{settings.contact_phone}</p></div>
            </div>
          )}
          {settings?.whatsapp_number && (
            <div className="card p-5 flex items-center gap-3">
              <MessageCircle className="text-teal-600" />
              <div><p className="text-xs text-gray-500">{t.whatsapp}</p><p className="font-medium">{settings.whatsapp_number}</p></div>
            </div>
          )}
          <div className="card p-5">
            <p className="text-xs text-gray-500 mb-3">{t.pay_note}</p>
            <InstapayButton lang={lang} instapayUrl={settings?.instapay_url} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
