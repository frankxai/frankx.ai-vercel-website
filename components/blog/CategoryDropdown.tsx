'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryDropdownProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  totalPosts: number
  getCategoryCount: (category: string) => number
}

// Category icon mapping with FrankX domain colors
const categoryIcons: Record<string, { icon: string; color: string }> = {
  'AI & Technology': { icon: '🤖', color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400' },
  'AI & Systems Thinking': { icon: '🧠', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400' },
  'Music Production': { icon: '🎵', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400' },
  'Creator Systems': { icon: '⚡', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400' },
  'Personal Development': { icon: '🌱', color: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400' },
  'Enterprise AI': { icon: '🏢', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400' },
}

const getCategoryStyle = (category: string) => {
  return categoryIcons[category] || { icon: '📝', color: 'from-white/10 to-white/5 border-white/20 text-white' }
}

export default function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  totalPosts,
  getCategoryCount,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedCategoryLabel = selectedCategory
    ? `${selectedCategory} (${getCategoryCount(selectedCategory)})`
    : `All Categories (${totalPosts})`

  const selectedIcon = selectedCategory
    ? getCategoryStyle(selectedCategory).icon
    : '✨'

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group relative flex items-center gap-3 px-5 py-3 rounded-xl',
          'bg-gradient-to-br from-white/10 to-white/5 border border-white/20',
          'hover:from-white/15 hover:to-white/10 hover:border-white/30',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
          'transition-all duration-300',
          'min-w-[200px] justify-between'
        )}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{selectedIcon}</span>
          <span className="text-sm font-medium text-white">
            {selectedCategoryLabel}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute top-full left-0 right-0 mt-2 z-50',
              'bg-[#0F172A]/95 backdrop-blur-xl border border-white/20 rounded-xl',
              'shadow-2xl shadow-black/50 overflow-hidden'
            )}
            role="listbox"
          >
            {/* All Categories Option */}
            <motion.button
              onClick={() => {
                onSelectCategory(null)
                setIsOpen(false)
              }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3',
                'hover:bg-white/10 transition-colors duration-200',
                'border-b border-white/5',
                !selectedCategory && 'bg-emerald-500/10'
              )}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              role="option"
              aria-selected={!selectedCategory}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">✨</span>
                <div className="text-left">
                  <span className="text-sm font-medium text-white block">
                    All Categories
                  </span>
                  <span className="text-xs text-white/55">
                    View everything
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/60 bg-white/5 px-2 py-1 rounded">
                  {totalPosts}
                </span>
                {!selectedCategory && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>
            </motion.button>

            {/* Category Options */}
            {categories.map((category, index) => {
              const count = getCategoryCount(category)
              const isSelected = selectedCategory === category
              const { icon, color } = getCategoryStyle(category)

              return (
                <motion.button
                  key={category}
                  onClick={() => {
                    onSelectCategory(isSelected ? null : category)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3',
                    'hover:bg-white/10 transition-colors duration-200',
                    index < categories.length - 1 && 'border-b border-white/5',
                    isSelected && 'bg-emerald-500/10'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileHover={{ x: 4 }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{icon}</span>
                    <div className="text-left">
                      <span className="text-sm font-medium text-white block">
                        {category}
                      </span>
                      <span className="text-xs text-white/55">
                        {count} {count === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-xs font-medium px-2 py-1 rounded bg-gradient-to-br border backdrop-blur-sm',
                      color
                    )}>
                      {count}
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
