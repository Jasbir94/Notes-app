import './globals.css'

export const metadata = {
  title: 'Notes App',
  description: 'Simple CRUD notes app with Next.js and MongoDB',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 text-gray-900">
        <header className="flex items-center justify-center mb-6 relative">
          <div className="absolute -top-8 -left-8 opacity-30 pointer-events-none animate-float animate-rotate-slow">
            <svg width="220" height="220" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
              </defs>
              <path fill="url(#g1)" d="M43.4,-63.8C56.9,-57.3,69.6,-47.3,75.9,-34.3C82.1,-21.3,82,-5.2,78.3,8.3C74.6,21.8,67.3,33.8,57.4,44.2C47.5,54.6,35.1,63.4,21.1,67.8C7.1,72.2,-8.4,72.3,-22.5,68.3C-36.7,64.3,-49.6,56.3,-58.7,44.6C-67.8,32.9,-73.1,17.5,-74.4,1.1C-75.7,-15.3,-73,-31.7,-63.7,-43.4C-54.5,-55.1,-38.6,-62.1,-22.9,-66.8C-7.1,-71.5,8.4,-73.8,23.3,-70.7C38.2,-67.6,52.6,-59.2,43.4,-63.8Z" transform="translate(100 100)"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Notes</h1>
            <p className="mt-1 text-2xl md:text-3xl font-extrabold uppercase">NOTES</p>
          </div>
        </header>

        <main className="min-h-screen max-w-4xl mx-auto p-4 relative">
          <div className="absolute -bottom-14 -right-10 opacity-20 pointer-events-none animate-float">
            <svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g2" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <path fill="url(#g2)" d="M40.2,-62.7C52.8,-55.9,64.5,-47.5,71.6,-36.9C78.7,-26.4,81.3,-13.2,79.5,-0.2C77.7,12.8,71.4,25.6,62.1,36.1C52.8,46.6,40.5,54.9,27.1,60.3C13.6,65.7,-0.2,68.1,-12.8,66.1C-25.4,64.1,-37.7,57.8,-46.7,48.3C-55.6,38.8,-61.3,26.9,-65.2,13.9C-69,-0.1,-71,-15.3,-64.8,-27.6C-58.5,-40,-44,-49.5,-30.9,-57.2C-17.8,-64.9,-8.9,-70.8,3.1,-75C15.1,-79.2,30.3,-81.4,40.2,-62.7Z" transform="translate(100 100)"/>
            </svg>
          </div>
          {children}
        </main>
        
      </body>
    </html>
  )
}
