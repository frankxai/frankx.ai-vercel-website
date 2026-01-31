import { getAllGuides } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import GuidesV3Client from './GuidesV3Client'

export const metadata = createMetadata({
  title: 'Creator Guides - Build What Matters with AI',
  description:
    'Outcome-focused guides for elite creators and founders. Master image generation, content systems, AI music, and founder strategies.',
  keywords: [
    'ai guides for creators',
    'image generation guide',
    'ai music production',
    'founder ai stack',
    'content systems',
  ],
  path: '/guides/v3',
})

export default function GuidesV3Page() {
  const guides = getAllGuides()
  return <GuidesV3Client guides={guides} />
}
