#!/usr/bin/env node
/**
 * Agent description token-budget gate.
 *
 * Claude Code loads EVERY available agent's description into every session's
 * system prompt — project agents (including subdirs), global ~/.claude agents,
 * and plugin agents — against a 15k-token ceiling. The quality audit doesn't
 * measure this; this script does.
 *
 * Token estimate: chars / 4 (conservative for English prose).
 *
 * Usage:
 *   node scripts/agents/description-budget.mjs            # report, exit 1 if > limit
 *   node scripts/agents/description-budget.mjs --top 20   # show heaviest N
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const SKIP_FILES = new Set(['CLAUDE.md', 'README.md', 'PRODUCT_TEAMS.md'])
const LIMIT_TOKENS = 15_000

const topArg = process.argv.indexOf('--top')
const topN = topArg !== -1 ? Number(process.argv[topArg + 1]) || 20 : 20

const SOURCES = [
  { label: 'project', dir: path.join(ROOT, '.claude', 'agents'), recurse: true },
  { label: 'global', dir: path.join(os.homedir(), '.claude', 'agents'), recurse: true },
]

function* walkMd(dir) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walkMd(full)
    else if (entry.isFile() && entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) yield full
  }
}

function extractDescription(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return null
  // description may be single-line or a folded multi-line value
  const lines = m[1].split(/\r?\n/)
  const idx = lines.findIndex((l) => /^description:/.test(l))
  if (idx === -1) return null
  let desc = lines[idx].replace(/^description:\s*/, '')
  // Multi-line: indented continuation lines OR >- / | block scalars
  if (desc === '' || desc === '>-' || desc === '>' || desc === '|' || desc === '|-') {
    desc = ''
    for (let j = idx + 1; j < lines.length; j++) {
      if (/^\S/.test(lines[j])) break
      desc += ' ' + lines[j].trim()
    }
  } else {
    for (let j = idx + 1; j < lines.length; j++) {
      if (/^\s+\S/.test(lines[j]) && !/^\s*-\s/.test(lines[j]) && !/^[a-zA-Z_-]+:/.test(lines[j].trim())) {
        desc += ' ' + lines[j].trim()
      } else break
    }
  }
  return desc.trim()
}

const rows = []
for (const src of SOURCES) {
  for (const file of walkMd(src.dir)) {
    const raw = readFileSync(file, 'utf-8')
    const desc = extractDescription(raw)
    if (desc === null) continue
    rows.push({
      source: src.label,
      name: path.basename(file, '.md'),
      rel: path.relative(src.dir, file),
      chars: desc.length,
      tokens: Math.ceil(desc.length / 4),
    })
  }
}

rows.sort((a, b) => b.tokens - a.tokens)
const total = rows.reduce((s, r) => s + r.tokens, 0)
const bySource = {}
for (const r of rows) bySource[r.source] = (bySource[r.source] || 0) + r.tokens

console.log(`Agent description budget — ${rows.length} agents\n`)
console.log(`Heaviest ${Math.min(topN, rows.length)}:`)
for (const r of rows.slice(0, topN)) {
  console.log(`  ${String(r.tokens).padStart(5)} tok  [${r.source}]  ${r.rel}`)
}
console.log(`\nPer source:`)
for (const [src, t] of Object.entries(bySource)) console.log(`  ${src.padEnd(8)} ${t} tokens`)
console.log(`\nTOTAL: ${total} tokens / ${LIMIT_TOKENS} limit  (${((total / LIMIT_TOKENS) * 100).toFixed(0)}%)`)

if (total > LIMIT_TOKENS) {
  console.log(`\nOVER BUDGET by ${total - LIMIT_TOKENS} tokens.`)
  process.exit(1)
}
console.log(`\nWithin budget (${LIMIT_TOKENS - total} tokens headroom).`)
