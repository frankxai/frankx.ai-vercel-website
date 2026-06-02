import prototypesData from '@/data/ai-architecture/prototypes.json'
import type { ArchitecturePrototype } from '@/types/ai-architecture'
import AIArchitectureShell from '@/components/ai-architecture/AIArchitectureShell'

const HUB_URL = 'https://frankx.ai/ai-architecture'
const blueprints = prototypesData as ArchitecturePrototype[]
const publishedCount = blueprints.filter((b) => b.status === 'published').length

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${HUB_URL}#page`,
      url: HUB_URL,
      name: 'AI Architecture Hub | FrankX',
      description:
        'Production-ready AI architecture patterns. Explore blueprints, test with your own API keys, and deploy with starter templates. Cloud-agnostic patterns that work everywhere.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
      about: [
        { '@type': 'Thing', name: 'AI Architecture' },
        { '@type': 'Thing', name: 'LLM Applications' },
        { '@type': 'Thing', name: 'Agent Orchestration' },
        { '@type': 'Thing', name: 'RAG' },
        { '@type': 'Thing', name: 'MCP Servers' },
      ],
      mainEntity: {
        '@type': 'ItemList',
        name: 'AI Architecture Sections',
        numberOfItems: 4,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Blueprints',
            url: `${HUB_URL}/blueprints`,
            description: `${publishedCount}+ production architecture patterns, free to learn from.`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Prototypes',
            url: `${HUB_URL}/prototypes`,
            description: 'Interactive BYOK demos to test patterns before building.',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Templates',
            url: `${HUB_URL}/templates`,
            description: 'Production-ready starter kits with one-click deploy.',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Tools',
            url: `${HUB_URL}/tools`,
            description: 'Curated frameworks, databases, platforms & developer resources.',
          },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${HUB_URL}#service`,
      name: 'AI Architecture Reference',
      provider: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
      areaServed: 'Worldwide',
      serviceType: 'AI System Design',
      description:
        'Cloud-agnostic AI architecture patterns spanning RAG, multi-agent orchestration, MCP servers, AI gateways, vector databases, and LLM ops.',
      url: HUB_URL,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'AI Architecture', item: HUB_URL },
      ],
    },
  ],
}

export default function AIArchitectureHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIArchitectureShell />
    </>
  )
}
