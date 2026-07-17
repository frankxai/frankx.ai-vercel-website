#!/usr/bin/env node
/**
 * Meta-layer curation audit — scores every skill / command / agent across all homes,
 * flags duplicates + stubs + weak frontmatter, and ranks what to keep vs demote.
 * Deterministic: pure file + regex checks, no LLM calls. Mirrors meta-agent-quality-auditor.
 *
 * Run: node scripts/audit-meta-layer.mjs
 * Out: docs/ops/meta-layer-audit.md  +  docs/ops/meta-layer-audit.json
 */
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, basename } from 'node:path'
import { homedir } from 'node:os'

const HOME = homedir()
const REPO = process.cwd()

// home label → directory. Order matters: earlier = more authoritative for dup reporting.
const HOMES = [
  ['project', join(REPO, '.claude')],
  ['global', join(HOME, '.claude')],
]
const KINDS = ['skills', 'commands', 'agents']

function readFront(file) {
  try {
    const txt = readFileSync(file, 'utf8')
    const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const fm = m ? m[1] : ''
    const name = (fm.match(/^name:\s*(.+)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, '')
    const desc = (fm.match(/^description:\s*(.+)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, '')
    return { txt, hasFront: !!m, name, desc, bytes: txt.length, lines: txt.split('\n').length }
  } catch { return { txt: '', hasFront: false, bytes: 0, lines: 0 } }
}

// resolve the canonical content file for one item
function itemFile(kind, dir, entry) {
  const p = join(dir, entry)
  if (kind === 'skills') {
    if (statSync(p).isDirectory()) return existsSync(join(p, 'SKILL.md')) ? join(p, 'SKILL.md') : null
    return p.endsWith('.md') ? p : null
  }
  // commands + agents are flat .md files
  return p.endsWith('.md') ? p : null
}

function itemName(kind, entry) {
  return basename(entry).replace(/\.md$/, '')
}

const items = [] // {kind, home, name, file, ...flags}
for (const [home, base] of HOMES) {
  for (const kind of KINDS) {
    const dir = join(base, kind)
    if (!existsSync(dir)) continue
    for (const entry of readdirSync(dir)) {
      const file = itemFile(kind, dir, entry)
      if (!file) continue
      const f = readFront(file)
      const name = f.name || itemName(kind, entry)
      const flags = []
      // quality heuristics
      if (kind !== 'commands' && !f.desc) flags.push('no-description')
      if (f.desc && f.desc.length < 30) flags.push('thin-description')
      if (f.bytes < 200) flags.push('stub')
      if (f.lines > 400) flags.push('oversized')
      if (kind === 'agents' && !/tools:/.test(f.txt) && f.hasFront) flags.push('agent-no-tools')
      if (kind !== 'commands' && !f.hasFront) flags.push('no-frontmatter')
      items.push({ kind, home, name: name.toLowerCase(), display: name, file, bytes: f.bytes, lines: f.lines, flags })
    }
  }
}

// duplicate detection: same (kind,name) in >1 home
const byKey = {}
for (const it of items) (byKey[`${it.kind}:${it.name}`] ||= []).push(it)
const dups = Object.entries(byKey).filter(([, v]) => v.length > 1)

// scoring: start 100, subtract per flag; dup across homes is the big one
const PENALTY = { 'no-description': 30, 'thin-description': 15, 'stub': 40, 'oversized': 10, 'agent-no-tools': 10, 'no-frontmatter': 20, 'duplicate-home': 25 }
for (const it of items) {
  if (byKey[`${it.kind}:${it.name}`].length > 1) it.flags.push('duplicate-home')
  it.score = Math.max(0, 100 - it.flags.reduce((s, f) => s + (PENALTY[f] || 0), 0))
  it.bucket = it.score >= 80 ? 'keep' : it.score >= 50 ? 'review' : 'demote'
}

const counts = (arr, key) => arr.reduce((m, x) => ((m[x[key]] = (m[x[key]] || 0) + 1), m), {})
const summary = {
  total: items.length,
  byKind: counts(items, 'kind'),
  byHome: counts(items, 'home'),
  byBucket: counts(items, 'bucket'),
  duplicatePairs: dups.length,
  flagTotals: items.flatMap(i => i.flags).reduce((m, f) => ((m[f] = (m[f] || 0) + 1), m), {}),
}

const demote = items.filter(i => i.bucket === 'demote').sort((a, b) => a.score - b.score)
const out = { generated: process.env.AUDIT_DATE || 'run-date', summary, duplicates: dups.map(([k, v]) => ({ key: k, homes: v.map(x => x.home) })), demote: demote.map(i => ({ kind: i.kind, name: i.display, home: i.home, score: i.score, flags: i.flags })) }

mkdirSync(join(REPO, 'docs/ops'), { recursive: true })
writeFileSync(join(REPO, 'docs/ops/meta-layer-audit.json'), JSON.stringify(out, null, 2))

const md = `# Meta-layer curation audit

_Deterministic scan of every skill / command / agent across project + global homes._

## Summary
- **Total items:** ${summary.total}  (skills ${summary.byKind.skills || 0} · commands ${summary.byKind.commands || 0} · agents ${summary.byKind.agents || 0})
- **By home:** ${Object.entries(summary.byHome).map(([k, v]) => `${k} ${v}`).join(' · ')}
- **Buckets:** keep ${summary.byBucket.keep || 0} · review ${summary.byBucket.review || 0} · **demote ${summary.byBucket.demote || 0}**
- **Duplicate (kind,name) pairs across homes:** ${summary.duplicatePairs}
- **Flag totals:** ${Object.entries(summary.flagTotals).map(([k, v]) => `${k} ${v}`).join(' · ') || 'none'}

## Top demote candidates (lowest score first)
${demote.slice(0, 40).map(i => `- \`${i.kind}/${i.display}\` (${i.home}, score ${i.score}) — ${i.flags.join(', ')}`).join('\n') || '- none'}

## Duplicate names across homes (pick one canonical home)
${dups.slice(0, 50).map(([k, v]) => `- \`${k}\` → ${v.map(x => x.home).join(' + ')}`).join('\n') || '- none'}

<!-- Regenerate: node scripts/audit-meta-layer.mjs · machine-readable: docs/ops/meta-layer-audit.json -->
`
writeFileSync(join(REPO, 'docs/ops/meta-layer-audit.md'), md)
console.log(`Audited ${summary.total} items → keep ${summary.byBucket.keep || 0} / review ${summary.byBucket.review || 0} / demote ${summary.byBucket.demote || 0}`)
console.log(`Duplicate pairs: ${summary.duplicatePairs} · report: docs/ops/meta-layer-audit.md`)
