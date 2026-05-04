#!/usr/bin/env node
// prebuild-cache.mjs — fingerprint-based cache for the 7-script prebuild chain.
// Skips the chain when none of its inputs (content/, data/, public/images/, generator scripts) changed.
// Vercel persists .next/cache/ between deploys on the same branch — the fingerprint lives there.
//
// Bypass with FORCE_REBUILD=1 (CI) or `npm run prebuild:force` (manual).

import { spawnSync } from 'child_process'
import { createHash } from 'crypto'
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'fs'
import { join, relative } from 'path'

const ROOT = process.cwd()
const CACHE_DIR = join(ROOT, '.next', 'cache')
const FINGERPRINT_FILE = join(CACHE_DIR, 'prebuild-fingerprint.txt')
const SUMMARY_FILE = join(CACHE_DIR, 'prebuild-summary.json')

// Inputs that, if changed, require regeneration.
// Hash mtime+size of every file in these dirs (faster than reading full content for 1+ GB).
const INPUT_DIRS = [
  'content',
  'data',
  'public/images',
]

// Generator scripts themselves are inputs — if a generator changes, re-run.
const INPUT_FILES_GLOB = [
  'scripts/generate_interlinked_html.mjs',
  'scripts/generate_feed.mjs',
  'scripts/generate_search_index.mjs',
  'scripts/generate-youtube-index.mjs',
  'scripts/generate-content-index.mjs',
  'scripts/generate-vault-manifest.mjs',
  'scripts/generate-blog-heroes.mjs',
]

// Skip these dirnames during walks (defense in depth — input dirs above shouldn't contain them).
const SKIP_DIRS = new Set(['node_modules', '.git', '.next', '.cache', '.DS_Store'])

// Delegate to the repo's `prebuild:force` script. Each repo defines its own
// generator chain there. This makes the cache wrapper portable across repos
// (FrankX dev with 7 generators + the production repo with 3) without
// hardcoding either chain here. If `prebuild:force` is missing, the run fails
// fast with a clear npm error.
const PREBUILD_COMMAND = 'npm run prebuild:force'

function* walk(dir) {
  if (!existsSync(dir)) return
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name) || ent.name.startsWith('.')) continue
    const full = join(dir, ent.name)
    if (ent.isDirectory()) yield* walk(full)
    else if (ent.isFile()) yield full
  }
}

function fingerprint() {
  const hash = createHash('sha256')
  let fileCount = 0
  let totalBytes = 0

  for (const dir of INPUT_DIRS) {
    const abs = join(ROOT, dir)
    for (const file of walk(abs)) {
      const st = statSync(file)
      hash.update(`${relative(ROOT, file)}\0${st.size}\0${st.mtimeMs}\n`)
      fileCount += 1
      totalBytes += st.size
    }
  }

  for (const rel of INPUT_FILES_GLOB) {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) continue
    const content = readFileSync(abs)
    hash.update(`${rel}\0`)
    hash.update(content)
    fileCount += 1
    totalBytes += content.length
  }

  return {
    digest: hash.digest('hex'),
    fileCount,
    totalBytes,
  }
}

function readPrior() {
  try {
    return readFileSync(FINGERPRINT_FILE, 'utf8').trim()
  } catch {
    return null
  }
}

function writeCache(fp) {
  mkdirSync(CACHE_DIR, { recursive: true })
  writeFileSync(FINGERPRINT_FILE, fp.digest)
  writeFileSync(
    SUMMARY_FILE,
    JSON.stringify(
      {
        digest: fp.digest,
        fileCount: fp.fileCount,
        totalBytes: fp.totalBytes,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  )
}

function main() {
  const force = process.env.FORCE_REBUILD === '1'
  const start = Date.now()

  if (force) {
    console.log('[prebuild-cache] FORCE_REBUILD=1 set — bypassing cache.')
  } else {
    const fp = fingerprint()
    const prior = readPrior()
    if (prior && prior === fp.digest) {
      const ms = Date.now() - start
      console.log(
        `[prebuild-cache] HIT — fingerprint ${fp.digest.slice(0, 12)}… (${fp.fileCount} files, ${(fp.totalBytes / 1024 / 1024).toFixed(0)} MB) — skipped 7 generators in ${ms}ms.`,
      )
      return
    }
    console.log(
      `[prebuild-cache] MISS — running 7 generators (${fp.fileCount} input files, ${(fp.totalBytes / 1024 / 1024).toFixed(0)} MB).`,
    )
  }

  // Run the original prebuild chain.
  const result = spawnSync(PREBUILD_COMMAND, {
    shell: true,
    stdio: 'inherit',
    cwd: ROOT,
  })
  if (result.status !== 0) {
    console.error('[prebuild-cache] generators failed — not writing cache.')
    process.exit(result.status ?? 1)
  }

  // Re-fingerprint AFTER generation (some generators write into data/ which is an input).
  // This means next build sees a stable digest if nothing meaningful changed upstream.
  const after = fingerprint()
  writeCache(after)
  const ms = Date.now() - start
  console.log(
    `[prebuild-cache] WROTE fingerprint ${after.digest.slice(0, 12)}… (${after.fileCount} files) in ${ms}ms.`,
  )
}

main()
