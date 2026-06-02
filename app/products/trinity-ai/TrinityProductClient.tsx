'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeUp, fadeUpHero } from '@/lib/motion'

/* ── Data ── */

const layers = [
  {
    color: '#D4AF37',
    title: 'Guardian Protocol',
    description: 'Ethical AI with personality persistence and value alignment.',
  },
  {
    color: '#06B6D4',
    title: 'Living Memory',
    description: '24/7 second brain with sovereign, portable data ownership.',
  },
  {
    color: '#10B981',
    title: 'Vital Intelligence',
    description: 'Biometric-aware assistance that reads your body in real time.',
  },
  {
    color: '#8B5CF6',
    title: 'Agent Constellation',
    description: 'Four specialized guardians orchestrating your digital life.',
  },
  {
    color: '#F59E0B',
    title: 'Collective Wisdom',
    description: 'Multi-generational knowledge that compounds across families.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Your tools, wearables, calendars, and data sources — unified under one protocol.',
  },
  {
    number: '02',
    title: 'Learn',
    description: 'AI builds a living model of your patterns, preferences, and potential.',
  },
  {
    number: '03',
    title: 'Compound',
    description: 'Intelligence grows daily. Every interaction makes the system sharper.',
  },
]

const tiers = [
  {
    name: 'Tier 1 — Core',
    features: [
      'Guardian Protocol with value alignment',
      'Living Memory — sovereign storage allotment',
      'Basic biometric integration',
      'Single-user agent constellation',
    ],
  },
  {
    name: 'Tier 2 — Pro',
    highlight: true,
    features: [
      'Everything in Core',
      'Living Memory — extended history',
      'Advanced vital intelligence with wearables',
      'Priority agent orchestration',
    ],
  },
  {
    name: 'Tier 3 — Sovereign',
    features: [
      'Everything in Pro',
      'Unlimited sovereign data with self-hosting option',
      'Multi-generational collective wisdom',
      'Dedicated infrastructure and SLA',
    ],
  },
]

const techStack = ['Claude Agent SDK', 'Vercel', 'Supabase', 'MCP', 'OpenClaw']

/* ── Component ── */

export default function TrinityProductClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b]">
      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.06),transparent_40%)]" />
      </div>

      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
          <motion.div {...fadeUpHero} className="mx-auto max-w-3xl">
            <span className="mb-6 inline-block rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[#D4AF37] uppercase">
              Coming 2026 — Waitlist Only
            </span>
            <h1 className="font-serif text-5xl font-bold tracking-tight text-white sm:text-7xl">
              Trinity AI
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/60 sm:text-2xl">
              The conscious operating system for human potential.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/35">
              Five system layers — from ethical governance to multi-generational wisdom —
              woven into a single intelligence that grows with you.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work/trinity-ai"
                className="rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
              >
                View Full Architecture
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Five System Layers ── */}
        <section className="px-6 py-24">
          <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Five System Layers
            </h2>
            <p className="mt-4 text-white/60">
              Each layer operates independently. Together, they form a unified intelligence.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {layers.map((layer) => (
              <motion.div
                key={layer.title}
                variants={itemVariants}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <div
                  className="mb-4 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <h3 className="mb-2 text-sm font-semibold text-white">{layer.title}</h3>
                <p className="text-xs leading-relaxed text-white/40">{layer.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── How It Works ── */}
        <section className="px-6 py-24">
          <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-8"
              >
                <span className="mb-4 block font-mono text-xs text-[#D4AF37]/60">
                  {step.number}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Tier Preview (Waitlist) ── */}
        <section className="px-6 py-24">
          <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Three Tiers in Design
            </h2>
            <p className="mt-4 text-white/60">
              Pricing and terms are not set. Waitlist members hear first.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={itemVariants}
                className={`relative rounded-xl border p-8 ${
                  tier.highlight
                    ? 'border-[#D4AF37]/30 bg-[#D4AF37]/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.03]'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#D4AF37]/20 px-3 py-0.5 text-xs font-medium text-[#D4AF37]">
                    Most expected
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <div className="mt-3">
                  <span className="inline-block rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                    Waitlist
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]/50" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/waitlist?ref=trinity-ai-product"
                  className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-medium transition ${
                    tier.highlight
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/30'
                      : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.1]'
                  }`}
                >
                  Join Waitlist
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Tech Stack ── */}
        <section className="px-6 py-16">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-sm font-medium tracking-wider text-white/30 uppercase">
              Built With
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 pt-16 pb-32">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="text-sm text-white/25">
              Built by Arcanea. Powered by conscious architecture.
            </p>
            <Link
              href="/work/trinity-ai"
              className="mt-6 inline-block text-sm font-medium text-[#D4AF37]/70 underline underline-offset-4 transition hover:text-[#D4AF37]"
            >
              Explore the full Trinity AI alliance
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
