import type { Metadata } from 'next'
import JsonLd, { FAQPageJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import { questFaqs, questDays } from '@/data/manifestation'
import ManifestationQuestClient from './ManifestationQuestClient'

export const metadata: Metadata = createMetadata({
  title: 'The 10-Day Reality Architect Quest | FrankX',
  description:
    'A guided 10-day loop from Manifestation Master to Reality Architect: name a vision, feel it, set your state with music, render it with AI, ship it, and compound.',
  path: '/manifestation/quest',
  keywords: ['manifestation quest', 'reality architect', 'manifestation challenge', '10 day manifestation', 'manifest with ai'],
})

export default function ManifestationQuestPage() {
  return (
    <>
      <JsonLd
        data={{
          '@type': 'WebPage',
          name: 'The 10-Day Reality Architect Quest',
          description:
            'A guided 10-day manifestation loop: vision → felt state → attention → AI-rendered artifact → shipped → lesson.',
          url: 'https://frankx.ai/manifestation/quest',
          isPartOf: { '@type': 'WebSite', name: 'FrankX.AI', url: 'https://frankx.ai' },
        }}
      />
      <HowToJsonLd
        data={{
          name: 'The 10-Day Reality Architect Quest',
          description:
            'A guided 10-day manifestation loop: name a vision, feel it, set your state with music, render it with AI, ship it, and compound.',
          totalTime: 'P10D',
          steps: questDays.map((d) => ({
            name: `Day ${d.day}: ${d.title}`,
            text: d.practice,
            url: `https://frankx.ai/manifestation/quest`,
          })),
        }}
      />
      <FAQPageJsonLd faqs={questFaqs} />
      <ManifestationQuestClient />
    </>
  )
}
