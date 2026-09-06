'use client'
import { useState } from 'react'
import { sendProjectMessage } from '@/lib/actions/projects'

export default function ClientMessageBox({ projectId, initialMessages }: { projectId: string; initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSend() {
    if (!text.trim()) return
    setSending(true)
    await sendProjectMessage(projectId, 'client', text)
    setMessages(m => [...m, { id: crypto.randomUUID(), sender: 'client', message: text, created_at: new Date().toISOString() }])
    setText('')
    setSending(false)
  }

  return (
    <div>
      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {messages.map(m => (
          <div key={m.id} className={`text-sm p-2 rounded max-w-[85%] ${m.sender === 'client' ? 'bg-teal-50 text-teal-800 ml-auto' : 'bg-gray-100 text-gray-700'}`}>
            <span className="font-medium capitalize">{m.sender === 'client' ? 'You' : 'Dr. Abdelrahman'}:</span> {m.message}
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-gray-400">No messages yet. Send a note or ask a question below.</p>}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} className="input" placeholder="Write a message or revision request..." />
        <button onClick={handleSend} disabled={sending} className="btn-primary text-sm shrink-0">{sending ? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
