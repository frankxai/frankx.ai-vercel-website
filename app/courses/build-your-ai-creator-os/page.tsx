'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Cable,
  Cog,
  Layers,
  Rocket,
  ShoppingCart,
  Workflow,
  Zap,
} from 'lucide-react'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { featuredCourse } from '@/lib/courses/roadmap'

const moduleIcons = [Brain, Layers, Cable, Workflow, Zap, BookOpen, ShoppingCart, Rocket]
const moduleColors: GlowColor[] = [
  'emerald',
  'cyan',
  'violet',
  'amber',
  'blue',
  'teal',
  'rose',
  'purple',
]

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />
      <div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
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

export default function BuildYourAICreatorOSPage() {
  const course = featuredCourse

  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60 mb-6">
                Flagship Course
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                {course.title}
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-4 leading-relaxed">
                {course.shortDescription}
              </p>

              <p className="text-sm text-white/40 mb-10">
                By Frank Riemer, AI Architect at Oracle
              </p>

              <div className="flex flex-wrap gap-8 mb-12">
                {[
                  { value: '8', label: 'Modules' },
                  { value: '500+', label: 'Skills' },
                  { value: '58', label: 'Workflows' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-left"
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/courses/build-your-ai-creator-os/module-1"
                className="group inline-flex items-center gap-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                Start Module 1 -- Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Outcomes
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                What you will build
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {course.outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Cog className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{outcome}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Modules */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Curriculum
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                8 modules. Foundation to deployment.
              </h2>
              <p className="text-white/50 max-w-2xl">
                {course.commitment}. {course.format}.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {course.outline.map((mod, i) => {
                const Icon = moduleIcons[i]
                const color = moduleColors[i]
                const isFree = i === 0
                const isComingSoon = i > 0

                return (
                  <motion.div
                    key={mod.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <GlowCard
                      color={color}
                      href={isFree ? '/courses/build-your-ai-creator-os/module-1' : undefined}
                      className="p-6 h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                          <Icon className="w-5 h-5 text-white/60" />
                        </div>
                        <div className="flex items-center gap-2">
                          {isFree && (
                            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                              Free
                            </span>
                          )}
                          {isComingSoon && (
                            <span className="px-2.5 py-1 bg-white/5 text-white/40 text-xs font-medium rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">{mod.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{mod.description}</p>

                      {isFree && (
                        <div className="mt-5 pt-4 border-t border-white/5">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                            Start learning
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      )}
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Audience
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Built for builders
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {course.audience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                >
                  <div className="w-1 h-8 rounded-full bg-emerald-500/40 flex-shrink-0" />
                  <p className="text-sm text-white/60 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Email Capture */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Module 1 is free. Start now.
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
                Set up your AI foundation today. Get notified when new modules launch.
              </p>

              <div className="flex flex-col items-center gap-6">
                <Link
                  href="/courses/build-your-ai-creator-os/module-1"
                  className="group inline-flex items-center gap-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 font-semibold shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                >
                  Start Module 1 -- Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="w-full max-w-md mt-8">
                  <p className="text-sm text-white/40 mb-4">
                    Get notified when new modules launch
                  </p>
                  <EmailSignup
                    listType="courses-waitlist"
                    placeholder="you@example.com"
                    buttonText="Notify Me"
                    compact
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
