import inventory from '@/data/inventories/frankx/music.json'
import { homepageFeaturedRelease } from '@/data/homepage-featured-release'
import { SUNO_ID, safeMediaUrl, type PlaybackTrack } from '@/lib/music-playback'

/** Public projection only. The source exports, prompts and archive paths stay private. */
export function getPlaybackCatalog(): PlaybackTrack[] {
  const tracks: PlaybackTrack[] = inventory.tracks
    .filter(track => track.status === 'published' && SUNO_ID.test(track.sunoId))
    .map(track => ({
      id: track.id,
      title: track.title.trim(),
      sunoId: track.sunoId,
      genre: track.genre ?? [],
      mood: [],
      duration: track.duration,
    }))
  // Reuse the existing reviewed homepage source. Historical Blob URLs are not
  // promoted automatically; replace this compatibility source through the DAM
  // approval manifest after a verified export is available.
  const featured: PlaybackTrack = {
    id: homepageFeaturedRelease.id,
    title: homepageFeaturedRelease.title,
    sunoId: homepageFeaturedRelease.sunoId,
    genre: homepageFeaturedRelease.genre,
    mood: [],
    duration: homepageFeaturedRelease.duration,
    streamUrl: safeMediaUrl(homepageFeaturedRelease.audioUrl),
  }
  return [featured, ...tracks.filter(track => track.sunoId !== featured.sunoId)]
}
