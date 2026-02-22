'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText,
  ArrowRight,
  Layers,
  Shield,
  CheckSquare,
  AlertTriangle,
  Settings,
  ChevronRight,
} from 'lucide-react'

// ============================================================================
// TEMPLATE DATA
// ============================================================================

const templates = [
  {
    title: 'Master Template Library',
    description: 'Browse the complete templates library with all available resources.',
    href: '/reading/Templates/MASTER_TEMPLATE_INDEX.html',
    icon: Layers,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    title: 'RAG Pipeline Architecture',
    description: 'Reference architecture and checklist for retrieval-augmented generation pipelines.',
    href: '/reading/Templates/02-AI-Architecture/RAG-Pipeline-Architecture.html',
    icon: Settings,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    title: 'COE Checklist',
    description: 'Capture → Orchestrate → Evaluate. Step-by-step implementation checklist.',
    href: '/templates/coe-checklist.html',
    icon: CheckSquare,
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-500/5',
  },
  {
    title: 'Evaluation Rubric',
    description: 'Quality criteria, scoring rubric, and sampling plan for AI outputs.',
    href: '/templates/evaluation-rubric.html',
    icon: FileText,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  {
    title: 'Risk Register',
    description: 'Track risks, mitigations, owners, and review cadence for AI projects.',
    href: '/templates/risk-register.html',
    icon: AlertTriangle,
    color: 'text-red-400',
    gradient: 'from-red-500/20 to-red-500/5',
  },
  {
    title: 'Governance Overview',
    description: 'One-page workflow governance summary for stakeholders.',
    href: '/templates/governance-overview.html',
    icon: Shield,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
]

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
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
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
// TEMPLATE CARD
// ============================================================================

function TemplateCard({ template, index }: { template: typeof templates[0]; index: number }) {
  const Icon = template.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={template.href}
        className="group block relative p-6 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
              <Icon className={`w-5 h-5 ${template.color}`} />
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
          </div>

          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {template.title}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
            {template.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function TemplatesPage() {
  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  Resources
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Templates & Frameworks
                <span className="block mt-2 text-white/60">Copy, adapt, ship.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
                Prompts, evaluation sheets, agent blueprints, and scorecards.
                Everything you need to start building.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, i) => (
                <TemplateCard key={template.title} template={template} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want implementation guides?
              </h2>
              <p className="text-white/50 mb-8">
                Check out the step-by-step guides for deeper walkthroughs on specific topics.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
                >
                  View Guides
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/prompt-library"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium transition-colors"
                >
                  Prompt Library
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
