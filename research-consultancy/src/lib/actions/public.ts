'use server'
// Public-facing server actions: anyone (no login) can call these.
// RLS policies (see supabase/policies.sql) restrict what they're allowed to insert.
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitReview(formData: FormData) {
  const supabase = createClient()

  const payload = {
    reviewer_name: String(formData.get('reviewer_name') || '').trim(),
    profession: String(formData.get('profession') || '').trim() || null,
    research_field: String(formData.get('research_field') || '').trim() || null,
    rating: Number(formData.get('rating') || 5),
    review_text: String(formData.get('review_text') || '').trim(),
    permission_to_publish: formData.get('permission_to_publish') === 'on',
    display_preference: String(formData.get('display_preference') || 'first_name'),
    status: 'pending' as const,
  }

  if (!payload.reviewer_name || !payload.review_text) {
    return { error: 'Please fill in your name and review text.' }
  }

  const { error } = await supabase.from('reviews').insert(payload)
  if (error) return { error: error.message }

  revalidatePath('/reviews')
  return { success: true }
}

export async function submitContactRequest(formData: FormData) {
  const supabase = createClient()

  const payload = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    whatsapp: String(formData.get('whatsapp') || '').trim() || null,
    research_field: String(formData.get('research_field') || '').trim() || null,
    service_required: String(formData.get('service_required') || '').trim() || null,
    project_description: String(formData.get('project_description') || '').trim() || null,
    preferred_contact_method: String(formData.get('preferred_contact_method') || '').trim() || null,
    status: 'new' as const,
  }

  if (!payload.name || !payload.email) {
    return { error: 'Please provide your name and email.' }
  }

  const { error } = await supabase.from('contact_requests').insert(payload)
  if (error) return { error: error.message }

  return { success: true }
}
