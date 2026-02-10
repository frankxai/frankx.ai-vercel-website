'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Code2,
  Terminal,
  Server,
  Cpu,
  Zap,
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Shield,
  Database,
  ChevronRight,
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type Workshop = {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'
  duration: string
  modules: number
  category: 'coding-agents' | 'mcp' | 'enterprise' | 'evolution'
  price: number
  isFree: boolean
  isNew: boolean
  isFeatured: boolean
  href: string
  githubUrl: string
  icon: typeof Code2
  color: string
  gradient: string
  outcomes: string[]
}

type Category = {
  id: string
  label: string
  description: string
}

// ============================================================================
// WORKSHOP DATA
// ============================================================================

const workshops: Workshop[] = [
  {
    id: 'ai-coding-agents',
    title: 'AI Coding Agents Mastery',
    description: 'Master the art of AI-assisted development with Claude Code, OpenCode, Cline, and other top coding agents. From setup to orchestration.',
    level: 'all',
    duration: '2-3 days',
    modules: 6,
    category: 'coding-agents',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: true,
    href: '/workshops/ai-coding-agents',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/ai-coding-agents',
    icon: Terminal,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    outcomes: [
      'Install and configure multiple AI coding agents',
      'Build custom skills, agents, and MCP servers',
      'Create your personal evolution framework',
      'Master multi-agent orchestration patterns',
    ],
  },
  {
    id: 'personal-ai-assistant',
    title: 'Personal AI Assistant Setup',
    description: 'Build your customized AI development environment from scratch. The perfect first workshop for beginners.',
    level: 'beginner',
    duration: '1 day',
    modules: 5,
    category: 'coding-agents',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: true,
    href: '/workshops/personal-ai-assistant-setup',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/personal-ai-assistant-setup',
    icon: Code2,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-500/5',
    outcomes: [
      'Configure Claude Code with optimized settings',
      'Create personalized CLAUDE.md files',
      'Build your first custom skills',
      'Connect MCP servers to your workflow',
    ],
  },
  {
    id: 'mcp-server-mastery',
    title: 'MCP Server Architecture',
    description: 'Build production-grade Model Context Protocol servers for AI-to-data integration. Resources, tools, prompts, and security.',
    level: 'intermediate',
    duration: '1-2 days',
    modules: 4,
    category: 'mcp',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: true,
    href: '/workshops/mcp-server-mastery',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/mcp-server-mastery',
    icon: Server,
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-500/5',
    outcomes: [
      'Understand MCP protocol fundamentals',
      'Build custom MCP servers from scratch',
      'Implement resources, tools, and prompts',
      'Deploy secure, production-ready servers',
    ],
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Mastery',
    description: 'From basic commands to advanced AI orchestration. The 5C Framework for consistently excellent results.',
    level: 'all',
    duration: '2 days',
    modules: 6,
    category: 'evolution',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: true,
    href: '/workshops/prompt-engineering-mastery',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/prompt-engineering-mastery',
    icon: Zap,
    color: 'text-yellow-400',
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    outcomes: [
      'Master the 5C Framework for prompts',
      'Use advanced techniques like Chain-of-Thought',
      'Build a personal prompt template library',
      'Design effective multi-turn conversations',
    ],
  },
  {
    id: 'suno-music-creation',
    title: 'Suno AI Music Creation',
    description: 'Create cinematic soundscapes, meditation music, and motivation anthems with AI. No musical training required.',
    level: 'all',
    duration: '1-2 days',
    modules: 6,
    category: 'evolution',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: true,
    href: '/workshops/suno-music-creation',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/suno-music-creation',
    icon: Cpu,
    color: 'text-pink-400',
    gradient: 'from-pink-500/20 to-pink-500/5',
    outcomes: [
      'Master the 5-Layer Prompt Architecture',
      'Create 528Hz healing soundscapes',
      'Build epic motivation anthems',
      'Produce lo-fi creative flow tracks',
    ],
  },
  {
    id: 'creators-ai-toolkit',
    title: 'Creator\'s AI Toolkit',
    description: 'Complete AI system for content creators. From ideation to publication, automate your creative workflow.',
    level: 'beginner',
    duration: '2 days',
    modules: 6,
    category: 'evolution',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: false,
    href: '/workshops/creators-ai-toolkit',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/creators-ai-toolkit',
    icon: BookOpen,
    color: 'text-orange-400',
    gradient: 'from-orange-500/20 to-orange-500/5',
    outcomes: [
      'Build an AI-powered ideation engine',
      'Create your personal Voice Guide',
      'Automate research and writing',
      'Master content distribution',
    ],
  },
  {
    id: 'oracle-genai-enterprise',
    title: 'Oracle GenAI for Enterprise',
    description: 'When and why to choose Oracle GenAI Services vs public APIs. Dedicated AI Clusters, compliance, and enterprise patterns.',
    level: 'advanced',
    duration: '2 days',
    modules: 5,
    category: 'enterprise',
    price: 0,
    isFree: true,
    isNew: true,
    isFeatured: false,
    href: '/workshops/oracle-genai-enterprise',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/oracle-genai-enterprise',
    icon: Database,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-500/5',
    outcomes: [
      'Compare all major AI providers objectively',
      'Set up OCI GenAI Service and Dedicated Clusters',
      'Implement enterprise RAG patterns',
      'Integrate OCI GenAI with coding agents',
    ],
  },
  {
    id: 'agentic-creator-evolution',
    title: 'Agentic Creator Evolution Path',
    description: 'Progressive journey from AI beginner to master builder. Four levels: Awakening, Building, Mastery, Teaching.',
    level: 'all',
    duration: 'Ongoing',
    modules: 4,
    category: 'evolution',
    price: 0,
    isFree: true,
    isNew: false,
    isFeatured: false,
    href: '/workshops/agentic-creator-evolution',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/agentic-creator-evolution',
    icon: Rocket,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    outcomes: [
      'Progress through structured skill levels',
      'Build portfolio of AI-augmented projects',
      'Join community of agentic creators',
      'Mentor others and advance the field',
    ],
  },
]

