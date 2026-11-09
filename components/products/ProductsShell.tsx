'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Music,
  BookOpen,
  Building2,
  Cpu,
  CheckCircle2,
  Package,
  Shield,
  Zap,
  Users,
  Star,
  X,
  Send,
} from 'lucide-react'

import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { productsFaq } from '@/components/products/products-data'

// Product characters removed: mascot-first strategy (Feb 21)

// Premium background
function ProductsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />

      {/* Static gradient orbs: no animation, ambient depth only */}
      <div
        className="absolute -right-60 top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

// Product data - structured for premium display
const products = [
  {
    id: 'vibe-os',
    icon: Zap,
    name: 'Vibe OS',
    tagline: 'Creative state management',
    description:
      'A practical system and public guide for tracking creative energy cycles, matching deep work to focus windows, and shipping without burnout. Public guide open now; web app in development.',
    status: 'active',
    href: '/products/vibe-os',
    color: 'emerald',
    highlights: [
      'Public guide open now with daily check-in and scheduling instructions',
      'Match deep build sessions to your natural focus windows',
      'Web app in development: join the waitlist for release notes',
    ],
    featured: true,
  },
  {
    id: 'creators-soulbook',
    icon: BookOpen,
    name: 'The Creator\'s Soulbook',
    tagline: 'Life architecture OS',
    description:
      'Life operating system with 7 pillars, frameworks, and guided reflection prompts. Complete Obsidian vault included.',
    status: 'early-access',
    href: '/soulbook',
    color: 'cyan',
    highlights: [
      '7 Life Pillars framework with reflection exercises',
      '3 perspectives (Life Symphony, Golden Path, 7 Pillars)',
      'Guided reflection prompts + ready-to-use Obsidian vault',
    ],
  },
  {
    id: 'suno-prompts-bundle',
    icon: Sparkles,
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-specific prompt templates',
    description:
      'Five curated prompt bundles for specific genres: electronic, hip-hop, ambient, cinematic, and lo-fi.',
    status: 'early-access',
    href: '/products/suno-prompt-library',
    color: 'emerald',
    highlights: [
      'Prompts across 5 genres',
      'Tempo and mood notes for each genre',
      'Arrangement tips and remixing guides',
    ],
  },
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library and workflow rituals',
    description:
      'A digital kit with prompts, templates, and rollout rituals for consistent output.',
    status: 'early-access',
    href: '/newsletter?ref=creative-ai-toolkit-early-access',
    color: 'amber',
    highlights: [
      'Curated prompts across storytelling, marketing, and operations',
      'Structured checklists for weekly publishing',
      'Phased 30, 60, and 90-day implementation roadmaps',
    ],
  },
  {
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Editorial storytelling system',
    description:
      'Story frameworks, editorial calendars, and prompt stacks to build authority.',
    status: 'early-access',
    href: '/newsletter?ref=creation-chronicles-early-access',
    color: 'cyan',
    highlights: [
      'Strategic story architecture and messaging frameworks',
      'AI-assisted content creation workflows',
      'Omnichannel distribution templates',
    ],
  },
  {
    id: 'generative-creator-os',
    icon: Cpu,
    name: 'Generative Creator OS',
    tagline: 'Multi-modal studio pipeline',
    description:
      'Multi-modal templates, prompts, and guardrails for a reliable studio system.',
    status: 'early-access',
    href: '/newsletter?ref=generative-creator-os-early-access',
    color: 'cyan',
    highlights: [
      'Multi-modal asset generation pipelines',
      'Brand intelligence and compliance system',
      'Team enablement and performance analytics',
    ],
  },
  {
    id: 'agentic-creator-os',
    icon: Building2,
    name: 'Agentic Creator OS',
    tagline: 'Developer harness workflows',
    description:
      'Agentic playbooks, prompt stacks, and governance checklists for builders.',
    status: 'early-access',
    href: '/newsletter?ref=agentic-creator-os-early-access',
    color: 'emerald',
    highlights: [
      'Claude Code and Cursor mastery systems',
      'Agentic workflow and automation patterns',
      'Production-grade agent development',
    ],
  },
]

