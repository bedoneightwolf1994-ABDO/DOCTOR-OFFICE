'use client'
import { Share2, Check } from 'lucide-react'
import { useState } from 'react'

// Uses the native Share sheet on mobile (WhatsApp, Messenger, etc. all show
// up automatically). Falls back to copying the link on desktop browsers
// that don't support the Web Share API.
export default function ShareButton({ title, path, className = '' }: {
  title: string
  path: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // user cancelled the share sheet — no action needed
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors ${className}`}
      aria-label="Share this project"
    >
      {copied ? <Check size={16} className="text-teal-600" /> : <Share2 size={16} />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
