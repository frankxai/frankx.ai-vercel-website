import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata, Viewport } from 'next'
import Atlas from '@/components/globe/Atlas'

const title = 'Atlas — Entdecke die Welt'
const description =
  'Ein handgezeichneter, dreisprachiger 3D-Globus für neugierige Köpfe. Dreh die Erde, lerne 48 Länder auf Deutsch, Englisch oder Kroatisch kennen, spiel "Finde das Land" und hör, wie Ortsnamen ausgesprochen werden.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'interaktiver globus',
    'weltatlas für kinder',
    'dreisprachige geografie',
    'länder lernen',
    'canvas globus',
    'lehrkarte',
  ],
  alternates: {
    canonical: `${siteConfig.url}/erde`,
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
    url: `${siteConfig.url}/erde`,
    siteName: 'FrankX',
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_US', 'hr_HR'],
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

export default function ErdePage() {
  return <Atlas defaultLang="de" backHref="/" backLabel="← frankx.ai" />
}
