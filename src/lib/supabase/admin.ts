// SERVICE-ROLE Supabase client — bypasses RLS entirely.
// Only ever import this inside Server Actions / Route Handlers that have
// already verified the caller is an authenticated admin. Never expose the
// service role key to the browser.
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
