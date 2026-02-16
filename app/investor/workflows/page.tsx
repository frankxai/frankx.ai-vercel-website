'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Workflow,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  BarChart3,
  DatabaseZap,
  Bell,
  FileText,
  Clock,
  Zap,
  Eye,
  Github,
} from 'lucide-react'

import { getByCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

const pipelineSteps = [
  { icon: Search, label: 'Source Monitoring', desc: 'RSS feeds, startup databases, news', color: 'text-cyan-400 bg-cyan-500/15' },
  { icon: Filter, label: 'Screening', desc: 'Stage, sector, geography filters', color: 'text-violet-400 bg-violet-500/15' },
  { icon: Sparkles, label: 'AI Enrichment', desc: 'Claude analysis of each deal', color: 'text-fuchsia-400 bg-fuchsia-500/15' },
  { icon: BarChart3, label: 'Scoring', desc: 'Investment thesis match score', color: 'text-amber-400 bg-amber-500/15' },
  { icon: DatabaseZap, label: 'CRM Sync', desc: 'Auto-push to Notion or Airtable', color: 'text-emerald-400 bg-emerald-500/15' },
  { icon: Bell, label: 'Notification', desc: 'Slack/email for high-score deals', color: 'text-rose-400 bg-rose-500/15' },
  { icon: FileText, label: 'Digest', desc: 'Weekly pipeline summary report', color: 'text-sky-400 bg-sky-500/15' },
]

const integrations = [
  { name: 'n8n', desc: 'Visual workflow automation engine. Self-hosted or cloud.', icon: Workflow, color: 'text-orange-400 bg-orange-500/15' },
  { name: 'Notion', desc: 'Deal CRM, pipeline views, and portfolio tracking.', icon: DatabaseZap, color: 'text-slate-300 bg-white/10' },
  { name: 'Slack', desc: 'Real-time alerts for high-score deals and pipeline events.', icon: Bell, color: 'text-purple-400 bg-purple-500/15' },
  { name: 'Claude', desc: 'AI analysis, enrichment, and narrative generation.', icon: Sparkles, color: 'text-cyan-400 bg-cyan-500/15' },
  { name: 'Email', desc: 'Automated digests, LP reports, and alert notifications.', icon: FileText, color: 'text-blue-400 bg-blue-500/15' },
  { name: 'Airtable', desc: 'Alternative CRM backend for teams preferring spreadsheets.', icon: BarChart3, color: 'text-green-400 bg-green-500/15' },
]

const metrics = [
  { value: '15+', label: 'Hours saved per week', icon: Clock },
  { value: '100+', label: 'Sources monitored', icon: Eye },
  { value: '<3 min', label: 'Deal scoring time', icon: Zap },
]

const faqs = [
  {
    q: 'Do I need to know how to code?',
    a: 'No. n8n is a visual workflow builder — you connect nodes by dragging lines. Our templates come pre-built with setup guides. If you can use Notion, you can use these workflows.',
  },
  {
    q: 'n8n self-hosted or cloud?',
    a: 'Either works. Self-hosted (Docker) gives you full control and is free. n8n Cloud ($20/mo) gives you managed hosting and automatic updates. Our templates work on both.',
  },
  {
    q: 'Is Notion required?',
    a: 'Notion is the default CRM, but templates include Airtable alternatives. You can also adapt them to other tools via n8n\'s 400+ integrations.',
  },
  {
    q: 'Can I add custom data sources?',
    a: 'Yes. Each workflow has a "sources" node you can extend. Add RSS feeds, API endpoints, or webhook triggers for any data source n8n supports.',
  },
  {
    q: 'What support is included?',
    a: 'Every template includes a setup guide with screenshots. The n8n community Discord is active for troubleshooting. Premium products include email support.',
  },
]

// Safe: all FAQ data is hardcoded static content from const above, no user input
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
})

export default function InvestorWorkflowsPage() {
  const products = getByCategory('workflows')
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <Workflow className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Workflow Templates</h1>
              <p className="text-slate-400">n8n automation pipelines for investors</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Ready-to-import n8n workflows that automate deal sourcing, competitive monitoring,
            sentiment analysis, and pipeline management. Connect to Notion, Slack, and email
            with zero coding required.
          </motion.p>
        </div>
      </section>

      {/* Pipeline Visualization */}
      <section className="border-y border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">End-to-End Pipeline</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">From Source to Decision</h2>
            <p className="mx-auto mt-2 max-w-lg text-slate-400">Every stage is automated. Deals flow from discovery to your CRM without manual work.</p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {pipelineSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                >
                  <div className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${step.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <p className="text-xs font-semibold text-white">{step.label}</p>
                  <p className="mt-1 text-[10px] leading-tight text-slate-500">{step.desc}</p>
                  {i < pipelineSteps.length - 1 && (
                    <ArrowRight className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-700 lg:block" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Automation Metrics */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{m.value}</p>
                    <p className="text-sm text-slate-400">{m.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Integration Grid */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Integrations</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Connects to Your Stack</h2>
            <p className="mt-2 text-slate-400">Every workflow plugs into the tools you already use.</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((intg, i) => {
              const Icon = intg.icon
              return (
                <motion.div
                  key={intg.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${intg.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{intg.name}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{intg.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Products</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Workflow Templates</h2>
            <p className="mt-2 text-slate-400">Import, configure, and run. Each template includes a setup guide.</p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <InvestorProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <Workflow className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">Workflow templates are being prepared.</p>
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
          <h2 className="mb-4 text-2xl font-bold text-white">Want the Full Architecture?</h2>
          <p className="mb-6 text-slate-400">See our complete intelligence system blueprints for institutional-grade infrastructure.</p>
          <Link
            href="/investor/architectures"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            View Architectures
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
