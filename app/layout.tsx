import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono, Crimson_Pro, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

import { cn } from '@/lib/utils'
import { robotsConfig, siteConfig } from '@/lib/seo'
import NavigationMega from '@/components/NavigationMega'
import Footer from '@/components/Footer'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'
import SessionProvider from '@/components/providers/SessionProvider'

// =============================================================================
// FRANKX TYPOGRAPHY SYSTEM - APPROVED CONFIGURATION
// =============================================================================
// DO NOT CHANGE without explicit approval. Font choices are part of brand identity.
//
// Current Stack:
// - Inter: Primary body & UI font (clean, professional, excellent readability)
// - Playfair Display: Serif/italic for editorial emphasis and quotes
// - Crimson Pro: Premium book reading experience (long-form content)
// - Cormorant Garamond: Elegant display headlines for Golden Age
// - JetBrains Mono: Code blocks and technical content
//
// Last approved: 2026-01-23
// =============================================================================

// Inter - Primary font for body text and UI (industry standard, excellent readability)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

// Playfair Display - Elegant serif for editorial touches, quotes, and italic emphasis
// Similar to premium sites like AI Advantage (Aeonik Pro + Roboto Italic)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

// Crimson Pro - Premium reading font for long-form book content
// Optimized for readability at small sizes, similar to Kindle/Medium
const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-reading',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
})

// Cormorant Garamond - Elegant display font for Golden Age headlines
// High contrast, sophisticated, editorial quality
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

// JetBrains Mono - Monospace for code blocks and technical content
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
          playfair.variable,
          crimsonPro.variable,
          cormorant.variable,
          jetbrains.variable,
          'font-sans dark bg-void text-white antialiased min-h-screen overflow-x-hidden'
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
