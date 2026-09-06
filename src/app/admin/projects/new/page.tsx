import { createClient } from '@/lib/supabase/server'
import { createProject } from '@/lib/actions/projects'
import { PROJECT_STATUSES } from '@/lib/types'

export default async function NewProjectPage({ searchParams }: { searchParams: { client?: string } }) {
  const supabase = createClient()
  const { data: clients } = await supabase.from('clients').select('id, full_name').order('full_name')

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950 mb-6">Add Project</h1>
      <form action={async (fd: FormData) => { 'use server'; await createProject(fd) }} className="space-y-5 max-w-2xl">
        <div>
          <label className="label">Client *</label>
          <select name="client_id" required defaultValue={searchParams.client || ''} className="input">
            <option value="" disabled>Select a client...</option>
            {clients?.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Project Title *</label>
          <input name="title" required className="input" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Research Field</label><input name="research_field" className="input" /></div>
          <div><label className="label">Study Design</label><input name="study_design" className="input" placeholder="Cross-sectional, RCT..." /></div>
        </div>
        <div>
          <label className="label">Service Type</label>
          <input name="service_type" className="input" placeholder="Thesis Support, Manuscript Writing..." />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Start Date</label><input name="start_date" type="date" className="input" /></div>
          <div><label className="label">Deadline</label><input name="deadline" type="date" className="input" /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Status</label>
            <select name="status" defaultValue="Consultation" className="input">
              {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div><label className="label">Progress %</label><input name="progress_percent" type="number" min={0} max={100} defaultValue={0} className="input" /></div>
        </div>
        <div><label className="label">Description</label><textarea name="description" rows={3} className="input" /></div>
        <div><label className="label">Internal Notes</label><textarea name="notes" rows={2} className="input" /></div>
        <button type="submit" className="btn-primary">Save Project</button>
      </form>
    </div>
  )
}
