import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Hing Chiang - About My Previous Years',
  description: 'What I have done in the past years (What built me)',
  keywords: ['Hing Chiang', 'Previous years', 'Work experience', 'Education', 'Skills', 'Resume'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}