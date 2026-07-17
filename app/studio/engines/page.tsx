import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Image as ImageIcon, Film, Layers, Zap, Terminal } from 'lucide-react'
import {
  genBackends,
  defaultStack,
  GEN_VERSION,
  GEN_SHIPPED,
  type GenBackend,
  type BackendStatus,
  type Tier,
} from '@/lib/gen'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Generation Engines — Pick Your Stack, Wire It in Minutes | FrankX',
  description:
    'The curated menu of image and video engines behind GenCreator OS — InfoGenius/Nano Banana, Higgsfield, fal.ai, GPT Image 2, and the frontier video models. What each is best for, what it costs, and the exact command to install it.',
  alternates: { canonical: 'https://frankx.ai/studio/engines' },
  openGraph: {
    title: 'Generation Engines — Pick Your Stack, Wire It in Minutes',
    description:
      'The curated menu of image and video engines behind GenCreator OS. Best-for, cost, and the exact install command for each.',
    url: 'https://frankx.ai/studio/engines',
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generation Engines — Pick Your Stack, Wire It in Minutes',
    description: 'The curated menu of engines behind GenCreator OS, with install commands.',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Generation Engines — the GenCreator OS engine registry',
  description:
    'A typed registry (lib/gen/backends.ts) of every image and video generation engine GenCreator OS can call, with tier, cost, best-for, and install steps for each.',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  datePublished: GEN_SHIPPED,
  dateModified: GEN_SHIPPED,
  mainEntityOfPage: 'https://frankx.ai/studio/engines',
  inLanguage: 'en',
  keywords:
    'AI image generation, AI video generation, Higgsfield, Nano Banana, fal.ai, GPT Image, Sora, Veo, Kling, MCP, GenCreator OS',
}

const tierMeta: Record<Tier, { label: string; icon: typeof ImageIcon; blurb: string }> = {
  'premium-hero': {
    label: 'Premium hero',
    icon: ImageIcon,
    blurb: 'Quality over volume — top-of-page stills, covers, infographics.',
  },
  'cinematic-video': {
    label: 'Cinematic video',
    icon: Film,
    blurb: 'Interactive frontier video + character consistency from the harness.',
  },
  batch: {
    label: 'Batch',
    icon: Layers,
    blurb: 'Cheap, high-volume — catalog runs and bulk B-roll.',
  },
  'alt-image': {
    label: 'Alt image',
    icon: ImageIcon,
    blurb: 'A second aesthetic read when the default feels off-lane.',
  },
  'frontier-video': {
    label: 'Frontier video (direct)',
    icon: Film,
    blurb: 'The raw models, direct — cheapest per call, most plumbing.',
  },
}

const tierOrder: Tier[] = [
  'premium-hero',
  'cinematic-video',
  'batch',
  'alt-image',
  'frontier-video',
]

