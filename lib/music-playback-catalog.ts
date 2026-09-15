import inventory from '@/data/inventories/frankx/music.json'
import registry from '@/data/music-asset-registry.json'
import verified from '@/data/music-playback-sources.json'
import { homepageFeaturedRelease } from '@/data/homepage-featured-release'
import { goldenTracks } from '@/data/hoffnung-golden-tracks'
import { buildPlaybackCatalog, withVerifiedStreams } from '@/lib/music-playback'

/** Public metadata only. Native playback requires a verified, registered export. */
export function getPlaybackCatalog() {
  return buildPlaybackCatalog(
    [...inventory.tracks, { ...homepageFeaturedRelease, status: 'published' }],
    registry.tracks,
    verified.tracks,
  )
}

/** Golden Frequencies tracks for /hoffnung, each with an owned stream URL when its export is verified. */
export function getGoldenFrequencyTracks() {
  return withVerifiedStreams(goldenTracks, registry.tracks, verified.tracks)
}
