// Protects /admin and /client routes. Refreshes the Supabase auth session on
// every request and redirects unauthenticated users to the right login page.
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login'
  const isClientRoute = path.startsWith('/client') && path !== '/client/login'

  if ((isAdminRoute || isClientRoute) && !user) {
    const loginPath = isAdminRoute ? '/admin/login' : '/client/login'
    const url = request.nextUrl.clone()
    url.pathname = loginPath
    url.searchParams.set('redirectedFrom', path)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
}
