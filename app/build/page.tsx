import Link from 'next/link'
import { ArrowRight, Shield, Heart, Layers } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { products, paidProducts } from '@/data/products'
import { PricingTable } from '@/components/funnel/PricingTable'

export const metadata = createMetadata({
  title: 'Build — The Six Primitives Stack',
  description:
    'Five tiers of the Build Your First AI Agent stack — from the €7 Pack to the €2,997 Founder\'s Circle. Built on the open Starlight Intelligence Protocol.',
  path: '/build',
})

const free = products.find((p) => p.tier === 'free')

export default function BuildHubPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero — restraint */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-4">
            Build · Five tiers · Built on Starlight Intelligence Protocol
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
            Pay only when paying saves you time.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed mb-3">
            Every product below is a superset of the one before. The free Primer is real
            — many builders ship on it. The paid tiers exist because curation, depth, and
            community are what convert "I read about agents" into "I deploy production agents."
          </p>
          <p className="text-sm text-zinc-500">
            One-time payment per tier. Lifetime access. 30-day no-questions refund on every
            paid tier. No subscriptions except community access (which renews monthly + cancels
            anytime).
          </p>
        </div>
      </section>

      {/* Free tier separately */}
      {free && (
        <section className="pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
              <div className="flex-1">
                <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">
                  Start here · Free · No card required
                </p>
                <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">{free.title}</h2>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">{free.positioning}</p>
                <ul className="space-y-1.5 mb-1">
                  {free.outcomes.slice(0, 3).map((o, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex gap-2">
                      <span className="text-emerald-400 flex-shrink-0">·</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/start-here"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 whitespace-nowrap transition-colors flex-shrink-0"
              >
                Get the free primer
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* The paid ladder */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">
              The paid ladder
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Each tier is a superset of the one below. Buy once at the level that fits — you
              can always upgrade later (we credit your previous purchase). Most builders find
              their match in the Toolkit.
            </p>
          </div>
          <PricingTable products={paidProducts()} />
        </div>
      </section>

      {/* Strategic Advisor — door #3, Executive Concierge.
          Intentionally restrained, off-palette (warm neutral on near-black, no
          gradient), so it reads as a different tier — not the next step up the
          ladder above, but a sideways door for a different audience. See
          docs/strategy/PREMIUM_OPERATIONS.md. */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#3a3833] bg-[#15140f] p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#a89c7d] mb-3">
                Strategic Advisor · By introduction
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#f5f1e6] mb-3 tracking-tight">
                For organizations operating at significant scale.
              </h2>
              <p className="text-sm text-[#bdb39c] leading-relaxed mb-2">
                Frank operates as a fractional Chief AI Architect for two to four
                organizations at a time. Engagement begins with a written one-page
                architecture brief, before any contract.
              </p>
              <p className="text-xs text-[#80785f] leading-relaxed">
                Scoped per engagement. No public pricing.
              </p>
            </div>
            <Link
              href="/engagements/strategic-advisor"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-[0.2em] font-medium border border-[#a89c7d]/40 bg-transparent text-[#e8dfc8] hover:bg-[#a89c7d]/10 hover:border-[#a89c7d]/70 whitespace-nowrap transition-colors flex-shrink-0"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>

      {/* Why paying is honest */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <Shield className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1.5">30-day refund, every tier</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If a paid tier doesn't earn its price back in saved time within 30 days, you
                don't pay for it. No questions, no friction.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <Layers className="w-5 h-5 text-cyan-400 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1.5">Built on open foundations</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The Starlight Intelligence Protocol is open and free. What you pay for is
                curation, depth, community, and the time we save you.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <Heart className="w-5 h-5 text-rose-400 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1.5">No upgrade pressure</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We don't push the next tier in your inbox. Upgrade when you've outgrown your
                current one — not because we manufactured urgency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The decoupling note */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              Why these products work without Frank's live involvement
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              The €7 / €197 / €497 / €997 tiers are designed to ship without Frank in the loop.
              You get your artifacts instantly, the community is practitioner-led, code review
              is AI-assisted with sanity checks, and the Architect tier templates are
              productized — not consultancy hours.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              That's not a downgrade. That's why the price is honest at this scale. You get
              the same Oracle EMEA AI Center of Excellence framework used in enterprise work:
              productized, reviewed, kept current.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              For the cases where Frank's actual judgment is the value (strategic decisions,
              hard board-level calls, network introductions), there's the{' '}
              <Link href="/founders-circle" className="text-rose-400 hover:text-rose-300 underline">
                Founder's Circle
              </Link>{' '}
              at €2,997 per quarter. 10 seats. Application only. Real scarcity.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">
            What's in each tier
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-3 font-medium text-zinc-300 w-[260px]">Capability</th>
                  {paidProducts().map((p) => (
                    <th key={p.slug} className="text-center py-3 px-3 font-medium text-zinc-300">
                      {p.title.replace('Six Primitives ', '')}
                      <div className="text-xs text-zinc-500 font-normal mt-1">€{p.pricing.eur.toLocaleString('en-IE')}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Six Primitives pocket book', tiers: ['pack', 'toolkit', 'mastery', 'architect', 'founders'] },
                  { label: 'Agent Card library', tiers: ['pack', 'toolkit', 'mastery', 'architect', 'founders'], note: ['5', '30+', '30+', '30+', '30+'] },
                  { label: 'Eval cases library', tiers: ['pack', 'toolkit', 'mastery', 'architect', 'founders'], note: ['15', '100', '100', '100', '100'] },
                  { label: '6 branch deep-dive videos', tiers: ['toolkit', 'mastery', 'architect', 'founders'] },
                  { label: 'Production patterns cookbook (50 patterns)', tiers: ['toolkit', 'mastery', 'architect', 'founders'] },
                  { label: 'Observability templates', tiers: ['toolkit', 'mastery', 'architect', 'founders'] },
                  { label: 'Discord community', tiers: ['toolkit', 'mastery', 'architect', 'founders'], note: ['—', '90 days', 'lifetime', 'lifetime', 'lifetime'] },
                  { label: '6-week structured cohort', tiers: ['mastery', 'architect', 'founders'] },
                  { label: 'AI-assisted code review queue', tiers: ['mastery', 'architect', 'founders'] },
                  { label: 'Custom Agent Card consulting', tiers: ['mastery', 'architect', 'founders'] },
                  { label: 'Office Hours archive (lifetime)', tiers: ['mastery', 'architect', 'founders'] },
                  { label: 'AI CoE template suite (6 pillars)', tiers: ['architect', 'founders'] },
                  { label: 'Oracle ADK + OAS deep-dive', tiers: ['architect', 'founders'] },
                  { label: 'Compliance + governance templates', tiers: ['architect', 'founders'] },
                  { label: 'Architects Slack (curated)', tiers: ['architect', 'founders'] },
                  { label: 'Personalized AI advisor agent', tiers: ['architect', 'founders'] },
                  { label: 'Quarterly intelligence reports', tiers: ['architect', 'founders'] },
                  { label: '4 hours/quarter of Frank\'s time', tiers: ['founders'] },
                  { label: '30-day async support per call', tiers: ['founders'] },
                  { label: 'Quarterly strategic AI retainer', tiers: ['founders'] },
                  { label: 'Direct email — 48h reply', tiers: ['founders'] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="py-2.5 px-3 text-zinc-300">{row.label}</td>
                    {paidProducts().map((p, ti) => {
                      const has = row.tiers.includes(p.tier)
                      const note = (row.note as string[] | undefined)?.[ti]
                      return (
                        <td key={p.slug} className="text-center py-2.5 px-3">
                          {note ? (
                            <span className={`text-xs ${has ? 'text-cyan-400' : 'text-zinc-600'}`}>{note}</span>
                          ) : has ? (
                            <span className="text-cyan-400">✓</span>
                          ) : (
                            <span className="text-zinc-700">—</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
