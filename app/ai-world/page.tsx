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
  Sparkles,
  Calendar,
  Music,
  TrendingUp,
  Shield,
  Layers,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * AI WORLD - Frank's Global AI Research Hub
 *
 * Frank is a researcher, journalist, and builder documenting the AI revolution.
 * This page covers the REAL global AI landscape - labs, events, trends, industry.
 *
 * Sections: Hero > About > AI Labs > Research Domains > Recent Coverage > Topics > CTA
 */

// Major AI Labs & Companies tracking the frontier
const aiLabs = [
  {
    name: 'Anthropic',
    focus: 'AI Safety & Claude',
    highlight: 'Claude 4, MCP Protocol, Computer Use',
    color: '#DA7756',
  },
  {
    name: 'OpenAI',
    focus: 'AGI Research',
    highlight: 'GPT-4o, o1 Reasoning, Agents SDK',
    color: '#10A37F',
  },
  {
    name: 'Google DeepMind',
    focus: 'Frontier Research',
    highlight: 'Gemini 2, AlphaFold, Veo',
    color: '#4285F4',
  },
  {
    name: 'Meta AI',
    focus: 'Open Source AI',
    highlight: 'LLaMA 4, Open Weights, SAM',
    color: '#0668E1',
  },
  {
    name: 'Mistral AI',
    focus: 'European AI Lab',
    highlight: 'Mixtral, Le Chat, Open Models',
    color: '#FF7000',
  },
  {
    name: 'Oracle AI',
    focus: 'Enterprise AI',
    highlight: 'OCI GenAI, Agent Services',
    color: '#F80000',
  },
]

// AI Domains Frank researches
const researchDomains = [
  {
    title: 'Agentic Systems',
    description: 'Multi-agent orchestration, autonomous workflows, MCP tool use, and agent evaluation patterns',
    icon: Bot,
    color: 'from-orange-500 to-red-500',
    articles: 12,
    href: '/blog',
  },
  {
    title: 'Knowledge Architecture',
    description: 'RAG pipelines, vector databases, hybrid search, knowledge graphs, and retrieval patterns',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    articles: 8,
    href: '/blog',
  },
  {
    title: 'Production AI Systems',
    description: 'Observability, deployment patterns, guardrails, security, and enterprise-grade operations',
    icon: LineChart,
    color: 'from-green-500 to-emerald-500',
    articles: 15,
    href: '/blog/production-llm-agents-oci-part-1-architecture',
  },
  {
    title: 'AI Music & Creativity',
    description: 'Suno AI mastery, generative audio production, creative AI tools, and 500+ songs',
    icon: Music,
    color: 'from-purple-500 to-pink-500',
    articles: 20,
    href: '/blog/suno-prompt-engineering-complete-guide',
  },
]

// Recent coverage / events with real articles
const recentCoverage = [
  {
    title: 'Production LLM Agents on OCI',
    type: 'Technical Series',
    date: 'January 2026',
    description: 'Three-part deep dive into building enterprise-grade LLM agent systems on Oracle Cloud Infrastructure',
    image: '/images/ai-world/insurance-claims-architecture.png',
    href: '/blog/production-llm-agents-oci-part-3-operating-model',
  },
  {
    title: 'Suno AI Music Production',
    type: 'Creative AI',
    date: '2026',
    description: 'Complete workflow for AI music production: prompt engineering, genre mastery, and commercial distribution',
    image: '/images/ai-world/agentic-rag-architecture.png',
    href: '/blog/suno-music-production-workflow',
  },
  {
    title: 'Agentic Creator OS',
    type: 'Product',
    date: '2026',
    description: 'Building an operating system for AI-native creators with multi-agent orchestration',
    image: '/images/ai-world/cx-conversation-architecture.png',
    href: '/blog/agentic-creator-os-complete-guide',
  },
]

// Key trends Frank tracks
const keyTrends = [
  { icon: Bot, label: 'Agentic AI', desc: 'Autonomous multi-agent systems' },
  { icon: Shield, label: 'AI Safety & Alignment', desc: 'Responsible deployment patterns' },
  { icon: Layers, label: 'MCP & Tool Use', desc: 'Model Context Protocol ecosystem' },
  { icon: TrendingUp, label: 'AI-Native Products', desc: 'Products built on intelligence' },
  { icon: Building2, label: 'Enterprise AI', desc: 'Production patterns that scale' },
  { icon: Sparkles, label: 'Creative AI', desc: 'Generative music, art, and design' },
  { icon: Cpu, label: 'AI Infrastructure', desc: 'Vector DBs, RAG, orchestration' },
  { icon: Users, label: 'AI Events', desc: 'Industry conferences and coverage' },
]

// Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AIWorldPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <header className="relative pt-20 pb-24 px-6 overflow-hidden">
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
              Research & Technical Coverage
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            The{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI World
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Documenting the global AI revolution. From frontier labs to enterprise production.
            Research, analysis, and technical deep dives by an architect who builds what he writes about.
          </motion.p>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-[21/9] max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10"
          >
            <Image
              src="/images/ai-world/intelligence-atlas-hero.png"
              alt="The AI World - Global intelligence landscape visualization"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-10"
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

      {/* About Section */}
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
                I design enterprise AI systems at Oracle and document what works through
                hands-on research. 500+ AI-generated songs. Production agentic systems.
                Technical writing that bridges the gap between theory and real-world implementation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '500+', label: 'AI Songs Created', color: 'text-cyan-400' },
                  { value: '50+', label: 'Technical Articles', color: 'text-purple-400' },
                  { value: 'Oracle', label: 'AI Architect', color: 'text-amber-400' },
                  { value: '2026', label: 'Active Research', color: 'text-emerald-400' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual - Architecture diagram preview */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/ai-world/agentic-rag-architecture.png"
                alt="AI Architecture - Agentic RAG system diagram"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm text-slate-300 font-medium">
                  Systems thinking meets creative exploration
                </p>
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
              Tracking the organizations shaping the future of artificial intelligence
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
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
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
              Deep technical coverage across the full AI stack
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
                >
                  <Link
                    href={domain.href}
                    className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${domain.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
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
                  </Link>
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
              Technical deep dives, event coverage, and research
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
                  className="block rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all group h-full"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-medium backdrop-blur-sm">
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
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Trends / What I Cover */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              What I Cover
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Key trends and domains across the AI landscape
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyTrends.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-cyan-400 mb-3" />
                  <div className="font-medium text-white text-sm">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </motion.div>
              )
            })}
          </div>
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
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Follow the research, technical deep dives, and industry analysis
              as I document the AI revolution from the inside.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <BookOpen className="w-5 h-5" />
                Read the Blog
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
