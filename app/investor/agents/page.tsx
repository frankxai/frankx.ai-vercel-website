'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Search,
  FileText,
  BarChart3,
  TrendingUp,
  Eye,
  Palette,
  Network,
  Building2,
  User,
  Briefcase,
  Sparkles,
  Github,
} from 'lucide-react'

import { getByCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

const agents = [
  {
    name: 'Research Analyst',
    icon: Search,
    color: 'cyan',
    specialty: 'Market research & sector analysis',
    capabilities: [
      'Competitive landscape mapping',
      'TAM/SAM/SOM estimation',
      'Sector trend identification',
      'Source validation (5-level hierarchy)',
    ],
    tools: ['Claude Code', 'Web Search', 'Memory'],
  },
  {
    name: 'Due Diligence Lead',
    icon: FileText,
    color: 'violet',
    specialty: 'Company analysis & risk assessment',
    capabilities: [
      'Team background verification',
      'Financial health assessment',
      'Red flag identification',
      '15-page structured DD report',
    ],
    tools: ['Claude Code', 'Sequential Thinking', 'Memory'],
  },
  {
    name: 'Financial Modeler',
    icon: BarChart3,
    color: 'emerald',
    specialty: 'Revenue modeling & valuation',
    capabilities: [
      'Revenue model analysis',
      'Burn rate & runway calculation',
      'Comparable company valuation',
      'Scenario modeling (bear/base/bull)',
    ],
    tools: ['Claude Code', 'Calculator', 'Memory'],
  },
  {
    name: 'Portfolio Analyst',
    icon: TrendingUp,
    color: 'amber',
    specialty: 'Portfolio tracking & performance',
    capabilities: [
      'Portfolio performance attribution',
      'Risk exposure analysis',
      'Quarterly report generation',
      'LP communication drafting',
    ],
    tools: ['Claude Code', 'Memory', 'Notion'],
  },
  {
    name: 'Deal Flow Manager',
    icon: Network,
    color: 'rose',
    specialty: 'Pipeline orchestration & scoring',
    capabilities: [
      'Deal scoring algorithm',
      'Investment thesis matching',
      'Pipeline stage management',
      'Team notification routing',
    ],
    tools: ['n8n', 'Claude Code', 'Slack'],
  },
  {
    name: 'Visual Strategist',
    icon: Palette,
    color: 'fuchsia',
    specialty: 'Data visualization & reporting',
    capabilities: [
      'Competitive landscape diagrams',
      'Market map generation',
      'Investment thesis visualization',
      'Branded report design',
    ],
    tools: ['Nano Banana', 'Claude Code', 'Memory'],
  },
]

const colorClasses: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'bg-cyan-500/20 text-cyan-400', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'bg-violet-500/20 text-violet-400', text: 'text-violet-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'bg-emerald-500/20 text-emerald-400', text: 'text-emerald-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'bg-amber-500/20 text-amber-400', text: 'text-amber-400' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: 'bg-rose-500/20 text-rose-400', text: 'text-rose-400' },
  fuchsia: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', icon: 'bg-fuchsia-500/20 text-fuchsia-400', text: 'text-fuchsia-400' },
}

const steps = [
  { num: '01', title: 'Define Target', desc: 'Enter a company name, ticker symbol, or sector to research.', icon: Search, color: 'text-cyan-400' },
  { num: '02', title: 'Agents Research', desc: '6 specialized agents analyze the target from every angle simultaneously.', icon: Bot, color: 'text-violet-400' },
  { num: '03', title: 'Get Report', desc: 'Receive a structured report synced to Notion with actionable insights.', icon: FileText, color: 'text-emerald-400' },
]

const useCases = [
  {
    icon: Building2,
    title: 'VC Due Diligence',
    desc: 'Feed a startup name into the DD Agent Pack and receive a 15-page report covering team, financials, competition, market size, and risk factors. Save 20+ hours per deal.',
    color: 'text-cyan-400 bg-cyan-500/15',
  },
  {
    icon: User,
    title: 'Angel Deal Screening',
    desc: 'Screen inbound deals against your investment thesis. The Research Analyst maps the market while the Financial Modeler validates the business model. Quick pass/fail in minutes.',
    color: 'text-violet-400 bg-violet-500/15',
  },
  {
    icon: Briefcase,
    title: 'Public Market Research',
    desc: 'Drop in a ticker and get fundamental analysis, earnings comparison, sector mapping, and valuation modeling. Like having an equity research team on demand.',
    color: 'text-emerald-400 bg-emerald-500/15',
  },
]

