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
  metadataBase: new URL('https://hi.sparkify.me'),
  title: {
    default: 'Zhengxing Jiang (蒋正兴) - Full-Stack Engineer',
    template: '%s | Zhengxing Jiang'
  },
  description: '9 years of full-stack development experience. Former Tech Lead at AI startup. Specialized in AI/LLM applications, React, Next.js, Node.js, Python. Available for full-time/remote opportunities.',
  keywords: [
    'Zhengxing Jiang',
    '蒋正兴',
    'Full-Stack Developer',
    'Software Engineer',
    'LLM',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Remote Work',
    'Tech Lead',
    'RAG',
    'LangChain',
    'AI Applications',
    'Chongqing',
    'China'
  ],
  authors: [{ name: 'Zhengxing Jiang', url: 'https://hi.sparkify.me' }],
  creator: 'Zhengxing Jiang',
  publisher: 'Zhengxing Jiang',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    url: 'https://hi.sparkify.me',
    siteName: 'Zhengxing Jiang - Resume',
    title: 'Zhengxing Jiang - Full-Stack Engineer',
    description: '9 years of full-stack development experience. Specialized in AI/LLM applications, React, Next.js, Node.js, Python.',
    images: [
      {
        url: '/avatar.jpg',
        width: 400,
        height: 400,
        alt: 'Zhengxing Jiang',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Zhengxing Jiang - Full-Stack Engineer',
    description: '9 years of full-stack development experience. Specialized in AI/LLM applications.',
    images: ['/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // 添加 Google Search Console 验证码
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://hi.sparkify.me',
    languages: {
      'en': 'https://hi.sparkify.me?lang=en',
      'zh-CN': 'https://hi.sparkify.me?lang=cn',
    },
  },
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