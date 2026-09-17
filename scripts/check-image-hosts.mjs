#!/usr/bin/env node
/**
 * Fail the build when content references a remote image host that
 * next.config.mjs does not allow.
 *
 * Why this exists: /music renders 800+ track covers hotlinked from
 * cdn2.suno.ai. That host was missing from images.remotePatterns, and the
 * failure was silent — next/image only throws "Invalid src prop" in
 * development. A production build emits /_next/image?url=... happily and the
 * optimizer answers every request with 400 INVALID_IMAGE_OPTIMIZE_REQUEST, so
 * the page returns 200 with every cover broken. Nothing in CI, in the build,
 * or in Vercel's runtime error tracking noticed, because no exception is ever
 * thrown.
 *
 * Scope is deliberately narrow to stay near-zero-false-positive: string values
 * under data/ whose *key* names an image (imageUrl, cover, thumbnail, artwork,
 * ...) and whose value is an https URL ending in an image extension. Map tiles,
 * documentation links and API endpoints do not match, and neither do raw <img>
 * tags in components, which never consult remotePatterns.
 *
 * Exit 0 clear, 1 unconfigured host found, 2 could not run.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DATA_DIR = join(ROOT, 'data')
const CONFIG = join(ROOT, 'next.config.mjs')

const IMAGE_KEY = /(image|cover|thumb|thumbnail|artwork|photo|avatar|banner|poster|logo)/i
const IMAGE_URL = /^https:\/\/[^\s"']+\.(png|jpe?g|webp|avif|gif|svg)(\?[^\s"']*)?$/i

/** Turn a remotePatterns pathname glob into a RegExp. `**` spans separators. */
function globToRegExp(glob) {
  let out = ''
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i]
    if (c === '*') {
      if (glob[i + 1] === '*') {
        out += '.*'
        i++
      } else {
        out += '[^/]*'
      }
    } else {
      out += c.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    }
  }
  return new RegExp(`^${out}$`)
}

/**
 * Read remotePatterns out of next.config.mjs textually. The config is an ESM
 * module with build-time conditionals, so importing it here would drag in far
 * more than this check needs.
 */
function readAllowedPatterns() {
  const source = readFileSync(CONFIG, 'utf8')
  const start = source.indexOf('remotePatterns:')
  if (start === -1) throw new Error('remotePatterns not found in next.config.mjs')
  const block = source.slice(start, source.indexOf('\n  },', start))

  const patterns = []
  for (const entry of block.split('{').slice(1)) {
    const hostname = entry.match(/hostname:\s*'([^']+)'/)?.[1]
    if (!hostname) continue
    const pathname = entry.match(/pathname:\s*'([^']+)'/)?.[1]
    patterns.push({ hostname, pathname })
  }
  if (patterns.length === 0) throw new Error('parsed zero remotePatterns entries')
  return patterns
}

function isAllowed(patterns, url) {
  return patterns.some((p) => {
    if (p.hostname !== url.hostname) return false
    if (!p.pathname) return true
    return globToRegExp(p.pathname).test(url.pathname)
  })
}

/** Every image-ish URL string reachable from a parsed JSON value. */
function collectFromJson(value, key, found) {
  if (typeof value === 'string') {
    if (key && IMAGE_KEY.test(key) && IMAGE_URL.test(value)) found.add(value)
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collectFromJson(item, key, found)
    return
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collectFromJson(v, k, found)
  }
}

/** TS/JS data modules: match `imageUrl: 'https://...'` style properties. */
function collectFromSource(text, found) {
  const re = /(\w*(?:image|cover|thumb|thumbnail|artwork|photo|avatar|banner|poster|logo)\w*)\s*:\s*'(https:\/\/[^']+)'/gi
  for (const [, , url] of text.matchAll(re)) {
    if (IMAGE_URL.test(url)) found.add(url)
  }
}

/**
 * Crawler/monitoring snapshots record image URLs observed on other pages —
 * og:image values and the like. Nothing renders them through next/image
 * (app/ops/sites/page.tsx imports no image component), so they are data
 * *about* images rather than images this site serves.
 */
const SKIP_DIRS = new Set(['observability'])


function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

function main() {
  const patterns = readAllowedPatterns()
  const found = new Map() // url -> first file that referenced it

  for (const file of walk(DATA_DIR)) {
    const hits = new Set()
    if (file.endsWith('.json')) {
      let parsed
      try {
        parsed = JSON.parse(readFileSync(file, 'utf8'))
      } catch {
        continue // not our job to police malformed JSON
      }
      collectFromJson(parsed, null, hits)
    } else if (/\.(ts|tsx|js|mjs)$/.test(file)) {
      collectFromSource(readFileSync(file, 'utf8'), hits)
    }
    for (const url of hits) if (!found.has(url)) found.set(url, file)
  }

  const offenders = new Map() // hostname -> { count, sample, file }
  for (const [raw, file] of found) {
    let url
    try {
      url = new URL(raw)
    } catch {
      continue
    }
    if (isAllowed(patterns, url)) continue
    const existing = offenders.get(url.hostname)
    if (existing) existing.count++
    else offenders.set(url.hostname, { count: 1, sample: raw, file })
  }

  if (offenders.size === 0) {
    console.log(
      `[check-image-hosts] ${found.size} remote image reference(s) in data/, all allowed by ${patterns.length} remotePatterns entries ✓`
    )
    return 0
  }

  console.error('[check-image-hosts] remote image hosts referenced but not allowed by next.config.mjs:\n')
  for (const [hostname, { count, sample, file }] of offenders) {
    console.error(`  ${hostname} — ${count} reference(s)`)
    console.error(`    first seen in: ${relative(ROOT, file)}`)
    console.error(`    e.g. ${sample}`)
  }
  console.error(
    '\nnext/image will emit /_next/image?url=... for these and the optimizer will answer\n' +
      '400 INVALID_IMAGE_OPTIMIZE_REQUEST. The page still returns 200, so the art simply\n' +
      'does not load. Add the host to images.remotePatterns in next.config.mjs, or point\n' +
      'the data at a repo-hosted asset.'
  )
  return 1
}

try {
  process.exitCode = main()
} catch (error) {
  console.error(`[check-image-hosts] could not run: ${error.message}`)
  process.exitCode = 2
}
