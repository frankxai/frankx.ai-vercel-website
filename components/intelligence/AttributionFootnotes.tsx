import { ExternalLink } from 'lucide-react'

export interface ExternalSource {
  id: string
  url: string
  license: string
  attribution?: string
  retrieved_at: string | null
  status: string
  note?: string
}

export interface LinkOnlySource {
  id: string
  label: string
  url: string
  reason: string
}

interface AttributionFootnotesProps {
  sources: ExternalSource[]
  linkOnly?: LinkOnlySource[]
  generatedAt?: string | null
}

function formatRetrieved(iso: string | null) {
  if (!iso) return 'not yet retrieved'
  return `retrieved ${iso.slice(0, 10)}`
}

const STATUS_STYLE: Record<string, string> = {
  ok: 'border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-200/90',
  failed: 'border-amber-400/25 bg-amber-400/[0.06] text-amber-200/90',
  skipped: 'border-white/10 bg-white/[0.03] text-white/50',
  pending: 'border-white/10 bg-white/[0.03] text-white/50',
}

/**
 * Renders the provenance behind every external figure on the page.
 *
 * CC-BY and similar terms require source, licence and an indication that the
 * data was modified — normalising and merging IS adaptation, so the ingest
 * marks every figure `modified: true` and this component surfaces the licence
 * alongside it. `linkOnly` covers sources whose terms forbid redistribution:
 * they are named and linked here precisely because their numbers are absent.
 */
export function AttributionFootnotes({ sources, linkOnly = [], generatedAt }: AttributionFootnotesProps) {
  return (
    <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/70">
          Sources and licences
        </h3>
        {generatedAt ? (
          <span className="font-mono text-[10px] text-white/40">
            snapshot {generatedAt.slice(0, 10)}
          </span>
        ) : null}
      </div>

      <ol className="space-y-3">
        {sources.map((source, i) => (
          <li key={source.id} className="flex gap-3 text-xs leading-relaxed">
            <span className="mt-0.5 font-mono text-[10px] text-white/30">[{i + 1}]</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-white/80 transition-colors hover:text-white"
                >
                  {source.attribution ?? source.id}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                    STATUS_STYLE[source.status] ?? STATUS_STYLE.pending
                  }`}
                >
                  {source.status}
                </span>
              </div>
              <p className="mt-1 text-white/50">
                {source.license} · {formatRetrieved(source.retrieved_at)}
                {source.note ? ` · ${source.note}` : ''}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {linkOnly.length > 0 && (
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">
            Referenced, not reproduced
          </h4>
          <p className="mb-3 text-xs leading-relaxed text-white/50">
            These publish numbers this page deliberately does not carry — their terms
            do not permit redistribution here. Follow the link for their figures.
          </p>
          <ul className="space-y-2.5">
            {linkOnly.map((ref) => (
              <li key={ref.id} className="text-xs leading-relaxed">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-white/75 transition-colors hover:text-white"
                >
                  {ref.label}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <span className="text-white/40"> — {ref.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 border-t border-white/[0.06] pt-5 text-xs leading-relaxed text-white/40">
        Figures are normalised and merged from the sources above, so they are adapted
        rather than reproduced verbatim. Adoption share reflects gateway traffic — it
        measures usage, not quality.
      </p>
    </div>
  )
}
