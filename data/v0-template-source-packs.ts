import { getV0TemplateExcellencePlan } from './v0-template-excellence'
import { getV0TemplateFactoryPack } from './v0-template-packaging'
import { getV0TemplateProductionPlan } from './v0-template-production'
import type { V0TemplateEntry } from './v0-template-library'

export type V0TemplateSourcePackStatus =
  | 'source-pack-next'
  | 'fixture-needed'
  | 'asset-needed'
  | 'v0-brief-ready'
  | 'codex-first'
  | 'evidence-needed'

export type V0TemplateSourcePack = {
  packageId: string
  label: string
  status: V0TemplateSourcePackStatus
  statusLabel: string
  readinessNote: string
  buyerDataset: string[]
  routeFixtures: string[]
  readmeOutline: string[]
  screenshotChecklist: string[]
  v0Handoff: string[]
  codexBuild: string[]
  vercelGithubProof: string[]
  commercialPackaging: string[]
  blockedUntil: string[]
  benchmarkPosition: string
}

export type V0TemplateSourcePackSummary = {
  stats: Array<{
    label: string
    value: string
  }>
  nextPacks: V0TemplateSourcePack[]
  standards: string[]
}

const statusLabels: Record<V0TemplateSourcePackStatus, string> = {
  'source-pack-next': 'Source pack next',
  'fixture-needed': 'Fixture needed',
  'asset-needed': 'Asset needed',
  'v0-brief-ready': 'v0 brief ready',
  'codex-first': 'Codex first',
  'evidence-needed': 'Evidence needed',
}

const prioritySourcePackIds = [
  'frankx-ai-audit-intake-funnel',
  'vercel-ai-workflow-starter',
  'gencreator-course-sales-system',
  'animelegends-trailer-countdown-page',
  'ai-architecture-rag-blueprint',
  'motion-ai-product-launch-film',
  'frankx-personal-ai-coe-microsite',
  'vercel-ai-saas-starter',
  'gencreator-creator-os-landing',
  'animelegends-world-portal',
  'motion-command-room-3d-scene',
  'frankx-executive-command-landing',
]

const prioritySourcePackIdSet = new Set(prioritySourcePackIds)

export function getV0TemplateSourcePackPriorityRank(packageId: string) {
  const index = prioritySourcePackIds.indexOf(packageId)
  return index === -1 ? Number.POSITIVE_INFINITY : index
}

