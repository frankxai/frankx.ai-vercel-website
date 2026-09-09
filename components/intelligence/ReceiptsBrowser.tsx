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
          <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
            <p className="text-xs leading-relaxed text-zinc-400">{r.methodology}</p>
            <p className="font-mono text-[11px] text-zinc-500">
              Contestants: {r.contestants.join(' · ')}
            </p>
            <ul className="space-y-1 text-xs">
              {r.tasks.map((t) => (
                <li key={t.id} className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-zinc-400">
                  <span className="text-zinc-300">{t.id}</span>
                  {Object.entries(t.results ?? {}).map(([model, result]) => (
                    <span key={model} className="text-[11px]">
                      {model}:{' '}
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
                    </span>
                  ))}
                </li>
              ))}
            </ul>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            >
              Raw JSON receipt
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
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
