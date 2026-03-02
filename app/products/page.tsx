'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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

// Product characters removed — mascot-first strategy (Feb 21)

// Premium background
function ProductsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />

      {/* Static gradient orbs — no animation, ambient depth only */}
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
          background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)',
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
    icon: Music,
    name: 'Vibe OS',
    tagline: 'Suno Music Mastery',
    description:
      'Prompt packs, emotion mapping, and production checklists for Suno creators.',
    status: 'active',
    href: '/products/vibe-os',
    color: 'emerald',
    highlights: [
      '50+ genre-specific prompts (electronic, hip-hop, ambient, cinematic)',
      'Emotion-to-sound mapping system',
      'Production enhancement and mastering guide',
    ],
    featured: true,
  },
  {
    id: 'creators-soulbook',
    icon: BookOpen,
    name: 'The Creator\'s Soulbook',
    tagline: 'Life Architecture OS',
    description:
      'Life operating system with 7 pillars, frameworks, and AI coaching prompts. Complete Obsidian vault included.',
    status: 'active',
    href: '/soulbook',
    color: 'cyan',
    highlights: [
      '7 Life Pillars framework with reflection exercises',
      '3 transformational perspectives (Life Symphony, Golden Path, 7 Pillars)',
      '25+ AI coaching prompts + ready-to-use Obsidian vault',
    ],
  },
  {
    id: 'suno-prompts-bundle',
    icon: Sparkles,
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-Specific Music Generation',
    description:
      'Five curated prompt bundles for specific genres: electronic, hip-hop, ambient, cinematic, and lo-fi.',
    status: 'active',
    href: '/products/suno-prompts',
    color: 'violet',
    highlights: [
      '50+ battle-tested prompts across 5 genres',
      'Emotion and tempo mapping for each genre',
      'Production tips and remixing guides',
    ],
  },
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    description:
      'A digital kit with prompts, templates, and rollout rituals for consistent output.',
    status: 'early-access',
    href: '#',
    color: 'amber',
    highlights: [
      '100+ validated prompts across storytelling, marketing, and operations',
      '12 ready-to-deploy workflow automations',
      '30/60/90 day implementation roadmaps',
    ],
  },
  {
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    description:
      'Story frameworks, editorial calendars, and prompt stacks to build authority.',
    status: 'early-access',
    href: '#',
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
    tagline: 'Multi-modal AI Studio',
    description:
      'Multi-modal templates, prompts, and guardrails for a reliable studio system.',
    status: 'early-access',
    href: '#',
    color: 'violet',
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
    tagline: 'Developer AI Mastery',
    description:
      'Agentic playbooks, prompt stacks, and governance checklists for builders.',
    status: 'early-access',
    href: '#',
    color: 'rose',
    highlights: [
      'Claude Code and Cursor mastery systems',
      'Agentic workflow and automation patterns',
      'Production-grade agent development',
    ],
  },
]

