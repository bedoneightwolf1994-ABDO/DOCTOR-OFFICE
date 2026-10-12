'use client'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'

// Generic "delete with confirmation" button used across every admin list.
export default function ConfirmDeleteButton({ onConfirm, label = 'Delete' }: { onConfirm: () => void; label?: string }) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-sm">
        <span className="text-navy-800">Are you sure?</span>
        <button onClick={() => { onConfirm(); setConfirming(false) }} className="text-navy-800 font-semibold hover:underline">Yes, delete</button>
        <button onClick={() => setConfirming(false)} className="text-gray-500 hover:underline">Cancel</button>
      </span>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-gray-400 hover:text-navy-900" title={label}>
      <Trash2 size={16} />
    </button>
  )
}
