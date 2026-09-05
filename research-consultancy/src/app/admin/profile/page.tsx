import { createClient } from '@/lib/supabase/server'
import ProfileForm from './ProfileForm'

export const revalidate = 0

export default async function AdminProfilePage() {
  const supabase = createClient()
  const { data: profile } = await supabase.from('profile').select('*').single()

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-1">Profile</h1>
      <p className="text-gray-500 text-sm mb-6">This information powers your Home and About pages automatically.</p>
      <ProfileForm profile={profile} />
    </div>
  )
}
