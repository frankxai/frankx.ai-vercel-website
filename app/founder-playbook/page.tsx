'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Target,
  Rocket,
  Shield,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  Clock,
  Sparkles,
} from 'lucide-react'

// Premium dark background
function PlaybookBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// The 90-day framework
const playbookPhases = [
  {
    phase: 'Phase 1',
    title: 'Map Your Advantage',
    duration: 'Days 1-30',
    description: 'Identify where AI creates the most value for your specific business.',
    icon: Target,
    color: 'emerald',
    actions: [
      'Audit your Skills × Data × Distribution matrix',
      'Identify 3 revenue-linked workflows',
      'Select your highest-leverage opportunity',
      'Define success metrics and baseline',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Build the COE',
    duration: 'Days 31-60',
    description: 'Establish your Center of Excellence and implement your first AI workflow.',
    icon: Rocket,
    color: 'cyan',
    actions: [
      'Assemble your core team (even if just you)',
      'Choose your AI stack (Claude, GPT, etc.)',
      'Build and test your first workflow',
      'Document everything for scaling',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Scale with Governance',
    duration: 'Days 61-90',
    description: 'Evaluate results, add governance, and expand to additional use cases.',
    icon: Shield,
    color: 'violet',
    actions: [
      'Measure against success metrics',
      'Implement evaluation frameworks',
      'Add governance guardrails',
      'Plan your next 3 AI initiatives',
    ],
  },
]

// Framework equation components
const frameworkComponents = [
  {
    title: 'Skills',
    description: 'Your team\'s unique expertise that AI amplifies',
    examples: ['Domain expertise', 'Creative vision', 'Customer insight'],
    color: 'emerald',
  },
  {
    title: 'Data',
    description: 'Proprietary information that makes AI outputs distinctive',
    examples: ['Customer behavior', 'Industry knowledge', 'Process data'],
    color: 'cyan',
  },
  {
    title: 'Distribution',
    description: 'Your channels to reach and serve customers',
    examples: ['Audience access', 'Platform reach', 'Network effects'],
    color: 'violet',
  },
]

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
}

export default function FounderPlaybook() {
  return (
    <>
      <PlaybookBackground />
      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Lightbulb className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Founder's Playbook
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl"
            >
              Ship AI Value
              <span className="block text-emerald-400">Without the Hype</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              A practical 90-day framework for founders who want to implement AI
              that actually moves the needle. No buzzwords. No FOMO. Just results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/guides/modern-guide"
                className="group flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-500"
              >
                Read Full Guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/templates"
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Get Templates
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Framework Equation */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                The Advantage Equation
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Your AI advantage isn't just about tools—it's the unique combination
                of what you bring to the table.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {frameworkComponents.map((component, i) => {
                const colors = colorMap[component.color as keyof typeof colorMap]
                return (
                  <motion.div
                    key={component.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-2xl border ${colors.border} ${colors.bg}`}
                  >
                    <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                      {component.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">{component.description}</p>
                    <ul className="space-y-1">
                      {component.examples.map((example) => (
                        <li key={example} className="text-xs text-slate-500">
                          • {example}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <p className="text-lg text-white/80 font-mono">
                <span className="text-emerald-400">Skills</span>
                {' × '}
                <span className="text-cyan-400">Data</span>
                {' × '}
                <span className="text-violet-400">Distribution</span>
                {' = '}
                <span className="text-amber-400 font-bold">Your AI Advantage</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* 90-Day Framework */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                <Clock className="h-4 w-4" />
                90-Day Framework
              </span>
              <h2 className="text-2xl font-bold text-white mb-4">
                From Zero to Shipping AI Value
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                A structured approach to implementing your first revenue-linked AI workflow.
              </p>
            </motion.div>

            <div className="space-y-8">
              {playbookPhases.map((phase, i) => {
                const colors = colorMap[phase.color as keyof typeof colorMap]
                const Icon = phase.icon

                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`p-8 rounded-2xl border ${colors.border} ${colors.bg}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${colors.icon}`}>
                        <Icon className="h-7 w-7" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className={`text-sm font-medium ${colors.text}`}>
                            {phase.phase}
                          </span>
                          <span className="text-xs text-slate-500">
                            {phase.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {phase.title}
                        </h3>
                        <p className="text-slate-400 mb-6">{phase.description}</p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {phase.actions.map((action) => (
                            <div
                              key={action}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <TrendingUp className="mx-auto mb-6 h-12 w-12 text-emerald-400" />
              <h2 className="mb-4 text-2xl font-bold text-white">
                Ready to Start?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Get the complete guide with templates, worksheets, and frameworks
                to implement your 90-day AI plan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/guides/modern-guide"
                  className="group flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-500"
                >
                  <Sparkles className="h-5 w-5" />
                  Read the Guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/templates"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  Get Templates
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
