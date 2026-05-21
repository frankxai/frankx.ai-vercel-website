/**
 * Prompt detail page — fetches a single pattern from the live GitHub corpus
 * and renders the body + companion files (examples.md, README.md) under a
 * server-side tab toggle (?tab=pattern|examples|provenance|eval).
 *
 * No client-side data fetching. Small client island only for copy buttons.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CopyButton } from '@/components/prompt-library/CopyButton'
import {
  getLivePatternById,
  getLivePatterns,
} from '@/lib/prompt-hub/fetch-library'
import type { Lane, Pattern, PatternFrontmatter } from '@/lib/prompt-hub/types'

type Params = Promise<{ id: string }>
type SearchParamsType = Promise<{ tab?: string }>

const LANE_COLORS: Record<Lane, string> = {
  claude: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  gpt: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
  gemini: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  oss: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  'cross-lab': 'border-slate-500/40 bg-slate-500/10 text-slate-300',
}

const TABS = ['pattern', 'examples', 'provenance', 'eval'] as const
type TabId = (typeof TABS)[number]

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { id } = await props.params
  const pattern = await getLivePatternById(id)
  if (!pattern) {
    return { title: 'Pattern not found | FrankX Prompt Library' }
  }
  const fm = pattern.frontmatter
  return {
    title: `${fm.title} — Prompt Library | FrankX`,
    description: fm.description,
    alternates: { canonical: `https://www.frankx.ai/prompt-library/${fm.id}` },
    openGraph: {
      title: `${fm.title} — FrankX Prompt Library`,
      description: fm.description,
      url: `https://www.frankx.ai/prompt-library/${fm.id}`,
      type: 'article',
    },
  }
}

export default async function PromptDetailPage(props: {
  params: Params
  searchParams: SearchParamsType
}) {
  const { id } = await props.params
  const { tab: tabParam } = await props.searchParams

  const pattern = await getLivePatternById(id)
  if (!pattern) {
    notFound()
  }

  const tab: TabId = (TABS as readonly string[]).includes(tabParam ?? '')
    ? (tabParam as TabId)
    : 'pattern'

  const snapshot = await getLivePatterns()
  const siblingsByLane = snapshot.patterns
    .filter(
      (p) =>
        p.frontmatter.id !== pattern.frontmatter.id &&
        p.frontmatter.lane === pattern.frontmatter.lane,
    )
    .slice(0, 6)
  const siblingsByCategory = snapshot.patterns
    .filter(
      (p) =>
        p.frontmatter.id !== pattern.frontmatter.id &&
        p.frontmatter.category === pattern.frontmatter.category &&
        p.frontmatter.lane !== pattern.frontmatter.lane,
    )
    .slice(0, 6)

  const jsonLd = buildJsonLd(pattern)
  const fm = pattern.frontmatter

  const frontmatterJson = JSON.stringify(fm, null, 2)
  const rawMarkdown = pattern.body

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        {/* Back link */}
        <Link
          href="/prompt-library"
          className="mb-6 inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to library
        </Link>

        {/* Header */}
        <header className="mb-8">
          <p className="mb-3 font-mono text-xs text-slate-500">
            {fm.id} · v{fm.version}
          </p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {fm.title}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-300">
            {fm.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={LANE_COLORS[fm.lane]}>{fm.lane}</Badge>
            <Badge className="border-slate-700 bg-slate-900/60 text-slate-300">
              {fm.category}
            </Badge>
            {fm.techniques.map((t) => (
              <Badge key={t} className="border-slate-700/60 bg-slate-900/40 text-slate-400">
                {t}
              </Badge>
            ))}
            {fm.tags.map((t) => (
              <Badge key={t} className="border-slate-800 bg-transparent text-slate-500">
                #{t}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CopyButton text={rawMarkdown} label="Copy as Markdown" />
            <CopyButton text={frontmatterJson} label="Copy as JSON frontmatter" />
          </div>
        </header>

        {/* Tabs */}
        <nav className="mb-8 flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {TABS.map((t) => (
            <Link
              key={t}
              href={
                t === 'pattern'
                  ? `/prompt-library/${fm.id}`
                  : `/prompt-library/${fm.id}?tab=${t}`
              }
              className={
                tab === t
                  ? 'rounded-t-md border-b-2 border-emerald-400 px-4 py-2 text-sm font-medium text-emerald-300'
                  : 'rounded-t-md border-b-2 border-transparent px-4 py-2 text-sm text-slate-400 hover:text-slate-200'
              }
            >
              {t === 'pattern'
                ? 'Pattern'
                : t === 'examples'
                ? 'Examples'
                : t === 'provenance'
                ? 'Provenance'
                : 'Eval'}
            </Link>
          ))}
        </nav>

        {/* Tab content */}
        <section className="mb-16">
          {tab === 'pattern' && <PatternBodyPanel body={pattern.body} />}
          {tab === 'examples' && (
            <RawMarkdownPanel
              body={pattern.examples_md ?? ''}
              emptyLabel="No examples yet. Open a PR to add input/output samples."
            />
          )}
          {tab === 'provenance' && <ProvenancePanel pattern={pattern} />}
          {tab === 'eval' && <EvalPanel pattern={pattern} />}
        </section>

        {/* Siblings */}
        {(siblingsByLane.length > 0 || siblingsByCategory.length > 0) && (
          <footer className="border-t border-slate-800 pt-10">
            {siblingsByLane.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Other patterns in {fm.lane}
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {siblingsByLane.map((p) => (
                    <SiblingRow key={p.frontmatter.id} pattern={p} />
                  ))}
                </ul>
              </div>
            )}
            {siblingsByCategory.length > 0 && (
              <div>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Other {fm.category} patterns
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {siblingsByCategory.map((p) => (
                    <SiblingRow key={p.frontmatter.id} pattern={p} />
                  ))}
                </ul>
              </div>
            )}
          </footer>
        )}
      </article>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Panels
