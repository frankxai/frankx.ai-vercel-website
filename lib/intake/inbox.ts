import type { InboxPaths } from './types'
import { captureTypes } from './capture-types'

// Source-of-truth for filesystem paths and the canonical _inbox/ schema.
// Used by:
//   - scripts/init-inbox.mjs (creates the dirs)
//   - scripts/intake-watcher.mjs (watches them)
//   - content-intake-classifier agent (reads them)
//   - /admin/inbox dashboard (queries them, W22)

// ──────────────────────────────────────────────────────────────────────────
// Canonical paths
// ──────────────────────────────────────────────────────────────────────────
//
// On Windows: C:\Users\frank\_inbox\ etc.
// On WSL/Linux: /mnt/c/Users/frank/_inbox/ etc.
// In Node, derive from os.homedir() — works on both.

export function getInboxPaths(home: string): InboxPaths {
  return {
    root: `${home}/_inbox`,
    archive: `${home}/_archive`,
    staging: 'content/staging', // relative to repo root
    dropped: `${home}/_inbox/dropped`,
  }
}

// ──────────────────────────────────────────────────────────────────────────
// The canonical _inbox/ filesystem schema
// ──────────────────────────────────────────────────────────────────────────

export interface InboxDirSpec {
  relativePath: string // relative to _inbox/ root
  purpose: string
  watchedByDaemon: boolean
}

export const inboxSchema: InboxDirSpec[] = [
  {
    relativePath: 'dropped/',
    purpose:
      'First-touch drop zone. Tasker writes here when mime-type cannot be inferred on the phone. The watcher daemon mime-classifies and moves to the right typed subfolder.',
    watchedByDaemon: true,
  },
  ...captureTypes
    .filter((c) => c.id !== 'unknown')
    .map((c) => ({
      relativePath: c.inboxSubpath,
      purpose: `Typed inbox for ${c.label.toLowerCase()} captures. Files here are ready for classifier.`,
      watchedByDaemon: true,
    })),
  {
    relativePath: 'unknown/',
    purpose:
      'Punt bucket. Classifier moves here when type cannot be inferred from content. Surface to operator for manual classification.',
    watchedByDaemon: false,
  },
]

// ──────────────────────────────────────────────────────────────────────────
// Archive rules (Q3 decision)
// ──────────────────────────────────────────────────────────────────────────
//
// After a batch ships:
//   source files move from _inbox/<type>/<date>/<file>
//   to _archive/<year>/<month>/<batch-id>/<file>
//
// Originals stay searchable forever. _inbox/ stays fast and clean.

export function archivePathFor(
  archiveRoot: string,
  batchId: string,
  capturedAtIso: string,
): string {
  const d = new Date(capturedAtIso)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${archiveRoot}/${year}/${month}/${batchId}`
}

// ──────────────────────────────────────────────────────────────────────────
// Batch ID generation
// ──────────────────────────────────────────────────────────────────────────
//
// Format: YYYY-MM-DD-<short-slug>
// Slug from the dominant subject of the batch, or "untitled" fallback.

export function batchId(date: Date, slug: string): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const cleanSlug = (slug || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 40)
  return `${year}-${month}-${day}-${cleanSlug}`
}

// ──────────────────────────────────────────────────────────────────────────
// Time-window for batching (Q2 decision)
// ──────────────────────────────────────────────────────────────────────────
//
// Files captured within this window of each other become a single batch.

export const BATCH_WINDOW_MINUTES = 10

// ──────────────────────────────────────────────────────────────────────────
// Watcher daemon config
// ──────────────────────────────────────────────────────────────────────────

export const WATCHER_CONFIG = {
  // How long to wait after a file lands before classifying.
  // Lets Syncthing finish replicating large files.
  debounceMs: 3000,

  // How long the daemon waits for a follow-up file to form a batch.
  batchAssemblyMs: 5 * 60 * 1000, // 5 min

  // Marker file the daemon drops to signal "pending classification".
  // SessionStart hook reads this.
  pendingMarkerPath: '_inbox/.pending-classification.json',

  // Lock file so two watcher instances don't fight.
  lockfilePath: '_inbox/.watcher.lock',
}
