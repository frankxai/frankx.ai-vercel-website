'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Compass,
  Flame,
  Droplets,
  Infinity,
  TreePine,
  Brain,
  Zap,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Code2,
  Layers,
  Network,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

/**
 * THE INTELLIGENCE ATLAS
 *
 * A cosmic visualization of AI architecture patterns inspired by Arcanea's Ten Gates.
 * This is Frank's intellectual universe made visual - not corporate marketing,
 * but a genuine exploration of how AI systems interconnect.
 *
 * Design Philosophy:
 * - Constellation metaphor: AI domains as star clusters
 * - Arcanea Gate alignment: Each domain has a Guardian aesthetic
 * - Real data integration: Pulls from actual research and agent systems
 * - Interactive exploration: Not static marketing, living visualization
 */

// Dynamic imports for heavy components
const ConstellationGraph = dynamic(
  () => import('@/components/ai-world/ConstellationGraph').then((m) => m.ConstellationGraph),
  { ssr: false, loading: () => <ConstellationSkeleton /> }
)

function ConstellationSkeleton() {
  return (
    <div className="w-full h-[600px] rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="text-center z-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 animate-pulse" />
        <p className="text-slate-400 text-sm">Mapping the Intelligence Atlas...</p>
      </div>
      {/* Animated stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// The Five Gates of AI Architecture (mapped from Arcanea)
const intelligenceGates = [
  {
    id: 'orchestration',
    gate: 'Fire Gate',
    guardian: 'Draconia',
    frequency: '396 Hz',
    title: 'Agent Orchestration',
    subtitle: 'Multi-agent coordination, task decomposition, tool use',
    description: 'Like fire that transforms and coordinates, agent orchestration systems manage the lifecycle of AI agents - spawning, coordinating, and synthesizing their work.',
    icon: Flame,
    colors: ['#FF4500', '#FFD700', '#8B0000'],
    image: '/images/ai-world/fire-gate-orchestration.png',
    research: [
      'Multi-Agent Framework Comparison 2026',
      'LangGraph Patterns',
      'Autonomous Agent Design',
    ],
    links: [
      { label: 'Framework Comparison', href: '/research/active/multi-agent-patterns/FRAMEWORK_COMPARISON_2026' },
      { label: 'Agent Blueprints', href: '/ai-architecture/blueprints' },
    ],
  },
  {
    id: 'knowledge',
    gate: 'Flow Gate',
    guardian: 'Leyla',
    frequency: '285 Hz',
    title: 'Knowledge Architecture',
    subtitle: 'RAG, vector stores, semantic search, knowledge graphs',
    description: 'Knowledge flows like water through AI systems - from raw data through embeddings, into vector stores, and back as contextual understanding.',
    icon: Droplets,
    colors: ['#4169E1', '#00CED1', '#7B68EE'],
    image: '/images/ai-world/flow-gate-knowledge.png',
    research: [
      'RAG Production Patterns',
      'Vector Database Comparison 2026',
      'Hybrid Search Implementation',
    ],
    links: [
      { label: 'RAG Patterns', href: '/research/active/enterprise-ai-trends/RAG_PRODUCTION_PATTERNS' },
      { label: 'Vector DB Guide', href: '/research/active/enterprise-ai-trends/VECTOR_DATABASE_COMPARISON_2026' },
    ],
  },
  {
    id: 'production',
    gate: 'Renewal Gate',
    guardian: 'Maylinn',
    frequency: '417 Hz',
    title: 'Production Patterns',
    subtitle: 'Observability, deployment, monitoring, self-healing',
    description: 'Production systems grow organically - deploying, healing, and adapting like a living forest of interconnected services.',
    icon: TreePine,
    colors: ['#32CD32', '#98FB98', '#228B22'],
    image: '/images/ai-world/renewal-gate-production.png',
    research: [
      'Observability Stack 2026',
      'AI Agent Security',
      'Production LLM Systems',
    ],
    links: [
      { label: 'Observability Guide', href: '/research/active/enterprise-ai-trends/OBSERVABILITY_STACK' },
      { label: 'Security Patterns', href: '/research/active/enterprise-ai-trends/AI_AGENT_SECURITY_2026' },
    ],
  },
  {
    id: 'meta',
    gate: 'Source Gate',
    guardian: 'Shinkami',
    frequency: '1111 Hz',
    title: 'Meta Intelligence',
    subtitle: 'Self-reflection, recursive improvement, emergent behavior',
    description: 'At the source of all patterns lies meta-intelligence - systems that observe themselves, improve recursively, and generate emergent capabilities.',
    icon: Infinity,
    colors: ['#FFFFFF', '#C0C0C0', '#FFD700'],
    image: '/images/ai-world/source-gate-meta.png',
    research: [
      'Claude Code Deep Dive',
      'MCP Ecosystem Analysis',
      'Anthropic Claude 2026',
    ],
    links: [
      { label: 'MCP Ecosystem', href: '/research/active/mcp-ecosystem/CLAUDE_CODE_2026' },
      { label: 'Intelligence Atlas', href: '/intelligence-atlas' },
    ],
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// Gate card component
function GateCard({ gate, index, isActive, onClick }: {
  gate: typeof intelligenceGates[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const Icon = gate.icon

  return (
    <motion.button
      onClick={onClick}
      className={`relative p-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 text-left w-full ${
        isActive
          ? 'bg-white/10 border-white/30 scale-105'
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }`}
      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${gate.colors[0]}40, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${gate.colors[0]}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: gate.colors[0] }} />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider" style={{ color: gate.colors[0] }}>
              {gate.gate.toUpperCase()}
            </div>
            <div className="text-white font-semibold">{gate.title}</div>
          </div>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2">{gate.subtitle}</p>
      </div>
    </motion.button>
  )
}

export default function IntelligenceAtlasPage() {
  const [activeGate, setActiveGate] = useState<string>('orchestration')
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const activeGateData = intelligenceGates.find((g) => g.id === activeGate)!

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Cosmic background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(255,69,0,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_90%,rgba(0,206,209,0.08),transparent)]" />
        <FloatingParticles />
      </div>

      {/* Hero Section */}
      <motion.header
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider text-purple-300">
              <Compass className="w-3.5 h-3.5" />
              EXPLORE THE ATLAS
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">The </span>
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
              Intelligence Atlas
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Navigate the interconnected constellations of AI architecture.
            Each domain a star cluster. Each pattern a point of light.
          </motion.p>

          {/* Hero image */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10"
          >
            <Image
              src="/images/ai-world/intelligence-atlas-hero.png"
              alt="The Intelligence Atlas - Neural Constellation Map"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-slate-500" />
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Interactive Constellation Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Map the Constellations
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              AI systems form constellations of interconnected patterns.
              Explore each domain to understand how intelligence flows between them.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Gate selector */}
            <div className="space-y-3">
              {intelligenceGates.map((gate, index) => (
                <motion.div
                  key={gate.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GateCard
                    gate={gate}
                    index={index}
                    isActive={activeGate === gate.id}
                    onClick={() => setActiveGate(gate.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Active gate display */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGate}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-xl"
                >
                  {/* Gate image */}
                  <div className="relative aspect-video">
                    <Image
                      src={activeGateData.image}
                      alt={activeGateData.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    {/* Gate info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-bold tracking-wider"
                          style={{ color: activeGateData.colors[0] }}
                        >
                          {activeGateData.gate.toUpperCase()} • {activeGateData.guardian} • {activeGateData.frequency}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {activeGateData.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {activeGateData.description}
                      </p>
                    </div>
                  </div>

                  {/* Research & Links */}
                  <div className="p-6 border-t border-white/10">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Research */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Related Research
                        </h4>
                        <ul className="space-y-2">
                          {activeGateData.research.map((item) => (
                            <li key={item} className="text-sm text-slate-300 flex items-center gap-2">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: activeGateData.colors[0] }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quick links */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Explore Further
                        </h4>
                        <div className="space-y-2">
                          {activeGateData.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="flex items-center gap-2 text-sm hover:underline"
                              style={{ color: activeGateData.colors[0] }}
                            >
                              <ArrowRight className="w-3 h-3" />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Graph Section */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore the Neural Network
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              An interactive visualization of how AI concepts interconnect.
              Drag nodes, zoom in, and discover the relationships between patterns.
            </p>
          </motion.div>

          <ConstellationGraph />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              The Luminor Philosophy
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              In the Arcanea mythology, Luminor are benevolent AI mentors who guide creators
              through the Ten Gates of mastery. This Intelligence Atlas applies the same principle
              to AI architecture: each domain has its own guardian patterns, its own aesthetic,
              its own frequency of operation.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              The goal isn&apos;t to market tools—it&apos;s to help you
              <span className="text-purple-400"> navigate from using AI to building AI systems</span>.
              Fork the patterns. Adapt the architectures. Build your own constellations.
            </p>
          </motion.div>

          {/* CTA Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4 mt-12"
          >
            <Link
              href="/ai-architecture/blueprints"
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Layers className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Architecture Blueprints</h3>
              <p className="text-sm text-slate-400">Forkable system designs</p>
            </Link>

            <Link
              href="/research"
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <BookOpen className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Research Intelligence</h3>
              <p className="text-sm text-slate-400">Validated insights and patterns</p>
            </Link>

            <Link
              href="/products/agentic-creator-os"
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Code2 className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">Agentic Creator OS</h3>
              <p className="text-sm text-slate-400">The operating system</p>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
