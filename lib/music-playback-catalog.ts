import inventory from '@/data/inventories/frankx/music.json'
import registry from '@/data/music-asset-registry.json'
import verified from '@/data/music-playback-sources.json'
import { homepageFeaturedRelease } from '@/data/homepage-featured-release'
import { goldenTracks } from '@/data/hoffnung-golden-tracks'
import { buildPlaybackCatalog, safeMediaUrl, withVerifiedStreams } from '@/lib/music-playback'

/** Public metadata only. Native playback requires a verified, registered export. */
export function getPlaybackCatalog() {
  return buildPlaybackCatalog(
    [...inventory.tracks, { ...homepageFeaturedRelease, status: 'published' }],
    registry.tracks,
    verified.tracks,
  )
}

/**
 * Tracks with a verified owned stream, in catalog order. The site-wide player gets only these
 * in the page payload; the full catalog is served from /api/music/catalog for search.
 */
export function getPlayableCatalog() {
  return getPlaybackCatalog().filter(track => safeMediaUrl(track.streamUrl))
}

/** Golden Frequencies tracks for /hoffnung, each with an owned stream URL when its export is verified. */
export function getGoldenFrequencyTracks() {
  return withVerifiedStreams(goldenTracks, registry.tracks, verified.tracks)
}
