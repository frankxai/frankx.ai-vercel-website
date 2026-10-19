'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  Cpu,
  Layers,
  Terminal,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'

const sections = [
  { id: 'what-is-ai-creator-os', title: 'What is an AI Creator OS?' },
  { id: 'setting-up-claude-code', title: 'Setting Up Claude Code' },
  { id: 'your-first-claude-md', title: 'Your First CLAUDE.md' },
  { id: 'understanding-acos', title: 'Understanding ACOS' },
  { id: 'next-steps', title: 'Next Steps' },
]

const claudeMdTemplate = `# Project Configuration

## Who I Am
- Name: [Your name]
- Role: [Your primary role — creator, developer, founder, etc.]
- Brand: [Your brand name or handle]
- Voice: [2-3 adjectives — e.g. "precise, confident, practical"]

## Brand Voice
- Lead with results, not philosophy
- Use precise technical language
- Show, don't tell — let the work speak

## Key Files
- content/blog/ — All blog posts (MDX)
- lib/ — Utilities and shared logic
- components/ — React components
- data/ — JSON data files

## Standards
- TypeScript strict mode
- Tailwind CSS for styling
- Next.js App Router conventions
- Mobile-first responsive design`

const moduleColors: Array<'violet' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'blue'> = ['violet', 'cyan', 'emerald', 'amber', 'rose', 'blue']

const pillars = [
  {
    name: 'Strategy',
    description: 'Define what you want AI to do for you. Goals, priorities, and constraints.',
  },
  {
    name: 'Governance',
    description: 'Quality checks, review processes, and guardrails for AI output.',
  },
  {
    name: 'Talent',
    description: 'Your skills as an AI operator. Prompt craft, tool mastery, agent design.',
  },
  {
    name: 'Technology',
    description: 'The stack: Claude Code, n8n, MCP servers, Vercel, databases.',
  },
  {
    name: 'Data',
    description: 'Content libraries, knowledge bases, brand assets, and training data.',
  },
  {
    name: 'Ethics',
    description: 'Transparency, attribution, bias awareness, and responsible use.',
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/50 hover:text-white/80 transition-all"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">Copied</span>
        </>
      ) : (
        <>
          <Clipboard className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="rounded-2xl bg-[#111113] border border-white/[0.08] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-xs text-white/30 font-mono">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-white/80 font-mono leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  )
}

function SectionBadge({ number }: { number: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <span className="text-sm font-bold text-emerald-400">{number}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
    </div>
  )
}

function ProgressBar() {
  return (
    <div className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/courses/build-your-ai-creator-os"
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Course
          </Link>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-sm font-medium text-white/70">Module 1 of 8</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="w-[12.5%] h-full rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs text-white/30">1/8</span>
        </div>
      </div>
    </div>
  )
}

