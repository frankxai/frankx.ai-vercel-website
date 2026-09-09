import type { IntelligenceRow } from '@/lib/intelligence/rows'

/**
 * Server-rendered SVG price landscape: input price vs output price per million tokens,
 * log-log, one point per model the snapshot actually prices. Measured models — the ones
 * with a harness receipt — are emerald; everything else is a quiet outline.
 *
 * Deliberately NOT a cost-vs-capability chart. Capability on the y-axis would need a
 * pass-rate per model, and with one measured round that number would be theatre. Two
 * honestly sourced prices per model is what the data supports today; the axis upgrade
 * happens when enough rounds exist to make a rate mean something.
 *
 * Pure SVG in a server component: no client bundle, no hydration, hover detail via
 * native <title>. Reduced motion is trivially respected because nothing moves.
 */

const W = 720
const H = 420
const PAD = { top: 20, right: 24, bottom: 44, left: 56 }

function logScale(v: number, min: number, max: number, outMin: number, outMax: number): number {
  const t = (Math.log10(v) - Math.log10(min)) / (Math.log10(max) - Math.log10(min))
  return outMin + t * (outMax - outMin)
}

function niceTicks(min: number, max: number): number[] {
  const ticks: number[] = []
  for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++) {
    for (const m of [1, 2, 5]) {
      const v = m * 10 ** e
      if (v >= min && v <= max) ticks.push(v)
    }
  }
  return ticks
}

const fmt = (v: number) => (v >= 1 ? `$${v}` : `$${v.toFixed(2).replace(/0$/, '')}`)

export default function FrontierScatter({
  rows,
  sourceRef,
}: {
  rows: IntelligenceRow[]
  sourceRef: string
}) {
  const priced = rows.filter(
    (r) =>
      r.external.pricing &&
      typeof r.external.pricing.in_usd_per_m === 'number' &&
      typeof r.external.pricing.out_usd_per_m === 'number' &&
      r.external.pricing.in_usd_per_m > 0 &&
      r.external.pricing.out_usd_per_m > 0,
  )
  if (priced.length === 0) return null

  const xs = priced.map((r) => r.external.pricing!.in_usd_per_m as number)
  const ys = priced.map((r) => r.external.pricing!.out_usd_per_m as number)
  const xMin = Math.min(...xs) / 1.5
  const xMax = Math.max(...xs) * 1.5
  const yMin = Math.min(...ys) / 1.5
  const yMax = Math.max(...ys) * 1.5

  const px = (v: number) => logScale(v, xMin, xMax, PAD.left, W - PAD.right)
  const py = (v: number) => logScale(v, yMin, yMax, H - PAD.bottom, PAD.top)

  const measured = priced.filter((r) => r.hasReceipt)
  const retrievedAt = priced[0].external.pricing!.retrieved_at?.slice(0, 10)

  return (
    <figure className="rounded-3xl border border-white/5 bg-slate-950/40 p-5 md:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label={`Scatter plot of ${priced.length} models by input and output price per million tokens; ${measured.length} carry a harness receipt.`}
        >
          {niceTicks(xMin, xMax).map((t) => (
            <g key={`x${t}`}>
              <line
                x1={px(t)}
                x2={px(t)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="rgba(255,255,255,0.05)"
              />
              <text
                x={px(t)}
                y={H - PAD.bottom + 16}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(161,161,170,0.8)"
                fontFamily="monospace"
              >
                {fmt(t)}
              </text>
            </g>
          ))}
          {niceTicks(yMin, yMax).map((t) => (
            <g key={`y${t}`}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={py(t)}
                y2={py(t)}
                stroke="rgba(255,255,255,0.05)"
              />
              <text
                x={PAD.left - 8}
                y={py(t) + 3}
                textAnchor="end"
                fontSize="10"
                fill="rgba(161,161,170,0.8)"
                fontFamily="monospace"
              >
                {fmt(t)}
              </text>
            </g>
          ))}
          <text
            x={(PAD.left + W - PAD.right) / 2}
            y={H - 8}
            textAnchor="middle"
            fontSize="11"
            fill="rgba(161,161,170,0.9)"
          >
            Input price, USD per million tokens (log)
          </text>
          <text
            x={14}
            y={(PAD.top + H - PAD.bottom) / 2}
            textAnchor="middle"
            fontSize="11"
            fill="rgba(161,161,170,0.9)"
            transform={`rotate(-90 14 ${(PAD.top + H - PAD.bottom) / 2})`}
          >
            Output price, USD per million tokens (log)
          </text>

          {priced.map((r) => {
            const p = r.external.pricing!
            const cx = px(p.in_usd_per_m as number)
            const cy = py(p.out_usd_per_m as number)
            return (
              <g key={r.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r.hasReceipt ? 6 : 4.5}
                  fill={r.hasReceipt ? 'rgba(16,185,129,0.85)' : 'rgba(6,182,212,0.12)'}
                  stroke={r.hasReceipt ? 'rgba(16,185,129,1)' : 'rgba(6,182,212,0.55)'}
                  strokeWidth={r.hasReceipt ? 1.5 : 1}
                >
                  <title>
                    {`${r.name} — in ${fmt(p.in_usd_per_m as number)} / out ${fmt(p.out_usd_per_m as number)} per M tokens${r.hasReceipt ? ' · harness-measured' : ''}`}
                  </title>
                </circle>
                {r.hasReceipt && (
                  <text
                    x={cx + 9}
                    y={cy + 3}
                    fontSize="10"
                    fill="rgba(212,212,216,0.95)"
                  >
                    {r.name}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
          harness-measured ({measured.length})
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-cyan-400/60 bg-cyan-400/10" aria-hidden />
          priced, not yet measured ({priced.length - measured.length})
        </span>
        <span className="font-mono">
          n={priced.length} · prices from models.dev{sourceRef}
          {retrievedAt ? ` · retrieved ${retrievedAt}` : ''}
        </span>
      </figcaption>
    </figure>
  )
}
