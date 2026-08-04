import type { Metadata } from 'next'
import Script from 'next/script'
import { FrankIntelligence } from '@/components/agent/FrankIntelligence'
import { frankIntelligenceCorpusMeta } from '@/data/frank-intelligence-corpus-meta'

export const metadata: Metadata = {
  title: 'Frank Intelligence · Source-Grounded AI for Real Decisions',
  description: 'Ask a public, source-grounded AI shaped by Frank Riemer’s work across AI architecture, creative systems, operations, vitality, and perspective.',
  alternates: { canonical: 'https://frankx.ai/agent' },
  openGraph: {
    title: 'Frank Intelligence',
    description: 'Bring the question that actually matters. Get a grounded decision or next move from FrankX public knowledge.',
    url: 'https://frankx.ai/agent',
    siteName: 'FrankX',
    type: 'website',
  },
}

export default function AgentPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Frank Intelligence',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://frankx.ai/agent',
    description: 'A public, source-grounded AI interface for FrankX writing and operating knowledge.',
    creator: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai/about' },
    isAccessibleForFree: true,
  }

  return (
    <>
      <Script id="frank-intelligence-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <FrankIntelligence corpus={frankIntelligenceCorpusMeta} />
    </>
  )
}
