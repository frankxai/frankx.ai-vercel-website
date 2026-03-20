'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  Heart,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Zap,
  AlertTriangle,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { aiToolkit } from '@/lib/professional/ai-toolkit'

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }

const clinicalWorkflows = [
  {
    title: 'Clinical Documentation',
    description: 'AI-assisted note-taking, discharge summaries, and referral letters that save hours of administrative work.',
    approaches: ['Voice-to-structured-note with Claude', 'Template-based discharge summaries', 'Patient-friendly explanation generation'],
    color: 'emerald' as GlowColor,
    icon: FileText,
  },
  {
    title: 'Literature Synthesis',
    description: 'Stay current with medical literature. AI summarizes new research, flags relevant clinical trials, and synthesizes evidence.',
    approaches: ['Perplexity for rapid PubMed-grounded search', 'Claude for systematic review synthesis', 'Gemini NotebookLM for ongoing journal monitoring'],
    color: 'cyan' as GlowColor,
    icon: Search,
  },
  {
    title: 'Patient Communication',
    description: 'Generate clear, empathetic patient education materials. Translate medical complexity into accessible language.',
    approaches: ['After-visit summaries in plain language', 'Medication interaction explanations', 'Procedure preparation guides tailored to reading level'],
    color: 'violet' as GlowColor,
    icon: MessageSquare,
  },
  {
    title: 'Research & Quality Improvement',
    description: 'Analyze clinical data, identify patterns, and build quality improvement dashboards using AI-augmented analytics.',
    approaches: ['ChatGPT Advanced Data Analysis for clinical datasets', 'Claude Code for HIPAA-compliant data pipelines', 'Automated outcome tracking and reporting'],
    color: 'amber' as GlowColor,
    icon: TrendingUp,
  },
]

const safetyPrinciples = [
  { title: 'AI augments, never replaces clinical judgment', desc: 'Every AI output is a draft for expert review. The physician is always the final decision maker.', icon: Shield },
  { title: 'Patient data stays protected', desc: 'Use de-identified data with AI tools. Never share PHI with cloud AI services without proper BAAs.', icon: Heart },
  { title: 'Verify before acting', desc: 'AI can hallucinate medical facts. Cross-reference AI outputs with primary sources and clinical guidelines.', icon: AlertTriangle },
  { title: 'Document AI-assisted decisions', desc: 'Maintain transparency about when and how AI was used in clinical workflows. Audit trails matter.', icon: FileText },
]

const buildWithAgents = [
  { title: 'Patient intake form processor', desc: 'Auto-extract structured data from intake forms, flag abnormalities, pre-populate EHR fields.' },
  { title: 'Clinical trial matcher', desc: 'Match patient profiles against active clinical trials. Surface eligible studies automatically.' },
  { title: 'Differential diagnosis assistant', desc: 'Input symptoms and findings — AI generates ranked differentials with evidence links (physician review required).' },
  { title: 'CME content organizer', desc: 'Track continuing education credits, summarize conference notes, build personal knowledge base.' },
  { title: 'Practice analytics dashboard', desc: 'Visualize patient outcomes, wait times, and quality metrics from practice data.' },
  { title: 'Referral letter generator', desc: 'Structured, comprehensive referral letters from clinical notes in seconds.' },
]

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-600/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-rose-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-cyan-600/[0.03] blur-[100px]" />
      </div>

      <motion.div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24" variants={stagger} initial="hidden" animate="visible">
        {/* Hero */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="flex items-start gap-5 mb-6">
            <FrankOmega variant="portrait" size="md" glow />
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <Stethoscope className="h-3 w-3" />
                For Healthcare Professionals
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                AI in{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">Medicine</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/40 leading-relaxed">
                Practical AI workflows for clinical documentation, literature review, patient communication, and practice management. Safety-first, evidence-based, physician-led.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Safety-first approach', 'HIPAA awareness', 'Evidence-based workflows', 'Oracle Healthcare Cloud expertise'].map(c => (
              <span key={c} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/30">{c}</span>
            ))}
          </div>
        </motion.section>

        {/* Safety First */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Safety Principles</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {safetyPrinciples.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/60" />
                    <div>
                      <div className="text-xs font-semibold text-white/80">{p.title}</div>
                      <div className="text-[11px] text-white/35">{p.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Clinical Workflows */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">Clinical Workflows</span>
            <h2 className="mt-1 text-2xl font-bold text-white">AI-augmented clinical practice</h2>
            <p className="mt-1 text-xs text-white/30">Practical workflows that save time while maintaining clinical standards.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {clinicalWorkflows.map(wf => {
              const Icon = wf.icon
              return (
                <GlowCard key={wf.title} color={wf.color} className="!rounded-2xl">
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-white/40" />
                      <h3 className="text-sm font-semibold text-white">{wf.title}</h3>
                    </div>
                    <p className="text-[11px] text-white/30 leading-relaxed mb-3">{wf.description}</p>
                    <ul className="space-y-1.5">
                      {wf.approaches.map(a => (
                        <li key={a} className="flex items-start gap-1.5 text-[11px] text-white/40">
                          <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-white/20" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </motion.section>

        {/* AI Toolkit */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">Tools</span>
            <h2 className="mt-1 text-2xl font-bold text-white">The healthcare AI toolkit</h2>
            <p className="mt-1 text-xs text-white/30">General-purpose AI tools applicable to healthcare workflows (with appropriate safeguards).</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aiToolkit.filter(t => ['Claude', 'ChatGPT', 'Perplexity', 'Gemini'].includes(t.name)).map(tool => (
              <div key={tool.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">Build</span>
            <h2 className="mt-1 text-2xl font-bold text-white">What healthcare teams can build</h2>
            <p className="mt-1 text-xs text-white/30">Coding agents can rapidly prototype tools for clinical workflows.</p>
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

        {/* Resources */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">Resources</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Relevant from the FrankX ecosystem</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Research Hub', href: '/research', desc: 'Healthcare AI research domain with validated claims' },
              { name: 'State of AI 2026', href: '/students/ai-briefing', desc: 'Visual AI landscape — models, agents, skills' },
              { name: 'AI Skills Assessment', href: '/students/assess', desc: 'Measure your AI proficiency across 6 dimensions' },
              { name: 'Blog', href: '/blog', desc: '90+ articles on AI workflows and architecture' },
              { name: 'Prompt Library', href: '/prompt-library', desc: 'Adaptable prompts for clinical use cases' },
              { name: 'Ecosystem Map', href: '/students/ecosystem', desc: '21 tools mapped to learning stages' },
            ].map(r => (
              <Link key={r.name} href={r.href} className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-white/80 group-hover:text-white">{r.name}</span>
                  <div className="text-[10px] text-white/25">{r.desc}</div>
                </div>
                <ArrowRight className="h-3 w-3 shrink-0 text-white/15 group-hover:text-white/40" />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeUp}>
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI strategy for your practice or institution</h2>
                <p className="text-sm text-white/35">Frank has Oracle Healthcare Cloud expertise and designs AI systems for clinical workflows.</p>
              </div>
              <Link href="/coaching" className="group shrink-0 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 transition-all">
                Discuss healthcare AI <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-[11px] font-mono text-white/15">frankx.ai/doctors · AI in Healthcare by Frank X. Riemer</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
