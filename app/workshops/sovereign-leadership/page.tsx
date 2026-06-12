'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Layers,
  Mail,
  Send,
  Shield,
  Users,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { IntakeForm } from '@/components/workshops/IntakeForm'
import { ModuleAccordion } from '@/components/workshops/ModuleAccordion'
import { CourseSchema } from '@/components/workshops/CourseSchema'
import { getWorkshopBySlug } from '@/data/workshops'

const WORKSHOP_SLUG = 'sovereign-leadership'

export default function SovereignLeadershipPage() {
  const workshop = getWorkshopBySlug(WORKSHOP_SLUG)!

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CourseSchema workshop={workshop} />

      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.05] to-transparent" />
        <div className="absolute top-24 right-1/3 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-[140px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border bg-amber-500/15 text-amber-400 border-amber-500/25">
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
            <p className="text-lg text-zinc-400 mb-6 max-w-2xl">
              {workshop.subtitle}.
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
              {workshop.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#intake"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 transition-all"
              >
                <Send className="w-4 h-4" />
                Bring this to my team
              </a>
              <Link
                href="/acos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                See the personal CoE
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlowCard color={workshop.color}>
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-300" />
                What leaders take away
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {workshop.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-cyan-400 opacity-70" />
                    <p className="text-sm text-zinc-300">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* The 6-Pillar diagram — textual summary */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-300 mb-2">
              Framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The 6-Pillar AI CoE
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              The same enterprise AI architecture Frank works with at Oracle, adapted
              to the attendee&rsquo;s real context during the session.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'Strategy', q: 'What will we — and will we not — do with AI?' },
              { name: 'Governance', q: 'Who decides? Which decisions escalate?' },
              { name: 'Talent', q: 'Build internally, buy capability, or partner?' },
              { name: 'Technology', q: 'Which stack, which vendors, which exits?' },
              { name: 'Data', q: 'What are our rights, and where is the leverage?' },
              { name: 'Ethics', q: 'What do we test for, not just declare?' },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4"
              >
                <p className="text-sm font-semibold text-white mb-1">{p.name}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Who this is for
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

      {/* Agenda */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-2">Agenda</h2>
          <p className="text-sm text-zinc-500 mb-6 max-w-2xl">
            Two hours, four modules, one commitment round. Q&amp;A is built into the final module.
          </p>
          <div className="space-y-3">
            {workshop.modules.map((module, index) => (
              <ModuleAccordion key={index} module={module} index={index} color="cyan" />
            ))}
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="pb-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-300 mb-2">
              Book this workshop
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Bring this to your leadership team
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Frank runs this as a private boardroom session or an industry-association
              breakout. Format, fees, and dates are scoped on a short first call.
            </p>
          </div>

          <IntakeForm defaultWorkshop={WORKSHOP_SLUG} accent="cyan" />
        </div>
      </section>

      {/* Email Capture + Footer Nav */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <GlowCard color="emerald">
            <div className="p-6 sm:p-8 text-center">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Not ready to book yet?
              </h3>
              <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
                Subscribe for the AI Architect dispatch — 6-pillar deep dives and one
                board-level question per week.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="ai-architect"
                  placeholder="Your work email"
                  buttonText="Subscribe"
                  compact
                />
              </div>
            </div>
          </GlowCard>

          <div className="flex items-center justify-between pt-4">
            <Link
              href="/workshops/ikigai-content-studio"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ikigai Content Studio
            </Link>
            <Link
              href="/workshops/personal-ai-coe"
              className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              Personal AI CoE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
