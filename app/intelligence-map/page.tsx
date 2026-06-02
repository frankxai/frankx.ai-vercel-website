import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import IntelligenceMapShell from '@/components/intelligence-map/IntelligenceMapShell'

const INTELLIGENCE_MAP_URL = 'https://frankx.ai/intelligence-map'

export const metadata: Metadata = createMetadata({
  title: 'FrankX Intelligence Map | System Architecture',
  description:
    'The complete architecture of an AI-powered creator ecosystem. 100+ repositories, 47 workflows, 500+ skills, 244 pages — every workflow, every connection, every layer mapped.',
  path: '/intelligence-map',
  keywords: [
    'AI architecture',
    'creator ecosystem',
    'n8n workflows',
    'Claude Code architecture',
    'AI system design',
    'intelligence map',
    'agent orchestration',
  ],
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': `${INTELLIGENCE_MAP_URL}#article`,
      headline: 'FrankX Intelligence Map',
      description:
        'The complete architecture of an AI-powered creator ecosystem. Every workflow, every connection, every layer — mapped.',
      url: INTELLIGENCE_MAP_URL,
      author: {
        '@type': 'Person',
        name: 'Frank Riemer',
        url: 'https://frankx.ai',
      },
      publisher: {
        '@type': 'Organization',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      about: [
        { '@type': 'Thing', name: 'Claude Code' },
        { '@type': 'Thing', name: 'n8n Workflow Automation' },
        { '@type': 'Thing', name: 'AI Agent Orchestration' },
        { '@type': 'Thing', name: 'Multi-Agent Systems' },
      ],
      proficiencyLevel: 'Expert',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Intelligence Map', item: INTELLIGENCE_MAP_URL },
      ],
    },
  ],
}

export default function IntelligenceMapPage() {
  return (
    <main className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IntelligenceMapShell />
    </main>
  )
}
