'use client'

import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { bindMusicMediaSession, updateMusicMediaSessionState } from '@/lib/music-media-session'
import { SUNO_ID, formatClock, queueNeighbor, routeMusicSuggestion, safeMediaUrl, suggestTracks, type PlaybackTrack } from '@/lib/music-playback'

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'error'
interface MusicContextValue {
  selectSuno: (sunoId: string, title: string, options?: { streamUrl?: string }) => void
  canPlay: (sunoId: string) => boolean
  activeSunoId?: string
  playbackState: PlaybackState
  currentTime: number
  duration: number
  toggle: () => void
  seek: (seconds: number) => void
  open: () => void
  stop: () => void
}
const MusicContext = createContext<MusicContextValue | null>(null)
const AUTO_NEXT_KEY = 'frankx:music:auto-next'
const LAST_TRACK_KEY = 'frankx:music:last-track'

function readStored(key: string): string | null {
  try { return window.localStorage.getItem(key) } catch { return null }
}
function writeStored(key: string, value: string) {
  try { window.localStorage.setItem(key, value) } catch { /* storage blocked: preference lasts for this page only */ }
}

function TrackTile({ playing }: { playing: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-end justify-center gap-[3px] rounded-lg border border-white/10 bg-white/[0.04] pb-2.5">
      {[0.55, 1, 0.75].map((height, index) => (
        <span
          key={index}
          className={`w-[3px] rounded-full bg-emerald-300 ${playing ? 'motion-safe:animate-pulse' : 'opacity-60'}`}
          style={{ height: `${Math.round(height * 16)}px`, animationDelay: `${index * 180}ms` }}
        />
      ))}
    </span>
  )
}

