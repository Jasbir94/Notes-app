"use client"

import { useState } from 'react'

export default function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      if (!res.ok) throw new Error('Failed to create note')
      const data = await res.json()
      setTitle('')
      setContent('')
      onCreate && onCreate(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 note-card card-shadow animate-pop">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Short, descriptive title" className="form-input" required />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your note here..." className="form-input h-36" required />
      </div>

      <div className="flex items-center justify-between">
        {error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm text-gray-500">Tips: Keep notes short and focused.</p>}
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
      </div>
    </form>
  )
}
