'use server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Creates the client record AND (optionally) a portal login account.
// Creating the auth.users row requires the service-role admin client —
// this action first re-confirms the caller is a logged-in admin before
// touching it.
export async function createClient_(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }
  const { data: isAdminRow } = await supabase.from('admins').select('id').eq('auth_user_id', user.id).single()
  if (!isAdminRow) return { error: 'Not authorized.' }

  const full_name = String(formData.get('full_name') || '')
  const email = String(formData.get('email') || '')
  const createLogin = formData.get('create_login') === 'on'
  const password = String(formData.get('password') || '')

  let auth_user_id: string | null = null

  if (createLogin && email && password) {
    const admin = createAdminClient()
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email, password, email_confirm: true,
    })
    if (createErr) return { error: `Could not create login: ${createErr.message}` }
    auth_user_id = created.user.id
  }

  const { error } = await supabase.from('clients').insert({
    full_name,
    email,
    phone: String(formData.get('phone') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    notes: String(formData.get('notes') || '') || null,
    auth_user_id,
  })
  if (error) return { error: error.message }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}

export async function updateClient(id: string, formData: FormData) {
  const supabase = createClient()
  const payload = {
    full_name: String(formData.get('full_name') || ''),
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || '') || null,
    research_field: String(formData.get('research_field') || '') || null,
    notes: String(formData.get('notes') || '') || null,
  }
  const { error } = await supabase.from('clients').update(payload).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/clients')
  return { success: true }
}

export async function deleteClient(id: string) {
  const supabase = createClient()
  await supabase.from('clients').delete().eq('id', id)
  revalidatePath('/admin/clients')
}
