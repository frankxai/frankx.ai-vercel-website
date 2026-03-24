'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Music2,
  Wand2,
  Waves,
  Star,
  Lock,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Compass,
  Users,
  Sparkles,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const agents = [
  {
    name: 'Music Producer',
    icon: Music2,
    accent: '#AB47C7',
    description: 'Suno AI prompt engineering',
    status: 'live' as const,
    remaining: 10,
    cta: 'Launch Agent',
    href: '/vibe/producer',
    locked: false,
    disabledTooltip: null,
  },
  {
    name: 'Creation Engine',
    icon: Wand2,
    accent: '#43BFE3',
    description: 'SEO-optimized content creation',
    status: 'live' as const,
    remaining: 5,
    cta: 'Launch Agent',
    href: '#',
    locked: false,
    disabledTooltip: 'Coming soon',
  },
  {
    name: 'Frequency Alchemist',
    icon: Waves,
    accent: '#10B981',
    description: 'Neuro-acoustic engineering',
    status: 'locked' as const,
    remaining: 0,
    cta: 'Upgrade to Unlock',
    href: '/products/vibe-os#pricing',
    locked: true,
    lockLabel: 'Vibe Club required',
    disabledTooltip: null,
  },
  {
    name: 'Starlight Architect',
    icon: Star,
    accent: '#F59E0B',
    description: 'Multi-agent system design',
    status: 'locked' as const,
    remaining: 0,
    cta: 'Go Pro',
    href: '/products/vibe-os#pricing',
    locked: true,
    lockLabel: 'Pro tier required',
    disabledTooltip: null,
  },
] as const

type TabKey = 'deep-work' | 'creative-flow' | 'recovery' | 'performance' | 'commercial'

interface Prompt {
  title: string
  bpm: number
  key: string
  genre: string
  sunoPrompt: string
}

const promptTabs: { key: TabKey; label: string }[] = [
  { key: 'deep-work', label: 'Deep Work' },
  { key: 'creative-flow', label: 'Creative Flow' },
  { key: 'recovery', label: 'Recovery' },
  { key: 'performance', label: 'Performance' },
  { key: 'commercial', label: 'Commercial' },
]

