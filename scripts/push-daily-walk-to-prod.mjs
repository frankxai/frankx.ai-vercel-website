#!/usr/bin/env node
// Push Daily Walk (/admin/daily) + Chronicle eyebrow update + ecosystem registry
// to production via Trees API. Same fallback pattern as Atlas Globe / Rails / piano.

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { execSync } from 'node:child_process'

const REPO = 'frankxai/frankx.ai-vercel-website'
const BRANCH = 'main'

const FILES = [
  // The Daily Walk surface
  { local: 'app/admin/daily/page.tsx',          remote: 'app/admin/daily/page.tsx',          binary: false },
  { local: 'app/admin/daily/DailyWalkClient.tsx', remote: 'app/admin/daily/DailyWalkClient.tsx', binary: false },
  // The blessings API
  { local: 'app/api/blessings/route.ts',        remote: 'app/api/blessings/route.ts',        binary: false },
  // Data dependencies
  { local: 'data/ecosystem.ts',                 remote: 'data/ecosystem.ts',                 binary: false },
  { local: 'data/daily-walk.json',              remote: 'data/daily-walk.json',              binary: false },
  { local: 'data/blessings.jsonl',              remote: 'data/blessings.jsonl',              binary: false },
  // Chronicle page eyebrow update (Creation Chronicles framing)
  { local: 'app/chronicle/page.tsx',            remote: 'app/chronicle/page.tsx',            binary: false },
]

const COMMIT_MESSAGE = `feat(daily-walk): /admin/daily mobile review + Creation Chronicles framing

The Daily Walk — gated mobile-first review across all operating systems.

Architecture (composes existing infra, no new services):
- Reads data/ecosystem.ts (typed registry) for system metadata
- Reads data/daily-walk.json (auto-mined from git via
  scripts/chronicle-roll-day.mjs in the private FrankX repo)
- Renders one card per changed system; tap-tap Approve/Flag
- Persists to localStorage immediately; "Save the day" commits to
  data/blessings.jsonl via /api/blessings POST
- AI sessions read recent blessings on startup → control loop closes

The Daily Walk is the daily companion to the Sunday Blessing. Examen +
Sabbath. Same skill (starlight-chronicle), three observances:
  /admin/daily   = Daily Walk    (mobile, private, gated by middleware)
  /sunday        = Sunday Blessing (private weekly ritual)
  /chronicle     = Creation Chronicles (public manifesto + state of palace)

Chronicle eyebrow updated to "Creation Chronicles · The Starlight Chronicle"
to honor the existing newsletter concept.

ecosystem.ts ships to production for the first time (was previously only in
the private FrankX repo). It powers the Daily Walk's per-system join.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
`

function gh(path, opts = {}) {
  const { method = 'GET', body } = opts
  let cmd = `gh api ${path} -X ${method} -H "Accept: application/vnd.github+json"`
  if (body) {
    const tmpFile = `.gh-body-${Date.now()}-${Math.random().toString(36).slice(2)}.json`
    writeFileSync(tmpFile, JSON.stringify(body))
    cmd += ` --input ${tmpFile}`
    try {
      const out = execSync(cmd, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
      return JSON.parse(out)
    } finally {
      try { unlinkSync(tmpFile) } catch { /* ok */ }
    }
  }
  const out = execSync(cmd, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  return JSON.parse(out)
}

async function main() {
  console.log(`→ Pushing ${FILES.length} files to ${REPO}@${BRANCH} via Trees API`)

  const ref = gh(`repos/${REPO}/git/refs/heads/${BRANCH}`)
  const baseCommitSha = ref.object.sha
  console.log(`  base commit:   ${baseCommitSha}`)

  const baseCommit = gh(`repos/${REPO}/git/commits/${baseCommitSha}`)
  const baseTreeSha = baseCommit.tree.sha
  console.log(`  base tree:     ${baseTreeSha}`)

  const treeEntries = []
  for (const f of FILES) {
    let blobBody
    if (f.binary) {
      const buf = readFileSync(f.local)
      blobBody = { content: buf.toString('base64'), encoding: 'base64' }
      console.log(`  reading binary ${f.local} (${buf.length} bytes)`)
    } else {
      const content = readFileSync(f.local, 'utf8')
      blobBody = { content, encoding: 'utf-8' }
    }
    const blob = gh(`repos/${REPO}/git/blobs`, { method: 'POST', body: blobBody })
    treeEntries.push({ path: f.remote, mode: '100644', type: 'blob', sha: blob.sha })
    console.log(`  blob ${blob.sha.slice(0, 8)}  ${f.remote}`)
  }

  const newTree = gh(`repos/${REPO}/git/trees`, {
    method: 'POST',
    body: { base_tree: baseTreeSha, tree: treeEntries },
  })
  console.log(`  new tree:      ${newTree.sha}`)

  const newCommit = gh(`repos/${REPO}/git/commits`, {
    method: 'POST',
    body: { message: COMMIT_MESSAGE, tree: newTree.sha, parents: [baseCommitSha] },
  })
  console.log(`  new commit:    ${newCommit.sha}`)

  gh(`repos/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: { sha: newCommit.sha, force: false },
  })
  console.log(`✓ Pushed to ${BRANCH}: ${newCommit.sha}`)
  console.log(`  https://github.com/${REPO}/commit/${newCommit.sha}`)
}

main().catch((e) => {
  console.error('✗ Push failed:', e.message)
  if (e.stdout) console.error('stdout:', e.stdout?.toString?.())
  if (e.stderr) console.error('stderr:', e.stderr?.toString?.())
  process.exit(1)
})
