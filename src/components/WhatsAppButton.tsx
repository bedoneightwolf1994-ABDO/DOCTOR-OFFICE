'use client'
// Floating WhatsApp button shown on every public page.
// Reads the phone number + default message from Website Settings —
// no code changes needed if the admin updates them later.

export default function WhatsAppButton({ whatsappNumber, defaultMessage }: {
  whatsappNumber: string | null
  defaultMessage: string
}) {
  if (!whatsappNumber) return null

  // Strip everything except digits (spaces, +, dashes) so the wa.me link is valid.
  const digitsOnly = whatsappNumber.replace(/[^0-9]/g, '')
  const url = `https://wa.me/${digitsOnly}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full shadow-lg px-4 py-3.5 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M16.001 2.667c-7.363 0-13.334 5.97-13.334 13.333 0 2.353.615 4.66 1.782 6.686L2.667 29.333l6.83-1.792a13.27 13.27 0 0 0 6.504 1.657h.006c7.362 0 13.333-5.97 13.333-13.334 0-3.56-1.386-6.906-3.903-9.423a13.24 13.24 0 0 0-9.436-3.774Zm0 24.4h-.005a11.06 11.06 0 0 1-5.635-1.542l-.404-.24-4.053 1.063 1.082-3.951-.263-.406a11.05 11.05 0 0 1-1.69-5.892c0-6.112 4.974-11.086 11.09-11.086 2.962 0 5.747 1.154 7.842 3.25a11.02 11.02 0 0 1 3.244 7.843c-.002 6.113-4.975 11.086-11.088 11.086 0-.001 0-.001 0-.001v-.124Zm6.083-8.302c-.334-.167-1.975-.975-2.28-1.086-.306-.111-.529-.167-.751.167-.223.334-.862 1.086-1.057 1.309-.195.223-.39.25-.723.083-.334-.167-1.409-.52-2.684-1.657-.992-.885-1.663-1.978-1.858-2.311-.195-.334-.021-.514.146-.68.15-.15.334-.39.501-.585.167-.195.223-.334.334-.556.111-.223.056-.417-.028-.584-.083-.167-.751-1.81-1.029-2.478-.271-.652-.546-.563-.751-.573-.195-.01-.417-.011-.64-.011-.223 0-.585.083-.891.417-.306.334-1.167 1.14-1.167 2.783 0 1.643 1.195 3.23 1.362 3.453.167.223 2.352 3.594 5.7 5.038.797.344 1.418.55 1.902.703.799.254 1.526.218 2.101.132.641-.096 1.975-.807 2.253-1.586.278-.779.278-1.446.195-1.586-.084-.14-.306-.223-.64-.39Z"/>
      </svg>
      <span className="hidden sm:inline text-sm font-medium pr-1">Chat on WhatsApp</span>
    </a>
  )
}
