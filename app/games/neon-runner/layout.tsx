import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neon Runner — 3D Endless Runner | FrankX Games Lab',
  description:
    'Dodge obstacles in this neon-lit 3D endless runner. Swipe to change lanes, jump, and slide. Mobile-first with WebGL rendering — play free in your browser.',
  keywords: [
    'endless runner',
    'neon runner',
    'subway surfers browser',
    '3D browser game',
    'mobile game online',
    'swipe game',
  ],
  openGraph: {
    title: 'Neon Runner — 3D Endless Runner',
    description: 'Dodge, jump, slide through a neon world. Free browser game — no download.',
    url: 'https://frankx.ai/games/neon-runner',
    type: 'website',
  },
}

export default function NeonRunnerLayout({ children }: { children: React.ReactNode }) {
  return children
}
