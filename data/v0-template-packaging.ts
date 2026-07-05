import { getV0TemplateBlueprint } from './v0-template-blueprints'
import { getV0TemplateDemandPlan } from './v0-template-demand'
import { getV0TemplateProductionPlan } from './v0-template-production'
import type { V0TemplateEntry, V0TemplateChannel } from './v0-template-library'

export type V0TemplateFactoryMode =
  | 'business-surface'
  | 'deployable-starter'
  | 'creator-system'
  | 'world-system'
  | 'architecture-pack'
  | 'motion-asset'
  | 'template-infrastructure'

export type V0TemplateReadiness =
  | 'brief-needed'
  | 'v0-ready'
  | 'codex-ready'
  | 'preview-needed'
  | 'public-ready'

export type V0TemplateV0Decision = 'use-v0' | 'hold-v0' | 'codex-first'

export type V0TemplateFactoryCard = {
  label: string
  value: string
}

export type V0TemplateSprintAction = {
  owner: 'Codex' | 'v0' | 'Motion' | 'Vercel' | 'Command Center' | 'Design Council'
  action: string
  trigger: string
  evidence: string
}

export type V0TemplateFactoryPack = {
  mode: V0TemplateFactoryMode
  modeLabel: string
  readiness: V0TemplateReadiness
  readinessLabel: string
  v0Decision: V0TemplateV0Decision
  v0DecisionLabel: string
  routePlan: {
    publicIndex: string
    packageRoute: string
    laneRoute: string
    commandCenterRecord: string
  }
  promptPack: {
    title: string
    brief: string[]
    refinement: string[]
    blockedPatterns: string[]
    acceptance: string[]
  }
  sourcePack: {
    repoWork: string[]
    docs: string[]
    fixtures: string[]
    checks: string[]
  }
  assetPack: {
    tier: V0TemplateEntry['assetTier']
    primaryAssetJob: string
    sourceMethod: string
    requiredExports: string[]
    inspection: string[]
  }
  motionPack: {
    motionJob: string
    runtimeRoute: string
    fallbacks: string[]
  }
  sprintActions: V0TemplateSprintAction[]
  skillStack: V0TemplateFactoryCard[]
  productization: V0TemplateFactoryCard[]
  killCriteria: string[]
}

export type V0TemplateFactorySummary = {
  visible: number
  v0Usable: number
  codexFirst: number
  deployable: number
  motion: number
  publicReady: number
}

const modeLabels: Record<V0TemplateFactoryMode, string> = {
  'business-surface': 'Premium business surface',
  'deployable-starter': 'Deployable Vercel starter',
  'creator-system': 'Creator operating system',
  'world-system': 'Worldbuilding and media system',
  'architecture-pack': 'AI architecture pack',
  'motion-asset': 'Motion and 3D asset pack',
  'template-infrastructure': 'Template infrastructure',
}

const readinessLabels: Record<V0TemplateReadiness, string> = {
  'brief-needed': 'Brief needed',
  'v0-ready': 'v0 ready',
  'codex-ready': 'Codex ready',
  'preview-needed': 'Preview needed',
  'public-ready': 'Public ready',
}

const v0DecisionLabels: Record<V0TemplateV0Decision, string> = {
  'use-v0': 'Use v0 now',
  'hold-v0': 'Hold v0 until proof exists',
  'codex-first': 'Codex first',
}

export const v0TemplateFactoryPrinciples = [
  'Build a package, not a pretty page.',
  'Use v0 for taste, hierarchy, section rhythm, and responsive variants.',
  'Keep data, proof, architecture, secrets, claims, pricing, rights, and deployment in Codex-owned workflows.',
  'Every accepted v0 pass becomes a route, source pack, asset pack, issue receipt, and preview path.',
]

