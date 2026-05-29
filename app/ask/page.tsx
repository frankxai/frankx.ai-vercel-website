import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import {
  askQuestions,
  askCategories,
  getAskByCategory,
} from '@/data/ask-questions'

export const metadata: Metadata = createMetadata({
  title: 'Ask FrankX — answers on AI architecture, music, and creator systems',
  description:
    'Real questions about building with AI agents, producing music with Suno, and running a creative business with AI — answered by Frank, then continue live with the Studio Crew.',
  path: '/ask',
  keywords: [
    'ask frankx',
    'ai architecture questions',
    'how to build ai agents',
    'suno prompting',
    'agentic ai',
    'creator ai systems',
  ],
})

export default function AskIndexPage() {
  const faqs = askQuestions.map((q) => ({ question: q.question, answer: q.tldr }))
  const featured = askQuestions.filter((q) => q.featured)

  return (
    <div className="relative mx-auto max-w-4xl px-5 py-12 md:py-16">
      <FAQPageJsonLd faqs={faqs} />

      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
          <Sparkles className="h-3 w-3" />
          Ask the Studio
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl">
          Answers from Frank&apos;s studio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Straight answers on building with AI agents, producing music with Suno, and running a
          creative business with AI. Read one, then keep the conversation going live with the
          Studio Crew — it knows the whole site.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/?ask=open"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-500/30 transition-shadow hover:shadow-cyan-500/50"
          >
            <MessageCircle className="h-4 w-4" />
            Open the live chat
          </Link>
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Start here
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {featured.map((q) => (
              <Link
                key={q.slug}
                href={`/ask/${q.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-cyan-300/70">
                  {q.category}
                </span>
                <p className="mt-1.5 text-[15px] font-medium text-white group-hover:text-white">
                  {q.question}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/55">
                  {q.tldr}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-14 space-y-12">
        {askCategories.map((category) => {
          const items = getAskByCategory(category)
          if (items.length === 0) return null
          return (
            <section key={category}>
              <h2 className="text-lg font-semibold text-white">{category}</h2>
              <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                {items.map((q) => (
                  <li key={q.slug}>
                    <Link
                      href={`/ask/${q.slug}`}
                      className="group flex items-start justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="text-[15px] text-white/85 group-hover:text-white">
                        {q.question}
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-white/70" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
