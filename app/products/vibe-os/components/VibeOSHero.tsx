'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FlaskConical } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

interface VibeOSHeroProps {
  productId: string
}

export default function VibeOSHero({ productId }: VibeOSHeroProps) {
  const registerInterest = () => {
    trackEvent('product_cta_click', {
      productId,
      location: 'hero',
      target: 'waitlist',
      href: '#interest',
      label: 'register-interest',
    })
  }

  return (
    <section className="relative min-h-[82vh] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.25),transparent_65%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
            <FlaskConical className="h-4 w-4" />
            In development
          </div>
        </motion.div>

        <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Vibe OS
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 sm:text-xl md:text-2xl">
          A planned workspace for observing creative energy, focus, and working patterns.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          The web app and template are not available yet. Register your interest to shape the first useful release and receive a product-specific update when there is something real to try.
        </p>

        <div className="mt-12">
          <Link
            href="#interest"
            onClick={registerInterest}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Register interest
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-white/45">
          No download, account, or paid offer is available on this page.
        </p>
      </div>
    </section>
  )
}
