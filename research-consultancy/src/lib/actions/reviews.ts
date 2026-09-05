'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function setReviewStatus(id: string, status: 'approved' | 'rejected' | 'hidden' | 'pending') {
  const supabase = createClient()
  await supabase.from('reviews').update({ status }).eq('id', id)
  revalidatePath('/admin/reviews'); revalidatePath('/reviews'); revalidatePath('/')
}

export async function updateReview(id: string, formData: FormData) {
  const supabase = createClient()
  const payload = {
    reviewer_name: String(formData.get('reviewer_name') || ''),
    profession: String(formData.get('profession') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    rating: Number(formData.get('rating')) || 5,
    review_text: String(formData.get('review_text') || ''),
    display_preference: String(formData.get('display_preference') || 'first_name'),
  }
  await supabase.from('reviews').update(payload).eq('id', id)
  revalidatePath('/admin/reviews'); revalidatePath('/reviews')
}

export async function deleteReview(id: string) {
  const supabase = createClient()
  await supabase.from('reviews').delete().eq('id', id)
  revalidatePath('/admin/reviews'); revalidatePath('/reviews')
}
