import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Workshops and Session Studio | FrankX',
  description:
    'One delivered Ikigai & Branding workshop plus adaptable AI agent, AI music, leadership, and session-amplification studio formats to shape and pilot.',
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
  url: 'https://frankx.ai/workshops',
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
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
        name: 'Workshops',
        item: 'https://frankx.ai/workshops',
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
