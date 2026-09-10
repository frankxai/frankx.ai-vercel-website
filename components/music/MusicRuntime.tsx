'use client'

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { bindMusicMediaSession, updateMusicMediaSessionState } from '@/lib/music-media-session'
import { SUNO_ID, routeMusicSuggestion, safeMediaUrl, suggestTracks, type PlaybackTrack } from '@/lib/music-playback'

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'error'
interface MusicContextValue {
  selectSuno: (sunoId: string, title: string) => void
  canPlay: (sunoId: string) => boolean
  activeSunoId?: string
  open: () => void
  stop: () => void
}
const MusicContext = createContext<MusicContextValue | null>(null)
export const useMusicRuntime = () => useContext(MusicContext)

export function MusicLoadButton({ sunoId, title, className = '' }: { sunoId: string; title: string; className?: string }) {
  const music = useMusicRuntime()
  if (!SUNO_ID.test(sunoId)) return null
  const classes = `inline-flex min-h-11 items-center rounded-full border border-emerald-400/30 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${className}`
  return music?.canPlay(sunoId) ? (
    <button type="button" className={classes} onClick={() => music.selectSuno(sunoId, title)} aria-label={`Play ${title}`}>
      {music.activeSunoId === sunoId ? 'Open player' : 'Play here'}
    </button>
  ) : <a href={`https://suno.com/song/${sunoId}`} target="_blank" rel="noopener noreferrer" onClick={() => music?.stop()} className={classes} aria-label={`Listen to ${title} on Suno`}>Listen on Suno</a>
}

