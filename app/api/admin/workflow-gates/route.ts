import { promises as fs } from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const GATES_PATH = path.join(process.cwd(), 'data', 'workflow-gates.jsonl')

type Gate = {
  gateId: string
  status: 'pending' | 'approved' | 'rejected'
  decision: string | null
  decidedAt: string | null
  decidedBy: string | null
  notes: string | null
  [k: string]: unknown
}

async function readGates(): Promise<Gate[]> {
  try {
    const raw = await fs.readFile(GATES_PATH, 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .map(line => {
        try { return JSON.parse(line) as Gate } catch { return null }
      })
      .filter((g): g is Gate => g !== null)
  } catch {
    return []
  }
}

async function writeGates(gates: Gate[]): Promise<void> {
  const out = gates.map(g => JSON.stringify(g)).join('\n') + '\n'
  await fs.writeFile(GATES_PATH, out, 'utf8')
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const gates = await readGates()
  return NextResponse.json({
    total: gates.length,
    pending: gates.filter(g => g.status === 'pending').length,
    gates,
  })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null) as { gateId?: string; decision?: string; notes?: string | null } | null
  if (!body?.gateId || !['approve', 'reject'].includes(body.decision || '')) {
    return NextResponse.json({ error: 'bad-request', expected: '{gateId, decision: approve|reject, notes?}' }, { status: 400 })
  }

  const gates = await readGates()
  const idx = gates.findIndex(g => g.gateId === body.gateId)
  if (idx === -1) return NextResponse.json({ error: 'not-found', gateId: body.gateId }, { status: 404 })
  if (gates[idx].status !== 'pending') {
    return NextResponse.json({ error: 'already-decided', gateId: body.gateId, currentStatus: gates[idx].status }, { status: 409 })
  }

  const newStatus = body.decision === 'approve' ? 'approved' : 'rejected'
  gates[idx].status = newStatus
  gates[idx].decision = newStatus
  gates[idx].decidedAt = new Date().toISOString()
  gates[idx].decidedBy = session.user?.email || 'admin'
  gates[idx].notes = body.notes || null

  await writeGates(gates)
  return NextResponse.json({ updated: true, gate: gates[idx] })
}
