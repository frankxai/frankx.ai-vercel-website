import type { Metadata } from 'next'
import { domainSources } from '@/lib/research/sources'

// Count unique sources at build time
const uniqueCount = new Set(
  Object.values(domainSources).flat().map(s => s.url)
).size

export const metadata: Metadata = {
  title: 'Source Browser | Research Hub | FrankX.AI',
  description:
    `Browse all ${uniqueCount}+ verified research sources across 20 AI domains. Filter by type, domain, or publisher. Every claim in our research hub is backed by transparent, verifiable evidence.`,
  keywords: [
    'AI research sources',
    'verified AI research',
    'enterprise AI sources',
    'multi-agent research',
    'AI citations',
    'research bibliography',
  ],
  openGraph: {
    title: 'Source Browser | FrankX Research Hub',
    description:
      `${uniqueCount}+ verified sources across 20 AI research domains. Transparent, searchable evidence.`,
    type: 'website',
    url: 'https://frankx.ai/research/sources',
  },
  twitter: {
    card: 'summary',
    title: 'Source Browser | FrankX Research Hub',
    description: `${uniqueCount}+ verified sources across 20 AI research domains.`,
  },
  alternates: {
    canonical: 'https://frankx.ai/research/sources',
  },
}

// JSON-LD structured data - all content from our own static source registry, no user input
const breadcrumbLd = JSON.stringify({
  '@context': 'https://schema.org',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Source Browser',
      item: 'https://frankx.ai/research/sources',
    },
  ],
})

const collectionLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Source Browser',
  description: `Browse ${uniqueCount}+ verified research sources across 20 AI domains.`,
  url: 'https://frankx.ai/research/sources',
  isPartOf: {
    '@type': 'WebPage',
    name: 'Research Hub',
    url: 'https://frankx.ai/research',
  },
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
  numberOfItems: uniqueCount,
})

export default function SourceBrowserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: collectionLd }}
      />
      {children}
    </>
  )
}
