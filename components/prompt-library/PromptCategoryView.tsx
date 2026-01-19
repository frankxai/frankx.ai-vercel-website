'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Home,
  PenLine,
  Music,
  Image,
  Sparkles,
  Code2,
  Brain,
  Bot,
  TrendingUp,
  Share2,
  Megaphone,
  Zap,
  Target,
  Compass,
  GraduationCap,
} from 'lucide-react'

import type { CategoryInfo, Prompt } from '@/lib/prompts'
import PromptCard from '@/components/prompt-library/PromptCard'
import CategoryFilter from '@/components/prompt-library/CategoryFilter'
import { Pill, SectionHeading, StatBlock, Surface } from '@/components/ui/primitives'

// Icon mapping for dynamic rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PenLine,
  Music,
  Image,
  Sparkles,
  Code2,
  Brain,
  Bot,
  TrendingUp,
  Share2,
  Megaphone,
  Zap,
  Target,
  Compass,
  GraduationCap,
}

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

  // Get tier distribution
  const tierCounts = useMemo(() => ({
    free: prompts.filter((p) => p.tier === 'free').length,
    premium: prompts.filter((p) => p.tier === 'premium').length,
    paid: prompts.filter((p) => p.tier === 'paid').length,
  }), [prompts])

  const CategoryIcon = ICON_MAP[category.icon] || Sparkles

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
            <div className='flex justify-center'>
              <div
                className='inline-flex items-center justify-center w-16 h-16 rounded-2xl'
                style={{ backgroundColor: `${category.color}20` }}
              >
                <span style={{ color: category.color }}>
                  <CategoryIcon className='h-8 w-8' />
                </span>
              </div>
            </div>
            <Pill variant='brand' className='mx-auto'>Category Spotlight</Pill>
            <SectionHeading
              align='center'
              eyebrow={category.name}
              title={`${category.name} Prompts`}
              description={category.description}
            />
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <StatBlock value={String(prompts.length)} label='Total Prompts' description='Ready-to-use templates' align='center' />
            <StatBlock value={String(toolsUsed.size)} label='AI Tools' description='Supported platforms' align='center' />
            <StatBlock value={String(tierCounts.free)} label='Free Prompts' description='No account needed' align='center' />
            <StatBlock value={String(tierCounts.premium + tierCounts.paid)} label='Premium' description='With product bundles' align='center' />
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
                  <PromptCard prompt={prompt} showDescription showTier />
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
              title='Related Categories'
              description='Continue exploring prompts across the FrankX library.'
            />
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
              {otherCategories.slice(0, 5).map((item) => {
                const ItemIcon = ICON_MAP[item.icon] || Sparkles
                return (
                  <Surface
                    key={item.id}
                    as={Link}
                    href={`/prompt-library/${item.id}`}
                    tone='glass'
                    padding='sm'
                    className='flex h-full flex-col items-center gap-2 text-white/80 transition hover:-translate-y-1 hover:shadow-brand-glow'
                  >
                    <span style={{ color: item.color }}>
                      <ItemIcon className='h-6 w-6' />
                    </span>
                    <span className='text-sm font-semibold'>{item.name}</span>
                  </Surface>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
