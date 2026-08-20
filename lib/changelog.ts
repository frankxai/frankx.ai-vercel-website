import changelogData from '@/data/changelog-updates.json'

export type ChangelogProof = {
  label: string
  url: string
}

export type ChangelogUpdate = {
  slug: string
  title: string
  summary: string
  releasedAt: string
  publishedAt: string
  modifiedAt: string
  category: string
  audience: string
  highlights: string[]
  tags: string[]
  proof: ChangelogProof[]
}

type ChangelogData = {
  schemaVersion: string
  updatedAt: string
  sourceRepository: string
  updates: ChangelogUpdate[]
}

const data = changelogData as ChangelogData

export const CHANGELOG_UPDATED_AT = data.updatedAt
export const CHANGELOG_SOURCE_REPOSITORY = data.sourceRepository

export function getChangelogUpdates(): ChangelogUpdate[] {
  return [...data.updates]
}

export function getChangelogUpdate(slug: string): ChangelogUpdate | undefined {
  return data.updates.find((update) => update.slug === slug)
}

export function getAdjacentChangelogUpdates(slug: string): {
  newer?: ChangelogUpdate
  older?: ChangelogUpdate
} {
  const index = data.updates.findIndex((update) => update.slug === slug)
  if (index === -1) return {}

  return {
    newer: index > 0 ? data.updates[index - 1] : undefined,
    older: index < data.updates.length - 1 ? data.updates[index + 1] : undefined,
  }
}

export function formatChangelogDate(date: string, style: 'short' | 'long' = 'long'): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
