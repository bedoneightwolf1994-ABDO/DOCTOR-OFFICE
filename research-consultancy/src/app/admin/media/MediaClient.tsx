'use client'
import { useState } from 'react'
import { uploadMediaFile, deleteMediaFile } from '@/lib/actions/media'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'
import toast from 'react-hot-toast'
import { UploadCloud, Copy, Loader2 } from 'lucide-react'

export default function MediaClient({ files }: { files: any[] }) {
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const res = await uploadMediaFile(file)
    setUploading(false)
    if (res?.error) toast.error(res.error)
    else toast.success('File uploaded to Media Library')
    e.target.value = ''
  }

  function copyLink(url: string) {
    navigator.clipboard.writeText(url)
    toast.success('Link copied')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">Media / Files</h1>
          <p className="text-gray-500 text-sm mt-1">Upload images and PDFs here, then reuse the links anywhere in the dashboard.</p>
        </div>
        <label className="btn-primary text-sm py-2.5 cursor-pointer">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {files.map(f => (
          <div key={f.id} className="card p-3">
            <div className="aspect-square bg-gray-50 rounded overflow-hidden flex items-center justify-center mb-2">
              {f.file_type?.startsWith('image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.file_url} alt={f.file_name} className="w-full h-full object-cover" />
              ) : <span className="text-xs text-gray-400">PDF File</span>}
            </div>
            <p className="text-xs text-gray-700 truncate" title={f.file_name}>{f.file_name}</p>
            <div className="flex justify-between items-center mt-2">
              <button onClick={() => copyLink(f.file_url)} className="text-xs text-teal-600 flex items-center gap-1"><Copy size={12} /> Copy Link</button>
              <ConfirmDeleteButton onConfirm={() => deleteMediaFile(f.id, f.file_url)} />
            </div>
          </div>
        ))}
        {files.length === 0 && <p className="text-gray-400 col-span-full">No files uploaded yet.</p>}
      </div>
    </div>
  )
}
