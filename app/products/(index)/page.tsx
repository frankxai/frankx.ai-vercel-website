'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Building2,
  Cpu,
  CheckCircle2,
  Package,
  Shield,
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
    icon: Sparkles,
    name: 'Vibe OS creative-state workspace',
    tagline: 'Concept notes',
    description:
      'An unreleased workspace concept for observing creative state, energy, and focus.',
    status: 'concept',
    statusLabel: 'Concept',
    ctaLabel: 'View concept',
    href: '/products/vibe-os',
    color: 'cyan',
    highlights: [
      'Read the current concept and its limits',
      'Try the manual note or spreadsheet experiment',
      'No app, template, or download is available',
    ],
  },
  {
    id: 'creators-soulbook',
    icon: BookOpen,
    name: 'The Creator\'s Soulbook',
    tagline: 'Life Architecture OS',
    description:
      'Explore a seven-pillar reflection framework and its current public pages.',
    status: 'early-access',
    href: '/soulbook',
    color: 'amber',
    highlights: [
      'Seven-pillar framework overview',
      'Three reflection lenses described',
      'Explore the current Soulbook page',
    ],
  },
  {
    id: 'suno-prompts-bundle',
    icon: Sparkles,
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-Specific Music Generation',
    description:
      'An early product outline for genre-specific Suno prompt collections.',
    status: 'early-access',
    href: '/products/suno-prompt-library',
    color: 'cyan',
    highlights: [
      'Five genre categories in the proposed scope',
      'Emotion and tempo mapping under review',
      'Production guidance proposed for the collection',
    ],
  },
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    description:
      'An early product outline for prompts, workflow examples, and implementation notes.',
    status: 'early-access',
    href: '/newsletter?ref=creative-ai-toolkit-early-access',
    color: 'emerald',
    highlights: [
      'Prompt categories proposed for creative and operational work',
      'Workflow examples remain in development',
      'Implementation notes remain in development',
    ],
  },
  {
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    description:
      'An early outline for story frameworks, editorial planning, and prompt examples.',
    status: 'early-access',
    href: '/newsletter?ref=creation-chronicles-early-access',
    color: 'cyan',
    highlights: [
      'Story architecture proposed for the scope',
      'Content workflow examples remain in development',
      'Distribution notes remain in development',
    ],
  },
  {
    id: 'generative-creator-os',
    icon: Cpu,
    name: 'Generative Creator OS',
    tagline: 'Multi-modal AI Studio',
    description:
      'An early outline for multimodal prompts, studio practices, and guardrails.',
    status: 'early-access',
    href: '/newsletter?ref=generative-creator-os-early-access',
    color: 'emerald',
    highlights: [
      'Multimodal workflow concepts',
      'Brand and review guidance under consideration',
      'Team practices remain in development',
    ],
  },
  {
    id: 'agentic-creator-os',
    icon: Building2,
    name: 'Agentic Creator OS',
    tagline: 'Developer AI Mastery',
    description:
      'An early outline for coding-agent practices and governance notes.',
    status: 'early-access',
    href: '/newsletter?ref=agentic-creator-os-early-access',
    color: 'cyan',
    highlights: [
      'Coding-agent practices proposed for the scope',
      'Workflow patterns remain in development',
      'Release and governance notes remain in development',
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
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-void/90 via-void/80 to-space/70 p-8 backdrop-blur-xl"
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
            Enter your email to record interest in this product.
          </p>

          <EmailSignup
            compact
            buttonText="Record interest"
            listType="product-interest"
            intent={product.id}
            intentLabel={product.name}
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
      <main className="relative min-h-screen">
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
              <Image src="/images/mascot/mascot-v17-negative-space-mark.png" alt="Axi" width={48} height={48} className="rounded-xl" sizes="48px" style={{ boxShadow: '0 0 20px -6px rgba(16,185,129,0.3)' }} />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
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
              Explore the product studio.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                See what you can inspect today.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Concept notes and early product outlines for creative work, music, and AI systems.
              Each card links to its current page.
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
                const isConcept = product.status === 'concept'

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <GlowCard color={product.color as GlowColor} className={`p-8 h-full flex flex-col ${isConcept ? 'cursor-pointer hover:-translate-y-1' : ''}`}>
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
                            {isConcept ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium">
                                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                                {'statusLabel' in product ? product.statusLabel : 'Concept'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
                                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                                Early access
                              </span>
                            )}
                          </div>
                          {isConcept ? (
                            <Link
                              href={product.href}
                              onClick={() =>
                                trackEvent('product_card_click', { productId: product.id })
                              }
                              className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
                            >
                              <span className="text-sm font-medium">{'ctaLabel' in product ? product.ctaLabel : 'Explore'}</span>
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
                  q: "What is on this page?",
                  a: "Each card states its current status. Concept and early-access entries describe scope; linked pages show what can be inspected now.",
                },
                {
                  q: "Do I need technical experience?",
                  a: "Open a product page to review its current scope and any stated requirements.",
                },
                {
                  q: "Which products are available now?",
                  a: "The Vibe OS workspace is a concept. The other cards are early product outlines; open a card to see its current page.",
                },
                {
                  q: "What do I get by joining Early Access?",
                  a: "The form records your email address and the product you selected.",
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
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col items-center gap-8 text-center">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-6">
                    <CheckCircle2 className="w-4 h-4" />
                    Concept notes
                  </span>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
                    Review the workspace concept
                  </h2>
                  <p className="text-slate-400">
                    Read the Vibe OS workspace concept, including its limits and a manual experiment.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Link
                    href="/products/vibe-os"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-page', target: 'vibe-os' })
                    }
                    className="group flex-1 flex items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 font-medium text-cyan-100 transition-[color,background-color,border-color,transform] hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-cyan-500/15"
                  >
                    View the concept
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
