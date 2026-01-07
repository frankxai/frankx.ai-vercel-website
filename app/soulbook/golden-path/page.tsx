'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Compass, Footprints } from 'lucide-react'
import { motion } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const waypoints = [
  {
    number: 1,
    name: 'Vitality',
    pillar: 'Energy',
    theme: 'Fuel for the journey',
    description: 'You cannot walk far on empty. Vitality is the first waypoint because without it, the journey ends before it begins.',
    color: 'red',
  },
  {
    number: 2,
    name: 'Clarity',
    pillar: 'Mind',
    theme: 'Seeing the path ahead',
    description: 'A foggy mind leads to wrong turns. Clarity is seeing the path, understanding the terrain, and navigating obstacles.',
    color: 'orange',
  },
  {
    number: 3,
    name: 'Alignment',
    pillar: 'Soul',
    theme: 'Walking true to yourself',
    description: 'Many paths lead somewhere. Only one leads to YOUR golden age. Alignment is walking the path that&apos;s truly yours.',
    color: 'yellow',
  },
  {
    number: 4,
    name: 'Mastery',
    pillar: 'Craft',
    theme: 'Skills for the road',
    description: 'The golden path has challenges. Mastery is developing the skills to meet them - the craft that makes you capable.',
    color: 'green',
  },
  {
    number: 5,
    name: 'Abundance',
    pillar: 'Capital',
    theme: 'Resources for the quest',
    description: 'The journey requires resources. Abundance is having enough - not excess, but sufficiency for the path ahead.',
    color: 'blue',
  },
  {
    number: 6,
    name: 'Fellowship',
    pillar: 'Circle',
    theme: 'Companions on the path',
    description: 'No one walks the golden path alone. Fellowship is the companions who walk with you, encourage you, and share the journey.',
    color: 'indigo',
  },
  {
    number: 7,
    name: 'Arrival',
    pillar: 'Legacy',
    theme: 'The golden destination',
    description: 'Arrival is not an ending - it&apos;s a becoming. It&apos;s when all waypoints integrate and you realize: the golden age is here.',
    color: 'amber',
  },
]

export default function GoldenPathPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-slate-950 to-orange-900/20" />

        {/* Path decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform -translate-y-1/2" />
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
              className="mb-8 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300"
            >
              <Compass className="mr-2 h-4 w-4" />
              Life Book for Seekers & Visionaries
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl font-bold bg-gradient-to-r from-amber-200 via-slate-100 to-orange-200 bg-clip-text text-transparent sm:text-6xl lg:text-7xl"
            >
              The Golden Path
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4 max-w-2xl text-2xl text-amber-200 font-light italic"
            >
              &quot;Walk Your Journey to the Golden Age&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-400"
            >
              You are on a pilgrimage. Not to a physical place, but to a state of being -
              the Golden Age of your own life. The path has 7 waypoints. Each must be visited,
              understood, and integrated before you can arrive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PremiumButton href="#waypoints" variant="primary" size="lg">
                <Footprints className="mr-2 h-5 w-5" />
                Begin Your Journey
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 7 Waypoints */}
      <section id="waypoints" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-4">The 7 Waypoints</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Each waypoint on the Golden Path represents a stage of transformation.
              The path is not linear - you may return. But the direction is always forward.
            </p>
          </motion.div>

          {/* Path visualization */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-amber-500/30 to-amber-500/50 hidden md:block" />

            <div className="space-y-8">
              {waypoints.map((waypoint, index) => (
                <motion.div
                  key={waypoint.number}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Waypoint marker */}
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-slate-900 border-2 border-amber-500/50 flex items-center justify-center hidden md:flex z-10">
                    <span className="text-xl font-bold text-amber-400">{waypoint.number}</span>
                  </div>

                  <div className="md:ml-24">
                    <GlassmorphicCard variant="luxury" border="glow" hover className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0 md:hidden">
                          <div className={`w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center`}>
                            <span className="text-lg font-bold text-amber-400">{waypoint.number}</span>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-slate-100">{waypoint.name}</h3>
                            <span className="text-sm px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                              {waypoint.pillar}
                            </span>
                          </div>
                          <p className="text-amber-300 font-medium mb-2">&quot;{waypoint.theme}&quot;</p>
                          <p className="text-slate-400">{waypoint.description}</p>
                        </div>

                        <div className="flex-shrink-0">
                          <PremiumButton href={`/soulbook/golden-path/${waypoint.name.toLowerCase()}`} variant="ghost" size="sm">
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </PremiumButton>
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-amber-950/20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-slate-200 italic leading-relaxed"
          >
            &quot;The golden path is not ahead of you.
            <br />
            <span className="text-amber-400">It&apos;s beneath your feet. Start walking.</span>&quot;
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
              Ready to Walk Your Golden Path?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Begin with the 30-day Golden Path program and transform your life one waypoint at a time.
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
