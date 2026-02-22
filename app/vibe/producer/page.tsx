'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Music,
  Zap,
  Brain,
  Sparkles,
  ChevronRight,
  Headphones,
  BookOpen,
  Shield,
  Lightbulb,
} from 'lucide-react'
import type { Metadata } from 'next'

// Premium background
function ProducerBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />

      {/* Gradient orbs - purple/cyan theme */}
      <motion.div
        className="absolute -right-80 top-20 h-[700px] w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(171,71,199,0.06) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-60 bottom-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(67,191,227,0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

const brainStates = [
  {
    name: 'Alpha',
    frequency: '8-12 Hz',
    use: 'Relaxed focus (reading, light creative)',
    bpm: '60-80',
    key: 'Ambient pads',
    mood: 'Calm, clear',
    color: 'emerald',
  },
  {
    name: 'Beta',
    frequency: '12-30 Hz',
    use: 'Active focus (deep work, coding)',
    bpm: '120-140',
    key: 'D Dorian',
    mood: 'Technical, driven',
    color: 'cyan',
  },
  {
    name: 'Theta',
    frequency: '4-8 Hz',
    use: 'Creative flow (brainstorming, ideation)',
    bpm: '80-100',
    key: 'C Major / A Major',
    mood: 'Uplifting, organic',
    color: 'violet',
  },
  {
    name: 'Delta',
    frequency: '0.5-4 Hz',
    use: 'Deep sleep, recovery',
    bpm: '50-70',
    key: 'A Minor / F Major',
    mood: 'Meditative, rest',
    color: 'indigo',
  },
]

const workflows = [
  {
    id: 'deep-work',
    title: 'Deep Work Session Music',
    description: 'Focus-enhancing music for coding, writing, technical work',
    bpm: '120-140',
    key: 'D Dorian',
    instrumentation: 'Electronic beats, ambient pads, no vocals',
    useCase: 'Development, design sprints, technical writing',
    prompt:
      'Electronic ambient, 128 BPM, D Dorian, layered synthesizers, subtle hi-hats, no vocals, focus-enhancing, clean production',
    icon: Zap,
    color: 'cyan',
  },
  {
    id: 'creative-flow',
    title: 'Creative Flow State Music',
    description: 'Music for brainstorming, sketching, and creative ideation',
    bpm: '80-100',
    key: 'C Major / A Major',
    instrumentation: 'Acoustic elements, warm Rhodes, light percussion',
    useCase: 'Brainstorming, prototyping, ideation sessions',
    prompt:
      'Acoustic indie, 92 BPM, C Major, fingerpicked guitar, warm Rhodes piano, light percussion, uplifting, organic production',
    icon: Lightbulb,
    color: 'amber',
  },
  {
    id: 'recovery',
    title: 'Recovery & Rest Music',
    description: 'Calming music for breaks, meditation, and deep rest',
    bpm: '50-70',
    key: 'A Minor / F Major',
    instrumentation: 'Sustained pads, strings, nature sounds',
    useCase: 'Break time, meditation, sleep preparation',
    prompt:
      'Ambient drone, 60 BPM, A Minor, sustained pad textures, distant bells, nature sounds, meditative, slow-moving harmonies',
    icon: Brain,
    color: 'violet',
  },
]

const promptFormula = [
  { step: 'Genre/Style', example: 'electronic, synthwave, indie rock, ambient' },
  { step: 'Tempo/Energy', example: '128 BPM, driving, peaceful, cinematic' },
  { step: 'Instruments', example: 'clean electric guitar, tight snare, layered synths' },
  { step: 'Vocal Style', example: 'ethereal soprano, whispered intimate, no vocals' },
  { step: 'Mood/Emotion', example: 'melancholic, triumphant, euphoric, introspective' },
  {
    step: 'Special Elements',
    example: '528Hz healing frequency, lo-fi vinyl crackle, binaural beats',
  },
]

