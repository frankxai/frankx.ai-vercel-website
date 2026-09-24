import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { PILLARS, pillarCounts } from '@/data/acos/agents'
import { catalogL99 } from '@/lib/acos/l99-score'
import { EmailSignup } from '@/components/email-signup'
import { ArrowRight, Github, Sparkles, CheckCircle2, Hammer, CircleDashed } from 'lucide-react'
import { InstallCommand } from '@/components/agents/install-command'

export const metadata: Metadata = {
  title: '99 Agents · Explore the catalog and ACOS source | FrankX',
  description: 'Explore the 99-role ACOS catalog and set up the public source installer. Standalone pillar packs are not available yet.',
  alternates: { canonical: 'https://frankx.ai/agents' },
  openGraph: {
    title: '99 Agents · ACOS catalog and public source',
    description: '11 pillars × 9 specialist roles. Public ACOS source is available; standalone packs are pre-launch.',
    url: 'https://frankx.ai/agents',
    siteName: 'FrankX',
    type: 'website',
  },
}

const ACCENT_GRADIENTS: Record<string, string> = {
  emerald: 'from-emerald-500/20 via-transparent to-transparent',
  cyan: 'from-cyan-500/20 via-transparent to-transparent',
  violet: 'from-violet-500/20 via-transparent to-transparent',
  amber: 'from-amber-500/20 via-transparent to-transparent',
  rose: 'from-rose-500/20 via-transparent to-transparent',
  sky: 'from-sky-500/20 via-transparent to-transparent',
  teal: 'from-teal-500/20 via-transparent to-transparent',
  fuchsia: 'from-fuchsia-500/20 via-transparent to-transparent',
  indigo: 'from-indigo-500/20 via-transparent to-transparent',
  lime: 'from-lime-500/20 via-transparent to-transparent',
  orange: 'from-orange-500/20 via-transparent to-transparent',
}

const ACCENT_BORDERS: Record<string, string> = {
  emerald: 'hover:border-emerald-400/40',
  cyan: 'hover:border-cyan-400/40',
  violet: 'hover:border-violet-400/40',
  amber: 'hover:border-amber-400/40',
  rose: 'hover:border-rose-400/40',
  sky: 'hover:border-sky-400/40',
  teal: 'hover:border-teal-400/40',
  fuchsia: 'hover:border-fuchsia-400/40',
  indigo: 'hover:border-indigo-400/40',
  lime: 'hover:border-lime-400/40',
  orange: 'hover:border-orange-400/40',
}

// Tier per pack. The free Foundation pack is the substrate every other pack
// composes; premium packs are curated bundles, currently pre-launch and
// collecting a waitlist (no pricing shown yet).
const PACK_TIERS: Record<string, 'free' | 'premium'> = {
  content: 'premium',
  music: 'premium',
  visuals: 'premium',
  books: 'premium',
  workshops: 'premium',
  research: 'premium',
  products: 'premium',
  business: 'premium',
  personal: 'premium',
  community: 'premium',
  meta: 'free',
}

