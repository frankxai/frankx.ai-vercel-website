import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Workshops | FrankX',
  description:
    'Pre-built AI workshop templates for university professors, corporate trainers, and bootcamp instructors. Structured agendas, instructor notes, and resource packs included.',
  path: '/workshops',
  image: '/images/workshops/workshop-os-hero.jpg',
  keywords: [
    'AI workshops',
    'AI training templates',
    'AI curriculum',
    'university AI course',
    'corporate AI training',
    'bootcamp AI workshops',
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
  name: 'AI Workshops',
  description:
    'Pre-built AI workshop templates for educators and trainers.',
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
