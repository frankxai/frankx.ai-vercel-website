import DevelopersShell from '@/components/developers/DevelopersShell'
import { developersLearningPaths } from '@/components/developers/developers-data'

const PAGE_URL = 'https://frankx.ai/developers'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'For Developers | APIs, SDKs & Technical Resources | FrankX',
      description:
        'Master Claude Code, Cursor, and agentic development patterns. Build autonomous systems that write, test, and deploy code while you focus on architecture.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Developers',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#learning-paths`,
      name: 'Developer Learning Paths',
      numberOfItems: developersLearningPaths.length,
      itemListElement: developersLearningPaths.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: path.title,
        description: path.description,
        url: `https://frankx.ai${path.href}`,
      })),
    },
    {
      '@type': 'Product',
      '@id': `${PAGE_URL}#agentic-creator-os`,
      name: 'Agentic Creator OS',
      description:
        'The complete system for developers who want to master AI-assisted coding. From Claude Code patterns to multi-agent orchestration.',
      url: 'https://frankx.ai/products/agentic-creator-os',
      offers: {
        '@type': 'Offer',
        price: '197',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://frankx.ai/products/agentic-creator-os',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'For Developers', item: PAGE_URL },
      ],
    },
  ],
}

export default function DevelopersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DevelopersShell />
    </>
  )
}
