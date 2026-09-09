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
