import Link from 'next/link'
import { ExternalLink, Clock, Calendar, FileText, Download, Sparkles, Bot, Music, Lightbulb } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllResearchPages, getTotalResearchHours } from '@/lib/research'
import { RESEARCH_CATEGORIES } from '@/lib/types/research'
import { createMetadata } from '@/lib/seo'
import AnimatedMesh from '@/components/ui/AnimatedMesh'
import ShimmerText from '@/components/ui/ShimmerText'

export const metadata = createMetadata({
  title: 'Research Library - Deep Dives & Perplexity Pages',
  description: 'Curated research on agentic AI, generative systems, and music production. Hundreds of hours distilled into actionable insights.',
  path: '/library/research',
})

const iconMap = {
  Bot,
  Sparkles,
  Music,
  Lightbulb
}

export default function ResearchPage() {
  const allPages = getAllResearchPages()
  const totalHours = getTotalResearchHours()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedMesh variant="hero" speed="slow" className="opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/60 mb-6">
              <FileText className="h-4 w-4" />
              Research Library
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
              <ShimmerText
                as="span"
                shimmerColor="multi"
                speed="slow"
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
              >
                Deep Research,
                <br />
                Freely Shared
              </ShimmerText>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-[1.7] tracking-wide max-w-3xl mb-8">
              {totalHours}+ hours of research on agentic AI, generative systems, and music production.
              Perplexity Pages, technical deep-dives, and curated resources—all free, no gates.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <span>{allPages.length} Research Pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <span>{totalHours}+ Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-amber-400" />
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12">
            {Object.values(RESEARCH_CATEGORIES).map((category) => {
              const categoryPages = allPages.filter(page => page.category === category.id)
              if (categoryPages.length === 0) return null

              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || FileText

              return (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-amber-400/20 border border-white/10">
                      <IconComponent className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight leading-[1.15]">
                        {category.name}
                      </h2>
                      <p className="text-slate-400 mt-1 leading-[1.6]">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Research Pages Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryPages.map((page) => (
                      <article
                        key={page.id}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 p-6 backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
                      >
                        {/* Content Type Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                            {page.type === 'perplexity' && <ExternalLink className="h-3 w-3" />}
                            {page.type === 'pdf' && <Download className="h-3 w-3" />}
                            {page.type === 'internal' && <FileText className="h-3 w-3" />}
                            {page.type}
                          </span>
                          {page.researchHours && (
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                              <Clock className="h-3.5 w-3.5" />
                              {page.researchHours}h
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-semibold text-white leading-tight mb-2 group-hover:text-cyan-400 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                          {page.description}
                        </p>

                        {/* Summary */}
                        {page.summary && (
                          <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                            {page.summary}
                          </p>
                        )}

                        {/* Tags */}
                        {page.tags && page.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {page.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <Link
                          href={page.url}
                          target={page.type === 'perplexity' ? '_blank' : undefined}
                          rel={page.type === 'perplexity' ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {page.type === 'perplexity' && 'View Research'}
                          {page.type === 'pdf' && 'Download PDF'}
                          {page.type === 'internal' && 'Read More'}
                          <ExternalLink className="h-4 w-4" />
                        </Link>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 pt-4 border-t border-white/5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(page.dateAdded).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 p-12 text-center backdrop-blur">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want me to research something specific?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              I'm constantly diving deep into new AI tools, frameworks, and techniques.
              If there's a topic you'd like me to explore and document, let me know.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 transition-transform"
            >
              Get in Touch
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
