import { getAllGuides, type GuideDoc } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
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

  const guideListSchema = {
    name: 'FrankX Creator Guides',
    description: 'Outcome-focused guides for creators and founders building with AI.',
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `https://frankx.ai/guides/${guide.slug}`,
      ...(guide.description && { description: guide.description }),
    })),
  }

  return (
    <>
      <JsonLd type="ItemList" data={guideListSchema} />
      <GuidesPageClient guides={guides} />
    </>
  )
}
