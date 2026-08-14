'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { RhythmAudio } from './audio'
import {
  buildSong,
  chartStats,
  DIFFICULTY_SPEC,
  SONGS,
  type BuiltSong,
  type ChartNote,
  type Difficulty,
  type SongDef,
} from './songs'

// ─── Tuning ─────────────────────────────────────────────────────────

const WINDOW_PERFECT = 0.048
const WINDOW_GREAT = 0.095
const WINDOW_GOOD = 0.145

const SCORE = { perfect: 100, great: 70, good: 40, holdTick: 14 }

const LANE_KEYS: string[][] = [
  ['a', 's', 'd', 'f'],
  ['j', 'k', 'l', ';'],
]
const ARROW_LANES: Record<string, number> = {
  ArrowLeft: 0, ArrowDown: 1, ArrowUp: 2, ArrowRight: 3,
}

const LANES = [
  { color: '#34d399', dim: 'rgba(52,211,153,0.16)' },
  { color: '#fb7185', dim: 'rgba(251,113,133,0.16)' },
  { color: '#fbbf24', dim: 'rgba(251,191,36,0.16)' },
  { color: '#38bdf8', dim: 'rgba(56,189,248,0.16)' },
]

const PLAYER_ACCENT = ['#22d3ee', '#c084fc']

const SPEEDS = [
  { label: 'Relaxed', scroll: 2.0 },
  { label: 'Standard', scroll: 1.5 },
  { label: 'Fast', scroll: 1.1 },
]

// ─── Runtime types ──────────────────────────────────────────────────

type NoteState = 0 | 1 | 2 // pending | resolved-hit | missed

interface NoteRT extends ChartNote {
  state: NoteState
}

interface Popup {
  text: string
  color: string
  born: number
  lane: number
}

interface PlayerRT {
  index: number
  name: string
  notes: NoteRT[]
  scan: number
  score: number
  combo: number
  maxCombo: number
  counts: { perfect: number; great: number; good: number; miss: number }
  holds: Map<number, { note: NoteRT; nextTick: number; end: number }>
  pressed: boolean[]
  flash: number[]
  popups: Popup[]
  lastError: number | null
}

interface Run {
  song: BuiltSong
  startCtxTime: number
  players: PlayerRT[]
  backingIndex: number
  ended: boolean
}

export interface PlayerResult {
  name: string
  score: number
  maxCombo: number
  accuracy: number
  counts: PlayerRT['counts']
  grade: string
}

type Screen = 'menu' | 'playing' | 'results'

// ─── Helpers ────────────────────────────────────────────────────────

function grade(accuracy: number) {
  if (accuracy >= 0.95) return 'S'
  if (accuracy >= 0.88) return 'A'
  if (accuracy >= 0.78) return 'B'
  if (accuracy >= 0.65) return 'C'
  return 'D'
}

function multiplier(combo: number) {
  return Math.min(4, 1 + Math.floor(combo / 10))
}

function makePlayer(index: number, name: string, chart: ChartNote[]): PlayerRT {
  return {
    index,
    name,
    notes: chart.map(n => ({ ...n, state: 0 as NoteState })),
    scan: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    counts: { perfect: 0, great: 0, good: 0, miss: 0 },
    holds: new Map(),
    pressed: [false, false, false, false],
    flash: [-9, -9, -9, -9],
    popups: [],
    lastError: null,
  }
}

function summarise(p: PlayerRT): PlayerResult {
  const { perfect, great, good, miss } = p.counts
  const total = perfect + great + good + miss
  const weighted = perfect + great * 0.7 + good * 0.4
  const accuracy = total === 0 ? 0 : weighted / total
  return {
    name: p.name,
    score: Math.round(p.score),
    maxCombo: p.maxCombo,
    accuracy,
    counts: { ...p.counts },
    grade: grade(accuracy),
  }
}

// ─── Page ───────────────────────────────────────────────────────────

