'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Waves } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import type { ProductRecord } from '@/types/products'

const CONCEPT_NOTES_HREF = '/products/vibe-os/docs'

interface VibeOSHeroProps {
  productId: string
  product: ProductRecord
}

export default function VibeOSHero({ productId, product }: VibeOSHeroProps) {
  const handleCTAClick = () => {
    trackEvent('product_cta_click', {
      productId,
      location: 'hero',
      target: 'concept-notes',
      href: CONCEPT_NOTES_HREF,
      label: 'read-vibe-os-concept-notes'
    })
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Animated Waveform Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ d: "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{
                d: [
                  "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,181.3C96,203,192,245,288,250.7C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,256C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              fill="url(#waveGradient)"
            />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-sm">
            <Waves className="h-4 w-4" />
            Concept preview · app in development
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Vibe OS
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/80 sm:text-xl md:text-2xl">
            {product.headline}
          </p>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg"
        >
          {product.subheadline}
        </motion.p>

        {/* Promise Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            {product.promise}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href={CONCEPT_NOTES_HREF}
            onClick={handleCTAClick}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_rgba(6,182,212,0.4)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(6,182,212,0.5)]"
          >
            <BookOpen className="h-5 w-5" />
            Read the concept notes
          </Link>
        </motion.div>

        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 max-w-2xl text-sm leading-relaxed text-white/50"
        >
          The concept notes include a manual experiment you can run with your own private note or spreadsheet. The web app and workspace template are not available.
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
