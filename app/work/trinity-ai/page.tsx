import type { Metadata } from 'next'
import TrinityAllianceClient from './TrinityAllianceClient'

export const metadata: Metadata = {
  title: 'Arcanea × Trinity AI — Strategic Alliance',
  description:
    'Two sovereign architectures. One shared infrastructure. A strategic alliance between Arcanea BV and Trinity AI.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Arcanea × Trinity AI — Strategic Alliance',
    description:
      'Two sovereign architectures. One shared infrastructure.',
    type: 'website',
    url: '/work/trinity-ai',
  },
}

export default function TrinityAIPage() {
  return <TrinityAllianceClient />
}
