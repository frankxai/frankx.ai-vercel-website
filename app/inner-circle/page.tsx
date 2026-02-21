'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { EmailSignup } from '@/components/email-signup'
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
    description: 'Stay connected with weekly AI dispatches and public drops.',
    popular: false,
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
    price: 'Waitlist',
    description: 'Full access to vault, labs, and direct agent support.',
    popular: true,
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
    price: 'Custom',
    description: 'Enterprise partnership with bespoke strategy and agent builds.',
    popular: false,
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
    ctaHref: 'mailto:hello@frankx.ai?subject=FrankX%20Alliance%20Inquiry',
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

const FAQS = [
  {
    question: 'What is the Inner Circle?',
    answer:
      'The Inner Circle is FrankX\'s premium community for builders and creators serious about AI. You get access to the vault, live labs, templates, prompt packs, and direct support from the agent collective.',
  },
  {
    question: 'When does the Inner Circle launch?',
    answer:
      'We\'re currently in waitlist mode. Join now to be first in line for launch pricing, onboarding bonuses, and early access to the vault.',
  },
  {
    question: 'What\'s included in the free Signal tier?',
    answer:
      'Signal members receive the weekly Creation Chronicles dispatch, access to public blog posts and research, and early product announcements. It\'s the best way to stay connected with FrankX intelligence.',
  },
  {
    question: 'How are the live labs structured?',
    answer:
      'You receive a pre-lab brief 48 hours before. During the session, we build in real time and ship something real. After, every lab drops into the Vault with a recap, templates, and implementation checklist.',
  },
  {
    question: 'What does Alliance include?',
    answer:
      'Alliance is our enterprise tier with custom strategy work, dedicated agent builds, executive briefings, and bespoke governance frameworks. Contact us to discuss your specific needs.',
  },
]

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
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] px-4 py-1 text-sm font-medium text-white">
            <Star className="h-3 w-3" fill="currentColor" />
            Coming Soon
          </div>
        </div>
      )}

      <div
        className={`relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl ${
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
            <span className="text-5xl font-bold text-white">{tier.price}</span>
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
      </div>
    </motion.div>
  )
}

function BenefitCard({ benefit, index }: { benefit: (typeof BENEFITS)[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-white/20"
    >
      <benefit.icon className={`mb-4 h-10 w-10 ${benefit.color} transition-transform group-hover:scale-110`} />
      <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
      <p className="leading-relaxed text-slate-400">{benefit.description}</p>
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
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Nero — Inner Circle character accent */}
        <div className="pointer-events-none absolute right-6 top-24 z-0 hidden w-56 opacity-10 lg:block xl:w-72">
          <Image src="/images/team/nero-umbra.png" alt="" width={288} height={288} className="object-contain" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-[#AB47C7]/20 blur-[120px]"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 top-1/3 h-1/2 w-1/2 rounded-full bg-[#43BFE3]/20 blur-[120px]"
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
            <Image src="/images/team/nero-umbra.png" alt="Nero — Inner Circle Guardian" width={80} height={80} className="rounded-2xl" style={{ boxShadow: '0 0 40px -8px rgba(99,102,241,0.5)' }} />
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
            className="mx-auto mb-12 max-w-3xl text-xl text-slate-400 text-balance md:text-2xl"
          >
            The exclusive community for builders and creators serious about mastering AI and shipping products that
            matter.
          </motion.p>

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
              Join the Waitlist
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/creation-chronicles"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/20"
            >
              Explore Creation Chronicles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Stats */}
      <section className="border-y border-white/10 bg-white/[0.03] py-20 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: '38', label: 'AI Agents', icon: Cpu, color: 'text-[#AB47C7]' },
              { number: '75+', label: 'Skills', icon: Zap, color: 'text-[#43BFE3]' },
              { number: '12K+', label: 'AI Songs', icon: Music, color: 'text-[#F59E0B]' },
              { number: '70+', label: 'Articles', icon: FileText, color: 'text-[#10B981]' },
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
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#43BFE3]/70">
                  {item.label}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
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

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            {FAQS.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
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
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 backdrop-blur-xl"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