const colorMap = {
  violet: {
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08] hover:border-violet-500/30',
    icon: 'bg-violet-500/10 text-violet-400',
    accent: 'text-violet-400',
    button: 'bg-violet-600 hover:bg-violet-500',
    glow: 'group-hover:shadow-lg group-hover:shadow-violet-500/10',
  },
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
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/70 p-8 backdrop-blur-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg bg-white/5 p-2 hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Early Access
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-sm text-slate-400">{product.tagline}</p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            This product is in development. Join the early access list to get:
          </p>
          <ul className="space-y-2">
            {['Priority launch access', 'Exclusive early pricing', 'Behind-the-scenes updates'].map(
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
            buttonText="Join Early Access"
            listType="courses-waitlist"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProductsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <>
      <ProductsBackground />
      <main id="main" className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16">
          {/* Axi — mascot accent */}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-4"
            >
              <Image src="/images/mascot/mascot-v17-negative-space-mark.png" alt="Axi" width={48} height={48} className="rounded-xl" sizes="48px" style={{ boxShadow: '0 0 20px -6px rgba(139,92,246,0.3)' }} />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Digital Products
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Systems I use.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
                Packaged for you.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              The exact frameworks, prompts, and workflows I use in my own creative practice
              and enterprise work. No theory — just what actually works.
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={product.featured ? 'md:col-span-2 lg:col-span-1' : ''}
                  >
                    <GlowCard color={product.color as GlowColor} className={`p-8 h-full flex flex-col ${isActive ? 'cursor-pointer hover:-translate-y-1' : ''}`}>
                        {/* Featured badge */}
                        {product.featured && (
                          <div className="absolute right-6 top-6">
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                              Available Now
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
                          <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
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
                                Early Access
                              </span>
                            )}
                          </div>
                          {isActive ? (
                            <Link
                              href={product.href}
                              onClick={() =>
                                trackEvent('product_card_click', { productId: product.id })
                              }
                              className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                            >
                              <span className="text-sm font-medium">Explore</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                setOpenModal(product.id)
                                trackEvent('early_access_click', { productId: product.id })
                              }}
                              className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
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
                { icon: Sparkles, label: 'Early Access Benefits', color: 'text-amber-400' },
                { icon: Zap, label: 'Priority Launch Access', color: 'text-cyan-400' },
                { icon: Users, label: 'Exclusive Community', color: 'text-violet-400' },
                { icon: Star, label: 'Battle-Tested Systems', color: 'text-emerald-400' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                What You Get
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Real systems, not theory
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Battle-Tested Prompts',
                  description: 'Every prompt has been used in real projects. No theoretical examples—just what actually works in production.',
                  icon: Sparkles,
                  color: 'emerald',
                },
                {
                  title: 'Workflow Templates',
                  description: 'Complete workflows you can adapt. From ideation to publishing, every step is documented and replicable.',
                  icon: Zap,
                  color: 'cyan',
                },
                {
                  title: 'Continuous Updates',
                  description: 'AI tools evolve fast. Your purchase includes all future updates as I refine and expand these systems.',
                  icon: Star,
                  color: 'violet',
                },
              ].map((item, i) => {
                const colorClasses: Record<string, string> = {
                  emerald: 'bg-emerald-500/10 text-emerald-400',
                  cyan: 'bg-cyan-500/10 text-cyan-400',
                  violet: 'bg-violet-500/10 text-violet-400',
                }

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-3xl"
                  >
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[item.color]} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Common questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "How are these different from other AI courses?",
                  a: "These aren't courses—they're operating systems. You get the exact frameworks, prompts, and workflows I use daily in my own creative practice and enterprise work. No fluff, just what works.",
                },
                {
                  q: "Do I need technical experience?",
                  a: "Vibe OS and The Creator's Soulbook are designed for beginners. Creative AI Toolkit and Generative Creator OS are for intermediate users who want to go deeper.",
                },
                {
                  q: "Which products are available now?",
                  a: "Vibe OS, The Creator's Soulbook, and the Suno Prompt Bundles are available now. Other products are in Early Access—join the list to get priority launch access and exclusive pricing.",
                },
                {
                  q: "What do I get by joining Early Access?",
                  a: "Early Access members get priority launch notification, exclusive early-bird pricing, behind-the-scenes development updates, and direct input on product refinement.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                >
                  <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA - Early Access */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col items-center gap-8 text-center">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                    <CheckCircle2 className="w-4 h-4" />
                    Ready to Create
                  </span>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
                    Start building with our systems today
                  </h2>
                  <p className="text-slate-400">
                    Vibe OS, The Creator's Soulbook, and Suno Prompt Bundles are available now.
                    Join early access for upcoming launches with exclusive pricing.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Link
                    href="/products/vibe-os"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-page', target: 'vibe-os' })
                    }
                    className="group flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
                  >
                    Explore Vibe OS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/newsletter"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-page', target: 'newsletter' })
                    }
                    className="group flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-medium text-white hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    Newsletter
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

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
