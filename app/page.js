"use client"

import { useEffect, useState } from 'react'
import NoteForm from '../components/NoteForm'
import NoteCard from '../components/NoteCard'

export default function Home() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNotes = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/notes')
      if (!res.ok) throw new Error('Failed to fetch notes')
      const data = await res.json()
      setNotes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleCreate = (note) => {
    setNotes(prev => [note, ...prev])
  }

  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n._id !== id))
  }

  const handleUpdate = (updated) => {
    setNotes(prev => prev.map(n => n._id === updated._id ? updated : n))
  }

  return (
    <div>
      <section className="mb-6">
        <NoteForm onCreate={handleCreate} />
      </section>

      <section>
        {loading && <p className="text-gray-600">Loading notes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div>
            {notes.length === 0 && <div className="text-center text-gray-500 py-12">No notes yet — write your first one above.</div>}
            <div className="notes-grid">
              {notes.map(note => (
                <NoteCard key={note._id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
