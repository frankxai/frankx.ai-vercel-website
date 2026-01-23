'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Sun,
  ArrowRight,
  ArrowLeft,
  Clock,
  Brain,
  Heart,
  Zap,
  Wind,
  BookOpen,
  Download,
  Play,
  CheckCircle2,
} from 'lucide-react'

// ============================================================================
// MORNING RITUALS PAGE - Start with Power
// ============================================================================

const morningStack = [
  {
    time: '5:30 AM',
    title: 'Wake & Hydrate',
    duration: '5 min',
    description: 'No phone. Drink 500ml water with lemon. Let the body wake naturally.',
    icon: Zap,
    color: 'text-amber-400',
  },
  {
    time: '5:35 AM',
    title: 'Breathwork',
    duration: '10 min',
    description: 'Wim Hof method or box breathing. Oxygenate the system, activate the nervous system.',
    icon: Wind,
    color: 'text-cyan-400',
  },
  {
    time: '5:45 AM',
    title: 'Meditation',
    duration: '15-20 min',
    description: 'Silent awareness. No guided apps. Just presence with breath and body.',
    icon: Brain,
    color: 'text-violet-400',
  },
  {
    time: '6:05 AM',
    title: 'Journaling',
    duration: '10 min',
    description: 'Intentions for the day. Gratitude. Stream of consciousness. The pen clears the mind.',
    icon: BookOpen,
    color: 'text-emerald-400',
  },
  {
    time: '6:15 AM',
    title: 'Movement',
    duration: '15-30 min',
    description: 'Light stretching, yoga flow, or walk. Wake the body before demanding anything from it.',
    icon: Heart,
    color: 'text-rose-400',
  },
  {
    time: '6:45 AM',
    title: 'Cold Exposure',
    duration: '3-5 min',
    description: 'Cold shower finish. The discomfort builds discipline. The dopamine fuels the day.',
    icon: Zap,
    color: 'text-blue-400',
  },
]

const benefits = [
  'Mental clarity that lasts all day',
  'Reduced anxiety and stress response',
  'Increased focus and productivity',
  'Better emotional regulation',
  'Stronger mind-body connection',
  'Compounding energy over weeks',
]

export default function MorningRitualsPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/rituals"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Rituals
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Sun className="w-8 h-8 text-amber-400" />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/80">
                5:30 - 7:00 AM
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Morning Rituals
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mb-8 leading-relaxed">
              The first 90 minutes shape the next 14 hours. This is my daily practice for
              consciousness expansion, intention setting, and creative priming.
            </p>

            <blockquote className="text-lg italic text-white/40 border-l-2 border-amber-400/50 pl-4 mb-8">
              "Win the morning, win the day. Lose the morning, chase it forever."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* YouTube Sessions */}
      <section className="relative py-12 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Play className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-bold">Watch: Morning Session Documentation</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Video 1 */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/faTGTgid8Uc"
                    title="Morning Ritual Session 1"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">Morning Ritual Session</h3>
                  <p className="text-sm text-white/40">Full documentation of my morning practice</p>
                </div>
              </div>

              {/* Video 2 */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/tybOi4hjZFQ"
                    title="Morning Ritual Session 2"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">Morning Session Deep Dive</h3>
                  <p className="text-sm text-white/40">Extended exploration of the practice</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Stack */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">The Morning Stack</h2>
            <p className="text-white/50">
              Each element builds on the last. The order matters.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/50 via-white/10 to-transparent" />

            <div className="space-y-6">
              {morningStack.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>

                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-white/30">{item.time}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-8">What Changes After 30 Days</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-white/70">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download & CTA */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Download className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Get the Morning Ritual Card</h2>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              A printable guide to keep by your bedside. Start tomorrow.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 bg-amber-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Link>
              <Link
                href="/rituals/training"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 transition-colors"
              >
                Next: Training Rituals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book Connection */}
      <section className="relative py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-center"
          >
            <p className="text-white/60 mb-2">This practice is explored in depth in</p>
            <Link
              href="/golden-age"
              className="text-lg font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              The Golden Age of Creators → Chapter 3: The Architecture of Days
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
