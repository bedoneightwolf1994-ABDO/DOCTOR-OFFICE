// Server-side Supabase client — used inside Server Components, Server Actions,
// and Route Handlers. Reads/writes the auth cookie so the logged-in user
// (admin or client) is respected by Row Level Security automatically.
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // called from a Server Component render — safe to ignore,
            // middleware.ts handles session refresh instead.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {}
        },
      },
    }
  )
}
