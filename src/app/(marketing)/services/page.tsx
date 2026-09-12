import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SectionHeading, SampleBadge, EmptyState } from '@/components/ui'
import type { Service } from '@/lib/types'
import { CheckCircle2 } from 'lucide-react'
import InstapayButton from '@/components/InstapayButton'

export const revalidate = 0

export default async function ServicesPage() {
  const supabase = createClient()
  const [{ data: services }, { data: settings }] = await Promise.all([
    supabase.from('services').select('*').eq('is_published', true).order('sort_order'),
    supabase.from('site_settings').select('instapay_url').single(),
  ])

  return (
    <div className="container-page section">
      <SectionHeading eyebrow="Services" title="Research Services" description="Every service below is fully editable from the Admin Dashboard — nothing here is hard-coded." />
      {services && services.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {(services as Service[]).map(s => (
            <div key={s.id} className="card p-8">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-2xl font-bold text-navy-950">{s.title}</h3>
                {s.is_featured && <span className="text-xs bg-gold-500/20 text-gold-500 px-2 py-1 rounded font-semibold">FEATURED</span>}
              </div>
              {s.title.startsWith('[SAMPLE]') && <div className="mt-2"><SampleBadge /></div>}
              <p className="text-gray-600 mt-3">{s.full_description || s.short_description}</p>
              {s.features?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-center justify-between">
                {s.price_label && <span className="text-teal-600 font-semibold">{s.price_label}</span>}
                <Link href="/contact" className="text-sm font-medium text-navy-900 hover:text-teal-600">Request this service →</Link>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <InstapayButton instapayUrl={settings?.instapay_url} className="w-full !py-2.5 text-sm" />
              </div>
            </div>
          ))}
        </div>
      ) : <EmptyState text="No services published yet. Add them from Admin > Services." />}
    </div>
  )
}
