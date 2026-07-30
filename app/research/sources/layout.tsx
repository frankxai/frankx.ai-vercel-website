import type { Metadata } from 'next'
import { domainSources } from '@/lib/research/sources'

// Count unique sources at build time
const uniqueCount = new Set(
  Object.values(domainSources).flat().map(s => s.url)
).size

export const metadata: Metadata = {
  title: 'Research Source Browser',
  description:
    `Browse ${uniqueCount}+ source references across the FrankX research domains and filter them by type, topic, or publisher.`,
  keywords: [
    'AI research sources',
    'verified AI research',
    'enterprise AI sources',
    'multi-agent research',
    'AI citations',
    'research bibliography',
  ],
  openGraph: {
    title: 'FrankX Research Source Browser',
    description:
      `${uniqueCount}+ visible source references across the FrankX research domains.`,
    type: 'website',
    url: 'https://www.frankx.ai/research/sources',
  },
  twitter: {
    card: 'summary',
    title: 'FrankX Research Source Browser',
    description: `${uniqueCount}+ visible source references across the FrankX research domains.`,
  },
  alternates: {
    canonical: 'https://www.frankx.ai/research/sources',
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
      item: 'https://www.frankx.ai',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Research Hub',
      item: 'https://www.frankx.ai/research',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Source Browser',
      item: 'https://www.frankx.ai/research/sources',
    },
  ],
})

const collectionLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Source Browser',
  description: `Browse ${uniqueCount}+ source references across the FrankX research domains.`,
  url: 'https://www.frankx.ai/research/sources',
  isPartOf: {
    '@type': 'WebPage',
    name: 'Research Hub',
    url: 'https://www.frankx.ai/research',
  },
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
