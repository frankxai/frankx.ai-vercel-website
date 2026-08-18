'use client'

import { useState } from 'react'
import { Check, Copy, Linkedin, Twitter, Share2 } from 'lucide-react'

interface ArticleHeaderActionsProps {
  title: string
  url: string
}

export function ArticleHeaderActions({ title, url }: ArticleHeaderActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/70 hover:bg-white/[0.09] hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/70 hover:bg-white/[0.09] hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30"
        title="Share on X (Twitter)"
      >
        <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Post</span>
      </a>

      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/70 hover:bg-white/[0.09] hover:border-white/20 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Share</span>
      </a>
    </div>
  )
}
