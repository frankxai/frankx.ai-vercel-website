'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Undo2, Trophy } from 'lucide-react'

// ── CSS Animations ──────────────────────────────────
const GAME_STYLES = `
@keyframes tile-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes tile-merge {
  0% { transform: scale(1); }
  40% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
@keyframes score-bump {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); color: #fbbf24; }
  100% { transform: scale(1); }
}
@keyframes board-shake-2048 {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
.tile-new { animation: tile-pop 0.2s ease-out; }
.tile-merged { animation: tile-merge 0.2s ease-out; }
.score-bumping { animation: score-bump 0.3s ease-out; }
.board-shake-2048 { animation: board-shake-2048 0.15s ease-in-out; }
`

// ── Types ──────────────────────────────────────────────
type Cell = number // 0 = empty, 2/4/8/16/...
type Grid = Cell[][]

// ── Tile colors mapped by value ────────────────────────
const TILE_COLORS: Record<number, { bg: string; text: string; glow: string }> = {
  0:    { bg: 'bg-white/5', text: 'text-transparent', glow: '' },
  2:    { bg: 'bg-cyan-900/60', text: 'text-cyan-200', glow: '' },
  4:    { bg: 'bg-cyan-800/60', text: 'text-cyan-100', glow: '' },
  8:    { bg: 'bg-violet-700/60', text: 'text-violet-100', glow: 'shadow-violet-500/20 shadow-lg' },
  16:   { bg: 'bg-violet-600/60', text: 'text-violet-50', glow: 'shadow-violet-500/30 shadow-lg' },
  32:   { bg: 'bg-fuchsia-600/60', text: 'text-fuchsia-50', glow: 'shadow-fuchsia-500/30 shadow-lg' },
  64:   { bg: 'bg-rose-600/60', text: 'text-rose-50', glow: 'shadow-rose-500/30 shadow-lg' },
  128:  { bg: 'bg-amber-600/60', text: 'text-amber-50', glow: 'shadow-amber-500/40 shadow-xl' },
  256:  { bg: 'bg-amber-500/70', text: 'text-amber-50', glow: 'shadow-amber-400/40 shadow-xl' },
  512:  { bg: 'bg-emerald-500/70', text: 'text-emerald-50', glow: 'shadow-emerald-400/40 shadow-xl' },
  1024: { bg: 'bg-emerald-400/80', text: 'text-emerald-950', glow: 'shadow-emerald-300/50 shadow-xl' },
  2048: { bg: 'bg-yellow-400/90', text: 'text-yellow-950', glow: 'shadow-yellow-300/60 shadow-2xl' },
}

function getTileStyle(value: number) {
  return TILE_COLORS[value] || { bg: 'bg-yellow-300/90', text: 'text-yellow-950', glow: 'shadow-yellow-200/60 shadow-2xl' }
}

function getFontSize(value: number): string {
  if (value >= 1024) return 'text-lg sm:text-xl'
  if (value >= 128) return 'text-xl sm:text-2xl'
  return 'text-2xl sm:text-3xl'
}

// ── Grid helpers ───────────────────────────────────────
function createEmptyGrid(): Grid {
  return Array.from({ length: 4 }, () => Array(4).fill(0))
}

function cloneGrid(grid: Grid): Grid {
  return grid.map(row => [...row])
}

function addRandomTile(grid: Grid): Grid {
  const empty: [number, number][] = []
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (grid[r][c] === 0) empty.push([r, c])
  if (empty.length === 0) return grid
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  const newGrid = cloneGrid(grid)
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4
  return newGrid
}

function initGrid(): Grid {
  let g = createEmptyGrid()
  g = addRandomTile(g)
  g = addRandomTile(g)
  return g
}

