#!/usr/bin/env node
// Push the Chronicle public surface (3 files) directly to
// frankx.ai-vercel-website main via the GitHub Trees API.
// Pattern: same as Atlas Globe PR #28 / Contemplative Rails 9cc6748 /
// piano push. Used when local git push fails (disk pressure / large file).
//
// Adds binary (base64) blob support for the hero JPEG.

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { execSync } from 'node:child_process'

const REPO = 'frankxai/frankx.ai-vercel-website'
const BRANCH = 'main'

const FILES = [
  { local: 'app/chronicle/page.tsx',                              remote: 'app/chronicle/page.tsx',                              binary: false },
  { local: 'public/images/chronicle/state-of-the-palace-hero.jpg', remote: 'public/images/chronicle/state-of-the-palace-hero.jpg', binary: true  },
  { local: 'data/changelog-entries.json',                         remote: 'data/changelog-entries.json',                         binary: false },
]

const COMMIT_MESSAGE = `feat(chronicle): publish /chronicle manifesto + refresh /changelog

The reflective layer of the FrankX OS goes public.

- app/chronicle/page.tsx — public manifesto. Restraint-first dark register,
  hero image, four cadences, three principles, lineage, refusals. Links to
  /changelog and /os.
- public/images/chronicle/state-of-the-palace-hero.jpg — NB2 2K cinematic
  hero (16:9, 2.7MB). Eight stone arches at dawn.
- data/changelog-entries.json — refreshed via scripts/chronicle-roll-week.mjs
  (lives in private FrankX repo). Adds week 2026-W18 with 62 entries auto-
  mined from git logs across 4 active sibling repos. Closes the 62-day-stale
  gap (last touched 2026-03-02).

Private layer (founding witness, weekly archive, skill, slash commands,
roll-up script) stays in the FrankX private repo. Only the manifesto page
+ hero + changelog data go public.

Trees-API push: local git push hit HTTP 408 (disk pressure 100% + 2.7MB
binary). Same fallback pattern as Atlas Globe PR #28 / Rails 9cc6748.

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
