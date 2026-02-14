import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games Lab | Browser Games Built with AI | FrankX',
  description: 'Play browser games built with AI-powered development. Explore what\'s possible with Next.js, Phaser, React Three Fiber, and agentic game development workflows.',
  keywords: ['browser games', 'AI game development', 'Next.js games', 'Phaser React', 'WebGPU games', 'agentic game development', 'game templates'],
  openGraph: {
    title: 'Games Lab | FrankX',
    description: 'Browser games built with AI — from quiz and puzzle to 3D experiences. Play, learn, and build your own.',
    type: 'website',
    url: 'https://frankx.ai/games',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Games Lab | FrankX',
    description: 'Browser games built with AI-powered development workflows.',
  },
  alternates: {
    canonical: 'https://frankx.ai/games',
  },
}

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children
}