export const v0TemplateFactoryFlow = [
  {
    label: '1. Frame',
    value: 'Buyer, route, channel, demand wave, and proof object are named before any visual generation.',
  },
  {
    label: '2. Source',
    value: 'Codex prepares data, copy facts, repo boundaries, asset provenance, and the public/private split.',
  },
  {
    label: '3. Generate',
    value: 'v0 gets one narrow prompt and one refinement pass for composition, not strategy sprawl.',
  },
  {
    label: '4. Harden',
    value: 'Codex imports only the surviving patterns, wires real data, runs checks, and opens the PR trail.',
  },
  {
    label: '5. Prove',
    value: 'Preview, screenshots, asset evidence, README, issue receipts, and a 26/30 visual gate decide promotion.',
  },
]

function hasChannel(entry: V0TemplateEntry, channel: V0TemplateChannel) {
  return entry.channels.includes(channel)
}

function inferMode(entry: V0TemplateEntry): V0TemplateFactoryMode {
  const family = entry.family.toLowerCase()

  if (entry.id.startsWith('v0-') || entry.id === 'getlayers-quality-benchmark') {
    return 'template-infrastructure'
  }

  if (hasChannel(entry, 'motion') || family.includes('3d') || family.includes('motion') || family.includes('film')) {
    return 'motion-asset'
  }

  if (hasChannel(entry, 'animelegends') || family.includes('world') || family.includes('lore')) {
    return 'world-system'
  }

  if (hasChannel(entry, 'gencreator') || entry.brand === 'GenCreator') {
    return 'creator-system'
  }

  if (hasChannel(entry, 'vercel') || entry.brand === 'Vercel') {
    return 'deployable-starter'
  }

  if (hasChannel(entry, 'ai-architecture') || entry.brand === 'AI Architecture') {
    return 'architecture-pack'
  }

  return 'business-surface'
}

function inferReadiness(entry: V0TemplateEntry): V0TemplateReadiness {
  if (entry.stage === 'live-pattern' && entry.publicPreviewUrl) {
    return 'public-ready'
  }

  if (entry.stage === 'live-pattern') {
    return 'preview-needed'
  }

  if (entry.stage === 'v0-prototype') {
    return 'codex-ready'
  }

  if (hasChannel(entry, 'v0') && entry.deliverables.length >= 4) {
    return 'v0-ready'
  }

  return 'brief-needed'
}

function inferV0Decision(entry: V0TemplateEntry, mode: V0TemplateFactoryMode): V0TemplateV0Decision {
  if (!hasChannel(entry, 'v0')) {
    return 'codex-first'
  }

  if (mode === 'motion-asset' || mode === 'world-system') {
    return 'hold-v0'
  }

  if (mode === 'deployable-starter' && !entry.nextAction.toLowerCase().includes('v0')) {
    return 'codex-first'
  }

  return 'use-v0'
}

function getLaneRoute(entry: V0TemplateEntry) {
  if (hasChannel(entry, 'gencreator')) {
    return '/v/gencreator'
  }

  if (hasChannel(entry, 'animelegends')) {
    return '/v/animelegends'
  }

  if (hasChannel(entry, 'motion')) {
    return '/v/motion'
  }

  if (hasChannel(entry, 'ai-architecture')) {
    return '/v/ai-architecture'
  }

  if (hasChannel(entry, 'vercel') || entry.brand === 'Vercel') {
    return '/vercel'
  }

  if (hasChannel(entry, 'v0')) {
    return '/v0'
  }

  return '/v'
}

function getPrimaryAssetJob(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  if (mode === 'motion-asset') {
    return `Create a scored poster frame and motion brief for ${entry.title}; animate only after the still reads premium.`
  }

  if (mode === 'world-system') {
    return `Create original canon-safe source visuals for ${entry.title}; rights and labels must be verified before public use.`
  }

  if (mode === 'deployable-starter') {
    return `Use real app states, diagrams, repo proof, and preview screenshots for ${entry.title}.`
  }

  if (mode === 'creator-system') {
    return `Show fillable creator workflows, examples, and exports for ${entry.title} without fake audience metrics.`
  }

  return `Lead with the strongest proof artifact for ${entry.title}: product capture, diagram, case study, or inspected visual.`
}

