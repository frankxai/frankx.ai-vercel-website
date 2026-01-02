'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Folder,
  Search,
  Brain,
  Code,
  Palette,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Music,
  Sparkles,
  BookOpen,
  Lightbulb,
  Target,
  Zap,
  GraduationCap,
  Wrench,
  Heart,
  ChevronRight,
} from 'lucide-react'

// Premium background
function ResourcesBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-60 top-1/2 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 right-1/3 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

// Quick navigation
const quickNav = [
  {
    title: 'Prompt Library',
    description: '22 battle-tested prompts',
    href: '/prompt-library',
    icon: Sparkles,
    color: 'violet',
  },
  {
    title: 'Music Lab',
    description: 'AI music creation guide',
    href: '/music-lab',
    icon: Music,
    color: 'emerald',
  },
  {
    title: 'Learning Paths',
    description: 'Curated courses',
    href: '/students',
    icon: BookOpen,
    color: 'cyan',
  },
]

// AI Tools
const aiTools = [
  {
    name: 'Claude',
    description: 'Constitutional AI for complex reasoning and creative work.',
    url: 'https://claude.ai',
    note: 'My primary AI collaborator for everything.',
  },
  {
    name: 'Suno AI',
    description: 'AI music generation. Create full songs from text prompts.',
    url: 'https://suno.ai',
    note: 'How I created 10K+ songs.',
  },
  {
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI. Great for quick questions.',
    url: 'https://chat.openai.com',
    note: 'Useful for specific tasks and comparison.',
  },
  {
    name: 'Midjourney',
    description: 'AI image generation with distinctive artistic style.',
    url: 'https://midjourney.com',
    note: 'For visual concepts and artwork.',
  },
  {
    name: 'Perplexity',
    description: 'AI-powered search with citations and sources.',
    url: 'https://perplexity.ai',
    note: 'Research assistant that shows its work.',
  },
  {
    name: 'Cursor',
    description: 'AI-first code editor built on VSCode.',
    url: 'https://cursor.com',
    note: 'Incredible for code generation and refactoring.',
  },
]

// Development Tools
const devTools = [
  {
    name: 'Vercel',
    description: 'Frontend cloud platform optimized for Next.js.',
    url: 'https://vercel.com',
    note: 'This site runs on it. Zero-config deploys.',
  },
  {
    name: 'Railway',
    description: 'Infrastructure platform for rapid deployment.',
    url: 'https://railway.app',
    note: 'Go-to for backend services and databases.',
  },
  {
    name: 'Supabase',
    description: 'Open source Firebase alternative with PostgreSQL.',
    url: 'https://supabase.com',
    note: 'Auth, database, storage—all in one.',
  },
  {
    name: 'GitHub',
    description: 'Code hosting and collaboration platform.',
    url: 'https://github.com',
    note: 'Where all my code lives.',
  },
  {
    name: 'Linear',
    description: 'Modern project management for software teams.',
    url: 'https://linear.app',
    note: 'Clean, fast, keyboard-first.',
  },
  {
    name: 'Notion',
    description: 'All-in-one workspace for docs, wikis, projects.',
    url: 'https://notion.so',
    note: 'Second brain and documentation home.',
  },
]

// Learning Resources
const learningResources = [
  {
    name: 'Oracle AI Foundations',
    source: 'Oracle',
    type: 'Certification',
    description: 'Free certification covering AI fundamentals, ML concepts, and Oracle\'s AI services.',
    url: 'https://education.oracle.com/oracle-ai-foundations/pexam_1Z0-1122-1',
    difficulty: 'Beginner',
  },
  {
    name: 'Google AI Essentials',
    source: 'Coursera',
    type: 'Course',
    description: 'Learn how to use generative AI tools for work. Practical, hands-on approach.',
    url: 'https://www.coursera.org/learn/google-ai-essentials',
    difficulty: 'Beginner',
  },
  {
    name: 'Machine Learning Crash Course',
    source: 'Google',
    type: 'Course',
    description: 'Fast-paced introduction to ML. Covers TensorFlow basics and practical applications.',
    url: 'https://developers.google.com/machine-learning/crash-course',
    difficulty: 'Intermediate',
  },
  {
    name: 'Introduction to Deep Learning',
    source: 'MIT',
    type: 'Course',
    description: 'MIT\'s official deep learning course. Theory meets implementation.',
    url: 'http://introtodeeplearning.com/',
    difficulty: 'Advanced',
  },
  {
    name: 'Prompt Engineering Guide',
    source: 'DAIR.AI',
    type: 'Guide',
    description: 'Comprehensive guide to prompt engineering techniques and best practices.',
    url: 'https://www.promptingguide.ai/',
    difficulty: 'Beginner',
  },
  {
    name: 'RAG from Scratch',
    source: 'LangChain',
    type: 'Course',
    description: 'Build Retrieval Augmented Generation systems from first principles.',
    url: 'https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x',
    difficulty: 'Intermediate',
  },
]

