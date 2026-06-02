import type { Metadata } from 'next'
import { getMusicStats } from '@/lib/music'
import MusicShell from '@/components/music/MusicShell'

const MUSIC_URL = 'https://frankx.ai/music'
const musicStats = getMusicStats()

export const metadata: Metadata = {
  title: 'Music | AI Music Architecture & Suno Catalog | FrankX',
  description: `${musicStats.totalTracks}+ published tracks on Suno AI. Healing frequencies, orchestral epics, tech house, and hip hop — engineered as a visual operating system with swarm-owned media pipelines.`,
  keywords: [
    'AI music',
    'Suno AI catalog',
    'FrankX music',
    'AI music architecture',
    'healing frequencies',
    'orchestral AI music',
    'tech house AI',
    'AI music production',
    'music as consciousness technology',
  ],
  alternates: { canonical: MUSIC_URL },
  openGraph: {
    title: 'Music | FrankX',
    description: 'Architecting the future of AI, creation, and digital worlds through music.',
    type: 'website',
    url: MUSIC_URL,
    siteName: 'FrankX',
    images: [
      {
        url: '/images/blog/music-as-consciousness-technology-hero-v3-pro.png',
        width: 1200,
        height: 630,
        alt: 'FrankX Music — Architecting Music for AI Worlds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music | FrankX',
    description: 'Architecting the future of AI, creation, and digital worlds through music.',
    images: ['/images/blog/music-as-consciousness-technology-hero-v3-pro.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${MUSIC_URL}#page`,
      url: MUSIC_URL,
      name: 'FrankX Music',
      description: `${musicStats.totalTracks}+ AI-generated tracks engineered as a visual operating system.`,
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'MusicGroup',
      '@id': `${MUSIC_URL}#artist`,
      name: 'FrankX',
      url: MUSIC_URL,
      sameAs: [musicStats.profileUrl].filter(Boolean),
      description: 'AI music architect — healing frequencies, cinematic, tech house, hip hop.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Music', item: MUSIC_URL },
      ],
    },
  ],
}

export default function MusicPage() {
  return (
    <main className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MusicShell />
    </main>
  )
}
