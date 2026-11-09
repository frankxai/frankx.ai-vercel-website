'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, Shield, Zap, Brain, Code, Palette, BarChart3, ArrowRight } from 'lucide-react'

import { StaggerContainer, StaggerItem } from '@/components/ui/AdvancedAnimations'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

// Resource categories with smart tagging
const resourceCategories = [
  {
    id: 'ai-intelligence',
    name: 'AI Intelligence',
    icon: Brain,
    description: 'Frontier models and agentic systems',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'development',
    name: 'Development',
    icon: Code,
    description: 'Infrastructure and deployment tools',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'design-creative',
    name: 'Design & Creative',
    icon: Palette,
    description: 'Visual and creative intelligence tools',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    description: 'Intelligence metrics and optimization',
    color: 'from-emerald-500 to-teal-600'
  }
]

// Curated resources with expert validation
const intelligenceArsenal = [
  {
    id: 'claude',
    name: 'Claude by Anthropic',
    category: 'ai-intelligence',
    description: 'Constitutional AI system for strategic thinking and complex reasoning workflows.',
    url: 'https://claude.ai',
    expertNote: 'I use Claude Code as my daily build harness.',
    rating: 5,
    verified: true,
    hasAffiliate: false
  },
  {
    id: 'railway',
    name: 'Railway',
    category: 'development',
    description: 'Zero-config infrastructure platform for rapid deployment and scaling.',
    url: 'https://railway.app',
    expertNote: 'Hosting platform. This link is an affiliate link.',
    rating: 5,
    verified: true,
    hasAffiliate: true
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'development',
    description: 'Frontend platform optimized for Next.js and edge computing.',
    url: 'https://vercel.com',
    expertNote: 'Every frankx.ai surface ships on Vercel.',
    rating: 5,
    verified: true,
    hasAffiliate: false
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design-creative',
    description: 'Collaborative design platform with AI-powered features.',
    url: 'https://figma.com',
    expertNote: 'Design and prototyping tool.',
    rating: 5,
    verified: true,
    hasAffiliate: false
  },
  {
    id: 'plausible',
    name: 'Plausible Analytics',
    category: 'analytics',
    description: 'Privacy-first analytics without compromising intelligence insights.',
    url: 'https://plausible.io',
    expertNote: 'Privacy-focused web analytics.',
    rating: 5,
    verified: true,
    hasAffiliate: false
  }
]

export default function IntelligenceArsenal() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredResources = intelligenceArsenal.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 pb-16 pt-24 text-slate-100">
      <div className="mx-auto max-w-7xl px-4">
        <StaggerContainer>
          {/* Premium Header */}
          <StaggerItem>
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 px-4 py-2 text-sm font-semibold text-purple-200 border border-purple-500/30">
                <Shield className="h-4 w-4" />
                Tools I use and affiliate links
              </div>
              <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                Tools I use,
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> and which links pay me</span>
              </h1>
              <p className="mx-auto mb-12 max-w-4xl text-xl text-slate-300">
                Each entry says what the tool is for.
                <br className="hidden sm:block" />
                Links marked as affiliate earn me a commission.
              </p>
            </div>
          </StaggerItem>

          {/* Category Filters */}
          <StaggerItem>
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                    : 'border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                All Resources
              </button>
              {resourceCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </StaggerItem>

          {/* Search */}
          <StaggerItem>
            <GlassmorphicCard variant="premium" className="mb-12 p-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search intelligence tools..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                />
              </div>
            </GlassmorphicCard>
          </StaggerItem>

          {/* Resource Grid */}
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource, index) => {
              const category = resourceCategories.find(cat => cat.id === resource.category)
              const IconComponent = category?.icon || Zap

              return (
                <StaggerItem key={resource.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <GlassmorphicCard variant="luxury" className="group h-full cursor-pointer transition-all hover:scale-[1.02]">
                      <div className="p-6">
                        {/* Header */}
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`rounded-xl bg-gradient-to-br ${category?.color || 'from-slate-500 to-slate-600'} p-2`}>
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{resource.name}</h3>
                              <div className="flex items-center gap-2">
                                {resource.verified && (
                                  <div className="inline-flex items-center gap-1 text-xs text-emerald-400">
                                    <Shield className="h-3 w-3" />
                                    Listed
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < resource.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mb-4 text-sm text-slate-300">{resource.description}</p>

                        {/* Expert Note */}
                        <div className="mb-6 rounded-lg bg-slate-800/50 p-3 border-l-2 border-purple-500/50">
                          <p className="text-xs text-purple-200 font-medium">Note:</p>
                          <p className="text-sm text-slate-300 italic">"{resource.expertNote}"</p>
                        </div>

                        {/* CTA */}
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-purple-600 hover:to-indigo-700 group-hover:shadow-lg"
                        >
                          Open {resource.name}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerContainer>

        {/* Embedded Legal Disclosure */}
        <div className="mt-16 mx-auto max-w-4xl">
          <GlassmorphicCard variant="default" className="p-6">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Transparency Note:</strong> This page lists tools I use or recommend. Some entries may include affiliate partnerships that support the work. Those are marked, and they do not change which tools I recommend.
            </p>
          </GlassmorphicCard>
        </div>
      </div>
    </div>
  )
}
