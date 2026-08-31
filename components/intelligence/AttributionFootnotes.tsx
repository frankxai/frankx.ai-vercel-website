import { ExternalLink } from 'lucide-react'
import type { ExternalSource, LinkOnlySource } from '@/lib/intelligence/loader'

/**
 * Numbered attribution footnotes for every external figure on the page.
 *
 * Renders ALL states honestly, including the unflattering ones: a source that is
 * `pending` has never been fetched, one that is `unverified`/`blocked` is deliberately
 * held because its licence has not been read at source, and `link_only` sources are
 * named but never ingested. Hiding a held source would misstate how much of the page
 * is third-party evidence — the whole point of this component is that it cannot be
 * left off a page that shows external numbers.
 */

const STATUS_LABEL: Record<string, string> = {
  ok: 'active',
  pending: 'never fetched',
  failed: 'last fetch failed',
  unverified: 'held — licence unverified',
  blocked: 'held — licence blocked',
  revoked: 'held — licence revoked',
}

function statusTone(status: string): string {
  if (status === 'ok') return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
  if (status === 'pending' || status === 'failed') return 'text-zinc-400 border-white/10 bg-white/[0.02]'
  return 'text-amber-400 border-amber-400/20 bg-amber-400/5'
}

export function sourceRef(sources: ExternalSource[], id: string): string {
  const idx = sources.findIndex((s) => s.id === id)
  return idx === -1 ? '?' : String(idx + 1)
}

export default function AttributionFootnotes({
  sources,
  linkOnly,
}: {
  sources: ExternalSource[]
  linkOnly: LinkOnlySource[]
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
        Data sources &amp; licences
      </h3>
      <ol className="space-y-2 text-xs leading-relaxed text-zinc-400">
        {sources.map((s, idx) => (
          <li key={s.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-zinc-500">[{idx + 1}]</span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            >
              {s.id}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            <span className="font-mono text-zinc-500">{s.license}</span>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] ${statusTone(s.status)}`}
            >
              {STATUS_LABEL[s.status] ?? s.status}
            </span>
            {s.retrieved_at && (
              <span className="font-mono text-[10px] text-zinc-500">
                retrieved {s.retrieved_at.slice(0, 10)}
              </span>
            )}
            {s.status !== 'ok' && (
              <span className="basis-full pl-7 text-[11px] text-zinc-500">
                No figures from this source appear on this page.
              </span>
            )}
          </li>
        ))}
      </ol>
      {linkOnly.length > 0 && (
        <div className="mt-4 border-t border-white/5 pt-4">
          <p className="mb-2 text-[11px] text-zinc-500">
            Named but never ingested — their terms do not permit republishing figures here:
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {linkOnly.map((l) => (
              <li key={l.id}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-white"
                >
                  {l.label}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
