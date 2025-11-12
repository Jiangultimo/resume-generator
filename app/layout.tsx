import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import '@/styles/globals.css'
import { I18nProvider } from '@/context/i18n'

const quicksand = Quicksand({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand'
})

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
    <html lang="en" className={quicksand.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={quicksand.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}