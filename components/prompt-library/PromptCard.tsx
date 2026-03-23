'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, ArrowRight, Sparkles, Crown, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

import { Prompt, CATEGORIES, PromptTier } from '@/lib/prompts'
import { cn } from '@/lib/utils'

const TIER_CONFIG: Record<PromptTier, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  free: { label: 'Free', icon: Sparkles, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  premium: { label: 'Premium', icon: Crown, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  paid: { label: 'Paid', icon: Lock, color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
}

interface PromptCardProps {
  prompt: Prompt
  variant?: 'default' | 'featured' | 'compact'
  showDescription?: boolean
  showTier?: boolean
  className?: string
}

export default function PromptCard({
  prompt,
  variant = 'default',
  showDescription = true,
  showTier = false,
  className,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const categoryInfo = CATEGORIES.find((category) => category.id === prompt.category)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text', error)
    }
  }

  const cardPadding = {
    default: 'p-6',
    featured: 'p-8',
    compact: 'p-4',
  }

  const titleSize = {
    default: 'text-lg',
    featured: 'text-xl',
    compact: 'text-base',
  }

  const toolColors: Record<string, string> = {
    claude: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    chatgpt: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    midjourney: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    suno: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    dalle: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'stable-diffusion': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cursor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    general: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  }

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-emerald-500/10 text-emerald-400',
    Intermediate: 'bg-amber-500/10 text-amber-400',
    Advanced: 'bg-rose-500/10 text-rose-400',
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      <div
        className={cn(
          'relative h-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300',
          cardPadding[variant],
          isHovered && 'border-white/20 bg-white/[0.04] shadow-[0_20px_60px_rgba(67,191,227,0.1)]'
        )}
      >
        {/* Header: Category + Tool + Tier */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
                toolColors[prompt.aiTool] || toolColors.general
              )}
            >
              {prompt.aiTool === 'dalle' ? 'DALL-E' : prompt.aiTool}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {showTier && prompt.tier && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
                  TIER_CONFIG[prompt.tier].color
                )}
              >
                {(() => {
                  const TierIcon = TIER_CONFIG[prompt.tier].icon
                  return <TierIcon className="h-3 w-3" />
                })()}
                {TIER_CONFIG[prompt.tier].label}
              </span>
            )}
            {variant === 'featured' && (
              <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className={cn('mb-2 font-semibold text-white', titleSize[variant])}>
          {prompt.title}
        </h3>

        {/* Description */}
        {showDescription && (
          <p className="mb-4 line-clamp-2 text-sm text-white/60">{prompt.description}</p>
        )}

        {/* Tags & Difficulty */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium',
              difficultyColors[prompt.difficulty]
            )}
          >
            {prompt.difficulty}
          </span>
          {prompt.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Use Case */}
        {variant !== 'compact' && (
          <p className="mb-6 text-xs text-white/40 line-clamp-2">
            <span className="font-medium text-white/50">Use case:</span> {prompt.useCase}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              copyToClipboard(prompt.content)
            }}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
              copied
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Prompt
              </>
            )}
          </button>
          <Link
            href={`/prompt-library/${prompt.category}/${prompt.id}`}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Hover glow effect for featured */}
        {variant === 'featured' && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5"
          />
        )}
      </div>
    </motion.div>
  )
}
