'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { EmailSignup } from '@/components/email-signup'
import { GlowCard } from '@/components/ui/glow-card'
import { INNER_CIRCLE_FAQS } from '@/lib/inner-circle-faqs'
import {
  Shield,
  Zap,
  Users,
  Calendar,
  Book,
  Rocket,
  Sparkles,
  Crown,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Star,
  Award,
  Cpu,
  Music,
  FileText,
} from 'lucide-react'

const MEMBERSHIP_TIERS = [
  {
    name: 'Signal',
    price: 'Free',
    priceUnit: undefined,
    secondaryPrice: undefined,
    description: 'Stay connected with weekly AI dispatches and public drops.',
    popular: false,
    badge: undefined,
    features: [
      { text: 'Weekly Creation Chronicles dispatch', included: true },
      { text: 'Public blog & research access', included: true },
      { text: 'Early product announcements', included: true },
      { text: 'Selected Creation Chronicles essays', included: true },
      { text: 'Live build labs', included: false },
      { text: 'Private vault access', included: false },
      { text: 'Template & prompt packs', included: false },
      { text: 'Monthly masterclass', included: false },
      { text: 'Agent desk support', included: false },
      { text: 'Strategy intensives', included: false },
    ],
    cta: 'Join Creation Chronicles',
    ctaHref: '/creation-chronicles',
    gradient: 'from-slate-600 to-slate-700',
  },
  {
    name: 'Inner Circle',
    price: '$119',
    priceUnit: '/month',
    secondaryPrice: '$999/year — save 30%',
    description: 'Full access to vault, labs, and direct agent support. Founding-member cohort capped at 100.',
    popular: true,
    badge: 'Founding 100',
    features: [
      { text: 'Weekly Creation Chronicles dispatch', included: true },
      { text: 'Public blog & research access', included: true },
      { text: 'Early product announcements', included: true },
      { text: 'Selected Creation Chronicles essays', included: true },
      { text: 'Live build labs', included: true },
      { text: 'Private vault access', included: true },
      { text: 'Template & prompt packs', included: true },
      { text: 'Monthly masterclass', included: true },
      { text: 'Agent desk support', included: false },
      { text: 'Strategy intensives', included: false },
    ],
    cta: 'Join the Waitlist',
    ctaHref: '#signup',
    gradient: 'from-[#AB47C7] to-[#43BFE3]',
  },
  {
    name: 'Alliance',
    price: 'From $2,000',
    priceUnit: '/month',
    secondaryPrice: 'Custom scope · conversation, not checkout',
    description: 'Enterprise partnership with bespoke strategy, dedicated agent builds, and executive briefings.',
    popular: false,
    badge: undefined,
    features: [
      { text: 'Weekly Creation Chronicles dispatch', included: true },
      { text: 'Public blog & research access', included: true },
      { text: 'Early product announcements', included: true },
      { text: 'Selected Creation Chronicles essays', included: true },
      { text: 'Live build labs', included: true },
      { text: 'Private vault access', included: true },
      { text: 'Template & prompt packs', included: true },
      { text: 'Monthly masterclass', included: true },
      { text: 'Agent desk support', included: true },
      { text: 'Strategy intensives', included: true },
    ],
    cta: 'Request Strategy Session',
    ctaHref: 'mailto:frank@frankx.ai?subject=FrankX%20Alliance%20Inquiry',
    gradient: 'from-[#F59E0B] to-[#10B981]',
  },
]

const BENEFITS = [
  {
    icon: Calendar,
    title: 'Live Build Labs',
    description: 'Co-working sessions where we build systems, ship assets, and solve real blockers together.',
    color: 'text-[#AB47C7]',
  },
  {
    icon: Book,
    title: 'Creation Chronicles Vault',
    description: 'Private library of prompt packs, templates, sonic drops, and behind-the-scenes tutorials updated weekly.',
    color: 'text-[#43BFE3]',
  },
  {
    icon: Rocket,
    title: 'Early Tool Access',
    description: 'Get first access to new AI tools, templates, and frameworks before public release.',
    color: 'text-[#F59E0B]',
  },
  {
    icon: Sparkles,
    title: 'Monthly Masterclass',
    description: 'Deep-dive sessions on advanced AI techniques, agent orchestration, and production workflows.',
    color: 'text-[#10B981]',
  },
  {
    icon: Crown,
    title: 'Agent Desk Support',
    description: 'Submit prompts, workflows, or architecture questions and receive guided responses from specialist agents.',
    color: 'text-[#AB47C7]',
  },
  {
    icon: Zap,
    title: 'Strategy Intensives',
    description: 'Quarterly deep-dives with the Agent Collective to recalibrate launches and system governance.',
    color: 'text-[#43BFE3]',
  },
]

