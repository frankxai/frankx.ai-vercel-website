'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

// Premium background
function ProductsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#02030b]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -right-60 top-40 h-[600px] w-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.28) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// Product data - structured for premium display
const products = [
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    description:
      'A digital kit with prompts, templates, and rollout rituals for consistent output.',
    status: 'coming-soon',
    href: '/products/creative-ai-toolkit',
    color: 'violet',
    highlights: [
      '100+ validated prompts across storytelling, marketing, and operations',
      '12 ready-to-deploy workflow automations',
      '30/60/90 day implementation roadmaps',
    ],
  },
  {
    id: 'vibe-os',
    icon: Music,
    name: 'Vibe OS',
    tagline: 'Suno Music Mastery',
    description:
      'Prompt packs, emotion mapping, and production checklists for Suno creators.',
    status: 'coming-soon',
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
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    description:
      'Story frameworks, editorial calendars, and prompt stacks to build authority.',
    status: 'coming-soon',
    href: '/products/creation-chronicles',
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
    status: 'coming-soon',
    href: '/products/generative-creator-os',
    color: 'amber',
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
    status: 'coming-soon',
    href: '/products/agentic-creator-os',
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
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-300',
    accent: 'text-cyan-300',
    button: 'bg-cyan-600 hover:bg-cyan-500',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-300',
    accent: 'text-emerald-300',
    button: 'bg-emerald-600 hover:bg-emerald-500',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-300',
    accent: 'text-cyan-300',
    button: 'bg-cyan-600 hover:bg-cyan-500',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  amber: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'bg-blue-500/20 text-blue-300',
    accent: 'text-blue-300',
    button: 'bg-blue-600 hover:bg-blue-500',
    glow: 'group-hover:shadow-blue-500/20',
  },
  rose: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20 hover:border-teal-500/40',
    icon: 'bg-teal-500/20 text-teal-300',
    accent: 'text-teal-300',
    button: 'bg-teal-600 hover:bg-teal-500',
    glow: 'group-hover:shadow-teal-500/20',
  },
}

export default function ProductsPage() {
  return (
    <>
      <ProductsBackground />
      <main id="main" className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-3"
            >
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

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={product.featured ? 'md:col-span-2 lg:col-span-1' : ''}
                  >
                    <Link
                      href={product.href}
                      onClick={() =>
                        trackEvent('product_card_click', { productId: product.id })
                      }
                      className="group block h-full"
                    >
                      <div
                        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl ${colors.glow}`}
                      >
                        {/* Featured badge */}
                        {product.featured && (
                          <div className="absolute right-6 top-6">
                            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
                              Most Popular
                            </span>
                          </div>
                        )}

                        {/* Icon */}
                        <div
                          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colors.icon}`}
                        >
                          <Icon className="h-7 w-7" />
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
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
                              <Sparkles className="w-3.5 h-3.5" />
                              Coming Soon
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 transition-colors group-hover:text-white">
                            <span className="text-sm font-medium">Join Waitlist</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
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
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
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
                  a: "The Creative AI Toolkit and Vibe OS are designed for beginners. Generative Creator OS and Agentic Creator OS are for intermediate users who want to go deeper.",
                },
                {
                  q: "When will these products launch?",
                  a: "Products are launching throughout 2026. Join the waitlist to get early access, exclusive launch discounts, and behind-the-scenes updates as each product is finalized.",
                },
                {
                  q: "What do I get by joining the waitlist?",
                  a: "Waitlist members get priority access when products launch, exclusive early-bird pricing, and behind-the-scenes content showing how each system is built.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA - Waitlist */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-10 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col items-center gap-8 text-center">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Launching Soon
                  </span>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
                    Be the first to know when products launch
                  </h2>
                  <p className="text-slate-400">
                    Join the waitlist for early access, exclusive discounts, and behind-the-scenes updates
                    on each product as they're developed.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Link
                    href="/newsletter"
                    onClick={() =>
                      trackEvent('product_waitlist_cta', { location: 'products-page' })
                    }
                    className="group flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
                  >
                    Join the Waitlist
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
