import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  ExternalLink,
  HeartHandshake,
  LayoutDashboard,
  Network,
  PackageCheck,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { anaLinks } from '@/data/ana-collaboration'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ana Cecilia Cancino | Collaboration Review',
  description:
    'A guided collaboration space for Ana Cancino: review the HR operations proposal, team handoffs, and next-step ideas with Frank.',
  path: '/friends/ana',
  noindex: true,
})

const publicSignals = [
  {
    icon: BriefcaseBusiness,
    title: 'Structured recruiting',
    detail:
      'Ana has a real sequence for discovery, role definition, offers, recruiting delivery, invoicing, and client handoff.',
  },
  {
    icon: Users,
    title: 'Distributed-team leadership',
    detail:
      'Ana’s public work shows hands-on people operations, recruiting, and distributed-team coordination at Dasbanq.',
  },
  {
    icon: HeartHandshake,
    title: 'Human judgment stays central',
    detail:
      'The system can prepare and check the work. Ana and her clients remain accountable for people, price, and send decisions.',
  },
] as const

const anaJourney = [
  {
    step: '01',
    icon: Compass,
    status: 'Start here',
    title: 'The working proposal',
    detail: 'Review the client path, responsibility boundaries, focused 30-day validation, and the questions that still need Ana’s judgment.',
    href: anaLinks.teamPlan,
  },
  {
    step: '02',
    icon: LayoutDashboard,
    status: 'Optional preview',
    title: 'The shared-workspace concept',
    detail: 'See how one calm view could connect active work, templates, research, invoices, and handoffs while private records stay in approved systems.',
    href: anaLinks.privateWorkspace,
  },
  {
    step: '03',
    icon: PackageCheck,
    status: 'Ready for safe practice',
    title: 'The current HR workflow',
    detail: 'Open the team guide and run one fictional engagement before connecting templates or live client work.',
    href: anaLinks.kitDownload,
  },
  {
    step: '04',
    icon: HeartHandshake,
    status: 'Future decision',
    title: 'The Cecilia concept',
    detail: 'Explore whether a client-facing companion could strengthen Ana’s work, and compare the identity, ownership, privacy, and commercial choices first.',
    href: anaLinks.ceciliaRoom,
  },
  {
    step: '05',
    icon: Network,
    status: 'Technical reference',
    title: 'How the technical layer is governed',
    detail: 'Inspect the source-backed Vercel, Railway, and GCP patterns Frank uses when reliability, privacy, and clear ownership matter.',
    href: anaLinks.architectureAtlas,
  },
] as const

export default function AnaFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ana-gold/[0.55] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ana-gold/25 bg-ana-gold/[0.09] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-ana-cream">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Ana × FrankX · Working collaboration
            </div>

            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Ana built the method. This makes the handoffs lighter.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              Ana's strength is the care and judgment behind her recruiting and client work. This collaboration makes the shared rhythm easier to see: clear ownership, trusted templates, visible decisions, and reliable handoffs.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/[0.35] pl-4 text-sm leading-6 text-ana-cream/[0.72]">
              Para Ana y su equipo: el método ya existe. Ahora podemos hacerlo más fácil de compartir, revisar y mejorar juntos.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                Review the working proposal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={anaLinks.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/[0.78] transition hover:border-white/[0.35] hover:text-ana-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold">
                Visit Ana's site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside aria-label="What changed" className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl sm:p-5">
            <div className="rounded-[2.05rem] border border-white/[0.09] bg-black/[0.24] p-5 sm:p-7">
              <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What becomes easier</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Everyone sees the same client path.</h2>
              <p className="mt-4 text-sm leading-6 text-ana-cream/[0.58]">
                Your team already knows the work. This shared layer makes the current stage, owner, open decision, and approval visible without replacing the tools or judgment you trust.
              </p>

              <dl className="mt-7 divide-y divide-white/[0.09] border-y border-white/[0.09]">
                {[
                  ['01', 'Shared view', 'One current stage, owner, next action, and due date.'],
                  ['02', 'Clear decisions', 'Ana and client approvals stay explicit at every consequential step.'],
                  ['03', 'Safe start', 'Begin with a fictional case before using templates or live records.'],
                ].map(([number, label, value]) => (
                  <div key={number} className="grid gap-2 py-4 sm:grid-cols-[2.5rem_5.5rem_1fr] sm:items-start">
                    <dt className="font-mono text-xs text-ana-gold">{number}</dt>
                    <dt className="text-xs font-semibold tracking-[0.06em] text-white/40">{label}</dt>
                    <dd className="text-sm leading-6 text-ana-cream/[0.68]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What we are building from</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Ana's existing way of working is the foundation.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">
              This collaboration begins with what Ana has already made visible: thoughtful people operations, a clear recruiting sequence, and human judgment. Any deeper profile, client story, or future offer remains hers to review before it appears.
            </p>
          </div>

          <div className="mt-10 grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {publicSignals.map((signal, index) => {
              const Icon = signal.icon
              return (
                <article key={signal.title} className={`py-7 md:px-7 md:py-9 ${index > 0 ? 'border-t border-white/10 md:border-t-0' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-ana-gold/[0.22] bg-ana-gold/[0.08] text-ana-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold">{signal.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-ana-cream/[0.58]">{signal.detail}</p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={anaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-sm font-semibold text-ana-cream/[0.64] transition hover:border-white/30 hover:text-ana-cream">
              Ana on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href={anaLinks.kitStart} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-sm font-semibold text-ana-cream/[0.64] transition hover:border-white/30 hover:text-ana-cream">
              Open the HR Operations start guide
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12" aria-labelledby="ana-journey-title">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Choose where to begin</p>
            <h2 id="ana-journey-title" className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Start with the decision in front of you. Explore the rest when it becomes useful.
            </h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.62]">
              The working proposal is the clearest first step. The other paths are there when you want to inspect the practical workflow, a longer partnership, or the technical foundations.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {anaJourney.map((item) => {
              const Icon = item.icon
              return (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName="ana_journey_room_open"
                  eventProperties={{ step: item.step, destination: item.href }}
                  className="group flex min-h-64 flex-col rounded-[1.8rem] border border-white/[0.10] bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-ana-gold/[0.38] hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold motion-reduce:hover:translate-y-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-ana-gold">{item.step}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-ana-cream/[0.55]">{item.status}</span>
                  </div>
                  <Icon className="mt-9 h-6 w-6 text-ana-gold" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-ana-cream">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ana-cream/[0.56]">{item.detail}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ana-cream/[0.78] group-hover:text-ana-cream">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                  </span>
                </TrackedLink>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-ana-panel lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">The practical promise</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Keep the standards. Reduce the coordination effort.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ana-cream/[0.62]">
              Begin with one shared client path, keep private records in approved systems, work from copies of trusted templates, and make every consequential decision visible to the right person.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
                Review the proposal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={anaLinks.ceciliaRoom} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-black/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/75 transition hover:border-white/[0.35] hover:text-ana-cream">
                Explore the longer-term idea
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="border-t border-white/10 bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-center gap-3 text-ana-gold">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.08em]">Ana remains in control</span>
            </div>
            <p className="mt-5 text-lg leading-7 text-ana-cream/[0.72]">
              This unlisted page contains non-confidential proposal material only. Any biography, client example, testimonial, identity decision, or public launch stays with Ana.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-ana-cream/[0.48]">
              <CheckCircle2 className="h-4 w-4 text-emerald-200" aria-hidden="true" />
              Public facts and proposal language only
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
