/**
 * Worked-example loader for /ai-architect.
 *
 * The three artifact sets under `content/ai-architect/examples/<slug>/` are
 * copies of what the AI Architect plugin wrote on three fixture repositories.
 * They are read here, not retyped: nothing on the page states a number or a
 * finding that is not in one of these files.
 *
 * The same files are served raw from `public/artifacts/ai-architect/<slug>/`
 * so every row can be downloaded, and `scripts/check-ai-architecture-contract.mjs`
 * asserts that the download copy exists.
 *
 * Markdown is compiled server-side with `marked`, the pipeline `content/rails`
 * already uses for plain `.md` (lib/rails/load-entries.ts). Only the two files
 * that carry the argument — the system description and the verifier's review —
 * are compiled into the page; a full set is roughly 140 KB of markdown per
 * example, and prerendering all three would put over half a megabyte of prose
 * in the document to serve a rail most readers use to reach one file. The rest
 * of the contract is listed with its size and a download link.
 */

import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

/** The artifact contract, in the order the team writes it. */
const CONTRACT_ORDER = [
  '00-frame.md',
  '01-discovery.md',
  '02-user-flows.md',
  '03-experience-blueprint.md',
  'SYSTEM.md',
  'architecture.json',
  '04-roi.md',
  'prices.json',
  '05-trust-boundary.md',
  '06-evals/cases.jsonl',
  '06-evals/rubric.md',
  'WORKFLOW.md',
  'SOP.md',
  '07-runbook.md',
  'review.md',
]

/** Compiled into the page. Everything else is a download. */
const INLINE_FILES = ['SYSTEM.md', 'review.md']

export const EXAMPLE_SLUGS = ['support-triage', 'personal-ai-coe', 'contract-rag'] as const

export type ExampleSlug = (typeof EXAMPLE_SLUGS)[number]

export type ExampleFile = {
  /** Path relative to the example's docs/architecture/ root. */
  name: string
  bytes: number
  /** Raw download, outside the /ai-architect/:path redirect. */
  href: string
  /** Present only for the files compiled into the page. */
  html?: string
}

export type WorkedExample = {
  slug: ExampleSlug
  /** The title of the example's SYSTEM.md, minus the document type. */
  title: string
  /** The goal line the run was started from. */
  goal: string
  files: ExampleFile[]
}

const ROOT = path.join(process.cwd(), 'content', 'ai-architect', 'examples')

function walk(dir: string, prefix = ''): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name), `${prefix}${entry.name}/`)
        : [`${prefix}${entry.name}`],
    )
}

function rank(name: string): number {
  const index = CONTRACT_ORDER.indexOf(name)
  if (index !== -1) return index
  // ADRs and receipts are globs in the contract, so they sort next to the file
  // that names them rather than at the end.
  if (name.startsWith('adr/')) return CONTRACT_ORDER.indexOf('SYSTEM.md') + 0.5
  if (name.startsWith('receipts/')) return CONTRACT_ORDER.indexOf('review.md') - 0.5
  return CONTRACT_ORDER.length
}

/** `# System architecture — support triage` → `support triage`. */
function titleOf(systemMarkdown: string, slug: string): string {
  const heading = systemMarkdown.split('\n', 1)[0].replace(/^#\s*/, '')
  const [, subject] = heading.split(/\s+—\s+/)
  return subject ?? slug
}

function goalOf(systemMarkdown: string): string {
  const line = systemMarkdown
    .split('\n')
    .find((entry) => entry.startsWith('Generated for goal:'))
  return line ? line.replace('Generated for goal:', '').trim() : ''
}

let cache: WorkedExample[] | null = null

export function loadWorkedExamples(): WorkedExample[] {
  if (cache) return cache

  cache = EXAMPLE_SLUGS.map((slug) => {
    const dir = path.join(ROOT, slug)
    const system = fs.readFileSync(path.join(dir, 'SYSTEM.md'), 'utf8')

    const files = walk(dir)
      .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
      .map((name) => {
        const raw = fs.readFileSync(path.join(dir, name), 'utf8')
        return {
          name,
          bytes: Buffer.byteLength(raw, 'utf8'),
          href: `/artifacts/ai-architect/${slug}/${name}`,
          html: INLINE_FILES.includes(name)
            ? (marked.parse(raw, { async: false }) as string)
            : undefined,
        }
      })

    return { slug, title: titleOf(system, slug), goal: goalOf(system), files }
  })

  return cache
}
