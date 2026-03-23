import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  BookOpen,
  Zap,
  Users,
  GitBranch,
  Puzzle,
  ArrowRight,
  Terminal,
  Sparkles,
  Layers
} from 'lucide-react'

/**
 * Agentic Creator OS Documentation Index
 *
 * SEO Optimizations:
 * - Targeted keywords for Claude Code, AI skills, creator tools
 * - FAQ schema for rich snippets
 * - Internal links to all doc sections
 * - Semantic HTML structure
 */

export const metadata: Metadata = {
  title: 'Documentation | Agentic Creator OS | FrankX.ai',
  description: 'Complete documentation for Agentic Creator OS - the operating system for Golden Age Creators. Learn how to use 62 skills, 9 agents, and orchestrated workflows with Claude Code.',
  keywords: [
    'agentic creator os documentation',
    'claude code skills',
    'ai agent system',
    'mcp servers guide',
    'creator workflows',
    'ai assistant customization',
    'personal jarvis',
    'claude code tutorial'
  ],
  openGraph: {
    title: 'Agentic Creator OS Documentation',
    description: 'Complete guide to building your personal AI operating system with 62 skills, 9 agents, and MCP integrations.',
    url: 'https://frankx.ai/products/agentic-creator-os/docs',
    type: 'website'
  },
  alternates: {
    canonical: 'https://frankx.ai/products/agentic-creator-os/docs'
  }
}

const docSections = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    icon: Zap,
    description: 'Install Agentic Creator OS and run your first skill in minutes.',
    topics: ['Installation', 'Quick Start', 'Configuration', 'First Steps']
  },
  {
    title: 'Skills Guide',
    slug: 'skills',
    icon: BookOpen,
    description: 'Deep dive into the 62 skills that power your creative workflows.',
    topics: ['Skill Categories', 'Auto-Activation', 'Creating Skills', 'Best Practices']
  },
  {
    title: 'Agents Guide',
    slug: 'agents',
    icon: Users,
    description: 'Understand the multi-agent architecture and specialist personas.',
    topics: ['Specialist Agents', 'Department Teams', 'Weighted Synthesis', 'Custom Agents']
  },
  {
    title: 'Workflows',
    slug: 'workflows',
    icon: GitBranch,
    description: 'Build orchestrated pipelines that coordinate skills and agents.',
    topics: ['Pipeline Pattern', 'Parallel Dispatch', 'Iterative Loops', 'Custom Workflows']
  },
  {
    title: 'MCP Integration',
    slug: 'mcp',
    icon: Puzzle,
    description: 'Connect external tools via Model Context Protocol servers.',
    topics: ['Browser Server', 'Memory Server', 'Custom Servers', 'Security']
  }
]

const quickStats = [
  { value: '62', label: 'Skills', icon: Layers },
  { value: '9', label: 'Agents', icon: Users },
  { value: '8', label: 'Workflows', icon: GitBranch },
  { value: '6+', label: 'MCP Servers', icon: Puzzle }
]

const faqs = [
  {
    question: 'What is Agentic Creator OS?',
    answer: 'Agentic Creator OS is a superintelligent operating system for generative creators. It combines 62 specialized skills, 9 intelligent agents, orchestrated workflows, and MCP integrations into one cohesive system that works with Claude Code.'
  },
  {
    question: 'Do I need to know how to code to use it?',
    answer: 'No coding required for basic usage. Skills and workflows activate automatically based on context. Developers can extend the system with custom skills and MCP servers.'
  },
  {
    question: 'How does it work with Claude Code?',
    answer: 'Agentic Creator OS installs skill files that Claude Code reads automatically. When you describe a task, relevant skills activate and provide Claude with specialized knowledge for that domain.'
  },
  {
    question: 'Can I create my own skills?',
    answer: 'Yes! Use the included skill template to create custom skills for your specific workflows. Skills follow a simple markdown format with YAML frontmatter for triggers.'
  },
  {
    question: 'What MCP servers are included?',
    answer: 'The system includes Browser (Playwright automation), Memory (knowledge persistence), Sequential Thinking (structured reasoning), and custom servers for social media, database, and email.'
  }
]

