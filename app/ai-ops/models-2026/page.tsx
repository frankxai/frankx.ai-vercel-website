'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Globe, ExternalLink, TrendingUp, Cpu, Zap, Crown, ArrowUpRight } from 'lucide-react'

import { ModelArenaCard } from '@/components/ai-ops/ModelArenaCard'
import { BenchmarkRadar } from '@/components/llm-hub/BenchmarkRadar'
import { BenchmarkBarGroup } from '@/components/llm-hub/BenchmarkBarGroup'
import {
  formatContext,
  formatPricing,
  getAllModels,
  getProviders,
  type ModelEntry,
  type OrganizationEntry,
} from '@/lib/llm-hub/registry'

const ARENA_ORDER = [
  'gemini-3-5-flash',
  'gemini-3-5-pro',
  'claude-opus-4-6',
  'gpt-5-2-pro',
  'gemini-omni',
  'grok-4-1',
  'gemini-3-pro',
  'claude-opus-4-5',
  'claude-sonnet-4-5',
  'claude-haiku-4-5',
  'llama-4-maverick',
  'deepseek-v3-2',
  'mistral-large-3',
  'qwen3-coder-next',
  'command-a-reasoning',
]

const HIGHLIGHT_IDS = new Set(['gemini-3-5-flash', 'gemini-3-5-pro', 'gemini-omni', 'claude-opus-4-6'])

const RADAR_AXES = [
  { key: 'terminal_bench', label: 'Terminal-Bench' },
  { key: 'arc_agi_2', label: 'ARC-AGI-2' },
  { key: 'osworld', label: 'OSWorld' },
  { key: 'mmmu_pro', label: 'MMMU-Pro' },
  { key: 'mcp_atlas', label: 'MCP Atlas' },
  { key: 'charxiv', label: 'CharXiv' },
]

const RADAR_MODELS = [
  {
    name: 'Gemini 3.5 Flash',
    color: '#4285F4',
    scores: {
      terminal_bench: 76.2,
      arc_agi_2: 45.1,
      osworld: 0,
      mmmu_pro: 81.0,
      mcp_atlas: 83.6,
      charxiv: 84.2,
    },
  },
  {
    name: 'Claude Opus 4.6',
    color: '#a855f7',
    scores: {
      terminal_bench: 65.4,
      arc_agi_2: 68.8,
      osworld: 72.7,
      mmmu_pro: 0,
      mcp_atlas: 0,
      charxiv: 0,
    },
  },
  {
    name: 'GPT-5.2 Pro',
    color: '#10b981',
    scores: {
      terminal_bench: 0,
      arc_agi_2: 54.2,
      osworld: 0,
      mmmu_pro: 0,
      mcp_atlas: 0,
      charxiv: 0,
    },
  },
]

const externalResources = [
  { name: 'OpenRouter Model Rankings', url: 'https://openrouter.ai/rankings', description: 'Live pricing and performance rankings across all providers' },
  { name: 'LMArena Leaderboard', url: 'https://lmarena.ai/', description: 'Crowdsourced Elo ratings from human preference evaluations' },
  { name: 'ARC-AGI Benchmarks', url: 'https://arcprize.org/', description: 'Abstract reasoning challenge — the hardest AI benchmark' },
  { name: 'SWE-bench Verified', url: 'https://www.swebench.com/', description: 'Real-world software engineering task evaluation' },
  { name: 'Artificial Analysis', url: 'https://artificialanalysis.ai/', description: 'Independent speed, quality, and pricing benchmarks' },
  { name: 'SEAL Leaderboards', url: 'https://scale.com/leaderboard', description: 'Scale AI expert evaluations across enterprise tasks' },
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
  { name: 'Gemini 3.5 Flash', provider: 'Google', context: '1M', useCase: 'Cost-effective agentic', eu: false },
  { name: 'Gemini 2.5 Pro', provider: 'Google', context: '1M', useCase: 'Complex multimodal', eu: false },
]

function orgFor(providers: ReturnType<typeof getProviders>, model: ModelEntry): OrganizationEntry | undefined {
  return providers.find((p) => p.org.slug === model.organization || p.org.slug.includes(model.organization))?.org
}

