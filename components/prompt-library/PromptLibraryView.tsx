'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import type { CategoryInfo, Prompt, PromptLibraryStats } from '@/lib/prompts'
import PromptCard from '@/components/prompt-library/PromptCard'
import CategoryFilter from '@/components/prompt-library/CategoryFilter'
import AffiliateDisclosure from '@/components/affiliates/AffiliateDisclosure'
import { Pill, SectionHeading, Surface } from '@/components/ui/primitives'

interface PromptLibraryViewProps {
  prompts: Prompt[]
  categories: CategoryInfo[]
  featuredPrompts: Prompt[]
  stats: PromptLibraryStats
}

export default function PromptLibraryView({ prompts, categories, featuredPrompts, stats }: PromptLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTool, setSelectedTool] = useState<string>('all')

  const filteredPrompts = useMemo(() => {
    let result = prompts

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((prompt) =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        prompt.content.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((prompt) => prompt.category === selectedCategory)
    }

    if (selectedTool !== 'all') {
      result = result.filter((prompt) => prompt.aiTool === selectedTool)
    }

    return result
  }, [prompts, searchQuery, selectedCategory, selectedTool])

  const statHighlights = useMemo(
    () => [
      { label: 'Curated prompts', value: String(stats.totalPrompts), description: 'Signed and battle-tested' },
      { label: 'Average rating', value: stats.averageRating.toFixed(1), description: 'Community score' },
      { label: 'Total usage', value: stats.totalUsage.toLocaleString(), description: 'Field deployments' },
      { label: 'AI tools', value: String(stats.toolsUsed.length), description: 'Integrated models' },
    ],
    [stats]
  )

  return (
    <main className="min-h-screen pb-24 pt-28 text-white">
      <section className="container-px">
        <div className="mx-auto flex max-w-7xl flex-col items-center space-y-10 text-center">
          <Pill variant="brand" icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}>Prompt Atlas</Pill>
          <SectionHeading
            align="center"
            title="A curated library for creators, strategists, and teams"
            description="Explore high-performance prompt systems tuned for Claude, ChatGPT, Midjourney, Suno, and your favourite creative models. Search, filter, and deploy proven playbooks in seconds."
          />
          <CategoryFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTool={selectedTool}
            onToolChange={setSelectedTool}
            totalPrompts={filteredPrompts.length}
          />
        </div>
      </section>

      <section className="container-px mt-12">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statHighlights.map((stat) => (
            <Surface key={stat.label} tone="glass" padding="lg" className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-white/60">{stat.description}</p>
            </Surface>
          ))}
        </div>
      </section>

      {featuredPrompts.length > 0 && (
        <section className="container-px mt-16">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              align="center"
              eyebrow="Featured drops"
              title="Prompts shipping the strongest outcomes right now"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredPrompts.slice(0, 6).map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <PromptCard prompt={prompt} variant="featured" showDescription />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-px mt-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
            <span>
              Showing {filteredPrompts.length} prompt{filteredPrompts.length === 1 ? '' : 's'}
            </span>
            {selectedCategory !== 'all' && (
              <Link
                href={`/prompt-library/${selectedCategory}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                Open category page
              </Link>
            )}
          </div>

          {filteredPrompts.length === 0 ? (
            <Surface tone="glass" padding="lg" className="text-center">
              <p className="text-white/80">No prompts matched your current filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedTool('all')
                }}
                className="mt-6 inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                Reset filters
              </button>
            </Surface>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.03 * index }}
                >
                  <PromptCard prompt={prompt} showDescription />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="container-px mt-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            align="center"
            eyebrow="Browse by mission"
            title="Twelve categories engineered for different workstreams"
            description="From technical automation to creative storytelling, the prompt atlas maps every domain we ship."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Surface
                key={category.id}
                as={Link}
                href={`/prompt-library/${category.id}`}
                tone="glass"
                padding="sm"
                className="flex h-full flex-col items-center gap-1 text-white/80 transition hover:-translate-y-1 hover:shadow-brand-glow"
              >
                <span className="text-2xl">{category.emoji}</span>
                <span className="text-sm font-semibold text-white">{category.name}</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">Open</span>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mt-12">
        <div className="mx-auto max-w-5xl">
          <AffiliateDisclosure short className="mx-auto max-w-4xl" />
        </div>
      </section>
    </main>
  )
}
