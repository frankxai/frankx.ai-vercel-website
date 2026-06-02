'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Cpu,
  Layers,
  Mail,
  Send,
  Users,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { IntakeForm } from '@/components/workshops/IntakeForm'
import { ModuleAccordion } from '@/components/workshops/ModuleAccordion'
import { CourseSchema } from '@/components/workshops/CourseSchema'
import { getWorkshopBySlug } from '@/data/workshops'

const WORKSHOP_SLUG = 'personal-ai-coe'

export default function PersonalAICoEPage() {
  const workshop = getWorkshopBySlug(WORKSHOP_SLUG)!

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <CourseSchema workshop={workshop} />

      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.05] to-transparent" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[140px]" />

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
              {workshop.subtitle}
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
              {workshop.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#intake"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all"
              >
                <Send className="w-4 h-4" />
                Request a conversation
              </a>
              <Link
                href="/acos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
              >
                Explore ACOS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scale comparison — enterprise vs personal */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Enterprise CoE
              </p>
              <p className="text-2xl font-bold text-white mb-1">~ €500k</p>
              <p className="text-sm text-zinc-400">
                6-12 month rollout. Cross-functional program team. Enterprise scale.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 sm:p-6">
              <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider mb-2">
                Personal CoE
              </p>
              <p className="text-2xl font-bold text-white mb-1">1/5000th the cost</p>
              <p className="text-sm text-zinc-300">
                90 minutes in this workshop. Same 6-pillar architecture. Running by the time you leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlowCard color={workshop.color}>
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-300" />
                What you will leave with
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {workshop.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-amber-400 opacity-70" />
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
          <h2 className="text-2xl font-bold text-white mb-2">Agenda</h2>
          <p className="text-sm text-zinc-500 mb-6 max-w-2xl">
            Ninety minutes. One real build. You leave with your Personal AI CoE
            deployed and a weekly review already on the calendar.
          </p>
          <div className="space-y-3">
            {workshop.modules.map((module, index) => (
              <ModuleAccordion key={index} module={module} index={index} color="amber" />
            ))}
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="pb-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-300 mb-2">
              Book this workshop
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Request a conversation
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              Runs 1:1, for small groups (4–12), or as an internal capability build.
              Scope, price, and format are set on a short first call.
            </p>
          </div>

          <IntakeForm defaultWorkshop={WORKSHOP_SLUG} accent="amber" />
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
                Subscribe for the AI Architect dispatch — weekly notes on building
                personal and enterprise AI systems.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="ai-architect"
                  placeholder="Your email"
                  buttonText="Subscribe"
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
                for first access to workshop dates and founder pricing.
              </p>
            </div>
          </GlowCard>

          <div className="flex items-center justify-between pt-4">
            <Link
              href="/workshops/sovereign-leadership"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Sovereign Leadership
            </Link>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200 transition-colors"
            >
              All workshops
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
