/**
 * Unified intake system — the single front door.
 *
 * Generalizes the proven `app/api/workshop-intake/route.ts` v2 pattern into one
 * endpoint that every "contact Frank" surface routes through. One schema, one
 * handler, one durable record.
 *
 * Pipeline (each stage degrades gracefully — a failure in one never blocks the
 * others, and the form never lies about what happened):
 *
 *   1. Operator notification  → frank@frankx.ai          (Resend, reply_to = requester)
 *   2. Requester auto-reply   → instant branded ack      (Resend, reply_to = frank@frankx.ai)
 *   3. Durable record         → Notion "Inquiries" DB    (the CRM — survives Vercel restarts)
 *   4. Local log              → JSONL                    (/admin/intake dashboard + fallback)
 *   5. Team ping              → Slack webhook            (real-time awareness)
 *
 * Env vars (all optional — the system ships working with just RESEND_API_KEY;
 * each additional var lights up another layer):
 *   - RESEND_API_KEY            notify + auto-ack
 *   - OPERATOR_EMAIL            where notifications land   (default frank@frankx.ai)
 *   - NOTION_TOKEN              durable CRM record
 *   - NOTION_INQUIRIES_DB_ID    the Inquiries database id
 *   - SLACK_WEBHOOK_URL         #leads ping
 *
 * Resend audience (nurture) enrollment is disabled — see addToAudience()
 * below. IntakePayload has no marketing opt-in field yet, and auto-
 * subscribing every requester would contradict the ContactForm's explicit
 * "No marketing without opt-in" copy.
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

import {
  INTENTS,
  INTENT_LABEL,
  INTENT_IS_COMMERCIAL,
  type Intent,
} from './intake-types'

// ── Intent taxonomy ────────────────────────────────────────────────────────
// Defined in the client-safe ./intake-types module (no node imports) and
// re-exported here so server-side importers keep a single import surface.

export { INTENTS, INTENT_LABEL, INTENT_IS_COMMERCIAL }
export type { Intent }

// ── Schema ─────────────────────────────────────────────────────────────────

export const IntakeSchema = z.object({
  intent: z.enum(INTENTS),
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(200),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(1, 'A short message is required').max(4000),
  // Honeypot — bots fill this, humans never see it. Deliberately NOT
  // constrained to empty here: the route checks `parsed.data.website`
  // truthiness AFTER validation and pretends success without processing the
  // submission. If this field rejected non-empty values, a filled honeypot
  // would fail safeParse() and return a 400 instead — tipping the bot off
  // and defeating the whole point of a silent drop.
  //
  // Deliberately NO `.trim()`: trimming would normalize a whitespace-only
  // fill (a single space, a tab) to `''`, which is falsy — the honeypot
  // check downstream would then treat it as untripped and let the
  // submission through the full pipeline instead of silently dropping it.
  website: z.string().max(200).optional().or(z.literal('')),
  // Source page (auto-filled by the form) for attribution.
  source: z.string().trim().max(300).optional().or(z.literal('')),
  consent: z.literal(true, {
    error: (_issue) => 'Please confirm you consent to being contacted.',
  }),
})

export type IntakePayload = z.infer<typeof IntakeSchema>

export interface IntakeMeta {
  referrer: string | null
  userAgent: string | null
}

export type StageStatus = 'sent' | 'failed' | 'skipped' | 'added' | 'duplicate'

export interface IntakeLogEntry {
  ts: string
  intent: Intent
  name: string
  email: string
  company?: string
  message: string
  source?: string
  referrer?: string
  userAgent?: string
  notify: StageStatus
  ack: StageStatus
  notion: StageStatus
  slack: StageStatus
  audience: StageStatus
}

// ── Config ─────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL || 'frank@frankx.ai'
const REPLY_TO = 'frank@frankx.ai'
const FROM_NOTIFY = 'FrankX Intake <notify@mail.frankx.ai>'
const FROM_FRANK = 'Frank <frank@mail.frankx.ai>'
const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DB = process.env.NOTION_INQUIRIES_DB_ID
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || 'https://frankx.ai/contact'

/**
 * Resolve a private (operator-only) storage path. On Vercel, that's `/tmp`
 * (ephemeral per Fluid Compute instance); locally, it's `private/` (gitignored).
 * Exported so the admin dashboard can reuse the same path resolution.
 */
export function resolvePrivatePath(name: string): string {
  if (process.env.VERCEL) return path.join('/tmp', name)
  return path.join(process.cwd(), 'private', name)
}

export function getLogPath() {
  return resolvePrivatePath('intake.jsonl')
}

