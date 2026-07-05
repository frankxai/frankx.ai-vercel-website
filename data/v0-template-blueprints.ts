import type { V0TemplateEntry } from './v0-template-library'

export type V0TemplateBlueprint = {
  marketNeed: string
  buyerPromise: string
  productStrategy: string
  designThinking: string
  v0Scope: string[]
  codexScope: string[]
  assetMoves: string[]
  motionMoves: string[]
  architectureMoves: string[]
  agentLoop: string[]
  packageTiers: Array<{
    label: string
    value: string
  }>
  successSignals: string[]
}

const brandMarketNeeds: Record<V0TemplateEntry['brand'], string> = {
  FrankX:
    'AI founders and operators need premium business surfaces that make leverage, proof, and next action obvious without generic SaaS noise.',
  GenCreator:
    'Creators need usable operating templates for content, cohorts, offers, media kits, and launch loops instead of another vague creator dashboard.',
  AnimeLegends:
    'Original-world teams need lore, character, episode, and community templates that look cinematic while staying canon-safe and rights-safe.',
  Starlight:
    'Agentic teams need command surfaces that show queues, ledgers, issues, PRs, deployments, and verification state without fake operational theater.',
  Arcanea:
    'Creative intelligence products need mythic surfaces that still behave like serious software: readable, structured, useful, and source-backed.',
  'AI Architecture':
    'Teams buying AI strategy need diagrams, evals, governance, and implementation packs that are credible enough for executives and useful enough for builders.',
  Vercel:
    'Builders want templates that move from beautiful frontend to GitHub, environment setup, preview deployment, and production-safe notes.',
}

const brandDesignThinking: Record<V0TemplateEntry['brand'], string> = {
  FrankX:
    'Lead with one commercial truth, one proof object, and one decisive CTA. Design should feel like an executive command room, not an AI toy.',
  GenCreator:
    'Make the creator path visible: idea, production, publishing, community, offer, and learning loop. The page should feel immediately usable.',
  AnimeLegends:
    'Treat every screen as canon infrastructure. World beauty is allowed only when the lore, labels, rights, and character consistency survive inspection.',
  Starlight:
    'Compress complexity into calm state. The premium signal is operational clarity: what is queued, who owns it, what passed, what is risky, what ships next.',
  Arcanea:
    'Use mythic material as structure, not decoration. Ritual language has to map to a real workflow, artifact, or creator transformation.',
  'AI Architecture':
    'Start from the architecture decision and evidence trail. Typography, diagrams, and tables carry trust before motion or atmosphere does.',
  Vercel:
    'Design for developer confidence: fast comprehension, crisp states, exact setup steps, and no hidden magic between local repo and preview URL.',
}

function includesChannel(entry: V0TemplateEntry, channel: V0TemplateEntry['channels'][number]) {
  return entry.channels.includes(channel)
}

function getTemplateClass(entry: V0TemplateEntry) {
  const family = entry.family.toLowerCase()

  if (includesChannel(entry, 'motion') || family.includes('3d') || family.includes('motion')) {
    return 'motion'
  }

  if (includesChannel(entry, 'vercel') || family.includes('starter') || family.includes('app')) {
    return 'deployable'
  }

  if (includesChannel(entry, 'animelegends') || family.includes('world') || family.includes('lore')) {
    return 'world'
  }

  if (includesChannel(entry, 'gencreator') || family.includes('creator')) {
    return 'creator'
  }

  if (includesChannel(entry, 'ai-architecture') || family.includes('architecture')) {
    return 'architecture'
  }

  if (family.includes('newsletter') || family.includes('media')) {
    return 'media'
  }

  return 'business'
}

function getBuyerPromise(entry: V0TemplateEntry) {
  const bestUse = entry.bestFor[0]?.toLowerCase() ?? 'template package'
  const firstDeliverable = entry.deliverables[0]?.toLowerCase() ?? 'working surface'

  return `Give ${entry.audience.toLowerCase()} a ${bestUse} package with a ${firstDeliverable}, proof gates, and a clear path from draft to preview.`
}

