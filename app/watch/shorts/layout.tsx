import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Shorts — 60-Second High-Signal Insights | FrankX',
  description:
    'Curated vertical shorts on AI, peak performance, and the craft of building. Fast signal, zero filler — each Short is paired with Frank\u2019s commentary on why it matters to builders and creators.',
  keywords: [
    'AI shorts',
    'YouTube Shorts curation',
    'AI architect shorts',
    'peak performance shorts',
    'creator shorts',
    'high-signal shorts',
    'FrankX watch shorts',
  ],
  openGraph: {
    title: 'AI Shorts — 60-Second High-Signal Insights | FrankX',
    description:
      'Vertical Shorts curated by an AI Architect. Fast signal, zero filler, paired with commentary.',
    type: 'website',
    url: 'https://frankx.ai/watch/shorts',
  },
  alternates: {
    canonical: 'https://frankx.ai/watch/shorts',
  },
}

export default function ShortsLayout({ children }: { children: React.ReactNode }) {
  return children
}
