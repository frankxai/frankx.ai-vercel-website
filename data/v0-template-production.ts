import type { V0TemplateEntry, V0TemplateChannel } from './v0-template-library'

export type V0TemplateProductionPriority = 'P0' | 'P1' | 'P2'

export type V0TemplateProductionLane =
  | 'template-os'
  | 'vercel-ai-architecture'
  | 'gencreator'
  | 'animelegends'
  | 'premium-assets-motion'

type ProductionIssue = {
  number: number
  title: string
  url: string
}

export type V0TemplateProductionPlan = {
  lane: V0TemplateProductionLane
  laneLabel: string
  issue: ProductionIssue
  priority: V0TemplateProductionPriority
  publicReadiness: string
  launchDecision: string
  communitySignal: string
  v0Trigger: string
  codexTrigger: string
  doNotUseV0For: string[]
  proofNeeded: string[]
  nextSprintMove: string
}

const issues: Record<V0TemplateProductionLane, ProductionIssue> = {
  'template-os': {
    number: 234,
    title: 'Template OS: productionize FrankX /v0 and /vercel lanes',
    url: 'https://github.com/frankxai/frankx.ai-vercel-website/issues/234',
  },
  'vercel-ai-architecture': {
    number: 235,
    title: 'Template lane: Vercel AI SaaS and AI architecture packs',
    url: 'https://github.com/frankxai/frankx.ai-vercel-website/issues/235',
  },
  gencreator: {
    number: 236,
    title: 'Template lane: GenCreator creator-business systems',
    url: 'https://github.com/frankxai/frankx.ai-vercel-website/issues/236',
  },
  animelegends: {
    number: 237,
    title: 'Template lane: AnimeLegends canon-safe worldbuilding systems',
    url: 'https://github.com/frankxai/frankx.ai-vercel-website/issues/237',
  },
  'premium-assets-motion': {
    number: 238,
    title: 'Template lane: premium assets, motion, and 3D production gate',
    url: 'https://github.com/frankxai/frankx.ai-vercel-website/issues/238',
  },
}

const priorityZeroIds = new Set([
  'frankx-executive-command-landing',
  'frankx-personal-ai-coe-microsite',
  'frankx-ai-audit-intake-funnel',
  'vercel-ai-saas-starter',
  'vercel-ai-workflow-starter',
  'ai-architecture-rag-blueprint',
  'gencreator-creator-os-landing',
  'gencreator-course-sales-system',
  'animelegends-world-portal',
  'animelegends-trailer-countdown-page',
  'motion-command-room-3d-scene',
  'motion-ai-product-launch-film',
])

const priorityOneFamilies = [
  'agent',
  'audit',
  'course',
  'dashboard',
  'film',
  'offer',
  'newsletter',
  'media',
  'chat',
  'console',
  'marketplace',
  'community',
  'architecture',
  'evaluation',
  'reader',
  'registry',
  'report',
  'starter',
  'workflow',
  'launch',
  'portal',
  'motion',
]

const laneLabels: Record<V0TemplateProductionLane, string> = {
  'template-os': 'Template OS spine',
  'vercel-ai-architecture': 'Vercel and AI architecture',
  gencreator: 'GenCreator creator systems',
  animelegends: 'AnimeLegends world systems',
  'premium-assets-motion': 'Premium assets, motion, and 3D',
}

const communitySignals: Record<V0TemplateProductionLane, string> = {
  'template-os':
    'The market is crowded with generic AI pages; the opening is a governed library that pairs cinematic surface quality with proof, issue tracking, and deploy evidence.',
  'vercel-ai-architecture':
    'High demand clusters around AI apps, SaaS starters, dashboards, chat assistants, RAG systems, auth/billing shells, and deployable examples.',
  gencreator:
    'Creators repeatedly need media kits, launch calendars, content engines, cohort hubs, offer ladders, and revenue systems that are fillable without a design team.',
  animelegends:
    'Worldbuilding teams need original, rights-safe templates for lore, characters, episodes, fan communities, and pitch surfaces, with canon governance before visuals.',
  'premium-assets-motion':
    'The GetLayers-style bar is cinematic templates, prompts, and 3D scenes; FrankX should compete by adding provenance, reduced-motion routes, and product evidence.',
}

function hasChannel(entry: V0TemplateEntry, channel: V0TemplateChannel) {
  return entry.channels.includes(channel)
}

function inferProductionLane(entry: V0TemplateEntry): V0TemplateProductionLane {
  if (entry.id === 'getlayers-quality-benchmark') {
    return 'premium-assets-motion'
  }

  if (hasChannel(entry, 'animelegends')) {
    return 'animelegends'
  }

  if (hasChannel(entry, 'gencreator')) {
    return 'gencreator'
  }

  if (hasChannel(entry, 'motion')) {
    return 'premium-assets-motion'
  }

  if (hasChannel(entry, 'vercel') || hasChannel(entry, 'ai-architecture') || entry.brand === 'Vercel') {
    return 'vercel-ai-architecture'
  }

  return 'template-os'
}

function inferPriority(entry: V0TemplateEntry): V0TemplateProductionPriority {
  if (priorityZeroIds.has(entry.id)) {
    return 'P0'
  }

  const family = entry.family.toLowerCase()
  const isPriorityFamily = priorityOneFamilies.some((needle) => family.includes(needle))

  if (isPriorityFamily || hasChannel(entry, 'vercel') || hasChannel(entry, 'v0')) {
    return 'P1'
  }

  return 'P2'
}

