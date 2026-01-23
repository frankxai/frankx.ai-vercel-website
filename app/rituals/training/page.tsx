'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Dumbbell,
  ArrowRight,
  ArrowLeft,
  Clock,
  Brain,
  Heart,
  Zap,
  Target,
  TrendingUp,
  Download,
  CheckCircle2,
  Flame,
  Timer,
  BarChart3,
} from 'lucide-react'

// ============================================================================
// TRAINING RITUALS PAGE - The Genius Practice
// ============================================================================

const trainingPrinciples = [
  {
    icon: Brain,
    title: 'Training as Meditation',
    description: 'The gym is a dojo. Every rep is a meditation. Full presence, zero distraction. Mind-muscle connection isn\'t bro science—it\'s consciousness applied to movement.',
    color: 'text-violet-400',
  },
  {
    icon: TrendingUp,
    title: 'Progressive Overload',
    description: 'The only law that matters. Add weight, add reps, or add sets—but always progress. What doesn\'t challenge you doesn\'t change you.',
    color: 'text-emerald-400',
  },
  {
    icon: Timer,
    title: 'Time Under Tension',
    description: 'Control the eccentric. Feel the stretch. 3 seconds down, 1 second pause, explosive up. The muscle doesn\'t count reps—it measures tension.',
    color: 'text-cyan-400',
  },
  {
    icon: Heart,
    title: 'Recovery is Training',
    description: 'Muscles grow during rest, not during workouts. Sleep 8 hours. Eat enough protein. The discipline of recovery equals the discipline of training.',
    color: 'text-rose-400',
  },
]

const weeklyStructure = [
  { day: 'Monday', focus: 'Push', exercises: 'Chest, Shoulders, Triceps', intensity: 'Heavy' },
  { day: 'Tuesday', focus: 'Pull', exercises: 'Back, Biceps, Rear Delts', intensity: 'Heavy' },
  { day: 'Wednesday', focus: 'Legs', exercises: 'Quads, Hamstrings, Glutes', intensity: 'Volume' },
  { day: 'Thursday', focus: 'Rest', exercises: 'Active Recovery, Mobility', intensity: 'Light' },
  { day: 'Friday', focus: 'Upper', exercises: 'Full Upper Hypertrophy', intensity: 'Moderate' },
  { day: 'Saturday', focus: 'Lower', exercises: 'Full Lower Hypertrophy', intensity: 'Moderate' },
  { day: 'Sunday', focus: 'Rest', exercises: 'Complete Rest or Light Walk', intensity: 'None' },
]

const sessionRitual = [
  {
    phase: 'Pre-Training',
    time: '15 min before',
    items: [
      'Caffeine + L-Theanine (200mg/100mg)',
      'Review today\'s workout in notes',
      'Set intention: What am I building today?',
      'Music cued, phone on airplane mode',
    ],
  },
  {
    phase: 'Warm-Up',
    time: '10-15 min',
    items: [
      '5 min light cardio (raise core temp)',
      'Dynamic stretching for target muscles',
      'Activation exercises (bands, light sets)',
      'Ramping sets: 50% → 70% → 90% → work',
    ],
  },
  {
    phase: 'Main Work',
    time: '45-60 min',
    items: [
      'Compounds first (squat, bench, deadlift, row)',
      'Full ROM, controlled tempo',
      'Rest 2-3 min between heavy sets',
      'Track every set in notes',
    ],
  },
  {
    phase: 'Post-Training',
    time: '10 min',
    items: [
      'Light stretching (not aggressive)',
      'Protein within 30 min (40g)',
      'Log session: What went well? What to improve?',
      'Visualize next session\'s progression',
    ],
  },
]

const geniusPractices = [
  'Treat every rep as the only rep that matters',
  'Leave ego at the door—form before load, always',
  'The last 2 reps are where growth happens',
  'Breathe with purpose: exhale on exertion',
  'Between sets: stillness, not scrolling',
  'Track everything—what gets measured gets improved',
]

export default function TrainingRitualsPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[100px]" />
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
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Dumbbell className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/80">
                The Genius Practice
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Training Rituals
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mb-8 leading-relaxed">
              The gym is where I practice discipline, presence, and progressive overload.
              Not just building muscle—building the capacity to show up and do hard things.
            </p>

            <blockquote className="text-lg italic text-white/40 border-l-2 border-emerald-400/50 pl-4 mb-8">
              "The iron doesn't lie. You either lifted it or you didn't.
              This honesty transfers to everything else in life."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">The Training Philosophy</h2>
            <p className="text-white/50">Four principles that transform exercise into practice.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {trainingPrinciples.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
              >
                <principle.icon className={`w-8 h-8 ${principle.color} mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-3">{principle.title}</h3>
                <p className="text-white/50 leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Structure */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Weekly Structure</h2>
            <p className="text-white/50">Push/Pull/Legs with strategic recovery. Volume managed for longevity.</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-white/40">Day</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-white/40">Focus</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-white/40">Target</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-white/40">Intensity</th>
                </tr>
              </thead>
              <tbody>
                {weeklyStructure.map((day, i) => (
                  <motion.tr
                    key={day.day}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02]"
                  >
                    <td className="py-4 px-4 font-medium text-white">{day.day}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        day.focus === 'Push' ? 'bg-rose-500/10 text-rose-400' :
                        day.focus === 'Pull' ? 'bg-blue-500/10 text-blue-400' :
                        day.focus === 'Legs' ? 'bg-purple-500/10 text-purple-400' :
                        day.focus === 'Upper' ? 'bg-amber-500/10 text-amber-400' :
                        day.focus === 'Lower' ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-white/5 text-white/40'
                      }`}>
                        {day.focus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/60">{day.exercises}</td>
                    <td className="py-4 px-4 text-white/40">{day.intensity}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Session Ritual */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">The Session Ritual</h2>
            <p className="text-white/50">Every training session follows this structure. No improvisation.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {sessionRitual.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">{phase.phase}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    {phase.time}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400/60 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Genius Practices */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Flame className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold">Genius Practices</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {geniusPractices.map((practice, i) => (
                <motion.div
                  key={practice}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                >
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-white/70">{practice}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Science Section */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20"
          >
            <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-4">Evidence-Based Foundations</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-emerald-400 font-medium mb-1">Volume</p>
                <p className="text-white/60">12-20 sets per muscle group per week for hypertrophy</p>
              </div>
              <div>
                <p className="text-emerald-400 font-medium mb-1">Frequency</p>
                <p className="text-white/60">2-3x per muscle group per week optimal for growth</p>
              </div>
              <div>
                <p className="text-emerald-400 font-medium mb-1">Intensity</p>
                <p className="text-white/60">70-85% 1RM for hypertrophy, 85%+ for strength</p>
              </div>
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
            <Download className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Get the Training Ritual Card</h2>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              A printable guide with the session protocol and weekly structure.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-emerald-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Link>
              <Link
                href="/rituals/learning"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 transition-colors"
              >
                Next: Learning Rituals
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
            className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center"
          >
            <p className="text-white/60 mb-2">This practice is explored in depth in</p>
            <Link
              href="/golden-age"
              className="text-lg font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              The Golden Age of Creators → Chapter 5: The Body as Instrument
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
