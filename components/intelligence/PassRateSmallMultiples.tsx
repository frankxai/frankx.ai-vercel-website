import type { Receipt } from '@/lib/intelligence/receipts'

/**
 * One small panel per measured task, straight from the receipt files: which contestant
 * got which status, with n on every panel. No aggregation into a single rate — with one
 * round on the books a percentage would imply precision that does not exist. Statuses
 * are shown verbatim, including the unflattering ones (`blocked` means the harness
 * could not verify the task for anyone that day, and that is part of the record).
 */

function statusTone(status: string): string {
  if (status === 'pass') return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
  if (status === 'fail') return 'border-red-400/25 bg-red-400/10 text-red-300'
  return 'border-amber-400/25 bg-amber-400/10 text-amber-300'
}

export default function PassRateSmallMultiples({ receipts }: { receipts: Receipt[] }) {
  const panels = receipts.flatMap((r) =>
    r.tasks.map((t) => ({
      receipt: r,
      task: t,
      entries: Object.entries(t.results ?? {}) as [string, { status?: string }][],
    })),
  )
  if (panels.length === 0) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {panels.map(({ receipt, task, entries }) => (
        <div
          key={`${receipt.round_id}-${task.id}`}
          className="rounded-2xl border border-white/5 bg-white/[0.01] p-4"
        >
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h3 className="font-mono text-xs text-zinc-300">{task.id}</h3>
            <span className="font-mono text-[10px] text-zinc-500">
              n={entries.length} · {receipt.date}
            </span>
          </div>
          <ul className="space-y-1.5">
            {entries.map(([model, result]) => (
              <li key={model} className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-zinc-400">{model}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${statusTone(result?.status ?? 'unknown')}`}
                >
                  {result?.status ?? 'unknown'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
