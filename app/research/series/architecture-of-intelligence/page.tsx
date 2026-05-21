import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Compass,
  Heart,
  Layers,
  Network,
  Sparkles,
} from 'lucide-react'
import { researchDomains, getDomainBySlug } from '@/lib/research/domains'

export const metadata: Metadata = {
  title: 'The Architecture of Intelligence | FrankX Research Series',
  description:
    'A research spine on how intelligence organizes itself across human minds, AI systems, meaning, and embodied life. Five connected briefs — IFS, Self-Led AI Architecture, the Predictive Mind, Meaning OS, Embodied Cognition — read as one argument.',
  alternates: {
    canonical: 'https://frankx.ai/research/series/architecture-of-intelligence',
  },
  openGraph: {
    title: 'The Architecture of Intelligence | FrankX Research',
    description: 'Five connected research briefs on how intelligence organizes itself — across mind, machine, meaning, and embodied life.',
    type: 'article',
    url: 'https://frankx.ai/research/series/architecture-of-intelligence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Architecture of Intelligence',
    description: 'A research spine on inner systems, agentic governance, predictive minds, meaning, and embodied cognition.',
  },
}

const SERIES_SLUGS = [
  'internal-family-systems',
  'self-led-ai-architecture',
  'predictive-mind',
  'meaning-os',
  'embodied-cognition',
] as const

const seriesDomains = SERIES_SLUGS
  .map((slug) => getDomainBySlug(slug))
  .filter((d): d is NonNullable<ReturnType<typeof getDomainBySlug>> => d !== undefined)

const sequenceNotes: Record<string, { stage: string; role: string }> = {
  'internal-family-systems': {
    stage: '01 — Foundation',
    role: 'The mind as a multi-agent system. Where the structural vocabulary comes from.',
  },
  'self-led-ai-architecture': {
    stage: '02 — Translation',
    role: 'The architectural pattern, applied to agentic systems. Where governance replaces obedience.',
  },
  'predictive-mind': {
    stage: '03 — Mechanism',
    role: 'Why parts hold predictive models. The convergence point with neuroscience and AI.',
  },
  'meaning-os': {
    stage: '04 — Integration',
    role: 'The relevance layer that determines which predictions, parts, and answers actually matter.',
  },
  'embodied-cognition': {
    stage: '05 — Grounding',
    role: 'The substrate the whole system runs on. Why disembodied intelligence has a ceiling.',
  },
}

const colorMap: Record<string, { border: string; text: string; bg: string; gradient: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/15 to-transparent' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/15 to-transparent' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/15 to-transparent' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/15 to-transparent' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/15 to-transparent' },
  indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', gradient: 'from-indigo-500/15 to-transparent' },
  lime: { border: 'border-lime-500/30', text: 'text-lime-400', bg: 'bg-lime-500/10', gradient: 'from-lime-500/15 to-transparent' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/15 to-transparent' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/15 to-transparent' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/15 to-transparent' },
  fuchsia: { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', gradient: 'from-fuchsia-500/15 to-transparent' },
  sky: { border: 'border-sky-500/30', text: 'text-sky-400', bg: 'bg-sky-500/10', gradient: 'from-sky-500/15 to-transparent' },
}

const companionContent = [
  { type: 'Flagship blog', title: 'No Bad Parts: What Richard Schwartz Teaches Us About Building Sovereign AI', href: '/blog/no-bad-parts-sovereign-ai' },
  { type: 'Companion blog', title: 'AI Agents Need an Inner Family, Not Just a Task List', href: '/blog/ai-agents-inner-family' },
  { type: 'Debugging brief', title: 'No Bad Parts: A Better Debugging Model for AI Failure Modes', href: '/blog/no-bad-parts-ai-debugging' },
  { type: 'Productized', title: 'Inner HR: The AI Agent for Your Internal Team', href: '/blog/inner-hr-ai-agent' },
  { type: 'Adjacent flagship', title: 'The Predictive Mind: Why You Don\'t See Reality, You See Your Model', href: '/blog/predictive-mind-reality-models' },
  { type: 'Daily practice', title: 'Internal Family Systems for Personal Development', href: '/guides/internal-family-systems-personal-development' },
  { type: 'Implementation guide', title: 'IFS as an AI Architecture Pattern', href: '/guides/ifs-ai-agent-architecture' },
  { type: 'Build guide', title: 'Inner HR — Building an AI System for Inner and Outer Team Alignment', href: '/guides/inner-hr-ai' },
]

const collectionLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://frankx.ai/research/series/architecture-of-intelligence',
  name: 'The Architecture of Intelligence',
  description: 'A FrankX research series on how intelligence organizes itself across mind, machine, meaning, and embodied life.',
  url: 'https://frankx.ai/research/series/architecture-of-intelligence',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://frankx.ai',
    name: 'FrankX',
  },
  hasPart: seriesDomains.map((d) => ({
    '@type': 'TechArticle',
    headline: d.title,
    url: `https://frankx.ai/research/${d.slug}`,
    description: d.tldr,
  })),
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://frankx.ai/research' },
      { '@type': 'ListItem', position: 3, name: 'Architecture of Intelligence', item: 'https://frankx.ai/research/series/architecture-of-intelligence' },
    ],
  },
})