function getPublicReadiness(entry: V0TemplateEntry) {
  if (entry.stage === 'live-pattern') {
    return 'Pattern exists; package evidence, source notes, and buyer-facing proof before promotion.'
  }

  if (entry.stage === 'internal-system') {
    return 'Internal governance artifact; keep it public only if the page teaches the operating system without exposing private IDs.'
  }

  if (entry.stage === 'v0-prototype') {
    return 'Prototype state; requires Codex hardening, source truth, and route verification.'
  }

  return 'Sprint seed; needs a scoped brief, asset/proof packet, and issue-linked implementation pass.'
}

function getLaunchDecision(entry: V0TemplateEntry, lane: V0TemplateProductionLane) {
  if (entry.id === 'frankx-executive-command-landing') {
    return 'Keep visible as the first proof package for PR #233; do not import the private v0 chat as final code.'
  }

  if (lane === 'template-os') {
    return 'Soft-launch through /v until the package has proof and a public-ready route.'
  }

  if (lane === 'premium-assets-motion') {
    return 'Do not public-nav as a finished motion asset until poster, fallback, and crop evidence exist.'
  }

  if (hasChannel(entry, 'vercel')) {
    return 'Promote through /vercel only after a deployable README or preview path exists.'
  }

  return 'Promote through the focused lane page first, then add public-nav exposure only after evidence passes.'
}

function getV0Trigger(entry: V0TemplateEntry, lane: V0TemplateProductionLane) {
  if (entry.stage === 'internal-system') {
    return 'Use v0 only for a single explanatory page or section once Codex has frozen the system contract.'
  }

  if (lane === 'premium-assets-motion') {
    return 'Use v0 after the still frame and motion job are defined; ask for layout around the asset, not the final asset.'
  }

  if (lane === 'vercel-ai-architecture') {
    return 'Trigger v0 for one frontend shell after Codex defines data, environment boundaries, and deploy story.'
  }

  return 'Trigger v0 for one focused surface: hero, proof, package, CTA, and mobile composition.'
}

function getCodexTrigger(entry: V0TemplateEntry, lane: V0TemplateProductionLane) {
  if (lane === 'premium-assets-motion') {
    return 'Codex creates the scene brief, asset manifest, reduced-motion route, QA evidence, and final integration.'
  }

  if (lane === 'animelegends') {
    return 'Codex creates canon data, rights notes, route structure, deterministic labels, and public-safe copy.'
  }

  if (lane === 'gencreator') {
    return 'Codex creates the fillable data schema, package README, launch workflow, and creator-safe proof states.'
  }

  if (lane === 'vercel-ai-architecture') {
    return 'Codex owns architecture truth, env notes, security boundaries, Vercel preview, README, and issue/PR evidence.'
  }

  return 'Codex owns positioning, route wiring, asset provenance, evidence gates, GitHub, Vercel, and release notes.'
}

function getDoNotUseV0For(entry: V0TemplateEntry, lane: V0TemplateProductionLane) {
  const blocked = [
    'Final factual claims, metrics, client outcomes, pricing truth, or source citations.',
    'Secrets, environment variables, auth, billing, webhooks, DNS, production promotion, or private command-center IDs.',
  ]

  if (lane === 'animelegends') {
    blocked.push('Final character IP, logos, canon decisions, franchise-like likenesses, or rights-sensitive visuals.')
  }

  if (lane === 'premium-assets-motion') {
    blocked.push('Final images, videos, logos, 3D source files, or motion runtimes without an inspected still frame.')
  }

  if (hasChannel(entry, 'vercel')) {
    blocked.push('Backend architecture, deployment scripts, database schema, payment logic, or security guarantees.')
  }

  return blocked
}

function getProofNeeded(entry: V0TemplateEntry, lane: V0TemplateProductionLane) {
  const proof = [
    ...entry.qualityGates.slice(0, 3),
    `${entry.assetTier} provenance for ${entry.assetSource}.`,
    'Desktop and mobile screenshot evidence.',
  ]

  if (lane === 'vercel-ai-architecture') {
    proof.push('README, env boundary, and Vercel preview or deploy path.')
  }

  if (lane === 'premium-assets-motion') {
    proof.push('Poster frame, reduced-motion fallback, crop check, and performance budget.')
  }

  if (lane === 'animelegends') {
    proof.push('Canon and rights notes before public visuals.')
  }

  return Array.from(new Set(proof))
}

function getNextSprintMove(entry: V0TemplateEntry, lane: V0TemplateProductionLane) {
  if (priorityZeroIds.has(entry.id)) {
    if (lane === 'vercel-ai-architecture') {
      return 'Turn this into the first architecture starter packet: README, system diagram, deploy path, and one scoped v0 pass.'
    }

    if (lane === 'gencreator') {
      return 'Create the GenCreator fillable brief and choose one creator proof dataset before asking v0 for variants.'
    }

    if (lane === 'animelegends') {
      return 'Create the canon/rights packet and one original visual direction board before public asset generation.'
    }

    if (lane === 'premium-assets-motion') {
      return 'Write the scene brief, score the still frame, then decide whether 3D or scroll motion is actually earned.'
    }

    return 'Use PR #233 as proof, then decide public navigation and package-readiness before marking ready.'
  }

  return entry.nextAction
}

export function getV0TemplateProductionPlan(entry: V0TemplateEntry): V0TemplateProductionPlan {
  const lane = inferProductionLane(entry)

  return {
    lane,
    laneLabel: laneLabels[lane],
    issue: issues[lane],
    priority: inferPriority(entry),
    publicReadiness: getPublicReadiness(entry),
    launchDecision: getLaunchDecision(entry, lane),
    communitySignal: communitySignals[lane],
    v0Trigger: getV0Trigger(entry, lane),
    codexTrigger: getCodexTrigger(entry, lane),
    doNotUseV0For: getDoNotUseV0For(entry, lane),
    proofNeeded: getProofNeeded(entry, lane),
    nextSprintMove: getNextSprintMove(entry, lane),
  }
}
