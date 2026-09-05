import { createClient } from '@/lib/supabase/server'
import MediaClient from './MediaClient'

export const revalidate = 0

export default async function AdminMediaPage() {
  const supabase = createClient()
  const { data: files } = await supabase.from('media_files').select('*').order('created_at', { ascending: false })
  return <MediaClient files={files || []} />
}