function getSourceRepoWork(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const work = [
    `Create or maintain the package route at /v/${entry.id}.`,
    `Register ${entry.title} in the FrankX /v library with its lane and package status.`,
    'Replace every placeholder with sourced copy, fixtures, or an explicit next-action state.',
  ]

  if (mode === 'deployable-starter') {
    work.push('Add the Next.js/Vercel starter shape, env boundary, and preview notes before promotion.')
  }

  if (mode === 'creator-system') {
    work.push('Add fillable creator schema, empty states, export path, and launch-loop notes.')
  }

  if (mode === 'world-system') {
    work.push('Add canon data, rights notes, moderation copy, and deterministic public labels.')
  }

  if (mode === 'motion-asset') {
    work.push('Add scene brief, poster asset path, reduced-motion route, and crop evidence.')
  }

  if (mode === 'architecture-pack') {
    work.push('Add diagram labels, eval criteria, implementation notes, and source-backed technical language.')
  }

  return work
}

function getDocs(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const docs = [
    'README with buyer, route, install/use notes, limits, and proof requirements.',
    'GitHub issue receipt for the lane owner and next sprint action.',
    'Command Center card with owner, status, preview, PR, evidence, and blocker fields.',
  ]

  if (mode === 'template-infrastructure') {
    docs.push('Factory governance doc showing how the template becomes reusable across brands.')
  }

  if (hasChannel(entry, 'vercel')) {
    docs.push('Vercel deploy notes, environment variable list by key name only, and one deploy path.')
  }

  if (hasChannel(entry, 'motion')) {
    docs.push('Motion beat sheet with runtime decision, fallbacks, crop matrix, and performance budget.')
  }

  return docs
}

function getFixtures(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const fixtures = [
    `${entry.brand} sample content for ${entry.family.toLowerCase()} states.`,
    'Desktop, mobile, empty, loading, and proof-not-ready states.',
  ]

  if (mode === 'deployable-starter' || hasChannel(entry, 'ai-architecture')) {
    fixtures.push('Safe demo data, eval fixtures, role/risk states, and architecture diagrams.')
  }

  if (mode === 'creator-system') {
    fixtures.push('Creator profile, offer, content calendar, product, audience, and export examples.')
  }

  if (mode === 'world-system') {
    fixtures.push('Canon JSON, character/world metadata, rights notes, and moderation states.')
  }

  if (mode === 'motion-asset') {
    fixtures.push('Poster frame, 16:9, 4:5, 1:1, 9:16 crops, and reduced-motion still.')
  }

  return fixtures
}

function getChecks(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const checks = [
    'Focused lint/type/build gate for touched files.',
    'Desktop and mobile route smoke test.',
    'Visual score reaches 26/30 or the template stays in sprint seed.',
  ]

  if (hasChannel(entry, 'vercel') || mode === 'deployable-starter') {
    checks.push('Vercel preview or deployable README is verified before the page says deployable.')
  }

  if (mode === 'world-system') {
    checks.push('Canon, rights, public text, and community safety pass before promotion.')
  }

  if (mode === 'motion-asset') {
    checks.push('Poster, crop, reduced-motion, performance, and mobile framing checks pass.')
  }

  return checks
}

function getRequiredExports(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const exports = ['desktop screenshot', 'mobile screenshot', 'OG/social crop']

  if (entry.assetTier.includes('B') || mode === 'motion-asset') {
    exports.push('source prompt log', 'original/source image', 'edited/exported image')
  }

  if (mode === 'motion-asset') {
    exports.push('poster frame', '16:9 motion preview', '9:16 social cutdown', 'reduced-motion still')
  }

  if (mode === 'deployable-starter') {
    exports.push('Vercel preview URL', 'README screenshot or architecture diagram')
  }

  return Array.from(new Set(exports))
}

function getInspection(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const inspection = [
    'No generic SaaS filler, fake dashboards, fake metrics, or illegible pseudo-text.',
    'Typography, spacing, contrast, and CTA hierarchy hold on mobile and desktop.',
    `${entry.assetTier} provenance is linked or described before public promotion.`,
  ]

  if (mode === 'motion-asset') {
    inspection.push('Still frame works without motion; animation has a named product or brand-memory job.')
  }

  if (mode === 'world-system') {
    inspection.push('Characters, symbols, faction names, lore labels, and rights notes are internally consistent.')
  }

  return inspection
}

