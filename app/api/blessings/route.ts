import { NextRequest, NextResponse } from 'next/server'
import { appendFile, readFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

// data/blessings.jsonl is the AI-readable approval log written by the
// Daily Walk. Each line is one ratification or flag from Frank.
//
// Schema:
//   { id, slug, verdict: 'approve' | 'flag' | 'note', reason?, ratifiedAt, source }
//
// The skill loader picks up recent entries on session start so the AI
// becomes aware of what Frank approved or flagged on his last walk.

const BLESSINGS_PATH = join(process.cwd(), 'data', 'blessings.jsonl')

type Verdict = 'approve' | 'flag' | 'note'

interface BlessingPayload {
  slug: string
  verdict: Verdict
  reason?: string
  source?: string
}

function isValidVerdict(v: unknown): v is Verdict {
  return v === 'approve' || v === 'flag' || v === 'note'
}

export async function POST(req: NextRequest) {
  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'invalid-json' }, { status: 400 }) }

  // Accept either a single record or a batch (the Daily Walk's "Save the day" sends a batch)
  const records: BlessingPayload[] = Array.isArray(body) ? (body as BlessingPayload[]) : [body as BlessingPayload]

  for (const r of records) {
    if (typeof r?.slug !== 'string' || !r.slug.trim()) {
      return NextResponse.json({ error: 'invalid-slug' }, { status: 400 })
    }
    if (!isValidVerdict(r?.verdict)) {
      return NextResponse.json({ error: 'invalid-verdict', got: r?.verdict }, { status: 400 })
    }
  }

  await mkdir(dirname(BLESSINGS_PATH), { recursive: true })

  const now = new Date().toISOString()
  const lines = records.map((r, i) => JSON.stringify({
    id: `bless_${Date.now()}_${i.toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    slug: r.slug.trim(),
    verdict: r.verdict,
    reason: r.reason?.toString().slice(0, 500) || null,
    ratifiedAt: now,
    source: r.source || 'daily-walk',
  })).join('\n') + '\n'

  await appendFile(BLESSINGS_PATH, lines, 'utf8')

  return NextResponse.json({ ok: true, written: records.length, ratifiedAt: now })
}

export async function GET() {
  if (!existsSync(BLESSINGS_PATH)) return NextResponse.json({ entries: [] })
  const raw = await readFile(BLESSINGS_PATH, 'utf8')
  const entries = raw.split('\n').filter(Boolean).slice(-200).map(l => {
    try { return JSON.parse(l) } catch { return null }
  }).filter(Boolean)
  return NextResponse.json({ entries })
}
