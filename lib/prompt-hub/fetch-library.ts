/**
 * Prompt Hub — Live Library Fetcher
 *
 * Reads the live `frankxai/prompt-library` GitHub corpus via the unauthenticated
 * Contents API, parses `pattern.md` frontmatter into `PatternFrontmatter`, and
 * caches results through Next.js `fetch` revalidation.
 *
 * Conventions:
 * - Unauthenticated GitHub API → 60 req/hr per IP. We page once for the folder
 *   list and fetch raw markdown directly from `raw.githubusercontent.com` for
 *   each pattern. 1-hour cache (`revalidate: 3600`) keeps us well below the
 *   limit at expected traffic.
 * - Graceful degradation: any fetch failure logs once and returns an empty
 *   `patterns` array with `live: false` so the UI can show a notice.
 * - No client-side fetches. All calls happen in server components / route
 *   handlers.
 *
 * Used by:
 *   - app/prompt-library/page.tsx
 *   - app/prompt-library/[id]/page.tsx
 */
import matter from 'gray-matter'

import type {
  Category,
  EvalScore,
  Lane,
  Pattern,
  PatternFrontmatter,
  Provenance,
  RedTeamReport,
  Technique,
} from './types'

const REPO_OWNER = 'frankxai'
const REPO_NAME = 'prompt-library'
const REPO_BRANCH = 'main'
const CONTENTS_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/prompts`
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/prompts`
const REPO_HTML = `https://github.com/${REPO_OWNER}/${REPO_NAME}`

const CACHE_TTL_SECONDS = 3600 // 1 hour
const USER_AGENT = 'frankx.ai-prompt-library/1.0 (+https://frankx.ai)'

type GhContentItem = {
  name: string
  path: string
  sha: string
  type: 'file' | 'dir'
  html_url: string
  download_url: string | null
}

export type LibrarySnapshot = {
  live: boolean
  patterns: Pattern[]
  fetchedAt: string // ISO
  repoUrl: string
  errors: string[]
}

export type PatternDetail = Pattern & {
  examples_md?: string
  readme_md?: string
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * List every pattern in the live corpus. Returns frontmatter + body for each.
 * Cached for 1 hour via Next.js `fetch` revalidation.
 *
 * On any failure (rate limit, network, parse) returns
 * `{ live: false, patterns: [], errors: [...] }` so the page can render a
 * "Live data unavailable" notice.
 */
export async function getLivePatterns(): Promise<LibrarySnapshot> {
  const errors: string[] = []
  const fetchedAt = new Date().toISOString()

  let listing: GhContentItem[]
  try {
    listing = await listPromptFolders()
  } catch (err) {
    errors.push(`Folder listing failed: ${describeError(err)}`)
    return { live: false, patterns: [], fetchedAt, repoUrl: REPO_HTML, errors }
  }

  const folders = listing.filter((item) => item.type === 'dir')
  if (folders.length === 0) {
    errors.push('No pattern folders found at prompts/.')
    return { live: false, patterns: [], fetchedAt, repoUrl: REPO_HTML, errors }
  }

  const settled = await Promise.allSettled(
    folders.map((folder) => fetchPattern(folder.name)),
  )

  const patterns: Pattern[] = []
  for (let i = 0; i < settled.length; i++) {
    const result = settled[i]
    const folder = folders[i]
    if (result.status === 'fulfilled' && result.value) {
      patterns.push(result.value)
    } else if (result.status === 'rejected') {
      errors.push(`${folder.name}: ${describeError(result.reason)}`)
    }
  }

  // Newest updated first; stable secondary sort by id for deterministic UI.
  patterns.sort((a, b) => {
    const aDate = a.frontmatter.updated || a.frontmatter.created || ''
    const bDate = b.frontmatter.updated || b.frontmatter.created || ''
    if (aDate !== bDate) return bDate.localeCompare(aDate)
    return a.frontmatter.id.localeCompare(b.frontmatter.id)
  })

  return {
    live: patterns.length > 0,
    patterns,
    fetchedAt,
    repoUrl: REPO_HTML,
    errors,
  }
}

/**
 * Fetch a single pattern with its companion files (examples.md, README.md).
 * Returns `null` if the pattern.md is missing or unparseable.
 */
export async function getLivePatternById(id: string): Promise<PatternDetail | null> {
  if (!isSafeId(id)) return null

  let patternMd: string | null = null
  try {
    patternMd = await fetchRaw(`${id}/pattern.md`)
  } catch {
    return null
  }
  if (!patternMd) return null

  const parsed = parsePatternMd(patternMd, id)
  if (!parsed) return null

  // Companion files (best-effort, soft-fail to undefined).
  const [examples, readme] = await Promise.all([
    fetchRaw(`${id}/examples.md`).catch(() => null),
    fetchRaw(`${id}/README.md`).catch(() => null),
  ])

  return {
    ...parsed,
    examples_md: examples ?? undefined,
    readme_md: readme ?? undefined,
  }
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

async function listPromptFolders(): Promise<GhContentItem[]> {
  const res = await fetch(CONTENTS_API, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': USER_AGENT,
    },
    next: { revalidate: CACHE_TTL_SECONDS, tags: ['prompt-library'] },
  } as RequestInit & { next?: { revalidate?: number; tags?: string[] } })

  if (!res.ok) {
    throw new Error(`GitHub Contents API ${res.status} ${res.statusText}`)
  }

  const json = (await res.json()) as GhContentItem[]
  if (!Array.isArray(json)) {
    throw new Error('Unexpected GitHub Contents API response shape')
  }
  return json
}

