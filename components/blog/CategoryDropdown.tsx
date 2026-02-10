'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CategoryDropdownProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  totalPosts: number
  getCategoryCount: (category: string) => number
}

// Category styling — 8 consolidated categories with distinct brand colors
const categoryStyles: Record<string, { icon: string; activeClass: string }> = {
  'AI Architecture':        { icon: '🏗️', activeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300' },
  'Creator Systems':        { icon: '⚡', activeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' },
  'Intelligence Dispatches': { icon: '📡', activeClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' },
  'Workshops & Tutorials':  { icon: '🛠️', activeClass: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300' },
  'AI & Systems':           { icon: '⚙️', activeClass: 'bg-sky-500/15 border-sky-500/40 text-sky-300' },
  'AI & Creativity':        { icon: '✨', activeClass: 'bg-violet-500/15 border-violet-500/40 text-violet-300' },
  'Music & Audio':          { icon: '🎵', activeClass: 'bg-orange-500/15 border-orange-500/40 text-orange-300' },
  'Strategy & Learning':    { icon: '📚', activeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-300' },
}

const getCategoryStyle = (category: string) => {
  return categoryStyles[category] || { icon: '📄', activeClass: 'bg-white/10 border-white/30 text-white' }
}

export default function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  totalPosts,
  getCategoryCount,
}: CategoryDropdownProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full">
      {/* Horizontal scrollable pill filters */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* "All" pill */}
        <motion.button
          onClick={() => onSelectCategory(null)}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap',
            'border transition-all duration-200 shrink-0',
            !selectedCategory
              ? 'bg-white/10 border-white/30 text-white shadow-sm shadow-white/5'
              : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
          )}
          whileTap={{ scale: 0.97 }}
          layout
        >
          <span className="text-xs">✦</span>
          <span>All</span>
          <span className={cn(
            'text-xs tabular-nums ml-0.5',
            !selectedCategory ? 'text-white/70' : 'text-white/30'
          )}>
            {totalPosts}
          </span>
        </motion.button>

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 shrink-0" />

        {/* Category pills */}
        {categories.map((category) => {
          const count = getCategoryCount(category)
          const isSelected = selectedCategory === category
          const { icon, activeClass } = getCategoryStyle(category)

          return (
            <motion.button
              key={category}
              onClick={() => onSelectCategory(isSelected ? null : category)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap',
                'border transition-all duration-200 shrink-0',
                isSelected
                  ? activeClass
                  : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
              )}
              whileTap={{ scale: 0.97 }}
              layout
            >
              <span className="text-xs">{icon}</span>
              <span>{category}</span>
              <span className={cn(
                'text-xs tabular-nums ml-0.5',
                isSelected ? 'opacity-70' : 'text-white/30'
              )}>
                {count}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