function getMotionJob(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  if (mode === 'motion-asset') {
    return 'Motion may carry brand memory, proof sequencing, spatial explanation, or launch drama after poster-frame approval.'
  }

  if (mode === 'deployable-starter') {
    return 'Motion is limited to app-state clarity: loading, success, empty, hover, focus, and progress states.'
  }

  return 'Motion is restrained: use it only where it improves comprehension, priority, or touch feedback.'
}

function getRuntimeRoute(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  if (mode === 'motion-asset') {
    return 'Remotion for exportable films; R3F/Three only for justified 3D scenes; CSS/Framer for small UI state motion.'
  }

  if (hasChannel(entry, 'motion')) {
    return 'Start with CSS/Framer interaction motion, then escalate only after the scene brief passes.'
  }

  return 'CSS transitions and small interaction states; no scroll rig or WebGL by default.'
}

function getFallbacks(mode: V0TemplateFactoryMode) {
  const fallbacks = ['Reduced-motion static state', 'Mobile simplified layout', 'Readable no-JS content path']

  if (mode === 'motion-asset') {
    fallbacks.push('Poster-only hero', 'Static social crop', 'No-WebGL fallback image')
  }

  return fallbacks
}

function getSprintActions(entry: V0TemplateEntry, mode: V0TemplateFactoryMode): V0TemplateSprintAction[] {
  const production = getV0TemplateProductionPlan(entry)
  const actions: V0TemplateSprintAction[] = [
    {
      owner: 'Codex',
      action: `Freeze the ${entry.title} product brief, route, data contract, and proof requirements.`,
      trigger: 'Before v0 receives a prompt.',
      evidence: `Package route /v/${entry.id}, issue #${production.issue.number}, and source notes exist.`,
    },
    {
      owner: 'v0',
      action: 'Generate one focused frontend candidate plus one refinement, scoped to sections and responsive behavior.',
      trigger: 'Only after Codex has frozen buyer, assets, blocked patterns, and acceptance criteria.',
      evidence: 'Accepted patterns are described in the PR; rejected patterns are not imported.',
    },
    {
      owner: 'Codex',
      action: 'Import, normalize, wire real data, remove generic residue, and run local checks.',
      trigger: 'After the v0 candidate survives taste and proof review.',
      evidence: 'Diff, tests, route smoke, README notes, and PR receipt.',
    },
    {
      owner: 'Command Center',
      action: 'Update the lane card with status, blockers, preview, PR, issue, and next sprint move.',
      trigger: 'After every meaningful change set.',
      evidence: 'Command Center record links back to the package page and GitHub issue.',
    },
  ]

  if (mode === 'motion-asset') {
    actions.splice(1, 0, {
      owner: 'Motion',
      action: 'Create poster-first beat sheet, crop matrix, reduced-motion route, and performance budget.',
      trigger: 'Before animation or 3D source work.',
      evidence: 'Poster frame, motion job, crop screenshots, and fallback notes.',
    })
  }

  if (mode === 'deployable-starter') {
    actions.push({
      owner: 'Vercel',
      action: 'Verify preview or document a reproducible deploy path before public deployable claims.',
      trigger: 'After local checks pass and the branch is coherent.',
      evidence: 'Preview URL, build log, or README deploy recipe.',
    })
  }

  if (mode === 'world-system' || mode === 'motion-asset') {
    actions.push({
      owner: 'Design Council',
      action: 'Score the visual world, asset provenance, motion taste, and public text before launch exposure.',
      trigger: 'Before the template leaves sprint seed.',
      evidence: 'Visual score, asset paths, rights notes, and screenshot inspection.',
    })
  }

  return actions
}

