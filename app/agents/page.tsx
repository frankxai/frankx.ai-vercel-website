'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Network,
  Shield,
  Zap,
  GitBranch,
  Database,
  Bot,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal,
  Activity
} from 'lucide-react'
import Link from 'next/link'

// ============================================================================
// DATA
// ============================================================================

const coreAgents = [
  {
    name: 'Claude',
    role: 'Story & Resonance Lead',
    description: 'Translates the musician-technologist journey into language and experiences.',
    icon: Sparkles,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20'
  },
  {
    name: 'Codex',
    role: 'Systems Architect',
    description: 'Designs the technical foundations, APIs, and data models.',
    icon: Database,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  {
    name: 'Gemini',
    role: 'Guardian Engineer',
    description: 'Implementation lead ensuring quality, performance, and reliability.',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20'
  },
  {
    name: 'OpenCode',
    role: 'Autonomous Builder',
    description: 'Rapid prototyping and execution of experimental features.',
    icon: Terminal,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20'
  }
]

const capabilities = [
  {
    title: 'Hive Mind Coordination',
    value: 'Queen-Led',
    description: 'Hierarchical swarms with strategic, tactical, and adaptive coordination.',
    icon: Network,
  },
  {
    title: 'Neural Learning',
    value: 'SONA + EWC++',
    description: 'Self-optimizing architecture that learns from every interaction without forgetting.',
    icon: Cpu,
  },
  {
    title: 'Vector Memory',
    value: 'RuVector',
    description: 'Enterprise-grade PostgreSQL vector database with 150x faster retrieval.',
    icon: Database,
  },
  {
    title: 'Security Layer',
    value: 'AIDefence',
    description: 'Real-time threat detection, injection prevention, and CVE scanning.',
    icon: Shield,
  }
]

// ============================================================================
// COMPONENT
// ============================================================================

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-void text-white grain-overlay">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Agentic Orchestration Layer</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Four minds.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                One mission.
              </span>
            </h1>
            
            <p className="text-xl text-white/50 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              The FrankX ecosystem is powered by a coordinated swarm of specialized AI agents.
              They don't just chat—they build, test, deploy, and evolve the system autonomously.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300">
                Explore the System
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Team Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-white/60">
              The Core Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreAgents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium rounded-3xl p-8 group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl ${agent.bg} ${agent.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <agent.icon className={`w-7 h-7 ${agent.color}`} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{agent.name}</h3>
                <p className={`text-sm font-medium ${agent.color} mb-4 uppercase tracking-wider`}>{agent.role}</p>
                <p className="text-white/50 leading-relaxed">
                  {agent.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Capabilities */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
           <div className="flex items-center gap-3 mb-16">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-white/60">
              System Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 p-6 rounded-3xl border border-white/5 bg-void/50 hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <cap.icon className="w-6 h-6 text-white/70" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{cap.title}</h3>
                  <div className="text-sm font-medium text-cyan-400 mb-2">{cap.value}</div>
                  <p className="text-white/40 leading-relaxed text-sm">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture (Visual) */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-indigo-950/20 to-void pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-400">Claude-Flow v3 Architecture</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
            Self-Optimizing Neural Architecture
          </h2>
          
          <p className="text-xl text-white/50 max-w-3xl mx-auto mb-16 leading-relaxed">
            The system doesn't just execute code; it learns. Using <span className="text-white font-medium">SONA</span> and <span className="text-white font-medium">RuVector</span>, 
            agents optimize their routing paths, remember successful patterns, and prevent catastrophic forgetting.
          </p>

          <div className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-void rounded-[22px] overflow-hidden border border-white/5 p-8 md:p-16">
              {/* Abstract Code/Architecture Visual */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="space-y-4">
                  <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">54+ Agents</h3>
                  <p className="text-sm text-white/40">Specialized workers for every domain: Security, Database, Frontend, DevOps.</p>
                </div>
                <div className="space-y-4">
                  <div className="h-1 w-12 bg-cyan-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">150x Faster</h3>
                  <p className="text-sm text-white/40">HNSW Vector Search enables millisecond retrieval of complex architectural patterns.</p>
                </div>
                <div className="space-y-4">
                  <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                  <h3 className="text-xl font-bold text-white">0.05ms Adaptation</h3>
                  <p className="text-sm text-white/40">Real-time learning loops optimize agent routing instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-white mb-6">
          Ready to deploy the swarm?
        </h2>
        <Link
          href="/start"
          className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors text-lg"
        >
          Initialize Agent System
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  )
}