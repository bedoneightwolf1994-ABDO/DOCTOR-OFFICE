'use client'
import { useState } from 'react'
import { updateSiteSettings } from '@/lib/actions/settings'
import FileUploadField from '@/components/FileUploadField'
import toast from 'react-hot-toast'

export default function SettingsForm({ settings }: { settings: any }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    const res = await updateSiteSettings(formData)
    setSubmitting(false)
    if (res?.error) toast.error(res.error)
    else toast.success('Settings saved')
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-2xl">
      <section>
        <h3 className="font-semibold text-navy-950 mb-3">General</h3>
        <div className="space-y-4">
          <div><label className="label">Website Title</label><input name="site_title" defaultValue={settings?.site_title} className="input" /></div>
          <FileUploadField name="logo_url" label="Logo" accept="image/*" defaultValue={settings?.logo_url || ''} />
          <FileUploadField name="favicon_url" label="Favicon" accept="image/*" defaultValue={settings?.favicon_url || ''} />
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-navy-950 mb-3">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Contact Email</label><input name="contact_email" defaultValue={settings?.contact_email || ''} className="input" /></div>
          <div><label className="label">Contact Phone</label><input name="contact_phone" defaultValue={settings?.contact_phone || ''} className="input" /></div>
          <div><label className="label">WhatsApp Number</label><input name="whatsapp_number" defaultValue={settings?.whatsapp_number || ''} className="input" /></div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-navy-950 mb-3">Social Media</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Facebook URL</label><input name="facebook_url" defaultValue={settings?.facebook_url || ''} className="input" /></div>
          <div><label className="label">LinkedIn URL</label><input name="linkedin_url" defaultValue={settings?.linkedin_url || ''} className="input" /></div>
          <div><label className="label">Twitter/X URL</label><input name="twitter_url" defaultValue={settings?.twitter_url || ''} className="input" /></div>
          <div><label className="label">Instagram URL</label><input name="instagram_url" defaultValue={settings?.instagram_url || ''} className="input" /></div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-navy-950 mb-3">Homepage Content</h3>
        <div className="space-y-4">
          <div><label className="label">Homepage Headline</label><input name="homepage_headline" defaultValue={settings?.homepage_headline} className="input" /></div>
          <div><label className="label">Homepage Description</label><textarea name="homepage_description" rows={3} defaultValue={settings?.homepage_description} className="input" /></div>
          <div><label className="label">CTA Button Text</label><input name="cta_text" defaultValue={settings?.cta_text} className="input" /></div>
          <div><label className="label">Footer Text</label><input name="footer_text" defaultValue={settings?.footer_text} className="input" /></div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-navy-950 mb-3">Homepage Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><label className="label">Clients Served</label><input name="stat_clients_served" type="number" defaultValue={settings?.stat_clients_served} className="input" /></div>
          <div><label className="label">Projects Completed</label><input name="stat_projects_completed" type="number" defaultValue={settings?.stat_projects_completed} className="input" /></div>
          <div><label className="label">Publications</label><input name="stat_publications" type="number" defaultValue={settings?.stat_publications} className="input" /></div>
          <div><label className="label">Years Experience</label><input name="stat_years_experience" type="number" defaultValue={settings?.stat_years_experience} className="input" /></div>
        </div>
      </section>

      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Settings'}</button>
    </form>
  )
}
