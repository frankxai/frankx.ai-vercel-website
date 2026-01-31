'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Music2, BookOpen, Sparkles } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * V3: Editorial Luxury
 *
 * Design philosophy: Magazine-style editorial with heavy serif typography,
 * generous whitespace, asymmetric layouts, and sophisticated restraint.
 * Inspired by: Monocle, The New York Times, Kinfolk
 */

export default function HomePageEditorial() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#1a1a1a]">
      {/* Hero - Editorial style */}
      <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Typography-focused */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[#666] mb-8">
                AI Architect · Music Creator · Builder
              </p>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-8">
                <span className="block">Building</span>
                <span className="block italic text-[#8b5cf6]">intelligent</span>
                <span className="block">systems.</span>
              </h1>

              <p className="text-xl md:text-2xl text-[#444] leading-relaxed max-w-lg mb-12 font-light">
                AI Architect at Oracle by day. Creator of 12,000+ songs by night.
                <span className="block mt-4 italic">Everything documented, open, yours to use.</span>
              </p>

              <div className="flex flex-wrap gap-6">
                <Link
                  href="/start"
                  onClick={() => trackEvent('editorial_hero_cta', { type: 'primary' })}
                  className="group inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#333] transition-colors"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-[#1a1a1a] px-8 py-4 text-sm uppercase tracking-widest font-medium border-b-2 border-[#1a1a1a] hover:border-[#8b5cf6] hover:text-[#8b5cf6] transition-colors"
                >
                  The Story
                </Link>
              </div>
            </motion.div>

            {/* Right: Featured image */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] bg-[#e8e6e3]"
            >
              <Image
                src="/images/ai-art/generated-2026-01-21T10-05-06-577Z-s5e43g.png"
                alt="AI Generated Art"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4">
                <p className="text-xs uppercase tracking-widest text-[#666] mb-1">Featured</p>
                <p className="font-serif text-lg italic">Neural Synthesis I</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-px bg-[#ddd]" />
      </div>

      {/* Quote section */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl italic leading-relaxed text-[#333]"
          >
            "I create to understand. I share to teach.
            <span className="block mt-4">The universe is too interesting not to explore."</span>
          </motion.blockquote>
        </div>
      </section>

      {/* Three columns */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                num: '01',
                title: 'Music',
                subtitle: 'Daily creative practice with Suno AI',
                description: 'Ambient soundscapes, electronic experiments, cinematic scores. The process documented.',
                href: '/music-lab',
                icon: Music2,
              },
              {
                num: '02',
                title: 'Systems',
                subtitle: 'Enterprise AI architecture',
                description: 'Building tools that serve the work. Oracle-grade systems for creators.',
                href: '/ai-architect',
                icon: Sparkles,
              },
              {
                num: '03',
                title: 'Learning',
                subtitle: 'Curated resources',
                description: 'What changed how I think. Oracle, Google, MIT courses that actually helped.',
                href: '/students',
                icon: BookOpen,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={item.href} className="group block">
                  <span className="text-xs text-white/40 mb-4 block">{item.num}</span>
                  <h3 className="font-serif text-3xl md:text-4xl italic mb-2 group-hover:text-[#8b5cf6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm uppercase tracking-widest text-white/60 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-white/50 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Editorial style */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '12K+', label: 'Songs Created' },
              { value: '500+', label: 'Prompt Templates' },
              { value: 'Oracle', label: 'AI Architect' },
              { value: 'Open', label: 'Source Philosophy' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-[#8b5cf6] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-[#666]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-8">
              Start where you are.
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Whether you're learning AI, creating music, or building systems—
              there's something here for you.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-3 bg-white text-[#1a1a1a] px-10 py-5 text-sm uppercase tracking-widest font-medium hover:bg-[#f0f0f0] transition-colors"
            >
              Begin Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
