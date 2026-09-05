import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ServiceForm from '@/components/ServiceForm'
import { updateService } from '@/lib/actions/services'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: item } = await supabase.from('services').select('*').eq('id', params.id).single()
  if (!item) return notFound()
  const updateWithId = updateService.bind(null, params.id)
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Edit Service</h1>
      <ServiceForm item={item} action={updateWithId} />
    </div>
  )
}
