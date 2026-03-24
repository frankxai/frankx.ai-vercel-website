import type {
  VaultVideo,
  LibraryVideo,
  StagingVideo,
  EnhancedVideo,
  Watchlist,
  CategorySummary,
  BlogCrossLink,
  VideoCrossRefs,
} from './video-types'

import vaultData from '@/data/video-vault-100.json'

// Lazy-load optional data files
let libraryData: LibraryVideo[] = []
let stagingData: StagingVideo[] = []
let watchlistData: Watchlist[] = []
let crossRefData: VideoCrossRefs | null = null

try {
  libraryData = require('@/data/video-library.json') as LibraryVideo[]
} catch { /* file may not exist */ }

try {
  stagingData = require('@/data/video-staging.json') as StagingVideo[]
} catch { /* file may not exist */ }

try {
  watchlistData = require('@/data/video-watchlists.json') as Watchlist[]
} catch { /* file may not exist */ }

try {
  crossRefData = require('@/data/video-cross-refs.json') as VideoCrossRefs
} catch { /* auto-generated, may not exist */ }

// --- Index maps for O(1) lookup ---

const libraryMap = new Map<string, LibraryVideo>()
libraryData.forEach((v) => libraryMap.set(v.id, v))

const stagingMap = new Map<string, StagingVideo>()
stagingData.forEach((v) => stagingMap.set(v.id, v))

// --- Level inference ---

function parseDurationMinutes(duration: string): number {
  if (duration === 'LIVE') return 0
  const parts = duration.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 60 + parts[1]
  if (parts.length === 2) return parts[0]
  return 0
}

function guessLevel(duration: string): EnhancedVideo['level'] {
  const mins = parseDurationMinutes(duration)
  if (mins <= 20) return 'intro'
  if (mins <= 60) return 'intermediate'
  return 'advanced'
}

// --- Merge logic ---

function mergeVideo(vault: VaultVideo): EnhancedVideo {
  const lib = libraryMap.get(vault.id)
  const stg = stagingMap.get(vault.id)

  return {
    id: vault.id,
    title: lib?.title || vault.title,
    author: lib?.author || vault.author || vault.channel || 'Unknown',
    url: vault.url,
    duration: vault.duration,
    category: lib?.category || vault.category || vault.topic || 'Uncategorized',
    tags: lib?.tags || vault.tags || [],
    description: lib?.description || '',
    personas: lib?.personas || (stg?.persona ? [stg.persona] : []),
    featured: lib?.featured || false,
    embeddable: vault.embeddable !== false,
    status: stg?.status || 'published',
    level: lib?.level || guessLevel(vault.duration),
  }
}

// Deduplicate by ID (vault has some duplicate IDs)
function deduplicateVideos(videos: EnhancedVideo[]): EnhancedVideo[] {
  const seen = new Set<string>()
  return videos.filter((v) => {
    if (seen.has(v.id)) return false
    seen.add(v.id)
    return true
  })
}

// --- Public API ---

let _allVideos: EnhancedVideo[] | null = null

export function getAllVideos(): EnhancedVideo[] {
  if (!_allVideos) {
    _allVideos = deduplicateVideos(
      (vaultData as VaultVideo[]).map(mergeVideo)
    )
  }
  return _allVideos
}

export function getVideoById(id: string): EnhancedVideo | undefined {
  return getAllVideos().find((v) => v.id === id)
}

export function getVideosByCategory(category: string): EnhancedVideo[] {
  return getAllVideos().filter((v) => v.category === category)
}

export function getVideosByPersona(persona: string): EnhancedVideo[] {
  return getAllVideos().filter((v) => v.personas.includes(persona))
}

export function getFeaturedVideos(): EnhancedVideo[] {
  return getAllVideos().filter((v) => v.featured)
}

export function getTrendingVideos(limit = 8): EnhancedVideo[] {
  // Featured first, then by category variety
  const featured = getFeaturedVideos()
  const rest = getAllVideos().filter((v) => !v.featured)
  return [...featured, ...rest].slice(0, limit)
}

export function getCategories(): CategorySummary[] {
  const videos = getAllVideos()
  const counts = new Map<string, number>()
  videos.forEach((v) => {
    counts.set(v.category, (counts.get(v.category) || 0) + 1)
  })

  const iconMap: Record<string, string> = {
    'AI Foundations': 'cpu',
    'AI Engineering': 'wrench',
    'AI Agents': 'bot',
    'Strategy & Business': 'trending-up',
    'Creator Economy': 'rocket',
    'Creative AI & Music': 'sparkles',
    'Mindset & Growth': 'activity',
    'AI Culture': 'laugh',
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      icon: iconMap[name] || 'play',
    }))
    .sort((a, b) => b.count - a.count)
}

export function getWatchlists(): Watchlist[] {
  return watchlistData
}

export function getWatchlistWithVideos(watchlistId: string): {
  watchlist: Watchlist
  videos: EnhancedVideo[]
} | null {
  const wl = watchlistData.find((w) => w.id === watchlistId)
  if (!wl) return null
  const allVideos = getAllVideos()
  const videos = wl.videoIds
    .map((id) => allVideos.find((v) => v.id === id))
    .filter(Boolean) as EnhancedVideo[]
  return { watchlist: wl, videos }
}

export function getRelatedBlogPosts(videoId: string): BlogCrossLink[] {
  if (!crossRefData?.videoToBlog) return []
  const slugs = crossRefData.videoToBlog[videoId] || []
  // Return minimal cross-link data
  return slugs.map((slug) => ({
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    videoIds: [videoId],
    category: '',
  }))
}

export function getVideoStats() {
  const videos = getAllVideos()
  const categories = getCategories()
  return {
    totalVideos: videos.length,
    totalCategories: categories.length,
    featuredCount: videos.filter((v) => v.featured).length,
    uniqueAuthors: new Set(videos.map((v) => v.author)).size,
  }
}

export function getEditorsPicks(): EnhancedVideo[] {
  return getAllVideos().filter((v) => v.featured)
}

export function getVideosByLevel(level: EnhancedVideo['level']): EnhancedVideo[] {
  return getAllVideos().filter((v) => v.level === level)
}
