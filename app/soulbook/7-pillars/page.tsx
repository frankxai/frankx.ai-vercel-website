'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Building2, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const pillars = [
  {
    number: 1,
    name: 'Energy',
    theme: 'The foundation that powers everything',
    description: 'Energy is the bedrock of your life architecture. Without it, no structure stands. Sleep, nutrition, movement, recovery - these are your building materials.',
    color: 'red',
    keyQuestion: 'Do you have the energy to build?',
  },
  {
    number: 2,
    name: 'Mind',
    theme: 'The architect who designs the blueprint',
    description: 'Your mind is the architect. It designs before you build. Clarity of thought, mental models, learning systems - these shape every decision.',
    color: 'orange',
    keyQuestion: 'Is your architect sharp and clear?',
  },
  {
    number: 3,
    name: 'Soul',
    theme: 'The compass that guides construction',
    description: 'Soul is your true north - values, purpose, alignment. Build without soul and you create empty structures. Build with soul and you create sanctuaries.',
    color: 'yellow',
    keyQuestion: 'Are you building what truly matters?',
  },
  {
    number: 4,
    name: 'Craft',
    theme: 'The skills that shape raw materials',
    description: 'Craft is your ability to build - the skills, expertise, and mastery you bring to your work. It turns vision into reality, one brick at a time.',
    color: 'green',
    keyQuestion: 'Do you have the skills to build what you envision?',
  },
  {
    number: 5,
    name: 'Capital',
    theme: 'The resources that fund the project',
    description: 'Capital is what fuels construction - money, time, attention, opportunity. Without resources, blueprints remain dreams. With them, dreams become buildings.',
    color: 'blue',
    keyQuestion: 'Do you have the resources to sustain the build?',
  },
  {
    number: 6,
    name: 'Circle',
    theme: 'The team that builds together',
    description: 'No one builds alone. Circle is your construction crew - partners, mentors, community. The right team multiplies your capacity.',
    color: 'indigo',
    keyQuestion: 'Who is building alongside you?',
  },
  {
    number: 7,
    name: 'Legacy',
    theme: 'The structure that outlasts you',
    description: 'Legacy is what remains when you step away. It is the integrated architecture of all pillars - a life built so well it serves others long after you are gone.',
    color: 'emerald',
    keyQuestion: 'What will your architecture leave behind?',
  },
]

export default function SevenPillarsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-950 to-teal-900/20" />

        {/* Architectural grid decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/soulbook"
            className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Soulbook
          </Link>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Life Book for Builders & Architects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl font-bold bg-gradient-to-r from-emerald-200 via-slate-100 to-teal-200 bg-clip-text text-transparent sm:text-6xl lg:text-7xl"
            >
              The 7 Pillars
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4 max-w-2xl text-2xl text-emerald-200 font-light italic"
            >
              &quot;Build Your Life Architecture&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-400"
            >
              Your life is a building. Some build shacks. Some build skyscrapers.
              The difference isn&apos;t luck - it&apos;s architecture. The 7 Pillars are
              the structural elements of an extraordinary life. Each must be strong.
              Each must connect to the others.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PremiumButton href="#pillars" variant="primary" size="lg">
                <Layers className="mr-2 h-5 w-5" />
                Explore the Pillars
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 7 Pillars */}
      <section id="pillars" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-4">The 7 Pillars of Life Architecture</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Each pillar is a load-bearing element of your life. Neglect one, and the
              structure weakens. Strengthen all, and you build something that lasts.
            </p>
          </motion.div>

          {/* Pillar grid - architectural layout */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.slice(0, 6).map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="luxury" border="glow" hover className="h-full p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center`}>
                        <span className="text-lg font-bold text-emerald-400">{pillar.number}</span>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-slate-100 mb-1">{pillar.name}</h3>
                      <p className="text-emerald-300 text-sm font-medium mb-3">&quot;{pillar.theme}&quot;</p>
                      <p className="text-slate-400 text-sm mb-4">{pillar.description}</p>
                      <p className="text-slate-500 text-xs italic">{pillar.keyQuestion}</p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {/* Legacy pillar - featured */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <GlassmorphicCard variant="luxury" border="glow" hover className="p-8 bg-gradient-to-br from-emerald-950/50 to-slate-950">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-400">7</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-slate-100">{pillars[6].name}</h3>
                    <span className="text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                      The Capstone
                    </span>
                  </div>
                  <p className="text-emerald-300 font-medium mb-3">&quot;{pillars[6].theme}&quot;</p>
                  <p className="text-slate-400 mb-4">{pillars[6].description}</p>
                  <p className="text-slate-500 italic">{pillars[6].keyQuestion}</p>
                </div>

                <div className="flex-shrink-0">
                  <PremiumButton href="/soulbook/7-pillars/legacy" variant="ghost" size="sm">
                    Explore Legacy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PremiumButton>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-emerald-950/20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">The Architecture</h2>
            <p className="text-slate-400">How the 7 Pillars connect to form your life structure</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GlassmorphicCard variant="luxury" border="glow" className="p-8 font-mono text-sm">
              <pre className="text-slate-300 overflow-x-auto">
{`                    ╔═══════════════════════╗
                    ║       LEGACY          ║
                    ║    (The Capstone)     ║
                    ╚═══════════════════════╝
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
         │  CRAFT  │    │ CAPITAL │    │  CIRCLE │
         │ (Build) │    │ (Fund)  │    │ (Team)  │
         └────┬────┘    └────┬────┘    └────┬────┘
              │               │               │
              └───────────────┼───────────────┘
                              │
    ═══════════════════════════════════════════════
    ║   ENERGY   ║    MIND    ║     SOUL      ║
    ║ (Foundation)  (Architect)  (Compass)    ║
    ═══════════════════════════════════════════════`}
              </pre>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-slate-200 italic leading-relaxed"
          >
            &quot;Every pillar you strengthen raises the ceiling
            <br />
            <span className="text-emerald-400">of what your life can become.</span>&quot;
          </motion.blockquote>
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
              Ready to Build Your Life Architecture?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Begin with the 30-day Pillars program and strengthen your foundation one pillar at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumButton href="/soulbook/assessment" variant="primary" size="lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </PremiumButton>
              <PremiumButton href="/products/soulbook" variant="ghost" size="lg">
                Get Full Program
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
