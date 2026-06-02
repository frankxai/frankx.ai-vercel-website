import WorkshopsShell from '@/components/workshops/WorkshopsShell'
import { workshops } from '@/data/workshops'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/workshops#page',
      url: 'https://frankx.ai/workshops',
      name: 'AI Workshop Templates — Run with FrankX',
      description:
        'Pre-built workshop templates for university professors, corporate trainers, and bootcamp instructors. Structured agendas, instructor notes, and resource packs included.',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://frankx.ai/workshops#items',
      name: 'FrankX Workshop Templates',
      itemListElement: workshops.map((workshop, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: workshop.title,
        url: `https://frankx.ai/workshops/${workshop.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Workshops', item: 'https://frankx.ai/workshops' },
      ],
    },
  ],
}

export default function WorkshopsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkshopsShell />
    </>
  )
}
