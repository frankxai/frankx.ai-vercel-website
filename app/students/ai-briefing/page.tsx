'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Bot,
  Plug,
  Briefcase,
  Code2,
  Users,
  Brain,
  Music2,
  Sparkles,
  ExternalLink,
  BookOpen,
  Rocket,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react'

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// DATA
// ============================================================================

const threeWaves = [
  {
    wave: 1,
    icon: MessageSquare,
    title: 'Generative AI',
    subtitle: 'AI that creates',
    color: 'emerald',
    description: 'Large language models like ChatGPT, Claude, and Gemini that generate text, images, music, and code from natural language prompts.',
    examples: [
      'Write a business plan in 30 seconds',
      'Generate a song from a text description',
      'Turn a sketch into a polished design',
    ],
    tools: [
      { name: 'Claude', url: 'https://claude.ai' },
      { name: 'ChatGPT', url: 'https://chat.openai.com' },
      { name: 'Suno AI', url: 'https://suno.com' },
    ],
  },
  {
    wave: 2,
    icon: Bot,
    title: 'Agentic AI',
    subtitle: 'AI that acts',
    color: 'violet',
    description: 'AI systems that take action autonomously — research 50 companies, write summaries, send reports, deploy code. Agents work while you sleep.',
    examples: [
      'An agent that monitors competitors and sends you weekly briefs',
      'Code assistants that write, test, and deploy features end-to-end',
      'Research agents that synthesize papers into actionable insights',
    ],
    tools: [
      { name: 'Claude Code', url: 'https://docs.anthropic.com/en/docs/claude-code' },
      { name: 'n8n Workflows', url: 'https://n8n.io' },
      { name: 'LangGraph', url: 'https://langchain-ai.github.io/langgraph/' },
    ],
  },
  {
    wave: 3,
    icon: Plug,
    title: 'MCP & Tool Use',
    subtitle: 'AI that connects',
    color: 'cyan',
    description: 'Model Context Protocol — the open standard that lets AI plug into any tool: your calendar, database, Slack, GitHub. Think of it as the USB port for AI.',
    examples: [
      'AI that reads your database and generates reports',
      'Agents that create GitHub PRs and deploy to production',
      'Assistants that manage your entire project workflow',
    ],
    tools: [
      { name: 'MCP Course', url: 'https://huggingface.co/learn/mcp-course/en/unit0/introduction' },
      { name: 'MCP Spec', url: 'https://modelcontextprotocol.io' },
      { name: 'MCP for Beginners', url: 'https://github.com/microsoft/mcp-for-beginners' },
    ],
  },
]

const careerPaths = [
  {
    icon: Code2,
    title: 'The Builder',
    role: 'Engineer / Developer',
    color: 'cyan',
    description: 'You write the code. You build the systems. You create the tools that others use.',
    skills: ['Python / TypeScript', 'AI APIs & SDKs', 'System architecture', 'Agent frameworks'],
    demand: 'Highest starting salary, deepest technical path',
  },
  {
    icon: Briefcase,
    title: 'The Orchestrator',
    role: 'Architect / Product Manager',
    color: 'violet',
    description: 'You design the strategy. You decide which AI to use where. You connect business needs to technical solutions.',
    skills: ['AI landscape knowledge', 'Architecture thinking', 'Cross-team communication', 'ROI analysis'],
    demand: 'Fastest growing role, bridges business and tech',
  },
  {
    icon: Users,
    title: 'The Translator',
    role: 'Business-to-Tech Bridge',
    color: 'emerald',
    description: 'You speak both languages. You help organizations understand what AI can and should do. Most of you will become this — and it is the most valuable.',
    skills: ['Clear communication', 'Domain expertise', 'Prompt engineering', 'Change management'],
    demand: 'Most needed across all industries',
  },
]

