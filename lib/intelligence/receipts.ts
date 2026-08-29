/**
 * Reads and validates the arena eval receipts.
 *
 * A receipt is the only thing that licenses a first-party measurement claim on this site.
 * The rule from docs/architecture/sis-eval-receipts-contract.md is that a published number
 * must be traceable to a receipt; anything else is a vendor report and must be labelled as
 * one. This module is the read side of that rule — `lastMeasured()` replaces the hardcoded
 * LAST_MEASURED constant the Phase-0 hotfix introduced, so the date can no longer drift
 * away from the evidence it claims to describe.
 *
 * SERVER ONLY, and build-time only. Reads from disk via node:fs, which Next's file
 * tracing does not follow — so every consumer must be statically generated. The manifest
 * route pins itself with `force-static` for exactly this reason. Receipts live under public/ so
 * they are also fetchable directly at /research/arena-receipts/<file>.json; this module
 * exists to enumerate and validate them, not to re-serve their bytes.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const RECEIPTS_DIR = join(process.cwd(), 'public', 'research', 'arena-receipts')

/** Per-contestant outcome on one task. Keyed by the contestant's short id. */
export interface ReceiptTaskResult {
  answer?: unknown
  status?: string
  [k: string]: unknown
}

export interface ReceiptTask {
  id: string
  prompt: string
  ground_truth?: unknown
  ground_truth_check?: string
  results: Record<string, ReceiptTaskResult>
  verdict?: string
}

export interface Receipt {
  round_id: string
  date: string
  title: string
  contestants: string[]
  methodology: string
  tasks: ReceiptTask[]
  /** Vendor-reported figures cited for context. Explicitly NOT measured by the harness. */
  published_benchmarks_cross_reference?: Record<string, unknown>
  /** Relative URL the file is served from. Derived, not stored in the file. */
  href: string
}

/**
 * Fail-closed schema boundary for one parsed receipt file.
 *
 * JSON.parse legally returns null, arrays, and primitives — and reading a field
 * off null THROWS, which at module load would crash every consumer instead of
 * recording the file in problems. So the root shape is rejected before any
 * field access, and required fields are checked for their TYPES, not just
 * presence: a receipt with an empty round_id cannot be cited by a verdict, and
 * one with an unparseable date would corrupt lastMeasured() ordering silently.
 *
 * Returns the reason the candidate is invalid, or null when it is a Receipt.
 */
function validateReceipt(parsed: unknown): string | null {
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return `root must be a JSON object, got ${parsed === null ? 'null' : Array.isArray(parsed) ? 'array' : typeof parsed}`
  }
  const c = parsed as Record<string, unknown>

  const missing = ['round_id', 'date', 'title', 'contestants', 'methodology', 'tasks'].filter(
    (k) => c[k] === undefined,
  )
  if (missing.length) return `missing required field(s): ${missing.join(', ')}`

  if (typeof c.round_id !== 'string' || c.round_id.trim() === '') {
    return 'round_id must be a non-empty string'
  }
  if (typeof c.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(c.date) || Number.isNaN(Date.parse(c.date))) {
    return `date must be a real YYYY-MM-DD date, got ${JSON.stringify(c.date)}`
  }
  if (typeof c.title !== 'string' || typeof c.methodology !== 'string') {
    return 'title and methodology must be strings'
  }
  if (!Array.isArray(c.contestants) || !c.contestants.every((x) => typeof x === 'string' && x.trim() !== '')) {
    return 'contestants must be an array of non-empty strings'
  }
  if (!Array.isArray(c.tasks)) return 'tasks must be an array'
  return null
}

/**
 * Reasons a candidate file was rejected. Surfaced rather than swallowed: a receipt that
 * fails to parse is indistinguishable from a missing one at the UI layer, and silently
 * dropping it would understate the evidence base without saying so.
 */
export interface ReceiptProblem {
  file: string
  problem: string
}

interface LoadResult {
  receipts: Receipt[]
  problems: ReceiptProblem[]
}

function load(): LoadResult {
  if (!existsSync(RECEIPTS_DIR)) return { receipts: [], problems: [] }

  const receipts: Receipt[] = []
  const problems: ReceiptProblem[] = []
  // round_id is the citation key routing verdicts use, so two receipts sharing
  // one would make a citation ambiguous. First file (sorted order) wins; the
  // later one is a problem, not a silent overwrite.
  const seenRounds = new Map<string, string>()

  for (const file of readdirSync(RECEIPTS_DIR).filter((f) => f.endsWith('.json')).sort()) {
    let parsed: unknown
    try {
      parsed = JSON.parse(readFileSync(join(RECEIPTS_DIR, file), 'utf8'))
    } catch (e) {
      problems.push({ file, problem: `unparseable JSON: ${(e as Error).message}` })
      continue
    }

    const invalid = validateReceipt(parsed)
    if (invalid !== null) {
      problems.push({ file, problem: invalid })
      continue
    }
    const candidate = parsed as unknown as Receipt

    const holder = seenRounds.get(candidate.round_id)
    if (holder) {
      problems.push({
        file,
        problem: `duplicate round_id "${candidate.round_id}" — already claimed by ${holder}; a verdict citing it would be ambiguous`,
      })
      continue
    }
    seenRounds.set(candidate.round_id, file)

    receipts.push({
      ...candidate,
      href: `/research/arena-receipts/${file}`,
    })
  }

  // Newest first — the page leads with the most recent measurement.
  receipts.sort((a, b) => b.date.localeCompare(a.date))
  return { receipts, problems }
}

const LOADED = load()

export function getReceipts(): Receipt[] {
  return LOADED.receipts
}

export function getReceiptProblems(): ReceiptProblem[] {
  return LOADED.problems
}

export function getReceipt(roundId: string): Receipt | undefined {
  return LOADED.receipts.find((r) => r.round_id === roundId)
}

/**
 * Date of the most recent harness measurement, or null when nothing has been measured.
 *
 * Null is meaningful and must not be rendered as a date: it means this site currently
 * has no first-party measurement to stand on, and the page should say exactly that.
 */
export function lastMeasured(): string | null {
  return LOADED.receipts[0]?.date ?? null
}

/** Every distinct contestant name across all receipts, for cross-checking the registry. */
export function getMeasuredContestants(): string[] {
  return [...new Set(LOADED.receipts.flatMap((r) => r.contestants))].sort()
}
