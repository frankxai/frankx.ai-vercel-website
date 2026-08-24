#!/usr/bin/env node
// External model-intelligence ingest.
//
// Pulls machine-readable model facts from permissively-licensed public sources
// and writes a single provenance-carrying snapshot to data/intelligence/external.json.
// The weekly workflow (.github/workflows/intelligence-refresh.yml) runs this and
// opens a snapshot PR — it never pushes to main, because main deploys.
//
// Two rules this file exists to enforce mechanically:
//
//   1. EVERY ingested figure carries {source, source_url, license, retrieved_at,
//      modified}. A row without a license string is a hard error, not a warning.
//   2. Sources that forbid redistribution are NEVER ingested. They live in
//      LINK_ONLY and surface as external_refs (a link a reader can follow),
//      because attribution does not cure a no-redistribution term.
//
// Modes:
//   node scripts/intelligence/fetch-external.mjs             fetch + write
//   node scripts/intelligence/fetch-external.mjs --dry-run   fetch + print, no write
//   node scripts/intelligence/fetch-external.mjs --offline   no network; re-validate
//                                                            the existing snapshot
//
// Network note: this repo's dev sandbox blocks these hosts at the egress proxy;
// GitHub Actions runners are unrestricted. Every source degrades independently —
// a failed source keeps its previous rows and is marked status:"failed", so one
// outage never blanks the page.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const OUT_PATH = join(ROOT, 'data', 'intelligence', 'external.json')
const REGISTRY_PATH = join(ROOT, 'data', 'model-registry.json')

const SCHEMA = 'frankx/external-intelligence@1'
const TIMEOUT_MS = 20000

const argv = process.argv.slice(2)
const DRY_RUN = argv.includes('--dry-run')
const OFFLINE = argv.includes('--offline')
// --fixtures <dir> reads <dir>/<sourceId>.json instead of the network, so the
// normalise + join logic stays verifiable without egress (see __fixtures__/).
const fixturesIdx = argv.indexOf('--fixtures')
const FIXTURES = fixturesIdx !== -1 ? argv[fixturesIdx + 1] : null

// ── Sources ────────────────────────────────────────────────────────────────
// A wrong license string here is a licensing violation shipped to a public page,
// and it is the one thing assertProvenance() cannot catch — it checks that a
// license is PRESENT, never that it is TRUE.
//
// So each source declares the evidence for its own license:
//   license_evidence_url — the page or file that states the terms
//   license_marker       — the substring that must appear there, or null when
//                          the terms have not been confirmed at source yet
// verify-licenses.mjs fetches each evidence URL and fails the run on a missing
// marker or a null one. It needs egress, so it runs on the Actions runner (the
// dev sandbox blocks these hosts) and gates intelligence-refresh before fetch.
// null is not a placeholder to fill in casually: it means nobody has read the
// terms, and it blocks ingest until someone has.
const SOURCES = [
  {
    id: 'models-dev',
    url: 'https://models.dev/api.json',
    license: 'MIT',
    license_evidence_url: 'https://raw.githubusercontent.com/sst/models.dev/master/LICENSE',
    license_marker: 'MIT License',
    attribution: 'models.dev (SST)',
    role: 'pricing + capability spine',
  },
  {
    id: 'openrouter-models',
    url: 'https://openrouter.ai/api/v1/models',
    license: 'OpenRouter ToS — pricing facts, cited with attribution',
    // UNCONFIRMED. This string characterises the ToS from a search extract; no
    // one has read the terms and confirmed that republishing OpenRouter's
    // per-token prices is permitted. Until someone does, this source is blocked.
    license_evidence_url: 'https://openrouter.ai/terms',
    license_marker: null,
    attribution: 'OpenRouter',
    role: 'live pricing + context windows',
  },
  {
    id: 'openrouter-rankings',
    url: 'https://openrouter.ai/api/v1/datasets/rankings-daily',
    license: 'CC BY 4.0',
    // UNCONFIRMED, same reason as above: 'CC BY 4.0' came from a search extract,
    // not from a fetched page declaring it for this dataset.
    license_evidence_url: 'https://openrouter.ai/docs/features/rankings',
    license_marker: null,
    attribution: 'OpenRouter rankings',
    role: 'adoption share (usage, not quality)',
    needsKey: true,
  },
]

