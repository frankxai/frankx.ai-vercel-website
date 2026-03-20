'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Plug,
  Rocket,
  Sparkles,
  Terminal,
  TrendingUp,
  Zap,
  Music,
  Palette,
  BookOpen,
  Users,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'

// ── Animation ────────────────────────────────────────────────────────────────

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// ── Data ─────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: '72%', label: 'Enterprise multi-agent', color: 'text-emerald-400' },
  { value: '80%+', label: 'Devs using AI agents', color: 'text-cyan-400' },
  { value: '1,400+', label: 'MCP servers live', color: 'text-violet-400' },
  { value: '$52.6B', label: 'Agent market by 2030', color: 'text-amber-400' },
]

const frontierModels = [
  { name: 'Claude Opus 4.6', maker: 'Anthropic', strength: 'Code + reasoning', color: 'violet' as GlowColor, badge: 'Leader' },
  { name: 'GPT-5', maker: 'OpenAI', strength: 'Multimodal + ecosystem', color: 'emerald' as GlowColor, badge: '200M+ users' },
  { name: 'Gemini 2.5 Pro', maker: 'Google', strength: '1M+ context + search', color: 'cyan' as GlowColor, badge: 'Long context' },
  { name: 'Llama 4', maker: 'Meta', strength: 'Open weights + 10M ctx', color: 'blue' as GlowColor, badge: 'Open source' },
  { name: 'DeepSeek V3', maker: 'DeepSeek', strength: 'Cost-efficient MoE', color: 'teal' as GlowColor, badge: 'Value' },
  { name: 'Grok 3', maker: 'xAI', strength: 'Real-time data + reasoning', color: 'amber' as GlowColor, badge: 'Real-time' },
]

const codingAgents = [
  { name: 'Claude Code', desc: 'Plans, writes, tests, deploys. 500+ skills. MCP integration.', tier: 'Agentic', color: 'violet' as GlowColor, href: '/acos' },
  { name: 'Cursor', desc: 'IDE-native AI. Codebase-aware. Tab + chat + agent modes.', tier: 'IDE', color: 'cyan' as GlowColor },
  { name: 'GitHub Copilot', desc: 'VS Code integrated. Copilot Workspace. Enterprise standard.', tier: 'Enterprise', color: 'emerald' as GlowColor },
  { name: 'Windsurf', desc: 'Cascade agent. Multi-file edits. Strong context retrieval.', tier: 'Rising', color: 'amber' as GlowColor },
  { name: 'Devin', desc: 'Fully autonomous. Plans and executes entire projects.', tier: 'Autonomous', color: 'rose' as GlowColor },
  { name: 'OpenHands', desc: 'Open-source Devin alternative. Community-driven.', tier: 'Open Source', color: 'teal' as GlowColor },
]

