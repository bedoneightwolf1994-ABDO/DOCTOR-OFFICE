'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSiteSettings(formData: FormData) {
  const supabase = createClient()
  const payload = {
    site_title: String(formData.get('site_title') || ''),
    logo_url: String(formData.get('logo_url') || '') || null,
    favicon_url: String(formData.get('favicon_url') || '') || null,
    contact_email: String(formData.get('contact_email') || '') || null,
    contact_phone: String(formData.get('contact_phone') || '') || null,
    whatsapp_number: String(formData.get('whatsapp_number') || '') || null,
    facebook_url: String(formData.get('facebook_url') || '') || null,
    linkedin_url: String(formData.get('linkedin_url') || '') || null,
    twitter_url: String(formData.get('twitter_url') || '') || null,
    instagram_url: String(formData.get('instagram_url') || '') || null,
    homepage_headline: String(formData.get('homepage_headline') || ''),
    homepage_description: String(formData.get('homepage_description') || ''),
    cta_text: String(formData.get('cta_text') || ''),
    footer_text: String(formData.get('footer_text') || ''),
    stat_clients_served: Number(formData.get('stat_clients_served')) || 0,
    stat_projects_completed: Number(formData.get('stat_projects_completed')) || 0,
    stat_publications: Number(formData.get('stat_publications')) || 0,
    stat_years_experience: Number(formData.get('stat_years_experience')) || 0,
  }
  const { error } = await supabase.from('site_settings').update(payload).eq('id', 1)
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  return { success: true }
}
