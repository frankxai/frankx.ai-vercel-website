#!/usr/bin/env node
/**
 * sync-observatory-catalog.mjs
 *
 * Keeps public/observatory/catalog.json (the data behind /observatory) fresh.
 *
 * The catalog is GENERATED in the ACOS repo (agentic-creator-os), which is not
 * available at Vercel build time — so a snapshot is committed here. This script:
 *   - if ACOS_REPO_PATH points at a local ACOS checkout, regenerates the catalog
 *     there and copies it in (use when agents/skills change);
 *   - otherwise verifies the committed snapshot exists (no-op, build-safe).
 *
 * Usage:
 *   ACOS_REPO_PATH=/path/to/agentic-creator-os node scripts/sync-observatory-catalog.mjs
 *   node scripts/sync-observatory-catalog.mjs            # verify-only
 */

import { existsSync, copyFileSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

const DEST = join(process.cwd(), 'public/observatory/catalog.json')
const ACOS = process.env.ACOS_REPO_PATH

function verify() {
  if (!existsSync(DEST)) {
    console.error(`✗ ${DEST} missing and no ACOS_REPO_PATH to regenerate from.`)
    process.exit(1)
  }
  const c = JSON.parse(readFileSync(DEST, 'utf8'))
  if (!Array.isArray(c.nodes) || c.nodes.length === 0) {
    console.error('✗ committed catalog is empty or malformed.')
    process.exit(1)
  }
  console.log(`✓ catalog snapshot OK — ${c.nodes.length} nodes (${JSON.stringify(c.counts)})`)
}

if (ACOS && existsSync(ACOS)) {
  const gen = join(ACOS, 'scripts/build-catalog.mjs')
  const src = join(ACOS, 'tools/observatory/public/catalog.json')
  if (existsSync(gen)) {
    console.log(`↻ regenerating catalog from ${ACOS} …`)
    execFileSync('node', [gen], { stdio: 'inherit' })
    copyFileSync(src, DEST)
    console.log(`✓ copied fresh catalog → ${DEST}`)
  } else {
    console.warn(`! ACOS_REPO_PATH set but generator not found at ${gen}; verifying snapshot.`)
  }
}

verify()
