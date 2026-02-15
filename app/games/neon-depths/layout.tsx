import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neon Depths — Roguelike Dungeon Crawler | FrankX Games Lab',
  description: 'Turn-based roguelike with procedural dungeons, 3 enemy AI types, fog of war, and strategic combat. Explore deeper floors, collect loot, survive.',
  keywords: ['roguelike', 'dungeon crawler', 'turn-based', 'procedural generation', 'browser RPG', 'neon depths'],
  openGraph: {
    title: 'Neon Depths — Roguelike Dungeon Crawler',
    description: 'Procedural dungeons. Smart enemies. Strategic combat. Free browser game.',
    url: 'https://frankx.ai/games/neon-depths',
  },
}

export default function NeonDepthsLayout({ children }: { children: React.ReactNode }) {
  return children
}
