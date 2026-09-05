import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PROJECT_STATUSES } from '@/lib/types'
import ClientMessageBox from './ClientMessageBox'
import { CheckCircle2, Clock, FileText, Download } from 'lucide-react'

export const revalidate = 0

export default async function ClientDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/client/login')

  // RLS ensures this client row (and everything joined below) can only ever
  // be THIS client's own data — no other client's project is reachable here.
  const { data: client } = await supabase.from('clients').select('*').eq('auth_user_id', user.id).single()
  if (!client) redirect('/client/login')

  const { data: projects } = await supabase.from('projects').select('*').eq('client_id', client.id).order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy-950">Welcome, {client.full_name}</h1>
      <p className="text-gray-500 mb-8">Here's the current status of your project{projects && projects.length > 1 ? 's' : ''}.</p>

      {(!projects || projects.length === 0) && (
        <div className="card p-8 text-center text-gray-500">No projects assigned to your account yet.</div>
      )}

      <div className="space-y-8">
        {projects?.map(p => <ProjectPanel key={p.id} project={p} />)}
      </div>
    </div>
  )
}

async function ProjectPanel({ project }: { project: any }) {
  const supabase = createClient()
  const [{ data: files }, { data: messages }] = await Promise.all([
    supabase.from('project_files').select('*').eq('project_id', project.id).order('created_at', { ascending: false }),
    supabase.from('project_messages').select('*').eq('project_id', project.id).order('created_at'),
  ])

  const statusIndex = PROJECT_STATUSES.indexOf(project.status)

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <p className="text-sm text-teal-600 font-semibold uppercase tracking-wide">Project</p>
          <h2 className="font-serif text-xl font-bold text-navy-950">{project.title}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="font-semibold text-navy-900">{project.status}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Progress</span><span>{project.progress_percent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div className="bg-teal-500 h-2.5 rounded-full transition-all" style={{ width: `${project.progress_percent}%` }} />
        </div>
      </div>

      {/* Status timeline */}
      <div className="mt-6 flex flex-wrap gap-2">
        {PROJECT_STATUSES.map((s, i) => (
          <span key={s} className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${
            i < statusIndex ? 'bg-teal-50 text-teal-700' : i === statusIndex ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {i <= statusIndex && <CheckCircle2 size={12} />} {s}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">
        {project.start_date && <div className="flex items-center gap-2 text-gray-600"><Clock size={16} className="text-teal-600" /> Start: {project.start_date}</div>}
        {project.deadline && <div className="flex items-center gap-2 text-gray-600"><Clock size={16} className="text-teal-600" /> Deadline: {project.deadline}</div>}
      </div>

      {project.description && <p className="text-gray-600 text-sm mt-4">{project.description}</p>}

      {/* Files */}
      <div className="mt-6 border-t pt-6">
        <h3 className="font-semibold text-navy-950 mb-3 flex items-center gap-2"><FileText size={16} /> Files</h3>
        <div className="space-y-2">
          {files?.map((f: any) => (
            <a key={f.id} href={f.file_url} target="_blank" className="flex items-center justify-between text-sm border border-gray-100 rounded p-2 hover:bg-gray-50">
              <span>{f.file_name} <span className="text-xs text-gray-400">({f.file_type})</span></span>
              <Download size={14} className="text-teal-600" />
            </a>
          ))}
          {(!files || files.length === 0) && <p className="text-sm text-gray-400">No files shared yet.</p>}
        </div>
      </div>

      {/* Messages */}
      <div className="mt-6 border-t pt-6">
        <h3 className="font-semibold text-navy-950 mb-3">Messages</h3>
        <ClientMessageBox projectId={project.id} initialMessages={messages || []} />
      </div>
    </div>
  )
}
