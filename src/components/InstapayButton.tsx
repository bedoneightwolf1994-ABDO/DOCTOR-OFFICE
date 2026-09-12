import { CreditCard } from 'lucide-react'

// Hard-coded fallback link — guarantees the button always works even if
// the "instapay_url" field in Admin > Website Settings is empty or hasn't
// saved yet. If a value IS set in the admin panel, that value always wins.
const DEFAULT_INSTAPAY_URL = 'https://ipn.eg/S/abdelrhmanahmedmuc2/instapay/3a8QUi'

// Reusable "Pay via Instapay" button/link.
export default function InstapayButton({ instapayUrl, className = '' }: {
  instapayUrl?: string | null
  className?: string
}) {
  const finalUrl = instapayUrl || DEFAULT_INSTAPAY_URL

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#6C2BD9] to-[#8B3DFF] hover:from-[#5D24BD] hover:to-[#7A34DE] text-white font-semibold px-6 py-3 rounded-md shadow-sm transition-all ${className}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="white" strokeWidth="1.6" />
        <path d="M2 9.5H22" stroke="white" strokeWidth="1.6" />
        <circle cx="17.5" cy="14.5" r="1.6" fill="white" />
        <path d="M5 14.5H12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Pay via Instapay
    </a>
  )
}
