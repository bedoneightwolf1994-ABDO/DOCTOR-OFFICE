'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Uploads a file to the public "media" Storage bucket and records it in the
// media_files table. Called from the Media Library page and from
// image-upload widgets inside Portfolio/Publications/Profile forms.
export async function uploadMediaFile(file: File) {
  const supabase = createClient()

  const ext = file.name.split('.').pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600', upsert: false,
  })
  if (uploadError) return { error: uploadError.message }

  const { data: urlData } = supabase.storage.from('media').getPublicUrl(path)

  const { error: dbError } = await supabase.from('media_files').insert({
    file_name: file.name,
    file_url: urlData.publicUrl,
    file_type: file.type,
    size_bytes: file.size,
  })
  if (dbError) return { error: dbError.message }

  revalidatePath('/admin/media')
  return { success: true, url: urlData.publicUrl }
}

export async function deleteMediaFile(id: string, fileUrl: string) {
  const supabase = createClient()
  // Extract storage path from the public URL to remove the underlying file too.
  const path = fileUrl.split('/media/').pop()
  if (path) await supabase.storage.from('media').remove([path])
  await supabase.from('media_files').delete().eq('id', id)
  revalidatePath('/admin/media')
}
