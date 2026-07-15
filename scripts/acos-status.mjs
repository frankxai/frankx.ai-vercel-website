#!/usr/bin/env node
/**
 * ACOS Status Cache Generator
 *
 * Computes the L99 score + catalog mix without TypeScript transpile.
 * Writes ~/.acos/status.json + <project>/.acos/status.json so the
 * statusline can render fast (no tsx cold-start per render).
 *
 * Re-run after catalog changes:  node scripts/acos-status.mjs
 * Or wire into a post-commit hook for auto-refresh.
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CATALOG = path.join(ROOT, 'data', 'acos', 'agents.ts')
const AGENTS_DIR = path.join(ROOT, '.claude', 'agents')
const COMMANDS_DIR = path.join(ROOT, '.claude', 'commands')
const SKILLS_DIR = path.join(ROOT, '.claude', 'skills')

function safeReaddir(p) {
  try { return fs.readdirSync(p) } catch { return [] }
}

// ── Count installed artifacts (top-level only, like the statusline expects) ──
function countAgents() {
  return safeReaddir(AGENTS_DIR).filter(f => f.endsWith('.md') && !['CLAUDE.md','README.md','PRODUCT_TEAMS.md'].includes(f)).length
}
function countCommands() {
  return safeReaddir(COMMANDS_DIR).filter(f => f.endsWith('.md') && !['CLAUDE.md','README.md'].includes(f)).length
}
function countSkills() {
  return safeReaddir(SKILLS_DIR).filter(name => {
    const p = path.join(SKILLS_DIR, name)
    try { return fs.statSync(p).isDirectory() } catch { return false }
  }).length
}

// ── Parse catalog (regex, no TS) ──
function parseCatalog() {
  if (!fs.existsSync(CATALOG)) return { pillars: [], gatesByRef: {} }
  const src = fs.readFileSync(CATALOG, 'utf8')

  // Pull GATES_BY_REF block
  const gatesByRef = {}
  const gatesBlockMatch = src.match(/GATES_BY_REF[^=]*=\s*\{([\s\S]*?)\n\}/)
  if (gatesBlockMatch) {
    const gatesBody = gatesBlockMatch[1]
    const gateLineRe = /'([^']+)':\s*\{\s*dispatchable:\s*(true|false),\s*tested:\s*(true|false),\s*composed:\s*(true|false),\s*brand_gated:\s*(true|false)\s*\}/g
    let g
    while ((g = gateLineRe.exec(gatesBody))) {
      gatesByRef[g[1]] = {
        dispatchable: g[2] === 'true',
        tested: g[3] === 'true',
        composed: g[4] === 'true',
        brand_gated: g[5] === 'true',
      }
    }
  }

  // Pull pillars
  const pillars = []
  const pillarRe = /\{\s*id:\s*'([^']+)',\s*number:\s*(\d+),\s*title:\s*'([^']+)',[\s\S]*?specialists:\s*\[([\s\S]*?)\],\s*\}/g
  let pm
  while ((pm = pillarRe.exec(src))) {
    const [, id, num, title, body] = pm
    const slots = []
    const slotRe = /\{\s*name:\s*'([^']+)',\s*kind:\s*'([^']+)',\s*ref:\s*'([^']*?)',\s*status:\s*'([^']+)'/g
    let sm
    while ((sm = slotRe.exec(body))) {
      slots.push({ name: sm[1], kind: sm[2], ref: sm[3], status: sm[4] })
    }
    pillars.push({ id, number: Number(num), title, slots })
  }
  return { pillars, gatesByRef }
}

// ── Compute L99 score (mirror of lib/acos/l99-score.ts) ──
function slotScore(slot, gates) {
  if (slot.status !== 'shipped') return 0
  if (!gates) return 0.25
  let s = 0
  if (gates.dispatchable) s += 0.25
  if (gates.tested) s += 0.25
  if (gates.composed) s += 0.25
  if (gates.brand_gated) s += 0.25
  return s
}

function compute() {
  const { pillars, gatesByRef } = parseCatalog()
  let totalSlots = 0, shipped = 0, inProgress = 0, gap = 0, sumScore = 0
  const pillarMix = []
  for (const p of pillars) {
    let ps = 0, pSh = 0, pIp = 0, pG = 0
    for (const slot of p.slots) {
      totalSlots++
      if (slot.status === 'shipped') { shipped++; pSh++ }
      else if (slot.status === 'in-progress') { inProgress++; pIp++ }
      else { gap++; pG++ }
      const gates = gatesByRef[slot.ref]
      const score = slotScore(slot, gates)
      ps += score
      sumScore += score
    }
    const level = p.slots.length ? Math.floor((ps / p.slots.length) * 100) : 0
    pillarMix.push({ number: p.number, id: p.id, title: p.title, level, shipped: pSh, inProgress: pIp, gap: pG })
  }
  const catalogLevel = totalSlots ? Math.floor((sumScore / totalSlots) * 100) : 0
  return {
    generatedAt: new Date().toISOString(),
    acosVersion: 'v11',
    counts: {
      agentFiles: countAgents(),
      commandFiles: countCommands(),
      skillDirs: countSkills(),
    },
    catalog: {
      level: catalogLevel,
      totalSlots,
      shipped,
      inProgress,
      gap,
      pillars: pillarMix,
    },
  }
}

const status = compute()

// ── Shell-safe key=value emitter (no jq dependency) ──
function toEnv(s) {
  const lines = [
    `ACOS_VERSION='${s.acosVersion}'`,
    `ACOS_CATALOG_LEVEL='${s.catalog.level}'`,
    `ACOS_CATALOG_SHIPPED='${s.catalog.shipped}'`,
    `ACOS_CATALOG_TOTAL='${s.catalog.totalSlots}'`,
    `ACOS_CATALOG_IN_PROGRESS='${s.catalog.inProgress}'`,
    `ACOS_CATALOG_GAP='${s.catalog.gap}'`,
    `ACOS_COUNT_AGENTS='${s.counts.agentFiles}'`,
    `ACOS_COUNT_COMMANDS='${s.counts.commandFiles}'`,
    `ACOS_COUNT_SKILLS='${s.counts.skillDirs}'`,
    `ACOS_PILLAR_LEVELS='${s.catalog.pillars.map(p => p.level).join(' ')}'`,
    `ACOS_PILLAR_SHIPPED='${s.catalog.pillars.map(p => p.shipped).join(' ')}'`,
    `ACOS_GENERATED_AT='${s.generatedAt}'`,
  ]
  return lines.join('\n') + '\n'
}

// Write to project cache
const projectCacheDir = path.join(ROOT, '.acos')
fs.mkdirSync(projectCacheDir, { recursive: true })
fs.writeFileSync(path.join(projectCacheDir, 'status.json'), JSON.stringify(status, null, 2))
fs.writeFileSync(path.join(projectCacheDir, 'status.env'), toEnv(status))

// Write to global cache (so portable statusline finds it from any cwd)
const globalCacheDir = path.join(os.homedir(), '.acos')
fs.mkdirSync(globalCacheDir, { recursive: true })
const globalStatus = { ...status, projectRoot: ROOT }
fs.writeFileSync(path.join(globalCacheDir, 'status.json'), JSON.stringify(globalStatus, null, 2))
fs.writeFileSync(path.join(globalCacheDir, 'status.env'), toEnv(status) + `ACOS_PROJECT_ROOT='${ROOT}'\n`)

// Pretty echo for CLI use
if (process.argv.includes('--print') || process.argv.includes('-p')) {
  console.log(JSON.stringify(status, null, 2))
} else {
  console.log(`ACOS ${status.acosVersion} · L${status.catalog.level} · ${status.catalog.shipped}/${status.catalog.totalSlots} shipped · ${status.counts.agentFiles}a · ${status.counts.commandFiles}c · ${status.counts.skillDirs}s`)
  console.log(`Wrote: ${path.join(projectCacheDir, 'status.json')}`)
  console.log(`Wrote: ${path.join(globalCacheDir, 'status.json')}`)
}
