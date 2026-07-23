import type { Metadata } from 'next'
import V0BlueprintShell from '@/components/v0/V0BlueprintShell'

export const metadata: Metadata = {
  title: 'The v0 Blueprint — Best-of-v0, Deconstructed & Upgraded | FrankX',
  description:
    'A curated field guide to the strongest v0 templates, the architecture behind them, and the FrankX-native surfaces we build by upgrading them for real domains.',
  alternates: { canonical: '/v0' },
  openGraph: {
    title: 'The v0 Blueprint | FrankX',
    description:
      'Best-of-v0 templates, architecture teardowns, and FrankX blueprints — study the best, fork the intelligence, ship faster.',
    url: 'https://frankx.ai/v0',
    type: 'website',
  },
}

export default function V0Page() {
  return <V0BlueprintShell />
}