const categories: Category[] = [
  { id: 'all', label: 'All Workshops', description: 'View all workshops' },
  { id: 'coding-agents', label: 'Coding Agents', description: 'AI-powered development tools' },
  { id: 'mcp', label: 'MCP Servers', description: 'Model Context Protocol' },
  { id: 'enterprise', label: 'Enterprise', description: 'Enterprise AI solutions' },
  { id: 'evolution', label: 'Evolution', description: 'Progressive learning paths' },
]

// ============================================================================
// COMPONENTS
// ============================================================================

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const Icon = workshop.icon

  return (
    <div
      className="group relative animate-fade-in-up opacity-0 motion-reduce:animate-none"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${workshop.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative h-full rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 transition-all duration-300 group-hover:border-white/20 group-hover:bg-zinc-900/70">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          {workshop.isFree && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Free
            </span>
          )}
          {workshop.isNew && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              New
            </span>
          )}
          {workshop.isFeatured && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Featured
            </span>
          )}
        </div>

        {/* Icon and Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${workshop.gradient} ${workshop.color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {workshop.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workshop.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {workshop.modules} modules
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 mb-4 line-clamp-2">{workshop.description}</p>

        {/* Outcomes */}
        <div className="space-y-2 mb-6">
          {workshop.outcomes.slice(0, 3).map((outcome, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>

        {/* Level Badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              workshop.level === 'beginner'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : workshop.level === 'intermediate'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : workshop.level === 'advanced'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            }`}
          >
            {workshop.level === 'all' ? 'All Levels' : workshop.level.charAt(0).toUpperCase() + workshop.level.slice(1)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={workshop.href}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:from-cyan-400 hover:to-violet-400 transition-all"
          >
            Start Workshop
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={workshop.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: Category[]
  activeCategory: string
  setActiveCategory: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
              : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

function AIProvidersComparison() {
  const providers = [
    { name: 'Anthropic', model: 'Claude', best: 'Coding, Analysis', enterprise: true },
    { name: 'OpenAI', model: 'GPT-4', best: 'General Purpose', enterprise: true },
    { name: 'Meta', model: 'Llama 3', best: 'Self-Hosted', enterprise: true },
    { name: 'Cohere', model: 'Command R+', best: 'RAG, Search', enterprise: true },
    { name: 'Oracle', model: 'GenAI', best: 'Enterprise Security', enterprise: true },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Cpu className="w-5 h-5 text-cyan-400" />
        AI Provider Quick Reference
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 text-zinc-400 font-medium">Provider</th>
              <th className="text-left py-2 text-zinc-400 font-medium">Flagship</th>
              <th className="text-left py-2 text-zinc-400 font-medium">Best For</th>
              <th className="text-left py-2 text-zinc-400 font-medium">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.name} className="border-b border-white/5">
                <td className="py-2 text-white font-medium">{provider.name}</td>
                <td className="py-2 text-zinc-300">{provider.model}</td>
                <td className="py-2 text-zinc-400">{provider.best}</td>
                <td className="py-2">
                  {provider.enterprise ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-zinc-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        See Oracle GenAI workshop for detailed comparison and decision framework.
      </p>
    </div>
  )
}

function EvolutionPath() {
  const levels = [
    { level: 0, name: 'Basic Prompts', desc: 'Simple commands' },
    { level: 1, name: 'CLAUDE.md', desc: 'Project context' },
    { level: 2, name: 'skill.md', desc: 'Domain expertise' },
    { level: 3, name: 'agent.md', desc: 'Agent personas' },
    { level: 4, name: 'Plugins & MCP', desc: 'Extensibility' },
    { level: 5, name: 'Orchestration', desc: 'Multi-agent' },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-emerald-400" />
        The Evolution Framework
      </h3>
      <div className="space-y-2">
        {levels.map((item) => (
          <div key={item.level} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-xs font-bold text-cyan-400 flex items-center justify-center">
              {item.level}
            </span>
            <div className="flex-1">
              <span className="text-white font-medium">{item.name}</span>
              <span className="text-zinc-500 text-sm ml-2">{item.desc}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </div>
        ))}
      </div>
      <Link
        href="/workshops/ai-coding-agents"
        className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
      >
        Learn the full evolution path
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function WorkshopsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredWorkshops = workshops.filter(
    (workshop) => activeCategory === 'all' || workshop.category === activeCategory
  )

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-violet-500/5 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center animate-fade-in-up opacity-0 motion-reduce:animate-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Hands-On Technical Workshops</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Unlock the Power of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                AI Coding Agents
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
              Transform from AI-curious to AI-empowered through production-ready workshops.
              From Claude Code to MCP Servers to Enterprise GenAI.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                All Code Tested
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                40%+ Hands-On
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                GitHub Backed
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Quality Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-zinc-500">
            <span className="text-sm font-medium">Covering:</span>
            <span className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Claude Code
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              OpenCode
            </span>
            <span className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              MCP Servers
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Oracle GenAI
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Enterprise
            </span>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Workshop Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <AIProvidersComparison />
            <EvolutionPath />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Development?</h2>
          <p className="text-zinc-400 mb-8">
            Start with the AI Coding Agents Mastery workshop. Free, comprehensive, and designed to take you from zero to orchestration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/workshops/ai-coding-agents"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:from-cyan-400 hover:to-violet-400 transition-all"
            >
              Start Free Workshop
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/frankx-ai/workshops"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:border-white/20 hover:bg-white/5 transition-all"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
