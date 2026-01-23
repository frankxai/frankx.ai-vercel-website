'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CategoryDropdownProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  totalPosts: number
  getCategoryCount: (category: string) => number
}

// Category styling with distinctive colors and gradients
const categoryStyles: Record<string, {
  icon: string
  gradient: string
  glow: string
  accent: string
}> = {
  'AI & Technology': {
    icon: '🤖',
    gradient: 'from-cyan-400 via-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/25',
    accent: 'text-cyan-400'
  },
  'AI & Consciousness': {
    icon: '🧠',
    gradient: 'from-purple-400 via-fuchsia-500 to-pink-500',
    glow: 'shadow-purple-500/25',
    accent: 'text-purple-400'
  },
  'Music Production': {
    icon: '🎵',
    gradient: 'from-orange-400 via-amber-500 to-yellow-500',
    glow: 'shadow-orange-500/25',
    accent: 'text-orange-400'
  },
  'Creator Systems': {
    icon: '⚡',
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    glow: 'shadow-emerald-500/25',
    accent: 'text-emerald-400'
  },
  'Personal Development': {
    icon: '🌱',
    gradient: 'from-green-400 via-lime-500 to-emerald-500',
    glow: 'shadow-green-500/25',
    accent: 'text-green-400'
  },
  'Enterprise AI': {
    icon: '🏢',
    gradient: 'from-blue-400 via-indigo-500 to-violet-500',
    glow: 'shadow-blue-500/25',
    accent: 'text-blue-400'
  },
}

const getStyle = (category: string) => {
  return categoryStyles[category] || {
    icon: '📝',
    gradient: 'from-white/40 via-white/60 to-white/40',
    glow: 'shadow-white/10',
    accent: 'text-white'
  }
}

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  }
}

export default function CategoryDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  totalPosts,
  getCategoryCount,
}: CategoryDropdownProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-14 bg-white/5 rounded-2xl animate-pulse" />
    )
  }

  return (
    <div className="w-full">
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">
          Explore by Topic
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Category Pills */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {/* All Categories Pill */}
        <motion.button
          variants={itemVariants}
          onClick={() => onSelectCategory(null)}
          className={cn(
            'group relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-full',
            'transition-all duration-300',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background */}
          <div className={cn(
            'absolute inset-0 rounded-full transition-all duration-300',
            !selectedCategory
              ? 'bg-gradient-to-r from-white/20 via-white/25 to-white/20 shadow-lg shadow-white/10'
              : 'bg-white/5 group-hover:bg-white/10'
          )} />

          {/* Animated border for selected state */}
          {!selectedCategory && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.3))',
                backgroundSize: '200% 100%',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}

          {/* Content */}
          <span className="relative flex items-center gap-2">
            <span className="text-base sm:text-lg">✨</span>
            <span className={cn(
              'text-sm font-medium transition-colors',
              !selectedCategory ? 'text-white' : 'text-white/70 group-hover:text-white'
            )}>
              All
            </span>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full transition-all',
              !selectedCategory
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/50 group-hover:text-white/70'
            )}>
              {totalPosts}
            </span>
          </span>
        </motion.button>

        {/* Category Pills */}
        {categories.map((category) => {
          const count = getCategoryCount(category)
          const isSelected = selectedCategory === category
          const style = getStyle(category)

          return (
            <motion.button
              key={category}
              variants={itemVariants}
              onClick={() => onSelectCategory(isSelected ? null : category)}
              className={cn(
                'group relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-full',
                'transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]',
                isSelected && 'focus-visible:ring-white/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background */}
              <div className={cn(
                'absolute inset-0 rounded-full transition-all duration-300',
                isSelected
                  ? `bg-gradient-to-r ${style.gradient} opacity-20 shadow-lg ${style.glow}`
                  : 'bg-white/5 group-hover:bg-white/10'
              )} />

              {/* Animated gradient border for selected */}
              {isSelected && (
                <motion.div
                  className={cn(
                    'absolute inset-0 rounded-full bg-gradient-to-r',
                    style.gradient
                  )}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1.5px',
                  }}
                />
              )}

              {/* Glow effect on hover */}
              <div className={cn(
                'absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10',
                `bg-gradient-to-r ${style.gradient}`
              )}
              style={{ transform: 'scale(0.8)' }}
              />

              {/* Content */}
              <span className="relative flex items-center gap-2">
                <motion.span
                  className="text-base sm:text-lg"
                  animate={isSelected ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {style.icon}
                </motion.span>
                <span className={cn(
                  'text-sm font-medium transition-colors hidden sm:inline',
                  isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                )}>
                  {category.replace(' & ', ' & ')}
                </span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full transition-all',
                  isSelected
                    ? `bg-gradient-to-r ${style.gradient} text-white font-semibold`
                    : 'bg-white/10 text-white/50 group-hover:text-white/70'
                )}>
                  {count}
                </span>
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Selected Category Indicator */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex justify-center mt-4"
        >
          <div className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-white/5 border border-white/10'
          )}>
            <span className={cn('text-sm', getStyle(selectedCategory).accent)}>
              Showing {getCategoryCount(selectedCategory)} articles in
            </span>
            <span className="text-sm font-semibold text-white">
              {selectedCategory}
            </span>
            <button
              onClick={() => onSelectCategory(null)}
              className="ml-2 text-white/40 hover:text-white transition-colors"
              aria-label="Clear filter"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
