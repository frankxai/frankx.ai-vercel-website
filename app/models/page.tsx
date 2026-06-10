import Link from 'next/link'
import { ArrowRight, Compass, FileJson, Sparkles, Wrench } from 'lucide-react'
import { CategoryCard } from '@/components/models-hub/CategoryCard'
import { GenModelExplorer } from '@/components/models-hub/GenModelExplorer'
import {
  buildGenRows,
  getCategories,
  getGenModelsByCategory,
  getAllGenModels,
} from '@/lib/models-hub/registry'

const SOURCES = [
  { name: 'Artificial Analysis', role: 'Independent image/video/voice leaderboards', url: 'https://artificialanalysis.ai' },
  { name: 'OpenRouter', role: 'Live LLM pricing & availability', url: 'https://openrouter.ai/models' },
  { name: 'Vendor model cards', role: 'Self-reported capabilities (labelled)', url: 'https://frankx.ai/models' },
  { name: 'arcanea-studio', role: 'The generation engine — 200+ models via one proxy', url: 'https://github.com/frankxai/arcanea-studio' },
]

const FAQ = [
  {
    q: 'What is the best AI model in 2026?',
    a: 'It depends entirely on the modality and job. Image: Flux 2 / Imagen 4 (photoreal), Midjourney v7 (art), GPT Image 2 (instructions), Ideogram (text-in-image). Video: Veo 3.1 (cinematic + audio), Kling/Seedance (fidelity), Runway (all-rounder). Music: Suno (quality), Udio/ElevenLabs (licensing). Voice: ElevenLabs (cloning), Cartesia (latency). Use each category page for the verdict.',
  },
  {
    q: 'How is this different from a generation tool?',
    a: 'This hub is the decision layer — which model for which job, why, with sources. It is not a generator. To actually generate, the FrankX ecosystem uses arcanea-studio (200+ models via one proxy) and tools like Suno, Nano Banana, Higgsfield, and Veo. The hub tells you what to reach for; the studio runs it.',
  },
  {
    q: 'Which models are open-weight / self-hostable?',
    a: 'Image: Flux 2, Stable Diffusion 3.5. Video: Wan 2.6. Audio: Stable Audio (small tiers, on-device). Embeddings: Jina v5. Filter the explorer by "Open weights" to see them all.',
  },
  {
    q: 'How current is this?',
    a: 'Grounded in May 2026 public sources, refreshed continuously via the model-intelligence pipeline. Vendor-reported figures are labelled and pending independent reproduction — always verify pricing and benchmarks with the provider.',
  },
  {
    q: 'Can AI agents consume this?',
    a: 'Yes. The full multimodal registry — models, categories, verdicts, sources — is available as clean JSON at /models.json, with JSON-LD on every page and deep links in /llms.txt.',
  },
]

