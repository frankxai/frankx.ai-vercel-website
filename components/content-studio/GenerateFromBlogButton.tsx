'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

interface GenerateFromBlogButtonProps {
  blogSlug: string
  blogTitle: string
  onSuccess?: (count: number) => void
}

export default function GenerateFromBlogButton({ blogSlug, blogTitle, onSuccess }: GenerateFromBlogButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/content-studio/generate-from-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogSlug })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate posts')
      }

      const { count } = await response.json()
      
      if (onSuccess) {
        onSuccess(count)
      } else {
        alert(`Generated ${count} social media posts! Check Content Studio.`)
      }
    } catch (error) {
      console.error('[GenerateFromBlog] Error:', error)
      alert('Failed to generate social posts. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate Social Posts
        </>
      )}
    </button>
  )
}
