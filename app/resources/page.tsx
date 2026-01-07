'use client'

import Link from 'next/link'
import { ArrowRight, Github, Download, BookOpen, Music, Terminal, Brain, Sparkles, FileText, GraduationCap, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

import songs from '@/data/songs.json'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import { StaggerContainer, StaggerItem } from '@/components/ui/AdvancedAnimations'

const songRecords = songs as SongRecord[]

const openSourceProjects = [
  {
    id: 'soulbook',
    name: "The Creator's Soulbook",
    description: 'Life architecture framework with 7 pillars, 3 life books, and AI coaching prompts. Complete Obsidian vault included.',
    icon: BookOpen,
    color: 'amber',
    stats: { pillars: 7, templates: '10+' },
    cta: { label: 'Download Vault', href: '/soulbook/vault' },
    github: 'https://github.com/FrankXio/soulbook',
  },
  {
    id: 'claude-skills',
    name: 'Claude Code Skills Library',
    description: '52+ specialized skills for music production, content creation, technical development, and life coaching.',
    icon: Terminal,
    color: 'blue',
    stats: { skills: '52+', categories: 6 },
    cta: { label: 'Browse Skills', href: '/resources/skills' },
    github: 'https://github.com/FrankXio/claude-skills',
  },
]

const resourceCategories = [
  {
    id: 'free-downloads',
    name: 'Free Downloads',
    description: 'Open source tools and templates',
    icon: Download,
    items: [
      { name: 'Soulbook Obsidian Vault', href: '/soulbook/vault', badge: 'Free' },
      { name: 'Claude Skills Library', href: '/resources/skills', badge: 'Free' },
      { name: 'Prompt Templates', href: '/resources/templates', badge: 'Free' },
    ],
  },
  {
    id: 'learn',
    name: 'Learning Paths',
    description: 'Guided learning resources',
    icon: GraduationCap,
    items: [
      { name: 'Soulbook Framework', href: '/soulbook', badge: 'Start Here' },
      { name: 'Music Lab Sessions', href: '/music-lab' },
      { name: 'Blog & Essays', href: '/blog' },
    ],
  },
  {
    id: 'create',
    name: 'Creator Tools',
    description: 'Build and ship your work',
    icon: Sparkles,
    items: [
      { name: 'Prompt Library', href: '/prompt-library' },
      { name: 'AI Assessment', href: '/assessment' },
      { name: 'Strategy Canvas', href: '/tools/strategy-canvas' },
    ],
  },
]

const externalResources = [
  {
    name: 'Oracle Cloud Learning',
    description: 'Free cloud certification paths',
    href: 'https://education.oracle.com/',
    category: 'Learning',
  },
  {
    name: 'Google AI Studio',
    description: 'Experiment with Gemini models',
    href: 'https://aistudio.google.com/',
    category: 'Tools',
  },
  {
    name: 'Claude.ai',
    description: 'Anthropic\'s AI assistant',
    href: 'https://claude.ai/',
    category: 'Tools',
  },
  {
    name: 'Suno AI',
    description: 'AI music generation platform',
    href: 'https://suno.ai/',
    category: 'Music',
  },
]

export default function Resources() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-16">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 text-sm font-semibold text-purple-200 border border-purple-500/30">
                  <Sparkles className="h-4 w-4" />
                  Open Source Creator Resources
                </div>
                <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                  Resource
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Hub</span>
                </h1>
                <p className="mx-auto max-w-3xl text-xl text-slate-300">
                  Free tools, frameworks, and knowledge to fuel your creator journey.
                  Everything is open source and designed for artists, builders, and visionaries.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Open Source Projects - Featured */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 border border-emerald-500/30">
              <Github className="h-4 w-4" />
              Open Source
            </div>
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Free Downloads & GitHub Projects</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Core frameworks and tools, open source and free forever
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {openSourceProjects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassmorphicCard variant="luxury" border="glow" hover className="h-full p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-${project.color}-500/20`}>
                        <IconComponent className={`h-6 w-6 text-${project.color}-400`} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{project.name}</h3>
                        <p className="text-slate-400">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className={`text-2xl font-bold text-${project.color}-400`}>{value}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">{key}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={project.cta.href}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-${project.color}-500/20 text-${project.color}-300 font-medium hover:bg-${project.color}-500/30 transition-colors`}
                      >
                        <Download className="h-4 w-4" />
                        {project.cta.label}
                      </Link>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Browse by Category</h2>
            <p className="text-slate-400">Find exactly what you need</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {resourceCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassmorphicCard variant="default" border="subtle" className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <IconComponent className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">{category.name}</h3>
                        <p className="text-xs text-slate-500">{category.description}</p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors group"
                          >
                            <span className="text-slate-300 group-hover:text-white transition-colors">
                              {item.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                                  {item.badge}
                                </span>
                              )}
                              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </GlassmorphicCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Music className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Latest Music Drops</h2>
              </div>
              <p className="text-sm text-white/60">
                Suno-powered sessions straight from the FrankX studio. Use them to anchor rituals, ignite focus, and
                channel the Golden Age frequency.
              </p>
              <SongGrid songs={songRecords} limit={3} />
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Explore Music Lab
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex-1">
              <GlassmorphicCard variant="luxury" border="glow" className="p-8 h-full">
                <h3 className="text-xl font-semibold text-white mb-4">Join the Music Academy Waitlist</h3>
                <p className="text-slate-400 mb-6">
                  AI Music Academy launches soon—private Suno workshops, ritual labs, and collective releases.
                  Add your name to receive the first invite.
                </p>
                <form action="/api/newsletter" method="POST" className="space-y-4">
                  <input type="hidden" name="tag" value="music-academy" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@realm.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-purple-500/25">
                    Join the Waitlist
                  </button>
                </form>
                <p className="mt-3 text-xs text-white/40">We send one focused update—no noise, pure signal.</p>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-4">External Learning & Tools</h2>
            <p className="text-slate-400">Curated resources we use and recommend</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {externalResources.map((resource, index) => (
              <motion.a
                key={resource.name}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <GlassmorphicCard variant="default" border="subtle" hover className="p-5 h-full">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {resource.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors mb-1">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-slate-500">{resource.description}</p>
                </GlassmorphicCard>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassmorphicCard variant="luxury" border="glow" className="p-10 bg-gradient-to-br from-purple-950/30 to-slate-950">
              <Brain className="h-12 w-12 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-100 mb-4">
                Ready to Transform Your Creator Practice?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Start with the Soulbook framework—free forever—and build the life architecture
                that supports your creative vision.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton href="/soulbook" variant="primary" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Soulbook
                </PremiumButton>
                <PremiumButton href="/products" variant="ghost" size="lg">
                  View All Products
                </PremiumButton>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
