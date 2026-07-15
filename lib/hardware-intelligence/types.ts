export type HardwareLane = 'creator' | 'memory' | 'pro' | 'apple' | 'edge'

export type HardwarePlatform = {
  id: string
  name: string
  vendor: string
  lane: HardwareLane
  memory: string
  bandwidth: string
  power: string
  priceBandEur: [number, number]
  priceLabel: string
  modelBand: string
  bestFor: string[]
  tradeoffs: string[]
  sourceUrl: string
  sourceLabel: string
  evidenceKind: 'official' | 'official-and-retail'
}

export type SetupProfile = {
  id: string
  name: string
  strapline: string
  budgetBandEur: [number, number]
  dominantWorkload: 'build' | 'media' | 'agents' | 'balanced'
  components: string[]
  runsWell: string[]
  cloudFirst: string[]
  expansionTrigger: string
  fit: string
}

export type PlannerInputs = {
  budget: number
  workload: 'build' | 'media' | 'agents' | 'balanced'
  privacy: boolean
  alwaysOn: boolean
  team: boolean
}

export type HardwareCategoryCluster = 'local' | 'infrastructure' | 'access' | 'edge' | 'planning'

export type HardwareRouteLink = {
  label: string
  href: string
  reason: string
}

export type HardwareCategory = {
  slug: string
  cluster: HardwareCategoryCluster
  title: string
  shortTitle: string
  eyebrow: string
  summary: string
  definition: string
  audience: string
  firstDecision: string
  chooseWhen: string[]
  avoidWhen: string[]
  capabilities: string[]
  limitations: string[]
  decisionQuestions: string[]
  nextRoutes: HardwareRouteLink[]
  faq: Array<{ question: string; answer: string }>
}
