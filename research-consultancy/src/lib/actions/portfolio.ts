'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 6)
}

function parseListField(v: FormDataEntryValue | null) {
  return String(v || '').split(',').map(s => s.trim()).filter(Boolean)
}

export async function createPortfolioProject(formData: FormData) {
  const supabase = createClient()
  const title = String(formData.get('title') || '')

  const payload = {
    title,
    slug: slugify(title),
    category: String(formData.get('category') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    description: String(formData.get('description') || '') || null,
    services_provided: parseListField(formData.get('services_provided')),
    year: Number(formData.get('year')) || null,
    project_status: String(formData.get('project_status') || 'Completed'),
    featured_image_url: String(formData.get('featured_image_url') || '') || null,
    additional_images: parseListField(formData.get('additional_images')),
    pdf_url: String(formData.get('pdf_url') || '') || null,
    external_link: String(formData.get('external_link') || '') || null,
    tags: parseListField(formData.get('tags')),
    is_featured: formData.get('is_featured') === 'on',
    visibility: String(formData.get('visibility') || 'public'),
    is_published: formData.get('is_published') === 'on',
  }

  const { error } = await supabase.from('portfolio_projects').insert(payload)
  if (error) return { error: error.message }

  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  redirect('/admin/portfolio')
}

export async function updatePortfolioProject(id: string, formData: FormData) {
  const supabase = createClient()

  const payload = {
    title: String(formData.get('title') || ''),
    category: String(formData.get('category') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    description: String(formData.get('description') || '') || null,
    services_provided: parseListField(formData.get('services_provided')),
    year: Number(formData.get('year')) || null,
    project_status: String(formData.get('project_status') || 'Completed'),
    featured_image_url: String(formData.get('featured_image_url') || '') || null,
    additional_images: parseListField(formData.get('additional_images')),
    pdf_url: String(formData.get('pdf_url') || '') || null,
    external_link: String(formData.get('external_link') || '') || null,
    tags: parseListField(formData.get('tags')),
    is_featured: formData.get('is_featured') === 'on',
    visibility: String(formData.get('visibility') || 'public'),
    is_published: formData.get('is_published') === 'on',
  }

  const { error } = await supabase.from('portfolio_projects').update(payload).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  redirect('/admin/portfolio')
}

export async function deletePortfolioProject(id: string) {
  const supabase = createClient()
  await supabase.from('portfolio_projects').delete().eq('id', id)
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
}

export async function togglePortfolioPublish(id: string, is_published: boolean) {
  const supabase = createClient()
  await supabase.from('portfolio_projects').update({ is_published }).eq('id', id)
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
}

export async function togglePortfolioVisibility(id: string, visibility: 'public' | 'private') {
  const supabase = createClient()
  await supabase.from('portfolio_projects').update({ visibility }).eq('id', id)
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
}
