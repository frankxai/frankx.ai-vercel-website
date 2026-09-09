import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Violin — Play, Practice & Perform',
  description: 'Play a responsive four-string browser violin with first-position notes, continuous bow expression, guided exercises, and local performance replay.',
  alternates: { canonical: '/music-lab/violin' },
  openGraph: {
    title: 'Digital Violin — FrankX Music Lab',
    description: 'A responsive four-string browser violin with guided notes and continuous bow expression.',
    url: 'https://frankx.ai/music-lab/violin',
    type: 'website',
  },
}

export default function DigitalViolinLayout({ children }: { children: React.ReactNode }) {
  return children
}
