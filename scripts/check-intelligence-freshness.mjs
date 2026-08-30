#!/usr/bin/env node
/**
 * Intelligence-surface consistency gate.
 *
 * Two checks that each close a bug class this repo has actually hit:
 *
 * 1. ALIAS SHADOWING — data/redirect-aliases.json states its own rule:
 *    "Never add an alias for a path that has a real page - it will make that
 *    page unreachable." Nothing enforced it. On 2026-07-30 an alias for
 *    /llm-hub landed in an unrelated content PR and silently redirected a
 *    real, registry-driven page away; it was still being maintained sixteen
 *    days later by a session that could not see it was unreachable.
 *
 * 2. ARENA/REGISTRY DRIFT — /research/model-arena and the LLM registry are
 *    maintained independently, so they can disagree in public. They did:
 *    the arena carried four current models the registry had never heard of.
 *
 * Both are static checks over committed data. No network, no build required.
 *
 * Usage:
 *   node scripts/check-intelligence-freshness.mjs          # exit 1 on failure
 *   node scripts/check-intelligence-freshness.mjs --warn   # report, exit 0
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { enumerateRoutes } from '../lib/route-enumeration.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WARN_ONLY = process.argv.includes('--warn')

const read = (p) => readFileSync(join(ROOT, p), 'utf8')
const readJson = (p) => JSON.parse(read(p))

const problems = []
const notes = []

// ── 1. No alias may shadow a real route ──────────────────────────────────────
const aliasFile = readJson('data/redirect-aliases.json')
const aliases = aliasFile.aliases ?? {}
// Enumerate from source rather than reading data/route-index.json. The committed
// index can lag the working tree, so a local `pnpm merge:gate` would otherwise miss
// an alias shadowing a page added in the same change - which is exactly the bug
// class this gate exists to stop.
const realRoutes = new Set(enumerateRoutes().map((r) => r.href))

/**
 * Pre-existing shadowed routes, grandfathered so this gate can block NEW
 * shadowing today rather than waiting on unrelated URL decisions.
 *
 * Each of these aliases points away from a real page that still exists in the
 * tree. Whether that is deliberate (a soft retirement that keeps the file) or
 * accidental (the /llm-hub case) is a per-page call for the site owner, since
 * removing an alias changes where a live URL resolves. Decide and shrink this
 * list; do not add to it.
 */
const GRANDFATHERED_SHADOWS = new Map([
  // Legitimate soft retirement: the 140-line assessment was superseded by the
  // 530-line quiz it points at. The permanent redirect (HTTP 308) is the
  // correct consolidation, so this
  // one stays. The unreachable source file is dead code, flagged not deleted.
  ['/soul-frequency-assessment', '/soul-frequency-quiz'],                      // 140-line page
])

for (const from of Object.keys(aliases)) {
  // Pairs, not just sources: re-pointing a grandfathered alias at a new target is a
  // fresh decision and must not inherit the exemption.
  if (realRoutes.has(from) && GRANDFATHERED_SHADOWS.get(from) === aliases[from]) {
    notes.push(`known shadowed route (needs a decision, not blocking): ${from} -> ${aliases[from]}`)
    continue
  }
  if (realRoutes.has(from)) {
    problems.push(
      `alias-shadow: "${from}" -> "${aliases[from]}" but ${from} is a real route. ` +
        `This makes the real page unreachable (see $schema.safetyRule in data/redirect-aliases.json).`
    )
  }
}
notes.push(`checked ${Object.keys(aliases).length} aliases against ${realRoutes.size} routes`)

// ── 2. Every model shown in the Model Arena must exist in the registry ───────
const ARENA = 'app/research/model-arena/data.ts'
if (existsSync(join(ROOT, ARENA))) {
  const arenaSrc = read(ARENA)
  // Arena entries declare `model: 'Name'`; the registry is keyed by slug with a display `name`.
  const arenaModels = [...arenaSrc.matchAll(/\bmodel:\s*'([^']+)'/g)].map((m) => m[1])
  const registry = readJson('data/model-registry.json')
  const registryNames = Object.values(registry.models ?? {}).map((m) => m.name)

  const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const registryNorm = registryNames.map(normalise)

  // Exact equality AFTER normalising. Normalisation already absorbs the punctuation
  // difference between the two files ("DeepSeek-V4-Pro-0813" vs "DeepSeek V4 Pro 0813"),
  // so substring matching adds no reach - it only creates false greens: arena "GPT-5"
  // would silently match registry "GPT-5.5", passing the gate for a model nobody registered.
  const missing = [...new Set(arenaModels)].filter((name) => !registryNorm.includes(normalise(name)))

  for (const name of missing) {
    problems.push(
      `arena-drift: "${name}" appears in ${ARENA} but has no entry in data/model-registry.json. ` +
        `The public arena and the hub would tell visitors different stories.`
    )
  }
  notes.push(`checked ${new Set(arenaModels).size} arena models against ${registryNames.length} registry entries`)
}

