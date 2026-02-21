import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What to Watch — Curated Videos for Builders & Creators | FrankX',
  description:
    'Curated high-signal videos on AI foundations, engineering, agents, creator economy, and strategy. Organized by watchlists, levels, and personas.',
  keywords: [
    'AI videos',
    'AI engineering tutorials',
    'AI agents course',
    'creator economy videos',
    'AI music production',
    'curated video library',
    'FrankX watch',
  ],
  openGraph: {
    title: 'What to Watch — Curated Videos for Builders & Creators | FrankX',
    description:
      'High-signal videos for AI engineers, creators, and builders. Curated by level and topic.',
    type: 'website',
    url: 'https://frankx.ai/watch',
  },
}

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return children
}
