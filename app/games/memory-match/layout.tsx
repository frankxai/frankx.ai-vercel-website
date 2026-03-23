import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memory Match | AI-Powered Card Game | FrankX Games Lab',
  description: 'Test your memory with this browser-based card matching game. Multiple difficulty levels, score tracking, and a clean dark UI. Built with React — no downloads needed.',
  keywords: ['memory game', 'card matching game', 'browser game', 'React game', 'AI game', 'puzzle game'],
  openGraph: {
    title: 'Memory Match | FrankX Games Lab',
    description: 'Test your memory. Match the pairs. Beat your best time.',
    type: 'website',
    url: 'https://frankx.ai/games/memory-match',
  },
  alternates: {
    canonical: 'https://frankx.ai/games/memory-match',
  },
}

export default function MemoryMatchLayout({ children }: { children: React.ReactNode }) {
  return children
}
