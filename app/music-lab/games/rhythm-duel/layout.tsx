import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Rhythm Duel | 2-Player Browser Rhythm Game | FrankX Music Lab',
  description:
    'A Guitar Hero-style rhythm game you play in the browser. Solo on any device; two players share one keyboard or a landscape tablet. Three tracks, three difficulties, sampled grand piano and synthesised backing. No downloads.',
  path: '/music-lab/games/rhythm-duel',
})

export default function RhythmDuelLayout({ children }: { children: React.ReactNode }) {
  return children
}
