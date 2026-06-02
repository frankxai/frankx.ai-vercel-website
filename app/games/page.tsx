import type { Metadata } from 'next'
import GamesShell from '@/components/games/GamesShell'

const GAMES_URL = 'https://frankx.ai/games'

export const metadata: Metadata = {
  title: 'Games | AI-Native Game Development & Agentic Pipelines | FrankX',
  description:
    'AI-native game development on Vercel. Web games, agentic content pipelines, AI tooling, monetization strategy, and the tech stack for shipping playable experiences fast.',
  keywords: [
    'AI game development',
    'AI-native games',
    'Next.js games',
    'Vercel games',
    'agentic game pipeline',
    'generative AI games',
    'browser games',
    'game monetization',
  ],
  alternates: { canonical: GAMES_URL },
  openGraph: {
    title: 'Games | FrankX',
    description:
      'AI-native game development — web games, agentic pipelines, and the stack that ships playable experiences fast.',
    type: 'website',
    url: GAMES_URL,
    siteName: 'FrankX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Games | FrankX',
    description:
      'AI-native game development — web games, agentic pipelines, and the stack that ships playable experiences fast.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${GAMES_URL}#page`,
      url: GAMES_URL,
      name: 'Games — FrankX',
      description:
        'AI-native game development on Vercel. Stack, agentic pipelines, AI tooling, and monetization.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Games', item: GAMES_URL },
      ],
    },
  ],
}

export default function GamesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GamesShell />
    </>
  )
}