// Principles / Philosophy
const principles = [
  {
    icon: Target,
    title: 'Goal-Aligned AI',
    description: 'AI should amplify your unique voice and serve your goals. Every workflow starts with clarity about what you\'re actually trying to achieve.',
  },
  {
    icon: Zap,
    title: 'Practical Over Hype',
    description: 'Tools you can use today, not promises about tomorrow. No jargon, no gatekeeping—just resources that help you ship.',
  },
  {
    icon: Heart,
    title: 'Open Development',
    description: 'Everything transparent, everything documented. See how it\'s built, adapt it for your needs. Knowledge grows when shared.',
  },
  {
    icon: Lightbulb,
    title: 'Systems Thinking',
    description: 'Individual tools matter less than how they work together. Build workflows, not just tool collections.',
  },
]

const colorMap = {
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const allTools = [...aiTools, ...devTools]
  const filteredTools = searchQuery
    ? allTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null

  return (
    <>
      <ResourcesBackground />
      <main id="main" className="relative min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-violet-400/70">
                Resources
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Tools, courses, and systems.
              <span className="block font-serif-italic text-white/70 mt-2">
                No filler.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              A curated collection of what actually powers my work—from AI tools
              and dev platforms to courses and frameworks. Everything I genuinely use.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 max-w-md"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search tools, courses, resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none focus:ring-0"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search Results (when searching) */}
        {filteredTools && (
          <section className="py-8">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-lg font-medium text-white mb-6">
                {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''} for "{searchQuery}"
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-white">{tool.name}</h3>
                      <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-white" />
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{tool.description}</p>
                    <p className="text-xs text-emerald-400/80">{tool.note}</p>
                  </a>
                ))}
              </div>
              {filteredTools.length === 0 && (
                <p className="text-slate-500 py-8 text-center">No resources found.</p>
              )}
            </div>
          </section>
        )}

        {/* Regular Content (when not searching) */}
        {!filteredTools && (
          <>
            {/* Quick Navigation */}
            <section className="py-8">
              <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {quickNav.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <motion.div
                        key={link.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-0.5"
                        >
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[link.color as keyof typeof colorMap]}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{link.title}</h3>
                            <p className="text-sm text-slate-500">{link.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16">
              <div className="mx-auto max-w-6xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-3">
                    Philosophy
                  </p>
                  <h2 className="text-3xl font-bold text-white">How I approach tools.</h2>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2">
                  {principles.map((principle, index) => {
                    const Icon = principle.icon
                    return (
                      <motion.div
                        key={principle.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-emerald-400 flex-shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white mb-2">{principle.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{principle.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* AI Tools Section */}
            <section className="py-16 border-t border-white/5">
              <div className="mx-auto max-w-6xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400/80">
                      AI Tools
                    </p>
                  </div>
                  <h2 className="text-3xl font-bold text-white">AI that I use daily.</h2>
                  <p className="mt-3 text-slate-400 max-w-2xl">
                    The AI tools that power my creative and technical work. Each one
                    earns its place by solving real problems.
                  </p>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {aiTools.map((tool, index) => (
                    <motion.a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group block rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 transition-all hover:border-violet-500/40 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                        <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-white" />
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{tool.description}</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-300">{tool.note}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            {/* Development Tools Section */}
            <section className="py-16 border-t border-white/5">
              <div className="mx-auto max-w-6xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Code className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400/80">
                      Development
                    </p>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Build and ship tools.</h2>
                  <p className="mt-3 text-slate-400 max-w-2xl">
                    The platforms and services that run my projects. Focused on developer
                    experience and getting things done quickly.
                  </p>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {devTools.map((tool, index) => (
                    <motion.a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group block rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 transition-all hover:border-cyan-500/40 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                        <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-white" />
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{tool.description}</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-300">{tool.note}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            {/* Learning Resources Section */}
            <section className="py-16 border-t border-white/5">
              <div className="mx-auto max-w-6xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-400/80">
                      Learning
                    </p>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Courses that matter.</h2>
                  <p className="mt-3 text-slate-400 max-w-2xl">
                    Hand-picked courses from top institutions. Free or worth every penny.
                    These are what I actually recommend.
                  </p>
                </motion.div>

                <div className="space-y-4">
                  {learningResources.map((resource, index) => (
                    <motion.a
                      key={resource.name}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 transition-all hover:border-amber-500/40"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-medium uppercase tracking-wider text-amber-400/80">
                            {resource.type}
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs text-slate-500">{resource.source}</span>
                          <span className="text-slate-600">·</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            resource.difficulty === 'Beginner'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : resource.difficulty === 'Intermediate'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {resource.difficulty}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {resource.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">{resource.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 group-hover:text-white transition-colors">
                        <span className="text-sm">Start learning</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <Link
                    href="/students"
                    className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors"
                  >
                    View all learning paths
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 pb-24">
              <div className="mx-auto max-w-6xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 p-10 backdrop-blur-xl"
                >
                  {/* Decorative gradient */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl" />

                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="max-w-xl">
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Missing something?
                      </h2>
                      <p className="mt-3 text-slate-400">
                        Check out the prompt library for AI-specific workflows, or the blog
                        for deeper dives on how I use these tools together.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/prompt-library"
                        className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
                      >
                        Prompt Library
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href="/blog"
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 transition-all"
                      >
                        Read the Blog
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  )
}