// Redistribution-forbidden or NonCommercial. Linked, never ingested.
const LINK_ONLY = [
  {
    id: 'artificial-analysis',
    label: 'Artificial Analysis — Intelligence Index, speed, price',
    url: 'https://artificialanalysis.ai/',
    reason: 'Free-tier terms are internal-use only; redistribution requires a commercial licence.',
  },
  {
    id: 'swe-bench',
    label: 'SWE-bench leaderboard',
    url: 'https://www.swebench.com/',
    reason: 'Leaderboard repo is CC BY-NC 4.0 — NonCommercial conflicts with this site.',
  },
  {
    id: 'lmarena',
    label: 'LMArena human-preference leaderboard',
    url: 'https://lmarena.ai/leaderboard',
    reason: 'CC-BY-4.0 dataset; ingest deferred until the Parquet path is verified end to end.',
  },
]

const nowIso = () => new Date().toISOString()

async function fetchJson(url, { headers = {}, fixtureId = null } = {}) {
  if (FIXTURES) return JSON.parse(await readFile(join(ROOT, FIXTURES, `${fixtureId}.json`), 'utf8'))
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '')

// ── Per-source normalisers ────────────────────────────────────────────────
// Each returns Map<normalisedKey, partialModelRow>. Keys are joined on the
// FrankX registry below, so a model absent from the registry is still carried
// (marked in_registry:false) rather than silently dropped.

function fromModelsDev(payload, src) {
  const out = new Map()
  // models.dev shape: { <providerId>: { models: { <modelId>: {...} } } }
  for (const [providerId, provider] of Object.entries(payload || {})) {
    for (const [modelId, m] of Object.entries(provider?.models || {})) {
      const cost = m?.cost || {}
      if (cost.input == null && cost.output == null) continue
      const key = norm(`${providerId}${modelId}`)
      out.set(key, {
        provider: providerId,
        name: m?.name || modelId,
        pricing: {
          in_usd_per_m: cost.input ?? null,
          out_usd_per_m: cost.output ?? null,
          source: src.id,
          source_url: src.url,
          license: src.license,
          retrieved_at: nowIso(),
          modified: true,
        },
        context_tokens: m?.limit?.context ?? null,
      })
    }
  }
  return out
}

function fromOpenRouterModels(payload, src) {
  const out = new Map()
  for (const m of payload?.data || []) {
    const p = m?.pricing || {}
    const perM = (v) => (v == null || v === '' ? null : +(parseFloat(v) * 1e6).toFixed(4))
    const inUsd = perM(p.prompt)
    const outUsd = perM(p.completion)
    if (inUsd == null && outUsd == null) continue
    out.set(norm(m.id), {
      slug: m.id,
      name: m?.name || m.id,
      pricing: {
        in_usd_per_m: inUsd,
        out_usd_per_m: outUsd,
        source: src.id,
        source_url: src.url,
        license: src.license,
        retrieved_at: nowIso(),
        modified: true,
      },
      context_tokens: m?.context_length ?? null,
    })
  }
  return out
}

function fromOpenRouterRankings(payload, src) {
  const out = new Map()
  const rows = payload?.data || payload?.rankings || []
  const total = rows.reduce((s, r) => s + (Number(r?.total_tokens ?? r?.tokens ?? 0) || 0), 0)
  for (const r of rows) {
    const slug = r?.model_permaslug || r?.model || r?.slug
    if (!slug) continue
    const tokens = Number(r?.total_tokens ?? r?.tokens ?? 0) || 0
    out.set(norm(slug), {
      slug,
      adoption: {
        // Share of OpenRouter traffic — usage, not a quality signal. The page
        // must say so wherever this renders.
        share: total ? +(tokens / total).toFixed(5) : null,
        source: src.id,
        source_url: src.url,
        license: src.license,
        retrieved_at: nowIso(),
        modified: true,
      },
    })
  }
  return out
}

const NORMALISERS = {
  'models-dev': fromModelsDev,
  'openrouter-models': fromOpenRouterModels,
  'openrouter-rankings': fromOpenRouterRankings,
}

