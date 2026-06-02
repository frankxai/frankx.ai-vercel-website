'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Brain,
  BrainCircuit,
  Cable,
  ChevronRight,
  Code2,
  Cpu,
  Film,
  Globe,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Mic2,
  Music,
  Network,
  Rocket,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import type { GlowColor } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'

/* ─── Data ──────────────────────────────────────────────────────────── */

const waves = [
  {
    number: 1,
    title: 'Foundation Models',
    years: '2020 \u2013 2023',
    color: 'blue' as GlowColor,
    icon: Brain,
    developments: [
      'GPT-3 demonstrates few-shot learning at scale',
      'DALL-E and Stable Diffusion unlock image generation',
      'GPT-4 achieves multimodal reasoning',
      'LLaMA opens the open-source frontier',
    ],
    impact:
      'Proved that scale alone produces emergent capabilities. Established the transformer as the universal architecture for generative intelligence.',
  },
  {
    number: 2,
    title: 'Generative AI Goes Mainstream',
    years: '2023 \u2013 2024',
    color: 'violet' as GlowColor,
    icon: Sparkles,
    developments: [
      'ChatGPT reaches 100M users in two months',
      'Claude introduces constitutional AI and long context',
      'Midjourney v5/v6 redefines visual fidelity',
      'Enterprise adoption accelerates across every industry',
    ],
    impact:
      'Shifted AI from research curiosity to daily tool. Every knowledge worker gains a reasoning copilot. The creator economy begins its transformation.',
  },
  {
    number: 3,
    title: 'Agentic AI',
    years: '2024 \u2013 2025',
    color: 'emerald' as GlowColor,
    icon: Bot,
    developments: [
      'Claude Code ships agentic development workflows',
      'Cursor and Windsurf redefine IDE intelligence',
      'Model Context Protocol (MCP) standardizes tool connectivity',
      'Devin demonstrates autonomous software engineering',
    ],
    impact:
      'AI transitions from answering questions to completing tasks. Agents gain tools, memory, and the ability to operate across systems. The human role shifts from operator to architect.',
  },
  {
    number: 4,
    title: 'Multi-Agent Systems',
    years: '2025 \u2013 2026',
    color: 'cyan' as GlowColor,
    icon: Network,
    developments: [
      'Agent swarms coordinate on complex workflows',
      'Orchestration frameworks mature (LangGraph, CrewAI)',
      'Autonomous teams handle end-to-end business processes',
      'Human-in-the-loop governance becomes standard practice',
    ],
    impact:
      'Individual agents compose into systems. Organizations deploy agent teams that plan, execute, and self-correct. The personal AI Center of Excellence becomes viable for individuals.',
  },
  {
    number: 5,
    title: 'AGI Horizon',
    years: '2026+',
    color: 'amber' as GlowColor,
    icon: BrainCircuit,
    developments: [
      'Self-improving systems demonstrate recursive capability gains',
      'Alignment research intensifies as capabilities accelerate',
      'Consciousness and sentience debates enter mainstream discourse',
      'Regulation frameworks attempt to keep pace with progress',
    ],
    impact:
      'The frontier shifts from "what can AI do" to "what should AI do." Technical capability outpaces governance. The builders who understand both architecture and ethics define this era.',
  },
]

interface ModelEntry {
  name: string
  company: string
  capability: string
  url: string
}

interface ModelCategory {
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: GlowColor
  models: ModelEntry[]
}

