import LabsShell from '@/components/labs/LabsShell'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/labs#page',
      url: 'https://frankx.ai/labs',
      name: 'FrankX Labs — Live Build Sessions, Ritual Labs & Agent Field Labs',
      description:
        'Live build sessions, ritual labs, and agent field labs for AI builders who ship. Pre-lab briefs, real-time co-working, and replay archives inside the Vault.',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://frankx.ai/labs#items',
      name: 'FrankX Lab Formats',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Live Build Labs', url: 'https://frankx.ai/labs#live-build-labs' },
        { '@type': 'ListItem', position: 2, name: 'Ritual Labs', url: 'https://frankx.ai/labs#ritual-labs' },
        { '@type': 'ListItem', position: 3, name: 'Agent Field Labs', url: 'https://frankx.ai/labs#agent-field-labs' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://frankx.ai/labs' },
      ],
    },
  ],
}

export default function LabsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LabsShell />
    </>
  )
}
