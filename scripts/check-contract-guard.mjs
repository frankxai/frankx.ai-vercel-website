#!/usr/bin/env node
/**
 * Contract-guard check.
 *
 * A contract test only protects a surface if a change to that surface cannot
 * also rewrite the test. On 2026-08-02, #409 removed 56 lines from
 * app/page.tsx and rewrote scripts/tests/homepage-mind-palace-contract.test.mjs
 * in the same commit. CI stayed green through a homepage regression, and #415
 * had to restore both — reverting the test to a byte-identical copy of its
 * pre-#409 state.
 *
 * This fails a pull request that edits both a contract test and a source file
 * that same test asserts against.
 *
 * The guard→guarded mapping is not hardcoded. It is derived by reading each
 * test for the repo-relative paths it references, so it stays accurate as
 * tests are added or their assertions move.
 *
 * Deliberately changing a contract alongside its surface is legitimate — the
 * point is that it must be deliberate and visible to a reviewer, not silent.
 * Put [contract-change] in the pull request title, or set
 * ALLOW_CONTRACT_CHANGE=1, and this check reports the pairs and passes.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const TEST_DIR = 'scripts/tests'
const GUARDED_PREFIXES = ['app/', 'components/', 'lib/', 'data/', 'content/']
const SOURCE_RE = /['"`]((?:app|components|lib|data|content)\/[A-Za-z0-9_@./[\]-]+\.(?:tsx|ts|mjs|js|json))['"`]/g

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

function changedFiles() {
  const base = process.env.GITHUB_BASE_REF || 'main'
  let range
  try {
    range = git('merge-base', `origin/${base}`, 'HEAD')
  } catch {
    // Shallow clone or missing remote ref — fall back to the last commit.
    return git('diff', '--name-only', 'HEAD~1', 'HEAD').split('\n').filter(Boolean)
  }
  return git('diff', '--name-only', range, 'HEAD').split('\n').filter(Boolean)
}

/** Which source files does this contract test assert against? */
function guardedBy(testPath) {
  const src = readFileSync(testPath, 'utf8')
  const out = new Set()
  for (const m of src.matchAll(SOURCE_RE)) {
    if (GUARDED_PREFIXES.some((p) => m[1].startsWith(p))) out.add(m[1])
  }
  return out
}

const contractTests = readdirSync(TEST_DIR)
  .filter((f) => f.endsWith('contract.test.mjs'))
  .map((f) => path.posix.join(TEST_DIR, f))

const changed = new Set(changedFiles())
const violations = []

for (const test of contractTests) {
  if (!changed.has(test)) continue
  const overlap = [...guardedBy(test)].filter((s) => changed.has(s)).sort()
  if (overlap.length > 0) violations.push({ test, overlap })
}

if (violations.length === 0) {
  console.log(`[contract-guard] ${contractTests.length} contract tests checked — no guard edited alongside what it guards.`)
  process.exit(0)
}

const title = process.env.PR_TITLE || ''
const acknowledged = process.env.ALLOW_CONTRACT_CHANGE === '1' || /\[contract-change\]/i.test(title)

console.error('')
console.error('[contract-guard] A contract test was changed in the same pull request as a surface it guards:')
console.error('')
for (const v of violations) {
  console.error(`  ${v.test}`)
  for (const s of v.overlap) console.error(`      also changed: ${s}`)
}
console.error('')

if (acknowledged) {
  console.error('[contract-guard] Acknowledged — the change is marked deliberate. Passing.')
  console.error('[contract-guard] Reviewer: confirm the contract was loosened on purpose, not to make a regression pass.')
  process.exit(0)
}

console.error('This is how a regression ships green: the test that would have caught it')
console.error('is rewritten by the change itself. See #409 (homepage stripped + contract')
console.error('rewritten) and #415 (both restored).')
console.error('')
console.error('Resolve one of these ways:')
console.error('  1. Split the pull request — land the contract change on its own first, so')
console.error('     the surface change is measured against a contract someone already reviewed.')
console.error('  2. If the contract genuinely must move with the surface, put')
console.error('     [contract-change] in the pull request title. It will pass and the pairs')
console.error('     above are printed for the reviewer.')
console.error('')
process.exit(1)
