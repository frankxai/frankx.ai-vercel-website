#!/usr/bin/env node
/**
 * What each required guard inspects, and whether this pull request contains any
 * of it.
 *
 * These lists used to be `paths:` filters on the guards' `pull_request`
 * triggers. That made them unsafe in a way no amount of care could fix: GitHub
 * creates no check run for a workflow its filter excludes, so a pull request
 * matching neither filter left both required contexts "expected" forever and
 * was BLOCKED with nothing red to fix. The repo hit that four times
 * (next.config.mjs, lockfile-only, workflow-only in #599, CLAUDE.md-only in
 * #612) and each time appended the offending path to both filters, which only
 * ever covers a file class someone has already been blocked by.
 *
 * The filters are gone. Both guards now schedule on every non-draft pull
 * request and decide for themselves, using this module, whether they have
 * anything to inspect — reporting their own required context either way. The
 * lists moved rather than disappeared, and are deliberately unchanged from the
 * filters they replace, so which files each guard inspects is exactly what it
 * was; only the reporting changed.
 *
 * Keeping them here rather than inline in the workflows is what lets
 * check-deploy-path-coverage.mjs keep enforcing that a source directory the app
 * imports cannot become invisible to a gate. That protection was the whole
 * point of the `types/` incident and it survives the filters' removal.
 *
 * FAIL OPEN, ALWAYS. Every uncertainty here resolves to "in scope", because the
 * expensive outcome is a guard that runs when it did not need to, and the
 * unacceptable one is a guard that reports success without looking. This is the
 * opposite of the bias a `paths:` filter had, and it is the reason the filters
 * could not stay.
 */
import { execFileSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

/**
 * Verbatim copies of the `paths:` filters these guards carried, minus the
 * trap-dodging commentary, which now lives in the workflow headers. Entries
 * added purely to dodge the required-check trap (.github/workflows/**,
 * CLAUDE.md, AGENTS.md, docs/**) are kept as-is: pruning them would change what
 * the guards inspect, which is a separate decision from removing the filters.
 */
export const SCOPES = {
  'contract-guard': [
    'app/**',
    'components/**',
    'lib/**',
    'data/**',
    'content/**',
    'public/**',
    'scripts/**',
    'types/**',
    'next.config.mjs',
    'package.json',
    'pnpm-lock.yaml',
    '.github/workflows/**',
    'CLAUDE.md',
    'AGENTS.md',
    'docs/**',
  ],
  'merge-gate': [
    'app/**',
    'components/**',
    'content/**',
    'lib/**',
    'data/**',
    'public/**',
    'scripts/**',
    'types/**',
    '.claude/workflows/**',
    '.claude/agents/**',
    'package.json',
    'pnpm-lock.yaml',
    'next.config.mjs',
    '.github/workflows/**',
    'CLAUDE.md',
    'AGENTS.md',
    'docs/**',
  ],
}

/** The two glob shapes these lists use. Anything else is a programming error. */
export function matches(pattern, file) {
  if (pattern.endsWith('/**')) return file.startsWith(pattern.slice(0, -2))
  if (!pattern.includes('*')) return file === pattern
  throw new Error(`unsupported scope pattern ${pattern} — teach matches() this shape before shipping it`)
}

export const inScope = (scope, files) => files.some((f) => scope.some((p) => matches(p, f)))

/**
 * Changed files, from the merge commit GitHub checks out for a pull_request
 * event: HEAD^1 is the base tip and HEAD is the merged result, so this is what
 * would actually land. Needs fetch-depth >= 2.
 *
 * --no-renames on purpose. A rename is reported as a delete plus an add, so a
 * guarded file renamed out of the tree still counts as touching the guarded
 * path — the same way a `paths:` filter treated a rename as touching both
 * names. With rename detection on, only the new name would appear and a guarded
 * file could be moved out of scope without the guard ever looking at it.
 */
function changedFiles() {
  const out = execFileSync('git', ['diff', '--no-renames', '--name-only', 'HEAD^1', 'HEAD'], {
    encoding: 'utf8',
  })
  return out.split('\n').filter(Boolean)
}

// pathToFileURL, not a `file://` template: the naive form silently never
// matches on a Windows path, which would make this import-only and the guards
// would see an empty scope output.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const name = process.argv[2]
  const scope = SCOPES[name]
  if (!scope) throw new Error(`unknown guard ${name} — expected one of ${Object.keys(SCOPES).join(', ')}`)

  let verdict
  let why
  try {
    const files = changedFiles()
    verdict = inScope(scope, files)
    why = verdict
      ? `${files.length} changed file(s), at least one in scope`
      : `${files.length} changed file(s), none in scope: ${files.join(', ')}`
  } catch (error) {
    // No second parent, shallow clone, detached state, git missing — anything
    // that leaves the diff unknown runs the guard rather than skipping it.
    verdict = true
    why = `could not determine changed files (${error.message.split('\n')[0]}) — running the guard`
  }

  console.log(`[guard-scope] ${name}: ${verdict ? 'IN SCOPE' : 'NOTHING TO INSPECT'} — ${why}`)
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `in_scope=${verdict}\n`)
}
