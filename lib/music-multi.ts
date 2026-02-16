/**
 * Multi-tenant music data access layer
 *
 * Wraps the single-tenant lib/music.ts with client context.
 * For the owner (frankx), delegates directly to existing functions.
 * For other clients, loads from their namespaced inventory files.
 */

import { getClientById, getDefaultClient, getAllClients, type Client } from './clients'
import * as music from './music'
import type { Track, Album } from './music'

// Re-export types for convenience
export type { Track, Album }

// ── Client Music Access ────────────────────────────────────────────────────

// Cache for loaded client inventories (keyed by clientId)
const inventoryCache = new Map<string, { tracks: Track[]; albums: Album[] }>()

/**
 * Load music inventory for a client.
 * Owner (frankx) uses the existing music.ts data.
 * Other clients would load from their namespaced directory.
 */
function loadClientInventory(clientId: string): { tracks: Track[]; albums: Album[] } {
  // Check cache first
  const cached = inventoryCache.get(clientId)
  if (cached) return cached

  const client = getClientById(clientId)
  const defaultClient = getDefaultClient()

  // Owner uses existing data from lib/music.ts
  if (!client || client.isOwner || clientId === defaultClient.id) {
    const data = { tracks: music.getAllTracks(), albums: music.getAlbums() }
    inventoryCache.set(clientId, data)
    return data
  }

  // Future: dynamically load from client's inventory path
  // For now, return empty if client has no inventory yet
  const data = { tracks: [], albums: [] }
  inventoryCache.set(clientId, data)
  return data
}

// ── Track Functions ────────────────────────────────────────────────────────

export function getClientTracks(clientId: string): Track[] {
  return loadClientInventory(clientId).tracks
}

export function getClientTrackById(clientId: string, trackId: string): Track | undefined {
  return getClientTracks(clientId).find((t) => t.id === trackId)
}

export function getClientTracksByGenre(clientId: string, genre: string): Track[] {
  const lower = genre.toLowerCase()
  return getClientTracks(clientId).filter((t) =>
    t.genre?.some((g) => g.toLowerCase().includes(lower))
  )
}

export function getClientTopTracks(clientId: string, n: number = 10): Track[] {
  return [...getClientTracks(clientId)]
    .filter((t) => t.plays !== undefined)
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, n)
}

export function getClientFeaturedTracks(clientId: string): Track[] {
  return getClientTracks(clientId).filter((t) => t.section === 'featured')
}

// ── Album Functions ────────────────────────────────────────────────────────

export function getClientAlbums(clientId: string): Album[] {
  return loadClientInventory(clientId).albums
}

export function getClientAlbumById(clientId: string, albumId: string): Album | undefined {
  return getClientAlbums(clientId).find((a) => a.id === albumId)
}

export function getClientAlbumTracks(clientId: string, albumId: string): Track[] {
  const album = getClientAlbumById(clientId, albumId)
  if (!album) return []
  return album.trackIds
    .map((id) => getClientTrackById(clientId, id))
    .filter((t): t is Track => t !== undefined)
}

export function getClientPublishedAlbums(clientId: string): Album[] {
  return getClientAlbums(clientId).filter((a) => a.status !== 'archived')
}

// ── Stats ──────────────────────────────────────────────────────────────────

export function getClientMusicStats(clientId: string) {
  const client = getClientById(clientId)
  const tracks = getClientTracks(clientId)
  const albums = getClientAlbums(clientId)
  const defaultClient = getDefaultClient()

  // Owner gets rich stats from music.ts
  if (client?.isOwner || clientId === defaultClient.id) {
    return music.getMusicStats()
  }

  // Other clients get computed stats
  const totalPlays = tracks.reduce((sum, t) => sum + (t.plays || 0), 0)
  const totalLikes = tracks.reduce((sum, t) => sum + (t.likes || 0), 0)

  return {
    totalTracks: tracks.length,
    indexedTracks: tracks.length,
    followers: 0,
    hooks: '0',
    likes: String(totalLikes),
    playlists: 0,
    albums: albums.length,
    totalPlays,
    profileUrl: client?.social.suno || null,
  }
}

// ── Cross-Client Aggregation ───────────────────────────────────────────────

export function getPlatformStats() {
  const allClients = getAllClients()
  const activeClients = allClients.filter((c) => c.status === 'active')

  let totalTracks = 0
  let totalAlbums = 0

  for (const client of activeClients) {
    totalTracks += getClientTracks(client.id).length
    totalAlbums += getClientAlbums(client.id).length
  }

  return {
    totalClients: activeClients.length,
    totalTracks,
    totalAlbums,
  }
}
