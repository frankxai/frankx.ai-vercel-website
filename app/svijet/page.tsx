import type { Metadata, Viewport } from 'next'
import Atlas from '@/components/globe/Atlas'

const title = 'Atlas — Istraži svijet'
const description =
  'Ručno crtani, trojezični 3D globus za znatiželjne umove. Zavrti Zemlju, upoznaj 48 država na hrvatskom, njemačkom ili engleskom, igraj "Pronađi državu" i čuj kako se nazivi mjesta izgovaraju.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'interaktivni globus',
    'svjetski atlas za djecu',
    'trojezična geografija',
    'upoznavanje država',
    'canvas globus',
    'obrazovna karta',
  ],
  alternates: {
    canonical: 'https://frankx.ai/svijet',
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
    url: 'https://frankx.ai/svijet',
    siteName: 'FrankX',
    type: 'website',
    locale: 'hr_HR',
    alternateLocale: ['en_US', 'de_DE'],
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

export default function SvijetPage() {
  return <Atlas defaultLang="hr" backHref="/" backLabel="← frankx.ai" />
}
