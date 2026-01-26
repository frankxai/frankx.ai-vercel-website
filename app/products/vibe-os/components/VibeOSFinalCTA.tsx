'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Mail, ArrowRight, Zap } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import type { ProductOffer } from '@/types/products'

const COMING_SOON_MODE = true

interface VibeOSFinalCTAProps {
  productId: string
  offer: ProductOffer
}

export default function VibeOSFinalCTA({ productId, offer }: VibeOSFinalCTAProps) {
  const handleClick = () => {
    trackEvent('product_cta_click', {
      productId,
      location: 'final',
      target: COMING_SOON_MODE ? 'waitlist' : 'primary',
      href: COMING_SOON_MODE ? '/newsletter' : offer.ctaPrimaryHref,
      label: COMING_SOON_MODE ? 'join-waitlist' : offer.ctaPrimaryTracking
    })
  }

  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      {/* Aurora Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_35%)]" />
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {COMING_SOON_MODE ? (
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-5 py-2.5 text-sm font-medium text-amber-200">
              <Sparkles className="h-4 w-4" />
              Coming Soon
            </div>
          ) : (
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-200">
              <Zap className="h-4 w-4" />
              Limited Availability
            </div>
          )}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {COMING_SOON_MODE ? (
            <>
              Be First When{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Vibe OS
              </span>{' '}
              Launches
            </>
          ) : (
            <>
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Music Production
              </span>
              ?
            </>
          )}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
        >
          {COMING_SOON_MODE
            ? 'Join the waitlist for early access, exclusive launch pricing, and behind-the-scenes updates as we build the ultimate Suno workflow system.'
            : 'Join hundreds of creators who are shipping music consistently with Vibe OS. From emotional vision to finished track in one session.'
          }
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          {COMING_SOON_MODE ? (
            <Link
              href="/newsletter"
              onClick={handleClick}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_70px_rgba(6,182,212,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(6,182,212,0.55)]"
            >
              <Mail className="h-5 w-5" />
              Join the Waitlist
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href={offer.ctaPrimaryHref}
              onClick={handleClick}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_70px_rgba(6,182,212,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(6,182,212,0.55)]"
            >
              {offer.ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/55"
        >
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Lifetime Updates</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Instant Access</span>
          </div>
        </motion.div>

        {/* Creator Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          <div className="text-left">
            <div className="text-sm font-semibold text-white">Created by Frank</div>
            <div className="text-xs text-white/50">500+ AI songs produced</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
