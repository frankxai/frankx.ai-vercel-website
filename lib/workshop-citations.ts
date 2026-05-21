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
    'Designs enterprise AI Center of Excellence frameworks',
    'Same patterns open-sourced for individual creators',
    'Multi-pillar operating system: SIS · ACOS · IIS · Workshop OS · Library OS',
  ],
} as const

/**
 * Concrete receipts — public artifacts the audience can verify
 * themselves. Avoids "trust me" claims. Each entry pairs a what-Frank-did
 * receipt with a link they can open from the QR code at the end.
 */
export interface FrankReceipt {
  /** What Frank built — short, specific */
  artifact: string
  /** Public URL to verify */
  href: string
  /** Why this matters to the workshop audience */
  signal: string
}

export const FRANK_RECEIPTS: FrankReceipt[] = [
  {
    artifact: 'Library OS — open-source book intelligence',
    href: 'https://github.com/frankxai/library-os',
    signal: 'MIT, bootable. Same pattern you can fork for any knowledge domain.',
  },
  {
    artifact: 'Prompt Library — 98 patterns red-teamed',
    href: 'https://frankx.ai/prompts',
    signal: 'Public, eval-gated, contribution-ready. The prompt mastery shown, not claimed.',
  },
  {
    artifact: 'Starlight Intelligence System (SIS)',
    href: 'https://github.com/frankxai/Starlight-Intelligence-System',
    signal: 'The substrate every FrankX surface composes on. 9 layers. MIT.',
  },
  {
    artifact: 'Atlas Globe — trilingual interactive',
    href: 'https://frankx.ai/globe',
    signal: 'Same hands. Different surface. Shipping discipline applies to anything.',
  },
  {
    artifact: '12,000+ AI-produced tracks with Suno',
    href: 'https://frankx.ai/music',
    signal: 'Volume + quality. AI augmentation, not replacement.',
  },
  {
    artifact: 'frankx.ai itself',
    href: 'https://frankx.ai',
    signal: 'Everything you are learning runs the site you are looking at right now.',
  },
]

/**
 * Eight unspoken doubts the audience walks in with. Naming them out
 * loud in slide #2 earns trust in the first 90 seconds. Workshop
 * facilitator playbook: name the objection before they raise it.
 */
export interface UnspokenDoubt {
  /** What's in their head */
  doubt: string
  /** Frank's one-line acknowledgment that the doubt is valid */
  acknowledgment: string
}

export const UNSPOKEN_DOUBTS: UnspokenDoubt[] = [
  {
    doubt: 'Ikigai workshops are overdone.',
    acknowledgment: 'They are. This one ends with an artifact you can publish, not a Venn diagram you screenshot.',
  },
  {
    doubt: 'I do not have time to post five times a week.',
    acknowledgment: 'You will not. You will commit to one post, one short, one conversation, one product — in 30 days.',
  },
  {
    doubt: 'I will sound like every other thought-leader.',
    acknowledgment: 'You will, if you skip the audience-of-one exercise. You will not, if you do it specifically.',
  },
  {
    doubt: 'I tried this before and quit.',
    acknowledgment: 'Most people do. The Day-7 check-in is how this workshop is different.',
  },
]
