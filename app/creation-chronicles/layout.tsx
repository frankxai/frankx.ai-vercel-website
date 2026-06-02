import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Creation Chronicles | Behind the Build | FrankX',
  description: 'Behind-the-scenes stories of building AI systems, creating music with AI, and shipping digital products. Raw creation logs from the studio.',
  path: '/creation-chronicles',
})

const creationChroniclesLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://frankx.ai/creation-chronicles#webpage',
      url: 'https://frankx.ai/creation-chronicles',
      name: 'Creation Chronicles',
      headline: 'Creation Chronicles | Behind the Build',
      description:
        'Behind-the-scenes stories of building AI systems, creating music with AI, and shipping digital products. Raw creation logs from the studio.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      about: {
        '@type': 'Thing',
        name: 'Creator Logs, Essays, and Music Drops',
      },
      author: {
        '@type': 'Person',
        name: 'Frank Riemer',
        jobTitle: 'AI Architect',
      },
      publisher: {
        '@type': 'Organization',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
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
          name: 'Creation Chronicles',
          item: 'https://frankx.ai/creation-chronicles',
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
        dangerouslySetInnerHTML={{ __html: creationChroniclesLd }}
      />
      {children}
    </>
  )
}
