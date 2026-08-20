import rawRegistry from '@/data/dream100/registry.json'

export type Dream100CategoryId =
  | 'frontier-intelligence'
  | 'agentic-infrastructure'
  | 'leading-minds'
  | 'generative-culture'

export type Dream100Member = {
  id: string
  slug: string
  name: string
  category: Dream100CategoryId
  kind: 'organization' | 'person'
  url: string
  priority: 1 | 2 | 3
  cohort: 'priority' | 'active' | 'horizon'
  why: string
  frankxAngle: string
  genCreatorAngle: string
  showcaseEligible: boolean
}

export type Dream100Signal = {
  id: string
  slug: string
  subjectId: string
  publishedAt: string
  sourceDate: string
  updatedAt: string
  title: string
  dek: string
  observation: string
  evidence: string[]
  architectureAngle: string
  creatorAngle: string
  contribution: string
  sourceTitle: string
  sourceUrl: string
  verification: 'primary' | 'secondary'
  sourceType: string
  tags: string[]
  status: 'published' | 'draft'
}

export type Dream100Registry = {
  schemaVersion: 'starlight.dream100.v1'
  snapshotId: string
  generatedAt: string
  principle: string
  methodology: Record<'inclusion' | 'signals' | 'relationship' | 'correction', string>
  categories: Array<{
    id: Dream100CategoryId
    title: string
    description: string
    frankxAngle: string
    genCreatorAngle: string
  }>
  members: Dream100Member[]
  signals: Dream100Signal[]
}

export const dream100 = rawRegistry as unknown as Dream100Registry

function assertRegistry(registry: Dream100Registry) {
  const memberIds = new Set(registry.members.map((member) => member.id))
  const signalSlugs = new Set(registry.signals.map((signal) => signal.slug))
  if (registry.schemaVersion !== 'starlight.dream100.v1') throw new Error('Unsupported Dream 100 schema')
  if (registry.members.length !== 100 || memberIds.size !== 100) throw new Error('Dream 100 must contain 100 unique members')
  if (signalSlugs.size !== registry.signals.length) throw new Error('Dream 100 signals must have unique slugs')
  for (const category of registry.categories) {
    if (registry.members.filter((member) => member.category === category.id).length !== 25) {
      throw new Error(`Dream 100 category ${category.id} must contain 25 members`)
    }
  }
  for (const signal of registry.signals) {
    if (!memberIds.has(signal.subjectId)) throw new Error(`Unknown Dream 100 signal subject: ${signal.subjectId}`)
    if (!signal.sourceUrl.startsWith('https://')) throw new Error(`Signal source must use HTTPS: ${signal.slug}`)
  }
}

assertRegistry(dream100)

export const publishedSignals = dream100.signals
  .filter((signal) => signal.status === 'published')
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export function getDream100Member(id: string) {
  return dream100.members.find((member) => member.id === id)
}

export function getDream100Signal(slug: string) {
  return publishedSignals.find((signal) => signal.slug === slug)
}

export function getMembersByCategory(category: Dream100CategoryId) {
  return dream100.members
    .filter((member) => member.category === category)
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name))
}

