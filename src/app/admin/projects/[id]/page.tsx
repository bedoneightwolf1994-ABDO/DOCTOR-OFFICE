import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProjectDetailClient from './ProjectDetailClient'

export const revalidate = 0

export default async function AdminProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const [{ data: project }, { data: files }, { data: messages }] = await Promise.all([
    supabase.from('projects').select('*, clients(*)').eq('id', params.id).single(),
    supabase.from('project_files').select('*').eq('project_id', params.id).order('created_at', { ascending: false }),
    supabase.from('project_messages').select('*').eq('project_id', params.id).order('created_at'),
  ])
  if (!project) return notFound()

  return <ProjectDetailClient project={project} files={files || []} messages={messages || []} />
}