// ── 3. Every contestant named in a receipt must exist in the registry ────────
// Same drift class as check 2, but on the evidence side: a receipt naming a model the
// hub has never heard of means the measurement cannot be traced back to a real entry.
const RECEIPTS_DIR = 'public/research/arena-receipts'
const normalise = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '')
const registryFile = readJson('data/model-registry.json')
const registryNorm = Object.entries(registryFile.models ?? {}).flatMap(([slug, m]) =>
  [normalise(slug), normalise(m.name)].filter(Boolean),
)

const receiptRoundIds = new Set()
if (existsSync(join(ROOT, RECEIPTS_DIR))) {
  const { readdirSync } = await import('node:fs')
  const files = readdirSync(join(ROOT, RECEIPTS_DIR)).filter((f) => f.endsWith('.json'))
  let contestantCount = 0

  for (const file of files) {
    let receipt
    try {
      receipt = readJson(`${RECEIPTS_DIR}/${file}`)
    } catch (e) {
      problems.push(`receipt-invalid: ${file} is not parseable JSON (${e.message}).`)
      continue
    }
    // A receipt without a round_id cannot be referenced by a routing verdict, which
    // makes check 4 below unable to protect anything for this file.
    if (!receipt.round_id) {
      problems.push(`receipt-invalid: ${file} has no round_id.`)
    } else {
      receiptRoundIds.add(receipt.round_id)
    }
    for (const contestant of receipt.contestants ?? []) {
      contestantCount++
      if (!registryNorm.includes(normalise(contestant))) {
        problems.push(
          `receipt-drift: "${contestant}" is a contestant in ${file} but has no entry in ` +
            `data/model-registry.json. A measurement that cannot be traced to a registered ` +
            `model cannot be published as one.`,
        )
      }
    }
  }
  notes.push(`checked ${contestantCount} receipt contestant(s) across ${files.length} receipt(s)`)
}

// ── 4. No routing verdict may cite a round that has no receipt ───────────────
// The no-number-without-a-receipt law, mechanised. routing-verdicts.json does not exist
// yet (it arrives with the first-party harness); guard rather than assume, so this gate
// starts protecting the moment the file lands instead of needing to be remembered then.
const VERDICTS = 'data/model-arena/routing-verdicts.json'
if (existsSync(join(ROOT, VERDICTS))) {
  const verdicts = readJson(VERDICTS)
  let citedCount = 0
  for (const verdict of verdicts.verdicts ?? []) {
    for (const roundId of verdict.evidence?.round_ids ?? []) {
      citedCount++
      if (!receiptRoundIds.has(roundId)) {
        problems.push(
          `verdict-without-receipt: verdict "${verdict.task_class ?? '(unnamed)'}" cites round ` +
            `"${roundId}", but no receipt in ${RECEIPTS_DIR} carries that round_id. ` +
            `A routing recommendation must be traceable to evidence that exists.`,
        )
      }
    }
  }
  notes.push(`checked ${citedCount} verdict round citation(s) against ${receiptRoundIds.size} receipt(s)`)
}

// ── 5. The external snapshot must not go quietly stale ──────────────────────
// A snapshot that stops refreshing looks identical to one that refreshed and found no
// change. The weekly workflow is the only thing that advances generated_at, so a stale
// timestamp means the refresh has been failing unnoticed — the void-loop failure mode.
const SNAPSHOT = 'data/intelligence/external.json'
const MAX_SNAPSHOT_AGE_DAYS = 14
if (existsSync(join(ROOT, SNAPSHOT))) {
  const snapshot = readJson(SNAPSHOT)
  const seeded = Boolean(snapshot._seed_note) || (snapshot.sources ?? []).every((s) => s.status !== 'ok')

  if (seeded) {
    // Never-populated is a different condition from gone-stale and needs a different
    // message; failing here would block every build until the first snapshot merges.
    notes.push(
      'external snapshot is still the seed (no source has reached ok) — staleness not applicable yet',
    )
  } else if (!snapshot.generated_at) {
    problems.push(`snapshot-invalid: ${SNAPSHOT} has ingested figures but no generated_at timestamp.`)
  } else {
    const ageDays = Math.floor((Date.now() - Date.parse(snapshot.generated_at)) / 86_400_000)
    if (!Number.isFinite(ageDays)) {
      problems.push(`snapshot-invalid: ${SNAPSHOT} generated_at is not a parseable date.`)
    } else if (ageDays > MAX_SNAPSHOT_AGE_DAYS) {
      problems.push(
        `snapshot-stale: ${SNAPSHOT} was generated ${ageDays} days ago (limit ${MAX_SNAPSHOT_AGE_DAYS}). ` +
          `The weekly intelligence-refresh workflow has probably been failing — check its runs.`,
      )
    } else {
      notes.push(`external snapshot is ${ageDays} day(s) old (limit ${MAX_SNAPSHOT_AGE_DAYS})`)
    }
  }
}

// ── report ───────────────────────────────────────────────────────────────────
for (const n of notes) console.log(`[intelligence-freshness] ${n}`)

if (problems.length === 0) {
  console.log('[intelligence-freshness] intelligence surfaces are consistent ✓')
  process.exit(0)
}

console.error(`\n[intelligence-freshness] ${problems.length} problem(s):\n`)
for (const p of problems) console.error(`  - ${p}`)
console.error('')
process.exit(WARN_ONLY ? 0 : 1)
