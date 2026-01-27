'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Lightbulb,
  Search,
  Sparkles,
  TrendingUp,
  Microscope,
  Globe,
  FileText,
  Zap,
  Users,
  Target,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react'

// ============================================================================
// DESIGN SYSTEM - Matching FrankX Elite Aesthetic
// ============================================================================

const colors = {
  bg: '#0a0a0b',
  bgElevated: '#111113',
  bgSubtle: '#18181b',
  accent: {
    primary: '#10b981',   // emerald - tech/AI
    secondary: '#06b6d4', // cyan - consciousness
    tertiary: '#f59e0b',  // amber - personal dev
    quaternary: '#a855f7', // purple - synthesis
  },
  text: {
    primary: '#fafafa',
    secondary: 'rgba(250, 250, 250, 0.7)',
    tertiary: 'rgba(250, 250, 250, 0.5)',
    muted: 'rgba(250, 250, 250, 0.3)',
  }
}

// ============================================================================
// AURORA BACKGROUND - Research-themed gradients
// ============================================================================

function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Emerald aurora - AI/Tech */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[60%] md:w-[70%] md:h-[70%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }
        }
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cyan aurora - Consciousness */}
      <motion.div
        className="absolute top-1/4 right-0 w-full h-[50%] md:w-[60%] md:h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }
        }
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Purple aurora - Synthesis */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-full h-[40%] md:w-[50%] md:h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 30, 0], y: [0, -15, 0], scale: [1, 1.03, 1] }
        }
        transition={shouldReduceMotion ? undefined : { duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// VALIDATED RESEARCH BRIEFS - AI Architecture Focus
// ============================================================================

const researchBriefs = [
  {
    slug: 'ai-neuroscience-2026',
    title: 'AI & Neuroscience: The State of What\'s Possible',
    description: 'BCIs at production scale, neuromorphic computing breakthroughs, thought-to-text at 74% accuracy, and organoid intelligence emerging as biological computing.',
    keyStats: ['12 Neuralink patients', '1,000x neuromorphic efficiency', '74% thought decoding accuracy'],
    sources: 12,
    lastValidated: '2026-01-27',
    category: 'Frontier Technology',
    relatedArticle: '/blog/production-agentic-ai-systems',
  },
  {
    slug: 'multi-agent-adoption-2026',
    title: 'Multi-Agent System Adoption: Q1 2026',
    description: 'Validated statistics on enterprise multi-agent adoption, framework market share, and orchestration patterns.',
    keyStats: ['72% enterprise adoption', '34% LangGraph market share', '$52B market by 2030'],
    sources: 15,
    lastValidated: '2026-01-26',
    category: 'Market Intelligence',
    relatedArticle: '/blog/multi-agent-orchestration-patterns-2026',
  },
  {
    slug: 'mcp-ecosystem-2026',
    title: 'MCP Protocol Ecosystem: Q1 2026',
    description: 'Comprehensive analysis of Model Context Protocol adoption, server ecosystem, and integration patterns.',
    keyStats: ['50+ production servers', '340% H2 2025 growth', '5+ IDE integrations'],
    sources: 12,
    lastValidated: '2026-01-26',
    category: 'Integration Architecture',
    relatedArticle: '/blog/claude-code-2-1-mcp-revolution',
  },
]

// ============================================================================
// RESEARCH DOMAINS
// ============================================================================

const researchDomains = [
  {
    id: 'generative-ai',
    name: 'Generative AI',
    icon: Sparkles,
    color: 'emerald',
    description: 'Latest breakthroughs in AI models, agents, and creative applications',
    topics: ['AI Agents & Orchestration', 'LLM Architecture', 'AI Music & Creative Tools', 'Prompt Engineering', 'Multi-Modal AI'],
    gradient: 'from-emerald-500/20 to-cyan-500/10',
  },
  {
    id: 'consciousness',
    name: 'Consciousness & Spirituality',
    icon: Brain,
    color: 'cyan',
    description: 'Exploring the nature of awareness, transformation, and inner technology',
    topics: ['Meditation & Mindfulness', 'Consciousness Research', 'Psychedelic Science', 'Quantum Mind', 'Transpersonal Psychology'],
    gradient: 'from-cyan-500/20 to-purple-500/10',
  },
  {
    id: 'personal-development',
    name: 'Personal Development',
    icon: TrendingUp,
    color: 'amber',
    description: 'Peak performance, productivity systems, and human optimization',
    topics: ['Habit Formation', 'Peak Performance', 'Creative Flow States', 'Systems Thinking', 'Life Design'],
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'synthesis',
    name: 'Synthesis & Integration',
    icon: Layers,
    color: 'purple',
    description: 'Where AI, consciousness, and human potential converge',
    topics: ['AI-Human Collaboration', 'Conscious Technology', 'Creator Economy', 'Future of Work', 'Evolutionary Psychology'],
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
]

// ============================================================================
// RESEARCH COUNCIL - The Expert Team
// ============================================================================

const researchCouncil = [
  {
    name: 'The Frontier Scout',
    role: 'AI & Technology Researcher',
    specialty: 'Tracking cutting-edge AI developments, tools, and architectures',
    icon: Microscope,
    color: 'emerald',
  },
  {
    name: 'The Depth Diver',
    role: 'Consciousness & Spirituality Researcher',
    specialty: 'Deep exploration of awareness, transformation, and inner technologies',
    icon: Brain,
    color: 'cyan',
  },
  {
    name: 'The Pattern Mapper',
    role: 'Personal Development Analyst',
    specialty: 'Extracting actionable frameworks from peak performance research',
    icon: Target,
    color: 'amber',
  },
  {
    name: 'The Synthesis Oracle',
    role: 'Cross-Domain Integrator',
    specialty: 'Finding connections across domains, creating novel insights',
    icon: Lightbulb,
    color: 'purple',
  },
  {
    name: 'The Publication Architect',
    role: 'Content & SEO Strategist',
    specialty: 'Transforming research into high-impact published content',
    icon: FileText,
    color: 'rose',
  },
]

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
          >
            <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">
              Intelligence Operations
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Research Intelligence
            <span className="block text-white/55 mt-2">Hub</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-3xl">
            A sophisticated research system exploring the frontiers of generative AI,
            consciousness, and human potential. Daily intelligence operations that synthesize
            cutting-edge insights into actionable knowledge.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#domains"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
            >
              Explore Domains
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#methodology"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              View Methodology
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Research Domains', value: '4', icon: Layers },
            { label: 'Expert Agents', value: '5', icon: Users },
            { label: 'Daily Scans', value: '∞', icon: Search },
            { label: 'Published Insights', value: '50+', icon: FileText },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-5">
              <stat.icon className="w-5 h-5 text-white/55 mb-3" />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// VALIDATED RESEARCH BRIEFS SECTION - AI Architect Authority
// ============================================================================

function ResearchBriefsSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="briefs" className="py-16 md:py-24 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header with studio energy */}
        <div className="mb-12">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Validated Research
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Research Briefs
          </h2>

          {/* Studio energy hook */}
          <p className="text-lg text-white/70 mb-2 max-w-3xl">
            Think of research like pre-production. Before you mix, you scout. Before you build, you map.
          </p>
          <p className="text-base text-white/50 max-w-3xl">
            Every stat has a source. Every claim is validated. No opinions—just evidence for AI architects.
          </p>
        </div>

        {/* Research briefs grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {researchBriefs.map((brief, index) => (
            <motion.div
              key={brief.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1 }}
            >
              <Link href={`/research/briefs/${brief.slug}`} className="block group">
                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {brief.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <Clock className="h-3 w-3" />
                      <span>{brief.lastValidated}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">
                    {brief.title}
                  </h3>
                  <p className="text-white/60 mb-4 leading-relaxed">
                    {brief.description}
                  </p>

                  {/* Key Stats */}
                  <div className="mb-4 space-y-2">
                    {brief.keyStats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-white/70">{stat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="text-xs text-white/40">
                      {brief.sources} validated sources
                    </span>
                    <span className="flex items-center gap-1 text-sm text-cyan-400 group-hover:text-cyan-300">
                      Read brief
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Link to AI Architecture Hub */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/ai-architecture"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors"
          >
            <Layers className="h-4 w-4" />
            Explore AI Architecture Hub for blueprints & prototypes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// RESEARCH DOMAINS SECTION
// ============================================================================

function ResearchDomainsSection() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="domains" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Research Domains
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Four interconnected areas of exploration, each informing and enriching the others.
            Where AI meets consciousness meets human potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {researchDomains.map((domain, index) => {
            const Icon = domain.icon
            const isActive = activeDomain === domain.id
            const colorClasses = {
              emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
              amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10' },
              purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10' },
            }[domain.color]

            return (
              <motion.div
                key={domain.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1 }}
                className={`
                  relative group cursor-pointer
                  bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8
                  hover:bg-white/[0.05] hover:${colorClasses?.border} transition-all duration-300
                  ${isActive ? colorClasses?.border : ''}
                `}
                onClick={() => setActiveDomain(isActive ? null : domain.id)}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${colorClasses?.bg} rounded-xl`}>
                      <Icon className={`w-6 h-6 ${colorClasses?.text}`} />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white/60 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{domain.name}</h3>
                  <p className="text-white/60 mb-4">{domain.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {domain.topics.slice(0, isActive ? undefined : 3).map((topic, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60"
                      >
                        {topic}
                      </span>
                    ))}
                    {!isActive && domain.topics.length > 3 && (
                      <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/55">
                        +{domain.topics.length - 3} more
                      </span>
                    )}
                  </div>
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
// RESEARCH COUNCIL SECTION
// ============================================================================

function ResearchCouncilSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="council" className="py-16 md:py-24 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Research Council
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Five specialized AI agents that collaborate on daily research operations.
            Each brings unique expertise to synthesize comprehensive intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchCouncil.map((agent, index) => {
            const Icon = agent.icon
            const colorClasses = {
              emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/10' },
              cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'shadow-cyan-500/10' },
              amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/10' },
              purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'shadow-purple-500/10' },
              rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/10' },
            }[agent.color]

            return (
              <motion.div
                key={agent.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1 }}
                className={`
                  bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6
                  hover:bg-white/[0.05] transition-all group
                `}
              >
                <div className={`p-3 ${colorClasses?.bg} rounded-xl w-fit mb-4 group-hover:shadow-lg ${colorClasses?.glow} transition-all`}>
                  <Icon className={`w-6 h-6 ${colorClasses?.text}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                <p className={`text-sm ${colorClasses?.text} mb-3`}>{agent.role}</p>
                <p className="text-sm text-white/50">{agent.specialty}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// METHODOLOGY SECTION
// ============================================================================

function MethodologySection() {
  const shouldReduceMotion = useReducedMotion()

  const phases = [
    {
      number: '01',
      title: 'Signal Detection',
      description: 'Continuous scanning of news, papers, discussions, and social signals across all research domains',
      icon: Search,
    },
    {
      number: '02',
      title: 'Deep Research',
      description: 'Multi-agent deep dives into promising signals, cross-referencing across sources',
      icon: Microscope,
    },
    {
      number: '03',
      title: 'Synthesis',
      description: 'Pattern recognition and insight extraction, connecting dots across domains',
      icon: Lightbulb,
    },
    {
      number: '04',
      title: 'Publication',
      description: 'Transform insights into SEO-optimized articles, threads, and knowledge artifacts',
      icon: FileText,
    },
  ]

  return (
    <section id="methodology" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Research Methodology
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            A systematic approach to transforming information overload into actionable intelligence.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

          <div className="grid md:grid-cols-4 gap-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <motion.div
                  key={phase.number}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.15 }}
                  className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0a0a0b] border border-white/10 rounded-full">
                    <span className="text-xs font-bold text-emerald-400">{phase.number}</span>
                  </div>

                  <div className="pt-4">
                    <div className="mx-auto w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white/60" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-sm text-white/50">{phase.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10 blur-3xl rounded-full" />

          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <Globe className="w-12 h-12 text-white/20 mx-auto mb-6" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Subscribe to Research Briefs
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Get weekly intelligence briefs synthesizing the most important developments
              across AI, consciousness, and human potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inner-circle"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Join Inner Circle
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-4 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Read Published Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10">
        <HeroSection />
        <ResearchBriefsSection />
        <ResearchDomainsSection />
        <ResearchCouncilSection />
        <MethodologySection />
        <CTASection />

        {/* Footer note */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 text-center">
          <p className="text-sm text-white/55">
            Research intelligence powered by multi-agent AI collaboration.
            Insights synthesized for the conscious creator.
          </p>
        </div>
      </div>
    </main>
  )
}
