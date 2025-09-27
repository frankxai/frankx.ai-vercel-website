import Link from 'next/link'

import songs from '@/data/songs.json'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'
import { createMetadata } from '@/lib/seo'

const songRecords = songs as SongRecord[]

const timeline = [
  {
    phase: 'Signal the Era',
    headline: 'Launch the Creation Chronicles Dispatch',
    description:
      'Share weekly intelligence from the FrankX field — essays, prompts, and sonic drops that help allies feel the Golden Age momentum.',
    action: 'Subscribe to Creation Chronicles',
    href: '#dispatch'
  },
  {
    phase: 'Activate the Circle',
    headline: 'Invite Allies into the Inner Realm',
    description:
      'Transition loyal readers into the Inner Circle where they receive vault access, live ritual labs, and rapid response from the agent team.',
    action: 'Explore the Realm Blueprint',
    href: '#inner-circle'
  },
  {
    phase: 'Transform With Systems',
    headline: 'Guide members into products and partnerships',
    description:
      'Orchestrate the Creative AI Toolkit, Vibe OS, and enterprise engagements as narrative arcs that keep members compounding results.',
    action: 'Browse Agentic Systems',
    href: '/products'
  }
]

const featuredEssays = [
  {
    title: 'The Golden Age of Intelligence Manifesto',
    summary: 'Define what the Golden Age looks like for creators, families, and enterprises — and why the Chronicles exist.',
    href: '/blog/golden-age-of-intelligence'
  },
  {
    title: 'Agentic SEO Publishing Masterplan',
    summary: 'Blueprint a 12-day surge that coordinates essays, satellite posts, and automation so stories flood every channel.',
    href: '/blog/agentic-seo-publishing-masterplan'
  },
  {
    title: 'Intelligence Atlas Volume I',
    summary: 'Show the research spine behind the Chronicles with adoption metrics, governance rituals, and drop roadmap.',
    href: '/intelligence-atlas'
  }
]

export const metadata = createMetadata({
  title: 'Creation Chronicles | FrankX.ai',
  description:
    'Step inside the Creation Chronicles — the storytelling, sonic, and strategic heartbeat of the FrankX.ai ecosystem.',
  keywords: [
    'creation chronicles',
    'frankx newsletter',
    'golden age of intelligence',
    'suno drops',
    'storytelling hub'
  ],
  path: '/creation-chronicles'
})

export default function CreationChroniclesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 pb-24 pt-40">
        <div className="absolute inset-0 opacity-60 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            Creation Chronicles
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Stories, Sound, and Systems for the Golden Age of Intelligence
          </h1>
          <p className="mt-6 text-base text-white/70 sm:text-lg">
            The Chronicles document everything our agents build — longform essays, ritual-ready music, and live dispatches
            from the intelligence frontier. Use this page as your map to every drop.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="https://frankx.ck.page/creation-chronicles"
              id="dispatch"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(99,102,241,0.45)] transition hover:-translate-y-1"
            >
              Join the Dispatch
            </Link>
            <Link
              href="/docs/membership-realm"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Realm Blueprint
            </Link>
          </div>
        </div>
      </header>

      <section id="inner-circle" className="bg-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white">Inner Circle & Realm Access</h2>
          <p className="mt-4 text-sm text-white/60">
            Members receive the Creation Chronicles vault, live ritual labs, and direct collaboration with the FrankX agent
            collective. It is the bridge between story and execution.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">What&apos;s inside</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>• Private vault with prompts, templates, and sonic assets updated weekly</li>
                <li>• Monthly Creation Chronicles Lab with live story reviews and music rituals</li>
                <li>• Direct line to the FrankX agent team for feedback and collaboration</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-primary-400/40 bg-primary-500/10 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">Become an insider</h3>
              <p className="mt-3 text-sm text-white/70">
                We are finalizing onboarding flows now. Join the early access list to receive pricing, launch bonuses, and a
                personal invite to the Realm beta.
              </p>
              <Link
                href="https://frankx.ck.page/realm"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(99,102,241,0.45)] transition hover:-translate-y-1"
              >
                Join the Early Access List
              </Link>
              <Link
                href="https://github.com/frankxai/frankx.ai-vercel-website/blob/main/docs/membership-realm.md"
                className="mt-4 block text-xs font-semibold uppercase tracking-[0.3em] text-primary-200 underline-offset-4 hover:underline"
              >
                View Realm Blueprint
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Chronicles Operating Timeline</h2>
          <p className="mt-4 text-center text-sm text-white/60">
            Every drop reinforces these phases — signal, activate, transform. Revisit them when planning new releases.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map((entry) => (
              <article key={entry.phase} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{entry.phase}</div>
                <h3 className="mt-3 text-xl font-semibold text-white">{entry.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{entry.description}</p>
                <Link
                  href={entry.href}
                  className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-200 underline-offset-4 hover:underline"
                >
                  {entry.action}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-940 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-semibold text-white">Featured Chronicles Essays</h2>
              <p className="text-sm text-white/60">
                These essays anchor the lore and strategy behind the Chronicles. Share them with allies who need the full
                context of our movement.
              </p>
              <div className="space-y-4">
                {featuredEssays.map((essay) => (
                  <article key={essay.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">{essay.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{essay.summary}</p>
                    <Link
                      href={essay.href}
                      className="mt-3 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-200 underline-offset-4 hover:underline"
                    >
                      Read the drop
                    </Link>
                  </article>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">Latest Suno Sessions</h3>
              <p className="mt-2 text-sm text-white/60">
                Use these tracks as ritual soundtracks for writing, strategy, or launching new offers. Each one is logged in
                the Creation Chronicles ledger.
              </p>
              <div className="mt-6">
                <SongGrid songs={songRecords} limit={3} />
              </div>
              <Link
                href="https://suno.com/@frankx"
                className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-200 underline-offset-4 hover:underline"
              >
                Explore entire Suno archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white">Stay in the Signal Loop</h2>
          <p className="mt-4 text-sm text-white/60">
            We send one focused transmission a week. No noise — just the latest story, framework, and soundtrack we are
            shipping with our agentic team.
          </p>
          <iframe
            src="https://embeds.beehiiv.com/3dca3b4d-918d-48fe-8d02-838d92d93a08?slim=true"
            title="Creation Chronicles Newsletter"
            className="mt-8 h-64 w-full rounded-2xl border border-white/10 bg-white/5"
          />
        </div>
      </section>
    </div>
  )
}
