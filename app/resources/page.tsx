import ResourcesPage from '@/components/resources/ResourcesPage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Resources',
  description: 'A collection of resources for creators, entrepreneurs, and AI enthusiasts.',
  path: '/resources',
})

export default function Resources() {
  return <ResourcesPage />
}