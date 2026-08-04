import rawCorpus from './public-corpus.generated.ts'

export const PUBLIC_KNOWLEDGE_DOMAINS = ['architecture', 'creator', 'operator', 'vitality', 'perspective', 'general'] as const
export type PublicKnowledgeDomain = (typeof PUBLIC_KNOWLEDGE_DOMAINS)[number]

interface CorpusRecord {
  id: string
  url: string
  title: string
  description: string
  section: string
  date: string
  domains: string[]
  tags: string[]
  text: string
}

interface CorpusPayload {
  version: number
  fingerprint: string
  publishedPostCount: number
  publicRouteCount: number
  recordCount: number
  records: CorpusRecord[]
}

export interface PublicKnowledgeResult {
  id: string
  url: string
  title: string
  section: string
  date: string
  domains: string[]
  excerpt: string
  score: number
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'can', 'do', 'for', 'from', 'how', 'i', 'if', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'our', 'so', 'that', 'the', 'their', 'this', 'to', 'was', 'we', 'what', 'when', 'where', 'which', 'who', 'why', 'with', 'you', 'your',
])

function isCorpusPayload(value: unknown): value is CorpusPayload {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<CorpusPayload>
  return typeof candidate.fingerprint === 'string' && Array.isArray(candidate.records)
}

if (!isCorpusPayload(rawCorpus)) throw new Error('Frank Intelligence corpus is malformed. Regenerate it before starting Eve.')

const corpus = rawCorpus

function tokens(value: string): string[] {
  return [...new Set(
    value
      .toLowerCase()
      .normalize('NFKD')
      .match(/[\p{L}\p{N}]+/gu)
      ?.filter((token) => token.length > 1 && !STOP_WORDS.has(token)) ?? [],
  )]
}

function occurrences(haystack: string, needle: string): number {
  let count = 0
  let cursor = 0
  while (count < 5) {
    const next = haystack.indexOf(needle, cursor)
    if (next === -1) break
    count += 1
    cursor = next + needle.length
  }
  return count
}

function excerpt(text: string, queryTokens: string[], maxLength = 620): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  const lower = normalized.toLowerCase()
  const firstMatch = queryTokens
    .map((token) => lower.indexOf(token))
    .filter((position) => position >= 0)
    .sort((a, b) => a - b)[0] ?? 0
  const start = Math.max(0, firstMatch - 150)
  const end = Math.min(normalized.length, start + maxLength)
  return `${start > 0 ? '…' : ''}${normalized.slice(start, end).trim()}${end < normalized.length ? '…' : ''}`
}

function scoreRecord(record: CorpusRecord, query: string, queryTokens: string[]): number {
  const phrase = query.toLowerCase().trim()
  const title = record.title.toLowerCase()
  const section = record.section.toLowerCase()
  const description = record.description.toLowerCase()
  const tags = record.tags.join(' ').toLowerCase()
  const domains = record.domains.join(' ').toLowerCase()
  const body = record.text.toLowerCase()
  let score = 0

  if (phrase.length > 2) {
    if (title.includes(phrase)) score += 18
    if (section.includes(phrase)) score += 10
    if (description.includes(phrase)) score += 7
    if (body.includes(phrase)) score += 5
  }

  for (const token of queryTokens) {
    if (title.includes(token)) score += 7
    if (section.includes(token)) score += 4
    if (tags.includes(token)) score += 4
    if (domains.includes(token)) score += 3
    if (description.includes(token)) score += 2
    score += Math.min(occurrences(body, token), 4)
  }

  if (record.id.startsWith('foundation:') && score > 0) score += 2
  return score
}

export function searchPublicCorpus({
  query,
  domains = [],
  limit = 8,
}: {
  query: string
  domains?: PublicKnowledgeDomain[]
  limit?: number
}): PublicKnowledgeResult[] {
  const queryTokens = tokens(query)
  if (queryTokens.length === 0) return []
  const requestedDomains = new Set(domains)

  return corpus.records
    .filter((record) => requestedDomains.size === 0 || record.domains.some((domain) => requestedDomains.has(domain as PublicKnowledgeDomain)))
    .map((record) => ({ record, score: scoreRecord(record, query, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.record.title.localeCompare(right.record.title))
    .slice(0, Math.max(1, Math.min(limit, 12)))
    .map(({ record, score }) => ({
      id: record.id,
      url: record.url,
      title: record.title,
      section: record.section,
      date: record.date,
      domains: record.domains,
      excerpt: excerpt(record.text, queryTokens),
      score,
    }))
}

export function publicCorpusInfo() {
  return {
    version: corpus.version,
    fingerprint: corpus.fingerprint,
    publishedPostCount: corpus.publishedPostCount,
    publicRouteCount: corpus.publicRouteCount,
    recordCount: corpus.recordCount,
  }
}
