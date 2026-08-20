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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WARN_ONLY = process.argv.includes('--warn')

const read = (p) => readFileSync(join(ROOT, p), 'utf8')
const readJson = (p) => JSON.parse(read(p))

const problems = []
const notes = []

// ── 1. No alias may shadow a real route ──────────────────────────────────────
const aliasFile = readJson('data/redirect-aliases.json')
const aliases = aliasFile.aliases ?? {}
const routeIndex = readJson('data/route-index.json')
const realRoutes = new Set((routeIndex.routes ?? []).map((r) => r.href))

/**
 * Pre-existing shadowed routes, grandfathered so this gate can block NEW
 * shadowing today rather than waiting on four unrelated URL decisions.
 *
 * Each of these aliases points away from a real page that still exists in the
 * tree. Whether that is deliberate (a soft retirement that keeps the file) or
 * accidental (the /llm-hub case) is a per-page call for the site owner, since
 * removing an alias changes where a live URL resolves. Decide and shrink this
 * list; do not add to it.
 */
const GRANDFATHERED_SHADOWS = new Set([
  '/ai-coe',                                    // -> /acos            (465-line page)
  '/ai-computer',                               // -> /ai-architecture (445-line page)
  '/soul-frequency-assessment',                 // -> /soul-frequency-quiz (140-line page)
  '/workshops/ikigai-branding/present/speaker', // -> .../present      (283-line page)
])

for (const from of Object.keys(aliases)) {
  if (realRoutes.has(from) && GRANDFATHERED_SHADOWS.has(from)) {
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

  const missing = [...new Set(arenaModels)].filter((name) => {
    const n = normalise(name)
    // A registry name matches if either side contains the other once normalised
    // (the arena writes "DeepSeek-V4-Pro-0813", the registry "DeepSeek V4 Pro 0813").
    return !registryNorm.some((r) => r === n || r.includes(n) || n.includes(r))
  })

  for (const name of missing) {
    problems.push(
      `arena-drift: "${name}" appears in ${ARENA} but has no entry in data/model-registry.json. ` +
        `The public arena and the hub would tell visitors different stories.`
    )
  }
  notes.push(`checked ${new Set(arenaModels).size} arena models against ${registryNames.length} registry entries`)
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
