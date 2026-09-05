import { createClient } from '@/lib/supabase/server'
import type { Project, Client } from '@/lib/types'
import ProjectsClient from './ProjectsClient'

export const revalidate = 0

export default async function AdminProjectsPage() {
  const supabase = createClient()
  const { data: projects } = await supabase.from('projects').select('*, clients(*)').order('created_at', { ascending: false })
  const { data: clients } = await supabase.from('clients').select('*').order('full_name')

  return <ProjectsClient projects={(projects as Project[]) || []} clients={(clients as Client[]) || []} />
}
