"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function NoteCard({ note, onDelete, onUpdate }) {
  const [deleting, setDeleting] = useState(false)
  const handleDelete = async () => {
    if (!confirm('Delete this note?')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/notes/${note._id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      onDelete && onDelete(note._id)
    } catch (err) {
      alert(err.message)
    } finally {
      setDeleting(false)
    }
  }

  // colorful accent palettes
  const palettes = [
    'from-pink-50 to-pink-100 text-pink-700',
    'from-rose-50 to-rose-100 text-rose-700',
    'from-indigo-50 to-indigo-100 text-indigo-700',
    'from-green-50 to-green-100 text-green-700',
    'from-yellow-50 to-yellow-100 text-yellow-700'
  ]

  const idx = note && note._id ? note._id.charCodeAt(0) % palettes.length : 0

  return (
    <article className="note-card card-shadow hover:shadow-2xl transition-shadow duration-200 transform-gpu hover:-translate-y-1 hover:scale-105 animate-pop">
      <div className={`-mx-4 -mt-4 mb-3 h-2 rounded-t-2xl bg-gradient-to-r ${palettes[idx]}`} />
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-lg text-gray-900">{note.title}</h3>
        <div className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</div>
      </div>

      <p className="text-sm text-gray-700 mt-3 max-h-28 overflow-hidden">{note.content}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/edit/${note._id}`} className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
            </svg>
            Edit
          </Link>
        </div>

        <button onClick={handleDelete} disabled={deleting} className="btn btn-danger">
          {deleting ? (
            'Deleting...'
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </article>
  )
}
