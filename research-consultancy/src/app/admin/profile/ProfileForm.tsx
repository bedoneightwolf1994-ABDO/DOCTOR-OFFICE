'use client'
import { useState } from 'react'
import { updateProfile } from '@/lib/actions/profile'
import FileUploadField from '@/components/FileUploadField'
import toast from 'react-hot-toast'

export default function ProfileForm({ profile }: { profile: any }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    const res = await updateProfile(formData)
    setSubmitting(false)
    if (res?.error) toast.error(res.error)
    else toast.success('Profile updated — homepage & about page reflect this now.')
  }

  return (
    <form action={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="label">Full Name</label><input name="full_name" defaultValue={profile?.full_name} className="input" /></div>
        <div><label className="label">Professional Title</label><input name="professional_title" defaultValue={profile?.professional_title} className="input" /></div>
      </div>
      <div><label className="label">Biography</label><textarea name="biography" rows={6} defaultValue={profile?.biography} className="input" /></div>
      <div><label className="label">Academic Qualifications (comma-separated)</label><input name="qualifications" defaultValue={profile?.qualifications?.join(', ')} className="input" /></div>
      <div><label className="label">Specializations (comma-separated)</label><input name="specializations" defaultValue={profile?.specializations?.join(', ')} className="input" /></div>
      <div><label className="label">Research Interests (comma-separated)</label><input name="research_interests" defaultValue={profile?.research_interests?.join(', ')} className="input" /></div>
      <div><label className="label">Years of Experience</label><input name="experience_years" type="number" defaultValue={profile?.experience_years} className="input w-32" /></div>
      <div><label className="label">Achievements (comma-separated)</label><input name="achievements" defaultValue={profile?.achievements?.join(', ')} className="input" /></div>
      <FileUploadField name="photo_url" label="Profile Photo" accept="image/*" defaultValue={profile?.photo_url || ''} />
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="label">Email</label><input name="email" defaultValue={profile?.email || ''} className="input" /></div>
        <div><label className="label">Phone</label><input name="phone" defaultValue={profile?.phone || ''} className="input" /></div>
      </div>
      <div><label className="label">WhatsApp</label><input name="whatsapp" defaultValue={profile?.whatsapp || ''} className="input" /></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="label">LinkedIn URL</label><input name="linkedin_url" defaultValue={profile?.linkedin_url || ''} className="input" /></div>
        <div><label className="label">Twitter/X URL</label><input name="twitter_url" defaultValue={profile?.twitter_url || ''} className="input" /></div>
        <div><label className="label">ResearchGate URL</label><input name="researchgate_url" defaultValue={profile?.researchgate_url || ''} className="input" /></div>
        <div><label className="label">ORCID URL</label><input name="orcid_url" defaultValue={profile?.orcid_url || ''} className="input" /></div>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Profile'}</button>
    </form>
  )
}
