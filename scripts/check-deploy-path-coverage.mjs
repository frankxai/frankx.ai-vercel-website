#!/usr/bin/env node
/**
 * Source-directory coverage for the deploy gate and the PR gates.
 *
 * Two independent path allowlists decide whether a change is checked and
 * whether it reaches users:
 *
 *   - scripts/should-deploy.sh RELEVANT_PATHS — Vercel's ignoreCommand. A commit
 *     touching nothing in that list SKIPS the production build. Its own header
 *     states the bias: "Skipping a build that should have run is a correctness
 *     bug (stale prod)."
 *   - the `paths:` filters in ci.yml, merge-gate.yml and contract-guard.yml — a
 *     pull request touching nothing in them runs none of those jobs.
 *
 * Both lists were written by hand from the directories that existed at the time.
 * Neither is derived from what the app actually imports, so a source directory
 * can be added, wired into routes, and stay invisible to every gate. That is
 * what happened to types/: 37 files under app/, components/, lib/ and data/
 * import from it — including checkout and product routes — and it exports
 * runtime constants, not only type declarations. It appeared in no allowlist.
 *
 * This derives the required set from the imports rather than trusting the lists,
 * and fails when a directory the app imports is missing from either gate.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

/** Roots whose imports decide what ships. */
const SOURCE_ROOTS = ['app', 'components', 'lib', 'data']
const SOURCE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs'])

/** `@/*` maps to `./*` in tsconfig, so the first segment is a repo-root entry. */
const ALIAS_RE = /(?:from|import|require)\s*\(?\s*['"]@\/([A-Za-z0-9._-]+)/g

const DEPLOY_GATE = 'scripts/should-deploy.sh'
const PR_GATES = [
  '.github/workflows/ci.yml',
  '.github/workflows/merge-gate.yml',
  '.github/workflows/contract-guard.yml',
]

const isDir = (p) => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

function sourceFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) sourceFiles(p, out)
    else if (SOURCE_EXT.has(path.extname(entry.name))) out.push(p)
  }
  return out
}

/** Top-level directories the app imports from, with one example importer each. */
function importedDirs() {
  const found = new Map()
  for (const root of SOURCE_ROOTS) {
    if (!isDir(root)) continue
    for (const file of sourceFiles(root)) {
      for (const [, seg] of readFileSync(file, 'utf8').matchAll(ALIAS_RE)) {
        if (!isDir(seg)) continue
        if (!found.has(seg)) found.set(seg, { count: 0, example: file.split(path.sep).join('/') })
        found.get(seg).count += 1
      }
    }
  }
  return found
}

/** Entries of the RELEVANT_PATHS=( ... ) array, comments and blanks dropped. */
function relevantPaths(text) {
  const body = text.match(/RELEVANT_PATHS=\(([\s\S]*?)\n\)/)
  if (!body) throw new Error(`${DEPLOY_GATE}: no RELEVANT_PATHS=( ... ) array found`)
  return new Set(
    body[1]
      .split('\n')
      .map((line) => line.replace(/#.*$/, '').trim())
      .filter(Boolean)
  )
}

/**
 * Every `paths:` list in a workflow, one Set per list. A workflow with separate
 * push and pull_request triggers has two, and a directory missing from either
 * one leaves that trigger unguarded — so they are checked separately.
 */
function pathsBlocks(text) {
  const lines = text.split(/\r?\n/)
  const blocks = []
  for (let i = 0; i < lines.length; i += 1) {
    const header = lines[i].match(/^(\s*)paths:\s*$/)
    if (!header) continue
    const entries = new Set()
    for (let j = i + 1; j < lines.length; j += 1) {
      const line = lines[j]
      if (!line.trim() || /^\s*#/.test(line)) continue
      const item = line.match(/^(\s*)-\s*(.+?)\s*$/)
      if (!item || item[1].length <= header[1].length) break
      entries.add(item[2].replace(/^['"]|['"]$/g, ''))
    }
    blocks.push(entries)
  }
  return blocks
}

const imported = importedDirs()
const failures = []

const deployCovered = relevantPaths(readFileSync(DEPLOY_GATE, 'utf8'))
for (const dir of imported.keys()) {
  if (!deployCovered.has(dir)) {
    failures.push({
      dir,
      file: DEPLOY_GATE,
      detail: `add "${dir}" to RELEVANT_PATHS — a ${dir}-only commit currently skips the production build`,
    })
  }
}

for (const gate of PR_GATES) {
  const blocks = pathsBlocks(readFileSync(gate, 'utf8'))
  if (blocks.length === 0) continue // no paths filter means the job always runs
  blocks.forEach((entries, index) => {
    for (const dir of imported.keys()) {
      if (entries.has(`${dir}/**`)) continue
      failures.push({
        dir,
        file: gate,
        detail:
          `add "${dir}/**" to paths list #${index + 1} — a ${dir}-only ` +
          'pull request does not run this job',
      })
    }
  })
}

const summary = [...imported]
  .sort((a, b) => b[1].count - a[1].count)
  .map(([dir, { count }]) => `${dir} (${count})`)
  .join(', ')

if (failures.length > 0) {
  console.error(
    `[deploy-path-coverage] ${failures.length} gap(s) between imported source directories and the gates:`
  )
  for (const { dir, file, detail } of failures) {
    console.error(`  - ${dir} missing from ${file}`)
    console.error(`      ${detail}`)
    console.error(`      imported by e.g. ${imported.get(dir).example}`)
  }
  process.exit(1)
}

console.log(
  `[deploy-path-coverage] ok — ${imported.size} imported source director(ies) covered by ` +
    `${DEPLOY_GATE} and ${PR_GATES.length} workflow(s): ${summary}`
)
