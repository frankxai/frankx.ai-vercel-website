import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { researchDomains, researchAgents } from '@/lib/research/domains'
import ResearchShell from '@/components/research/ResearchShell'

const RESEARCH_URL = 'https://frankx.ai/research'

const totalSources = researchDomains.reduce((sum, d) => sum + d.sourceCount, 0)
const totalFindings = researchDomains.reduce((sum, d) => sum + d.keyFindings.length, 0)

export const metadata: Metadata = createMetadata({
  title: 'Research Intelligence Hub | FrankX',
  description: `Validated research across ${researchDomains.length} domains — enterprise AI, production patterns, multi-agent systems, and emerging tech. ${totalFindings}+ findings cross-referenced against ${totalSources}+ sources.`,
  path: '/research',
  keywords: [
    'AI research',
    'enterprise AI research',
    'multi-agent systems research',
    'AI architecture patterns',
    'production AI patterns',
    'AI intelligence hub',
  ],
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${RESEARCH_URL}#page`,
      url: RESEARCH_URL,
      name: 'Research Intelligence Hub',
      description: `Validated research across ${researchDomains.length} domains with ${totalFindings}+ cross-referenced findings.`,
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${RESEARCH_URL}#domains`,
      name: 'Research Domains',
      numberOfItems: researchDomains.length,
      itemListElement: researchDomains.slice(0, 12).map((domain, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: domain.title,
        url: `${RESEARCH_URL}/${domain.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Research', item: RESEARCH_URL },
      ],
    },
  ],
}

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResearchShell />
    </main>
  )
}
