import { MusicLabShell } from '@/components/music-lab/MusicLabShell'

const musicLabItems = [
  ['Digital Violin', '/music-lab/violin'],
  ['Grand Piano', '/music-lab/piano'],
  ['Guided Piano', '/music-lab/piano/songs'],
  ['Guided Guitar Tabs', '/music-lab/guitar-tabs'],
  ['Drum Kit', '/music-lab/drums'],
  ['Tropical Pads', '/music-lab/dj-pads'],
  ['Rhythm Duel', '/music-lab/games/rhythm-duel'],
  ['Xylophone', '/music-lab/for-kids/xylophone'],
] as const

export default function MusicLabPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX Music Lab',
    description: 'Responsive browser instruments, guided notes, and performance tools.',
    url: 'https://frankx.ai/music-lab',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Music Lab', item: 'https://frankx.ai/music-lab' },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: musicLabItems.map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: `https://frankx.ai${path}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <MusicLabShell />
    </>
  )
}
