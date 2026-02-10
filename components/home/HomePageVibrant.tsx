'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Music2, Zap, Star, Rocket, Heart } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * V5: Vibrant Creator
 *
 * Design philosophy: Bold colors, playful energy, rounded corners,
 * gradient backgrounds, emoji-friendly, high visual impact.
 * Inspired by: Linear, Notion, Figma, modern SaaS
 */

export default function HomePageVibrant() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Hero with gradient background */}
      <section className="relative min-h-screen flex items-center">
        {/* Vibrant gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-pink-50 to-amber-50" />

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full blur-3xl opacity-20"
            animate={shouldReduceMotion ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full blur-3xl opacity-15"
            animate={shouldReduceMotion ? undefined : { x: [0, -20, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full blur-3xl opacity-10"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-2 mb-8 shadow-lg shadow-violet-500/10"
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                AI Architect @ Oracle • 12K+ Songs Created
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create.
              </span>{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Build.
              </span>{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Ship.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Music, AI systems, and creative tools for the{' '}
              <span className="font-semibold text-violet-600">Golden Age of Intelligence</span>.
              Everything open. Everything documented.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/start"
                onClick={() => trackEvent('vibrant_hero_cta', { type: 'primary' })}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all"
              >
                Start Creating
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/music-lab"
                className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-gray-200"
              >
                <Music2 className="w-5 h-5 text-violet-500" />
                Listen to Music
              </Link>
            </div>
          </motion.div>

          {/* Floating cards preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { img: '/images/ai-art/generated-2026-01-21T10-05-06-577Z-s5e43g.png', label: 'AI Art' },
                { img: '/images/3d/music_3d.png', label: 'Music Lab' },
                { img: '/images/3d/rocket_3d.png', label: 'Products' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-violet-600 font-semibold mb-4">
              <Star className="w-5 h-5" />
              What I Build
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tools for <span className="text-violet-600">Creators</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Music2, title: 'Music Lab', desc: 'AI-powered music creation with Suno', color: 'violet', href: '/music-lab' },
              { icon: Sparkles, title: 'Prompt Library', desc: '50+ battle-tested prompts', color: 'amber', href: '/prompt-library' },
              { icon: Zap, title: 'AI Architect', desc: 'Enterprise-grade systems', color: 'cyan', href: '/ai-architect' },
              { icon: Heart, title: 'Resources', desc: 'Curated learning paths', color: 'pink', href: '/resources' },
            ].map((item, i) => {
              const colorClasses = {
                violet: 'bg-violet-100 text-violet-600 group-hover:bg-violet-600',
                amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-500',
                cyan: 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-500',
                pink: 'bg-pink-100 text-pink-600 group-hover:bg-pink-500',
              }

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="group block bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:text-white ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-24 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12K+', label: 'Songs Created', emoji: '🎵' },
              { value: '500+', label: 'Prompt Templates', emoji: '✨' },
              { value: 'Oracle', label: 'AI Architect', emoji: '🏗️' },
              { value: 'Open', label: 'Everything', emoji: '💫' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-4xl md:text-5xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to create something{' '}
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                amazing
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join creators who are building with AI. Everything here is open and documented for you to use.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-1 transition-all"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
