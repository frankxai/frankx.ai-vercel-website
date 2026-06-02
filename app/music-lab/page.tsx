import MusicLabShell from '@/components/music-lab/MusicLabShell'

const PAGE_URL = 'https://frankx.ai/music-lab'

const instruments = [
  {
    name: 'Grand Piano',
    description: 'Real Yamaha C5 concert grand recordings. Velocity-sensitive touch, sustain pedal, stereo imaging.',
    url: 'https://frankx.ai/music-lab/piano',
  },
  {
    name: 'Tropical Pads',
    description: '16-pad DJ controller with marimba, steel drums, pluck synths and more. Kygo-style tropical house.',
    url: 'https://frankx.ai/music-lab/dj-pads',
  },
  {
    name: 'Xylophone for Kids',
    description: 'Rainbow pentatonic xylophone — every note sounds beautiful together. Designed for little hands.',
    url: 'https://frankx.ai/music-lab/for-kids/xylophone',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'Music Lab | AI Music Production Studio | FrankX',
      description:
        'AI-powered music production lab. Create tracks with Suno, explore genre fusion, and master prompt-driven music composition workflows.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#instruments`,
      name: 'Browser Instruments',
      numberOfItems: instruments.length,
      itemListElement: instruments.map((inst, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: inst.name,
        description: inst.description,
        url: inst.url,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Music Lab', item: PAGE_URL },
      ],
    },
  ],
}

export default function MusicLabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MusicLabShell />
    </>
  )
}
