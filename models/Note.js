const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)