// ── Validation: the rules, enforced ───────────────────────────────────────
function assertProvenance(envelope) {
  const problems = []
  const linkOnlyIds = new Set(LINK_ONLY.map((l) => l.id))
  for (const model of envelope.models) {
    for (const field of ['pricing', 'adoption']) {
      const block = model[field]
      if (!block) continue
      for (const k of ['source', 'source_url', 'license', 'retrieved_at']) {
        if (!block[k]) problems.push(`${model.id}.${field} missing ${k}`)
      }
      if (linkOnlyIds.has(block.source)) {
        problems.push(`${model.id}.${field} ingests link-only source "${block.source}"`)
      }
    }
    for (const b of model.benchmarks || []) {
      for (const k of ['name', 'score', 'source', 'source_url', 'license', 'retrieved_at']) {
        if (b[k] === undefined || b[k] === null || b[k] === '') problems.push(`${model.id} benchmark missing ${k}`)
      }
      if (linkOnlyIds.has(b.source)) problems.push(`${model.id} benchmark ingests link-only source "${b.source}"`)
    }
  }
  for (const s of envelope.sources) {
    if (!s.license) problems.push(`source ${s.id} missing license`)
  }
  return problems
}

// ── Main ──────────────────────────────────────────────────────────────────
let previous = null
try { previous = JSON.parse(await readFile(OUT_PATH, 'utf8')) } catch { /* first run */ }

let registry = { models: {} }
try { registry = JSON.parse(await readFile(REGISTRY_PATH, 'utf8')) } catch { /* optional join */ }

const sourceStatus = []
const collected = new Map() // sourceId -> Map<key, partial>

if (OFFLINE) {
  if (!previous) {
    console.error('--offline: no existing snapshot at data/intelligence/external.json to validate')
    process.exit(1)
  }
  const problems = assertProvenance(previous)
  console.log(JSON.stringify({
    mode: 'offline-validate',
    schema: previous.schema,
    generated_at: previous.generated_at,
    models: previous.models.length,
    sources: previous.sources.map((s) => `${s.id}:${s.status}`),
    problems,
  }, null, 2))
  process.exit(problems.length ? 1 : 0)
}

for (const src of SOURCES) {
  // A source whose terms nobody has read cannot be ingested, even if it fetches
  // fine. This is the local half of the licence gate: verify-licenses.mjs proves
  // a declared marker is TRUE at source (needs egress, runs on the runner), and
  // this proves a source without a marker never reaches a published figure at
  // all. Fixtures are exempt — they are hand-built shapes, not redistributed data.
  if (src.license_marker == null && !FIXTURES) {
    sourceStatus.push({
      id: src.id,
      url: src.url,
      license: src.license,
      attribution: src.attribution,
      retrieved_at: previous?.sources?.find((s) => s.id === src.id)?.retrieved_at ?? null,
      status: 'blocked',
      note: `licence unconfirmed — no license_marker; confirm terms at ${src.license_evidence_url ?? 'the source'} before ingesting`,
    })
    continue
  }
  const headers = {}
  if (src.needsKey && !FIXTURES) {
    const key = process.env.OPENROUTER_API_KEY
    if (!key) {
      sourceStatus.push({ id: src.id, url: src.url, license: src.license, attribution: src.attribution, retrieved_at: null, status: 'skipped', note: 'OPENROUTER_API_KEY not set' })
      continue
    }
    headers.Authorization = `Bearer ${key}`
  }
  try {
    const payload = await fetchJson(src.url, { headers, fixtureId: src.id })
    collected.set(src.id, NORMALISERS[src.id](payload, src))
    sourceStatus.push({ id: src.id, url: src.url, license: src.license, attribution: src.attribution, retrieved_at: nowIso(), status: 'ok' })
  } catch (e) {
    // Degrade, never blank: the previous rows for this source stay in place.
    sourceStatus.push({ id: src.id, url: src.url, license: src.license, attribution: src.attribution, retrieved_at: previous?.sources?.find((s) => s.id === src.id)?.retrieved_at ?? null, status: 'failed', note: String(e.message || e) })
  }
}

// Join: registry models first (they are what the site renders), then any
// external model with pricing that the registry has not caught up to yet.
const models = new Map()

