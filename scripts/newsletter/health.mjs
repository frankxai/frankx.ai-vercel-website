#!/usr/bin/env node
/**
 * Outcome watchdog for the newsletter.
 *
 * The estate has gates on process (merge:gate, integrity-guard, human gates) but
 * nothing was watching the OUTCOME. Between May and August 2026 the Friday routine
 * reported success 10 weeks running while zero issues reached a subscriber —
 * every gate it passed was a gate on "did the step run", not "did an issue ship".
 *
 * This checks the only fact that matters: how long since an issue actually sent.
 *
 * Usage: node scripts/newsletter/health.mjs [--json] [--max-days 10]
 * Heartbeat: <starlight>/logs/heartbeats/heartbeat-newsletter.json (HealthWatch reads it)
 */

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { readAllIssues } from './lib.mjs'

const args = process.argv.slice(2)
const asJson = args.includes('--json')
// `Number(x) || 10` silently swallowed typos and turned an explicit `0` into 10,
// so an operator could ask for a strict threshold and get a lenient answer.
const maxDaysIdx = args.indexOf('--max-days')
let maxDays = 10
if (maxDaysIdx !== -1) {
  maxDays = Number(args[maxDaysIdx + 1])
  if (!Number.isFinite(maxDays) || maxDays < 0) {
    console.error(`--max-days needs a non-negative number, got ${JSON.stringify(args[maxDaysIdx + 1])}`)
    process.exit(2)
  }
}

const HEARTBEAT = path.join(os.homedir(), 'starlight/logs/heartbeats/heartbeat-newsletter.json')

const issues = readAllIssues()
const sent = issues.filter((i) => i.data.status === 'sent' && i.data.sentAt)
const latestSent = sent.sort((a, b) => new Date(b.data.sentAt) - new Date(a.data.sentAt))[0] || null

const waiting = issues.filter((i) => ['draft', 'staged', 'scheduled'].includes(i.data.status))
const readyToSend = waiting.filter((i) => i.data.gateStatus === 'pass')

const daysSinceSend = latestSent
  ? Math.floor((Date.now() - new Date(latestSent.data.sentAt).getTime()) / 86400000)
  : null

let status = 'ok'
const reasons = []

if (daysSinceSend === null) {
  status = 'critical'
  reasons.push(`no issue has ever sent — ${issues.length} drafted, 0 delivered`)
} else if (daysSinceSend > maxDays) {
  status = 'critical'
  reasons.push(`${daysSinceSend} days since last send (threshold ${maxDays})`)
} else if (daysSinceSend > 7) {
  status = 'warn'
  reasons.push(`${daysSinceSend} days since last send — weekly cadence slipping`)
}

if (readyToSend.length) {
  reasons.push(`${readyToSend.length} gate-passed issue(s) waiting to send: ${readyToSend.map((i) => i.data.issue).join(', ')}`)
}

const report = {
  ts: new Date().toISOString(),
  source: 'newsletter',
  status,
  drafted: issues.length,
  sent: sent.length,
  daysSinceSend,
  lastIssueSent: latestSent ? latestSent.data.issue : null,
  waitingOnGate: waiting.filter((i) => i.data.gateStatus !== 'pass').map((i) => i.data.issue),
  readyToSend: readyToSend.map((i) => i.data.issue),
  reasons,
}

try {
  fs.mkdirSync(path.dirname(HEARTBEAT), { recursive: true })
  fs.writeFileSync(HEARTBEAT, JSON.stringify(report, null, 2))
} catch {
  // Heartbeat is best-effort — a missing starlight dir must not fail the check.
}

if (asJson) {
  console.log(JSON.stringify(report, null, 2))
} else {
  console.log(`newsletter: ${status.toUpperCase()}`)
  console.log(`  drafted ${report.drafted} · sent ${report.sent} · last send ${daysSinceSend === null ? 'never' : daysSinceSend + 'd ago'}`)
  reasons.forEach((r) => console.log(`  - ${r}`))
}

process.exit(status === 'critical' ? 1 : 0)
