// Published investigations that lead /research.
//
// Each entry is a page that renders its own evidence today: receipts, a dataset,
// graded claims or a source ledger. Generated topic maps stay out of this list
// until they pass the publication boundary in docs/research/PUBLICATION-BOUNDARY.md.
// Keep this module free of JSON imports. Entries with a release gate are filtered
// server-side by publishedInvestigations(); never count the raw list.

import { economyAtlasAvailable } from './economy-release.ts'

export interface FeaturedInvestigation {
  href: string
  title: string
  kind: string
  blurb: string
  meta: string
  /** Set when the page itself is behind a release flag and 404s until released. */
  release?: 'economy-atlas'
}

export const featuredInvestigations: FeaturedInvestigation[] = [
  {
    href: '/research/model-arena',
    title: 'Starlight Model Arena',
    kind: 'First-party receipts',
    blurb:
      'Which model should handle which task. Harness measurements each trace to a public JSON receipt, and vendor benchmark figures carry their source. The two are never merged into a ranking.',
    meta: 'Receipts and methodology published',
  },
  {
    href: '/research/agentic-life-observatory',
    title: 'Agentic Life Observatory',
    kind: 'Market map and dataset',
    blurb:
      'Memory, orchestration, sovereignty, evaluation, protocols and coding harnesses, each system classified by whether to build, integrate, partner, compete or watch.',
    meta: 'Open dataset',
  },
  {
    href: '/research/the-light-within',
    title: 'The Light Within',
    kind: 'Evidence graded A to D',
    blurb:
      'What neuroscience can and cannot confirm about visualization, breathwork and gamma states, and where popular claims outrun the data.',
    meta: '14-minute read',
  },
  {
    href: '/research/blue-zones-ikigai-ai-era',
    title: 'Blue Zones, Ikigai, and the AI Era',
    kind: 'Meaning and longevity',
    blurb:
      'Longevity research from Okinawa and Sardinia, read as a systems question: what keeps work meaningful when AI does more of it.',
    meta: '12-minute read',
  },
  {
    href: '/research/economy',
    title: 'Economic atlas',
    kind: 'Working atlas',
    blurb:
      'Product proposals and distribution channels with the evidence behind each one, plus an illustrative cost scenario you can save. Demand is not yet measured.',
    meta: 'Sources inspectable',
    release: 'economy-atlas',
  },
]

/** Server-only: the entries whose pages actually render in this deployment. */
export function publishedInvestigations(env: NodeJS.ProcessEnv = process.env): FeaturedInvestigation[] {
  return featuredInvestigations.filter(
    (item) => item.release !== 'economy-atlas' || economyAtlasAvailable(env),
  )
}
