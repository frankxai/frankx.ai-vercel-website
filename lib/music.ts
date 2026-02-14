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

// ── Stats ──────────────────────────────────────────────────────────────────

export function getMusicStats() {
  const profileStats = musicInventory._profileStats
  return {
    totalTracks: musicInventory._estimatedTotal,
    indexedTracks: musicInventory._count,
    followers: profileStats.followers,
    hooks: profileStats.hooks,
    likes: profileStats.likes,
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

export function getAllGenres(): string[] {
  const genreSet = new Set<string>()
  tracks.forEach((t) => t.genre?.forEach((g) => genreSet.add(g)))
  return [...genreSet].sort()
}
