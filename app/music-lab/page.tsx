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
  BookOpen,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react'
import { useState } from 'react'

// ============================================================================
// BACKGROUND
// ============================================================================

function MusicLabBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-void" />
      
      {/* Enhanced Aurora Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-purple-950/20" />
      
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
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
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8 backdrop-blur-sm">
              <Music2 className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">AI Music Creation</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-white">Create music with</span>
              <br />
              <span className="font-serif-italic bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">artificial intelligence</span>
            </h1>

            <p className="text-xl text-white/50 mb-10 max-w-lg leading-relaxed font-light">
              From idea to finished song in minutes. Learn how to use Suno AI
              to create professional-quality music—no instruments or production
              experience required.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products/vibe-os"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1"
              >
                <Sparkles className="w-5 h-5" />
                Explore Vibe OS
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://suno.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/10"
              >
                Try Suno Free
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right - Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-[2rem] blur-2xl" />
              
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
                {/* Simulated Player UI */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-xs text-white/30 font-mono">Suno AI Session</div>
                </div>
                
                <div className="relative aspect-video bg-black/50">
                   <iframe
                    src="https://suno.com/embed/9cbad174-9276-427f-9aed-1ba00c7db3db"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; clipboard-write"
                  />
                </div>
                
                <div className="p-6 bg-white/[0.02]">
                  <div className="flex items-center gap-4 text-sm text-white/40 font-mono">
                    <span className="text-green-400">● Generating</span>
                    <span>v3_master_final.wav</span>
                    <span className="ml-auto">03:42</span>
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
// WHAT IS AI MUSIC
// ============================================================================

function WhatIsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            What is AI music creation?
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
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
              color: 'text-pink-400',
              bg: 'bg-pink-500/10'
            },
            {
              icon: Layers,
              title: 'No technical skills needed',
              description: 'If you can describe music in words, you can create it. No DAW, no instruments, no music theory required.',
              color: 'text-purple-400',
              bg: 'bg-purple-500/10'
            },
            {
              icon: Target,
              title: 'Commercial-ready output',
              description: 'Modern AI music tools produce release-quality audio you can actually use for content, products, or personal enjoyment.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/10'
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium p-8 rounded-3xl group hover:-translate-y-1 transition-transform"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.description}</p>
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            How to get started
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Create your first AI-generated song in under 5 minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 p-8 rounded-3xl bg-void/50 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="flex-shrink-0">
                <span className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600 opacity-50">{step.number}</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 mb-6 leading-relaxed">{step.description}</p>
                {step.action && (
                  step.action.external ? (
                    <a
                      href={step.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-medium"
                    >
                      {step.action.label}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={step.action.href}
                      className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-medium"
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

function PromptCard({ example }: { example: any }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(example.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-premium p-6 rounded-2xl group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-lg font-bold text-white">{example.genre}</span>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-white/40">{example.useCase}</span>
      </div>
      <div className="relative">
        <p className="text-sm text-white/70 font-mono bg-black/30 rounded-xl p-4 mb-4 leading-relaxed border border-white/5">
          {example.prompt}
        </p>
      </div>
      <button
        onClick={copyToClipboard}
        className="w-full py-3 rounded-xl border border-white/10 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy Prompt
          </>
        )}
      </button>
    </motion.div>
  )
}

function PromptExamplesSection() {
  const examples = [
    {
      genre: 'Lo-Fi Chill',
      prompt: '[Lo-Fi Hip Hop, Chill, Relaxed] Dusty vinyl crackle, mellow keys, jazzy chords, soft drums, cozy late night vibes',
      useCase: 'Study music',
    },
    {
      genre: 'Epic Cinematic',
      prompt: '[Orchestral, Epic, Powerful] Sweeping strings, heroic brass, thundering drums, film score quality',
      useCase: 'Trailers',
    },
    {
      genre: 'Ambient Electronic',
      prompt: '[Ambient, Ethereal, Dreamy] Floating synth pads, gentle pulse, atmospheric textures, meditative',
      useCase: 'Focus',
    },
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <BookOpen className="w-4 h-4 text-white/60" />
            <span className="text-xs font-medium text-white/60">Cheat Sheet</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Prompt examples
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Copy these prompts into Suno to create different styles of music.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example) => (
            <PromptCard key={example.genre} example={example} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/prompt-library?category=music-creation"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
          >
            Browse all music prompts
            <ArrowRight className="w-4 h-4" />
          </Link>
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
    <section className="py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Go Deeper</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to master AI music creation?
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Vibe OS is a complete system for creating transformative music with AI.
            Prompt templates, workflows, and techniques refined over 500+ songs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5" />
              Explore Vibe OS
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/10"
            >
              <Music className="w-5 h-5" />
              Hear Frank's Music
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
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
    <main className="relative min-h-screen text-white grain-overlay">
      <MusicLabBackground />

      <div className="relative z-10">
        <HeroSection />
        <WhatIsSection />
        <GetStartedSection />
        <PromptExamplesSection />
        <CTASection />
      </div>
    </main>
  )
}
