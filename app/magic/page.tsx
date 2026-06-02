import MagicShell from '@/components/magic/MagicShell'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/magic#page',
      url: 'https://frankx.ai/magic',
      name: 'Arcanea — The Academy for AI Worldbuilders',
      description:
        'Arcanea is a living mythology and learning path. Build your own magical worlds with AI, guided by Luminors, and shape a future where creativity and intelligent agents grow in symbiosis.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Magic', item: 'https://frankx.ai/magic' },
      ],
    },
  ],
}

export default function MagicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MagicShell />
    </>
  )
}
