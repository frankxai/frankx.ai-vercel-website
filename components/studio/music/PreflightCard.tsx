import type { PreflightCard as PreflightCardData } from '@/lib/music-video'
import { HIGGSFIELD_USD_PER_CREDIT } from '@/lib/music-video'

const LAYER_LABEL: Record<string, string> = {
  keyframe: 'L1 Keyframe',
  motion: 'L2 Motion',
  assembly: 'L3 Assembly',
}

const VERDICT: Record<
  PreflightCardData['verdict'],
  { label: string; className: string }
> = {
  ready: {
    label: 'Ready to render',
    className: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40',
  },
  'needs-brief': {
    label: 'Needs design brief',
    className: 'bg-white/5 text-white/70 ring-1 ring-white/15',
  },
  'over-budget': {
    label: 'Over budget — re-scope',
    className: 'bg-red-500/10 text-red-300 ring-1 ring-red-500/40',
  },
}

function usd(n: number): string {
  return n === 0 ? '$0' : `$${n.toFixed(2)}`
}

/**
 * The centerpiece: the operator's approve-or-reject surface. Renders the design
 * brief, the shot summary, the per-engine cost line items, the total, and the
 * ROI framing — everything weighed before a single second of motion is bought.
 */
export function PreflightCardView({ card }: { card: PreflightCardData }) {
  const e = card.estimate
  const verdict = VERDICT[card.verdict]
  const creditsUsd = e.totalHiggsfieldCredits * HIGGSFIELD_USD_PER_CREDIT

  return (
    <article className="rounded-xl bg-[#111113] border border-amber-500/15 overflow-hidden">
      {/* header */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 px-6 py-5 lg:px-8">
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-amber-400/70 font-medium mb-2">
            Pre-flight · approve before render
          </p>
          <h3 className="font-display text-xl font-semibold text-white">
            {card.songTitle}
          </h3>
          <p className="text-sm text-white/55 mt-1">
            {card.style} · {card.shotSummary}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase ${verdict.className}`}
        >
          {verdict.label}
        </span>
      </header>

      <div className="grid gap-px bg-white/5 lg:grid-cols-2">
        {/* design brief */}
        <div className="bg-[#111113] p-6 lg:p-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mb-4">
            Design brief
          </p>
          <dl className="space-y-4">
            <div>
              <dt className="text-[11px] tracking-wide uppercase text-amber-400/60 mb-1">
                Audience
              </dt>
              <dd className="text-sm text-white/75 leading-relaxed">
                {card.designBrief.audience}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-wide uppercase text-amber-400/60 mb-1">
                Emotional arc
              </dt>
              <dd className="text-sm text-white/75 leading-relaxed">
                {card.designBrief.arc}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-wide uppercase text-amber-400/60 mb-1">
                Hook doctrine
              </dt>
              <dd className="text-sm text-white/75 leading-relaxed">
                {card.designBrief.hook}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {card.formats.map((f) => (
              <span
                key={f}
                className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/60 ring-1 ring-white/10"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* cost */}
        <div className="bg-[#111113] p-6 lg:p-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium mb-4">
            Cost — {e.selectsMultiplier}× selects baked in
          </p>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-white/40">
                <th className="font-medium pb-2">Line item</th>
                <th className="font-medium pb-2 text-right tabular-nums">Qty</th>
                <th className="font-medium pb-2 text-right tabular-nums">USD</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {e.lineItems.map((li, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="py-2 pr-3">
                    <span className="block text-white/80">{li.label}</span>
                    <span className="block text-[10px] text-white/40 tracking-wide uppercase font-sans">
                      {LAYER_LABEL[li.layer]}
                      {li.higgsfieldCredits > 0 && ` · ${li.higgsfieldCredits} cr`}
                    </span>
                  </td>
                  <td className="py-2 text-right text-white/55 tabular-nums whitespace-nowrap">
                    {li.quantity}
                    <span className="text-white/30"> {li.unit}</span>
                  </td>
                  <td className="py-2 text-right text-white/80 tabular-nums">
                    {usd(li.usd)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/15">
                <td className="pt-3 text-white font-medium font-sans">Total</td>
                <td className="pt-3 text-right text-white/40 text-[11px] tabular-nums font-sans">
                  {e.totalHiggsfieldCredits} cr
                </td>
                <td className="pt-3 text-right font-mono text-base text-amber-400 font-semibold tabular-nums">
                  {usd(e.totalUsd)}
                </td>
              </tr>
            </tfoot>
          </table>

          <p className="mt-2 text-[11px] text-white/40">
            {e.totalHiggsfieldCredits} Higgsfield credits ≈ {usd(creditsUsd)} at the
            Plus rate, already counted in the total.
          </p>

          <dl className="mt-6 space-y-2 border-t border-white/5 pt-4 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-white/40">ROI — Spotify breakeven</dt>
              <dd className="text-white/70 tabular-nums">
                ~{e.breakevenSpotifyStreams.toLocaleString()} streams
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-white/40">ROI — sync breakeven</dt>
              <dd className="text-white/70 tabular-nums">
                {e.breakevenSyncDeals} sync deal{e.breakevenSyncDeals > 1 ? 's' : ''}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-white/40">Resonance</dt>
              <dd className="text-white/70">
                {e.resonanceScore != null
                  ? `${e.resonanceScore}/10`
                  : 'unscored — run virality_predictor'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  )
}
