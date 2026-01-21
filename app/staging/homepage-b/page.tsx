'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Music2,
  Pen,
  Palette,
  Code2,
  GraduationCap,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

// ============================================================================
// SPLIT TEST B: Audience Matrix Focus
// ============================================================================
// Key changes:
// - Keep Inter + Playfair (refined)
// - "Who I Build For" as primary navigation concept
// - 4 clear audience pathways with linked products
// - Students get prominent placement
// - Family warmth emphasized
// ============================================================================

// Audience data
const audiences = [
  {
    id: 'music',
    icon: Music2,
    name: 'Music Creators',
    tagline: 'Create your first AI song today',
    description: 'Artists exploring AI music with Suno. From ambient to electronic to cinematic.',
    product: 'Vibe OS',
    productPrice: 'Free',
    benefits: ['50+ genre prompts', 'Emotion-to-sound mapping', 'Production checklists'],
    cta: 'Start Creating',
    href: '/products/vibe-os',
    color: 'emerald',
  },
  {
    id: 'content',
    icon: Pen,
    name: 'Content Creators',
    tagline: 'Build authority through story',
    description: 'Writers, marketers, and storytellers who want strategic frameworks.',
    product: 'Creation Chronicles',
    productPrice: '€7',
    benefits: ['Story architecture', 'Editorial calendars', 'Distribution templates'],
    cta: 'Get Framework',
    href: '/products/creation-chronicles',
    color: 'cyan',
  },
  {
    id: 'generative',
    icon: Palette,
    name: 'Generative Creators',
    tagline: 'Multi-modal AI studio',
    description: 'Power users building with multiple AI tools simultaneously.',
    product: 'Generative Creator OS',
    productPrice: '€97',
    benefits: ['Multi-modal pipelines', 'Brand intelligence', 'Team enablement'],
    cta: 'Unlock Studio',
    href: '/products/generative-creator-os',
    color: 'violet',
  },
  {
    id: 'developers',
    icon: Code2,
    name: 'Developers & Builders',
    tagline: 'Master agentic AI',
    description: 'Claude Code, MCP servers, LangGraph. Production-grade patterns.',
    product: 'Agentic Creator OS',
    productPrice: '€197',
    benefits: ['Agent architectures', 'MCP server patterns', 'Production workflows'],
    cta: 'Start Building',
    href: '/products/agentic-creator-os',
    color: 'amber',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    text: 'text-emerald-400',
    hover: 'hover:bg-emerald-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    text: 'text-cyan-400',
    hover: 'hover:bg-cyan-500/20',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    text: 'text-violet-400',
    hover: 'hover:bg-violet-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    text: 'text-amber-400',
    hover: 'hover:bg-amber-500/20',
  },
}

function HeroSectionB() {
  return (
    <section className="relative pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/80 mb-6">
            AI Systems Architect & Music Creator
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            Intelligence systems for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
              every creator
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
            10,000+ AI songs. 5 operating systems. Everything documented.
            Find your path below.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function AudienceMatrixSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-4">
            Who I Build For
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Find your path
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((audience, i) => {
            const colors = colorClasses[audience.color]
            return (
              <motion.div
                key={audience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={audience.href} className="group block h-full">
                  <div className={`h-full p-8 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                          <audience.icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{audience.name}</h3>
                          <p className="text-sm text-white/50">{audience.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40 uppercase tracking-wider">{audience.product}</p>
                        <p className={`text-lg font-bold ${colors.text}`}>{audience.productPrice}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 mb-6">{audience.description}</p>

                    {/* Benefits */}
                    <ul className="space-y-2 mb-6">
                      {audience.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-white/50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400/60" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className={`font-medium ${colors.text}`}>{audience.cta}</span>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Students & Young Professionals - Special section
function StudentsSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                Students & Young Professionals
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Free resources for those starting their journey
            </h2>

            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              I remember being overwhelmed by AI options. Here's everything I wish I had —
              curated courses from Oracle, Google, and MIT. Plus workshops I've built myself.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Oracle AI Foundations (Free certification)',
                'Google AI Essentials (Coursera)',
                'Ikigai Discovery Workshop',
                'Prompt Engineering Fundamentals',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/70">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/students"
              className="group inline-flex items-center gap-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-full font-medium hover:bg-cyan-500/30 transition-all"
            >
              Explore Learning Paths
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-transparent blur-3xl opacity-50" />
            <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              {/* Playfair italic quote - refined usage */}
              <blockquote
                className="text-2xl text-white/80 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontStyle: 'italic',
                }}
              >
                "The best time to learn AI was yesterday. The second best time is now.
                Start with curiosity, not credentials."
              </blockquote>
              <footer className="mt-6 text-sm text-white/40">
                — From the Learning Paths intro
              </footer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Family Hub section
function FamilySection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-rose-500/20 border border-rose-500/30">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            This is also a family hub
          </h2>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            Beyond the systems and the music, this site is a living archive for the people I love.
            My kids will one day see how their dad thought, created, and navigated this moment in history.
          </p>

          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Music made for bedtime. Stories written for rainy days.
            Systems documented so they can build their own someday.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Philosophy section with refined Playfair
function PhilosophySectionB() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-3xl md:text-4xl text-white/70 leading-relaxed"
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontStyle: 'italic',
              letterSpacing: '0.01em',
              lineHeight: 1.5,
            }}
          >
            "I create to understand. I share to teach.
            I explore because the universe is too interesting not to."
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}

// Final CTA
function FinalCTAB() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start where you are
          </h2>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
            Whether you're a music creator, content builder, or developer —
            there's a path designed for you above.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              Browse All Resources
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomepageSplitB() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Staging indicator */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/staging"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Split B: Audience Matrix
        </Link>
      </div>

      <HeroSectionB />
      <AudienceMatrixSection />
      <StudentsSection />
      <FamilySection />
      <PhilosophySectionB />
      <FinalCTAB />
    </main>
  )
}