export default function RhythmDuelPage() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [players, setPlayers] = useState(1)
  const [songId, setSongId] = useState(SONGS[0].id)
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [speedIndex, setSpeedIndex] = useState(1)
  const [volume, setVolume] = useState(0.8)
  const [offsetMs, setOffsetMs] = useState(0)
  const [paused, setPaused] = useState(false)
  const [results, setResults] = useState<PlayerResult[] | null>(null)
  const [wideEnough, setWideEnough] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  const audioRef = useRef<RhythmAudio | null>(null)
  const runRef = useRef<Run | null>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const rafRef = useRef<number | null>(null)
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedRef = useRef(false)
  const offsetRef = useRef(0)
  const scrollRef = useRef(SPEEDS[1].scroll)

  const song = useMemo(() => SONGS.find(s => s.id === songId) ?? SONGS[0], [songId])

  useEffect(() => { pausedRef.current = paused }, [paused])
  useEffect(() => { offsetRef.current = offsetMs / 1000 }, [offsetMs])
  useEffect(() => { scrollRef.current = SPEEDS[speedIndex].scroll }, [speedIndex])
  useEffect(() => { audioRef.current?.setMasterVolume(volume) }, [volume])

  // Two highways side by side need the room; below that we only offer solo.
  useEffect(() => {
    const check = () => setWideEnough(window.innerWidth >= 760)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!wideEnough && players === 2) setPlayers(1)
  }, [wideEnough, players])

  const getAudio = useCallback(async () => {
    if (!audioRef.current) audioRef.current = new RhythmAudio()
    const a = audioRef.current
    await a.init()
    a.setMasterVolume(volume)
    return a
  }, [volume])

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (schedulerRef.current) clearInterval(schedulerRef.current)
    audioRef.current?.destroy()
  }, [])

  // ─── Judgement ────────────────────────────────────────────────────

  const judgePress = useCallback((playerIndex: number, lane: number) => {
    const run = runRef.current
    const audio = audioRef.current
    if (!run || !audio || run.ended || pausedRef.current) return
    const p = run.players[playerIndex]
    if (!p) return

    const songTime = audio.now - run.startCtxTime - offsetRef.current
    p.pressed[lane] = true
    p.flash[lane] = songTime

    let bestIndex = -1
    let bestError = Infinity
    for (let i = p.scan; i < p.notes.length; i++) {
      const n = p.notes[i]
      if (n.t > songTime + WINDOW_GOOD) break
      if (n.lane !== lane || n.state !== 0) continue
      const err = Math.abs(n.t - songTime)
      if (err < bestError) { bestError = err; bestIndex = i }
    }
    if (bestIndex < 0) return

    const note = p.notes[bestIndex]
    note.state = 1
    p.lastError = (songTime - note.t) * 1000

    let text: string
    let color: string
    let base: number
    if (bestError <= WINDOW_PERFECT) { text = 'PERFECT'; color = '#fde68a'; base = SCORE.perfect; p.counts.perfect++ }
    else if (bestError <= WINDOW_GREAT) { text = 'GREAT'; color = '#7dd3fc'; base = SCORE.great; p.counts.great++ }
    else { text = 'GOOD'; color = '#a3e635'; base = SCORE.good; p.counts.good++ }

    p.combo++
    p.maxCombo = Math.max(p.maxCombo, p.combo)
    p.score += base * multiplier(p.combo)
    p.popups.push({ text, color, born: songTime, lane })

    audio.lead(playerIndex, note.midi, audio.now, bestError <= WINDOW_PERFECT ? 0.95 : 0.8)

    if (note.hold > 0) {
      const eighth = 30 / run.song.def.bpm
      p.holds.set(lane, {
        note,
        nextTick: note.t + eighth,
        end: note.t + note.hold,
      })
    }
  }, [])

  const judgeRelease = useCallback((playerIndex: number, lane: number) => {
    const run = runRef.current
    if (!run) return
    const p = run.players[playerIndex]
    if (!p) return
    p.pressed[lane] = false
    p.holds.delete(lane)
  }, [])

  // ─── Start / stop ─────────────────────────────────────────────────

  const stopLoops = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    if (schedulerRef.current) { clearInterval(schedulerRef.current); schedulerRef.current = null }
  }, [])

  const finish = useCallback(() => {
    const run = runRef.current
    if (!run || run.ended) return
    run.ended = true
    stopLoops()
    setResults(run.players.map(summarise))
    setScreen('results')
  }, [stopLoops])

  const quit = useCallback(() => {
    const run = runRef.current
    if (run) run.ended = true
    stopLoops()
    runRef.current = null
    setPaused(false)
    setScreen('menu')
  }, [stopLoops])

  const start = useCallback(async (def: SongDef, diff: Difficulty, playerCount: number) => {
    const audio = await getAudio()

    // A fresh context reports its real output latency; use it as the starting
    // calibration so most people never have to touch the offset slider.
    const ctx = audio.context
    if (ctx && offsetRef.current === 0) {
      const latency = (ctx.outputLatency || ctx.baseLatency || 0) * 1000
      const clamped = Math.round(Math.max(0, Math.min(200, latency)))
      offsetRef.current = clamped / 1000
      setOffsetMs(clamped)
    }

    const built = buildSong(def, diff, playerCount)
    const run: Run = {
      song: built,
      startCtxTime: audio.now + 0.35,
      players: Array.from({ length: playerCount }, (_, i) =>
        makePlayer(i, playerCount === 1 ? 'You' : `Player ${i + 1}`, built.charts[i]),
      ),
      backingIndex: 0,
      ended: false,
    }
    runRef.current = run
    setResults(null)
    setPaused(false)
    setScreen('playing')

    // Lookahead scheduler: everything is placed on the audio clock, so the
    // groove does not drift when the render thread stutters.
    schedulerRef.current = setInterval(() => {
      const a = audioRef.current
      const r = runRef.current
      if (!a || !r || r.ended || pausedRef.current) return
      const horizon = a.now - r.startCtxTime + 0.25
      while (r.backingIndex < r.song.backing.length && r.song.backing[r.backingIndex].t <= horizon) {
        const ev = r.song.backing[r.backingIndex++]
        a.playBacking(ev, r.startCtxTime + ev.t)
      }
    }, 25)

    const frame = () => {
      rafRef.current = requestAnimationFrame(frame)
      const a = audioRef.current
      const r = runRef.current
      if (!a || !r || r.ended) return
      const songTime = a.now - r.startCtxTime - offsetRef.current

      if (!pausedRef.current) {
        for (const p of r.players) updatePlayer(p, r, songTime, a)
        if (songTime > r.song.duration) { finish(); return }
      }

      for (let i = 0; i < r.players.length; i++) {
        const canvas = canvasRefs.current[i]
        if (canvas) drawHighway(canvas, r.players[i], songTime, scrollRef.current, r.song, pausedRef.current)
      }
    }
    rafRef.current = requestAnimationFrame(frame)
  }, [finish, getAudio])

  // ─── Input ────────────────────────────────────────────────────────

  useEffect(() => {
    if (screen !== 'playing') return

    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Escape') { e.preventDefault(); setPaused(v => !v); return }
      if (e.repeat) return
      const run = runRef.current
      if (!run) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      for (let pi = 0; pi < run.players.length; pi++) {
        const lane = LANE_KEYS[pi].indexOf(key)
        if (lane >= 0) { e.preventDefault(); judgePress(pi, lane); return }
      }
      // Arrows drive player 2 in a duel, or player 1 when playing alone.
      if (key in ARROW_LANES) {
        e.preventDefault()
        judgePress(run.players.length === 2 ? 1 : 0, ARROW_LANES[key])
      }
      if (key === ' ') e.preventDefault()
    }

    const up = (e: KeyboardEvent) => {
      const run = runRef.current
      if (!run) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      for (let pi = 0; pi < run.players.length; pi++) {
        const lane = LANE_KEYS[pi].indexOf(key)
        if (lane >= 0) { judgeRelease(pi, lane); return }
      }
      if (key in ARROW_LANES) {
        judgeRelease(run.players.length === 2 ? 1 : 0, ARROW_LANES[key])
      }
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [screen, judgePress, judgeRelease])

  // Leaving the tab mid-song would otherwise keep the chart scrolling unheard.
  useEffect(() => {
    if (screen !== 'playing') return
    const onHide = () => { if (document.hidden) setPaused(true) }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [screen])

  // Pausing has to move the song clock, or the chart races on while suspended.
  const pauseAnchor = useRef(0)
  useEffect(() => {
    const audio = audioRef.current
    const run = runRef.current
    if (!audio || !run || screen !== 'playing') return
    if (paused) {
      pauseAnchor.current = audio.now
      void audio.suspend()
    } else if (pauseAnchor.current > 0) {
      void audio.resume().then(() => {
        const gap = audio.now - pauseAnchor.current
        run.startCtxTime += gap
        pauseAnchor.current = 0
      })
    }
  }, [paused, screen])

  useEffect(() => {
    if (screen !== 'menu') return
    const a = audioRef.current
    if (!a) return
    const tick = setInterval(() => setLoadProgress(a.sampleProgress), 300)
    return () => clearInterval(tick)
  }, [screen])

  const stats = useMemo(() => {
    const built = buildSong(song, difficulty, 1)
    return chartStats(built.charts[0])
  }, [song, difficulty])

  // ─── Render ───────────────────────────────────────────────────────

  return (
    <div className="bg-[#07080d] min-h-[100dvh] flex flex-col overflow-x-hidden select-none text-white">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[620px] h-[620px] bg-cyan-500/[0.025] rounded-full blur-[200px] -top-40 -left-32" />
        <div className="absolute w-[520px] h-[520px] bg-fuchsia-500/[0.03] rounded-full blur-[190px] -bottom-40 -right-24" />
      </div>

      {screen === 'menu' && (
        <MenuScreen
          song={song}
          onSong={setSongId}
          difficulty={difficulty}
          onDifficulty={setDifficulty}
          players={players}
          onPlayers={setPlayers}
          wideEnough={wideEnough}
          speedIndex={speedIndex}
          onSpeed={setSpeedIndex}
          volume={volume}
          onVolume={setVolume}
          offsetMs={offsetMs}
          onOffset={setOffsetMs}
          noteCount={stats.total}
          holdCount={stats.holds}
          loadProgress={loadProgress}
          onStart={() => void start(song, difficulty, players)}
        />
      )}

      {screen === 'playing' && (
        <PlayScreen
          playerCount={players}
          songTitle={song.title}
          canvasRefs={canvasRefs}
          paused={paused}
          onPauseToggle={() => setPaused(v => !v)}
          onQuit={quit}
          onRestart={() => { stopLoops(); void start(song, difficulty, players) }}
          onPress={judgePress}
          onRelease={judgeRelease}
        />
      )}

      {screen === 'results' && results && (
        <ResultsScreen
          results={results}
          songTitle={song.title}
          difficulty={difficulty}
          onRetry={() => void start(song, difficulty, players)}
          onMenu={() => setScreen('menu')}
        />
      )}
    </div>
  )
}

// ─── Per-frame update ───────────────────────────────────────────────

function updatePlayer(p: PlayerRT, run: Run, songTime: number, audio: RhythmAudio) {
  while (p.scan < p.notes.length && p.notes[p.scan].t < songTime - WINDOW_GOOD) {
    const n = p.notes[p.scan]
    if (n.state === 0) {
      n.state = 2
      p.counts.miss++
      p.combo = 0
      p.popups.push({ text: 'MISS', color: '#f87171', born: songTime, lane: n.lane })
      audio.miss(p.index)
    }
    p.scan++
  }

  const eighth = 30 / run.song.def.bpm
  for (const [lane, hold] of p.holds) {
    if (songTime >= hold.end) { p.holds.delete(lane); continue }
    while (hold.nextTick <= songTime && hold.nextTick < hold.end) {
      audio.lead(p.index, hold.note.midi, audio.now, 0.45)
      p.score += SCORE.holdTick * multiplier(p.combo)
      hold.nextTick += eighth
    }
  }

  if (p.popups.length > 24) p.popups.splice(0, p.popups.length - 24)
}

// ─── Canvas ─────────────────────────────────────────────────────────

function drawHighway(
  canvas: HTMLCanvasElement,
  p: PlayerRT,
  songTime: number,
  scroll: number,
  song: BuiltSong,
  paused: boolean,
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.getBoundingClientRect()
  const w = Math.max(1, Math.round(rect.width))
  const h = Math.max(1, Math.round(rect.height))
  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr
    canvas.height = h * dpr
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  const accent = PLAYER_ACCENT[p.index] ?? PLAYER_ACCENT[0]
  const hudH = 54
  const topY = hudH + 8
  const hitY = h - 56
  const laneW = w / 4
  const noteH = 16

  // Highway floor
  const floor = ctx.createLinearGradient(0, topY, 0, h)
  floor.addColorStop(0, 'rgba(255,255,255,0.005)')
  floor.addColorStop(0.75, 'rgba(255,255,255,0.03)')
  floor.addColorStop(1, 'rgba(255,255,255,0.06)')
  ctx.fillStyle = floor
  ctx.fillRect(0, topY, w, h - topY)

  for (let l = 1; l < 4; l++) {
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(l * laneW, topY)
    ctx.lineTo(l * laneW, h)
    ctx.stroke()
  }

  // Beat lines give the eye a pulse to lock onto.
  const beat = 60 / song.def.bpm
  const firstBeat = Math.ceil((songTime - 0.1) / beat)
  for (let b = firstBeat; b * beat < songTime + scroll; b++) {
    const y = hitY - ((b * beat - songTime) / scroll) * (hitY - topY)
    if (y < topY) continue
    const bar = b % 4 === 0
    ctx.strokeStyle = bar ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.05)'
    ctx.lineWidth = bar ? 1.5 : 1
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  // Notes. Back off from the scan cursor so a hold tail keeps rendering after
  // its head has already passed the line.
  for (let i = Math.max(0, p.scan - 12); i < p.notes.length; i++) {
    const n = p.notes[i]
    const dt = n.t - songTime
    if (dt > scroll) break
    if (n.state === 2) continue
    const lane = LANES[n.lane]
    const cx = n.lane * laneW + laneW / 2
    const y = hitY - (dt / scroll) * (hitY - topY)

    if (n.hold > 0) {
      const endDt = n.t + n.hold - songTime
      const endY = hitY - (Math.min(endDt, scroll) / scroll) * (hitY - topY)
      const held = p.holds.get(n.lane)?.note === n
      ctx.fillStyle = held ? lane.color : lane.dim
      ctx.globalAlpha = held ? 0.55 : 0.4
      const tailTop = Math.max(topY, endY)
      const tailBottom = Math.min(hitY, y)
      if (tailBottom > tailTop) {
        ctx.fillRect(cx - 7, tailTop, 14, tailBottom - tailTop)
      }
      ctx.globalAlpha = 1
    }

    if (n.state === 1) continue
    if (y < topY - noteH) continue

    ctx.save()
    ctx.shadowColor = lane.color
    ctx.shadowBlur = 14
    ctx.fillStyle = lane.color
    roundRect(ctx, cx - laneW * 0.34, y - noteH / 2, laneW * 0.68, noteH, 7)
    ctx.fill()
    ctx.restore()

    ctx.fillStyle = 'rgba(255,255,255,0.75)'
    roundRect(ctx, cx - laneW * 0.34 + 3, y - noteH / 2 + 2.5, laneW * 0.68 - 6, 3.5, 2)
    ctx.fill()
  }

  // Receptors
  for (let l = 0; l < 4; l++) {
    const cx = l * laneW + laneW / 2
    const lane = LANES[l]
    const sinceFlash = songTime - p.flash[l]
    const glow = p.pressed[l] ? 1 : Math.max(0, 1 - sinceFlash / 0.18)

    ctx.save()
    ctx.strokeStyle = lane.color
    ctx.globalAlpha = 0.35 + glow * 0.65
    ctx.lineWidth = 2 + glow * 2
    ctx.shadowColor = lane.color
    ctx.shadowBlur = glow * 22
    roundRect(ctx, cx - laneW * 0.34, hitY - noteH / 2 - 3, laneW * 0.68, noteH + 6, 9)
    ctx.stroke()
    if (glow > 0) {
      ctx.globalAlpha = glow * 0.3
      ctx.fillStyle = lane.color
      ctx.fill()
    }
    ctx.restore()
  }

  // Hit-line
  ctx.strokeStyle = 'rgba(255,255,255,0.22)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, hitY + noteH / 2 + 6)
  ctx.lineTo(w, hitY + noteH / 2 + 6)
  ctx.stroke()

  // Judgement popups
  for (const pop of p.popups) {
    const age = songTime - pop.born
    if (age < 0 || age > 0.6) continue
    const alpha = 1 - age / 0.6
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = pop.color
    ctx.font = '600 13px ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(pop.text, pop.lane * laneW + laneW / 2, hitY - 46 - age * 26)
    ctx.restore()
  }

  // HUD
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  roundRect(ctx, 0, 0, w, hudH, 0)
  ctx.fill()

  ctx.fillStyle = accent
  ctx.font = '600 12px ui-sans-serif, system-ui, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(p.name.toUpperCase(), 14, 21)

  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.font = '700 22px ui-sans-serif, system-ui, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(Math.round(p.score).toLocaleString(), w - 14, 26)

  const mult = multiplier(p.combo)
  ctx.textAlign = 'left'
  ctx.fillStyle = p.combo > 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)'
  ctx.font = '500 12px ui-sans-serif, system-ui, sans-serif'
  ctx.fillText(`${p.combo} combo`, 14, 40)

  if (mult > 1) {
    ctx.fillStyle = accent
    ctx.font = '700 12px ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(`×${mult}`, w - 14, 42)
  }

  // Progress
  const progress = Math.max(0, Math.min(1, songTime / song.duration))
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.fillRect(0, hudH - 2, w, 2)
  ctx.fillStyle = accent
  ctx.fillRect(0, hudH - 2, w * progress, 2)

  // Count-in
  if (songTime < song.leadIn && songTime > -1) {
    const remaining = song.leadIn - songTime
    const label = remaining > song.leadIn / 2 ? 'READY' : 'GO'
    ctx.save()
    ctx.globalAlpha = 0.85
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '700 34px ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(label, w / 2, (topY + hitY) / 2)
    ctx.restore()
  }

  if (paused) {
    ctx.fillStyle = 'rgba(7,8,13,0.72)'
    ctx.fillRect(0, topY, w, h - topY)
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

// ─── Screens ────────────────────────────────────────────────────────

function MenuScreen(props: {
  song: SongDef
  onSong: (id: string) => void
  difficulty: Difficulty
  onDifficulty: (d: Difficulty) => void
  players: number
  onPlayers: (n: number) => void
  wideEnough: boolean
  speedIndex: number
  onSpeed: (i: number) => void
  volume: number
  onVolume: (v: number) => void
  offsetMs: number
  onOffset: (v: number) => void
  noteCount: number
  holdCount: number
  loadProgress: number
  onStart: () => void
}) {
  const {
    song, onSong, difficulty, onDifficulty, players, onPlayers, wideEnough,
    speedIndex, onSpeed, volume, onVolume, offsetMs, onOffset,
    noteCount, holdCount, onStart,
  } = props

  return (
    <div className="relative z-10 flex-1 px-5 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <Link href="/music-lab/games" className="text-[10px] tracking-[0.3em] uppercase text-white/25 hover:text-white/50 transition-colors">
            FrankX Music Lab &middot; Games
          </Link>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-3">
            Rhythm <span className="font-serif-italic text-white/70">Duel</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-xl mx-auto leading-relaxed">
            Notes fall, you catch them on the line. Every note you hit is a real
            note in the arrangement &mdash; play it clean and the song plays back
            clean. Two people can share one keyboard or one tablet.
          </p>
        </header>

        <Section label="Players">
          <div className="grid grid-cols-2 gap-3">
            <Choice active={players === 1} onClick={() => onPlayers(1)} title="Solo" sub="One highway, all four lanes" />
            <Choice
              active={players === 2}
              onClick={() => wideEnough && onPlayers(2)}
              disabled={!wideEnough}
              title="Duel"
              sub={wideEnough ? 'Two highways, one screen' : 'Turn your device sideways'}
            />
          </div>
        </Section>

        <Section label="Track">
          <div className="grid md:grid-cols-3 gap-3">
            {SONGS.map(s => (
              <button
                key={s.id}
                onClick={() => onSong(s.id)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  s.id === song.id
                    ? 'bg-white/[0.06] border-white/25'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.accent }} />
                  <span className="text-[10px] tracking-[0.18em] uppercase text-white/35">{s.bpm} BPM</span>
                </div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-white/40 mt-1 leading-relaxed">{s.blurb}</p>
              </button>
            ))}
          </div>
        </Section>

        <Section label="Difficulty">
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(DIFFICULTY_SPEC) as Difficulty[]).map(d => (
              <Choice
                key={d}
                active={difficulty === d}
                onClick={() => onDifficulty(d)}
                title={DIFFICULTY_SPEC[d].label}
                sub={d === difficulty ? `${noteCount} notes · ${holdCount} holds` : ''}
              />
            ))}
          </div>
        </Section>

        <Section label="Setup">
          <div className="grid md:grid-cols-3 gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <div>
              <p className="text-xs text-white/40 mb-2">Note speed</p>
              <div className="flex gap-2">
                {SPEEDS.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => onSpeed(i)}
                    className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                      i === speedIndex ? 'bg-white/15 text-white' : 'bg-white/[0.03] text-white/45 hover:text-white/70'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block" htmlFor="rd-volume">
                Volume &middot; {Math.round(volume * 100)}%
              </label>
              <input
                id="rd-volume"
                type="range" min={0} max={1} step={0.01} value={volume}
                onChange={e => onVolume(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-2 block" htmlFor="rd-offset">
                Audio offset &middot; {offsetMs}ms
              </label>
              <input
                id="rd-offset"
                type="range" min={-100} max={250} step={5} value={offsetMs}
                onChange={e => onOffset(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400"
              />
              <p className="text-[11px] text-white/25 mt-1 leading-snug">
                Raise it if your hits feel early. Bluetooth headphones usually need 120&ndash;200ms.
              </p>
            </div>
          </div>
        </Section>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={onStart}
            className="px-10 py-4 rounded-full bg-white text-black font-semibold text-lg transition-all hover:bg-white/90 hover:shadow-[0_0_50px_rgba(255,255,255,0.18)]"
          >
            Start
          </button>
          <p className="text-xs text-white/30 text-center leading-relaxed">
            Player 1 &mdash; <Kbd>A</Kbd><Kbd>S</Kbd><Kbd>D</Kbd><Kbd>F</Kbd>
            {players === 2 && <> &nbsp;&middot;&nbsp; Player 2 &mdash; <Kbd>J</Kbd><Kbd>K</Kbd><Kbd>L</Kbd><Kbd>;</Kbd> or arrow keys</>}
            {players === 1 && <> &nbsp;or arrow keys</>}
            <br />
            On a tablet or phone, use the pads under the highway. <Kbd>Esc</Kbd> pauses.
          </p>
        </div>
      </div>
    </div>
  )
}

function PlayScreen(props: {
  playerCount: number
  songTitle: string
  canvasRefs: React.MutableRefObject<(HTMLCanvasElement | null)[]>
  paused: boolean
  onPauseToggle: () => void
  onQuit: () => void
  onRestart: () => void
  onPress: (player: number, lane: number) => void
  onRelease: (player: number, lane: number) => void
}) {
  const { playerCount, songTitle, canvasRefs, paused, onPauseToggle, onQuit, onRestart, onPress, onRelease } = props

  // Play takes over the viewport: a highway that scrolls with the page, or sits
  // under the site header, is unplayable.
  return (
    <div className="fixed inset-0 z-40 flex flex-col min-h-0 bg-[#07080d]">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/25">{songTitle}</p>
        <button
          onClick={onPauseToggle}
          className="px-3 py-1.5 rounded-full border border-white/12 text-xs text-white/55 hover:text-white hover:bg-white/5 transition-all"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>

      <div className={`flex-1 min-h-0 grid gap-3 px-3 pb-3 ${playerCount === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-md w-full mx-auto'}`}>
        {Array.from({ length: playerCount }, (_, i) => (
          <div key={i} className="flex flex-col min-h-0 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.015]">
            <canvas
              ref={el => { canvasRefs.current[i] = el }}
              className="flex-1 min-h-0 w-full block"
            />
            <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-black/30">
              {LANES.map((lane, l) => (
                <button
                  key={l}
                  aria-label={`Player ${i + 1} lane ${l + 1}`}
                  onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); onPress(i, l) }}
                  onPointerUp={() => onRelease(i, l)}
                  onPointerCancel={() => onRelease(i, l)}
                  className="h-14 md:h-16 rounded-xl border transition-transform active:scale-[0.97]"
                  style={{
                    touchAction: 'none',
                    borderColor: lane.color + '55',
                    background: lane.dim,
                  }}
                >
                  <span className="text-[11px] font-semibold" style={{ color: lane.color }}>
                    {LANE_KEYS[i]?.[l]?.toUpperCase() ?? ''}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {paused && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-3xl border border-white/12 bg-[#0b0d14] p-8 text-center">
            <p className="text-lg font-semibold mb-6">Paused</p>
            <div className="flex flex-col gap-3">
              <button onClick={onPauseToggle} className="py-3 rounded-full bg-white text-black font-semibold">Resume</button>
              <button onClick={onRestart} className="py-3 rounded-full border border-white/15 text-white/70 hover:bg-white/5">Restart</button>
              <button onClick={onQuit} className="py-3 rounded-full border border-white/10 text-white/45 hover:bg-white/5">Back to menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultsScreen(props: {
  results: PlayerResult[]
  songTitle: string
  difficulty: Difficulty
  onRetry: () => void
  onMenu: () => void
}) {
  const { results, songTitle, difficulty, onRetry, onMenu } = props
  const duel = results.length === 2
  const winner = duel
    ? results[0].score === results[1].score ? null : results[0].score > results[1].score ? 0 : 1
    : null

  return (
    <div className="relative z-10 flex-1 px-5 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/25">{songTitle} &middot; {DIFFICULTY_SPEC[difficulty].label}</p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3">
            {duel
              ? winner === null ? 'Dead heat' : `${results[winner].name} takes it`
              : 'Run complete'}
          </h2>
        </div>

        <div className={`grid gap-4 ${duel ? 'md:grid-cols-2' : ''}`}>
          {results.map((r, i) => (
            <div
              key={i}
              className="rounded-3xl border p-6"
              style={{
                borderColor: winner === i ? PLAYER_ACCENT[i] + '55' : 'rgba(255,255,255,0.1)',
                background: winner === i ? PLAYER_ACCENT[i] + '0f' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-sm font-medium" style={{ color: PLAYER_ACCENT[i] }}>{r.name}</p>
                <p className="text-5xl font-bold">{r.grade}</p>
              </div>
              <p className="text-3xl font-semibold mb-5">{r.score.toLocaleString()}</p>
              <dl className="space-y-2 text-sm">
                <Row k="Accuracy" v={`${(r.accuracy * 100).toFixed(1)}%`} />
                <Row k="Best combo" v={String(r.maxCombo)} />
                <Row k="Perfect" v={String(r.counts.perfect)} />
                <Row k="Great" v={String(r.counts.great)} />
                <Row k="Good" v={String(r.counts.good)} />
                <Row k="Missed" v={String(r.counts.miss)} />
              </dl>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <button onClick={onRetry} className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all">
            Play again
          </button>
          <button onClick={onMenu} className="px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:bg-white/5 transition-all">
            Change track
          </button>
          <Link href="/music-lab" className="px-8 py-3.5 rounded-full border border-white/10 text-white/45 hover:bg-white/5 transition-all">
            Music Lab
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Small pieces ───────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-3">{label}</p>
      {children}
    </section>
  )
}

function Choice(props: { active: boolean; onClick: () => void; title: string; sub?: string; disabled?: boolean }) {
  const { active, onClick, title, sub, disabled } = props
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-2xl border text-left transition-all ${
        disabled
          ? 'opacity-40 cursor-not-allowed border-white/8 bg-white/[0.01]'
          : active
            ? 'bg-white/[0.06] border-white/25'
            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
      }`}
    >
      <p className="font-semibold">{title}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </button>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block mx-0.5 px-1.5 py-0.5 rounded border border-white/15 bg-white/5 text-[10px] text-white/60 font-mono">
      {children}
    </span>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-white/40">{k}</dt>
      <dd className="text-white/80 tabular-nums">{v}</dd>
    </div>
  )
}