export default function ModelsHubPage() {
  const categories = getCategories()
  const rows = buildGenRows()
  const allModels = getAllGenModels()

  // Lead model per category (registry order is curated; first = lead pick).
  const leads = categories
    .map((c) => ({ category: c, model: getGenModelsByCategory(c.id)[0] }))
    .filter((x) => x.model)

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Generative AI Model Hub 2026',
    description: 'Every frontier generative AI model across image, video, audio, voice, embeddings, and world models.',
    itemListElement: allModels.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: m.name,
        applicationCategory: 'AIApplication',
        url: `https://frankx.ai/models/${m.category}/${m.id}`,
      },
    })),
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Models', item: 'https://frankx.ai/models' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute right-0 top-0 h-[40%] w-[60%]"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(236,72,153,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <section className="px-6 pb-12 pt-16">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-pink-400">
              Generative Intelligence Directory · Updated May 29, 2026
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Generative AI Model Hub <span className="text-white/40">2026</span>
            </h1>
            <p className="mb-4 max-w-3xl text-lg text-white/60">
              Every frontier model, every modality — image, video, music, voice, embeddings, and world models — in one
              decision layer. Which model for which job, why, with the sources. Built for humans and agents.
            </p>
            <p className="mb-8 max-w-3xl text-sm text-white/40">
              This is the deciding, not the doing. To generate, the FrankX stack runs models through{' '}
              <a href="https://github.com/frankxai/arcanea-studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">
                arcanea-studio
              </a>{' '}
              and tools like Suno, Nano Banana, Higgsfield, and Veo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#explorer" className="inline-flex items-center gap-2 rounded-lg border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm text-pink-300 transition-colors hover:border-pink-500/50">
                <Compass className="h-4 w-4" /> Explore all models
              </Link>
              <Link href="/llm-hub" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25">
                <Sparkles className="h-4 w-4" /> Text & LLM Hub
              </Link>
              <a href="/models.json" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25">
                <FileJson className="h-4 w-4" /> Agent JSON
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Modalities" value="7" />
              <Stat label="Models tracked" value={allModels.length.toString()} />
              <Stat label="Categories" value={categories.length.toString()} />
              <Stat label="Open-weight" value={allModels.filter((m) => /open/i.test(m.license || '')).length.toString()} />
            </div>
          </div>
        </section>

        {/* Category grid */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Browse by modality</h2>
              <p className="text-sm text-white/40">Seven categories. Pick the kind of thing you want to make.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CategoryCard isText />
              {categories.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          </div>
        </section>

        {/* Best in class */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Best in class, right now</h2>
              <p className="text-sm text-white/40">The lead pick per modality (May 2026). Tap for the full breakdown.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {leads.map(({ category, model }) => (
                <Link
                  key={category.id}
                  href={`/models/${category.id}/${model!.id}`}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
                  style={{ borderLeftColor: category.accent, borderLeftWidth: 3 }}
                >
                  <p className="mb-1 text-[10px] uppercase tracking-wider" style={{ color: category.accent }}>
                    {category.label}
                  </p>
                  <p className="text-sm font-semibold text-white">{model!.name}</p>
                  <p className="mt-1 text-xs text-white/45">{model!.highlight || model!.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Explorer */}
        <section id="explorer" className="scroll-mt-20 border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Model explorer</h2>
              <p className="text-sm text-white/40">Search, filter by modality and license, sort. Click any model for the full breakdown.</p>
            </div>
            <GenModelExplorer rows={rows} />
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Sources & the engine</h2>
              <p className="text-sm text-white/40">We synthesize; we don’t fabricate. Generation runs on the ecosystem’s own engine.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {SOURCES.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25">
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="mt-1 text-xs text-white/45">{s.role}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold">Frequently asked</h2>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors open:border-white/20 hover:border-white/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-white/30 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold">Go deeper</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Related href="/llm-hub" label="LLM Hub" title="Text & Reasoning Models" desc="Frontier LLMs, live pricing, agentic platforms, comparisons" accent="#a855f7" icon={<Sparkles className="h-4 w-4" />} />
              <Related href="/ai-ops/models-2026" label="Arena" title="Frontier Benchmark Arena" desc="Head-to-head LLM benchmark radar + ACOS routing" accent="#10b981" icon={<Compass className="h-4 w-4" />} />
              <Related href="https://github.com/frankxai/arcanea-studio" label="Engine" title="Arcanea Studio" desc="The generation engine — 200+ image/video/lipsync models via one proxy" accent="#ec4899" icon={<Wrench className="h-4 w-4" />} external />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 px-6 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm text-white/30">FrankX Intelligence Pipeline · Multimodal registry · Last refreshed May 29, 2026</p>
            <p className="mt-2 text-xs text-white/15">
              Source of truth: <code>data/generative-model-registry.json</code> · Agent surface: <a href="/models.json" className="underline">/models.json</a> · Maintained via <code>/new-gen-model</code>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="font-mono text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{label}</p>
    </div>
  )
}

function Related({ href, label, title, desc, accent, icon, external }: { href: string; label: string; title: string; desc: string; accent: string; icon: React.ReactNode; external?: boolean }) {
  const inner = (
    <>
      <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
        {icon} {label}
      </p>
      <h3 className="mb-1 flex items-center gap-1 text-sm font-semibold text-white">
        {title} <ArrowRight className="h-3 w-3 opacity-50" />
      </h3>
      <p className="text-xs text-white/45">{desc}</p>
    </>
  )
  const cls = 'group block rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25'
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
