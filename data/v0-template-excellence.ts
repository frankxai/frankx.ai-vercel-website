import { getV0TemplateDemandPlan } from './v0-template-demand'
import { getV0TemplateFactoryPack, type V0TemplateFactoryMode } from './v0-template-packaging'
import { getV0TemplateProductionPlan } from './v0-template-production'
import type { V0TemplateEntry } from './v0-template-library'

export type V0TemplateDesignArchetype =
  | 'executive-command'
  | 'deployable-product-console'
  | 'creator-revenue-studio'
  | 'world-media-canon'
  | 'architecture-decision-room'
  | 'motion-scene-system'
  | 'template-ops-lab'

export type V0TemplateMotionLevel = 'static-first' | 'local-state' | 'authored-motion' | '3d-or-film'

export type V0TemplateExcellencePlan = {
  archetype: V0TemplateDesignArchetype
  label: string
  firstRead: string
  premiumStandard: string
  artDirection: {
    composition: string
    material: string
    typography: string
    palette: string
    proofObject: string
  }
  assetProduction: {
    tier: V0TemplateEntry['assetTier']
    sourceMethod: string
    requiredAssets: string[]
    blockedAssets: string[]
    evidence: string[]
  }
  motion: {
    level: V0TemplateMotionLevel
    job: string
    runtime: string
    reducedMotion: string
  }
  v0Use: {
    budget: string
    promptGoal: string
    refinementGoal: string
    stopRule: string
  }
  agencyPass: {
    council: string[]
    scoreTarget: string
    qa: string[]
  }
  routeToBuild: {
    nextArtifact: string
    owner: string
    trigger: string
    doneProof: string
  }
  antiSlop: string[]
}

export type V0TemplateExcellenceSummary = {
  stats: Array<{
    label: string
    value: string
  }>
  standards: string[]
  nextMoves: string[]
}

export const v0TemplateExcellenceStandards = [
  'Brief before build: buyer, first read, proof object, asset tier, motion job, and route are named before v0.',
  'Asset before effects: Tier A/B/C proof or inspected generated media carries the first viewport, never filler.',
  'Motion earns its runtime: static frame first, Track A for state, Track B only for a mechanism or brand-memory scene.',
  'One v0 build pass and one refinement pass; if it still feels generic, restart the brief rather than spending more tokens.',
  'Public-ready means evidence: screenshots, source/provenance, README or usage notes, GitHub receipt, and preview where relevant.',
]

const archetypeLabels: Record<V0TemplateDesignArchetype, string> = {
  'executive-command': 'Executive command room',
  'deployable-product-console': 'Deployable product console',
  'creator-revenue-studio': 'Creator revenue studio',
  'world-media-canon': 'Original-world media system',
  'architecture-decision-room': 'Architecture decision room',
  'motion-scene-system': 'Motion and 3D scene system',
  'template-ops-lab': 'Template operations lab',
}

const modeToArchetype: Record<V0TemplateFactoryMode, V0TemplateDesignArchetype> = {
  'business-surface': 'executive-command',
  'deployable-starter': 'deployable-product-console',
  'creator-system': 'creator-revenue-studio',
  'world-system': 'world-media-canon',
  'architecture-pack': 'architecture-decision-room',
  'motion-asset': 'motion-scene-system',
  'template-infrastructure': 'template-ops-lab',
}

function getArchetype(entry: V0TemplateEntry): V0TemplateDesignArchetype {
  const factory = getV0TemplateFactoryPack(entry)
  return modeToArchetype[factory.mode]
}

function getFirstRead(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const action = entry.deliverables[0]?.toLowerCase() ?? 'working template'

  const reads: Record<V0TemplateDesignArchetype, string> = {
    'executive-command': `${entry.title} shows the buyer a premium offer, the proof object, and the next commercial action within one scroll.`,
    'deployable-product-console': `${entry.title} reads as a real app starter with visible states, setup limits, and a route from repo to preview.`,
    'creator-revenue-studio': `${entry.title} makes the creator workflow fillable: content, product, community, revenue, and learning loop.`,
    'world-media-canon': `${entry.title} shows an original world artifact while making canon, rights, and public labels inspectable.`,
    'architecture-decision-room': `${entry.title} turns an AI decision into a sober diagram, scorecard, risk view, or implementation packet.`,
    'motion-scene-system': `${entry.title} leads with a scored still frame before motion, 3D, or launch-film production begins.`,
    'template-ops-lab': `${entry.title} teaches the reusable system: prompt, source, asset, issue, preview, QA, and next trigger.`,
  }

  return `${reads[archetype]} Primary surface: ${action}.`
}

