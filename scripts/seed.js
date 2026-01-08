const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

// Load MONGODB_URI from .env.local if present
function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) return
  const buffer = fs.readFileSync(envPath)
  let content = buffer.toString('utf8')
  // If file looks like UTF-16 (lots of nulls), decode as utf16le
  if (content.indexOf('\u0000') !== -1) {
    content = buffer.toString('utf16le')
  }
  content.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^MONGODB_URI\s*=\s*(.+)$/)
    if (m) {
      let val = m[1].trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      process.env.MONGODB_URI = val
    }
  })
}

loadEnvLocal()
const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('MONGODB_URI is not set. Ensure .env.local contains MONGODB_URI and try again.')
  process.exit(1)
}

async function run() {
  try {
    await mongoose.connect(uri, { bufferCommands: false })
    // Use the app's model so schema stays consistent
    const Note = require('../models/Note')

    const samples = [
      { title: 'Welcome', content: 'This is your first note.' },
      { title: 'Todo', content: 'Buy groceries\nCall mom\nFinish project' },
      { title: 'Ideas', content: 'Try a dark mode for the notes app.' },
    ]

    const res = await Note.insertMany(samples)
    console.log(`Inserted ${res.length} documents into Atlas.`)
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Failed to seed database:', err.message || err)
    process.exit(1)
  }
}

run()
