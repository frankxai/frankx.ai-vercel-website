import { getAllGuides, type GuideDoc } from '@/lib/guides'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import GuidesPageClient from './GuidesPageClient'
import LearnHubSection from '@/components/learn/LearnHubSection'
import { MODEL_MAKER_PORTALS } from '@/lib/learn/related-portals'

export const metadata = createMetadata({
  title: 'Guides from the Work',
  description:
    'Practical guides distilled from Frank Riemer’s research, experiments, and agent-assisted builds, with the decisions and next steps kept visible.',
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
    description:
      'Practical guides distilled from Frank Riemer’s research, experiments, and agent-assisted builds.',
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: `https://www.frankx.ai/guides/${guide.slug}`,
      ...(guide.description && { description: guide.description }),
    })),
  }

  return (
    <>
      <JsonLd type="ItemList" data={guideListSchema} />
      <main>
        <GuidesPageClient guides={guides} />
        <div className="bg-[#0a0a0b] pb-20">
          <LearnHubSection
            relatedPortals={[...MODEL_MAKER_PORTALS]}
            eyebrow="Go deeper"
            heading="Curated learning portals"
            blurb="When a guide needs deeper platform context, the Learn hub keeps the official documentation, useful demonstrations, and expert channels close at hand."
          />
        </div>
      </main>
    </>
  )
}
