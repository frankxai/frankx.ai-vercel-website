'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Zap, Globe, Code, Eye, Brain, Search } from 'lucide-react'

const models = [
  { name: 'Grok 4.1', org: 'xAI', context: '2M', achievement: '#1 LMArena (1483 Elo)', tags: ['reasoning', 'agentic', 'long-context'], color: '#C74634' },
  { name: 'GPT-5.2 Pro', org: 'OpenAI', context: '256K', achievement: 'First 90% ARC-AGI', tags: ['reasoning', 'multimodal'], color: '#10b981' },
  { name: 'Gemini 3 Pro', org: 'Google', context: '1M', achievement: 'Best multimodal (81% MMMU-Pro)', tags: ['multimodal', 'reasoning', 'vision'], color: '#3b82f6' },
  { name: 'Claude Opus 4.5', org: 'Anthropic', context: '200K', achievement: 'Best coding (80.9% SWE-bench)', tags: ['coding', 'reasoning', 'agentic'], color: '#a855f7' },
  { name: 'Llama 4 Maverick', org: 'Meta', context: '256K', achievement: 'Open-weight MoE (400B/17B active)', tags: ['open-source', 'agentic', 'MoE'], color: '#f59e0b' },
  { name: 'Llama 4 Scout', org: 'Meta', context: '10M', achievement: '10M context, natively multimodal', tags: ['open-source', 'long-context', 'vision'], color: '#f59e0b' },
  { name: 'DeepSeek R1', org: 'DeepSeek', context: '128K', achievement: 'Open-source reasoning champion', tags: ['reasoning', 'open-source'], color: '#06b6d4' },
]

const ociModels = [
  { name: 'Cohere Command A Reasoning', provider: 'Cohere', context: '256K', useCase: 'Complex reasoning', eu: true },
  { name: 'Cohere Command A Vision', provider: 'Cohere', context: '256K', useCase: 'Multimodal', eu: true },
  { name: 'Cohere Embed 4', provider: 'Cohere', context: '-', useCase: 'Multimodal embeddings', eu: true },
  { name: 'Cohere Rerank 3.5', provider: 'Cohere', context: '-', useCase: 'Search relevance', eu: true },
  { name: 'Llama 4 Maverick', provider: 'Meta', context: '256K', useCase: 'Agentic, MoE', eu: false },
  { name: 'Llama 4 Scout', provider: 'Meta', context: '10M', useCase: 'Efficient agentic', eu: false },
  { name: 'Grok 4.1 Fast', provider: 'xAI', context: '2M', useCase: 'Long context, agentic', eu: false },
  { name: 'Grok Code Fast 1', provider: 'xAI', context: '-', useCase: 'Coding specialist', eu: false },
  { name: 'Gemini 2.5 Pro', provider: 'Google', context: '1M', useCase: 'Complex multimodal', eu: false },
  { name: 'Gemini 2.5 Flash-Lite', provider: 'Google', context: '-', useCase: 'Budget, high-volume', eu: false },
]

export default function Models2026Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(199,70,52,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,70,52,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute bottom-0 left-0 w-[50%] h-[40%]" style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
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
              <p className="text-[#a855f7] font-mono text-sm mb-4 tracking-wider uppercase">2026 Model Landscape</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frontier AI Models</h1>
              <p className="text-white/50 text-lg max-w-2xl">
                The complete landscape of frontier models and OCI GenAI model catalog for enterprise deployment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Frontier Models */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Frontier Models (February 2026)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                    <h3 className="font-bold">{m.name}</h3>
                  </div>
                  <p className="text-sm text-white/40 mb-2">{m.org} &bull; {m.context} context</p>
                  <p className="text-sm text-white/60 mb-4">{m.achievement}</p>
                  <div className="flex flex-wrap gap-1">
                    {m.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/40">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OCI GenAI Catalog */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">OCI GenAI Model Catalog</h2>
            <p className="text-white/40 text-sm mb-8">Available via OCI GenAI Service for enterprise deployment</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Model</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Provider</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Context</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Primary Use Case</th>
                    <th className="pb-4 text-sm font-medium text-white/50">EU</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {ociModels.map(m => (
                    <tr key={m.name} className="border-b border-white/5">
                      <td className="py-3 pr-6 font-medium text-white">{m.name}</td>
                      <td className="py-3 pr-6 text-white/60">{m.provider}</td>
                      <td className="py-3 pr-6 text-white/40 font-mono">{m.context}</td>
                      <td className="py-3 pr-6 text-white/40">{m.useCase}</td>
                      <td className="py-3">{m.eu ? <Globe className="w-4 h-4 text-[#10b981]" /> : <span className="text-white/20">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-white/20">
              Verify current model availability at docs.oracle.com/iaas/Content/generative-ai/pretrained-models.htm
            </p>
          </div>
        </section>

        {/* MoE Architecture */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Mixture of Experts (MoE) Architecture</h2>
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/60 mb-6">
                MoE is revolutionizing AI efficiency. Llama 4 Maverick has 400B total parameters but only activates 17B per token —
                running on a single H100 GPU with quantization while matching much larger dense models.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#f59e0b]">400B</p>
                  <p className="text-sm text-white/40">Total Parameters</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#10b981]">17B</p>
                  <p className="text-sm text-white/40">Active Per Token</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#3b82f6]">10M</p>
                  <p className="text-sm text-white/40">Context (Scout)</p>
                </div>
              </div>
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
