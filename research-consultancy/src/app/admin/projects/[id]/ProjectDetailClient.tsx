'use client'
import { useState } from 'react'
import { updateProject, addProjectFile, deleteProjectFile, sendProjectMessage, updateProjectStatus, updateProjectProgress } from '@/lib/actions/projects'
import { PROJECT_STATUSES } from '@/lib/types'
import FileUploadField from '@/components/FileUploadField'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProjectDetailClient({ project, files, messages }: any) {
  const [status, setStatus] = useState(project.status)
  const [progress, setProgress] = useState(project.progress_percent)
  const [newFileUrl, setNewFileUrl] = useState('')
  const [newFileName, setNewFileName] = useState('')
  const [newMessage, setNewMessage] = useState('')

  async function handleSaveDetails(formData: FormData) {
    const res = await updateProject(project.id, formData)
    if (res?.error) toast.error(res.error)
    else toast.success('Project details saved')
  }

  async function handleAddFile() {
    if (!newFileUrl || !newFileName) return toast.error('Provide a file name and upload/URL first')
    await addProjectFile(project.id, newFileName, newFileUrl, 'delivered')
    setNewFileUrl(''); setNewFileName('')
    toast.success('File added — visible to client now')
  }

  async function handleSendMessage() {
    if (!newMessage.trim()) return
    await sendProjectMessage(project.id, 'admin', newMessage)
    setNewMessage('')
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/projects" className="text-sm text-gray-500 inline-flex items-center gap-1 mb-4"><ArrowLeft size={14} /> Back to Projects</Link>
      <h1 className="font-serif text-2xl font-bold text-navy-950">{project.title}</h1>
      <p className="text-gray-500 text-sm mb-6">Client: {project.clients?.full_name} ({project.clients?.email})</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card p-4">
          <label className="label">Status</label>
          <select value={status} onChange={e => { setStatus(e.target.value); updateProjectStatus(project.id, e.target.value) }} className="input">
            {PROJECT_STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="card p-4">
          <label className="label">Progress: {progress}%</label>
          <input type="range" min={0} max={100} value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            onMouseUp={() => updateProjectProgress(project.id, progress)}
            onTouchEnd={() => updateProjectProgress(project.id, progress)}
            className="w-full" />
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h3 className="font-semibold text-navy-950 mb-4">Project Details</h3>
        <form action={handleSaveDetails} className="space-y-4">
          <input name="title" defaultValue={project.title} className="input" placeholder="Title" />
          <div className="grid md:grid-cols-2 gap-4">
            <input name="research_field" defaultValue={project.research_field || ''} className="input" placeholder="Research Field" />
            <input name="study_design" defaultValue={project.study_design || ''} className="input" placeholder="Study Design" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="service_type" defaultValue={project.service_type || ''} className="input" placeholder="Service Type" />
            <input type="hidden" name="status" value={status} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="label">Start Date</label><input name="start_date" type="date" defaultValue={project.start_date || ''} className="input" /></div>
            <div><label className="label">Deadline</label><input name="deadline" type="date" defaultValue={project.deadline || ''} className="input" /></div>
          </div>
          <input type="hidden" name="progress_percent" value={progress} />
          <textarea name="description" defaultValue={project.description || ''} rows={3} className="input" placeholder="Description" />
          <textarea name="notes" defaultValue={project.notes || ''} rows={2} className="input" placeholder="Internal Notes" />
          <button type="submit" className="btn-primary text-sm">Save Details</button>
        </form>
      </div>

      <div className="card p-6 mb-8">
        <h3 className="font-semibold text-navy-950 mb-4">Files</h3>
        <div className="space-y-2 mb-4">
          {files.map((f: any) => (
            <div key={f.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
              <a href={f.file_url} target="_blank" className="text-teal-600">{f.file_name}</a>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{f.uploaded_by} · {f.file_type}</span>
                <ConfirmDeleteButton onConfirm={() => deleteProjectFile(f.id)} />
              </div>
            </div>
          ))}
          {files.length === 0 && <p className="text-sm text-gray-400">No files yet.</p>}
        </div>
        <div className="border-t pt-4 space-y-2">
          <FileUploadField name="_new_file" label="Upload deliverable" accept="*" defaultValue="" />
          <input placeholder="File display name" value={newFileName} onChange={e => setNewFileName(e.target.value)} className="input" />
          <input placeholder="Or paste file URL here" value={newFileUrl} onChange={e => setNewFileUrl(e.target.value)} className="input" />
          <button onClick={handleAddFile} className="btn-secondary text-sm">+ Attach File to Project</button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-navy-950 mb-4">Messages / Notes</h3>
        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
          {messages.map((m: any) => (
            <div key={m.id} className={`text-sm p-2 rounded ${m.sender === 'admin' ? 'bg-teal-50 text-teal-800' : 'bg-gray-100 text-gray-700'}`}>
              <span className="font-medium capitalize">{m.sender}:</span> {m.message}
            </div>
          ))}
          {messages.length === 0 && <p className="text-sm text-gray-400">No messages yet.</p>}
        </div>
        <div className="flex gap-2">
          <input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="input" placeholder="Write a note to the client..." />
          <button onClick={handleSendMessage} className="btn-primary text-sm shrink-0">Send</button>
        </div>
      </div>
    </div>
  )
}
