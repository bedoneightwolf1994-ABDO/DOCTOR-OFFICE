'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  const supabase = createClient()
  const payload = {
    client_id: String(formData.get('client_id') || ''),
    title: String(formData.get('title') || ''),
    research_field: String(formData.get('research_field') || '') || null,
    study_design: String(formData.get('study_design') || '') || null,
    service_type: String(formData.get('service_type') || '') || null,
    start_date: String(formData.get('start_date') || '') || null,
    deadline: String(formData.get('deadline') || '') || null,
    status: String(formData.get('status') || 'Consultation'),
    progress_percent: Number(formData.get('progress_percent')) || 0,
    description: String(formData.get('description') || '') || null,
    notes: String(formData.get('notes') || '') || null,
  }
  const { error } = await supabase.from('projects').insert(payload)
  if (error) return { error: error.message }
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = createClient()
  const payload = {
    title: String(formData.get('title') || ''),
    research_field: String(formData.get('research_field') || '') || null,
    study_design: String(formData.get('study_design') || '') || null,
    service_type: String(formData.get('service_type') || '') || null,
    start_date: String(formData.get('start_date') || '') || null,
    deadline: String(formData.get('deadline') || '') || null,
    status: String(formData.get('status') || 'Consultation'),
    progress_percent: Number(formData.get('progress_percent')) || 0,
    description: String(formData.get('description') || '') || null,
    notes: String(formData.get('notes') || '') || null,
  }
  const { error } = await supabase.from('projects').update(payload).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/projects')
  revalidatePath('/client')
  return { success: true }
}

// Used by the quick status dropdown on the projects list — updates instantly.
export async function updateProjectStatus(id: string, status: string) {
  const supabase = createClient()
  await supabase.from('projects').update({ status }).eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/client')
}

export async function updateProjectProgress(id: string, progress_percent: number) {
  const supabase = createClient()
  await supabase.from('projects').update({ progress_percent }).eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/client')
}

export async function deleteProject(id: string) {
  const supabase = createClient()
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath('/admin/projects')
}

export async function addProjectFile(projectId: string, fileName: string, fileUrl: string, fileType: string) {
  const supabase = createClient()
  await supabase.from('project_files').insert({
    project_id: projectId, file_name: fileName, file_url: fileUrl,
    uploaded_by: 'admin', file_type: fileType,
  })
  revalidatePath('/admin/projects')
  revalidatePath('/client')
}

export async function deleteProjectFile(id: string) {
  const supabase = createClient()
  await supabase.from('project_files').delete().eq('id', id)
  revalidatePath('/admin/projects')
  revalidatePath('/client')
}

export async function sendProjectMessage(projectId: string, sender: 'admin' | 'client', message: string) {
  const supabase = createClient()
  await supabase.from('project_messages').insert({ project_id: projectId, sender, message })
  revalidatePath('/admin/projects')
  revalidatePath('/client')
}
