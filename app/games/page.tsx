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
  Cloud,
  Network,
  Wifi,
  Shield,
} from 'lucide-react'

// ============================================================================
// BACKGROUND
// ============================================================================

function GamesBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030712]" />

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-[#030712]/80 to-[#030712]" />
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
    {
      title: 'Crystal Match',
      description: 'Swap and match colorful crystals in this Candy Crush-style puzzle. Combos, cascades, and 30-move challenge.',
      href: '/games/crystal-match',
      badge: 'Play Now',
      color: 'fuchsia',
      icon: Sparkles,
      status: 'live' as const,
    },
    {
      title: 'Neon Runner',
      description: '3D endless runner through a neon world. Swipe to dodge, jump, and slide — Subway Surfers meets cyberpunk.',
      href: '/games/neon-runner',
      badge: 'Play Now',
      color: 'cyan',
      icon: Zap,
      status: 'live' as const,
    },
    {
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards. Three difficulty levels, star ratings, and a timer.',
      href: '/games/memory-match',
      badge: 'Play Now',
      color: 'violet',
      icon: Puzzle,
      status: 'live' as const,
    },
    {
      title: 'AI Quiz',
      description: 'AI-generated trivia questions across topics. Adaptive difficulty that learns your strengths.',
      href: '/games',
      badge: 'Coming Soon',
      color: 'amber',
      icon: Brain,
      status: 'coming' as const,
    },
  ]

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    violet: { border: 'border-violet-500/30', bg: 'bg-violet-500/10', text: 'text-violet-400' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' },
    fuchsia: { border: 'border-fuchsia-500/30', bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400' },
  }

  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Play now
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            Games you can play right now in your browser. More coming soon.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game, i) => {
            const colors = colorMap[game.color]
            const isLive = game.status === 'live'
            const cardClasses = `block p-6 rounded-2xl border ${colors.border} bg-white/[0.02] transition-all ${
              isLive ? 'hover:bg-white/[0.05] hover:scale-[1.02] cursor-pointer' : 'opacity-60'
            }`

            const cardContent = (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                    <game.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                    isLive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                  }`}>
                    {game.badge}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{game.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{game.description}</p>
                {isLive && (
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-violet-400">
                    Play
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </>
            )

            return (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {isLive ? (
                  <Link href={game.href} className={cardClasses}>{cardContent}</Link>
                ) : (
                  <div className={cardClasses}>{cardContent}</div>
                )}
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
    tier: 'Build with Supabase',
    subtitle: 'Add real-time multiplayer via Supabase Realtime channels',
    color: 'amber',
    games: [
      { name: 'Multiplayer Quiz', description: 'Compete in real-time trivia with friends, live leaderboards', mobile: 'great', desktop: 'great', icon: Trophy },
      { name: 'Turn-Based Strategy', description: 'Chess, checkers, word duels — async or real-time turns via DB sync', mobile: 'great', desktop: 'great', icon: Swords },
    ],
  },
  {
    tier: 'Build with PartyKit',
    subtitle: 'Cloudflare edge servers — real-time action, MMO worlds, MOBA',
    color: 'cyan',
    games: [
      { name: 'Action RPG / Arcanea', description: 'Persistent 3D world with Babylon.js (WebGPU). Zone-based rooms, 50ms latency globally.', mobile: 'good', desktop: 'great', icon: Swords },
      { name: 'Racing / MOBA', description: 'Fast-paced multiplayer via PartyKit edge servers. Client-side prediction for smooth gameplay.', mobile: 'good', desktop: 'great', icon: Zap },
      { name: 'MMO / Persistent World', description: 'Durable Objects for zone persistence. Each zone = a room. Scales to millions of players.', mobile: 'medium', desktop: 'great', icon: Globe },
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
      items: ['PartyKit (Cloudflare edge)', 'Supabase Realtime', 'Colyseus (open-source)', 'Vercel Edge Functions'],
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
    { game: 'Fast-paced action (FPS, racing)', works: 'yes', infra: 'Vercel + PartyKit', note: 'PartyKit handles WebSocket at the edge — 50ms latency' },
    { game: 'MMO / persistent world', works: 'yes', infra: 'Vercel + PartyKit', note: 'Cloudflare Durable Objects — zone-based rooms, auto-scaling' },
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
            Honest breakdown. Vercel handles the frontend — PartyKit (Cloudflare)
            handles real-time game servers at the edge. Every game type is covered.
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
// ADVANCED INFRASTRUCTURE
// ============================================================================

const infraStack = [
  {
    name: 'PartyKit',
    role: 'Real-time game server at the edge',
    details: 'Cloudflare Durable Objects — stateful WebSocket rooms with 50ms global latency. Each game zone is a room. Auto-scales to millions of players.',
    stats: { latency: '50ms', cost: '$5-10/mo', scale: 'Millions', coverage: '300+ regions' },
    color: 'cyan',
    icon: Cloud,
  },
  {
    name: 'Babylon.js',
    role: 'WebGPU-powered 3D rendering',
    details: 'Full game engine with physics, animation, VR/AR support. Render Bundles deliver 10x speedup over WebGL. Can render 1000+ characters at 60fps.',
    stats: { perf: '10x faster', support: '95% browsers', size: '500KB', physics: 'Built-in' },
    color: 'violet',
    icon: Box,
  },
  {
    name: 'Colyseus',
    role: 'Open-source multiplayer framework',
    details: 'Schema-based state sync with 90% bandwidth reduction via delta compression. Node.js server with Redis clustering for 100K+ concurrent users.',
    stats: { protocol: 'WebSocket', license: 'MIT', ccuLimit: '100K+', hosting: 'Fly.io $14/mo' },
    color: 'emerald',
    icon: Network,
  },
  {
    name: 'WebSocket + Edge',
    role: 'Client-side prediction & sync',
    details: 'Server-authoritative game logic with client-side prediction for instant feedback. Binary delta compression sends only changed fields — 20 updates/sec.',
    stats: { protocol: '100% support', prediction: 'Client-side', sync: 'Delta only', trust: 'Server auth' },
    color: 'amber',
    icon: Wifi,
  },
]

const infraColorMap: Record<string, { border: string; bg: string; text: string }> = {
  cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', text: 'text-violet-400' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  amber: { border: 'border-amber-500/20', bg: 'bg-amber-500/10', text: 'text-amber-400' },
}

function AdvancedInfraSection() {
  return (
    <section className="relative py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Advanced Infrastructure</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Real-time multiplayer, solved
          </h2>
          <p className="text-white/50 max-w-2xl text-lg">
            PartyKit (Cloudflare Durable Objects) handles what Vercel can&apos;t — persistent
            WebSocket connections for real-time action games, MOBAs, and MMO worlds.
            50ms latency to 95% of global users.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-6">Recommended Architecture</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20 text-center">
              <div className="text-xs font-medium text-violet-400 uppercase tracking-wider mb-2">Frontend</div>
              <div className="text-sm text-white font-medium">Vercel + Next.js</div>
              <div className="text-xs text-white/30 mt-1">React + Tailwind + Babylon.js</div>
            </div>
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-center">
              <div className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-2">Game Server</div>
              <div className="text-sm text-white font-medium">PartyKit (Cloudflare)</div>
              <div className="text-xs text-white/30 mt-1">WebSocket rooms at the edge</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
              <div className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-2">Rendering</div>
              <div className="text-sm text-white font-medium">Babylon.js (WebGPU)</div>
              <div className="text-xs text-white/30 mt-1">10x faster, AAA browser visuals</div>
            </div>
          </div>
        </motion.div>

        {/* Stack cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {infraStack.map((tech, i) => {
            const colors = infraColorMap[tech.color]
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-2xl bg-white/[0.02] border ${colors.border} hover:bg-white/[0.04] transition-all`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <tech.icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{tech.name}</h3>
                    <p className="text-xs text-white/40">{tech.role}</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{tech.details}</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(tech.stats).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-[10px] text-white/25 uppercase">{key}:</span>
                      <span className={`text-[10px] font-medium ${colors.text}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Latency table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-white/[0.06] overflow-hidden"
        >
          <div className="grid grid-cols-[1fr,auto,1fr] gap-x-4 p-4 bg-white/[0.03] border-b border-white/[0.06]">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Game Type</span>
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Target Latency</span>
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider hidden sm:block">Stack</span>
          </div>
          {[
            { type: 'FPS / Fighting', latency: '<20ms', stack: 'Hathora + WebTransport (desktop only)' },
            { type: 'MOBA / Racing', latency: '20-50ms', stack: 'PartyKit (edge) or Colyseus (Fly.io)' },
            { type: 'Action RPG / Arcanea', latency: '50-100ms', stack: 'PartyKit + Babylon.js (WebGPU)' },
            { type: 'Open World / MMO', latency: '50-150ms', stack: 'PartyKit (cheap) or Rivet (scale)' },
            { type: 'Turn-based', latency: '100-250ms', stack: 'Vercel Serverless — no WebSocket needed' },
          ].map((row) => (
            <div
              key={row.type}
              className="grid grid-cols-[1fr,auto,1fr] gap-x-4 p-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm text-white/80">{row.type}</span>
              <span className="text-sm font-mono text-cyan-400">{row.latency}</span>
              <span className="text-xs text-white/40 hidden sm:block">{row.stack}</span>
            </div>
          ))}
        </motion.div>
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
            Deep dive into agentic game development — market data, tools,
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
        <AdvancedInfraSection />
        <AgenticPipelineSection />
        <AIToolsSection />
        <MonetizationSection />
        <CTASection />
      </main>
    </>
  )
}
