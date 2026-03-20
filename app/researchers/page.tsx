'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Database,
  FileText,
  Layers,
  Network,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { aiToolkit, aiPatterns } from '@/lib/professional/ai-toolkit'

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

const researchWorkflows = [
  {
    title: 'Literature Review Pipeline',
    description: 'Use Perplexity Deep Research for discovery, Claude for synthesis, and coding agents for systematic review automation.',
    steps: ['Perplexity: discover 50+ papers with citations', 'Claude: synthesize themes and contradictions', 'Claude Code: build citation database + analysis dashboard'],
    tools: ['Perplexity', 'Claude', 'Claude Code'],
    color: 'cyan' as GlowColor,
  },
  {
    title: 'Data Analysis & Visualization',
    description: 'From raw data to publication-ready visualizations using AI-augmented workflows.',
    steps: ['ChatGPT: initial data exploration and cleaning', 'Claude: statistical analysis and interpretation', 'Claude Code: build interactive dashboards and charts'],
    tools: ['ChatGPT', 'Claude', 'Claude Code'],
    color: 'emerald' as GlowColor,
  },
  {
    title: 'Writing & Revision Pipeline',
    description: 'AI-assisted academic writing that maintains your voice while improving clarity and structure.',
    steps: ['Claude: outline and first draft with structured prompts', 'Gemini: fact-check claims against sources', 'Claude: revision with specific style guidelines'],
    tools: ['Claude', 'Gemini', 'Perplexity'],
    color: 'violet' as GlowColor,
  },
  {
    title: 'Knowledge Vault',
    description: 'Build a persistent, searchable knowledge base from your research using AI-powered indexing and retrieval.',
    steps: ['Collect: papers, notes, data in structured format', 'Index: AI-generated summaries and tags for each item', 'Retrieve: natural language search across your entire vault'],
    tools: ['Claude Projects', 'NotebookLM', 'Obsidian'],
    color: 'amber' as GlowColor,
  },
]

const buildWithAgents = [
  { title: 'Systematic review automation', desc: 'Claude Code can build scripts that extract data from PDFs, classify papers, and generate PRISMA-style flow diagrams.', color: 'violet' as GlowColor },
  { title: 'Grant proposal generator', desc: 'Structured prompts for NIH/NSF formats. AI drafts sections while you provide the science.', color: 'cyan' as GlowColor },
  { title: 'Conference paper formatter', desc: 'Auto-format papers to IEEE, ACM, APA, or custom templates. One command, any format.', color: 'emerald' as GlowColor },
  { title: 'Lab notebook digitizer', desc: 'OCR + AI extraction turns handwritten notes into structured, searchable digital records.', color: 'amber' as GlowColor },
  { title: 'Research website builder', desc: 'Claude Code builds a complete academic portfolio site with publications, projects, and teaching history.', color: 'rose' as GlowColor },
  { title: 'Collaboration dashboard', desc: 'Track multi-site studies, shared datasets, and team contributions in one AI-managed workspace.', color: 'teal' as GlowColor },
]

export default function ResearchersPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-600/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-violet-600/[0.03] blur-[100px]" />
      </div>

      <motion.div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24" variants={stagger} initial="hidden" animate="visible">
        {/* Hero */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="flex items-start gap-5 mb-6">
            <FrankOmega variant="thinking" size="md" glow />
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                <Search className="h-3 w-3" />
                For Researchers
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                AI-Powered{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">Research</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/40 leading-relaxed">
                Literature reviews in hours instead of weeks. Data analysis with natural language. Knowledge vaults that grow with your work. AI tools designed for academic rigor.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Citations maintained', 'Reproducible workflows', '17+ research domains tracked', 'Oracle Cloud architect'].map(c => (
              <span key={c} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/30">{c}</span>
            ))}
          </div>
        </motion.section>

        {/* Research Workflows */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">Workflows</span>
            <h2 className="mt-1 text-2xl font-bold text-white">AI-augmented research pipelines</h2>
            <p className="mt-1 text-xs text-white/30">Each workflow uses the right AI tool at each stage. Human judgment stays at the center.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {researchWorkflows.map(wf => (
              <GlowCard key={wf.title} color={wf.color} className="!rounded-2xl">
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-1">{wf.title}</h3>
                  <p className="text-[11px] text-white/30 leading-relaxed mb-3">{wf.description}</p>
                  <ol className="space-y-1.5">
                    {wf.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-white/40">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[8px] font-bold text-white/40">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {wf.tools.map(t => (
                      <span key={t} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/25">{t}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* AI Toolkit (shared) */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">Your Toolkit</span>
            <h2 className="mt-1 text-2xl font-bold text-white">The researcher AI stack</h2>
            <p className="mt-1 text-xs text-white/30">Six tools, each with specific research strengths.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aiToolkit.map(tool => (
              <div key={tool.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.12] transition-colors">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-white/20">{tool.maker}</span>
                  {tool.badge && <span className="text-[9px] text-white/25">{tool.badge}</span>}
                </div>
                <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
                <p className="mt-1 text-[11px] text-white/30 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Build with Agents */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">Build</span>
            <h2 className="mt-1 text-2xl font-bold text-white">What researchers can build with coding agents</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {buildWithAgents.map(item => (
              <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-colors">
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-[11px] text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FrankX Research Hub */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">FrankX Resources</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Research infrastructure on frankx.ai</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Research Hub', href: '/research', desc: '17+ validated research domains with sources', badge: '42+ sources' },
              { name: 'State of AI 2026', href: '/research/state-of-ai-2026', desc: 'Comprehensive landscape report updated quarterly' },
              { name: 'Blog (90+ articles)', href: '/blog', desc: 'Technical deep-dives on AI architecture and workflows' },
              { name: 'ACOS', href: '/acos', desc: 'Open-source agent system for coding automation' },
              { name: 'AI Architecture', href: '/ai-architecture', desc: 'Enterprise patterns and production blueprints' },
              { name: 'Prompt Library', href: '/prompt-library', desc: '67+ prompts across 14 categories' },
            ].map(r => (
              <Link key={r.name} href={r.href} className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white/80 group-hover:text-white">{r.name}</span>
                    {r.badge && <span className="rounded-full bg-cyan-500/15 px-1.5 py-0.5 text-[8px] text-cyan-400">{r.badge}</span>}
                  </div>
                  <span className="text-[10px] text-white/25">{r.desc}</span>
                </div>
                <ArrowRight className="h-3 w-3 shrink-0 text-white/15 group-hover:text-white/40" />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeUp}>
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI architecture for your research lab</h2>
                <p className="text-sm text-white/35">Frank designs custom AI systems for research groups, labs, and academic institutions.</p>
              </div>
              <Link href="/coaching" className="group shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 transition-all">
                Discuss your research needs <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-[11px] font-mono text-white/15">frankx.ai/researchers · AI Research Toolkit by Frank X. Riemer</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
