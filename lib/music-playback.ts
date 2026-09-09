export interface PlaybackTrack {
  id: string
  title: string
  sunoId: string
  genre: string[]
  mood: string[]
  duration?: string
  streamUrl?: string
}

export const SUNO_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i

export function safeMediaUrl(value?: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined
  } catch { return undefined }
}

export function spotifyAlbumEmbed(value?: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    const match = url.pathname.match(/^\/album\/([A-Za-z0-9]{22})\/?$/)
    if (url.protocol !== 'https:' || url.hostname !== 'open.spotify.com' || url.port || url.username || url.password || !match) return undefined
    return `https://open.spotify.com/embed/album/${match[1]}?theme=0`
  } catch { return undefined }
}

/** Suggestions never change the current track. Unknown requests return no match. */
export function suggestTracks(tracks: PlaybackTrack[], request: string): PlaybackTrack[] {
  const terms = request.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  const tokens = terms.filter(t => t.length > 2 && !['music', 'song', 'songs', 'play', 'some', 'the', 'with', 'want'].includes(t))
  if (!tokens.length) return []
  const focus = tokens.some(t => ['focus', 'read', 'reading', 'study', 'work'].includes(t))
  return tracks.map(track => {
    const text = [track.title, ...track.genre, ...track.mood].join(' ').toLowerCase()
    const instrumental = /instrumental|solo piano|no vocals|wordless/.test(text)
    const matched = tokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0)
    const score = focus ? (instrumental ? matched + 1 : 0) : matched
    return { track, score }
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.track.id.localeCompare(b.track.id)).slice(0, 6).map(item => item.track)
}

export function routeMusicSuggestion(pathname: string): string | undefined {
  if (/^\/(blog|library|books)(\/|$)/.test(pathname)) return 'instrumental focus'
  if (/^\/arcanea(\/|$)/.test(pathname)) return 'arcanea'
  if (/^\/starlight(\/|$)/.test(pathname)) return 'starlight'
  return undefined
}

interface CatalogEntry {
  id: string
  title: string
  sunoId: string
  genre?: string[]
  status: string
  duration?: string
}
interface RegisteredTrack {
  sunoId: string
  inventoryId: string | null
  title: string
  status: string
  genre: string[]
  assetRefs: { audioUrl: string | null }
}
export interface VerifiedRendition {
  sunoId: string
  audioUrl: string
  sha256: string
  bytes: number
  durationSeconds: number
  codec: string
  rangeVerified: boolean
  decodeVerified: boolean
  verifiedAt: string
}

const OWNED_AUDIO_HOST = 'vbmwpibfe0yzx3fd.public.blob.vercel-storage.com'

/** No inferred CDN URLs: both registry identity and byte/decode evidence must agree. */
export function verifiedPlaybackUrl(track: RegisteredTrack, proof?: VerifiedRendition): string | undefined {
  if (!proof || track.status !== 'published' || !SUNO_ID.test(track.sunoId) || proof.sunoId !== track.sunoId ||
      proof.audioUrl !== track.assetRefs.audioUrl || !/^[a-f0-9]{64}$/.test(proof.sha256) ||
      !Number.isSafeInteger(proof.bytes) || proof.bytes <= 0 || !Number.isFinite(proof.durationSeconds) || proof.durationSeconds <= 0 || proof.codec !== 'mp3' ||
      !proof.rangeVerified || !proof.decodeVerified || !Number.isFinite(Date.parse(proof.verifiedAt))) return undefined
  const safe = safeMediaUrl(proof.audioUrl)
  if (!safe) return undefined
  const url = new URL(safe)
  return url.hostname === OWNED_AUDIO_HOST && !url.port && !url.search && !url.hash &&
    url.pathname === `/music/${track.sunoId}/${track.sunoId}.mp3` ? safe : undefined
}

export function buildPlaybackCatalog(entries: CatalogEntry[], registry: RegisteredTrack[], proofs: VerifiedRendition[]): PlaybackTrack[] {
  const tracks = new Map<string, PlaybackTrack>()
  for (const entry of entries) {
    if (entry.status !== 'published' || !SUNO_ID.test(entry.sunoId)) continue
    tracks.set(entry.sunoId, { id: entry.id, sunoId: entry.sunoId, title: entry.title.trim(), genre: entry.genre ?? [], mood: [], duration: entry.duration })
  }
  const proofById = new Map(proofs.map(proof => [proof.sunoId, proof]))
  for (const record of registry) {
    const proof = proofById.get(record.sunoId)
    const streamUrl = verifiedPlaybackUrl(record, proof)
    if (!streamUrl || !proof) continue
    const current = tracks.get(record.sunoId)
    const seconds = Math.round(proof.durationSeconds)
    tracks.set(record.sunoId, {
      id: current?.id ?? record.inventoryId ?? record.sunoId, sunoId: record.sunoId,
      title: current?.title ?? record.title.trim(), genre: current?.genre ?? record.genre,
      mood: [], streamUrl, duration: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`,
    })
  }
  return [...tracks.values()].sort((a, b) => Number(!!b.streamUrl) - Number(!!a.streamUrl))
}
