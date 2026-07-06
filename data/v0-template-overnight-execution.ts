import { getV0TemplateDemandPlan } from './v0-template-demand'
import { getV0TemplateExcellencePlan } from './v0-template-excellence'
import { getV0TemplateFactoryPack } from './v0-template-packaging'
import { getV0TemplateProductionPlan } from './v0-template-production'
import {
  getV0TemplateSourcePack,
  getV0TemplateSourcePackPriorityRank,
  type V0TemplateSourcePackStatus,
} from './v0-template-source-packs'
import type { V0TemplateChannel, V0TemplateEntry } from './v0-template-library'

export type V0TemplateExecutionSurface = 'v' | 'v0' | 'vercel'

export type V0TemplateExecutionPhase =
  | 'source-pack'
  | 'asset-brief'
  | 'v0-pass'
  | 'codex-hardening'
  | 'proof-release'

export type V0TemplateExecutionSurfacePlan = {
  label: string
  thesis: string
  buildNow: string[]
  doNotGiveV0: string[]
  marketSignals: string[]
  successCriteria: string[]
}

export type V0TemplateExecutionItem = {
  id: string
  title: string
  route: string
  lane: string
  priority: string
  demand: string
  phase: V0TemplateExecutionPhase
  phaseLabel: string
  score: number
  nextArtifact: string
  ownerAction: string
  v0Use: string
  evidence: string[]
}

export type V0TemplateOvernightExecutionSummary = {
  surface: V0TemplateExecutionSurfacePlan
  stats: Array<{
    label: string
    value: string
  }>
  phases: Array<{
    id: V0TemplateExecutionPhase
    label: string
    job: string
    count: number
  }>
  queue: V0TemplateExecutionItem[]
}

const phaseLabels: Record<V0TemplateExecutionPhase, string> = {
  'source-pack': 'Source pack',
  'asset-brief': 'Asset brief',
  'v0-pass': 'v0 pass',
  'codex-hardening': 'Codex hardening',
  'proof-release': 'Proof and release',
}

const phaseJobs: Record<V0TemplateExecutionPhase, string> = {
  'source-pack': 'Freeze buyer data, fixture states, README outline, blocked claims, and package promise.',
  'asset-brief': 'Create or choose the proof object, poster, crop matrix, provenance, and reduced-motion fallback.',
  'v0-pass': 'Spend one scoped v0 build pass and one refinement on hierarchy, responsive sections, and state clarity.',
  'codex-hardening': 'Normalize code, wire data, remove generic residue, add docs, tests, and issue/PR receipts.',
  'proof-release': 'Verify route, screenshots, preview/deploy path, asset evidence, and 26/30 quality gate.',
}

