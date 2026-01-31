'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { ArrowRight, Play, Music2, Sparkles, Zap } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * V6: Cinematic
 *
 * Design philosophy: Full-bleed imagery, video backgrounds, parallax,
 * immersive storytelling, dramatic typography, Netflix/Apple-style.
 * Inspired by: Apple, Netflix, Stripe, Linear
 */

export default function HomePageCinematic() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Cinematic Hero - Full Screen with Video/Image */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { scale: heroScale }}
        >
          <Image
            src="/images/ai-art/generated-2026-01-21T10-05-42-484Z-c75nch.png"
            alt="Cinematic background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl"
          style={shouldReduceMotion ? undefined : { opacity: heroOpacity }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/60 mb-6">
              AI Architect · Music Creator · Builder
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-8 tracking-tight">
              <span className="block">The Future</span>
              <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Is Being Built
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              12,000+ songs. Enterprise AI systems. Everything documented.
              Welcome to the Golden Age of Intelligence.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/start"
                onClick={() => trackEvent('cinematic_hero_cta', { type: 'primary' })}
                className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
              >
                Begin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/music-lab"
                className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-full font-semibold text-lg hover:border-white hover:bg-white/10 transition-all"
              >
                <Play className="w-5 h-5" />
                Watch
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Full-width image sections */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section 1: Music */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center mb-32"
          >
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-violet-400 mb-4 block">
                01 — Music Lab
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                12,000 songs.
                <span className="block text-white/50">One daily practice.</span>
              </h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                Music as meditation. Every day, I create something new with Suno.
                Ambient, electronic, cinematic—exploring the edges of AI creativity.
              </p>
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-3 text-violet-400 hover:text-violet-300 font-medium text-lg transition-colors"
              >
                <Music2 className="w-5 h-5" />
                Enter the Music Lab
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/3d/music_3d.png"
                alt="Music visualization"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          {/* Section 2: Systems */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center mb-32"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/3d/rocket_3d.png"
                alt="AI Systems"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-4 block">
                02 — AI Architecture
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Enterprise AI.
                <span className="block text-white/50">Open to all.</span>
              </h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                By day, I architect AI systems at Oracle. By night, I document
                everything—so you can build with the same tools.
              </p>
              <Link
                href="/ai-architect"
                className="inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 font-medium text-lg transition-colors"
              >
                <Zap className="w-5 h-5" />
                Explore Architecture
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Section 3: Resources */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
                03 — Resources
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Learn by doing.
                <span className="block text-white/50">Not just watching.</span>
              </h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                Prompts, guides, and tools I actually use. No fluff.
                Just what works—curated from years of building.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-3 text-emerald-400 hover:text-emerald-300 font-medium text-lg transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Browse Resources
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/3d/brain_3d.png"
                alt="Learning resources"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Cinematic */}
      <section className="relative py-48 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/ai-art/generated-2026-01-21T10-05-26-229Z-jajczn.png"
            alt="Cinematic background"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              The future doesn't wait.
              <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Neither should you.
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
              Start creating. Start building. Start now.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-bold text-xl hover:bg-white/90 transition-colors"
            >
              Begin Your Journey
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