for (const [regId, m] of Object.entries(registry.models || {})) {
  models.set(regId, {
    id: regId,
    name: m?.name || regId,
    org: m?.organization || null,
    in_registry: true,
    names: {},
    pricing: null,
    adoption: null,
    context_tokens: m?.context_window ?? null,
    benchmarks: [],
    external_refs: [],
  })
}

const registryKeys = new Map()
for (const [regId, m] of Object.entries(registry.models || {})) {
  registryKeys.set(norm(m?.id || regId), regId)
  registryKeys.set(norm(regId), regId)
  registryKeys.set(norm(m?.name || ''), regId)
}

for (const [srcId, rows] of collected) {
  for (const [key, row] of rows) {
    let regId = registryKeys.get(key)
    if (!regId && row.slug) regId = registryKeys.get(norm(row.slug.split('/').pop()))
    if (!regId && row.name) regId = registryKeys.get(norm(row.name))

    const id = regId || `external:${row.slug || key}`
    if (!models.has(id)) {
      models.set(id, {
        id, name: row.name || id, org: row.provider || null, in_registry: false,
        names: {}, pricing: null, adoption: null, context_tokens: null, benchmarks: [], external_refs: [],
      })
    }
    const target = models.get(id)
    target.names[srcId] = row.slug || row.name || key
    // First source with pricing wins; models.dev is ordered first as the spine.
    if (row.pricing && !target.pricing) target.pricing = row.pricing
    if (row.adoption) target.adoption = row.adoption
    if (row.context_tokens && !target.context_tokens) target.context_tokens = row.context_tokens
  }
}

// Carry forward rows from sources that failed this run, so an outage degrades
// freshness rather than deleting data.
const failed = new Set(sourceStatus.filter((s) => s.status !== 'ok').map((s) => s.id))
if (previous && failed.size) {
  for (const prev of previous.models || []) {
    const cur = models.get(prev.id)
    if (!cur) { models.set(prev.id, prev); continue }
    if (!cur.pricing && prev.pricing && failed.has(prev.pricing.source)) cur.pricing = prev.pricing
    if (!cur.adoption && prev.adoption && failed.has(prev.adoption.source)) cur.adoption = prev.adoption
    if (!cur.benchmarks?.length && prev.benchmarks?.length) cur.benchmarks = prev.benchmarks
  }
}

// Link-only references attach to every model — they are where a reader goes for
// the numbers this snapshot deliberately does not carry.
for (const m of models.values()) {
  m.external_refs = LINK_ONLY.map((l) => ({ id: l.id, label: l.label, url: l.url, reason: l.reason }))
}

const envelope = {
  schema: SCHEMA,
  _description:
    'External model intelligence, merged from permissively-licensed public sources. Every figure carries its source, licence and retrieval time. Sources that forbid redistribution are linked (external_refs), never ingested. Regenerate with: pnpm intelligence:fetch',
  generated_at: nowIso(),
  sources: sourceStatus,
  link_only: LINK_ONLY,
  models: [...models.values()].sort((a, b) => a.id.localeCompare(b.id)),
}

const problems = assertProvenance(envelope)
if (problems.length) {
  console.error('Provenance validation FAILED — refusing to write:')
  for (const p of problems.slice(0, 20)) console.error(`  - ${p}`)
  process.exit(1)
}

const withPricing = envelope.models.filter((m) => m.pricing).length
const withAdoption = envelope.models.filter((m) => m.adoption).length
const summary = {
  mode: DRY_RUN ? 'dry-run' : 'write',
  schema: SCHEMA,
  sources: sourceStatus.map((s) => `${s.id}:${s.status}`),
  models: envelope.models.length,
  with_pricing: withPricing,
  with_adoption: withAdoption,
  link_only: LINK_ONLY.map((l) => l.id),
  out: DRY_RUN ? null : 'data/intelligence/external.json',
}

if (!DRY_RUN) {
  await mkdir(dirname(OUT_PATH), { recursive: true })
  await writeFile(OUT_PATH, JSON.stringify(envelope, null, 2) + '\n')
}
console.log(JSON.stringify(summary, null, 2))

// A run where every source failed is a failure, not a silent no-op.
if (sourceStatus.every((s) => s.status !== 'ok')) {
  console.error('All sources failed or were skipped — snapshot not refreshed.')
  process.exit(1)
}
