export type PortfolioAccent = 'emerald' | 'cyan' | 'sky' | 'violet' | 'amber'

export interface PortfolioBrand {
  id: 'frankx' | 'gencreator' | 'agentic-income' | 'starlight' | 'arcanea'
  name: string
  domain: string
  href: string
  role: string
  buyer: string
  recurringProblem: string
  acquisitionPath: string
  activation: string
  currentValue: string
  recurringExperiment: string
  fulfillmentSystem: string
  proofMetric: string
  ctaLabel: string
  accent: PortfolioAccent
}

export interface PortfolioProgram {
  name: string
  decision: 'Keep distinct' | 'Embed' | 'Incubate'
  parent: string
  rule: string
  domain?: string
  href?: string
}

export interface RevenueEvent {
  event: string
  model: string
  standard: string
}

/**
 * Verified, customer-facing portfolio registry for /business-plan.
 *
 * It deliberately excludes defensive, inactive, legal, partner, and client
 * domains. Those decisions belong in the private portfolio registry. Paid
 * status mirrors the canonical brand page and distinguishes live, pre-launch,
 * waitlist, and service-led offers.
 */
export const portfolioBrands: PortfolioBrand[] = [
  {
    id: 'frankx',
    name: 'FrankX',
    domain: 'frankx.ai',
    href: '/?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
    role: 'Authority and demand',
    buyer: 'Creators, founders, and AI architects with too many disconnected tools and initiatives.',
    recurringProblem: 'Important ideas stall because priorities, architecture, and execution do not stay coherent.',
    acquisitionPath: 'Search, field notes, research, and public tools route readers to the operating brand that matches the job.',
    activation: 'Name a distinct advantage, validate a costly recurring problem, and choose the next owned asset to ship.',
    currentValue: 'Public research, guides, tools, books, and architecture notes.',
    recurringExperiment: 'None by default. FrankX remains the authority layer unless repeat customer behavior proves a separate recurring job.',
    fulfillmentSystem: 'A documented editorial cadence, one portfolio diagnostic, and tagged routes into each operating brand.',
    proofMetric: 'Qualified visits that continue into a relevant framework, tool, or product path.',
    ctaLabel: 'Explore FrankX',
    accent: 'emerald',
  },
  {
    id: 'gencreator',
    name: 'GenCreator',
    domain: 'gencreator.ai',
    href: 'https://gencreator.ai/products/diagnostic?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
    role: 'Creator intelligence OS',
    buyer: 'Creators and experts turning knowledge into useful, owned work.',
    recurringProblem: 'Expertise does not compound when creation, publishing, distribution, and learning remain separate activities.',
    acquisitionPath: 'The free workspace, Creation Engine, and readiness diagnostic route buyers to the right product door.',
    activation: 'Generate a seven-day plan, then ship the first reviewable artifact or installable operating packet.',
    currentValue: 'Free activation and workspace tools, $19–149 self-serve packets, OS Circle at $49/month, and capped Studio review at $297/month.',
    recurringExperiment: 'OS Circle is the current recurring offer. Treat capped Studio as service revenue—not self-service ARR—and retain each only when cohorts prove repeat value.',
    fulfillmentSystem: 'Activation packet, creator vault, signal-to-campaign workflow, approval queue, weekly source pulse, and member artifact review.',
    proofMetric: 'Activation completed, useful artifact shipped, paid conversion by door, and voluntary week-four member return.',
    ctaLabel: 'Run the readiness diagnostic',
    accent: 'cyan',
  },
  {
    id: 'agentic-income',
    name: 'Agentic Income',
    domain: 'agenticincome.ai',
    href: 'https://agenticincome.ai/?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
    role: 'Revenue systems business',
    buyer: 'Builders who want owned, agent-assisted revenue systems instead of isolated income tactics.',
    recurringProblem: 'Offers, demand, delivery, and retention break when they are built as one-off campaigns.',
    acquisitionPath: 'High-intent revenue education and tools lead to an ARR diagnostic and a focused system-building path.',
    activation: 'Select one recurring customer failure, define the repeat value event, and install the first measurable revenue loop.',
    currentValue: 'A distinct public home for agentic revenue systems and asset-based recurring income.',
    recurringExperiment: 'Keep the public brand distinct. Share infrastructure with GenCreator only after customer and traffic data support convergence.',
    fulfillmentSystem: 'Problem-to-offer diagnostic, demand test, delivery workflow, retention review, and monthly economics check.',
    proofMetric: 'A validated offer or installed revenue loop that customers and builders use again.',
    ctaLabel: 'Explore Agentic Income',
    accent: 'sky',
  },
  {
    id: 'starlight',
    name: 'Starlight Intelligence System',
    domain: 'starlightintelligence.org',
    href: '/starlight-intelligence-system?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
    role: 'Open intelligence substrate',
    buyer: 'Builders and teams that need portable, governed human-agent systems.',
    recurringProblem: 'Agentic work degrades when memory, evaluation, governance, and ownership are fragmented.',
    acquisitionPath: 'Open-source documentation, architecture research, and working reference systems lead to adoption.',
    activation: 'Install the open system and produce a portable intelligence artifact in the builder’s own environment.',
    currentValue: 'A free, MIT-licensed, markdown-first intelligence substrate with no subscription or vendor lock-in.',
    recurringExperiment: 'Not a current offer: validate a separate team governance or update service without restricting the open core.',
    fulfillmentSystem: 'Versioned releases, conformance tests, reference agents, documentation, and public implementation evidence.',
    proofMetric: 'Successful installs, useful artifacts produced, repeat project use, and verified contributions.',
    ctaLabel: 'Inspect the open system',
    accent: 'violet',
  },
  {
    id: 'arcanea',
    name: 'Arcanea',
    domain: 'arcanea.ai',
    href: 'https://arcanea.ai/pricing?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
    role: 'World, culture, and owned IP',
    buyer: 'Readers, families, worldbuilders, and creative technologists.',
    recurringProblem: 'Creative work becomes disposable when story, progression, participation, and belonging do not persist.',
    acquisitionPath: 'Stories, music, art, and worldbuilding releases invite readers into a connected creative universe.',
    activation: 'Complete a first story, quest, collection, or worldbuilding artifact that carries forward.',
    currentValue: 'A free open core plus published pre-launch Cloud Sync at $12/month and Studio Bench at $39/month.',
    recurringExperiment: 'Both paid plans are limited pre-launch/waitlist experiments, not proven ARR. Earn general availability through repeat use and paid conversion.',
    fulfillmentSystem: 'Local creation, encrypted sync, semantic search, collaboration and bench runs, supported by a release and canon cadence.',
    proofMetric: 'Activation, waitlist-to-paid conversion, voluntary four-week return, and persistent creation or collaboration.',
    ctaLabel: 'Review the pre-launch plans',
    accent: 'amber',
  },
]

