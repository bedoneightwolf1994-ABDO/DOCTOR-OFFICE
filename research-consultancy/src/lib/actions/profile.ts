'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function parseListField(v: FormDataEntryValue | null) {
  return String(v || '').split(',').map(s => s.trim()).filter(Boolean)
}

export async function updateProfile(formData: FormData) {
  const supabase = createClient()
  const payload = {
    full_name: String(formData.get('full_name') || ''),
    professional_title: String(formData.get('professional_title') || ''),
    biography: String(formData.get('biography') || ''),
    qualifications: parseListField(formData.get('qualifications')),
    specializations: parseListField(formData.get('specializations')),
    research_interests: parseListField(formData.get('research_interests')),
    experience_years: Number(formData.get('experience_years')) || 0,
    achievements: parseListField(formData.get('achievements')),
    photo_url: String(formData.get('photo_url') || '') || null,
    email: String(formData.get('email') || '') || null,
    phone: String(formData.get('phone') || '') || null,
    whatsapp: String(formData.get('whatsapp') || '') || null,
    linkedin_url: String(formData.get('linkedin_url') || '') || null,
    twitter_url: String(formData.get('twitter_url') || '') || null,
    researchgate_url: String(formData.get('researchgate_url') || '') || null,
    orcid_url: String(formData.get('orcid_url') || '') || null,
  }
  const { error } = await supabase.from('profile').update(payload).eq('id', 1)
  if (error) return { error: error.message }
  revalidatePath('/admin/profile'); revalidatePath('/about'); revalidatePath('/')
  return { success: true }
}
