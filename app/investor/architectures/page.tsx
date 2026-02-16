'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Network,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Search,
  BarChart3,
  ShieldCheck,
  Layers,
  Database,
  Bot,
  LineChart,
  Monitor,
  FileText,
  Package,
  Code,
  Github,
  CheckCircle2,
} from 'lucide-react'

import { getByCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

const savstSteps = [
  {
    letter: 'S',
    title: 'Source',
    desc: 'Systematically gather data from a 5-level hierarchy: SEC filings, industry reports, news, company materials, and social signals.',
    icon: Search,
    color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/25',
    tools: ['SEC EDGAR', 'RSS', 'News APIs'],
  },
  {
    letter: 'A',
    title: 'Analyze',
    desc: 'Multi-agent analysis: financial modeling, competitive positioning, team assessment, and market sizing running in parallel.',
    icon: BarChart3,
    color: 'text-violet-400 bg-violet-500/15 border-violet-500/25',
    tools: ['Claude Code', 'Financial Modeler', 'Research Analyst'],
  },
  {
    letter: 'V',
    title: 'Validate',
    desc: 'Cross-reference every claim against primary sources. Flag contradictions. Assign confidence scores to each finding.',
    icon: ShieldCheck,
    color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25',
    tools: ['Source Validator', 'Fact Checker', 'Confidence Engine'],
  },
  {
    letter: 'S',
    title: 'Synthesize',
    desc: 'Combine validated findings into structured deliverables: investment memos, DD reports, and thesis documents.',
    icon: FileText,
    color: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
    tools: ['Memo Writer', 'PDF Generator', 'Notion Sync'],
  },
  {
    letter: 'T',
    title: 'Track',
    desc: 'Persist knowledge across sessions. Monitor portfolio companies. Update theses as new data emerges.',
    icon: LineChart,
    color: 'text-rose-400 bg-rose-500/15 border-rose-500/25',
    tools: ['Memory System', 'Alert Workflows', 'Portfolio Tracker'],
  },
]

const stackLayers = [
  { num: 5, title: 'Dashboard & Reporting', tools: 'Next.js, Notion, PDF Export', icon: Monitor, color: 'text-cyan-400 bg-cyan-500/15' },
  { num: 4, title: 'Multi-Agent Orchestration', tools: 'Claude Code, Coworker, IACOS', icon: Bot, color: 'text-violet-400 bg-violet-500/15' },
  { num: 3, title: 'Analysis Pipeline', tools: 'n8n, Claude API, Custom Skills', icon: Layers, color: 'text-emerald-400 bg-emerald-500/15' },
  { num: 2, title: 'Data Ingestion', tools: 'SEC filings, News, Market Feeds', icon: Database, color: 'text-amber-400 bg-amber-500/15' },
  { num: 1, title: 'Infrastructure', tools: 'Cloud, Vector DB, Storage', icon: Network, color: 'text-rose-400 bg-rose-500/15' },
]

const included = [
  { icon: FileText, title: 'Architecture Documentation', desc: 'Complete system design docs with diagrams, data flows, and component specs.' },
  { icon: Code, title: 'Infrastructure-as-Code', desc: 'Terraform/Pulumi templates for cloud deployment. Ready to apply.' },
  { icon: Monitor, title: 'Dashboard Specifications', desc: 'UI wireframes, data schemas, and API contracts for the reporting layer.' },
  { icon: Bot, title: 'Agent Configurations', desc: 'All IACOS agent definitions, skill files, and orchestration patterns.' },
  { icon: Package, title: 'n8n Workflow JSONs', desc: 'Importable workflow definitions for every pipeline stage.' },
  { icon: Database, title: 'Data Pipeline Schemas', desc: 'Ingestion configs, transformation logic, and vector DB index definitions.' },
]

const faqs = [
  {
    q: 'Which cloud provider is recommended?',
    a: 'The architecture is cloud-agnostic. Templates include OCI (Oracle Cloud) as the primary target with AWS alternatives documented. The core intelligence layer (Claude Code + n8n) runs on any machine.',
  },
  {
    q: 'How large a team is needed to implement?',
    a: 'A solo developer can deploy the full stack in 2-3 weeks. The architecture is modular — start with Layer 1-3 (infrastructure + pipeline + analysis) and add the dashboard later.',
  },
  {
    q: 'Can this scale to institutional volume?',
    a: 'Yes. The data ingestion layer supports batch and streaming modes. The agent orchestration layer parallelizes research across multiple targets. Tested with 50+ concurrent analyses.',
  },
  {
    q: 'What about existing infrastructure?',
    a: 'The architecture integrates with existing tools. If you already have a CRM, the n8n layer connects to it. If you have a data warehouse, the ingestion layer can write to it.',
  },
  {
    q: 'Is this a template or custom development?',
    a: 'It\'s a production-ready template. You get the complete architecture — code, configs, docs — that you customize for your investment thesis, data sources, and reporting needs.',
  },
]

/*
 * FAQ Schema — static data only, hardcoded from const faqs above.
 * No user input or dynamic content. Safe for inline JSON-LD.
 */
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
})

export default function InvestorArchitecturesPage() {
  const products = getByCategory('architectures')
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <main className="min-h-screen bg-[#030712]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      {/* Header */}
      <section className="pb-8 pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/investor" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
            Back to Investor Hub
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Network className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">System Architectures</h1>
              <p className="text-slate-400">Full-stack intelligence blueprints</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Complete system architecture blueprints for building institutional-grade intelligence
            platforms. Data pipelines, multi-agent orchestration, dashboards, and IaC templates
            — everything you need to go from zero to production.
          </motion.p>
        </div>
      </section>

      {/* SAVST Framework */}
      <section className="border-y border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Methodology</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">The SAVST Research Framework</h2>
            <p className="mx-auto mt-2 max-w-lg text-slate-400">Every architecture follows a 5-stage methodology designed for institutional-grade research quality.</p>
          </motion.div>

          <div className="space-y-4">
            {savstSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title + i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start gap-5 rounded-2xl border ${step.color.split(' ')[2]} bg-white/[0.02] p-5`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${step.color.split(' ').slice(0, 2).join(' ')}`}>
                    <span className="text-lg font-black">{step.letter}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <Icon className={`h-4 w-4 ${step.color.split(' ')[0]}`} />
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {step.tools.map((tool) => (
                        <span key={tool} className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-500">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Architecture Stack */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">5-Layer Stack</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Architecture Overview</h2>
          </motion.div>

          <div className="space-y-2">
            {stackLayers.map((layer, i) => {
              const Icon = layer.icon
              return (
                <motion.div
                  key={layer.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${layer.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-600">L{layer.num}</span>
                      <h3 className="font-bold text-white">{layer.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500">{layer.tools}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Deliverables</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What You Get</h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:flex-row sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-white" />
              <p className="text-sm text-slate-400">Architecture framework and agent configs are open source.</p>
            </div>
            <a
              href="https://github.com/frankxai/investor-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              View on GitHub
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Products</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Architecture Blueprints</h2>
            <p className="mt-2 text-slate-400">Complete system designs ready for deployment.</p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <InvestorProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <Network className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">Architecture blueprints are being prepared.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between p-5 text-left">
                  <span className="pr-4 font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-white/[0.04] px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-slate-400">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Start Smaller?</h2>
          <p className="mb-6 text-slate-400">Grab individual agent packs or workflow templates to build your stack incrementally.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/investor/agents"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Agent Packs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/investor/workflows"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              Workflow Templates
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