function getSkillStack(entry: V0TemplateEntry, mode: V0TemplateFactoryMode): V0TemplateFactoryCard[] {
  const stack: V0TemplateFactoryCard[] = [
    {
      label: 'Codex',
      value: 'Repo truth, package registry, data contracts, README, QA, GitHub issues, PRs, and Vercel handoff.',
    },
    {
      label: 'v0',
      value: 'One scoped visual composition pass for hierarchy, sections, responsive states, and component rhythm.',
    },
    {
      label: 'Premium Web OS',
      value: 'Taste, scene brief, brand world, asset tier, motion gate, and public-ready visual standards.',
    },
  ]

  if (mode === 'motion-asset' || hasChannel(entry, 'motion')) {
    stack.push({
      label: 'Motion Studio',
      value: 'Poster-first motion direction, runtime choice, reduced-motion route, crop matrix, and performance budget.',
    })
  }

  if (hasChannel(entry, 'ai-architecture') || mode === 'deployable-starter') {
    stack.push({
      label: 'Architecture review',
      value: 'Claude or Grok can critique diagrams, risk boundaries, and docs after Codex creates the concrete brief.',
    })
  }

  return stack
}

function getProductization(entry: V0TemplateEntry, mode: V0TemplateFactoryMode): V0TemplateFactoryCard[] {
  const demand = getV0TemplateDemandPlan(entry)

  const productization: V0TemplateFactoryCard[] = [
    {
      label: 'Public package',
      value: `Link from FrankX /v, the ${getLaneRoute(entry)} lane, and /v/${entry.id} with ${demand.tierLabel.toLowerCase()} priority.`,
    },
    {
      label: 'Prompt product',
      value: 'Sell or reuse the prompt pack only with blocked patterns, acceptance criteria, and Codex handoff notes attached.',
    },
    {
      label: 'Implementation upsell',
      value: 'Offer done-with-you customization, deploy setup, visual asset production, and private Command Center integration.',
    },
  ]

  if (mode === 'deployable-starter') {
    productization.push({
      label: 'Starter upsell',
      value: 'Bundle repo scaffold, env guide, Vercel preview, auth/billing boundary notes, and support checklist.',
    })
  }

  if (mode === 'motion-asset') {
    productization.push({
      label: 'Motion upsell',
      value: 'Bundle poster, hero embed, launch film, social cutdowns, source files, and reduced-motion fallback.',
    })
  }

  return productization
}

function getKillCriteria(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const criteria = [
    'No named buyer, primary action, or commercial reason to exist.',
    'The visual direction looks like a generic AI/SaaS template after one refinement.',
    'Proof, route, data, screenshots, or asset provenance cannot be produced.',
    'The template requires inventing metrics, clients, rights, pricing, technical claims, or deployment success.',
  ]

  if (mode === 'world-system') {
    criteria.push('Canon, rights, symbols, character direction, or community safety are unresolved.')
  }

  if (mode === 'motion-asset') {
    criteria.push('The still frame is weak, the motion job is decorative, or reduced-motion/mobile fallback is unclear.')
  }

  if (hasChannel(entry, 'vercel')) {
    criteria.push('The package cannot explain env boundaries, deployment path, or security limitations.')
  }

  return criteria
}

function getPromptBrief(entry: V0TemplateEntry) {
  return [
    `Build one premium ${entry.family.toLowerCase()} surface for ${entry.brand}.`,
    `Audience: ${entry.audience}.`,
    `Use this asset direction: ${entry.assetSource}.`,
    `Include only these sections: ${entry.deliverables.join(', ')}.`,
    `Package with: ${entry.packageWith.join(', ')}.`,
    `Respect these gates: ${entry.qualityGates.join(', ')}.`,
    'Design for desktop and mobile; keep hierarchy decisive, text readable, and CTAs obvious.',
  ]
}

function getPromptRefinement(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const refinement = [
    'Tighten typography, spacing, responsiveness, empty states, and section rhythm.',
    'Remove generic copy, decorative filler, vague AI language, fake metrics, and unsupported claims.',
    'Return the smallest useful revision; do not expand into extra routes, dashboards, or backend logic.',
  ]

  if (mode === 'motion-asset') {
    refinement.push('Describe the poster frame and motion cues, but do not ship final video, 3D, or WebGL code as proof.')
  }

  if (entry.assetTier.includes('A')) {
    refinement.push('Leave exact proof/image slots for Codex to fill with real captures or source-backed artifacts.')
  }

  return refinement
}

