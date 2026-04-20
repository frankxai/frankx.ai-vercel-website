import type { Metadata } from 'next'
import wealthData from '@/data/wealth-ops.json'

export const metadata: Metadata = {
  title: 'Wealth Intelligence — Admin | FrankX',
  robots: { index: false, follow: false },
}

export default function WealthDashboardPage() {
  const { netWorth, fireTarget, propertyTargets, propertyWatchlist, taxStrategy, income, expenses } = wealthData

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Wealth Intelligence
          </h1>
        </div>
        <p className="text-zinc-500 text-sm mb-8">
          Real estate, net worth, FIRE progress, tax strategy — Private
        </p>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Net Worth" value={`€${(netWorth.current).toLocaleString()}`} sub="assets - liabilities" color="emerald" />
          <StatCard label="FIRE Target" value={`€${(fireTarget.target / 1000).toFixed(0)}K`} sub={`${fireTarget.progressPercent}% there`} color="teal" />
          <StatCard label="Monthly Subs" value={`€${expenses.monthly.subscriptions}`} sub="tool investment" color="amber" />
          <StatCard label="Properties" value={String(propertyTargets.length)} sub="in pipeline" color="violet" />
        </div>

        {/* FIRE Progress */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Financial Independence Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">€{netWorth.current.toLocaleString()}</span>
            <span className="text-zinc-400 text-sm">€{fireTarget.target.toLocaleString()}</span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
              style={{ width: `${Math.max(fireTarget.progressPercent, 1)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-zinc-500 text-xs">Annual Expenses</div>
              <div className="text-zinc-200 font-bold">€{fireTarget.annualExpenses.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-zinc-500 text-xs">FIRE Multiple</div>
              <div className="text-zinc-200 font-bold">{fireTarget.multiple}x</div>
            </div>
            <div className="text-center">
              <div className="text-zinc-500 text-xs">Gap to FIRE</div>
              <div className="text-amber-400 font-bold">€{(fireTarget.target - netWorth.current).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Property Pipeline */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Property Pipeline</h2>
          {propertyTargets.map(prop => (
            <div key={prop.id} className="bg-zinc-800/30 border border-zinc-800 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-zinc-200 font-medium">{prop.targetArea}</span>
                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-violet-900/30 text-violet-400">{prop.type}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-400">{prop.status}</span>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-zinc-500">Budget: </span>
                  <span className="text-zinc-300">€{(prop.budgetRange.min / 1000).toFixed(0)}K – €{(prop.budgetRange.max / 1000).toFixed(0)}K</span>
                </div>
                <div>
                  <span className="text-zinc-500">Timeline: </span>
                  <span className="text-zinc-300">{prop.targetTimeline}</span>
                </div>
              </div>
              {prop.notes && <p className="text-zinc-600 text-xs mt-2">{prop.notes}</p>}
            </div>
          ))}
        </div>

        {/* Area Watchlist */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Amsterdam Area Watchlist</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-left border-b border-zinc-800">
                  <th className="pb-2">Area</th>
                  <th className="pb-2">Avg Price/m²</th>
                  <th className="pb-2">Trend</th>
                  <th className="pb-2">70m² Apartment</th>
                  <th className="pb-2">100m² House</th>
                </tr>
              </thead>
              <tbody>
                {propertyWatchlist.map(area => (
                  <tr key={area.area} className="border-b border-zinc-800/50">
                    <td className="py-2 text-zinc-300 font-medium">{area.area}</td>
                    <td className="py-2 text-zinc-400 font-mono">{area.avgPriceM2 ? `€${area.avgPriceM2.toLocaleString()}` : '—'}</td>
                    <td className="py-2 text-zinc-500">{area.trend || 'Researching...'}</td>
                    <td className="py-2 text-zinc-400 font-mono">{area.avgPriceM2 ? `€${(area.avgPriceM2 * 70 / 1000).toFixed(0)}K` : '—'}</td>
                    <td className="py-2 text-zinc-400 font-mono">{area.avgPriceM2 ? `€${(area.avgPriceM2 * 100 / 1000).toFixed(0)}K` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-zinc-600 text-xs mt-3">Prices update from research. Run /wealth-ops research to refresh.</p>
        </div>

        {/* Tax Strategy */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Tax Strategy — Real Estate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(taxStrategy).map(([key, value]) => (
              <div key={key} className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-800">
                <div className="text-zinc-400 text-xs mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-zinc-300 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mortgage Calculator Quick Reference */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Mortgage Capacity Estimate</h2>
          <div className="bg-zinc-800/30 rounded-xl p-5">
            <p className="text-zinc-400 text-sm mb-4">
              Fill in your Oracle gross salary in <code className="text-violet-400">data/wealth-ops.json</code> to calculate.
              Rough rule: max mortgage ≈ 4.5x gross annual salary.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[50000, 60000, 70000, 80000].map(salary => (
                <div key={salary} className="text-center">
                  <div className="text-zinc-500 text-xs">€{(salary/1000).toFixed(0)}K salary</div>
                  <div className="text-emerald-400 font-bold font-mono">€{(salary * 4.5 / 1000).toFixed(0)}K</div>
                  <div className="text-zinc-600 text-xs">max mortgage</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-4">
              <div className="text-emerald-400 font-medium text-sm">First-Time Buyer Advantage</div>
              <div className="text-zinc-400 text-xs mt-1">
                Under 35: No transfer tax (2%) on purchases up to €510K.
                On a €400K apartment = €8,000 saved.
              </div>
            </div>
            <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl p-4">
              <div className="text-violet-400 font-medium text-sm">NHG (Guarantee)</div>
              <div className="text-zinc-400 text-xs mt-1">
                Properties up to €435K: lower interest rate (~0.3% discount) + safety net if you can&apos;t pay. Worth it.
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Property Roadmap */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-zinc-300 mb-4">Multi-Property Roadmap</h2>
          <div className="space-y-4">
            <RoadmapItem
              year="Year 1-2 (2026-2027)"
              title="Primary Residence"
              description="Buy apartment in IJburg/Amsterdam area using Oracle salary. First-time buyer exemption. Build equity."
              status="researching"
            />
            <RoadmapItem
              year="Year 3-5 (2028-2030)"
              title="First Investment Property"
              description="BV has 3 years of financials. Buy rental property in Almere/Haarlem through BV for tax efficiency."
              status="future"
            />
            <RoadmapItem
              year="Year 5-10 (2030-2035)"
              title="Portfolio Expansion"
              description="Leverage equity from properties 1+2. International property (Portugal/Spain). Mix rental + personal."
              status="future"
            />
            <RoadmapItem
              year="Year 10+ (2035+)"
              title="Financial Independence"
              description="Rental income + business income covers expenses. Optional: sell, hold, or expand."
              status="future"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs py-6 border-t border-zinc-800/50">
          CONFIDENTIAL — Wealth Intelligence — frankx.ai/admin/wealth
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, { border: string; text: string }> = {
    emerald: { border: 'border-emerald-800/50', text: 'text-emerald-400' },
    teal: { border: 'border-teal-800/50', text: 'text-teal-400' },
    amber: { border: 'border-amber-800/50', text: 'text-amber-400' },
    violet: { border: 'border-violet-800/50', text: 'text-violet-400' },
  }
  const c = colors[color] || colors.emerald
  return (
    <div className={`bg-zinc-900/50 border ${c.border} rounded-xl p-4`}>
      <div className="text-zinc-500 text-xs mb-1">{label}</div>
      <div className={`text-2xl font-bold ${c.text}`}>{value}</div>
      <div className="text-zinc-600 text-xs">{sub}</div>
    </div>
  )
}

function RoadmapItem({ year, title, description, status }: {
  year: string; title: string; description: string; status: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
          status === 'researching' ? 'bg-amber-500' : 'bg-zinc-700'
        }`} />
        <div className="w-px h-full bg-zinc-800 mt-1" />
      </div>
      <div className="pb-4">
        <div className="text-zinc-500 text-xs mb-1">{year}</div>
        <div className="text-zinc-200 font-medium">{title}</div>
        <div className="text-zinc-500 text-sm mt-1">{description}</div>
      </div>
    </div>
  )
}