const explicitSourcePacks: Record<string, Partial<V0TemplateSourcePack>> = {
  'frankx-ai-audit-intake-funnel': {
    label: 'AI audit funnel source pack',
    status: 'source-pack-next',
    readinessNote:
      'First FrankX acquisition pack: make the buyer intake, score logic, proof placeholder, and follow-up path real before any more visual exploration.',
    buyerDataset: [
      'Three sample buyer profiles: consultant, agency owner, and operator-founder.',
      'Audit intake questions with low, medium, and high readiness examples.',
      'Qualification outcomes that say what is known, unknown, and not promised.',
    ],
    routeFixtures: [
      'Hero with one proof object and one qualification CTA.',
      'Multi-step intake preview with empty, partial, complete, and invalid states.',
      'Result preview that uses caveated recommendations, not invented ROI.',
      'Follow-up panel with email/export placeholder and manual review boundary.',
    ],
    commercialPackaging: [
      'Prompt pack for an AI readiness audit funnel.',
      'Source pack with intake schema, score labels, result copy, and README.',
      'Done-with-you implementation upsell for consultants who want their offer wired.',
    ],
  },
  'vercel-ai-workflow-starter': {
    label: 'Vercel AI workflow starter source pack',
    status: 'source-pack-next',
    readinessNote:
      'First deployable starter pack: freeze the state machine, env boundary, queue/result fixture, and README before v0 drafts the app shell.',
    buyerDataset: [
      'Workflow fixture with ingest, plan, run, review, publish, and retry states.',
      'Safe document/source examples that show citations without private data.',
      'Eval questions and expected outputs for one content or research workflow.',
    ],
    routeFixtures: [
      'Workflow builder shell with step cards and run timeline.',
      'Source drawer, result review panel, error/retry state, and eval tab.',
      'Setup panel showing env key names only and deployment boundary notes.',
      'README excerpt visible enough to prove the starter can become real.',
    ],
    commercialPackaging: [
      'Free preview as a Vercel AI workflow UI.',
      'Paid source pack with fixtures, README, env-example keys, and eval sheet.',
      'Custom implementation path for teams needing auth, storage, and workflow queues.',
    ],
  },
  'gencreator-course-sales-system': {
    label: 'Creator course sales source pack',
    status: 'source-pack-next',
    readinessNote:
      'First GenCreator monetization pack: define the course schema, lesson proof, support/refund language, and creator-safe sample data.',
    buyerDataset: [
      'Course profile with title, audience, promise, modules, lessons, outcomes, and support boundary.',
      'Sample creator proof that avoids income claims and fake audience numbers.',
      'Launch calendar with waitlist, open cart, close cart, onboarding, and student success states.',
    ],
    routeFixtures: [
      'Sales page with curriculum, outcomes, proof rail, FAQ, and enrollment CTA.',
      'Student dashboard preview with lesson states and support route.',
      'Launch asset rail for emails, social crops, and checkout boundary notes.',
      'Empty states for creators who do not have testimonials yet.',
    ],
    commercialPackaging: [
      'Prompt pack for course/cohort sales pages.',
      'Source pack with course JSON, launch calendar, email outline, and README.',
      'GenCreator implementation upsell for checkout, community, and student dashboard wiring.',
    ],
  },
  'animelegends-trailer-countdown-page': {
    label: 'AnimeLegends trailer drop source pack',
    status: 'asset-needed',
    readinessNote:
      'First media-drop pack: no v0 until the original poster frame, release date states, rights note, and reduced-motion story are defined.',
    buyerDataset: [
      'Trailer release fixture with title, date, time zone, platform links, and reminder copy.',
      'Original-world metadata: faction, characters, episode/chapter link, credits, and rights note.',
      'Countdown states for upcoming, today, live, replay, delayed, and archived.',
    ],
    routeFixtures: [
      'Poster-led hero with countdown and notification CTA.',
      'Teaser rail with original stills or safe placeholders only.',
      'Credits and rights panel before community share actions.',
      'Reduced-motion static version with the same date and CTA information.',
    ],
    commercialPackaging: [
      'Media-drop prompt pack for original worlds.',
      'Source pack with release JSON, countdown states, credits, and rights copy.',
      'Motion upsell for trailer teaser, YouTube thumbnail, and social cutdowns.',
    ],
  },
  'ai-architecture-rag-blueprint': {
    label: 'RAG blueprint source pack',
    status: 'codex-first',
    readinessNote:
      'First architecture pack: build diagram labels, source boundaries, eval questions, and risk notes before any visual polish.',
    buyerDataset: [
      'Small citation-safe corpus fixture with source titles, URLs, freshness dates, and chunk notes.',
      'Architecture decision table for retrieval, reranking, answer synthesis, and fallback behavior.',
      'Eval questions with pass, partial, fail, and needs-source labels.',
    ],
    routeFixtures: [
      'Blueprint diagram with labeled data flow and risk/control points.',
      'Search/answer UI state with citations, missing-source, and low-confidence paths.',
      'Implementation README excerpt and eval scorecard.',
      'Risk note panel that avoids compliance and accuracy overclaims.',
    ],
    commercialPackaging: [
      'Architecture prompt pack for RAG proposal pages.',
      'Source pack with corpus schema, eval sheet, diagram labels, and README.',
      'Consulting upsell for retrieval design, eval setup, and deployment review.',
    ],
  },
  'motion-ai-product-launch-film': {
    label: 'AI product launch film source pack',
    status: 'asset-needed',
    readinessNote:
      'First motion pack: pick a real product route, capture proof stills, score the poster, then decide whether Remotion or page motion is earned.',
    buyerDataset: [
      'One real product route with before, mechanism, proof, transformation, and CTA beats.',
      'Shot list with browser captures, product stills, copy overlays, and caption-safe text.',
      'Export matrix for 16:9, 9:16, 4:5, 1:1, poster, and silent fallback.',
    ],
    routeFixtures: [
      'Landing-page embed frame with poster-first hero.',
      'Storyboard strip with beat labels and proof notes.',
      'Reduced-motion still and mobile crop preview.',
      'Asset manifest panel for source captures, prompts, exports, and QA score.',
    ],
    commercialPackaging: [
      'Launch-film brief template.',
      'Source pack with storyboard JSON, crop matrix, caption map, and Remotion handoff.',
      'Premium motion upsell for launch film, hero embed, and social cutdowns.',
    ],
  },
  'frankx-personal-ai-coe-microsite': {
    label: 'Personal AI CoE source pack',
    status: 'source-pack-next',
    readinessNote:
      'First personal AI operating-system pack: make the tool stack, weekly loop, governance notes, and lead magnet real before any visual expansion.',
    buyerDataset: [
      'Executive, creator, and solo-operator profiles with different AI maturity levels.',
      'Weekly operating loop fixture with capture, triage, build, publish, review, and archive states.',
      'Tool stack table with role, risk, cost band, owner, and replacement notes.',
    ],
    routeFixtures: [
      'Microsite hero with AI CoE map and one download CTA.',
      'Tool stack comparison with caveated recommendations and no affiliate claims unless sourced.',
      'Weekly loop board with empty, active, blocked, and reviewed states.',
      'Implementation path that separates free checklist, source pack, and custom setup.',
    ],
    commercialPackaging: [
      'Lead magnet checklist for a personal AI CoE.',
      'Source pack with loop JSON, tool stack schema, README, and prompt library outline.',
      'Consulting upsell for private AI operating-system setup.',
    ],
  },
  'vercel-ai-saas-starter': {
    label: 'Vercel AI SaaS starter source pack',
    status: 'source-pack-next',
    readinessNote:
      'First AI SaaS deploy pack: freeze stack choices, env key names, auth/billing boundary, safe fixtures, and README before UI generation.',
    buyerDataset: [
      'Founder profile with app idea, plan tiers, user roles, and one AI feature boundary.',
      'Safe demo data for dashboard, usage, billing status, and admin review states.',
      'Environment key-name list with no values and clear server/client ownership.',
    ],
    routeFixtures: [
      'Landing page, app dashboard, account/billing state, and admin shell preview.',
      'Setup panel with local run, env keys, deploy path, and known limits.',
      'Usage/cost state with empty, warning, capped, and paid-plan states.',
      'README excerpt that proves a deployable starter path exists.',
    ],
    commercialPackaging: [
      'Deployable Vercel starter prompt pack.',
      'Source pack with safe fixtures, env guide, README, and test checklist.',
      'Implementation upsell for auth, billing, AI SDK, and deployment hardening.',
    ],
  },
  'gencreator-creator-os-landing': {
    label: 'GenCreator OS launch source pack',
    status: 'source-pack-next',
    readinessNote:
      'First GenCreator brand pack: define creator paths, proof-safe examples, waitlist states, and launch assets before expanding the product surface.',
    buyerDataset: [
      'Creator profile examples for educator, media creator, and productized-service creator.',
      'Path fixtures for content engine, course/cohort, sponsorship, digital product, and community loop.',
      'Waitlist and onboarding states with no fake creator outcomes.',
    ],
    routeFixtures: [
      'Product landing route with creator paths, proof rail, join CTA, and workflow preview.',
      'Creator-system cards that are fillable with user data.',
      'Launch asset strip for social, email, and community announcement crops.',
      'FAQ and support boundary copy for early access.',
    ],
    commercialPackaging: [
      'GenCreator launch prompt pack.',
      'Source pack with creator path JSON, launch email outline, social crop list, and README.',
      'Implementation upsell for creator OS dashboard and cohort hub.',
    ],
  },
  'animelegends-world-portal': {
    label: 'AnimeLegends world portal source pack',
    status: 'asset-needed',
    readinessNote:
      'First world portal pack: freeze canon structure, original visual direction, credits, rights notes, and public-safe labels before v0.',
    buyerDataset: [
      'Original-world fixture with factions, characters, places, episodes, timeline, and public labels.',
      'Canon status fields for draft, approved, spoiler, archive, and public release.',
      'Rights and credits note for every image, symbol, soundtrack, and public text block.',
    ],
    routeFixtures: [
      'World portal hero with one original canon object and one exploration CTA.',
      'Faction/character/lore navigation with deterministic text overlays.',
      'Timeline and episode/chapter cards with spoiler-safe states.',
      'Credits, rights, and community safety panel before sharing.',
    ],
    commercialPackaging: [
      'Original-world portal prompt pack.',
      'Source pack with canon JSON, rights notes, style-frame brief, and README.',
      'Motion upsell for trailer, character reveals, and social cutdowns.',
    ],
  },
  'motion-command-room-3d-scene': {
    label: 'Command room 3D source pack',
    status: 'asset-needed',
    readinessNote:
      'First 3D scene pack: create the metaphor, camera story, poster fallback, mobile simplification, and performance budget before code or generation.',
    buyerDataset: [
      'Scene brief with cockpit, deal room, agent swarm, growth engine, and signal radar metaphor choices.',
      'Camera-state fixture for still, hover, focus, reveal, reduced-motion, and mobile fallback.',
      'Asset manifest fields for source file, poster, texture, HDRI, rights, and inspection notes.',
    ],
    routeFixtures: [
      'Poster-first hero with no-WebGL fallback and one proof/action rail.',
      '3D scene card with runtime, budget, controls, and reduced-motion static story.',
      'Crop matrix for desktop hero, mobile hero, OG, 1:1, 4:5, and 9:16.',
      'Performance notes before the scene can appear on a public route.',
    ],
    commercialPackaging: [
      '3D command-room scene brief template.',
      'Source pack with scene JSON, poster requirements, crop matrix, and QA checklist.',
      'Premium asset upsell for R3F scene, rendered poster, and launch video.',
    ],
  },
  'frankx-executive-command-landing': {
    label: 'Executive command landing source pack',
    status: 'source-pack-next',
    readinessNote:
      'First FrankX authority pack: convert the existing public route into a reusable offer/proof/CTA source pack with no vague AI-service copy.',
    buyerDataset: [
      'Consultant, AI agency, and operator-founder buyer examples with proof expectation and next action.',
      'Offer-stack fixture with scope, exclusions, proof object, qualification path, and follow-up note.',
      'Case-study placeholder states that mark unknown proof instead of inventing metrics.',
    ],
    routeFixtures: [
      'Hero with executive command claim, proof object, and one primary CTA.',
      'Offer stack, proof ledger, architecture/process view, and qualification section.',
      'Mobile first viewport and CTA reachability proof.',
      'README snippet explaining how to adapt the page without breaking FrankX voice.',
    ],
    commercialPackaging: [
      'Premium AI service landing prompt pack.',
      'Source pack with offer schema, proof states, README, and v0 handoff.',
      'Implementation upsell for consultants and agencies who need their own command landing page.',
    ],
  },
}

