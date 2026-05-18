import type { Metadata } from 'next'
import { Noto_Serif_JP } from 'next/font/google'

/**
 * Route-segment layout for Ikigai V6 — Composed Synthesis.
 *
 * V6 thesis: V4's hero block (badges, title, CTAs, brushstroke image) gives
 * the visitor immediate orientation. V5's Venn lives DIRECTLY underneath as
 * structural anchor. Drop the cultural-primer "note before we begin" detour
 * and lead the visitor straight into the Wisdom panel + chapters.
 *
 * Owns:
 *   1. Per-route metadata + OG image
 *   2. Scoped Noto Serif JP with preload=true (for the Venn kanji)
 *   3. Canonical → V1 (still iteration, not promoted)
 */

const notoSerifJP = Noto_Serif_JP({
  weight: ['200', '400'],
  variable: '--font-jp-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Ikigai V6 — Composed Synthesis · Workshop',
  description:
    'A walk through ikigai with your AI as peer collaborator. V4 hero composition + V5 superintelligent prompts + the actual Venn diagram. Ten chapters. Thirteen prompts. Four cadences for after.',
  alternates: {
    canonical: '/workshops/ikigai-branding',
  },
  openGraph: {
    title: 'Ikigai V6 — Composed Synthesis · FrankX Workshop',
    description:
      'V4 structure + V5 prompts + real Venn. The seventh iteration. Built for the audience Frank works with — creators, operators, AI-curious humans.',
    images: [
      {
        url: '/images/workshops/ikigai-branding/v4-hero-variant-1.jpg',
        width: 2560,
        height: 1440,
        alt: 'Sumi-e ink brushstroke on dark glass — Ikigai workshop hero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikigai V6 — Composed Synthesis',
    description: 'The walk with your AI as peer. V4 cinematic + V5 superintelligent.',
  },
}

export default function IkigaiV6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={notoSerifJP.variable}>{children}</div>
}
