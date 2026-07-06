import type { Metadata } from 'next'
import { researchDomains } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'

const domainCount = researchDomains.length
const sourceCount = new Set(
  Object.values(domainSources).flat().map(s => s.url)
).size

export const metadata: Metadata = {
  title: 'AI Research for Builders of the Intelligence Age | FrankX.AI',
  description: `Field notes, model analysis, architecture patterns, agentic systems, cloud AI strategy, and practical research across ${domainCount} active research domains and ${sourceCount}+ verified sources.`,
  keywords: [
    'AI research',
    'enterprise AI architecture',
    'multi-agent systems',
    'production AI patterns',
    'RAG architecture',
    'AI agents',
    'MCP protocol',
    'AI operations',
    'vector databases',
    'AI security',
    'AI coding assistants',
    'cloud AI',
    'AI CoE',
  ],
  openGraph: {
    title: 'AI Research for Builders of the Intelligence Age | FrankX.AI',
    description: 'Field notes, model analysis, architecture patterns, agentic systems, cloud AI strategy, and practical research.',
    type: 'website',
    url: 'https://frankx.ai/research',
    images: [
      {
        url: '/images/brand/og-template.png',
        width: 1200,
        height: 630,
        alt: 'FrankX Research Intelligence Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Research for Builders of the Intelligence Age | FrankX.AI',
    description: `${domainCount} research domains and ${sourceCount}+ verified sources for builders turning AI into systems.`,
    images: ['/images/brand/og-template.png'],
  },
  alternates: {
    canonical: 'https://frankx.ai/research',
    types: {
      'application/rss+xml': 'https://frankx.ai/research/feed',
    },
  },
}

// JSON-LD structured data - content from our own static registries, safe for inline rendering
const websiteLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Research for Builders of the Intelligence Age',
  description: `Practical AI research across ${domainCount} domains with ${sourceCount}+ verified sources.`,
  url: 'https://frankx.ai/research',
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://frankx.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Research',
        item: 'https://frankx.ai/research',
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteLd }}
      />
      {children}
    </>
  )
}
