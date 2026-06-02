import CreatorsShell from '@/components/creators/CreatorsShell'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/creators#page',
      url: 'https://frankx.ai/creators',
      name: 'For Creators — AI Tools, Prompts & Frameworks',
      description:
        "Master AI tools that amplify your creative voice. From 12,000+ AI songs to visual storytelling, the creator's path to AI mastery.",
      audience: {
        '@type': 'Audience',
        audienceType: 'Creators',
        name: 'AI-powered creators, musicians, writers, and visual artists',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'For Creators', item: 'https://frankx.ai/creators' },
      ],
    },
  ],
}

export default function CreatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CreatorsShell />
    </>
  )
}
