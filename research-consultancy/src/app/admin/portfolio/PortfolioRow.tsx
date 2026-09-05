'use client'
import Link from 'next/link'
import { Pencil, Eye, EyeOff, Lock, Globe } from 'lucide-react'
import type { PortfolioProject } from '@/lib/types'
import { deletePortfolioProject, togglePortfolioPublish, togglePortfolioVisibility } from '@/lib/actions/portfolio'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'

export default function PortfolioRow({ item }: { item: PortfolioProject }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-navy-900">{item.title}{item.is_featured && <span className="ml-2 text-xs text-gold-500">★ Featured</span>}</td>
      <td className="px-4 py-3 text-gray-500">{item.category}</td>
      <td className="px-4 py-3 text-gray-500">{item.year}</td>
      <td className="px-4 py-3">
        <button onClick={() => togglePortfolioVisibility(item.id, item.visibility === 'public' ? 'private' : 'public')}
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${item.visibility === 'public' ? 'bg-teal-50 text-teal-700' : 'bg-gray-100 text-gray-600'}`}>
          {item.visibility === 'public' ? <Globe size={12} /> : <Lock size={12} />} {item.visibility}
        </button>
      </td>
      <td className="px-4 py-3">
        <button onClick={() => togglePortfolioPublish(item.id, !item.is_published)}
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${item.is_published ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
          {item.is_published ? <Eye size={12} /> : <EyeOff size={12} />} {item.is_published ? 'Published' : 'Draft'}
        </button>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end items-center gap-3">
          <Link href={`/admin/portfolio/${item.id}`} className="text-gray-400 hover:text-teal-600"><Pencil size={16} /></Link>
          <ConfirmDeleteButton onConfirm={() => deletePortfolioProject(item.id)} />
        </div>
      </td>
    </tr>
  )
}
