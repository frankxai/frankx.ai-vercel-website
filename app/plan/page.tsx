import { planInitiatives, planTrackConfig } from '@/lib/plan/initiatives'
import PlanShell from '@/components/plan/PlanShell'

const PLAN_URL = 'https://frankx.ai/plan'

const totalInitiatives = planInitiatives.length
const totalTracks = Object.keys(planTrackConfig).length

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PLAN_URL}#page`,
      url: PLAN_URL,
      name: 'The Plan',
      description: `${totalInitiatives} initiatives across ${totalTracks} tracks — content, product, distribution, technical, and creative. AI-human collaboration in real-time.`,
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${PLAN_URL}#initiatives`,
      name: 'Plan Initiatives',
      numberOfItems: totalInitiatives,
      itemListElement: planInitiatives.slice(0, 12).map((initiative, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: initiative.title,
        url: `${PLAN_URL}/${initiative.slug}`,
      })),
    },
  ],
}

export default function PlanPage() {
  return (
    <main id="main" className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlanShell />
    </main>
  )
}
