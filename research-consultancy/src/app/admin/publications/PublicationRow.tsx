'use client'
import Link from 'next/link'
import { Pencil, Eye, EyeOff } from 'lucide-react'
import type { Publication } from '@/lib/types'
import { deletePublication, togglePublicationPublish } from '@/lib/actions/publications'
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton'

export default function PublicationRow({ item }: { item: Publication }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-navy-900">{item.title}{item.is_featured && <span className="ml-2 text-xs text-gold-500">★</span>}</td>
      <td className="px-4 py-3 text-gray-500">{item.journal}</td>
      <td className="px-4 py-3 text-gray-500">{item.year}</td>
      <td className="px-4 py-3">
        <button onClick={() => togglePublicationPublish(item.id, !item.is_published)}
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${item.is_published ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
          {item.is_published ? <Eye size={12} /> : <EyeOff size={12} />} {item.is_published ? 'Published' : 'Hidden'}
        </button>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end items-center gap-3">
          <Link href={`/admin/publications/${item.id}`} className="text-gray-400 hover:text-teal-600"><Pencil size={16} /></Link>
          <ConfirmDeleteButton onConfirm={() => deletePublication(item.id)} />
        </div>
      </td>
    </tr>
  )
}
