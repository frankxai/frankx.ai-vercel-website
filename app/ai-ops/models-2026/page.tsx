'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Globe, ExternalLink, TrendingUp, DollarSign, Cpu, Zap, Crown, ArrowUpRight } from 'lucide-react'

const frontierModels = [
  {
    name: 'Claude Opus 4.8',
    org: 'Anthropic',
    released: 'May 28, 2026',
    context: '1M',
    output: '128K',
    pricing: { input: 5.0, output: 25.0 },
    achievement: 'Tops the intelligence index — SWE-Bench Pro 69.2%, GDPval-AA 1890',
    benchmarks: { sweBenchPro: 69.2, gdpvalAA: 1890, osworld: 83.4 },
    tags: ['reasoning', 'coding', 'agentic'],
    color: '#a855f7',
    highlight: true,
    links: {
      announcement: 'https://www.anthropic.com/news/claude-opus-4-8',
      docs: 'https://platform.claude.com/docs/en/about-claude/models',
    },
    notes: 'Same $5/$25 pricing as 4.7, no breaking changes — a model-string-swap upgrade. Real news: Claude Code dynamic workflows (up to 1,000 subagents) and a 3x-cheaper fast mode.',
  },
  {
    name: 'GPT-5.5',
    org: 'OpenAI',
    released: 'Apr 23, 2026',
    context: '1M*',
    output: '128K',
    pricing: { input: 5.0, output: 30.0 },
    achievement: '84.9% GDPval, 78.7% OSWorld, 98% Tau2 Telecom',
    benchmarks: { gdpval: 84.9, osworld: 78.7, gdpvalAA: 1769 },
    tags: ['reasoning', 'multimodal', 'agentic'],
    color: '#10b981',
    highlight: false,
    links: {
      announcement: 'https://openai.com/index/introducing-gpt-5-5/',
      docs: 'https://developers.openai.com/api/docs/models/gpt-5.5',
    },
    notes: 'Codename “Spud”. Drop-in replacement for GPT-5.4. Leads terminal-agent tasks; trails Opus 4.8 on GDPval-AA and SWE-Bench Pro. Price doubled vs 5.4. *1M published, ~258K effective reported in Codex.',
  },
  {
    name: 'Gemini 3.5 Flash',
    org: 'Google DeepMind',
    released: 'May 19, 2026',
    context: '1M',
    output: '64K',
    pricing: { input: 1.5, output: 9.0 },
    achievement: 'Frontier agentic coding at Flash economics — Terminal-Bench 2.1 76.2%, MCP Atlas 83.6%',
    benchmarks: { terminalBench: 76.2, mcpAtlas: 83.6, gdpvalAA: 1656 },
    tags: ['agentic', 'coding', 'multimodal', 'budget'],
    color: '#3b82f6',
    highlight: false,
    links: {
      announcement: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/',
      docs: 'https://deepmind.google/models/model-cards/gemini-3-5-flash/',
    },
    notes: 'The model Google actually shipped at the 3.5 line. Beats the prior Gemini 3.1 Pro tier on agentic coding — the new default agent runtime.',
  },
  {
    name: 'Grok 4.3',
    org: 'xAI',
    released: 'Apr 30, 2026',
    context: '1M',
    output: 'No fixed cap',
    pricing: { input: 1.25, output: 2.5 },
    achievement: 'Budget frontier — AA Intelligence 53, GDPval-AA 1500, ~181 tok/s output',
    benchmarks: { aaIntelligence: 53, gdpvalAA: 1500 },
    tags: ['reasoning', 'agentic', 'long-context', 'budget'],
    color: '#ef4444',
    highlight: false,
    links: {
      announcement: 'https://artificialanalysis.ai/articles/xai-launches-grok-4-3-with-improved-agentic-performance-and-lower-pricing',
      docs: 'https://docs.x.ai/developers/models/grok-4.3',
    },
    notes: 'Fourth-best frontier intelligence at roughly the cheapest frontier price, with the fastest output in its tier. Context dropped 2M → 1M; reasoning is always-on.',
  },
  {
    name: 'Claude Sonnet 4.6',
    org: 'Anthropic',
    released: 'Feb 17, 2026',
    context: '1M (beta)',
    output: '64K',
    pricing: { input: 3.0, output: 15.0 },
    achievement: 'Approaches Opus 4.6 capability at ~40% lower cost',
    benchmarks: {},
    tags: ['coding', 'content', 'workhorse'],
    color: '#8b5cf6',
    highlight: false,
    links: {
      announcement: 'https://www.anthropic.com/news/claude-sonnet-4-6',
      docs: 'https://platform.claude.com/docs/en/about-claude/models',
    },
    notes: 'The mid-tier that started eating the flagship’s lunch. The right default for production coding and content — route to Opus 4.8 only when the task earns it.',
  },
  {
    name: 'Gemini 3.5 Pro',
    org: 'Google DeepMind',
    released: 'Preview',
    context: '2M*',
    output: '—',
    pricing: { input: 0, output: 0 },
    achievement: 'Announced at I/O as Google’s strongest agentic + coding model — benchmarks pending GA',
    benchmarks: {},
    tags: ['preview', 'multimodal', 'reasoning'],
    color: '#3b82f6',
    highlight: false,
    links: {
      announcement: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/',
      docs: 'https://deepmind.google/models/gemini/',
    },
    notes: 'Not GA as of June 5, 2026 — limited Vertex preview, no published benchmarks or pricing. GA targeted for June. *2M context is a vendor target. Don’t architect on it until GA.',
  },
  {
    name: 'Llama 4 Maverick',
    org: 'Meta',
    released: 'Dec 2025',
    context: '1M',
    output: '32K',
    pricing: { input: 0, output: 0 },
    achievement: 'Open-weight MoE (400B total / 17B active)',
    benchmarks: {},
    tags: ['open-source', 'agentic', 'MoE'],
    color: '#f59e0b',
    highlight: false,
    links: {
      docs: 'https://llama.meta.com/',
    },
    notes: 'Open-weight. 400B total, 17B active per token. Runs on a single H100. Self-host / fine-tune base.',
  },
  {
    name: 'MAI-Thinking-1',
    org: 'Microsoft AI',
    released: 'Jun 2026',
    context: '256K',
    output: '—',
    pricing: { input: 0, output: 0 },
    achievement: 'Vendor-claimed: 97% AIME 2025, 53% SWE-Bench Pro, human-pref over Sonnet 4.6',
    benchmarks: { aime2025: 97, sweBenchPro: 53 },
    tags: ['reasoning', 'preview', 'in-house', 'MoE'],
    color: '#0078d4',
    highlight: false,
    links: {
      docs: 'https://microsoft.ai',
    },
    notes: 'Microsoft’s first in-house frontier family (7 MAI models inc. Image-2.5, Code-1-Flash) on MAIA 200 silicon. 35B-active MoE. Numbers vendor-claimed at launch — pending independent reproduction.',
  },
]

