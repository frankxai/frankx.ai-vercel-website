import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frank - Conscious AI for Creators, Families & Professionals',
  description: 'Transform from Tech-Overwhelmed to AI-Empowered. Learn to use AI as a tool for soul expression, not soul replacement.',
  keywords: ['AI', 'Music Production', 'Suno', 'Conscious Creator', 'Soul-Aligned AI'],
  authors: [{ name: 'Frank' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg'
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml'
    }
  },
  openGraph: {
    title: 'Frank - Conscious AI Systems',
    description: 'Become a Conscious AI Creator',
    url: 'https://frank.ai',
    siteName: 'Frank',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {plausibleDomain && (
          <Script
            strategy="afterInteractive"
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
