#!/usr/bin/env node
/**
 * ACOS Catalog Gate Auditor
 * Reads data/acos/agents.ts, computes honest gates per shipped slot, prints JSON map.
 * Run: node scripts/acos-audit-gates.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const AGENTS_DIR = path.join(ROOT, '.claude', 'agents')
const COMMANDS_DIR = path.join(ROOT, '.claude', 'commands')
const SKILLS_DIR = path.join(ROOT, '.claude', 'skills')
const FIXTURES_DIR = path.join(ROOT, 'tests', 'fixtures')
const CATALOG = path.join(ROOT, 'data', 'acos', 'agents.ts')

// Builtin Anthropic-provided agents — dispatchable by virtue of being in the catalog
const BUILTIN_AGENTS = new Set([
  'Master Story Architect',
  'Character Psychologist',
  'World Architect',
  'Developmental Editor',
  'Line Editor',
  'Research Librarian',
  'Publishing Strategist',
])

// Pillar → top-level orchestrator agent file(s). If any orchestrator references the slot ref/name,
// the slot's `composed` gate lights.
const PILLAR_ORCHESTRATORS = {
  content: ['aco-router.md', 'content-publishing-orchestrator.md'],
  music: ['music-producer.md', 'music-release-manager.md'],
  visuals: ['visual-design-gods.md'],
  books: ['book-author-team.md'],
  workshops: ['workshop-orchestrator.md'],
  research: ['research-orchestrator.md'],
  products: [],   // pending
  business: [],   // pending
  personal: [],   // pending
  community: [],  // pending
  meta: ['meta-acos-router.md'],
}

// Pillars that are non-emitting (don't produce public-facing content) — exempt from brand_gated
const NON_EMITTING_PILLARS = new Set(['meta', 'research'])

function fileExists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function dispatchable(slot) {
  if (BUILTIN_AGENTS.has(slot.ref)) return true
  if (slot.kind === 'mcp') return true  // MCP slots dispatchable if connected (assumed for shipped)
  if (!slot.ref) return false
  // command refs start with /
  if (slot.ref.startsWith('/')) {
    const cmd = slot.ref.replace(/^\//, '')
    return fileExists(path.join(COMMANDS_DIR, `${cmd}.md`))
  }
  // agent refs: .claude/agents/<ref>.md
  if (fileExists(path.join(AGENTS_DIR, `${slot.ref}.md`))) return true
  // skill refs: .claude/skills/<ref>/SKILL.md
  if (fileExists(path.join(SKILLS_DIR, slot.ref, 'SKILL.md'))) return true
  return false
}

function tested(slot) {
  if (!slot.ref) return false
  const refKey = slot.ref.replace(/^\//, '').replace(/\s+/g, '-').toLowerCase()
  return fileExists(path.join(FIXTURES_DIR, refKey)) ||
         fileExists(path.join(FIXTURES_DIR, refKey, 'smoke.mjs')) ||
         fileExists(path.join(FIXTURES_DIR, `${refKey}.smoke.mjs`))
}

function composed(slot, pillarId) {
  const orchestrators = PILLAR_ORCHESTRATORS[pillarId] || []
  if (!orchestrators.length) return false
  for (const orchFile of orchestrators) {
    const fp = path.join(AGENTS_DIR, orchFile)
    if (!fileExists(fp)) continue
    const content = fs.readFileSync(fp, 'utf8')
    // Match either the ref directly, the @-prefixed ref, or the name
    if (slot.ref && content.includes(slot.ref)) return true
    if (slot.ref && content.includes(`@${slot.ref}`)) return true
    if (slot.name && content.includes(slot.name)) return true
  }
  return false
}

function brandGated(slot, pillarId) {
  // Non-emitting pillars (meta, research) are exempt — output isn't public content
  if (NON_EMITTING_PILLARS.has(pillarId)) return true
  // MCP and command slots aren't agents — brand_gated only meaningful for agent slots
  if (slot.kind !== 'agent') return false
  if (BUILTIN_AGENTS.has(slot.ref)) return false  // builtins don't run through our voice gate
  if (!slot.ref) return false
  const fp = path.join(AGENTS_DIR, `${slot.ref}.md`)
  if (!fileExists(fp)) return false
  const content = fs.readFileSync(fp, 'utf8')
  // Brand-gated if agent file references integrity-guard, brand-architect, or frankx-voice
  return /integrity-guard|brand-architect|frankx-voice|brand-gate|brand_gate/i.test(content)
}

// Parse catalog data — extract pillars + slots via simple regex (TS module parsing is overkill)
function parseCatalog() {
  const src = fs.readFileSync(CATALOG, 'utf8')
  const pillars = []
  const pillarRegex = /\{\s*id:\s*'([^']+)',\s*number:\s*(\d+),\s*title:\s*'([^']+)',[\s\S]*?specialists:\s*\[([\s\S]*?)\],\s*\}/g
  let m
  while ((m = pillarRegex.exec(src))) {
    const [, id, num, title, specBlock] = m
    const slots = []
    const slotRegex = /\{\s*name:\s*'([^']+)',\s*kind:\s*'([^']+)',\s*ref:\s*'([^']*?)',\s*status:\s*'([^']+)'/g
    let s
    while ((s = slotRegex.exec(specBlock))) {
      slots.push({ name: s[1], kind: s[2], ref: s[3], status: s[4] })
    }
    pillars.push({ id, number: Number(num), title, slots })
  }
  return pillars
}

function audit() {
  const pillars = parseCatalog()
  const result = {}
  let totalSlots = 0
  let shippedCount = 0
  let gatesByCount = { dispatchable: 0, tested: 0, composed: 0, brand_gated: 0 }
  let totalScore = 0

  for (const p of pillars) {
    result[p.id] = { title: p.title, slots: [] }
    for (const slot of p.slots) {
      totalSlots++
      if (slot.status === 'shipped') shippedCount++
      const gates = {
        dispatchable: dispatchable(slot),
        tested: tested(slot),
        composed: composed(slot, p.id),
        brand_gated: brandGated(slot, p.id),
      }
      let score = 0
      if (slot.status === 'shipped') {
        if (gates.dispatchable) score += 0.25
        if (gates.tested) score += 0.25
        if (gates.composed) score += 0.25
        if (gates.brand_gated) score += 0.25
      }
      totalScore += score
      result[p.id].slots.push({ ...slot, gates, score })
      if (slot.status === 'shipped') {
        if (gates.dispatchable) gatesByCount.dispatchable++
        if (gates.tested) gatesByCount.tested++
        if (gates.composed) gatesByCount.composed++
        if (gates.brand_gated) gatesByCount.brand_gated++
      }
    }
  }

  result._summary = {
    totalSlots,
    shippedCount,
    gatesByCount,
    totalScore,
    catalogLevel: Math.floor((totalScore / totalSlots) * 100),
  }
  return result
}

const result = audit()
console.log(JSON.stringify(result, null, 2))
