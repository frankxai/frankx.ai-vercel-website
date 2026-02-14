'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play,
  ExternalLink,
  Music2,
  Sparkles,
  ArrowRight,
  Wand2,
  Zap,
  Headphones,
  Music,
  FileAudio,
  Layers,
  Target,
  CircleDot,
  Radio,
  BookOpen,
  ArrowUpRight,
  Download,
} from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'

// ============================================================================
// BACKGROUND
// ============================================================================

function MusicLabBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />

      <motion.div
        className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ============================================================================
// HERO
// ============================================================================

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8">
              <Music2 className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">AI Music Creation</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              <span className="text-white">Create music with</span>
              <br />
              <span className="font-serif-italic text-white/80">artificial intelligence</span>
            </h1>

            <p className="text-xl text-white/50 mb-8 max-w-lg leading-relaxed">
              From idea to finished song in minutes. Learn how to use Suno AI
              to create professional-quality music—no instruments or production
              experience required.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products/vibe-os"
                className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Sparkles className="w-5 h-5" />
                Explore Vibe OS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://suno.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all hover:bg-white/5"
              >
                Try Suno Free
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/20 via-violet-500/10 to-cyan-500/20 blur-3xl" />

              <div className="absolute inset-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Wand2 className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Describe your song</p>
                      <p className="text-white/40 text-sm">Genre, mood, lyrics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">AI generates music</p>
                      <p className="text-white/40 text-sm">Full production in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Download & share</p>
                      <p className="text-white/40 text-sm">Own your creations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PLAY INSTRUMENTS
// ============================================================================

const instruments = [
  {
    name: 'Grand Piano',
    description: 'Real Yamaha C5 concert grand recordings. Velocity-sensitive touch, sustain pedal, stereo imaging.',
    href: '/music-lab/piano',
    color: 'from-cyan-500/15 to-blue-600/10',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-400/30',
    icon: Music,
    tag: 'Salamander V3',
  },
  {
    name: 'Tropical Pads',
    description: '16-pad DJ controller with marimba, steel drums, pluck synths and more. Kygo-style tropical house.',
    href: '/music-lab/dj-pads',
    color: 'from-rose-500/15 to-pink-600/10',
    accent: 'text-rose-400',
    border: 'border-rose-500/20 hover:border-rose-400/30',
    icon: Layers,
    tag: '16 Pads',
  },
  {
    name: 'Hang Drum',
    description: 'Virtual handpan in D Kurd scale. Ethereal, meditative tones with Helmholtz resonance. 9 tone fields.',
    href: '/music-lab/hang',
    color: 'from-amber-500/15 to-orange-600/10',
    accent: 'text-amber-400',
    border: 'border-amber-500/20 hover:border-amber-400/30',
    icon: CircleDot,
    tag: 'Handpan',
  },
  {
    name: 'Singing Bowls',
    description: 'All 9 Solfeggio frequencies as singing bowls. Authentic beating resonance for sound healing.',
    href: '/music-lab/singing-bowls',
    color: 'from-indigo-500/15 to-violet-600/10',
    accent: 'text-indigo-400',
    border: 'border-indigo-500/20 hover:border-indigo-400/30',
    icon: Radio,
    tag: 'Solfeggio',
  },
  {
    name: 'Xylophone for Kids',
    description: 'Rainbow pentatonic xylophone — every note sounds beautiful together. Designed for little hands.',
    href: '/music-lab/for-kids/xylophone',
    color: 'from-purple-500/15 to-violet-600/10',
    accent: 'text-purple-400',
    border: 'border-purple-500/20 hover:border-purple-400/30',
    icon: Sparkles,
    tag: 'For Kids',
  },
]

