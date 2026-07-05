import type { V0TemplateEntry } from './v0-template-library'

export type V0TemplateDemandTier = 'S' | 'A' | 'B'

export type V0TemplateDemandWave =
  | 'ai-business'
  | 'deployable-ai'
  | 'creator-economy'
  | 'worldbuilding-media'
  | 'premium-motion'
  | 'template-infrastructure'

export type V0TemplateDemandPlan = {
  tier: V0TemplateDemandTier
  tierLabel: string
  wave: V0TemplateDemandWave
  waveLabel: string
  communityNeed: string
  winningAngle: string
  evidenceToCollect: string[]
  successCriteria: string[]
}

type DemandWaveDefinition = {
  id: V0TemplateDemandWave
  label: string
  signal: string
  winningAngle: string
  proof: string[]
}

export const v0TemplateDemandWaves: DemandWaveDefinition[] = [
  {
    id: 'ai-business',
    label: 'AI business systems',
    signal:
      'Founders, consultants, and operators need offer pages, audit funnels, case studies, lead magnets, and service systems that prove mechanism before asking for a call.',
    winningAngle:
      'FrankX wins by pairing premium commercial copy with actual implementation proof, issue trails, and architecture packets.',
    proof: ['real offer scope', 'proof artifact', 'claim audit', 'conversion route'],
  },
  {
    id: 'deployable-ai',
    label: 'Deployable AI starters',
    signal:
      'AI builders want templates that move beyond a pretty shell into auth boundaries, environment notes, evals, docs, admin states, and Vercel preview discipline.',
    winningAngle:
      'Package each starter as frontend, README, env guide, security boundary, data contract, and one verified preview.',
    proof: ['README', 'env boundary', 'Vercel preview', 'safe demo data'],
  },
  {
    id: 'creator-economy',
    label: 'Creator economy systems',
    signal:
      'Creators need fillable systems for media kits, sponsor CRM, course launches, newsletters, YouTube operations, digital products, and community workflows.',
    winningAngle:
      'GenCreator templates should feel immediately usable: schema-first, proof-friendly, exportable, and packaged for launch loops.',
    proof: ['fillable schema', 'creator proof dataset', 'export path', 'launch checklist'],
  },
  {
    id: 'worldbuilding-media',
    label: 'Worldbuilding and media',
    signal:
      'Original IP teams need rights-safe portals, character bibles, lore timelines, episode drops, fan submissions, manga readers, soundtrack pages, and pitch surfaces.',
    winningAngle:
      'AnimeLegends templates should make canon governance visible before visuals, then use cinematic style frames only after rights are clear.',
    proof: ['canon data', 'rights notes', 'style board', 'deterministic labels'],
  },
  {
    id: 'premium-motion',
    label: 'Premium motion and 3D',
    signal:
      'The premium template market is moving toward cinematic scenes, reusable prompts, 3D source, motion sections, poster frames, and social cutdowns.',
    winningAngle:
      'Compete on inspected still frames, reduced-motion routes, source provenance, and motion jobs that explain a product or world.',
    proof: ['poster frame', 'motion job', 'reduced-motion route', 'crop evidence'],
  },
  {
    id: 'template-infrastructure',
    label: 'Template infrastructure',
    signal:
      'Agents need prompt packs, section libraries, design-system import packs, QA gates, registries, and governance cards to reuse good work without burning tokens.',
    winningAngle:
      'Turn every accepted template into a reusable package with prompt, source, assets, preview, issue, and evidence.',
    proof: ['prompt pack', 'component source', 'QA checklist', 'Command Center card'],
  },
]

const tierLabels: Record<V0TemplateDemandTier, string> = {
  S: 'S-tier demand',
  A: 'High demand',
  B: 'Incubate',
}

const priorityIds = new Set([
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

function hasChannel(entry: V0TemplateEntry, channel: V0TemplateEntry['channels'][number]) {
  return entry.channels.includes(channel)
}

function getWave(entry: V0TemplateEntry): V0TemplateDemandWave {
  const family = entry.family.toLowerCase()

  if (entry.id.startsWith('v0-') || entry.id === 'getlayers-quality-benchmark') {
    return 'template-infrastructure'
  }

  if (hasChannel(entry, 'motion') || family.includes('3d') || family.includes('motion') || family.includes('film')) {
    return 'premium-motion'
  }

  if (hasChannel(entry, 'animelegends') || family.includes('world') || family.includes('lore')) {
    return 'worldbuilding-media'
  }

  if (hasChannel(entry, 'gencreator') || entry.brand === 'GenCreator') {
    return 'creator-economy'
  }

  if (hasChannel(entry, 'vercel') || entry.brand === 'Vercel') {
    return 'deployable-ai'
  }

  if (hasChannel(entry, 'ai-architecture') && entry.brand !== 'FrankX') {
    return 'deployable-ai'
  }

  return 'ai-business'
}

function getTier(entry: V0TemplateEntry, wave: V0TemplateDemandWave): V0TemplateDemandTier {
  if (priorityIds.has(entry.id)) {
    return 'S'
  }

  const family = entry.family.toLowerCase()
  const highDemandFamily =
    family.includes('starter') ||
    family.includes('assistant') ||
    family.includes('audit') ||
    family.includes('course') ||
    family.includes('newsletter') ||
    family.includes('media') ||
    family.includes('portal') ||
    family.includes('marketplace') ||
    family.includes('evaluation') ||
    family.includes('motion')

  if (highDemandFamily || wave === 'deployable-ai' || hasChannel(entry, 'v0')) {
    return 'A'
  }

  return 'B'
}

function getEvidenceToCollect(entry: V0TemplateEntry, wave: DemandWaveDefinition) {
  const base = [
    ...wave.proof,
    `${entry.assetTier} provenance`,
    'desktop and mobile screenshots',
  ]

  if (hasChannel(entry, 'vercel')) {
    base.push('deployable README or preview path')
  }

  if (hasChannel(entry, 'motion')) {
    base.push('poster and reduced-motion fallback')
  }

  return Array.from(new Set(base))
}

function getSuccessCriteria(entry: V0TemplateEntry, tier: V0TemplateDemandTier) {
  const criteria = [
    `${entry.title} has a named buyer and one primary action.`,
    `The package includes ${entry.deliverables.slice(0, 3).join(', ')}.`,
    'Unknown proof is marked as a next action instead of invented.',
  ]

  if (tier === 'S') {
    criteria.push('The package becomes a first-wave sprint item with a GitHub issue receipt.')
  }

  if (hasChannel(entry, 'gencreator')) {
    criteria.push('A creator can fill it with their own data without hiring a designer.')
  }

  if (hasChannel(entry, 'animelegends')) {
    criteria.push('Canon and rights notes exist before public image generation.')
  }

  return criteria
}

export function getV0TemplateDemandPlan(entry: V0TemplateEntry): V0TemplateDemandPlan {
  const wave = getWave(entry)
  const definition = v0TemplateDemandWaves.find((item) => item.id === wave) ?? v0TemplateDemandWaves[0]!
  const tier = getTier(entry, wave)

  return {
    tier,
    tierLabel: tierLabels[tier],
    wave,
    waveLabel: definition.label,
    communityNeed: definition.signal,
    winningAngle: definition.winningAngle,
    evidenceToCollect: getEvidenceToCollect(entry, definition),
    successCriteria: getSuccessCriteria(entry, tier),
  }
}
