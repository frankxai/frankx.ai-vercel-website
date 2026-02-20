import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import streams from '@/data/newsletter-streams.json'

// ── JSON-LD Schema ──────────────────────────────────────────────────────────
// All data below is static from our own newsletter-streams.json.
// No user input is used — XSS risk is zero. Same pattern as shop/templates/layout.tsx.

const streamItems = streams.streams.map((s, i) => ({
  '@type': 'ListItem' as const,
  position: i + 1,
  item: {
    '@type': 'CreativeWork',
    name: s.name,
    description: s.description,
    url: `https://frankx.ai/newsletter#${s.id}`,
  },
}))

const faqItems = [
  {
    q: 'How many newsletter streams are there?',
    a: 'There are 6 independent streams: Creation Chronicles, AI Architect Dispatch, FrankX Music Letters, Arcanea Transmissions, Investor Intelligence Brief, and Inner Circle.',
  },
  {
    q: 'Can I subscribe to individual streams?',
    a: 'Yes. Each stream is completely independent. Subscribe to one, a few, or all — and manage each separately.',
  },
  {
    q: 'How often will I receive emails?',
    a: 'It depends on the stream. Creation Chronicles is weekly (Sunday), AI Architect Dispatch is bi-weekly (Tuesday), Music Letters is bi-weekly (Friday), Arcanea is monthly, Investor Brief is weekly (Monday), and Inner Circle is weekly (Wednesday).',
  },
  {
    q: 'Is there a cost to subscribe?',
    a: 'All streams are free. The Inner Circle stream includes occasional premium content, but the newsletter itself is free.',
  },
  {
    q: 'Can I unsubscribe anytime?',
    a: 'Yes. Every email includes an unsubscribe link. You can unsubscribe from one stream without affecting your other subscriptions.',
  },
]

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'FrankX Newsletter Hub — 6 Streams for Builders',
      description:
        'Subscribe to the signals that matter. AI architecture, music production, investing, worldbuilding — each newsletter stream has its own voice, cadence, and depth.',
      url: 'https://frankx.ai/newsletter',
      numberOfItems: streams.streams.length,
      hasPart: streamItems.map((item) => item.item),
      publisher: {
        '@type': 'Person',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

const jsonLdString = JSON.stringify(jsonLdGraph)

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = createMetadata({
  title: 'Newsletter | 6 Streams for Builders, Musicians & Investors | FrankX',
  description:
    'Subscribe to the signals that matter. AI architecture, music production, investing, worldbuilding — each newsletter stream has its own voice, cadence, and depth.',
  path: '/newsletter',
  keywords: [
    'AI newsletter',
    'creator newsletter',
    'AI architecture newsletter',
    'music production newsletter',
    'builder newsletter',
    'FrankX newsletter',
    'Claude Code newsletter',
    'investing newsletter',
  ],
})

// ── Layout ────────────────────────────────────────────────────────────────────

export default function NewsletterLayout({
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
