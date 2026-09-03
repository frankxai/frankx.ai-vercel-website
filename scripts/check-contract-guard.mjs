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
 * test for the paths it references and keeping the ones that resolve to a
 * tracked file, so it stays accurate as tests are added or assertions move.
 *
 * Three things this deliberately does NOT assume:
 *
 *   1. That the test still exists. A pull request that DELETES a contract test
 *      while changing the surface it guarded is the strongest form of the #409
 *      failure — the seatbelt is not loosened, it is removed. Candidate tests
 *      therefore include paths that only exist in the base revision.
 *   2. That the test's current text still names the surface. A pull request can
 *      strip the asserted literal and change the surface in one commit, so
 *      guarded paths are the UNION of what the test referenced at the base
 *      revision and at HEAD.
 *   3. That references are written repo-relative. Several tests use
 *      '../../app/…' relative to scripts/tests/, and Next route groups put
 *      parentheses in real paths. Both are normalised before lookup.
 *
 * Deliberately changing most contracts alongside their surfaces is legitimate
 * when it is visible to a reviewer. Put [contract-change] in the pull request
 * title, or set ALLOW_CONTRACT_CHANGE=1, and this check reports the pairs and
 * passes.
 *
 * The homepage is intentionally stricter. Its contract cannot be changed in
 * the same pull request as app/page.tsx or components/home/**, and homepage
 * work cannot be bundled with unrelated executable surfaces. The 2026-08-27
 * regression passed because a replacement homepage and a newly-permissive
 * contract shipped together inside a broad funnel change. A title tag is not
 * sufficient approval for repeating that operation.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const TEST_DIR = 'scripts/tests'
const TEST_SUFFIX = 'contract.test.mjs'
const HOMEPAGE_ENTRYPOINT = 'app/page.tsx'
const HOMEPAGE_COMPONENT_PREFIX = 'components/home/'
const HOMEPAGE_CONTRACT = 'scripts/tests/homepage-mind-palace-contract.test.mjs'
const EXECUTABLE_PREFIXES = [
  '.github/workflows/',
  'app/',
  'components/',
  'content/',
  'data/',
  'lib/',
  'public/',
  'scripts/',
  'styles/',
  'types/',
]
const EXECUTABLE_FILES = new Set([
  'middleware.ts',
  'next.config.mjs',
  'package.json',
  'pnpm-lock.yaml',
  'tailwind.config.js',
])

// Any quoted literal that looks like a path: contains a slash and an extension.
// Deliberately not an allowlist of prefixes or extensions — a contract can
// guard a script, a public asset or an .mdx file just as much as a component,
// and the tracked-file lookup below is what decides whether it is real.
const PATH_RE = /['"`]([^'"`\n\s]*\/[^'"`\n\s]*\.[A-Za-z0-9]+)['"`]/g

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

const isContractTest = (p) => p.startsWith(`${TEST_DIR}/`) && p.endsWith(TEST_SUFFIX)
const isHomepageSurface = (p) =>
  p === HOMEPAGE_ENTRYPOINT || p.startsWith(HOMEPAGE_COMPONENT_PREFIX)

// public/images/home/ is where homepage artwork actually lives; the repo has
// never had a public/images/homepage/ directory. Naming the wrong one made
// every homepage change that ships its own imagery trip the mixed-scope rule,
// which has no title-tag override.
const isHomepageCompanion = (p) =>
  isHomepageSurface(p) ||
  p.startsWith('data/homepage-') ||
  p.startsWith('public/images/home/') ||
  p.startsWith('public/images/music/') ||
  p.startsWith('scripts/tests/homepage-')

const isExecutableSurface = (p) =>
  EXECUTABLE_FILES.has(p) || EXECUTABLE_PREFIXES.some((prefix) => p.startsWith(prefix))

/** Changed paths plus the base revision they were measured against. */
function changeSet() {
  const baseRef = process.env.GITHUB_BASE_REF || 'main'
  let base
  try {
    base = git('merge-base', `origin/${baseRef}`, 'HEAD')
  } catch {
    // Shallow clone or missing remote ref — fall back to the last commit.
    try {
      base = git('rev-parse', 'HEAD~1')
    } catch {
      return { base: null, files: [] }
    }
  }
  // --no-renames so a renamed test shows up as both its old and its new path,
  // which keeps the old path in the candidate set.
  const files = git('diff', '--name-only', '--no-renames', base, 'HEAD').split('\n').filter(Boolean)
  return { base, files }
}

/** File contents at a revision, or null if it does not exist there. */
function readAt(filePath, rev) {
  try {
    return rev === null ? readFileSync(filePath, 'utf8') : git('show', `${rev}:${filePath}`)
  } catch {
    return null
  }
}

