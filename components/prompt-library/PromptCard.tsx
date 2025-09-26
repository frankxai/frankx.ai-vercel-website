'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Eye, Star, ExternalLink, Check } from 'lucide-react'
import { motion } from 'framer-motion'

import { Prompt, CATEGORIES } from '@/lib/prompts'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { cn } from '@/lib/utils'
import AffiliateBadge from '../affiliates/AffiliateBadge'
import AffiliateLink from '../affiliates/AffiliateLink'

interface PromptCardProps {
  prompt: Prompt
  variant?: 'default' | 'featured' | 'compact'
  showDescription?: boolean
  className?: string
}

export default function PromptCard({
  prompt,
  variant = 'default',
  showDescription = true,
  className,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const affiliateId = prompt.affiliateId
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

  const cardVariants = {
    default: 'p-6',
    featured: 'p-8',
    compact: 'p-4',
  }

  const titleSizes = {
    default: 'text-lg',
    featured: 'text-xl',
    compact: 'text-base',
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <GlassmorphicCard
        className={cn(
          cardVariants[variant],
          'h-full transition-all duration-300',
          isHovered && 'shadow-[0_20px_60px_rgba(67,191,227,0.15)]',
          className
        )}
        variant={variant === 'featured' ? 'luxury' : 'default'}
        gradient={categoryInfo?.id === 'ai-optimization' ? 'midnight' : 'aurora'}
        hover
      >
        {affiliateId && <AffiliateBadge />}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{categoryInfo?.emoji}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium capitalize text-slate-300">
                {prompt.aiTool}
              </span>
              {affiliateId && (
                <AffiliateLink
                  affiliateId={affiliateId}
                  trackingId={`prompt-card-${prompt.id}`}
                  className="flex items-center space-x-1 text-xs text-aurora-400 transition-colors hover:text-aurora-300"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span>Recommended tool</span>
                  <ExternalLink className="h-3 w-3" />
                </AffiliateLink>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-aurora-400" />
              <span className="text-sm text-slate-300">{prompt.rating}</span>
            </div>
            {variant === 'featured' && (
              <span className="rounded-full bg-aurora-500/20 px-2 py-1 text-xs text-aurora-300">
                Featured
              </span>
            )}
          </div>
        </div>

        <h3
          className={cn(
            'mb-3 line-clamp-2 font-semibold text-white',
            titleSizes[variant]
          )}
        >
          {prompt.title}
        </h3>

        {showDescription && (
          <p className="mb-4 text-sm text-slate-300 line-clamp-3">{prompt.description}</p>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={cn(
                'rounded-full px-2 py-1 text-xs capitalize',
                prompt.difficulty === 'Beginner' && 'bg-green-500/20 text-green-300',
                prompt.difficulty === 'Intermediate' && 'bg-yellow-500/20 text-yellow-300',
                prompt.difficulty === 'Advanced' && 'bg-red-500/20 text-red-300'
              )}
            >
              {prompt.difficulty}
            </span>
            <span className="text-xs text-slate-400">{prompt.usageCount} uses</span>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(prompt.createdAt).toLocaleDateString()}
          </span>
        </div>

        {prompt.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-800/50 px-2 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="rounded-md bg-slate-800/50 px-2 py-1 text-xs text-slate-400">
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            onClick={(event) => {
              event.preventDefault()
              copyToClipboard(prompt.content)
            }}
            className={cn(
              'flex-1 rounded-2xl border border-white/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition',
              copied
                ? 'bg-green-500/20 text-green-300'
                : 'hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60'
            )}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <Link
            href={`/prompt-library/${prompt.category}/${prompt.id}`}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          >
            Open
          </Link>
        </div>

        {variant === 'featured' && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-aurora-500/10 to-pulse-500/10"
          />
        )}
      </GlassmorphicCard>
    </motion.div>
  )
}