const CADENCE = [
  {
    label: 'Weekly',
    title: 'Creation Chronicles Dispatch',
    description: 'Story + soundtrack + system drop to keep you building with momentum.',
  },
  {
    label: 'Monthly',
    title: 'Inner Circle Lab',
    description: 'Live build sessions, framework walkthroughs, Q&A, and breakout sessions.',
  },
  {
    label: 'Quarterly',
    title: 'Strategy Intensives',
    description: 'Deep-dive sessions to recalibrate launches, review governance, and plan ahead.',
  },
]

const FAQS = INNER_CIRCLE_FAQS

function AnimatedShield() {
  return (
    <motion.div
      className="relative mx-auto h-56 w-56"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        animate={{ rotateY: [0, 10, 0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl" />
        <Shield className="z-10 h-24 w-24 text-white" strokeWidth={1.5} />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3]"
            style={{
              left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
              top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
            }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

function PricingCard({ tier, index }: { tier: (typeof MEMBERSHIP_TIERS)[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  const isWaitlist = tier.ctaHref === '#signup'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group ${tier.popular ? 'lg:-mt-8' : ''}`}
    >
      {tier.popular && tier.badge && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-4 py-1 text-sm font-medium text-white">
            <Star className="h-3 w-3" fill="currentColor" />
            {tier.badge}
          </div>
        </div>
      )}

      <GlowCard
        color={tier.popular ? 'violet' : tier.gradient.includes('F59E0B') ? 'amber' : 'cyan'}
        className={`relative h-full p-8 ${
          tier.popular ? 'border-[#AB47C7]/50 shadow-2xl shadow-[#AB47C7]/20 lg:scale-105' : ''
        }`}
      >
        {tier.popular && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#AB47C7]/10 to-[#43BFE3]/10 blur-xl opacity-50" />
        )}

        <div className="relative z-10">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-2xl font-bold text-white">{tier.name}</h3>
            <p className="text-sm text-slate-400">{tier.description}</p>
          </div>

          <div className="mb-8 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-white">{tier.price}</span>
              {tier.priceUnit && (
                <span className="text-lg font-medium text-slate-400">{tier.priceUnit}</span>
              )}
            </div>
            {tier.secondaryPrice && (
              <div className="mt-2 text-sm text-slate-400">{tier.secondaryPrice}</div>
            )}
          </div>

          {isWaitlist ? (
            <div className="mb-8" id="signup">
              <EmailSignup
                listType="inner-circle"
                placeholder="Your email"
                buttonText="Join Waitlist"
                redirectTo="/thank-you"
                showName={true}
                compact={true}
              />
            </div>
          ) : (
            <Link
              href={tier.ctaHref}
              className={`mb-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all ${
                tier.gradient === 'from-[#F59E0B] to-[#10B981]'
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#10B981] text-white shadow-lg shadow-[#F59E0B]/30'
                  : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tier.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <div className="space-y-3">
            {tier.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                {feature.included ? (
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#10B981]" />
                ) : (
                  <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-600" />
                )}
                <span className={`text-sm ${feature.included ? 'text-white' : 'text-slate-500'}`}>
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

function BenefitCard({ benefit, index }: { benefit: (typeof BENEFITS)[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  // Map benefit colors to GlowCard colors
  const colorMap: Record<string, 'violet' | 'cyan' | 'amber' | 'emerald'> = {
    'text-[#AB47C7]': 'violet',
    'text-[#43BFE3]': 'cyan',
    'text-[#F59E0B]': 'amber',
    'text-[#10B981]': 'emerald',
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlowCard color={colorMap[benefit.color] || 'violet'} className="p-6 h-full">
        <benefit.icon className={`mb-4 h-10 w-10 ${benefit.color} transition-transform group-hover:scale-110`} />
        <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
        <p className="leading-relaxed text-slate-400">{benefit.description}</p>
      </GlowCard>
    </motion.div>
  )
}

function FAQItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-4 text-lg font-semibold text-white transition-colors group-hover:text-[#AB47C7]">
          {faq.question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 leading-relaxed text-slate-400">{faq.answer}</p>
      </motion.div>
    </motion.div>
  )
}

export default function InnerCirclePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Axi constellation — premium/mystery */}
        <div className="pointer-events-none absolute right-6 top-24 z-0 hidden w-52 opacity-12 lg:block xl:w-64">
          <Image src="/images/mascot/mascot-v10-data-constellation.png" alt="" width={256} height={256} className="object-contain" sizes="256px" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-[#AB47C7]/[0.06] blur-[128px]"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 top-1/3 h-1/2 w-1/2 rounded-full bg-[#43BFE3]/[0.04] blur-[128px]"
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex justify-center"
          >
            <Image src="/images/mascot/mascot-v16-organic-digital-split.png" alt="Axi" width={72} height={72} className="rounded-2xl" sizes="72px" style={{ boxShadow: '0 0 30px -6px rgba(139,92,246,0.4)' }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-[#F59E0B]" />
            <span className="text-sm text-slate-300">Premium AI Community</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-bold text-balance md:text-7xl"
          >
            Join the{' '}
            <span className="bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B] bg-clip-text text-transparent">
              Inner Circle
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-8 max-w-3xl text-xl text-slate-400 text-balance md:text-2xl"
          >
            The exclusive community for builders and creators serious about mastering AI and shipping products that
            matter.
          </motion.p>

          {/* Above-fold primary CTA — added 2026-05-20 per hub-audit P1.1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="#signup"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#AB47C7]/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#AB47C7]/60"
            >
              Join the Waitlist — June 1 2026
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-white/40">
              Free to join · Single-click unsubscribe · No spam
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedShield />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="#signup"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-8 py-4 font-semibold text-white shadow-lg shadow-[#AB47C7]/50 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#AB47C7]/60"
            >
              Join the Waitlist — June 1 2026
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/newsletter"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/20"
            >
              Read the Newsletter
            </Link>
          </motion.div>

          {/* Inline supporting links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/40"
          >
            <Link href="/acos" className="hover:text-white/70 transition-colors">
              Agentic Creator OS
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/library" className="hover:text-white/70 transition-colors">
              Book Library
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/prompt-library" className="hover:text-white/70 transition-colors">
              Prompt Library
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/research" className="hover:text-white/70 transition-colors">
              Research
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/blog" className="hover:text-white/70 transition-colors">
              Blog
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Stats */}
      <section className="border-y border-white/10 bg-white/[0.03] py-20 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: '24+', label: 'AI Agents', icon: Cpu, color: 'text-[#AB47C7]', href: '/acos' },
              { number: '70+', label: 'Skills', icon: Zap, color: 'text-[#43BFE3]', href: '/acos' },
              { number: '12K+', label: 'AI Songs', icon: Music, color: 'text-[#F59E0B]', href: '/music' },
              { number: '70+', label: 'Articles', icon: FileText, color: 'text-[#10B981]', href: '/blog' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className={`mx-auto mb-4 h-10 w-10 ${stat.color}`} />
                <div className="mb-2 text-3xl font-bold text-white md:text-4xl">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white text-balance md:text-5xl">What You Get</h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-400 text-balance">
              Everything you need to build, ship, and scale AI products faster than ever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Cadence & Rituals */}
      <section className="bg-white/[0.03] py-24 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Cadence & Rhythm</h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-400">
              A rhythm that balances momentum with reflection. Every touchpoint drives action.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {CADENCE.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlowCard color="cyan" className="p-6 h-full">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#43BFE3]/70">
                    {item.label}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#AB47C7]/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white text-balance md:text-5xl">Membership Pathway</h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-400 text-balance">
              From free updates to elite partnership. Pick the tier that matches your ambition.
            </p>
          </motion.div>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {MEMBERSHIP_TIERS.map((tier, index) => (
              <PricingCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>

          {/* Founding Member callout — first 100 only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 max-w-3xl"
          >
            <GlowCard color="amber" className="p-6 sm:p-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Crown className="h-10 w-10 flex-shrink-0 text-[#F59E0B]" />
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#F59E0B]/80">
                    Founding 100 · Launch week only
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    First 100 to join during June 1–7 get three things later joiners don&apos;t
                  </h3>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#10B981]" />
                      <span>Founders-only Slack channel — closes June 7, never reopens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#10B981]" />
                      <span>Exclusive July 20 masterclass — Prompt Engineering at Scale (founders only)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#10B981]" />
                      <span>Founders rate locked at $119/month for as long as you stay subscribed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Billing + cancellation disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center text-sm text-slate-500"
          >
            <p className="leading-relaxed">
              Billing starts <span className="text-slate-300">Monday June 1, 2026 at 09:00 CET</span>. Cancel anytime in one click — no lock-in, no fees, no questions. Annual plans save ~30%. Prices in USD; charged via Stripe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/[0.03] py-24 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-400">Everything you need to know about the Inner Circle.</p>
          </motion.div>

          <GlowCard color="violet" className="p-8">
            {FAQS.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </GlowCard>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/10 via-[#43BFE3]/10 to-[#F59E0B]/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GlowCard color="amber" className="p-12">
            <Award className="mx-auto mb-6 h-16 w-16 text-[#F59E0B]" />
            <h2 className="mb-6 text-4xl font-bold text-white text-balance md:text-5xl">Reserve Your Spot</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-400 text-balance">
              Be first to receive Inner Circle pricing, launch bonuses, and the onboarding guide.
            </p>

            <div className="mx-auto max-w-md">
              <EmailSignup
                listType="inner-circle"
                placeholder="Enter your email"
                buttonText="Join the Waitlist"
                redirectTo="/thank-you"
                showName={true}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-[#10B981]" /> No spam, ever
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-[#10B981]" /> Unsubscribe anytime
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-[#10B981]" /> Early access pricing
              </span>
            </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
