import Link from 'next/link'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  ExternalLink,
  HeartHandshake,
  LayoutDashboard,
  MapPinned,
  Network,
  PackageCheck,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { anaLinks } from '@/data/ana-collaboration'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ana Cancino | Friend of FrankX',
  description:
    'Meet Ana Cancino and review the people-operations system Frank is preparing for her four-person HR team.',
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
      'Her current public profile and recent team updates point to hands-on people operations, recruiting, and coordination at Dasbanq.',
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
    title: 'The team operating plan',
    detail: 'See the complete client journey, decision gates, 30-day pilot, and the exact questions Frank needs Ana to answer.',
    href: anaLinks.teamPlan,
  },
  {
    step: '02',
    icon: LayoutDashboard,
    status: 'Team preview',
    title: 'The private-workspace model',
    detail: 'Explore how the daily board, templates, research, recruiting delivery, invoices, and handoffs fit together without moving private records into the site.',
    href: anaLinks.privateWorkspace,
  },
  {
    step: '03',
    icon: PackageCheck,
    status: 'Ready to rehearse',
    title: 'The installable HR Operations kit',
    detail: 'Start with the guided team route, then rehearse one fictional engagement before connecting any live client work.',
    href: anaLinks.kitDownload,
  },
  {
    step: '04',
    icon: MapPinned,
    status: 'Review together',
    title: 'The Tallinn Experience Foundry',
    detail: 'Choose which 90-minute experience is worth testing, inspect the participant artifact, and signal interest without implying a booking or affiliation.',
    href: anaLinks.tallinnFoundry,
  },
  {
    step: '05',
    icon: HeartHandshake,
    status: 'Decision needed',
    title: 'The Cecilia collaboration room',
    detail: 'Consider the name, product layers, partnership boundaries, and commercial models before identity, data, or money moves.',
    href: anaLinks.ceciliaRoom,
  },
  {
    step: '06',
    icon: Network,
    status: 'Public field guide',
    title: 'The AI Architecture atlas',
    detail: 'See the source-backed Vercel, Railway, and GCP patterns behind the systems Frank builds for founders and teams.',
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
              Friend of FrankX · People operations
            </div>

            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Ana already built the method. Now her team should be able to run it with her.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              Ana's strength is not a new AI idea. It is the careful recruiting and client process she has refined over years. Frank's role is to make that process easier to teach, repeat, and improve without taking judgment away from her.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/[0.35] pl-4 text-sm leading-6 text-ana-cream/[0.72]">
              Para Ana y su equipo: el método ya existe. El siguiente paso es hacerlo fácil de usar, revisar y enseñar.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ana-obsidian">
                See the team plan
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
              <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What changed</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">The work now has to travel through a team of four.</h2>
              <p className="mt-4 text-sm leading-6 text-ana-cream/[0.58]">
                That makes clarity more valuable than another tool. The team needs one shared sequence, one place for open decisions, and visible approval points.
              </p>

              <dl className="mt-7 divide-y divide-white/[0.09] border-y border-white/[0.09]">
                {[
                  ['01', 'Team', 'Four people, with Ana still carrying the final judgment.'],
                  ['02', 'Method', 'Strong and detailed, but difficult to teach from memory.'],
                  ['03', 'Next move', 'Rehearse one engagement on copies before touching live work.'],
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
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">What is visible today</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">A people operator with a process worth protecting.</h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.58]">
              These are the useful public signals. The deeper biography, credentials, client stories, and future brand language stay out until Ana reviews them.
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
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Explore what your energy unlocked</p>
            <h2 id="ana-journey-title" className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              One path through the work—without needing to understand every system first.
            </h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.62]">
              Start with the team plan. The other rooms let you inspect the practical build, the Tallinn idea, the longer partnership, and the technical foundation whenever curiosity pulls you there.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {anaJourney.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
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
                    Open this room
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-ana-panel lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">The collaboration</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Make the process lighter to operate, not lighter in standards.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ana-cream/[0.62]">
              The first build is intentionally practical: a shared workflow, private records outside GitHub, copied Google Docs templates, and approval gates the whole team can understand.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={anaLinks.teamPlan} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white">
                Review the operating proposal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={anaLinks.ceciliaRoom} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-black/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/75 transition hover:border-white/[0.35] hover:text-ana-cream">
                Consider the Cecilia idea
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="border-t border-white/10 bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-center gap-3 text-ana-gold">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">Review state</span>
            </div>
            <p className="mt-5 text-lg leading-7 text-ana-cream/[0.72]">
              This page is hidden from search while Ana reviews the wording. Identity, credentials, testimonials, client claims, and public indexing require her explicit approval.
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
