import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import {
  ArrowRight,
  Code2,
  Music,
  BookOpen,
  Cpu,
  Palette,
  Sparkles,
  Zap,
  Globe,
  Bot,
  Search,
} from 'lucide-react'

export const metadata = createMetadata({
  title: 'The AI Team — ACOS-Powered Agent System | FrankX',
  description:
    'Six domain agents powered by ACOS orchestrate everything on FrankX.AI. Architecture, music, content, products, design, intelligence — real agents, real output.',
  keywords: [
    'frankx ai team',
    'ai agents',
    'acos agents',
    'agentic creator os',
    'ai architecture',
    'ai music production',
  ],
  path: '/team',
})

/* ── Agent Data ── */

const agents = [
  {
    domain: 'Architecture',
    role: 'AI Systems Agent',
    description:
      'Designs production AI systems. Multi-agent orchestration, RAG patterns, enterprise integration. The technical backbone that makes everything else possible.',
    accent: '#10B981',
    icon: Code2,
    href: '/ai-architect',
    stats: ['75+ Skills', '38 Agents', 'Enterprise-Grade'],
    highlight: '38 agents deployed',
  },
  {
    domain: 'Music',
    role: 'Production Agent',
    description:
      'AI music production at commercial scale. 50+ genres from ambient to electronic. Prompt engineering for Suno that produces release-ready tracks.',
    accent: '#EC4899',
    icon: Music,
    href: '/music',
    stats: ['12,000+ Songs', '50+ Genres', 'Commercial Ready'],
    highlight: '12,000+ songs created',
  },
  {
    domain: 'Content',
    role: 'Distribution Agent',
    description:
      'Blog articles, newsletters, social content. SEO strategy, voice DNA, multi-platform distribution. Six newsletter streams running in parallel.',
    accent: '#F59E0B',
    icon: BookOpen,
    href: '/blog',
    stats: ['80+ Articles', '6 Streams', 'SEO-Optimized'],
    highlight: '80+ articles published',
  },
  {
    domain: 'Products',
    role: 'Commerce Agent',
    description:
      'Templates, tools, and deployment pipelines. Railway, Vercel, and n8n integrations with one-click deploy. From code to checkout in hours, not months.',
    accent: '#EF4444',
    icon: Zap,
    href: '/products',
    stats: ['Template Shop', 'Deploy Pipelines', 'Revenue Systems'],
    highlight: 'Template shop live',
  },
  {
    domain: 'Design',
    role: 'Visual Systems Agent',
    description:
      'UI/UX, brand identity, visual creation pipeline. The design system, mascot art, premium components. Every pixel intentional.',
    accent: '#8B5CF6',
    icon: Palette,
    href: '/design-lab',
    stats: ['Design System', 'Visual Pipeline', 'Brand DNA'],
    highlight: 'Full design system',
  },
  {
    domain: 'Intelligence',
    role: 'Research Agent',
    description:
      'Market intelligence, investment analysis, competitive research. Starlight Intelligence System powers pattern recognition across all domains.',
    accent: '#43BFE3',
    icon: Search,
    href: '/investor',
    stats: ['SIS v4', 'Pattern Engine', 'Market Analysis'],
    highlight: 'SIS v4 active',
  },
]

const orchestration = [
  {
    title: 'ACOS Orchestration',
    description:
      'The Agentic Creator OS coordinates all agents. 75+ skills auto-activate based on context. One command can trigger a cascade across architecture, content, and deployment.',
    icon: Cpu,
    accent: '#8B5CF6',
  },
  {
    title: 'Starlight Intelligence',
    description:
      'The persistent memory layer. SIS tracks patterns across sessions, syncs learning between agents, and scores intelligence quality. Every session is smarter than the last.',
    icon: Sparkles,
    accent: '#43BFE3',
  },
  {
    title: 'Human Direction',
    description:
      'Frank provides vision, taste, and the quality bar. AI amplifies. Every output is human-directed, machine-accelerated. The result: one person operating at team scale.',
    icon: Globe,
    accent: '#10B981',
  },
]

/* ── Components ── */

