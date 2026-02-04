'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Building2,
  Cpu,
  Newspaper,
  ArrowRight,
  ExternalLink,
  BookOpen,
  LineChart,
  Users,
  Zap,
  Database,
  Bot,
  Brain,
  Sparkles,
  Calendar,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * AI WORLD - Frank's Global AI Research Hub
 *
 * Frank is a researcher, journalist, and builder documenting the AI revolution.
 * This page covers the REAL global AI landscape - labs, events, trends, industry.
 *
 * NOT mythology. NOT fantasy. Real intelligence, real systems, real impact.
 */

// Major AI Labs & Companies
const aiLabs = [
  {
    name: 'Anthropic',
    focus: 'AI Safety & Claude',
    highlight: 'Claude 4, MCP Protocol',
    color: '#DA7756',
  },
  {
    name: 'OpenAI',
    focus: 'AGI Research',
    highlight: 'GPT-4o, o1, Agents',
    color: '#10A37F',
  },
  {
    name: 'Google DeepMind',
    focus: 'Frontier Research',
    highlight: 'Gemini, AlphaFold',
    color: '#4285F4',
  },
  {
    name: 'Meta AI',
    focus: 'Open Source AI',
    highlight: 'LLaMA, Segment Anything',
    color: '#0668E1',
  },
  {
    name: 'Oracle AI',
    focus: 'Enterprise AI',
    highlight: 'OCI GenAI, Agents',
    color: '#F80000',
  },
  {
    name: 'xAI',
    focus: 'Truth-Seeking AI',
    highlight: 'Grok, Real-time data',
    color: '#000000',
  },
]

// AI Domains Frank researches
const researchDomains = [
  {
    title: 'Agentic Systems',
    description: 'Multi-agent orchestration, autonomous workflows, tool use patterns',
    icon: Bot,
    color: 'from-orange-500 to-red-500',
    articles: 12,
  },
  {
    title: 'Knowledge Architecture',
    description: 'RAG pipelines, vector databases, hybrid search, knowledge graphs',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    articles: 8,
  },
  {
    title: 'Production AI',
    description: 'Observability, deployment, guardrails, enterprise patterns',
    icon: LineChart,
    color: 'from-green-500 to-emerald-500',
    articles: 15,
  },
  {
    title: 'AI Music & Creativity',
    description: 'Suno, generative audio, AI-assisted composition, creative tools',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    articles: 20,
  },
]

// Recent coverage / events
const recentCoverage = [
  {
    title: 'Oracle AI World Amsterdam 2026',
    type: 'Event Coverage',
    date: 'January 2026',
    description: 'Enterprise AI architectures, OCI GenAI agents, and the future of agentic RAG',
    image: '/images/ai-world/insurance-claims-architecture.png',
    href: '/blog/production-llm-agents-oci-part-3-operating-model',
  },
  {
    title: 'Claude Code & MCP Deep Dive',
    type: 'Technical Research',
    date: '2026',
    description: 'Model Context Protocol ecosystem analysis and agentic development patterns',
    image: '/images/ai-world/agentic-rag-architecture.png',
    href: '/research/active/mcp-ecosystem/CLAUDE_CODE_2026',
  },
  {
    title: 'Multi-Agent Framework Comparison',
    type: 'Research',
    date: '2026',
    description: 'LangGraph vs CrewAI vs AutoGen - production patterns that work',
    image: '/images/ai-world/cx-conversation-architecture.png',
    href: '/research/active/multi-agent-patterns/FRAMEWORK_COMPARISON_2026',
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AIWorldPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <header className="relative py-24 px-6 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
              <Globe className="w-4 h-4 text-cyan-400" />
              AI Research & Coverage
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            The{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI World
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Documenting the global AI revolution. From frontier labs to enterprise production.
            Research, analysis, and technical deep dives by an architect who builds what he writes about.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Research Hub
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-colors"
            >
              <Newspaper className="w-5 h-5" />
              Latest Articles
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/* Who is Frank */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                AI Architect. Researcher. Builder.
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                I build enterprise AI systems by day and document what works by night.
                500+ AI-generated songs. Production agentic systems. Technical writing
                that bridges theory and implementation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-cyan-400">500+</div>
                  <div className="text-sm text-slate-400">AI Songs Created</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-slate-400">Technical Articles</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-emerald-400">3+</div>
                  <div className="text-sm text-slate-400">Years in AI</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-amber-400">Oracle</div>
                  <div className="text-sm text-slate-400">AI Architect</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Brain className="w-20 h-20 mx-auto text-cyan-400/50 mb-4" />
                  <p className="text-slate-400 text-sm">
                    Systems thinking meets creative exploration
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Labs Landscape */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              The AI Lab Landscape
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tracking the organizations pushing the frontier of artificial intelligence
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiLabs.map((lab, i) => (
              <motion.div
                key={lab.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {lab.name}
                    </h3>
                    <p className="text-sm text-slate-500">{lab.focus}</p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lab.color }}
                  />
                </div>
                <p className="text-sm text-slate-400">{lab.highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Domains */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Research Domains
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deep technical coverage across the AI stack
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchDomains.map((domain, i) => {
              const Icon = domain.icon
              return (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${domain.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {domain.title}
                        </h3>
                        <span className="text-xs text-slate-500">
                          {domain.articles} articles
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Coverage */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Recent Coverage
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Events, research, and technical deep dives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentCoverage.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={item.href}
                  className="block rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-medium">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What I Cover */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              What I Cover
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {[
              { icon: Building2, label: 'Enterprise AI Architecture', desc: 'Production patterns that scale' },
              { icon: Bot, label: 'Agentic Systems', desc: 'Multi-agent orchestration & tool use' },
              { icon: Cpu, label: 'AI Infrastructure', desc: 'Vector DBs, RAG, deployment' },
              { icon: Sparkles, label: 'Creative AI', desc: 'Music generation, generative tools' },
              { icon: Users, label: 'AI Events & Conferences', desc: 'Oracle AI World, industry events' },
              { icon: Zap, label: 'Frontier Research', desc: 'Latest from major AI labs' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-400 mb-8">
              Subscribe to get the latest AI research, technical deep dives, and industry analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <BookOpen className="w-5 h-5" />
                Explore Research
              </Link>
              <Link
                href="https://linkedin.com/in/frankvandenbergh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Follow on LinkedIn
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
