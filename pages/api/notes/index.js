const dbConnect = require('../../../lib/mongodb')
const Note = require('../../../models/Note')

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MONGODB_URI is not configured. Set .env.local and restart the server.' })
  }
  await dbConnect()

  if (req.method === 'GET') {
    try {
      const notes = await Note.find().sort({ createdAt: -1 })
      return res.status(200).json(notes)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch notes' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, content } = req.body
      if (!title || !content) return res.status(400).json({ error: 'Missing fields' })
      const note = await Note.create({ title, content })
      return res.status(201).json(note)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create note' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
