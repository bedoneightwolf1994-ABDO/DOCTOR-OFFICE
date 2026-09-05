import { createClient } from '@/lib/supabase/server'
import MessagesClient from './MessagesClient'

export const revalidate = 0

export default async function AdminMessagesPage() {
  const supabase = createClient()
  const { data: requests } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false })
  return <MessagesClient requests={requests || []} />
}
