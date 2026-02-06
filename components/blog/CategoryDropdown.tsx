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

// Category styling with brand colors
const categoryStyles: Record<string, { icon: string; activeClass: string }> = {
  'AI & Technology': { icon: '🤖', activeClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' },
  'AI & Consciousness': { icon: '🧠', activeClass: 'bg-purple-500/15 border-purple-500/40 text-purple-300' },
  'AI & Creativity': { icon: '✨', activeClass: 'bg-violet-500/15 border-violet-500/40 text-violet-300' },
  'AI & Systems': { icon: '⚙️', activeClass: 'bg-sky-500/15 border-sky-500/40 text-sky-300' },
  'AI Architecture': { icon: '🏗️', activeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300' },
  'AI Education': { icon: '📚', activeClass: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300' },
  'Agentic AI': { icon: '🤖', activeClass: 'bg-teal-500/15 border-teal-500/40 text-teal-300' },
  'Agentic Creator Mastery': { icon: '🚀', activeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' },
  'Business & AI': { icon: '💼', activeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-300' },
  'Consciousness': { icon: '🌀', activeClass: 'bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-300' },
  'Content Strategy': { icon: '📝', activeClass: 'bg-lime-500/15 border-lime-500/40 text-lime-300' },
  'Creation Chronicles': { icon: '📖', activeClass: 'bg-orange-500/15 border-orange-500/40 text-orange-300' },
  'Creator Systems': { icon: '⚡', activeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' },
  'Creativity': { icon: '🎨', activeClass: 'bg-pink-500/15 border-pink-500/40 text-pink-300' },
  'Creativity & Framework': { icon: '🎯', activeClass: 'bg-rose-500/15 border-rose-500/40 text-rose-300' },
  'Enterprise AI': { icon: '🏢', activeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300' },
  'Flagship': { icon: '🏆', activeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-300' },
  'Framework': { icon: '🔧', activeClass: 'bg-slate-400/15 border-slate-400/40 text-slate-300' },
  'Golden Age': { icon: '✦', activeClass: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300' },
  'Intelligence Dispatches': { icon: '📡', activeClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' },
  'Intelligence Economy': { icon: '📈', activeClass: 'bg-green-500/15 border-green-500/40 text-green-300' },
  'Music Intelligence': { icon: '🎵', activeClass: 'bg-orange-500/15 border-orange-500/40 text-orange-300' },
  'Music Production': { icon: '🎹', activeClass: 'bg-orange-500/15 border-orange-500/40 text-orange-300' },
  'Personal Development': { icon: '🌱', activeClass: 'bg-green-500/15 border-green-500/40 text-green-300' },
  'Product Launch': { icon: '🚀', activeClass: 'bg-rose-500/15 border-rose-500/40 text-rose-300' },
  'Research Deep Dive': { icon: '🔬', activeClass: 'bg-violet-500/15 border-violet-500/40 text-violet-300' },
  'Strategy': { icon: '♟️', activeClass: 'bg-slate-400/15 border-slate-400/40 text-slate-300' },
  'Technology': { icon: '💻', activeClass: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' },
  'Tutorials': { icon: '📘', activeClass: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300' },
  'Vibe OS': { icon: '🎧', activeClass: 'bg-purple-500/15 border-purple-500/40 text-purple-300' },
  'Vibe Sessions': { icon: '🎶', activeClass: 'bg-purple-500/15 border-purple-500/40 text-purple-300' },
  'Workshops': { icon: '🛠️', activeClass: 'bg-teal-500/15 border-teal-500/40 text-teal-300' },
  'ai-tools': { icon: '🔧', activeClass: 'bg-slate-400/15 border-slate-400/40 text-slate-300' },
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
