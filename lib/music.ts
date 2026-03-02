import musicInventory from '@/data/inventories/frankx/music.json'
import albumsData from '@/data/albums.json'

// ── Types ──────────────────────────────────────────────────────────────────

export interface Track {
  id: string
  type: string
  title: string
  brand: string
  status: string
  tags: string[]
  platform: string
  sunoId?: string
  sunoUrl: string
  duration?: string
  genre?: string[]
  plays?: number
  likes?: number
  section?: string
  playlist?: string
  mood?: string[]
  bpm?: number
  relatedProduct?: string
  relatedContent?: string[]
  crossReference?: string
  audioUrl?: string
  coverUrl?: string
  waveformData?: number[]
}

export interface Album {
  id: string
  title: string
  subtitle: string
  description: string
  genre: string
  trackIds: string[]
  coverImage: string | null
  color: string
  price: number
  lemonSqueezyProductId: string | null
  playlistUrl: string | null
  releaseDate: string | null
  status: string
}

// ── Data Access ────────────────────────────────────────────────────────────

const tracks = musicInventory.tracks as Track[]
const albums = albumsData.albums as Album[]

export function getAllTracks(): Track[] {
  return tracks
}

export function getTrackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id)
}

export function getTracksBySunoId(sunoId: string): Track | undefined {
  return tracks.find((t) => t.sunoId === sunoId)
}

export function getTracksByGenre(genre: string): Track[] {
  const lower = genre.toLowerCase()
  return tracks.filter((t) => t.genre?.some((g) => g.toLowerCase().includes(lower)))
}

export function getTracksBySection(section: string): Track[] {
  return tracks.filter((t) => t.section === section)
}

export function getTracksByPlaylist(playlist: string): Track[] {
  return tracks.filter((t) => t.playlist === playlist)
}

export function getFeaturedTracks(): Track[] {
  return tracks.filter((t) => t.section === 'featured')
}

export function getTopTracks(n: number = 10): Track[] {
  return [...tracks]
    .filter((t) => t.plays !== undefined)
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, n)
}

// ── Albums ─────────────────────────────────────────────────────────────────

export function getAlbums(): Album[] {
  return albums
}

export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id)
}

export function getAlbumTracks(albumId: string): Track[] {
  const album = getAlbumById(albumId)
  if (!album) return []
  return album.trackIds
    .map((id) => getTrackById(id))
    .filter((t): t is Track => t !== undefined)
}

export function getPublishedAlbums(): Album[] {
  return albums.filter((a) => a.status !== 'archived')
}

// ── Analytics ──────────────────────────────────────────────────────────────

export interface TrackAnalytics {
  track: Track
  engagementRate: number
  rank: number
  tier: 'breakout' | 'strong' | 'growing' | 'new'
}

export function getTrackAnalytics(): TrackAnalytics[] {
  const sorted = [...tracks]
    .filter((t) => t.plays !== undefined)
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))

  return sorted.map((track, i) => {
    const plays = track.plays || 0
    const likes = track.likes || 0
    const engagementRate = plays > 0 ? (likes / plays) * 100 : 0
    const tier: TrackAnalytics['tier'] =
      plays >= 100 ? 'breakout' : plays >= 50 ? 'strong' : plays >= 20 ? 'growing' : 'new'
    return { track, engagementRate, rank: i + 1, tier }
  })
}

export function getGenreDistribution(): { genre: string; count: number; plays: number }[] {
  const genreMap = new Map<string, { count: number; plays: number }>()
  tracks.forEach((t) => {
    t.genre?.forEach((g) => {
      const entry = genreMap.get(g) || { count: 0, plays: 0 }
      entry.count++
      entry.plays += t.plays || 0
      genreMap.set(g, entry)
    })
  })
  return [...genreMap.entries()]
    .map(([genre, data]) => ({ genre, ...data }))
    .sort((a, b) => b.plays - a.plays)
}

export function getAlbumAnalytics() {
  return albums.map((album) => {
    const albumTracks = getAlbumTracks(album.id)
    const totalPlays = albumTracks.reduce((sum, t) => sum + (t.plays || 0), 0)
    const totalLikes = albumTracks.reduce((sum, t) => sum + (t.likes || 0), 0)
    const engagementRate = totalPlays > 0 ? (totalLikes / totalPlays) * 100 : 0
    return { album, trackCount: albumTracks.length, totalPlays, totalLikes, engagementRate }
  })
}

export function getPlaylistAnalytics() {
  const playlists = musicInventory._playlists
  return playlists.map((p: { name: string; songs: number; url: string }) => {
    const playlistTracks = getTracksByPlaylist(p.name)
    const totalPlays = playlistTracks.reduce((sum, t) => sum + (t.plays || 0), 0)
    return { ...p, tracksIndexed: playlistTracks.length, totalPlays }
  })
}

export function getDistroKidCandidates(): TrackAnalytics[] {
  return getTrackAnalytics()
    .filter((a) => a.track.sunoId && a.track.duration)
    .filter((a) => (a.track.plays || 0) >= 20 || a.engagementRate >= 25)
    .sort((a, b) => {
      const scoreA = (a.track.plays || 0) * 0.6 + a.engagementRate * 4
      const scoreB = (b.track.plays || 0) * 0.6 + b.engagementRate * 4
      return scoreB - scoreA
    })
}

// ── Stats ──────────────────────────────────────────────────────────────────

/** Parse Suno's abbreviated numbers: "17K" → 17000, "1.4K" → 1400, "2.3M" → 2300000 */
function parseAbbreviatedNumber(value: string | number | undefined): number {
  if (typeof value === 'number') return value
  if (!value) return 0
  const str = String(value).trim()
  const match = str.match(/^([\d.]+)\s*([KkMm]?)$/)
  if (!match) return parseInt(str, 10) || 0
  const num = parseFloat(match[1])
  const suffix = match[2].toUpperCase()
  if (suffix === 'K') return Math.round(num * 1000)
  if (suffix === 'M') return Math.round(num * 1000000)
  return Math.round(num)
}

export function getMusicStats() {
  const profileStats = musicInventory._profileStats
  const totalPlays = tracks.reduce((sum, t) => sum + (t.plays || 0), 0)
  return {
    totalTracks: musicInventory._count,
    indexedTracks: musicInventory._count,
    followers: profileStats.followers,
    totalPlays,
    totalHooks: parseAbbreviatedNumber(profileStats.hooks),
    totalLikes: parseAbbreviatedNumber(profileStats.likes),
    playlists: musicInventory._playlists.length,
    albums: albums.length,
    profileUrl: musicInventory._sunoProfileUrl,
  }
}

export function getPlaylists() {
  return musicInventory._playlists
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function getSunoEmbedUrl(sunoId: string): string {
  return `https://suno.com/embed/${sunoId}`
}

export function getSunoSongUrl(sunoId: string): string {
  return `https://suno.com/song/${sunoId}`
}

export function getSunoCdnUrl(sunoId: string): string {
  return `https://cdn1.suno.ai/${sunoId}.mp3`
}

export function getPlayableTracks(): Track[] {
  return tracks.filter((t) => t.audioUrl || t.sunoId)
}

export function getAllGenres(): string[] {
  const genreSet = new Set<string>()
  tracks.forEach((t) => t.genre?.forEach((g) => genreSet.add(g)))
  return [...genreSet].sort()
}
