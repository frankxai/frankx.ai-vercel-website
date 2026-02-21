'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Clock,
  Heart,
  Music,
  FileText,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
  Network,
} from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'

// ── Data ──

const coverageAreas = [
  {
    icon: Brain,
    title: 'AI Systems Architecture',
    description:
      'Agent orchestration, MCP integration, Claude Code workflows, and production-ready AI systems.',
    color: '#AB47C7',
  },
  {
    icon: Rocket,
    title: 'Creator Business Strategy',
    description:
      'Product development, funnel optimization, monetization strategies, and sustainable growth.',
    color: '#43BFE3',
  },
  {
    icon: Music,
    title: 'Music Production with AI',
    description:
      'Suno workflows, AI-assisted composition, production techniques, and creative automation.',
    color: '#F59E0B',
  },
  {
    icon: FileText,
    title: 'Content Systems',
    description:
      'SEO optimization, automated publishing pipelines, research workflows, and content strategy.',
    color: '#10B981',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your current systems, goals, and challenges to create a custom roadmap.',
    icon: Target,
    color: '#43BFE3',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Design your AI architecture, define milestones, and create an actionable implementation plan.',
    icon: Network,
    color: '#AB47C7',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Hands-on implementation with guidance, code reviews, and real-time problem solving.',
    icon: Zap,
    color: '#F59E0B',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy with confidence, optimize performance, and establish sustainable growth systems.',
    icon: Rocket,
    color: '#10B981',
  },
]

const tiers = [
  {
    name: 'Strategy Session',
    duration: '1 hour',
    color: '#43BFE3',
    features: [
      'AI stack audit & analysis',
      'Architecture review & recommendations',
      'Growth roadmap planning',
      'Q&A and strategic guidance',
      'Action plan document',
    ],
  },
  {
    name: 'Builder Sprint',
    duration: '4 weeks',
    color: '#AB47C7',
    popular: true,
    features: [
      'Weekly 1-on-1 coaching sessions',
      'Custom AI agent setup & deployment',
      'Architecture design & implementation',
      'Shipping accountability & review',
      'Async support between sessions',
      'Code reviews & debugging help',
    ],
  },
  {
    name: 'Architect Residency',
    duration: '12 weeks',
    color: '#F59E0B',
    features: [
      'Full AI transformation roadmap',
      'Enterprise architecture design',
      'Bi-weekly deep-dive sessions',
      'Ongoing support & consulting',
      'Team training & documentation',
      'Priority access to Frank',
      'Launch support & optimization',
    ],
  },
]

const idealFor = [
  'Creators wanting to integrate AI into their workflow',
  'Founders building AI-powered products or services',
  'Professionals transitioning to AI-focused roles',
  'Teams implementing AI tools for the first time',
  'Developers building multi-agent systems',
  'Musicians exploring AI-assisted production',
]

const faqs = [
  {
    question: 'Who is this coaching for?',
    answer:
      'Technical creators, developers, and founders who want to build production-ready AI systems, grow their creator business, or transform their technical expertise into results. You should have basic programming knowledge and be ready to implement.',
  },
  {
    question: 'What makes this coaching different?',
    answer:
      'I combine deep technical expertise in AI systems (38 agents, 75+ skills in ACOS) with practical creator experience (12,000+ AI songs, 70+ articles). You get hands-on architecture guidance plus strategies that actually work in production.',
  },
  {
    question: 'What tech stack do you work with?',
    answer:
      'I specialize in modern AI stacks: Claude Code, Next.js, TypeScript, Vercel, MCP servers, and agentic frameworks. I help you choose the right tools for your specific goals and constraints.',
  },
  {
    question: 'When will coaching be available?',
    answer:
      'Coaching launches soon. Join the waitlist to get priority access and be first to book when slots open. Newsletter subscribers get early access.',
  },
]

// ── Components ──

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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-semibold text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 leading-relaxed text-slate-400">{answer}</p>
      </motion.div>
    </div>
  )
}

// ── Page ──