function TransportIcon({ name }: { name: 'play' | 'pause' | 'next' | 'previous' }) {
  const paths = {
    play: 'M8 5.5v13l10.5-6.5z',
    pause: 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',
    next: 'M6 6l8.5 6L6 18zM16 6h2v12h-2z',
    previous: 'M18 6l-8.5 6L18 18zM6 6h2v12H6z',
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d={paths[name]} /></svg>
}
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
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [autoNext, setAutoNext] = useState(true)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const disclosureRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const activeRef = useRef<PlaybackTrack | null>(null)
  const attemptRef = useRef(0)
  const restoreFocusOnCollapseRef = useRef(false)
  const requestId = useId()
  const panelId = useId()
  const pathname = usePathname()
  const suggestion = routeMusicSuggestion(pathname)
  const isHome = pathname === '/'
  const onLibrary = pathname === '/library' || pathname.startsWith('/library/')
  const onBooks = pathname === '/books' || pathname.startsWith('/books/')
  // Reading surfaces keep the corner chip until the reader opens the player.
  // A wide bar covers the last shelf row at 375 and 1440.
  const collapsedChip = (isHome || onLibrary || onBooks) && !expanded
  const dockRef = useRef<HTMLElement>(null)
  const playable = catalog.filter(track => safeMediaUrl(track.streamUrl))
  const results = searched ? suggestTracks(catalog, request) : browseAll ? playable : playable.slice(0, 6)
  const resumeTrack = playable.find(track => track.sunoId === resumeId) ?? playable[0]

  function collapse() {
    restoreFocusOnCollapseRef.current = true
    setExpanded(false)
  }
  function minimize() {
    collapse()
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
  function select(track: PlaybackTrack, { expand = true }: { expand?: boolean } = {}) {
    const url = safeMediaUrl(track.streamUrl)
    const audio = audioRef.current
    if (!url || !audio) return
    if (expand) setExpanded(true)
    if (activeRef.current?.sunoId === track.sunoId) {
      if (audio.paused) start()
      return
    }
    attemptRef.current += 1
    audio.pause()
    activeRef.current = track
    setActive(track)
    setCurrentTime(0)
    setDuration(0)
    audio.src = url
    audio.load()
    writeStored(LAST_TRACK_KEY, track.sunoId)
    setResumeId(track.sunoId)
    start()
  }
  // The queue is the playable catalog; search only chooses where listening starts.
  function skip(step: 1 | -1, options?: { expand?: boolean }) {
    const audio = audioRef.current
    if (step === -1 && audio && audio.currentTime > 3) { seek(0); return }
    const target = queueNeighbor(playable, activeRef.current?.sunoId, step)
    if (target) select(target, options ?? { expand: false })
  }
  function toggleAutoNext() {
    setAutoNext(current => {
      writeStored(AUTO_NEXT_KEY, current ? 'off' : 'on')
      return !current
    })
  }
  function selectSuno(id: string, title: string, options?: { streamUrl?: string }) {
    if (!SUNO_ID.test(id)) return
    const fromCatalog = playable.find(item => item.sunoId === id)
    if (fromCatalog) {
      select(fromCatalog)
      return
    }
    const reviewed = safeMediaUrl(options?.streamUrl)
    if (!reviewed || !reviewed.includes(id)) return
    select({
      id,
      sunoId: id,
      title,
      genre: [],
      mood: [],
      streamUrl: reviewed,
    })
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
    setCurrentTime(0)
    setDuration(0)
  }, [])
  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (!activeRef.current) {
      if (resumeTrack) select(resumeTrack, { expand: false })
      return
    }
    if (!audio.paused) { attemptRef.current += 1; audio.pause(); setState('paused') }
    else start()
  }
  function seek(seconds: number) {
    const audio = audioRef.current
    if (!audio || !activeRef.current || !Number.isFinite(seconds)) return
    const next = Math.max(0, seconds)
    audio.currentTime = next
    setCurrentTime(next)
  }

  useEffect(() => {
    setAutoNext(readStored(AUTO_NEXT_KEY) !== 'off')
    setResumeId(readStored(LAST_TRACK_KEY))
  }, [])

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

  const skipRef = useRef(skip)
  useEffect(() => { skipRef.current = skip })
  useEffect(() => {
    if (!active) return
    return bindMusicMediaSession(active, { play: start, pause: () => audioRef.current?.pause(), stop, nexttrack: () => skipRef.current(1), previoustrack: () => skipRef.current(-1) })
  }, [active, start, stop])

  useEffect(() => {
    updateMusicMediaSessionState(!active ? 'none' : state === 'playing' ? 'playing' : 'paused')
  }, [active, state])

  // Restore keyboard and control focus when the dock collapses. On / and /library,
  // the expanded dock unmounts and renders the collapsed chip, so focusing disclosureRef
  // must happen after the chip mounts to avoid falling back to document.body.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (!expanded && restoreFocusOnCollapseRef.current) {
      restoreFocusOnCollapseRef.current = false
      disclosureRef.current?.focus()
    }
  }, [expanded])

  // Publish measured dock clearance (chrome height + bottom offset + safe-area).
  // Home collapsed: bottom-right chip; full-width emerald CTA must stop short via
  // --music-chip-reserve (qa-overlay-clearance.css) — chip alone cannot clear w-full.
  // A wide dock publishes --music-dock-height for the end spacer.
  // The corner chip publishes --music-chip-reserve. Focus stays above either one.
  useLayoutEffect(() => {
    const el = dockRef.current
    if (!el || typeof window === 'undefined') return
    const publish = () => {
      const rect = el.getBoundingClientRect()
      const clearance = Math.max(0, Math.ceil(window.innerHeight - rect.top))
      document.documentElement.style.setProperty('--music-dock-height', `${clearance}px`)
      document.documentElement.style.scrollPaddingBottom = `${clearance}px`
      if (collapsedChip) {
        document.documentElement.style.setProperty('--music-chip-reserve', '4.75rem')
      } else {
        document.documentElement.style.removeProperty('--music-chip-reserve')
      }
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    window.addEventListener('resize', publish)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', publish)
      document.documentElement.style.removeProperty('--music-dock-height')
      document.documentElement.style.removeProperty('--music-chip-reserve')
      document.documentElement.style.scrollPaddingBottom = ''
    }
  }, [expanded, isHome, collapsedChip, active, state])

  const subtitle = state === 'error' ? 'Playback unavailable' : state === 'loading' ? 'Loading audio…' : state === 'playing' ? 'Playing' : 'Paused'
  return (
    <MusicContext.Provider value={{
      selectSuno,
      canPlay: id => playable.some(track => track.sunoId === id),
      activeSunoId: active?.sunoId,
      playbackState: state,
      currentTime,
      duration,
      toggle,
      seek,
      open: () => setExpanded(true),
      stop,
    }}>
      {children}
      <div
        aria-hidden="true"
        className={collapsedChip ? 'h-20' : undefined}
        style={collapsedChip ? undefined : { height: 'var(--music-dock-height, calc(6rem + env(safe-area-inset-bottom, 0px)))' }}
      />
      <aside
        ref={dockRef}
        aria-label="Music player"
        onKeyDown={event => { if (event.key === 'Escape' && expanded) { event.preventDefault(); event.stopPropagation(); minimize() } }}
        className={
          collapsedChip
            ? 'fixed bottom-3 right-3 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0b] text-white'
            : 'fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0b] text-white sm:inset-x-auto sm:right-5 sm:w-[min(34rem,calc(100vw-2.5rem))]'
        }
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        {collapsedChip ? (
          <button
            ref={disclosureRef}
            type="button"
            onClick={() => setExpanded(true)}
            aria-controls={panelId}
            aria-expanded={expanded}
            aria-label={active?.title || 'Music by FrankX'}
            className="flex h-12 w-12 flex-col items-center justify-center rounded-2xl text-center focus-visible:outline focus-visible:outline-emerald-300"
          >
            <span className="text-lg leading-none" aria-hidden="true">♪</span>
            <span className="sr-only" aria-live="polite">{active ? subtitle : 'Choose a soundtrack'}</span>
          </button>
        ) : (
        <div className="relative">
        {active && (
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-white/10">
            <span className="block h-full origin-left bg-emerald-300" style={{ transform: `scaleX(${duration ? Math.min(1, currentTime / duration) : 0})` }} />
          </span>
        )}
        <div className="flex min-h-16 items-center gap-1 px-3 py-2">
          <TrackTile playing={state === 'playing'} />
          <button
            ref={disclosureRef}
            type="button"
            onClick={() => {
              if (expanded) {
                collapse()
              } else {
                setExpanded(true)
              }
            }}
            aria-controls={panelId}
            aria-expanded={expanded}
            className="min-h-11 min-w-0 flex-1 rounded-lg px-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
          >
            <span className="block truncate text-sm font-medium">{active?.title || (resumeId && resumeTrack?.title) || 'Music by FrankX'}</span>
            <span className="block truncate text-xs text-white/65" aria-live="polite">{active ? subtitle : resumeId && resumeTrack ? 'Pick up where you left off' : `Choose a soundtrack · ${playable.length} tracks`}</span>
          </button>
          {active && <button type="button" onClick={() => skip(-1)} aria-label="Previous track" className="hidden min-h-11 min-w-11 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 sm:flex"><TransportIcon name="previous" /></button>}
          {(active || resumeTrack) && <button type="button" onClick={toggle} aria-label={state === 'playing' || state === 'loading' ? 'Pause music' : active ? 'Play music' : `Play ${resumeTrack?.title}`} className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-emerald-300 text-[#0a0a0b] hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"><TransportIcon name={state === 'playing' || state === 'loading' ? 'pause' : 'play'} /></button>}
          {active && <button type="button" onClick={() => skip(1)} aria-label="Next track" className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"><TransportIcon name="next" /></button>}
          {expanded && <button type="button" onClick={minimize} aria-label="Minimize player" className="min-h-11 min-w-11 rounded-lg text-xl text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">−</button>}
        </div>
        </div>
        )}
        <div id={panelId} hidden={!expanded} className="max-h-[55dvh] overflow-y-auto overscroll-contain border-t border-white/10 p-4">
          {/* Always mounted; no src exists before a verified track is selected. The visible controls below drive it. */}
          <audio ref={audioRef} preload="none" hidden
            onPlay={() => { if (activeRef.current) { yieldOtherMedia(); setState('loading') } }}
            onPlaying={() => { if (activeRef.current) { setState('playing'); setError(null) } }}
            onWaiting={() => { if (activeRef.current && !audioRef.current?.paused) setState('loading') }}
            onPause={() => { if (activeRef.current && audioRef.current?.paused) setState(current => current === 'error' ? current : 'paused') }}
            onEnded={() => { if (!activeRef.current) return; setState('paused'); setCurrentTime(0); if (autoNext && playable.length > 1) skip(1, { expand: false }) }}
            onTimeUpdate={() => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime) }}
            onLoadedMetadata={() => { if (audioRef.current && Number.isFinite(audioRef.current.duration)) setDuration(audioRef.current.duration) }}
            onDurationChange={() => { if (audioRef.current && Number.isFinite(audioRef.current.duration) && audioRef.current.duration > 0) setDuration(audioRef.current.duration) }}
            onError={() => { if (activeRef.current && audioRef.current?.getAttribute('src')) fail('This track is unavailable right now. Try another track or listen on Suno.') }} />
          {active && (
            <div className="mb-4">
              <input
                type="range"
                min={0}
                max={Math.max(1, Math.round(duration))}
                step={1}
                value={Math.min(Math.round(currentTime), Math.max(1, Math.round(duration)))}
                onChange={event => seek(Number(event.target.value))}
                disabled={!duration}
                aria-label={`Seek in ${active.title}`}
                aria-valuetext={`${formatClock(currentTime)} of ${formatClock(duration)}`}
                className="h-11 w-full cursor-pointer accent-emerald-300 disabled:cursor-default disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
              <div className="flex justify-between text-xs tabular-nums text-white/65">
                <span>{formatClock(currentTime)}</span>
                <span>{duration ? formatClock(duration) : '–:––'}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => skip(-1)} className="min-h-11 rounded-full border border-white/20 px-3 text-sm sm:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">Previous</button>
                <button type="button" role="switch" aria-checked={autoNext} onClick={toggleAutoNext} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
                  <span aria-hidden="true" className={`relative h-4 w-7 rounded-full transition-colors ${autoNext ? 'bg-emerald-300' : 'bg-white/20'}`}>
                    <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-[#0a0a0b] transition-transform motion-reduce:transition-none ${autoNext ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                  </span>
                  Autoplay next
                </button>
                <button type="button" onClick={stop} className="min-h-11 rounded-full px-3 text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300" aria-label="Stop music">Stop</button>
                <a href={`https://suno.com/song/${active.sunoId}`} target="_blank" rel="noopener noreferrer" onClick={stop} className="ml-auto inline-flex min-h-11 items-center text-sm text-emerald-200 underline underline-offset-4">Listen on Suno</a>
              </div>
            </div>
          )}
          {error && <p role="status" className="mb-3 text-sm text-amber-200">{error}</p>}
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