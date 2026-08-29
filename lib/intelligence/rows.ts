/**
 * Pure projection joining the registry, the external snapshot, and the receipts into the
 * rows the arena page and the receipts manifest both render from.
 *
 * Follows the `buildModelRows()` shape in lib/llm-hub/rows.ts: takes its inputs as
 * arguments rather than reading modules directly, so it can be exercised without a
 * populated snapshot on disk — which matters, because the snapshot is currently seeded.
 *
 * The join deliberately keeps `measured` and `external` separate rather than merging them
 * into one "score". They are different kinds of claim: `measured` is a first-party result
 * with a receipt behind it, `external` is a third-party figure carrying someone else's
 * licence. Collapsing them is how a leaderboard starts telling people things it cannot
 * support, which is the failure this whole surface was rebuilt to avoid.
 */

import type { ExternalModel, ExternalPricing, ExternalAdoption } from './loader'
import type { Receipt } from './receipts'

export interface MeasuredAppearance {
  roundId: string
  date: string
  title: string
  href: string
  /** Per-task status for this contestant in that round, e.g. { 'reasoning-x': 'pass' }. */
  taskStatuses: Record<string, string>
}

export interface IntelligenceRow {
  id: string
  name: string
  org: string | null
  inRegistry: boolean
  /** Third-party figures. Each carries its own provenance; never present without it. */
  external: {
    pricing: ExternalPricing | null
    adoption: ExternalAdoption | null
    contextTokens: number | null
  }
  /** First-party evidence: every round this model actually appeared in, with receipts. */
  measured: MeasuredAppearance[]
  /** Convenience for the UI: has this model ever been measured by our harness? */
  hasReceipt: boolean
}

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/**
 * Receipts name contestants by display name ("Claude Sonnet 5") while task results are
 * keyed by short id ("sonnet-5"). Neither is the registry slug, so match on normalised
 * text and accept either form. Exact-after-normalising only — substring matching would
 * let "GPT-5" silently claim "GPT-5.5"'s results, inventing evidence that does not exist.
 */
function contestantMatches(candidate: string, modelId: string, modelName: string): boolean {
  const c = normalise(candidate)
  return c === normalise(modelId) || c === normalise(modelName)
}

function taskStatusesFor(receipt: Receipt, modelId: string, modelName: string): Record<string, string> {
  const statuses: Record<string, string> = {}
  for (const task of receipt.tasks ?? []) {
    for (const [key, result] of Object.entries(task.results ?? {})) {
      if (!contestantMatches(key, modelId, modelName)) continue
      if (typeof result?.status === 'string') statuses[task.id] = result.status
    }
  }
  return statuses
}

export function buildIntelligenceRows(
  models: ExternalModel[],
  receipts: Receipt[],
): IntelligenceRow[] {
  const rows: IntelligenceRow[] = []

  for (const m of models) {
    const measured: MeasuredAppearance[] = []

    for (const receipt of receipts) {
      const named = (receipt.contestants ?? []).some((c) => contestantMatches(c, m.id, m.name))
      const taskStatuses = taskStatusesFor(receipt, m.id, m.name)
      // A model counts as measured if it is listed as a contestant OR appears in results.
      // Listed-but-absent is still an appearance: the round entered it, and the receipt is
      // the record of what happened, including nothing.
      if (!named && Object.keys(taskStatuses).length === 0) continue

      measured.push({
        roundId: receipt.round_id,
        date: receipt.date,
        title: receipt.title,
        href: receipt.href,
        taskStatuses,
      })
    }

    rows.push({
      id: m.id,
      name: m.name,
      org: m.org ?? null,
      inRegistry: m.in_registry,
      external: {
        pricing: m.pricing ?? null,
        adoption: m.adoption ?? null,
        contextTokens: m.context_tokens ?? null,
      },
      measured,
      hasReceipt: measured.length > 0,
    })
  }

  // Measured models first (they are the evidence this site actually owns), then by name.
  rows.sort((a, b) => {
    if (a.hasReceipt !== b.hasReceipt) return a.hasReceipt ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  return rows
}
