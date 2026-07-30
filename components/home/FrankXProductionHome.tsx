import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  FileText,
  Layers3,
  Network,
  ShieldCheck,
} from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'

type LatestPost = {
  slug: string
  title: string
  description: string
  category: string
  readingTime: string
}

type FrankXProductionHomeProps = {
  latestPosts?: LatestPost[]
}

const proofArtifacts = [
  {
    type: 'Production guide',
    title: 'Production agentic AI systems',
    description:
      'Architecture, control points, and failure modes for moving an agent beyond the demo.',
    href: '/blog/production-agentic-ai-systems',
    action: 'Read the guide',
    Icon: FileText,
  },
  {
    type: 'Architecture library',
    title: 'Blueprints',
    description:
      'Reference patterns for teams replacing isolated AI tasks with bounded, inspectable workflows.',
    href: '/ai-architecture/blueprints',
    action: 'Review the patterns',
    Icon: Network,
  },
  {
    type: 'Field record',
    title: 'Journal',
    description:
      'Dated notes on what was built, what failed, and what changed in the operating model.',
    href: '/journal',
    action: 'Open the journal',
    Icon: BookOpen,
  },
]

const engagementSteps = [
  {
    number: '01',
    title: 'Map the queue',
    detail:
      'Name the approvals, replies, research, reporting, or handoffs that repeatedly return to you.',
  },
  {
    number: '02',
    title: 'Bound the decisions',
    detail:
      'Define what the agent may decide, what still needs human approval, and what must never happen.',
  },
  {
    number: '03',
    title: 'Install and test one lane',
    detail:
      'Ship the smallest useful workflow with evaluation cases, cost limits, operating notes, and rollback.',
  },
]

