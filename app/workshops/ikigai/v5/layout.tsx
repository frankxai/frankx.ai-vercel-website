import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'

/**
 * Route-segment layout for Ikigai V5 — Editorial Magazine.
 *
 * V5 thesis: less is more. The workshop is a long-form essay you walk
 * through with your AI, not a product page. Single-column reading width,
 * generous whitespace, restrained accent, the Venn diagram as the visual
 * anchor (not a tool catalog).
 *
 * Owns:
 *   1. Per-route metadata + OG image
 *   2. Scoped Noto Serif JP with preload=true
 *   3. Canonical → V1 (V5 is iteration, not yet promoted)
 */

const notoSerifJP = Noto_Serif_JP({
  weight: ['200', '400'],
  variable: '--font-jp-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Ikigai V5 — Editorial Magazine · Workshop',
  description:
    'The Venn, the masters, the AI, the practice. Ten chapters of long-form work with your AI as peer collaborator. Mobile-first reading, generous whitespace, restraint over feature stacking.',
  alternates: {
    canonical: '/workshops/ikigai-branding',
  },
  openGraph: {
    title: 'Ikigai V5 — Editorial Magazine · FrankX Workshop',
    description:
      'A long-form ikigai walk. AI as peer. Real Venn diagram. Prompt library for ongoing practice.',
    images: [
      {
        url: '/api/og?title=Ikigai+V5&subtitle=Editorial+Magazine',
        width: 1200,
        height: 630,
        alt: 'Ikigai V5 — Editorial Magazine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikigai V5 — Editorial Magazine',
    description: 'The walk with AI as peer collaborator. Long-form. Restrained.',
  },
}

export default function IkigaiV5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={notoSerifJP.variable}>{children}</div>
}
