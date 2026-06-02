import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Art Gallery | Generative Visual Art | FrankX',
  description: 'AI-generated visual art gallery. Explore generative art created with Midjourney, DALL-E, and other AI image tools.',
  path: '/ai-art',
})

const collectionLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Art Gallery',
  description:
    'AI-generated visual art gallery. Character concepts, system architecture, nature-tech environments, and abstract visualizations generated with Gemini via Nano Banana MCP.',
  url: 'https://frankx.ai/ai-art',
  isPartOf: {
    '@type': 'WebSite',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  breadcrumb: {
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
        name: 'AI Art Gallery',
        item: 'https://frankx.ai/ai-art',
      },
    ],
  },
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static JSON-LD structured data — no user input, safe for inline rendering
        dangerouslySetInnerHTML={{ __html: collectionLd }}
      />
      {children}
    </>
  )
}
