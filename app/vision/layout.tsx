import type { Metadata } from 'next'

// ── JSON-LD Schema ──────────────────────────────────────────────────────────
// Static data only — no user input, no XSS risk.
// Same pattern as shop/templates/layout.tsx (already in production).

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'The Vision — Build What Used to Require an Army',
      description:
        'The vision behind FrankX: proving that one person with AI leverage, taste, and work ethic can build what used to require an army.',
      url: 'https://frankx.ai/vision',
      publisher: {
        '@type': 'Person',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
    },
    {
      '@type': 'AboutPage',
      name: 'FrankX Vision — Personal Vision, Community Mission, Golden Age Thesis',
      url: 'https://frankx.ai/vision',
      description:
        'Personal vision, community mission, and the thesis behind the FrankX ecosystem. AI architecture, creative production, and the builder economy.',
      mainEntity: {
        '@type': 'Person',
        name: 'Frank Riemer',
        alternateName: 'FrankX',
        url: 'https://frankx.ai',
        jobTitle: 'AI Architect & Creator',
        knowsAbout: [
          'AI Architecture',
          'Enterprise AI Systems',
          'AI Music Production',
          'Agentic Workflows',
          'Oracle Cloud',
        ],
      },
    },
  ],
}

const jsonLdString = JSON.stringify(jsonLdGraph)

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'The Vision | FrankX.AI — Build What Matters',
  description:
    'The vision behind FrankX: proving that one person with AI leverage, taste, and work ethic can build what used to require an army. Personal vision, community mission, and the Golden Age thesis.',
  keywords: [
    'FrankX vision',
    'builder economy',
    'AI architect',
    'solo builder',
    'creator economy',
    'golden age',
    'the great transition',
  ],
  alternates: {
    canonical: 'https://frankx.ai/vision',
  },
  openGraph: {
    title: 'The Vision — Build What Used to Require an Army',
    description:
      'Personal vision, community mission, and the thesis behind the FrankX ecosystem. AI architecture, creative production, and the builder economy.',
    type: 'website',
    url: 'https://frankx.ai/vision',
    images: [
      {
        url: '/images/vision/hero-builder-empire.png',
        width: 1376,
        height: 768,
        alt: 'A builder standing on a glass platform overlooking an interconnected digital cityscape',
      },
    ],
  },
}

// ── Layout ────────────────────────────────────────────────────────────────────

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      {children}
    </>
  )
}
