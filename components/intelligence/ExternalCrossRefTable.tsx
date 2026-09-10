import type { IntelligenceRow } from '@/lib/intelligence/rows'

/**
 * The priced models as a table, each figure carrying its footnote ref. Third-party
 * numbers only — the `measured` column says whether a harness receipt exists, never a
 * score. Wide content scrolls inside its own container; the page never scrolls
 * horizontally.
 */

const money = (v: number | null) => (typeof v === 'number' ? `$${v}` : '—')

export default function ExternalCrossRefTable({
  rows,
  sourceRef,
}: {
  rows: IntelligenceRow[]
  sourceRef: string
}) {
  const priced = rows.filter((r) => r.external.pricing)
  if (priced.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01]">
      <table className="w-full min-w-[560px] text-left text-xs">
        <thead>
          <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
            <th scope="col" className="px-4 py-3 font-semibold">Model</th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Input $/M{sourceRef}
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Output $/M{sourceRef}
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">Context</th>
            <th scope="col" className="px-4 py-3 font-semibold">Harness receipt</th>
          </tr>
        </thead>
        <tbody>
          {priced.map((r) => (
            <tr key={r.id} className="border-b border-white/5 last:border-0">
              <th scope="row" className="px-4 py-2.5 font-medium text-zinc-200">
                {r.name}
              </th>
              <td className="px-4 py-2.5 font-mono text-zinc-400">
                {money(r.external.pricing!.in_usd_per_m)}
              </td>
              <td className="px-4 py-2.5 font-mono text-zinc-400">
                {money(r.external.pricing!.out_usd_per_m)}
              </td>
              <td className="px-4 py-2.5 font-mono text-zinc-400">
                {r.external.contextTokens ? `${Math.round(r.external.contextTokens / 1000)}K` : '—'}
              </td>
              <td className="px-4 py-2.5">
                {r.hasReceipt ? (
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                    {r.measured.length} round{r.measured.length === 1 ? '' : 's'}
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-zinc-600">none yet</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
