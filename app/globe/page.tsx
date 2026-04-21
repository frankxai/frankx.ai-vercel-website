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
    canonical: 'https://frankx.ai/globe',
    languages: {
      en: 'https://frankx.ai/globe',
      de: 'https://frankx.ai/erde',
      hr: 'https://frankx.ai/svijet',
      'x-default': 'https://frankx.ai/globe',
    },
  },
  openGraph: {
    title,
    description,
    url: 'https://frankx.ai/globe',
    siteName: 'FrankX',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['de_DE', 'hr_HR'],
  },
  twitter: {
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
