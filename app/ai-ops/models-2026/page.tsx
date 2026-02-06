'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Globe, ExternalLink, TrendingUp, DollarSign, Cpu, Zap, Crown, ArrowUpRight } from 'lucide-react'

const frontierModels = [
  {
    name: 'Claude Opus 4.6',
    org: 'Anthropic',
    released: 'Feb 5, 2026',
    context: '1M (beta)',
    output: '128K',
    pricing: { input: 5.0, output: 25.0 },
    achievement: '#1 ARC-AGI-2 (68.8%), #1 Terminal-Bench (65.4%)',
    benchmarks: { arcAgi2: 68.8, termBench: 65.4, osworld: 72.7 },
    tags: ['reasoning', 'coding', 'agentic', 'adaptive-thinking'],
    color: '#a855f7',
    highlight: true,
    links: {
      announcement: 'https://www.anthropic.com/news/claude-opus-4-6',
      docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
    },
    notes: 'New flagship. Adaptive thinking replaces budget_tokens. 67% price cut from Opus 4.5.',
  },
  {
    name: 'GPT-5.2 Pro',
    org: 'OpenAI',
    released: 'Jan 2026',
    context: '196K',
    output: '64K',
    pricing: { input: 10.0, output: 30.0 },
    achievement: 'First 90% ARC-AGI-1, multimodal w/ audio',
    benchmarks: { arcAgi2: 54.2 },
    tags: ['reasoning', 'multimodal', 'audio'],
    color: '#10b981',
    highlight: false,
    links: {
      docs: 'https://platform.openai.com/docs/models',
    },
    notes: 'Native audio modality. Strong general-purpose performance.',
  },
  {
    name: 'Gemini 3 Pro',
    org: 'Google DeepMind',
    released: 'Dec 2025',
    context: '2M',
    output: '64K',
    pricing: { input: 7.0, output: 21.0 },
    achievement: 'Best multimodal (81% MMMU-Pro), 2M context',
    benchmarks: { arcAgi2: 45.1, mmmuPro: 81.0 },
    tags: ['multimodal', 'reasoning', 'vision', 'video', 'audio'],
    color: '#3b82f6',
    highlight: false,
    links: {
      docs: 'https://ai.google.dev/gemini-api/docs',
    },
    notes: 'Widest modality support: text, vision, audio, video. 2M native context.',
  },
  {
    name: 'Grok 4.1',
    org: 'xAI',
    released: 'Nov 2025',
    context: '2M',
    output: '64K',
    pricing: { input: 3.0, output: 15.0 },
    achievement: '#1 LMArena (1483 Elo), 2M context',
    benchmarks: { lmarenaElo: 1483 },
    tags: ['reasoning', 'agentic', 'long-context'],
    color: '#ef4444',
    highlight: false,
    links: {
      docs: 'https://docs.x.ai/',
    },
    notes: 'Top LMArena Elo. Competitive pricing with long context.',
  },
  {
    name: 'Claude Opus 4.5',
    org: 'Anthropic',
    released: 'Nov 2025',
    context: '200K',
    output: '64K',
    pricing: { input: 5.0, output: 25.0 },
    achievement: 'Best coding at launch (80.9% SWE-bench)',
    benchmarks: { arcAgi2: 37.6, termBench: 59.8, osworld: 66.3 },
    tags: ['coding', 'reasoning', 'agentic'],
    color: '#a855f7',
    highlight: false,
    links: {
      docs: 'https://docs.anthropic.com/en/docs/about-claude/models',
    },
    notes: 'Previous flagship. Still available, superseded by Opus 4.6.',
  },
  {
    name: 'Llama 4 Maverick',
    org: 'Meta',
    released: 'Dec 2025',
    context: '1M',
    output: '32K',
    pricing: { input: 0, output: 0 },
    achievement: 'Open-weight MoE (400B/17B active)',
    benchmarks: {},
    tags: ['open-source', 'agentic', 'MoE'],
    color: '#f59e0b',
    highlight: false,
    links: {
      docs: 'https://llama.meta.com/',
    },
    notes: 'Open-weight. 400B total, 17B active per token. Runs on single H100.',
  },
  {
    name: 'DeepSeek R1',
    org: 'DeepSeek',
    released: 'Jan 2025',
    context: '128K',
    output: '32K',
    pricing: { input: 0.55, output: 2.19 },
    achievement: 'Open-source reasoning champion, MIT license',
    benchmarks: {},
    tags: ['reasoning', 'open-source', 'budget'],
    color: '#06b6d4',
    highlight: false,
    links: {
      docs: 'https://platform.deepseek.com/docs',
    },
    notes: 'Most cost-effective reasoning model. Open-source under MIT license.',
  },
]