/**
 * `fetch` with a bounded abort deadline. Every external call in this pipeline
 * (Resend, Notion, Slack) uses this instead of bare `fetch` — a hung upstream
 * request would otherwise block the `Promise.all` fan-out indefinitely,
 * tying up the user-facing /api/intake route until the platform's own
 * function timeout kills it. 5s is generous for a JSON POST to any of these
 * providers; each stage already treats a failure as non-fatal.
 */
async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs = 5_000,
): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

// ── Stage 1: operator notification ───────────────────────────────────────────

async function sendOperatorNotification(
  payload: IntakePayload,
  meta: IntakeMeta,
): Promise<StageStatus> {
  if (!RESEND_API_KEY) return 'skipped'

  const subject = `Inquiry · ${INTENT_LABEL[payload.intent]} · ${payload.name}`
  const lines = [
    `New ${INTENT_LABEL[payload.intent]} inquiry.`,
    '',
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : 'Company: (not provided)',
    '',
    'MESSAGE',
    payload.message,
    '',
    'METADATA',
    `Intent:    ${payload.intent}`,
    `Source:    ${payload.source || meta.referrer || '(unknown)'}`,
    `Timestamp: ${new Date().toISOString()}`,
    '',
    '---',
    'Reply directly to this email — it goes to the requester.',
    'Pipeline: https://frankx.ai/admin/intake',
  ]

  try {
    const res = await fetchWithTimeout('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_NOTIFY,
        to: OPERATOR_EMAIL,
        reply_to: payload.email,
        subject,
        text: lines.join('\n'),
      }),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

// ── Stage 2: requester auto-acknowledgement ──────────────────────────────────

/**
 * Escape user-controlled text for safe inclusion in HTML.
 * The auto-ack interpolates the requester's first name into HTML email; without
 * this escape, a malicious payload like `<img src=x onerror=...>` could fire in
 * email clients that render HTML. Resend doesn't sanitize what we send.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildAckBody(payload: IntakePayload): { text: string; html: string } {
  const firstNameRaw = payload.name.split(' ')[0]
  // Plain-text body has no injection vector; the HTML body does.
  const firstNameText = firstNameRaw
  const firstNameHtml = escapeHtml(firstNameRaw)
  const commercial = INTENT_IS_COMMERCIAL[payload.intent]

  const textLines = [
    `Hi ${firstNameText},`,
    '',
    'Thanks — your message reached Frank directly. This is an automatic',
    'confirmation so you know it landed; a real reply follows, usually within',
    '1–2 working days (Madrid time).',
    '',
    `What you sent: ${INTENT_LABEL[payload.intent]}`,
    '',
    commercial
      ? `If it's faster to just talk, grab a 20-minute intro slot: ${BOOKING_URL}`
      : `In the meantime, the work is all public: https://frankx.ai/agentic-builder-lab`,
    '',
    '— Frank',
    'frank@frankx.ai · frankx.ai',
  ]

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;color:#0f172a;line-height:1.6">
  <p>Hi ${firstNameHtml},</p>
  <p>Thanks — your message reached Frank directly. This is an automatic confirmation so you know it landed; a real reply follows, usually within <strong>1–2 working days</strong> (Madrid time).</p>
  <p style="background:#f1f5f9;border-radius:8px;padding:12px 16px;font-size:14px;color:#475569">
    <strong>What you sent:</strong> ${INTENT_LABEL[payload.intent]}
  </p>
  <p>${
    commercial
      ? `If it's faster to just talk, <a href="${BOOKING_URL}" style="color:#0891b2">grab a 20-minute intro slot</a>.`
      : `In the meantime, the work is all public — see the <a href="https://frankx.ai/agentic-builder-lab" style="color:#0891b2">Agentic Builder Lab</a>.`
  }</p>
  <p style="margin-top:24px;color:#64748b;font-size:14px">— Frank<br/>frank@frankx.ai · frankx.ai</p>
</div>`.trim()

  return { text: textLines.join('\n'), html }
}

async function sendRequesterAck(payload: IntakePayload): Promise<StageStatus> {
  if (!RESEND_API_KEY) return 'skipped'

  const { text, html } = buildAckBody(payload)
  try {
    const res = await fetchWithTimeout('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_FRANK,
        to: payload.email,
        reply_to: REPLY_TO,
        subject: 'Got your message — Frank',
        text,
        html,
      }),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

// ── Stage 3: durable Notion record (the CRM) ─────────────────────────────────

async function writeToNotion(
  payload: IntakePayload,
  meta: IntakeMeta,
): Promise<StageStatus> {
  if (!NOTION_TOKEN || !NOTION_DB) return 'skipped'

  try {
    const res = await fetchWithTimeout('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB },
        properties: {
          Name: { title: [{ text: { content: payload.name } }] },
          Email: { email: payload.email },
          Intent: { select: { name: INTENT_LABEL[payload.intent] } },
          Stage: { select: { name: 'New' } },
          Company: payload.company
            ? { rich_text: [{ text: { content: payload.company } }] }
            : { rich_text: [] },
          Source: {
            rich_text: [
              { text: { content: payload.source || meta.referrer || 'unknown' } },
            ],
          },
          Message: {
            rich_text: [
              {
                text: {
                  content:
                    payload.message.length > 1900
                      ? payload.message.slice(0, 1897) + '…'
                      : payload.message,
                },
              },
            ],
          },
        },
      }),
    })
    return res.ok ? 'added' : 'failed'
  } catch {
    return 'failed'
  }
}

// ── Stage 4: local JSONL log ─────────────────────────────────────────────────

async function appendIntakeLog(entry: IntakeLogEntry): Promise<boolean> {
  const filePath = getLogPath()
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.appendFile(filePath, JSON.stringify(entry) + '\n', 'utf8')
    return true
  } catch (err) {
    console.error('[intake] log append failed', err)
    return false
  }
}

// ── Stage 5: Slack ping ──────────────────────────────────────────────────────

async function pingSlack(payload: IntakePayload): Promise<StageStatus> {
  if (!SLACK_WEBHOOK_URL) return 'skipped'

  try {
    const res = await fetchWithTimeout(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*New inquiry · ${INTENT_LABEL[payload.intent]}*\n*${payload.name}*${
          payload.company ? ` · ${payload.company}` : ''
        } — ${payload.email}\n> ${payload.message.slice(0, 280)}`,
      }),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

// ── Resend audience (nurture) ────────────────────────────────────────────────

// Disabled: IntakePayload's `consent` field covers storage-to-respond only —
// the ContactForm copy is explicit ("No marketing without opt-in"). There's
// no separate marketing opt-in in the schema, so subscribing every requester
// here would contradict that promise. Re-enable once IntakePayload carries a
// real opt-in flag and gate on it; see git history for the prior
// implementation (Resend audience POST, 409-as-duplicate handling).
async function addToAudience(_payload: IntakePayload): Promise<StageStatus> {
  return 'skipped'
}

// ── Orchestrator ─────────────────────────────────────────────────────────────

export interface IntakeResult {
  ok: boolean
  entry: IntakeLogEntry
  logged: boolean
}

/**
 * Runs the full intake pipeline. All five stages fire in parallel; none blocks
 * another. The inquiry is considered "reached Frank" — and the form returns
 * ok:true — when **any one** of the three durable sinks succeeded:
 *
 *   1. operator notification email (Resend → frank@frankx.ai), OR
 *   2. Notion "Inquiries" CRM row, OR
 *   3. local JSONL log entry.
 *
 * Returns ok:false only when **all three** failed — only then is the inquiry
 * truly lost, and only then should the form admit the failure to the user.
 */
export async function processIntake(
  payload: IntakePayload,
  meta: IntakeMeta,
): Promise<IntakeResult> {
  const [notify, ack, notion, slack, audience] = await Promise.all([
    sendOperatorNotification(payload, meta),
    sendRequesterAck(payload),
    writeToNotion(payload, meta),
    pingSlack(payload),
    addToAudience(payload),
  ])

  const entry: IntakeLogEntry = {
    ts: new Date().toISOString(),
    intent: payload.intent,
    name: payload.name,
    email: payload.email,
    company: payload.company || undefined,
    message: payload.message,
    source: payload.source || undefined,
    referrer: meta.referrer || undefined,
    userAgent: meta.userAgent || undefined,
    notify,
    ack,
    notion,
    slack,
    audience,
  }

  const logged = await appendIntakeLog(entry)
  // Stage outcomes only — never log name/email/message/referrer/userAgent to
  // stdout. The full entry (PII included) lives in the private JSONL sink
  // via appendIntakeLog, which is the only sanctioned durable copy.
  console.log(
    '[intake]',
    JSON.stringify({ ts: entry.ts, intent: entry.intent, notify, ack, notion, slack, audience, logged }),
  )

  // The inquiry is "lost" only if it neither notified Frank, reached the CRM,
  // nor wrote to the local log. Any one durable sink = success.
  const reachedFrank =
    notify === 'sent' || notion === 'added' || logged
  return { ok: reachedFrank, entry, logged }
}
