import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

import { cn } from '@/lib/utils'
import { robotsConfig, siteConfig } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Frank' }],
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitter,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  category: 'Technology',
  robots: robotsConfig,
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'dark bg-slate-950 text-slate-100 antialiased min-h-screen'
        )}
        suppressHydrationWarning
      >
        {plausibleDomain && (
          <Script
            strategy="afterInteractive"
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
