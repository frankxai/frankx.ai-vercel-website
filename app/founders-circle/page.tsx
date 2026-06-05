import Link from 'next/link'
import { ArrowRight, Mail, Calendar, FileText, MessageSquare } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getProductBySlug } from '@/data/products'
import { OutcomeList } from '@/components/funnel/OutcomeList'
import { NotForBlock } from '@/components/funnel/NotForBlock'

export const metadata = createMetadata({
  title: 'Founder\'s Circle — Frank\'s Quarterly Strategic AI Retainer',
  description:
    'Four hours of Frank\'s time per quarter. 10 seats per quarter. Application only. €2,997. For founders, family-office advisors, and C-level architects whose problem is judgment under uncertainty — not artifacts.',
  path: '/founders-circle',
})

const founders = getProductBySlug('founders-circle')!

export default function FoundersCirclePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero — extreme restraint, NYT-longform */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/[0.03] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-rose-400 uppercase tracking-[0.18em] mb-6">
            Founder's Circle
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.05]">
            For founders whose problem is judgment, not artifacts.
          </h1>
          <p className="text-[17px] leading-relaxed text-white/80 mb-5 max-w-2xl">
            Most builders need templates. The Toolkit and Architect tiers are for them — and
            they are excellent. Some operators have a different problem.
          </p>
          <p className="text-[17px] leading-relaxed text-white/80 mb-10 max-w-2xl">
            Their decisions cost or earn millions. Their time is the constraint, not their
            budget. They have read the books and built the prototypes. What they need is a
            second brain who has shipped enterprise AI systems and can give them the
            single sentence that saves them six months. That's what the Circle is.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/founders-circle/apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Apply for the Circle
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:frank@frankx.ai?subject=Founder%27s%20Circle%20inquiry"
              className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Or email frank@frankx.ai
            </a>
          </div>

          <p className="text-xs text-zinc-500 mt-8 max-w-xl">
            10 seats per quarter. €2,997 per quarter. Real scarcity — that's how many
            quarterly retainer seats fit in Frank's calendar without diluting his Oracle work
            and FrankX building. Application form takes 8 minutes; reply within 5 business days.
          </p>
        </div>
      </section>

      {/* What you get — deliberately spartan */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 tracking-tight">
            What's in a quarter
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <Calendar className="w-6 h-6 text-rose-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">4 hours of Frank's time</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Calls — typically one per month, can be batched. Calendly access. Prep doc per
                call so the time is spent on judgment, not orientation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <MessageSquare className="w-6 h-6 text-rose-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">30-day async window per call</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Slack + email follow-up after each call. 48-hour reply on weekdays. Continuity
                preserved — emails don't become orphan threads.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <FileText className="w-6 h-6 text-rose-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Quarterly retainer document</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                4-8 page brief scoped to your situation. What to do this quarter, what to
                avoid, what to revisit next quarter. Delivered as PDF + plain-text companion.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <Mail className="w-6 h-6 text-rose-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Direct email — 48h reply</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Not a generic support inbox. Frank reads it personally. Reserved for Founder's
                Circle members. For when timing matters.
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mt-6 leading-relaxed">
            And everything in the{' '}
            <Link href="/build/six-primitives-architect" className="text-cyan-400 hover:text-cyan-300 underline">
              Architect tier
            </Link>
            : the AI Center of Excellence template suite, Oracle ADK + OAS deep-dive, the
            curated Architects Slack, the personalized AI advisor agent, and the quarterly
            intelligence reports. The artifacts are still part of the value — they just stop
            being the point.
          </p>
        </div>
      </section>

      {/* Outcomes — what you walk away with after a quarter */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <OutcomeList outcomes={founders.outcomes} />
          </div>
        </div>
      </section>

      {/* The honest bar — who this is for */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
            Who the Circle is genuinely for
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-white">Founders making AI bets that compound.</strong>{' '}
                Series B+ companies introducing agents into customer-facing products, internal
                operations, or governance functions. The decisions are reversible only at
                significant cost.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-white">Family-office advisors evaluating AI investments.</strong>{' '}
                You assess fund managers, portfolio companies, or direct investments. You need
                someone who has built agents at scale to sanity-check claims and surface what
                the founders won't tell you.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-white">CTOs / VP Eng building enterprise AI programs.</strong>{' '}
                You're standing up a CoE, navigating governance, picking platforms, briefing the
                board. You need a second brain who has done it across multiple enterprise deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Not for you if */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <NotForBlock items={founders.notFor} />
        </div>
      </section>

      {/* About Frank — restraint, single paragraph */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">
            About Frank
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">
            Frank Riemer is a former AI Architect from Oracle's EMEA AI Center of Excellence,
            where he built AI Center of Excellence frameworks for enterprise customers.
            He realized the same 6-pillar architecture (Strategy, Governance, Talent,
            Technology, Data, Ethics) translates directly to personal use — at 1/5000th the
            cost. On frankx.ai he makes the same enterprise-grade frameworks available openly.
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">
            Founder's Circle does not involve Oracle proprietary materials. Frank's prior
            Oracle work shaped the frameworks but is not part of what is delivered here.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            All work in the Circle is done under FrankX (Frank's separate Dutch BV).
            Confidentiality, NDAs, and conflict-of-interest screening are part of the
            application process.
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
            <h3 className="text-base font-semibold text-emerald-400 mb-2">
              The fit guarantee
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {founders.guarantee} The first call is the fit-check. If we both don't believe
              this is the right relationship after that conversation, you get a full refund and
              we part as friends. After call 1, refunds are pro-rated against calls used.
            </p>
          </div>
        </div>
      </section>

      {/* Apply CTA — bottom restate */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-8 text-center">
            <p className="text-xs font-medium text-rose-400 uppercase tracking-[0.18em] mb-3">
              Q2 2026 · 10 seats
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
              Apply for the next quarter
            </h3>
            <p className="text-[17px] text-zinc-300 max-w-lg mx-auto leading-relaxed mb-6">
              The application takes 8 minutes. We reply within 5 business days. If a current
              quarter is full, you'll be offered the next one.
            </p>
            <Link
              href="/founders-circle/apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Start the application
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-zinc-500 mt-5">
              Or email{' '}
              <a href="mailto:frank@frankx.ai" className="hover:text-zinc-300 underline">
                frank@frankx.ai
              </a>{' '}
              — Frank reads this directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
