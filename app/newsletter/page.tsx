import { getStreams } from '@/lib/newsletter'
import { getLatestIssue } from '@/lib/newsletter-issues'
import { createMetadata } from '@/lib/seo'
import NewsletterHero from '@/components/newsletter/NewsletterHero'
import StreamShowcase from '@/components/newsletter/StreamShowcase'
import StreamCompare from '@/components/newsletter/StreamCompare'
import NewsletterCTA from '@/components/newsletter/NewsletterCTA'
import WeeklyIssueCallout from '@/components/newsletter/WeeklyIssueCallout'

const faqItems = [
  {
    q: 'What is Signal Loop?',
    a: 'Signal Loop is Frank Riemer\'s main weekly letter on AI architecture, creative systems, music experiments, peak mental performance, and trustworthy human-AI work.',
  },
  {
    q: 'Can I subscribe to deeper streams?',
    a: 'Yes. Signal Loop is the main letter. Optional deeper streams exist for AI architecture, music, creative systems, investing, and private build notes.',
  },
  {
    q: 'How often will I receive emails?',
    a: 'Signal Loop is sent most weeks. Deeper streams have their own cadence and can be managed separately.',
  },
  {
    q: 'Can I unsubscribe anytime?',
    a: 'Yes. Every email includes an unsubscribe link. You can leave anytime.',
  },
]

export const metadata = createMetadata({
  title: 'Signal Loop Newsletter by Frank Riemer | FrankX.AI',
  description:
    'A grounded weekly letter from Frank Riemer on AI architecture, creative systems, peak mental performance, and trustworthy human-AI work.',
  path: '/newsletter',
  keywords: [
    'Frank Riemer newsletter',
    'FrankX newsletter',
    'Signal Loop',
    'AI architecture newsletter',
    'creative systems',
    'peak mental performance',
    'human AI work',
  ],
})

export default function NewsletterPage() {
  const streams = getStreams()
  const latestIssue = getLatestIssue()
  const streamItems = streams.map((s, i) => ({
    '@type': 'ListItem' as const,
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: s.name,
      description: s.description,
      url: `https://frankx.ai/newsletter#${s.id}`,
    },
  }))
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://frankx.ai/newsletter#newsletter',
        name: 'Signal Loop Newsletter by Frank Riemer',
        description:
          'A grounded weekly letter from Frank Riemer on AI architecture, creative systems, music experiments, peak mental performance, and trustworthy human-AI work.',
        url: 'https://frankx.ai/newsletter',
        numberOfItems: streams.length,
        hasPart: streamItems.map((item) => item.item),
        publisher: {
          '@type': 'Person',
          '@id': 'https://frankx.ai/#frank-riemer',
          name: 'Frank Riemer',
          url: 'https://frankx.ai/frank-riemer',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://frankx.ai/newsletter#faq',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <WeeklyIssueCallout latest={latestIssue} />
      <NewsletterHero streams={streams} />
      <StreamShowcase streams={streams} />
      <StreamCompare streams={streams} />
      <NewsletterCTA />
    </main>
  )
}