export const v0SourcePackStandards = [
  'Every source pack has buyer data, route fixtures, README shape, screenshots, v0 handoff, Codex build tasks, and GitHub/Vercel proof.',
  'v0 only receives the pack after Codex freezes truth, route, asset tier, blocked patterns, and acceptance criteria.',
  'A pack can be cinematic, but it must also be useful: source data, implementation notes, and a buyer job come before effects.',
  'GetLayers validates the prompt/source/3D library category; FrankX must exceed it with business systems, evidence, and deployable proof.',
]

function inferSourcePackStatus(entry: V0TemplateEntry): V0TemplateSourcePackStatus {
  const factory = getV0TemplateFactoryPack(entry)

  if (prioritySourcePackIdSet.has(entry.id)) {
    return 'source-pack-next'
  }

  if (factory.v0Decision === 'codex-first') {
    return 'codex-first'
  }

  if (entry.assetTier.includes('B') || entry.channels.includes('motion') || entry.channels.includes('animelegends')) {
    return 'asset-needed'
  }

  if (factory.readiness === 'v0-ready') {
    return 'v0-brief-ready'
  }

  if (factory.readiness === 'preview-needed' || factory.readiness === 'public-ready') {
    return 'evidence-needed'
  }

  return 'fixture-needed'
}

