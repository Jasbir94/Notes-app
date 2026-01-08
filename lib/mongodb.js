const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  // Don't throw here so the dev server can compile without a DB configured.
  // API handlers that actually need the DB will fail at runtime if they try to connect.
  console.warn('Warning: MONGODB_URI is not set. Database connection will be skipped.')
}

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null, promise: null }

async function dbConnect() {
  if (!MONGODB_URI) {
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

module.exports = dbConnect
