// Reusable "Pay via Instapay" button/link.
// Renders nothing if no link has been set in Website Settings yet.
//
// Uses a stylized wallet/payment icon in Instapay's signature purple —
// not the official Instapay logo (that's trademarked), but instantly
// recognizable as "pay by mobile wallet" alongside the Instapay name.
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
