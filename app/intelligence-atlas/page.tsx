import IntelligenceAtlas from '@/components/intelligence-atlas/IntelligenceAtlas'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Intelligence Atlas',
  description: 'The FrankX Intelligence Atlas Vol. I.',
  path: '/intelligence-atlas',
})

export default function IntelligenceAtlasPage() {
  return <IntelligenceAtlas />
}