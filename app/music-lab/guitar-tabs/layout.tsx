import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guided Guitar Tabs — FrankX Music Lab',
  description: 'Read responsive six-string guitar tabs, hear local reference tones, and practice public-domain phrases at an adjustable tempo.',
  alternates: { canonical: '/music-lab/guitar-tabs' },
}

export default function GuidedGuitarTabsLayout({ children }: { children: React.ReactNode }) {
  return children
}