const surfacePlans: Record<V0TemplateExecutionSurface, V0TemplateExecutionSurfacePlan> = {
  v: {
    label: 'FrankX /v command surface',
    thesis:
      'The full studio should show the whole business: v0 visual acceleration, Vercel starters, GenCreator systems, AnimeLegends worlds, AI architecture packs, and motion/3D source packs.',
    buildNow: [
      'One P0 source pack per major lane before expanding more ideas.',
      'One proof-led package page for every accepted v0 or Vercel candidate.',
      'One Command Center receipt per coherent batch: files, checks, preview, blockers, and next owner.',
    ],
    doNotGiveV0: [
      'Product truth, claims, pricing, backend, secrets, rights decisions, or deployment authority.',
      'Final 3D/video/source assets without a scene brief and inspected still frame.',
      'More variations when the current brief lacks proof, buyer data, or a route.',
    ],
    marketSignals: [
      'AI SaaS, chat, RAG, agent, dashboard, and deployable starter templates are crowded but still demanded.',
      'Vercel and AI SDK templates create buyer expectations for real setup paths, not only landing pages.',
      'Cinematic source libraries validate the market, but FrankX must win with source packs and evidence.',
    ],
    successCriteria: [
      'Every P0 package has a route, owner issue, source pack, first-read brief, and blocked-pattern list.',
      'Every public claim is sourced, caveated, or marked as next action.',
      'Every premium visual has provenance, crop inspection, and a reduced-motion/mobile plan.',
    ],
  },
  v0: {
    label: 'FrankX /v0 foundry',
    thesis:
      'The v0 lane should be a curated prompt-and-frontend foundry: use v0 only for surfaces where composition speed compounds, then harden the output in Codex.',
    buildNow: [
      'P0 v0 prompts for AI audit, executive command, creator course sales, RAG blueprint, and trailer countdown surfaces.',
      'A reusable prompt contract with first read, deliverables, blocked patterns, proof slots, and mobile acceptance.',
      'Accepted/rejected pattern notes after every v0 pass so tokens become institutional taste.',
    ],
    doNotGiveV0: [
      'Final copy facts, business logic, architecture truth, auth, billing, database, pricing, or secret handling.',
      'Open-ended requests like make it premium without buyer, proof object, and route fixtures.',
      'Second and third redesign loops when the issue is weak input data rather than visual execution.',
    ],
    marketSignals: [
      'Builders use v0 for fast UI, shadcn-style components, dashboards, forms, and landing page iteration.',
      'The quality gap is not generation speed; it is taste, proof, and post-generation normalization.',
      'The strongest v0 templates are narrow, inspectable, and designed around real data states.',
    ],
    successCriteria: [
      'v0 receives a frozen brief and returns one useful frontend candidate, not an invented product.',
      'Codex records what was kept, what was rejected, and why.',
      'The final route passes local checks and no longer reads like default AI template output.',
    ],
  },
  vercel: {
    label: 'FrankX /vercel deploy lane',
    thesis:
      'The Vercel lane should become a deployable starter shelf: every template needs setup notes, env boundaries, safe fixtures, preview discipline, and security caveats.',
    buildNow: [
      'P0 deploy packs for AI SaaS starter, AI workflow starter, RAG docs portal, prompt eval report, and creator course system.',
      'A reusable deploy README structure: stack, env key names, data model, safe fixture, local gate, preview gate.',
      'Vercel preview or explicit deploy recipe before a package says deployable.',
    ],
    doNotGiveV0: [
      'Backend architecture, auth/payment implementation, security guarantees, deployment scripts, or database schema.',
      'Environment values, private project IDs, token scopes, or production promotion decisions.',
      'Generic dashboard screens that do not teach install, run, preview, or failure states.',
    ],
    marketSignals: [
      'AI-native SaaS starters now need chat/streaming, auth, billing, dashboards, docs, evals, and cost visibility.',
      'Official and community Vercel/Next templates set a baseline; FrankX must add opinionated AI-business workflows.',
      'Buyers judge deployable templates by setup quality, safe defaults, and evidence, not screenshots alone.',
    ],
    successCriteria: [
      'Every Vercel package shows env boundaries by key name only and never leaks secret values.',
      'Every deployable claim points to a preview, build log, or reproducible README path.',
      'Every starter includes safe demo data, empty/error states, and a security limitation note.',
    ],
  },
}

const statusPhase: Record<V0TemplateSourcePackStatus, V0TemplateExecutionPhase> = {
  'source-pack-next': 'source-pack',
  'fixture-needed': 'source-pack',
  'asset-needed': 'asset-brief',
  'v0-brief-ready': 'v0-pass',
  'codex-first': 'codex-hardening',
  'evidence-needed': 'proof-release',
}

const priorityScore = {
  P0: 500,
  P1: 250,
  P2: 100,
} as const

const demandScore = {
  S: 120,
  A: 60,
  B: 20,
} as const

const phaseScore: Record<V0TemplateExecutionPhase, number> = {
  'source-pack': 55,
  'asset-brief': 45,
  'v0-pass': 40,
  'codex-hardening': 35,
  'proof-release': 30,
}

function getExecutionPhase(entry: V0TemplateEntry): V0TemplateExecutionPhase {
  const sourcePack = getV0TemplateSourcePack(entry)
  const factory = getV0TemplateFactoryPack(entry)

  if (sourcePack.status === 'asset-needed') {
    return 'asset-brief'
  }

  if (sourcePack.status === 'v0-brief-ready' && factory.v0Decision === 'use-v0') {
    return 'v0-pass'
  }

  return statusPhase[sourcePack.status]
}

