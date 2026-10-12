import { createClient } from '@/lib/supabase/server'
import { SectionHeading } from '@/components/ui'
import { CheckCircle2 } from 'lucide-react'
import { getLang, localize, localizeAll } from '@/lib/lang'
import { localizeAuto, localizeAutoOne } from '@/lib/translate'
import { getDict } from '@/lib/i18n'

export const revalidate = 0

export default async function AboutPage() {
  const supabase = createClient()
  const lang = getLang()
  const t = getDict(lang)
  const { data: rawProfile } = await supabase.from('profile').select('*').single()

  if (!rawProfile) return null
  const profile = (await localizeAutoOne(rawProfile, 'profile', lang))!

  return (
    <div className="container-page section">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          {profile.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.photo_url} alt={profile.full_name} className="rounded-lg w-full aspect-square object-cover sticky top-28" />
          ) : (
            <div className="rounded-lg w-full aspect-square bg-navy-900 flex items-center justify-center text-white font-serif text-5xl sticky top-28">
              {profile.full_name?.split(' ').map((w: string) => w[0]).join('')}
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <SectionHeading eyebrow={t.about_eyebrow} title={profile.full_name} description={profile.professional_title} />
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.biography}</p>

          {profile.qualifications?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif text-xl font-bold text-navy-950 mb-4">{t.qualifications}</h3>
              <ul className="space-y-2">
                {profile.qualifications.map((q: string, i: number) => (
                  <li key={i} className="flex gap-2 text-gray-700"><CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={18} />{q}</li>
                ))}
              </ul>
            </div>
          )}

          {profile.specializations?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif text-xl font-bold text-navy-950 mb-4">{t.specializations}</h3>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((s: string, i: number) => (
                  <span key={i} className="bg-teal-50 text-teal-700 text-sm px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          {profile.research_interests?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif text-xl font-bold text-navy-950 mb-4">{t.research_interests}</h3>
              <div className="flex flex-wrap gap-2">
                {profile.research_interests.map((s: string, i: number) => (
                  <span key={i} className="bg-gray-100 text-navy-800 text-sm px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          {profile.achievements?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif text-xl font-bold text-navy-950 mb-4">{t.achievements}</h3>
              <ul className="space-y-2">
                {profile.achievements.map((a: string, i: number) => (
                  <li key={i} className="flex gap-2 text-gray-700"><CheckCircle2 className="text-gold-500 shrink-0 mt-0.5" size={18} />{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
