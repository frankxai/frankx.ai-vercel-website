'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Gift,
  ArrowRight,
  Crown,
  Rocket,
  ExternalLink,
  FileText,
  CheckSquare,
  AlertTriangle,
  Shield,
  Music,
  Workflow,
  GraduationCap,
  Sparkles,
  Users,
  ChevronRight,
} from 'lucide-react'

// ============================================================================
// TEMPLATE DATA
// ============================================================================

const freeTemplates = [
  {
    title: 'COE Checklist',
    description: 'Capture -> Orchestrate -> Evaluate implementation checklist.',
    href: '/templates/coe-checklist.html',
    icon: CheckSquare,
    meta: 'Free HTML Template',
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-500/5',
  },
  {
    title: 'Evaluation Rubric',
    description: 'Quality criteria and scoring system for AI outputs.',
    href: '/templates/evaluation-rubric.html',
    icon: FileText,
    meta: 'Free HTML Template',
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  {
    title: 'Risk Register',
    description: 'Track risks, owners, mitigations, and review cadence.',
    href: '/templates/risk-register.html',
    icon: AlertTriangle,
    meta: 'Free HTML Template',
    color: 'text-red-400',
    gradient: 'from-red-500/20 to-red-500/5',
  },
  {
    title: 'Governance Overview',
    description: 'One-page governance summary for stakeholders.',
    href: '/templates/governance-overview.html',
    icon: Shield,
    meta: 'Free HTML Template',
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    title: 'Vibe OS Guide',
    description: 'Read-through guide for prompt systems and creator workflows.',
    href: '/pdf-templates/vibe-os-guide.html',
    icon: Sparkles,
    meta: 'Free Guide',
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    title: '5 Suno Prompts',
    description: 'Fast-start prompt pack for music creation sessions.',
    href: '/pdf-templates/5-suno-prompts.html',
    icon: Music,
    meta: 'Free Prompt Pack',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
]

const premiumTemplates = [
  {
    title: 'Template Marketplace',
    description: 'Paid template catalog with source code, deployment guides, and licenses.',
    href: '/shop/templates',
    icon: Crown,
    meta: 'Premium from $27',
    color: 'text-amber-300',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  {
    title: 'AI Architecture Templates',
    description: 'Production architecture kits for RAG, multi-agent, and LLMOps systems.',
    href: '/ai-architecture/templates',
    icon: Workflow,
    meta: 'Premium from $29',
    color: 'text-violet-300',
    gradient: 'from-violet-500/20 to-violet-500/5',
  },
  {
    title: 'Vibe OS',
    description: 'Music creation system with proven prompt architecture and workflows.',
    href: '/products/vibe-os',
    icon: Music,
    meta: 'Flagship product',
    color: 'text-emerald-300',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    title: 'Suno Prompt Library',
    description: 'Commercial-grade Suno prompts and session frameworks.',
    href: '/products/suno-prompt-library',
    icon: Sparkles,
    meta: 'Premium product',
    color: 'text-cyan-300',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
]

const upsellOffers = [
  {
    title: 'Coaching & Implementation',
    description: 'Hands-on support to customize templates for your use case.',
    href: '/coaching',
    icon: GraduationCap,
    meta: 'High-touch service',
    color: 'text-rose-300',
    gradient: 'from-rose-500/20 to-rose-500/5',
  },
  {
    title: 'Team Workshop',
    description: 'Run live sessions to operationalize AI templates with your team.',
    href: '/workshops',
    icon: Users,
    meta: 'B2B upsell',
    color: 'text-indigo-300',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
  },
  {
    title: 'Custom Build Request',
    description: 'Done-for-you template system for your business model.',
    href: '/contact',
    icon: Rocket,
    meta: 'Custom engagement',
    color: 'text-orange-300',
    gradient: 'from-orange-500/20 to-orange-500/5',
  },
]

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-void" />
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

function TemplateCard({
  template,
  index,
  external = false,
}: {
  template: typeof freeTemplates[0]
  index: number
  external?: boolean
}) {
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
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group block relative p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
              <Icon className={`w-5 h-5 ${template.color}`} />
            </div>
            {external ? (
              <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
            )}
          </div>

          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
            {template.title}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
            {template.description}
          </p>
          <p className="text-xs text-white/35 mt-3 uppercase tracking-[0.14em]">
            {template.meta}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// MAIN SHELL
// ============================================================================

export default function TemplatesHubShell() {
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Templates & Frameworks
                <span className="block mt-2 text-white/60">Copy, adapt, ship.</span>
              </h1>

              {/* Subtext */}
              <p className="text-[17px] md:text-xl text-white/80 max-w-2xl leading-relaxed">
                A clear monetization ladder: free templates to start, premium systems to ship,
                and implementation offers when you want acceleration.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Free Templates */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8 flex items-center gap-3">
              <Gift className="w-5 h-5 text-emerald-300" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">Free Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeTemplates.map((template, i) => (
                <TemplateCard key={template.title} template={template} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Premium Templates */}
        <section className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8 flex items-center gap-3">
              <Crown className="w-5 h-5 text-amber-300" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">Premium Templates</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {premiumTemplates.map((template, i) => (
                <TemplateCard key={template.title} template={template} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Upsell Offers */}
        <section className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8 flex items-center gap-3">
              <Rocket className="w-5 h-5 text-cyan-300" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white">Upsell: Done With You / For You</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upsellOffers.map((template, i) => (
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
                Need a full template roadmap?
              </h2>
              <p className="text-[17px] leading-relaxed text-white/80 mb-8">
                Start free, graduate to premium, then use coaching/workshops for implementation speed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/shop/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  Browse Premium Templates
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/coaching"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  Book Coaching
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
