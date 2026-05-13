#!/usr/bin/env node
/**
 * scripts/intake-watcher.mjs
 *
 * L0/L1 → L2 boundary daemon.
 *
 * Watches ~/_inbox/dropped/ for new files arriving from Syncthing-Android,
 * mime-sorts them into typed subfolders, and maintains the pending-classification
 * queue that the SessionStart hook reads.
 *
 * Spec: docs/superpowers/specs/2026-05-13-content-ops-architecture.md §L1
 *
 * Usage:
 *   node scripts/intake-watcher.mjs              # start
 *   node scripts/intake-watcher.mjs --status     # check if running
 *   node scripts/intake-watcher.mjs --stop       # graceful shutdown
 *
 * Persistence (Windows):
 *   See docs/ops/ANDROID-INTAKE-SETUP.md §7 for Task Scheduler / NSSM / PM2 setup.
 *
 * Why Node fs.watch (not chokidar):
 *   - Single-folder watch, single platform — fs.watch is sufficient
 *   - No npm dependency (script must run on cold machine with just node)
 *   - Faster startup, lower memory
 */

import { promises as fs, watch, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

// ─────────────────────────────────────────────────────────────────────────
// Substrate mirror — stays in sync with lib/intake/inbox.ts +
// lib/intake/capture-types.ts. Hard-coded here because the watcher must
// run with zero npm deps (cold machine, fresh clone).
// ─────────────────────────────────────────────────────────────────────────

const DEBOUNCE_MS = 3000 // wait for Syncthing to finish replicating
const LOG_MAX_BYTES = 5 * 1024 * 1024 // 5MB rotation
const POLL_INTERVAL_MS = 500 // file-stable check

// extension → subpath mapping (canonical from lib/intake/capture-types.ts)
const EXT_MAP = {
  // voice / audio
  '.m4a': 'voice',
  '.mp3': 'voice', // fallback — disambiguated to music/track when in music share intent
  '.wav': 'voice',
  '.ogg': 'voice',
  '.opus': 'voice',
  '.aiff': 'music/track',
  '.aif': 'music/track',
  '.flac': 'music/track',

  // video
  '.mp4': 'video/talking-head', // operator may reclassify; default is most common
  '.mov': 'video/talking-head',
  '.mkv': 'video/talking-head',
  '.webm': 'video/talking-head',

  // images
  '.jpg': 'image/utility',
  '.jpeg': 'image/utility',
  '.png': 'image/utility',
  '.webp': 'image/utility',
  '.heic': 'image/utility',
  '.heif': 'image/utility',
  '.svg': 'diagram',
  '.excalidraw': 'diagram',
  '.drawio': 'diagram',

  // documents
  '.pdf': 'document',
  '.md': 'document',
  '.txt': 'quote',
  '.doc': 'document',
  '.docx': 'document',
}

// ─────────────────────────────────────────────────────────────────────────
// Setup
// ─────────────────────────────────────────────────────────────────────────

const home = os.homedir()
const INBOX_ROOT = path.join(home, '_inbox')
const DROPPED = path.join(INBOX_ROOT, 'dropped')
const PENDING_QUEUE = path.join(INBOX_ROOT, '.pending-classification.json')
const LOCKFILE = path.join(INBOX_ROOT, '.watcher.lock')
const LOGFILE = path.join(INBOX_ROOT, '.watcher.log')

// ─────────────────────────────────────────────────────────────────────────
// Logging
// ─────────────────────────────────────────────────────────────────────────

function log(...args) {
  const line = `[${new Date().toISOString()}] ${args.join(' ')}`
  console.log(line)
  try {
    // simple log rotation
    if (existsSync(LOGFILE)) {
      const stats = readFileSync(LOGFILE, 'utf8').length
      if (stats > LOG_MAX_BYTES) {
        writeFileSync(LOGFILE.replace('.log', '.log.old'), readFileSync(LOGFILE, 'utf8'))
        writeFileSync(LOGFILE, '')
      }
    }
    writeFileSync(LOGFILE, line + '\n', { flag: 'a' })
  } catch (e) {
    // best-effort
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Lockfile (single-instance)
// ─────────────────────────────────────────────────────────────────────────

function acquireLock() {
  if (existsSync(LOCKFILE)) {
    const existing = readFileSync(LOCKFILE, 'utf8')
    log(`Lockfile exists (PID ${existing}). Refusing to start a second watcher.`)
    log(`If you are sure the previous watcher is dead, delete: ${LOCKFILE}`)
    process.exit(2)
  }
  writeFileSync(LOCKFILE, String(process.pid))
  log('Lock acquired. PID:', process.pid)
}

function releaseLock() {
  try {
    if (existsSync(LOCKFILE)) {
      const pid = readFileSync(LOCKFILE, 'utf8')
      if (pid === String(process.pid)) {
        require('node:fs').unlinkSync(LOCKFILE)
      }
    }
  } catch (e) {}
}

process.on('SIGINT', () => {
  log('SIGINT received. Releasing lock.')
  releaseLock()
  process.exit(0)
})
process.on('SIGTERM', () => {
  log('SIGTERM received. Releasing lock.')
  releaseLock()
  process.exit(0)
})
process.on('exit', releaseLock)

// ─────────────────────────────────────────────────────────────────────────
// Pending queue management
// ─────────────────────────────────────────────────────────────────────────

function readQueue() {
  try {
    return JSON.parse(readFileSync(PENDING_QUEUE, 'utf8'))
  } catch (e) {
    return { version: 1, pending: [], updatedAt: new Date().toISOString() }
  }
}

function writeQueue(queue) {
  queue.updatedAt = new Date().toISOString()
  writeFileSync(PENDING_QUEUE, JSON.stringify(queue, null, 2))
}

function addToQueue(entry) {
  const queue = readQueue()
  queue.pending.push(entry)
  writeQueue(queue)
}

// ─────────────────────────────────────────────────────────────────────────
// File handling
// ─────────────────────────────────────────────────────────────────────────

async function isFileStable(filePath) {
  // Returns true if the file size hasn't changed for POLL_INTERVAL_MS
  try {
    const stat1 = await fs.stat(filePath)
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
    const stat2 = await fs.stat(filePath)
    return stat1.size === stat2.size && stat1.size > 0
  } catch (e) {
    return false // file may have been moved/deleted
  }
}

function dateStamp() {
  const d = new Date()
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

async function sortFile(filename) {
  const src = path.join(DROPPED, filename)
  const ext = path.extname(filename).toLowerCase()
  const subpath = EXT_MAP[ext] || 'unknown'

  const targetDir = path.join(INBOX_ROOT, subpath, dateStamp())
  await fs.mkdir(targetDir, { recursive: true })
  const target = path.join(targetDir, filename)

  // Avoid overwriting an existing file
  let finalTarget = target
  if (existsSync(target)) {
    const base = path.basename(filename, ext)
    const ts = Date.now()
    finalTarget = path.join(targetDir, `${base}-${ts}${ext}`)
  }

  try {
    await fs.rename(src, finalTarget)
    log(`Sorted: ${filename} → ${subpath}/${path.basename(finalTarget)}`)

    addToQueue({
      path: finalTarget,
      capturedAt: new Date().toISOString(),
      inferredSubpath: subpath,
      originalDropName: filename,
    })
    return finalTarget
  } catch (e) {
    log(`Sort failed for ${filename}:`, e.message)
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Watch loop with debounce
// ─────────────────────────────────────────────────────────────────────────

const debounceMap = new Map() // filename → timeout

async function handleNewFile(filename) {
  // Skip hidden files (Syncthing sync-conflict, .stignore, etc.)
  if (filename.startsWith('.')) return
  if (filename.endsWith('.tmp')) return
  if (filename.includes('sync-conflict')) {
    log(`Sync conflict detected: ${filename} (left in dropped/ for operator review)`)
    return
  }

  // Debounce — wait DEBOUNCE_MS then check stability
  if (debounceMap.has(filename)) clearTimeout(debounceMap.get(filename))

  const timer = setTimeout(async () => {
    debounceMap.delete(filename)
    const filePath = path.join(DROPPED, filename)
    if (!existsSync(filePath)) return // moved/deleted during debounce

    const stable = await isFileStable(filePath)
    if (!stable) {
      log(`File still changing, retrying: ${filename}`)
      handleNewFile(filename) // re-debounce
      return
    }

    await sortFile(filename)
  }, DEBOUNCE_MS)

  debounceMap.set(filename, timer)
}

// ─────────────────────────────────────────────────────────────────────────
// Status / stop subcommands
// ─────────────────────────────────────────────────────────────────────────

function showStatus() {
  if (!existsSync(LOCKFILE)) {
    console.log('Daemon: not running')
    return
  }
  const pid = readFileSync(LOCKFILE, 'utf8').trim()
  console.log(`Daemon: lockfile present (PID ${pid})`)
  console.log(`Lockfile: ${LOCKFILE}`)
  console.log(`Log:      ${LOGFILE}`)
  console.log(`Queue:    ${PENDING_QUEUE}`)

  const queue = readQueue()
  console.log(`Pending classification: ${queue.pending.length} file(s)`)
  if (queue.pending.length > 0) {
    queue.pending.slice(0, 5).forEach((p) => {
      console.log(`  - ${path.basename(p.path)} (${p.inferredSubpath})`)
    })
    if (queue.pending.length > 5) console.log(`  ... and ${queue.pending.length - 5} more`)
  }
}

function stopDaemon() {
  if (!existsSync(LOCKFILE)) {
    console.log('No lockfile. Nothing to stop.')
    return
  }
  const pid = parseInt(readFileSync(LOCKFILE, 'utf8'), 10)
  console.log(`Sending SIGTERM to PID ${pid}...`)
  try {
    process.kill(pid, 'SIGTERM')
    console.log('Sent. Lockfile will be released by signal handler.')
  } catch (e) {
    console.log(`Failed to signal ${pid}: ${e.message}. Removing stale lockfile.`)
    try {
      require('node:fs').unlinkSync(LOCKFILE)
    } catch {}
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  const arg = process.argv[2]

  if (arg === '--status') {
    showStatus()
    return
  }
  if (arg === '--stop') {
    stopDaemon()
    return
  }

  // Sanity: inbox must exist
  if (!existsSync(INBOX_ROOT)) {
    console.error(`Inbox does not exist: ${INBOX_ROOT}`)
    console.error('Run: node scripts/init-inbox.mjs')
    process.exit(1)
  }
  if (!existsSync(DROPPED)) {
    console.error(`Dropped folder missing: ${DROPPED}`)
    console.error('Run: node scripts/init-inbox.mjs')
    process.exit(1)
  }

  acquireLock()
  log(`Watching ${DROPPED}`)
  log(`Pending queue: ${PENDING_QUEUE}`)
  log(`Press Ctrl+C to stop.`)

  // Catch up — process any files already in dropped/ on startup
  const existing = await fs.readdir(DROPPED)
  for (const f of existing) {
    handleNewFile(f)
  }
  if (existing.length > 0) {
    log(`Found ${existing.length} pre-existing file(s) in dropped/, processing...`)
  }

  // Live watch
  const watcher = watch(DROPPED, { persistent: true }, (eventType, filename) => {
    if (!filename) return
    if (eventType === 'rename') {
      // 'rename' fires on both create and delete in fs.watch
      const filePath = path.join(DROPPED, filename)
      if (existsSync(filePath)) {
        handleNewFile(filename)
      }
    }
  })

  // Keep alive
  process.stdin.resume()
}

main().catch((err) => {
  log('Fatal error:', err.message, err.stack)
  releaseLock()
  process.exit(1)
})
