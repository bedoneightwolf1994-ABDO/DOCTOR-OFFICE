import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PublicationForm from '@/components/PublicationForm'
import { updatePublication } from '@/lib/actions/publications'

export default async function EditPublicationPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: item } = await supabase.from('publications').select('*').eq('id', params.id).single()
  if (!item) return notFound()
  const updateWithId = updatePublication.bind(null, params.id)
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Edit Publication</h1>
      <PublicationForm item={item} action={updateWithId} />
    </div>
  )
}
