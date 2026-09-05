'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPublication(formData: FormData) {
  const supabase = createClient()
  const payload = {
    title: String(formData.get('title') || ''),
    authors: String(formData.get('authors') || ''),
    journal: String(formData.get('journal') || '') || null,
    year: Number(formData.get('year')) || null,
    doi: String(formData.get('doi') || '') || null,
    url: String(formData.get('url') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    summary: String(formData.get('summary') || '') || null,
    image_url: String(formData.get('image_url') || '') || null,
    is_featured: formData.get('is_featured') === 'on',
    is_published: formData.get('is_published') === 'on',
  }
  const { error } = await supabase.from('publications').insert(payload)
  if (error) return { error: error.message }
  revalidatePath('/admin/publications'); revalidatePath('/publications')
  redirect('/admin/publications')
}

export async function updatePublication(id: string, formData: FormData) {
  const supabase = createClient()
  const payload = {
    title: String(formData.get('title') || ''),
    authors: String(formData.get('authors') || ''),
    journal: String(formData.get('journal') || '') || null,
    year: Number(formData.get('year')) || null,
    doi: String(formData.get('doi') || '') || null,
    url: String(formData.get('url') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    summary: String(formData.get('summary') || '') || null,
    image_url: String(formData.get('image_url') || '') || null,
    is_featured: formData.get('is_featured') === 'on',
    is_published: formData.get('is_published') === 'on',
  }
  const { error } = await supabase.from('publications').update(payload).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/publications'); revalidatePath('/publications')
  redirect('/admin/publications')
}

export async function deletePublication(id: string) {
  const supabase = createClient()
  await supabase.from('publications').delete().eq('id', id)
  revalidatePath('/admin/publications'); revalidatePath('/publications')
}

export async function togglePublicationPublish(id: string, is_published: boolean) {
  const supabase = createClient()
  await supabase.from('publications').update({ is_published }).eq('id', id)
  revalidatePath('/admin/publications'); revalidatePath('/publications')
}
