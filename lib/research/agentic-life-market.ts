import registryJson from '@/data/research/agentic-life-market.json'

export type StrategicRole = 'build' | 'integrate' | 'partner' | 'compete' | 'inspire' | 'watch'
export type CapabilityState = 'yes' | 'partial' | 'no' | 'unknown'
export type CoverageAxis = 'context' | 'composition' | 'sovereignty' | 'verifiability' | 'multiDomain'

export interface AgenticLifeSystem {
  id: string
  name: string
  organization: string
  category: string
  strategicRole: StrategicRole
  summary: string
  sourceUrl: string
  repoUrl?: string
  license: string
  deployment: string[]
  integrationStatus: 'active' | 'candidate' | 'reference' | 'monitor'
  capabilities: Record<'openSource' | 'selfHost' | 'exportable' | 'trajectoryAware' | 'humanGateReady', CapabilityState>
  scores: Record<CoverageAxis, number>
  nextAction: string
  risk: string
  lastVerified: string
}

export interface AgenticLifeMarketRegistry {
  schemaVersion: string
  title: string
  description: string
  lastVerified: string
  canonicalUrl: string
  registryUrl: string
  methodology: {
    scoreScale: string
    warning: string
    axes: Record<CoverageAxis, string>
    strategicRoles: Record<StrategicRole, string>
  }
  systems: AgenticLifeSystem[]
}

export const agenticLifeMarketRegistry = registryJson as AgenticLifeMarketRegistry

export const coverageAxes: CoverageAxis[] = [
  'context',
  'composition',
  'sovereignty',
  'verifiability',
  'multiDomain',
]

export const axisLabels: Record<CoverageAxis, string> = {
  context: 'Context',
  composition: 'Compose',
  sovereignty: 'Sovereign',
  verifiability: 'Verify',
  multiDomain: 'Life-wide',
}

export const strategicRoleOrder: StrategicRole[] = [
  'build',
  'integrate',
  'partner',
  'compete',
  'inspire',
  'watch',
]

export function totalCoverage(system: AgenticLifeSystem): number {
  return coverageAxes.reduce((total, axis) => total + system.scores[axis], 0)
}

export function averageCoverage(systems: AgenticLifeSystem[]): number {
  if (systems.length === 0) return 0
  const possible = systems.length * coverageAxes.length * 3
  const actual = systems.reduce((total, system) => total + totalCoverage(system), 0)
  return Math.round((actual / possible) * 100)
}
