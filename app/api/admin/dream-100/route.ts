import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { z } from 'zod'

import { dream100 } from '@/lib/dream100'

const KEY = 'dream100:relationship-notes:v1'
const stages = ['observe', 'understand', 'contribute', 'converse', 'collaborate'] as const
const noteSchema = z.object({
  memberId: z.string().min(1),
  stage: z.enum(stages),
  lastTouch: z.string().max(80).default(''),
  nextContribution: z.string().max(600).default(''),
  privateNotes: z.string().max(2400).default(''),
})

export type Dream100RelationshipNote = z.infer<typeof noteSchema> & { updatedAt: string }

function decodeNotes(raw: Record<string, unknown> | null) {
  const notes: Record<string, Dream100RelationshipNote> = {}
  for (const [memberId, value] of Object.entries(raw ?? {})) {
    try {
      const candidate = typeof value === 'string' ? JSON.parse(value) : value
      const parsed = noteSchema.extend({ updatedAt: z.string() }).safeParse(candidate)
      if (parsed.success) notes[memberId] = parsed.data
    } catch {
      // One malformed private note must not make the whole cockpit unavailable.
    }
  }
  return notes
}

export async function GET() {
  try {
    const raw = await kv.hgetall<Record<string, unknown>>(KEY)
    return NextResponse.json({ snapshotId: dream100.snapshotId, persistence: 'kv', notes: decodeNotes(raw) })
  } catch {
    return NextResponse.json({ snapshotId: dream100.snapshotId, persistence: 'unavailable', notes: {} })
  }
}

export async function PATCH(request: Request) {
  const parsed = noteSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid relationship note', issues: parsed.error.flatten() }, { status: 400 })
  }
  if (!dream100.members.some((member) => member.id === parsed.data.memberId)) {
    return NextResponse.json({ error: 'Unknown Dream 100 member' }, { status: 404 })
  }

  const note: Dream100RelationshipNote = { ...parsed.data, updatedAt: new Date().toISOString() }
  try {
    await kv.hset(KEY, { [note.memberId]: JSON.stringify(note) })
    return NextResponse.json({ ok: true, note })
  } catch {
    return NextResponse.json(
      { error: 'Relationship storage is not configured. No data was written.' },
      { status: 503 },
    )
  }
}

