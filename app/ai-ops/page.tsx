'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Globe,
  Layers,
  LineChart,
  Rocket,
  Search,
  Server,
  Sparkles,
  Target,
  Truck,
  Video,
  Zap,
  BookOpen,
  FileText,
  TrendingUp,
  Shield,
  Network,
} from 'lucide-react'

// ============================================================================
// DESIGN DIRECTION: Technical Precision meets Oracle Enterprise
// DFII Score: 13/15 (Excellent)
// Aesthetic: Industrial utilitarian + luxury minimal hybrid
// Differentiation: Blueprint grid overlay, Oracle Red accents, data-driven cards
// ============================================================================

const colors = {
  bg: '#0a0a0b',
  bgElevated: '#111113',
  bgSubtle: '#18181b',
  accent: {
    primary: '#C74634',    // Oracle Red
    secondary: '#10b981',  // Emerald - AI/Tech
    tertiary: '#3b82f6',   // Blue - Enterprise
    quaternary: '#a855f7', // Purple - Innovation
  },
  text: {
    primary: '#fafafa',
    secondary: 'rgba(250, 250, 250, 0.7)',
    tertiary: 'rgba(250, 250, 250, 0.5)',
    muted: 'rgba(250, 250, 250, 0.3)',
  }
}

// ============================================================================
// AURORA BACKGROUND - AI Ops themed gradients
// ============================================================================

function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(199, 70, 52, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199, 70, 52, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Oracle Red aurora */}
      <motion.div
        className="absolute top-0 right-0 w-[60%] h-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(199, 70, 52, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : { x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Emerald aurora - Tech */}
      <motion.div
        className="absolute bottom-0 left-0 w-[50%] h-[40%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={shouldReduceMotion ? undefined : { x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blue aurora - Enterprise */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[40%] h-[40%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={shouldReduceMotion ? undefined : { x: [0, 20, 0], y: [0, 30, 0], scale: [1, 1.03, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ============================================================================
// STAT CARD COMPONENT
// ============================================================================

function StatCard({ value, label, icon: Icon, color }: {
  value: string
  label: string
  icon: React.ComponentType<{className?: string; style?: React.CSSProperties}>
  color: string
}) {
  return (
    <motion.div
      className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        {value}
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </motion.div>
  )
}

// ============================================================================
// ACCELERATOR PACK CARD
// ============================================================================

