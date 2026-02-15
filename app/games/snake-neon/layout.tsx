import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Snake Neon — Classic Snake Reimagined | FrankX Games Lab',
  description: 'Classic snake with neon trails and progressive speed. Swipe or arrow keys to control. How long can you survive?',
  keywords: ['snake game', 'neon snake', 'classic snake', 'browser arcade game', 'retro game', 'mobile snake'],
  openGraph: {
    title: 'Snake Neon — Classic Snake Reimagined',
    description: 'Neon trails, progressive speed, touch controls. Free browser game.',
    url: 'https://frankx.ai/games/snake-neon',
  },
}

export default function SnakeNeonLayout({ children }: { children: React.ReactNode }) {
  return children
}