function getBlockedPatterns(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const production = getV0TemplateProductionPlan(entry)
  const blocked = [
    ...production.doNotUseV0For,
    'Generic orbit/node hero visuals, fake UI dashboards, lorem metrics, pseudo-logos, and unreadable decorative text.',
    'Huge marketing heroes that hide the actual template, workflow, proof, or usable app state.',
  ]

  if (mode === 'creator-system') {
    blocked.push('Income promises, fake follower counts, fake sponsor names, or guru-style urgency.')
  }

  return Array.from(new Set(blocked))
}

function getAcceptance(entry: V0TemplateEntry, mode: V0TemplateFactoryMode) {
  const blueprint = getV0TemplateBlueprint(entry)
  const demand = getV0TemplateDemandPlan(entry)

  return [
    `The candidate supports ${demand.waveLabel.toLowerCase()} and keeps the ${modeLabels[mode].toLowerCase()} promise obvious.`,
    'The first viewport shows the actual product/template/workflow signal, not decorative atmosphere.',
    `It can be hardened into /v/${entry.id} without inventing claims or private context.`,
    ...blueprint.successSignals.slice(0, 2),
  ]
}

export function getV0TemplateFactoryPack(entry: V0TemplateEntry): V0TemplateFactoryPack {
  const mode = inferMode(entry)
  const readiness = inferReadiness(entry)
  const v0Decision = inferV0Decision(entry, mode)
  const production = getV0TemplateProductionPlan(entry)

  return {
    mode,
    modeLabel: modeLabels[mode],
    readiness,
    readinessLabel: readinessLabels[readiness],
    v0Decision,
    v0DecisionLabel: v0DecisionLabels[v0Decision],
    routePlan: {
      publicIndex: '/v',
      packageRoute: `/v/${entry.id}`,
      laneRoute: getLaneRoute(entry),
      commandCenterRecord: `Issue #${production.issue.number} plus FrankX /v package status`,
    },
    promptPack: {
      title: `${entry.title} v0 prompt pack`,
      brief: getPromptBrief(entry),
      refinement: getPromptRefinement(entry, mode),
      blockedPatterns: getBlockedPatterns(entry, mode),
      acceptance: getAcceptance(entry, mode),
    },
    sourcePack: {
      repoWork: getSourceRepoWork(entry, mode),
      docs: getDocs(entry, mode),
      fixtures: getFixtures(entry, mode),
      checks: getChecks(entry, mode),
    },
    assetPack: {
      tier: entry.assetTier,
      primaryAssetJob: getPrimaryAssetJob(entry, mode),
      sourceMethod: entry.assetSource,
      requiredExports: getRequiredExports(entry, mode),
      inspection: getInspection(entry, mode),
    },
    motionPack: {
      motionJob: getMotionJob(entry, mode),
      runtimeRoute: getRuntimeRoute(entry, mode),
      fallbacks: getFallbacks(mode),
    },
    sprintActions: getSprintActions(entry, mode),
    skillStack: getSkillStack(entry, mode),
    productization: getProductization(entry, mode),
    killCriteria: getKillCriteria(entry, mode),
  }
}

export function getV0TemplateFactorySummary(entries: V0TemplateEntry[]): V0TemplateFactorySummary {
  const packs = entries.map(getV0TemplateFactoryPack)

  return {
    visible: entries.length,
    v0Usable: packs.filter((pack) => pack.v0Decision === 'use-v0').length,
    codexFirst: packs.filter((pack) => pack.v0Decision === 'codex-first').length,
    deployable: packs.filter((pack) => pack.mode === 'deployable-starter').length,
    motion: packs.filter((pack) => pack.mode === 'motion-asset').length,
    publicReady: packs.filter((pack) => pack.readiness === 'public-ready').length,
  }
}