const modelCategories: ModelCategory[] = [
  {
    title: 'Language Models',
    icon: MessageSquare,
    color: 'violet',
    models: [
      { name: 'Claude', company: 'Anthropic', capability: 'Constitutional AI, 1M context, agentic coding', url: 'https://claude.ai' },
      { name: 'GPT-4o', company: 'OpenAI', capability: 'Multimodal reasoning, real-time voice', url: 'https://openai.com' },
      { name: 'Gemini', company: 'Google DeepMind', capability: '2M context, native multimodality', url: 'https://deepmind.google/technologies/gemini/' },
      { name: 'LLaMA', company: 'Meta', capability: 'Open-weight, on-device deployment', url: 'https://llama.meta.com' },
      { name: 'DeepSeek', company: 'DeepSeek', capability: 'MoE architecture, cost-efficient reasoning', url: 'https://deepseek.com' },
    ],
  },
  {
    title: 'Image Models',
    icon: ImageIcon,
    color: 'cyan',
    models: [
      { name: 'Gemini Imagen', company: 'Google', capability: 'Text rendering, photorealism, editing', url: 'https://deepmind.google/technologies/gemini/' },
      { name: 'DALL-E 3', company: 'OpenAI', capability: 'Prompt adherence, ChatGPT integration', url: 'https://openai.com/dall-e-3' },
      { name: 'Flux', company: 'Black Forest Labs', capability: 'Open-source, high-fidelity generation', url: 'https://blackforestlabs.ai' },
      { name: 'Midjourney', company: 'Midjourney', capability: 'Artistic style, commercial quality', url: 'https://midjourney.com' },
    ],
  },
  {
    title: 'Music Models',
    icon: Music,
    color: 'amber',
    models: [
      { name: 'Suno', company: 'Suno', capability: 'Full song generation, vocals, multi-genre', url: 'https://suno.com' },
      { name: 'Udio', company: 'Udio', capability: 'High-fidelity audio, precise style control', url: 'https://udio.com' },
    ],
  },
  {
    title: 'Video Models',
    icon: Film,
    color: 'rose',
    models: [
      { name: 'Veo', company: 'Google DeepMind', capability: 'Cinematic generation, physics-aware', url: 'https://deepmind.google/technologies/veo/' },
      { name: 'Sora', company: 'OpenAI', capability: 'World simulation, temporal coherence', url: 'https://openai.com/sora' },
      { name: 'Runway', company: 'Runway', capability: 'Professional editing, Gen-3 Alpha', url: 'https://runwayml.com' },
    ],
  },
  {
    title: 'Code Models',
    icon: Code2,
    color: 'emerald',
    models: [
      { name: 'Claude Code', company: 'Anthropic', capability: 'Agentic CLI, multi-file editing, MCP', url: 'https://docs.anthropic.com/en/docs/claude-code' },
      { name: 'Cursor', company: 'Anysphere', capability: 'AI-native IDE, codebase awareness', url: 'https://cursor.com' },
      { name: 'Windsurf', company: 'Codeium', capability: 'Flow-state coding, deep context', url: 'https://codeium.com/windsurf' },
      { name: 'Codex', company: 'OpenAI', capability: 'Code generation, API integration', url: 'https://openai.com/index/openai-codex/' },
    ],
  },
  {
    title: 'Agent Frameworks',
    icon: Cpu,
    color: 'blue',
    models: [
      { name: 'Claude Agent SDK', company: 'Anthropic', capability: 'Production agent orchestration', url: 'https://docs.anthropic.com/en/docs/agents' },
      { name: 'LangGraph', company: 'LangChain', capability: 'Stateful graph workflows, persistence', url: 'https://langchain-ai.github.io/langgraph/' },
      { name: 'CrewAI', company: 'CrewAI', capability: 'Role-based multi-agent teams', url: 'https://crewai.com' },
      { name: 'AutoGen', company: 'Microsoft', capability: 'Conversational agent patterns', url: 'https://microsoft.github.io/autogen/' },
    ],
  },
]

