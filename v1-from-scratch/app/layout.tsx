import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Frank | Musician + AI Architect',
    template: '%s | Frank'
  },
  description: 'Personal site of Frank - Musician since 5, AI Architect at Oracle, creating with Suno, sharing everything I learn.',
  keywords: ['AI', 'music', 'Suno', 'agentic AI', 'Oracle', 'musician', 'guitar', 'piano'],
  authors: [{ name: 'Frank' }],
  creator: 'Frank',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frankx.ai',
    siteName: 'Frank',
    title: 'Frank | Musician + AI Architect',
    description: 'Musician since 5, AI Architect at Oracle, creating with Suno, sharing everything I learn.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frank | Musician + AI Architect',
    description: 'Musician since 5, AI Architect at Oracle, creating with Suno, sharing everything I learn.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
