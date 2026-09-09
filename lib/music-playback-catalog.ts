import inventory from '@/data/inventories/frankx/music.json'
import registry from '@/data/music-asset-registry.json'
import verified from '@/data/music-playback-sources.json'
import { buildPlaybackCatalog } from '@/lib/music-playback'

/** Public metadata only. Native playback requires a verified, registered export. */
export function getPlaybackCatalog() {
  return buildPlaybackCatalog(inventory.tracks, registry.tracks, verified.tracks)
}