function AgentCard({ agent, index }: { agent: (typeof agents)[number]; index: number }) {
  const Icon = agent.icon
  return (
    <Link href={agent.href} className="group block">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-1">
        {/* Accent glow on hover */}
        <div
          className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${agent.accent}15` }}
        />

        <div className="relative">
          {/* Icon + Agent number */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: `${agent.accent}15` }}
            >
              <Icon className="h-6 w-6" style={{ color: agent.accent }} />
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
              style={{
                background: `${agent.accent}10`,
                color: agent.accent,
                border: `1px solid ${agent.accent}20`,
              }}
            >
              Agent {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Domain name */}
          <h3 className="text-xl font-bold text-white mb-1">{agent.domain}</h3>
          <p className="text-xs font-medium mb-3" style={{ color: agent.accent }}>
            {agent.role}
          </p>

          {/* Description */}
          <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-3">
            {agent.description}
          </p>

          {/* Highlight stat */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-white/80">{agent.highlight}</span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.stats.map((stat) => (
              <span
                key={stat}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/50 border border-white/[0.06]"
              >
                {stat}
              </span>
            ))}
          </div>

          {/* Explore link */}
          <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 transition-colors">
            <span>Explore {agent.domain.toLowerCase()}</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, transparent, ${agent.accent}60, transparent)`,
          }}
        />
      </div>
    </Link>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <main className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          {/* ── Hero ── */}
          <section className="relative mb-20 text-center">
            {/* ACOS command center — subtle background visual for depth */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-[0.04]">
              <Image
                src="/images/mascot/mascot-v19-hero-command-center.png"
                alt=""
                width={800}
                height={400}
                className="object-contain"
                sizes="800px"
                aria-hidden="true"
              />
            </div>

            {/* Axi mascot */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Image
                  src="/images/mascot/mascot-v16-organic-digital-split.png"
                  alt="Axi — the intelligence layer connecting all agents"
                  width={120}
                  height={120}
                  className="rounded-2xl"
                  sizes="120px"
                  style={{ boxShadow: '0 0 60px -12px rgba(139,92,246,0.3)' }}
                />
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30">
                  <Bot className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium text-white/60">Powered by ACOS v10.2</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl mb-4">
              <span className="text-white">The AI </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Team
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-white/40 leading-relaxed mb-3">
              Six domain agents. One orchestration system. Real output.
            </p>
            <p className="max-w-xl mx-auto text-sm text-white/25 leading-relaxed">
              Every agent below runs in production, powered by the Agentic Creator OS.
              Frank directs. The system executes. This is how one person operates at team scale.
            </p>
          </section>

          {/* ── Agent Grid ── */}
          <section className="mb-24">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent, i) => (
                <AgentCard key={agent.domain} agent={agent} index={i} />
              ))}
            </div>
          </section>

          {/* ── The Numbers ── */}
          <section className="mb-24">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {[
                  { value: '38', label: 'Active Agents', accent: '#10B981' },
                  { value: '75+', label: 'ACOS Skills', accent: '#8B5CF6' },
                  { value: '12K+', label: 'Songs Created', accent: '#EC4899' },
                  { value: '80+', label: 'Articles Published', accent: '#F59E0B' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-3xl md:text-4xl font-bold mb-1"
                      style={{ color: stat.accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-white text-center mb-3">How the system works</h2>
            <p className="text-sm text-white/30 text-center mb-10 max-w-lg mx-auto">
              Three layers power every creative workflow — from blog post to full product launch.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {orchestration.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${item.accent}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.accent }} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Arcanea Universe Teaser ── */}
          <section className="mb-20">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/10 bg-purple-500/[0.03] p-8 md:p-10">
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl" />
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex -space-x-3">
                  {[
                    '/images/team/codex-falcon.png',
                    '/images/team/echo-leopard.png',
                    '/images/team/nova-fox.png',
                  ].map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-[#0a0a0b]"
                      sizes="56px"
                      style={{ zIndex: 3 - i }}
                    />
                  ))}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0a0a0b] bg-purple-500/20 text-xs font-bold text-purple-300">
                    +6
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">The Arcanea Universe</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-3">
                    Beyond the agents lives Arcanea — a world-building project exploring mythology,
                    creative characters, and narrative design. Nine characters, each with their own
                    domain and story.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link
                      href="/about"
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors inline-flex items-center gap-1"
                    >
                      About the universe <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href="https://github.com/frankxai/arcanea"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/30 hover:text-white/50 transition-colors inline-flex items-center gap-1"
                    >
                      GitHub repo <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="text-center">
            <p className="text-sm text-white/25 mb-6">
              See the system in action. Start with what interests you.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                Start Here <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/acos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Explore ACOS
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
