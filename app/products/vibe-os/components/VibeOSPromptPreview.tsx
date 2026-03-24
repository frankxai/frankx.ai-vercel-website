'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Film, TrendingUp, Moon } from 'lucide-react'

const tabs = [
  {
    id: 'deep-focus',
    label: 'Deep Focus',
    icon: Music,
    color: 'emerald',
    title: 'Coding Flow State',
    bpm: 128,
    key: 'D Dorian',
    genre: 'Minimal Techno',
    prompt:
      'Create a binaural beat-enhanced ambient track at 40Hz gamma frequency with subtle rhythmic elements synced to optimal cognitive processing cycles. Build gradually over 8 minutes with consistent energy, no jarring transitions. Layer natural sounds beneath electronic tones. Optimize for deep focus coding sessions — minimal vocal distractions, pentatonic melodic content.',
    tags: ['Coding', 'Deep Work', 'Gamma Waves'],
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    icon: Film,
    color: 'violet',
    title: 'Epic Orchestral Build',
    bpm: 92,
    key: 'E Minor',
    genre: 'Cinematic Orchestral',
    prompt:
      'Create an epic orchestral piece with Hans Zimmer-style build-ups for creative work sessions. Begin with solo piano, gradually add strings, brass, and subtle electronic elements. Use Circle of Fifths progression for emotional impact. Three distinct movement phases across 8 minutes — contemplative opening, rising tension, triumphant resolution.',
    tags: ['Cinematic', 'Orchestral', 'Creative Sessions'],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    icon: TrendingUp,
    color: 'amber',
    title: 'TikTok Hook Track',
    bpm: 140,
    key: 'A Minor',
    genre: 'Modern Trap',
    prompt:
      'Generate 15, 30, and 60-second versions of an engaging background track for Instagram Reels and TikTok. Modern trap-influenced beats, catchy melodic hooks, strategic energy peaks for maximum engagement. Optimize for mobile phone speakers. Include beat drop at 0:03 for hook retention. High energy, loop-friendly ending.',
    tags: ['Social Media', 'Commercial', 'Short-Form'],
  },
  {
    id: 'recovery',
    label: 'Recovery',
    icon: Moon,
    color: 'cyan',
    title: 'Deep Sleep Theta',
    bpm: 55,
    key: 'D Minor',
    genre: 'Ambient / Binaural',
    prompt:
      'Create a 10-minute binaural beat track targeting Theta wave entrainment (4-8 Hz). Layer soft drone pads in D minor with slow filter sweeps. Include gentle rain and distant thunder at 10% volume. No rhythmic elements — pure tonal drift. Gradual frequency descent from 8Hz to 4Hz over the track duration for sleep onset optimization.',
    tags: ['Sleep', 'Theta Waves', 'Recovery'],
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; activeBg: string; glow: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    activeBg: 'bg-emerald-500/20',
    glow: 'shadow-emerald-500/20',
  },
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    activeBg: 'bg-violet-500/20',
    glow: 'shadow-violet-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    activeBg: 'bg-amber-500/20',
    glow: 'shadow-amber-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    activeBg: 'bg-cyan-500/20',
    glow: 'shadow-cyan-500/20',
  },
}

export default function VibeOSPromptPreview() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = tabs[activeTab]
  const colors = colorMap[tab.color]

  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-space to-void" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wider text-white/60 uppercase">
            See What You Get
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Real Prompts. Real Results.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-white/50"
        >
          Every prompt is engineered with specific BPM, key, genre, and production notes.
          Here&apos;s what the library looks like.
        </motion.p>

        {/* Tab Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-1">
            {tabs.map((t, i) => {
              const Icon = t.icon
              const isActive = activeTab === i
              const tc = colorMap[t.color]
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? `${tc.activeBg} ${tc.text}`
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="prompt-tab-indicator"
                      className={`absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-8 rounded-full ${tc.text.replace('text-', 'bg-')}`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Prompt Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden rounded-2xl border ${colors.border} bg-space shadow-lg ${colors.glow}`}
          >
            {/* Card Header */}
            <div className="border-b border-white/5 px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{tab.title}</h3>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`inline-flex items-center rounded-md border ${colors.border} ${colors.bg} px-2.5 py-1 text-xs font-medium ${colors.text}`}>
                  {tab.bpm} BPM
                </span>
                <span className={`inline-flex items-center rounded-md border ${colors.border} ${colors.bg} px-2.5 py-1 text-xs font-medium ${colors.text}`}>
                  {tab.key}
                </span>
                <span className={`inline-flex items-center rounded-md border ${colors.border} ${colors.bg} px-2.5 py-1 text-xs font-medium ${colors.text}`}>
                  {tab.genre}
                </span>
              </div>
            </div>

            {/* Prompt Body */}
            <div className="px-6 py-5">
              <div className="rounded-lg border border-white/5 bg-void p-4">
                <p className="font-mono text-sm leading-relaxed text-white/70">
                  {tab.prompt}
                </p>
              </div>
            </div>

            {/* Tags Footer */}
            <div className="border-t border-white/5 px-6 py-4">
              <div className="flex flex-wrap gap-2">
                {tab.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Call-out */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-white/40"
        >
          <span className="font-semibold text-white/60">50+ prompts</span> like this in the full library.
          Free tier includes <span className="font-semibold text-white/60">10 prompts/day</span>.
        </motion.p>
      </div>
    </section>
  )
}
