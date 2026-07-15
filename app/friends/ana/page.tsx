import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'

import { anaLinks } from '@/data/ana-collaboration'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ana Cecilia Cancino | Collaboration Hub',
  description:
    'Dedicated FrankX collaboration hub for Ana: shared principles, Codex plugin updates, tools, and the upcoming Obsidian Second Brain guide.',
  path: '/friends/ana',
  noindex: true,
})

const principles = [
  {
    icon: HeartHandshake,
    title: 'Human judgment first',
    detail:
      'Technology supports the work; relationship, context, and consequential decisions remain human.',
  },
  {
    icon: Users,
    title: 'Clear collaboration',
    detail:
      'Shared work should make ownership, review, and the next decision easier to understand.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    detail:
      'Working material stays in approved private systems unless publication is explicitly agreed for a named destination.',
  },
] as const

const guideUpdates = [
  {
    icon: PackageCheck,
    status: 'Live',
    title: 'Codex Plugins for Teams',
    detail:
      'Practical operating guide: skills vs plugins, team sharing, permissions, and a release model that keeps private records out of the method.',
    href: anaLinks.codexPluginsGuide,
    cta: 'Read the guide',
  },
  {
    icon: Wrench,
    status: 'In build',
    title: 'Tools built for your team',
    detail:
      'Shared workflow, installable Codex plugin, and the starter kit that keep ownership, approval, and handoff explicit.',
    href: anaLinks.teamPlan,
    cta: 'Open the team workflow',
  },
  {
    icon: BookOpen,
    status: 'Upcoming',
    title: 'Obsidian Second Brain guide',
    detail:
      'How to run a calm second brain with Obsidian: capture, zones, retrieval, and agent-assisted maintenance without drowning in notes.',
    href: anaLinks.obsidianSecondBrainGuide,
    cta: 'Preview the guide',
  },
] as const

export default function AnaFriendPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ana-obsidian text-ana-cream">
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-ana-aurora" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ana-gold/60 to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ana-gold/25 bg-ana-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.08em]">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Ana × FrankX · Dedicated hub
            </div>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              One calm place for our collaboration.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-ana-cream/70 md:text-xl">
              This hub is the single site destination for collaboration material related to Ana. Working documents, implementation details, and private context remain in their approved systems.
            </p>
            <p className="mt-4 max-w-2xl border-l border-ana-gold/35 pl-4 text-sm leading-6 text-ana-cream/70">
              Para Ana y su equipo: un solo punto de entrada, límites claros y control explícito sobre lo que se comparte.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={anaLinks.teamPlan}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-6 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white"
              >
                Open the team workflow
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#guides"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/80 transition hover:border-white/35 hover:text-ana-cream"
              >
                Guides &amp; updates
              </a>
              <a
                href={anaLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 py-3 text-sm font-semibold text-ana-cream/80 transition hover:border-white/35 hover:text-ana-cream"
              >
                Visit Ana&apos;s site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_36px_130px_rgba(0,0,0,0.44)] backdrop-blur-2xl">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 sm:p-8">
              <Sparkles className="h-6 w-6 text-ana-gold" aria-hidden="true" />
              <p className="mt-6 text-xs font-semibold tracking-[0.08em] text-ana-gold">THE BOUNDARY</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Hub context stays in the hub.</h2>
              <p className="mt-4 text-sm leading-6 text-ana-cream/60">
                Approval for this space does not automatically approve a blog post, newsletter, social post, downloadable asset, repository, or other public route.
              </p>
              <div className="mt-7 rounded-2xl border border-ana-gold/20 bg-ana-gold/[0.07] p-5 text-sm leading-6 text-ana-cream/75">
                Any new destination requires a separate publication decision and a review of copy, metadata, images, downloads, and links.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="principles" className="px-5 pb-16 sm:px-8 md:pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">HOW WE WORK</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Useful collaboration needs a visible boundary.
          </h2>
          <div className="mt-10 grid border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <article
                  key={principle.title}
                  className={`py-8 md:px-8 md:py-10 ${index > 0 ? 'border-t border-white/10 md:border-t-0' : ''}`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-ana-gold/20 bg-ana-gold/[0.08] text-ana-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ana-cream/60">{principle.detail}</p>
                </article>
              )
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={anaLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-ana-cream/70 transition hover:border-white/30 hover:text-ana-cream"
            >
              Ana on LinkedIn
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={anaLinks.kitStart}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-ana-cream/70 transition hover:border-white/30 hover:text-ana-cream"
            >
              HR Operations start guide
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="guides" className="px-5 pb-20 sm:px-8 md:pb-28 lg:px-12" aria-labelledby="ana-guides-title">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ana-gold/25 bg-ana-gold/[0.09] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-ana-cream">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Guides &amp; updates
            </div>
            <h2 id="ana-guides-title" className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Tools, plugins, and the second-brain path.
            </h2>
            <p className="mt-5 text-base leading-7 text-ana-cream/[0.62]">
              This page will also host updates for the Codex Plugins, other tools I am building for you, and the upcoming Obsidian Second Brain guide. My Agentic Team will maintain the site and link for you guides to follow to help you get started in building your agentic powered business.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {guideUpdates.map((guide) => {
              const Icon = guide.icon
              return (
                <TrackedLink
                  key={guide.title}
                  href={guide.href}
                  eventName="ana_guide_open"
                  eventProperties={{ guide: guide.title, status: guide.status }}
                  className="group flex min-h-64 flex-col rounded-[1.8rem] border border-white/[0.10] bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-ana-gold/[0.38] hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold motion-reduce:hover:translate-y-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-ana-gold/[0.22] bg-ana-gold/[0.08] text-ana-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-ana-cream/[0.55]">
                      {guide.status}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-ana-cream">{guide.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ana-cream/[0.56]">{guide.detail}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ana-cream/[0.78] group-hover:text-ana-cream">
                    {guide.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </span>
                </TrackedLink>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 md:pb-32 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-ana-panel lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.08em] text-ana-gold">Next useful step</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Review the shared workflow, then install only what you need.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ana-cream/[0.62]">
              The team workflow page carries the stage map and Codex plugin install. This hub stays the calm entry point and the place where new guides land.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={anaLinks.teamPlan}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ana-cream px-5 py-3 text-sm font-semibold text-ana-obsidian transition hover:bg-white"
              >
                Open team workflow
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={anaLinks.codexPluginsGuide}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.16] bg-black/[0.15] px-5 py-3 text-sm font-semibold text-ana-cream/75 transition hover:border-white/[0.35] hover:text-ana-cream"
              >
                Codex Plugins guide
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <aside className="border-t border-white/10 bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-center gap-3 text-ana-gold">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.08em]">Maintained for you</span>
            </div>
            <p className="mt-5 text-lg leading-7 text-ana-cream/[0.72]">
              My Agentic Team will keep this hub current: plugin updates, tool notes, and the Obsidian Second Brain guide as it expands.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}
