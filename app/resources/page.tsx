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
  BarChart3,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Music,
  Sparkles,
  BookOpen,
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

// Resource categories
const categories = [
  { id: 'all', label: 'All', icon: Folder },
  { id: 'ai', label: 'AI Tools', icon: Brain },
  { id: 'dev', label: 'Development', icon: Code },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

// Curated resources
const resources = [
  {
    id: 'claude',
    name: 'Claude',
    category: 'ai',
    description: 'Constitutional AI for complex reasoning and creative work. My primary AI collaborator.',
    url: 'https://claude.ai',
    note: 'Powers most of my creative workflows and enterprise architecture.',
    color: 'violet',
  },
  {
    id: 'suno',
    name: 'Suno AI',
    category: 'ai',
    description: 'AI music generation that actually sounds good. Create full songs from text prompts.',
    url: 'https://suno.ai',
    note: 'How I created 500+ songs. Game-changing for creators.',
    color: 'emerald',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'dev',
    description: 'Frontend cloud platform optimized for Next.js. This site runs on it.',
    url: 'https://vercel.com',
    note: 'Zero-config deployments and edge computing.',
    color: 'cyan',
  },
  {
    id: 'railway',
    name: 'Railway',
    category: 'dev',
    description: 'Infrastructure platform for rapid deployment. PostgreSQL, Redis, and more.',
    url: 'https://railway.app',
    note: 'My go-to for backend services and databases.',
    color: 'violet',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    description: 'Collaborative design platform. Essential for design systems and prototypes.',
    url: 'https://figma.com',
    note: 'Where all design work happens before code.',
    color: 'rose',
  },
  {
    id: 'plausible',
    name: 'Plausible',
    category: 'analytics',
    description: 'Privacy-first analytics. Clean metrics without the bloat.',
    url: 'https://plausible.io',
    note: 'Simple, ethical analytics for this site.',
    color: 'amber',
  },
]

const quickLinks = [
  {
    title: 'Prompt Library',
    description: 'Battle-tested prompts I use daily',
    href: '/prompt-library',
    icon: Sparkles,
    color: 'violet',
  },
  {
    title: 'Music Lab',
    description: 'How I create with Suno AI',
    href: '/music-lab',
    icon: Music,
    color: 'emerald',
  },
  {
    title: 'Learning Paths',
    description: 'Curated courses from top institutions',
    href: '/students',
    icon: BookOpen,
    color: 'cyan',
  },
]

const colorMap = {
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    icon: 'bg-rose-500/20 text-rose-400',
    text: 'text-rose-400',
  },
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              className="mb-8 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                <Folder className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Resources
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Tools I actually use.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
                No filler.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              A curated collection of tools, platforms, and resources that power my work.
              No affiliate-stuffed lists — just what genuinely helps me create and ship.
            </motion.p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid gap-4 md:grid-cols-3"
            >
              {quickLinks.map((link, index) => {
                const Icon = link.icon
                const colors = colorMap[link.color as keyof typeof colorMap]

                return (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Link href={link.href} className="group block">
                      <div
                        className={`flex items-center gap-4 rounded-xl border ${colors.border} ${colors.bg} p-5 transition-all duration-300 group-hover:-translate-y-0.5`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.icon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{link.title}</h3>
                          <p className="text-sm text-slate-500">{link.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-white text-slate-900'
                          : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </button>
                  )
                })}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none focus:ring-0 sm:w-64"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource, index) => {
                const colors = colorMap[resource.color as keyof typeof colorMap]

                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      <div
                        className={`relative flex h-full flex-col rounded-xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1`}
                      >
                        {/* Header */}
                        <div className="mb-4 flex items-start justify-between">
                          <h3 className="text-lg font-bold text-white">{resource.name}</h3>
                          <ExternalLink className="h-4 w-4 text-slate-500 transition-colors group-hover:text-white" />
                        </div>

                        {/* Description */}
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
                          {resource.description}
                        </p>

                        {/* Note */}
                        <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                          <p className="text-sm text-slate-300">{resource.note}</p>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )
              })}
            </div>

            {filteredResources.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <p className="text-slate-500">No resources found matching your search.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Disclosure */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center"
            >
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-400">Transparency:</span> These are tools I
                genuinely use. Some links may include affiliate partnerships that support this hub,
                but recommendations are based solely on real experience.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
