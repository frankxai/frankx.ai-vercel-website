import AIArchitecturesShell from '@/components/ai-architectures/AIArchitecturesShell'
import { architecturesListItemData } from '@/components/ai-architectures/architectures-data'

const PAGE_URL = 'https://frankx.ai/ai-architectures'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'AI Architectures | Reference Designs & Patterns | FrankX',
      description:
        'Production-ready AI architecture patterns. RAG pipelines, multi-agent orchestration, agentic workflows, and enterprise deployment blueprints.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#architectures`,
      name: 'Featured AI Architectures',
      numberOfItems: architecturesListItemData.length,
      itemListElement: architecturesListItemData.map((architecture, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: architecture.title,
        url: architecture.prototypeSlug
          ? `https://frankx.ai/prototype/${architecture.prototypeSlug}`
          : PAGE_URL,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'AI Architectures', item: PAGE_URL },
      ],
    },
  ],
}

export default function AIArchitecturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIArchitecturesShell />
    </>
  )
}
