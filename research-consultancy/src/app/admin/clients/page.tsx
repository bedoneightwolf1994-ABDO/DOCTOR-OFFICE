import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/types'
import ClientsClient from './ClientsClient'

export const revalidate = 0

export default async function AdminClientsPage() {
  const supabase = createClient()
  const { data: clients } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
  const { data: projects } = await supabase.from('projects').select('id, client_id, title, status')

  return <ClientsClient clients={(clients as Client[]) || []} projects={projects || []} />
}
