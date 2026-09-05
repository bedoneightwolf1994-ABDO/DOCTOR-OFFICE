import PortfolioForm from '@/components/PortfolioForm'
import { createPortfolioProject } from '@/lib/actions/portfolio'

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Add Portfolio Project</h1>
      <PortfolioForm action={createPortfolioProject} />
    </div>
  )
}
