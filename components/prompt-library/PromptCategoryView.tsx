'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

import type { CategoryInfo, Prompt } from '@/lib/prompts'
import PromptCard from '@/components/prompt-library/PromptCard'
import CategoryFilter from '@/components/prompt-library/CategoryFilter'
import { Pill, SectionHeading, StatBlock, Surface } from '@/components/ui/primitives'

type PromptCategoryViewProps = {
  category: CategoryInfo
  prompts: Prompt[]
  otherCategories: CategoryInfo[]
}

export default function PromptCategoryView({ category, prompts, otherCategories }: PromptCategoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTool, setSelectedTool] = useState<string>('all')

  const filteredPrompts = useMemo(() => {
    let result = prompts

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((prompt) =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        prompt.content.toLowerCase().includes(query),
      )
    }

    if (selectedTool !== 'all') {
      result = result.filter((prompt) => prompt.aiTool === selectedTool)
    }

    return result
  }, [prompts, searchQuery, selectedTool])

  const toolsUsed = useMemo(() => new Set(prompts.map((prompt) => prompt.aiTool)), [prompts])
  const totalUsage = useMemo(() => prompts.reduce((sum, prompt) => sum + prompt.usageCount, 0), [prompts])
  const averageRating = useMemo(() => {
    if (prompts.length === 0) return 0
    const total = prompts.reduce((sum, prompt) => sum + prompt.rating, 0)
    return Math.round((total / prompts.length) * 10) / 10
  }, [prompts])

  return (
    <main className='min-h-screen pt-28 pb-24 text-white'>
      <section className='container-px'>
        <div className='mx-auto max-w-6xl space-y-12 text-center'>
          <div className='flex justify-center'>
            <Link
              href='/prompt-library'
              className='inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-1 text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60'
            >
              <Home className='h-4 w-4' />
              Prompt Library
            </Link>
          </div>
          <div className='space-y-6'>
            <Pill variant='brand' className='mx-auto'>Category Spotlight</Pill>
            <SectionHeading
              align='center'
              eyebrow={`${category.emoji} ${category.name}`}
              title={`Prompts for ${category.name}`}
              description={category.description}
            />
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <StatBlock value={String(prompts.length)} label='Total Prompts' description='Ready-to-use templates' align='center' />
            <StatBlock value={String(toolsUsed.size)} label='AI Tools' description='Optimised configurations' align='center' />
            <StatBlock value={`${averageRating.toFixed(1)}`} label='Average Rating' description='Community score' align='center' />
            <StatBlock value={totalUsage.toLocaleString()} label='Total Usage' description='Applied in the field' align='center' />
          </div>
        </div>
      </section>

      <section className='container-px mt-16'>
        <div className='mx-auto max-w-5xl'>
          <CategoryFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory='all'
            onCategoryChange={() => undefined}
            selectedTool={selectedTool}
            onToolChange={setSelectedTool}
            totalPrompts={filteredPrompts.length}
            hideCategorySelector
          />
        </div>
      </section>

      <section className='container-px mt-12'>
        <div className='mx-auto max-w-7xl space-y-10'>
          <div className='flex items-center justify-between text-sm text-white/60'>
            <span>Showing {filteredPrompts.length} prompt{filteredPrompts.length === 1 ? '' : 's'}</span>
            <span>Updated weekly</span>
          </div>
          {filteredPrompts.length === 0 ? (
            <Surface tone='glass' padding='lg' className='text-center'>
              <p className='text-white/80'>No prompts matched your current filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTool('all')
                }}
                className='mt-6 inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60'
              >
                Clear filters
              </button>
            </Surface>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {filteredPrompts.map((prompt, index) => (
                <motion.div key={prompt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 * index }}>
                  <PromptCard prompt={prompt} showDescription />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {otherCategories.length > 0 && (
        <section className='container-px mt-20'>
          <div className='mx-auto max-w-6xl space-y-8 text-center'>
            <SectionHeading
              align='center'
              eyebrow='Explore more'
              title='Adjacent prompt categories'
              description='Continue your exploration across the full FrankX prompt atlas.'
            />
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
              {otherCategories.map((item) => (
                <Surface key={item.id} as={Link} href={`/prompt-library/${item.id}`} tone='glass' padding='sm' className='flex h-full flex-col items-center gap-1 text-white/80 transition hover:-translate-y-1 hover:shadow-brand-glow'>
                  <span className='text-2xl'>{item.emoji}</span>
                  <span className='text-sm font-semibold'>{item.name}</span>
                </Surface>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