// FAQ Schema for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

// TechArticle schema for documentation
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Agentic Creator OS Documentation',
  description: 'Complete documentation for the AI operating system for Golden Age Creators',
  author: {
    '@type': 'Person',
    name: 'Frank X. Riemer',
    url: 'https://frankx.ai'
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX.ai',
    url: 'https://frankx.ai'
  },
  datePublished: '2026-01-21',
  dateModified: '2026-01-21',
  about: {
    '@type': 'SoftwareApplication',
    name: 'Agentic Creator OS',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform'
  }
}

export default function DocsIndexPage() {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-tech-primary/20 text-tech-primary text-xs font-semibold uppercase tracking-wider">
            Documentation
          </span>
          <span className="text-slate-500 text-sm">v3.0.0</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Agentic Creator OS
          <span className="block text-tech-primary">Documentation</span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl">
          Everything you need to build your personal AI operating system.
          62 skills, 9 agents, orchestrated workflows, and MCP integrations.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-space/80 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-tech-primary" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-sm text-slate-400">{stat.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Install */}
      <div className="not-prose mb-12 p-6 rounded-2xl bg-gradient-to-br from-tech-primary/10 to-cyan-500/10 border border-tech-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-5 h-5 text-tech-primary" />
          <h2 className="text-lg font-semibold text-white">Quick Install</h2>
        </div>
        <div className="bg-void/50 rounded-lg p-4 font-mono text-sm">
          <code className="text-tech-primary">npm install -g @frankx/agentic-creator-os && acos install</code>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          Or clone from{' '}
          <a
            href="https://github.com/frankxai/agentic-creator-os"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tech-primary hover:underline"
          >
            GitHub
          </a>
          {' '}and run <code className="text-tech-primary">./install.sh</code>
        </p>
      </div>

      {/* Documentation Sections */}
      <div className="not-prose mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Documentation Guides</h2>
        <div className="grid gap-4">
          {docSections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.slug}
                href={`/products/agentic-creator-os/docs/${section.slug}`}
                className="group p-6 rounded-2xl bg-space/80 backdrop-blur-xl border border-white/10 hover:border-tech-primary/30 hover:bg-tech-primary/5 transition-all duration-250"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-tech-primary/20 text-tech-primary group-hover:bg-tech-primary group-hover:text-void transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-tech-primary transition-colors flex items-center gap-2">
                      {section.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-slate-400 mt-1">{section.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {section.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="not-prose mb-12 p-8 rounded-2xl bg-gradient-to-br from-space via-space to-tech-primary/5 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-tech-primary" />
          <h2 className="text-2xl font-bold text-white">Philosophy</h2>
        </div>
        <blockquote className="text-xl text-slate-300 italic border-l-4 border-tech-primary pl-6">
          &ldquo;Technology that amplifies creative expression, not replaces it.&rdquo;
        </blockquote>
        <p className="mt-4 text-slate-400">
          Agentic Creator OS exists to help creators produce more without burning out,
          maintain authentic voice at scale, leverage AI as a creative partner, and
          build sustainable creative businesses.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="not-prose mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl bg-space/80 backdrop-blur-xl border border-white/10 overflow-hidden"
            >
              <summary className="p-6 cursor-pointer text-lg font-semibold text-white hover:text-tech-primary transition-colors list-none flex items-center justify-between">
                {faq.question}
                <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-slate-300">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="not-prose p-8 rounded-2xl bg-gradient-to-r from-tech-primary/20 to-cyan-500/20 border border-tech-primary/30 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to Build Your Personal Jarvis?</h2>
        <p className="text-slate-300 mb-6">
          Get started with Agentic Creator OS and transform your creative workflow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products/agentic-creator-os/docs/getting-started"
            className="px-6 py-3 rounded-xl bg-tech-primary hover:bg-tech-light text-void font-semibold transition-colors"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/frankxai/agentic-creator-os"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>
    </div>
  )
}
