#!/usr/bin/env node
/**
 * Delivery for the weekly issue. Four modes, escalating in blast radius:
 *
 *   preview <n>              render only, nothing leaves the machine
 *   test <n> <email>         one email to one address
 *   stage <n>                create a Resend broadcast DRAFT (no send)
 *   send <n> --confirm       send the staged broadcast to the audience
 *
 * `send` is the one external side effect in the pipeline and stays behind an
 * explicit flag plus a passing integrity gate — per the repo hard-stop list,
 * a blast is never automatic.
 *
 * Env: RESEND_API_KEY · RESEND_AUDIENCE_ID · NEWSLETTER_FROM · NEWSLETTER_REPLY_TO
 */

import 'dotenv/config'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderIssue, requirePostal } from './render.mjs'
import { getIssue, updateFrontmatter, IDENTITY } from './lib.mjs'

const API = 'https://api.resend.com'
const HERE = path.dirname(fileURLToPath(import.meta.url))

/**
 * `gateStatus: pass` is a mutable field in a file anyone can edit — including the
 * agent that just drafted it. Between approval and send the MDX can change, and
 * the send path deliberately re-renders current bytes, so the gate would be
 * approving content nobody reviewed. Re-run the deterministic validator against
 * the actual file immediately before any irreversible call.
 */
function revalidate(n) {
  try {
    execFileSync(process.execPath, [path.join(HERE, 'validate.mjs'), String(n)], {
      encoding: 'utf8',
      stdio: 'pipe',
    })
  } catch (err) {
    console.error(`Validation failed for issue ${n} — refusing to proceed.\n`)
    console.error(err.stdout || err.message)
    process.exit(1)
  }
}

function requireKey() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('RESEND_API_KEY not set — export it or put it in .env.local')
    process.exit(1)
  }
  return key
}

async function resend(pathname, init = {}) {
  const res = await fetch(`${API}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${requireKey()}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(body)}`)
  return body
}

/**
 * Resend renamed Audiences to Segments; the current /broadcasts docs list
 * `segment_id` as required and no longer document `audience_id`, but the estate
 * (including /api/subscribe) is still on the legacy audience model and the
 * migration guide is silent on whether broadcasts still accept the old key.
 * Try the documented field, fall back once, and say which one worked — this is
 * not a hypothetical back-compat branch, it is an unresolved API question that
 * would otherwise surface for the first time mid-send.
 */
async function createBroadcast(n) {
  const { issue, html, text } = renderIssue(n)
  const base = {
    from: IDENTITY.from,
    reply_to: IDENTITY.replyTo,
    subject: issue.subject,
    html,
    text,
    name: `Issue ${issue.issue} — ${issue.subject}`,
  }

  try {
    const b = await resend('/broadcasts', {
      method: 'POST',
      body: JSON.stringify({ segment_id: IDENTITY.audienceId, ...base }),
    })
    return { issue, broadcastId: b.id, keyUsed: 'segment_id' }
  } catch (err) {
    if (!/4\d\d/.test(String(err.message))) throw err
    console.log('segment_id rejected — retrying with legacy audience_id')
    const b = await resend('/broadcasts', {
      method: 'POST',
      body: JSON.stringify({ audience_id: IDENTITY.audienceId, ...base }),
    })
    return { issue, broadcastId: b.id, keyUsed: 'audience_id' }
  }
}

const [mode, num, ...rest] = process.argv.slice(2)

if (!mode || !num) {
  console.log(`Usage:
  node scripts/newsletter/send.mjs preview <n>
  node scripts/newsletter/send.mjs test <n> <email>
  node scripts/newsletter/send.mjs stage <n>
  node scripts/newsletter/send.mjs send <n> --confirm`)
  process.exit(1)
}

const issue = getIssue(num)
if (!issue) {
  console.error(`Issue ${num} not found in content/newsletters/issues/`)
  process.exit(1)
}

if (mode === 'preview') {
  const out = renderIssue(num)
  console.log(`Preview written:\n  ${out.htmlPath}\n  ${out.textPath}`)
  console.log(`From: ${out.from}   Reply-to: ${IDENTITY.replyTo}`)
  process.exit(0)
}