function getProductStrategy(entry: V0TemplateEntry) {
  const templateClass = getTemplateClass(entry)

  const strategies: Record<string, string> = {
    business:
      'Package this as a premium business template: public route, offer logic, proof sections, claim audit, README, and a custom implementation upsell.',
    deployable:
      'Package this as a deployable starter: frontend shell, data contract, env guide, security notes, GitHub issue/PR trail, and one Vercel preview.',
    world:
      'Package this as an original-world system: canon data, rights notes, cinematic source frames, deterministic labels, and community-safe interaction states.',
    creator:
      'Package this as a creator operating asset: data schema, workflow board, creator-facing copy, asset exports, and reusable launch/community steps.',
    architecture:
      'Package this as an AI architecture product: diagrams, eval rubric, implementation README, risk notes, and source-backed technical language.',
    media:
      'Package this as a publishing system: editorial data, source queue, social/OG crops, capture route, and a repeatable production checklist.',
    motion:
      'Package this as a motion/3D asset: still frame first, source files, reduced-motion fallback, mobile simplification, and performance budget.',
  }

  return strategies[templateClass]
}

function getV0Scope(entry: V0TemplateEntry) {
  const scope = [
    `Explore one ${entry.family.toLowerCase()} surface for ${entry.brand}, not a multi-route product.`,
    `Draft section rhythm for ${entry.deliverables.slice(0, 4).join(', ')}.`,
    'Return desktop and mobile structure with unknown proof clearly marked for Codex.',
  ]

  if (includesChannel(entry, 'motion')) {
    scope.push('If motion is suggested, describe the still frame and motion job; do not generate unverified WebGL as final code.')
  }

  if (includesChannel(entry, 'vercel')) {
    scope.push('Keep auth, billing, API keys, deployment, and environment logic out of v0 output.')
  }

  return scope
}

function getCodexScope(entry: V0TemplateEntry) {
  const scope = [
    'Normalize the output to FrankX route, token, image, and accessibility conventions.',
    'Replace placeholders with sourced copy, real data, exact routes, or explicit not-ready states.',
    'Create or update README, issue, PR, preview, evidence manifest, and Command Center card before promotion.',
  ]

  if (includesChannel(entry, 'ai-architecture')) {
    scope.push('Verify all technical claims against current docs or local source before publishing.')
  }

  if (includesChannel(entry, 'gencreator') || includesChannel(entry, 'animelegends')) {
    scope.push(`Read the target ${entry.brand} repo instructions before implementation in that brand site.`)
  }

  return scope
}

function getAssetMoves(entry: V0TemplateEntry) {
  const moves = [
    `Use ${entry.assetTier} as the minimum public asset tier.`,
    `Record source method: ${entry.assetSource}.`,
    'Inspect desktop, mobile, and OG/social crops before calling the visual final.',
  ]

  if (entry.assetTier.includes('B')) {
    moves.push('Store prompt/source/output paths for generated or rendered media.')
  }

  if (entry.assetTier.includes('A')) {
    moves.push('Prefer real product captures, route screenshots, repo evidence, or proof artifacts over decorative illustration.')
  }

  if (includesChannel(entry, 'animelegends')) {
    moves.push('Block public visuals until original-world rights, canon, and text overlays are verified.')
  }

  return moves
}

function getMotionMoves(entry: V0TemplateEntry) {
  if (!includesChannel(entry, 'motion')) {
    return [
      'Ship the first version as a strong static composition.',
      'Use local hover/focus/state motion only after layout hierarchy is proven.',
      'Do not add GSAP, Lenis, or WebGL unless a scene brief names the motion job.',
    ]
  }

  return [
    'Create the poster frame before any animation work.',
    'Name one motion job: hierarchy, state, causality, progress, spatial relationship, or brand memory.',
    'Add reduced-motion and mobile static stories before preview verification.',
    'Use WebGL or 3D only with metaphor, fallback, performance budget, and actual screenshot inspection.',
  ]
}

