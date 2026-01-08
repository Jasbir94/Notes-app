# Notes App

Simple CRUD Notes application using Next.js (App Router), MongoDB (Mongoose), Tailwind CSS, and JavaScript.

## Features
- Create, read, update, delete notes
- Notes have `title`, `content`, and `createdAt`
- REST API endpoints under `pages/api/notes`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file from example and set your MongoDB URI:

```bash
cp .env.example .env.local
# edit .env.local and set MONGODB_URI
```

3. Run dev server:

```bash
npm run dev
```

Open http://localhost:3000

## API Routes
- `GET /api/notes` - list notes
- `POST /api/notes` - create note
- `GET /api/notes/:id` - get single note
- `PUT /api/notes/:id` - update note
- `DELETE /api/notes/:id` - delete note

## Notes
- The MongoDB connection string is read from `process.env.MONGODB_URI`.
- Mongoose models and DB connection are in `models/` and `lib/mongodb.js`.