const automationStack = [
  {
    name: 'n8n',
    role: 'Workflow Orchestration',
    description: 'Visual automation platform connecting 400+ services. Triggers, conditions, and branching logic without code. Self-hostable for full data sovereignty.',
    color: 'emerald' as GlowColor,
    icon: Workflow,
  },
  {
    name: 'MCP',
    role: 'Tool Connectivity Protocol',
    description: 'Model Context Protocol standardizes how AI models connect to external tools, databases, and APIs. One protocol, universal compatibility across models and IDEs.',
    color: 'cyan' as GlowColor,
    icon: Cable,
  },
  {
    name: 'Claude Code',
    role: 'Agentic Development',
    description: 'Terminal-native AI agent that reads, writes, and refactors entire codebases. Plans multi-step implementations, runs tests, and commits — with human oversight.',
    color: 'violet' as GlowColor,
    icon: Terminal,
  },
  {
    name: 'Vercel AI SDK',
    role: 'Streaming Inference',
    description: 'TypeScript SDK for building AI-powered applications. Streaming responses, structured outputs, and tool calling — production-ready from day one.',
    color: 'blue' as GlowColor,
    icon: Zap,
  },
]

const builderLinks = [
  {
    title: 'Workshops',
    description: 'Hands-on sessions for teams adopting AI workflows',
    href: '/workshops',
    icon: Users,
    color: 'violet' as GlowColor,
  },
  {
    title: 'AI Readiness Assessment',
    description: 'Measure where you stand on the AI adoption curve',
    href: '/assess',
    icon: Rocket,
    color: 'emerald' as GlowColor,
  },
  {
    title: 'Prompt Library',
    description: 'Battle-tested prompts for production use cases',
    href: '/prompt-library',
    icon: Layers,
    color: 'cyan' as GlowColor,
  },
  {
    title: 'ACOS Framework',
    description: 'Build your own AI Center of Excellence',
    href: '/acos',
    icon: Globe,
    color: 'amber' as GlowColor,
  },
]

/* ─── Animation Variants ────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
}

/* ─── Section Header ────────────────────────────────────────────────── */

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={0}
      className="mb-12 md:mb-16"
    >
      <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-white/[0.06] border border-white/[0.08] text-slate-400">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-400 max-w-3xl">{subtitle}</p>
      )}
    </motion.div>
  )
}

/* ─── Pipeline Connector ────────────────────────────────────────────── */

function PipelineConnector() {
  return (
    <div className="hidden md:flex items-center justify-center py-2">
      <div className="w-px h-8 bg-gradient-to-b from-white/20 to-white/5" />
      <ChevronRight className="w-4 h-4 text-white/20 rotate-90 -my-1" />
    </div>
  )
}

/* ─── Page Component ────────────────────────────────────────────────── */

