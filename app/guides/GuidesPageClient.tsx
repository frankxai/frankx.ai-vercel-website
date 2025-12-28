'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Clock, ArrowRight, Compass } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

interface GuideDoc {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
}

interface GuidesPageClientProps {
  guides: GuideDoc[]
}

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// GUIDE CARD
// ============================================================================

function GuideCard({ guide, index }: { guide: GuideDoc; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/guides/${guide.slug}`}
        className="group block relative p-6 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
          </div>

          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {guide.title}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mb-4 group-hover:text-white/60 transition-colors">
            {guide.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {guide.readingTime}
            </span>
            <span>
              {new Date(guide.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

export default function GuidesPageClient({ guides }: GuidesPageClientProps) {
  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  Implementation Guides
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Step-by-step guides
                <span className="block mt-2 text-white/60">for building with AI.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
                Practical implementation guides to help you build intelligence systems.
                Each guide is battle-tested and ready to use.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            {guides.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {guides.map((guide, i) => (
                  <GuideCard key={guide.slug} guide={guide} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <Compass className="w-7 h-7 text-white/30" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Guides coming soon</h3>
                <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
                  I'm working on comprehensive implementation guides.
                  Check back soon or browse the resources.
                </p>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Browse resources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need something specific?
              </h2>
              <p className="text-white/50 mb-8">
                Check out the templates for quick-start resources, or browse all available materials.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
                >
                  View Templates
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium transition-colors"
                >
                  All Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
