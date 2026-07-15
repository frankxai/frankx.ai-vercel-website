#!/usr/bin/env node
// Adaptive scheduling dispatcher — reads acos.adaptive rules from each workflow's
// meta block + latest trajectory record, evaluates rules against actual outcome,
// outputs recommended next cron expression. Designed to run as its own hourly CCR routine.
//
// Reference: docs/ops/ADAPTIVE-SCHEDULING.md

import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const TRAJ_PATH = join(ROOT, 'data', 'workflow-trajectories.jsonl')
const WORKFLOWS_DIR = join(ROOT, '.claude', 'workflows')

const ROUTINE_MAP = {
  'newsletter-friday': 'trig_01X4F2uGyhwnzfzpr5TCArGL',
  'hub-audit-rotation': 'trig_011uKM6EmwCLhMz2FvPuq5v6',
  'research-fanout': 'trig_01LCH3XZ3TTYmWTndi3nNP3J',
  'dependency-audit': 'trig_01X4s5nAzJcLaZgYMg2tc6DE',
  'model-arena-daily': 'trig_01Tc6Lyww8vBHgbRETcrvHcn',
  'research-pulse-daily': 'trig_01DBbFVZt94tKLmcHnkfLQFQ',
}

async function readTrajectories() {
  if (!existsSync(TRAJ_PATH)) return []
  const raw = await readFile(TRAJ_PATH, 'utf8')
  return raw.split('\n').filter(Boolean).map(line => {
    try { return JSON.parse(line) } catch { return null }
  }).filter(Boolean)
}

async function readAdaptive(workflowName) {
  const path = join(WORKFLOWS_DIR, `${workflowName}.js`)
  if (!existsSync(path)) return null
  const src = await readFile(path, 'utf8')
  const marker = 'export const meta = '
  const startIdx = src.indexOf(marker)
  if (startIdx === -1) return null
  let depth = 0, i = startIdx + marker.length, started = false
  for (; i < src.length; i++) {
    if (src[i] === '{') { depth++; started = true }
    else if (src[i] === '}' && started) { depth--; if (depth === 0) { i++; break } }
  }
  try {
    const meta = new Function(`return (${src.slice(startIdx + marker.length, i)})`)()
    return meta.acos?.adaptive ?? null
  } catch { return null }
}

function parseDuration(s) {
  const m = s.match(/^(\d+)(h|d)$/)
  if (!m) return null
  return parseInt(m[1], 10) * (m[2] === 'h' ? 1 : 24)
}

function evaluateRules(rules, ctx) {
  for (const rule of rules) {
    try {
      const fn = new Function(...Object.keys(ctx), `return (${rule.when})`)
      if (fn(...Object.values(ctx))) return rule
    } catch {}
  }
  return null
}

async function processWorkflow(workflowName) {
  const adaptive = await readAdaptive(workflowName)
  if (!adaptive) return { workflowName, status: 'no-adaptive-config' }
  const triggerId = ROUTINE_MAP[workflowName]
  if (!triggerId) return { workflowName, status: 'no-routine-id' }
  const trajectories = await readTrajectories()
  const latest = trajectories
    .filter(t => t.workflow === workflowName)
    .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))[0]
  if (!latest) {
    return { workflowName, triggerId, status: 'cold-start', recommendedIn: adaptive.defaultIn, reason: 'no prior runs' }
  }
  const ctx = {
    criticalCount: latest.lastRun?.criticalCount ?? latest.criticalCount ?? 0,
    highCount: latest.lastRun?.highCount ?? latest.highCount ?? 0,
    doNow: latest.lastRun?.doNow ?? 0,
    findings: latest.findings ?? 0,
  }
  const rule = evaluateRules(adaptive.rules || [], ctx)
  const recommendedIn = rule?.nextIn ?? adaptive.defaultIn
  const reason = rule?.reason ?? 'default cadence'
  const recHours = parseDuration(recommendedIn)
  const minH = parseDuration(adaptive.minIn || '1h')
  const maxH = parseDuration(adaptive.maxIn || '365d')
  const clamped = Math.max(minH, Math.min(maxH, recHours))
  return { workflowName, triggerId, status: 'recommended', recommendedIn, clampedHours: clamped, reason, lastOutcomeContext: ctx }
}

const mode = process.argv[2] ?? 'dry-run'
const workflowFilter = process.argv[3]
const workflows = workflowFilter ? [workflowFilter] : Object.keys(ROUTINE_MAP)

console.log(`\nWorkflow adaptive dispatcher (${mode})\n`)
const results = []
for (const wf of workflows) {
  const r = await processWorkflow(wf)
  results.push(r)
  if (r.status === 'recommended') {
    console.log(`  ${wf}: ${r.recommendedIn} (clamped ${r.clampedHours}h) — ${r.reason}`)
  } else {
    console.log(`  ${wf}: ${r.status}${r.recommendedIn ? ' → ' + r.recommendedIn : ''}`)
  }
}

console.log()
if (mode === 'json') {
  console.log(JSON.stringify(results, null, 2))
}

if (mode === 'apply') {
  console.log('\nApply path requires Anthropic RemoteTrigger API + valid token.')
  console.log('Recommended invocation: inside a CCR routine where RemoteTrigger is available.\n')
}