// ---------------------------------------------------------------------------

function PatternBodyPanel({ body }: { body: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      <pre className="overflow-x-auto whitespace-pre-wrap break-words p-6 font-mono text-[13px] leading-relaxed text-slate-200">
        {body || 'No pattern body found.'}
      </pre>
    </div>
  )
}

function RawMarkdownPanel({
  body,
  emptyLabel,
}: {
  body: string
  emptyLabel: string
}) {
  if (!body.trim()) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
        {emptyLabel}
      </div>
    )
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      <pre className="overflow-x-auto whitespace-pre-wrap break-words p-6 font-mono text-[13px] leading-relaxed text-slate-200">
        {body}
      </pre>
    </div>
  )
}

function ProvenancePanel({ pattern }: { pattern: Pattern }) {
  const p = pattern.frontmatter.provenance
  return (
    <dl className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm sm:grid-cols-2">
      <Field label="Source">{p.source}</Field>
      <Field label="License">{p.license}</Field>
      {p.attribution && <Field label="Attribution">{p.attribution}</Field>}
      {p.source_url && (
        <Field label="Source URL">
          <a
            href={p.source_url}
            className="text-emerald-400 hover:text-emerald-300"
            rel="noreferrer noopener"
          >
            {p.source_url}
          </a>
        </Field>
      )}
      <Field label="Created">{pattern.frontmatter.created || '—'}</Field>
      <Field label="Updated">{pattern.frontmatter.updated || '—'}</Field>
    </dl>
  )
}

function EvalPanel({ pattern }: { pattern: Pattern }) {
  const ev = pattern.frontmatter.eval
  const rt = pattern.frontmatter.red_team
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Promptfoo eval
        </h3>
        {ev ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Score">
              <span className="font-mono text-emerald-300">{ev.score.toFixed(1)} / 5</span>
            </Field>
            <Field label="Verdict">{ev.verdict}</Field>
            <Field label="Test count">{String(ev.test_count)}</Field>
            <Field label="Last run">{ev.last_run || '—'}</Field>
          </dl>
        ) : (
          <p className="text-sm text-slate-400">
            Not yet evaluated. Pattern is in the corpus but the promptfoo
            harness has not run against it. Eval contributions welcome.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Red team probe
        </h3>
        {rt ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Status">{rt.status}</Field>
            <Field label="Audited">{rt.audited || '—'}</Field>
            {typeof rt.probes_run === 'number' && (
              <Field label="Probes run">{String(rt.probes_run)}</Field>
            )}
            {typeof rt.probes_passed === 'number' && (
              <Field label="Probes passed">{String(rt.probes_passed)}</Field>
            )}
            {rt.notes && (
              <div className="sm:col-span-2">
                <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Notes
                </dt>
                <dd className="text-sm text-slate-300">{rt.notes}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-sm text-slate-400">No red team report on file.</p>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="text-sm text-slate-200">{children}</dd>
    </div>
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

function SiblingRow({ pattern }: { pattern: Pattern }) {
  return (
    <li>
      <Link
        href={`/prompt-library/${pattern.frontmatter.id}`}
        className="flex items-center justify-between gap-3 rounded-lg border border-slate-800/60 bg-slate-900/30 px-3 py-2 transition hover:border-emerald-500/40"
      >
        <span className="truncate text-sm text-slate-200">
          {pattern.frontmatter.title}
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          {pattern.frontmatter.category}
        </span>
      </Link>
    </li>
  )
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

function buildJsonLd(pattern: Pattern) {
  const fm: PatternFrontmatter = pattern.frontmatter
  const url = `https://www.frankx.ai/prompt-library/${fm.id}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Prompt Hub',
            item: 'https://www.frankx.ai/prompts',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Prompt Library',
            item: 'https://www.frankx.ai/prompt-library',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: fm.title,
            item: url,
          },
        ],
      },
      {
        '@type': 'Article',
        name: fm.title,
        headline: fm.title,
        description: fm.description,
        url,
        dateCreated: fm.created || undefined,
        dateModified: fm.updated || undefined,
        keywords: [fm.lane, fm.category, ...fm.tags].join(', '),
        license: fm.provenance.license,
        isBasedOn: fm.provenance.source_url ?? undefined,
        creator: fm.provenance.attribution ?? undefined,
        isPartOf: {
          '@type': 'WebSite',
          name: 'FrankX',
          url: 'https://www.frankx.ai',
        },
      },
    ],
  }
}
