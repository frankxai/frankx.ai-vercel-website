'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { homepageContent } from '@/data/homepage'
import { trackEvent } from '@/lib/analytics'

export function CTASection() {
  const { cta } = homepageContent

  return (
    <section className="py-16 md:py-24 lg:py-32 border-t border-white/[0.03] overflow-hidden relative">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {cta.headline}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/50 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            {cta.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link
              href={cta.primaryCTA.href}
              onClick={() => trackEvent('cta_click', {
                location: 'footer',
                type: cta.primaryCTA.tracking
              })}
              className="group inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/95 hover:shadow-[0_0_80px_rgba(255,255,255,0.25)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 active:scale-[0.98] min-h-[48px]"
            >
              {cta.primaryCTA.text}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={cta.secondaryCTA.href}
              onClick={() => trackEvent('cta_click', {
                location: 'footer',
                type: cta.secondaryCTA.tracking
              })}
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-base font-medium text-white/60 hover:text-white border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 active:scale-[0.98] min-h-[48px]"
            >
              {cta.secondaryCTA.text}
            </Link>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-12 text-sm text-white/40"
          >
            {homepageContent.social.links.map((link, index) => (
              <span key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {link.platform}
                </a>
                {index < homepageContent.social.links.length - 1 && (
                  <span className="mx-2">·</span>
                )}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