function AcceleratorCard({
  title,
  description,
  icon: Icon,
  color,
  tags,
  href
}: {
  title: string
  description: string
  icon: React.ComponentType<{className?: string; style?: React.CSSProperties}>
  color: string
  tags: string[]
  href: string
}) {
  return (
    <motion.div
      className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
      whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.15)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/50 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// KNOWLEDGE BASE CARD
// ============================================================================

function KnowledgeCard({
  title,
  description,
  readTime,
  icon: Icon,
  href,
  badge
}: {
  title: string
  description: string
  readTime: string
  icon: React.ComponentType<{className?: string; style?: React.CSSProperties}>
  href: string
  badge?: string
}) {
  return (
    <Link href={href}>
      <motion.div
        className="group relative p-5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white/60" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-white truncate">{title}</h4>
              {badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-[#C74634]/20 text-[#C74634] font-medium">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-white/40 line-clamp-2">{description}</p>
          </div>
          <div className="text-xs text-white/30 flex-shrink-0">{readTime}</div>
        </div>
      </motion.div>
    </Link>
  )
}

// ============================================================================
// TECH STACK BADGE
// ============================================================================

function TechBadge({ name, category }: { name: string; category: 'gateway' | 'observability' | 'memory' | 'orchestration' | 'inference' }) {
  const categoryColors = {
    gateway: '#C74634',
    observability: '#10b981',
    memory: '#a855f7',
    orchestration: '#3b82f6',
    inference: '#f59e0b',
  }

  return (
    <span
      className="px-3 py-1.5 text-sm rounded-lg font-medium"
      style={{
        backgroundColor: `${categoryColors[category]}15`,
        color: categoryColors[category],
        border: `1px solid ${categoryColors[category]}30`,
      }}
    >
      {name}
    </span>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AIOpsPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      <AuroraBackground />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="px-3 py-1 text-sm rounded-full bg-[#C74634]/10 text-[#C74634] border border-[#C74634]/20 font-medium">
                Research Hub v3.0
              </span>
              <span className="text-white/30">•</span>
              <span className="text-sm text-white/50">Updated Feb 2026</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI <span className="text-[#C74634]">Operations</span>
              <br />
              <span className="text-white/60">Research Hub</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
            >
              The operating layer for human-AI collaboration. Production-ready infrastructure,
              OCI AI Accelerator Packs, memory systems, and the path to AGI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link
                href="#accelerator-packs"
                className="group px-6 py-3 bg-[#C74634] text-white rounded-xl font-medium flex items-center gap-2 hover:bg-[#A33B2C] transition-colors"
              >
                <Rocket className="w-5 h-5" />
                AI Accelerator Packs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#knowledge-base"
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-white/10 transition-colors border border-white/10"
              >
                <BookOpen className="w-5 h-5" />
                Knowledge Base
              </Link>
              <a
                href="https://github.com/oracle-quickstart/oci-ai-blueprints"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-white/60 rounded-xl font-medium flex items-center gap-2 hover:text-white transition-colors"
              >
                <GitBranch className="w-5 h-5" />
                GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <StatCard value="$571B" label="Global AI Capex 2026" icon={TrendingUp} color="#C74634" />
              <StatCard value="40%" label="Enterprise Agent Adoption" icon={Brain} color="#10b981" />
              <StatCard value="+26%" label="Memory Accuracy Boost" icon={Database} color="#a855f7" />
              <StatCard value="90%" label="Token Savings (Mem0)" icon={Zap} color="#3b82f6" />
            </motion.div>
          </div>
        </section>

        {/* AI Accelerator Packs Section */}
        <section id="accelerator-packs" className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C74634]/10 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-[#C74634]" />
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-[#C74634]/10 text-[#C74634] font-medium">
                  OCI Official
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">OCI AI Accelerator Packs</h2>
              <p className="text-white/50 max-w-2xl">
                Production-ready GenAI stacks with NVIDIA enterprise software.
                Deploy in minutes, not weeks. Full observability included.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AcceleratorCard
                title="Route Optimizer"
                description="Fleet management and logistics optimization with NVIDIA cuOPT. 15-30% fuel cost reduction, 20-40% better on-time delivery."
                icon={Truck}
                color="#10b981"
                tags={['cuOPT', 'A100 GPU', 'Logistics']}
                href="/ai-ops/accelerator-packs#route-optimizer"
              />
              <AcceleratorCard
                title="Video Intelligence"
                description="Video search, summarization, and content moderation with NVIDIA Cosmos and Parakeet NIMs."
                icon={Video}
                color="#3b82f6"
                tags={['Cosmos', 'Parakeet', 'Media']}
                href="/ai-ops/accelerator-packs#video-intelligence"
              />
              <AcceleratorCard
                title="AI-Q Enterprise Reasoning"
                description="Enterprise knowledge chat agents. Self-hosted (16 A100s) or managed with OCI GenAI for cost optimization."
                icon={Brain}
                color="#a855f7"
                tags={['NVIDIA NIMs', 'Enterprise', 'Chat']}
                href="/ai-ops/accelerator-packs#ai-q-reasoning"
              />
              <AcceleratorCard
                title="GenAI Search Agent"
                description="Intelligent search interface powered by LLMs for employee and customer query resolution. Oracle Fusion integration."
                icon={Search}
                color="#f59e0b"
                tags={['RAG', 'LLM', 'Knowledge']}
                href="/ai-ops/accelerator-packs#genai-search"
              />
            </div>

            {/* Tech Stack */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="text-sm text-white/40 mb-4">Included in all packs:</div>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="Prometheus" category="observability" />
                <TechBadge name="Grafana" category="observability" />
                <TechBadge name="MLFlow" category="observability" />
                <TechBadge name="KEDA" category="orchestration" />
                <TechBadge name="vLLM" category="inference" />
                <TechBadge name="PostgreSQL" category="memory" />
              </div>
            </div>
          </div>
        </section>

        {/* 5-Layer Architecture Section */}
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[#10b981]" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The 5-Layer AI Ops Stack</h2>
              <p className="text-white/50 max-w-2xl">
                The complete architecture for production AI operations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { layer: '5', name: 'Interface', tools: 'Open WebUI, LibreChat', color: '#C74634', icon: Globe },
                { layer: '4', name: 'Orchestration', tools: 'LangGraph, CrewAI', color: '#3b82f6', icon: Network },
                { layer: '3', name: 'Memory', tools: 'Mem0, Qdrant', color: '#a855f7', icon: Database },
                { layer: '2', name: 'Observability', tools: 'Langfuse, LangSmith', color: '#10b981', icon: Eye },
                { layer: '1', name: 'Gateway', tools: 'LiteLLM, Portkey', color: '#f59e0b', icon: Server },
              ].map((item, index) => (
                <motion.div
                  key={item.layer}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center"
                >
                  <div
                    className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="text-xs text-white/30 mb-1">Layer {item.layer}</div>
                  <div className="font-semibold text-white mb-1">{item.name}</div>
                  <div className="text-xs text-white/40">{item.tools}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge Base Section */}
        <section id="knowledge-base" className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#a855f7]" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Knowledge Base</h2>
              <p className="text-white/50 max-w-2xl">
                Mastery-level documentation for AI architects. 400K+ tokens of structured knowledge.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <KnowledgeCard
                title="OCI AI Accelerator Packs"
                description="Complete guide to enterprise GenAI stacks, industry matrix, deployment sizing"
                readTime="25 min"
                icon={Rocket}
                href="/ai-ops/accelerator-packs"
                badge="NEW"
              />
              <KnowledgeCard
                title="AI Models 2026 State of the Art"
                description="Grok 4, GPT-5.2, Gemini 3, Claude Opus 4.5, Llama 4 MoE comparison"
                readTime="30 min"
                icon={Sparkles}
                href="/ai-ops/models-2026"
              />
              <KnowledgeCard
                title="Master Architecture"
                description="Complete 5-layer stack with 4 reference architectures"
                readTime="45 min"
                icon={Layers}
                href="/ai-ops/architecture"
              />
              <KnowledgeCard
                title="Implementation Patterns"
                description="6 production patterns with Python code examples"
                readTime="60 min"
                icon={FileText}
                href="/ai-ops/patterns"
              />
              <KnowledgeCard
                title="Maturity Model"
                description="6-level assessment framework and transition guides"
                readTime="40 min"
                icon={Target}
                href="/ai-ops/maturity"
              />
              <KnowledgeCard
                title="AGI-Ready Systems"
                description="Memory hierarchies and self-improvement loops"
                readTime="30 min"
                icon={Brain}
                href="/ai-ops/agi-ready"
              />
            </div>
          </div>
        </section>

        {/* Frontier Models Section */}
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#f59e0b]" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">2026 Frontier Models</h2>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-8 text-sm font-medium text-white/50">Model</th>
                    <th className="pb-4 pr-8 text-sm font-medium text-white/50">Organization</th>
                    <th className="pb-4 text-sm font-medium text-white/50">Key Achievement</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { model: 'Grok 4.1', org: 'xAI', achievement: '#1 LMArena (1483 Elo), 65% hallucination reduction' },
                    { model: 'GPT-5.2 Pro', org: 'OpenAI', achievement: 'First 90% ARC-AGI, 390x cost reduction' },
                    { model: 'Gemini 3 Pro', org: 'Google', achievement: 'Best multimodal (81% MMMU-Pro)' },
                    { model: 'Claude Opus 4.5', org: 'Anthropic', achievement: 'Best coding (80.9% SWE-bench)' },
                    { model: 'Llama 4 Maverick', org: 'Meta', achievement: 'Open-weight MoE (400B/17B active)' },
                  ].map((row, i) => (
                    <tr key={row.model} className="border-b border-white/5">
                      <td className="py-4 pr-8 font-medium text-white">{row.model}</td>
                      <td className="py-4 pr-8 text-white/60">{row.org}</td>
                      <td className="py-4 text-white/40">{row.achievement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started</h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Deploy production AI infrastructure in minutes with OCI AI Blueprints.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/oracle-quickstart/oci-ai-blueprints/blob/main/GETTING_STARTED_README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 bg-[#C74634] text-white rounded-xl font-medium flex items-center gap-2 hover:bg-[#A33B2C] transition-colors"
              >
                <Rocket className="w-5 h-5" />
                Install AI Blueprints
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/oracle-quickstart/oci-ai-blueprints"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-white/10 transition-colors border border-white/10"
              >
                <GitBranch className="w-5 h-5" />
                View Repository
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-white/30 mb-4">
              Research compiled by FrankX Research Council • 2026
            </p>
            <p className="text-xs text-white/20">
              "AI Ops is not a product. It's a practice. The infrastructure you build today determines the intelligence you can deploy tomorrow."
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
