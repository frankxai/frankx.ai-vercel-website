'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Music2, Building2, Users, Server } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { homepageContent } from '@/data/homepage'

const iconMap = {
  music: Music2,
  building: Building2,
  users: Users,
  server: Server,
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const { hero } = homepageContent

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background gradient - subtle, premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center text-center lg:text-left"
        >
          <div>
            {/* Eyebrow */}
            <motion.div
              className="mb-6 md:mb-8"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/70 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {hero.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mb-6 md:mb-8"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white max-w-5xl mx-auto lg:mx-0">
                {hero.headline}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto lg:mx-0 mb-10 md:mb-12 leading-relaxed"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-12 md:mb-14"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <Link
                href={hero.primaryCTA.href}
                onClick={() => trackEvent('cta_click', { location: 'hero', type: hero.primaryCTA.tracking })}
                className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-white/95 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 active:scale-[0.98] min-h-[48px]"
              >
                {hero.primaryCTA.text}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={hero.secondaryCTA.href}
                onClick={() => trackEvent('cta_click', { location: 'hero', type: hero.secondaryCTA.tracking })}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-base text-white/70 hover:text-white border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 active:scale-[0.98] min-h-[48px]"
              >
                {hero.secondaryCTA.text}
              </Link>
            </motion.div>

            {/* Trust Indicators (mobile) */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 text-sm text-white/40 lg:hidden"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              {hero.trustIndicators.map((indicator, index) => {
                const Icon = iconMap[indicator.icon as keyof typeof iconMap]
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400/60" />
                    <span>
                      {indicator.value && <span className="font-semibold text-white/60">{indicator.value}</span>}
                      {indicator.value && ' '}
                      {indicator.text}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Signal Card (desktop) */}
          <motion.div
            className="hidden lg:block"
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent opacity-80" />
              <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-[80px]" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">
                  Signal Stack
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {hero.trustIndicators.map((indicator, index) => {
                    const Icon = iconMap[indicator.icon as keyof typeof iconMap]
                    return (
                      <div key={index} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                          <Icon className="w-4 h-4 text-emerald-400/70" />
                          {indicator.text}
                        </div>
                        {indicator.value && (
                          <div className="mt-3 text-2xl font-bold text-white">
                            {indicator.value}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/60">
                  Building weekly in public. Systems, music, and creator ops that compound.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/15 flex justify-center pt-2 backdrop-blur-sm bg-white/[0.02]"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-2 bg-gradient-to-b from-emerald-400/60 to-transparent rounded-full"
            animate={shouldReduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
