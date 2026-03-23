import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { docsContent } from '../docs-content'

/**
 * Dynamic Documentation Page
 *
 * Renders individual documentation sections with:
 * - SEO-optimized metadata
 * - HowTo schema for technical guides
 * - Previous/Next navigation
 *
 * SECURITY NOTE: Content is from static TypeScript file (docs-content.ts),
 * not user-generated. HTML is pre-sanitized at build time.
 */

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = docsContent[slug]

  if (!doc) {
    return {
      title: 'Not Found | Agentic Creator OS Documentation'
    }
  }

  return {
    title: `${doc.title} | Agentic Creator OS Documentation | FrankX.ai`,
    description: doc.description,
    keywords: doc.keywords,
    openGraph: {
      title: `${doc.title} - Agentic Creator OS`,
      description: doc.description,
      url: `https://frankx.ai/products/agentic-creator-os/docs/${slug}`,
      type: 'article'
    },
    alternates: {
      canonical: `https://frankx.ai/products/agentic-creator-os/docs/${slug}`
    }
  }
}

export function generateStaticParams() {
  return Object.keys(docsContent).map((slug) => ({ slug }))
}

// Navigation order
const docOrder = ['getting-started', 'skills', 'agents', 'workflows', 'mcp']

function getPrevNext(currentSlug: string) {
  const currentIndex = docOrder.indexOf(currentSlug)
  return {
    prev: currentIndex > 0 ? docOrder[currentIndex - 1] : null,
    next: currentIndex < docOrder.length - 1 ? docOrder[currentIndex + 1] : null
  }
}

// Code block component for safe rendering
function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <pre className="bg-void/50 rounded-lg p-4 overflow-x-auto border border-white/10">
      <code className={`text-sm font-mono ${language ? `language-${language}` : ''}`}>
        {code}
      </code>
    </pre>
  )
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const doc = docsContent[slug]

  if (!doc) {
    notFound()
  }

  const { prev, next } = getPrevNext(slug)
  const prevDoc = prev ? docsContent[prev] : null
  const nextDoc = next ? docsContent[next] : null

  // HowTo schema for technical documentation
  const howToSchema = doc.steps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: doc.title,
    description: doc.description,
    step: doc.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description
    }))
  } : null

  return (
    <article className="max-w-none">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-tech-primary/20 text-tech-primary text-xs font-semibold uppercase tracking-wider">
            {doc.category}
          </span>
          {doc.readTime && (
            <span className="text-slate-500 text-sm">{doc.readTime} read</span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">{doc.title}</h1>
        <p className="text-xl text-slate-300">{doc.description}</p>
      </header>

      {/* Table of Contents */}
      {doc.sections && doc.sections.length > 0 && (
        <nav className="mb-8 p-6 rounded-xl bg-space/80 backdrop-blur-xl border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">On this page</h2>
          <ul className="space-y-2">
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-slate-400 hover:text-tech-primary transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main Content - Rendered as React components */}
      <div className="prose prose-invert prose-lg max-w-none">
        {doc.contentBlocks.map((block, index) => {
          switch (block.type) {
            case 'heading':
              const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
              return (
                <HeadingTag
                  key={index}
                  id={block.id}
                  className={`font-bold text-white ${
                    block.level === 2 ? 'text-2xl mt-12 mb-4' :
                    block.level === 3 ? 'text-xl mt-8 mb-3' :
                    'text-lg mt-6 mb-2'
                  }`}
                >
                  {block.text}
                </HeadingTag>
              )
            case 'paragraph':
              return (
                <p key={index} className="text-slate-300 leading-relaxed mb-4">
                  {block.text}
                </p>
              )
            case 'code':
              return (
                <div key={index} className="my-6">
                  <CodeBlock code={block.code} language={block.language} />
                </div>
              )
            case 'list':
              return (
                <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-slate-300">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )
            case 'callout':
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border mb-6 ${
                    block.variant === 'tip'
                      ? 'bg-tech-primary/10 border-tech-primary/30'
                      : block.variant === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <p className="text-slate-200">{block.text}</p>
                </div>
              )
            case 'table':
              return (
                <div key={index} className="overflow-x-auto mb-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        {block.headers.map((header, i) => (
                          <th key={i} className="py-3 px-4 font-semibold text-white">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-white/5">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="py-3 px-4 text-slate-300">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            default:
              return null
          }
        })}
      </div>

      {/* Related Links */}
      {doc.relatedLinks && doc.relatedLinks.length > 0 && (
        <section className="mt-12 p-6 rounded-xl bg-space/80 backdrop-blur-xl border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Related Resources</h2>
          <div className="space-y-3">
            {doc.relatedLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-slate-300 hover:text-tech-primary transition-colors"
              >
                {link.external ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                {link.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Previous/Next Navigation */}
      <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {prevDoc ? (
          <Link
            href={`/products/agentic-creator-os/docs/${prev}`}
            className="group p-6 rounded-xl bg-space/80 backdrop-blur-xl border border-white/10 hover:border-tech-primary/30 transition-all"
          >
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </span>
            <span className="text-lg font-semibold text-white group-hover:text-tech-primary transition-colors">
              {prevDoc.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextDoc && (
          <Link
            href={`/products/agentic-creator-os/docs/${next}`}
            className="group p-6 rounded-xl bg-space/80 backdrop-blur-xl border border-white/10 hover:border-tech-primary/30 transition-all text-right"
          >
            <span className="text-sm text-slate-500 flex items-center gap-1 justify-end">
              Next
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="text-lg font-semibold text-white group-hover:text-tech-primary transition-colors">
              {nextDoc.title}
            </span>
          </Link>
        )}
      </nav>

      {/* Edit on GitHub */}
      <footer className="mt-8 pt-8 border-t border-white/10">
        <a
          href={`https://github.com/frankxai/agentic-creator-os/edit/main/docs/${slug}.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-500 hover:text-tech-primary transition-colors flex items-center gap-1"
        >
          <ExternalLink className="w-4 h-4" />
          Edit this page on GitHub
        </a>
      </footer>

      {/* Structured Data */}
      {howToSchema && (
        <Script id="howto-schema" type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </Script>
      )}
    </article>
  )
}