export default function AgentsPage() {
  const counts = pillarCounts()
  const l99 = catalogL99()

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://frankx.ai/agents#page',
        name: '99 Agents · ACOS catalog and public source',
        description: 'The 99-role ACOS catalog and the public source installer. Standalone packs are pre-launch.',
        url: 'https://frankx.ai/agents',
        isPartOf: { '@type': 'WebSite', name: 'FrankX', url: 'https://frankx.ai' },
        hasPart: PILLARS.map((p) => ({
          '@type': 'Collection',
          name: `${p.title} Pack`,
          description: p.tagline,
          url: `https://frankx.ai/agents/packs/${p.id}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'FrankX', item: 'https://frankx.ai' },
          { '@type': 'ListItem', position: 2, name: 'Agents', item: 'https://frankx.ai/agents' },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <Script id="agents-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero — honest framing */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-[#02030b] to-cyan-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(161,72,221,0.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">
            ACOS · Catalog L{l99.level} · {counts.shipped}/{counts.total} shipped
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
              99 roles in the ACOS catalog.
            </span>
            <br />
            <span className="text-white/70">Set up the public source on yours.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
            This isn&rsquo;t a SaaS. There&rsquo;s no &ldquo;Orchestrator&rdquo; routing your requests to a hosted runtime.
            This catalog maps the roles behind Frank&rsquo;s creator workflows. The public ACOS repository has a source
            installer for Claude Code and project context generators for other runtimes. Standalone pillar packs are
            still being packaged; the command below installs the source system, not an individual pack.
          </p>

          <div className="mt-10">
            <InstallCommand />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/agents/packs/meta"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition-colors duration-150 ease-out hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              See the Foundation pack
            </Link>
            <Link
              href="/acos/agents"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See every agent <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/frankxai/agentic-creator-os"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" /> Clone on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* What you actually get */}
      <section className="border-t border-white/5 bg-[#06060a] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-center text-3xl font-bold text-white sm:text-4xl">What&rsquo;s in the public source</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
            The installer has different effects by runtime. Review the generated command and the source before running it.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Agent definitions',
                detail: 'Claude Code setup copies agent definitions to your Claude profile. Other runtime options generate project-level context or scaffolds, not the same agent installation.',
              },
              {
                title: 'Skills + commands',
                detail: 'Claude Code setup copies the available skills and commands. Existing files with matching names can be overwritten; back up your profile first.',
              },
              {
                title: 'Smoke fixtures + brand-gate',
                detail: 'The source repository includes tests and brand rules, but the installer does not make every catalog role dispatchable in every runtime.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/30">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The packs — 11 pillars */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">The 11 packs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              One planned pack per pillar, with nine roles in each catalog group. Standalone packs, including the free
              Foundation pack, are pre-launch; the public ACOS source installer above is available now.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => {
              const tier = PACK_TIERS[p.id]
              const shipped = p.specialists.filter((s) => s.status === 'shipped').length
              const inProgress = p.specialists.filter((s) => s.status === 'in-progress').length
              const gap = p.specialists.filter((s) => s.status === 'gap').length
              const pillarLevel = l99.pillars.find((pl) => pl.id === p.id)?.level ?? 0
              return (
                <Link
                  key={p.id}
                  href={`/agents/packs/${p.id}`}
                  className={`group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br ${ACCENT_GRADIENTS[p.accent]} p-6 transition ${ACCENT_BORDERS[p.accent]} hover:bg-white/[0.04]`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        Pillar {String(p.number).padStart(2, '0')}
                      </div>
                      <h3 className="mt-1 text-xl font-bold text-white">{p.title}</h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        tier === 'free'
                          ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-white/10 bg-white/5 text-white'
                      }`}
                    >
                      {tier === 'free' ? 'Free' : 'Premium'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{p.tagline}</p>

                  {/* Status mix */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    {shipped > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" /> {shipped} shipped
                      </span>
                    )}
                    {inProgress > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 font-semibold text-amber-300">
                        <Hammer className="h-3 w-3" /> {inProgress} in-prog
                      </span>
                    )}
                    {gap > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-400/20 bg-slate-500/10 px-2 py-0.5 font-semibold text-slate-300">
                        <CircleDashed className="h-3 w-3" /> {gap} gap
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-semibold text-purple-200">
                      <Sparkles className="h-3 w-3" /> L{pillarLevel}
                    </span>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3">
                    {tier === 'free' ? 'See free pack plan' : 'See pack & join waitlist'}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* The honest disclaimer */}
      <section className="border-t border-white/5 bg-[#06060a] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">What this is — and what it isn&rsquo;t</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300">What it is</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>&middot; Public ACOS source you can inspect and run locally</li>
                <li>&middot; Claude Code skill and agent copy; project context options for other runtimes</li>
                <li>&middot; A catalog that distinguishes shipped roles from work in progress</li>
                <li>&middot; Free Foundation and premium pillar pack plans, all pre-launch</li>
                <li>&middot; Source updates live in <code className="font-mono text-emerald-200">frankxai/agentic-creator-os</code></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/[0.04] p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-rose-300">What it isn&rsquo;t</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>&middot; Not a hosted SaaS — no managed runtime</li>
                <li>&middot; Not an &ldquo;Orchestrator&rdquo; that runs your work for you</li>
                <li>&middot; Not free credits — you pay your own AI provider</li>
                <li>&middot; Not vendor-locked — clone the spec, fork freely</li>
                <li>&middot; Not enterprise CoE consulting — creator tooling and a public source installer, not managed advisory work</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Explore the Foundation plan</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Nine infrastructure roles are mapped in the catalog. The standalone pack is not published yet; the public
            ACOS source installer above is the available setup path, and installs more than this one group.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/agents/packs/meta"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition-transform duration-150 ease-out hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02030b] active:scale-[0.97] motion-reduce:active:scale-100"
            >
              See the Foundation plan
            </Link>
          </div>

          <div className="mx-auto mt-14 max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-semibold text-white">Want the premium pillar packs?</h3>
            <p className="mt-2 text-sm text-white/70">
              Join the waitlist for a release update and build notes when a pack is ready.
            </p>
            <EmailSignup
              listType="premium-packs"
              compact
              placeholder="you@example.com"
              buttonText="Join the waitlist"
              className="mt-4"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
