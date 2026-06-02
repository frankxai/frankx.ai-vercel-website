import { createMetadata } from '@/lib/seo'
import CoachingShell, { coachingFaqs } from '@/components/coaching/CoachingShell'

export const metadata = createMetadata({
  title: 'AI Coaching That Fits Your Reality | FrankX',
  description:
    'Premium 1-on-1 AI coaching with Frank Riemer. Skip generic advice and work directly with someone who has built 40+ AI agents, shipped production systems, and created 12,000+ AI songs.',
  path: '/coaching',
  keywords: [
    'ai coaching',
    'ai architecture coaching',
    'claude code coaching',
    'agentic systems mentor',
    'creator business coaching',
    'suno music coaching',
    'frank riemer',
  ],
})

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Coaching',
  provider: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  areaServed: 'Worldwide',
  name: 'FrankX AI Coaching',
  description:
    'Premium 1-on-1 AI coaching across AI architecture, creator business strategy, music production with AI, and content systems.',
  url: 'https://frankx.ai/coaching',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Coaching Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strategy Session',
          description: '1-hour AI stack audit, architecture review, and growth roadmap planning.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Builder Sprint',
          description:
            '4-week hands-on coaching with weekly sessions, custom AI agent setup, and shipping accountability.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Architect Residency',
          description:
            '12-week full AI transformation roadmap with enterprise architecture design and ongoing support.',
        },
      },
    ],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: coachingFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function CoachingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CoachingShell />
    </div>
  )
}
