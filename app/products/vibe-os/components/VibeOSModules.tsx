'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Library, Workflow, Heart, Sliders, ArrowRight } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import type { ProductModule, ProductOffer } from '@/types/products'

const COMING_SOON_MODE = true

interface VibeOSModulesProps {
  productId: string
  modules: ProductModule[]
  offer: ProductOffer
}

const moduleIcons = [Library, Workflow, Heart, Sliders]

export default function VibeOSModules({ productId, modules, offer }: VibeOSModulesProps) {
  const handleCTAClick = () => {
    trackEvent('product_cta_click', {
      productId,
      location: 'modules',
      target: COMING_SOON_MODE ? 'waitlist' : 'primary',
      href: COMING_SOON_MODE ? '/newsletter' : offer.ctaPrimaryHref,
      label: COMING_SOON_MODE ? 'join-waitlist' : offer.ctaPrimaryTracking
    })
  }

  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Modules */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="glow-badge glow-badge-cyan mb-4 inline-flex">
                What&apos;s Inside
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Everything You Need to{' '}
                <span className="text-gradient-tech">Ship Music</span>
              </h2>
              <p className="mt-4 text-white/60">
                A complete system, not just a prompt pack. Every module builds on the last.
              </p>
            </motion.div>

            <div className="space-y-4">
              {modules.map((module, index) => {
                const Icon = moduleIcons[index % moduleIcons.length]

                return (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group spotlight-card p-6 transition-all hover:border-white/15"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3 ring-1 ring-cyan-500/30">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                          {module.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              {/* Card Glow */}
              <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-cyan-500/20 via-transparent to-violet-500/20 blur-sm" />

              {/* Main Card */}
              <div className="relative rounded-[2rem] border border-white/10 bg-space/80 p-8 backdrop-blur-xl">
                {COMING_SOON_MODE ? (
                  <>
                    {/* Coming Soon Mode */}
                    <div className="mb-6 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
                        <Sparkles className="h-4 w-4" />
                        Coming Soon
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">
                        Join the Waitlist
                      </h3>
                      <p className="mt-3 text-sm text-white/60">
                        Be the first to know when Vibe OS launches. Get early access, exclusive discounts, and behind-the-scenes updates.
                      </p>
                    </div>

                    <Link
                      href="/newsletter"
                      onClick={handleCTAClick}
                      className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_20px_60px_rgba(6,182,212,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(6,182,212,0.45)]"
                    >
                      <Mail className="h-5 w-5" />
                      Join Waitlist
                    </Link>

                    {/* Waitlist Benefits */}
                    <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-amber-300">
                        Waitlist Benefits
                      </div>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          Priority access when launched
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          Exclusive early-bird pricing
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          Insider development updates
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Normal Pricing Mode */}
                    <div className="mb-6 text-center">
                      <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                        One-time investment
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        {offer.originalPrice && (
                          <span className="text-2xl text-white/50 line-through">
                            ${offer.originalPrice}
                          </span>
                        )}
                        <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-5xl font-bold text-transparent">
                          ${offer.primaryPrice}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-white/50">
                        {offer.note || 'Lifetime updates included'}
                      </p>
                    </div>

                    <Link
                      href={offer.ctaPrimaryHref}
                      onClick={handleCTAClick}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_20px_60px_rgba(6,182,212,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(6,182,212,0.45)]"
                    >
                      {offer.ctaPrimary}
                    </Link>

                    {/* Guarantee */}
                    <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
                        {offer.guarantee.label}
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {offer.guarantee.description}
                      </p>
                    </div>
                  </>
                )}

                {/* Trust Indicators */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/55">
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Instant Access
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lifetime Updates
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
