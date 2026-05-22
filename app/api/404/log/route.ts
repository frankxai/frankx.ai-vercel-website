/**
 * POST /api/404/log — record a 404 hit for the operator radar.
 *
 * Called by app/_components/NotFoundClient.tsx on mount whenever the soft-404
 * page renders. Body: { path, referrer?, suggestions?, topConfidence?, userAgent? }.
 *
 * Storage strategy:
 *   - Local dev: append JSONL to private/404-log.jsonl (gitignored)
 *   - Vercel:    append JSONL to /tmp/404-log.jsonl (ephemeral but durable
 *                across requests within one Fluid Compute instance lifetime)
 *
 * Long-term storage (Vercel KV / Blob) lands in a follow-up once we observe
 * traffic patterns. Phase 2 keeps storage trivial so we ship quickly.
 *
 * No auth: 404s are by definition pre-auth events. Inputs are sanitized and
 * size-capped to protect the log file from injection or storage exhaustion.
 */

import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

const MAX_PATH_LEN = 512
const MAX_REFERRER_LEN = 1024
const MAX_UA_LEN = 512

// Strip ASCII control chars (0x00-0x1F) and DEL (0x7F).
// Written with \u escapes so the source is plain ASCII — no editor or linter
// can silently corrupt the range by collapsing literal control bytes.
const CONTROL_CHAR_RE = /[\u0000-\u001F\u007F]/g

function getLogPath() {
  if (process.env.VERCEL) {
    return '/tmp/404-log.jsonl'
  }
  return path.join(process.cwd(), 'private', '404-log.jsonl')
}

interface LogEntry {
  ts: string
  path: string
  referrer?: string
  userAgent?: string
  topConfidence?: number
  topMatch?: string
  ip?: string
}

function sanitize(value: unknown, maxLen: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const cleaned = value.replace(CONTROL_CHAR_RE, '').trim().slice(0, maxLen)
  return cleaned.length > 0 ? cleaned : undefined
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const path404 = sanitize(body.path, MAX_PATH_LEN)
  if (!path404 || !path404.startsWith('/')) {
    return NextResponse.json({ ok: false, error: 'missing_path' }, { status: 400 })
  }

  const entry: LogEntry = {
    ts: new Date().toISOString(),
    path: path404,
    referrer: sanitize(body.referrer, MAX_REFERRER_LEN),
    userAgent:
      sanitize(body.userAgent, MAX_UA_LEN) ??
      req.headers.get('user-agent')?.slice(0, MAX_UA_LEN) ??
      undefined,
    topConfidence:
      typeof body.topConfidence === 'number' ? Math.max(0, Math.min(1, body.topConfidence)) : undefined,
    topMatch: sanitize(body.topMatch, MAX_PATH_LEN),
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined,
  }

  const line = JSON.stringify(entry) + '\n'
  const logPath = getLogPath()

  try {
    await fs.mkdir(path.dirname(logPath), { recursive: true })
    await fs.appendFile(logPath, line, 'utf8')
  } catch (err) {
    // Don't fail the user request because logging broke
    console.error('[/api/404/log] write failed:', (err as Error).message)
  }

  return NextResponse.json({ ok: true })
}
