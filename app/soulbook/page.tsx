'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Music, Compass, Building2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const lifeBooks = [
  {
    id: 'life-symphony',
    title: 'Life Symphony',
    subtitle: 'For Artists & Creators',
    description: 'Compose your extraordinary life through 7 Movements. Perfect for musicians, artists, and creative souls who think in rhythm, melody, and harmony.',
    icon: Music,
    href: '/soulbook/life-symphony',
    color: 'purple',
    movements: ['Rhythm', 'Melody', 'Harmony', 'Composition', 'Amplification', 'Ensemble', 'Masterwork'],
  },
  {
    id: 'golden-path',
    title: 'Golden Path',
    subtitle: 'For Seekers & Visionaries',
    description: 'Walk your journey to the Golden Age through 7 Waypoints. Perfect for seekers, visionaries, and those who believe in the creator transformation.',
    icon: Compass,
    href: '/soulbook/golden-path',
    color: 'amber',
    movements: ['Vitality', 'Clarity', 'Alignment', 'Mastery', 'Abundance', 'Fellowship', 'Arrival'],
  },
  {
    id: '7-pillars',
    title: 'The 7 Pillars',
    subtitle: 'For Builders & Architects',
    description: 'Build your life architecture through 7 Pillars. Perfect for systems thinkers, builders, and those who want structured transformation.',
    icon: Building2,
    href: '/soulbook/7-pillars',
    color: 'emerald',
    movements: ['Energy', 'Mind', 'Soul', 'Craft', 'Capital', 'Circle', 'Legacy'],
  },
]

export default function SoulbookPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-purple-900/20" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              The Creator&apos;s Soulbook
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl font-bold bg-gradient-to-r from-amber-200 via-slate-100 to-purple-200 bg-clip-text text-transparent sm:text-6xl lg:text-7xl"
            >
              Write the Book Your Soul
              <br />
              Came Here to Write
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300 sm:text-2xl"
            >
              Your Soulbook is your personal collection of Life Books — each offering a different lens for transformation. Choose your path. Write your story. Build your extraordinary life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <PremiumButton href="#life-books" variant="primary" size="lg">
                Explore Life Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
              <PremiumButton href="/soulbook/assessment" variant="ghost" size="lg">
                Take the Assessment
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">The Soulbook Architecture</h2>
            <p className="text-slate-400">One framework. Three perspectives. Infinite transformation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <GlassmorphicCard variant="luxury" border="glow" className="p-8 font-mono text-sm">
              <pre className="text-slate-300 overflow-x-auto">
{`                    YOUR SOULBOOK
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    LIFE SYMPHONY   GOLDEN PATH    7 PILLARS
    (For Artists)   (For Seekers)  (For Builders)
         │               │               │
         └───────────────┼───────────────┘
                         │
              ┌──────────┴──────────┐
              │    THE 7 PILLARS    │
              │    (Core Content)   │
              └─────────────────────┘
                         │
    ┌────────┬────────┬──┴──┬────────┬────────┬────────┐
    │        │        │     │        │        │        │
  ENERGY   MIND    SOUL  CRAFT  CAPITAL  CIRCLE  LEGACY`}
              </pre>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Life Books Grid */}
      <section id="life-books" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Choose Your Life Book</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Same powerful framework. Different metaphors for different minds.
              Which one speaks to your soul?
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {lifeBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={book.href}>
                  <GlassmorphicCard
                    variant="luxury"
                    border="glow"
                    hover
                    className="flex h-full flex-col p-8 group cursor-pointer"
                  >
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-${book.color}-500/20 text-${book.color}-400`}>
                      <book.icon className="h-7 w-7" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
                      {book.title}
                    </h3>

                    <p className="text-sm font-medium text-amber-400 mb-4">
                      {book.subtitle}
                    </p>

                    <p className="text-slate-400 mb-6 flex-grow">
                      {book.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        The 7 {book.id === 'life-symphony' ? 'Movements' : book.id === 'golden-path' ? 'Waypoints' : 'Pillars'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {book.movements.map((movement) => (
                          <span
                            key={movement}
                            className="text-xs px-2 py-1 rounded-full bg-slate-800/50 text-slate-400"
                          >
                            {movement}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400 font-medium group-hover:translate-x-2 transition-transform">
                      Explore {book.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </GlassmorphicCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Golden Age Connection */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
              <Sparkles className="mr-2 h-4 w-4" />
              Connected to the Golden Age Trilogy
            </div>
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Your Soulbook Lives Within a Larger Story
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The Creator&apos;s Soulbook is part of the Golden Age vision — a movement of creators building extraordinary lives and transforming the world.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'The Golden Age of Creators', role: 'The WHY', desc: 'Understand the creator economy transformation' },
              { title: 'The Great Awakening', role: 'The CONTEXT', desc: 'The consciousness shift happening now' },
              { title: 'The Goldmanack', role: 'The DAILY', desc: '365 wisdom transmissions for the path' },
            ].map((book, index) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="subtle" className="p-6 text-center h-full">
                  <p className="text-amber-400 text-sm font-medium mb-2">{book.role}</p>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">{book.title}</h3>
                  <p className="text-slate-500 text-sm">{book.desc}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6">
              Ready to Write Your Soulbook?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Start with a free assessment to discover which Life Book resonates with your soul.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumButton href="/soulbook/assessment" variant="primary" size="lg">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
              <PremiumButton href="/products/soulbook" variant="ghost" size="lg">
                View Pricing
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