function getDefaultBuyerDataset(entry: V0TemplateEntry) {
  return [
    `${entry.brand} sample buyer profile for ${entry.audience}.`,
    `${entry.family} content model with honest empty, partial, ready, and blocked states.`,
    `Proof fixture for ${entry.assetSource}.`,
  ]
}

function getDefaultRouteFixtures(entry: V0TemplateEntry) {
  return [
    `Package route at /v/${entry.id}.`,
    `Lane route plus public card for ${entry.title}.`,
    `Primary sections: ${entry.deliverables.join(', ')}.`,
    'Desktop, mobile, loading, empty, error, and proof-not-ready states where relevant.',
  ]
}

function getDefaultReadmeOutline(entry: V0TemplateEntry) {
  const factory = getV0TemplateFactoryPack(entry)

  return [
    'Buyer, route, primary action, and template promise.',
    'Included sections/components and fixture data shape.',
    ...factory.sourcePack.docs.slice(0, 3),
    'Known limits, blocked claims, and customization notes.',
  ]
}

function getDefaultScreenshotChecklist(entry: V0TemplateEntry) {
  const excellence = getV0TemplateExcellencePlan(entry)

  return [
    'Desktop first viewport.',
    'Mobile first viewport.',
    'Package detail page proof section.',
    ...excellence.assetProduction.requiredAssets.slice(0, 3),
  ]
}

