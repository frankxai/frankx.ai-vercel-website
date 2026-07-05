import { getV0TemplateDemandPlan } from './v0-template-demand'
import { getV0TemplateFactoryPack } from './v0-template-packaging'
import { getV0TemplateProductionPlan } from './v0-template-production'
import type { V0TemplateChannel, V0TemplateEntry } from './v0-template-library'

export type V0TemplateMarketplaceShelfId =
  | 'ai-business-acquisition'
  | 'deployable-ai-products'
  | 'creator-monetization'
  | 'original-world-media'
  | 'architecture-governance'
  | 'motion-asset-systems'
  | 'template-ops-infrastructure'

export type V0TemplateMarketplaceShelf = {
  id: V0TemplateMarketplaceShelfId
  label: string
  buyer: string
  intent: string
  marketSignal: string
  premiumDifference: string
  bundlePath: string[]
  successMetric: string
  entryIds: string[]
}

export type V0TemplateMarketplaceShelfPlan = V0TemplateMarketplaceShelf & {
  entries: V0TemplateEntry[]
  priorityEntries: V0TemplateEntry[]
  sprintEntry?: V0TemplateEntry
}

export type V0TemplateMarketplacePlan = {
  shelves: V0TemplateMarketplaceShelfPlan[]
  stats: Array<{
    label: string
    value: string
  }>
  qualityBar: string[]
  currentGaps: string[]
}

