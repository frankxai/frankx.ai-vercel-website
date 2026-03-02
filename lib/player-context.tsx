'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type { Track } from '@/lib/music'

// ── State ───────────────────────────────────────────────────────────────────

interface PlayerState {
  currentTrack: Track | null
  queue: Track[]
  queueIndex: number
  isPlaying: boolean
  volume: number
  duration: number
  repeat: 'off' | 'one' | 'all'
  shuffle: boolean
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  queueIndex: -1,
  isPlaying: false,
  volume: 0.8,
  duration: 0,
  repeat: 'off',
  shuffle: false,
}

// ── Actions ─────────────────────────────────────────────────────────────────

type PlayerAction =
  | { type: 'PLAY_TRACK'; track: Track; queue?: Track[] }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'PAUSE' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_DURATION'; duration: number }
  | { type: 'SET_REPEAT'; mode: 'off' | 'one' | 'all' }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'SET_QUEUE'; queue: Track[]; startIndex?: number }
  | { type: 'TRACK_ENDED' }

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY_TRACK': {
      const queue = action.queue || state.queue
      const queueIndex = queue.findIndex((t) => t.id === action.track.id)
      return {
        ...state,
        currentTrack: action.track,
        queue: action.queue || state.queue,
        queueIndex: queueIndex >= 0 ? queueIndex : 0,
        isPlaying: true,
        duration: 0,
      }
    }
    case 'TOGGLE_PLAY':
      if (!state.currentTrack) return state
      return { ...state, isPlaying: !state.isPlaying }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'NEXT': {
      if (state.queue.length === 0) return state
      let nextIndex: number
      if (state.shuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length)
      } else {
        nextIndex = state.queueIndex + 1
        if (nextIndex >= state.queue.length) {
          if (state.repeat === 'all') nextIndex = 0
          else return { ...state, isPlaying: false }
        }
      }
      return {
        ...state,
        currentTrack: state.queue[nextIndex],
        queueIndex: nextIndex,
        isPlaying: true,
        duration: 0,
      }
    }
    case 'PREV': {
      if (state.queue.length === 0) return state
      let prevIndex = state.queueIndex - 1
      if (prevIndex < 0) {
        if (state.repeat === 'all') prevIndex = state.queue.length - 1
        else prevIndex = 0
      }
      return {
        ...state,
        currentTrack: state.queue[prevIndex],
        queueIndex: prevIndex,
        isPlaying: true,
        duration: 0,
      }
    }
    case 'SET_VOLUME':
      return { ...state, volume: Math.max(0, Math.min(1, action.volume)) }
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'SET_REPEAT':
      return { ...state, repeat: action.mode }
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle }
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.queue,
        queueIndex: action.startIndex ?? 0,
        currentTrack: action.queue[action.startIndex ?? 0] || null,
        isPlaying: true,
        duration: 0,
      }
    case 'TRACK_ENDED': {
      if (state.repeat === 'one') {
        return { ...state, isPlaying: true }
      }
      // Delegate to NEXT logic
      return playerReducer(state, { type: 'NEXT' })
    }
    default:
      return state
  }
}

// ── Context ─────────────────────────────────────────────────────────────────

interface PlayerContextValue {
  state: PlayerState
  audioRef: React.RefObject<HTMLAudioElement | null>
  progressRef: React.RefObject<HTMLDivElement | null>
  playTrack: (track: Track, queue?: Track[]) => void
  togglePlay: () => void
  pause: () => void
  next: () => void
  prev: () => void
  seek: (fraction: number) => void
  setVolume: (v: number) => void
  setRepeat: (mode: 'off' | 'one' | 'all') => void
  toggleShuffle: () => void
  playQueue: (queue: Track[], startIndex?: number) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

// ── Provider ────────────────────────────────────────────────────────────────

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number>(0)

  // Restore volume from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('frankx-player-volume')
    if (saved) dispatch({ type: 'SET_VOLUME', volume: parseFloat(saved) })
  }, [])

  // Persist volume
  useEffect(() => {
    localStorage.setItem('frankx-player-volume', String(state.volume))
  }, [state.volume])

  // Sync audio element with state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (state.currentTrack) {
      const src = state.currentTrack.audioUrl
        || (state.currentTrack.sunoId
          ? `https://cdn1.suno.ai/${state.currentTrack.sunoId}.mp3`
          : null)

      if (src && audio.src !== src) {
        audio.src = src
        audio.load()
      }

      if (state.isPlaying) {
        audio.play().catch(() => {
          // Autoplay blocked — user needs to interact first
        })
      } else {
        audio.pause()
      }
    }
  }, [state.currentTrack, state.isPlaying])

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume
  }, [state.volume])

  // RAF-based progress update (zero-render — mutates DOM directly)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tick = () => {
      if (progressRef.current && audio.duration > 0) {
        const pct = (audio.currentTime / audio.duration) * 100
        progressRef.current.style.width = `${pct}%`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    if (state.isPlaying) {
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => cancelAnimationFrame(rafRef.current)
  }, [state.isPlaying])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadedMetadata = () => {
      dispatch({ type: 'SET_DURATION', duration: audio.duration })
    }
    const onEnded = () => {
      dispatch({ type: 'TRACK_ENDED' })
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // Actions
  const playTrack = useCallback(
    (track: Track, queue?: Track[]) => dispatch({ type: 'PLAY_TRACK', track, queue }),
    [],
  )
  const togglePlay = useCallback(() => dispatch({ type: 'TOGGLE_PLAY' }), [])
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), [])
  const next = useCallback(() => dispatch({ type: 'NEXT' }), [])
  const prev = useCallback(() => dispatch({ type: 'PREV' }), [])
  const setVolume = useCallback((v: number) => dispatch({ type: 'SET_VOLUME', volume: v }), [])
  const setRepeat = useCallback(
    (mode: 'off' | 'one' | 'all') => dispatch({ type: 'SET_REPEAT', mode }),
    [],
  )
  const toggleShuffle = useCallback(() => dispatch({ type: 'TOGGLE_SHUFFLE' }), [])
  const playQueue = useCallback(
    (queue: Track[], startIndex?: number) =>
      dispatch({ type: 'SET_QUEUE', queue, startIndex }),
    [],
  )

  const seek = useCallback((fraction: number) => {
    const audio = audioRef.current
    if (audio && audio.duration) {
      audio.currentTime = fraction * audio.duration
    }
  }, [])

  const value = useMemo<PlayerContextValue>(
    () => ({
      state,
      audioRef,
      progressRef,
      playTrack,
      togglePlay,
      pause,
      next,
      prev,
      seek,
      setVolume,
      setRepeat,
      toggleShuffle,
      playQueue,
    }),
    [state, playTrack, togglePlay, pause, next, prev, seek, setVolume, setRepeat, toggleShuffle, playQueue],
  )

  return (
    <PlayerContext.Provider value={value}>
      {/* Single hidden audio element — managed entirely via refs */}
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  )
}

// ── Hooks ───────────────────────────────────────────────────────────────────

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within MusicPlayerProvider')
  return ctx
}

export function usePlayerProgress() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayerProgress must be used within MusicPlayerProvider')
  return {
    progressRef: ctx.progressRef,
    audioRef: ctx.audioRef,
    seek: ctx.seek,
    duration: ctx.state.duration,
  }
}