export default function Module1Page() {
  return (
    <main className="relative min-h-screen text-white" style={{ backgroundColor: '#0a0a0b' }}>
      <ProgressBar />

      <div className="max-w-4xl mx-auto px-6">
        {/* Module Header */}
        <section className="pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                Free
              </span>
              <span className="text-xs text-white/30 uppercase tracking-[0.2em]">
                Module 1 of 8
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
              Your AI Foundation
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
              Set up Claude Code, configure your project brain, and understand the framework that
              powers everything you will build in this course.
            </p>
          </motion.div>
        </section>

        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30 mb-4">
            In this module
          </p>
          <ol className="space-y-2">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-3 py-1.5 text-sm text-white/50 hover:text-white transition-colors group"
                >
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/30 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                    {i + 1}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Section 1: What is an AI Creator OS? */}
        <section id="what-is-ai-creator-os" className="mb-20 scroll-mt-20">
          <SectionBadge number={1} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              What is an AI Creator OS?
            </h2>

            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                An AI Creator OS is a personal operating system for creative work, powered by AI
                agents, automation workflows, and structured knowledge. It handles the repetitive
                parts of building -- content production, research, distribution, scheduling -- so
                you can focus on craft.
              </p>

              <GlowCard color="emerald" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10">
                    <Cpu className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      The Personal AI Center of Excellence
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      Large enterprises invest heavily in AI Centers of Excellence --
                      dedicated teams with strategy, governance, technology, and ethics frameworks.
                      The same 6-pillar architecture that powers enterprise AI adoption can be
                      applied to individual creators at roughly 1/5000th of the cost.
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      That is the core insight behind this course. You do not need a team of 50. You
                      need a well-configured system and the discipline to use it.
                    </p>
                  </div>
                </div>
              </GlowCard>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  What you will build by the end of this course
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Claude Code configured with custom skills and brand voice',
                    'n8n automation workflows for content and email',
                    'Multi-agent swarms for strategy and research',
                    'Revenue systems with Stripe, products, and funnels',
                    'A personal intelligence system that runs continuously',
                    'A live website deployed on Vercel with full automation',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02]"
                    >
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Setting Up Claude Code */}
        <section id="setting-up-claude-code" className="mb-20 scroll-mt-20">
          <SectionBadge number={2} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Setting Up Claude Code
            </h2>

            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                Claude Code is a terminal-based AI assistant from Anthropic. It reads your project
                files, understands your codebase, and executes multi-step tasks with real tools --
                file editing, git operations, API calls, and more. It is the foundation of
                everything in this course.
              </p>

              <GlowCard color="cyan" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Why Claude Code
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Unlike ChatGPT or Cursor, Claude Code operates directly in your terminal with
                      full filesystem access. It reads your entire project context on every
                      interaction via CLAUDE.md files. It supports custom skills, slash commands,
                      hooks, and MCP tool connections. This means your AI assistant gets smarter the
                      more you configure it -- and it remembers your preferences across sessions.
                    </p>
                  </div>
                </div>
              </GlowCard>

              <div className="pt-2">
                <h3 className="text-lg font-semibold text-white mb-4">Installation</h3>
                <p className="mb-4">
                  You need Node.js 18+ installed. Then run a single command:
                </p>
                <CodeBlock code="npm install -g @anthropic-ai/claude-code" />
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-semibold text-white mb-4">First run</h3>
                <p className="mb-4">
                  Navigate to any project directory and type{' '}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 text-sm font-mono">
                    claude
                  </code>{' '}
                  in your terminal. Claude Code will scan your directory, read any CLAUDE.md files
                  it finds, and start an interactive session.
                </p>
                <CodeBlock
                  code={`cd ~/my-project
claude`}
                />
                <p className="mt-4 text-sm text-white/40">
                  On first run, you will authenticate with your Anthropic API key. After that,
                  Claude Code loads automatically with your project context.
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-semibold text-white mb-4">
                  The CLAUDE.md file: your project's brain
                </h3>
                <p>
                  The single most important file in any Claude Code project is{' '}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 text-sm font-mono">
                    CLAUDE.md
                  </code>
                  . Claude reads this file at the start of every session. It contains your project
                  configuration, brand voice, file structure, coding standards, and any rules you
                  want Claude to follow. Think of it as persistent memory that shapes every
                  interaction.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Your First CLAUDE.md */}
        <section id="your-first-claude-md" className="mb-20 scroll-mt-20">
          <SectionBadge number={3} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Your First CLAUDE.md
            </h2>

            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                Create a file called{' '}
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 text-sm font-mono">
                  CLAUDE.md
                </code>{' '}
                in your project root. This is the template to start with -- customize each section
                for your own work.
              </p>

              <CodeBlock code={claudeMdTemplate} language="markdown" />

              <div className="pt-4 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Section breakdown
                  </h3>
                </div>

                {[
                  {
                    title: 'Who I Am',
                    description:
                      'Give Claude your identity context. This shapes how it writes copy, structures content, and represents your brand. Be specific about your role and voice.',
                  },
                  {
                    title: 'Brand Voice',
                    description:
                      'Define the rules for how Claude communicates on your behalf. These guidelines apply to every piece of content it generates -- blog posts, emails, documentation, code comments.',
                  },
                  {
                    title: 'Key Files',
                    description:
                      'Map the critical directories and files in your project. Claude uses this to navigate your codebase efficiently, especially in large projects with hundreds of files.',
                  },
                  {
                    title: 'Standards',
                    description:
                      'Set technical constraints. What framework, what language features, what design patterns. Claude follows these rules when writing or modifying code.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02]">
                    <Code2 className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-white/50">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <GlowCard color="violet" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-violet-500/10">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      How Claude Code reads this
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Claude Code loads CLAUDE.md files hierarchically. A root CLAUDE.md applies to
                      the entire project. You can also place CLAUDE.md files in subdirectories --
                      they add context for that specific area. For example,{' '}
                      <code className="px-1 py-0.5 rounded bg-white/10 text-xs font-mono">
                        components/CLAUDE.md
                      </code>{' '}
                      can define component-specific rules that only activate when Claude works in
                      that directory.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Understanding ACOS */}
        <section id="understanding-acos" className="mb-20 scroll-mt-20">
          <SectionBadge number={4} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Understanding ACOS</h2>

            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                ACOS stands for Agentic Creator OS. It is the framework that structures your entire
                AI creator workflow into a coherent system. ACOS applies the same 6-pillar
                architecture used by enterprise AI Centers of Excellence, adapted for individual
                creators.
              </p>

              <h3 className="text-lg font-semibold text-white mb-4">The 6 pillars</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {pillars.map((pillar, i) => (
                  <GlowCard
                    key={pillar.name}
                    color={moduleColors[i]}
                    className="p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white/50">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">{pillar.name}</h4>
                        <p className="text-xs text-white/45 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  How ACOS maps to your daily workflow
                </h3>
                <p className="mb-4">
                  Each pillar translates directly into actions you take every day:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      pillar: 'Strategy',
                      action: 'Decide what to build this week based on goals, not impulse',
                    },
                    {
                      pillar: 'Governance',
                      action: 'Review AI outputs before publishing. Set quality thresholds.',
                    },
                    {
                      pillar: 'Talent',
                      action: 'Improve your prompting. Learn new tools. Build custom skills.',
                    },
                    {
                      pillar: 'Technology',
                      action: 'Configure Claude Code, connect MCP servers, automate with n8n',
                    },
                    {
                      pillar: 'Data',
                      action:
                        'Organize your content library, maintain knowledge bases, structure brand assets',
                    },
                    {
                      pillar: 'Ethics',
                      action:
                        'Attribute sources. Disclose AI usage where appropriate. Avoid manipulation.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]"
                    >
                      <span className="text-xs font-bold text-emerald-400/60 w-20 flex-shrink-0 pt-0.5">
                        {item.pillar}
                      </span>
                      <span className="text-sm text-white/50">{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <GlowCard color="emerald" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10">
                    <Layers className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Open source</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-3">
                      The ACOS framework is open source. You can explore the full architecture,
                      contribute, or fork it for your own use.
                    </p>
                    <a
                      href="https://github.com/frankxai/agentic-creator-os"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      github.com/frankxai/agentic-creator-os
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </GlowCard>
            </div>
          </motion.div>
        </section>

        {/* Section 5: Next Steps */}
        <section id="next-steps" className="mb-20 scroll-mt-20">
          <SectionBadge number={5} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Next Steps</h2>

            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                You now have the foundation: Claude Code installed, your first CLAUDE.md
                configured, and an understanding of the ACOS framework. Module 2 goes deeper into
                the skill system -- how to install, create, and manage hundreds of specialized AI
                skills.
              </p>

              <GlowCard color="amber" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10">
                    <Layers className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Coming up: Module 2 -- The Skill System
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Learn how to install skills from GitHub repositories, create custom skills for
                      your specific workflows, set up auto-activation with skill-rules.json, and
                      build a library of 500+ specialized AI capabilities.
                    </p>
                    <span className="inline-block mt-3 px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </GlowCard>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  While you wait for Module 2
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/assess"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all"
                  >
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Cpu className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">
                        AI Readiness Assessment
                      </div>
                      <div className="text-xs text-white/40">
                        Measure where you stand today
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/acos"
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Layers className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                        Explore ACOS
                      </div>
                      <div className="text-xs text-white/40">
                        The full Agentic Creator OS
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Email capture */}
              <div className="pt-8">
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Get notified when Module 2 launches
                  </h3>
                  <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
                    Join the course waitlist for early access to new modules, bonus content, and
                    implementation resources.
                  </p>
                  <div className="max-w-md mx-auto">
                    <EmailSignup
                      listType="courses-waitlist"
                      placeholder="you@example.com"
                      buttonText="Notify Me"
                      compact
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Bottom navigation */}
        <section className="pb-20 border-t border-white/5 pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/courses/build-your-ai-creator-os"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to course overview
            </Link>
            <div className="flex items-center gap-2 text-sm text-white/30">
              <span>Module 2: The Skill System</span>
              <span className="px-2 py-0.5 bg-white/5 text-white/30 text-xs rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
