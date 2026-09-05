import PublicationForm from '@/components/PublicationForm'
import { createPublication } from '@/lib/actions/publications'

export default function NewPublicationPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Add Publication</h1>
      <PublicationForm action={createPublication} />
    </div>
  )
}
