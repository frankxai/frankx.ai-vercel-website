import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import Markdown from '@/components/ai/Markdown'
import {
  askQuestions,
  getAskQuestion,
  getRelatedAsk,
  ASK_AUTHOR,
} from '@/data/ask-questions'

export const dynamicParams = false

export function generateStaticParams() {
  return askQuestions.map((q) => ({ slug: q.slug }))
}

function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const q = getAskQuestion(slug)
  if (!q) return createMetadata({ title: 'Question not found', description: '', noindex: true })

  return createMetadata({
    title: `${q.question}`,
    description: q.tldr,
    path: `/ask/${q.slug}`,
    type: 'article',
    publishedTime: q.date,
    authors: [ASK_AUTHOR],
    keywords: [...q.tags, 'frankx', 'ask frankx', q.category.toLowerCase()],
    image: `/api/og?title=${encodeURIComponent(q.question)}&subtitle=${encodeURIComponent('Ask the Studio · FrankX')}`,
  })
}

export default async function AskQuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const q = getAskQuestion(slug)
  if (!q) notFound()

  const related = getRelatedAsk(slug)
  const answerText = plainText(q.answer)
  const canonical = `https://frankx.ai/ask/${q.slug}`

  // QAPage structured data — the schema Google uses for question pages, and a
  // strong AEO signal for Perplexity / ChatGPT / Claude answer engines.
  const qaSchema = {
    mainEntity: {
      '@type': 'Question',
      name: q.question,
      text: q.question,
      answerCount: 1,
      datePublished: q.date,
      author: { '@type': 'Person', name: ASK_AUTHOR },
      acceptedAnswer: {
        '@type': 'Answer',
        text: answerText,
        url: canonical,
        datePublished: q.date,
        author: { '@type': 'Person', name: ASK_AUTHOR, url: 'https://frankx.ai/about' },
      },
    },
  }

  return (
    <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16">
      <JsonLd type="QAPage" data={qaSchema} />

      <Breadcrumbs
        items={[
          { label: 'Ask', href: '/ask' },
          { label: q.question, href: `/ask/${q.slug}` },
        ]}
      />

      <div className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
          <Sparkles className="h-3 w-3" />
          {q.category}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
        {q.question}
      </h1>

      <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-[15px] leading-relaxed text-white/80">
        <span className="mr-1.5 font-semibold text-emerald-300">TL;DR</span>
        {q.tldr}
      </p>

      <article className="mt-8">
        <Markdown content={q.answer} variant="prose" />
      </article>

      {/* Ask a follow-up — closes the loop from indexed page into live chat */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.08] to-emerald-500/[0.06] p-6">
        <h2 className="text-lg font-semibold text-white">Have a follow-up?</h2>
        <p className="mt-1.5 text-sm text-white/65">
          Ask Frank&apos;s studio crew live — it knows the whole site and will point you to
          the right next step.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/?ask=${encodeURIComponent(q.question)}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cyan-500/30 transition-shadow hover:shadow-cyan-500/50"
          >
            <MessageCircle className="h-4 w-4" />
            Ask the Studio Crew
          </Link>
          <Link
            href={q.cta.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {q.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Related questions
          </h2>
          <ul className="mt-4 space-y-2.5">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/ask/${r.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <span className="text-[15px] text-white/85 group-hover:text-white">
                    {r.question}
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/70" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 border-t border-white/10 pt-6">
        <Link href="/ask" className="text-sm text-cyan-300 hover:text-cyan-200">
          ← All questions
        </Link>
      </div>
    </div>
  )
}
