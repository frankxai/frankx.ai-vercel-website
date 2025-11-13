'use client'

import { FileText, ExternalLink, Download, Sparkles, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ContentTypeValue = 'article' | 'research' | 'guide' | 'tutorial' | 'case-study' | 'perplexity' | 'pdf' | 'template'

interface ContentTypeBadgeProps {
  type: ContentTypeValue
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

const contentTypeConfig: Record<ContentTypeValue, {
  label: string
  icon: any
  colors: string
  description: string
}> = {
  article: {
    label: 'Article',
    icon: FileText,
    colors: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
    description: 'Long-form blog post'
  },
  research: {
    label: 'Research',
    icon: ExternalLink,
    colors: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    description: 'Perplexity Page or deep-dive'
  },
  guide: {
    label: 'Guide',
    icon: BookOpen,
    colors: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    description: 'Step-by-step tutorial'
  },
  tutorial: {
    label: 'Tutorial',
    icon: Sparkles,
    colors: 'text-green-400 border-green-400/30 bg-green-400/10',
    description: 'Hands-on walkthrough'
  },
  'case-study': {
    label: 'Case Study',
    icon: FileText,
    colors: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    description: 'Real-world implementation'
  },
  perplexity: {
    label: 'Perplexity',
    icon: ExternalLink,
    colors: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/10',
    description: 'Perplexity Page'
  },
  pdf: {
    label: 'PDF',
    icon: Download,
    colors: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
    description: 'Downloadable resource'
  },
  template: {
    label: 'Template',
    icon: Download,
    colors: 'text-teal-400 border-teal-400/30 bg-teal-400/10',
    description: 'Ready-to-use template'
  }
}

const sizeConfig = {
  sm: {
    container: 'px-2 py-0.5 text-xs gap-1',
    icon: 'h-3 w-3',
    text: 'text-xs'
  },
  md: {
    container: 'px-3 py-1 text-sm gap-1.5',
    icon: 'h-3.5 w-3.5',
    text: 'text-sm'
  },
  lg: {
    container: 'px-4 py-1.5 text-base gap-2',
    icon: 'h-4 w-4',
    text: 'text-base'
  }
}

export default function ContentTypeBadge({
  type,
  size = 'md',
  showIcon = true,
  className
}: ContentTypeBadgeProps) {
  const config = contentTypeConfig[type]
  const Icon = config.icon
  const sizing = sizeConfig[size]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold uppercase tracking-[0.3em]',
        config.colors,
        sizing.container,
        className
      )}
      title={config.description}
    >
      {showIcon && <Icon className={sizing.icon} />}
      <span className={sizing.text}>{config.label}</span>
    </span>
  )
}

/**
 * Get content type from blog post metadata or category
 */
export function inferContentType(post: {
  category?: string
  tags?: string[]
  keywords?: string[]
  sourceCategory?: string
}): ContentTypeValue {
  const allText = [
    post.category?.toLowerCase(),
    ...(post.tags?.map(t => t.toLowerCase()) || []),
    ...(post.keywords?.map(k => k.toLowerCase()) || []),
    post.sourceCategory?.toLowerCase()
  ].join(' ')

  // Check for specific content types
  if (allText.includes('tutorial') || allText.includes('walkthrough')) return 'tutorial'
  if (allText.includes('guide') || allText.includes('how-to')) return 'guide'
  if (allText.includes('case study') || allText.includes('implementation')) return 'case-study'
  if (allText.includes('research') || allText.includes('deep-dive')) return 'research'
  if (allText.includes('template') || allText.includes('download')) return 'template'

  // Default to article
  return 'article'
}
