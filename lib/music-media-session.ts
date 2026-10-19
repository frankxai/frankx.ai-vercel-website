import type { PlaybackTrack } from './music-playback'

/** Optional browser integration; all calls originate in client effects. */
export function bindMusicMediaSession(track: PlaybackTrack, handlers: { play: () => void; pause: () => void; stop: () => void }) {
  if (!('mediaSession' in navigator) || !('MediaMetadata' in window)) return
  const session = navigator.mediaSession
  session.metadata = new MediaMetadata({ title: track.title, artist: 'FrankX' })
  for (const action of ['play', 'pause', 'stop'] as const) {
    try { session.setActionHandler(action, handlers[action]) } catch { /* unsupported browser action */ }
  }
  return () => {
    session.metadata = null
    for (const action of ['play', 'pause', 'stop'] as const) {
      try { session.setActionHandler(action, null) } catch { /* unsupported browser action */ }
    }
  }
}

export function updateMusicMediaSessionState(state: MediaSessionPlaybackState) {
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = state
}
