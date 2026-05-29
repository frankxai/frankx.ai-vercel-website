import Link from 'next/link'
import { DECISION_MATRIX } from '@/lib/llm-hub/decisions'
import { getModel } from '@/lib/llm-hub/registry'

function ModelLink({ id }: { id: string }) {
  const m = getModel(id)
  if (!m) return <span className="text-white/40">{id}</span>
  return (
    <Link
      href={`/llm-hub/${id}`}
      className="font-medium text-white transition-colors hover:text-emerald-300"
    >
      {m.name}
    </Link>
  )
}

export function DecisionMatrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-white/40">
            <th className="py-3 pl-4 pr-6 font-medium">If you need…</th>
            <th className="py-3 pr-6 font-medium">Pick</th>
            <th className="py-3 pr-6 font-medium">Runner-up</th>
            <th className="py-3 pr-4 font-medium">Why</th>
          </tr>
        </thead>
        <tbody>
          {DECISION_MATRIX.map((row) => (
            <tr key={row.constraint} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
              <td className="py-3 pl-4 pr-6 font-medium text-white/80">{row.constraint}</td>
              <td className="py-3 pr-6">
                <ModelLink id={row.primaryId} />
              </td>
              <td className="py-3 pr-6 text-white/50">
                {row.altId ? <ModelLink id={row.altId} /> : <span className="text-white/20">—</span>}
              </td>
              <td className="py-3 pr-4 text-white/50">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
