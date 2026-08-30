#!/usr/bin/env node
/**
 * Reports the required guard contexts that a pull request's own file list makes
 * impossible to run.
 *
 * `Contract Guard` and `Merge Gate` are required status checks AND carry
 * `paths:` filters. GitHub never creates a check run for a workflow its filter
 * excludes, so the required context stays "expected" forever and the pull
 * request is BLOCKED with nothing red to fix. The repo hit that trap four times
 * (next.config.mjs, lockfile-only, workflow-only in #599, CLAUDE.md-only in
 * #612) and each time answered by appending the offending path to both filters.
 *
 * That answer does not generalise. It only covers file classes someone has
 * already been blocked by, and extending it to documentation would mean running
 * a 20-minute contract suite on every README typo to prove a contract nobody
 * touched is still intact.
 *
 * This closes the trap from the other side: when a guard's own filter excludes
 * every file in the pull request, the guard has nothing to inspect, and this
 * posts its required context as a success commit status with a description
 * saying why. The filters stay narrow, the guards keep running on the code they
 * exist to protect, and no file class can ever deadlock again — including ones
 * nobody has thought of yet.
 *
 * The paths are read out of the guard workflows themselves rather than restated
 * here. A filter that widens or narrows changes this script's behaviour in the
 * same commit, so the two cannot drift.
 *
 * Reports nothing when a guard's filter does match — a guard that actually runs
 * must report its own verdict, and a fabricated success alongside a real failure
 * would be exactly the weakening this file exists to avoid.
 */
import { readFileSync } from 'node:fs'

/**
 * Required context -> the workflow that owns it. `job` is asserted against the
 * workflow's own `name:` so renaming a job fails here instead of silently
 * posting a context that branch protection no longer requires.
 */
const GUARDS = [
  { context: 'Contract Guard', file: '.github/workflows/contract-guard.yml', job: 'contract-guard' },
  { context: 'Merge Gate', file: '.github/workflows/merge-gate.yml', job: 'merge-gate' },
]

const { GITHUB_REPOSITORY, GITHUB_TOKEN, PR_NUMBER, PR_HEAD_SHA, RUN_URL } = process.env

for (const [key, value] of Object.entries({ GITHUB_REPOSITORY, GITHUB_TOKEN, PR_NUMBER, PR_HEAD_SHA })) {
  if (!value) throw new Error(`${key} is required`)
}

const api = async (path, init) => {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${GITHUB_TOKEN}`,
      'x-github-api-version': '2022-11-28',
      ...init?.headers,
    },
  })
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`)
  return res.json()
}

/** Every `paths:` list in a workflow, flattened. Mirrors check-deploy-path-coverage.mjs. */
function pathsFilter(text) {
  const lines = text.split(/\r?\n/)
  const entries = []
  for (let i = 0; i < lines.length; i += 1) {
    const header = lines[i].match(/^(\s*)paths:\s*$/)
    if (!header) continue
    for (let j = i + 1; j < lines.length; j += 1) {
      const line = lines[j]
      if (!line.trim() || /^\s*#/.test(line)) continue
      const item = line.match(/^(\s*)-\s*(.+?)\s*$/)
      if (!item || item[1].length <= header[1].length) break
      entries.push(item[2].replace(/^['"]|['"]$/g, ''))
    }
  }
  return entries
}

/**
 * Only the two glob shapes the guard filters actually use. Anything else throws
 * rather than being guessed at: a pattern this cannot evaluate must not be read
 * as "no match", because that would post a success for a guard that did run.
 */
function matches(pattern, file) {
  if (pattern.endsWith('/**')) return file.startsWith(`${pattern.slice(0, -2)}`)
  if (!pattern.includes('*')) return file === pattern
  throw new Error(`unsupported paths pattern ${pattern} — teach matches() this shape before shipping it`)
}

const changed = []
for (let page = 1; ; page += 1) {
  const batch = await api(`/repos/${GITHUB_REPOSITORY}/pulls/${PR_NUMBER}/files?per_page=100&page=${page}`)
  changed.push(...batch.map((f) => f.filename))
  if (batch.length < 100) break
}
console.log(`[unrun-guards] ${changed.length} changed file(s): ${changed.join(', ')}`)

for (const { context, file, job } of GUARDS) {
  const text = readFileSync(file, 'utf8')
  if (!new RegExp(`^\\s+${job}:\\n(?:.*\\n)*?\\s+name: ${context}\\s*$`, 'm').test(text)) {
    throw new Error(`${file} no longer defines job ${job} as "${context}" — the context mapping is stale`)
  }

  const patterns = pathsFilter(text)
  if (patterns.length === 0) {
    console.log(`[unrun-guards] ${context}: no paths filter, always runs — nothing to report`)
    continue
  }

  const hit = changed.find((f) => patterns.some((p) => matches(p, f)))
  if (hit) {
    console.log(`[unrun-guards] ${context}: runs for this pull request (${hit}) — leaving its verdict alone`)
    continue
  }

  await api(`/repos/${GITHUB_REPOSITORY}/statuses/${PR_HEAD_SHA}`, {
    method: 'POST',
    body: JSON.stringify({
      context,
      state: 'success',
      target_url: RUN_URL,
      description: 'No guarded path changed — guard has nothing to inspect.',
    }),
  })
  console.log(`[unrun-guards] ${context}: reported success — no changed file is inside its paths filter`)
}
