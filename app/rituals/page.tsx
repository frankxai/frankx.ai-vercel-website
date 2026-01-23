'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Sun,
  Sparkles,
  Bot,
  Moon,
  Calendar,
  ArrowRight,
  Play,
  Download,
  Clock,
  Heart,
  Zap,
  BookOpen,
} from 'lucide-react'

// ============================================================================
// RITUALS PAGE - The Architecture of Intentional Living
// ============================================================================

const rituals = [
  {
    id: 'morning',
    title: 'Morning Rituals',
    subtitle: 'Start with Power',
    time: '5:30 - 7:00 AM',
    description: 'Consciousness expansion, intention setting, and creative priming. The foundation for everything that follows.',
    icon: Sun,
    color: 'from-amber-500/20 to-orange-500/10',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/20 hover:border-amber-400/40',
    href: '/rituals/morning',
    practices: ['Meditation', 'Breathwork', 'Journaling', 'Movement'],
  },
  {
    id: 'creative',
    title: 'Creative Sessions',
    subtitle: 'Enter Flow State',
    time: 'Deep Work Blocks',
    description: 'Environment preparation, tool initialization, and the protocol for entering deep creative flow.',
    icon: Sparkles,
    color: 'from-violet-500/20 to-purple-500/10',
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-500/20 hover:border-violet-400/40',
    href: '/rituals/creative-session',
    practices: ['Environment Setup', 'AI Activation', 'Flow Entry', 'Ship Rhythm'],
  },
  {
    id: 'ai',
    title: 'AI Practices',
    subtitle: 'Collaborate with Intelligence',
    time: 'Throughout Day',
    description: 'Daily prompt routines, agent conversation starters, and knowledge synthesis workflows.',
    icon: Bot,
    color: 'from-cyan-500/20 to-blue-500/10',
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/20 hover:border-cyan-400/40',
    href: '/rituals/ai-practice',
    practices: ['Prompt Review', 'Agent Sessions', 'Knowledge Capture', 'Output Rituals'],
  },
  {
    id: 'evening',
    title: 'Evening Integration',
    subtitle: 'Close with Intention',
    time: '8:00 - 9:30 PM',
    description: 'Creation capture, gratitude practice, tomorrow preparation, and rest optimization.',
    icon: Moon,
    color: 'from-indigo-500/20 to-slate-500/10',
    iconColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/20 hover:border-indigo-400/40',
    href: '/rituals/evening',
    practices: ['Daily Capture', 'Gratitude', 'Tomorrow Prep', 'Wind Down'],
  },
  {
    id: 'weekly',
    title: 'Weekly Reviews',
    subtitle: 'The Meta-Ritual',
    time: 'Sunday Sessions',
    description: 'The practice that holds all other practices together. Review, reflect, and recalibrate.',
    icon: Calendar,
    color: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20 hover:border-emerald-400/40',
    href: '/rituals/weekly-review',
    practices: ['Week Review', 'Planning', 'Content Calendar', 'Growth Check'],
  },
]

const principles = [
  {
    icon: Heart,
    title: 'Intention Over Habit',
    description: 'Rituals are habits infused with meaning. Every practice connects to your deepest purpose.',
  },
  {
    icon: Zap,
    title: 'Consistency Compounds',
    description: 'Small daily deposits create exponential returns. The magic is in the repetition.',
  },
  {
    icon: Clock,
    title: 'Time is Sacred',
    description: 'Protect your rituals fiercely. What you do daily defines who you become.',
  },
]

export default function RitualsPage() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              The Foundation of Everything
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Transform Your Days Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                Masterpieces
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed">
              Rituals are the architecture of an intentional life.
              These are the practices that shape everything I create—and everything I become.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#rituals"
                className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Explore Rituals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/soulbook"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                The Soulbook Framework
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white/60 max-w-4xl mx-auto">
              "A ritual is a habit with intention. It's not what you do—it's the meaning you bring to what you do."
            </blockquote>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <principle.icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                <p className="text-white/50 text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Rituals Grid */}
      <section id="rituals" className="relative py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/80 mb-4">
              The Daily Architecture
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Five Pillars of Practice
            </h2>
            <p className="text-lg text-white/45 max-w-2xl">
              Each ritual is a doorway. Together, they create the container for a creative life.
            </p>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {rituals.map((ritual) => (
              <motion.div key={ritual.id} variants={shouldReduceMotion ? undefined : itemVariants}>
                <Link
                  href={ritual.href}
                  className={`group relative block p-6 md:p-8 rounded-2xl bg-white/[0.02] border ${ritual.borderColor} overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1`}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${ritual.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    {/* Icon */}
                    <div className={`p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] shrink-0`}>
                      <ritual.icon className={`w-8 h-8 ${ritual.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">
                          {ritual.title}
                        </h3>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.06] text-white/50">
                          {ritual.time}
                        </span>
                      </div>
                      <p className="text-xs uppercase tracking-wider text-white/30 mb-2">
                        {ritual.subtitle}
                      </p>
                      <p className="text-white/50 mb-4 max-w-2xl">
                        {ritual.description}
                      </p>

                      {/* Practices */}
                      <div className="flex flex-wrap gap-2">
                        {ritual.practices.map((practice) => (
                          <span
                            key={practice}
                            className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06]"
                          >
                            {practice}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-white/60 group-hover:translate-x-2 transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ritual Library Section */}
      <section id="library" className="relative py-20 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Download className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ritual Library
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-xl mx-auto">
              Downloadable ritual cards, templates, and guides. Print them, customize them, make them yours.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/downloads"
                className="group inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold transition-all hover:bg-emerald-400"
              >
                <Download className="w-4 h-4" />
                Download Ritual Cards
              </Link>
              <Link
                href="/soulbook"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 transition-all"
              >
                Full Soulbook System
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Begin Tomorrow Morning
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-xl mx-auto">
              Pick one ritual. Start small. Let it compound.
              The life you want is built one intentional day at a time.
            </p>
            <Link
              href="/rituals/morning"
              className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/90 hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
            >
              <Play className="w-5 h-5" />
              Start with Morning Rituals
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
