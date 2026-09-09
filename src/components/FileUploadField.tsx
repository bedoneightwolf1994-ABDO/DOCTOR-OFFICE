'use client'
import { useState } from 'react'
import { uploadMediaFile } from '@/lib/actions/media'
import toast from 'react-hot-toast'
import { UploadCloud, Loader2 } from 'lucide-react'

// A simple upload button that pushes the file to Supabase Storage and writes
// the resulting public URL into a hidden text input (so it submits normally
// as part of the surrounding <form action={...}>).
export default function FileUploadField({ name, label, accept = 'image/*,.pdf', defaultValue = '' }: {
  name: string; label: string; accept?: string; defaultValue?: string
}) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_MB = 12
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Please use a file under ${MAX_MB}MB.`)
      e.target.value = ''
      return
    }

    setUploading(true)
    const res = await uploadMediaFile(file)
    setUploading(false)
    if (res?.error) {
      toast.error(res.error)
    } else if (res?.url) {
      setUrl(res.url)
      toast.success('File uploaded')
    }
    e.target.value = ''
  }

  return (
    <div>
      <label className="label">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        <label className="btn-secondary text-sm py-2 cursor-pointer">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" accept={accept} className="hidden" onChange={handleChange} />
        </label>
        {url && <a href={url} target="_blank" className="text-xs text-teal-600 truncate max-w-[200px]">{url}</a>}
      </div>
      <p className="text-xs text-gray-400 mt-1">Or paste a URL directly:</p>
      <input className="input mt-1" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
    </div>
  )
}