// Cross-model scores where independent data is published. Elo metrics carry no
// "%"; cells are left blank rather than mixing benchmark versions or recycling
// older-model numbers. unit '' renders the raw value.
const benchmarkComparison = [
  { benchmark: 'GDPval-AA', description: 'Economically valuable knowledge work (Elo)', unit: '', models: { 'Opus 4.8': 1890, 'GPT-5.5': 1769, 'Gemini 3.5 Flash': 1656, 'Grok 4.3': 1500 } },
  { benchmark: 'SWE-Bench Pro', description: 'Hard, contamination-resistant coding', unit: '%', models: { 'Opus 4.8': 69.2, 'GPT-5.5': 58.6 } },
  { benchmark: 'OSWorld', description: 'Computer use / GUI agents', unit: '%', models: { 'Opus 4.8': 83.4, 'GPT-5.5': 78.7 } },
  { benchmark: 'Terminal-Bench 2.1', description: 'Agentic terminal / CLI workflows', unit: '%', models: { 'Opus 4.8': 74.6, 'Gemini 3.5 Flash': 76.2 } },
  { benchmark: 'Tau2 Telecom', description: 'Complex customer-service workflows', unit: '%', models: { 'GPT-5.5': 98.0 } },
  { benchmark: 'AA Intelligence Index', description: 'Composite of 10 evaluations', unit: '', models: { 'Opus 4.8': 61.4, 'Grok 4.3': 53 } },
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
  { name: 'Gemini 2.5 Pro', provider: 'Google', context: '1M', useCase: 'Complex multimodal', eu: false },
  { name: 'Gemini 2.5 Flash-Lite', provider: 'Google', context: '-', useCase: 'Budget, high-volume', eu: false },
]

