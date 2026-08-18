import type { Metadata } from 'next'
import LiquidComparison from './LiquidComparison'

export const metadata: Metadata = {
  title: 'Liquid Surface Kit | Design Lab',
  description:
    'Side-by-side review of the liquid glass surface kit against the current frankx.ai treatment.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://frankx.ai/design-lab/liquid' },
}

export default function LiquidLabPage() {
  return <LiquidComparison />
}
