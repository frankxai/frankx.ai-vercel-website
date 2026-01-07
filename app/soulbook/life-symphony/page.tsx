'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, Music, Play } from 'lucide-react'
import { motion } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

const movements = [
  {
    number: 1,
    name: 'Rhythm',
    pillar: 'Energy',
    theme: 'The beat that drives everything',
    description: 'Your rhythm is your physical foundation - the pulse that keeps you moving. Is your tempo sustainable?',
    color: 'red',
  },
  {
    number: 2,
    name: 'Melody',
    pillar: 'Mind',
    theme: 'The tune that runs through your thoughts',
    description: 'Your melody is your mental and emotional life - the music playing in your head. What tune is on repeat?',
    color: 'orange',
  },
  {
    number: 3,
    name: 'Harmony',
    pillar: 'Soul',
    theme: 'When all parts align in resonance',
    description: 'Your harmony is when your values, actions, and purpose align - true consonance. Where is there dissonance?',
    color: 'yellow',
  },
  {
    number: 4,
    name: 'Composition',
    pillar: 'Craft',
    theme: 'The art you create and share',
    description: 'Your composition is your creative output - the music you make for the world. What are you composing?',
    color: 'green',
  },
  {
    number: 5,
    name: 'Amplification',
    pillar: 'Capital',
    theme: 'How far your music travels',
    description: 'Your amplification is your reach and resources - turning up the volume on your impact.',
    color: 'blue',
  },
  {
    number: 6,
    name: 'Ensemble',
    pillar: 'Circle',
    theme: 'The players in your orchestra',
    description: 'Your ensemble is your relationships - the musicians who play alongside you. Who&apos;s in your orchestra?',
    color: 'indigo',
  },
  {
    number: 7,
    name: 'Masterwork',
    pillar: 'Legacy',
    theme: 'The symphony you leave behind',
    description: 'Your masterwork is your complete opus - the full integration of all movements into your life&apos;s symphony.',
    color: 'purple',
  },
]

export default function LifeSymphonyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-950 to-indigo-900/20" />

        {/* Musical wave decoration */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="currentColor"
              className="text-purple-500"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
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
              className="mb-8 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300"
            >
              <Music className="mr-2 h-4 w-4" />
              Life Book for Artists & Creators
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl font-bold bg-gradient-to-r from-purple-200 via-slate-100 to-indigo-200 bg-clip-text text-transparent sm:text-6xl lg:text-7xl"
            >
              Life Symphony
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4 max-w-2xl text-2xl text-purple-200 font-light italic"
            >
              &quot;Compose Your Extraordinary Life&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-400"
            >
              Your life is not a problem to be solved. It&apos;s a symphony to be composed.
              Every pillar is a movement. Every habit is a note. Every day is a measure.
              You are the composer, the conductor, and the orchestra.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PremiumButton href="#movements" variant="primary" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Begin Your Symphony
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 7 Movements */}
      <section id="movements" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-4">The 7 Movements</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Each movement of your Life Symphony corresponds to a pillar of transformation.
              Together, they create your masterwork.
            </p>
          </motion.div>

          <div className="space-y-6">
            {movements.map((movement, index) => (
              <motion.div
                key={movement.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard variant="luxury" border="glow" hover className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-${movement.color}-500/20 flex items-center justify-center`}>
                        <span className={`text-2xl font-bold text-${movement.color}-400`}>{movement.number}</span>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-100">{movement.name}</h3>
                        <span className="text-sm px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                          {movement.pillar}
                        </span>
                      </div>
                      <p className="text-purple-300 font-medium mb-2">&quot;{movement.theme}&quot;</p>
                      <p className="text-slate-400">{movement.description}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <PremiumButton href={`/soulbook/life-symphony/${movement.name.toLowerCase()}`} variant="ghost" size="sm">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </PremiumButton>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-purple-950/20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-slate-200 italic leading-relaxed"
          >
            &quot;Your life is a symphony waiting to be composed.
            <br />
            <span className="text-purple-400">Start composing.</span>&quot;
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
              Ready to Compose Your Symphony?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Begin with the 30-day Life Symphony program and transform your life one movement at a time.
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
