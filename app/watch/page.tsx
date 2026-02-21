import {
  getAllVideos,
  getWatchlists,
  getCategories,
  getEditorsPicks,
  getVideoStats,
} from '@/lib/video'
import WatchClient from './WatchClient'

export default function WatchPage() {
  const videos = getAllVideos()
  const watchlists = getWatchlists()
  const categories = getCategories()
  const editorsPicks = getEditorsPicks()
  const stats = getVideoStats()

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
      editorsPicks={editorsPicks}
      stats={stats}
      blogCrossLinks={blogCrossLinks}
    />
  )
}
