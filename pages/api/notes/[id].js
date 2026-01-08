const dbConnect = require('../../../lib/mongodb')
const Note = require('../../../models/Note')

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MONGODB_URI is not configured. Set .env.local and restart the server.' })
  }
  await dbConnect()
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const note = await Note.findById(id)
      if (!note) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(note)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch note' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, content } = req.body
      const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true })
      if (!note) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(note)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update note' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const note = await Note.findByIdAndDelete(id)
      if (!note) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json({ message: 'Deleted' })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete' })
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