const colorMap = {
  emerald: {
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08] hover:border-emerald-500/30',
    icon: 'bg-emerald-500/10 text-emerald-400',
    accent: 'text-emerald-400',
    button: 'bg-emerald-600 hover:bg-emerald-500',
    glow: 'group-hover:shadow-lg group-hover:shadow-emerald-500/10',
  },
  cyan: {
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08] hover:border-cyan-500/30',
    icon: 'bg-cyan-500/10 text-cyan-400',
    accent: 'text-cyan-400',
    button: 'bg-cyan-600 hover:bg-cyan-500',
    glow: 'group-hover:shadow-lg group-hover:shadow-cyan-500/10',
  },
  amber: {
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08] hover:border-amber-500/30',
    icon: 'bg-amber-500/10 text-amber-400',
    accent: 'text-amber-400',
    button: 'bg-amber-600 hover:bg-amber-500',
    glow: 'group-hover:shadow-lg group-hover:shadow-amber-500/10',
  },
  rose: {
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08] hover:border-rose-500/30',
    icon: 'bg-rose-500/10 text-rose-400',
    accent: 'text-rose-400',
    button: 'bg-rose-600 hover:bg-rose-500',
    glow: 'group-hover:shadow-lg group-hover:shadow-rose-500/10',
  },
}

