'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  Layers,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { workshops } from '@/data/workshops'
import type { GlowColor } from '@/components/ui/glow-card'

// ============================================================================
// DIFFICULTY BADGE
// ============================================================================

function DifficultyBadge({ level }: { level: string }) {
  const styles =
    level === 'Beginner'
      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
      : level === 'Intermediate'
        ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
        : 'bg-rose-500/15 text-rose-400 border-rose-500/25'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles}`}
    >
      {level}
    </span>
  )
}

// ============================================================================
// WORKSHOP TEMPLATE CARD
// ============================================================================

function WorkshopTemplateCard({
  workshop,
  index,
}: {
  workshop: (typeof workshops)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlowCard color={workshop.color as GlowColor} href={`/workshops/${workshop.slug}`}>
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <DifficultyBadge level={workshop.difficulty} />
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Layers className="w-3.5 h-3.5" />
              <span>{workshop.moduleCount} modules</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-cyan-200 transition-colors">
            {workshop.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
            {workshop.subtitle}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {workshop.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {workshop.audience}
            </span>
          </div>

          {/* Module preview */}
          <div className="space-y-2 mb-6">
            {workshop.modules.slice(0, 3).map((mod, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-zinc-400"
              >
                <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-medium text-zinc-500 flex-shrink-0">
                  {i + 1}
                </div>
                <span className="truncate">{mod.title}</span>
                <span className="text-zinc-600 text-xs ml-auto flex-shrink-0">
                  {mod.duration}
                </span>
              </div>
            ))}
            {workshop.modules.length > 3 && (
              <p className="text-xs text-zinc-600 pl-7">
                +{workshop.modules.length - 3} more modules
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
            View full agenda
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-violet-500/[0.03] to-transparent" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[120px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] mb-6">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">
                Workshop Templates
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Run AI Workshops{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                with FrankX
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-10">
              Pre-built workshop templates for university professors, corporate
              trainers, and bootcamp instructors. Structured agendas, instructor
              notes, and resource packs included.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                Structured agendas
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-violet-400" />
                Instructor notes
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Resource packs
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Grid */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop, index) => (
              <WorkshopTemplateCard
                key={workshop.slug}
                workshop={workshop}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* For Educators CTA */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlowCard color="violet">
              <div className="p-8 sm:p-10 text-center">
                <GraduationCap className="w-10 h-10 text-violet-400 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  For Educators
                </h2>
                <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
                  Learn how to use these templates in your classroom or training
                  program. Save weeks of curriculum prep with professional,
                  ready-to-run materials.
                </p>
                <Link
                  href="/workshops/for-educators"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:from-violet-500 hover:to-violet-400 transition-all"
                >
                  Educator Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
