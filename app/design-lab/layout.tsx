import type { Metadata } from 'next'
import { designExperiments } from '@/lib/design-lab/experiments'

const experimentCount = designExperiments.length
const completedCount = designExperiments.filter(e => e.status === 'complete').length
const totalEntries = designExperiments.reduce((sum, e) => sum + e.entries.length, 0)

export const metadata: Metadata = {
  title: 'Design Lab | FrankX.AI',
  description: `${experimentCount} experiments where AI coding agents compete at design challenges. Side-by-side comparisons with ratings across design, code quality, accessibility, performance, and creativity. The best outputs become products.`,
  keywords: [
    'AI design competition',
    'AI coding agents',
    'design challenge',
    'Claude Code design',
    'v0 design',
    'Cursor design',
    'AI UI comparison',
    'agent design benchmark',
    'FrankX design lab',
  ],
  openGraph: {
    title: 'Design Lab | FrankX.AI',
    description: `${experimentCount} experiments. ${totalEntries} agent entries. AI coding agents compete at real design challenges.`,
    type: 'website',
    url: 'https://frankx.ai/design-lab',
    images: [
      {
        url: '/images/brand/og-template.png',
        width: 1200,
        height: 630,
        alt: 'FrankX — Design Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Lab | FrankX.AI',
    description: `${experimentCount} experiments. ${completedCount} complete. AI agents compete at design.`,
    images: ['/images/brand/og-template.png'],
  },
  alternates: {
    canonical: 'https://frankx.ai/design-lab',
  },
}

// JSON-LD structured data - content from our own static registries, safe for inline rendering
const websiteLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Design Lab',
  description: `AI coding agents compete at design challenges. ${experimentCount} experiments with ${totalEntries} agent entries rated across 5 dimensions.`,
  url: 'https://frankx.ai/design-lab',
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
        name: 'Design Lab',
        item: 'https://frankx.ai/design-lab',
      },
    ],
  },
})

export default function DesignLabLayout({
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
