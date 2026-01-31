import { getAllGuides } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import GuidesV5Client from './GuidesV5Client'

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
  path: '/guides/v5',
})

export default function GuidesV5Page() {
  const guides = getAllGuides()
  return <GuidesV5Client guides={guides} />
}
