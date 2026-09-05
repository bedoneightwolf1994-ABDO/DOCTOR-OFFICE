'use client'
import { useState } from 'react'
import { clientLogin } from '@/lib/actions/auth'
import toast from 'react-hot-toast'
import { UserCircle } from 'lucide-react'

export default function ClientLoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await clientLogin(formData)
    setLoading(false)
    if (res?.error) toast.error(res.error)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white mb-3">
            <UserCircle size={24} />
          </div>
          <h1 className="font-serif text-xl font-bold text-navy-950">Client Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Track your project's progress and files</p>
        </div>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" required className="input" />
          </div>
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" required className="input" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-6">Don't have login access yet? Contact Dr. Abdelrahman to set up your portal account.</p>
      </div>
    </div>
  )
}