const topSkills = [
  { rank: 1, skill: 'Prompt Engineering', salary: '$120-180K', icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { rank: 2, skill: 'Agentic System Architecture', salary: '$150-220K', icon: Layers, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { rank: 3, skill: 'AI-Augmented Full-Stack Dev', salary: '$130-190K', icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { rank: 4, skill: 'AI Product Management', salary: '$140-200K', icon: Rocket, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { rank: 5, skill: 'AI Safety & Evaluation', salary: '$130-180K', icon: Brain, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { rank: 6, skill: 'MCP & Integration Engineering', salary: '$120-170K', icon: Plug, color: 'text-teal-400', bg: 'bg-teal-500/10' },
]

const mcpEcosystem = [
  { category: 'Dev Tools', examples: 'GitHub, Vercel, Linear, Figma', count: '200+', color: 'text-violet-400' },
  { category: 'Databases', examples: 'PostgreSQL, Supabase, Redis, MongoDB', count: '150+', color: 'text-cyan-400' },
  { category: 'Communication', examples: 'Slack, Notion, Discord, Email', count: '100+', color: 'text-emerald-400' },
  { category: 'Cloud & Infra', examples: 'AWS, GCP, Cloudflare, Railway', count: '120+', color: 'text-amber-400' },
  { category: 'AI & ML', examples: 'Image gen, TTS, embeddings, RAG', count: '180+', color: 'text-rose-400' },
  { category: 'Analytics', examples: 'Mixpanel, GA, Plausible, Langfuse', count: '80+', color: 'text-teal-400' },
]

const startPaths = [
  { audience: 'Students', icon: GraduationCap, steps: ['Anthropic Prompt Guide (free)', 'Google AI Essentials (free)', 'Build a project with Claude Code'], color: 'emerald' as GlowColor, href: '/students' },
  { audience: 'Developers', icon: Terminal, steps: ['Install Claude Code', 'Learn MCP servers', 'Build a multi-agent system'], color: 'cyan' as GlowColor, href: '/acos' },
  { audience: 'Creators', icon: Music, steps: ['Try Suno (music) + Midjourney (visuals)', 'Use Claude for writing', 'Build a content pipeline'], color: 'violet' as GlowColor, href: '/music-lab' },
  { audience: 'Professionals', icon: BookOpen, steps: ['Oracle AI Foundations (free cert)', 'AI for Everyone (DeepLearning.AI)', 'Apply AI to your current role'], color: 'amber' as GlowColor, href: '/blog' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AIBriefingPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-600/[0.06] blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-600/[0.04] blur-[100px]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl px-5 pb-20 pt-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* ─── Breadcrumb ─── */}
        <motion.div variants={fadeUp} className="mb-8">
          <Link
            href="/students"
            className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            <GraduationCap className="h-3 w-3" />
            Learning Paths
          </Link>
        </motion.div>

        {/* ─── Hero ─── */}
        <motion.section variants={fadeUp} className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <FrankOmega variant="thinking" size="md" glow />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            Updated March 2026
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            State of AI{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              2026
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/40 leading-relaxed">
            The AI landscape explained visually. What matters, what&apos;s changing, and where to start.
          </p>

          {/* Stats bar */}
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="mt-1 text-[11px] text-white/30">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Section 1: Frontier Models ─── */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            label="Foundation Layer"
            title="Frontier Models"
            subtitle="The six models shaping AI in 2026."
            color="text-violet-400"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {frontierModels.map((model) => (
              <GlowCard key={model.name} color={model.color} className="!rounded-2xl">
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/30">{model.maker}</span>
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/40">
                      {model.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{model.name}</h3>
                  <p className="mt-1 text-xs text-white/35">{model.strength}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* ─── Section 2: Coding Agents ─── */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            label="Developer Stack"
            title="Coding Agents"
            subtitle="AI that writes code, runs tests, fixes bugs, and deploys — autonomously."
            color="text-cyan-400"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {codingAgents.map((agent) => (
              <GlowCard key={agent.name} color={agent.color} href={agent.href} className="!rounded-2xl">
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/40">
                      {agent.tier}
                    </span>
                    {agent.href && <ArrowRight className="h-3.5 w-3.5 text-white/20" />}
                  </div>
                  <h3 className="text-base font-semibold text-white">{agent.name}</h3>
                  <p className="mt-1 text-xs text-white/35 leading-relaxed">{agent.desc}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* ─── Section 3: MCP Ecosystem ─── */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            label="Integration Protocol"
            title="MCP — The USB-C of AI"
            subtitle="One protocol connecting AI models to every tool, database, and API."
            color="text-emerald-400"
          />

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            {/* Visual: center hub + categories */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                <Plug className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">1,400+ MCP Servers</div>
                <div className="text-xs text-white/30">Open protocol by Anthropic — works across Claude Code, Cursor, VS Code</div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {mcpEcosystem.map((cat) => (
                <div key={cat.category} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className={`text-xl font-bold ${cat.color}`}>{cat.count}</div>
                  <div>
                    <div className="text-sm font-medium text-white/80">{cat.category}</div>
                    <div className="text-[11px] text-white/25">{cat.examples}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Section 4: Most Sought-After Skills ─── */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            label="Career Intelligence"
            title="Most In-Demand AI Skills"
            subtitle="What employers are hiring for in 2026. Ranked by demand and salary."
            color="text-amber-400"
          />

          <div className="space-y-2">
            {topSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.rank}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  {/* Rank */}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${skill.bg}`}>
                    <span className={`text-sm font-bold ${skill.color}`}>#{skill.rank}</span>
                  </div>

                  {/* Icon + Name */}
                  <div className="flex flex-1 items-center gap-3">
                    <Icon className={`h-5 w-5 shrink-0 ${skill.color}`} />
                    <div>
                      <div className="text-sm font-semibold text-white/90">{skill.skill}</div>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="hidden text-right sm:block">
                    <div className="text-sm font-medium text-white/60">{skill.salary}</div>
                    <div className="text-[10px] text-white/25">median salary</div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* ─── Section 5: Where to Start ─── */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            label="Action Plan"
            title="Where to Start"
            subtitle="Concrete paths based on who you are. Each takes 4-12 weeks."
            color="text-rose-400"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {startPaths.map((path) => {
              const Icon = path.icon
              return (
                <GlowCard key={path.audience} color={path.color} href={path.href} className="!rounded-2xl">
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                        <Icon className="h-5 w-5 text-white/60" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">For {path.audience}</h3>
                    </div>

                    <ol className="space-y-2">
                      {path.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-white/40 leading-relaxed">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[9px] font-bold text-white/50">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </motion.section>

        {/* ─── Section 6: FrankX Ecosystem ─── */}
        <motion.section variants={fadeUp} className="mb-16">
          <SectionHeader
            label="Built for This"
            title="The FrankX Ecosystem"
            subtitle="Tools that map directly to the AI landscape above. Built by Frank, free to use."
            color="text-violet-400"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: 'ACOS', desc: 'The Creator OS for Claude Code. 75+ skills, 38 agents. The coding agent layer — built on top of Claude Opus 4.6.', href: '/acos', maps: 'Coding Agents + MCP', color: 'violet' as GlowColor, icon: Terminal },
              { name: 'Music Lab', desc: '12,000+ AI songs. Suno prompt library, production workflows, genre mastery.', href: '/music-lab', maps: 'Creative AI Tools', color: 'cyan' as GlowColor, icon: Music },
              { name: 'Research Hub', desc: '17+ research domains with validated claims, sources, and quarterly updates.', href: '/research', maps: 'AI Intelligence', color: 'emerald' as GlowColor, icon: Brain },
              { name: 'GenCreator', desc: 'The creator business framework. Strategy, execution, community, and tools.', href: '/gencreator', maps: 'Creator Economy', color: 'amber' as GlowColor, icon: Rocket },
            ].map((tool) => {
              const Icon = tool.icon
              return (
                <GlowCard key={tool.name} color={tool.color} href={tool.href} className="!rounded-2xl">
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-white/50" />
                        <h3 className="text-base font-semibold text-white">{tool.name}</h3>
                      </div>
                      <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/30">{tool.maps}</span>
                    </div>
                    <p className="text-xs text-white/35 leading-relaxed">{tool.desc}</p>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </motion.section>

        {/* ─── Deep Dive CTA ─── */}
        <motion.section variants={fadeUp} className="mb-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-10">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/15 to-violet-500/15 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-5">
                <FrankOmega variant="chibi-avatar" size="sm" glow rounded className="shrink-0 border-2 border-emerald-500/20" />
                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Full research with sources
                  </h2>
                  <p className="mt-1 text-sm text-white/35">
                    42 sources, detailed analysis, FAQ, and related research domains.
                  </p>
                </div>
              </div>
              <Link
                href="/research/state-of-ai-2026"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                Read full research
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ─── Footer ─── */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-[11px] font-mono text-white/15">
            frankx.ai/students/ai-briefing · Updated March 2026 · Research by Frank X. Riemer
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Section header component ─────────────────────────────────────────────────

function SectionHeader({ label, title, subtitle, color }: {
  label: string
  title: string
  subtitle: string
  color: string
}) {
  return (
    <div className="mb-6">
      <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${color}`}>
        {label}
      </span>
      <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-white/35">{subtitle}</p>
    </div>
  )
}
