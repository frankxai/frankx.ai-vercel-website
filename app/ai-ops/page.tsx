import AIOpsShell from '@/components/ai-ops/AIOpsShell'

const PAGE_URL = 'https://frankx.ai/ai-ops'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'AI Operations Research Hub | FrankX',
      description:
        'The definitive knowledge base for AI Operations. Production-ready LLM infrastructure, OCI AI Accelerator Packs, memory systems, multi-agent orchestration, and the path to AGI.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
      about: [
        { '@type': 'Thing', name: 'AI Operations' },
        { '@type': 'Thing', name: 'LLM Infrastructure' },
        { '@type': 'Thing', name: 'OCI AI Accelerator Packs' },
        { '@type': 'Thing', name: 'Multi-Agent Orchestration' },
        { '@type': 'Thing', name: 'AGI' },
      ],
      mainEntity: {
        '@type': 'ItemList',
        name: 'AI Ops Knowledge Base',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'OCI AI Accelerator Packs',
            url: `${PAGE_URL}/accelerator-packs`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Models 2026',
            url: `${PAGE_URL}/models-2026`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Master Architecture',
            url: `${PAGE_URL}/architecture`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Implementation Patterns',
            url: `${PAGE_URL}/patterns`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Maturity Model',
            url: `${PAGE_URL}/maturity`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'AGI-Ready Systems',
            url: `${PAGE_URL}/agi-ready`,
          },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'AI Operations', item: PAGE_URL },
      ],
    },
  ],
}

export default function AIOpsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIOpsShell />
    </>
  )
}
