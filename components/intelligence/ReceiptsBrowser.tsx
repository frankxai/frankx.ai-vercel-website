import { ExternalLink } from 'lucide-react'
import type { Receipt } from '@/lib/intelligence/receipts'
import type { ReceiptProblem } from '@/lib/intelligence/receipts'

/**
 * Every receipt on disk, expandable to its task-level record, each linking the raw JSON
 * it was rendered from — the reader can verify any claim against the file itself.
 * Native <details> disclosure: no client bundle, keyboard-operable for free.
 *
 * Invalid receipt files are listed too. A receipt that failed validation is missing
 * evidence, and a page that counts receipts owes the reader the real denominator.
 */

export default function ReceiptsBrowser({
  receipts,
  problems,
}: {
  receipts: Receipt[]
  problems: ReceiptProblem[]
}) {
  return (
    <div className="space-y-3">
      {receipts.map((r) => (
        <details
          key={r.round_id}
          className="group rounded-2xl border border-white/5 bg-white/[0.01] p-5 open:border-white/10"
        >
          <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-white/90 group-open:text-white">
              {r.title}
            </span>
            <span className="flex items-center gap-3 font-mono text-[10px] text-zinc-500">
              <span>{r.date}</span>
              <span>{r.tasks.length} task{r.tasks.length === 1 ? '' : 's'}</span>
              <span aria-hidden className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
            <p className="text-xs leading-relaxed text-zinc-400">{r.methodology}</p>
            <p className="font-mono text-[11px] text-zinc-500">
              Contestants: {r.contestants.join(' · ')}
            </p>
            <ul className="space-y-3 text-xs">
              {r.tasks.map((t) => (
                <li
                  key={t.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-semibold text-zinc-200">{t.id}</span>
                      {t.category && (
                        <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300">
                          {t.category}
                        </span>
                      )}
                    </div>
                    {t.verification && (
                      <span className="font-mono text-[10px] text-zinc-500">
                        Gate: {t.verification}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-400">{t.prompt}</p>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {Object.entries(t.results ?? {}).map(([model, result]) => (
                      <div
                        key={model}
                        className="rounded-lg border border-white/[0.05] bg-black/30 px-2.5 py-2 font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-zinc-200">{model}</span>
                          <span
                            className={
                              result?.status === 'pass'
                                ? 'text-emerald-400'
                                : result?.status === 'fail'
                                  ? 'text-red-400'
                                  : 'text-amber-400'
                            }
                          >
                            {result?.status ?? 'unknown'}
                          </span>
                        </div>
                        {(typeof result?.latency_ms === 'number' ||
                          typeof result?.cost_usd === 'number') && (
                          <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-500 tabular-nums">
                            {typeof result?.latency_ms === 'number' && (
                              <span>{(result.latency_ms / 1000).toFixed(2)}s</span>
                            )}
                            {typeof result?.cost_usd === 'number' && (
                              <span>${result.cost_usd.toFixed(3)}</span>
                            )}
                          </div>
                        )}
                        {typeof result?.notes === 'string' && result.notes && (
                          <p className="mt-1 font-sans text-[11px] leading-snug text-zinc-400">
                            {result.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
              >
                Raw JSON receipt
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
              {r.visual_evidence?.screenshots?.map((shot, idx) => (
                <a
                  key={shot}
                  href={shot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200"
                >
                  Visual scorecard #{idx + 1}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </details>
      ))}
      {problems.length > 0 && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-xs text-amber-200/90">
          <p className="mb-1 font-semibold">
            {problems.length} receipt file{problems.length === 1 ? '' : 's'} failed validation and
            {problems.length === 1 ? ' is' : ' are'} not counted above:
          </p>
          <ul className="list-disc space-y-0.5 pl-4 font-mono text-[11px]">
            {problems.map((p) => (
              <li key={p.file}>
                {p.file}: {p.problem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
