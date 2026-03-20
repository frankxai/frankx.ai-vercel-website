'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Copy,
  GraduationCap,
  Layers,
  Presentation,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Users,
  Zap,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { aiToolkit, aiPatterns } from '@/lib/professional/ai-toolkit'
import { workshopTemplates, syllabusSuggestions } from '@/lib/students/professor-data'

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal, Code2, Brain, Sparkles, Zap, Rocket, BookOpen, Target, Layers, Users, Presentation, GraduationCap,
}

const formatColors: Record<string, GlowColor> = { '2-hour': 'emerald', 'half-day': 'violet', 'full-day': 'amber' }
const formatLabels: Record<string, string> = { '2-hour': '2 Hours', 'half-day': 'Half Day', 'full-day': 'Full Day' }

function ExpandableWorkshop({ template }: { template: typeof workshopTemplates[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <GlowCard color={formatColors[template.format]} className="!rounded-2xl">
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/40">{formatLabels[template.format]}</span>
            <h3 className="text-sm font-semibold text-white">{template.title}</h3>
          </div>
          <button onClick={() => setOpen(!open)} className="text-white/25 hover:text-white/50">
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <p className="text-xs text-white/35 leading-relaxed">{template.description}</p>
        <ul className="mt-3 space-y-1">
          {template.learningObjectives.slice(0, 2).map(o => (
            <li key={o} className="flex items-start gap-1.5 text-[11px] text-white/40">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/60" />{o}
            </li>
          ))}
        </ul>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 border-t border-white/[0.06] pt-4 space-y-1.5">
            {template.agenda.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2">
                <span className="shrink-0 text-[10px] font-mono text-white/20 w-16">{item.time}</span>
                <span className="flex-1 text-[11px] text-white/50">{item.activity}</span>
                {item.toolHref && (
                  <Link href={item.toolHref} className="shrink-0 text-[9px] text-white/30 hover:text-white/50 underline">{item.tool}</Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </GlowCard>
  )
}

export default function ProfessorsPage() {
  const [copied, setCopied] = useState(false)
  const share = () => {
    navigator.clipboard.writeText('https://frankx.ai/professors — Free AI workshop toolkit for educators with interactive tools, syllabi, and the complete modern AI stack explained.')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#050507]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-amber-600/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-emerald-600/[0.03] blur-[100px]" />
      </div>

      <motion.div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24" variants={stagger} initial="hidden" animate="visible">
        {/* Hero */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="flex items-start gap-5 mb-6">
            <FrankOmega variant="pointing" size="md" glow />
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                <Presentation className="h-3 w-3" />
                For Educators
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                AI Workshop{' '}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Toolkit</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/40 leading-relaxed">
                Everything you need to teach AI effectively. Workshop templates, the modern AI stack explained,
                interactive student tools, and syllabus suggestions. All free, privacy-first, and browser-based.
              </p>
            </div>
          </div>

          {/* Credentials */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['Privacy-first — browser only', 'Free — every tool accessible', '12K+ AI songs produced', '90+ articles published', 'Oracle AI Architect'].map(c => (
              <span key={c} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/30">{c}</span>
            ))}
          </div>

          <button onClick={share} className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-white/40 hover:bg-white/[0.06]">
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Link copied' : 'Share with colleagues'}
          </button>
        </motion.section>

        {/* Section 1: The Modern AI Stack */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">AI Stack 2026</span>
            <h2 className="mt-1 text-2xl font-bold text-white">The tools your students need to know</h2>
            <p className="mt-1 text-xs text-white/30">Six essential AI tools — what each does best and when to use it.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aiToolkit.map(tool => (
              <GlowCard key={tool.name} color={tool.color} href={tool.href.startsWith('/') ? tool.href : undefined} className="!rounded-2xl">
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] text-white/25">{tool.maker}</span>
                    {tool.badge && <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] text-white/35">{tool.badge}</span>}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{tool.name}</h3>
                  <p className="text-[11px] text-white/30 leading-relaxed mb-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.useCases.slice(0, 2).map(u => (
                      <span key={u} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/25">{u}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* Section 2: AI Interaction Patterns */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">How to Think About AI</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Four modes of AI interaction</h2>
            <p className="mt-1 text-xs text-white/30">Teach students these patterns and they can apply any AI tool effectively.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiPatterns.map((pattern, i) => (
              <div key={pattern.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-${pattern.color}-500/10 text-${pattern.color}-400 text-xs font-bold`}>{i + 1}</span>
                  <h3 className="text-sm font-semibold text-white">{pattern.name}</h3>
                </div>
                <p className="text-[11px] text-white/35 leading-relaxed mb-2">{pattern.description}</p>
                <div className="flex flex-wrap gap-1">
                  {pattern.tools.map(t => (
                    <span key={t} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/25">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Workshop Templates */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">Ready-to-Use</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Workshop templates</h2>
            <p className="mt-1 text-xs text-white/30">Three formats with expandable agendas. Each links to interactive student tools.</p>
          </div>
          <div className="space-y-3">
            {workshopTemplates.map(t => <ExpandableWorkshop key={t.id} template={t} />)}
          </div>
        </motion.section>

        {/* Section 4: Syllabus Suggestions */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">Course Design</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Syllabus suggestions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {syllabusSuggestions.map(s => (
              <GlowCard key={s.id} color="emerald" className="!rounded-2xl">
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <BookOpen className="h-4 w-4 text-white/30" />
                    <span className="text-[10px] text-white/25">{s.weeks} weeks</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-[11px] text-white/30">{s.description}</p>
                  <div className="mt-3 space-y-1">
                    {s.modules.map(m => (
                      <div key={m.week} className="flex gap-2 text-[10px]">
                        <span className="shrink-0 text-white/15 w-12">{m.week}</span>
                        <span className="text-white/35">{m.topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* Section 5: What You Can Build with Coding Agents */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">For Your Own Work</span>
            <h2 className="mt-1 text-2xl font-bold text-white">What professors can build with AI</h2>
            <p className="mt-1 text-xs text-white/30">Beyond teaching — use coding agents to automate your own workflows.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Auto-grade assignments', desc: 'Claude Code can build grading scripts that evaluate code submissions against rubrics.', color: 'violet' as GlowColor },
              { title: 'Research literature review', desc: 'Use Perplexity Deep Research + Claude to synthesize 50+ papers into structured reviews.', color: 'cyan' as GlowColor },
              { title: 'Course website generator', desc: 'Claude Code + Next.js can build a complete course website in hours.', color: 'emerald' as GlowColor },
              { title: 'Data visualization dashboards', desc: 'ChatGPT Advanced Data Analysis turns CSV data into interactive dashboards.', color: 'amber' as GlowColor },
              { title: 'Student feedback analyzer', desc: 'Batch-process course evaluations to extract themes and actionable insights.', color: 'rose' as GlowColor },
              { title: 'Custom quiz generators', desc: 'Generate quizzes from lecture notes with Claude — automatic answer keys included.', color: 'teal' as GlowColor },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] transition-colors">
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-[11px] text-white/30 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Student Tools */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">Interactive Tools</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Tools your students can use right now</h2>
            <p className="mt-1 text-xs text-white/30">Browser-based, privacy-first, exportable. Share these links in your syllabus.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'AI Skills Assessment', href: '/students/assess', desc: '6-dimension radar chart with recommendations', badge: 'New' },
              { name: 'State of AI 2026', href: '/students/ai-briefing', desc: 'Visual landscape briefing — models, agents, MCP' },
              { name: 'AI Ikigai Finder', href: '/students/ikigai', desc: 'Find where passion meets AI capability' },
              { name: 'Role Navigator', href: '/students/roles', desc: '7 AI career paths with salaries' },
              { name: 'Prompt Library', href: '/students/prompts', desc: '28 copy-paste prompts across 6 domains' },
              { name: 'CoE Builder', href: '/students/coe-builder', desc: 'Design a personal AI agent system' },
              { name: 'Path Finder', href: '/students/pathfinder', desc: 'Personalized learning path generator' },
              { name: 'Ecosystem Map', href: '/students/ecosystem', desc: '21 tools mapped across 4 journey stages' },
              { name: 'Workshop Guide', href: '/students/workshop', desc: '90-minute guided session outline' },
            ].map(tool => (
              <Link key={tool.name} href={tool.href} className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white/80 group-hover:text-white">{tool.name}</span>
                    {tool.badge && <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] text-emerald-400">{tool.badge}</span>}
                  </div>
                  <span className="text-[10px] text-white/25">{tool.desc}</span>
                </div>
                <ArrowRight className="h-3 w-3 shrink-0 text-white/15 group-hover:text-white/40" />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeUp}>
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-amber-500/5 to-violet-500/5 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Custom workshop for your institution</h2>
                <p className="text-sm text-white/35">Frank designs tailored AI workshops for universities, bootcamps, and corporate teams.</p>
              </div>
              <Link href="/coaching" className="group shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 transition-all">
                Discuss custom workshop <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-[11px] font-mono text-white/15">frankx.ai/professors · AI Workshop Toolkit by Frank X. Riemer</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
