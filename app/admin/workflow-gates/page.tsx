import { promises as fs } from 'node:fs'
import path from 'node:path'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { GateActions } from './gate-actions'

export const metadata = {
  title: 'Workflow Gates · Admin',
  description: 'Human approval queue for workflows that paused for review.',
  robots: { index: false, follow: false },
}

type Gate = {
  gateId: string
  runId: string
  workflow: string
  step: string
  title: string
  summary?: string
  previewPath?: string | null
  approvalUrl: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  decidedAt: string | null
  decidedBy: string | null
  notes: string | null
}

async function readGates(): Promise<Gate[]> {
  const gatesPath = path.join(process.cwd(), 'data', 'workflow-gates.jsonl')
  try {
    const raw = await fs.readFile(gatesPath, 'utf8')
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

function StatusBadge({ status }: { status: Gate['status'] }) {
  const styles = {
    pending: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    approved: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    rejected: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  }[status]
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {status}
    </span>
  )
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default async function WorkflowGatesPage() {
  const session = await auth()
  if (!session) redirect('/api/auth/signin?callbackUrl=/admin/workflow-gates')

  const gates = await readGates()
  const pending = gates.filter(g => g.status === 'pending').sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  const decided = gates.filter(g => g.status !== 'pending').sort((a, b) => (b.decidedAt || '').localeCompare(a.decidedAt || '')).slice(0, 20)

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-emerald-400/80">Workflow Tier · Admin</p>
          <h1 className="mb-3 text-4xl font-semibold tracking-tight">Workflow Gates</h1>
          <p className="max-w-2xl text-white/70">
            Workflows paused for human approval surface here. Each gate represents a workflow that completed its
            automated checks and is awaiting your decision to proceed. The first workflow system with native HITL.
          </p>
        </header>

        <section className="mb-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-medium">Pending decisions</h2>
            <span className="text-sm text-white/50">
              {pending.length} {pending.length === 1 ? 'gate' : 'gates'} waiting
            </span>
          </div>

          {pending.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-white/70">No gates pending. Substrate idle.</p>
              <p className="mt-2 text-sm text-white/50">
                Gates appear here when workflows like <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">newsletter-friday</code> reach a humanGate phase.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {pending.map(gate => (
                <li key={gate.gateId} className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2 text-xs text-white/50">
                        <span className="font-mono">{gate.gateId}</span>
                        <span>·</span>
                        <span>{gate.workflow}/{gate.step}</span>
                        <span>·</span>
                        <span>{formatRelative(gate.createdAt)}</span>
                      </div>
                      <h3 className="text-lg font-medium text-white">{gate.title}</h3>
                    </div>
                    <StatusBadge status={gate.status} />
                  </div>

                  {gate.summary && (
                    <p className="mb-4 text-sm text-white/70">{gate.summary}</p>
                  )}

                  {gate.previewPath && (
                    <p className="mb-4 text-sm">
                      <span className="text-white/50">Preview at:</span>{' '}
                      <code className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-emerald-300">
                        {gate.previewPath}
                      </code>
                    </p>
                  )}

                  <GateActions gateId={gate.gateId} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {decided.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-medium">Recent decisions</h2>
            <ul className="space-y-2">
              {decided.map(gate => (
                <li key={gate.gateId} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white/85">{gate.title}</p>
                      <p className="mt-0.5 text-xs text-white/50">
                        <span className="font-mono">{gate.gateId}</span>
                        {gate.decidedBy && ` · ${gate.decidedBy}`}
                        {gate.decidedAt && ` · ${formatRelative(gate.decidedAt)}`}
                      </p>
                    </div>
                    <StatusBadge status={gate.status} />
                  </div>
                  {gate.notes && (
                    <p className="mt-2 text-xs text-white/60">Notes: {gate.notes}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-16 border-t border-white/10 pt-8 text-xs text-white/40">
          <p>
            Workflow Tier · HITL substrate · See{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5">docs/ops/HUMAN-GATE.md</code> for the pattern.
          </p>
        </footer>
      </div>
    </main>
  )
}
