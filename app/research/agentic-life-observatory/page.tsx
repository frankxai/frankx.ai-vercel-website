import type { Metadata } from 'next'
import { AgenticLifeObservatory } from '@/components/research/AgenticLifeObservatory'
import { agenticLifeMarketRegistry } from '@/lib/research/agentic-life-market'
import { SITE_CONFIG } from '@/lib/schema-builders'
import { ldJson } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Agentic Life Observatory | Research Hub | FrankX.AI',
  description: 'A living market map for agentic memory, orchestration, sovereignty, evaluation, protocols, automation, and coding harnesses—classified by what to build, integrate, partner with, compete against, or watch.',
  keywords: [
    'agentic life infrastructure',
    'AI agent architecture',
    'AI agent memory',
    'AI agent evaluation',
    'agent observability',
    'agent operating system',
    'Frank Riemer',
  ],
  alternates: { canonical: 'https://frankx.ai/research/agentic-life-observatory' },
  openGraph: {
    title: 'Agentic Life Observatory | FrankX Research',
    description: '29 systems mapped across context, composition, sovereignty, verifiability, and multi-domain fit.',
    type: 'article',
    url: 'https://frankx.ai/research/agentic-life-observatory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Life Observatory | FrankX Research',
    description: 'A living evidence-linked market map for agentic life infrastructure.',
  },
}

export default function AgenticLifeObservatoryPage() {
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: agenticLifeMarketRegistry.title,
    description: agenticLifeMarketRegistry.description,
    url: agenticLifeMarketRegistry.canonicalUrl,
    sameAs: agenticLifeMarketRegistry.registryUrl,
    dateModified: agenticLifeMarketRegistry.lastVerified,
    creator: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
      jobTitle: 'AI Architect',
      sameAs: SITE_CONFIG.author.sameAs,
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: agenticLifeMarketRegistry.registryUrl,
    },
    variableMeasured: Object.keys(agenticLifeMarketRegistry.methodology.axes),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Research Hub', item: 'https://frankx.ai/research' },
      { '@type': 'ListItem', position: 3, name: 'Agentic Life Observatory', item: agenticLifeMarketRegistry.canonicalUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbJsonLd) }} />
      <AgenticLifeObservatory />
    </>
  )
}
