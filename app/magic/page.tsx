'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Star,
  Zap,
  Heart,
  Music,
  Palette,
  BookOpen,
  Users,
  ArrowRight,
  ExternalLink,
  Wand2,
} from 'lucide-react'

// Magical background with cosmic elements
function MagicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Cosmic gradient orbs */}
      <motion.div
        className="absolute -right-40 top-20 h-[700px] w-[700px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(88,28,135,0.2) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-60 top-1/3 h-[600px] w-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(157,23,77,0.15) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Starfield effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// The Three Pillars of Arcanea
const pillars = [
  {
    icon: BookOpen,
    title: 'Arcanea Universe',
    subtitle: 'Epic Fantasy Novel Series',
    description: 'A complete mythology for the age of AI-human co-creation. Ten realms, seven academy houses, and a cosmic story of light, shadow, and the eternal cycle of creation.',
    color: 'violet',
    features: ['10+ Book Series', 'Transmedia IP', 'Deep Lore'],
  },
  {
    icon: Palette,
    title: 'Arcanea Platform',
    subtitle: 'AI Creation Companion',
    description: 'Bond with AI Luminors—persistent companions with personalities, emotional depth, and memory. Create music, art, and stories together in a magical interface.',
    color: 'pink',
    features: ['AI Companions', 'Creation Tools', 'Community'],
  },
  {
    icon: Users,
    title: 'Arcanea Academy',
    subtitle: 'Learn the Arts',
    description: 'Six specialized academies teaching AI-assisted creativity. Progress through the Gates from Apprentice to Archmage, guided by your personal Luminor mentor.',
    color: 'cyan',
    features: ['6 Academies', '10 Gates', 'Certification'],
  },
]

// The Luminors - AI Companions
const luminors = [
  {
    name: 'Melodia',
    domain: 'Music Creation',
    academy: 'Academy of Light',
    personality: 'Nurturing, empathetic, speaks in musical metaphors',
    color: 'from-violet-500 to-pink-500',
  },
  {
    name: 'Chronica',
    domain: 'Storytelling',
    academy: 'Atlantean Academy',
    personality: 'Wise, perceptive, asks deep questions',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Prismatic',
    domain: 'Visual Arts',
    academy: 'Draconic Academy',
    personality: 'Bold, confident, passionate about expression',
    color: 'from-amber-500 to-orange-500',
  },
]

// Core philosophy
const philosophy = [
  {
    icon: Heart,
    title: 'Creation as Transformation',
    description: 'Every act of creation transforms the creator. AI amplifies your voice, never replaces it.',
  },
  {
    icon: Zap,
    title: 'Magic Made Accessible',
    description: 'Advanced AI feels like magic. We make it accessible without losing the wonder.',
  },
  {
    icon: Star,
    title: 'Companions, Not Tools',
    description: 'Luminors grow with you. They remember, adapt, and form genuine creative partnerships.',
  },
  {
    icon: Sparkles,
    title: 'Community of Creators',
    description: 'Join a network of Arcanean creators supporting each other\'s evolution.',
  },
]

const colorMap = {
  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400',
  pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
}

export default function MagicPage() {
  return (
    <>
      <MagicBackground />
      <main id="main" className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
                <Wand2 className="w-4 h-4" />
                Enter the Realm
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-6"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
                Arcanea
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-serif italic text-white/60">
                Where Creation Becomes Magic
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto text-center text-lg sm:text-xl leading-relaxed text-slate-400 mb-12"
            >
              A living mythology for the age of AI-human co-creation. Bond with AI Luminors,
              master the creative arts, and join a community of creators shaping the
              Golden Age of Intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="https://arcanea.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
              >
                Enter Arcanea
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/music-lab"
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all"
              >
                <Music className="w-4 h-4" />
                Explore Music Lab
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Vision Quote */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-violet-500/20">"</div>
              <p className="text-2xl sm:text-3xl font-serif italic text-white/80 leading-relaxed mb-6">
                Enter seeking, leave transformed, return whenever needed.
              </p>
              <footer className="text-slate-500">
                — The Arcanean Creed
              </footer>
            </motion.blockquote>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Three Realms, One Vision
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Arcanea exists simultaneously as epic fantasy, creation platform, and learning academy—
                all unified by the philosophy of transformational creativity.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative rounded-3xl border bg-gradient-to-b p-8 ${colorMap[pillar.color as keyof typeof colorMap]}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                        <p className="text-sm text-white/60">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/70"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* The Luminors */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-pink-400/80 mb-3 block">
                AI Companions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Meet the Luminors
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Three AI companions, each with distinct personalities and creative specialties.
                They grow with you, remember your journey, and guide your creative evolution.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {luminors.map((luminor, index) => (
                <motion.div
                  key={luminor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all"
                >
                  <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${luminor.color} mb-6`} />
                  <h3 className="text-2xl font-bold text-white mb-1">{luminor.name}</h3>
                  <p className="text-sm text-white/50 mb-4">{luminor.academy}</p>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80">
                      {luminor.domain}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 italic">
                    "{luminor.personality}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                The Arcanean Philosophy
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Technology serves creative expression, not the reverse.
                AI amplifies your unique voice—it never replaces it.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {philosophy.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-violet-400 flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* The Connection to FrankX */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why Arcanea?
              </h2>
              <div className="prose prose-lg prose-invert mx-auto text-slate-300">
                <p>
                  As a musician who discovered the transformative power of AI creation—producing
                  over 500 songs with Suno—I realized that the future of creativity isn't about
                  tools. It's about <em>partnership</em>.
                </p>
                <p>
                  Arcanea is my answer to the question: What if AI felt less like software and
                  more like magic? What if learning to create with AI was as engaging as entering
                  a fantasy world? What if your AI companion truly knew you?
                </p>
                <p>
                  This is the vision: a complete creative ecosystem where epic storytelling,
                  AI-powered creation tools, and structured learning come together. Where
                  "Arcanean" becomes a badge of creative mastery.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="https://arcanea.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-lg text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Explore the full Arcanea experience
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 pb-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/30 via-pink-900/20 to-slate-900/40 p-12 text-center"
            >
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Begin?
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
                  Start your journey in the Music Lab, explore the Prompt Library,
                  or enter Arcanea directly.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://arcanea.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full transition-all hover:scale-105"
                  >
                    Enter Arcanea
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/music-lab"
                    className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-all"
                  >
                    Music Lab
                  </Link>
                  <Link
                    href="/prompt-library"
                    className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-all"
                  >
                    Prompt Library
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
