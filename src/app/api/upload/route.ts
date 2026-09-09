import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Standard API route for file uploads (images/PDFs) instead of a Server
// Action. Server Actions can silently hang on some hosting setups when
// invoked directly with a raw File (rather than via a real <form> submit).
// A plain fetch() to this route gives a real HTTP response every time —
// success or a clear error — so uploads never hang indefinitely.
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Confirm the caller is a logged-in admin before allowing any upload.
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }
    const { data: adminRow } = await supabase.from('admins').select('id').eq('auth_user_id', user.id).single()
    if (!adminRow) {
      return NextResponse.json({ error: 'Not authorized.' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 })
    }

    const MAX_MB = 12
    if (file.size > MAX_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max is ${MAX_MB}MB.` }, { status: 413 })
    }

    const ext = file.name.split('.').pop() || 'bin'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage.from('media').upload(path, arrayBuffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    })
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(path)

    const { error: dbError } = await supabase.from('media_files').insert({
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: file.type,
      size_bytes: file.size,
    })
    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: urlData.publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected upload error.' }, { status: 500 })
  }
}
