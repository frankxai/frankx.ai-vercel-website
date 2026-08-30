/**
 * Typed access to the committed external-intelligence snapshot.
 *
 * `data/intelligence/external.json` is produced by scripts/intelligence/fetch-external.mjs
 * on the weekly refresh runner and merged through a snapshot PR. This module only reads
 * it — it never fetches, so it is safe in server components and route handlers alike.
 *
 * The important state to get right is the SEED. Between the ingest landing and the first
 * populated snapshot merging, every source is `pending` and no model carries a figure.
 * That is a normal, expected state, not a failure — so `isSeed()` is exposed and callers
 * are expected to branch on it rather than render an empty chart as though it were data.
 */

// Read from disk rather than the repo's usual `import x from '@/data/....json'`.
//
// SERVER ONLY, and deliberately so. A static JSON import resolves under Next but not
// under `node --experimental-strip-types` (alias unresolved, and bare JSON imports need
// an ESM import attribute), which is how this repo tests TypeScript modules. Reading via
// node:fs behaves identically in both, makes this module's guarantees testable, and
// matches receipts.ts — the two halves of the data layer now load the same way.
//
// Nothing here is needed client-side: the page is a server component and passes
// serialized rows down to its islands.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Runtime status of a source in the most recent refresh. */
export type SourceStatus =
  | 'pending'
  | 'ok'
  | 'failed'
  | 'skipped'
  | 'blocked'
  | 'revoked'
  | 'unverified'

/**
 * Whether the source's licence has been confirmed at its own evidence URL.
 * Only `confirmed` sources may contribute figures; the fetcher enforces this,
 * and this type exists so the UI can say WHY a source is contributing nothing.
 */
export type LicenseState = 'confirmed' | 'unverified' | 'blocked' | 'revoked'

export interface LicenseEvidence {
  role: string
  url: string
  sha256?: string
}

export interface ExternalSource {
  id: string
  url: string
  license: string
  attribution?: string
  retrieved_at: string | null
  status: SourceStatus
  license_state?: LicenseState
  license_notice?: string
  license_evidence?: LicenseEvidence[]
  note?: string
  carried_forward?: number
}

/** Provenance carried by every ingested figure. Absent fields are a hard error upstream. */
export interface FigureProvenance {
  source: string
  source_url: string
  license: string
  retrieved_at: string
  modified?: boolean
}

export interface ExternalPricing extends FigureProvenance {
  in_usd_per_m: number | null
  out_usd_per_m: number | null
}

export interface ExternalAdoption extends FigureProvenance {
  /** Gateway traffic share. Measures USAGE, not quality — label it that way wherever it renders. */
  share: number
}

export interface ExternalBenchmark extends FigureProvenance {
  name: string
  score: number | string
}

export interface LinkOnlySource {
  id: string
  label: string
  url: string
  reason: string
}

export interface ExternalModel {
  id: string
  name: string
  org: string | null
  in_registry: boolean
  names: Record<string, string>
  pricing: ExternalPricing | null
  adoption: ExternalAdoption | null
  context_tokens: number | null
  benchmarks: ExternalBenchmark[]
  external_refs?: LinkOnlySource[]
}

export interface ExternalIntelligence {
  schema: string
  generated_at: string | null
  sources: ExternalSource[]
  link_only: LinkOnlySource[]
  models: ExternalModel[]
  _seed_note?: string
}

const SNAPSHOT_PATH = join(process.cwd(), 'data', 'intelligence', 'external.json')

const SNAPSHOT = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8')) as ExternalIntelligence

export function getExternalIntelligence(): ExternalIntelligence {
  return SNAPSHOT
}

/**
 * True while the committed snapshot still carries no external figures.
 *
 * Two independent signals, because either alone can be wrong: the seed file carries
 * `_seed_note`, and a snapshot where no source ever reached `ok` cannot have produced
 * a figure regardless of what the note says.
 */
export function isSeed(): boolean {
  if (SNAPSHOT._seed_note) return true
  return SNAPSHOT.sources.every((s) => s.status !== 'ok')
}

export function getSources(): ExternalSource[] {
  return SNAPSHOT.sources
}

/** Sources whose terms are not confirmed. They contribute no figures, by design. */
export function getHeldSources(): ExternalSource[] {
  return SNAPSHOT.sources.filter(
    (s) => s.license_state && s.license_state !== 'confirmed',
  )
}

export function getLinkOnly(): LinkOnlySource[] {
  return SNAPSHOT.link_only ?? []
}

export function getExternalModels(): ExternalModel[] {
  return SNAPSHOT.models ?? []
}

export function getExternalModel(id: string): ExternalModel | undefined {
  return SNAPSHOT.models?.find((m) => m.id === id)
}

/** Models carrying at least one ingested figure. Empty while seeded — that is correct. */
export function getModelsWithFigures(): ExternalModel[] {
  return getExternalModels().filter(
    (m) => m.pricing || m.adoption || (m.benchmarks && m.benchmarks.length > 0),
  )
}

/**
 * Age of the snapshot in whole days, or null when it has never been populated.
 *
 * Returns null rather than a large number for the seed so that a staleness check
 * cannot mistake "never fetched" for "fetched long ago" — they need different messages.
 */
export function getSnapshotAgeDays(now: Date = new Date()): number | null {
  if (!SNAPSHOT.generated_at) return null
  const then = Date.parse(SNAPSHOT.generated_at)
  if (!Number.isFinite(then)) return null
  return Math.floor((now.getTime() - then) / 86_400_000)
}
