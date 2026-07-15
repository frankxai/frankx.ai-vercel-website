import Link from 'next/link'
import { ArrowRight, MessageSquare, Mic2, PenLine, Layers, Building2, Bot } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { buildFAQPageData } from '@/components/seo/JsonLd'
import {
  askQuestions,
  featuredQuestions,
  CATEGORY_LABELS,
  type AskCategory,
} from '@/data/ask-questions'

const CANONICAL_PATH = '/ask'

export const metadata = createMetadata({
  title: 'Ask FrankX — AI Architecture, Music Production & Creator Tools',
  description:
    'Practical answers from an AI Architect and Music Creator. Multi-agent systems, Suno prompting, creator workflows, enterprise AI strategy — real answers from real work.',
  path: CANONICAL_PATH,
  keywords: [
    'ask frankx',
    'ai architecture questions',
    'suno prompts',
    'multi-agent systems',
    'creator tools',
    'ai music production',
    'enterprise ai',
    'frankx q&a',
  ],
})

const CATEGORY_ICONS: Record<AskCategory, React.ComponentType<{ className?: string }>> = {
  'ai-architecture': Bot,
  'music-production': Mic2,
  'content-strategy': PenLine,
  'creator-tools': Layers,
  'enterprise-ai': Building2,
}

const CATEGORY_COLORS: Record<AskCategory, string> = {
  'ai-architecture': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
  'music-production': 'text-purple-300 bg-purple-500/10 border-purple-500/30',
  'content-strategy': 'text-amber-300 bg-amber-500/10 border-amber-500/30',
  'creator-tools': 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
  'enterprise-ai': 'text-blue-300 bg-blue-500/10 border-blue-500/30',
}

export default function AskPage() {
  const faqData = buildFAQPageData(
    askQuestions.map((q) => ({ question: q.question, answer: q.tldr }))
  )

  const categories = Array.from(new Set(askQuestions.map((q) => q.category))) as AskCategory[]

  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <JsonLd type="FAQPage" data={faqData} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.14),transparent_40%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5">
              <MessageSquare className="h-3 w-3 text-indigo-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-200">
                Q&amp;A
              </span>
            </span>
            <span className="text-[11px] text-slate-500 tracking-wider">
              {askQuestions.length} questions answered
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Ask FrankX
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-lg">
            Practical answers on AI architecture, Suno music production, creator workflows,
            and enterprise AI — from an architect who builds these systems daily.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Book a discovery call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Browse workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-b border-white/10 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-300/80 mb-8">
            Start Here
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredQuestions.map((q) => {
              const Icon = CATEGORY_ICONS[q.category]
              const colorCls = CATEGORY_COLORS[q.category]
              return (
                <Link
                  key={q.slug}
                  href={`/ask/${q.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                >
                  <span className={`inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${colorCls}`}>
                    <Icon className="h-3 w-3" />
                    {CATEGORY_LABELS[q.category]}
                  </span>
                  <p className="text-[15px] font-medium leading-snug text-white group-hover:text-indigo-200 transition-colors">
                    {q.question}
                  </p>
                  <p className="text-[13px] leading-relaxed text-slate-400 line-clamp-3">
                    {q.tldr}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    Read answer <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* All questions by category */}
      {categories.map((category) => {
        const questions = askQuestions.filter((q) => q.category === category)
        const Icon = CATEGORY_ICONS[category]
        const colorCls = CATEGORY_COLORS[category]
        return (
          <section key={category} className="border-b border-white/10 py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex items-center gap-3 mb-8">
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${colorCls}`}>
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                    {CATEGORY_LABELS[category]}
                  </span>
                </span>
              </div>

              <div className="space-y-3">
                {questions.map((q) => (
                  <Link
                    key={q.slug}
                    href={`/ask/${q.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-white/90 group-hover:text-white transition-colors leading-snug">
                        {q.question}
                      </p>
                      <p className="mt-1.5 text-[13px] text-slate-500 line-clamp-2 leading-relaxed">
                        {q.tldr}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-600 group-hover:text-indigo-400 transition-colors mt-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Have a specific question?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-400">
            Book a discovery call for AI architecture, enterprise deployments,
            or creator system design.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Book a discovery call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
            >
              Subscribe to the newsletter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
