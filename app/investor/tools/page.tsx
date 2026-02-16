'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wrench,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Terminal,
  BookOpen,
  LayoutDashboard,
  Gift,
  CheckCircle2,
  Download,
  Github,
  Sparkles,
} from 'lucide-react'

import { getByCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

const stackTools = [
  {
    icon: Terminal,
    name: 'Claude Code',
    role: 'Analysis Engine',
    desc: 'AI-powered research, financial modeling, and report generation. The brain of your stack.',
    color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20',
  },
  {
    icon: LayoutDashboard,
    name: 'Notion',
    role: 'Deal CRM',
    desc: 'Pipeline management, portfolio tracking, LP relations, and meeting notes. Your deal database.',
    color: 'text-slate-300 bg-white/10 border-white/10',
  },
  {
    icon: BookOpen,
    name: 'Obsidian',
    role: 'Research Vault',
    desc: 'Private, offline-first research notes. Investment theses, quarterly reviews, and market analysis.',
    color: 'text-violet-400 bg-violet-500/15 border-violet-500/20',
  },
  {
    icon: Wrench,
    name: 'n8n',
    role: 'Automation',
    desc: 'Connect everything. Deal sourcing, alerts, digests, and reporting workflows on autopilot.',
    color: 'text-amber-400 bg-amber-500/15 border-amber-500/20',
  },
]

const quickStartCategories = [
  {
    title: 'Notion Templates',
    items: ['Deal Flow CRM with 7-stage pipeline', 'LP Relationship Tracker', 'Portfolio Dashboard with KPI views', 'Due Diligence Checklist (25+ items)'],
    color: 'border-slate-500/20',
    icon: LayoutDashboard,
    iconColor: 'text-slate-300 bg-white/10',
  },
  {
    title: 'Obsidian Vaults',
    items: ['Quarterly Review Templates', 'Investment Thesis Journal', 'Company Metric Tracking', 'Performance Logging with Graphs'],
    color: 'border-violet-500/20',
    icon: BookOpen,
    iconColor: 'text-violet-400 bg-violet-500/15',
  },
  {
    title: 'Claude Code Configs',
    items: ['Pre-loaded Research Workspace', '30+ Investment Prompts', 'Custom Financial Analysis Skills', 'Coworker Agent Configurations'],
    color: 'border-cyan-500/20',
    icon: Terminal,
    iconColor: 'text-cyan-400 bg-cyan-500/15',
  },
]

const starterKitFeatures = [
  '5 Claude Code prompts for stock screening',
  'Notion deal tracker template (Kanban + Table)',
  'PDF guide to AI-powered investment research',
  'Quick-start checklist (under 10 minutes)',
  'Works with free Claude tier',
]

const faqs = [
  {
    q: 'Notion or Obsidian — which should I use?',
    a: 'Use Notion if you want a collaborative CRM with views, filters, and sharing. Use Obsidian if you want a private, offline-first research vault. Many investors use both — Notion for deal management, Obsidian for deep research.',
  },
  {
    q: 'Do I need Claude Code experience?',
    a: 'No. The workspace configs include a SETUP.md with step-by-step instructions. If you can install a CLI tool and run a command, you can use these templates. The prompts handle the complexity.',
  },
  {
    q: 'Are templates updated over time?',
    a: 'Yes. The IACOS framework is actively developed. GitHub repo updates include new prompts, improved agent configs, and additional skills. Free products get updates indefinitely.',
  },
  {
    q: 'Can I customize everything?',
    a: 'Everything is plaintext — markdown files, JSON configs, Notion templates. Fork the repo, edit any file, and make it yours. No vendor lock-in, no proprietary formats.',
  },
  {
    q: 'What\'s included in the free tier?',
    a: 'The Starter Kit includes 5 Claude Code prompts, a Notion deal tracker, and a PDF research guide. It\'s enough to evaluate whether AI-powered research fits your workflow before investing in premium products.',
  },
]

// FAQ structured data for SEO. Content is static from const faqs — no user input, safe for JSON-LD.
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
})

export default function InvestorToolsPage() {
  const products = getByCategory('tools')
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Tools & Templates</h1>
              <p className="text-slate-400">Notion, Obsidian, Claude Code & workspace configs</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Ready-to-use templates for your existing tools. Deal flow CRMs, research vaults,
            and pre-configured AI workspaces. Set up in minutes, customize for your workflow.
          </motion.p>
        </div>
      </section>

      {/* Your AI Research Stack */}
      <section className="border-y border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">The Stack</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Your AI Research Stack</h2>
            <p className="mx-auto mt-2 max-w-lg text-slate-400">Four tools that work together to give you institutional-grade research on an individual budget.</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stackTools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border ${tool.color.split(' ')[2]} bg-white/[0.02] p-5 text-center`}
                >
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${tool.color.split(' ').slice(0, 2).join(' ')}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-white">{tool.name}</h3>
                  <p className={`text-xs font-medium ${tool.color.split(' ')[0]}`}>{tool.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{tool.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">By Category</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What&apos;s Available</h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-3">
            {quickStartCategories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border ${cat.color} bg-white/[0.02] p-5`}
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${cat.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 font-bold text-white">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Free Starter Kit Showcase */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 bg-emerald-500/10 blur-3xl" aria-hidden />
            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Free</span>
                  <h3 className="mt-1 text-xl font-bold text-white">Investor Intelligence Starter Kit</h3>
                </div>
              </div>

              <p className="mb-6 text-slate-400">
                Everything you need to evaluate AI-powered investment research. No credit card. No commitment. Just results.
              </p>

              <ul className="mb-6 space-y-2">
                {starterKitFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="https://github.com/frankxai/investor-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Download className="h-4 w-4" />
                Download Free Kit
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Products</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Premium Tools & Templates</h2>
            <p className="mt-2 text-slate-400">Professional-grade templates for serious investors.</p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <InvestorProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <Wrench className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">Tools and templates are being prepared.</p>
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
          <h2 className="mb-4 text-2xl font-bold text-white">Ready for AI-Powered Research?</h2>
          <p className="mb-6 text-slate-400">Level up with autonomous agents that handle due diligence and market research for you.</p>
          <Link
            href="/investor/agents"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Browse Agent Packs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
