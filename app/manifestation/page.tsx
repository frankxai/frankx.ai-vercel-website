import type { Metadata } from 'next'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import ManifestationClient, { hubFaqs } from './ManifestationClient'

export const metadata: Metadata = createMetadata({
  title: 'Manifestation, Honestly — The Reality Architect Hub | FrankX',
  description:
    'The grounded version of manifestation: the mechanisms that hold up, the claims that don\'t, and a daily loop using your own music and AI to turn a vision into shipped reality.',
  path: '/manifestation',
  keywords: [
    'manifestation',
    'law of attraction',
    'reality architect',
    'manifestation with ai',
    'vibe os',
    'how to manifest goals',
    'become a manifestation master',
  ],
})

export default function ManifestationPage() {
  return (
    <>
      <JsonLd
        data={{
          '@type': 'WebPage',
          name: 'Manifestation, Honestly — The Reality Architect Hub',
          description:
            'A grounded approach to manifestation and the Law of Attraction: keep the real mechanisms, drop the cosmology, set state with self-made music, and use AI to render and ship the vision.',
          url: 'https://frankx.ai/manifestation',
          isPartOf: { '@type': 'WebSite', name: 'FrankX.AI', url: 'https://frankx.ai' },
        }}
      />
      <FAQPageJsonLd faqs={hubFaqs} />
      <ManifestationClient />
    </>
  )
}
