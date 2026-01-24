'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryDropdownProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  totalPosts: number
  getCategoryCount: (category: string) => number
}

// Category styling - only define for main categories
const categoryStyles: Record<string, { icon: string; color: string }> = {
  'Creator Systems': { icon: '⚡', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  'Intelligence Dispatches': { icon: '📡', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  'Enterprise AI': { icon: '🏢', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  'AI Architecture': { icon: '🔧', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  'Workshops': { icon: '🎓', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  'AI & Consciousness': { icon: '🧠', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
}

const getStyle = (category: string) => {
  return categoryStyles[category] || {
    icon: '📝',
    color: 'text-white/60 bg-white/5 border-white/10'
  }
}

// Minimum posts to be a "primary" category
const PRIMARY_THRESHOLD = 3

export default function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  totalPosts,
  getCategoryCount,
}: CategoryDropdownProps) {
  const [mounted, setMounted] = useState(false)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sort categories by post count and split into primary/secondary
  const { primaryCategories, secondaryCategories } = useMemo(() => {
    const sorted = [...categories].sort((a, b) => getCategoryCount(b) - getCategoryCount(a))
    const primary = sorted.filter(cat => getCategoryCount(cat) >= PRIMARY_THRESHOLD)
    const secondary = sorted.filter(cat => getCategoryCount(cat) < PRIMARY_THRESHOLD)
    return { primaryCategories: primary, secondaryCategories: secondary }
  }, [categories, getCategoryCount])

  if (!mounted) {
    return <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
  }

  const CategoryPill = ({
    category,
    isAll = false
  }: {
    category: string | null
    isAll?: boolean
  }) => {
    const isSelected = isAll ? !selectedCategory : selectedCategory === category
    const count = isAll ? totalPosts : getCategoryCount(category!)
    const style = isAll ? { icon: '✨', color: 'text-white bg-white/10 border-white/20' } : getStyle(category!)

    return (
      <motion.button
        onClick={() => onSelectCategory(isAll ? null : (isSelected ? null : category))}
        className={cn(
          'group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
          isSelected
            ? cn(style.color, 'border-current/30')
            : 'bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm">{style.icon}</span>
        <span className={cn(
          'text-sm font-medium',
          isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
        )}>
          {isAll ? 'All' : category}
        </span>
        <span className={cn(
          'text-xs px-1.5 py-0.5 rounded-md',
          isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
        )}>
          {count}
        </span>
      </motion.button>
    )
  }

  return (
    <div className="w-full">
      {/* Primary Categories - Always Visible */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* All Button */}
        <CategoryPill category={null} isAll />

        {/* Top Categories */}
        {primaryCategories.map((category) => (
          <CategoryPill key={category} category={category} />
        ))}

        {/* More Button */}
        {secondaryCategories.length > 0 && (
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
              showMore
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-transparent border-white/10 text-white/50 hover:bg-white/5 hover:text-white/70'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium">
              {showMore ? 'Less' : `+${secondaryCategories.length} more`}
            </span>
            <motion.div
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Secondary Categories - Expandable */}
      <AnimatePresence>
        {showMore && secondaryCategories.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 mt-3 border-t border-white/5">
              {secondaryCategories.map((category) => (
                <CategoryPill key={category} category={category} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filter Indicator */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-center mt-4"
          >
            <div className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm',
              'bg-white/5 border border-white/10'
            )}>
              <span className="text-white/50">Showing</span>
              <span className={cn('font-medium', getStyle(selectedCategory).color.split(' ')[0])}>
                {selectedCategory}
              </span>
              <span className="text-white/50">
                ({getCategoryCount(selectedCategory)} articles)
              </span>
              <button
                onClick={() => onSelectCategory(null)}
                className="ml-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Clear filter"
              >
                <X className="w-3.5 h-3.5 text-white/40 hover:text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
