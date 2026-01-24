import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

import { cn } from '@/lib/utils'
import { robotsConfig, siteConfig } from '@/lib/seo'
import NavigationMega from '@/components/NavigationMega'
import Footer from '@/components/Footer'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'
import SessionProvider from '@/components/providers/SessionProvider'

// Inter as THE primary font - used everywhere (locked, do not change)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

// JetBrains Mono for code/technical elements only
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Frank' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
}

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        <link rel="alternate" hrefLang="en" href="https://frankx.ai" />
        <link rel="alternate" hrefLang="x-default" href="https://frankx.ai" />
      </head>
      <body
        className={cn(
          inter.variable,
          jetbrains.variable,
          'font-sans dark bg-[#030712] text-white antialiased min-h-screen overflow-x-hidden'
        )}
        suppressHydrationWarning
      >
        <SessionProvider>
          <OrganizationJsonLd />
          {plausibleDomain && (
            <Script
              strategy="afterInteractive"
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.js"
            />
          )}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded z-[100]"
          >
            Skip to content
          </a>
          <NavigationMega />
          <div id="main" className="min-h-screen overflow-x-hidden">
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html >
  )
}