export default function Models2026Page() {
  const allModels = getAllModels()
  const byId = new Map(allModels.map((m) => [m.id, m]))
  const providers = getProviders()

  const orderedModels = ARENA_ORDER.map((id) => byId.get(id)).filter(
    (m): m is ModelEntry => Boolean(m)
  )

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute bottom-0 left-0 w-[50%] h-[40%]" style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <main className="relative z-10">
        <nav className="px-6 py-4">
          <Link href="/ai-ops" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to AI Ops Hub
          </Link>
        </nav>

        {/* Hero */}
        <section className="pt-8 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-emerald-400 font-mono text-sm mb-4 tracking-wider uppercase">Updated May 20, 2026 · Post Google I/O ’26</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frontier AI Models Intelligence Arena</h1>
              <p className="text-white/60 text-lg max-w-3xl mb-8">
                Benchmarks, pricing, context windows, and capabilities for every frontier model worth tracking.
                Driven by the FrankX model registry — refreshed within 48 hours of every major release.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/google-io-26-cloud-innovations-gemini-3-5-omni-antigravity" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 text-sm transition-colors">
                  <Zap className="w-4 h-4" /> New: Google I/O ’26 deep-dive
                </Link>
                <Link href="/llm-hub" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white/70 text-sm transition-colors">
                  <Crown className="w-4 h-4" /> Provider directory
                </Link>
                <Link href="/research/frontier-llm-landscape-2026" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white/60 text-sm transition-colors">
                  <TrendingUp className="w-4 h-4" /> Research domain
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benchmark Radar (head-to-head) */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Head-to-head: Gemini 3.5 Flash vs Claude Opus 4.6 vs GPT-5.2 Pro</h2>
            <p className="text-white/50 text-sm mb-8">Where each frontier model leads. Gaps in the polygon mean no public benchmark from that vendor yet.</p>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <BenchmarkRadar axes={RADAR_AXES} models={RADAR_MODELS} size={420} />
              </div>
              <div>
                <BenchmarkBarGroup axes={RADAR_AXES} models={RADAR_MODELS} />
              </div>
            </div>
            <p className="mt-6 text-xs text-white/30">
              Sources: Google I/O ’26 keynote, Anthropic model card (Opus 4.6), OpenAI GPT-5.2 system card. Last validated May 20, 2026.
            </p>
          </div>
        </section>

        {/* Frontier Models - data-driven */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Frontier Models</h2>
            <p className="text-white/40 text-sm mb-8">Sorted by recency / impact. Pricing per 1M tokens. Tap a card to jump to model docs.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {orderedModels.map((model, i) => (
                <ModelArenaCard
                  key={model.id}
                  model={model}
                  org={orgFor(providers, model)}
                  index={i}
                  highlight={HIGHLIGHT_IDS.has(model.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Matrix - data-driven */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Pricing Matrix (per 1M tokens)</h2>
            <p className="text-white/40 text-sm mb-8">Input/output pricing for standard API access. Cached and batch pricing varies by provider.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Model</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Input</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Output</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Context</th>
                    <th className="pb-4 text-sm font-medium text-white/50">Provider</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {orderedModels
                    .filter((m) => typeof m.pricing?.input_per_1m === 'number' && typeof m.pricing?.output_per_1m === 'number')
                    .map((m) => {
                      const org = orgFor(providers, m)
                      const inP = m.pricing!.input_per_1m as number
                      const outP = m.pricing!.output_per_1m as number
                      return (
                        <tr
                          key={m.id}
                          className={`border-b border-white/5 ${HIGHLIGHT_IDS.has(m.id) ? 'bg-emerald-500/[0.04]' : ''}`}
                        >
                          <td className="py-3 pr-6 font-medium text-white">{m.name}</td>
                          <td className="py-3 pr-6 font-mono text-white/70">${inP.toFixed(2)}</td>
                          <td className="py-3 pr-6 font-mono text-white/70">${outP.toFixed(2)}</td>
                          <td className="py-3 pr-6 font-mono text-white/40">
                            {formatContext(m.context_window_beta || m.context_window)}
                          </td>
                          <td className="py-3 text-white/50">{org?.name || m.organization}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ACOS Model Routing */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">ACOS Model Routing</h2>
            <p className="text-white/40 text-sm mb-8">How the Agentic Creator Operating System routes tasks across model tiers</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl bg-[#a855f7]/[0.04] border border-[#a855f7]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-[#a855f7]" />
                  <h3 className="font-bold">Opus Tier</h3>
                </div>
                <p className="text-sm font-mono text-[#a855f7] mb-2">claude-opus-4-6</p>
                <p className="text-sm text-white/50 mb-3">Architecture reviews, research synthesis, complex debugging, multi-file code generation, long-context analysis</p>
                <p className="text-xs text-white/30">$5.00 / $25.00 per 1M tokens</p>
              </div>
              <div className="p-6 rounded-xl bg-[#3b82f6]/[0.04] border border-[#3b82f6]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-[#3b82f6]" />
                  <h3 className="font-bold">Sonnet Tier</h3>
                </div>
                <p className="text-sm font-mono text-[#3b82f6] mb-2">claude-sonnet-4-5</p>
                <p className="text-sm text-white/50 mb-3">Standard coding, content generation, API integrations, moderate-complexity tasks, production workflows</p>
                <p className="text-xs text-white/30">$3.00 / $15.00 per 1M tokens</p>
              </div>
              <div className="p-6 rounded-xl bg-[#10b981]/[0.04] border border-[#10b981]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-5 h-5 text-[#10b981]" />
                  <h3 className="font-bold">Haiku Tier</h3>
                </div>
                <p className="text-sm font-mono text-[#10b981] mb-2">claude-haiku-4-5</p>
                <p className="text-sm text-white/50 mb-3">Classification, routing, simple extraction, high-volume processing, real-time chat, metadata tagging</p>
                <p className="text-xs text-white/30">$0.80 / $4.00 per 1M tokens</p>
              </div>
            </div>
          </div>
        </section>

        {/* External Benchmark Resources */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Benchmark & Ranking Sources</h2>
            <p className="text-white/40 text-sm mb-8">Independent sources for verifying model performance</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {externalResources.map((r, i) => (
                <motion.a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-white/80 group-hover:text-white transition-colors">{r.name}</h3>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                  </div>
                  <p className="text-xs text-white/40">{r.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* OCI GenAI Catalog */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">OCI GenAI Model Catalog</h2>
            <p className="text-white/40 text-sm mb-8">Available via Oracle Cloud GenAI Service for enterprise deployment</p>
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

        {/* Related Content */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Research & Analysis</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/blog/google-io-26-cloud-innovations-gemini-3-5-omni-antigravity" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors">
                <p className="text-xs text-emerald-400 font-mono mb-2">Blog</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-emerald-300 transition-colors">Google I/O ’26 Cloud Innovations Decoded</h3>
                <p className="text-xs text-white/40">Gemini 3.5 Flash, Omni, Antigravity 2.0 in production context</p>
              </Link>
              <Link href="/llm-hub" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
                <p className="text-xs text-cyan-400 font-mono mb-2">Hub</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-cyan-300 transition-colors">LLM Provider Directory</h3>
                <p className="text-xs text-white/40">Every frontier provider, model, and agentic platform</p>
              </Link>
              <Link href="/research/frontier-llm-landscape-2026" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#3b82f6]/30 transition-colors">
                <p className="text-xs text-[#3b82f6] font-mono mb-2">Research</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[#3b82f6] transition-colors">Frontier LLM Landscape 2026</h3>
                <p className="text-xs text-white/40">Methodology, evidence grades, what we don’t yet know</p>
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-white/30">Research compiled by FrankX Intelligence Pipeline · Last updated May 20, 2026</p>
            <p className="text-xs text-white/15 mt-2">Source of truth: <code>data/model-registry.json</code> · Data sourced from official vendor documentation, ARC Prize Foundation, Scale AI SEAL, LMArena, Artificial Analysis</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
