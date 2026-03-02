'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Code, Sparkles, Terminal, Brain, Music, BookOpen, Briefcase, Heart, Github, CheckCircle, Copy } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'

const skillCategories = [
  {
    id: 'soulbook',
    name: 'Soulbook Skills',
    count: 25,
    icon: Heart,
    description: 'Life architecture, 7 pillars, transformation coaching',
    color: 'amber',
    examples: ['soulbook', 'life-symphony', 'lifesmith', 'soul-composer'],
  },
  {
    id: 'technical',
    name: 'Technical Skills',
    count: 10,
    icon: Code,
    description: 'MCP servers, Claude SDK, LangGraph, Oracle ADK',
    color: 'blue',
    examples: ['mcp-architecture', 'claude-sdk', 'langgraph-patterns', 'oracle-adk'],
  },
  {
    id: 'creative',
    name: 'Creative Skills',
    count: 7,
    icon: Music,
    description: 'Music production, content creation, book writing',
    color: 'purple',
    examples: ['suno-ai-mastery', 'frankx-brand', 'golden-age-book-writing'],
  },
  {
    id: 'personal',
    name: 'Personal Mastery',
    count: 4,
    icon: Brain,
    description: 'Philosophy, discipline, fitness, nutrition',
    color: 'emerald',
    examples: ['greek-philosopher', 'spartan-warrior', 'gym-training-expert'],
  },
  {
    id: 'business',
    name: 'Business Skills',
    count: 2,
    icon: Briefcase,
    description: 'Oracle Cloud, product management',
    color: 'cyan',
    examples: ['oci-services-expert', 'product-management-expert'],
  },
]

const featuredSkills = [
  {
    name: 'frankx-brand',
    description: 'Apply official FrankX brand standards to all content',
    usage: '/skill frankx-brand',
  },
  {
    name: 'suno-ai-mastery',
    description: 'Expert prompt engineering for professional music creation',
    usage: '/skill suno-ai-mastery',
  },
  {
    name: 'mcp-architecture',
    description: 'Design Model Context Protocol servers for AI integration',
    usage: '/skill mcp-architecture',
  },
  {
    name: 'golden-age-book-writing',
    description: 'Master-level book writing with 9-author council methodology',
    usage: '/skill golden-age-book-writing',
  },
]

export default function SkillsPage() {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null)

  const handleDownload = () => {
    window.open('https://github.com/FrankXio/claude-skills/archive/refs/heads/main.zip', '_blank')
  }

  const copyToClipboard = (text: string, skillName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSkill(skillName)
    setTimeout(() => setCopiedSkill(null), 2000)
  }

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.count, 0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center text-slate-400 hover:text-slate-200 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Terminal className="mr-2 h-4 w-4" />
              Claude Code Skills Library
            </div>

            <h1 className="mb-6 text-4xl font-bold bg-gradient-to-r from-blue-200 via-slate-100 to-purple-200 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
              AI Skills for Creators
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400 leading-relaxed">
              {totalSkills}+ specialized Claude Code skills for music production, content creation,
              life architecture, and technical development. Open source and ready to use.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <PremiumButton onClick={handleDownload} variant="primary" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download All Skills
              </PremiumButton>
              <a
                href="https://github.com/FrankXio/claude-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl min-h-[48px] bg-slate-900/20 backdrop-blur-md border border-slate-700/30 text-slate-200 hover:bg-slate-800/30 transition-all font-medium"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              {[
                { label: 'Total Skills', value: `${totalSkills}+` },
                { label: 'Categories', value: '6' },
                { label: 'Open Source', value: 'Yes' },
              ].map((stat) => (
                <GlowCard key={stat.label} className="p-4">
                  <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </GlowCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are Claude Code Skills */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowCard color="cyan" className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">What are Claude Code Skills?</h2>
                  <p className="text-slate-400">
                    Skills are specialized prompts that give Claude Code expert knowledge in specific domains.
                    They transform Claude into a music producer, life coach, systems architect, or any expert you need.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 font-mono text-sm">
                <p className="text-slate-500 mb-2"># Example usage in Claude Code</p>
                <p className="text-blue-300">/skill suno-ai-mastery</p>
                <p className="text-slate-400 mt-2"># Claude now has expert knowledge in Suno AI music production</p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Skill Categories</h2>
            <p className="text-slate-400">Organized by domain for easy discovery</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowCard color="emerald" className="p-6 h-full">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${category.color}-500/20 text-${category.color}-400 mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-200">{category.name}</h3>
                      <span className="text-sm font-medium text-slate-500">{category.count} skills</span>
                    </div>

                    <p className="text-slate-400 text-sm mb-4">{category.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <code key={example} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">
                          {example}
                        </code>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Featured Skills</h2>
            <p className="text-slate-400">Most popular skills from the collection</p>
          </motion.div>

          <div className="space-y-4">
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard color="emerald" className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-slate-200 mb-1">{skill.name}</h3>
                      <p className="text-slate-400 text-sm">{skill.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(skill.usage, skill.name)}
                      className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      {copiedSkill === skill.name ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-slate-400" />
                          <code className="text-sm text-blue-300">{skill.usage}</code>
                        </>
                      )}
                    </button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Quick Setup</h2>
            <p className="text-slate-400">Get started in minutes</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Download or Clone',
                description: 'Get the skills library from GitHub',
                code: 'git clone https://github.com/FrankXio/claude-skills.git',
              },
              {
                step: 2,
                title: 'Copy to Claude Code Directory',
                description: 'Place skills in your Claude Code skills folder',
                code: 'cp -r claude-skills/* ~/.claude/skills/',
              },
              {
                step: 3,
                title: 'Start Using Skills',
                description: 'Activate any skill with the /skill command',
                code: '/skill frankx-brand',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard color="emerald" className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-slate-200 mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{step.description}</p>
                      <code className="text-xs bg-slate-800 px-3 py-1.5 rounded text-blue-300 font-mono">
                        {step.code}
                      </code>
                    </div>
                    <div className="flex-shrink-0 hidden sm:block">
                      <CheckCircle className="h-6 w-6 text-green-500/50" />
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection to Soulbook */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowCard color="cyan" className="p-8 text-center bg-gradient-to-br from-amber-950/30 to-slate-950">
              <BookOpen className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                Part of the Soulbook Ecosystem
              </h2>
              <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                These skills power the Soulbook life architecture system. Download the complete
                Obsidian vault for the full transformation experience.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton href="/soulbook" variant="primary" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Soulbook
                </PremiumButton>
                <PremiumButton href="/soulbook/vault" variant="ghost" size="lg">
                  Download Vault
                </PremiumButton>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-6">
              Ready to Supercharge Your Claude Code?
            </h2>
            <PremiumButton onClick={handleDownload} variant="primary" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download All Skills
            </PremiumButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
