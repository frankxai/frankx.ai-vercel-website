import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getClientById, getAllClients, type Client } from '@/lib/clients'
import {
  getClientTopTracks,
  getClientAlbums,
  getClientAlbumTracks,
  getClientMusicStats,
  type Track,
  type Album,
} from '@/lib/music-multi'
import { ArtistPageClient } from './client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const clients = getAllClients()
  return clients
    .filter((c) => c.status === 'active' && !c.isOwner)
    .map((c) => ({ slug: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const client = getClientById(slug)

  if (!client) {
    return { title: 'Artist Not Found' }
  }

  return {
    title: `${client.artistName} — Music | FrankX Music Service`,
    description: `Listen to AI-generated music by ${client.artistName}. ${client.branding.tagline}`,
    openGraph: {
      title: `${client.artistName} — Music`,
      description: `Listen to AI-generated music by ${client.artistName}.`,
    },
  }
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params
  const client = getClientById(slug)

  if (!client || client.status !== 'active') {
    notFound()
  }

  // Owner redirects to /music — their own page
  if (client.isOwner) {
    notFound()
  }

  const topTracks = getClientTopTracks(client.id, 6)
  const albums = getClientAlbums(client.id)
  const stats = getClientMusicStats(client.id)

  // Pre-resolve album tracks for each album
  const albumsWithTracks = albums.map((album) => ({
    album,
    tracks: getClientAlbumTracks(client.id, album.id),
  }))

  return (
    <ArtistPageClient
      client={client}
      topTracks={topTracks}
      albumsWithTracks={albumsWithTracks}
      stats={stats}
    />
  )
}
