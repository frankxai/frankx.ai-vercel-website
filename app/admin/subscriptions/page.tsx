import type { Metadata } from 'next'
import subscriptionData from '@/data/subscriptions.json'

export const metadata: Metadata = {
  title: 'Subscription Tracker — Admin | FrankX',
  robots: { index: false, follow: false },
}

const categoryLabels: Record<string, string> = {
  'ai-core': 'AI Core',
  'ai-secondary': 'AI Secondary',
  infrastructure: 'Infrastructure',
  'dev-tools': 'Dev Tools',
  creative: 'Creative',
  fintech: 'Fintech',
}

const roiColors: Record<string, string> = {
  critical: 'text-red-400 bg-red-900/30',
  high: 'text-emerald-400 bg-emerald-900/30',
  moderate: 'text-amber-400 bg-amber-900/30',
  'low-currently': 'text-zinc-400 bg-zinc-800',
}

export default function SubscriptionsPage() {
  const { subscriptions, apis, pendingEvaluation, summary } = subscriptionData

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Subscription Tracker
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mb-8">
          SaaS, APIs, and tool spending — Arcanea Labs BV
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard label="Monthly Spend" value={`€${summary.totalMonthly}`} sub="all subscriptions" color="amber" />
          <StatCard label="Annual Cost" value={`€${summary.totalAnnual}`} sub="projected" color="orange" />
          <StatCard label="BV Deductible" value={`€${summary.bvDeductible}/mo`} sub={`saves €${summary.taxSavingsAnnual}/yr tax`} color="emerald" />
          <StatCard label="AI Stack" value={`€${subscriptions.filter(s => s.category.startsWith('ai')).reduce((sum, s) => sum + s.cost, 0)}/mo`} sub="AI tool investment" color="cyan" />
          <StatCard label="Tools" value={String(subscriptions.length + apis.length)} sub="active services" color="violet" />
        </div>

        {/* Tax Benefit Summary */}
        <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-2xl p-5 mb-10">
          <h2 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            BV Tax Benefit
          </h2>
          <p className="text-zinc-400 text-sm">
            <span className="text-emerald-400 font-bold">€{summary.bvDeductible}/mo</span> of your subscriptions are BV-deductible business expenses.
            At 19% corporate tax, this saves <span className="text-emerald-400 font-bold">€{summary.taxSavingsAnnual}/year</span> in taxes.
            Every tool you invest in that serves the business reduces your tax bill.
          </p>
        </div>

        {/* Subscription Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Active Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-left border-b border-zinc-800">
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Cost/mo</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">ROI</th>
                  <th className="pb-3 pr-4">Usage</th>
                  <th className="pb-3 pr-4">BV</th>
                  <th className="pb-3">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map(sub => (
                  <tr key={sub.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                    <td className="py-3 pr-4">
                      <div className="text-zinc-200 font-medium">{sub.name}</div>
                      <div className="text-zinc-600 text-xs">{sub.provider}</div>
                    </td>
                    <td className="py-3 pr-4 font-mono text-amber-400">€{sub.cost}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                        {categoryLabels[sub.category] || sub.category}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${roiColors[sub.roi] || 'text-zinc-400 bg-zinc-800'}`}>
                        {sub.roi}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${sub.utilizationEstimate}%`,
                              backgroundColor: sub.utilizationEstimate > 70 ? '#10b981' : sub.utilizationEstimate > 40 ? '#f59e0b' : '#ef4444',
                            }}
                          />
                        </div>
                        <span className="text-zinc-500 text-xs">{sub.utilizationEstimate}%</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      {sub.bvDeductible ? (
                        <span className="text-emerald-400 text-xs">&#10003;</span>
                      ) : (
                        <span className="text-zinc-600 text-xs">personal</span>
                      )}
                    </td>
                    <td className="py-3 text-zinc-500 text-xs max-w-xs truncate">{sub.businessPurpose}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-700">
                  <td className="pt-3 font-semibold text-zinc-200">Total</td>
                  <td className="pt-3 font-semibold text-amber-400 font-mono">
                    €{subscriptions.reduce((sum, s) => sum + s.cost, 0)}
                  </td>
                  <td colSpan={5} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* APIs */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Usage-Based APIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {apis.map(api => (
              <div key={api.id} className="bg-zinc-800/30 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-200 font-medium text-sm">{api.name}</span>
                  <span className="text-xs font-mono text-amber-400">~€{api.monthlyEstimate}/mo</span>
                </div>
                <p className="text-zinc-500 text-xs">{api.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Evaluation */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Pending Evaluation</h2>
          <div className="space-y-3">
            {pendingEvaluation.map((item, i) => (
              <div key={i} className="bg-zinc-800/30 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-200 font-medium">{item.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.verdict.startsWith('SKIP') ? 'bg-red-900/30 text-red-400' :
                    item.verdict.startsWith('ADD') ? 'bg-emerald-900/30 text-emerald-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    {item.verdict.split('—')[0].trim()}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs">{item.reasoning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spend by Category */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Spend by Category</h2>
          <div className="space-y-3">
            {Object.entries(
              subscriptions.reduce((acc, s) => {
                const cat = categoryLabels[s.category] || s.category
                acc[cat] = (acc[cat] || 0) + s.cost
                return acc
              }, {} as Record<string, number>)
            )
              .sort((a, b) => b[1] - a[1])
              .map(([category, total]) => {
                const maxSpend = 200
                const pct = Math.round((total / maxSpend) * 100)
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-zinc-400 text-sm">{category}</span>
                      <span className="text-zinc-300 text-sm font-mono">€{total}/mo</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Perplexity Computer Analysis */}
        <div className="bg-violet-950/20 border border-violet-800/30 rounded-2xl p-6 mb-10">
          <h2 className="text-violet-400 font-semibold mb-3">Perplexity Computer vs Claude Coworker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-800/30 rounded-xl p-4">
              <h3 className="text-zinc-200 font-medium mb-2">What You Already Have</h3>
              <ul className="text-zinc-400 text-sm space-y-1.5">
                <li>&#10003; Claude Code + Playwright MCP (browser automation)</li>
                <li>&#10003; Claude Max includes Coworker mode</li>
                <li>&#10003; Perplexity Pro via Revolut (research)</li>
                <li>&#10003; n8n workflows for automation</li>
              </ul>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-4">
              <h3 className="text-zinc-200 font-medium mb-2">Verdict: Skip Perplexity Computer</h3>
              <p className="text-zinc-400 text-sm">
                You already have browser automation (Playwright MCP), AI research (Perplexity Pro via Revolut),
                and computer use (Claude Coworker). Adding Perplexity Computer would be a fourth tool doing
                the same job. Invest that budget in products instead.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs py-6 border-t border-zinc-800/50">
          Subscription Tracker — frankx.ai/admin/subscriptions — Update data/subscriptions.json
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, { border: string; text: string }> = {
    amber: { border: 'border-amber-800/50', text: 'text-amber-400' },
    orange: { border: 'border-orange-800/50', text: 'text-orange-400' },
    emerald: { border: 'border-emerald-800/50', text: 'text-emerald-400' },
    cyan: { border: 'border-cyan-800/50', text: 'text-cyan-400' },
    violet: { border: 'border-violet-800/50', text: 'text-violet-400' },
  }
  const c = colors[color] || colors.amber
  return (
    <div className={`bg-zinc-900/50 border ${c.border} rounded-xl p-4`}>
      <div className="text-zinc-500 text-xs mb-1">{label}</div>
      <div className={`text-2xl font-bold ${c.text}`}>{value}</div>
      <div className="text-zinc-600 text-xs">{sub}</div>
    </div>
  )
}
