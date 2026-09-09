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
 * The local check above trusts frontmatter (`status: sent`), which is exactly the
 * kind of process signal that burned this loop before — an agent (or a stale file)
 * can claim `sent` without a real delivery behind it. So this also makes one
 * read-only GET against the Resend API and reports what the provider itself says
 * was actually sent, then flags disagreement instead of picking a winner. Missing
 * credentials fail loudly (status escalates, reason is explicit) rather than being
 * silently skipped — a missing key must never look the same as "verified healthy".
 *
 * Usage: node scripts/newsletter/health.mjs [--json] [--max-days 10]
 * Heartbeat: <starlight>/logs/heartbeats/heartbeat-newsletter.json (HealthWatch reads it)
 */

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import dotenv from 'dotenv'
import { readAllIssues, IDENTITY, REPO_ROOT } from './lib.mjs'

// health.mjs has no framework around it to auto-load .env.local (unlike `next dev`),
// so without this the RESEND_API_KEY check below silently sees nothing and the live
// verification would look "blocked" even when a key is configured locally.
// `quiet: true` matters here: dotenv 17's own banner prints to stdout and would
// corrupt `--json` output for any caller piping this straight into JSON.parse.
dotenv.config({ path: path.join(REPO_ROOT, '.env.local'), quiet: true })

const RESEND_API = 'https://api.resend.com'

/**
 * Read-only. Never posts, never touches /broadcasts/:id/send. Lists broadcasts
 * for the account and reports what Resend itself says has actually gone out,
 * so the check has a source of truth independent of this repo's own frontmatter.
 */
async function fetchResendBroadcastSummary() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    return { verified: false, blocked: true, reason: 'RESEND_API_KEY not set — live delivery cannot be verified against Resend (local-only signal)' }
  }
  try {
    const res = await fetch(`${RESEND_API}/broadcasts`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    const body = await res.json().catch(() => null)
    if (!res.ok || !body) {
      return { verified: false, blocked: true, reason: `Resend API error ${res.status}: ${JSON.stringify(body)}` }
    }
    const list = Array.isArray(body.data) ? body.data : []
    const forThisAudience = IDENTITY.audienceId
      ? list.filter((b) => b.audience_id === IDENTITY.audienceId || b.segment_id === IDENTITY.audienceId)
      : list
    const sent = forThisAudience.filter((b) => b.status === 'sent')
    const latest = sent.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at))[0] || null
    return {
      verified: true,
      blocked: false,
      totalBroadcasts: forThisAudience.length,
      sentCount: sent.length,
      lastBroadcastId: latest?.id ?? null,
      lastBroadcastName: latest?.name ?? null,
      lastBroadcastSentAt: latest?.sent_at ?? null,
    }
  } catch (err) {
    return { verified: false, blocked: true, reason: `Resend API request failed: ${err.message}` }
  }
}

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

// Cross-check the local claim against the provider. A missing key is reported,
// never swallowed — it must never read the same as "verified healthy". Agreement
// upgrades confidence in the local signal; disagreement is the real bug this
// exists to catch (frontmatter says sent/not-sent, Resend disagrees).
const liveResend = await fetchResendBroadcastSummary()

if (liveResend.blocked) {
  reasons.push(`live verification unavailable — ${liveResend.reason}`)
  if (status === 'ok') status = 'warn'
} else if (liveResend.verified) {
  const localSentCount = sent.length
  if (liveResend.sentCount > 0 && localSentCount === 0) {
    status = 'critical'
    reasons.push(
      `Resend reports ${liveResend.sentCount} sent broadcast(s) for this audience (last "${liveResend.lastBroadcastName}" on ${liveResend.lastBroadcastSentAt}) but local frontmatter shows 0 sent — local pipeline state has drifted from actual delivery history`
    )
  } else if (liveResend.sentCount === 0 && localSentCount > 0) {
    status = 'critical'
    reasons.push(`local frontmatter reports ${localSentCount} sent issue(s) but Resend shows 0 sent broadcasts for this audience — a claimed send may not have actually gone out`)
  } else if (latestSent && liveResend.lastBroadcastSentAt) {
    const driftDays = Math.abs((new Date(latestSent.data.sentAt) - new Date(liveResend.lastBroadcastSentAt)) / 86400000)
    if (driftDays > 1) {
      if (status === 'ok') status = 'warn'
      reasons.push(`last-send dates disagree by ${driftDays.toFixed(1)} day(s) — local ${latestSent.data.sentAt}, Resend ${liveResend.lastBroadcastSentAt}`)
    }
  }
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
  liveResend,
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
