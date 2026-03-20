'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  ExternalLink,
  Layers,
  LinkIcon,
  Mail,
  StickyNote,
  Users,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { getWorkshopBySlug } from '@/data/workshops'
import type { Workshop, WorkshopModule } from '@/data/workshops'
import type { GlowColor } from '@/components/ui/glow-card'

// ============================================================================
// MODULE ACCORDION
// ============================================================================

function ModuleAccordion({
  module,
  index,
  color,
}: {
  module: WorkshopModule
  index: number
  color: string
}) {
  const [isOpen, setIsOpen] = useState(index === 0)
  const [showNotes, setShowNotes] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-sm font-semibold text-zinc-400 flex-shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {module.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-0.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {module.duration}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 space-y-4">
              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed">
                {module.description}
              </p>

              {/* Resources */}
              {module.resources.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                    Key Resources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {module.resources.map((res, i) => {
                      const isExternal = res.href.startsWith('http')
                      return (
                        <Link
                          key={i}
                          href={res.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-500/[0.08] border border-cyan-500/20 hover:bg-cyan-500/[0.15] transition-colors"
                        >
                          {isExternal ? (
                            <ExternalLink className="w-3 h-3" />
                          ) : (
                            <LinkIcon className="w-3 h-3" />
                          )}
                          {res.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Instructor Notes Toggle */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowNotes(!showNotes)
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <StickyNote className="w-3.5 h-3.5" />
                  {showNotes ? 'Hide' : 'Show'} instructor notes
                </button>
                <AnimatePresence>
                  {showNotes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/10">
                        <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider mb-1.5">
                          Instructor Notes
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {module.instructorNotes}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================================================
// SHARE URL SECTION
// ============================================================================

function ShareSection({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  const url = `https://frankx.ai/workshops/${slug}`

  function handleCopy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <p className="text-sm font-medium text-zinc-400 mb-3">
        Share this workshop
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 font-mono truncate">
          {url}
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[0.06] text-zinc-300 hover:bg-white/[0.10] border border-white/[0.08] transition-colors flex-shrink-0"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// SCHEMA MARKUP COMPONENT
// ============================================================================

function CourseSchema({ workshop }: { workshop: Workshop }) {
  // Calculate total duration from modules
  const totalMinutes = workshop.modules.reduce((sum, m) => {
    const match = m.duration.match(/(\d+)/)
    return sum + (match ? parseInt(match[1], 10) : 0)
  }, 0)

  // All values are static literals from our own data registry, safe for inline rendering
  const courseLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: workshop.title,
    description: workshop.overview,
    url: `https://frankx.ai/workshops/${workshop.slug}`,
    provider: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    educationalLevel: workshop.difficulty,
    timeRequired: `PT${totalMinutes}M`,
    numberOfCredits: workshop.moduleCount,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: workshop.duration,
    },
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: courseLd }}
    />
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function WorkshopDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const workshop = getWorkshopBySlug(slug)

  if (!workshop) {
    notFound()
  }

  const difficultyColor =
    workshop.difficulty === 'Beginner'
      ? 'text-emerald-400'
      : workshop.difficulty === 'Intermediate'
        ? 'text-amber-400'
        : 'text-rose-400'

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Schema.org Course markup */}
      <CourseSchema workshop={workshop} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All workshops
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                  workshop.difficulty === 'Beginner'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                    : workshop.difficulty === 'Intermediate'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/25'
                }`}
              >
                {workshop.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                {workshop.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Layers className="w-3.5 h-3.5" />
                {workshop.moduleCount} modules
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Users className="w-3.5 h-3.5" />
                {workshop.audience}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
              {workshop.title}
            </h1>
            <p className="text-lg text-zinc-400 mb-8">{workshop.subtitle}</p>

            {/* Overview */}
            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
              {workshop.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlowCard color={workshop.color as GlowColor}>
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                Learning Objectives
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {workshop.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${difficultyColor} opacity-60`} />
                    <p className="text-sm text-zinc-300">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Prerequisites */}
      {workshop.prerequisites.length > 0 && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                Prerequisites
              </h2>
              <ul className="space-y-2">
                {workshop.prerequisites.map((pre, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-zinc-400"
                  >
                    <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    {pre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Agenda */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Workshop Agenda
          </h2>
          <div className="space-y-3">
            {workshop.modules.map((module, index) => (
              <ModuleAccordion
                key={index}
                module={module}
                index={index}
                color={workshop.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Share + Email Capture */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ShareSection slug={workshop.slug} />

          {/* Resource Pack CTA */}
          <GlowCard color="emerald">
            <div className="p-6 sm:p-8 text-center">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Get the Resource Pack
              </h3>
              <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
                Receive the complete slide deck, handouts, and facilitator guide
                for this workshop.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="courses-waitlist"
                  placeholder="Your email"
                  buttonText="Send Resource Pack"
                  compact
                />
              </div>
            </div>
          </GlowCard>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All workshops
            </Link>
            <Link
              href="/workshops/for-educators"
              className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Educator guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