const shelves: V0TemplateMarketplaceShelf[] = [
  {
    id: 'ai-business-acquisition',
    label: 'AI business acquisition',
    buyer: 'AI consultants, agencies, fractional CTOs, and operator-founders selling implementation work',
    intent: 'Turn attention into qualified calls, audit requests, proof-led case studies, and premium offer pages.',
    marketSignal:
      'AI buyers have seen enough generic landing pages; they need mechanism, proof, scope, and trust before they book.',
    premiumDifference:
      'FrankX packages combine commercial copy, proof ledger, offer architecture, and route/preview evidence.',
    bundlePath: ['AI Audit Intake Funnel', 'Fractional AI CTO Page', 'AI Business Offer Page', 'Proof Ledger Case Study'],
    successMetric: 'A buyer can understand the offer, inspect proof, and know the exact next step in one scroll.',
    entryIds: [
      'frankx-executive-command-landing',
      'frankx-ai-business-offer-page',
      'proof-ledger-case-study',
      'frankx-personal-ai-coe-microsite',
      'frankx-ai-audit-intake-funnel',
      'frankx-fractional-ai-cto-page',
      'frankx-workshop-command-room',
      'frankx-client-delivery-portal',
      'frankx-agent-product-demo-page',
      'vercel-edge-lead-magnet',
    ],
  },
  {
    id: 'deployable-ai-products',
    label: 'Deployable AI products',
    buyer: 'Developers, founders, and teams who need AI app starters that can become real Vercel projects',
    intent: 'Move from a beautiful shell into auth boundaries, data contracts, evals, docs, and preview deployment.',
    marketSignal:
      'The most useful AI templates are no longer pure landing pages; they need chat, RAG, workflow, admin, and cost states.',
    premiumDifference:
      'FrankX treats Vercel starters as product kits: frontend, README, env notes, risk boundaries, fixtures, and preview proof.',
    bundlePath: ['AI SaaS Starter', 'AI Workflow Starter', 'RAG Docs Portal', 'Agent Browser Operator'],
    successMetric: 'A builder can fork the package and understand setup, limits, and release path without private context.',
    entryIds: [
      'vercel-ai-saas-starter',
      'vercel-ai-chat-assistant',
      'vercel-platform-api-generator',
      'vercel-content-agent-site',
      'vercel-auth-billing-console',
      'vercel-launch-changelog-docs',
      'vercel-ai-workflow-starter',
      'vercel-rag-docs-portal',
      'vercel-multi-tenant-admin',
      'vercel-agent-browser-operator',
      'vercel-ai-gateway-cost-console',
    ],
  },
  {
    id: 'creator-monetization',
    label: 'Creator monetization systems',
    buyer: 'Creators, educators, newsletter operators, YouTubers, and small creator teams',
    intent: 'Package content, community, sponsorships, courses, digital products, and CRM workflows into reusable systems.',
    marketSignal:
      'Creators do not need another pretty bio page; they need fillable revenue, publishing, and partner operations.',
    premiumDifference:
      'GenCreator templates ship with schemas, export paths, proof-safe copy, launch loops, and social assets.',
    bundlePath: ['Creator OS Landing', 'Course Sales System', 'Newsletter Sponsorship Kit', 'YouTube Channel OS'],
    successMetric: 'A creator can replace sample content with their data and publish a credible offer or operating surface.',
    entryIds: [
      'gencreator-creator-os-landing',
      'gencreator-cohort-hub',
      'gencreator-media-kit',
      'gencreator-launch-calendar',
      'gencreator-faceless-stack-page',
      'frankx-creator-revenue-flywheel',
      'gencreator-course-sales-system',
      'gencreator-newsletter-sponsorship-kit',
      'gencreator-youtube-channel-os',
      'gencreator-digital-product-launch',
      'gencreator-brand-deal-crm',
    ],
  },
  {
    id: 'original-world-media',
    label: 'Original-world media',
    buyer: 'Original IP teams, creators, fan-community operators, and worldbuilding studios',
    intent: 'Create canon-safe portals, character systems, episode drops, readers, soundtrack pages, and community workflows.',
    marketSignal:
      'Worldbuilding templates are valuable only when they protect canon, rights, text, and community safety before visuals.',
    premiumDifference:
      'AnimeLegends packages pair cinematic direction with canon JSON, rights notes, moderation states, and deterministic labels.',
    bundlePath: ['World Portal', 'Character Bible', 'Trailer Countdown', 'Manga Reader'],
    successMetric: 'Fans understand the world while the studio can verify rights, canon, and public text.',
    entryIds: [
      'animelegends-world-portal',
      'animelegends-character-bible',
      'animelegends-episode-drop-page',
      'animelegends-lore-timeline',
      'animelegends-fan-hub',
      'animelegends-collectible-card-gallery',
      'animelegends-studio-pitch-page',
      'animelegends-trailer-countdown-page',
      'animelegends-manga-reader-template',
      'animelegends-soundtrack-release-page',
      'animelegends-faction-recruiting-page',
      'animelegends-ugc-fan-art-submission',
    ],
  },
  {
    id: 'architecture-governance',
    label: 'AI architecture and governance',
    buyer: 'AI leads, CTOs, enterprise operators, and teams moving from demos to governed systems',
    intent: 'Turn AI strategy into diagrams, eval reports, risk registers, model-routing decisions, and implementation packets.',
    marketSignal:
      'The market is hungry for credible AI architecture that is source-backed, reproducible, and executive-readable.',
    premiumDifference:
      'FrankX packages architecture as diagrams, fixtures, eval criteria, README decisions, and human-review gates.',
    bundlePath: ['RAG Blueprint', 'Prompt Eval Report', 'AI Risk Register', 'Agent Tool Registry'],
    successMetric: 'A team can turn the template into a decision meeting, implementation brief, or release gate.',
    entryIds: [
      'ai-architecture-rag-blueprint',
      'ai-architecture-multi-agent-command-center',
      'ai-architecture-ai-coe-governance',
      'ai-architecture-eval-lab',
      'frankx-model-routing-deal-room',
      'ai-architecture-prompt-eval-report',
      'ai-architecture-compliance-risk-register',
      'ai-architecture-agent-tool-registry',
      'vercel-rag-docs-portal',
      'vercel-ai-gateway-cost-console',
    ],
  },
  {
    id: 'motion-asset-systems',
    label: 'Motion and 3D asset systems',
    buyer: 'Premium founders, product marketers, designers, and agents producing launch-grade web/media assets',
    intent: 'Create poster-first motion, inspected 3D scenes, social cutdowns, and scroll stories without decorative spectacle.',
    marketSignal:
      'Premium template buyers increasingly expect cinematic assets, prompts, motion packs, and source files, not static screenshots.',
    premiumDifference:
      'FrankX requires still-frame approval, reduced-motion fallbacks, crop evidence, source paths, and performance budgets.',
    bundlePath: ['3D Command Room Scene', 'AI Product Launch Film', 'Social Motion Pack', '3D Template Gallery'],
    successMetric: 'The still frame works alone, motion has a named job, and every crop can be inspected.',
    entryIds: [
      'frankx-social-og-drop-kit',
      'motion-command-room-3d-scene',
      'motion-scroll-sales-story',
      'motion-social-announcement-pack',
      'motion-ai-product-launch-film',
      'motion-3d-template-gallery',
      'animelegends-trailer-countdown-page',
      'animelegends-soundtrack-release-page',
    ],
  },
  {
    id: 'template-ops-infrastructure',
    label: 'Template ops infrastructure',
    buyer: 'Agent teams, design systems, and internal operators turning repeated work into governed reusable packages',
    intent: 'Package prompts, section libraries, design-system imports, benchmark rules, QA gates, and command-center cards.',
    marketSignal:
      'As AI UI generation gets faster, the scarce asset is reusable governance that prevents repeated token waste.',
    premiumDifference:
      'FrankX links every accepted template to prompt/source/assets/preview/issues so good work compounds.',
    bundlePath: ['v0 Section Library', 'Design System Import Pack', 'GetLayers Benchmark', 'Command Center Card'],
    successMetric: 'A future agent can reuse the package without reopening the whole design debate.',
    entryIds: [
      'v0-section-library',
      'v0-design-system-import-pack',
      'getlayers-quality-benchmark',
      'motion-3d-template-gallery',
      'ai-architecture-agent-tool-registry',
    ],
  },
]