export default function AIEvolutionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-slate-100">
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/[0.04] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[128px]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex items-center gap-2 text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <Link href="/research" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Research Hub
            </Link>
            <span>/</span>
            <span className="text-slate-400">AI Evolution</span>
          </motion.nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400"
            >
              Living Research Map
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
            >
              The AI Evolution
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl"
            >
              From Generative AI to Artificial General Intelligence — A Living Research Map
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-4 text-base text-slate-500"
            >
              By Frank Riemer, Former AI Architect, Oracle
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>5 Waves Mapped</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span>6 Model Categories</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>25+ Models Indexed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Wave Timeline ── */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Timeline"
            title="The 5 Waves of AI"
            subtitle="Each wave builds on the last. Understanding where we are in this sequence is the difference between reacting to AI and architecting with it."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="space-y-6"
          >
            {waves.map((wave, i) => {
              const Icon = wave.icon
              return (
                <motion.div key={wave.number} variants={fadeUp} custom={i}>
                  <GlowCard color={wave.color}>
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Wave number + icon */}
                        <div className="flex-shrink-0 flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                            <Icon className="w-6 h-6 text-slate-300" />
                          </div>
                          <div className="md:hidden">
                            <span className="text-xs font-medium tracking-widest uppercase text-slate-500">
                              Wave {wave.number}
                            </span>
                            <h3 className="text-xl font-bold text-white">{wave.title}</h3>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="hidden md:block mb-3">
                            <span className="text-xs font-medium tracking-widest uppercase text-slate-500">
                              Wave {wave.number}
                            </span>
                            <div className="flex items-baseline gap-3 mt-1">
                              <h3 className="text-2xl font-bold text-white">{wave.title}</h3>
                              <span className="text-sm font-mono text-slate-500">{wave.years}</span>
                            </div>
                          </div>
                          <span className="md:hidden text-sm font-mono text-slate-500 block mb-3">{wave.years}</span>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {wave.developments.map((dev) => (
                              <li key={dev} className="flex items-start gap-2 text-sm text-slate-300">
                                <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-500" />
                                <span>{dev}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="text-sm text-slate-400 leading-relaxed border-t border-white/[0.06] pt-4">
                            <span className="font-medium text-slate-300">Impact: </span>
                            {wave.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Model Landscape ── */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Model Taxonomy"
            title="The Model Landscape"
            subtitle="A structured view of the models shaping each modality. The landscape shifts monthly — this map tracks the architecturally significant players."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {modelCategories.map((category, catIdx) => {
              const CatIcon = category.icon
              return (
                <motion.div key={category.title} variants={fadeUp} custom={catIdx}>
                  <GlowCard color={category.color}>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                          <CatIcon className="w-5 h-5 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                      </div>

                      <div className="space-y-3">
                        {category.models.map((model) => (
                          <a
                            key={model.name}
                            href={model.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/model block p-3 -mx-1 rounded-xl hover:bg-white/[0.04] transition-colors"
                          >
                            <div className="flex items-baseline justify-between mb-1">
                              <span className="font-medium text-white text-sm group-hover/model:text-slate-100 transition-colors">
                                {model.name}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">{model.company}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">{model.capability}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── The Automation Stack ── */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Infrastructure"
            title="The Automation Stack"
            subtitle="Models produce intelligence. The automation stack turns that intelligence into action. These four layers connect reasoning to real-world workflows."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            {automationStack.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.name} variants={fadeUp} custom={i}>
                  <GlowCard color={item.color} className="mb-2">
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-slate-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            <span className="text-xs font-medium tracking-widest uppercase text-slate-500">
                              {item.role}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                  {i < automationStack.length - 1 && <PipelineConnector />}
                </motion.div>
              )
            })}

            {/* Pipeline summary */}
            <motion.div
              variants={fadeUp}
              custom={automationStack.length}
              className="mt-8 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <p className="text-sm text-slate-400 leading-relaxed text-center">
                <span className="font-medium text-slate-300">The pipeline: </span>
                Vercel AI SDK streams model output. MCP connects models to tools. Claude Code orchestrates multi-step tasks. n8n automates the surrounding workflows. Together, they form a complete intelligence-to-action stack.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── For Builders ── */}
      <section className="relative py-20 md:py-28 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            label="Resources"
            title="For Builders"
            subtitle="Start building with AI today. These resources bridge the gap between understanding the landscape and shipping real systems."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {builderLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.div key={link.title} variants={fadeUp} custom={i}>
                  <GlowCard color={link.color} href={link.href}>
                    <div className="p-6 md:p-8 flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                          {link.title}
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </h3>
                        <p className="text-sm text-slate-400">{link.description}</p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mt-16 text-center"
          >
            <p className="text-slate-400 mb-6 text-lg">
              Building enterprise AI systems or a personal AI stack?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PremiumButton href="/acos" variant="primary" size="lg" glow>
                Explore ACOS Framework
              </PremiumButton>
              <PremiumButton href="/research" variant="ghost" size="lg">
                Back to Research Hub
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer Note ── */}
      <section className="relative py-12 border-t border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-sm text-slate-500">
            This research map is maintained by Frank Riemer and updated as the landscape evolves.
            Last updated: June 2026.
          </p>
        </div>
      </section>
    </main>
  )
}
