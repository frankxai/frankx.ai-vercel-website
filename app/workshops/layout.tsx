import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  canonical: './',
  title: 'Workshops and Session Studio',
  description:
    'Delivered workshops and studio curricula, including twelve lessons on AI agents, MCP, accountable memory and coordinated work with a free offline lab.',
  path: '/workshops',
  keywords: [
    'AI workshops',
    'workshop design',
    'AI curriculum',
    'session design',
    'participant artifacts',
    'AI education',
    'prompt engineering workshop',
    'AI agent workshop',
    'AI music workshop',
  ],
})

// JSON-LD: all values are static string literals from our own codebase, safe for inline rendering
const workshopsLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'FrankX Workshop Studio',
  description:
    'A delivered Ikigai & Branding workshop and a studio of adaptable workshop architectures to shape and pilot.',
  url: `${siteConfig.url}/workshops`,
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: siteConfig.url,
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: siteConfig.url,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Workshops',
        item: `${siteConfig.url}/workshops`,
      },
    ],
  },
})

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: workshopsLd }}
      />
      {children}
    </>
  )
}
