'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
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
import { WorkshopProvenanceNotice } from '@/components/workshops/WorkshopProvenanceNotice'
import { EmailSignup } from '@/components/email-signup'
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
  const disclosureId = useId()
  const panelId = `${disclosureId}-panel`
  const notesId = `${disclosureId}-notes`
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.08 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
    >
      <button
        type="button"
        id={disclosureId}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
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
          className={`w-5 h-5 text-zinc-500 transition-transform duration-200 motion-reduce:transition-none flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={disclosureId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 space-y-4">
              <p className="text-sm text-zinc-400 leading-relaxed">
                {module.description}
              </p>

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

              <div>
                <button
                  type="button"
                  id={`${disclosureId}-notes-trigger`}
                  aria-expanded={showNotes}
                  aria-controls={showNotes ? notesId : undefined}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowNotes(!showNotes)
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                >
                  <StickyNote className="w-3.5 h-3.5" />
                  {showNotes ? 'Hide' : 'Show'} instructor notes
                </button>
                <AnimatePresence>
                  {showNotes && (
                    <motion.div
                      id={notesId}
                      role="region"
                      aria-labelledby={`${disclosureId}-notes-trigger`}
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.2 }}
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
// MAIN CLIENT COMPONENT
// ============================================================================

export default function WorkshopClient({ workshop }: { workshop: Workshop }) {
  const reducedMotion = useReducedMotion()
  const difficultyColor =
    workshop.difficulty === 'Beginner'
      ? 'text-emerald-400'
      : workshop.difficulty === 'Intermediate'
        ? 'text-amber-400'
        : 'text-rose-400'

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All workshops
          </Link>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          >
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

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
              {workshop.overview}
            </p>

            {workshop.provenance === 'studio-draft' ? <WorkshopProvenanceNotice /> : null}
          </motion.div>
        </div>
      </section>

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

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ShareSection slug={workshop.slug} />

          {workshop.selfStudyResource ? (
            <GlowCard color="emerald">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-3">Study and build at your own pace</h3>
                <p className="text-sm text-zinc-300 mb-5">{workshop.selfStudyResource.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/guides/ai-operating-systems-workshop" className="text-sm font-semibold text-cyan-300 underline underline-offset-4">Read the full curriculum</Link>
                  <a href={workshop.selfStudyResource.href} download className="text-sm font-semibold text-emerald-300 underline underline-offset-4">{workshop.selfStudyResource.label}</a>
                  <a href="/workshops/ai-operating-systems/lab.mjs" download className="text-sm font-semibold text-emerald-300 underline underline-offset-4">Download the offline lab</a>
                  <Link href="/contact?intent=workshop" className="text-sm font-semibold text-zinc-300 underline underline-offset-4">Discuss a facilitated pilot</Link>
                </div>
              </div>
            </GlowCard>
          ) : (
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
          )}

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
