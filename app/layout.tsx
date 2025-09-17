import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'FrankX Intelligence Hub',
    template: '%s | FrankX'
  },
  description:
    'FrankX equips creators, families, and executives with conscious AI strategy, Suno-powered creativity, and enterprise-ready systems.',
  keywords: [
    'conscious ai',
    'ai strategy',
    'soul frequency',
    'ai music',
    'ai governance',
    'ai for families'
  ],
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
    title: 'FrankX Intelligence Hub',
    description:
      'Global AI voice sharing updates, resources, and programs for conscious intelligence.',
    url: 'https://frankx.ai',
    siteName: 'FrankX',
    locale: 'en_US',
    type: 'website'
  }
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
