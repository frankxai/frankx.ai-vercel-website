import { getAllGuides, type GuideDoc } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import GuidesPageClient from './GuidesPageClient'

export const metadata = createMetadata({
  title: 'Creator Guides - Build What Matters with AI',
  description:
    'Outcome-focused guides for elite creators and founders. Master image generation, content systems, AI music, and founder strategies. Not tool tutorials—real systems that ship.',
  keywords: [
    'ai guides for creators',
    'image generation guide',
    'ai music production',
    'founder ai stack',
    'content systems',
    'ai writing system',
    'enterprise ai patterns',
    'creator economy 2026',
  ],
  path: '/guides',
})

export default function GuidesPage() {
  const guides = getAllGuides()

  return <GuidesPageClient guides={guides} />
}