function getArchitectureMoves(entry: V0TemplateEntry) {
  const moves = [
    'Define the data shape before styling state-heavy sections.',
    'Separate public copy, internal v0 chat IDs, and deployment evidence.',
    'Add source-backed setup notes for anything a buyer or agent must reproduce.',
  ]

  if (includesChannel(entry, 'vercel')) {
    moves.push('Document env vars, runtime boundaries, preview deployment, and one safe deploy path.')
  }

  if (includesChannel(entry, 'ai-architecture')) {
    moves.push('Attach architecture diagrams, eval criteria, risk controls, and implementation tradeoffs.')
  }

  if (entry.family.toLowerCase().includes('marketplace')) {
    moves.push('Include license, moderation, catalog schema, and payment boundary notes before commerce promises.')
  }

  return moves
}

function getAgentLoop(entry: V0TemplateEntry) {
  const loop = [
    'Codex: route, registry, truth, README, issue, PR, Vercel preview, and QA evidence.',
    'v0: one scoped frontend composition pass and one named refinement pass.',
    'Premium Web OS: scene brief, asset tier, motion job, reduced-motion gate, and 26/30 score.',
  ]

  if (includesChannel(entry, 'motion')) {
    loop.push('Motion Design Studio: poster-first beat sheet, runtime decision, fallback, and performance budget.')
  }

  if (includesChannel(entry, 'ai-architecture')) {
    loop.push('Claude/Grok review: architecture critique only after Codex has a concrete brief or branch.')
  }

  return loop
}

function getPackageTiers(entry: V0TemplateEntry) {
  const base = [
    {
      label: 'Public preview',
      value: `${entry.title} package page, route status, buyer promise, and visible next action.`,
    },
    {
      label: 'Prompt pack',
      value: `Scoped v0 prompt, blocked patterns, design thinking notes, and Codex handoff contract.`,
    },
    {
      label: 'Source pack',
      value: `${entry.deliverables.slice(0, 3).join(', ')}, README, asset notes, and QA checklist.`,
    },
  ]

  if (includesChannel(entry, 'vercel')) {
    base.push({
      label: 'Deploy pack',
      value: 'GitHub repo or branch, env guide, Vercel preview, release notes, and security boundaries.',
    })
  }

  if (includesChannel(entry, 'motion')) {
    base.push({
      label: 'Motion pack',
      value: 'Poster frame, reduced-motion fallback, mobile crop, source files, and performance budget.',
    })
  }

  return base
}

function getSuccessSignals(entry: V0TemplateEntry) {
  const signals = [
    `A buyer immediately understands why ${entry.title} exists and what action to take.`,
    `All promised deliverables are either present, linked, or explicitly marked as next actions.`,
    `The package passes these gates: ${entry.qualityGates.join(', ')}.`,
    'Private v0 chat details stay internal while public proof remains inspectable.',
  ]

  if (includesChannel(entry, 'vercel')) {
    signals.push('A Vercel preview or deployable README exists before the starter is promoted.')
  }

  if (includesChannel(entry, 'gencreator')) {
    signals.push('A creator can fill the template with their data without needing a designer.')
  }

  if (includesChannel(entry, 'animelegends')) {
    signals.push('Canon, rights, character consistency, and deterministic text pass before public use.')
  }

  return signals
}

export function getV0TemplateBlueprint(entry: V0TemplateEntry): V0TemplateBlueprint {
  return {
    marketNeed: brandMarketNeeds[entry.brand],
    buyerPromise: getBuyerPromise(entry),
    productStrategy: getProductStrategy(entry),
    designThinking: brandDesignThinking[entry.brand],
    v0Scope: getV0Scope(entry),
    codexScope: getCodexScope(entry),
    assetMoves: getAssetMoves(entry),
    motionMoves: getMotionMoves(entry),
    architectureMoves: getArchitectureMoves(entry),
    agentLoop: getAgentLoop(entry),
    packageTiers: getPackageTiers(entry),
    successSignals: getSuccessSignals(entry),
  }
}
