#!/usr/bin/env node
/**
 * merge:gate CI-coverage check.
 *
 * merge:gate is the repo's pre-merge contract, but it is an npm script — no
 * workflow runs it as a unit. Coverage is assembled by hand across ci.yml and
 * merge-gate.yml, so a step added to merge:gate is enforced locally and silently
 * skipped on every pull request.
 *
 * That drifted twice. test:expert-authority was never listed in merge-gate.yml,
 * and #441 added test:blog-discoverability and test:social-identity to
 * merge:gate while touching no workflow — leaving the blog-discoverability
 * contract, shipped in that same commit to stop a regression, unenforced in CI.
 *
 * This fails when a merge:gate step is run by no workflow. It does not check
 * the reverse: a workflow may legitimately run more than merge:gate does.
 */
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const WORKFLOW_DIR = '.github/workflows'

/**
 * Steps merge:gate runs that no workflow is expected to. Each needs a reason —
 * an empty exemption is how the drift above became invisible in the first place.
 */
const EXEMPT = new Map([
  [
    'links:check:ci',
    'boots a dev server; merge:gate:ci already excludes it and merge-gate.yml runs links:check:static instead',
  ],
])

const RUN_RE = /\b(?:npm|pnpm) run ([a-zA-Z0-9:_-]+)/g

const runScripts = (text) => new Set(Array.from(text.matchAll(RUN_RE), (m) => m[1]))

/**
 * Return only executable `run:` values from a workflow. Scanning the whole YAML
 * lets a commented-out `pnpm run ...` satisfy this guard while executing
 * nothing — the exact false-green class this check exists to prevent.
 *
 * This deliberately supports the two GitHub Actions forms used in this repo:
 * a scalar `run: command` and an indented `run: |` / `run: >` block. It is not
 * a general YAML parser; an unfamiliar shape fails closed by contributing no
 * covered scripts.
 */
function workflowRunText(text) {
  const lines = text.split(/\r?\n/)
  const commands = []

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^(\s*)run:\s*(.*?)\s*$/)
    if (!match) continue

    const indent = match[1].length
    const value = match[2]
    if (value && value !== '|' && value !== '>') {
      commands.push(value)
      continue
    }

    for (let j = i + 1; j < lines.length; j += 1) {
      const line = lines[j]
      if (!line.trim()) continue
      const lineIndent = line.match(/^\s*/)[0].length
      if (lineIndent <= indent) break
      if (/^\s*#/.test(line)) continue
      commands.push(line.trim())
      i = j
    }
  }

  return commands.join('\n')
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const gate = pkg.scripts?.['merge:gate']
if (!gate) {
  console.error('[merge-gate-coverage] package.json has no merge:gate script.')
  process.exit(1)
}

const workflows = readdirSync(WORKFLOW_DIR).filter((f) => /\.ya?ml$/.test(f))
const covered = new Set()
for (const file of workflows) {
  const executable = workflowRunText(readFileSync(path.join(WORKFLOW_DIR, file), 'utf8'))
  for (const s of runScripts(executable)) {
    covered.add(s)
  }
}

const required = runScripts(gate)
const missing = [...required].filter((s) => !covered.has(s) && !EXEMPT.has(s))

if (missing.length > 0) {
  console.error(
    `[merge-gate-coverage] ${missing.length} merge:gate step(s) run in no workflow under ${WORKFLOW_DIR}/:`
  )
  for (const s of missing) console.error(`  - ${s}`)
  console.error(
    '\nAdd each to a workflow (merge-gate.yml unless ci.yml already covers it),\n' +
      'or add it to EXEMPT in scripts/check-merge-gate-coverage.mjs with a reason.'
  )
  process.exit(1)
}

const exempted = [...required].filter((s) => EXEMPT.has(s))
console.log(
  `[merge-gate-coverage] ok — ${required.size - exempted.length} merge:gate step(s) covered across ` +
    `${workflows.length} workflow file(s)` +
    (exempted.length > 0 ? `; ${exempted.length} exempt (${exempted.join(', ')})` : '')
)
