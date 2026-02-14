import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crystal Match — Match-3 Puzzle Game | FrankX Games Lab',
  description:
    'Swap and match colorful crystals in this mobile-first match-3 puzzle game. Cascading combos, power-ups, and progressive difficulty — all in your browser.',
  keywords: [
    'match 3 game',
    'crystal match',
    'candy crush browser',
    'puzzle game online',
    'mobile browser game',
    'touch game',
  ],
  openGraph: {
    title: 'Crystal Match — Match-3 Puzzle Game',
    description: 'Swap crystals, chain combos, beat your high score. Free browser game — no download.',
    url: 'https://frankx.ai/games/crystal-match',
    type: 'website',
  },
}

export default function CrystalMatchLayout({ children }: { children: React.ReactNode }) {
  return children
}
