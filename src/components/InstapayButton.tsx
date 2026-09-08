import { CreditCard } from 'lucide-react'

// Reusable "Pay via Instapay" button/link.
// Renders nothing if no link has been set in Website Settings yet.
export default function InstapayButton({ instapayUrl, className = '' }: {
  instapayUrl: string | null
  className?: string
}) {
  if (!instapayUrl) return null

  return (
    <a
      href={instapayUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-medium px-6 py-3 rounded-md transition-colors ${className}`}
    >
      <CreditCard size={18} /> Pay via Instapay
    </a>
  )
}
