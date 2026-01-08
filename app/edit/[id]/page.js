"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPage({ params }) {
  const { id } = params
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/notes/${id}`)
        if (!res.ok) throw new Error('Failed to load note')
        const data = await res.json()
        setTitle(data.title)
        setContent(data.content)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      if (!res.ok) throw new Error('Failed to update')
      router.push('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-2xl card-shadow">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="w-full p-3 border border-gray-200 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm" disabled={loading}>Save</button>
          <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={() => router.push('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