const statusChip: Record<BackendStatus, { label: string; cls: string }> = {
  installed: { label: 'Installed', cls: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30' },
  'pending-auth': { label: 'Pending auth', cls: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30' },
  available: { label: 'Available', cls: 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30' },
  recommended: { label: 'Recommended', cls: 'bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/30' },
}

export default function StudioEnginesPage() {
  const stack = defaultStack()

  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO ----------------------------------------------------------- */}
      <section className="relative px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-6">
            Generation Engines · v{GEN_VERSION} · {GEN_SHIPPED}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl">
            Pick your engines.
            <br />
            <span className="text-emerald-400">Wire them in minutes.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-10">
            GenCreator OS isn&apos;t built on one model. It&apos;s a curated menu — premium hero
            stills, cinematic video, cheap batch, an alt-image lane — each routed through the same
            taste gate. This is the registry: what every engine is best for, what it costs, and the
            exact command to install it.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#engines"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              Browse the engines
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/studio/visual"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              See the visual stack
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY ----------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            Why a registry, not a winner
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            The engine is replaceable. The taste isn&apos;t.
          </h2>
          <div className="space-y-5 text-white/65 text-lg leading-relaxed">
            <p>
              Every model on this page will be obsolete within a year. Betting the system on one of
              them is how you rebuild it every time the frontier moves. So we don&apos;t. We keep a
              menu — and the part that&apos;s actually ours is the curation: which engine for which
              job, the taste lanes every output is held against, and the gate that refuses the
              generic.
            </p>
            <p>
              Pick the tiers you need. One premium-hero engine, one cinematic-video engine, one
              cheap batch lane covers most of a creator&apos;s year. The rest are there when a
              specific job calls for them.
            </p>
          </div>
        </div>
      </section>

      {/* DEFAULT STACK -------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The FrankX default stack
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Three engines cover most of the work.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              If you install nothing else, install these. Each owns one tier so they compose instead
              of competing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {stack.map((b) => {
              const Icon = tierMeta[b.tier].icon
              return (
                <div
                  key={b.id}
                  className="rounded-xl bg-[#111113] border border-white/5 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30">
                      <Icon className="h-4 w-4 text-emerald-400" aria-hidden />
                    </div>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-white/40">
                      {tierMeta[b.tier].label}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{b.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{b.tagline}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ENGINES -------------------------------------------------------- */}
      <section id="engines" className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              Every engine, by tier
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              What it&apos;s for. What it costs. How to install it.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              Status reflects this repo&apos;s actual wiring — never an aspiration. The registry
              lives at <code className="font-mono text-emerald-400/80 text-sm">lib/gen/backends.ts</code>.
            </p>
          </div>

          <div className="space-y-16">
            {tierOrder.map((tier) => {
              const engines = genBackends.filter((b) => b.tier === tier)
              if (engines.length === 0) return null
              const TierIcon = tierMeta[tier].icon
              return (
                <div key={tier}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-1.5 rounded-md bg-white/5 ring-1 ring-white/10">
                      <TierIcon className="h-4 w-4 text-emerald-400" aria-hidden />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {tierMeta[tier].label}
                    </h3>
                    <span className="text-sm text-white/40">{tierMeta[tier].blurb}</span>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-2">
                    {engines.map((b) => (
                      <EngineCard key={b.id} backend={b} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Got your stack wired?
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            The engines make the pixels. The taste lanes and the gate make them yours — six premium
            aesthetics, each enforced before anything publishes.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/studio/lanes"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              See the aesthetic lanes
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/studio/visual"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              The visual stack
            </Link>
          </div>
          <p className="mt-10 text-xs text-white/40 font-mono">
            v{GEN_VERSION} · registry at lib/gen/backends.ts · shipped {GEN_SHIPPED}
          </p>
        </div>
      </section>
    </main>
  )
}

// COMPONENTS -------------------------------------------------------

function EngineCard({ backend: b }: { backend: GenBackend }) {
  const chip = statusChip[b.status]
  return (
    <article className="rounded-xl bg-[#111113] border border-white/5 p-6 hover:border-white/10 transition-colors flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-display text-lg font-semibold text-white">{b.name}</h4>
          <p className="text-[11px] tracking-[0.15em] uppercase text-white/40 mt-1">
            {b.kind} · {b.access}
          </p>
        </div>
        <span className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full shrink-0 ${chip.cls}`}>
          {chip.label}
        </span>
      </div>

      <p className="text-sm text-white/70 leading-relaxed mb-4">{b.tagline}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {b.models.map((m) => (
          <span
            key={m}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/55"
          >
            {m}
          </span>
        ))}
      </div>

      <dl className="space-y-3 text-xs mb-5">
        <div>
          <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">Best for</dt>
          <dd className="text-white/70 leading-relaxed">
            <ul className="space-y-1">
              {b.bestFor.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-emerald-400/60 shrink-0" aria-hidden>
                    —
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="pt-2 border-t border-white/5">
          <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">Not when</dt>
          <dd className="text-white/55 leading-relaxed">{b.notWhen}</dd>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
          <div>
            <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">Auth</dt>
            <dd className="text-white/65 leading-relaxed">{b.auth}</dd>
          </div>
          <div>
            <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">Cost</dt>
            <dd className="text-white/65 leading-relaxed">
              {b.cost.shape === 'native-included' && (
                <span className="inline-block mb-1 font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-300/90 ring-1 ring-emerald-400/20">
                  ✓ no extra API cost
                </span>
              )}
              <span className="block">{b.cost.summary}</span>
            </dd>
          </div>
        </div>
        {b.subscription && (
          <div className="pt-2 border-t border-white/5">
            <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">Included in</dt>
            <dd className="text-white/65 leading-relaxed">{b.subscription}</dd>
          </div>
        )}
        {b.cost.note && (
          <p className="text-[11px] text-amber-300/70 leading-relaxed">{b.cost.note}</p>
        )}
        {b.whenWorthPaid && (
          <p className="text-[11px] text-white/45 leading-relaxed">
            <span className="text-white/60">When paid is worth it: </span>
            {b.whenWorthPaid}
          </p>
        )}
      </dl>

      {/* INSTALL */}
      <div className="mt-auto rounded-lg bg-black/30 ring-1 ring-white/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="h-3.5 w-3.5 text-emerald-400/70" aria-hidden />
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium">
            Install
          </p>
        </div>
        <ol className="space-y-3">
          {b.install.map((step, i) => (
            <li key={i} className="text-xs">
              <p className="text-white/70 mb-1.5 flex gap-2">
                <span className="text-emerald-400/50 font-mono shrink-0">{i + 1}.</span>
                <span>{step.label}</span>
              </p>
              {step.command && (
                <pre className="font-mono text-[11px] leading-relaxed text-emerald-300/80 bg-black/40 rounded px-3 py-2 overflow-x-auto mb-1.5 ml-5">
                  {step.command}
                </pre>
              )}
              {step.detail && (
                <p className="text-white/45 leading-relaxed ml-5">{step.detail}</p>
              )}
            </li>
          ))}
        </ol>
      </div>

      {b.docsUrl && (
        <a
          href={b.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-400/80 hover:text-emerald-300 transition-colors"
        >
          <Zap className="h-3 w-3" aria-hidden />
          Docs
          <ArrowRight className="h-3 w-3" aria-hidden />
        </a>
      )}
    </article>
  )
}
