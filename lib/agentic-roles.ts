import data from '@/data/agentic-roles.json'

export type RoleStage = 'waitlist' | 'concept'

export interface AgenticRole {
  slug: string
  name: string
  stage: RoleStage
  youBecome: string
  who: string
  headline: string
  subline: string
  firstWin: string
  proof: string
  compounds: string
  exists: string
  crew: string[]
  scene: { title: string; body: string }
  boundary: string
}

export const agenticFounder = data.founder
export const agenticRoles = data.roles as AgenticRole[]
export const agenticStages = data.stages

export function getAgenticRole(slug: string): AgenticRole | undefined {
  return agenticRoles.find((role) => role.slug === slug)
}