const faqs = [
  {
    q: 'What AI models power the agents?',
    a: 'All agents run on Claude (Anthropic) via Claude Code or Coworker. You use your own API key, so you have full control over costs and data privacy. No data is shared with third parties.',
  },
  {
    q: 'How long does a full DD report take?',
    a: 'A comprehensive due diligence report typically takes 10-15 minutes for the agents to complete. Simple company profiles take 2-3 minutes. The agents work in parallel, so complex multi-company analyses scale efficiently.',
  },
  {
    q: 'Can I customize the agent prompts and skills?',
    a: 'Yes. Every agent is a markdown file you can edit. Skills are modular and can be swapped, extended, or rewritten. The IACOS framework is designed for customization — fork the repo and make it yours.',
  },
  {
    q: 'What data sources do the agents use?',
    a: 'Agents use a 5-level source hierarchy: L1 (SEC filings, annual reports), L2 (industry reports, academic papers), L3 (news, analyst coverage), L4 (company blogs, press releases), L5 (social media, forums). Higher-level sources are always prioritized.',
  },
  {
    q: 'Is my research data private?',
    a: 'Completely. Agents run locally in your Claude Code environment. Research outputs are stored in your local filesystem or your own Notion workspace. Nothing leaves your machine unless you explicitly share it.',
  },
]

// Safe: static FAQ schema from const above, no user input — XSS risk is zero
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
})

export default function InvestorAgentsPage() {
  const products = getByCategory('agents')
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <main className="min-h-screen bg-[#030712]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      {/* Header */}
      <section className="pb-8 pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/investor"
            className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Investor Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">AI Agent Packs</h1>
              <p className="text-slate-400">
                Autonomous research agents for investors
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Pre-built AI agents that handle due diligence, market research, financial modeling,
            and competitive intelligence. Feed in a company name — get structured analysis back.
            Built on the{' '}
            <a
              href="https://github.com/frankxai/investor-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-2 hover:text-cyan-300"
            >
              IACOS framework
            </a>
            .
          </motion.p>
        </div>
      </section>

      {/* How It Works — 3-Step Flow */}
      <section className="border-y border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">How It Works</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Three Steps to Intelligence</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <span className="absolute right-4 top-4 text-5xl font-black text-white/[0.04]">{step.num}</span>
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-600 sm:block" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Agent Profiles */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Meet the Team</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">6 Specialized Agents</h2>
            <p className="mt-2 max-w-xl text-slate-400">
              Each agent has a distinct role, skill set, and tool chain. They work independently or in concert
              through multi-agent orchestration.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, i) => {
              const Icon = agent.icon
              const c = colorClasses[agent.color]
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-5`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.icon}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{agent.name}</h3>
                      <p className={`text-xs ${c.text}`}>{agent.specialty}</p>
                    </div>
                  </div>
                  <ul className="mb-4 space-y-1.5">
                    {agent.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-slate-400">
                        <Sparkles className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${c.text}`} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.tools.map((tool) => (
                      <span key={tool} className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        {tool}
                      </span>
                    ))}
                  </div>
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
              <p className="text-sm text-slate-400">
                All agent definitions are open source. Fork, customize, contribute.
              </p>
            </div>
            <a
              href="https://github.com/frankxai/investor-intelligence/tree/main/iacos/agents"
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Products</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Agent Packs & Prompt Collections</h2>
            <p className="mt-2 text-slate-400">Ready-to-deploy agent configurations for every research need.</p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <InvestorProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
              <Bot className="mx-auto mb-4 h-12 w-12 text-slate-500" />
              <h3 className="mb-2 text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-slate-400">Agent packs are being prepared. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Use Cases</p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Built For Every Investor Type</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {useCases.map((uc, i) => {
              const Icon = uc.icon
              return (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${uc.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{uc.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{uc.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
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
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
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
          <h2 className="mb-4 text-2xl font-bold text-white">Need Automated Pipelines Instead?</h2>
          <p className="mb-6 text-slate-400">
            Check out our n8n workflow templates for end-to-end deal flow automation.
          </p>
          <Link
            href="/investor/workflows"
            className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/20"
          >
            Browse Workflows
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
