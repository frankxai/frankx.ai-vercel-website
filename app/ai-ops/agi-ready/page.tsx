'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Brain, Database, Zap, Clock, Cpu, Sparkles } from 'lucide-react'

const memoryLayers = [
  { name: 'Working Memory', purpose: 'Active task context', retention: 'Seconds-minutes', speed: 'O(1)', icon: Zap, color: '#C74634' },
  { name: 'Episodic Memory', purpose: 'Specific experiences', retention: 'Days-months', speed: 'O(log n)', icon: Clock, color: '#f59e0b' },
  { name: 'Semantic Memory', purpose: 'General knowledge', retention: 'Permanent', speed: 'O(log n)', icon: Database, color: '#3b82f6' },
  { name: 'Procedural Memory', purpose: 'Skills & methods', retention: 'Permanent', speed: 'O(1)', icon: Cpu, color: '#10b981' },
]

const timeline = [
  { year: '2024', milestone: 'Foundation Models', capability: 'GPT-4, Claude 3, Gemini — core reasoning capabilities', color: '#71717a' },
  { year: '2025', milestone: 'Agentic AI', capability: 'Tool use, reasoning chains, multi-step planning', color: '#f59e0b' },
  { year: '2026', milestone: 'Memory Systems', capability: 'Persistent context, learning, temporal knowledge graphs', color: '#10b981' },
  { year: '2027', milestone: 'Self-Improvement', capability: 'Automated prompt optimization, architecture search', color: '#3b82f6' },
  { year: '2028', milestone: 'Multi-Agent Ecosystems', capability: 'Coordinated intelligence, emergent specialization', color: '#a855f7' },
  { year: '2030', milestone: 'Proto-AGI', capability: 'Domain-general reasoning, transfer learning across fields', color: '#C74634' },
]

const papers = [
  { title: 'Memory in the Age of AI Agents', source: 'arXiv:2512.13564', finding: 'New taxonomy beyond long/short-term memory' },
  { title: 'A-MEM: Agentic Memory', source: 'arXiv:2502.12110', finding: 'Zettelkasten-inspired knowledge networks for agents' },
  { title: 'Mem0 Production Systems', source: 'arXiv:2504.19413', finding: '26% accuracy boost, 90% token savings with persistent memory' },
  { title: 'Graphiti Temporal Graphs', source: 'arXiv:2501.13956', finding: 'Episode → Entity → Relationship layers for temporal reasoning' },
]

export default function AGIReadyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(199,70,52,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,70,52,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/4 w-[40%] h-[40%]" style={{ background: 'radial-gradient(ellipse at center, rgba(199,70,52,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
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
              <p className="text-[#C74634] font-mono text-sm mb-4 tracking-wider uppercase">AGI-Ready Systems</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">The Path to AGI</h1>
              <p className="text-white/50 text-lg max-w-2xl">
                Memory hierarchies, self-improvement loops, and the architecture patterns
                that will bridge today&apos;s AI to tomorrow&apos;s general intelligence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Memory Hierarchy */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">The 4-Layer Memory Hierarchy</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {memoryLayers.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-center"
                >
                  <m.icon className="w-8 h-8 mx-auto mb-4" style={{ color: m.color }} />
                  <h3 className="font-bold mb-2">{m.name}</h3>
                  <p className="text-sm text-white/50 mb-3">{m.purpose}</p>
                  <div className="flex justify-center gap-4 text-xs text-white/30">
                    <span>{m.retention}</span>
                    <span className="font-mono">{m.speed}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergence Timeline */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Emergence Timeline</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-start gap-6 pb-8"
                >
                  <div className="relative z-10 w-16 shrink-0 text-right">
                    <span className="text-lg font-bold" style={{ color: t.color }}>{t.year}</span>
                  </div>
                  <div className="absolute left-[31px] top-2 w-3 h-3 rounded-full border-2" style={{ borderColor: t.color, backgroundColor: '#0a0a0b' }} />
                  <div className="flex-1 pl-4">
                    <h3 className="font-bold mb-1">{t.milestone}</h3>
                    <p className="text-sm text-white/40">{t.capability}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Papers */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Key Research (2025-2026)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {papers.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <h3 className="font-bold mb-1 text-sm">{p.title}</h3>
                  <p className="text-xs text-white/30 font-mono mb-3">{p.source}</p>
                  <p className="text-sm text-white/50">{p.finding}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-white/30">Research compiled by FrankX Research Council - 2026</p>
            <p className="text-xs text-white/15 mt-2">
              &ldquo;AI Ops is not a product. It&rsquo;s a practice. The infrastructure you build today determines the intelligence you can deploy tomorrow.&rdquo;
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
