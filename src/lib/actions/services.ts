'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function parseArList(v: FormDataEntryValue | null) {
  return String(v || '').split(/[,،]/).map(s => s.trim()).filter(Boolean)
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 6)
}
function parseListField(v: FormDataEntryValue | null) {
  return String(v || '').split(',').map(s => s.trim()).filter(Boolean)
}

export async function createService(formData: FormData) {
  const supabase = createClient()
  const title = String(formData.get('title') || '')
  const payload = {
    title_ar: String(formData.get('title_ar') || '') || null,
    short_description_ar: String(formData.get('short_description_ar') || '') || null,
    full_description_ar: String(formData.get('full_description_ar') || '') || null,
    price_label_ar: String(formData.get('price_label_ar') || '') || null,
    features_ar: parseArList(formData.get('features_ar')),
    title,
    slug: slugify(title),
    short_description: String(formData.get('short_description') || '') || null,
    full_description: String(formData.get('full_description') || '') || null,
    features: parseListField(formData.get('features')),
    price_label: String(formData.get('price_label') || '') || null,
    icon: String(formData.get('icon') || 'FlaskConical'),
    is_featured: formData.get('is_featured') === 'on',
    is_published: formData.get('is_published') === 'on',
  }
  const { error } = await supabase.from('services').insert(payload)
  if (error) return { error: error.message }
  revalidatePath('/admin/services'); revalidatePath('/services'); revalidatePath('/')
  redirect('/admin/services')
}

export async function updateService(id: string, formData: FormData) {
  const supabase = createClient()
  const payload = {
    title_ar: String(formData.get('title_ar') || '') || null,
    short_description_ar: String(formData.get('short_description_ar') || '') || null,
    full_description_ar: String(formData.get('full_description_ar') || '') || null,
    price_label_ar: String(formData.get('price_label_ar') || '') || null,
    features_ar: parseArList(formData.get('features_ar')),
    title: String(formData.get('title') || ''),
    short_description: String(formData.get('short_description') || '') || null,
    full_description: String(formData.get('full_description') || '') || null,
    features: parseListField(formData.get('features')),
    price_label: String(formData.get('price_label') || '') || null,
    icon: String(formData.get('icon') || 'FlaskConical'),
    is_featured: formData.get('is_featured') === 'on',
    is_published: formData.get('is_published') === 'on',
  }
  const { error } = await supabase.from('services').update(payload).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/services'); revalidatePath('/services'); revalidatePath('/')
  redirect('/admin/services')
}

export async function deleteService(id: string) {
  const supabase = createClient()
  await supabase.from('services').delete().eq('id', id)
  revalidatePath('/admin/services'); revalidatePath('/services')
}

export async function toggleServicePublish(id: string, is_published: boolean) {
  const supabase = createClient()
  await supabase.from('services').update({ is_published }).eq('id', id)
  revalidatePath('/admin/services'); revalidatePath('/services')
}
