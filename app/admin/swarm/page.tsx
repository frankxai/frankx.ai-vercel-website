/**
 * /admin/swarm — investment-intelligence council dashboard.
 *
 * Server component. Auth is handled upstream by proxy.ts (the `/admin` matcher →
 * NextAuth). Reads run history + pending decisions + today's spend from KV via
 * lib/swarm/store; every read degrades gracefully (empty state) when KV or the
 * Gateway is unconfigured. Renders three explicit degraded states so a
 * zero-secret preview deploy still paints.
 */

import type { Metadata } from 'next'
import { catalog } from '@/lib/swarm/catalog'
import { isGatewayAvailable } from '@/lib/swarm/executor'
import { isKvAvailable, listRuns, listPendingDecisions, todaySpend } from '@/lib/swarm/store'
import { SwarmTriggerForm } from '@/components/admin/SwarmTriggerForm'

export const metadata: Metadata = {
  title: 'Investment Council — Admin | FrankX',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const DAILY_CAP = Number(process.env.SWARM_DAILY_COST_CAP_USD ?? 5)

function Banner({ tone, children }: { tone: 'warn' | 'ok'; children: React.ReactNode }) {
  const cls = tone === 'warn' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
  return <div className={`rounded-lg border px-4 py-3 text-sm ${cls}`}>{children}</div>
}

export default async function SwarmDashboardPage() {
  const gateway = isGatewayAvailable()
  const kv = isKvAvailable()
  const runs = kv ? await listRuns(20) : []
  const pending = kv ? await listPendingDecisions(20) : []
  const spend = kv ? await todaySpend() : 0

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Investment Council
            </h1>
          </div>
          <p className="text-zinc-500 text-sm">
            Sonnet + Opus council ({catalog.agents.length} agents · team {catalog.team}) — analysis, debate, risk gate, synthesis. Private.
          </p>
        </header>

        {!gateway && (
          <Banner tone="warn">
            AI Gateway not configured. Set <code className="font-mono">AI_GATEWAY_API_KEY</code> in Vercel to enable live runs. The dashboard and cost gates still work.
          </Banner>
        )}
        {!kv && (
          <Banner tone="warn">
            Vercel KV not configured. Runs execute and return inline, but history, pending decisions, and the daily-spend counter are disabled until KV env is set.
          </Banner>
        )}

        {/* Spend meter */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Today&rsquo;s spend</span>
            <span className="font-mono text-zinc-200">${spend.toFixed(2)} / ${DAILY_CAP.toFixed(2)}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-sky-400"
              style={{ width: `${Math.min(100, (spend / DAILY_CAP) * 100)}%` }}
            />
          </div>
        </section>

        {/* Trigger */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Run a session</h2>
          <SwarmTriggerForm gatewayReady={gateway} />
        </section>

        {/* Pending decisions */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Pending decisions</h2>
          {pending.length === 0 ? (
            <p className="text-zinc-600 text-sm">No pending decisions.{!kv && ' (KV not configured.)'}</p>
          ) : (
            <ul className="space-y-2">
              {pending.map((p, i) => (
                <li key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm">
                  <div className="text-zinc-500 text-xs mb-1">run {p.runId} · {p.at}</div>
                  <pre className="text-zinc-300 whitespace-pre-wrap font-mono text-xs">{JSON.stringify(p.actions, null, 2)}</pre>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-amber-400/80">
            Execution boundary: this surface produces decision briefs only. Trades execute exclusively via the local trade-gate MCP with a human approval token.
          </p>
        </section>

        {/* Run history */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-zinc-200">Recent runs</h2>
          {runs.length === 0 ? (
            <p className="text-zinc-600 text-sm">No runs yet.{!kv && ' (KV not configured.)'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-zinc-500 text-left">
                  <tr>
                    <th className="py-2 pr-4">Run</th>
                    <th className="py-2 pr-4">When</th>
                    <th className="py-2 pr-4">Agents</th>
                    <th className="py-2 pr-4">Cost</th>
                    <th className="py-2 pr-4">PM verdict</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  {runs.map((r) => (
                    <tr key={r.id} className="border-t border-white/5">
                      <td className="py-2 pr-4 font-mono text-xs">{r.id.slice(4, 24)}</td>
                      <td className="py-2 pr-4 text-zinc-500">{r.finishedAt.slice(0, 16).replace('T', ' ')}</td>
                      <td className="py-2 pr-4">{r.analysis.length + r.risk.length + (r.synthesis.portfolioManager ? 1 : 0)}</td>
                      <td className="py-2 pr-4 font-mono">${r.costUsd.toFixed(3)}</td>
                      <td className="py-2 pr-4 text-zinc-400 max-w-md truncate">{r.synthesis.portfolioManager?.output?.summary ?? (r.ok ? '—' : r.note)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="pt-6 text-xs text-zinc-600 border-t border-white/5">
          This is system architecture, not financial / investment / tax advice. Outputs frame decisions; jurisdiction-specific counsel signs off on instruments. The practitioner accepts capital risk; the substrate accepts no claim.
        </footer>
      </div>
    </div>
  )
}
