import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, X, Palette } from 'lucide-react'
import { aestheticLanes, GEN_VERSION, GEN_SHIPPED, type AestheticLane } from '@/lib/gen'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Aesthetic Lanes — Premium Taste, Made Plural | FrankX',
  description:
    'Six first-class art directions behind GenCreator OS — liquid glass, anime, editorial, cinematic, noir-tech, studio-organic. Each a complete premium standard with its own references, palette, refusal list, and quality bar the gate enforces.',
  alternates: { canonical: 'https://frankx.ai/studio/lanes' },
  openGraph: {
    title: 'Aesthetic Lanes — Premium Taste, Made Plural',
    description:
      'Six first-class art directions, each with its own references, palette, refusals, and quality bar.',
    url: 'https://frankx.ai/studio/lanes',
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aesthetic Lanes — Premium Taste, Made Plural',
    description: 'Six first-class art directions, each a complete premium standard.',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Aesthetic Lanes — the GenCreator OS multi-lane taste substrate',
  description:
    'A typed substrate (lib/gen/lanes.ts) where each aesthetic lane — liquid glass, anime, editorial, cinematic, noir-tech, studio-organic — is a complete art direction with references, palette, prompt fragments, refusal list, and a quality bar the visual-creation gate enforces.',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  datePublished: GEN_SHIPPED,
  dateModified: GEN_SHIPPED,
  mainEntityOfPage: 'https://frankx.ai/studio/lanes',
  inLanguage: 'en',
  keywords:
    'aesthetic, art direction, liquid glass, anime, editorial, cinematic, design system, taste, AI image generation',
}

const spectrumChip = {
  tech: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30',
  soul: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30',
  bridge: 'bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/30',
} as const

export default function StudioLanesPage() {
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
            Aesthetic Lanes · v{GEN_VERSION} · {GEN_SHIPPED}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl">
            Premium taste,
            <br />
            <span className="text-emerald-400">made plural.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-10">
            Liquid-glass and Ghibli-grade anime are both &ldquo;on brand&rdquo; — because the brand
            is <em>premium, on the chosen lane</em>. Each lane below is a complete art direction:
            its own references, palette, prompt fragments, refusal list, and a quality bar the gate
            holds every output against. Not modes. Standards.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#lanes"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              See the lanes
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/studio/engines"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              The engines that render them
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY ----------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            Why lanes, not a style guide
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            One bar would force everything to look the same.
          </h2>
          <div className="space-y-5 text-white/65 text-lg leading-relaxed">
            <p>
              <code className="font-mono text-emerald-400/80 text-base">taste.md</code> encodes one
              aesthetic — the premium dark editorial register the site lives in. But a music cover
              and an enterprise architecture diagram should not share a quality bar. So taste goes
              plural without going loose: each lane is fully specified, and the{' '}
              <code className="font-mono text-emerald-400/80 text-base">visual-creation</code> gate
              checks output against the <em>chosen</em> lane&apos;s bar.
            </p>
            <p>
              The refusal lists are the point. A lane is defined as much by what it rejects as by
              what it renders. That&apos;s what keeps anime from collapsing into generic AI tropes
              and liquid-glass from becoming a blur filter.
            </p>
          </div>
        </div>
      </section>

      {/* LANES ---------------------------------------------------------- */}
      <section id="lanes" className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The six lanes
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Each a complete premium standard.
            </h2>
            <p className="text-base text-white/60 max-w-2xl">
              Source of truth at{' '}
              <code className="font-mono text-emerald-400/80 text-sm">lib/gen/lanes.ts</code>. Pass{' '}
              <code className="font-mono text-emerald-400/80 text-sm">--lane &lt;id&gt;</code> to{' '}
              <code className="font-mono text-emerald-400/80 text-sm">/gen</code> and the router
              bakes this art direction into the prompt and the gate.
            </p>
          </div>

          <div className="space-y-6">
            {aestheticLanes.map((lane) => (
              <LaneCard key={lane.id} lane={lane} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className="border-t border-white/5 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Pick a lane. Generate on it.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            The router pairs the lane with the validated prompt pattern for your use-case and the
            engine that renders it best — then walks the lane&apos;s quality bar before anything
            ships.
          </p>
          <div className="rounded-xl bg-[#111113] border border-white/5 p-6 lg:p-8 text-left max-w-xl mx-auto">
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium mb-4">
              Example
            </p>
            <pre className="font-mono text-[13px] leading-relaxed text-emerald-300/80 overflow-x-auto">
{`/gen "the ACOS orchestrator" \\
  --use-case hero --lane noir-tech --format web-wide`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  )
}

// COMPONENTS -------------------------------------------------------

function LaneCard({ lane }: { lane: AestheticLane }) {
  return (
    <article className="rounded-xl bg-[#111113] border border-white/5 p-6 lg:p-8 hover:border-white/10 transition-colors">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* LEFT — identity + palette */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-display text-2xl font-semibold text-white">{lane.name}</h3>
            <span
              className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full shrink-0 ${spectrumChip[lane.spectrum]}`}
            >
              {lane.spectrum}
            </span>
          </div>
          <p className="text-sm text-white/65 leading-relaxed mb-5">{lane.essence}</p>

          {/* palette swatches */}
          <div className="flex items-center gap-2 mb-5">
            <Palette className="h-3.5 w-3.5 text-white/30" aria-hidden />
            {[lane.palette.base, ...lane.palette.accents, lane.palette.ink].map((hex, i) => (
              <span
                key={`${hex}-${i}`}
                className="h-6 w-6 rounded-full ring-1 ring-white/10"
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>

          <dl className="space-y-3 text-xs">
            <Spec label="References">
              <ul className="space-y-1.5">
                {lane.references.map((r) => (
                  <li key={r.name} className="text-white/70 leading-relaxed">
                    <span className="text-white/90">{r.name}</span> — {r.why}
                  </li>
                ))}
              </ul>
            </Spec>
            <Spec label="Best for">
              <div className="flex flex-wrap gap-1.5">
                {lane.bestFor.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Spec>
            <Spec label="Best engines">
              <div className="flex flex-wrap gap-1.5">
                {lane.bestBackends.map((b) => (
                  <span
                    key={b}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300/80 ring-1 ring-emerald-500/20"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Spec>
          </dl>
        </div>

        {/* RIGHT — quality bar + refusals */}
        <div className="grid gap-5 sm:grid-cols-2 lg:border-l lg:border-white/5 lg:pl-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-400/70 font-medium mb-3">
              Quality bar
            </p>
            <ul className="space-y-2">
              {lane.qualityBar.map((q) => (
                <li key={q} className="flex gap-2 text-xs text-white/70 leading-relaxed">
                  <Check className="h-3.5 w-3.5 text-emerald-400/70 shrink-0 mt-0.5" aria-hidden />
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-rose-400/70 font-medium mb-3">
              Refuses
            </p>
            <ul className="space-y-2">
              {lane.refusals.map((r) => (
                <li key={r} className="flex gap-2 text-xs text-white/60 leading-relaxed">
                  <X className="h-3.5 w-3.5 text-rose-400/60 shrink-0 mt-0.5" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-white/40 mb-1.5 tracking-wide uppercase text-[10px]">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
