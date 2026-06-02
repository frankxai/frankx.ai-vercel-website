import RitualsShell from '@/components/rituals/RitualsShell'
import { ritualsMeta } from '@/components/rituals/rituals-data'

const PAGE_URL = 'https://frankx.ai/rituals'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'Rituals | Daily Creative & Production Protocols | FrankX',
      description:
        'Structured daily protocols for creative production. Morning prime, deep work, music sessions, and evening review — the systems behind 12,000+ songs and 80+ articles.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#rituals`,
      name: 'Daily Rituals',
      numberOfItems: ritualsMeta.length,
      itemListElement: ritualsMeta.map((ritual, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: ritual.title,
        description: ritual.description,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Rituals', item: PAGE_URL },
      ],
    },
  ],
}

export default function RitualsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RitualsShell />
    </>
  )
}
