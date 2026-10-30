import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata, Viewport } from 'next'
import Atlas from '@/components/globe/Atlas'

const title = 'Atlas — Explore the World'
const description =
  'A hand-drawn, trilingual 3D globe for curious minds. Spin the Earth, meet 48 countries in English, German, or Croatian, play "Find the country," and hear place names spoken aloud.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'interactive globe',
    'world atlas for kids',
    'trilingual geography',
    'learn countries',
    'canvas globe',
    'educational map',
  ],
  alternates: {
    canonical: `${siteConfig.url}/globe`,
    languages: {
      en: `${siteConfig.url}/globe`,
      de: `${siteConfig.url}/erde`,
      hr: `${siteConfig.url}/svijet`,
      'x-default': `${siteConfig.url}/globe`,
    },
  },
  openGraph: {
    images: defaultOpenGraphImages,
    title,
    description,
    url: `${siteConfig.url}/globe`,
    siteName: 'FrankX',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['de_DE', 'hr_HR'],
  },
  twitter: {
    images: defaultTwitterImages,
    card: 'summary_large_image',
    title,
    description,
  },
  other: {
    'theme-color': '#efe8d6',
  },
}

export const viewport: Viewport = {
  themeColor: '#efe8d6',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function GlobePage() {
  return <Atlas defaultLang="en" backHref="/" backLabel="← frankx.ai" />
}
