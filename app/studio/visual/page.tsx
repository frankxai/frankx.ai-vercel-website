import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Layers,
  Camera,
  Film,
  Shield,
  Sparkles,
  Cpu,
  CircleDot,
  FileCode2,
  Workflow,
  Mic,
  Image as ImageIcon,
} from 'lucide-react'
import {
  platformPersonas,
  visualStack,
  platformRecipes,
  VIS_VERSION,
  VIS_SHIPPED,
} from '@/lib/visual-intelligence'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Visual Intelligence System — Drop Images, Get a Per-Platform Strategy | FrankX',
  description:
    'The substrate for FrankX visual production. Three asset tiers (NB2, Higgsfield, HyperFrames), nine platform personas, one drop-images workflow. Built on the existing /watch, /workshops, /aco, /library systems.',
  alternates: { canonical: 'https://frankx.ai/studio/visual' },
  openGraph: {
    title: 'Visual Intelligence System — Drop Images, Get a Per-Platform Strategy',
    description:
      'Three asset tiers, nine platform personas, one workflow. The visual substrate that turns raw imagery into per-platform content strategy.',
    url: 'https://frankx.ai/studio/visual',
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Intelligence System — Drop Images, Get a Per-Platform Strategy',
    description:
      'Three asset tiers, nine platform personas, one workflow.',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Visual Intelligence System — Drop Images, Get a Per-Platform Strategy',
  description:
    'A typed substrate (lib/visual-intelligence/), runtime (skill + command + agent), and public face that composes NB2, Higgsfield, and HyperFrames into a single drop-images workflow with per-platform persona enforcement.',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
  publisher: { '@type': 'Organization', name: 'FrankX', url: 'https://frankx.ai' },
  datePublished: VIS_SHIPPED,
  dateModified: VIS_SHIPPED,
  mainEntityOfPage: 'https://frankx.ai/studio/visual',
  inLanguage: 'en',
  keywords:
    'visual intelligence, AI image generation, Higgsfield, Nano Banana, HyperFrames, content strategy, social media, multimodal analysis',
}

const stackIcons: Record<string, typeof Layers> = {
  asset: Camera,
  composition: Film,
  gate: Shield,
}

const colorByKind = {
  asset: { ring: 'ring-emerald-400/30', text: 'text-emerald-400', glow: 'shadow-glow-tech' },
  composition: { ring: 'ring-cyan-400/30', text: 'text-cyan-400', glow: 'shadow-glow-tech' },
  gate: { ring: 'ring-white/15', text: 'text-white/70', glow: '' },
} as const

const spectrumChip = {
  tech: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30',
  soul: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30',
  bridge: 'bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/30',
} as const

const workflowSteps = [
  {
    n: '01',
    title: 'Drop',
    body: 'Paste images here, drop them in content/ingest/visual/, or upload a folder. The orchestrator reads each image multimodally.',
    icon: ImageIcon,
  },
  {
    n: '02',
    title: 'Analyze',
    body: 'Subject, mood, lighting, composition, brand-fit, conversion potential, spectrum. Recorded as structured signals.',
    icon: Sparkles,
  },
  {
    n: '03',
    title: 'Cross-reference',
    body: 'IIS priorities, content calendar, hook-learn analytics, existing /vis registry. The image lands inside your strategy, not next to it.',
    icon: Workflow,
  },
  {
    n: '04',
    title: 'Recommend',
    body: 'Per image, per platform: which persona, which hook pattern, which variants needed, which tool to fill the gap.',
    icon: CircleDot,
  },
  {
    n: '05',
    title: 'Ship or fill',
    body: 'If the image is ready: route through visual-creation gate to publish. If gaps exist: NB2 or Higgsfield queue with brand-tuned prompts.',
    icon: ArrowRight,
  },
]

