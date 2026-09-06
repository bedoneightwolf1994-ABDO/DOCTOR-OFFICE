'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function setContactRequestStatus(id: string, status: 'new' | 'contacted' | 'converted' | 'archived') {
  const supabase = createClient()
  await supabase.from('contact_requests').update({ status }).eq('id', id)
  revalidatePath('/admin/messages')
}

export async function deleteContactRequest(id: string) {
  const supabase = createClient()
  await supabase.from('contact_requests').delete().eq('id', id)
  revalidatePath('/admin/messages')
}