export const portfolioPrograms: PortfolioProgram[] = [
  {
    name: 'Agentic Passive Income',
    decision: 'Keep distinct',
    parent: 'Agentic Income network',
    rule: 'Own the automation stage with inspectable recurring loops, explicit maintenance floors, its own pack, and a focused knowledge base.',
    domain: 'agenticpassiveincome.com',
    href: 'https://agenticpassiveincome.com/?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
  },
  {
    name: 'Disruptive Passive Income',
    decision: 'Keep distinct',
    parent: 'Agentic Income network',
    rule: 'Own the compounding/wealth stage. Reconcile the legacy crypto surface with the current network promise before sending new paid traffic.',
    domain: 'disruptivepassiveincome.com',
    href: 'https://disruptivepassiveincome.com/?utm_source=frankx&utm_medium=business-plan&utm_campaign=portfolio-operating-model',
  },
  {
    name: 'Reality Architect',
    decision: 'Embed',
    parent: 'FrankX publications',
    rule: 'Operate it as a publication and product franchise, not a second software or membership platform.',
  },
  {
    name: 'Music and creator pathways',
    decision: 'Embed',
    parent: 'GenCreator',
    rule: 'Treat each pathway as curriculum, templates, and workflows inside the creator framework.',
  },
  {
    name: 'Anime, clubs, and creative worlds',
    decision: 'Embed',
    parent: 'Arcanea',
    rule: 'Develop them as series, programs, or seasonal experiences that strengthen one persistent world.',
  },
  {
    name: 'AI architecture academies',
    decision: 'Embed',
    parent: 'Starlight',
    rule: 'Ship curriculum against the open substrate; do not duplicate identity, community, or payment systems.',
  },
  {
    name: 'Blue Life and ocean intelligence',
    decision: 'Incubate',
    parent: 'Mission portfolio',
    rule: 'Publish open knowledge first. Add paid intelligence only after a reliable cadence or committed institutional partner exists.',
  },
]

export const revenueEvents: RevenueEvent[] = [
  {
    event: 'A bounded transformation completes',
    model: 'One-time product',
    standard: 'The buyer leaves with a finished asset, decision, or installed capability.',
  },
  {
    event: 'A repeat job keeps producing value',
    model: 'Subscription',
    standard: 'Customers return for a specific recurring outcome and retain because the result continues.',
  },
  {
    event: 'Another builder repeatedly deploys the system',
    model: 'License',
    standard: 'Rights, updates, support boundaries, and the licensed unit are explicit.',
  },
  {
    event: 'Buyers and builders exchange value',
    model: 'Marketplace take rate',
    standard: 'The platform improves discovery, trust, payment, delivery, or reputation.',
  },
  {
    event: 'Owned work is reused or distributed',
    model: 'Royalty or revenue share',
    standard: 'Attribution, ownership, reporting, and payout terms survive beyond one campaign.',
  },
]

export const operatingLoop = [
  ['Discover', 'Earn attention through useful research, stories, tools, and proof.'],
  ['Diagnose', 'Identify the buyer’s recurring problem and the founder’s credible advantage.'],
  ['Activate', 'Help the person ship a useful asset, decision, or installed capability.'],
  ['Operate', 'Support one repeat job through a documented workflow and cadence.'],
  ['Prove', 'Measure return behavior, customer outcome, retention, and economics.'],
  ['Expand', 'Only then add subscriptions, licenses, marketplaces, or royalties.'],
] as const

export const recurringValueTests = [
  ['Primary recurring job', 'One repeat outcome is clear enough that customers return and pay for it.'],
  ['Fresh value', 'New intelligence, releases, templates, quests, or data strengthen the core job.'],
  ['Accumulated value', 'History, assets, progress, reputation, or benchmarks become more useful over time.'],
  ['Operational value', 'Agents or workflows perform recurring work.'],
  ['Network value', 'Collaboration, distribution, exchange, or access improves with participation.'],
] as const
