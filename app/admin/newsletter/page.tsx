import Link from 'next/link'
import type { Metadata } from 'next'
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  FileText,
  Layers3,
  Mail,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { getNewsletterInventory } from '@/lib/newsletter/intelligence/data'
import { getExperimentWinner, rankExperimentVariants } from '@/lib/newsletter/intelligence/score'

export const metadata: Metadata = {
  title: 'Newsletter Cockpit · FrankX Admin',
  description: 'Private newsletter intelligence cockpit.',
  robots: { index: false, follow: false },
}

function statusClass(status: string) {
  if (status === 'sent' || status === 'approved' || status === 'approved-for-live') {
    return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
  }
  if (status === 'blocked' || status === 'fail') {
    return 'border-red-400/30 bg-red-400/10 text-red-200'
  }
  if (status === 'draft' || status === 'needs-review' || status === 'pending') {
    return 'border-amber-400/30 bg-amber-400/10 text-amber-200'
  }
  return 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Badge({ children, tone }: { children: React.ReactNode; tone?: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tone || statusClass('default')}`}>
      {children}
    </span>
  )
}

export default function AdminNewsletterPage() {
  const inventory = getNewsletterInventory()
  const activeExperiment = inventory.experiments[0]
  const rankedVariants = activeExperiment ? rankExperimentVariants(activeExperiment) : []
  const winner = activeExperiment ? getExperimentWinner(activeExperiment) : null
  const trackedIssues = inventory.calendarItems.filter((item) => item.source === 'issue')
  const plannedIssues = inventory.calendarItems.filter((item) => item.source === 'plan')
  const nextIssue = inventory.calendarItems.find((item) => item.status !== 'sent' && item.status !== 'archived')

  return (
    <main className="min-h-screen bg-[#030712] px-4 pb-20 pt-24 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              <Mail className="h-4 w-4" />
              FrankX Newsletter Intelligence
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Newsletter Cockpit</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Editorial calendar, issue archive, simulation lab, compliance gate, and offer map for the FrankX weekly
              operating note. The standard is simple: useful if they never buy, precise enough that the right person
              wants to reply.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Next best action
            </div>
            <h2 className="text-lg font-semibold">{nextIssue ? `Issue ${nextIssue.issue}: ${nextIssue.title}` : 'No open issue'}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {nextIssue
                ? `${nextIssue.primaryCta} Planned for ${formatDate(nextIssue.date)}.`
                : 'All tracked issues are complete.'}
            </p>
          </div>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Tracked', value: inventory.stats.trackedEditions, icon: Layers3 },
            { label: 'Drafts', value: inventory.stats.draftIssues, icon: FileText },
            { label: 'Published', value: inventory.stats.publishedIssues, icon: CheckCircle2 },
            { label: 'Planned', value: inventory.stats.plannedEditions, icon: CalendarDays },
            { label: 'Experiments', value: inventory.stats.activeExperiments, icon: RadioTower },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{stat.label}</span>
                  <Icon className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="mt-3 text-3xl font-bold">{stat.value}</div>
              </div>
            )
          })}
        </section>

        <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Content Calendar</h2>
              <p className="mt-1 text-sm text-slate-500">
                Past, current, and planned editions connected to stream, pillar, offer, and reader job.
              </p>
            </div>
            <Badge tone="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">weekly Friday system</Badge>
          </div>

          <div className="grid gap-3">
            {inventory.calendarItems.map((item) => (
              <div
                key={`${item.source}-${item.issue}`}
                className="grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4 lg:grid-cols-[72px_120px_1fr_180px_130px] lg:items-center"
              >
                <div className="font-mono text-sm text-slate-500">#{item.issue}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{formatDate(item.date)}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{item.source}</div>
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.userRole}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="border-white/10 bg-white/[0.04] text-slate-300">{item.pillar}</Badge>
                    <Badge tone="border-white/10 bg-white/[0.04] text-slate-300">{item.streamId}</Badge>
                    <Badge tone="border-white/10 bg-white/[0.04] text-slate-300">{item.offerId}</Badge>
                  </div>
                </div>
                <p className="text-xs leading-5 text-slate-400">{item.primaryCta}</p>
                <Badge tone={statusClass(item.status)}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Issue 5 Simulation Lab</h2>
                <p className="mt-1 text-sm text-slate-500">Copy variants, simulated reader response, and final approval state.</p>
              </div>
              {activeExperiment && <Badge tone={statusClass(activeExperiment.decision.approvalState)}>{activeExperiment.decision.approvalState}</Badge>}
            </div>

            {activeExperiment ? (
              <div className="space-y-5">
                <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Decision</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{activeExperiment.decision.finalApproach}</p>
                  {winner && (
                    <p className="mt-3 text-sm text-white">
                      Winner: <span className="font-semibold text-cyan-200">{winner.label}</span>
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  {rankedVariants.map((score) => (
                    <div key={score.variantId} className="rounded-lg border border-white/10 bg-black/20 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{score.variant?.label || score.variantId}</h3>
                          <p className="mt-1 text-xs text-slate-500">{score.variant?.subject}</p>
                        </div>
                        <Badge tone="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">{score.weightedScore} score</Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-5 gap-2 text-center text-[11px] text-slate-400">
                        <span>Clarity {score.clarity}</span>
                        <span>Trust {score.trust}</span>
                        <span>Utility {score.utility}</span>
                        <span>Convert {score.conversionFit}</span>
                        <span>Retain {score.retentionFit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No active experiment found.</p>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <h2 className="text-lg font-semibold">Provider Gates</h2>
            </div>
            <div className="space-y-3">
              {inventory.providerStatus.map((provider) => (
                <div key={provider.provider} className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-semibold capitalize">{provider.provider}</span>
                    <Badge
                      tone={
                        provider.liveActionAllowed
                          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                          : 'border-amber-400/30 bg-amber-400/10 text-amber-200'
                      }
                    >
                      {provider.liveActionAllowed ? 'live allowed' : 'approval gated'}
                    </Badge>
                  </div>
                  <p className="text-xs leading-5 text-slate-500">{provider.role}</p>
                  <div className="mt-3 text-xs text-slate-400">
                    Configured: <span className={provider.configured ? 'text-emerald-300' : 'text-slate-500'}>{provider.configured ? 'yes' : 'no'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center gap-2">
              <Network className="h-5 w-5 text-cyan-300" />
              <h2 className="text-lg font-semibold">Experience Map</h2>
            </div>
            <div className="space-y-3 text-sm leading-6 text-slate-400">
              <p>Free newsletter builds trust and reply signal.</p>
              <p>Educational streams turn a useful idea into a working artifact.</p>
              <p>Inner Circle gets the closer loop. ACOS gets the operating system. Enterprise gets architecture and governance.</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
              <h2 className="text-lg font-semibold">Offer Ladder</h2>
            </div>
            <div className="space-y-3">
              {inventory.offers.map((offer) => (
                <div key={offer.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{offer.name}</span>
                    <span className="text-[11px] text-slate-500">{offer.stage}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{offer.promise}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-300" />
              <h2 className="text-lg font-semibold">Editorial Rules</h2>
            </div>
            <div className="space-y-3 text-sm leading-6 text-slate-400">
              <p>Every issue must give away a real decision filter, artifact, or operating lens.</p>
              <p>Frank voice: direct, human, slightly raw, useful before it is polished.</p>
              <p>No live send without approval. No income claims. No vague transformation language without evidence.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Tracked Edition Archive</h2>
              <p className="mt-1 text-sm text-slate-500">All MDX editions currently tracked by the system.</p>
            </div>
            <Link
              href="/newsletter/archive"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Archive
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {trackedIssues.map((issue) => (
              <div key={issue.slug} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-sm text-slate-500">Issue {issue.issue}</span>
                  <Badge tone={statusClass(issue.status)}>{issue.status}</Badge>
                </div>
                <h3 className="font-semibold">{issue.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{issue.primaryCta}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {issue.connectsTo.slice(0, 3).map((connection) => (
                    <Badge key={connection} tone="border-white/10 bg-white/[0.04] text-slate-300">
                      {connection}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {plannedIssues.length > 0 && (
            <div className="mt-5 text-xs leading-5 text-slate-500">
              Planned but not yet drafted: {plannedIssues.map((issue) => `Issue ${issue.issue}`).join(', ')}.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
