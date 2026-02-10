import type { Metadata } from 'next'
import { researchDomains } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'

const domainCount = researchDomains.length
const sourceCount = new Set(
  Object.values(domainSources).flat().map(s => s.url)
).size

export const metadata: Metadata = {
  title: 'Research Intelligence Hub | FrankX.AI',
  description: `Validated research across enterprise AI, production patterns, multi-agent systems, and emerging technology. 135+ cross-referenced findings, ${domainCount} active research domains, ${sourceCount}+ verified sources.`,
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
    'AI neuroscience',
  ],
  openGraph: {
    title: 'Research Intelligence Hub | FrankX.AI',
    description: 'Validated research across enterprise AI, production patterns, multi-agent systems, and emerging technology.',
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
    title: 'Research Intelligence Hub | FrankX.AI',
    description: `${domainCount} research domains. 135+ validated findings. ${sourceCount}+ verified sources.`,
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
  name: 'Research Intelligence Hub',
  description: `Validated AI research across ${domainCount} domains with ${sourceCount}+ verified sources.`,
  url: 'https://frankx.ai/research',
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
        name: 'Research Hub',
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