function entryMatchesChannel(entry: V0TemplateEntry, channel: V0TemplateChannel) {
  return entry.channels.includes(channel)
}

function entryScore(entry: V0TemplateEntry) {
  const demand = getV0TemplateDemandPlan(entry)
  const production = getV0TemplateProductionPlan(entry)
  const factory = getV0TemplateFactoryPack(entry)

  const demandScore = demand.tier === 'S' ? 30 : demand.tier === 'A' ? 18 : 8
  const priorityScore = production.priority === 'P0' ? 20 : production.priority === 'P1' ? 10 : 4
  const v0Score = factory.v0Decision === 'use-v0' ? 6 : 0
  const deployScore = entryMatchesChannel(entry, 'vercel') ? 5 : 0
  const motionScore = entryMatchesChannel(entry, 'motion') ? 4 : 0

  return demandScore + priorityScore + v0Score + deployScore + motionScore
}

function getEntriesForShelf(shelf: V0TemplateMarketplaceShelf, entries: V0TemplateEntry[]) {
  const explicitIds = new Set(shelf.entryIds)

  return entries
    .filter((entry) => explicitIds.has(entry.id))
    .sort((a, b) => entryScore(b) - entryScore(a))
}

export function getV0TemplateMarketplaceShelves(entries: V0TemplateEntry[]): V0TemplateMarketplaceShelfPlan[] {
  return shelves
    .map((shelf) => {
      const shelfEntries = getEntriesForShelf(shelf, entries)

      return {
        ...shelf,
        entries: shelfEntries,
        priorityEntries: shelfEntries.slice(0, 4),
        sprintEntry: shelfEntries[0],
      }
    })
    .filter((shelf) => shelf.entries.length > 0)
}

export function getV0TemplateMarketplaceShelvesForEntry(
  entry: V0TemplateEntry,
  entries: V0TemplateEntry[],
): V0TemplateMarketplaceShelfPlan[] {
  return getV0TemplateMarketplaceShelves(entries).filter((shelf) =>
    shelf.entries.some((candidate) => candidate.id === entry.id),
  )
}

export function getV0TemplateMarketplacePlan(entries: V0TemplateEntry[]): V0TemplateMarketplacePlan {
  const shelfPlans = getV0TemplateMarketplaceShelves(entries)
  const priorityEntryIds = new Set(shelfPlans.flatMap((shelf) => shelf.priorityEntries.map((entry) => entry.id)))
  const deployableCount = entries.filter((entry) => entryMatchesChannel(entry, 'vercel')).length
  const v0Count = entries.filter((entry) => entryMatchesChannel(entry, 'v0')).length
  const brandCount = new Set(entries.map((entry) => entry.brand)).size

  return {
    shelves: shelfPlans,
    stats: [
      { label: 'Buyer shelves', value: String(shelfPlans.length) },
      { label: 'Featured packages', value: String(priorityEntryIds.size) },
      { label: 'v0 candidates', value: String(v0Count) },
      { label: 'Deployable starters', value: String(deployableCount) },
      { label: 'Brands', value: String(brandCount) },
    ],
    qualityBar: [
      'Each shelf must name the buyer, the job, and the first package to build next.',
      'Every featured template needs proof, source, preview, or an explicit not-ready state.',
      'v0 work stops after one build pass and one refinement unless Codex sees a specific gap.',
      'Motion and 3D shelves require poster-first approval, reduced-motion fallback, and crop evidence.',
      'Deployable shelves require README, env boundary, security notes, and Vercel preview or reproducible deploy path.',
    ],
    currentGaps: [
      'Turn the first package in each shelf into a source-backed starter, not only a public package page.',
      'Capture desktop/mobile screenshots for the highest-demand package in each shelf.',
      'Create Tier A or Tier B hero assets for GenCreator, AnimeLegends, and motion shelves before public-ready promotion.',
      'Add one README/source-pack artifact per deployable Vercel starter before claiming fork-ready status.',
    ],
  }
}