function InstrumentsSection() {
  return (
    <section className="py-20 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Play className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Play Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Browser instruments
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Play real instruments in your browser. No downloads, no accounts.
            Touch-optimized for iPad and iPhone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {instruments.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={inst.href}
                className={`block p-6 rounded-2xl bg-gradient-to-br ${inst.color} border ${inst.border} transition-all hover:shadow-lg group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center`}>
                    <inst.icon className={`w-5 h-5 ${inst.accent}`} />
                  </div>
                  <span className={`text-[10px] tracking-wider uppercase ${inst.accent} opacity-60`}>{inst.tag}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{inst.name}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{inst.description}</p>
                <span className={`inline-flex items-center gap-2 text-sm ${inst.accent} group-hover:gap-3 transition-all`}>
                  Play now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// WHAT IS AI MUSIC
// ============================================================================

function WhatIsSection() {
  return (
    <section className="py-24 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            What is AI music creation?
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Tools like Suno use artificial intelligence to generate complete songs
            from text descriptions. You describe what you want, and AI creates
            the music, vocals, and production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FileAudio,
              title: 'Full songs in minutes',
              description: 'Generate complete tracks with vocals, instruments, and professional mixing—not just loops or samples.',
            },
            {
              icon: Layers,
              title: 'No technical skills needed',
              description: 'If you can describe music in words, you can create it. No DAW, no instruments, no music theory required.',
            },
            {
              icon: Target,
              title: 'Commercial-ready output',
              description: 'Modern AI music tools produce release-quality audio you can actually use for content, products, or personal enjoyment.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/50">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// HOW TO GET STARTED
// ============================================================================

function GetStartedSection() {
  const steps = [
    {
      number: '01',
      title: 'Open Suno',
      description: 'Go to suno.com and create a free account. New users get 50 free credits to start.',
      action: { label: 'Open Suno', href: 'https://suno.com', external: true },
    },
    {
      number: '02',
      title: 'Describe your song',
      description: 'Enter a genre, mood, and optional lyrics. Example: "Uplifting electronic, 120bpm, about chasing dreams"',
      action: { label: 'See Prompt Examples', href: '/prompt-library?category=music-creation' },
    },
    {
      number: '03',
      title: 'Generate & iterate',
      description: 'Click Create and wait 30-60 seconds. Generate variations until you find what you love.',
    },
    {
      number: '04',
      title: 'Download & use',
      description: 'Download your MP3 or video. Use for content, share online, or build your music catalog.',
    },
  ]

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            How to get started
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Create your first AI-generated song in under 5 minutes.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <div className="flex-shrink-0">
                <span className="text-3xl font-bold text-pink-400/30">{step.number}</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/50 mb-4">{step.description}</p>
                {step.action && (
                  step.action.external ? (
                    <a
                      href={step.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      {step.action.label}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={step.action.href}
                      className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                    >
                      {step.action.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PROMPT EXAMPLES
// ============================================================================

function PromptExamplesSection() {
  const examples = [
    {
      genre: 'Lo-Fi Chill',
      prompt: '[Lo-Fi Hip Hop, Chill, Relaxed] Dusty vinyl crackle, mellow keys, jazzy chords, soft drums, cozy late night vibes',
      useCase: 'Study music, background audio',
    },
    {
      genre: 'Epic Cinematic',
      prompt: '[Orchestral, Epic, Powerful] Sweeping strings, heroic brass, thundering drums, film score quality',
      useCase: 'Video content, trailers',
    },
    {
      genre: 'Ambient Electronic',
      prompt: '[Ambient, Ethereal, Dreamy] Floating synth pads, gentle pulse, atmospheric textures, meditative',
      useCase: 'Focus music, meditation',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Prompt examples
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Copy these prompts into Suno to create different styles of music.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example, i) => (
            <motion.div
              key={example.genre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-white">{example.genre}</span>
                <span className="text-xs text-white/40">{example.useCase}</span>
              </div>
              <p className="text-sm text-white/60 font-mono bg-white/5 rounded-lg p-3 mb-4">
                {example.prompt}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(example.prompt)}
                className="w-full py-2 rounded-lg border border-white/10 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all"
              >
                Copy Prompt
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/prompt-library?category=music-creation"
            className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Browse all music prompts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FREE PROMPTS LEAD MAGNET
// ============================================================================

function FreePromptsSection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-violet-500/10 blur-3xl opacity-50" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white/[0.02] border border-emerald-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-300">Free Download</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  5 Prompts That Made My Best Suno Tracks
                </h2>

                <p className="text-white/50 mb-6 leading-relaxed">
                  The exact prompts behind 500+ plays. Each one includes a breakdown
                  of why it works and variations to try. Copy, paste, create.
                </p>

                <ul className="space-y-3 text-sm text-white/60 mb-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#10003;</span>
                    <span>5 real prompts from tracks with 77-142 plays each</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#10003;</span>
                    <span>Prompt engineering breakdown for each track</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#10003;</span>
                    <span>Power words cheat sheet and common mistakes</span>
                  </li>
                </ul>
              </div>

              <div>
                <EmailSignup
                  listType="music-lab"
                  placeholder="Your email"
                  buttonText="Get Free Prompts"
                  showName
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA - VIBE OS
// ============================================================================

function CTASection() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Go Deeper</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to master AI music creation?
          </h2>
          <p className="text-xl text-white/50 mb-8 max-w-2xl mx-auto">
            Vibe OS is a complete system for creating transformative music with AI.
            Prompt templates, workflows, and techniques refined over 500+ songs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Sparkles className="w-5 h-5" />
              Explore Vibe OS
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/5"
            >
              <Music className="w-5 h-5" />
              Hear Frank's Music
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-sm text-white/30 mt-8">
            Frank has created 500+ songs using Suno AI, exploring ambient,
            electronic, cinematic, and healing frequencies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN
// ============================================================================

export default function MusicLabPage() {
  return (
    <main className="relative min-h-screen text-white">
      <MusicLabBackground />

      <div className="relative z-10">
        <HeroSection />
        <InstrumentsSection />
        <WhatIsSection />
        <GetStartedSection />
        <PromptExamplesSection />
        <FreePromptsSection />
        <CTASection />
      </div>
    </main>
  )
}
