import type { Metadata } from 'next'
import VisionariesHub from './VisionariesHub'
import { topVisionaries, visionarySources, visionaryUpdatedAt, visionaries } from '@/lib/research/visionaries'

const pageUrl = 'https://frankx.ai/research/visionaries'

export const metadata: Metadata = {
  title: 'Visionaries Hub | FrankX Research',
  description:
    'A research-backed top 100 + top 10 list of visionaries across AI, creator systems, music direction, design craft, and long-game thinking.',
  keywords: [
    'visionaries',
    'top 100 visionaries',
    'AI leaders',
    'creator economy leaders',
    'research hub',
    'frankx',
  ],
  openGraph: {
    title: 'Visionaries Hub | FrankX Research',
    description:
      'Who to admire and study right now: 100 curated visionaries and 10 priority role models for builders.',
    type: 'article',
    url: pageUrl,
    images: [
      {
        url: '/images/brand/og-template.png',
        width: 1200,
        height: 630,
        alt: 'FrankX Visionaries Research Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visionaries Hub | FrankX Research',
    description: 'Top 100 curated visionaries and a ranked Top 10 for immediate study and execution.',
    images: ['/images/brand/og-template.png'],
  },
  alternates: {
    canonical: pageUrl,
  },
}

const pageLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Visionaries Hub',
  description:
    'Research-backed curation of people worth studying across AI systems, creator leverage, design, music, and long-game execution.',
  dateModified: visionaryUpdatedAt,
  mainEntityOfPage: pageUrl,
  author: {
    '@type': 'Person',
    name: 'Frank van den Bergh',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  citation: visionarySources.map((source) => ({
    '@type': 'CreativeWork',
    name: source.label,
    url: source.url.startsWith('http') ? source.url : `https://frankx.ai${source.url}`,
  })),
})

const topListLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Top 10 Visionaries to Study First',
  numberOfItems: topVisionaries.length,
  itemListElement: topVisionaries.map((person) => ({
    '@type': 'ListItem',
    position: person.top10Rank,
    item: {
      '@type': 'Person',
      name: person.name,
      url: person.url,
      jobTitle: person.role,
      description: person.why,
    },
  })),
})

const fullListLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Top 100 Visionaries',
  numberOfItems: visionaries.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
})

export default function VisionariesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: pageLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: topListLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: fullListLd }} />
      <VisionariesHub />
    </>
  )
}