function getArtDirection(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const directions: Record<V0TemplateDesignArchetype, V0TemplateExcellencePlan['artDirection']> = {
    'executive-command': {
      composition: 'Asymmetric command layout: proof object first, offer logic second, CTA held in a calm control rail.',
      material: 'Black glass, graphite, crisp borders, restrained signal lines, and real proof panels instead of atmosphere.',
      typography: 'Editorial display for the offer, compact system labels for proof, short executive copy.',
      palette: 'FrankX black, white, graphite, one cool signal accent, and one warm decision accent when needed.',
      proofObject: 'Route screenshot, offer table, case proof, audit result, or implementation artifact.',
    },
    'deployable-product-console': {
      composition: 'Product-first app shell with state panels, empty/error/success examples, and setup proof above marketing.',
      material: 'Developer-grade neutral surfaces, dense tables, readable code/proof blocks, and low-noise navigation.',
      typography: 'Geist-like clarity, tight headings, mono metadata, and no hero-scale type inside dashboard surfaces.',
      palette: 'Neutral base with blue/cyan/emerald status roles and no decorative gradient dependency.',
      proofObject: 'Vercel preview, README excerpt, env boundary, architecture diagram, or safe fixture data.',
    },
    'creator-revenue-studio': {
      composition: 'Workflow board plus conversion surface: creator path, offer, publishing cadence, and export actions.',
      material: 'Warm but precise creator studio surfaces with product screenshots, checklists, and fillable schemas.',
      typography: 'Practical creator copy, scannable headings, strong action labels, and no guru-style urgency.',
      palette: 'Clean light/dark contrast with one creator accent; avoid pastel startup softness.',
      proofObject: 'Course outline, media kit fields, launch calendar, audience-safe stats, or exportable product schema.',
    },
    'world-media-canon': {
      composition: 'Cinematic poster or canon artifact paired with structured lore, credits, rights, and interaction states.',
      material: 'Poster frames, ink, panels, episode metadata, original symbols, and readable story surfaces.',
      typography: 'World-rich but legible: title treatments are expressive, public labels stay deterministic.',
      palette: 'Brand-specific world palette; avoid generic anime neon and franchise-like imitation.',
      proofObject: 'Canon JSON, original poster frame, rights note, character sheet, chapter fixture, or moderation state.',
    },
    'architecture-decision-room': {
      composition: 'Decision-room layout: problem, system diagram, tradeoff table, risk/control matrix, and release verdict.',
      material: 'Technical paper plus command surface: crisp grids, diagrams, status chips, and source-backed notes.',
      typography: 'Executive-readable headings, dense but calm tables, clear labels, and no ornamental tech noise.',
      palette: 'Neutral technical palette with risk/status colors used only for meaning.',
      proofObject: 'Eval fixture, model registry, risk register, architecture diagram, source note, or GitHub workflow.',
    },
    'motion-scene-system': {
      composition: 'Poster-first hero scene with clear foreground subject, quiet negative space, and crop-aware framing.',
      material: 'Inspected poster frames, product captures, rendered media, source files, and fallback stills.',
      typography: 'Minimal overlay type, caption-safe social variants, and no text baked into generated imagery.',
      palette: 'Scene-specific but disciplined; material and lighting do the work before effects.',
      proofObject: 'Poster frame, browser capture, Remotion storyboard, R3F scene brief, or social crop matrix.',
    },
    'template-ops-lab': {
      composition: 'Operating-system view: registry, prompt pack, acceptance checklist, rejected patterns, and next trigger.',
      material: 'Command-center cards, compact tables, file paths, issue links, and reusable governance panels.',
      typography: 'Dense, exact, and developer-friendly; labels and instructions must survive reuse.',
      palette: 'Neutral command palette with status accents only where they encode state.',
      proofObject: 'Prompt pack, source path, QA checklist, issue receipt, preview link, or command-center card.',
    },
  }

  return directions[archetype]
}

function getRequiredAssets(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const base = ['Desktop first viewport capture', 'Mobile first viewport capture', 'Open Graph or 16:9 crop']

  if (entry.assetTier.includes('A')) {
    base.push('Real product, route, data, or proof artifact capture')
  }

  if (entry.assetTier.includes('B')) {
    base.push('Prompt/source log', 'Inspected generated or rendered source frame')
  }

  if (archetype === 'motion-scene-system') {
    base.push('Poster frame', '9:16 social crop', 'Reduced-motion still', 'Performance budget note')
  }

  if (archetype === 'world-media-canon') {
    base.push('Canon data excerpt', 'Rights note', 'Deterministic public-label overlay')
  }

  if (archetype === 'deployable-product-console') {
    base.push('README setup excerpt', 'Safe fixture state', 'Preview or deploy-path evidence')
  }

  return Array.from(new Set(base))
}

