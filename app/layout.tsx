import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { robotsConfig, siteConfig } from '@/lib/seo'
import NavigationMega from '@/components/NavigationMega'
import Footer from '@/components/Footer'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'
import SessionProvider from '@/components/providers/SessionProvider'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { CursorSpotlight } from '@/components/ui/CursorSpotlight'

// Inter as primary sans-serif (geometric, variable weight, screen-optimized)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Poppins for display headings (≥18px only per brand guidelines)
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['600', '700', '800'],
})

// Playfair Display for editorial touches (italic quotes only per brand)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
})

// JetBrains Mono for code/technical elements
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
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
  viewportFit: 'cover', // Support for iPhone notch/safe areas
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
          poppins.variable,
          playfair.variable,
          jetbrains.variable,
          'font-sans dark bg-[#0a0a0b] text-white antialiased min-h-screen overflow-x-hidden'
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
          <ScrollProgress />
          <CursorSpotlight />
          <NavigationMega />
          <div id="main" className="min-h-screen overflow-x-hidden">
            {children}
          </div>
          <Footer />
          <Analytics />
          <SpeedInsights />
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          )}
        </SessionProvider>
      </body>
    </html >
  )
}
