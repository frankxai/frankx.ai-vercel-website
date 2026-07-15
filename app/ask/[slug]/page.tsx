import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bot, Mic2, PenLine, Layers, Building2, Calendar, ExternalLink } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import {
  askQuestions,
  CATEGORY_LABELS,
  PERSONA_LABELS,
  type AskCategory,
  type AskPersona,
} from '@/data/ask-questions'

export const dynamicParams = false

export function generateStaticParams() {
  return askQuestions.map((q) => ({ slug: q.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const q = askQuestions.find((q) => q.slug === slug)
  if (!q) return {}
  return createMetadata({
    title: `${q.question} — FrankX Q&A`,
    description: q.tldr,
    path: `/ask/${q.slug}`,
    keywords: [...q.tags, 'frankx', 'q&a'],
    type: 'article',
    publishedTime: q.date,
  })
}

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

const PERSONA_COLORS: Record<AskPersona, string> = {
  architect: 'text-cyan-300 bg-cyan-500/8 border-cyan-500/25',
  producer: 'text-purple-300 bg-purple-500/8 border-purple-500/25',
  strategist: 'text-amber-300 bg-amber-500/8 border-amber-500/25',
  concierge: 'text-indigo-300 bg-indigo-500/8 border-indigo-500/25',
}

function MarkdownBody({ content }: { content: string }) {
  // Render markdown as accessible HTML using Tailwind prose classes
  // We parse the markdown server-side to avoid shipping a markdown parser to the client
  const lines = content.split(/\r?\n/)
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="mt-8 mb-3 text-xl font-semibold text-white tracking-tight">
          <InlineMarkdown text={line.slice(3)} />
        </h2>
      )
      i++
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="mt-6 mb-2 text-[17px] font-semibold text-white/90">
          <InlineMarkdown text={line.slice(4)} />
        </h3>
      )
      i++
      continue
    }

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <pre
          key={i}
          className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[13px] text-slate-300 leading-relaxed"
          data-lang={lang || undefined}
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      const [header, , ...rows] = tableLines
      const trimmedHeader = header.trim()
      const headerCells = trimmedHeader
        .split('|')
        .slice(1, trimmedHeader.endsWith('|') ? -1 : undefined)
        .map((c) => c.trim())
      elements.push(
        <div key={i} className="my-5 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {headerCells.map((h, ci) => (
                  <th key={ci} className="px-4 py-3 text-left font-semibold text-white/80 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const trimmedRow = row.trim()
                const cells = trimmedRow
                  .split('|')
                  .slice(1, trimmedRow.endsWith('|') ? -1 : undefined)
                  .map((c) => c.trim())
                return (
                  <tr key={ri} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
                    {headerCells.map((_, ci) => {
                      const cell = cells[ci] || ''
                      return (
                        <td key={ci} className="px-4 py-3 text-slate-300 leading-relaxed">
                          <InlineMarkdown text={cell} />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2 pl-4">
          {items.map((item, li) => (
            <li key={li} className="flex gap-2 text-[15px] leading-relaxed text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
              <span><InlineMarkdown text={item} /></span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      let num = 1
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
        num++
      }
      elements.push(
        <ol key={i} className="my-4 space-y-2 pl-4">
          {items.map((item, li) => (
            <li key={li} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
              <span className="flex-shrink-0 text-indigo-400 font-semibold text-[13px] mt-0.5">{li + 1}.</span>
              <span><InlineMarkdown text={item} /></span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    elements.push(
      <p key={i} className="my-3 text-[15px] leading-relaxed text-slate-300">
        <InlineMarkdown text={line} />
      </p>
    )
    i++
  }

  return <div className="space-y-1">{elements}</div>
}

function InlineMarkdown({ text }: { text: string }) {
  // Handle bold, italic, inline code, and links
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[(?:[^\]]+)\]\((?:[^)]+)\))/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="rounded bg-white/10 px-1.5 py-0.5 text-[13px] text-indigo-200 font-mono">{part.slice(1, -1)}</code>
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          const isExternal = linkMatch[2].startsWith('http')
          return (
            <Link
              key={i}
              href={linkMatch[2]}
              className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {linkMatch[1]}
            </Link>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export default async function AskSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const q = askQuestions.find((q) => q.slug === slug)
  if (!q) notFound()

  const related = q.related
    .map((s) => askQuestions.find((aq) => aq.slug === s))
    .filter(Boolean)

  const Icon = CATEGORY_ICONS[q.category]
  const catColor = CATEGORY_COLORS[q.category]
  const personaColor = PERSONA_COLORS[q.persona]

  const qaJsonLd = {
    mainEntity: {
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
        author: {
          '@type': 'Person',
          name: 'Frank X. Riemer',
          url: 'https://frankx.ai/about',
        },
        datePublished: q.date,
      },
    },
  }

  return (
    <main id="main" className="min-h-screen bg-[#06080f] text-white">
      <JsonLd type="QAPage" data={qaJsonLd} />

      <article className="mx-auto max-w-3xl px-6 pt-28 pb-24 sm:pt-36">
        <Breadcrumbs
          items={[
            { label: 'Ask FrankX', href: '/ask' },
            { label: q.question.slice(0, 50) + (q.question.length > 50 ? '…' : ''), href: `/ask/${q.slug}` },
          ]}
        />

        {/* Meta chips */}
        <div className="mt-2 flex flex-wrap items-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${catColor}`}>
            <Icon className="h-3 w-3" />
            {CATEGORY_LABELS[q.category]}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${personaColor}`}>
            {PERSONA_LABELS[q.persona]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
            <Calendar className="h-3 w-3" />
            {new Date(q.date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Question */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-white">
          {q.question}
        </h1>

        {/* TL;DR */}
        <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.07] px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">TL;DR</p>
          <p className="text-[15px] leading-relaxed text-white/90">{q.tldr}</p>
        </div>

        {/* Answer body */}
        <div className="mt-8">
          <MarkdownBody content={q.answer} />
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {q.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-slate-500 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Go deeper
          </p>
          <h2 className="text-lg font-semibold text-white mb-4">
            {q.cta.label === 'Book a discovery call'
              ? 'Want to discuss this for your specific situation?'
              : 'Want to go further?'}
          </h2>
          <Link
            href={q.cta.href}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f] ${
              q.cta.variant === 'primary'
                ? 'bg-indigo-400 text-slate-950 hover:bg-indigo-300'
                : 'border border-white/15 bg-white/[0.05] text-white hover:border-white/30 hover:bg-white/[0.10]'
            }`}
            {...(q.cta.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {q.cta.label}
            {q.cta.href.startsWith('http') ? (
              <ExternalLink className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 mb-5">
              Related Questions
            </h2>
            <div className="space-y-3">
              {related.map((rq) => {
                if (!rq) return null
                const RIcon = CATEGORY_ICONS[rq.category]
                const rColor = CATEGORY_COLORS[rq.category]
                return (
                  <Link
                    key={rq.slug}
                    href={`/ask/${rq.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all hover:border-white/15 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <div className="flex-1 min-w-0">
                      <span className={`mb-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${rColor}`}>
                        <RIcon className="h-2.5 w-2.5" />
                        {CATEGORY_LABELS[rq.category]}
                      </span>
                      <p className="text-[14px] font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                        {rq.question}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-600 group-hover:text-indigo-400 transition-colors mt-1" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 text-[14px] text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All questions
          </Link>
        </div>
      </article>
    </main>
  )
}
