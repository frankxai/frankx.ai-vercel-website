import { getAllGuides } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import GuidesV4Client from './GuidesV4Client'

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
  path: '/guides/v4',
})

export default function GuidesV4Page() {
  const guides = getAllGuides()
  return <GuidesV4Client guides={guides} />
}
