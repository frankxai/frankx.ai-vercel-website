#!/usr/bin/env node
/**
 * Reports the required guard contexts that a pull request's own file list makes
 * impossible to run.
 *
 * Path filters and job names are read from the **base SHA** copies of the
 * guard workflows, not from the pull request tree. A same-repo branch must
 * not rewrite those filters so this job stamps `Contract Guard` / `Merge Gate`
 * successful while the real guards never schedule.
 *
 * Changed paths include GitHub `previous_filename` on renames, matching how
 * workflow `paths:` filters treat a rename as touching both names.
 *
 * Reports nothing when a base filter matches — a guard that actually runs
 * must report its own verdict.
 */

const GUARDS = [
  { context: 'Contract Guard', file: '.github/workflows/contract-guard.yml', job: 'contract-guard' },
  { context: 'Merge Gate', file: '.github/workflows/merge-gate.yml', job: 'merge-gate' },
]

const {
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  PR_NUMBER,
  PR_HEAD_SHA,
  PR_BASE_SHA,
  RUN_URL,
} = process.env

for (const [key, value] of Object.entries({
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  PR_NUMBER,
  PR_HEAD_SHA,
  PR_BASE_SHA,
})) {
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

function matches(pattern, file) {
  if (pattern.endsWith('/**')) return file.startsWith(`${pattern.slice(0, -2)}`)
  if (!pattern.includes('*')) return file === pattern
  throw new Error(`unsupported paths pattern ${pattern} — teach matches() this shape before shipping it`)
}

async function workflowAtBase(file) {
  const data = await api(
    `/repos/${GITHUB_REPOSITORY}/contents/${file}?ref=${encodeURIComponent(PR_BASE_SHA)}`,
  )
  if (data.encoding !== 'base64' || typeof data.content !== 'string') {
    throw new Error(`${file} at base ${PR_BASE_SHA} is not a base64 file`)
  }
  return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8')
}

const changed = []
for (let page = 1; ; page += 1) {
  const batch = await api(`/repos/${GITHUB_REPOSITORY}/pulls/${PR_NUMBER}/files?per_page=100&page=${page}`)
  for (const f of batch) {
    changed.push(f.filename)
    if (f.previous_filename) changed.push(f.previous_filename)
  }
  if (batch.length < 100) break
}
console.log(`[unrun-guards] ${changed.length} changed path(s) (incl. rename sources): ${changed.join(', ')}`)
console.log(`[unrun-guards] filters from base ${PR_BASE_SHA}; statuses on head ${PR_HEAD_SHA}`)

for (const { context, file, job } of GUARDS) {
  const text = await workflowAtBase(file)
  if (!new RegExp(`^\\s+${job}:\\n(?:.*\\n)*?\\s+name: ${context}\\s*$`, 'm').test(text)) {
    throw new Error(`${file} at base no longer defines job ${job} as "${context}" — the context mapping is stale`)
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
  console.log(`[unrun-guards] ${context}: reported success — no changed file is inside base paths filter`)
}