// Early Access Modal Component
function EarlyAccessModal({
  product,
  isOpen,
  onClose,
}: {
  product: (typeof products)[number]
  isOpen: boolean
  onClose: () => void
}) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null
  const titleId = `early-access-title-${product.id}`

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={shouldReduceMotion ? false : { scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { opacity: 1 } : { scale: 0.96, opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121318] p-8"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <X aria-hidden="true" className="h-5 w-5 text-slate-300" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Early access
          </span>
          <h3 id={titleId} className="text-2xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-sm text-slate-400">{product.tagline}</p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            This kit is in final packaging. Join the launch list to receive:
          </p>
          <ul className="space-y-2">
            {['Release notification when live', 'Inspectable file manifest notes', 'Build changelog updates'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {item}
                </li>
              )
            )}
          </ul>

          <EmailSignup
            compact
            buttonText="Join launch list"
            listType="courses-waitlist"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProductsShell() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <ProductsBackground />
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24">
          {/* Axi: mascot accent */}
          <div className="pointer-events-none absolute right-0 top-16 hidden w-56 opacity-15 lg:block xl:w-72">
            <Image
              src="/images/mascot/mascot-v05-techno-beast-standing.png"
              alt=""
              width={288}
              height={288}
              className="object-contain"
              sizes="288px"
              aria-hidden="true"
            />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="mb-8 flex items-center gap-4"
            >
              <Image src="/images/mascot/mascot-v17-negative-space-mark.png" alt="Axi" width={48} height={48} className="rounded-xl" sizes="48px" style={{ boxShadow: '0 0 20px -6px rgba(16,185,129,0.28)' }} />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Package className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-medium tracking-[0.08em] text-slate-400">
                Digital products
              </span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : 0.05 }}
              className="mb-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white"
            >
              Systems I use.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                Packaged for you.
              </span>
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="max-w-2xl text-[17px] sm:text-xl leading-relaxed text-slate-300/90"
            >
              Concrete frameworks, prompt templates, and checklists drawn from active studio
              and engineering projects, ready to inspect before you commit.
            </motion.p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => {
                const Icon = product.icon
                const colors = colorMap[product.color as keyof typeof colorMap]
                const isActive = product.status === 'active'

                return (
                  <motion.div
                    key={product.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : 0.04 * index }}
                    className={product.featured ? 'md:col-span-2 lg:col-span-1' : ''}
                  >
                    <GlowCard color={product.color as GlowColor} className={`p-8 h-full flex flex-col motion-reduce:transition-none ${isActive ? 'cursor-pointer hover:-translate-y-1 motion-reduce:hover:translate-y-0' : ''}`}>
                        {/* Featured badge */}
                        {product.featured && (
                          <div className="absolute right-6 top-6">
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                              Available now
                            </span>
                          </div>
                        )}

                        {/* Icon */}
                        <div className="mb-6">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors.icon}`}
                          >
                            <Icon className="h-7 w-7" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <p className="mb-1 font-mono text-xs font-medium tracking-[0.06em] text-slate-400">
                            {product.tagline}
                          </p>
                          <h3 className="mb-3 text-2xl font-bold text-white">{product.name}</h3>
                          <p className="mb-6 leading-relaxed text-slate-400">
                            {product.description}
                          </p>

                          {/* Highlights */}
                          <ul className="mb-8 space-y-3">
                            {product.highlights.map((highlight) => (
                              <li
                                key={highlight}
                                className="flex items-start gap-3 text-sm text-slate-300"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Status and CTA */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                          <div className="flex items-center gap-2">
                            {isActive ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Available
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
                                <Sparkles className="w-3.5 h-3.5" />
                                Early access
                              </span>
                            )}
                          </div>
                          {isActive ? (
                            <Link
                              href={product.href}
                              onClick={() =>
                                trackEvent('product_card_click', { productId: product.id })
                              }
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                            >
                              <span className="text-sm font-medium">Explore</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setOpenModal(product.id)
                                trackEvent('early_access_click', { productId: product.id })
                              }}
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                            >
                              <span className="text-sm font-medium">Join</span>
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                          )}
                        </div>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: Sparkles, label: 'Inspectable file trees', color: 'text-amber-400' },
                { icon: Zap, label: 'Launch list updates', color: 'text-cyan-400' },
                { icon: Users, label: 'Builder notes', color: 'text-emerald-400' },
                { icon: Star, label: 'Field-tested workflows', color: 'text-emerald-400' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  <span className="text-sm text-white/70">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="text-center mb-12"
            >
              <p className="font-mono text-xs font-medium tracking-[0.08em] text-emerald-400/80 mb-2">
                What you get
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Documented templates and checklists
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Field-tested prompts',
                  description: 'Structured prompt files with clear variables, genre or task anchors, and iteration notes.',
                  icon: Sparkles,
                  color: 'emerald',
                },
                {
                  title: 'Workflow templates',
                  description: 'Complete workflows you can adapt. From capture to publishing, every step is documented and repeatable.',
                  icon: Zap,
                  color: 'cyan',
                },
                {
                  title: 'Revision changelogs',
                  description: 'As models and tools change, kits document updated prompt syntax and verification steps.',
                  icon: Star,
                  color: 'cyan',
                },
              ].map((item, i) => {
                const colorClasses: Record<string, string> = {
                  emerald: 'bg-emerald-500/10 text-emerald-400',
                  cyan: 'bg-cyan-500/10 text-cyan-400',
                }

                return (
                  <motion.div
                    key={item.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                    className="p-6 rounded-3xl"
                  >
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[item.color]} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Common questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {productsFaq.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : i * 0.05 }}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                >
                  <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA - Early Access */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 blur-3xl" />

              <div className="relative flex flex-col items-center gap-8 text-center">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                    <CheckCircle2 className="w-4 h-4" />
                    Ready to explore
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
                    Start building with our systems today
                  </h2>
                  <p className="text-[17px] text-slate-300/90 leading-relaxed">
                    Inspect the public Vibe OS guide now. Other listed products remain previews or
                    early-access routes until their delivery path is verified.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Link
                    href="/products/vibe-os"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-page', target: 'vibe-os' })
                    }
                    className="group flex-1 flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                  >
                    Explore Vibe OS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/founder-stack"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-page', target: 'founder-stack' })
                    }
                    className="group flex-1 flex items-center justify-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.04] px-6 py-3 font-medium text-cyan-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                  >
                    Map my Founder Stack
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <p className="text-[11px] text-slate-400">
                  Or{' '}
                  <Link
                    href="/newsletter"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-page', target: 'newsletter' })
                    }
                    className="text-slate-300 underline-offset-4 hover:underline"
                  >
                    subscribe to the dispatch
                  </Link>{' '}
                  for build notes and launch dates.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Early Access Modals */}
      <AnimatePresence>
        {products
          .filter((p) => p.status === 'early-access' && p.id === openModal)
          .map((product) => (
            <EarlyAccessModal
              key={product.id}
              product={product}
              isOpen={openModal === product.id}
              onClose={() => setOpenModal(null)}
            />
          ))}
      </AnimatePresence>
    </>
  )
}
