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
 * posts its required context as a success commit status saying why. The filters
 * stay narrow, the guards keep running on the code they exist to protect, and no
 * file class can deadlock again — including ones nobody has thought of yet.
 *
 * SECURITY — everything this trusts comes from a protected branch.
 *
 * Holding statuses:write on two required contexts makes this a bypass target,
 * so no input may come from the pull request's own tree:
 *
 *   - This script runs from the default branch: unrun-guards.yml is triggered by
 *     `workflow_run`, which GitHub evaluates from the default branch rather than
 *     from the pull request's merge ref. See that file's header for why a
 *     `pull_request` trigger cannot be made safe by checking out the base.
 *   - The `paths:` filters are fetched over the API at the tip of the pull
 *     request's BASE branch, never read off disk and never from the pull
 *     request's copies. A branch that narrows contract-guard.yml so the real job
 *     does not schedule therefore changes nothing here: base still says the
 *     guard should have run, so nothing is posted and the pull request stays
 *     BLOCKED. Failing closed is the correct outcome for that branch.
 *   - The changed-file list is the only pull-request-controlled input, and it is
 *     data, not code: a file list can only ever make this post FEWER contexts,
 *     because any match at all silences the report.
 *
 * The base branch tip is used rather than the pull request's recorded base SHA
 * because a filter widened on main after the pull request opened is in force for
 * the merge ref, and a stale base SHA would miss it — the direction that would
 * post a context alongside a guard that did run.
 */

const { GITHUB_REPOSITORY, GITHUB_TOKEN, HEAD_SHA, RUN_URL } = process.env

for (const [key, value] of Object.entries({ GITHUB_REPOSITORY, GITHUB_TOKEN, HEAD_SHA })) {
  if (!value) throw new Error(`${key} is required`)
}

/**
 * Required context -> the workflow that owns it. `job` is asserted against the
 * base copy's own `name:` so renaming a job fails here instead of silently
 * posting a context that branch protection no longer requires.
 */
const GUARDS = [
  { context: 'Contract Guard', file: '.github/workflows/contract-guard.yml', job: 'contract-guard' },
  { context: 'Merge Gate', file: '.github/workflows/merge-gate.yml', job: 'merge-gate' },
]

const api = async (path, { raw = false, ...init } = {}) => {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
      authorization: `Bearer ${GITHUB_TOKEN}`,
      'x-github-api-version': '2022-11-28',
      ...init.headers,
    },
  })
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`)
  return raw ? res.text() : res.json()
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
  if (pattern.endsWith('/**')) return file.startsWith(pattern.slice(0, -2))
  if (!pattern.includes('*')) return file === pattern
  throw new Error(`unsupported paths pattern ${pattern} — teach matches() this shape before shipping it`)
}

async function report(pr) {
  const label = `#${pr.number}`

  // The head moved while CI was running. The run for the new head does this
  // work against the file list that actually belongs to it; posting here would
  // stamp an old SHA from a newer diff.
  if (pr.head.sha !== HEAD_SHA) {
    console.log(`[unrun-guards] ${label}: head moved to ${pr.head.sha} — a later run covers it`)
    return
  }
  // Mirrors the guards being stood in for: both skip drafts, so a draft has no
  // missing verdict to report, and marking it ready re-runs CI and this.
  if (pr.draft) {
    console.log(`[unrun-guards] ${label}: draft — the guards skip drafts too`)
    return
  }
  // A fork cannot narrow this repo's required checks into a bypass, but it also
  // cannot be reasoned about from base alone; the repo's own agent branches are
  // the case this exists for.
  if (pr.head.repo.full_name !== GITHUB_REPOSITORY) {
    console.log(`[unrun-guards] ${label}: head is ${pr.head.repo.full_name}, not this repository`)
    return
  }

  const changed = []
  for (let page = 1; ; page += 1) {
    const batch = await api(`/repos/${GITHUB_REPOSITORY}/pulls/${pr.number}/files?per_page=100&page=${page}`)
    changed.push(...batch.map((f) => f.filename))
    if (batch.length < 100) break
  }
  console.log(`[unrun-guards] ${label}: ${changed.length} changed file(s): ${changed.join(', ')}`)

  for (const { context, file, job } of GUARDS) {
    const base = encodeURIComponent(pr.base.ref)
    const text = await api(`/repos/${GITHUB_REPOSITORY}/contents/${file}?ref=${base}`, { raw: true })

    if (!new RegExp(`^\\s+${job}:\\n(?:.*\\n)*?\\s+name: ${context}\\s*$`, 'm').test(text)) {
      throw new Error(`${file} on ${pr.base.ref} no longer defines job ${job} as "${context}" — mapping is stale`)
    }

    const patterns = pathsFilter(text)
    if (patterns.length === 0) {
      console.log(`[unrun-guards] ${label} ${context}: no paths filter on ${pr.base.ref}, always runs`)
      continue
    }

    const hit = changed.find((f) => patterns.some((p) => matches(p, f)))
    if (hit) {
      console.log(`[unrun-guards] ${label} ${context}: ${pr.base.ref} schedules it (${hit}) — its verdict stands alone`)
      continue
    }

    await api(`/repos/${GITHUB_REPOSITORY}/statuses/${HEAD_SHA}`, {
      method: 'POST',
      body: JSON.stringify({
        context,
        state: 'success',
        target_url: RUN_URL,
        description: 'No guarded path changed — guard has nothing to inspect.',
      }),
    })
    console.log(`[unrun-guards] ${label} ${context}: reported — no changed file is inside the ${pr.base.ref} filter`)
  }
}

// The triggering CI run reports only a SHA. Resolving it to open pull requests
// here, rather than trusting workflow_run.pull_requests, keeps one code path
// that works whether or not that field is populated.
const prs = await api(`/repos/${GITHUB_REPOSITORY}/commits/${HEAD_SHA}/pulls`)
if (prs.length === 0) console.log(`[unrun-guards] no open pull request has head ${HEAD_SHA}`)
for (const pr of prs) await report(pr)