if (mode === 'test') {
  requirePostal()
  const to = rest[0] || process.env.NEWSLETTER_TEST_EMAIL
  if (!to) {
    console.error('Usage: send.mjs test <n> <email>')
    process.exit(1)
  }
  const { issue: data, html, text } = renderIssue(num)
  const sent = await resend('/emails', {
    method: 'POST',
    body: JSON.stringify({
      from: IDENTITY.from,
      reply_to: IDENTITY.replyTo,
      to,
      subject: `[TEST] ${data.subject}`,
      html: html.replace('{{{RESEND_UNSUBSCRIBE_URL}}}', 'https://frankx.ai/newsletter/unsubscribe'),
      text: text.replace('{{{RESEND_UNSUBSCRIBE_URL}}}', 'https://frankx.ai/newsletter/unsubscribe'),
    }),
  })
  console.log(`Test sent to ${to} (id ${sent.id})`)
  process.exit(0)
}

if (mode === 'stage') {
  requirePostal()
  // Staging writes `status: staged`, which the validator only accepts on a
  // gate-passed issue — so staging a pending draft would leave the repo failing
  // its own merge gate. Enforce the same precondition the status implies.
  if (issue.data.gateStatus !== 'pass') {
    console.error(`gateStatus is "${issue.data.gateStatus || 'unset'}" — run the integrity gate before staging.`)
    process.exit(1)
  }
  if (['scheduled', 'sent'].includes(issue.data.status)) {
    console.error(`Issue ${num} is already ${issue.data.status} — staging would create a second broadcast.`)
    process.exit(1)
  }
  revalidate(num)
  const { issue: data, broadcastId } = await createBroadcast(num)
  updateFrontmatter(num, { status: 'staged', broadcastId })
  console.log(`Broadcast draft created for issue ${data.issue}: ${broadcastId}`)
  console.log(`Review at https://resend.com/broadcasts/${broadcastId}`)
  console.log(`Then: pnpm newsletter:send ${num} --confirm`)
  process.exit(0)
}

if (mode === 'send') {
  requirePostal()
  if (!rest.includes('--confirm')) {
    console.error('Refusing to broadcast without --confirm. This sends to the full audience.')
    process.exit(1)
  }
  if (issue.data.gateStatus !== 'pass') {
    console.error(`gateStatus is "${issue.data.gateStatus || 'unset'}" — integrity gate must pass before a blast.`)
    process.exit(1)
  }
  // `scheduled` is the ambiguous state: the provider may have accepted the send
  // and the response or the final write was lost. Retrying would create a second
  // broadcast, so the double-send guard has to cover it too. Reconcile by hand.
  if (['sent', 'scheduled'].includes(issue.data.status)) {
    console.error(
      `Issue ${num} is already ${issue.data.status}` +
        (issue.data.sentAt ? ` (${issue.data.sentAt})` : '') +
        `. Refusing — a send may already be in flight.`
    )
    if (issue.data.broadcastId) {
      console.error(`Reconcile first: https://resend.com/broadcasts/${issue.data.broadcastId}`)
    }
    process.exit(1)
  }

  revalidate(num)

  // Always build a fresh broadcast from the current MDX. Reusing a staged id
  // would send whatever was rendered at stage time — silently stale if the issue
  // was edited after review, which is exactly when it gets edited.
  const { broadcastId, keyUsed } = await createBroadcast(num)

  // Record the intent BEFORE the irreversible call. If the send succeeds and the
  // write afterwards fails, the file would still claim the issue never went out.
  updateFrontmatter(num, { status: 'scheduled', broadcastId })

  await resend(`/broadcasts/${broadcastId}/send`, { method: 'POST', body: JSON.stringify({}) })
  updateFrontmatter(num, { status: 'sent', broadcastId, sentAt: new Date().toISOString() })

  console.log(`Issue ${num} sent as "${IDENTITY.from}" (broadcast ${broadcastId}, via ${keyUsed})`)
  console.log('Frontmatter flipped to status: sent — commit so the public archive picks it up.')
  process.exit(0)
}

console.error(`Unknown mode "${mode}"`)
process.exit(1)
