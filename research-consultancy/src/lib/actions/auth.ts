'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function adminLogin(formData: FormData) {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  // Confirm this authenticated user is actually registered as an admin.
  const { data: admin } = await supabase.from('admins').select('id').eq('auth_user_id', data.user.id).single()
  if (!admin) {
    await supabase.auth.signOut()
    return { error: 'This account is not authorized as an admin.' }
  }

  redirect('/admin')
}

export async function clientLogin(formData: FormData) {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  const { data: client } = await supabase.from('clients').select('id').eq('auth_user_id', data.user.id).single()
  if (!client) {
    await supabase.auth.signOut()
    return { error: 'This account is not linked to a client project. Contact Dr. Abdelrahman.' }
  }

  redirect('/client')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}
