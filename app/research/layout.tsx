import type { Metadata } from 'next'
import { researchDomains } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'
import { hubFaqs } from '@/lib/research/swarm-board'

const domainCount = researchDomains.length
const sourceCount = new Set(
  Object.values(domainSources).flat().map(s => s.url)
).size

export const metadata: Metadata = {
  title: 'Research Hub: Model Routing, Tests, and Sources',
  description:
    'FrankX swarm recommendations for which model fits which architecture. Vendor scores, independent composites, and first-party receipts stay labeled. Model Arena is receipt-gated.',
  keywords: [
    'AI research',
    'model routing',
    'Grok 4.6',
    'Model Arena',
    'Grok Imagine',
    'enterprise AI architecture',
    'multi-agent systems',
    'LLM comparison',
    'AI agents',
    'MCP protocol',
    'AI operations',
  ],
  openGraph: {
    title: 'Research Hub: Model Routing, Tests, and Sources',
    description:
      'Architecture-first model recommendations from the FrankX swarm, with sources, executed tests, and named authors.',
    type: 'website',
    url: 'https://www.frankx.ai/research',
    images: [
      {
        url: '/images/brand/frankx-public-workspace-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'FrankX research hub: architecture routing and labeled evidence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Hub: Model Routing, Tests, and Sources',
    description: `${domainCount} domains. Swarm routing cards. Receipt-gated Model Arena.`,
    images: ['/images/brand/frankx-public-workspace-og-1200x630.png'],
  },
  alternates: {
    canonical: 'https://www.frankx.ai/research',
    types: {
      'application/rss+xml': 'https://www.frankx.ai/research/feed',
    },
  },
}

// JSON-LD is built from static in-repo registries via JSON.stringify — not request input.
const websiteLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'FrankX Research Hub',
  description: `Architecture-first model routing across ${domainCount} domains with ${sourceCount}+ source references.`,
  url: 'https://www.frankx.ai/research',
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://www.frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://www.frankx.ai',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Research Hub', item: 'https://www.frankx.ai/research' },
    ],
  },
})

const faqLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: hubFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      {children}
    </>
  )
}
