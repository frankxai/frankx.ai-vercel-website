import AgenticLifeOsShell from '@/components/agentic-life-os/AgenticLifeOsShell'
import { agenticLifeOsPublicScan, offerPackages } from '@/data/agentic-life-os-atlas'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Agentic Life OS - FrankX',
  description:
    'A proof-producing command system for founder work: decide the highest-leverage move, execute with bounded agents, preserve evidence, and convert results into offers and assets.',
  path: '/agentic-life-os',
  keywords: [
    'Agentic Life OS',
    'agentic operating system',
    'AI operating system',
    'agentic workflows',
    'multi-agent systems',
    'FrankX',
    'Starlight Intelligence System',
  ],
})

function AgenticLifeOsSchema() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Agentic Life OS',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Git, local agent workstations',
    url: 'https://frankx.ai/agentic-life-os',
    description:
      'A proof-producing command system for founder work: decide the highest-leverage move, execute with bounded agents, preserve evidence, and convert results into offers and assets.',
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    offers: offerPackages.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      description: offer.promise,
      category: offer.status,
      url: new URL(offer.href, 'https://frankx.ai/agentic-life-os').toString(),
    })),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Public repositories scanned',
        value: agenticLifeOsPublicScan.totalPublic,
      },
      {
        '@type': 'PropertyValue',
        name: 'Private repositories summarized',
        value: agenticLifeOsPublicScan.privateRepoCount,
      },
      {
        '@type': 'PropertyValue',
        name: 'Public scan source',
        value: agenticLifeOsPublicScan.source,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

export default function AgenticLifeOsPage() {
  return (
    <>
      <AgenticLifeOsSchema />
      <AgenticLifeOsShell />
    </>
  )
}
