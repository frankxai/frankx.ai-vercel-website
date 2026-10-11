import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research visual catalog',
  description: 'Browse FrankX research illustrations by topic. Illustrations are visual interpretation, not experimental evidence.',
  alternates: { canonical: 'https://www.frankx.ai/research/visual-catalog' },
  openGraph: { title: 'Research visual catalog', description: 'Research illustrations organized by topic, with visual interpretation kept separate from experimental evidence.', url: 'https://www.frankx.ai/research/visual-catalog', type: 'website' },
  twitter: { title: 'Research visual catalog', description: 'Research illustrations organized by topic.' },
}

export default function VisualCatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
