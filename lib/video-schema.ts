import type { EnhancedVideo, VideoAnnotation, VideoObjectSchema, ClipSchema } from './video-types'

/**
 * Converts a duration string like "2:25:00" or "0:45:00" to ISO 8601 (PT2H25M0S)
 */
export function durationToISO8601(duration: string): string {
  if (!duration || duration === 'LIVE') return ''
  const parts = duration.split(':').map(Number)

  if (parts.length === 3) {
    const [h, m, s] = parts
    return `PT${h > 0 ? `${h}H` : ''}${m > 0 ? `${m}M` : ''}${s > 0 ? `${s}S` : ''}`
  }
  if (parts.length === 2) {
    const [m, s] = parts
    return `PT${m > 0 ? `${m}M` : ''}${s > 0 ? `${s}S` : ''}`
  }
  return ''
}

/**
 * Converts "MM:SS" or "H:MM:SS" to total seconds
 */
export function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return 0
}

/**
 * Builds a single VideoObject schema for one video
 */
export function buildVideoObjectSchema(
  video: EnhancedVideo,
  annotations?: VideoAnnotation
): VideoObjectSchema {
  const schema: VideoObjectSchema = {
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || `${video.title} by ${video.author}`,
    thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
  }

  const isoDuration = durationToISO8601(video.duration)
  if (isoDuration) {
    schema.duration = isoDuration
  }

  // Add Clip schema for annotated timestamps
  if (annotations?.timestamps?.length) {
    schema.hasPart = annotations.timestamps
      .filter((ts) => ts.type === 'chapter' || ts.type === 'highlight')
      .map((ts) => ({
        '@type': 'Clip' as const,
        name: ts.label,
        startOffset: ts.seconds,
        url: `https://www.youtube.com/watch?v=${video.id}&t=${ts.seconds}`,
      }))
  }

  return schema
}

/**
 * Builds a full JSON-LD @graph for the /watch page
 * Includes BreadcrumbList + top VideoObject entries
 */
export function buildVideoListSchema(
  videos: EnhancedVideo[],
  limit = 20
): Record<string, unknown> {
  const videoSchemas = videos.slice(0, limit).map((v) => buildVideoObjectSchema(v))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://frankx.ai',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Video Vault',
            item: 'https://frankx.ai/watch',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'Video Vault — Curated AI & Creator Intelligence',
        description: `${videos.length}+ curated videos on AI engineering, agents, music production, and creator economy.`,
        url: 'https://frankx.ai/watch',
        numberOfItems: videos.length,
        publisher: {
          '@type': 'Person',
          name: 'FrankX',
          url: 'https://frankx.ai',
        },
      },
      ...videoSchemas,
    ],
  }
}

/**
 * Builds inline VideoObject schema for a single YouTube embed in a blog post
 */
export function buildInlineVideoSchema(videoId: string, title?: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title || `Video ${videoId}`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  }
}