function getBlockedAssets(archetype: V0TemplateDesignArchetype) {
  const base = [
    'Generic purple-blue SaaS gradient as the primary visual',
    'Fake dashboard data, fake metrics, fake customers, or fake screenshots',
    'Unreadable generated text, pseudo-logos, or decorative UI noise',
  ]

  if (archetype === 'motion-scene-system') {
    base.push('Generic 3D orb, ring, node cloud, lattice, or motion that hides a weak still frame')
  }

  if (archetype === 'world-media-canon') {
    base.push('Unlicensed franchise likeness, copied anime IP, unresolved character symbols, or rights-unsafe fan bait')
  }

  if (archetype === 'deployable-product-console') {
    base.push('Secret-looking keys, invented backend behavior, auth promises, or deployment success without proof')
  }

  return base
}

function getMotionPlan(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const hasMotion = entry.channels.includes('motion')
  const isDeployable = entry.channels.includes('vercel')

  if (archetype === 'motion-scene-system') {
    return {
      level: '3d-or-film' as const,
      job: 'Create brand memory or explain product transformation after the still frame passes the 26/30 gate.',
      runtime: 'Remotion for rendered films; Three/R3F only for justified scenes; CSS or Motion for small UI states.',
      reducedMotion: 'Poster-only hero, static social crop, and no-WebGL fallback image.',
    }
  }

  if (hasMotion) {
    return {
      level: 'authored-motion' as const,
      job: 'Reveal hierarchy or product sequence, never spectacle.',
      runtime: 'Track A first; Track B only with scene brief, mobile simplification, and fallback.',
      reducedMotion: 'Static sequence with the same proof and CTA visible.',
    }
  }

  if (isDeployable) {
    return {
      level: 'local-state' as const,
      job: 'Clarify app state: loading, success, empty, focus, progress, and navigation.',
      runtime: 'CSS transitions or Motion for React; no scroll rig or WebGL by default.',
      reducedMotion: 'Instant state changes with stable layout and visible focus.',
    }
  }

  return {
    level: 'static-first' as const,
    job: 'Keep the first version still, readable, and proof-led; motion can only support hierarchy later.',
    runtime: 'CSS hover/focus transitions only until visual QA proves the surface.',
    reducedMotion: 'No essential information depends on movement.',
  }
}

function getV0Use(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const factory = getV0TemplateFactoryPack(entry)
  const budget =
    factory.v0Decision === 'use-v0'
      ? 'One build pass plus one refinement pass'
      : factory.v0Decision === 'hold-v0'
        ? 'No v0 until proof, asset, canon, or still-frame brief exists'
        : 'Codex-first; v0 may draft one local component after architecture is frozen'

  const promptGoal =
    archetype === 'motion-scene-system'
      ? 'Design the layout around an approved poster or scene brief, not the final motion asset.'
      : archetype === 'deployable-product-console'
        ? 'Draft the app shell, empty states, hierarchy, and responsive layout after data boundaries are set.'
        : 'Draft one focused surface: first viewport, proof rhythm, sections, CTA, and mobile behavior.'

  return {
    budget,
    promptGoal,
    refinementGoal: 'Tighten hierarchy, typography, spacing, mobile composition, and remove generic residue.',
    stopRule:
      'Stop after the refinement if the candidate still feels generic; improve the brief or proof source instead of spending more tokens.',
  }
}

function getAgencyCouncil(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const roles = ['Creative director', 'Product designer', 'Frontend engineer', 'Visual QA']

  if (entry.channels.includes('motion') || archetype === 'motion-scene-system') {
    roles.push('Motion designer')
  }

  if (entry.channels.includes('animelegends') || archetype === 'world-media-canon') {
    roles.push('Canon and rights reviewer')
  }

  if (entry.channels.includes('vercel') || entry.channels.includes('ai-architecture')) {
    roles.push('Architecture reviewer')
  }

  if (entry.channels.includes('gencreator')) {
    roles.push('Creator business strategist')
  }

  return roles
}

function getQA(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const factory = getV0TemplateFactoryPack(entry)
  const qa = [
    'First viewport shows the actual product, proof, workflow, world, or package, not just mood.',
    'Desktop and mobile text, buttons, media, and status labels have no clipping or incoherent overlap.',
    'Every claim is sourced, linked, or marked as a next action.',
    ...factory.assetPack.inspection.slice(0, 2),
  ]

  if (archetype === 'motion-scene-system') {
    qa.push('Poster, reduced-motion still, 16:9, 4:5, 1:1, and 9:16 crops are inspected before promotion.')
  }

  if (archetype === 'deployable-product-console') {
    qa.push('README, env boundary, secret safety, and preview/deploy path are visible before deployable status.')
  }

  return Array.from(new Set(qa))
}

