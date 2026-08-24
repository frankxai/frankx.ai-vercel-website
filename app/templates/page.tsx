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
  Zap,
  Boxes,
  ArrowUpRight,
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
    title: 'Agentic Micro-SaaS Starter Kit',
    description: 'Turn-key Next.js 16 + Edge API + Stripe checkout + MCP bridge for launching sovereign AI tools.',
    href: '/shop/templates',
    icon: Rocket,
    meta: 'Starter Kit · $47',
    color: 'text-emerald-300',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=agentic-microsaas-hub&env=ANTHROPIC_API_KEY,OPENAI_API_KEY',
  },
  {
    title: 'Digital Asset & Template Marketplace',
    description: 'Zero-database markdown/JSON architecture with instant search, live previews, and automated delivery.',
    href: '/shop/templates',
    icon: Crown,
    meta: 'Marketplace OS · $49',
    color: 'text-amber-300',
    gradient: 'from-amber-500/20 to-amber-500/5',
    deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=digital-asset-marketplace',
  },
  {
    title: 'Creator Knowledge & Library OS',
    description: 'Autonomous content engine, book reviews, quote networks, and GEO-optimized JSON-LD schemas.',
    href: '/library/build',
    icon: Workflow,
    meta: 'Open & Premium · Free/$29',
    color: 'text-cyan-300',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=creator-library-os',
  },
  {
    title: 'Autonomous Swarm Workstation (ACOS Core)',
    description: 'Multi-agent orchestration system with 38 specialized agents, 75+ skills, and deterministic test gates.',
    href: '/products/agentic-creator-os',
    icon: Sparkles,
    meta: 'Flagship OS · $47/$197',
    color: 'text-violet-300',
    gradient: 'from-violet-500/20 to-violet-500/5',
    deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=multi-agent-framework&env=ANTHROPIC_API_KEY,OPENAI_API_KEY,GEMINI_API_KEY',
  },
  {
    title: 'AI Architecture Production Templates',
    description: 'Enterprise RAG, multi-cloud LLMOps, and agent gateway blueprints battle-tested for production scale.',
    href: '/ai-architecture/templates',
    icon: Shield,
    meta: 'Architecture Kit · $49',
    color: 'text-blue-300',
    gradient: 'from-blue-500/20 to-blue-500/5',
    deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=ai-architecture-templates',
  },
  {
    title: 'Vibe OS & Suno Prompt Architecture',
    description: '12,000-track battle-tested prompt systems, 5-layer architecture, and frequency science production packs.',
    href: '/products/vibe-os',
    icon: Music,
    meta: 'Music Creation · $37',
    color: 'text-rose-300',
    gradient: 'from-rose-500/20 to-rose-500/5',
    deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX&project-name=suno-mastery-studio',
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

function TemplateCard({
  template,
  index,
  external = false,
}: {
  template: (typeof freeTemplates)[0] | (typeof premiumTemplates)[0]
  index: number
  external?: boolean
}) {
  const Icon = template.icon
  const deployUrl = 'deployUrl' in template ? template.deployUrl : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10">
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
        <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors mb-4">
          {template.description}
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
        <span className="text-xs text-white/40 uppercase tracking-[0.14em] font-medium">
          {template.meta}
        </span>

        <div className="flex items-center gap-2">
          {deployUrl && (
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-colors"
              title="Deploy with Vercel"
            >
              <span>▲ Deploy</span>
            </a>
          )}
          <Link
            href={template.href}
            target={external ? '_blank' : undefined}
            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
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
        <section className="pt-32 pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/80">
                  AI Architect for a More Free World · Starter Kits &amp; Blueprints
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Sovereign Business Starter Kits &amp; Templates
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                  Fork, Own, and Launch Globally.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed mb-8">
                Turn-key modular architectures built on local-first principles. Launch micro-SaaS tools, digital asset marketplaces, autonomous swarms, and creator knowledge hubs with zero SaaS cage lock-in.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/v0"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore 19 v0 Interactive Prototypes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/shop/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all"
                >
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>Shop Commercial Kits</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Flagship v0 Studio Feature Banner */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-900/70 to-cyan-950/40 p-8 md:p-10 overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Zap className="w-3.5 h-3.5" /> Canonical v0 Sovereign Design Engine
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    Experience Live Responsive Demos at /v0
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    Switch viewports in real time between Desktop, Tablet, and Mobile. 1-Click deploy
                    complete architectures to Vercel, or remix the generative source directly in v0.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckSquare className="w-3.5 h-3.5" /> 19 SOTA Models
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <CheckSquare className="w-3.5 h-3.5" /> Next.js 16 Native
                    </span>
                    <span className="flex items-center gap-1 text-violet-400">
                      <CheckSquare className="w-3.5 h-3.5" /> Multi-Agent MCP Ready
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  <Link
                    href="/v0"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
                  >
                    <span>Launch /v0 Studio</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://vercel.com/new/clone?repository-url=https://github.com/frankxai/FrankX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-colors"
                  >
                    <span>▲ 1-Click Vercel Deploy</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Free Templates */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-emerald-300" />
                <h2 className="text-2xl font-semibold text-white">Free Developer &amp; Creator Templates</h2>
              </div>
              <span className="text-xs text-zinc-500 font-medium">100% Free · No Lock-In</span>
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
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-300" />
                <h2 className="text-2xl font-semibold text-white">Commercial Micro-SaaS &amp; Starter Kits</h2>
              </div>
              <Link
                href="/shop/templates"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                <span>View All in Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
              <h2 className="text-2xl font-semibold text-white">Bespoke Acceleration: Done With You / For You</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need a full template roadmap?
              </h2>
              <p className="text-white/50 mb-8">
                Start free, deploy to Vercel in seconds, and scale to commercial micro-SaaS.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/v0"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch /v0 Engine</span>
                </Link>
                <Link
                  href="/shop/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium transition-colors"
                >
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>Browse Shop</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
