'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Search, X } from 'lucide-react'

import { CATEGORIES } from '@/lib/prompts'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedTool: string
  onToolChange: (tool: string) => void
  totalPrompts: number
  className?: string
  hideCategorySelector?: boolean
}

const TOOL_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All Tools' },
  { value: 'claude', label: 'Claude' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'suno', label: 'Suno' },
  { value: 'dalle', label: 'DALL-E' },
  { value: 'stable-diffusion', label: 'Stable Diffusion' },
  { value: 'notion', label: 'Notion' },
  { value: 'zapier', label: 'Zapier' },
  { value: 'make', label: 'Make.com' },
  { value: 'general', label: 'General' },
]

export default function CategoryFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTool,
  onToolChange,
  totalPrompts,
  className,
  hideCategorySelector = false,
}: CategoryFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const hasActiveFilters = useMemo(() => {
    const toolActive = selectedTool !== 'all'
    const categoryActive = !hideCategorySelector && selectedCategory !== 'all'
    return Boolean(searchQuery) || toolActive || categoryActive
  }, [hideCategorySelector, searchQuery, selectedCategory, selectedTool])

  const clearFilters = () => {
    onSearchChange('')
    if (!hideCategorySelector) {
      onCategoryChange('all')
    }
    onToolChange('all')
  }

  const categoryOptions = hideCategorySelector
    ? []
    : [{ id: 'all', name: 'All Categories', emoji: 'ALL' }, ...CATEGORIES]

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search prompts, categories, or tools..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-sm text-white placeholder:text-white/40 shadow-inner transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={cn(
              'inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60',
              isFilterOpen && 'bg-white/10 text-white shadow-brand-glow'
            )}
            aria-expanded={isFilterOpen}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="rounded-2xl border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="text-sm text-white/60">{totalPrompts} prompt{totalPrompts !== 1 ? 's' : ''}</div>
      </div>

      <AnimatePresence initial={false}>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className={cn('grid gap-6', hideCategorySelector ? 'grid-cols-1' : 'lg:grid-cols-[2fr_3fr]')}>
                {!hideCategorySelector && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white">Category</h3>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
                      {categoryOptions.map((category) => {
                        const value = category.id
                        const isActive = selectedCategory === value
                        return (
                          <button
                            key={value}
                            onClick={() => onCategoryChange(value)}
                            className={cn(
                              'flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60',
                              isActive && 'bg-white/12 text-white shadow-brand-glow'
                            )}
                          >
                            <span className="text-lg">{category.emoji}</span>
                            <span>{category.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">AI Tool</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {TOOL_OPTIONS.map((tool) => {
                      const isActive = selectedTool === tool.value
                      return (
                        <button
                          key={tool.value}
                          onClick={() => onToolChange(tool.value)}
                          className={cn(
                            'rounded-2xl border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60',
                            isActive && 'bg-white/12 text-white shadow-brand-glow'
                          )}
                        >
                          {tool.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasActiveFilters && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
              <span>Search: "{searchQuery}"</span>
              <button onClick={() => onSearchChange('')} aria-label="Clear search filter" className="text-white/60 transition hover:text-white">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {!hideCategorySelector && selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
              <span>
                {CATEGORIES.find((category) => category.id === selectedCategory)?.emoji}
                {CATEGORIES.find((category) => category.id === selectedCategory)?.name}
              </span>
              <button onClick={() => onCategoryChange('all')} aria-label="Clear category filter" className="text-white/60 transition hover:text-white">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedTool !== 'all' && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
              <span className="capitalize">{selectedTool}</span>
              <button onClick={() => onToolChange('all')} aria-label="Clear tool filter" className="text-white/60 transition hover:text-white">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}