export default function Models2026Page() {
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
        <section className="pt-16 pb-16 md:pt-24 md:pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[#a855f7] font-mono text-sm mb-4 tracking-wider uppercase">Updated June 2026</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Frontier AI Models Intelligence Hub</h1>
              <p className="text-white/60 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
                Benchmarks, pricing, context windows, and capabilities for every frontier model worth tracking.
                Data validated against official sources and independent benchmarks.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/claude-opus-4-8-analysis-2026" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 hover:border-[#a855f7]/40 text-[#a855f7] text-sm transition-colors">
                  <Crown className="w-4 h-4" /> New: Claude Opus 4.8 Deep Analysis
                </Link>
                <Link href="/blog/gpt-5-5-analysis-2026" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 hover:border-[#10b981]/40 text-[#10b981] text-sm transition-colors">
                  <Zap className="w-4 h-4" /> GPT-5.5 (&ldquo;Spud&rdquo;)
                </Link>
                <Link href="/blog/grok-4-3-analysis-2026" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 hover:border-[#ef4444]/40 text-[#ef4444] text-sm transition-colors">
                  <TrendingUp className="w-4 h-4" /> Grok 4.3
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Frontier Models - Enhanced Cards */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Frontier Models (June 2026)</h2>
            <p className="text-white/40 text-sm mb-8">Sorted by reasoning capability. Pricing per 1M tokens.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {frontierModels.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`p-6 rounded-xl border transition-colors ${
                    m.highlight
                      ? 'bg-[#a855f7]/[0.04] border-[#a855f7]/20 hover:border-[#a855f7]/40'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                      <h3 className="font-bold text-lg">{m.name}</h3>
                      {m.highlight && <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#a855f7]/20 text-[#a855f7] font-medium uppercase tracking-wider">New</span>}
                    </div>
                    <div className="flex gap-1">
                      {m.links.announcement && (
                        <a href={m.links.announcement} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors" title="Announcement">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-white/40 mb-1">{m.org} &bull; Released {m.released}</p>
                  <p className="text-sm text-white/60 mb-4">{m.achievement}</p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Context</p>
                      <p className="text-sm font-mono font-medium text-white/80">{m.context}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Output</p>
                      <p className="text-sm font-mono font-medium text-white/80">{m.output}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Price In/Out</p>
                      <p className="text-sm font-mono font-medium text-white/80">
                        {m.pricing.input === 0 ? (m.tags?.includes('preview') ? 'Preview' : 'Open') : `$${m.pricing.input}/$${m.pricing.output}`}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-white/30 mb-3">{m.notes}</p>

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

        {/* Benchmark Comparison Table */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Benchmark Comparison</h2>
            <p className="text-white/40 text-sm mb-8">Head-to-head scores where data is available. Higher is better.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Benchmark</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">What It Tests</th>
                    <th className="pb-4 pr-4 text-sm font-medium text-[#a855f7]">Opus 4.8</th>
                    <th className="pb-4 pr-4 text-sm font-medium text-white/50">GPT-5.5</th>
                    <th className="pb-4 pr-4 text-sm font-medium text-white/50">Gemini 3.5 Flash</th>
                    <th className="pb-4 text-sm font-medium text-white/50">Grok 4.3</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {benchmarkComparison.map(b => {
                    const cell = (v?: number) => (v != null ? `${v}${b.unit}` : '—')
                    const models = b.models as Record<string, number | undefined>
                    return (
                      <tr key={b.benchmark} className="border-b border-white/5">
                        <td className="py-3 pr-6 font-medium text-white">{b.benchmark}</td>
                        <td className="py-3 pr-6 text-white/40">{b.description}</td>
                        <td className="py-3 pr-4 font-mono text-[#a855f7] font-medium">{cell(models['Opus 4.8'])}</td>
                        <td className="py-3 pr-4 font-mono text-white/40">{cell(models['GPT-5.5'])}</td>
                        <td className="py-3 pr-4 font-mono text-white/40">{cell(models['Gemini 3.5 Flash'])}</td>
                        <td className="py-3 font-mono text-white/40">{cell(models['Grok 4.3'])}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-white/20">
              GDPval-AA and AA Intelligence Index are Elo/index scores (no %); other rows are percentages. Blank cells mean no independently published score for that pairing — not a zero. Sources: Anthropic, OpenAI, Google, Artificial Analysis, llm-stats. Last validated June 5, 2026.
            </p>
          </div>
        </section>

        {/* Pricing Matrix */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Pricing Matrix (per 1M tokens)</h2>
            <p className="text-white/40 text-sm mb-8">Input/output pricing for standard API access. Cached and batch pricing varies.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Model</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Input</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Output</th>
                    <th className="pb-4 pr-6 text-sm font-medium text-white/50">Context</th>
                    <th className="pb-4 text-sm font-medium text-white/50">Cost per 10K conversation</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {frontierModels.filter(m => m.pricing.input > 0).map(m => (
                    <tr key={m.name} className={`border-b border-white/5 ${m.highlight ? 'bg-[#a855f7]/[0.02]' : ''}`}>
                      <td className="py-3 pr-6 font-medium text-white">{m.name}</td>
                      <td className="py-3 pr-6 font-mono text-white/60">${m.pricing.input.toFixed(2)}</td>
                      <td className="py-3 pr-6 font-mono text-white/60">${m.pricing.output.toFixed(2)}</td>
                      <td className="py-3 pr-6 font-mono text-white/40">{m.context}</td>
                      <td className="py-3 font-mono text-white/40">${((m.pricing.input * 5 + m.pricing.output * 5) / 1000).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-6 font-medium text-white">Claude Haiku 4.5</td>
                    <td className="py-3 pr-6 font-mono text-white/60">$0.80</td>
                    <td className="py-3 pr-6 font-mono text-white/60">$4.00</td>
                    <td className="py-3 pr-6 font-mono text-white/40">200K</td>
                    <td className="py-3 font-mono text-white/40">$0.02</td>
                  </tr>
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
                <p className="text-sm font-mono text-[#a855f7] mb-2">claude-opus-4-8</p>
                <p className="text-sm text-white/50 mb-3">Architecture reviews, research synthesis, complex debugging, multi-file code generation, long-context analysis</p>
                <p className="text-xs text-white/30">$5.00 / $25.00 per 1M tokens</p>
              </div>
              <div className="p-6 rounded-xl bg-[#3b82f6]/[0.04] border border-[#3b82f6]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-[#3b82f6]" />
                  <h3 className="font-bold">Sonnet Tier</h3>
                </div>
                <p className="text-sm font-mono text-[#3b82f6] mb-2">claude-sonnet-4-6</p>
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

        {/* Related Content */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Research & Analysis</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/blog/claude-opus-4-8-analysis-2026" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#a855f7]/30 transition-colors">
                <p className="text-xs text-[#a855f7] font-mono mb-2">Analysis</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[#a855f7] transition-colors">Claude Opus 4.8: Quietly Tops the Leaderboard</h3>
                <p className="text-xs text-white/40">Verified benchmarks, what changed vs 4.7, builder impact</p>
              </Link>
              <Link href="/research/enterprise-ai" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#10b981]/30 transition-colors">
                <p className="text-xs text-[#10b981] font-mono mb-2">Research</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[#10b981] transition-colors">Enterprise AI Architecture</h3>
                <p className="text-xs text-white/40">Production patterns, adoption trends, market data</p>
              </Link>
              <Link href="/research/agent-benchmarks" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#3b82f6]/30 transition-colors">
                <p className="text-xs text-[#3b82f6] font-mono mb-2">Research</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[#3b82f6] transition-colors">AI Agent Benchmarks</h3>
                <p className="text-xs text-white/40">SWE-bench, ARC-AGI, AgentBench methodology</p>
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-white/30">Research compiled by FrankX Intelligence Pipeline &bull; Last updated June 5, 2026</p>
            <p className="text-xs text-white/15 mt-2">Data sourced from official vendor documentation, ARC Prize Foundation, Scale AI SEAL, LMArena, and Artificial Analysis</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