export default function SeriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: collectionLd }}
      />
      <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0a0a0b]" />
          <div
            className="absolute top-0 left-1/4 w-[60%] h-[55%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.04) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[50%] h-[50%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.04) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute top-1/3 left-0 w-[40%] h-[40%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(132, 204, 22, 0.03) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section className="pt-28 pb-16 md:pt-36 md:pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Research Hub
              </Link>

              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                <span className="text-xs font-semibold text-rose-300/80 tracking-wider uppercase">
                  Research Series
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                The Architecture
                <span className="block bg-gradient-to-r from-rose-400 via-indigo-400 to-lime-400 bg-clip-text text-transparent">
                  of Intelligence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/65 mb-8 leading-relaxed max-w-3xl">
                Five connected research briefs on how intelligence organizes itself — across human minds, AI systems,
                meaning, and embodied life. Read as one continuous argument or pull individual threads.
              </p>

              <p className="text-base text-white/45 mb-10 max-w-3xl leading-relaxed">
                The frontier of AI is no longer compute, context, or benchmarks. It is architecture shaped by deeper
                models of mind. This series maps that architecture across five surfaces — IFS as structural vocabulary,
                Self-Led AI Architecture as the agentic translation, the Predictive Mind as the cognitive mechanism,
                Meaning OS as the relevance layer, and Embodied Cognition as the substrate the whole stack runs on.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
                {[
                  { label: 'Research briefs', value: '5', icon: Layers },
                  { label: 'Companion blogs', value: '5', icon: Brain },
                  { label: 'Implementation guides', value: '3', icon: Network },
                  { label: 'Convergence', value: 'IFS · AI · Mind', icon: Compass },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4">
                    <stat.icon className="w-4 h-4 text-white/30 mb-2" />
                    <p className="text-xl font-bold text-white mb-0.5">{stat.value}</p>
                    <p className="text-xs text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Series spine */}
          <section className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  The Spine
                </h2>
                <p className="text-white/50 max-w-2xl">
                  Read in order for the full argument. Each brief stands alone, but the sequence is intentional —
                  foundation, translation, mechanism, integration, grounding.
                </p>
              </div>

              <div className="space-y-4">
                {seriesDomains.map((domain, index) => {
                  const colors = colorMap[domain.color] || colorMap.emerald
                  const note = sequenceNotes[domain.slug]

                  return (
                    <Link
                      key={domain.slug}
                      href={`/research/${domain.slug}`}
                      className={`group relative block rounded-2xl border ${colors.border} border-opacity-30 bg-white/[0.02] p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.05]`}
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

                      <div className="relative z-10 grid md:grid-cols-[200px_1fr_auto] gap-6 items-start">
                        <div>
                          <p className={`text-[11px] font-semibold tracking-wider uppercase ${colors.text} mb-2`}>
                            {note?.stage}
                          </p>
                          <p className="text-xs text-white/40 leading-relaxed">
                            {note?.role}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                            {domain.title}
                          </h3>
                          <p className="text-sm text-white/50 mb-3">
                            {domain.subtitle}
                          </p>
                          <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                            {domain.tldr}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {domain.highlights.slice(0, 2).map((h, i) => (
                              <span
                                key={i}
                                className={`text-[11px] px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
                              >
                                <span className="font-semibold">{h.stat}</span> · {h.label}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white/70 transition-colors md:self-center">
                          <span>Read brief</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Companion content */}
          <section className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Companion content
                </h2>
                <p className="text-white/50 max-w-2xl">
                  Long-form essays, daily-practice guides, and implementation patterns derived from the spine.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {companionContent.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-white/[0.12]"
                  >
                    <p className="text-[10px] font-semibold tracking-wider uppercase text-white/35 mb-2">
                      {item.type}
                    </p>
                    <p className="text-sm text-white/85 group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-white/40 group-hover:text-white/70 transition-colors">
                      Read
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Thesis */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/[0.04] via-transparent to-indigo-500/[0.04]" />

                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    The category claim
                  </h2>
                  <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8">
                    Human transformation is not motivation. It is internal governance, model updating,
                    relevance realization, embodied state design, and possible-self activation.
                  </p>
                  <p className="text-base text-white/55 leading-relaxed mb-8">
                    The next generation of AI will not be built only from transformers, tools, memory, and APIs.
                    It will be built from better metaphors of mind. This series is the working set.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/research"
                      className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
                    >
                      All Research Domains
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/blog/no-bad-parts-sovereign-ai"
                      className="inline-flex items-center gap-2 bg-white/5 text-white px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 hover:bg-white/10 transition-all"
                    >
                      Start with No Bad Parts
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
