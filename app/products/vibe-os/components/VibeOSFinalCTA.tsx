'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

const GUIDE_HREF = '/products/Vibe-OS-Guide.pdf'

export default function VibeOSFinalCTA({ productId }: { productId: string }) {
  const handleClick = () => {
    trackEvent('product_cta_click', {
      productId,
      location: 'final',
      target: 'guide',
      href: GUIDE_HREF,
      label: 'read-vibe-os-guide',
    })
  }

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(6,182,212,0.15),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-200"
        >
          <BookOpen className="h-4 w-4" />
          Guide available
        </motion.div>

        <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Test the method with the{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            Vibe OS guide
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          The PDF is available now without signup. Use it to run a manual creative-state review. The web app and Notion template are not available.
        </p>

        <Link
          href={GUIDE_HREF}
          onClick={handleClick}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_20px_70px_rgba(6,182,212,0.45)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(6,182,212,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Read the free guide
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
