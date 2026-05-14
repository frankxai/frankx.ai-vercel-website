/**
 * Curated, sourced citations for the Ikigai & Branding Workshop.
 *
 * Each entry pairs a workshop claim with a primary source and a year.
 * Drawn from `lib/research/validated-claims.ts` where possible and
 * extended with public-domain figures (Goldman Sachs creator-economy,
 * Edelman Trust Barometer, Richard van der Blom LinkedIn algo report,
 * Justin Welsh public revenue, OpenAI/Anthropic adoption).
 *
 * Discipline: name the source in the same breath as the claim, or
 * don't make the claim. Numbers without sources are slop.
 */

export interface Citation {
  /** Short headline statistic, e.g. "$2,084B by 2035" */
  stat: string
  /** What the stat is about, e.g. "Creator economy market size" */
  claim: string
  /** Primary source publisher */
  source: string
  /** Year of publication */
  year: string
  /** Optional URL — leave undefined to print as text-only attribution */
  url?: string
}

/**
 * Module 4: Content Operating Plan — the LinkedIn + creator-economy authority.
 */
export const MODULE_4_CITATIONS: Citation[] = [
  {
    stat: '$2.08T',
    claim: 'Creator economy market projection by 2035',
    source: 'Precedence Research',
    year: '2025',
    url: 'https://www.precedenceresearch.com/creator-economy-market',
  },
  {
    stat: '50M+',
    claim: 'Self-identified creators globally today',
    source: 'IAB Creator Economy Report',
    year: '2025',
  },
  {
    stat: '86%',
    claim: 'Creative professionals using AI daily',
    source: 'eMarketer Creator FAQ',
    year: '2026',
    url: 'https://www.emarketer.com/content/faq-on-creator-economy--how-marketers-stand-2026-',
  },
]

/**
 * Module 5: GenCreator Stack + AI Companions — the AI adoption authority.
 */
export const MODULE_5_CITATIONS: Citation[] = [
  {
    stat: '90%',
    claim: 'Organizations using AI regularly',
    source: 'McKinsey State of AI',
    year: '2026',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
  },
  {
    stat: '$183B',
    claim: 'Anthropic valuation (Series F)',
    source: 'Industry filings',
    year: '2025',
  },
  {
    stat: '40%',
    claim: 'Enterprise apps with AI agents by 2026',
    source: 'Gartner Strategic Predictions',
    year: '2025',
    url: 'https://www.gartner.com/en/newsroom',
  },
]

/**
 * Module 6: Live Artifact — AI-augmented creator output evidence.
 */
export const MODULE_6_CITATIONS: Citation[] = [
  {
    stat: '3-5×',
    claim: 'Content output gain for creators with AI workflows',
    source: 'GlobeNewswire creator-economy market report',
    year: '2025',
    url: 'https://www.globenewswire.com/news-release/2026/01/07/3214698/28124/en/',
  },
  {
    stat: '$7.84B → $52.62B',
    claim: 'AI agents market: 2025 → 2030 projection',
    source: 'MarketsAndMarkets',
    year: '2025',
    url: 'https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html',
  },
]

/**
 * Frank's positioning credentials — used in the Why-Listen slide and
 * the cover credential line. Edit here to update once, propagate
 * to deck + workshop page.
 */
export const FRANK_CREDENTIALS = {
  role: 'AI Architect',
  org: 'Oracle EMEA AI Center of Excellence',
  catalog: '12,000+ AI-produced tracks',
  site: 'frankx.ai',
  proofPoints: [
    'Designs CoE frameworks for Fortune 500 enterprises',
    'Same patterns open-sourced for individual creators',
    'Multi-pillar operating system: SIS · ACOS · IIS · Workshop OS · Library OS',
  ],
} as const
