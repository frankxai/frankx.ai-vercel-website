/**
 * Prompt Library — live page reading from the frankxai/prompt-library GitHub corpus.
 *
 * Server component. All data flows through `getLivePatterns()` which caches
 * via Next.js `fetch` revalidation (1h). No client-side fetches.
 *
 * Filter state lives in URL search params so the page is shareable + indexable:
 *   ?lane=claude|gpt|gemini|oss|cross-lab|all
 *   ?category=analyze|create|extract|summarize|answer|...
 *   ?q=<substring>
 *   ?page=<1+>
 */
import type { Metadata } from 'next'
import Link from 'next/link'

import { getLivePatterns } from '@/lib/prompt-hub/fetch-library'
import type { Category, Lane, Pattern } from '@/lib/prompt-hub/types'

export const metadata: Metadata = {
  title: 'Prompt Library — 98 patterns evaluated, attributed, lab-tagged | FrankX',
  description:
    'Live OSS prompt corpus. Every pattern in the frankxai/prompt-library repo, ranked, attributed, and lab-tagged. Filter by Claude / GPT / Gemini / OSS lane, by category, or search across titles.',
  alternates: { canonical: 'https://www.frankx.ai/prompt-library' },
  openGraph: {
    title: 'Prompt Library — FrankX',
    description:
      'Every pattern in the frankxai/prompt-library corpus, ranked, attributed, lab-tagged, red-teamed. Open source.',
    url: 'https://www.frankx.ai/prompt-library',
    type: 'website',
  },
}

const PAGE_SIZE = 24

const LANE_OPTIONS: Array<{ id: Lane | 'all'; label: string }> = [
  { id: 'all', label: 'All lanes' },
  { id: 'claude', label: 'Claude' },
  { id: 'gpt', label: 'GPT' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'oss', label: 'OSS' },
  { id: 'cross-lab', label: 'Cross-lab' },
]

const CATEGORY_OPTIONS: Array<{ id: Category | 'all'; label: string }> = [
  { id: 'all', label: 'All categories' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'create', label: 'Create' },
  { id: 'extract', label: 'Extract' },
  { id: 'summarize', label: 'Summarize' },
  { id: 'answer', label: 'Answer' },
  { id: 'audit', label: 'Audit' },
  { id: 'check', label: 'Check' },
  { id: 'compare', label: 'Compare' },
  { id: 'improve', label: 'Improve' },
  { id: 'write', label: 'Write' },
  { id: 'rate', label: 'Rate' },
  { id: 'introspect', label: 'Introspect' },
  { id: 'profile', label: 'Profile' },
]

const LANE_COLORS: Record<Lane, string> = {
  claude: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  gpt: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  gemini: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  oss: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  'cross-lab': 'border-slate-500/40 bg-slate-500/10 text-slate-300',
}

type SearchParams = Promise<{
  lane?: string
  category?: string
  q?: string
  page?: string
}>

