import Roadmap from '@/components/roadmap/Roadmap'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Roadmap',
  description: 'The roadmap for the FrankX.ai website.',
  path: '/roadmap',
})

export default function RoadmapPage() {
  return <Roadmap />
}