const benchmarkComparison = [
  { benchmark: 'ARC-AGI-2', description: 'Abstract reasoning', models: { 'Opus 4.6': 68.8, 'GPT-5.2 Pro': 54.2, 'Gemini 3 Pro': 45.1, 'Opus 4.5': 37.6 } },
  { benchmark: 'Terminal-Bench 2.0', description: 'Agentic coding', models: { 'Opus 4.6': 65.4, 'Opus 4.5': 59.8 } },
  { benchmark: 'OSWorld', description: 'Computer use', models: { 'Opus 4.6': 72.7, 'Opus 4.5': 66.3 } },
  { benchmark: 'MMMU-Pro', description: 'Multimodal understanding', models: { 'Gemini 3 Pro': 81.0 } },
  { benchmark: 'BigLaw Bench', description: 'Legal reasoning', models: { 'Opus 4.6': 90.2 } },
  { benchmark: 'MRCR v2 (1M)', description: 'Long-context retrieval', models: { 'Opus 4.6': 76.0 } },
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
        <section className="pt-8 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[#a855f7] font-mono text-sm mb-4 tracking-wider uppercase">Updated February 2026</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frontier AI Models Intelligence Hub</h1>
              <p className="text-white/50 text-lg max-w-3xl mb-8">
                Benchmarks, pricing, context windows, and capabilities for every frontier model worth tracking.
                Data validated against official sources and independent benchmarks.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/claude-opus-4-6-analysis-2026" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 hover:border-[#a855f7]/40 text-[#a855f7] text-sm transition-colors">
                  <Crown className="w-4 h-4" /> New: Claude Opus 4.6 Deep Analysis
                </Link>
                <Link href="/research/agent-benchmarks" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white/60 text-sm transition-colors">
                  <TrendingUp className="w-4 h-4" /> Benchmark Methodology
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Frontier Models - Enhanced Cards */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Frontier Models (February 2026)</h2>
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
                        {m.pricing.input === 0 ? 'Open' : `$${m.pricing.input}/$${m.pricing.output}`}
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
                    <th className="pb-4 pr-4 text-sm font-medium text-[#a855f7]">Opus 4.6</th>
                    <th className="pb-4 pr-4 text-sm font-medium text-white/50">GPT-5.2</th>
                    <th className="pb-4 pr-4 text-sm font-medium text-white/50">Gemini 3</th>
                    <th className="pb-4 text-sm font-medium text-white/50">Opus 4.5</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {benchmarkComparison.map(b => (
                    <tr key={b.benchmark} className="border-b border-white/5">
                      <td className="py-3 pr-6 font-medium text-white">{b.benchmark}</td>
                      <td className="py-3 pr-6 text-white/40">{b.description}</td>
                      <td className="py-3 pr-4 font-mono text-[#a855f7] font-medium">{b.models['Opus 4.6'] ? `${b.models['Opus 4.6']}%` : '—'}</td>
                      <td className="py-3 pr-4 font-mono text-white/40">{b.models['GPT-5.2 Pro'] ? `${b.models['GPT-5.2 Pro']}%` : '—'}</td>
                      <td className="py-3 pr-4 font-mono text-white/40">{b.models['Gemini 3 Pro'] ? `${b.models['Gemini 3 Pro']}%` : '—'}</td>
                      <td className="py-3 font-mono text-white/40">{b.models['Opus 4.5'] ? `${b.models['Opus 4.5']}%` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-white/20">
              Sources: Official vendor announcements, ARC Prize Foundation, SWE-bench project. Last validated February 6, 2026.
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
                    <td className="py-3 pr-6 font-medium text-white">Claude Sonnet 4.5</td>
                    <td className="py-3 pr-6 font-mono text-white/60">$3.00</td>
                    <td className="py-3 pr-6 font-mono text-white/60">$15.00</td>
                    <td className="py-3 pr-6 font-mono text-white/40">200K</td>
                    <td className="py-3 font-mono text-white/40">$0.09</td>
                  </tr>
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
              <Link href="/blog/claude-opus-4-6-analysis-2026" className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#a855f7]/30 transition-colors">
                <p className="text-xs text-[#a855f7] font-mono mb-2">Analysis</p>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[#a855f7] transition-colors">Claude Opus 4.6: What Actually Changed</h3>
                <p className="text-xs text-white/40">Deep technical breakdown with migration guide</p>
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
            <p className="text-sm text-white/30">Research compiled by FrankX Intelligence Pipeline &bull; Last updated February 6, 2026</p>
            <p className="text-xs text-white/15 mt-2">Data sourced from official vendor documentation, ARC Prize Foundation, Scale AI SEAL, LMArena, and Artificial Analysis</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