async function fetchPattern(folderId: string): Promise<Pattern | null> {
  const raw = await fetchRaw(`${folderId}/pattern.md`)
  if (!raw) return null
  return parsePatternMd(raw, folderId)
}

async function fetchRaw(relPath: string): Promise<string | null> {
  const url = `${RAW_BASE}/${relPath}`
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: CACHE_TTL_SECONDS, tags: ['prompt-library'] },
  } as RequestInit & { next?: { revalidate?: number; tags?: string[] } })
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`Raw fetch ${url} → ${res.status}`)
  }
  return await res.text()
}

/**
 * Parse a pattern.md (YAML frontmatter + markdown body) into a `Pattern`.
 * Returns `null` if frontmatter is missing required fields.
 */
function parsePatternMd(source: string, fallbackId: string): Pattern | null {
  const parsed = parseFrontmatter(source)
  if (!parsed) return null
  const data = (parsed.data ?? {}) as Record<string, unknown>

  // Required fields — bail if any are missing.
  const id = (data.id ?? fallbackId) as string
  const title = data.title as string | undefined
  const description = data.description as string | undefined
  const version = (data.version ?? '0.0.0') as string
  const lane = normalizeLane(data.lane)
  const category = normalizeCategory(data.category)

  if (!id || !title || !description || !lane || !category) {
    return null
  }

  const psycheRaw = data.psyche as
    | { applicable?: unknown; boundary?: unknown; risk?: unknown }
    | undefined
  const psyche = psycheRaw
    ? {
        applicable: Boolean(psycheRaw.applicable),
        boundary: ((['maps-only', 'instruments-only', 'n/a'] as const).includes(
          psycheRaw.boundary as 'maps-only' | 'instruments-only' | 'n/a',
        )
          ? (psycheRaw.boundary as 'maps-only' | 'instruments-only' | 'n/a')
          : 'n/a') as 'maps-only' | 'instruments-only' | 'n/a',
        risk: ((['low', 'medium', 'high'] as const).includes(
          psycheRaw.risk as 'low' | 'medium' | 'high',
        )
          ? (psycheRaw.risk as 'low' | 'medium' | 'high')
          : 'low') as 'low' | 'medium' | 'high',
      }
    : undefined

  const frontmatter: PatternFrontmatter = {
    id,
    title,
    version,
    description,
    lane,
    category,
    tags: Array.isArray(data.tags) ? (data.tags as unknown[]).map(String) : [],
    techniques: Array.isArray(data.techniques)
      ? ((data.techniques as unknown[]).map(String) as Technique[])
      : [],
    provenance: normalizeProvenance(data.provenance),
    eval: normalizeEval(data.eval),
    red_team: normalizeRedTeam(data.red_team),
    psyche,
    created: toDateString(data.created),
    updated: toDateString(data.updated ?? data.created),
  }

  return {
    frontmatter,
    body: parsed.content.trim(),
  }
}

/**
 * gray-matter's YAML engine (js-yaml) throws on duplicated mapping keys, and
 * much of the live corpus carries an accidental duplicate (`probes_static`
 * appears twice in most pattern.md files). On a duplicate-key error we drop
 * repeated identical `key: value` lines from the frontmatter block (keeping
 * the first occurrence) and retry once, so one sloppy key doesn't evict the
 * pattern from the library.
 */
