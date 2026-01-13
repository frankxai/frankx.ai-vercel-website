'use client'

import { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import { getRecentDownloadCount } from '@/lib/client-analytics'

interface DownloadCounterProps {
  guideSlug: string
  className?: string
}

export default function DownloadCounter({ guideSlug, className = '' }: DownloadCounterProps) {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCount() {
      try {
        const downloadCount = await getRecentDownloadCount(guideSlug)
        setCount(downloadCount)
      } catch (error) {
        console.error('Failed to fetch download count:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCount()
  }, [guideSlug])

  if (isLoading || count === null || count === 0) {
    return null
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 ${className}`}>
      <TrendingUp className="w-4 h-4 text-cyan-400" />
      <span className="text-sm text-gray-300">
        <strong className="text-white font-semibold">{count}</strong> {count === 1 ? 'person' : 'people'} downloaded this week
      </span>
    </div>
  )
}
