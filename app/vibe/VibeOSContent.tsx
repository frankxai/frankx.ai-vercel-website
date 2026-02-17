'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Music2,
  Bot,
  Wand2,
  ArrowRight,
  Sparkles,
  Cpu,
  Network,
  Star,
  Layers,
  ExternalLink,
} from 'lucide-react'

const agents = [
  {
    id: 'music-producer',
    name: 'Music Producer',
    tagline: 'Suno AI prompt engineering',
    description:
      'Transforms emotional intent into psychoacoustic precision. BPM, key, mode, instrumentation — calibrated for cognitive states.',
    href: '/vibe/producer',
    color: '#AB47C7',
    colorName: 'purple',
    glowVar: 'rgba(171,71,199,0.25)',
    borderVar: 'rgba(171,71,199,0.25)',
    icon: Music2,
    badge: 'Free Beta',
    badgeBg: 'rgba(171,71,199,0.15)',
    features: ['Neuro-state targeting', 'Genre-specific workflows', 'BPM & key selection', '10 prompts/day free'],
    cta: 'Launch agent',
    live: true,
  },
  {
    id: 'agent-marketplace',
    name: 'Agent Marketplace',
    tagline: 'Multi-LLM specialist agents',
    description:
      'Claude, GPT, Gemini, Grok, Llama — 9 models, intelligent cost-aware routing. BYOK for unlimited access.',
    href: '/vibe/agents',
    color: '#43BFE3',
    colorName: 'cyan',
    glowVar: 'rgba(67,191,227,0.25)',
    borderVar: 'rgba(67,191,227,0.20)',
    icon: Bot,
    badge: 'Coming Soon',
    badgeBg: 'rgba(67,191,227,0.10)',
    features: ['8 specialist agents', '5 LLM providers', 'BYOK or hosted', '$19/mo Vibe Club'],
    cta: 'Join waitlist',
    live: false,
  },
  {
    id: 'arcanea-cloud',
    name: 'Arcanea Cloud',
    tagline: 'AI worldbuilding platform',
    description:
      'Deploy mythology-infused creative universes. 10 Gates progression. AI-assisted lore, characters, and locations.',
    href: '/magic',
    color: '#F59E0B',
    colorName: 'amber',
    glowVar: 'rgba(245,158,11,0.20)',
    borderVar: 'rgba(245,158,11,0.18)',
    icon: Wand2,
    badge: 'Q2 2026',
    badgeBg: 'rgba(245,158,11,0.10)',
    features: ['10 Gates system', 'Arcanean lore AI', 'Multi-engine export', 'Team collaboration'],
    cta: 'Explore framework',
    live: false,
  },
]

const stack = [
  {
    icon: Cpu,
    title: 'ACOS v10',
    desc: '22 skills · 8 agents · 93/100 intelligence · Experience replay',
    href: '/blog/acos-v10-autonomous-intelligence',
    color: '#AB47C7',
  },
  {
    icon: Network,
    title: 'Multi-LLM Gateway',
    desc: '5 providers · Cost-aware routing · 98% savings on bulk tasks',
    href: '/blog/vibe-os-platform-introduction',
    color: '#43BFE3',
  },
  {
    icon: Star,
    title: 'Starlight Intelligence',
    desc: 'Persistent memory · Trajectory classification · Compound learning',
    href: '/blog/starlight-intelligence-system',
    color: '#10B981',
  },
  {
    icon: Layers,
    title: 'Arcanea Framework',
    desc: '10 Gates progression · Gate 1 = Awakening = Vibe OS foundation',
    href: '/magic',
    color: '#F59E0B',
  },
]

const stats = [
  { value: '4+', label: 'Specialist agents', color: '#AB47C7' },
  { value: '9', label: 'LLM models', color: '#43BFE3' },
  { value: '12K+', label: 'Suno sessions', color: '#10B981' },
  { value: '$19', label: 'Vibe Club / mo', color: '#F59E0B' },
]

