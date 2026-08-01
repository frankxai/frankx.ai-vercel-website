import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Radio, Sparkles, Users } from 'lucide-react'
import {
  expertAuthorityConstraints,
  expertAuthorityEngineKeys,
  expertAuthorityStages,
  getExpertAuthoritySnapshot,
} from '@/lib/expert-authority-intelligence'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Live Audience Intelligence | Expert Authority System',
  description:
    'An anonymized, real-time view of Expert Authority diagnostic signals: stages, constraints, engine maturity, and founding-cohort demand.',
  robots: { index: false, follow: false },
}

const engineLabels = {
  expert: 'Expert Intelligence',
  audience: 'Audience Intelligence',
  authority: 'Authority Engine',
  product: 'Product Intelligence',
  funnel: 'Funnel Intelligence',
} as const

function percentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0
}

function DistributionRow({ label, value, total }: { label: string; value: number; total: number }) {
  const share = percentage(value, total)
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-zinc-200">{label}</span>
        <span className="tabular-nums text-zinc-500">{value} · {share}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
          style={{ width: `${share}%` }}
        />
      </div>
    </div>
  )
}

export default async function ExpertAuthorityInsightsPage() {
  let snapshot
  let dataAvailable = true

  try {
    snapshot = await getExpertAuthoritySnapshot()
  } catch (error) {
    console.error('Unable to load Expert Authority insight snapshot:', error)
    dataAvailable = false
    snapshot = {
      total: 0,
      stages: {},
      constraints: {},
      averageScores: {
        expert: 0,
        audience: 0,
        authority: 0,
        product: 0,
        funnel: 0,
      },
      foundingInterest: 0,
      updatedAt: new Date(0).toISOString(),
    }
  }

  const weakestAverage = [...expertAuthorityEngineKeys].sort(
    (a, b) => snapshot.averageScores[a] - snapshot.averageScores[b]
  )[0]
  const strongestDemand = [...expertAuthorityConstraints].sort(
    (a, b) => (snapshot.constraints[b] ?? 0) - (snapshot.constraints[a] ?? 0)
  )[0]

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href="/mvu/expert-authority"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Expert Authority diagnostic
          </Link>
        </div>
      </header>

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_34%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              Live audience intelligence
            </span>
            <span className="text-sm text-zinc-500">Anonymous aggregate evidence only</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            The room becomes the research system.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Every completed diagnostic updates the demand map: where experts are stuck, which engine governs the bottleneck, and where founding-product demand is concentrating.
          </p>

          {!dataAvailable && (
            <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-sm text-amber-100">
              The aggregate store is temporarily unavailable. Participant diagnostics and email delivery continue independently.
            </div>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/75 p-6">
              <Users className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-5 text-4xl font-semibold tabular-nums text-white">{snapshot.total}</div>
              <div className="mt-2 text-sm text-zinc-500">Completed diagnostics</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-950/75 p-6">
              <BarChart3 className="h-5 w-5 text-violet-300" aria-hidden="true" />
              <div className="mt-5 text-2xl font-semibold text-white">{strongestDemand}</div>
              <div className="mt-2 text-sm text-zinc-500">Most common primary constraint</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-950/75 p-6">
              <Sparkles className="h-5 w-5 text-fuchsia-300" aria-hidden="true" />
              <div className="mt-5 text-2xl font-semibold text-white">{engineLabels[weakestAverage]}</div>
              <div className="mt-2 text-sm text-zinc-500">Lowest average maturity</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-950/75 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Founding signal</div>
              <div className="mt-5 text-4xl font-semibold tabular-nums text-white">{snapshot.foundingInterest}</div>
              <div className="mt-2 text-sm text-zinc-500">Requested cohort consideration</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Authority stage distribution</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Where participants are now</h2>
            <div className="mt-8 space-y-6">
              {expertAuthorityStages.map((stage) => (
                <DistributionRow
                  key={stage}
                  label={stage}
                  value={snapshot.stages[stage] ?? 0}
                  total={snapshot.total}
                />
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Constraint distribution</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">What governs the next move</h2>
            <div className="mt-8 space-y-6">
              {expertAuthorityConstraints.map((constraint) => (
                <DistributionRow
                  key={constraint}
                  label={constraint}
                  value={snapshot.constraints[constraint] ?? 0}
                  total={snapshot.total}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="border-b border-white/10 bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Average engine maturity</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">The system-level opportunity</h2>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Scores run from 0 to 4. The lowest average engine is the strongest candidate for tomorrow’s content, free agent, workshop intervention, or founding offer.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {expertAuthorityEngineKeys.map((engine) => {
              const score = snapshot.averageScores[engine]
              return (
                <article key={engine} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
                  <div className="text-4xl font-semibold tabular-nums text-white">{score.toFixed(2)}</div>
                  <div className="mt-3 text-sm font-medium text-zinc-200">{engineLabels[engine]}</div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-300"
                      style={{ width: `${Math.round((score / 4) * 100)}%` }}
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">The learning loop</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Evidence, not audience theater.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
          These aggregates govern which prompts, agents, courses, offers, and conversion experiments should exist next. The system improves because participation changes the roadmap.
        </p>
        <Link
          href="/mvu/expert-authority"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100"
        >
          Complete the diagnostic
        </Link>
        <p className="mt-8 text-xs text-zinc-600">
          Last signal: {snapshot.total > 0 ? new Date(snapshot.updatedAt).toLocaleString('en-GB', { timeZone: 'Europe/Tallinn' }) : 'No submissions yet'}
        </p>
      </section>
    </main>
  )
}
