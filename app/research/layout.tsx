import type { Metadata } from 'next'
import { researchDomains } from '@/lib/research/domains'

const domainCount = researchDomains.length

export const metadata: Metadata = {
  title: 'Research Hubs: AI, Creative Systems & Human Potential',
  description:
    'Explore seven research hubs spanning AI agents, frontier models, creative systems, compute, quantum technology, human potential and enterprise architecture.',
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
    title: 'Research Hubs: AI, Creative Systems & Human Potential',
    description:
      'Seven research hubs and a hundred topic maps. Research briefs are under source review.',
    type: 'website',
    url: 'https://www.frankx.ai/research',
    images: [
      {
        url: '/images/brand/frankx-public-workspace-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'FrankX research: science, systems and human potential',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Hubs: AI, Creative Systems & Human Potential',
    description: `${domainCount} topic maps across seven hubs. Source review is in progress.`,
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
  description: `Explore ${domainCount} topic maps across seven hubs. Individual research briefs are under source review.`,
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

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteLd }} />
      {children}
    </>
  )
}
