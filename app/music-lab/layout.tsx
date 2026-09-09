import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music Lab — Browser Instruments, Guided Notes & Performance',
  description: 'Play responsive browser instruments, follow guided piano and violin notes, and practice timing with focused performance tools.',
  alternates: { canonical: '/music-lab' },
  openGraph: {
    title: 'FrankX Music Lab',
    description: 'Play. Practice. Perform with responsive browser instruments and guided notes.',
    url: 'https://frankx.ai/music-lab',
    type: 'website',
  },
}

export default function MusicLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
