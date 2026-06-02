import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'YouTube Channel | AI Architecture, Music & Creator Tools | FrankX',
  description: 'AI architecture field guides, music production with Suno AI, creator tools tutorials, and opinion pieces. Subscribe to the FrankX YouTube channel.',
  path: '/youtube',
})

const youtubeLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://frankx.ai/youtube#webpage',
      url: 'https://frankx.ai/youtube',
      name: 'YouTube Channel | AI Architecture, Music & Creator Tools',
      description:
        'AI architecture field guides, music production with Suno AI, creator tools tutorials, and opinion pieces. Subscribe to the FrankX YouTube channel.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      about: {
        '@type': 'Thing',
        name: 'AI-Powered YouTube Channel',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://frankx.ai#org',
      name: 'FrankX',
      url: 'https://frankx.ai',
      founder: {
        '@type': 'Person',
        name: 'Frank Riemer',
        jobTitle: 'AI Architect',
      },
      sameAs: ['https://github.com/frankxai', 'https://www.youtube.com/@frankxai'],
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
          name: 'YouTube',
          item: 'https://frankx.ai/youtube',
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
        dangerouslySetInnerHTML={{ __html: youtubeLd }}
      />
      {children}
    </>
  )
}
