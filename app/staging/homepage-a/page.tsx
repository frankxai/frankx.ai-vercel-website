'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Play,
  Sparkles,
  Music2,
  BookOpen,
  Code2,
  Users,
  Zap,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'

// ============================================================================
// SPLIT TEST A: Geist Typography + Golden Age Authority Positioning
// ============================================================================
// Key changes:
// - Geist-inspired clean typography (using Inter as proxy until Geist installed)
// - "Golden Age of Intelligence" as primary framing
// - Confident authority tone (not humble workshop)
// - Playfair reserved for ONE main quote only
// ============================================================================

// Rotating concepts - Golden Age focused
const heroConcepts = [
  'golden age',
  'intelligence systems',
  'creative empire',
  'agent teams',
  'music mastery',
  'abundance mindset',
]

function RotatingConcept() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroConcepts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative min-w-[200px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400"
        >
          {heroConcepts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function HeroSectionA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/80 mb-8"
          >
            Welcome to the Golden Age
          </motion.p>

          {/* Main headline - Authority positioning */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            Build your{' '}
            <span className="block mt-2">
              <RotatingConcept />
            </span>
          </h1>

          {/* Subheadline - Confident, specific */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI Architect at Oracle. Creator of 10,000+ songs.
            I build <span className="text-white">intelligence systems</span> for creators
            and document everything so you can build your own.
          </motion.p>

          {/* CTAs - Clear hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-base transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Enter the Golden Age
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/music-lab"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              <Play className="w-4 h-4" />
              Hear the Music
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row - Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '10K+', label: 'Songs Created' },
            { value: '5', label: 'Intelligence Systems' },
            { value: '1000+', label: 'Creators Served' },
            { value: '100%', label: 'Open & Documented' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Philosophy quote - Only place using Playfair-style italic
function PhilosophySection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* This is the ONLY italic serif text - for maximum impact */}
          <p
            className="text-3xl md:text-4xl lg:text-5xl text-white/80 leading-relaxed"
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontStyle: 'italic',
              letterSpacing: '0.01em',
            }}
          >
            "We're living in the abundance stage of intelligence.
            AI isn't taking our creativity — it's amplifying it."
          </p>
          <footer className="mt-8 text-sm text-white/40 uppercase tracking-wider">
            — The Golden Age Thesis
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}

// Intelligence Systems section
const systems = [
  {
    icon: Music2,
    name: 'Vibe OS',
    audience: 'Music Creators',
    description: 'Suno mastery system with 50+ genre prompts and emotion mapping',
    price: 'Free',
    color: 'emerald',
    href: '/products/vibe-os',
  },
  {
    icon: BookOpen,
    name: 'Creation Chronicles',
    audience: 'Content Creators',
    description: 'Strategic storytelling with editorial frameworks',
    price: '€7',
    color: 'cyan',
    href: '/products/creation-chronicles',
  },
  {
    icon: Sparkles,
    name: 'Generative Creator OS',
    audience: 'Multi-modal Creators',
    description: 'Full AI studio with brand intelligence and pipelines',
    price: '€97',
    color: 'violet',
    href: '/products/generative-creator-os',
  },
  {
    icon: Code2,
    name: 'Agentic Creator OS',
    audience: 'Developers & Builders',
    description: 'Claude Code mastery, MCP servers, agent architectures',
    price: '€197',
    color: 'amber',
    href: '/products/agentic-creator-os',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
}

function IntelligenceSystemsSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-4">
            Intelligence Systems
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Systems I use. Packaged for you.
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            The exact frameworks powering my work — from music creation to agent development.
            Choose your path based on where you are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((system, i) => {
            const colors = colorClasses[system.color]
            return (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={system.href} className="group block h-full">
                  <div className={`h-full p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <system.icon className={`w-6 h-6 ${colors.text}`} />
                      <span className="text-lg font-bold text-white">{system.price}</span>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                      {system.audience}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2">{system.name}</h3>
                    <p className="text-sm text-white/50 mb-4">{system.description}</p>
                    <div className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// About section - Family warmth
function AboutSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-6">
            The Journey
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            Music, technology, family, and the endless exploration of how things work.
          </h2>

          <div className="space-y-6 text-lg text-white/60 leading-relaxed">
            <p>
              By day, I architect AI systems at Oracle. By night, I make music — thousands of songs
              exploring what's possible when humans and AI create together.
            </p>
            <p className="text-white/70">
              I'm a husband, a father building this hub partly so my kids will one day see how their dad
              thought, created, and navigated this wild moment in history.
            </p>
            <p className="text-white/50">
              This site is my workshop, my family archive, and an open invitation.
              Take what serves you. Build your own golden age.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors"
            >
              Read the full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 text-white/40">
              <a href="https://linkedin.com/in/frank-x-riemer/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <span>·</span>
              <a href="https://github.com/frankxai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <span>·</span>
              <a href="https://suno.com/@frankx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Suno</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Final CTA
function FinalCTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your golden age starts now.
          </h2>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
            Whether you're learning AI, creating music, or building systems —
            there's a path here for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Pick Your Path
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              Browse All Systems
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main page
export default function HomepageSplitA() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Staging indicator */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/staging"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Split A: Authority + Geist
        </Link>
      </div>

      <HeroSectionA />
      <PhilosophySection />
      <IntelligenceSystemsSection />
      <AboutSection />
      <FinalCTA />
    </main>
  )
}