const prompts: Record<TabKey, Prompt[]> = {
  'deep-work': [
    {
      title: 'Coding Focus',
      bpm: 128,
      key: 'D Dorian',
      genre: 'Minimal Techno',
      sunoPrompt:
        'Minimal techno, 128 BPM, D Dorian mode, hypnotic arpeggios, crisp hi-hats, deep sub-bass pulse, no vocals, clean mix, focus-inducing atmosphere',
    },
    {
      title: 'Writing Flow',
      bpm: 72,
      key: 'C Major',
      genre: 'Acoustic Fingerpicking',
      sunoPrompt:
        'Acoustic fingerpicking guitar, 72 BPM, C major, warm intimate recording, gentle reverb, no percussion, calming and contemplative, perfect for writing',
    },
    {
      title: 'Design Sprint',
      bpm: 110,
      key: 'G Mixolydian',
      genre: 'Electronic Ambient',
      sunoPrompt:
        'Electronic ambient, 110 BPM, G Mixolydian, shimmering pads, soft clicks, wide stereo field, creative energy, modern production, no vocals',
    },
    {
      title: 'System Architecture',
      bpm: 92,
      key: 'E Minor',
      genre: 'Cinematic Drones',
      sunoPrompt:
        'Cinematic drones, 92 BPM, E minor, evolving textures, deep rumble, ethereal atmosphere, dark and contemplative, orchestral undertones, no vocals',
    },
  ],
  'creative-flow': [
    {
      title: 'Brainstorming',
      bpm: 88,
      key: 'F Major',
      genre: 'World Fusion',
      sunoPrompt:
        'World fusion, 88 BPM, F major, kalimba melody, light bongos, flute accents, uplifting energy, organic textures, no vocals',
    },
    {
      title: 'Sketching Session',
      bpm: 76,
      key: 'D Major',
      genre: 'Warm Rhodes',
      sunoPrompt:
        'Warm Rhodes piano, 76 BPM, D major, gentle chord progression, subtle vinyl crackle, soft bass, lo-fi warmth, relaxing creative vibe, no vocals',
    },
    {
      title: 'Prototype Building',
      bpm: 104,
      key: 'A Dorian',
      genre: 'Organic Electronica',
      sunoPrompt:
        'Organic electronica, 104 BPM, A Dorian, plucked synth leads, nature samples, groovy bassline, head-nodding rhythm, inventive and fresh, no vocals',
    },
    {
      title: 'Visual Design',
      bpm: 96,
      key: 'G Major',
      genre: 'Ambient Textures',
      sunoPrompt:
        'Ambient textures, 96 BPM, G major, granular synthesis, soft pads, delicate bell tones, airy and spacious, modern aesthetic, no vocals',
    },
  ],
  recovery: [
    {
      title: 'Power Nap',
      bpm: 60,
      key: 'A Minor',
      genre: 'Delta Waves',
      sunoPrompt:
        'Delta wave meditation, 60 BPM, A minor, deep drone, binaural beat overlay, extremely soft, sleep-inducing, gentle fade in, no percussion, no vocals',
    },
    {
      title: 'Meditation',
      bpm: 55,
      key: 'D Minor',
      genre: 'Binaural 10 Hz',
      sunoPrompt:
        'Binaural beats 10 Hz alpha wave, 55 BPM, D minor, singing bowls, slow evolving pads, mindfulness meditation soundtrack, deeply calming, no vocals',
    },
    {
      title: 'Deep Sleep',
      bpm: 50,
      key: 'C Minor',
      genre: 'Theta Waves',
      sunoPrompt:
        'Theta wave ambient, 50 BPM, C minor, ultra-slow pads, sub-bass warmth, rain texture, deep sleep induction, minimal movement, no vocals',
    },
    {
      title: 'Mindful Break',
      bpm: 64,
      key: 'G Major',
      genre: 'Acoustic Guitar',
      sunoPrompt:
        'Solo acoustic guitar, 64 BPM, G major, gentle fingerpicking, warm tone, close-mic recording, peaceful and grounding, mindful breathing pace, no vocals',
    },
  ],
  performance: [
    {
      title: 'Cardio Workout',
      bpm: 140,
      key: 'E Minor',
      genre: 'EDM Energy',
      sunoPrompt:
        'High energy EDM, 140 BPM, E minor, massive drops, driving four-on-the-floor, festival energy, powerful synth leads, motivational intensity, no vocals',
    },
    {
      title: 'Strength Training',
      bpm: 132,
      key: 'A Minor',
      genre: 'Trap Beats',
      sunoPrompt:
        'Hard trap beats, 132 BPM, A minor, 808 bass, aggressive hi-hats, dark atmosphere, powerful and raw, gym motivation, no vocals',
    },
    {
      title: 'HIIT Sprint',
      bpm: 150,
      key: 'D Minor',
      genre: 'Aggressive Techno',
      sunoPrompt:
        'Aggressive techno, 150 BPM, D minor, distorted kicks, relentless energy, industrial textures, peak intensity workout fuel, no vocals',
    },
    {
      title: 'Endurance Run',
      bpm: 135,
      key: 'C Major',
      genre: 'Progressive House',
      sunoPrompt:
        'Progressive house, 135 BPM, C major, uplifting melody, building energy, euphoric breakdown, steady groove for long runs, no vocals',
    },
  ],
  commercial: [
    {
      title: 'Podcast Intro',
      bpm: 120,
      key: 'G Major',
      genre: 'Professional Broadcast',
      sunoPrompt:
        'Professional broadcast music, 120 BPM, G major, confident and modern, clean production, short 15-second intro, brand-friendly, corporate energy, no vocals',
    },
    {
      title: 'TikTok Hook',
      bpm: 140,
      key: 'A Minor',
      genre: 'Modern Trap',
      sunoPrompt:
        'Modern trap, 140 BPM, A minor, catchy melody hook, punchy 808s, viral energy, attention-grabbing first 3 seconds, social media optimized, no vocals',
    },
    {
      title: 'YouTube Background',
      bpm: 100,
      key: 'C Major',
      genre: 'Lo-Fi Hip Hop',
      sunoPrompt:
        'Lo-fi hip hop, 100 BPM, C major, dusty vinyl texture, mellow keys, head-nod groove, non-distracting background music, content creator friendly, no vocals',
    },
    {
      title: 'Brand Anthem',
      bpm: 115,
      key: 'D Major',
      genre: 'Cinematic Pop',
      sunoPrompt:
        'Cinematic pop, 115 BPM, D major, inspiring piano intro, building orchestral layers, triumphant climax, brand anthem energy, premium feel, no vocals',
    },
  ],
}

