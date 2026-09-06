import ServiceForm from '@/components/ServiceForm'
import { createService } from '@/lib/actions/services'

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Add Service</h1>
      <ServiceForm action={createService} />
    </div>
  )
}
