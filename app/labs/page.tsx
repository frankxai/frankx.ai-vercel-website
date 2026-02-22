'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Beaker,
  ArrowRight,
  Sparkles,
  Code2,
  Brain,
  Zap,
  CheckCircle2,
  Download,
  CirclePlay,
} from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'

const labFormats = [
  {
    icon: Code2,
    title: 'Live Build Labs',
    description: 'Co-working sessions where we design systems, ship assets, and solve real blockers together in real-time.',
    color: 'from-[#AB47C7] to-[#8B2FAC]',
    borderColor: 'border-[#AB47C7]/30',
    iconColor: 'text-[#AB47C7]',
  },
  {
    icon: Sparkles,
    title: 'Ritual Labs',
    description: 'Monthly momentum sessions to reset focus, build your next drop, and align the week ahead.',
    color: 'from-[#43BFE3] to-[#2D9FC3]',
    borderColor: 'border-[#43BFE3]/30',
    iconColor: 'text-[#43BFE3]',
  },
  {
    icon: Brain,
    title: 'Agent Deep Dives',
    description: 'Focused builds on Claude, Gemini, and multi-agent workflows with templates and live testing.',
    color: 'from-[#F59E0B] to-[#D97706]',
    borderColor: 'border-[#F59E0B]/30',
    iconColor: 'text-[#F59E0B]',
  },
]

const labFlow = [
  {
    phase: 'Before',
    icon: Download,
    title: 'Pre-Lab Brief',
    description: 'You get the agenda, assets, and prep prompts 48 hours before we meet.',
    color: 'text-[#43BFE3]',
    bgColor: 'bg-[#43BFE3]',
  },
  {
    phase: 'During',
    icon: Zap,
    title: 'Live Build',
    description: 'We work in real time, ship something real, and capture the workflow.',
    color: 'text-[#AB47C7]',
    bgColor: 'bg-[#AB47C7]',
  },
  {
    phase: 'After',
    icon: CheckCircle2,
    title: 'Replay + Checklist',
    description: 'Every lab drops into the Vault with a recap, templates, and implementation checklist.',
    color: 'text-[#F59E0B]',
    bgColor: 'bg-[#F59E0B]',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function LabsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      {/* Animated Background Orbs */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#AB47C7]/[0.06] blur-[128px]"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[#43BFE3]/[0.04] blur-[128px]"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mx-auto max-w-4xl text-center" variants={itemVariants}>
            <motion.div
              className="mb-8 inline-flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#AB47C7]/30 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Beaker className="relative z-10 h-20 w-20 text-[#AB47C7]" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="mb-6 text-5xl font-bold text-balance md:text-7xl">
              FrankX{' '}
              <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] bg-clip-text text-transparent">
                Labs
              </span>
            </h1>

            <p className="mb-12 text-xl leading-relaxed text-slate-400 text-balance md:text-2xl">
              Live build sessions, ritual labs, and agent deep dives for AI builders who ship.
            </p>

            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              <Link
                href="/inner-circle"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-8 py-4 font-semibold text-white shadow-lg shadow-[#AB47C7]/30 transition-all hover:-translate-y-0.5"
              >
                Join Inner Circle
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/vault"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/80 transition-all hover:bg-white/10"
              >
                Visit the Vault
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Lab Formats */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Choose Your Build Style</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Three formats designed for different energy levels and goals.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {labFormats.map((format, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div
                  className={`group h-full rounded-2xl border bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#AB47C7]/10 ${format.borderColor}`}
                >
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${format.color} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <format.icon className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{format.title}</h3>
                  <p className="leading-relaxed text-slate-400">{format.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How Labs Work */}
        <motion.section
          className="mx-auto max-w-5xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How Labs Work</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              A clear three-phase structure so you always know what to expect.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting gradient line */}
            <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#43BFE3] via-[#AB47C7] to-[#F59E0B] md:block" />

            <div className="relative z-10 grid gap-8 md:grid-cols-3">
              {labFlow.map((step, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#AB47C7]/10">
                    <span
                      className={`mb-4 inline-block rounded-full border border-current px-3 py-0.5 text-xs font-semibold uppercase tracking-widest ${step.color}`}
                    >
                      {step.phase}
                    </span>

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5">
                      <step.icon className={`h-8 w-8 ${step.color}`} strokeWidth={2} />
                    </div>

                    <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Next Lab Preview */}
        <motion.section
          className="mx-auto max-w-5xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#AB47C7]/10 via-transparent to-[#43BFE3]/10 p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <CirclePlay className="h-5 w-5 text-[#AB47C7]" />
                    <span className="text-sm font-semibold text-[#AB47C7]">Next Lab</span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Lab schedule published inside the Vault
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-slate-400">
                    Inner Circle members get early access to lab registrations, pre-lab briefs, and replay archives.
                    Every lab becomes a permanent resource in the Vault.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/inner-circle"
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#AB47C7]/30"
                    >
                      Join Inner Circle
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/drops"
                      className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
                    >
                      Browse Weekly Drops
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  {labFlow.map((step) => (
                    <div
                      key={step.title}
                      className="rounded-2xl border border-white/10 bg-[#0a0a0b]/80 p-5 backdrop-blur-sm"
                    >
                      <p className={`mb-1 text-xs font-semibold uppercase tracking-[0.2em] ${step.color}/70`}>
                        {step.phase}
                      </p>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-xs text-white/60">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Full Replay Library CTA */}
        <motion.section
          className="mx-auto max-w-4xl px-6 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur-md">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/10 via-[#43BFE3]/10 to-[#F59E0B]/10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative z-10">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get Lab Access</h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-400">
                  Join the waitlist for early access to upcoming labs, replay archives, and the FrankX builder
                  community.
                </p>

                <div className="mx-auto max-w-md">
                  <EmailSignup
                    listType="inner-circle"
                    placeholder="Enter your email"
                    buttonText="Join the Waitlist"
                    redirectTo="/thank-you"
                    showName={false}
                  />
                </div>

                <p className="mt-6 text-xs text-slate-500">
                  No spam. Unsubscribe anytime. Premium content for serious builders.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
