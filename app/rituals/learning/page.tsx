'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Brain,
  Lightbulb,
  Layers,
  PenTool,
  Headphones,
  Video,
  FileText,
  Download,
  CheckCircle2,
  Zap,
  Clock,
  Target,
} from 'lucide-react'

// ============================================================================
// LEARNING RITUALS PAGE - Knowledge Compounding
// ============================================================================

const learningPillars = [
  {
    icon: Headphones,
    title: 'Audio Learning',
    time: 'Commute / Gym / Walking',
    description: 'Podcasts and audiobooks during low-attention activities. 2-3 hours daily of ambient knowledge absorption.',
    examples: ['Huberman Lab', 'Lex Fridman', 'All-In', 'Audiobooks on Audible'],
    color: 'text-violet-400',
  },
  {
    icon: Video,
    title: 'Video Deep Dives',
    time: 'Evening / Weekends',
    description: 'YouTube, courses, and tutorials when visual learning is required. Active note-taking mandatory.',
    examples: ['YouTube tutorials', 'Online courses', 'Conference talks', 'Technical demos'],
    color: 'text-cyan-400',
  },
  {
    icon: FileText,
    title: 'Reading Practice',
    time: 'Morning / Before Sleep',
    description: 'Books, articles, research papers. 30 minutes minimum daily. Kindle highlights synced to notes.',
    examples: ['Physical books', 'Kindle', 'Substack', 'Research papers'],
    color: 'text-emerald-400',
  },
  {
    icon: PenTool,
    title: 'Active Synthesis',
    time: 'After Consumption',
    description: 'Notes, summaries, connections. Learning isn\'t complete until you\'ve processed and connected it.',
    examples: ['Obsidian notes', 'Blog posts', 'Teaching others', 'Project application'],
    color: 'text-amber-400',
  },
]

const dailyStructure = [
  {
    time: 'Morning (6:00-7:00)',
    activity: 'Reading',
    format: 'Books / Long-form articles',
    notes: 'Mind is fresh. Deep comprehension. Highlight and note.',
  },
  {
    time: 'Commute / Movement',
    activity: 'Audio',
    format: 'Podcasts / Audiobooks',
    notes: 'Passive absorption. Let ideas marinate.',
  },
  {
    time: 'Lunch Break',
    activity: 'Video',
    format: '1-2 YouTube videos',
    notes: 'Technical learning. Watch at 1.5-2x speed.',
  },
  {
    time: 'Evening (20:00-21:00)',
    activity: 'Synthesis',
    format: 'Note processing',
    notes: 'Connect today\'s inputs. Write summaries.',
  },
  {
    time: 'Before Sleep',
    activity: 'Light Reading',
    format: 'Fiction or philosophy',
    notes: 'Wind down the mind. Different mode of learning.',
  },
]

const noteTakingSystem = [
  {
    step: '1. Capture',
    description: 'Highlight, bookmark, or voice memo immediately. Don\'t trust memory.',
    tool: 'Kindle highlights, Readwise, voice memos',
  },
  {
    step: '2. Process',
    description: 'Daily: review captures, write in your own words. What does this mean to me?',
    tool: 'Obsidian, Notion, paper journal',
  },
  {
    step: '3. Connect',
    description: 'Link to existing knowledge. What does this relate to? What does it contradict?',
    tool: 'Backlinks, tags, mind maps',
  },
  {
    step: '4. Apply',
    description: 'Use it or lose it. Apply in projects, teach to others, write about it.',
    tool: 'Blog posts, conversations, implementations',
  },
]

const learningPrinciples = [
  'Learn with intention, not just curiosity',
  'Teach to learn—explaining solidifies understanding',
  'Spaced repetition beats cramming',
  'Sleep on it—consolidation happens at night',
  'Apply immediately or schedule application',
  'Quality over quantity—one book absorbed beats ten skimmed',
]

export default function LearningRitualsPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/[0.04] rounded-full blur-[100px]" />
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
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/80">
                Knowledge Compounding
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Learning Rituals
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mb-8 leading-relaxed">
              Knowledge compounds like interest. The daily learning ritual is how I stay sharp,
              curious, and capable of navigating an accelerating world.
            </p>

            <blockquote className="text-lg italic text-white/40 border-l-2 border-cyan-400/50 pl-4 mb-8">
              "The person who learns the fastest wins. Not the smartest—the fastest learner."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Learning Pillars */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">The Four Pillars</h2>
            <p className="text-white/50">Different modes for different contexts. All essential.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {learningPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                  <span className="text-xs px-2 py-1 rounded-full bg-white/[0.06] text-white/50">
                    {pillar.time}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{pillar.title}</h3>
                <p className="text-white/50 mb-4 leading-relaxed">{pillar.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.examples.map((example) => (
                    <span
                      key={example}
                      className="text-xs px-2 py-1 rounded bg-white/[0.04] text-white/40"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Structure */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Daily Learning Structure</h2>
            <p className="text-white/50">Matching the format to the moment. No wasted time.</p>
          </motion.div>

          <div className="space-y-4">
            {dailyStructure.map((block, i) => (
              <motion.div
                key={block.time}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="sm:w-40 shrink-0">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-mono text-white/60">{block.time}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-white">{block.activity}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                      {block.format}
                    </span>
                  </div>
                  <p className="text-sm text-white/50">{block.notes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Note-Taking System */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-6 h-6 text-violet-400" />
              <h2 className="text-3xl font-bold">The Note-Taking System</h2>
            </div>
            <p className="text-white/50">
              Capture → Process → Connect → Apply. Learning without notes is entertainment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {noteTakingSystem.map((step, i) => (
              <motion.div
                key={step.step}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="text-2xl font-bold text-violet-400 mb-2">{step.step}</div>
                <p className="text-white/70 mb-3">{step.description}</p>
                <div className="text-xs text-white/40 flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  {step.tool}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold">Learning Principles</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {learningPrinciples.map((principle, i) => (
                <motion.div
                  key={principle}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="text-white/70">{principle}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Stack */}
      <section className="relative py-16 px-4 sm:px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20"
          >
            <Brain className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-4">Current Learning Stack</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-cyan-400 font-medium mb-2">Now Reading</p>
                <p className="text-white/60">The AI Architect's Handbook, Designing Data-Intensive Applications</p>
              </div>
              <div>
                <p className="text-cyan-400 font-medium mb-2">Podcasts</p>
                <p className="text-white/60">Huberman Lab, Lex Fridman, Latent Space, All-In</p>
              </div>
              <div>
                <p className="text-cyan-400 font-medium mb-2">Courses</p>
                <p className="text-white/60">Oracle AI certifications, Stanford NLP, Fast.ai</p>
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
            <Download className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Get the Learning Ritual Card</h2>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              A printable guide with the daily structure and note-taking system.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 bg-cyan-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-cyan-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Link>
              <Link
                href="/rituals/ai-practice"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 transition-colors"
              >
                Next: AI Practices
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
            className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 text-center"
          >
            <p className="text-white/60 mb-2">This practice is explored in depth in</p>
            <Link
              href="/golden-age"
              className="text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              The Golden Age of Creators → Chapter 4: The Learning Machine
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