const rubric = [
  {
    category: 'Composition',
    points: 5,
    color: 'cyan',
    criteria: [
      'Melodic Coherence',
      'Harmonic Sophistication',
      'Rhythmic Consistency',
      'Structural Flow',
      'Genre Authenticity',
    ],
  },
  {
    category: 'Production',
    points: 5,
    color: 'violet',
    criteria: [
      'Mix Balance',
      'Frequency Response',
      'Dynamic Range',
      'Stereo Imaging',
      'Master Quality',
    ],
  },
  {
    category: 'Flow State',
    points: 3,
    color: 'emerald',
    criteria: ['Attention Sustainability', 'Energy Consistency', 'Cognitive Load'],
  },
  {
    category: 'Commercial',
    points: 2,
    color: 'amber',
    criteria: ['Platform Optimization', 'Uniqueness Factor'],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function VibeOSAppPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('deep-work')
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  async function copyPrompt(prompt: string, id: string) {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedIndex(id)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = prompt
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedIndex(id)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const colorMap: Record<string, { bg: string; text: string; border: string; ring: string }> = {
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20',
      ring: 'ring-cyan-500/30',
    },
    violet: {
      bg: 'bg-violet-500/10',
      text: 'text-violet-400',
      border: 'border-violet-500/20',
      ring: 'ring-violet-500/30',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
      ring: 'ring-emerald-500/30',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
      ring: 'ring-amber-500/30',
    },
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.08),transparent_50%)]" />
      </div>

      {/* ============================================================ */}
      {/*  A. App Header Bar                                           */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111113]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Link
              href="/products/vibe-os"
              className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-bold tracking-tight text-white">Vibe OS</span>
              <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                Beta
              </span>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
              Free Tier
            </span>
            <Link
              href="/products/vibe-os#pricing"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ============================================================ */}
        {/*  B. Agent Dashboard                                          */}
        {/* ============================================================ */}
        <section className="mb-14">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/40">
            Agents
          </h2>
          <p className="mb-6 text-sm text-white/50">Launch an AI agent to start creating.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {agents.map((agent) => {
              const Icon = agent.icon
              const isDisabled = !!agent.disabledTooltip
              const isLocked = agent.locked

              return (
                <div
                  key={agent.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] transition-all hover:border-white/[0.15]"
                >
                  {/* Accent top border */}
                  <div
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ backgroundColor: agent.accent }}
                  />

                  {/* Locked overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0b]/70 backdrop-blur-[2px]">
                      <Lock className="mb-2 h-6 w-6 text-white/30" />
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
                        {'lockLabel' in agent ? agent.lockLabel : 'Locked'}
                      </span>
                    </div>
                  )}

                  <div className="relative p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${agent.accent}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: agent.accent }} />
                      </div>
                      {agent.status === 'live' && (
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                          </span>
                          <span className="text-xs font-medium text-emerald-400">Live</span>
                        </div>
                      )}
                    </div>

                    <h3 className="mb-1 text-base font-semibold text-white">{agent.name}</h3>
                    <p className="mb-4 text-sm text-white/50">{agent.description}</p>

                    {!isLocked && (
                      <p className="mb-4 text-xs text-white/30">
                        {agent.remaining} prompts remaining today
                      </p>
                    )}

                    <div className="relative">
                      {isLocked ? (
                        <Link
                          href={agent.href}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10"
                        >
                          {agent.cta}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : isDisabled ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setShowTooltip(agent.name)}
                          onMouseLeave={() => setShowTooltip(null)}
                        >
                          <button
                            disabled
                            className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white/30"
                            style={{ backgroundColor: `${agent.accent}10` }}
                          >
                            {agent.cta}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                          {showTooltip === agent.name && (
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                              {agent.disabledTooltip}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={agent.href}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                          style={{ backgroundColor: agent.accent }}
                        >
                          {agent.cta}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  C. Prompt Library                                           */}
        {/* ============================================================ */}
        <section className="mb-14">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/40">
            Prompt Library
          </h2>
          <p className="mb-6 text-sm text-white/50">
            Copy-paste Suno prompts, organized by use case.
          </p>

          {/* Tabs */}
          <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl bg-[#111113] p-1">
            {promptTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Prompt cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {prompts[activeTab].map((prompt, i) => {
              const isBlurred = i >= 2
              const id = `${activeTab}-${i}`
              return (
                <div key={id} className="relative">
                  {isBlurred && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#0a0a0b]/60 backdrop-blur-sm">
                      <Lock className="mb-2 h-5 w-5 text-white/30" />
                      <Link
                        href="/products/vibe-os#pricing"
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
                      >
                        Upgrade to Vibe Club
                      </Link>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl border border-white/[0.08] bg-[#111113] p-4 transition-all ${
                      isBlurred ? 'select-none' : 'hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h4 className="text-sm font-semibold text-white">{prompt.title}</h4>
                      {!isBlurred && (
                        <button
                          onClick={() => copyPrompt(prompt.sunoPrompt, id)}
                          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white"
                        >
                          {copiedIndex === id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy Prompt
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                        {prompt.bpm} BPM
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                        {prompt.key}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                        {prompt.genre}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/30">
                      {prompt.sunoPrompt}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  D. Quality Validation (15-Point Rubric)                     */}
        {/* ============================================================ */}
        <section className="mb-14">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/40">
            Quality Validation
          </h2>
          <p className="mb-6 text-sm text-white/50">
            Every track scored against a 15-point rubric before release.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {rubric.map((block) => {
              const c = colorMap[block.color]
              return (
                <div
                  key={block.category}
                  className={`rounded-2xl border ${c.border} bg-[#111113] p-5`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className={`text-sm font-semibold ${c.text}`}>{block.category}</h3>
                    <span
                      className={`rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-bold ${c.text}`}
                    >
                      {block.points} pts
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {block.criteria.map((criterion, idx) => (
                      <li key={criterion} className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {Array.from({ length: block.points }).map((_, j) => (
                            <div
                              key={j}
                              className={`h-1.5 w-3 rounded-full ${
                                j <= idx && idx < block.criteria.length
                                  ? c.bg.replace('/10', '/40')
                                  : 'bg-white/5'
                              }`}
                              style={
                                j <= idx
                                  ? {
                                      backgroundColor:
                                        block.color === 'cyan'
                                          ? 'rgba(6,182,212,0.4)'
                                          : block.color === 'violet'
                                            ? 'rgba(139,92,246,0.4)'
                                            : block.color === 'emerald'
                                              ? 'rgba(16,185,129,0.4)'
                                              : 'rgba(245,158,11,0.4)',
                                    }
                                  : undefined
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-white/50">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Download the full rubric template
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  E. Resources & Quick Links                                  */}
        {/* ============================================================ */}
        <section className="mb-14">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/40">
            Resources
          </h2>
          <p className="mb-6 text-sm text-white/50">Guides, ecosystem, and community.</p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: 'Read the Full Guide',
                description: 'In-depth walkthrough of the Vibe OS platform and methodology.',
                href: '/blog/vibe-os-platform-introduction',
              },
              {
                icon: Compass,
                title: 'Explore the Ecosystem',
                description: 'Agents, prompt packs, and integrations in the Vibe universe.',
                href: '/vibe',
              },
              {
                icon: Users,
                title: 'Join the Community',
                description: 'Connect with creators, share prompts, and get early access.',
                href: '/newsletter',
              },
            ].map((link) => {
              const LinkIcon = link.icon
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group rounded-2xl border border-white/[0.08] bg-[#111113] p-5 transition-all hover:border-white/[0.15]"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
                    <LinkIcon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/40">{link.description}</p>
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/*  F. Tier Status Bar (sticky bottom on mobile)                 */}
      {/* ============================================================ */}
      <div className="sticky bottom-0 z-40 border-t border-white/[0.08] bg-[#111113]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-xs text-white/40 sm:text-sm">
            <span className="font-medium text-white/60">Free Tier</span>
            <span className="mx-2 hidden text-white/20 sm:inline">|</span>
            <span className="hidden sm:inline">10 prompts/day</span>
          </p>
          <Link
            href="/products/vibe-os#pricing"
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 transition-colors hover:text-cyan-300 sm:text-sm"
          >
            Upgrade to Vibe Club — $19/mo
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  )
}