export default function StudioVisualPage() {
  return (
    <main id="main" className="min-h-screen bg-[#0a0a0b] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO ----------------------------------------------------------- */}
      <section className="relative px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-6">
            Visual Intelligence System · v{VIS_VERSION} · {VIS_SHIPPED}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Drop images.
            <br />
            <span className="text-emerald-400">Get a per-platform strategy.</span>
          </h1>
          <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl mb-10">
            The substrate that connects your image catalog to your content calendar. Three asset
            tiers, nine platform personas, one workflow. Built on the systems already shipped at
            <Link href="/watch/shorts" className="text-emerald-400 hover:text-emerald-300 transition-colors"> /watch</Link>,
            <Link href="/workshops" className="text-emerald-400 hover:text-emerald-300 transition-colors"> /workshops</Link>,
            <Link href="/library" className="text-emerald-400 hover:text-emerald-300 transition-colors"> /library</Link>, and
            <Link href="/intelligence-system" className="text-emerald-400 hover:text-emerald-300 transition-colors"> /intelligence-system</Link>.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#runtime"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Open the runtime
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#stack"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              See the stack
            </Link>
          </div>
        </div>
      </section>

      {/* THE PROBLEM ---------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            The problem this solves
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
            Generation without strategy is noise.
          </h2>
          <div className="space-y-5 text-[17px] leading-relaxed text-white/80">
            <p>
              Every creator with NB2 access can generate a beautiful image. Few can answer the
              next question: <em>which platform, which post, which hook, which variant</em>. The
              gap between the image and the strategy is where most production capacity is lost.
            </p>
            <p>
              VIS closes that gap with three commitments: every platform gets one persona; every
              asset routes through one of three tiers; every ship walks the same gate. The system
              refuses anything generic — the cost of refusing is small, the cost of shipping
              generic is the rest of your year.
            </p>
          </div>
        </div>
      </section>

      {/* THE STACK ------------------------------------------------------ */}
      <section id="stack" className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The three-layer stack
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-3">
              What gets made. How it gets assembled. What stops bad work from shipping.
            </h2>
            <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl">
              Each layer has a single job. The boundaries are deliberate — without them, the
              system collapses into one tool fighting another.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {visualStack.map((layer) => {
              const Icon = stackIcons[layer.kind]
              const colors = colorByKind[layer.kind]
              return (
                <article
                  key={layer.kind}
                  className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-white/20 transition-colors`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-md bg-white/5 ring-1 ${colors.ring}`}>
                      <Icon className={`h-4 w-4 ${colors.text}`} aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">{layer.name}</h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">{layer.purpose}</p>
                  <ul className="space-y-3">
                    {layer.entries.map((entry) => (
                      <li key={entry.tool} className="border-t border-white/5 pt-3">
                        <p className="font-mono text-[12px] text-emerald-400/80 mb-1">
                          {entry.tool}
                        </p>
                        <p className="text-sm text-white/75 mb-1">{entry.role}</p>
                        <p className="text-xs text-white/50 leading-relaxed">{entry.whenToUse}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM PERSONAS --------------------------------------------- */}
      <section id="platforms" className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The nine platform personas
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-3">
              One persona per platform. A profile that tries to be everything is read as nothing.
            </h2>
            <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl">
              These are not aspirations — they are the operational rule used by{' '}
              <code className="font-mono text-emerald-400/80 text-sm">content-social-distributor</code>,
              the visual-intelligence skill, and the /visual-strategy command. Edit the
              substrate, every downstream surface updates.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {platformPersonas.map((p) => (
              <article
                key={p.platform}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-white/20 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-lg font-semibold text-white">{p.label}</h3>
                  <span className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full ${spectrumChip[p.spectrum]}`}>
                    {p.spectrum}
                  </span>
                </div>
                <p className="text-sm text-emerald-400/80 mb-3 italic">{p.persona}</p>
                <p className="text-xs text-white/55 leading-relaxed mb-4">{p.voicePosture}</p>

                <dl className="space-y-3 text-xs mt-auto">
                  <div>
                    <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">
                      Visual treatment
                    </dt>
                    <dd className="text-white/70 leading-relaxed">{p.visualTreatment}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">
                      Cadence
                    </dt>
                    <dd className="text-white/70">{p.cadence}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 mb-1 tracking-wide uppercase text-[10px]">
                      Asset source
                    </dt>
                    <dd className="flex flex-wrap gap-1">
                      {p.primaryAssetSource.map((src) => (
                        <span
                          key={src}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60"
                        >
                          {src}
                        </span>
                      ))}
                    </dd>
                  </div>
                  {p.forcingFunction && (
                    <div className="pt-2 border-t border-white/5">
                      <dt className="text-amber-400/70 mb-1 tracking-wide uppercase text-[10px]">
                        Forcing function
                      </dt>
                      <dd className="text-white/65 leading-relaxed">{p.forcingFunction}</dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THE WORKFLOW --------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The drop-images workflow
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-3">
              Five steps from raw image to ship-ready strategy.
            </h2>
            <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl">
              Run via{' '}
              <code className="font-mono text-emerald-400/80">/visual-strategy</code>, or
              dispatched automatically by the visual-intelligence-orchestrator agent on multi-image
              batches.
            </p>
          </div>

          <ol className="space-y-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              return (
                <li
                  key={step.n}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex gap-6 items-start"
                >
                  <div className="font-mono text-2xl text-emerald-400/40 shrink-0 w-12 tabular-nums">
                    {step.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-4 w-4 text-emerald-400" aria-hidden />
                      <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* THE RUNTIME ---------------------------------------------------- */}
      <section id="runtime" className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              The runtime
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-3">
              One command. One skill. One agent.
            </h2>
            <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl">
              VIS is operated through the existing FrankX surfaces — Claude Code today, any
              MCP-aware client tomorrow. Nothing custom; everything composable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-10">
            <RuntimeCard
              icon={Cpu}
              label="Slash command"
              name="/visual-strategy"
              body="Run on a batch of images. Returns per-image, per-platform recommendations and a gap-fill plan."
            />
            <RuntimeCard
              icon={Sparkles}
              label="Skill"
              name="visual-intelligence"
              body="Composes vis + brand-voice + social-media-strategy + nb-image + Higgsfield. Auto-triggers on visual-platform requests."
            />
            <RuntimeCard
              icon={Workflow}
              label="Agent"
              name="visual-intelligence-orchestrator"
              body="Multi-image batch handler. Sub-dispatches to vis, brand-voice, nb-image, and Higgsfield in parallel."
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 lg:p-8">
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium mb-4">
              Example invocation
            </p>
            <pre className="font-mono text-[13px] leading-relaxed text-white/80 overflow-x-auto">
{`# In Claude Code, point at a folder of images
/visual-strategy content/ingest/visual/2026-w19/

# Or paste images directly into the conversation and ask
"Run visual-strategy on these. Bias toward LinkedIn (NLDigital workshop)
and Spotify (Friday album drop). Use Higgsfield for variants needed."

# Output: per-image analysis + per-platform plan + gap-fill brief
# Drafts land in content/staging/visual/<batch-id>/`}
            </pre>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS --------------------------------------------------- */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
              How it composes
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-3">
              VIS is not a new system — it is the connective tissue.
            </h2>
            <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl">
              The asset, composition, and gate layers are already shipped. VIS adds the typed
              substrate, the persona matrix, and the workflow that ties them together.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <IntegrationCard
              href="/watch"
              name="Watch OS"
              role="Receives shorts cuts; feeds B-roll back into VIS for Reels variants."
            />
            <IntegrationCard
              href="/aco"
              name="Agentic Content Officer"
              role="The talking-head pipeline; VIS supplies cinematic cutaways via Higgsfield Soul ID."
            />
            <IntegrationCard
              href="/workshops"
              name="Workshop OS"
              role="Receives workshop hero imagery; per-attendee brief visuals via product-photoshoot."
            />
            <IntegrationCard
              href="/library"
              name="Library OS"
              role="Cover generation routes through nb-image; VIS curates which book gets a Higgsfield carousel."
            />
            <IntegrationCard
              href="/intelligence-system"
              name="Investment Intelligence"
              role="VIS analyzes Strategy Session diagrams for blog-post visualization."
            />
            <IntegrationCard
              href="/os"
              name="FrankX OS"
              role="VIS appears as the 9th OS module; cross-linked from every shipped surface."
            />
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className="border-t border-white/5 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4">
            Ready to drop images?
          </h2>
          <p className="text-[17px] leading-relaxed text-white/80 mb-10">
            Open Claude Code, run <code className="font-mono text-emerald-400/80">/visual-strategy</code>,
            and pass a batch of images. Or paste them straight into the conversation.
          </p>
          <div className="inline-flex items-center gap-3">
            <Link
              href="/os"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              See VIS in the FrankX OS
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-10 text-xs text-white/40 font-mono">
            v{VIS_VERSION} · shipped {VIS_SHIPPED} · MIT-aligned with the Library OS pattern
          </p>
        </div>
      </section>
    </main>
  )
}

// COMPONENTS -------------------------------------------------------

function RuntimeCard({
  icon: Icon,
  label,
  name,
  body,
}: {
  icon: typeof Cpu
  label: string
  name: string
  body: string
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30">
          <Icon className="h-4 w-4 text-emerald-400" aria-hidden />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium">{label}</p>
      </div>
      <p className="font-mono text-base text-white mb-3 break-all">{name}</p>
      <p className="text-sm text-white/60 leading-relaxed">{body}</p>
    </article>
  )
}

function IntegrationCard({
  href,
  name,
  role,
}: {
  href: string
  name: string
  role: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-white/20 hover:bg-white/[0.06] transition-colors flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
    >
      <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
        <FileCode2 className="h-4 w-4 text-emerald-400" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-display text-base font-semibold text-white">{name}</h3>
          <ArrowRight
            className="h-4 w-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all"
            aria-hidden
          />
        </div>
        <p className="text-sm text-white/60 leading-relaxed">{role}</p>
      </div>
    </Link>
  )
}
