import type { Metadata } from 'next'
import { researchDomains } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'

const domainCount = researchDomains.length
const sourceCount = new Set(
  Object.values(domainSources).flat().map(s => s.url)
).size

export const metadata: Metadata = {
  title: 'Research from the Workspace',
  description: `Source-aware research across AI systems and emerging technology, with ${domainCount} domains and ${sourceCount}+ source references kept close to the synthesis.`,
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
    title: 'Research from the FrankX Workspace',
    description:
      'Source-aware investigations that distinguish reported evidence, synthesis, uncertainty, and Frank Riemer’s interpretation.',
    type: 'website',
    url: 'https://www.frankx.ai/research',
    images: [
      {
        url: '/images/brand/frankx-public-workspace-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Research from the FrankX agentic workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research from the FrankX Workspace',
    description: `${domainCount} research domains with ${sourceCount}+ visible source references.`,
    images: ['/images/brand/frankx-public-workspace-og-1200x630.png'],
  },
  alternates: {
    canonical: 'https://www.frankx.ai/research',
    types: {
      'application/rss+xml': 'https://www.frankx.ai/research/feed',
    },
  },
}

// JSON-LD structured data - content from our own static registries, safe for inline rendering
const websiteLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Research from the FrankX Workspace',
  description: `Source-aware AI research across ${domainCount} domains with ${sourceCount}+ source references.`,
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.frankx.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Research Hub',
        item: 'https://www.frankx.ai/research',
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
