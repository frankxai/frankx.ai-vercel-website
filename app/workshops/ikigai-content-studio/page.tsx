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
  Sparkles,
  Users,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { IntakeForm } from '@/components/workshops/IntakeForm'
import { ModuleAccordion } from '@/components/workshops/ModuleAccordion'
import { CourseSchema } from '@/components/workshops/CourseSchema'
import { getWorkshopBySlug } from '@/data/workshops'

const WORKSHOP_SLUG = 'ikigai-content-studio'

export default function IkigaiContentStudioPage() {
  const workshop = getWorkshopBySlug(WORKSHOP_SLUG)!

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CourseSchema workshop={workshop} />

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.05] to-transparent" />
        <div className="absolute top-24 left-1/3 w-[500px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[140px]" />

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
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/25">
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

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-3">
              {workshop.title}
            </h1>
            <p className="text-[17px] leading-relaxed text-white/80 mb-6 max-w-2xl">
              {workshop.subtitle}.
            </p>

            <p className="text-[15px] leading-relaxed text-white/60 max-w-3xl mb-8">
              {workshop.overview}
            </p>

            {/* Primary CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#intake"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <Send className="w-4 h-4" />
                Request a conversation
              </a>
              <Link
                href="/workshops/ikigai-branding"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 hover:text-violet-200 transition-colors"
              >
                Try the self-serve wizard
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
                <Sparkles className="w-5 h-5 text-violet-300" />
                What you will leave with
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {workshop.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-violet-400 opacity-70" />
                    <p className="text-sm text-zinc-300">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              What to bring
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-3">Agenda</h2>
          <p className="text-[17px] leading-relaxed text-white/80 mb-6 max-w-2xl">
            Five modules. The second half of the session is hands-on — every attendee
            ships something visible before leaving.
          </p>
          <div className="space-y-3">
            {workshop.modules.map((module, index) => (
              <ModuleAccordion key={index} module={module} index={index} color="violet" />
            ))}
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="pb-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">
              Book this workshop
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Request a conversation
            </h2>
            <p className="text-[17px] leading-relaxed text-white/80 mt-3 max-w-2xl">
              Tell Frank about your team and context. Dates, pricing, and format are
              scoped on a short first call. Reply within 48h.
            </p>
          </div>

          <IntakeForm defaultWorkshop={WORKSHOP_SLUG} accent="violet" />
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
                Subscribe for the Ikigai resource pack and a Day-7 check-in from Frank.
                Unsubscribe anytime.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="ikigai-branding"
                  placeholder="Your email"
                  buttonText="Send Resource Pack"
                  compact
                />
              </div>
              <p className="text-xs text-zinc-500 mt-5">
                Or{' '}
                <Link
                  href="/inner-circle"
                  className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                >
                  reserve a seat in the Inner Circle
                </Link>{' '}
                for first access to private cohorts and founder pricing.
              </p>
            </div>
          </GlowCard>

          <div className="flex items-center justify-between pt-4">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All workshops
            </Link>
            <Link
              href="/workshops/sovereign-leadership"
              className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200 transition-colors"
            >
              Sovereign Leadership
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