export default function MusicProducerPage() {
  return (
    <>
      <ProducerBackground />
      <main id="main" className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                <Music className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Free Beta
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Music Producer
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                Suno AI Prompt Engineering
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl"
            >
              Generate professional-quality music matched to your creative state. Get Suno prompts
              engineered for deep focus, creative flow, and recovery — with specific BPM, key, and
              instrumentation recommendations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/vibe"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                Start Creating
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/vibe"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-medium text-white transition-colors hover:border-slate-400 hover:bg-slate-400/5"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Brain State Reference */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Your Brain States</h2>
              <p className="text-slate-400">
                Different brainwave frequencies require different music. Match your music to your
                mental state.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {brainStates.map((state, i) => {
                const colors: Record<string, string> = {
                  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
                  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
                  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
                  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
                }

                return (
                  <motion.div
                    key={state.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-xl border ${colors[state.color]} bg-white/[0.02]`}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{state.name}</h3>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div>
                        <span className="text-slate-500">Frequency:</span> {state.frequency}
                      </div>
                      <div>
                        <span className="text-slate-500">BPM:</span> {state.bpm}
                      </div>
                      <div>
                        <span className="text-slate-500">Key:</span> {state.key}
                      </div>
                      <div>
                        <span className="text-slate-500">Use:</span> {state.use}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Three Workflows */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white">Three Core Workflows</h2>
              <p className="text-slate-400 mt-2">
                Pre-engineered Suno prompts for your most common creative states
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {workflows.map((workflow, i) => {
                const Icon = workflow.icon
                const colorMap: Record<string, string> = {
                  cyan: 'bg-cyan-500/10 border-cyan-500/20',
                  amber: 'bg-amber-500/10 border-amber-500/20',
                  violet: 'bg-violet-500/10 border-violet-500/20',
                }

                return (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-xl border ${colorMap[workflow.color]} bg-white/[0.02]`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Icon className="h-5 w-5 text-white flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{workflow.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{workflow.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 py-6 border-y border-white/5">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500">BPM:</span> {workflow.bpm}
                        </div>
                        <div>
                          <span className="text-slate-500">Key:</span> {workflow.key}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs">Instruments:</span>
                        <p className="text-slate-300 text-xs mt-1">{workflow.instrumentation}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs">Perfect for:</span>
                        <p className="text-slate-300 text-xs mt-1">{workflow.useCase}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-xs text-slate-500 mb-2">Example Suno Prompt:</p>
                      <p className="text-sm text-slate-200 font-mono">{workflow.prompt}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Prompt Engineering Formula */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white">The 6-Part Prompt Formula</h2>
              <p className="text-slate-400 mt-2">
                Every effective Suno prompt has these elements. Master this structure and you can
                create any vibe.
              </p>
            </motion.div>

            <div className="space-y-4">
              {promptFormula.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.step}</h4>
                      <p className="text-sm text-slate-400 mt-1">{item.example}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources & Links */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white">Learn & Go Deeper</h2>
              <p className="text-slate-400 mt-2">Guides and resources to master Suno AI</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'The Complete Suno Prompt Engineering Guide',
                  desc: '6-part prompt anatomy + 500+ genre templates',
                  href: '/blog/suno-prompt-engineering-complete-guide',
                  icon: BookOpen,
                },
                {
                  title: 'Suno Music Production Workflow',
                  desc: 'Emotion mapping → generation → post-production',
                  href: '/blog/suno-music-production-workflow',
                  icon: Sparkles,
                },
                {
                  title: 'The Science of State-Change Music',
                  desc: 'How BPM, keys, and frequency affect your brain',
                  href: '/blog/science-of-state-change-music',
                  icon: Brain,
                },
                {
                  title: 'Music as Consciousness Technology',
                  desc: "Frank's journey with 12,000+ AI songs",
                  href: '/blog/music-as-consciousness-technology',
                  icon: Headphones,
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={item.href}>
                      <div className="group p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-start gap-3 mb-3">
                          <Icon className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
                          <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing & CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Part of Vibe OS
              </span>

              <h2 className="text-3xl font-bold text-white mb-4">Ready to start?</h2>
              <p className="text-slate-400 mb-8">
                Free tier: 10 prompts/day. Upgrade to Vibe Club for unlimited creation + advanced
                features.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/vibe"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
                >
                  Try Music Producer
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products/vibe-os"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-8 py-3 font-medium text-white transition-colors hover:border-slate-400 hover:bg-slate-400/5"
                >
                  Explore Vibe OS
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
