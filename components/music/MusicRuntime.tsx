'use client'

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SUNO_ID, routeMusicSuggestion, safeMediaUrl, suggestTracks, type PlaybackTrack } from '@/lib/music-playback'

interface MusicContextValue {
  selectSuno: (sunoId: string, title: string) => void
  activeSunoId?: string
  open: () => void
  stop: () => void
}
const MusicContext = createContext<MusicContextValue | null>(null)
export const useMusicRuntime = () => useContext(MusicContext)

export function MusicLoadButton({ sunoId, title, className = '' }: { sunoId: string; title: string; className?: string }) {
  const music = useMusicRuntime()
  if (!SUNO_ID.test(sunoId)) return null
  return music ? (
    <button type="button" className={`min-h-11 rounded-full border border-emerald-400/30 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${className}`}
      onClick={() => music.selectSuno(sunoId, title)} aria-label={`Load ${title} in the music player`}>
      {music.activeSunoId === sunoId ? 'Open player' : 'Listen here'}
    </button>
  ) : <a href={`https://suno.com/song/${sunoId}`} target="_blank" rel="noopener noreferrer" className={className}>Listen on Suno</a>
}

/** Mount once in the root layout. Never key this component by pathname. */
export function MusicRuntime({ children, catalog }: { children: ReactNode; catalog: PlaybackTrack[] }) {
  const [active, setActive] = useState<PlaybackTrack | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [request, setRequest] = useState('')
  const [searched, setSearched] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useEmbed, setUseEmbed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const requestId = useId()
  const panelId = useId()
  const pathname = usePathname()
  const suggestion = routeMusicSuggestion(pathname)
  const results = searched ? suggestTracks(catalog, request) : catalog.slice(0, 6)
  const nativeUrl = !useEmbed ? safeMediaUrl(active?.streamUrl) : undefined

  function select(track: PlaybackTrack) {
    setExpanded(true)
    if (active?.sunoId === track.sunoId) return
    document.dispatchEvent(new Event('frankx:music-focus'))
    document.querySelectorAll('audio,video').forEach(node => { if (node instanceof HTMLMediaElement) node.pause() })
    setPlaying(false)
    setError(null)
    setUseEmbed(false)
    setActive(track)
  }
  function stop() {
    audioRef.current?.pause()
    setActive(null)
    setPlaying(false)
    setError(null)
    setUseEmbed(false)
  }
  function selectSuno(sunoId: string, title: string) {
    if (!SUNO_ID.test(sunoId)) return
    select(catalog.find(track => track.sunoId === sunoId) ?? { id: sunoId, sunoId, title, genre: [], mood: [] })
  }
  async function toggle() {
    const audio = audioRef.current
    if (!audio || !nativeUrl) { setExpanded(true); return }
    if (!audio.paused) { audio.pause(); return }
    try { await audio.play(); setError(null) }
    catch { setError('Playback could not start. Try again or open the track on Suno.') }
  }

  // Other native media (including the existing homepage player) yields this
  // runtime. No cross-origin iframe control or fabricated playback state.
  useEffect(() => {
    const onOtherPlay = (event: Event) => {
      if (event.target instanceof HTMLMediaElement && event.target !== audioRef.current) {
        audioRef.current?.pause()
        if (!nativeUrl) setActive(null)
        document.dispatchEvent(new Event('frankx:music-focus'))
      }
    }
    document.addEventListener('play', onOtherPlay, true)
    return () => document.removeEventListener('play', onOtherPlay, true)
  }, [nativeUrl])

  // Start is always a listener gesture; navigation never invokes play/select.
  useEffect(() => {
    if (!('mediaSession' in navigator) || !('MediaMetadata' in window) || !nativeUrl || !active) return
    navigator.mediaSession.metadata = new MediaMetadata({ title: active.title, artist: 'FrankX' })
    const onPlay = () => { void audioRef.current?.play().catch(() => setError('Tap Play to continue.')) }
    const onPause = () => audioRef.current?.pause()
    for (const [action, handler] of [['play', onPlay], ['pause', onPause]] as const) {
      try { navigator.mediaSession.setActionHandler(action, handler) } catch { /* optional browser capability */ }
    }
    return () => {
      navigator.mediaSession.metadata = null
      for (const action of ['play', 'pause'] as const) {
        try { navigator.mediaSession.setActionHandler(action, null) } catch { /* optional */ }
      }
    }
  }, [active, nativeUrl])

  return (
    <MusicContext.Provider value={{ selectSuno, activeSunoId: active?.sunoId, open: () => setExpanded(true), stop }}>
      {children}
      <div aria-hidden="true" className="h-24" />
      <aside aria-label="Music player" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/15 bg-[#0a0a0b] text-white shadow-xl sm:inset-x-auto sm:right-5 sm:w-[min(34rem,calc(100vw-2.5rem))]" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex min-h-14 items-center gap-2 px-3 py-2">
          <button type="button" onClick={() => setExpanded(value => !value)} aria-controls={panelId} aria-expanded={expanded}
            className="min-h-11 min-w-0 flex-1 rounded-lg px-2 text-left focus-visible:outline focus-visible:outline-emerald-300">
            <span className="block truncate text-sm font-medium">{active?.title || 'Listen while you explore'}</span>
            <span className="block text-xs text-white/65">{active ? (nativeUrl ? (playing ? 'Playing' : 'Ready to listen') : 'Suno player') : 'Your soundtrack, your choice'}</span>
          </button>
          {active && nativeUrl && <button type="button" onClick={() => { void toggle() }} aria-label={playing ? 'Pause music' : 'Play music'} className="min-h-11 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-[#0a0a0b]">{playing ? 'Pause' : 'Play'}</button>}
          {active && <button type="button" onClick={stop} className="min-h-11 rounded-lg px-3 text-sm text-white/80" aria-label="Stop music">Stop</button>}
        </div>
        {/* Keep the media node mounted when collapsed and across route changes. */}
        <div id={panelId} hidden={!expanded} className="max-h-[70dvh] overflow-y-auto border-t border-white/10 p-4">
          {active && nativeUrl && <audio ref={audioRef} src={nativeUrl} controls preload="none" className="mb-4 w-full"
            onPlay={() => { setPlaying(true); document.dispatchEvent(new Event('frankx:music-focus')); document.querySelectorAll('audio,video').forEach(node => { if (node !== audioRef.current && node instanceof HTMLMediaElement) node.pause() }) }}
            onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
            onError={() => { setPlaying(false); setError('This audio source is unavailable. Open the Suno player or track link.') }} />}
          {active && !nativeUrl && <iframe key={active.sunoId} title={`${active.title} — Suno player`} src={`https://suno.com/embed/${active.sunoId}`} width="100%" height="240" className="mb-3 rounded-xl border-0" allow="autoplay; clipboard-write" />}
          {error && <p role="status" className="mb-3 text-sm text-amber-200">{error}</p>}
          {active && <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
            <a href={`https://suno.com/song/${active.sunoId}`} target="_blank" rel="noopener noreferrer" className="text-emerald-200 underline underline-offset-4">Open on Suno</a>
            {nativeUrl && error && <button type="button" onClick={() => { audioRef.current?.pause(); setUseEmbed(true); setError(null) }} className="min-h-11 underline">Use Suno player</button>}
          </div>}
          {suggestion && <button type="button" className="mb-3 min-h-11 rounded-full border border-white/20 px-3 text-sm" onClick={() => { setRequest(suggestion); setSearched(true) }}>Suggest {suggestion}</button>}
          <form onSubmit={event => { event.preventDefault(); setSearched(true) }}>
            <label htmlFor={requestId} className="mb-2 block text-sm text-white/80">Find a soundtrack</label>
            <div className="flex gap-2">
              <input id={requestId} value={request} onChange={event => setRequest(event.target.value)} placeholder="Piano, Arcanea, tech house…" className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/25 bg-white/5 px-3 text-base focus-visible:outline focus-visible:outline-emerald-300" />
              <button type="submit" className="min-h-11 rounded-lg bg-white/10 px-4 text-sm">Find</button>
            </div>
          </form>
          <ul className="mt-3 divide-y divide-white/10">
            {results.map(track => <li key={track.sunoId}><button type="button" onClick={() => select(track)} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-2 py-3 text-left hover:bg-white/5 focus-visible:outline focus-visible:outline-emerald-300" aria-label={`Load ${track.title}`}>
              <span className="min-w-0 text-sm">{track.title}</span><span className="shrink-0 text-xs text-white/65">{track.duration}</span>
            </button></li>)}
          </ul>
          {searched && !results.length && <p role="status" className="mt-3 text-sm text-white/80">No catalog match yet. Try a title or genre.</p>}
          <button type="button" onClick={() => setExpanded(false)} className="mt-3 min-h-11 w-full rounded-lg border border-white/15 text-sm">Minimize player</button>
        </div>
      </aside>
    </MusicContext.Provider>
  )
}