function parseFrontmatter(source: string): matter.GrayMatterFile<string> | null {
  try {
    return matter(source)
  } catch {
    const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!fm) return null
    const seen = new Set<string>()
    const deduped = fm[1]
      .split(/\r?\n/)
      .filter((line) => {
        if (!/^\s*[\w-]+:/.test(line)) return true
        if (seen.has(line)) return false
        seen.add(line)
        return true
      })
      .join('\n')
    try {
      return matter(source.replace(fm[0], `---\n${deduped}\n---`))
    } catch {
      return null
    }
  }
}

/**
 * YAML parses unquoted dates (`created: 2026-05-14`) into JS Date objects.
 * Rendering those directly is a React error ("Objects are not valid as a
 * React child") — always coerce to a YYYY-MM-DD string.
 */
function toDateString(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  if (typeof value === 'string') return value
  return ''
}

function normalizeLane(value: unknown): Lane | null {
  const allowed: Lane[] = ['claude', 'gpt', 'gemini', 'oss', 'cross-lab']
  if (typeof value !== 'string') return null
  return (allowed as string[]).includes(value) ? (value as Lane) : null
}

function normalizeCategory(value: unknown): Category | null {
  const allowed: Category[] = [
    'analyze',
    'create',
    'extract',
    'summarize',
    'answer',
    'audit',
    'check',
    'compare',
    'improve',
    'write',
    'rate',
    'introspect',
    'profile',
  ]
  if (typeof value !== 'string') return null
  return (allowed as string[]).includes(value) ? (value as Category) : null
}

function normalizeProvenance(raw: unknown): Provenance {
  const fallback: Provenance = { source: 'manual', license: 'MIT' }
  if (!raw || typeof raw !== 'object') return fallback
  const obj = raw as Record<string, unknown>
  const sourceVal = String(obj.source ?? 'manual') as Provenance['source']
  return {
    source: sourceVal,
    source_url: typeof obj.source_url === 'string' ? obj.source_url : undefined,
    attribution: typeof obj.attribution === 'string' ? obj.attribution : undefined,
    license: (typeof obj.license === 'string' ? obj.license : 'MIT') as Provenance['license'],
  }
}

function normalizeEval(raw: unknown): EvalScore | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const obj = raw as Record<string, unknown>
  if (obj.score === null || obj.score === undefined) return undefined
  const score = Number(obj.score)
  // score 0 means "never run" in the corpus — treat as unscored so the UI
  // shows "Not yet evaluated" instead of a misleading "0.0 / 5".
  if (!Number.isFinite(score) || score <= 0) return undefined
  const verdictRaw = String(obj.verdict ?? '').toLowerCase()
  const verdict: EvalScore['verdict'] =
    verdictRaw === 'pass' || verdictRaw === 'warn' || verdictRaw === 'fail'
      ? verdictRaw
      : score >= 3.5
      ? 'pass'
      : score >= 2.5
      ? 'warn'
      : 'fail'
  return {
    score,
    last_run: toDateString(obj.last_run),
    test_count: Number(obj.test_count ?? 0),
    verdict,
  }
}

function normalizeRedTeam(raw: unknown): RedTeamReport | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const obj = raw as Record<string, unknown>
  const statusRaw = String(obj.status ?? '').toLowerCase()
  // The corpus uses `needs-audit` for un-audited entries — we surface that
  // verbatim in the notes for display, while coercing the typed status to
  // `warn` (the closest declared value) so the UI degrades gracefully.
  const status: RedTeamReport['status'] =
    statusRaw === 'pass' || statusRaw === 'warn' || statusRaw === 'fail'
      ? statusRaw
      : 'warn'
  return {
    status,
    audited: toDateString(obj.audited),
    notes:
      typeof obj.notes === 'string'
        ? obj.notes
        : statusRaw === 'needs-audit'
        ? 'Red Team gate pending — needs-audit.'
        : undefined,
    probes_run: typeof obj.probes_run === 'number' ? obj.probes_run : undefined,
    probes_passed: typeof obj.probes_passed === 'number' ? obj.probes_passed : undefined,
    probes_warn: typeof obj.probes_warn === 'number' ? obj.probes_warn : undefined,
    probes_failed: typeof obj.probes_failed === 'number' ? obj.probes_failed : undefined,
  }
}

function describeError(err: unknown): string {
  if (err instanceof Error) return err.message
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

/**
 * Guardrail against path traversal. Pattern IDs are alphanumeric +
 * underscore + dash (Fabric convention).
 */
function isSafeId(id: string): boolean {
  return /^[a-z0-9_\-]+$/i.test(id)
}
