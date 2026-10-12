import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient()
  const { data: settings } = await supabase.from('site_settings').select('site_title, favicon_url').single()
  return {
    title: settings?.site_title || 'Dr. Abdelrahman Ahmed | Scientific Research & Academic Consultancy',
    description: 'Scientific research services: protocol writing, systematic reviews, statistical analysis, manuscript writing, and academic consultancy.',
    icons: settings?.favicon_url ? [{ url: settings.favicon_url }] : undefined,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#0f2140', color: '#fff', border: '1px solid #c9a24b' },
            success: { iconTheme: { primary: '#c9a24b', secondary: '#0f2140' } },
            error: { iconTheme: { primary: '#e0c179', secondary: '#0f2140' } },
          }}
        />
        {children}
      </body>
    </html>
  )
}
