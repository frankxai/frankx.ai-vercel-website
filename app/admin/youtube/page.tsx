import { getAllVideos, getCategories, getVideoStats } from '@/lib/video'
import YouTubeAdminClient from './YouTubeAdminClient'

export const metadata = {
  title: 'YouTube Admin — Video Intelligence | FrankX',
  robots: { index: false, follow: false },
}

export default function YouTubeAdminPage() {
  const videos = getAllVideos()
  const categories = getCategories()
  const stats = getVideoStats()

  let annotations: Array<{ videoId: string }> = []
  let clips: Array<{ id: string }> = []
  try {
    annotations = require('@/data/video-annotations.json')
  } catch { /* empty */ }
  try {
    clips = require('@/data/clip-queue.json')
  } catch { /* empty */ }

  return (
    <YouTubeAdminClient
      videos={videos}
      categories={categories}
      stats={stats}
      initialAnnotations={annotations}
      initialClips={clips}
    />
  )
}