export default function VibeOSContent() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div
      style={{ background: '#060B18', fontFamily: 'var(--font-outfit), sans-serif' }}
      className="min-h-screen text-white antialiased"
    >
      <style>{`
        @keyframes aurora-a {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          33% { transform: translate(60px, -40px) scale(1.15); opacity: 0.5; }
          66% { transform: translate(-40px, 60px) scale(0.9); opacity: 0.3; }
        }
        @keyframes aurora-b {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          50% { transform: translate(-80px, 40px) scale(1.2); opacity: 0.4; }
        }
        @keyframes aurora-c {
          0%, 100% { transform: translate(0, 0) scale(0.95); opacity: 0.2; }
          40% { transform: translate(50px, 50px) scale(1.1); opacity: 0.35; }
          80% { transform: translate(-30px, -60px) scale(1); opacity: 0.25; }
        }
        @keyframes shimmer-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.06; }
          90% { opacity: 0.06; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          50% { box-shadow: 0 0 0 6px transparent; opacity: 0.7; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes card-glow-breathe {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .shimmer-wordmark {
          background: linear-gradient(
            90deg,
            #AB47C7 0%,
            #fff 20%,
            #43BFE3 35%,
            #fff 50%,
            #F59E0B 65%,
            #fff 80%,
            #10B981 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-sweep 6s linear infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Grid background */}
        <div className="grid-bg absolute inset-0" />

        {/* Aurora blobs */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: '-10%',
            left: '-5%',
            width: '55%',
            height: '55%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(171,71,199,0.35) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'aurora-a 12s ease-in-out infinite',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            top: '20%',
            right: '-10%',
            width: '45%',
            height: '50%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(67,191,227,0.22) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'aurora-b 15s ease-in-out infinite',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: '0%',
            left: '30%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'aurora-c 18s ease-in-out infinite',
          }}
        />

        {/* Scanline */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(171,71,199,0.4), rgba(67,191,227,0.4), transparent)',
            animation: 'scanline 8s linear infinite',
          }}
        />

        {/* Orbit decoration */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: 'min(700px, 90vw)',
            height: 'min(700px, 90vw)',
            marginLeft: 'calc(min(700px, 90vw) / -2)',
            marginTop: 'calc(min(700px, 90vw) / -2)',
            border: '1px solid rgba(171,71,199,0.08)',
            borderRadius: '50%',
            animation: 'orbit-cw 60s linear infinite',
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: 'min(900px, 110vw)',
            height: 'min(900px, 110vw)',
            marginLeft: 'calc(min(900px, 110vw) / -2)',
            marginTop: 'calc(min(900px, 110vw) / -2)',
            border: '1px solid rgba(67,191,227,0.05)',
            borderRadius: '50%',
            animation: 'orbit-ccw 90s linear infinite',
          }}
        />

        {/* Content */}
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
          {/* Eyebrow badge */}
          <div
            className="mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-widest uppercase"
            style={{
              border: '1px solid rgba(171,71,199,0.3)',
              background: 'rgba(171,71,199,0.06)',
              color: '#AB47C7',
              animation: 'float-badge 4s ease-in-out infinite',
            }}
          >
            <Sparkles className="h-3 w-3" />
            Vibe OS Ecosystem
          </div>

          {/* Wordmark */}
          <h1
            className="shimmer-wordmark mb-4 font-bold leading-none tracking-tighter"
            style={{
              fontFamily: 'var(--font-dm-serif), serif',
              fontSize: 'clamp(64px, 12vw, 140px)',
              letterSpacing: '-0.03em',
            }}
          >
            VIBE OS
          </h1>

          {/* Tagline */}
          <p
            className="mb-12 text-white/50"
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              letterSpacing: '0.01em',
              fontStyle: 'italic',
            }}
          >
            AI agents meet music creation.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vibe/producer"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #AB47C7, #43BFE3)',
                boxShadow: '0 0 30px rgba(171,71,199,0.4)',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 50px rgba(171,71,199,0.6), 0 0 80px rgba(67,191,227,0.3)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(171,71,199,0.4)'
              }}
            >
              Try Music Producer
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/blog/vibe-os-platform-introduction"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              How it works
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 gap-px sm:grid-cols-4"
            style={{
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '16px',
              overflow: 'hidden',
              maxWidth: '600px',
              width: '100%',
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center px-6 py-5"
                style={{ background: '#060B18' }}
              >
                <span
                  className="mb-1 text-2xl font-bold tracking-tight"
                  style={{ color: s.color, fontFamily: 'var(--font-dm-serif), serif' }}
                >
                  {s.value}
                </span>
                <span className="text-center text-[11px] leading-tight text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p
              className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-white/30"
              style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
            >
              The Ecosystem
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-dm-serif), serif',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Three Platforms.{' '}
              <em className="text-white/40" style={{ fontStyle: 'italic' }}>
                One Ecosystem.
              </em>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {agents.map((agent) => {
              const Icon = agent.icon
              const isHovered = hoveredCard === agent.id

              return (
                <div
                  key={agent.id}
                  className="relative flex flex-col rounded-2xl p-8 transition-all duration-500"
                  style={{
                    border: `1px solid ${isHovered ? agent.color : agent.borderVar}`,
                    background: isHovered
                      ? `linear-gradient(145deg, rgba(10,14,28,0.95), rgba(10,14,28,0.9))`
                      : 'rgba(10,14,28,0.7)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: isHovered
                      ? `0 0 60px ${agent.glowVar}, inset 0 0 40px ${agent.glowVar}`
                      : '0 0 0 0 transparent',
                    cursor: 'default',
                  }}
                  onMouseEnter={() => setHoveredCard(agent.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon + badge row */}
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: agent.badgeBg, border: `1px solid ${agent.borderVar}` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: agent.color }} />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{ background: agent.badgeBg, color: agent.color, border: `1px solid ${agent.borderVar}` }}
                    >
                      {agent.badge}
                    </span>
                  </div>

                  {/* Title + tagline */}
                  <h3
                    className="mb-2 text-xl font-semibold text-white"
                    style={{ fontFamily: 'var(--font-dm-serif), serif', fontWeight: 400 }}
                  >
                    {agent.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium" style={{ color: agent.color }}>
                    {agent.tagline}
                  </p>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-white/50">{agent.description}</p>

                  {/* Features */}
                  <ul className="mb-8 space-y-2">
                    {agent.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                        <span
                          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          style={{ background: agent.color, boxShadow: `0 0 6px ${agent.color}` }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {agent.live ? (
                    <Link
                      href={agent.href}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${agent.color}20, ${agent.color}10)`,
                        border: `1px solid ${agent.color}40`,
                        color: agent.color,
                      }}
                    >
                      {agent.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium opacity-50 cursor-not-allowed"
                      style={{
                        border: `1px solid ${agent.borderVar}`,
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {agent.cta}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── INTELLIGENCE STACK ─── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-white/30">Under the Hood</p>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-dm-serif), serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Built on Four Layers{' '}
              <em className="text-white/40" style={{ fontStyle: 'italic' }}>
                of Intelligence
              </em>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical gradient connector */}
            <div
              className="absolute left-[23px] top-6 w-px"
              style={{
                height: 'calc(100% - 48px)',
                background: 'linear-gradient(to bottom, #AB47C7, #43BFE3, #10B981, #F59E0B)',
                opacity: 0.4,
              }}
            />

            <div className="space-y-0">
              {stack.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="relative flex gap-8 pb-12">
                    {/* Dot */}
                    <div
                      className="relative z-10 mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}40`,
                        animation: `dot-pulse 3s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                        color: item.color,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="pt-2">
                      <h3
                        className="mb-1.5 font-semibold text-white"
                        style={{ fontFamily: 'var(--font-dm-serif), serif', fontWeight: 400, fontSize: '18px' }}
                      >
                        {item.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-white/45">{item.desc}</p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-100"
                        style={{ color: item.color, opacity: 0.7 }}
                      >
                        Learn more
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-32 pt-8">
        <div className="mx-auto max-w-3xl">
          <div
            className="relative overflow-hidden rounded-3xl p-12 text-center"
            style={{
              border: '1px solid rgba(171,71,199,0.2)',
              background: 'linear-gradient(145deg, rgba(171,71,199,0.06), rgba(67,191,227,0.04))',
            }}
          >
            {/* Interior aurora */}
            <div
              className="pointer-events-none absolute"
              style={{
                top: '-30%',
                left: '-10%',
                width: '60%',
                height: '80%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(171,71,199,0.18) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            <div
              className="pointer-events-none absolute"
              style={{
                bottom: '-20%',
                right: '-10%',
                width: '50%',
                height: '70%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(67,191,227,0.12) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            <p className="relative mb-4 text-xs font-medium tracking-[0.25em] uppercase text-white/30">
              Start today
            </p>
            <h2
              className="relative mb-4 text-white"
              style={{
                fontFamily: 'var(--font-dm-serif), serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Your first Suno prompt is waiting.
            </h2>
            <p className="relative mb-10 text-sm leading-relaxed text-white/45">
              10 music prompts free daily. Upgrade to Vibe Club at $19/mo for unlimited access,
              <br className="hidden sm:inline" /> multi-LLM routing, and 20 curated monthly prompts.
            </p>

            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vibe/producer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #AB47C7, #43BFE3)',
                  boxShadow: '0 0 30px rgba(171,71,199,0.35)',
                  color: '#fff',
                }}
              >
                Launch Music Producer
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/vibe-os-platform-introduction"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                Read full story
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
