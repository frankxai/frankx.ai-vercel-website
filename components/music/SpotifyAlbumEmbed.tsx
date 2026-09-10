'use client'

import { useEffect, useState } from 'react'
import { spotifyAlbumEmbed } from '@/lib/music-playback'
import { useMusicRuntime } from '@/components/music/MusicRuntime'

export function SpotifyAlbumEmbed({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false)
  const music = useMusicRuntime()
  useEffect(() => {
    const yieldPlayback = () => setLoaded(false)
    document.addEventListener('frankx:music-focus', yieldPlayback)
    return () => document.removeEventListener('frankx:music-focus', yieldPlayback)
  }, [])
  const src = spotifyAlbumEmbed(url)
  if (!src) return null
  return loaded ? <iframe title={`${title} on Spotify`} src={src} width="100%" height="352" className="rounded-xl border-0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /> : (
    <button type="button" onClick={() => { music?.stop(); document.dispatchEvent(new Event('frankx:music-focus')); setLoaded(true) }} className="min-h-11 rounded-full border border-emerald-400/30 px-4 py-2 text-sm text-emerald-200">Listen to {title} on Spotify</button>
  )
}