/** Which tracked files does this contract test reference, at one revision? */
function guardedBy(testPath, rev, tracked) {
  const src = readAt(testPath, rev)
  if (src === null) return new Set()
  const out = new Set()
  for (const m of src.matchAll(PATH_RE)) {
    const literal = m[1]
    const resolved = literal.startsWith('.')
      ? path.posix.normalize(path.posix.join(path.posix.dirname(testPath), literal))
      : path.posix.normalize(literal)
    // A test referencing itself or a sibling test is not a guarded surface.
    if (resolved === testPath || isContractTest(resolved)) continue
    if (tracked.has(resolved)) out.add(resolved)
  }
  return out
}

const { base, files } = changeSet()
const changed = new Set(files)

const homepageTouched = files.some(isHomepageSurface)
const mixedHomepageScope = homepageTouched
  ? files.filter((file) => isExecutableSurface(file) && !isHomepageCompanion(file))
  : []

if (mixedHomepageScope.length > 0) {
  console.error('')
  console.error('[contract-guard] Homepage work is bundled with unrelated executable surfaces:')
  console.error('')
  for (const file of mixedHomepageScope) console.error(`  ${file}`)
  console.error('')
  console.error('The homepage is a protected identity and portfolio surface. Keep its change in')
  console.error('an isolated pull request so the before/after value can be reviewed directly.')
  console.error('Move the unrelated route, API, content, data, or shared-component work to a')
  console.error('separate pull request. This rule has no title-tag override.')
  console.error('')
  process.exit(1)
}

// Tracked at HEAD, plus anything this pull request touched — so a source file
// the pull request deletes still counts as a guarded surface.
const tracked = new Set(git('ls-files').split('\n').filter(Boolean))
for (const f of changed) tracked.add(f)

// Candidates: tests present now, plus test paths this pull request changed —
// which is how a deleted or renamed test stays in scope.
const candidates = new Set()
try {
  for (const f of readdirSync(TEST_DIR)) {
    if (f.endsWith(TEST_SUFFIX)) candidates.add(path.posix.join(TEST_DIR, f))
  }
} catch {
  // Test directory absent at HEAD — the change set is the only source.
}
for (const f of changed) if (isContractTest(f)) candidates.add(f)

const violations = []
const unguarded = []

for (const test of [...candidates].sort()) {
  const targets = new Set([
    ...guardedBy(test, null, tracked),
    ...(base ? guardedBy(test, base, tracked) : []),
  ])
  if (targets.size === 0) unguarded.push(test)
  if (!changed.has(test)) continue
  const overlap = [...targets].filter((s) => changed.has(s)).sort()
  if (overlap.length > 0) {
    violations.push({ test, overlap, deleted: readAt(test, null) === null })
  }
}

const guarding = candidates.size - unguarded.length

if (unguarded.length > 0) {
  console.log(
    `[contract-guard] ${unguarded.length} of ${candidates.size} contract tests reference no tracked file, ` +
      'so this check cannot protect them:'
  )
  for (const t of unguarded) console.log(`    ${t}`)
  console.log('[contract-guard] That is a coverage gap, not a failure. Fix by asserting against a real path.')
}

if (violations.length === 0) {
  console.log(
    `[contract-guard] ${guarding} contract tests guard a tracked surface — none was edited alongside what it guards.`
  )
  process.exit(0)
}

const title = process.env.PR_TITLE || ''
const acknowledged = process.env.ALLOW_CONTRACT_CHANGE === '1' || /\[contract-change\]/i.test(title)
const protectedHomepageViolations = violations.filter(
  ({ test, overlap }) => test === HOMEPAGE_CONTRACT || overlap.some(isHomepageSurface),
)

console.error('')
console.error('[contract-guard] A contract test was changed in the same pull request as a surface it guards:')
console.error('')
for (const v of violations) {
  console.error(`  ${v.test}${v.deleted ? '   (DELETED by this pull request)' : ''}`)
  for (const s of v.overlap) console.error(`      also changed: ${s}`)
}
console.error('')

if (acknowledged && protectedHomepageViolations.length === 0) {
  console.error('[contract-guard] Acknowledged — the change is marked deliberate. Passing.')
  console.error('[contract-guard] Reviewer: confirm the contract was loosened on purpose, not to make a regression pass.')
  process.exit(0)
}

if (protectedHomepageViolations.length > 0) {
  console.error('The homepage preservation contract cannot be changed in the same pull request')
  console.error('as the homepage surface, even with [contract-change] or ALLOW_CONTRACT_CHANGE=1.')
  console.error('Land any deliberate contract change as its own reviewed pull request first;')
  console.error('then propose the homepage change against that already-reviewed contract.')
  console.error('See docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md.')
  console.error('')
  process.exit(1)
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