function getRouteToBuild(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const production = getV0TemplateProductionPlan(entry)
  const demand = getV0TemplateDemandPlan(entry)

  const artifactByArchetype: Record<V0TemplateDesignArchetype, string> = {
    'executive-command': 'Proof-led package page plus one route screenshot or offer proof object.',
    'deployable-product-console': 'Starter README, architecture diagram, fixture states, and Vercel preview or deploy path.',
    'creator-revenue-studio': 'Fillable schema, creator sample dataset, launch checklist, and export state.',
    'world-media-canon': 'Canon/rights packet, original style frame, public labels, and moderation or credit states.',
    'architecture-decision-room': 'Diagram, eval/risk fixture, decision table, and implementation README.',
    'motion-scene-system': 'Poster frame, beat sheet, crop matrix, reduced-motion fallback, and performance budget.',
    'template-ops-lab': 'Reusable prompt/source/QA card with issue, preview, accepted patterns, and rejected patterns.',
  }

  return {
    nextArtifact: artifactByArchetype[archetype],
    owner: production.laneLabel,
    trigger:
      demand.tier === 'S'
        ? 'Start in the next sprint before any third v0 pass.'
        : 'Start when buyer proof, source data, or asset evidence becomes concrete.',
    doneProof: `Issue #${production.issue.number}, /v/${entry.id}, evidence checklist, and ${production.publicReadiness.toLowerCase()}`,
  }
}

function getAntiSlop(entry: V0TemplateEntry, archetype: V0TemplateDesignArchetype) {
  const factory = getV0TemplateFactoryPack(entry)
  const blocked = [
    ...factory.promptPack.blockedPatterns.slice(0, 4),
    'Copy that says AI platform, unlock, revolutionary, game-changing, or any broad promise without mechanism.',
    'Equal-card grids used as filler when a workflow, proof object, diagram, or real state would explain more.',
  ]

  if (archetype === 'creator-revenue-studio') {
    blocked.push('Income claims, fake follower counts, fake sponsor names, or pressure-based launch copy.')
  }

  return Array.from(new Set(blocked))
}

export function getV0TemplateExcellencePlan(entry: V0TemplateEntry): V0TemplateExcellencePlan {
  const archetype = getArchetype(entry)
  const artDirection = getArtDirection(entry, archetype)
  const motion = getMotionPlan(entry, archetype)

  return {
    archetype,
    label: archetypeLabels[archetype],
    firstRead: getFirstRead(entry, archetype),
    premiumStandard:
      'The template must feel designed from proof, not assembled from effects: one dominant idea, one proof object, one buyer job, one primary action.',
    artDirection,
    assetProduction: {
      tier: entry.assetTier,
      sourceMethod: entry.assetSource,
      requiredAssets: getRequiredAssets(entry, archetype),
      blockedAssets: getBlockedAssets(archetype),
      evidence: [
        `${entry.assetTier} provenance recorded.`,
        'Desktop, mobile, and OG/social crops inspected.',
        'Source prompt, source file, capture route, or README proof stored near the package.',
      ],
    },
    motion,
    v0Use: getV0Use(entry, archetype),
    agencyPass: {
      council: getAgencyCouncil(entry, archetype),
      scoreTarget: '26/30 minimum before public-ready status; restart below 22.',
      qa: getQA(entry, archetype),
    },
    routeToBuild: getRouteToBuild(entry, archetype),
    antiSlop: getAntiSlop(entry, archetype),
  }
}

export function getV0TemplateExcellenceSummary(entries: V0TemplateEntry[]): V0TemplateExcellenceSummary {
  const plans = entries.map(getV0TemplateExcellencePlan)
  const tierABCount = entries.filter((entry) => entry.assetTier.includes('A') || entry.assetTier.includes('B')).length
  const motionGatedCount = plans.filter(
    (plan) => plan.motion.level === 'authored-motion' || plan.motion.level === '3d-or-film',
  ).length
  const v0HeldCount = plans.filter((plan) => plan.v0Use.budget.startsWith('No v0')).length
  const archetypeCount = new Set(plans.map((plan) => plan.archetype)).size

  return {
    stats: [
      { label: 'Agency specs', value: String(plans.length) },
      { label: 'Archetypes', value: String(archetypeCount) },
      { label: 'Tier A/B assets', value: String(tierABCount) },
      { label: 'Motion gated', value: String(motionGatedCount) },
      { label: 'v0 held', value: String(v0HeldCount) },
    ],
    standards: v0TemplateExcellenceStandards,
    nextMoves: [
      'Turn the first P0 package in each shelf into a filled source pack with screenshots or source data.',
      'Generate or capture Tier A/B hero assets only after the package has a frozen scene brief.',
      'Create screenshot and crop evidence for every package before promotion beyond sprint seed.',
      'Use the agency council roles as review lanes when a template reaches public-ready consideration.',
    ],
  }
}
