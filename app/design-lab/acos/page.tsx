'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Terminal,
  Sparkles,
  Users,
  Command,
  Layers,
  Zap,
  Brain,
  Code2,
  Workflow,
  GitBranch,
  CircleDot,
  Hexagon,
  Search,
  ChevronRight,
  Play,
  Eye,
  Palette,
} from 'lucide-react'

// ── Design Challenge Context ──

const CHALLENGE = {
  title: '630+ skills. 40+ agents. 130+ commands.',
  question: 'How do you make that feel simple?',
  description:
    'The ACOS page must communicate massive capability without overwhelming new visitors. Three design concepts explore different information architecture approaches.',
}

// ── Skill Categories (real data) ──

const skillCategories = [
  { name: 'Frontend', count: 89, color: '#43BFE3', skills: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Framer Motion'] },
  { name: 'Backend', count: 74, color: '#AB47C7', skills: ['Node.js', 'Python', 'APIs', 'Databases', 'Auth'] },
  { name: 'AI/ML', count: 112, color: '#10B981', skills: ['LLM Patterns', 'RAG', 'Agents', 'Embeddings', 'Evaluation'] },
  { name: 'DevOps', count: 56, color: '#F59E0B', skills: ['Docker', 'CI/CD', 'Terraform', 'Kubernetes', 'Monitoring'] },
  { name: 'Content', count: 83, color: '#E040FB', skills: ['SEO', 'Blog', 'Social', 'Copywriting', 'Schema'] },
  { name: 'Design', count: 67, color: '#F43F5E', skills: ['UI/UX', 'Accessibility', 'Animation', 'Figma', 'Brand'] },
  { name: 'Security', count: 48, color: '#6366F1', skills: ['OWASP', 'Pen Testing', 'Threat Modeling', 'Auth', 'Encryption'] },
  { name: 'Music', count: 34, color: '#EC4899', skills: ['Suno AI', 'Prompt Craft', 'Genre Design', 'Mixing', 'Distribution'] },
  { name: 'Data', count: 67, color: '#14B8A6', skills: ['SQL', 'Analytics', 'Pipelines', 'Visualization', 'Quality'] },
]

const agents = [
  { name: 'Technical Architect', skill: 'System Design', color: '#43BFE3' },
  { name: 'Content Engine', skill: 'Blog & SEO', color: '#AB47C7' },
  { name: 'Music Producer', skill: 'Suno AI', color: '#EC4899' },
  { name: 'SEO Intelligence', skill: 'Rankings', color: '#10B981' },
  { name: 'Frontend Designer', skill: 'UI/UX', color: '#F59E0B' },
  { name: 'DevOps Engineer', skill: 'Deploy', color: '#6366F1' },
  { name: 'Security Auditor', skill: 'Pen Test', color: '#F43F5E' },
  { name: 'Research Librarian', skill: 'Deep Research', color: '#14B8A6' },
]

// ── Concept 1: Command Center ──

function CommandCenterConcept() {
  const [input, setInput] = useState('')
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const suggestions = useMemo(() => {
    if (!input) return []
    const lower = input.toLowerCase()
    const matches: { type: string; label: string; detail: string; color: string }[] = []

    skillCategories.forEach(cat => {
      if (cat.name.toLowerCase().includes(lower)) {
        matches.push({ type: 'Category', label: cat.name, detail: `${cat.count} skills`, color: cat.color })
      }
      cat.skills.forEach(s => {
        if (s.toLowerCase().includes(lower)) {
          matches.push({ type: 'Skill', label: s, detail: cat.name, color: cat.color })
        }
      })
    })
    agents.forEach(a => {
      if (a.name.toLowerCase().includes(lower) || a.skill.toLowerCase().includes(lower)) {
        matches.push({ type: 'Agent', label: a.name, detail: a.skill, color: a.color })
      }
    })
    return matches.slice(0, 6)
  }, [input])

  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-[#0d1117] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-xs text-white/30 font-mono ml-2">acos-command-center</span>
      </div>

      {/* Command Input */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-purple-400">/acos</span>
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="What do you want to build?"
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-purple-500/30 font-mono"
            />
          </div>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            {suggestions.map((s, i) => (
              <div
                key={`${s.label}-${i}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors cursor-pointer border-b last:border-b-0 border-white/[0.04]"
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] font-mono text-white/30 w-16">{s.type}</span>
                <span className="text-sm text-white/80 font-medium">{s.label}</span>
                <span className="text-xs text-white/30 ml-auto">{s.detail}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Agent Grid */}
        <p className="text-[10px] uppercase tracking-wider text-white/20 mb-3 font-mono">Active Agents</p>
        <div className="grid grid-cols-4 gap-2">
          {agents.map(agent => (
            <button
              key={agent.name}
              onClick={() => setActiveAgent(activeAgent === agent.name ? null : agent.name)}
              className={`relative p-3 rounded-lg border transition-all duration-200 text-left ${
                activeAgent === agent.name
                  ? 'border-white/20 bg-white/[0.05]'
                  : 'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]'
              }`}
            >
              <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: agent.color }} />
              <p className="text-[11px] font-medium text-white/70 leading-tight">{agent.name}</p>
              <p className="text-[9px] text-white/30 mt-0.5">{agent.skill}</p>
              {activeAgent === agent.name && (
                <motion.div
                  layoutId="agent-active"
                  className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                  style={{ borderColor: agent.color + '40' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 flex gap-3">
          {[
            { label: 'Skills Loaded', value: '630+', color: 'text-cyan-400' },
            { label: 'Agents Ready', value: '40+', color: 'text-purple-400' },
            { label: 'Avg Response', value: '< 2s', color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="flex-1 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Concept 2: Skill Galaxy ──

function SkillGalaxyConcept() {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  // Deterministic positions for skill clusters in a circular layout
  const positions = useMemo(() => {
    return skillCategories.map((cat, i) => {
      const angle = (i / skillCategories.length) * Math.PI * 2 - Math.PI / 2
      const radius = 140
      return {
        x: 200 + Math.cos(angle) * radius,
        y: 200 + Math.sin(angle) * radius,
        size: 16 + (cat.count / 112) * 24,
      }
    })
  }, [])

  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-[#0a0a0b] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Hexagon className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-semibold text-white/80">Skill Galaxy</span>
        </div>
        <span className="text-[10px] text-white/30">{skillCategories.reduce((s, c) => s + c.count, 0)} total skills</span>
      </div>

      <div className="relative h-[400px]">
        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
            <Command className="w-6 h-6 text-white/60" />
          </div>
          <p className="text-[10px] text-white/40 text-center mt-2 font-medium">/acos</p>
        </div>

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          {positions.map((pos, i) => (
            <line
              key={`line-${i}`}
              x1={200}
              y1={200}
              x2={pos.x}
              y2={pos.y}
              stroke={skillCategories[i].color}
              strokeOpacity={hoveredCat === skillCategories[i].name ? 0.3 : 0.06}
              strokeWidth={1}
              className="transition-all duration-300"
            />
          ))}
          {/* Connect adjacent nodes */}
          {positions.map((pos, i) => {
            const next = positions[(i + 1) % positions.length]
            return (
              <line
                key={`conn-${i}`}
                x1={pos.x}
                y1={pos.y}
                x2={next.x}
                y2={next.y}
                stroke="white"
                strokeOpacity={0.03}
                strokeWidth={0.5}
              />
            )
          })}
        </svg>

        {/* Skill nodes */}
        {skillCategories.map((cat, i) => {
          const pos = positions[i]
          const isHovered = hoveredCat === cat.name
          return (
            <motion.div
              key={cat.name}
              className="absolute z-10 cursor-pointer"
              style={{
                left: `${(pos.x / 400) * 100}%`,
                top: `${(pos.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredCat(cat.name)}
              onMouseLeave={() => setHoveredCat(null)}
              animate={shouldReduceMotion ? {} : {
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
                style={{
                  backgroundColor: cat.color,
                  opacity: isHovered ? 0.3 : 0.05,
                  transform: 'scale(2)',
                }}
              />
              {/* Node */}
              <div
                className="relative rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  width: pos.size,
                  height: pos.size,
                  backgroundColor: isHovered ? cat.color + '30' : cat.color + '10',
                  borderColor: isHovered ? cat.color + '60' : cat.color + '20',
                }}
              >
                <span className="text-[8px] font-bold text-white/80">{cat.count}</span>
              </div>
              {/* Label */}
              <p
                className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap transition-all duration-200"
                style={{ color: isHovered ? cat.color : 'rgba(255,255,255,0.35)' }}
              >
                {cat.name}
              </p>
              {/* Expanded skills on hover */}
              {isHovered && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-full mt-5 left-1/2 -translate-x-1/2 bg-[#111113] border border-white/10 rounded-lg p-3 min-w-[140px] z-30"
                >
                  {cat.skills.map(s => (
                    <div key={s} className="flex items-center gap-2 py-0.5">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-[10px] text-white/60">{s}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ── Concept 3: Flow Architecture ──

function FlowArchitectureConcept() {
  const shouldReduceMotion = useReducedMotion()

  const flowSteps = [
    {
      label: 'Input',
      description: 'User types a command or describes intent',
      icon: Terminal,
      color: '#43BFE3',
      detail: '/acos "write a blog post about RAG"',
    },
    {
      label: 'Router',
      description: 'Smart router classifies intent and selects agent',
      icon: GitBranch,
      color: '#AB47C7',
      detail: 'Intent: content → Agent: Content Engine',
    },
    {
      label: 'Skills',
      description: 'Relevant skills auto-activate from the library',
      icon: Sparkles,
      color: '#F59E0B',
      detail: 'seo-content-writer + schema-markup + blog-templates',
    },
    {
      label: 'Execute',
      description: 'Agent works with tools: MCP servers, file system, web',
      icon: Zap,
      color: '#10B981',
      detail: 'Research → Outline → Draft → SEO → Publish',
    },
    {
      label: 'Output',
      description: 'Artifact delivered: article, code, music, deployment',
      icon: Play,
      color: '#E040FB',
      detail: 'Published: /blog/rag-production-patterns',
    },
  ]

  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-[#0a0a0b] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white/80">Flow Architecture</span>
        </div>
        <span className="text-[10px] text-white/30">Pipeline visualization</span>
      </div>

      <div className="p-6">
        {/* Flow pipeline */}
        <div className="space-y-0">
          {flowSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < flowSteps.length - 1 && (
                <div
                  className="absolute left-[19px] top-[44px] w-0.5 h-8"
                  style={{ backgroundColor: step.color + '20' }}
                />
              )}

              <div className="flex items-start gap-4 py-3">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: step.color + '10',
                    borderColor: step.color + '25',
                  }}
                >
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: step.color + '15', color: step.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-semibold text-white/85">{step.label}</h4>
                  </div>
                  <p className="text-xs text-white/40 mb-1.5">{step.description}</p>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]">
                    <code className="text-[10px] font-mono text-white/50">{step.detail}</code>
                  </div>
                </div>

                {/* Step indicator */}
                {i < flowSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-white/10 mt-3 shrink-0 rotate-90" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-3">
          {[
            { label: 'Avg pipeline time', value: '45s', color: 'text-cyan-400' },
            { label: 'Skills per request', value: '3-8', color: 'text-purple-400' },
            { label: 'Success rate', value: '94%', color: 'text-emerald-400' },
          ].map(m => (
            <div key={m.label} className="text-center p-2 rounded-lg bg-white/[0.01]">
              <p className={`text-base font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[9px] text-white/25">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Concept Card Wrapper ──

function ConceptCard({
  number,
  title,
  subtitle,
  approach,
  strengths,
  tradeoffs,
  color,
  children,
}: {
  number: string
  title: string
  subtitle: string
  approach: string
  strengths: string[]
  tradeoffs: string[]
  color: string
  children: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
      className="mb-20"
    >
      {/* Concept Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 border"
          style={{ backgroundColor: color + '15', borderColor: color + '30', color }}
        >
          {number}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
          <p className="text-white/50 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Approach */}
      <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Design Approach</p>
        <p className="text-sm text-white/60">{approach}</p>
      </div>

      {/* Live Prototype */}
      <div className="mb-6">{children}</div>

      {/* Analysis */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400/60 mb-2 font-semibold">Strengths</p>
          <ul className="space-y-1.5">
            {strengths.map(s => (
              <li key={s} className="flex items-start gap-2 text-xs text-white/50">
                <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/[0.03] border border-amber-500/10">
          <p className="text-[10px] uppercase tracking-wider text-amber-400/60 mb-2 font-semibold">Trade-offs</p>
          <ul className="space-y-1.5">
            {tradeoffs.map(t => (
              <li key={t} className="flex items-start gap-2 text-xs text-white/50">
                <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}

// ── Main Page ──

export default function ACOSDesignLabPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 right-0 w-[60%] h-[50%]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(171,71,199,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[50%] h-[40%]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(67,191,227,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="pt-24 pb-4">
          <Link
            href="/design-lab"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Design Lab
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="pb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <CircleDot className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">ACOS Redesign</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1]">
            {CHALLENGE.title}
            <span className="block text-white/40 mt-2 text-2xl md:text-3xl font-medium">
              {CHALLENGE.question}
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-8">
            {CHALLENGE.description}
          </p>

          {/* Quick jump */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Command Center', color: '#43BFE3', href: '#command-center' },
              { label: 'Skill Galaxy', color: '#AB47C7', href: '#skill-galaxy' },
              { label: 'Flow Architecture', color: '#10B981', href: '#flow-architecture' },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-sm text-white/60 hover:text-white/90 hover:border-white/[0.15] transition-all"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                {c.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Concept 1 */}
        <div id="command-center">
          <ConceptCard
            number="01"
            title="Command Center"
            subtitle="Terminal-first interface that speaks to developers"
            approach="Leans into the CLI nature of ACOS. The page itself becomes a live terminal where visitors can search skills, browse agents, and see the command in action. Familiar to technical users, instantly communicates 'this is a real tool.'"
            strengths={[
              'Immediate credibility with technical audience',
              'Interactive — visitors can search skills right on the page',
              'Communicates depth without long feature lists',
              'The terminal aesthetic matches the product reality',
            ]}
            tradeoffs={[
              'May feel intimidating to non-technical visitors',
              'Terminal metaphor limits creative layout options',
              'Requires JavaScript for the interactive search',
            ]}
            color="#43BFE3"
          >
            <CommandCenterConcept />
          </ConceptCard>
        </div>

        {/* Concept 2 */}
        <div id="skill-galaxy">
          <ConceptCard
            number="02"
            title="Skill Galaxy"
            subtitle="Visual constellation mapping the ACOS ecosystem"
            approach="Represents the skill library as an interactive constellation. Each node is a category, sized by skill count, connected by relationship lines. Hovering reveals individual skills. Makes the scale tangible and explorable."
            strengths={[
              'Visceral sense of scale — you can see 630+ skills',
              'Exploration-driven: rewards curiosity',
              'Unique visual identity that stands out',
              'Natural grouping communicates organization',
            ]}
            tradeoffs={[
              'SVG-heavy — performance on low-end devices',
              'Accessibility challenge for screen readers',
              'Hover-dependent interactions need touch alternatives',
            ]}
            color="#AB47C7"
          >
            <SkillGalaxyConcept />
          </ConceptCard>
        </div>

        {/* Concept 3 */}
        <div id="flow-architecture">
          <ConceptCard
            number="03"
            title="Flow Architecture"
            subtitle="Pipeline view showing how ACOS actually works"
            approach="Instead of listing features, shows the actual flow: Input → Router → Skills → Execute → Output. Each step is a real example. Visitors understand not just what ACOS has, but how it works end-to-end."
            strengths={[
              'Tells a story — visitors understand the journey',
              'Real examples make abstract concepts concrete',
              'Linear flow is universally understandable',
              'Pairs well with case studies and testimonials',
            ]}
            tradeoffs={[
              'Less visual impact than galaxy view',
              'Harder to communicate the full breadth of skills',
              'Risk of feeling too much like documentation',
            ]}
            color="#10B981"
          >
            <FlowArchitectureConcept />
          </ConceptCard>
        </div>

        {/* Comparison Summary */}
        <motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 pr-4 text-white/30 font-medium text-xs">Dimension</th>
                  <th className="text-center py-3 px-4 text-cyan-400/60 font-medium text-xs">Command Center</th>
                  <th className="text-center py-3 px-4 text-purple-400/60 font-medium text-xs">Skill Galaxy</th>
                  <th className="text-center py-3 px-4 text-emerald-400/60 font-medium text-xs">Flow Architecture</th>
                </tr>
              </thead>
              <tbody className="text-white/50">
                {[
                  { dim: 'Technical audience', scores: ['10', '7', '8'] },
                  { dim: 'Non-technical appeal', scores: ['5', '8', '9'] },
                  { dim: 'Visual impact', scores: ['7', '10', '6'] },
                  { dim: 'Information density', scores: ['9', '7', '8'] },
                  { dim: 'Accessibility', scores: ['8', '5', '9'] },
                  { dim: 'Performance', scores: ['9', '6', '10'] },
                  { dim: 'Mobile experience', scores: ['7', '5', '9'] },
                ].map(row => (
                  <tr key={row.dim} className="border-b border-white/[0.03]">
                    <td className="py-2.5 pr-4 text-white/40 text-xs">{row.dim}</td>
                    {row.scores.map((score, i) => (
                      <td key={i} className="py-2.5 px-4 text-center font-mono text-xs">
                        <span className={
                          Number(score) >= 9 ? 'text-emerald-400' :
                          Number(score) >= 7 ? 'text-white/60' :
                          'text-white/30'
                        }>{score}</span>/10
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <p className="text-white/40 text-sm mb-4">
              These are live explorations. The final ACOS page may combine elements from multiple concepts.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/acos"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 hover:bg-purple-500/20 transition-all"
              >
                Current ACOS Page
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/design-lab"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white/60 hover:text-white/90 transition-all"
              >
                Back to Design Lab
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
