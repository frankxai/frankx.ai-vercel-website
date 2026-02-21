import {
  getAllVideos,
  getWatchlists,
  getCategories,
  getTrendingVideos,
  getVideoStats,
} from '@/lib/video'
import WatchClient from './WatchClient'

export default function WatchPage() {
  const videos = getAllVideos()
  const watchlists = getWatchlists()
  const categories = getCategories()
  const trending = getTrendingVideos(8)
  const stats = getVideoStats()

  // Build blog cross-link map from cross-refs data (if available)
  let blogCrossLinks: Record<string, string[]> = {}
  try {
    const crossRefs = require('@/data/video-cross-refs.json')
    blogCrossLinks = crossRefs.videoToBlog || {}
  } catch {
    // Cross-refs not generated yet
  }

  return (
    <WatchClient
      videos={videos}
      watchlists={watchlists}
      categories={categories}
      trending={trending}
      stats={stats}
      blogCrossLinks={blogCrossLinks}
    />
  )
}
