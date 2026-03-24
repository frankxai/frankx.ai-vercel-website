'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Music, BookOpen, Sparkles, Code2, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

import {
  heroCta,
  heroHighlights,
  heroStats,
  quickActions,
  homeSpotlights,
  testimonials,
} from '@/lib/hub'
import { trackEvent } from '@/lib/analytics'

// Smooth scroll progress indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Animated gradient orbs for background
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Hero section with massive typography
function Hero() {
  const { primary, secondary, tertiary } = heroCta
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientOrbs />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-32"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Main headline - massive, confident */}
          <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[1.1] tracking-tight mb-8">
            <span className="block text-white">My System for</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Building with AI
            </span>
          </h1>

          {/* Subtitle - personal, direct */}
          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I create music, learn new skills, and build my life with AI.
            <br className="hidden md:block" />
            This is the system. Take what works for you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href={primary.href}
              onClick={() => trackEvent('hero_primary_click', { destination: primary.href })}
              className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              {primary.label}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={secondary.href}
              onClick={() => trackEvent('hero_secondary_click', { destination: secondary.href })}
              className="group inline-flex items-center gap-3 text-white/80 hover:text-white px-8 py-4 rounded-full text-lg font-medium border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
            >
              <Music className="w-5 h-5" />
              {secondary.label}
            </Link>
          </motion.div>

          {/* Tertiary link */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href={tertiary.href}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              {tertiary.label} →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Stats section - minimal, impactful
function Stats() {
  return (
    <section className="py-24 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2">
                {stat.label}
              </div>
              <div className="text-white/60 text-sm max-w-xs mx-auto">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// What's here section - clean grid
function WhatsHere() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's here
          </h2>
          <p className="text-xl text-white/50 max-w-xl">
            Systems I've built, resources I've curated. Everything open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={action.href}
                className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    <action.icon className="w-5 h-5 text-white/70" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                  {action.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured spotlights - large cards
function Spotlights() {
  return (
    <section className="py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {homeSpotlights.map((spotlight, i) => (
            <motion.div
              key={spotlight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={spotlight.href}
                className="group block p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all h-full"
              >
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-cyan-400/80 mb-4">
                  {spotlight.eyebrow}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {spotlight.title}
                </h3>
                <p className="text-white/50 mb-6 text-lg">
                  {spotlight.description}
                </p>
                <span className="inline-flex items-center gap-2 text-white/70 group-hover:text-white font-medium transition-colors">
                  {spotlight.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Curated resources highlight
function CuratedResources() {
  const resources = [
    { name: 'Google AI Essentials', source: 'Coursera', href: 'https://www.coursera.org/learn/google-ai-essentials', type: 'Course' },
    { name: 'Oracle AI Foundations', source: 'Oracle', href: 'https://education.oracle.com/oracle-ai-foundations/pexam_1Z0-1122-1', type: 'Certification' },
    { name: 'Machine Learning Crash Course', source: 'Google', href: 'https://developers.google.com/machine-learning/crash-course', type: 'Course' },
    { name: 'Intro to Deep Learning', source: 'MIT', href: 'http://introtodeeplearning.com/', type: 'Course' },
  ]

  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resources I recommend
          </h2>
          <p className="text-xl text-white/50 max-w-xl">
            Free courses from places that know what they're doing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, i) => (
            <motion.a
              key={resource.name}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/30 mb-1">
                  {resource.type} • {resource.source}
                </div>
                <div className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                  {resource.name}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            See all resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Testimonials - minimal
function Testimonials() {
  return (
    <section className="py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          {testimonials.map((testimonial, i) => (
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <footer className="text-white/40">
                <span className="text-white/60">{testimonial.name}</span>
                <span className="mx-2">·</span>
                <span>{testimonial.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final section - simple
function FinalSection() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start exploring
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-lg mx-auto">
            Pick what interests you. Everything is documented, everything is open.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
            >
              Explore the System
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white px-8 py-4 text-lg transition-colors"
            >
              About Frank
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main page component
export default function HomePage2025() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <ScrollProgress />
      <Hero />
      <Stats />
      <WhatsHere />
      <Spotlights />
      <CuratedResources />
      <Testimonials />
      <FinalSection />
    </main>
  )
}
