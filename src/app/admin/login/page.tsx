'use client'
import { useState } from 'react'
import { adminLogin } from '@/lib/actions/auth'
import toast from 'react-hot-toast'
import { ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const res = await adminLogin(formData)
    setLoading(false)
    if (res?.error) toast.error(res.error)
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-navy-900 flex items-center justify-center text-teal-400 mb-3">
            <ShieldCheck size={24} />
          </div>
          <h1 className="font-serif text-xl font-bold text-navy-950">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Dr. Abdelrahman Ahmed — Research Consultancy</p>
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
      </div>
    </div>
  )
}
