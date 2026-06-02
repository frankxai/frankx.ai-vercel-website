import { createMetadata } from '@/lib/seo'
import prototypesData from '@/data/ai-architecture/prototypes.json'
import type { ArchitecturePrototype } from '@/types/ai-architecture'

export const metadata = createMetadata({
  title: 'Prototypes | Work-in-Progress AI Projects | FrankX',
  description: 'Early-stage prototypes and proof-of-concepts. See what\'s being built before it ships — AI tools, interfaces, and creative experiments.',
  path: '/prototypes',
})

const prototypes = prototypesData as ArchitecturePrototype[]
const publishedPrototypes = prototypes.filter((p) => p.status === 'published')

const prototypesLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/prototypes#webpage',
      url: 'https://frankx.ai/prototypes',
      name: 'Prototypes | Work-in-Progress AI Projects',
      description:
        'Early-stage prototypes and proof-of-concepts. See what\'s being built before it ships — AI tools, interfaces, and creative experiments.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      about: {
        '@type': 'Thing',
        name: 'AI Architecture Prototypes',
      },
    },
    {
      '@type': 'ItemList',
      '@id': 'https://frankx.ai/prototypes#itemlist',
      name: 'Architecture Prototypes',
      numberOfItems: publishedPrototypes.length,
      itemListElement: publishedPrototypes.map((prototype, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: prototype.title,
        url: `https://frankx.ai/prototype/${prototype.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://frankx.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Prototypes',
          item: 'https://frankx.ai/prototypes',
        },
      ],
    },
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static JSON-LD structured data — no user input, safe for inline rendering
        dangerouslySetInnerHTML={{ __html: prototypesLd }}
      />
      {children}
    </>
  )
}