function getDefaultV0Handoff(entry: V0TemplateEntry) {
  const excellence = getV0TemplateExcellencePlan(entry)

  return [
    excellence.v0Use.promptGoal,
    excellence.v0Use.refinementGoal,
    excellence.v0Use.stopRule,
  ]
}

function getDefaultCodexBuild(entry: V0TemplateEntry) {
  const factory = getV0TemplateFactoryPack(entry)
  const production = getV0TemplateProductionPlan(entry)

  return [
    production.codexTrigger,
    ...factory.sourcePack.repoWork.slice(0, 3),
    ...factory.sourcePack.checks.slice(0, 2),
  ]
}

function getDefaultVercelGithubProof(entry: V0TemplateEntry) {
  const production = getV0TemplateProductionPlan(entry)

  return [
    `GitHub issue #${production.issue.number}: ${production.issue.title}.`,
    'Draft PR or issue comment with file list, accepted patterns, and rejected patterns.',
    entry.channels.includes('vercel')
      ? 'Vercel preview, deploy path, or README deploy recipe before deployable claims.'
      : 'Route smoke and preview note before public-ready claims.',
  ]
}

function getDefaultCommercialPackaging(entry: V0TemplateEntry) {
  const factory = getV0TemplateFactoryPack(entry)

  return [
    'Public package card.',
    'Prompt pack with blocked patterns and acceptance gate.',
    ...factory.productization.map((item) => item.value).slice(0, 2),
  ]
}

function getDefaultBlockedUntil(entry: V0TemplateEntry) {
  const production = getV0TemplateProductionPlan(entry)

  return [
    production.publicReadiness,
    ...production.proofNeeded.slice(0, 3),
  ]
}

export function getV0TemplateSourcePack(entry: V0TemplateEntry): V0TemplateSourcePack {
  const explicit = explicitSourcePacks[entry.id]
  const status = explicit?.status ?? inferSourcePackStatus(entry)
  const pack: V0TemplateSourcePack = {
    packageId: entry.id,
    label: explicit?.label ?? `${entry.title} source pack`,
    status,
    statusLabel: statusLabels[status],
    readinessNote:
      explicit?.readinessNote ??
      `Turn ${entry.title} into a reusable package only after the fixture data, README, screenshots, and proof path are concrete.`,
    buyerDataset: explicit?.buyerDataset ?? getDefaultBuyerDataset(entry),
    routeFixtures: explicit?.routeFixtures ?? getDefaultRouteFixtures(entry),
    readmeOutline: explicit?.readmeOutline ?? getDefaultReadmeOutline(entry),
    screenshotChecklist: explicit?.screenshotChecklist ?? getDefaultScreenshotChecklist(entry),
    v0Handoff: explicit?.v0Handoff ?? getDefaultV0Handoff(entry),
    codexBuild: explicit?.codexBuild ?? getDefaultCodexBuild(entry),
    vercelGithubProof: explicit?.vercelGithubProof ?? getDefaultVercelGithubProof(entry),
    commercialPackaging: explicit?.commercialPackaging ?? getDefaultCommercialPackaging(entry),
    blockedUntil: explicit?.blockedUntil ?? getDefaultBlockedUntil(entry),
    benchmarkPosition:
      explicit?.benchmarkPosition ??
      'Compete above cinematic prompt libraries by adding buyer data, implementation proof, source notes, and release evidence.',
  }

  return pack
}

export function getV0TemplateSourcePackSummary(entries: V0TemplateEntry[]): V0TemplateSourcePackSummary {
  const packs = entries.map(getV0TemplateSourcePack)
  const nextPacks = packs
    .filter((pack) => pack.status === 'source-pack-next')
    .sort((a, b) => {
      const rankDelta =
        getV0TemplateSourcePackPriorityRank(a.packageId) - getV0TemplateSourcePackPriorityRank(b.packageId)
      return rankDelta === 0 ? a.label.localeCompare(b.label) : rankDelta
    })
  const assetNeeded = packs.filter((pack) => pack.status === 'asset-needed').length
  const v0Ready = packs.filter((pack) => pack.status === 'v0-brief-ready').length
  const codexFirst = packs.filter((pack) => pack.status === 'codex-first').length

  return {
    stats: [
      { label: 'Source packs', value: String(packs.length) },
      { label: 'Next packs', value: String(nextPacks.length) },
      { label: 'Asset needed', value: String(assetNeeded) },
      { label: 'v0 brief ready', value: String(v0Ready) },
      { label: 'Codex first', value: String(codexFirst) },
    ],
    nextPacks,
    standards: v0SourcePackStandards,
  }
}
