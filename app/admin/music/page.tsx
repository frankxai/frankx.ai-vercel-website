import type { Metadata } from 'next'
import { MusicDashboardClient } from './MusicDashboardClient'
import {
  getMusicStats,
  getTrackAnalytics,
  getGenreDistribution,
  getAlbumAnalytics,
  getPlaylistAnalytics,
  getDistroKidCandidates,
  getAllTracks,
  getPlaylists,
} from '@/lib/music'

export const metadata: Metadata = {
  title: 'Music Dashboard — Admin | FrankX',
  robots: { index: false, follow: false },
}

export default function MusicDashboardPage() {
  const stats = getMusicStats()
  const trackAnalytics = getTrackAnalytics()
  const genreDistribution = getGenreDistribution()
  const albumAnalytics = getAlbumAnalytics()
  const playlistAnalytics = getPlaylistAnalytics()
  const distroKidCandidates = getDistroKidCandidates()
  const allTracks = getAllTracks()
  const playlists = getPlaylists()

  // Serialize for client component
  const serializedData = {
    stats,
    trackAnalytics: trackAnalytics.map((a) => ({
      id: a.track.id,
      title: a.track.title,
      genre: a.track.genre || [],
      plays: a.track.plays || 0,
      likes: a.track.likes || 0,
      duration: a.track.duration || '',
      sunoId: a.track.sunoId || '',
      sunoUrl: a.track.sunoUrl,
      section: a.track.section || '',
      tags: a.track.tags,
      engagementRate: a.engagementRate,
      rank: a.rank,
      tier: a.tier,
    })),
    genreDistribution,
    albumAnalytics: albumAnalytics.map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      genre: a.genre,
      color: a.color,
      price: a.price,
      status: a.status,
      trackCount: a.trackIds.length,
      resolvedCount: a.resolvedTracks.length,
      totalPlays: a.totalPlays,
      totalLikes: a.totalLikes,
      avgEngagement: a.avgEngagement,
      missingTracks: a.missingTracks,
      playlistUrl: a.playlistUrl,
      lemonSqueezyProductId: a.lemonSqueezyProductId,
      coverImage: a.coverImage,
    })),
    playlistAnalytics: playlistAnalytics.map((p) => ({
      name: p.name,
      songs: p.songs,
      url: p.url,
      matchedTracks: p.matchedTracks.length,
    })),
    distroKidCandidates: distroKidCandidates.slice(0, 15).map((a) => ({
      id: a.track.id,
      title: a.track.title,
      genre: a.track.genre || [],
      plays: a.track.plays || 0,
      likes: a.track.likes || 0,
      duration: a.track.duration || '',
      sunoId: a.track.sunoId || '',
      engagementRate: a.engagementRate,
      rank: a.rank,
      tier: a.tier,
    })),
    totalTracksInInventory: allTracks.length,
    totalPlaylists: playlists.length,
  }

  return <MusicDashboardClient data={serializedData} />
}
