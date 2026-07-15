#!/usr/bin/env node
/**
 * Frontmatter normalizer for .claude/agents/*.md
 *
 * Fixes the parser-format mismatch found 2026-06-11: agents declaring
 * `tools:` as a YAML list parse fine in Claude Code but read as EMPTY in
 * audit-agent-quality.mjs's line-based parser. Normalizing to the
 * comma-string form satisfies both parsers.
 *
 * Also inserts a missing `model:` field using a tier heuristic:
 *   *-orchestrator / *-conductor / *-council / *-gods / *-team  → opus
 *   everything else                                             → sonnet
 * Every inserted model is reported in a review table — nothing silent.
 *
 * Usage:
 *   node scripts/agents/normalize-frontmatter.mjs --check   # dry run (default)
 *   node scripts/agents/normalize-frontmatter.mjs --write   # apply
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const AGENTS_DIR = path.join(ROOT, '.claude', 'agents')
const SKIP_FILES = new Set(['CLAUDE.md', 'README.md', 'PRODUCT_TEAMS.md'])

const write = process.argv.includes('--write')

const OPUS_NAME_RE = /-(orchestrator|conductor|council|gods|team)$/

function discoverAgents() {
  if (!existsSync(AGENTS_DIR)) return []
  return readdirSync(AGENTS_DIR, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md') && !SKIP_FILES.has(e.name))
    .map((e) => path.join(AGENTS_DIR, e.name))
    .sort()
}

/**
 * Normalize one file's frontmatter. Returns { changed, actions, content }.
 * Only touches the frontmatter block — body untouched.
 */
function normalize(raw, fileName) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return { changed: false, actions: ['no frontmatter block — skip (needs manual rebuild)'] }

  const block = m[1]
  const lines = block.split(/\r?\n/)
  const actions = []
  const out = []
  let i = 0
  let sawModel = false
  let sawTools = false

  while (i < lines.length) {
    const line = lines[i]
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/)

    if (kv && kv[1] === 'model') sawModel = true

    // YAML-list tools: `tools:` with empty value followed by `- item` lines
    if (kv && kv[1] === 'tools' && kv[2].trim() === '') {
      sawTools = true
      const items = []
      let j = i + 1
      while (j < lines.length) {
        const itemMatch = lines[j].match(/^\s+-\s+(.+)$/)
        if (!itemMatch) break
        items.push(itemMatch[1].trim())
        j++
      }
      if (items.length > 0) {
        out.push(`tools: ${items.join(', ')}`)
        actions.push(`tools list → comma string (${items.length} tools)`)
        i = j
        continue
      }
      // `tools:` with nothing under it — leave as-is, flag
      actions.push('tools: declared but empty — needs manual fix')
    } else if (kv && kv[1] === 'tools') {
      sawTools = true
    }

    out.push(line)
    i++
  }

  const name = fileName.replace(/\.md$/, '')
  if (!sawModel) {
    const tier = OPUS_NAME_RE.test(name) ? 'opus' : 'sonnet'
    out.push(`model: ${tier}`)
    actions.push(`model missing → inserted '${tier}'${tier === 'opus' ? ' (orchestrator-name heuristic)' : ''}`)
  }

  if (actions.length === 0) return { changed: false, actions: [], sawTools }

  const newBlock = out.join('\n')
  const content = raw.slice(0, m.index) + `---\n${newBlock}\n---` + raw.slice(m.index + m[0].length)
  return { changed: newBlock !== block || !sawModel, actions, content, sawTools }
}

const files = discoverAgents()
let changedCount = 0
const modelInserts = []

for (const file of files) {
  const fileName = path.basename(file)
  const raw = readFileSync(file, 'utf-8')
  const result = normalize(raw, fileName)
  if (!result.changed) continue
  changedCount++
  console.log(`${write ? 'WRITE' : 'check'}  ${fileName}`)
  for (const a of result.actions) {
    console.log(`         · ${a}`)
    if (a.startsWith('model missing')) modelInserts.push({ file: fileName, action: a })
  }
  if (write && result.content) writeFileSync(file, result.content)
}

console.log(`\n${changedCount}/${files.length} files ${write ? 'normalized' : 'would change'}.`)
if (modelInserts.length > 0) {
  console.log(`\nModel-insert review table (verify tiers are right):`)
  for (const r of modelInserts) console.log(`  ${r.file}  —  ${r.action}`)
}
if (!write && changedCount > 0) console.log(`\nRun with --write to apply.`)
