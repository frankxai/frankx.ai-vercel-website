'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Gamepad2,
  Sparkles,
  ArrowRight,
  Cpu,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Brain,
  Code,
  Layers,
  Music,
  Box,
  Target,
  Trophy,
  Puzzle,
  Swords,
  Dice1,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Server,
  Palette,
  Bot,
  ShieldAlert,
} from 'lucide-react'

// ============================================================================
// BACKGROUND
// ============================================================================

function GamesBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      <motion.div
        className="absolute top-0 -right-[20%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-[40%] left-[30%] w-[40%] h-[40%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
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
      {/* Hero background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/games/games-lab-hero.png"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/60 via-[#0a0a0b]/80 to-[#0a0a0b]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
              <Gamepad2 className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Games Lab</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              <span className="text-white">Browser games</span>
              <br />
              <span className="font-serif-italic text-white/80">built with AI</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Play games running entirely in your browser. Built with Next.js,
              AI-generated assets, and agentic development workflows. No downloads,
              no installs — just play.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/research/agentic-game-development"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/20 transition-all text-sm font-medium"
              >
                <Brain className="w-4 h-4" />
                Read the Research
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.06] transition-all text-sm font-medium"
              >
                <Music className="w-4 h-4" />
                Music Lab
              </Link>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '15x', label: 'WebGPU vs WebGL', icon: Zap, color: 'text-amber-400' },
              { value: '70%', label: 'Browser WebGPU support', icon: Globe, color: 'text-cyan-400' },
              { value: '87%', label: 'Devs using AI agents', icon: Bot, color: 'text-violet-400' },
              { value: '$0', label: 'App Store fees', icon: Trophy, color: 'text-emerald-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PLAY NOW - Featured Games
// ============================================================================

function PlayNowSection() {
  const games = [
    // --- 1. FrankX Cognitive Neuroscience Suite ---
    {
      title: 'NeuroMatrix: Dual N-Back',
      description: 'Scientifically proven Dual N-Back working memory and fluid IQ trainer with spatial grids and pitch cues.',
      href: '/games/neuro-matrix',
      badge: 'Cognitive IQ',
      color: 'amber',
      icon: Brain,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },
    {
      title: 'ChronoFocus: Stroop Warp',
      description: 'Hyper-speed Stroop interference reaction trainer testing executive inhibition and mental agility.',
      href: '/games/chrono-focus',
      badge: 'Speed Reflex',
      color: 'amber',
      icon: Zap,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },
    {
      title: 'Quantum Prime: Factor Fusion',
      description: 'Intuitive mental multiplication and prime factor fusion puzzle with particle chain reactions.',
      href: '/games/quantum-prime',
      badge: 'Mental Math',
      color: 'amber',
      icon: Target,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },
    {
      title: 'Resonance: Bio-Flow HRV',
      description: '4-7-8 guided breathing pacing with Solfeggio 432Hz/528Hz soundscapes for vagal tone coherence.',
      href: '/games/resonance-flow',
      badge: 'Zen Flow',
      color: 'amber',
      icon: Sparkles,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },
    {
      title: 'Synapse Surge: Memory Span',
      description: 'Sequential synaptic working span memory matrix with 16-node harmonic scale and accelerating intervals.',
      href: '/games/synapse-surge',
      badge: 'Memory Span',
      color: 'amber',
      icon: Zap,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },
    {
      title: 'Matrix Logic: Deductive Grid',
      description: 'Deductive Latin-Square mathematical energy grid balancing rows and columns to target energy values.',
      href: '/games/matrix-logic',
      badge: 'Deductive P-FIT',
      color: 'amber',
      icon: Puzzle,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },
    {
      title: 'Echo Shift: Task Switcher',
      description: 'Auditory-visual Stroop conflict switcher rapidly toggling between word meaning and ink color match.',
      href: '/games/echo-shift',
      badge: 'Task Switching',
      color: 'amber',
      icon: Sparkles,
      status: 'live' as const,
      brand: 'FrankX Mind',
    },

    // --- 2. 🇩🇪 Deutsche Denkspiele Suite ---
    {
      title: 'WortSchatz: Wort-Alchemie',
      description: 'Deutsches Silben-Rätsel & Wort-Alchemie: Bilde tiefgründige Komposita wie Gedankenblitz & Zeitgeist.',
      href: '/games/wort-schatz',
      badge: 'Wortschatz 🇩🇪',
      color: 'amber',
      icon: Sparkles,
      status: 'live' as const,
      brand: 'Deutsche Denkspiele',
    },
    {
      title: 'Kopfrechen-Blitz: Zahlen-Duell',
      description: 'Schnellrechnen & Zahlen-Gymnastik mit Serien-Multiplikatoren: Plus, Minus, Mal, Geteilt & Quadrat.',
      href: '/games/kopfrechen-blitz',
      badge: 'Mathe-Blitz 🇩🇪',
      color: 'cyan',
      icon: Target,
      status: 'live' as const,
      brand: 'Deutsche Denkspiele',
    },
    {
      title: 'Gedächtnis-Palast: Loci-Methode',
      description: 'Antike Loci-Methode für räumliches Langzeitgedächtnis in 9 isometrischen Palast-Kammern.',
      href: '/games/gedaechtnis-palast',
      badge: 'Loci-Palast 🇩🇪',
      color: 'violet',
      icon: Brain,
      status: 'live' as const,
      brand: 'Deutsche Denkspiele',
    },

    // --- 3. Party & Early Childhood (3-6 Years) ---
    {
      title: 'Scharade Party: Gesten & Mimik',
      description: 'Bilinguales Partyspiel mit 4 Kategorien, Team-Punktezähler (Blau vs Rot), 60s Countdown & Buzzer.',
      href: '/games/scharade-party',
      badge: 'Party Game 🎭',
      color: 'violet',
      icon: Swords,
      status: 'live' as const,
      brand: 'FrankX Party',
    },
    {
      title: 'WunderSafari: Formen & Tiere',
      description: 'Frühkindliche Sinnesförderung für Kids 3–6 Jahre: Große Touch-Tasten, Tierlaute, Sterne & 100% werbefrei.',
      href: '/games/wunder-safari',
      badge: 'Kids 3-6 🦁',
      color: 'amber',
      icon: Sparkles,
      status: 'live' as const,
      brand: 'FrankX Kids',
    },

    // --- 4. Arcanea Mythic & Lore Flagships ---
    {
      title: 'Arcanea: Realm of Legends',
      description: 'Tactical 1v1 Guardian deck battler with dynamic 3D gold foil tilt shaders and AI strategist.',
      href: '/games/arcanea-legends',
      badge: 'Card Battler',
      color: 'violet',
      icon: Swords,
      status: 'live' as const,
      brand: 'Arcanea',
    },
    {
      title: 'NeuroCosmos: Synapse Odyssey',
      description: 'Tactile synaptic prism light routing with Solfeggio 528Hz harmonic chords across 5 lobes.',
      href: '/games/neuro-cosmos',
      badge: 'Light Puzzle',
      color: 'violet',
      icon: Puzzle,
      status: 'live' as const,
      brand: 'Arcanea',
    },

    // --- 5. Starlight Cosmic Arcades ---
    {
      title: 'Chrono Shift: Void Breach',
      description: 'Cyber-mythic roguelike bullet-hell with time-dilation matrix dodging and tech upgrades.',
      href: '/games/chrono-shift',
      badge: 'Roguelike',
      color: 'cyan',
      icon: Gamepad2,
      status: 'live' as const,
      brand: 'Starlight',
    },
    {
      title: 'Neon Drift: Cyber Horizon',
      description: '120 FPS pseudo-3D synthwave highway racing with drift boosts and traffic hazards.',
      href: '/games/neon-drift',
      badge: 'Arcade Racer',
      color: 'cyan',
      icon: Trophy,
      status: 'live' as const,
      brand: 'Starlight',
    },
    {
      title: 'Aetheria: Sky Islands',
      description: 'Atmospheric glider exploration RPG with thermal updrafts and celestial relic harvesting.',
      href: '/games/aetheria',
      badge: 'Glider RPG',
      color: 'cyan',
      icon: Globe,
      status: 'live' as const,
      brand: 'Starlight',
    },
    {
      title: 'Quantum Core: Reactor Defense',
      description: 'Real-time tactical energy grid routing and modular plasma/cryo/singularity turret defense.',
      href: '/games/quantum-core',
      badge: 'Tower Defense',
      color: 'cyan',
      icon: ShieldAlert,
      status: 'live' as const,
      brand: 'Starlight',
    },
  ]

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    violet: { border: 'border-violet-500/30', bg: 'bg-violet-500/10', text: 'text-violet-400' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  }

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
              ✦ 18 PLAYABLE TITLES LIVE
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-3">
              Play now on frankx.ai
            </h2>
            <p className="text-white/60 max-w-2xl text-base">
              Instant 60–120 FPS games running directly in your browser. Zero downloads, zero installs, pure WebAudio synthesis.
            </p>
          </motion.div>

          <Link
            href="/games/hub.html"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20 whitespace-nowrap self-start md:self-auto"
          >
            <Smartphone className="w-4 h-4" />
            Launch Multi-Device Simulator Hub
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((game, i) => {
            const colors = colorMap[game.color]
            return (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={game.href}
                  className={`block p-6 rounded-2xl border ${colors.border} bg-white/[0.02] hover:bg-white/[0.06] hover:scale-[1.02] transition-[background-color,transform,border-color] duration-200 cursor-pointer group h-full flex flex-col justify-between`}

                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                        <game.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">{game.brand}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {game.badge}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">{game.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{game.description}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-white">
                    <span>PLAY IN BROWSER</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// WHAT WE CAN BUILD
// ============================================================================

const gameCategories = [
  {
    tier: 'Build Today',
    subtitle: 'React + Web Audio + Canvas — zero new dependencies',
    color: 'emerald',
    games: [
      { name: 'AI Quiz & Trivia', description: 'LLM-generated questions, infinite variety, adaptive difficulty', mobile: 'great', desktop: 'great', icon: Brain },
      { name: 'Word Games', description: 'Wordle-style puzzles, crosswords, anagram solvers', mobile: 'great', desktop: 'great', icon: Puzzle },
      { name: 'Memory Match', description: 'Card matching with AI-generated art, progressive difficulty', mobile: 'great', desktop: 'great', icon: Layers },
      { name: 'Rhythm Games', description: 'Beat-synced gameplay using Web Audio API (Music Lab expertise)', mobile: 'good', desktop: 'great', icon: Music },
      { name: 'Puzzle & Logic', description: 'Sudoku, sliding puzzles, pattern recognition, math challenges', mobile: 'great', desktop: 'great', icon: Target },
    ],
  },
  {
    tier: 'Build with Phaser',
    subtitle: 'Add Phaser (~200KB) — official Next.js template available',
    color: 'cyan',
    games: [
      { name: '2D Platformer', description: 'Side-scrolling action with physics, collectibles, and AI-generated levels', mobile: 'good', desktop: 'great', icon: Swords },
      { name: 'Space Shooter', description: 'Arcade-style with particle effects, power-ups, and procedural waves', mobile: 'good', desktop: 'great', icon: Sparkles },
      { name: 'Tower Defense', description: 'Strategic placement, upgrade trees, AI-balanced enemy waves', mobile: 'great', desktop: 'great', icon: Target },
      { name: 'Card / Deck Builder', description: 'Collectible card mechanics, turn-based strategy, AI opponents', mobile: 'great', desktop: 'great', icon: Dice1 },
    ],
  },
  {
    tier: 'Build with R3F',
    subtitle: 'React Three Fiber — already in bundle (Three.js installed)',
    color: 'violet',
    games: [
      { name: '3D Exploration', description: 'First-person walkthroughs, product configurators, virtual galleries', mobile: 'medium', desktop: 'great', icon: Box },
      { name: '3D Puzzle', description: 'Spatial reasoning, Rubik\'s cube style, object manipulation in 3D', mobile: 'good', desktop: 'great', icon: Puzzle },
    ],
  },
  {
    tier: 'Needs Supabase',
    subtitle: 'Add real-time multiplayer via Supabase Realtime channels',
    color: 'amber',
    games: [
      { name: 'Multiplayer Quiz', description: 'Compete in real-time trivia with friends, live leaderboards', mobile: 'great', desktop: 'great', icon: Trophy },
      { name: 'Turn-Based Strategy', description: 'Chess, checkers, word duels — async or real-time turns via DB sync', mobile: 'great', desktop: 'great', icon: Swords },
    ],
  },
]

const platformBadge: Record<string, { label: string; color: string }> = {
  great: { label: 'Great', color: 'text-emerald-400 bg-emerald-500/10' },
  good: { label: 'Good', color: 'text-cyan-400 bg-cyan-500/10' },
  medium: { label: 'OK', color: 'text-amber-400 bg-amber-500/10' },
}

const tierColors: Record<string, { border: string; text: string; bg: string; badge: string }> = {
  emerald: { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  cyan: { border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  violet: { border: 'border-violet-500/20', text: 'text-violet-400', bg: 'bg-violet-500/10', badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  amber: { border: 'border-amber-500/20', text: 'text-amber-400', bg: 'bg-amber-500/10', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
}

function WhatWeCanBuildSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            What we can actually build
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            Honest assessment by tech stack tier. Each game type rated for mobile and desktop browser performance.
          </p>
        </motion.div>

        <div className="space-y-12">
          {gameCategories.map((category, ci) => {
            const colors = tierColors[category.color]
            return (
              <motion.div
                key={category.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${colors.badge}`}>
                    {category.tier}
                  </span>
                  <span className="text-sm text-white/40">{category.subtitle}</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.games.map((game) => (
                    <div
                      key={game.name}
                      className={`group p-4 rounded-xl bg-white/[0.02] border ${colors.border} hover:bg-white/[0.04] transition-all`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${colors.bg}`}>
                          <game.icon className={`w-4 h-4 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white mb-1">{game.name}</h3>
                          <p className="text-xs text-white/40 leading-relaxed">{game.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="w-3 h-3 text-white/30" />
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${platformBadge[game.mobile].color}`}>
                            {platformBadge[game.mobile].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Monitor className="w-3 h-3 text-white/30" />
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${platformBadge[game.desktop].color}`}>
                            {platformBadge[game.desktop].label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// TECH STACK
// ============================================================================

function TechStackSection() {
  const stacks = [
    {
      name: 'Frontend Shell',
      items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS'],
      status: 'installed',
      icon: Code,
    },
    {
      name: '2D Game Engine',
      items: ['Phaser 3 (official Next.js template)', 'PixiJS (sprite-heavy)', 'Pure Canvas/DOM (zero-dep)'],
      status: 'add',
      icon: Layers,
    },
    {
      name: '3D Engine',
      items: ['React Three Fiber', 'drei helpers', 'Three.js', 'WebGPU support'],
      status: 'installed',
      icon: Box,
    },
    {
      name: 'Audio',
      items: ['Web Audio API', 'Spatial audio (PannerNode)', 'Howler.js (optional wrapper)'],
      status: 'installed',
      icon: Music,
    },
    {
      name: 'Backend / Multiplayer',
      items: ['Supabase Realtime', 'Supabase Auth & DB', 'Vercel Edge Functions'],
      status: 'add',
      icon: Server,
    },
    {
      name: 'AI Pipeline',
      items: ['Claude Code (game code gen)', 'Nano Banana (asset art)', 'AIVA (adaptive music)', 'Playwright (QA testing)'],
      status: 'available',
      icon: Bot,
    },
  ]

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Tech stack assessment
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            What&apos;s already installed, what needs adding, and what&apos;s available through our AI toolchain.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stacks.map((stack, i) => (
            <motion.div
              key={stack.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <stack.icon className="w-4 h-4 text-white/50" />
                  <h3 className="text-sm font-medium text-white">{stack.name}</h3>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  stack.status === 'installed'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : stack.status === 'add'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-violet-500/10 text-violet-400'
                }`}>
                  {stack.status === 'installed' ? 'Installed' : stack.status === 'add' ? 'Add when needed' : 'Available'}
                </span>
              </div>
              <ul className="space-y-1.5">
                {stack.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/40">
                    <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// VERCEL COMPATIBILITY
// ============================================================================

function VercelCompatSection() {
  const items = [
    { game: 'Single-player (puzzle, quiz, platformer)', works: 'yes', infra: 'Vercel only', note: 'Fully client-side, zero backend' },
    { game: 'Turn-based multiplayer (chess, cards)', works: 'yes', infra: 'Vercel + Supabase', note: 'Supabase Realtime for state sync' },
    { game: 'Leaderboard arcade games', works: 'yes', infra: 'Vercel + Supabase', note: 'Client gameplay, server score validation' },
    { game: 'Async strategy (civilization-style)', works: 'yes', infra: 'Vercel + Supabase', note: 'DB-driven turns, email notifications' },
    { game: 'Casual real-time (party games)', works: 'partial', infra: 'Vercel + Supabase/Pusher', note: 'Works at low player counts' },
    { game: 'Fast-paced action (FPS, racing)', works: 'no', infra: 'Railway / Fly.io', note: 'Needs dedicated WebSocket server' },
    { game: 'MMO / persistent world', works: 'no', infra: 'Dedicated servers', note: 'Vercel is serverless — no long-lived connections' },
  ]

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            What works on Vercel
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            Honest breakdown. Vercel handles most game types — but not everything.
            Real-time action games need dedicated game servers.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[1fr,auto,auto] sm:grid-cols-[2fr,1fr,1fr] gap-x-4 p-4 bg-white/[0.03] border-b border-white/[0.06]">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Game Type</span>
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Works?</span>
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider hidden sm:block">Infrastructure</span>
          </div>
          {items.map((item) => (
            <div
              key={item.game}
              className="grid grid-cols-[1fr,auto,auto] sm:grid-cols-[2fr,1fr,1fr] gap-x-4 p-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <span className="text-sm text-white/80">{item.game}</span>
                <span className="text-xs text-white/30 block mt-0.5">{item.note}</span>
              </div>
              <div className="flex items-center">
                {item.works === 'yes' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {item.works === 'partial' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                {item.works === 'no' && <XCircle className="w-4 h-4 text-red-400" />}
              </div>
              <span className="text-xs text-white/40 hidden sm:block">{item.infra}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// AGENTIC PIPELINE
// ============================================================================

function AgenticPipelineSection() {
  const steps = [
    {
      step: 1,
      title: 'Concept Agent',
      description: 'Describe your game in natural language. Claude generates a game design document with mechanics, art direction, level structure, and progression.',
      tool: 'Claude Code + Game Dev Skills',
      color: 'violet',
    },
    {
      step: 2,
      title: 'Asset Agent',
      description: 'AI generates sprites, backgrounds, UI elements, and adaptive soundtrack. Consistent style across all assets from a single art direction prompt.',
      tool: 'Nano Banana + AIVA',
      color: 'fuchsia',
    },
    {
      step: 3,
      title: 'Code Agent',
      description: 'Claude Code generates Phaser/R3F game code, implements mechanics, integrates assets, and creates the Next.js shell with routing and metadata.',
      tool: 'Claude Code + 500+ Skills',
      color: 'cyan',
    },
    {
      step: 4,
      title: 'QA Agent',
      description: 'Playwright tests gameplay, validates mechanics against the design doc, checks performance budgets, and identifies edge cases.',
      tool: 'Playwright MCP',
      color: 'emerald',
    },
  ]

  const pipelineColors: Record<string, string> = {
    violet: 'border-violet-500/30 bg-violet-500/5',
    fuchsia: 'border-fuchsia-500/30 bg-fuchsia-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
  }

  const stepTextColors: Record<string, string> = {
    violet: 'text-violet-400',
    fuchsia: 'text-fuchsia-400',
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
  }

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Agentic game development pipeline
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            From natural language prompt to playable game. Each step is handled by
            a specialized AI agent in the FrankX ecosystem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-2xl border ${pipelineColors[step.color]} relative`}
            >
              <div className={`text-3xl font-bold ${stepTextColors[step.color]} opacity-30 mb-3`}>
                {String(step.step).padStart(2, '0')}
              </div>
              <h3 className="text-base font-medium text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed mb-4">{step.description}</p>
              <div className="text-[10px] font-medium text-white/30 uppercase tracking-wider">
                {step.tool}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MONETIZATION STRATEGY
// ============================================================================

function MonetizationSection() {
  const strategies = [
    {
      title: 'Free-to-Play Games',
      description: 'Build free browser games on frankx.ai/games/ to drive traffic and engagement. No app store fees. Direct audience building.',
      metrics: '100% of revenue stays with you',
      icon: Gamepad2,
    },
    {
      title: 'Game Template Sales',
      description: 'Sell Next.js + Phaser game templates ($27-97) on itch.io, Gumroad, or direct. Creators customize and deploy their own.',
      metrics: '$27-97 per template',
      icon: Code,
    },
    {
      title: 'AI Game Builder',
      description: 'Premium product: AI-powered game generator. Input concept, get playable prototype. Subscription model.',
      metrics: '$27-97/month subscription',
      icon: Sparkles,
    },
    {
      title: 'In-Game Purchases',
      description: 'Cosmetics, power-ups, battle passes via Stripe/Lemon Squeezy. No 30% App Store tax — browser games keep full revenue.',
      metrics: '12-18% of users convert',
      icon: Trophy,
    },
  ]

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Monetization strategy
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            Browser games bypass the 30% App Store tax. Direct payment integration
            via Stripe keeps full revenue. Four complementary approaches.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {strategies.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <s.icon className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-medium text-white">{s.title}</h3>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-3">{s.description}</p>
              <span className="text-xs font-medium text-emerald-400">{s.metrics}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// AI TOOLS
// ============================================================================

function AIToolsSection() {
  const tools = [
    { name: 'Scenario', role: 'Game sprites, textures, consistent characters', category: 'Assets', ready: true },
    { name: 'Nano Banana (Gemini)', role: 'Concept art, backgrounds, UI elements', category: 'Assets', ready: true },
    { name: 'Inworld AI', role: 'NPCs with memory, emotions, context awareness', category: 'NPCs', ready: true },
    { name: 'Charisma AI', role: 'Branching dialogue, interactive narratives', category: 'Story', ready: true },
    { name: 'AIVA', role: 'Adaptive music — orchestral, electronic, ambient loops', category: 'Music', ready: true },
    { name: 'Replica Studios', role: 'AI voice acting for characters and narration', category: 'Voice', ready: true },
    { name: 'Promethean AI', role: 'Large-scale 3D environment creation (AAA studios)', category: 'Worlds', ready: true },
    { name: 'Claude Code', role: 'Full game code generation with 500+ dev skills', category: 'Code', ready: true },
  ]

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            AI tools for game development
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            Every stage of game development has a production-ready AI tool.
            These compress months of work into hours.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/30 uppercase tracking-wider">{tool.category}</span>
                {tool.ready && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Ready</span>
                )}
              </div>
              <h3 className="text-sm font-medium text-white mb-1">{tool.name}</h3>
              <p className="text-xs text-white/40">{tool.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
// ============================================================================

function CTASection() {
  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            The research behind the games
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            A working primer on agentic game development — market data, tools,
            best practices, and what works (and what doesn&apos;t) for creators and game devs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/research/agentic-game-development"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors text-sm"
            >
              <Brain className="w-4 h-4" />
              Read the Research
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music-lab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-sm font-medium"
            >
              <Music className="w-4 h-4" />
              Explore Music Lab
            </Link>
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-sm font-medium"
            >
              <Code className="w-4 h-4" />
              Developer Hub
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function GamesPage() {
  return (
    <>
      <GamesBackground />
      <main className="relative z-10 min-h-screen">
        <HeroSection />
        <PlayNowSection />
        <WhatWeCanBuildSection />
        <TechStackSection />
        <VercelCompatSection />
        <AgenticPipelineSection />
        <AIToolsSection />
        <MonetizationSection />
        <CTASection />
      </main>
    </>
  )
}
