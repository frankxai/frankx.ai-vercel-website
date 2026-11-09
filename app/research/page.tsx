import LearnHubSection from '@/components/learn/LearnHubSection'
import FaqBlock from '@/components/research/hub/FaqBlock'
import GradeScale from '@/components/research/hub/GradeScale'
import HubDoors from '@/components/research/hub/HubDoors'
import HubHero, { type HubCount } from '@/components/research/hub/HubHero'
import InvestigationIndex, {
  type InvestigationStat,
  type LeadManifest,
} from '@/components/research/hub/InvestigationIndex'
import MethodStrip from '@/components/research/hub/MethodStrip'
import NewsletterBlock from '@/components/research/hub/NewsletterBlock'
import ProgramsBridge from '@/components/research/hub/ProgramsBridge'
import TopicMapIndex from '@/components/research/hub/TopicMapIndex'
import ResearchModelWatch from './research-model-watch'

import atlas from '@/data/economy-atlas.json'
import { MODEL_MAKER_PORTALS } from '@/lib/learn/related-portals'
import { getReceipts, lastMeasured } from '@/lib/intelligence/receipts'
import { agenticLifeMarketRegistry } from '@/lib/research/agentic-life-market'
import { featuredInvestigations } from '@/lib/research/featured-investigations'
import { researchHubFaqs } from '@/lib/research/hubs'
import { domainSources } from '@/lib/research/sources'
import { publicTopicMaps } from '@/lib/research/topic-maps.public'

/**
 * Static on purpose: the receipt counts come from public/research/arena-receipts
 * via node:fs at build time (see lib/intelligence/receipts.ts). Nothing on this
 * page reads request state.
 */
export const dynamic = 'force-static'

// JSON-LD is built from the static hub FAQ registry, not request input.
const faqLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: researchHubFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

const receipts = getReceipts()
const measuredOn = lastMeasured()
const receiptCount = receipts.length
const systemsMapped = agenticLifeMarketRegistry.systems.length
const systemsChecked = agenticLifeMarketRegistry.lastVerified

// The newest receipt carries a review block the typed reader does not model.
const newestReceipt = receipts[0] as
  | (typeof receipts)[number] & { review?: { reviewedVerdict?: string } }
  | undefined
const newestRoundIsVoid =
  newestReceipt?.review?.reviewedVerdict?.toUpperCase().startsWith('VOID') ?? false

const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00.000Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

const tally = (value: number) => String(value).padStart(2, '0')

const counts: HubCount[] = [
  {
    value: tally(featuredInvestigations.length),
    label: 'investigations',
    detail: 'published with their evidence',
  },
  {
    value: tally(receiptCount),
    label: 'arena rounds',
    detail: measuredOn ? `last measured ${formatDay(measuredOn)}` : 'no measurement yet',
  },
  {
    value: tally(systemsMapped),
    label: 'systems mapped',
    detail: `dataset checked ${formatDay(systemsChecked)}`,
  },
  {
    value: String(publicTopicMaps.length),
    label: 'topic maps',
    detail: 'held pending sources',
  },
]

const stats: Record<string, InvestigationStat> = {
  '/research/model-arena': {
    primary: `${receiptCount} rounds`,
    secondary: measuredOn ? `last measured ${formatDay(measuredOn)}` : 'no measurement yet',
  },
  '/research/agentic-life-observatory': {
    primary: `${systemsMapped} systems`,
    secondary: `checked ${formatDay(systemsChecked)}`,
  },
  '/research/the-light-within': {
    primary: 'Grades A to D',
    secondary: 'applied per claim',
  },
  '/research/blue-zones-ikigai-ai-era': {
    primary: '1966 to 2017',
    secondary: 'origin texts traced',
  },
  '/research/economy': {
    primary: `${atlas.opportunities.length} products`,
    secondary: `${atlas.marketplaces.length} channels · ${atlas.sources.length} sources`,
  },
}

const lead: LeadManifest = {
  url: '/research/model-arena/receipts.json',
  rounds: String(receiptCount),
  lastMeasured: measuredOn ? formatDay(measuredOn) : 'no measurement yet',
  note: newestRoundIsVoid
    ? 'The most recent round is published as void-equivalent: it did not separate the four tiers, and the routing table did not move.'
    : undefined,
}

const registeredSourceCount = new Set(
  Object.values(domainSources).flat().map((source) => source.url),
).size

export default function ResearchPage() {
  return (
    <main className="bg-[#0a0a0b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />
      <HubHero counts={counts} />
      <MethodStrip hasRegisteredSources={registeredSourceCount > 0} />
      <InvestigationIndex items={featuredInvestigations} stats={stats} lead={lead} />
      <GradeScale />
      <HubDoors />
      <TopicMapIndex />
      <ResearchModelWatch />
      <FaqBlock />
      <ProgramsBridge />
      <LearnHubSection
        relatedPortals={[...MODEL_MAKER_PORTALS]}
        descriptionOverrides={{
          'claude-mastery': 'Claude workflows: prompting, coding, tool use and agent development.',
          'gemini-mastery': 'Google AI workflows: multimodal prompting, research and creative production.',
        }}
        eyebrow="From research to practice"
        heading="Learn the tools hands-on"
        blurb="The research maps the landscape. These portals curate the videos, docs, and expert channels to actually build with each platform."
      />
      <NewsletterBlock />
    </main>
  )
}
