#!/usr/bin/env node
// Push the piano upgrade (5 files) directly to frankx.ai-vercel-website main
// via the GitHub Trees API — atomic single commit, no working-tree touch.
//
// Pattern: same as Atlas Globe PR #28 / Contemplative Rails 9cc6748.

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { execSync } from 'node:child_process'

const REPO = 'frankxai/frankx.ai-vercel-website'
const BRANCH = 'main'

const FILES = [
  { local: 'lib/piano-progress.ts',                     remote: 'lib/piano-progress.ts' },
  { local: 'components/music/InteractivePiano.tsx',     remote: 'components/music/InteractivePiano.tsx' },
  { local: 'app/music-lab/piano/page.tsx',              remote: 'app/music-lab/piano/page.tsx' },
  { local: 'app/alea/musik/klavier/page.tsx',           remote: 'app/alea/musik/klavier/page.tsx' },
  { local: 'app/alea/page.tsx',                         remote: 'app/alea/page.tsx' },
]

const COMMIT_MESSAGE = `feat(piano): guided mode + warmer audio + browser progress for Alea

InteractivePiano (used by /alea/musik/klavier + /music-lab/piano/songs):
- Geführter Modus (Guided Mode): wait-for-the-right-key learning instead of
  auto-play. Highlights next note in green; child plays it; soft chime + advance.
  Wrong notes still play (positive feedback) but don't advance — the glowing
  target teaches itself.
- Warmer audio engine: triangle + sub-octave sine + ADSR envelope + 10% wet
  convolver reverb + soft lowpass at 4.2 kHz.
- Master volume slider, persisted to localStorage.
- Computer keyboard input (Z–M lower octave, Q–U upper) for desktop.
- Progress in localStorage: stars per song (<=2 misses=3 stars, <=6=2, else 1),
  daily practice minutes, total stars badge. Browser-only, no PII.
- Star badges visible on each song tile.
- Bilingual labels (German for childMode, English elsewhere).

/music-lab/piano (Salamander grand):
- Master gain 0.9 -> 1.15, compressor threshold -18 -> -12 dB, per-note
  gain 0.25 -> 0.4 base + warmth filter 2.5 -> 3.5 dB. Net ~+5 dB louder
  while compressor still catches peaks safely.
- Volume slider added to control row.

/alea/musik/klavier:
- guidedDefault enabled - Gefuehrter Modus is ON by default for kids.
- Updated copy to explain green-glow + 3-star goal.

/alea (landing):
- Hero "Klavier ueben" tile near top, deep-links to /alea/musik/klavier.

New: lib/piano-progress.ts - typed localStorage helpers (privacy-first,
browser-only, no telemetry).

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

  // 1. Get the current commit SHA + tree SHA on main
  const ref = gh(`repos/${REPO}/git/refs/heads/${BRANCH}`)
  const baseCommitSha = ref.object.sha
  console.log(`  base commit:   ${baseCommitSha}`)

  const baseCommit = gh(`repos/${REPO}/git/commits/${baseCommitSha}`)
  const baseTreeSha = baseCommit.tree.sha
  console.log(`  base tree:     ${baseTreeSha}`)

  // 2. Create blobs for each file
  const treeEntries = []
  for (const f of FILES) {
    const content = readFileSync(f.local, 'utf8')
    const blob = gh(`repos/${REPO}/git/blobs`, {
      method: 'POST',
      body: { content, encoding: 'utf-8' },
    })
    treeEntries.push({
      path: f.remote,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    })
    console.log(`  blob ${blob.sha.slice(0, 8)}  ${f.remote}`)
  }

  // 3. Create a new tree based on baseTree + the new entries
  const newTree = gh(`repos/${REPO}/git/trees`, {
    method: 'POST',
    body: { base_tree: baseTreeSha, tree: treeEntries },
  })
  console.log(`  new tree:      ${newTree.sha}`)

  // 4. Create a commit pointing to the new tree
  const newCommit = gh(`repos/${REPO}/git/commits`, {
    method: 'POST',
    body: { message: COMMIT_MESSAGE, tree: newTree.sha, parents: [baseCommitSha] },
  })
  console.log(`  new commit:    ${newCommit.sha}`)

  // 5. Update the branch ref
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