// ── Core slide logic (operates on a single row) ───────
function slideRow(row: Cell[]): { result: Cell[]; scored: number } {
  // Remove zeros
  const filtered = row.filter(v => v !== 0)
  let scored = 0
  const merged: Cell[] = []
  let i = 0
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2
      merged.push(val)
      scored += val
      i += 2
    } else {
      merged.push(filtered[i])
      i++
    }
  }
  // Pad with zeros
  while (merged.length < 4) merged.push(0)
  return { result: merged, scored }
}

// ── Move in 4 directions ──────────────────────────────
function moveLeft(grid: Grid): { grid: Grid; scored: number; moved: boolean } {
  let scored = 0
  let moved = false
  const newGrid = grid.map(row => {
    const { result, scored: s } = slideRow(row)
    scored += s
    if (row.some((v, i) => v !== result[i])) moved = true
    return result
  })
  return { grid: newGrid, scored, moved }
}

function rotateClockwise(grid: Grid): Grid {
  const n = grid.length
  const rotated = createEmptyGrid()
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      rotated[c][n - 1 - r] = grid[r][c]
  return rotated
}

function rotateCounterClockwise(grid: Grid): Grid {
  const n = grid.length
  const rotated = createEmptyGrid()
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      rotated[n - 1 - c][r] = grid[r][c]
  return rotated
}

function move(grid: Grid, direction: 'left' | 'right' | 'up' | 'down'): { grid: Grid; scored: number; moved: boolean } {
  let g = cloneGrid(grid)
  // Rotate to make all moves equivalent to "left"
  if (direction === 'right') g = rotateClockwise(rotateClockwise(g))
  else if (direction === 'up') g = rotateClockwise(g)
  else if (direction === 'down') g = rotateCounterClockwise(g)

  const result = moveLeft(g)

  // Rotate back
  if (direction === 'right') { result.grid = rotateClockwise(rotateClockwise(result.grid)) }
  else if (direction === 'up') { result.grid = rotateCounterClockwise(result.grid) }
  else if (direction === 'down') { result.grid = rotateClockwise(result.grid) }

  return result
}

// ── Game state checks ─────────────────────────────────
function hasWon(grid: Grid): boolean {
  return grid.some(row => row.some(cell => cell >= 2048))
}

function canMove(grid: Grid): boolean {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return true
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return true
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return true
    }
  return false
}