export default function CoachingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0F172A] text-white">
      {/* Background Orbs */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#AB47C7]/15 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full bg-[#43BFE3]/15 blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mx-auto max-w-4xl" variants={itemVariants}>
            <div className="mb-6 flex items-center gap-4">
              <Image src="/images/team/shinkami.png" alt="Shinkami — Coaching Guide" width={64} height={64} className="rounded-2xl" style={{ boxShadow: '0 0 30px -6px rgba(20,184,166,0.4)' }} />
              <div className="inline-flex items-center gap-2 rounded-full border border-[#AB47C7]/30 bg-[#AB47C7]/10 px-4 py-2 text-sm font-medium text-[#AB47C7]">
                <Sparkles className="h-4 w-4" />
                Premium AI Coaching
              </div>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-balance md:text-7xl">
              AI Coaching{' '}
              <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] bg-clip-text text-transparent">
                That Fits Your Reality
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-slate-400 text-balance">
              Skip the generic AI advice. Work directly with someone who&apos;s built 40+ AI agents,
              shipped production systems, and created 500+ AI songs.
            </p>

            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400"
              variants={itemVariants}
            >
              <Clock className="h-4 w-4" />
              Coming Soon — Join the Waitlist
            </motion.div>
          </motion.div>
        </motion.section>

        {/* What We Cover */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Coaching Covers</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Comprehensive guidance across AI systems, creator strategy, and technical excellence.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {coverageAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div key={area.title} variants={itemVariants}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#AB47C7]/10">
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${area.color}20` }}
                    >
                      <Icon className="h-7 w-7" style={{ color: area.color }} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{area.title}</h3>
                    <p className="leading-relaxed text-slate-400">{area.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* The Process */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Process</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              A proven framework that takes you from strategy to shipped product.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#43BFE3] via-[#AB47C7] to-[#10B981] lg:block" />

            <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => {
                const Icon = step.icon
                return (
                  <motion.div key={step.number} variants={itemVariants}>
                    <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#AB47C7]/10">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-5xl font-bold text-white/10">{step.number}</span>
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                          style={{ backgroundColor: `${step.color}20` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: step.color }} />
                        </div>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Program Tiers */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Choose Your Path</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Three engagement formats designed for different needs and goals.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <motion.div key={tier.name} variants={itemVariants}>
                <div
                  className={`group relative h-full rounded-2xl border bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    tier.popular
                      ? 'border-[#AB47C7]/40 hover:shadow-[#AB47C7]/15'
                      : 'border-white/10 hover:shadow-[#AB47C7]/10'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 right-6">
                      <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-3 py-1 text-xs font-bold text-white">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${tier.color}20` }}
                  >
                    <Shield className="h-6 w-6" style={{ color: tier.color }} />
                  </div>

                  <h3 className="mb-1 text-2xl font-bold">{tier.name}</h3>
                  <p className="mb-6 text-sm text-slate-500">{tier.duration}</p>

                  <div className="mb-6">
                    <span
                      className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{ borderColor: `${tier.color}40`, color: tier.color }}
                    >
                      Coming Soon
                    </span>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: tier.color }} />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href="#waitlist"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-white/10"
                    >
                      Join Waitlist
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Ideal For */}
        <motion.section
          className="mx-auto max-w-5xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#AB47C7]/10 via-transparent to-[#43BFE3]/10 p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-[#AB47C7]" />
                    <span className="text-sm font-semibold text-[#AB47C7]">Who This Is For</span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Built for Builders
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-400">
                    Whether you&apos;re a creator, founder, or developer — this coaching is designed for
                    people who want practical, hands-on guidance that leads to real results.
                  </p>
                </div>

                <div className="space-y-4">
                  {idealFor.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                      <span className="text-slate-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          className="mx-auto max-w-3xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about coaching with Frank.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 backdrop-blur-sm">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Waitlist CTA */}
        <motion.section
          id="waitlist"
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
                <motion.div
                  className="mb-6 inline-flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#14B8A6]/30 blur-xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <Image src="/images/team/shinkami.png" alt="Shinkami" width={64} height={64} className="relative z-10 rounded-2xl" />
                  </div>
                </motion.div>

                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get Priority Access</h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-400">
                  Join the waitlist to be notified when coaching opens. Newsletter subscribers get
                  early access and priority booking.
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
                  No spam. Unsubscribe anytime. Priority access for serious builders.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