/** One persistent native media element. Sources are assigned during the listener's click. */
export function MusicRuntime({ children, catalog }: { children: ReactNode; catalog: PlaybackTrack[] }) {
  const [active, setActive] = useState<PlaybackTrack | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [request, setRequest] = useState('')
  const [searched, setSearched] = useState(false)
  const [browseAll, setBrowseAll] = useState(false)
  const [state, setState] = useState<PlaybackState>('idle')
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const activeRef = useRef<PlaybackTrack | null>(null)
  const attemptRef = useRef(0)
  const requestId = useId()
  const panelId = useId()
  const suggestion = routeMusicSuggestion(usePathname())
  const playable = catalog.filter(track => safeMediaUrl(track.streamUrl))
  const results = searched ? suggestTracks(catalog, request) : browseAll ? playable : playable.slice(0, 6)

  function minimize() {
    setExpanded(false)
    disclosureRef.current?.focus()
  }
  function clearSearch() {
    setRequest('')
    setSearched(false)
    searchRef.current?.focus()
  }

  const yieldOtherMedia = useCallback(() => {
    document.dispatchEvent(new Event('frankx:music-focus'))
    document.querySelectorAll('audio,video').forEach(node => {
      if (node !== audioRef.current && node instanceof HTMLMediaElement) node.pause()
    })
  }, [])
  const fail = useCallback((message: string) => {
    attemptRef.current += 1
    audioRef.current?.pause()
    setState('error')
    setError(message)
  }, [])
  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !activeRef.current) return
    const attempt = ++attemptRef.current
    yieldOtherMedia()
    setError(null)
    setState('loading')
    // Do not await metadata or an effect: retain the originating user activation.
    void audio.play().catch(reason => {
      if (attempt !== attemptRef.current || reason?.name === 'AbortError') return
      fail(reason?.name === 'NotAllowedError' ? 'Your browser paused playback. Tap Play to try again.' : 'This track is unavailable right now. Try another track or listen on Suno.')
    })
  }, [fail, yieldOtherMedia])
  function select(track: PlaybackTrack) {
    const url = safeMediaUrl(track.streamUrl)
    const audio = audioRef.current
    if (!url || !audio) return
    setExpanded(true)
    if (activeRef.current?.sunoId === track.sunoId) {
      if (audio.paused) start()
      return
    }
    attemptRef.current += 1
    audio.pause()
    activeRef.current = track
    setActive(track)
    audio.src = url
    audio.load()
    start()
  }
  const stop = useCallback(() => {
    attemptRef.current += 1
    activeRef.current = null
    audioRef.current?.pause()
    audioRef.current?.removeAttribute('src')
    audioRef.current?.load()
    setActive(null)
    setState('idle')
    setError(null)
  }, [])
  function toggle() {
    const audio = audioRef.current
    if (!audio || !activeRef.current) return
    if (!audio.paused) { attemptRef.current += 1; audio.pause(); setState('paused') }
    else start()
  }

  useEffect(() => {
    const onOtherPlay = (event: Event) => {
      if (event.target instanceof HTMLMediaElement && event.target !== audioRef.current) {
        attemptRef.current += 1
        audioRef.current?.pause()
        if (activeRef.current) setState('paused')
        document.dispatchEvent(new Event('frankx:music-focus'))
      }
    }
    document.addEventListener('play', onOtherPlay, true)
    return () => document.removeEventListener('play', onOtherPlay, true)
  }, [])

  useEffect(() => {
    if (state !== 'loading') return
    const timeout = window.setTimeout(() => fail('Playback is taking too long. Try another track or listen on Suno.'), 15000)
    return () => window.clearTimeout(timeout)
  }, [state, active?.sunoId, fail])

  useEffect(() => {
    if (!active) return
    return bindMusicMediaSession(active, { play: start, pause: () => audioRef.current?.pause(), stop })
  }, [active, start, stop])

  useEffect(() => {
    updateMusicMediaSessionState(!active ? 'none' : state === 'playing' ? 'playing' : 'paused')
  }, [active, state])

  const subtitle = state === 'error' ? 'Playback unavailable' : state === 'loading' ? 'Loading audio…' : state === 'playing' ? 'Playing' : 'Paused'
  return (
    <MusicContext.Provider value={{
      selectSuno: id => { const track = playable.find(item => item.sunoId === id); if (track) select(track) },
      canPlay: id => playable.some(track => track.sunoId === id), activeSunoId: active?.sunoId,
      open: () => setExpanded(true), stop,
    }}>
      {children}
      <div aria-hidden="true" className="h-24" />
      <aside aria-label="Music player" onKeyDown={event => { if (event.key === 'Escape' && expanded) { event.preventDefault(); event.stopPropagation(); minimize() } }} className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0b] text-white sm:inset-x-auto sm:right-5 sm:w-[min(34rem,calc(100vw-2.5rem))]" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex min-h-14 items-center gap-1 px-3 py-2">
          <button ref={disclosureRef} type="button" onClick={() => setExpanded(value => !value)} aria-controls={panelId} aria-expanded={expanded} className="min-h-11 min-w-0 flex-1 rounded-lg px-2 text-left focus-visible:outline focus-visible:outline-emerald-300">
            <span className="block truncate text-sm font-medium">{active?.title || 'Music by FrankX'}</span>
            <span className="block text-xs text-white/65" aria-live="polite">{active ? subtitle : 'Choose a soundtrack'}</span>
          </button>
          {active && <button type="button" onClick={toggle} aria-label={state === 'playing' || state === 'loading' ? 'Pause music' : 'Play music'} className="min-h-11 rounded-full bg-emerald-300 px-4 text-sm font-semibold text-[#0a0a0b]">{state === 'playing' || state === 'loading' ? 'Pause' : 'Play'}</button>}
          {active && <button type="button" onClick={stop} className="min-h-11 rounded-lg px-2 text-sm text-white/80" aria-label="Stop music">Stop</button>}
          {expanded && <button type="button" onClick={minimize} aria-label="Minimize player" className="min-h-11 min-w-11 rounded-lg text-xl text-white/80">−</button>}
        </div>
        <div id={panelId} hidden={!expanded} className="max-h-[55dvh] overflow-y-auto overscroll-contain border-t border-white/10 p-4">
          {/* Always mounted; no src exists before a verified track is selected. */}
          <audio ref={audioRef} controls preload="none" hidden={!active} className="mb-3 w-full"
            onPlay={() => { if (activeRef.current) { yieldOtherMedia(); setState('loading') } }}
            onPlaying={() => { if (activeRef.current) { setState('playing'); setError(null) } }}
            onWaiting={() => { if (activeRef.current && !audioRef.current?.paused) setState('loading') }}
            onPause={() => { if (activeRef.current && audioRef.current?.paused) setState(current => current === 'error' ? current : 'paused') }}
            onEnded={() => { if (activeRef.current) setState('paused') }}
            onError={() => { if (activeRef.current && audioRef.current?.getAttribute('src')) fail('This track is unavailable right now. Try another track or listen on Suno.') }} />
          {error && <p role="status" className="mb-3 text-sm text-amber-200">{error}</p>}
          {active && <a href={`https://suno.com/song/${active.sunoId}`} target="_blank" rel="noopener noreferrer" onClick={stop} className="mb-4 inline-flex min-h-11 items-center text-sm text-emerald-200 underline underline-offset-4">Listen on Suno</a>}
          {suggestion && <button type="button" className="mb-3 min-h-11 rounded-full border border-white/20 px-3 text-sm" onClick={() => { setRequest(suggestion); setSearched(true) }}>Suggest {suggestion}</button>}
          <form onSubmit={event => { event.preventDefault(); setSearched(true) }}>
            <label htmlFor={requestId} className="mb-2 block text-sm text-white/80">Find a soundtrack</label>
            <div className="flex gap-2">
              <input ref={searchRef} id={requestId} value={request} onChange={event => setRequest(event.target.value)} placeholder="Piano, Arcanea, tech house…" className="min-h-11 min-w-0 flex-1 rounded-xl border border-white/25 bg-white/5 px-3 text-base focus-visible:outline focus-visible:outline-emerald-300" />
              <button type="submit" className="min-h-11 rounded-full bg-white/10 px-4 text-sm">Find</button>
            </div>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-full border border-white/20 px-3 text-sm focus-visible:outline focus-visible:outline-emerald-300" onClick={() => { setBrowseAll(searched || !browseAll); setSearched(false); setRequest('') }}>{browseAll && !searched ? 'Show a short list' : `Browse ${playable.length} tracks`}</button>
            {searched && <button type="button" onClick={clearSearch} className="min-h-11 rounded-full px-3 text-sm text-white/80 focus-visible:outline focus-visible:outline-emerald-300">Clear search</button>}
          </div>
          <p className="mt-4 text-xs text-white/65">{searched ? 'Matching tracks' : browseAll ? `${playable.length} tracks to play here` : 'Play here'}</p>
          <ul className="mt-1 divide-y divide-white/10">
            {results.map(track => <li key={track.sunoId}>
              {track.streamUrl ? <button type="button" onClick={() => select(track)} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-2 py-3 text-left hover:bg-white/5 focus-visible:outline focus-visible:outline-emerald-300" aria-label={`Play ${track.title}`} aria-current={active?.sunoId === track.sunoId ? 'true' : undefined}>
                <span className="min-w-0 text-sm">{track.title}{active?.sunoId === track.sunoId && <span className="ml-2 text-xs text-emerald-200">Current track</span>}</span><span className="shrink-0 text-xs text-white/65">{track.duration}</span>
              </button> : <a href={`https://suno.com/song/${track.sunoId}`} target="_blank" rel="noopener noreferrer" onClick={stop} className="flex min-h-12 items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-white/80">
                <span className="min-w-0">{track.title}</span><span className="shrink-0 text-xs text-emerald-200">On Suno ↗</span>
              </a>}
            </li>)}
          </ul>
          {searched && !results.length && <p role="status" className="mt-3 text-sm text-white/80">No catalog match yet. Try a title or genre.</p>}
        </div>
      </aside>
    </MusicContext.Provider>
  )
}