// ── Component ─────────────────────────────────────────
export default function Neon2048Page() {
  const [grid, setGrid] = useState<Grid>(initGrid)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [keepPlaying, setKeepPlaying] = useState(false)
  const [history, setHistory] = useState<{ grid: Grid; score: number }[]>([])
  const [scoreBump, setScoreBump] = useState(false)
  const [boardShake, setBoardShake] = useState(false)
  const [lastScoreGain, setLastScoreGain] = useState(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem('neon2048-best')
    if (saved) setBestScore(parseInt(saved, 10))
  }, [])

  const handleMove = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return
    if (won && !keepPlaying) return

    setGrid(prev => {
      const result = move(prev, direction)
      if (!result.moved) return prev

      // Save history for undo (max 10)
      setHistory(h => [...h.slice(-9), { grid: cloneGrid(prev), score }])

      const newGrid = addRandomTile(result.grid)
      const newScore = score + result.scored
      setScore(newScore)
      setLastScoreGain(result.scored)

      // Score bump animation
      if (result.scored > 0) {
        setScoreBump(true)
        setTimeout(() => setScoreBump(false), 350)
      }

      // Board shake on big merges (128+)
      if (result.scored >= 128) {
        setBoardShake(true)
        setTimeout(() => setBoardShake(false), 200)
      }

      if (newScore > bestScore) {
        setBestScore(newScore)
        localStorage.setItem('neon2048-best', String(newScore))
      }

      if (!keepPlaying && hasWon(newGrid)) {
        setWon(true)
      }

      if (!canMove(newGrid)) {
        setGameOver(true)
      }

      return newGrid
    })
  }, [gameOver, won, keepPlaying, score, bestScore])

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, 'left' | 'right' | 'up' | 'down'> = {
        ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
        a: 'left', d: 'right', w: 'up', s: 'down',
      }
      const dir = map[e.key]
      if (dir) {
        e.preventDefault()
        handleMove(dir)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleMove])

  // Touch / Swipe
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touchStartRef.current = { x: t.clientX, y: t.clientY }
    }

    const onEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStartRef.current.x
      const dy = t.clientY - touchStartRef.current.y
      touchStartRef.current = null

      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      if (Math.max(absDx, absDy) < 30) return

      if (absDx > absDy) {
        handleMove(dx > 0 ? 'right' : 'left')
      } else {
        handleMove(dy > 0 ? 'down' : 'up')
      }
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [handleMove])

  const newGame = () => {
    setGrid(initGrid())
    setScore(0)
    setGameOver(false)
    setWon(false)
    setKeepPlaying(false)
    setHistory([])
  }

  const undo = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setGrid(prev.grid)
    setScore(prev.score)
    setHistory(h => h.slice(0, -1))
    setGameOver(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: GAME_STYLES }} />
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <Link href="/games" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold tracking-tight">2048 Neon</h1>
          <p className="text-xs text-white/40">Slide & merge to 2048</p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="bg-white/5 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-[10px] uppercase text-white/40 tracking-wider">Score</div>
            <div className={`text-lg font-bold text-amber-400 ${scoreBump ? 'score-bumping' : ''}`}>{score.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-[10px] uppercase text-white/40 tracking-wider">Best</div>
            <div className="text-lg font-bold text-emerald-400">{bestScore.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30"
            title="Undo"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          <button
            onClick={newGame}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            title="New Game"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex-1 flex items-start justify-center px-4 pt-2 pb-8">
        <div ref={containerRef} className="w-full max-w-[400px] touch-none select-none">
          <div className={`relative aspect-square bg-white/[0.03] rounded-2xl p-2 sm:p-3 border border-white/5 ${boardShake ? 'board-shake-2048' : ''}`}>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 h-full">
              {grid.flat().map((value, i) => {
                const style = getTileStyle(value)
                return (
                  <div
                    key={i}
                    className={`
                      flex items-center justify-center rounded-lg sm:rounded-xl font-bold
                      transition-all duration-100
                      ${style.bg} ${style.text} ${style.glow}
                      ${value > 0 ? 'scale-100' : 'scale-95'}
                    `}
                  >
                    <span className={getFontSize(value)}>
                      {value > 0 ? value : ''}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Win overlay */}
            {won && !keepPlaying && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-4 z-10">
                <Trophy className="w-12 h-12 text-yellow-400" />
                <p className="text-2xl font-bold text-yellow-400">You Win!</p>
                <p className="text-white/60 text-sm">Score: {score.toLocaleString()}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setKeepPlaying(true)}
                    className="px-5 py-2.5 bg-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/30 transition-colors text-sm font-medium"
                  >
                    Keep Going
                  </button>
                  <button
                    onClick={newGame}
                    className="px-5 py-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
                  >
                    New Game
                  </button>
                </div>
              </div>
            )}

            {/* Game Over overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-4 z-10">
                <p className="text-2xl font-bold text-rose-400">Game Over</p>
                <p className="text-white/60 text-sm">Score: {score.toLocaleString()}</p>
                <button
                  onClick={newGame}
                  className="px-6 py-2.5 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Controls hint */}
          <div className="mt-4 text-center">
            <p className="text-xs text-white/30">
              Swipe or use arrow keys / WASD to move tiles
            </p>
          </div>

          {/* How to play */}
          <div className="mt-6 bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <h2 className="text-sm font-semibold mb-2 text-white/70">How to Play</h2>
            <ul className="text-xs text-white/40 space-y-1">
              <li>Swipe or use arrow keys to slide all tiles</li>
              <li>When two tiles with the same number touch, they merge</li>
              <li>Reach the 2048 tile to win — or keep going for a higher score</li>
              <li>Use undo to take back your last move</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
