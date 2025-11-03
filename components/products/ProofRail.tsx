import { Quote } from 'lucide-react'
import type { ProductSocialProofStat, ProductTestimonial } from '@/types/products'

interface ProofRailProps {
  stats: ProductSocialProofStat[]
  quotes: ProductTestimonial[]
}

export default function ProofRail({ stats, quotes }: ProofRailProps) {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row">
        <div className="flex-1 grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center text-white">
              <div className="text-3xl font-bold text-primary-200">{stat.number}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-6">
          {quotes.map((quote) => (
            <div key={quote.text} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-white/80">
              <Quote className="mb-4 h-6 w-6 text-primary-300" />
              <p className="text-lg leading-relaxed text-white/90">{quote.text}</p>
              <div className="mt-4 text-sm font-semibold text-primary-200">{quote.author}</div>
              {quote.role ? <div className="text-xs uppercase tracking-[0.3em] text-white/50">{quote.role}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
