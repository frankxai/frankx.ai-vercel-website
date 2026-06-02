import IntelligenceAtlas from '@/components/intelligence-atlas/IntelligenceAtlas'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Intelligence Atlas Vol. I | FrankX',
  description:
    'The FrankX Intelligence Atlas Vol. I — a cartography of the systems, research, and patterns that shape an AI-augmented creator practice. Maps across enterprise AI, agentic architecture, and the creator economy.',
  path: '/intelligence-atlas',
  keywords: [
    'AI atlas',
    'intelligence map',
    'enterprise AI cartography',
    'agentic architecture',
    'AI patterns',
    'creator intelligence',
    'FrankX atlas',
  ],
})

const atlasSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'FrankX Intelligence Atlas Vol. I',
  description:
    'A cartography of the systems, research, and patterns that shape an AI-augmented creator practice. Maps across enterprise AI, agentic architecture, and the creator economy.',
  url: 'https://frankx.ai/intelligence-atlas',
  isPartOf: { '@type': 'WebSite', name: 'FrankX', url: 'https://frankx.ai' },
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
}

export default function IntelligenceAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(atlasSchema) }}
      />
      <IntelligenceAtlas />
    </>
  )
}