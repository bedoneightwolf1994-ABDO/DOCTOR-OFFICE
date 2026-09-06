import { createClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

export const revalidate = 0

export default async function AdminSettingsPage() {
  const supabase = createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').single()

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-1">Website Settings</h1>
      <p className="text-gray-500 text-sm mb-6">Global settings applied across the whole public website.</p>
      <SettingsForm settings={settings} />
    </div>
  )
}
