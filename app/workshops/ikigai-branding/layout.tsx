import type { Metadata } from 'next'

/**
 * Route-segment layout for the canonical Ikigai & Branding Workshop.
 *
 * Promoted from V7. V1 English-first structure + NB2 brushstroke hero + NB2
 * Venn diagram + V5 superintelligent prompts + one Kamiya pull-quote.
 *
 * No page-level Japanese typography — kanji 生き甲斐 lives inside the NB2
 * Venn image (baked in pixels).
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

export default function IkigaiBrandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
