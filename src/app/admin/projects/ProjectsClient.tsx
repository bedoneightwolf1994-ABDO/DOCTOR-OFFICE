'use client'
import { useState } from 'react'
import type { Project, Client } from '@/lib/types'
import { PROJECT_STATUSES } from '@/lib/types'
import { createProject, updateProjectStatus, updateProjectProgress, deleteProject } from '@/lib/actions/projects'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProjectsClient({ projects, clients }: { projects: Project[]; clients: Client[] }) {
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleCreate(formData: FormData) {
    setSubmitting(true)
    const res = await createProject(formData)
    setSubmitting(false)
    if (res?.error) toast.error(res.error)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-950">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">Assign projects to clients and update status — clients see updates instantly in their portal.</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="btn-primary text-sm py-2.5">{showForm ? 'Cancel' : '+ Add Project'}</button>
      </div>

      {showForm && clients.length === 0 && (
        <p className="text-sm text-red-600 mb-4">You need to add a client first before creating a project. Go to Admin &gt; Clients.</p>
      )}

      {showForm && clients.length > 0 && (
        <form action={handleCreate} className="card p-6 mb-8 space-y-4 max-w-2xl">
          <div>
            <label className="label">Client *</label>
            <select name="client_id" required className="input">
              {clients.map(c => <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>)}
            </select>
          </div>
          <div><label className="label">Project Title *</label><input name="title" required className="input" /></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Research Field</label><input name="research_field" className="input" /></div>
            <div><label className="label">Study Design</label><input name="study_design" className="input" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Service Type</label><input name="service_type" className="input" /></div>
            <div><label className="label">Status</label>
              <select name="status" className="input">{PROJECT_STATUSES.map(s => <option key={s}>{s}</option>)}</select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Start Date</label><input name="start_date" type="date" className="input" /></div>
            <div><label className="label">Deadline</label><input name="deadline" type="date" className="input" /></div>
          </div>
          <div><label className="label">Progress %</label><input name="progress_percent" type="number" min={0} max={100} defaultValue={0} className="input" /></div>
          <div><label className="label">Description</label><textarea name="description" rows={3} className="input" /></div>
          <div><label className="label">Notes</label><textarea name="notes" rows={2} className="input" /></div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save Project'}</button>
        </form>
      )}

      <div className="space-y-3">
        {projects.map(p => <ProjectRow key={p.id} project={p} />)}
        {projects.length === 0 && <p className="text-gray-400">No projects yet.</p>}
      </div>
    </div>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const [progress, setProgress] = useState(project.progress_percent)

  return (
    <div className="card p-5">
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <p className="font-semibold text-navy-950">{project.title}</p>
          <p className="text-sm text-gray-500">{project.clients?.full_name} · {project.research_field}</p>
          {project.deadline && <p className="text-xs text-gray-400 mt-1">Deadline: {project.deadline}</p>}
        </div>
        <div className="flex items-center gap-3">
          <select
            defaultValue={project.status}
            onChange={e => updateProjectStatus(project.id, e.target.value)}
            className="input !w-auto text-sm"
          >
            {PROJECT_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <Link href={`/admin/projects/${project.id}`} className="text-sm text-teal-600 font-medium">Manage →</Link>
          <ConfirmDeleteButton onConfirm={() => deleteProject(project.id)} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input
          type="range" min={0} max={100} value={progress}
          onChange={e => setProgress(Number(e.target.value))}
          onMouseUp={() => updateProjectProgress(project.id, progress)}
          onTouchEnd={() => updateProjectProgress(project.id, progress)}
          className="flex-1"
        />
        <span className="text-sm text-gray-500 w-10 text-right">{progress}%</span>
      </div>
    </div>
  )
}
