import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import type { Product } from '@/data/products'

const COLOR_MAP: Record<NonNullable<Product['color']>, { ring: string; accent: string; bg: string }> = {
  zinc: { ring: 'ring-zinc-500/20', accent: 'text-zinc-300', bg: 'bg-zinc-500/5' },
  cyan: { ring: 'ring-cyan-500/30', accent: 'text-cyan-400', bg: 'bg-cyan-500/[0.04]' },
  violet: { ring: 'ring-violet-500/30', accent: 'text-violet-400', bg: 'bg-violet-500/[0.04]' },
  amber: { ring: 'ring-amber-500/30', accent: 'text-amber-400', bg: 'bg-amber-500/[0.04]' },
  emerald: { ring: 'ring-emerald-500/30', accent: 'text-emerald-400', bg: 'bg-emerald-500/[0.04]' },
  rose: { ring: 'ring-rose-500/30', accent: 'text-rose-400', bg: 'bg-rose-500/[0.04]' },
}

function formatPrice(eur: number): string {
  if (eur === 0) return 'Free'
  return `€${eur.toLocaleString('en-IE')}`
}

/**
 * PricingTable — restraint-first pricing display for the funnel hub.
 *
 * Renders all products in a single row on desktop, stacked on mobile. Each
 * card highlights the featured product without manipulative animation or
 * "limited time" tricks. Clicking goes to the product detail page; the buy
 * action lives on the detail page.
 */
export function PricingTable({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {products.map((p) => {
        const colors = COLOR_MAP[p.color]
        const isFeatured = p.featured ?? false
        return (
          <article
            key={p.slug}
            className={`relative rounded-2xl border p-6 flex flex-col ${
              isFeatured
                ? 'border-cyan-500/40 bg-cyan-500/[0.04] ring-1 ' + colors.ring
                : 'border-white/[0.08] bg-white/[0.02]'
            }`}
          >
            {isFeatured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-medium text-cyan-400 whitespace-nowrap">
                Most chosen
              </span>
            )}

            <header className="mb-5">
              <h3 className={`text-lg font-semibold mb-1 ${colors.accent}`}>{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed min-h-[2.5em]">{p.subtitle}</p>
            </header>

            <div className="mb-5">
              <p className="text-3xl font-bold text-white tracking-tight">
                {formatPrice(p.pricing.eur)}
                {p.pricing.eur > 0 && (
                  <span className="ml-1 text-xs font-normal text-zinc-500 align-baseline">
                    {p.pricing.cadence === 'application' ? 'per quarter' : 'lifetime'}
                  </span>
                )}
              </p>
              {p.pricing.usd && (
                <p className="text-xs text-zinc-500 mt-0.5">~${p.pricing.usd.toLocaleString('en-US')} USD</p>
              )}
              {p.seatsPerQuarter && (
                <p className="text-xs text-rose-400/80 mt-1.5">
                  {p.seatsPerQuarter} seats per quarter · application only
                </p>
              )}
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {p.outcomes.slice(0, 4).map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.accent}`} />
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>

            <Link
              href={p.tier === 'founders' ? '/founders-circle' : `/build/${p.slug}`}
              className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors border ${
                isFeatured
                  ? 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-500/30 text-cyan-300'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-zinc-200'
              }`}
            >
              Read details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        )
      })}
    </div>
  )
}
