import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from 'next/script'

import { cn } from '@/lib/utils'
import { robotsConfig, siteConfig } from '@/lib/seo'
import Navigation2025 from '@/components/Navigation2025'
import Footer2025 from '@/components/Footer2025'

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
  themeColor: '#030712',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={cn(
          'font-sans dark bg-[#030712] text-white antialiased min-h-screen'
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
        <Navigation2025 />
        {children}
        <Footer2025 />
      </body>
    </html>
  )
}
