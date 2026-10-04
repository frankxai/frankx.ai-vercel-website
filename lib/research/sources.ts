/**
 * Research Hub Source Registry — 100 Research Hubs
 *
 * Only individually reviewed sources may appear in this public client import.
 * Archived discovery leads live in a server-only editorial file.
 *
 * @see lib/research/domains.ts for domain definitions
 */

export type SourceType =
  | 'industry-report'
  | 'journal'
  | 'conference'
  | 'book'
  | 'blog'
  | 'official'
  | 'news'
  | 'benchmark'
  | 'preprint'

export interface ResearchSource {
  name: string
  title: string
  url: string
  date?: string
  type: SourceType
}

export const sourceTypeLabels: Record<SourceType, string> = {
  'industry-report': 'Industry Report',
  journal: 'Peer-Reviewed',
  conference: 'Peer-Reviewed Conference',
  book: 'Scholarly Book',
  blog: 'Blog / Analysis',
  official: 'Official Docs',
  news: 'News',
  benchmark: 'Benchmark',
  preprint: 'Preprint',
}

/**
 * Approved domain-keyed source registry. Empty until dossiers are reviewed.
 */
export const domainSources: Record<string, ResearchSource[]> = {}

export function getSourcesForDomain(slug: string): ResearchSource[] {
  return domainSources[slug] || []
}
