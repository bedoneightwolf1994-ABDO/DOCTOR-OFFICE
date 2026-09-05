import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PortfolioForm from '@/components/PortfolioForm'
import { updatePortfolioProject } from '@/lib/actions/portfolio'

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: item } = await supabase.from('portfolio_projects').select('*').eq('id', params.id).single()
  if (!item) return notFound()

  const updateWithId = updatePortfolioProject.bind(null, params.id)

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Edit Portfolio Project</h1>
      <PortfolioForm item={item} action={updateWithId} />
    </div>
  )
}
