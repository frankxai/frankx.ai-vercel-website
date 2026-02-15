import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2048 Neon — Sliding Number Puzzle | FrankX Games Lab',
  description: 'Slide numbered tiles to combine them and reach 2048. Neon-lit strategy puzzle with swipe controls, undo, and best score tracking.',
  keywords: ['2048 game', 'number puzzle', 'sliding tiles', 'neon 2048', 'browser puzzle game', 'strategy game'],
  openGraph: {
    title: '2048 Neon — Sliding Number Puzzle',
    description: 'Slide and merge tiles to reach 2048. Free browser game — no download.',
    url: 'https://frankx.ai/games/neon-2048',
  },
}

export default function Neon2048Layout({ children }: { children: React.ReactNode }) {
  return children
}
