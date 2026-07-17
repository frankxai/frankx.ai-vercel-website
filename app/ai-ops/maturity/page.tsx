'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Circle, Minus, Zap, Settings, Brain, Sparkles } from 'lucide-react'

const levels = [
  { level: 0, name: 'Ad-hoc', desc: 'No system, random tool usage', icon: Circle, color: '#71717a', traits: ['Random tool selection', 'No tracking', 'Copy-paste workflows', 'No cost awareness'] },
  { level: 1, name: 'Reactive', desc: 'Basic tools, no observability', icon: Minus, color: '#f59e0b', traits: ['Single LLM provider', 'Manual prompting', 'No cost tracking', 'Individual usage'] },
  { level: 2, name: 'Organized', desc: 'Consolidated interfaces, basic routing', icon: Settings, color: '#3b82f6', traits: ['Unified interface (Open WebUI)', 'Multiple models accessible', 'Basic prompt templates', 'Team-level adoption'] },
  { level: 3, name: 'Systematic', desc: 'Observability, documented workflows', icon: Zap, color: '#10b981', traits: ['LLM gateway (LiteLLM)', 'Cost tracking per model', 'Trace-based debugging', 'Documented processes'] },
  { level: 4, name: 'Intelligent', desc: 'Agents, memory systems, automation', icon: Brain, color: '#a855f7', traits: ['Multi-agent systems', 'Persistent memory (Mem0)', 'Cascade routing (85% savings)', 'Self-improving prompts'] },
  { level: 5, name: 'Autonomous', desc: 'Self-improving, human-in-the-loop only', icon: Sparkles, color: '#C74634', traits: ['Autonomous optimization', 'Human approval for high-risk only', 'Cross-system orchestration', 'Continuous learning'] },
]

const assessment = [
  { q: 'Do you use multiple LLM providers?', l0: 'No', l3: 'Yes, via gateway', l5: 'Auto-selected per task' },
  { q: 'How do you track LLM costs?', l0: 'Not tracked', l3: 'Per-model tracking', l5: 'Real-time optimization' },
  { q: 'Do you use memory across sessions?', l0: 'No', l3: 'Basic context', l5: 'Temporal knowledge graphs' },
  { q: 'How are workflows documented?', l0: 'Not documented', l3: 'Written guides', l5: 'Self-documenting agents' },
  { q: 'Agent orchestration?', l0: 'None', l3: 'Manual chains', l5: 'Multi-agent mesh' },
]

export default function MaturityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(199,70,52,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,70,52,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute bottom-0 right-0 w-[50%] h-[40%]" style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
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
              <p className="text-[#a855f7] font-mono text-sm mb-4 tracking-wider uppercase">Maturity Model</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">The 6-Level AI Ops Journey</h1>
              <p className="text-white/50 text-lg max-w-2xl">
                Assess your current AI operations maturity and chart a path to autonomous intelligence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Maturity Staircase */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-4">
            {levels.map((l, i) => (
              <motion.div
                key={l.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5"
                style={{ marginLeft: `${l.level * 16}px` }}
              >
                <div className="shrink-0 flex items-center gap-3 w-40">
                  <span className="text-2xl font-bold" style={{ color: l.color }}>{l.level}</span>
                  <l.icon className="w-5 h-5" style={{ color: l.color }} />
                  <span className="font-bold text-sm">{l.name}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/50 mb-3">{l.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {l.traits.map(t => (
                      <span key={t} className="px-2 py-1 text-xs rounded bg-white/5 text-white/40">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Quick Assessment</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Question</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Level 0</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Level 3</th>
                    <th className="pb-4 text-sm font-medium text-white/50">Level 5</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {assessment.map(a => (
                    <tr key={a.q} className="border-b border-white/5">
                      <td className="py-3 pr-6 text-white/70">{a.q}</td>
                      <td className="py-3 pr-6 text-white/30">{a.l0}</td>
                      <td className="py-3 pr-6 text-white/50">{a.l3}</td>
                      <td className="py-3 text-white/70">{a.l5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
