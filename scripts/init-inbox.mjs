#!/usr/bin/env node
/**
 * scripts/init-inbox.mjs
 *
 * One-time setup: create ~/_inbox/ + ~/_archive/ filesystem according to
 * lib/intake/inbox.ts schema. Idempotent — safe to run multiple times.
 *
 * Run once on the Windows machine before first Syncthing replication:
 *   node scripts/init-inbox.mjs
 *
 * What it creates:
 *   C:\Users\frank\_inbox\
 *   ├── dropped/                       ← first-touch drop zone (Tasker)
 *   ├── voice/<date>/                  ← voice memos
 *   ├── video/talking-head/<date>/     ← talking-head video
 *   ├── video/b-roll/<date>/           ← b-roll video
 *   ├── screen/<date>/                 ← screen recordings
 *   ├── music/track/<date>/            ← finished music
 *   ├── music/seed/<date>/             ← music seed clips
 *   ├── image/hero/<date>/             ← hero photos
 *   ├── image/food/<date>/             ← food photos
 *   ├── image/travel/<date>/           ← travel photos
 *   ├── image/utility/<date>/          ← screenshots, references
 *   ├── document/<date>/               ← PDFs, notes
 *   ├── quote/<date>/                  ← highlighted quotes
 *   ├── diagram/<date>/                ← architecture snaps
 *   ├── unknown/<date>/                ← classifier punt bucket
 *   ├── .pending-classification.json   ← watcher queue (created when first file lands)
 *   ├── .watcher.lock                  ← daemon lockfile (created by watcher)
 *   ├── .watcher.log                   ← daemon log (rotating)
 *   └── README.md                      ← human-facing description of the schema
 *
 *   C:\Users\frank\_archive\
 *   └── <year>/<month>/<batch-id>/     ← created on first ship
 */

import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// Hard-coded substrate mirror — keeps this script dependency-free.
// Stays in sync with lib/intake/capture-types.ts.
const CAPTURE_SUBPATHS = [
  'voice',
  'video/talking-head',
  'video/b-roll',
  'screen',
  'music/track',
  'music/seed',
  'image/hero',
  'image/food',
  'image/travel',
  'image/utility',
  'document',
  'quote',
  'diagram',
  'unknown',
]

const INBOX_README = `# _inbox/

Capture inbox for the Content Operations system.

**Do not commit this directory to Git.** It's intentionally outside any repo.

## Schema

- \`dropped/\` — Tasker writes here when mime is unclear; watcher mime-sorts within ~3s
- \`voice/<date>/\` — voice memos → audio-producer
- \`video/talking-head/<date>/\` — on-camera video → video-producer
- \`video/b-roll/<date>/\` — silent video → video-producer
- \`screen/<date>/\` — screen recordings → screen-producer
- \`music/track/<date>/\` — finished music → music-producer
- \`music/seed/<date>/\` — music seed clips → music-producer
- \`image/hero/<date>/\` — deliberate hero photos → vis-producer
- \`image/food/<date>/\` — restaurant photos → food-producer
- \`image/travel/<date>/\` — location-tagged photos → travel-producer
- \`image/utility/<date>/\` — screenshots, references → vis-producer
- \`document/<date>/\` — PDFs, notes → prose-producer
- \`quote/<date>/\` — highlighted text → prose-producer
- \`diagram/<date>/\` — architecture snaps → screen-producer
- \`unknown/<date>/\` — classifier couldn't infer — operator review needed

## Files at root

- \`.pending-classification.json\` — queue read by SessionStart hook
- \`.watcher.lock\` — single-instance lockfile
- \`.watcher.log\` — rotating log

## Source of truth

\`lib/intake/inbox.ts\` in the FrankX repo defines this schema.

## Archive

After a batch ships, files move to \`~/_archive/<year>/<month>/<batch-id>/\`.

## Spec

\`docs/superpowers/specs/2026-05-13-content-ops-architecture.md\`
`

const ARCHIVE_README = `# _archive/

Shipped batches live here, organized by year/month/batch-id.

Never deleted. Always searchable. Source-of-truth for "what did I publish, and when, and what was the raw capture."

\`<year>/<month>/<batch-id>/\` — one folder per shipped batch.
`

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function writeIfMissing(p, content) {
  try {
    await fs.access(p)
    // exists, leave alone
    return false
  } catch {
    await fs.writeFile(p, content, 'utf8')
    return true
  }
}

async function main() {
  const home = os.homedir()
  const inboxRoot = path.join(home, '_inbox')
  const archiveRoot = path.join(home, '_archive')

  console.log('Initializing inbox at:', inboxRoot)
  console.log('Initializing archive at:', archiveRoot)
  console.log()

  // Create roots
  await ensureDir(inboxRoot)
  await ensureDir(archiveRoot)
  await ensureDir(path.join(inboxRoot, 'dropped'))

  // Create typed subfolders (parent only — date-stamped subfolders are created
  // by the watcher on demand, so we don't end up with empty 2026-05-13/ dirs)
  for (const sub of CAPTURE_SUBPATHS) {
    const subPath = path.join(inboxRoot, sub)
    await ensureDir(subPath)
  }

  // README files
  const wroteInboxReadme = await writeIfMissing(
    path.join(inboxRoot, 'README.md'),
    INBOX_README,
  )
  const wroteArchiveReadme = await writeIfMissing(
    path.join(archiveRoot, 'README.md'),
    ARCHIVE_README,
  )

  // Empty pending queue marker
  const pendingPath = path.join(inboxRoot, '.pending-classification.json')
  const wrotePending = await writeIfMissing(
    pendingPath,
    JSON.stringify({ version: 1, pending: [], updatedAt: new Date().toISOString() }, null, 2),
  )

  console.log('Filesystem:')
  console.log(`  ${inboxRoot}/`)
  console.log(`    dropped/`)
  for (const sub of CAPTURE_SUBPATHS) {
    console.log(`    ${sub}/`)
  }
  console.log(`    .pending-classification.json  ${wrotePending ? '(created)' : '(existed)'}`)
  console.log(`    README.md                     ${wroteInboxReadme ? '(created)' : '(existed)'}`)
  console.log()
  console.log(`  ${archiveRoot}/`)
  console.log(`    README.md                     ${wroteArchiveReadme ? '(created)' : '(existed)'}`)
  console.log()
  console.log('Done.')
  console.log()
  console.log('Next steps:')
  console.log('  1. Install Syncthing-Android on phone. Pair with this machine.')
  console.log(`     Pair folder: <Android>/Syncthing/inbox/  ↔  ${inboxRoot}`)
  console.log('  2. Import Tasker profile from docs/ops/android-tasker-drop-to-frankx.prj.xml')
  console.log('  3. Start the watcher: node scripts/intake-watcher.mjs')
  console.log('  4. Drop a test file. Verify it lands in the right subfolder within ~5s.')
  console.log()
  console.log('Setup guide: docs/ops/ANDROID-INTAKE-SETUP.md')
}

main().catch((err) => {
  console.error('init-inbox failed:', err)
  process.exit(1)
})
