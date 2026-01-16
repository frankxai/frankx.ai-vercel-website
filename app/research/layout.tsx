import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Intelligence Hub | FrankX.AI',
  description: 'A sophisticated research system exploring generative AI, consciousness, and human potential. Daily intelligence operations synthesizing cutting-edge insights for conscious creators.',
  keywords: [
    'AI research',
    'generative AI',
    'consciousness research',
    'personal development',
    'AI agents',
    'LLM research',
    'meditation science',
    'creator economy',
    'productivity systems',
    'human potential',
  ],
  openGraph: {
    title: 'Research Intelligence Hub | FrankX.AI',
    description: 'Daily intelligence operations exploring the frontiers of AI, consciousness, and human potential.',
    type: 'website',
    url: 'https://frankx.ai/research',
    images: [
      {
        url: '/images/og/research-hub.png',
        width: 1200,
        height: 630,
        alt: 'FrankX Research Intelligence Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Intelligence Hub | FrankX.AI',
    description: 'Multi-agent research system for AI, consciousness, and human potential.',
    images: ['/images/og/research-hub.png'],
  },
  alternates: {
    canonical: 'https://frankx.ai/research',
  },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
