'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Terminal,
  Code2,
  Bot,
  Zap,
  GitBranch,
  Workflow,
  Brain,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Rocket,
  Shield,
  Layers,
} from 'lucide-react'

// Premium animated background
function DeveloperBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Code-like grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Tool logos/badges
const tools = [
  { name: 'Claude Code', color: 'from-orange-500 to-amber-500' },
  { name: 'Cursor', color: 'from-blue-500 to-cyan-500' },
  { name: 'Codex', color: 'from-emerald-500 to-green-500' },
  { name: 'Gemini Code', color: 'from-violet-500 to-purple-500' },
  { name: 'Windsurf', color: 'from-cyan-500 to-blue-500' },
  { name: 'Copilot', color: 'from-slate-400 to-slate-500' },
]

// Learning paths for developers
const learningPaths = [
  {
    icon: Terminal,
    title: 'Claude Code Mastery',
    description: 'From basic prompting to autonomous agent workflows. Learn the patterns that 10x your coding velocity.',
    topics: ['CLAUDE.md configuration', 'Multi-file editing', 'Test-driven prompting', 'Agent orchestration'],
    href: '/prompt-library/agent-development',
    color: 'orange',
  },
  {
    icon: Workflow,
    title: 'Agentic Patterns',
    description: 'Build production-grade autonomous systems. MCP servers, tool chains, and multi-agent coordination.',
    topics: ['MCP architecture', 'Tool composition', 'State management', 'Error recovery'],
    href: '/prompt-library/ai-architecture',
    color: 'violet',
  },
  {
    icon: GitBranch,
    title: 'Workflow Automation',
    description: 'Automate your entire development lifecycle. From PR reviews to deployment pipelines.',
    topics: ['Git automation', 'CI/CD integration', 'Code review agents', 'Documentation generation'],
    href: '/prompt-library/coding',
    color: 'cyan',
  },
]

// What's included in Agentic Creator OS
const agenticFeatures = [
  {
    icon: Brain,
    title: 'Claude Code Deep Dive',
    description: 'Complete mastery of Claude Code patterns, from CLAUDE.md to custom slash commands.',
  },
  {
    icon: Layers,
    title: 'Multi-Agent Systems',
    description: 'Build coordinated agent swarms that handle complex, multi-step workflows autonomously.',
  },
  {
    icon: Shield,
    title: 'Production Patterns',
    description: 'Security, error handling, and reliability patterns for enterprise-grade AI systems.',
  },
  {
    icon: Rocket,
    title: 'Speed Templates',
    description: '50+ battle-tested prompts and configurations for instant productivity gains.',
  },
]

const colorMap = {
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    icon: 'bg-orange-500/20 text-orange-400',
    text: 'text-orange-400',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
}

export default function DevelopersPage() {
  return (
    <>
      <DeveloperBackground />
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Terminal className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                For Developers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Code with AI.
              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Ship with confidence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Master Claude Code, Cursor, and agentic development patterns.
              Build autonomous systems that write, test, and deploy code while you focus on architecture.
            </motion.p>

            {/* Tool badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 flex flex-wrap gap-3"
            >
              {tools.map((tool) => (
                <span
                  key={tool.name}
                  className={`rounded-full bg-gradient-to-r ${tool.color} px-4 py-1.5 text-sm font-medium text-white/90`}
                >
                  {tool.name}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/products/agentic-creator-os"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                <Bot className="h-5 w-5" />
                Agentic Creator OS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/prompt-library/agent-development"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                <Sparkles className="h-5 w-5" />
                Free Agent Prompts
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: '500+', label: 'AI-Generated Songs', sublabel: 'Using Suno patterns' },
                { value: '4+', label: 'Years Enterprise AI', sublabel: 'Production systems' },
                { value: '50+', label: 'Agent Prompts', sublabel: 'Battle-tested templates' },
                { value: '€197', label: 'Full System', sublabel: 'Agentic Creator OS' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-white/60">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
                Learning Paths
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                From Prompting to Production
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Structured paths to master AI-assisted development. Start with prompts, graduate to autonomous agents.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {learningPaths.map((path, i) => {
                const colors = colorMap[path.color as keyof typeof colorMap]
                const Icon = path.icon

                return (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link href={path.href} className="group block h-full">
                      <div
                        className={`relative flex h-full flex-col rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
                      >
                        <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colors.icon}`}>
                          <Icon className="h-7 w-7" />
                        </div>

                        <h3 className="mb-3 text-xl font-bold text-white">{path.title}</h3>
                        <p className="mb-6 flex-1 text-slate-400">{path.description}</p>

                        <ul className="mb-6 space-y-2">
                          {path.topics.map((topic) => (
                            <li key={topic} className="flex items-center gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                              {topic}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center gap-2 text-slate-400 transition-colors group-hover:text-white">
                          <span className="text-sm font-medium">Explore prompts</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Agentic Creator OS Feature Section */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-4 inline-block rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1.5 text-sm font-medium text-rose-400">
                  Premium Product
                </span>
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                  Agentic Creator OS
                </h2>
                <p className="mb-8 text-lg text-slate-400">
                  The complete system for developers who want to master AI-assisted coding.
                  From Claude Code patterns to multi-agent orchestration.
                </p>

                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  {agenticFeatures.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div key={feature.title} className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{feature.title}</h4>
                          <p className="text-sm text-slate-400">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-white">€197</span>
                  <span className="text-slate-500">one-time</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/products/agentic-creator-os"
                    className="group flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition-all hover:bg-rose-500"
                  >
                    Get Agentic Creator OS
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              {/* Code preview mockup */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 font-mono text-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs text-slate-500">CLAUDE.md</span>
                  </div>
                  <pre className="text-slate-300">
                    <code>{`# Agentic Creator OS

## Agent Configuration
- autonomous_mode: true
- max_iterations: 50
- tool_use: enabled

## Skills
- code_review: advanced
- test_generation: enabled
- documentation: auto

## Workflows
/implement [feature]
/refactor [pattern]
/deploy [environment]`}</code>
                  </pre>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-4 -top-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  50+ Templates
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Free Resources CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <BookOpen className="mx-auto mb-6 h-12 w-12 text-violet-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Start with Free Resources
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Explore the prompt library and blog to see my approach.
                No commitment required — just valuable patterns you can use today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/prompt-library/agent-development"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Bot className="h-5 w-5" />
                  Agent Development Prompts
                </Link>
                <Link
                  href="/prompt-library/coding"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Code2 className="h-5 w-5" />
                  Coding Prompts
                </Link>
                <Link
                  href="/blog"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  <Zap className="h-5 w-5" />
                  Read the Blog
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