export default async function PromptLibraryPage(props: {
  searchParams: SearchParams
}) {
  const params = await props.searchParams
  const lane = normalizeLane(params.lane)
  const category = normalizeCategory(params.category)
  const query = (params.q ?? '').trim()
  const requestedPage = Math.max(1, Number(params.page ?? 1) || 1)

  const snapshot = await getLivePatterns()
  const allPatterns = snapshot.patterns

  const filtered = allPatterns.filter((p) => {
    if (lane !== 'all' && p.frontmatter.lane !== lane) return false
    if (category !== 'all' && p.frontmatter.category !== category) return false
    if (query) {
      const needle = query.toLowerCase()
      const hay = `${p.frontmatter.title} ${p.frontmatter.description} ${p.frontmatter.id} ${p.frontmatter.tags.join(' ')}`.toLowerCase()
      if (!hay.includes(needle)) return false
    }
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const pageStart = (page - 1) * PAGE_SIZE
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  const jsonLd = buildJsonLd(filtered.slice(0, 50))
  const filtersActive = lane !== 'all' || category !== 'all' || query.length > 0

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Header */}
        <header className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Live corpus · {snapshot.patterns.length} patterns · cached 1h
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            The Prompt Library
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            Every pattern in the{' '}
            <a
              href={snapshot.repoUrl}
              className="text-emerald-400 hover:text-emerald-300"
              rel="noreferrer noopener"
            >
              frankxai/prompt-library
            </a>{' '}
            corpus. Reads live from GitHub. Filter by lane, by category, or search across titles, descriptions, and tags.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Last refreshed: {formatTimestamp(snapshot.fetchedAt)} ·{' '}
            <Link href="/prompts" className="text-emerald-400 hover:text-emerald-300">
              How the Hub works →
            </Link>
          </p>

          {!snapshot.live && (
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-200">
              Live data unavailable; check back shortly. The GitHub API may have
              rate-limited this region (60 req/hr unauthenticated) — the next
              cache refresh will retry automatically.
            </div>
          )}
        </header>

        {/* Filters */}
        <section className="mb-10 space-y-5">
          <FilterRow label="Lane" options={LANE_OPTIONS} activeId={lane} param="lane" current={params} />
          <FilterRow label="Category" options={CATEGORY_OPTIONS} activeId={category} param="category" current={params} />
          <SearchForm currentQuery={query} currentLane={lane} currentCategory={category} />
          {filtersActive && (
            <div className="text-sm text-slate-500">
              Showing <span className="text-emerald-400">{filtered.length}</span> of {snapshot.patterns.length} patterns.{' '}
              <Link href="/prompt-library" className="text-emerald-400 hover:text-emerald-300">
                Reset filters
              </Link>
            </div>
          )}
        </section>

        {/* Grid */}
        {pageItems.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center backdrop-blur-sm"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-emerald-300"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-white">No patterns match those filters</h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Try a broader lane, a different category, or a shorter search term.
            </p>
            <Link
              href="/prompt-library"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Reset filters →
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((p) => (
              <PatternCard key={p.frontmatter.id} pattern={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-12 flex items-center justify-center gap-2 text-sm"
          >
            {page > 1 && (
              <Link
                href={buildPageUrl({ ...params, page: String(page - 1) })}
                rel="prev"
                className="rounded-full border border-slate-800 bg-slate-900/40 px-4 py-2 text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                ← Previous
              </Link>
            )}
            <span className="px-3 py-2 text-slate-500" aria-live="polite">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={buildPageUrl({ ...params, page: String(page + 1) })}
                rel="next"
                className="rounded-full border border-slate-800 bg-slate-900/40 px-4 py-2 text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Next →
              </Link>
            )}
          </nav>
        )}

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-800 pt-10 text-sm text-slate-500">
          <p className="mb-2">
            Corpus repo:{' '}
            <a
              href={snapshot.repoUrl}
              className="font-mono text-emerald-400 hover:text-emerald-300"
              rel="noreferrer noopener"
            >
              frankxai/prompt-library
            </a>
          </p>
          <p className="mb-2">
            Contribute: open a PR against{' '}
            <code className="font-mono text-emerald-300">prompts/&lt;id&gt;/pattern.md</code> using the
            schema in <code className="font-mono">lib/prompt-hub/types.ts</code>.
          </p>
          <p>
            Inspired by Fabric (Daniel Miessler, MIT) · awesome-claude-prompts (MIT) ·
            awesome-chatgpt-prompts (CC0). Evaluated via promptfoo.
          </p>
        </footer>
      </article>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function PatternCard({ pattern }: { pattern: Pattern }) {
  const fm = pattern.frontmatter
  return (
    <Link
      href={`/prompt-library/${fm.id}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-slate-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug text-white">
          {fm.title}
        </h3>
        <RedTeamDot pattern={pattern} />
      </div>

      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {fm.description}
      </p>

      <div className="mt-auto space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className={LANE_COLORS[fm.lane]}>{fm.lane}</Badge>
          <Badge className="border-slate-700 bg-slate-900/60 text-slate-300">
            {fm.category}
          </Badge>
          <ProvenanceBadge pattern={pattern} />
        </div>
        <EvalBar pattern={pattern} />
      </div>
    </Link>
  )
}

function Badge({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  )
}

function ProvenanceBadge({ pattern }: { pattern: Pattern }) {
  const src = pattern.frontmatter.provenance.source
  const label =
    src === 'fabric'
      ? 'fabric'
      : src === 'awesome-chatgpt-prompts'
      ? 'awesome-gpt'
      : src === 'awesome-claude-prompts'
      ? 'awesome-claude'
      : src === 'original'
      ? 'original'
      : src === 'harvested-from-paper'
      ? 'paper'
      : src === 'lab-docs'
      ? 'lab-docs'
      : 'manual'
  return (
    <Badge className="border-slate-700/60 bg-slate-900/40 text-slate-400">
      ↗ {label}
    </Badge>
  )
}

function RedTeamDot({ pattern }: { pattern: Pattern }) {
  const rt = pattern.frontmatter.red_team
  let color = 'bg-slate-600' // unknown / needs-audit
  let title = 'Red team: needs audit'
  if (rt) {
    if (rt.status === 'pass') {
      color = 'bg-emerald-400'
      title = 'Red team: pass'
    } else if (rt.status === 'warn') {
      const isNeedsAudit = rt.notes?.toLowerCase().includes('needs-audit') ?? false
      color = isNeedsAudit ? 'bg-slate-500' : 'bg-amber-400'
      title = isNeedsAudit ? 'Red team: needs audit' : 'Red team: warn'
    } else if (rt.status === 'fail') {
      color = 'bg-rose-500'
      title = 'Red team: fail'
    }
  }
  return (
    <span
      title={title}
      aria-label={title}
      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`}
    />
  )
}

function EvalBar({ pattern }: { pattern: Pattern }) {
  const ev = pattern.frontmatter.eval
  if (!ev) {
    return (
      <p className="text-[11px] uppercase tracking-wider text-slate-600">
        Not yet evaluated
      </p>
    )
  }
  const pct = Math.max(0, Math.min(100, (ev.score / 5) * 100))
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider">
        <span className="text-slate-500">Eval score</span>
        <span className="font-mono text-emerald-300">{ev.score.toFixed(1)} / 5</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-emerald-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

function FilterRow<T extends string>({
  label,
  options,
  activeId,
  param,
  current,
}: {
  label: string
  options: Array<{ id: T; label: string }>
  activeId: T
  param: 'lane' | 'category'
  current: Record<string, string | undefined>
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = opt.id === activeId
          const next: Record<string, string | undefined> = {
            ...current,
            [param]: opt.id === 'all' ? undefined : (opt.id as string),
            page: undefined,
          }
          return (
            <Link
              key={opt.id}
              href={buildPageUrl(next)}
              aria-current={isActive ? 'true' : undefined}
              className={
                'rounded-full border px-3 py-1 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ' +
                (isActive
                  ? 'border-emerald-500/60 bg-emerald-500/15 font-medium text-emerald-300'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200')
              }
            >
              {opt.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function SearchForm({
  currentQuery,
  currentLane,
  currentCategory,
}: {
  currentQuery: string
  currentLane: Lane | 'all'
  currentCategory: Category | 'all'
}) {
  return (
    <form
      action="/prompt-library"
      method="get"
      className="flex flex-col gap-2 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="prompt-search"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Search
        </label>
        <input
          id="prompt-search"
          name="q"
          type="search"
          defaultValue={currentQuery}
          placeholder="e.g. extract_wisdom, summarize, claude"
          aria-label="Search prompt patterns"
          className="w-full rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 transition focus:border-emerald-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        />
      </div>
      {currentLane !== 'all' && <input type="hidden" name="lane" value={currentLane} />}
      {currentCategory !== 'all' && (
        <input type="hidden" name="category" value={currentCategory} />
      )}
      <button
        type="submit"
        className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        Search
      </button>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeLane(value: string | undefined): Lane | 'all' {
  const allowed: Array<Lane | 'all'> = [
    'all',
    'claude',
    'gpt',
    'gemini',
    'oss',
    'cross-lab',
  ]
  if (!value) return 'all'
  return (allowed as string[]).includes(value) ? (value as Lane | 'all') : 'all'
}

function normalizeCategory(value: string | undefined): Category | 'all' {
  const allowed: Array<Category | 'all'> = [
    'all',
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
  if (!value) return 'all'
  return (allowed as string[]).includes(value) ? (value as Category | 'all') : 'all'
}

function buildPageUrl(params: Record<string, string | undefined>): string {
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v && v.length > 0) usp.set(k, v)
  }
  const qs = usp.toString()
  return qs ? `/prompt-library?${qs}` : '/prompt-library'
}

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'
  } catch {
    return iso
  }
}

function buildJsonLd(patterns: Pattern[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX Prompt Library',
    description:
      'Live OSS prompt corpus. Every pattern in frankxai/prompt-library, ranked, attributed, lab-tagged.',
    url: 'https://www.frankx.ai/prompt-library',
    isPartOf: {
      '@type': 'WebSite',
      name: 'FrankX',
      url: 'https://www.frankx.ai',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: patterns.length,
      itemListElement: patterns.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Article',
          name: p.frontmatter.title,
          description: p.frontmatter.description,
          url: `https://www.frankx.ai/prompt-library/${p.frontmatter.id}`,
          dateCreated: p.frontmatter.created || undefined,
          dateModified: p.frontmatter.updated || undefined,
          keywords: p.frontmatter.tags.join(', '),
        },
      })),
    },
  }
}
