import type { Metadata } from 'next'

/**
 * Route-segment layout for Ikigai V7 — Audience-Aware.
 *
 * V7 thesis: V1's English-first structure was right all along. V7 elevates it
 * with three V6 imports (NB2 brushstroke hero, NB2 Venn diagram, V5 prompts)
 * and ONE Japanese accent (Kamiya quote mid-page). Drops the kanji chapter
 * framing, the cultural-primer detours, and the editorial-magazine pivot
 * that made V3-V6 alienating for non-Japanese-speaking creators.
 *
 * NO Noto Serif JP loaded here — V7 doesn't render any kanji as page-level
 * typography. The kanji 生き甲斐 lives only inside the NB2 Venn image
 * (which already has it baked in pixels). Saves ~250KB of font payload.
 */

export const metadata: Metadata = {
  title: 'Ikigai & Branding Workshop · FrankX',
  description:
    'A walk through ikigai with your AI as peer collaborator. Map your purpose, write your sentence, ship a 30-day plan, walk out with three brand-launch visuals. Nine modules. Thirteen prompts. Free.',
  alternates: {
    canonical: '/workshops/ikigai-branding',
  },
  openGraph: {
    title: 'Ikigai & Branding Workshop',
    description:
      'A walk through ikigai with your AI as peer. 75 minutes. Free. Built for creators, operators, the AI-curious.',
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
    title: 'Ikigai & Branding Workshop',
    description: 'Map your purpose. Ship the artifact. AI as peer.',
  },
}

export default function IkigaiV7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