export default function FrankXProductionHome({
  latestPosts = [],
}: FrankXProductionHomeProps) {
  return (
    <main className="relative overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_68%_12%,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_18%_0%,rgba(6,182,212,0.07),transparent_28%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto grid min-h-[88svh] min-w-0 max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pt-24">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300">
            Agentic systems for creator-operators
          </p>
          <h1 className="max-w-full font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:max-w-4xl sm:text-6xl lg:text-7xl">
            Remove one recurring workflow
            <span className="block text-white/70">from your daily path.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
            You already use AI. The approvals, replies, research, reporting, and handoffs still
            return to you. I map one queue, define what an agent may decide, install the smallest
            useful lane, and leave you with the tests, operating notes, and rollback path.
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <TrackedLink
              href="/work-with-me#contact"
              eventName="creator_funnel_step"
              eventProperties={{ surface: 'home_hero', step: 'map_workflow' }}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Map the workflow that waits on me
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </TrackedLink>
            <TrackedLink
              href="/build/six-primitives-toolkit"
              eventName="creator_funnel_step"
              eventProperties={{ surface: 'home_hero', step: 'inspect_toolkit_status' }}
              className="inline-flex min-h-11 max-w-md items-center gap-2 px-1 text-sm font-medium leading-6 text-white/75 underline decoration-white/40 underline-offset-8 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Already shipping agents? See the Toolkit’s release status.
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </TrackedLink>
          </div>

          <div className="mt-12 max-w-2xl border-t border-white/15 pt-5">
            <p className="text-sm leading-6 text-white/75">
              Frank Riemer · AI Architect · Independent practice
            </p>
            <p className="mt-2 max-w-xl text-xs leading-5 text-white/70">
              FrankX is not affiliated with, endorsed by, or sponsored by Oracle.
            </p>
          </div>
        </div>

        <figure className="relative mx-auto w-full min-w-0 max-w-[520px] lg:justify-self-end">
          <div className="absolute -inset-10 bg-emerald-400/10 blur-[100px]" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0d1111] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/5] min-h-[420px] sm:min-h-[540px]">
              <Image
                src="/images/portraits/frank-presenting-oracle-2025.jpg"
                alt="Frank Riemer presenting an AI architecture session"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#08100d] via-[#08100d]/20 to-transparent"
                aria-hidden="true"
              />
            </div>
            <figcaption
              data-home-proof-overlay
              className="absolute inset-x-0 bottom-0 min-w-0 max-w-full p-5 min-[360px]:p-6 sm:p-8"
            >
              <p className="max-w-full font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                Frank Riemer presenting an AI architecture session, 2025.
              </p>
              <p className="mt-3 max-w-full text-base leading-7 text-white sm:max-w-sm">
                A useful system makes its decisions visible: what it may do, when a person
                approves, how output is evaluated, what it may cost, and how it is stopped.
              </p>
            </figcaption>
          </div>
        </figure>
      </section>

      <section
        className="border-y border-white/10 bg-white/[0.02] py-24 lg:py-32"
        aria-labelledby="proof-title"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-300">
                Inspect before you decide
              </p>
              <h2
                id="proof-title"
                className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"
              >
                The operating ideas are public.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                Read the architecture, failure modes, and field record before deciding whether the
                approach fits your work.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {proofArtifacts.map(({ Icon, ...artifact }) => (
                <article
                  key={artifact.title}
                  className="group grid gap-5 py-7 sm:grid-cols-[44px_1fr_auto] sm:items-start"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {artifact.type}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{artifact.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                      {artifact.description}
                    </p>
                  </div>
                  <Link
                    href={artifact.href}
                    className="inline-flex min-h-10 items-center gap-2 self-center text-sm font-medium text-emerald-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    {artifact.action}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32" aria-labelledby="engagement-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200">
                One bounded engagement
              </p>
              <h2
                id="engagement-title"
                className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"
              >
                Start where work returns to you.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                The first decision is not a platform or transformation program. It is which
                recurring queue can safely leave your daily path.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4">
                <TrackedLink
                  href="/work-with-me#contact"
                  eventName="creator_funnel_step"
                  eventProperties={{ surface: 'home_engagement', step: 'map_workflow' }}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Map the workflow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="/workspace"
                  eventName="creator_funnel_step"
                  eventProperties={{ surface: 'home_engagement', step: 'inspect_workspace' }}
                  className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-white/75 underline decoration-white/35 underline-offset-8 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  See how the human-directed workspace runs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>

            <div className="relative border-l border-white/15 pl-7 sm:pl-10">
              {engagementSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={index === engagementSteps.length - 1 ? 'pb-0' : 'pb-14'}
                >
                  <span
                    className="absolute -left-[5px] mt-2 h-[9px] w-[9px] rounded-full bg-cyan-200"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[11px] text-cyan-200">{step.number}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-white/75">{step.detail}</p>
                </article>
              ))}

              <div className="mt-14 rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-white">The human boundary stays explicit.</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Consequential decisions keep human approval. Evaluation, cost, failure paths,
                      and rollback are part of the system from the beginning. A generated draft is
                      not a published FrankX position until its evidence, language, privacy, and
                      consequence have been reviewed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section
          className="border-y border-white/10 bg-[#0c0e0e] py-24 lg:py-32"
          aria-labelledby="notes-title"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-200">
                  Durable essays
                </p>
                <h2
                  id="notes-title"
                  className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
                >
                  The ideas behind the systems.
                </h2>
              </div>
              <div className="flex flex-wrap gap-5">
                <Link
                  href="/blog"
                  className="inline-flex min-h-10 items-center gap-2 text-sm text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  Browse essays <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/journal"
                  className="inline-flex min-h-10 items-center gap-2 text-sm text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  Read dated notes <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="grid gap-4 py-7 sm:grid-cols-[0.28fr_1fr_auto] sm:items-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                    {post.category} / {post.readingTime}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/75">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-emerald-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Layers3 className="mx-auto h-6 w-6 text-emerald-200" aria-hidden="true" />
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Name the workflow that waits on you.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
            If the right first move is not obvious, the start page routes by current state—from a
            first agent to production reliability, operations, or a creator system.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedLink
              href="/work-with-me#contact"
              eventName="creator_funnel_step"
              eventProperties={{ surface: 'home_closing', step: 'map_workflow' }}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Map the workflow <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/start"
              eventName="creator_funnel_step"
              eventProperties={{ surface: 'home_closing', step: 'choose_current_state' }}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Choose by current state <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  )
}