const quickActions = [
  {
    title: 'Open Claude or ChatGPT',
    description: 'Ask it to explain your thesis topic to a 5-year-old. That is prompt engineering.',
    icon: Brain,
    url: 'https://claude.ai',
  },
  {
    title: 'Create a song with AI',
    description: 'Describe a mood and genre. Suno generates a full track in 30 seconds.',
    icon: Music2,
    url: 'https://suno.com',
  },
  {
    title: 'Try the Prompt Library',
    description: 'Copy-paste prompts for writing, research, and creative work.',
    icon: Sparkles,
    url: '/prompt-library',
    internal: true,
  },
  {
    title: 'Explore free AI courses',
    description: 'Curated courses from Anthropic, Google, MIT, Oracle, and more.',
    icon: GraduationCap,
    url: '/students',
    internal: true,
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string; badge: string }> = {
  cyan: {
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/10 text-cyan-400',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/10 text-emerald-400',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  },
  violet: {
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/10 text-violet-400',
    text: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  },
  amber: {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/10 text-amber-400',
    text: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  },
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AIBriefingPage() {
  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/students"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Student Hub</span>
              </Link>

              <div className="mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Rocket className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/60">
                  The AI Briefing
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                AI in 2026.
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400">
                  What you need to know.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-8 leading-relaxed">
                Three waves are reshaping every industry. Understanding them is the difference between
                riding the wave and watching it from the shore.
              </p>

              <div className="flex flex-wrap gap-6">
                {[
                  { value: '3', label: 'Waves of AI' },
                  { value: '3', label: 'Career Paths' },
                  { value: '9+', label: 'Free Courses' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* About the Speaker */}
        <section className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400">FX</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Frank Riemer</h2>
                <p className="text-sm text-cyan-400 mb-3">AI Architect &middot; 500+ Enterprise Implementations</p>
                <p className="text-white/50 leading-relaxed max-w-2xl">
                  From sales to AI sales to AI architecture — each move followed where AI was going next.
                  Building enterprise AI systems across automotive, telecom, and financial services.
                  On the side: 12,000+ AI-generated songs, digital products, and this platform you are reading right now.
                </p>
                <p className="text-white/40 text-sm mt-3 italic">
                  &ldquo;My father built houses with his hands. I build systems with AI. Same craftsmanship, different tools.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Three Waves of AI */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70 mb-2">
                The Landscape
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Three waves of AI
              </h2>
            </motion.div>

            <div className="space-y-8">
              {threeWaves.map((wave, i) => {
                const colors = colorMap[wave.color]
                return (
                  <motion.div
                    key={wave.wave}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-2xl border ${colors.border} ${colors.bg} p-8 md:p-10`}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-xl ${colors.icon}`}>
                            <wave.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className={`text-xs font-medium uppercase tracking-[0.15em] ${colors.text}`}>
                              Wave {wave.wave}
                            </span>
                            <h3 className="text-2xl font-bold text-white">{wave.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-white/40 mb-1 font-medium">{wave.subtitle}</p>
                        <p className="text-white/60 leading-relaxed mb-6">{wave.description}</p>

                        <div className="space-y-2 mb-6">
                          {wave.examples.map((example) => (
                            <div key={example} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-white/60">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-48 flex-shrink-0">
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/30 mb-3">Try it</p>
                        <div className="space-y-2">
                          {wave.tools.map((tool) => (
                            <a
                              key={tool.name}
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/15 transition-all text-sm text-white/60 hover:text-white"
                            >
                              {tool.name}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Career Paths */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70 mb-2">
                What This Means for You
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Three paths through AI
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Every job title you are studying for will have an AI layer within three years.
                The question is which role fits you best.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {careerPaths.map((path, i) => {
                const colors = colorMap[path.color]
                return (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 flex flex-col`}
                  >
                    <div className={`p-3 rounded-xl ${colors.icon} w-fit mb-4`}>
                      <path.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{path.title}</h3>
                    <p className={`text-xs font-medium ${colors.text} mb-3`}>{path.role}</p>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{path.description}</p>
                    <div className="space-y-1.5 mb-4">
                      {path.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-xs text-white/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          {skill}
                        </div>
                      ))}
                    </div>
                    <div className={`text-xs px-3 py-1.5 rounded-full ${colors.badge} w-fit`}>
                      {path.demand}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quick Actions — Try AI Right Now */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                Start Now
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Try AI in the next 60 seconds
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action, i) => {
                const Wrapper = action.internal ? Link : 'a'
                const linkProps = action.internal
                  ? { href: action.url }
                  : { href: action.url, target: '_blank' as const, rel: 'noopener noreferrer' }
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Wrapper
                      {...linkProps}
                      className="group flex items-start gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-xs text-white/40">{action.description}</p>
                      </div>
                      {action.internal ? (
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors mt-1" />
                      ) : (
                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors mt-1" />
                      )}
                    </Wrapper>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recommended Learning Path */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/70 mb-2">
                Your Roadmap
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Where to go from here
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  week: 'Week 1-2',
                  title: 'Foundations',
                  items: [
                    { name: 'Anthropic Prompt Engineering Tutorial', url: 'https://github.com/anthropics/prompt-eng-interactive-tutorial' },
                    { name: 'Google AI Essentials', url: 'https://grow.google/ai-essentials/' },
                  ],
                },
                {
                  week: 'Week 3-4',
                  title: 'Agents & Protocol',
                  items: [
                    { name: 'Agentic AI Fundamentals', url: 'https://learn.deeplearning.ai/courses/agentic-ai/information' },
                    { name: 'Hugging Face MCP Course', url: 'https://huggingface.co/learn/mcp-course/en/unit0/introduction' },
                  ],
                },
                {
                  week: 'Week 5+',
                  title: 'Go Deep',
                  items: [
                    { name: 'MIT Introduction to Deep Learning', url: 'https://introtodeeplearning.com/' },
                    { name: 'OCI AI Foundations Certification', url: 'https://mylearn.oracle.com/ou/learning-path/become-a-oci-ai-foundations-associate-2025/147781' },
                  ],
                },
              ].map((phase, i) => (
                <motion.div
                  key={phase.week}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className="text-xs font-medium text-cyan-400">{phase.week}</span>
                  </div>
                  <div className="flex-1 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <h3 className="text-base font-semibold text-white mb-3">{phase.title}</h3>
                    <div className="space-y-2">
                      {phase.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          {item.name}
                          <ExternalLink className="w-3 h-3 text-white/20" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif-italic text-white/70 leading-relaxed">
                &ldquo;The best time to start building with AI was two years ago. The second best time is today.&rdquo;
              </p>
            </motion.blockquote>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-10 md:p-12"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

              <div className="relative text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Everything behind this QR code is free
                </h2>
                <p className="text-white/50 mb-8 max-w-lg mx-auto">
                  Courses, prompts, workshops, and guides — built by an AI architect who wishes someone had given him this when he was sitting where you are.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/students"
                    className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium transition-all hover:bg-white/90 hover:shadow-lg"
                  >
                    Explore Student Hub
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/students/ikigai"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    Ikigai Workshop
                  </Link>
                  <Link
                    href="/prompt-library"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Prompt Library
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
