import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'

/**
 * Route-segment layout for Ikigai V1 (formerly V4 — composed canonical).
 *
 * V1 is the single preserved archive of the design-thinking-composed
 * workshop preview. Kept for reference, unlinked from canonical, noindex
 * so it doesn't compete with the canonical workshop URL in search.
 *
 * Scopes Noto Serif JP for the kanji typography. The page below stays
 * 'use client' for Framer Motion + IntersectionObserver.
 */

const notoSerifJP = Noto_Serif_JP({
  weight: ['200', '400'],
  variable: '--font-jp-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Ikigai V1 Archive · FrankX',
  description:
    'V1 archive of the Ikigai & Branding workshop — the design-thinking-composed reference version. Canonical workshop lives at /workshops/ikigai-branding.',
  alternates: {
    canonical: '/workshops/ikigai-branding',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Ikigai V1 Archive · FrankX',
    description:
      'Design-thinking-composed reference. The live workshop is at /workshops/ikigai-branding.',
    images: [
      {
        url: '/images/workshops/ikigai-branding/v4-hero-variant-1.jpg',
        width: 2560,
        height: 1440,
        alt: 'Ikigai workshop — sumi-e ink brushstroke on dark glass',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikigai V1 Archive',
    description: 'Design-thinking-composed reference. Live workshop at /workshops/ikigai-branding.',
  },
}

export default function IkigaiV1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={notoSerifJP.variable}>{children}</div>
}
