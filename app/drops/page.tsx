import Link from 'next/link'
import { ArrowRight, Sparkles, Package, ArrowUpRight } from 'lucide-react'
import { membershipConfig } from '@/lib/membership'

export const metadata = {
  title: 'Weekly Drops | FrankX.AI',
  description: 'Inner Circle weekly drops: systems, templates, and assets.',
  robots: { index: false, follow: false },
}

const dropTypes = [
  {
    title: 'System Drop',
    description: 'A reusable workflow or framework packaged for immediate use.',
  },
  {
    title: 'Asset Drop',
    description: 'Prompts, templates, or code snippets that ship fast.',
  },
  {
    title: 'Momentum Drop',
    description: 'A tactical plan to keep output consistent for the week.',
  },
]

export default function DropsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-[0.18]" />
      <div className="absolute -bottom-[35%] left-[-10%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)] blur-[120px]" />

      <div className="relative z-10">
        <section className="pt-28 pb-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/70 mb-4">
              Weekly Drops
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              A new system, action, and asset every week.
            </h1>
            <p className="text-lg text-white/60 mb-10">
              Drops are the heartbeat of the Inner Circle. They keep shipping consistent and momentum high.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={membershipConfig.checkoutUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 font-semibold hover:bg-white/90 transition-all"
              >
                Unlock Weekly Drops
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/creation-chronicles"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                Join the free dispatch
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {dropTypes.map(drop => (
                <div key={drop.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-2 text-violet-400/70 mb-4">
                    <Package className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.2em]">Drop Type</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{drop.title}</h3>
                  <p className="text-sm text-white/60">{drop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Members get the archive</h2>
              <p className="text-sm text-white/60">
                Every drop stays in the Vault so you can revisit and reuse as your systems evolve.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