function getExecutionScore(entry: V0TemplateEntry, phase: V0TemplateExecutionPhase) {
  const production = getV0TemplateProductionPlan(entry)
  const demand = getV0TemplateDemandPlan(entry)
  const sourcePackRank = getV0TemplateSourcePackPriorityRank(entry.id)
  const sourcePackBoost = sourcePackRank === Number.POSITIVE_INFINITY ? 0 : Math.max(0, 90 - sourcePackRank * 6)
  const channelBoost = entry.channels.includes('vercel') && entry.channels.includes('v0') ? 25 : 0

  return (
    priorityScore[production.priority] +
    demandScore[demand.tier] +
    phaseScore[phase] +
    sourcePackBoost +
    channelBoost
  )
}

function getOwnerAction(entry: V0TemplateEntry, phase: V0TemplateExecutionPhase) {
  const production = getV0TemplateProductionPlan(entry)
  const sourcePack = getV0TemplateSourcePack(entry)
  const excellence = getV0TemplateExcellencePlan(entry)

  if (phase === 'asset-brief') {
    return excellence.routeToBuild.nextArtifact
  }

  if (phase === 'v0-pass') {
    return getV0TemplateFactoryPack(entry).promptPack.title
  }

  if (phase === 'proof-release') {
    return production.publicReadiness
  }

  if (phase === 'codex-hardening') {
    return production.codexTrigger
  }

  return sourcePack.readinessNote
}

function toExecutionItem(entry: V0TemplateEntry): V0TemplateExecutionItem {
  const phase = getExecutionPhase(entry)
  const production = getV0TemplateProductionPlan(entry)
  const demand = getV0TemplateDemandPlan(entry)
  const factory = getV0TemplateFactoryPack(entry)
  const sourcePack = getV0TemplateSourcePack(entry)
  const excellence = getV0TemplateExcellencePlan(entry)

  return {
    id: entry.id,
    title: entry.title,
    route: `/v/${entry.id}`,
    lane: production.laneLabel,
    priority: production.priority,
    demand: demand.tierLabel,
    phase,
    phaseLabel: phaseLabels[phase],
    score: getExecutionScore(entry, phase),
    nextArtifact: excellence.routeToBuild.nextArtifact,
    ownerAction: getOwnerAction(entry, phase),
    v0Use: factory.v0DecisionLabel,
    evidence: [
      sourcePack.vercelGithubProof[0],
      sourcePack.screenshotChecklist[0],
      production.proofNeeded[0],
    ].filter(Boolean),
  }
}

export function getV0TemplateOvernightExecutionPlan(
  entries: V0TemplateEntry[],
  surface: V0TemplateExecutionSurface = 'v',
): V0TemplateOvernightExecutionSummary {
  const queue = entries
    .map(toExecutionItem)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
  const p0Count = queue.filter((item) => item.priority === 'P0').length
  const topDemandCount = queue.filter((item) => item.demand === 'S-tier demand').length
  const v0PassCount = queue.filter((item) => item.phase === 'v0-pass').length
  const proofReleaseCount = queue.filter((item) => item.phase === 'proof-release').length

  return {
    surface: surfacePlans[surface],
    stats: [
      { label: 'Overnight queue', value: String(queue.length) },
      { label: 'P0 packages', value: String(p0Count) },
      { label: 'S-tier demand', value: String(topDemandCount) },
      { label: 'v0 pass ready', value: String(v0PassCount) },
      { label: 'Proof gate', value: String(proofReleaseCount) },
    ],
    phases: (Object.keys(phaseLabels) as V0TemplateExecutionPhase[]).map((id) => ({
      id,
      label: phaseLabels[id],
      job: phaseJobs[id],
      count: queue.filter((item) => item.phase === id).length,
    })),
    queue,
  }
}

export function getV0TemplateExecutionSurfaceForChannel(channel?: V0TemplateChannel): V0TemplateExecutionSurface {
  if (channel === 'v0' || channel === 'vercel') {
    return channel
  }

  return 'v'
}
