'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Monitor, GitBranch, Database, Eye, Shield } from 'lucide-react'

const layers = [
  { num: 5, name: 'Interface', desc: 'User interaction layer', tools: 'Open WebUI, LibreChat, Custom Apps', icon: Monitor, color: '#C74634' },
  { num: 4, name: 'Orchestration', desc: 'Agent coordination and routing', tools: 'LangGraph, CrewAI, AutoGen, Oracle ADK', icon: GitBranch, color: '#a855f7' },
  { num: 3, name: 'Memory', desc: 'Knowledge persistence and retrieval', tools: 'Mem0, Graphiti, Qdrant, Oracle AI DB 26ai', icon: Database, color: '#3b82f6' },
  { num: 2, name: 'Observability', desc: 'Monitoring, traces, and evaluation', tools: 'Langfuse, LangSmith, Arize, OCI Monitoring', icon: Eye, color: '#10b981' },
  { num: 1, name: 'Gateway', desc: 'Unified API routing and cost control', tools: 'LiteLLM, Portkey, Martian, OCI GenAI', icon: Shield, color: '#f59e0b' },
]

const architectures = [
  {
    name: 'Personal Stack',
    desc: 'For individual AI practitioners',
    components: ['Ollama (local LLM)', 'Open WebUI (interface)', 'ChromaDB (vectors)', 'LiteLLM (routing)'],
    cost: 'Free - $50/mo',
  },
  {
    name: 'Creator Stack',
    desc: 'For content creators and small teams',
    components: ['OpenAI / Anthropic APIs', 'Custom Next.js app', 'Pinecone (vectors)', 'Langfuse (observability)'],
    cost: '$50 - $500/mo',
  },
  {
    name: 'Enterprise Stack',
    desc: 'For organizations with compliance requirements',
    components: ['OCI GenAI (managed)', 'Oracle AI DB 26ai (vectors)', 'OCI AI Blueprints (inference)', 'OCI Monitoring (observability)'],
    cost: '$500 - $50K/mo',
  },
  {
    name: 'Sovereign Stack',
    desc: 'For regulated industries and governments',
    components: ['Dedicated AI Clusters (private)', 'Air-gapped OCI region', 'Self-hosted vLLM', 'Enterprise audit logging'],
    cost: '$10K - $500K/mo',
  },
]

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(199,70,52,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,70,52,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-0 w-[40%] h-[40%]" style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <main className="relative z-10">
        <nav className="px-6 py-4">
          <Link href="/ai-ops" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to AI Ops Hub
          </Link>
        </nav>

        <section className="pt-8 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[#3b82f6] font-mono text-sm mb-4 tracking-wider uppercase">Master Architecture</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">The 5-Layer AI Ops Stack</h1>
              <p className="text-white/50 text-lg max-w-2xl">
                A complete reference architecture for building production AI operations,
                from gateway routing to user interfaces.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 5-Layer Stack */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-3">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 w-48 shrink-0">
                  <span className="text-2xl font-bold" style={{ color: layer.color }}>{layer.num}</span>
                  <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
                  <span className="font-bold">{layer.name}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 mb-1">{layer.desc}</p>
                  <p className="text-xs text-white/30 font-mono">{layer.tools}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reference Architectures */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Reference Architectures</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {architectures.map((arch, i) => (
                <motion.div
                  key={arch.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <h3 className="text-lg font-bold mb-1">{arch.name}</h3>
                  <p className="text-sm text-white/40 mb-4">{arch.desc}</p>
                  <ul className="space-y-2 mb-4">
                    {arch.components.map(c => (
                      <li key={c} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="w-1 h-1 rounded-full bg-[#C74634]" /> {c}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/30 font-mono">{arch.cost}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-white/30">Research compiled by FrankX Research Council - 2026</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
