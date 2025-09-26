import IntelligenceArsenal from '@/app/affiliates/page'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Intelligence Arsenal - Expert-Curated Tools | FrankX.AI',
  description: 'The exact tools and systems powering the FrankX intelligence stack. Tested, validated, and recommended by our agentic experts.',
  keywords: [
    'ai tools',
    'intelligence arsenal',
    'expert recommendations',
    'agentic systems',
    'development tools',
    'ai infrastructure'
  ],
  path: '/resources',
})

export default function Resources() {
  return <IntelligenceArsenal />
}