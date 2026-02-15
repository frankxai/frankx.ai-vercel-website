'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Trophy, Zap, Star } from 'lucide-react'

// ── CSS: World-class animation choreography ──
const GAME_STYLES = `
@keyframes gem-idle-shimmer {
  0%, 100% { filter: hue-rotate(0deg) brightness(1); transform: scale(1); }
  50% { filter: hue-rotate(2deg) brightness(1.08); transform: scale(1.02); }
}
@keyframes gem-match-pulse {
  0% { transform: scale(1); filter: brightness(1); }
  40% { transform: scale(1.18); filter: brightness(1.6); }
  100% { transform: scale(0); filter: brightness(2); opacity: 0; }
}
@keyframes gem-drop {
  0% { transform: translateY(var(--drop-from)) scale(0.85); opacity: 0.3; }
  60% { transform: translateY(2px) scale(1.04); opacity: 1; }
  75% { transform: translateY(-3px) scale(0.98); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes gem-swap-out {
  0% { transform: translate(0,0); }
  20% { transform: translate(calc(var(--lean-x) * 2px), calc(var(--lean-y) * 2px)) scale(0.95); }
  100% { transform: translate(var(--swap-x), var(--swap-y)) scale(1); }
}
@keyframes gem-reject {
  0% { transform: translate(0,0); }
  25% { transform: translate(calc(var(--swap-x) * 0.3), calc(var(--swap-y) * 0.3)); }
  55% { transform: translate(calc(var(--swap-x) * -0.08), calc(var(--swap-y) * -0.08)); }
  100% { transform: translate(0,0); }
}
@keyframes gem-select-pulse {
  0%, 100% { box-shadow: 0 0 15px var(--gem-glow), 0 0 30px var(--gem-glow); transform: scale(1.08); }
  50% { box-shadow: 0 0 25px var(--gem-glow), 0 0 50px var(--gem-glow); transform: scale(1.12); }
}
@keyframes board-reject-flash {
  0%, 100% { border-color: rgba(255,255,255,0.08); }
  50% { border-color: rgba(244, 63, 94, 0.4); }
}
@keyframes score-float {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.6); }
}
@keyframes combo-enter {
  0% { transform: scale(0.3); opacity: 0; }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes score-roll {
  0% { transform: translateY(8px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes gameover-flash {
  0% { opacity: 0; }
  30% { opacity: 0.3; }
  100% { opacity: 0; }
}
@keyframes sparkle-drift {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  20% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0; transform: translateY(-30px) scale(0.3); }
}
@keyframes win-wave {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-6px) rotate(-3deg); }
  75% { transform: translateY(-3px) rotate(2deg); }
}
.gem-idle { animation: gem-idle-shimmer 3s ease-in-out infinite; }
.gem-matched { animation: gem-match-pulse 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.gem-dropping { animation: gem-drop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.gem-swapping { animation: gem-swap-out 0.22s cubic-bezier(0.33, 1, 0.68, 1) forwards; }
.gem-rejecting { animation: gem-reject 0.35s cubic-bezier(0.33, 1, 0.68, 1) forwards; }
.gem-selecting { animation: gem-select-pulse 0.6s ease-in-out infinite; }
.board-reject-flash { animation: board-reject-flash 0.2s ease-in-out; }
.score-float { animation: score-float 0.9s ease-out forwards; pointer-events: none; }
.combo-enter { animation: combo-enter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.score-rolling { animation: score-roll 0.2s ease-out; }
.gameover-flash { animation: gameover-flash 0.6s ease-out; }
.win-dance { animation: win-wave 0.5s ease-in-out infinite; }
`

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

const GEMS = [
  { id: 0, color: '#a855f7', glow: 'rgba(168,85,247,0.5)', label: 'Amethyst' },
  { id: 1, color: '#22d3ee', glow: 'rgba(34,211,238,0.5)', label: 'Aqua' },
  { id: 2, color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', label: 'Topaz' },
  { id: 3, color: '#10b981', glow: 'rgba(16,185,129,0.5)', label: 'Emerald' },
  { id: 4, color: '#f43f5e', glow: 'rgba(244,63,94,0.5)', label: 'Ruby' },
  { id: 5, color: '#3b82f6', glow: 'rgba(59,130,246,0.5)', label: 'Sapphire' },
]

const BOARD_SIZE = 8
const MIN_MATCH = 3
const SWAP_THRESHOLD = 20

type Cell = { gemId: number; key: number }
type Position = { row: number; col: number }

// Combo color progression: blue → purple → gold → rainbow
const COMBO_COLORS = ['#22d3ee', '#a855f7', '#f59e0b', '#f43f5e', '#10b981']

// ============================================================================
// GAME LOGIC (pure functions — identical rules)
// ============================================================================

let keyCounter = 0
function nextKey() { return ++keyCounter }
function randomGem(): Cell { return { gemId: Math.floor(Math.random() * GEMS.length), key: nextKey() } }

function createBoard(): Cell[][] {
  const board: Cell[][] = []
  for (let r = 0; r < BOARD_SIZE; r++) {
    board[r] = []
    for (let c = 0; c < BOARD_SIZE; c++) {
      let cell = randomGem()
      while (
        (c >= 2 && board[r][c - 1].gemId === cell.gemId && board[r][c - 2].gemId === cell.gemId) ||
        (r >= 2 && board[r - 1][c].gemId === cell.gemId && board[r - 2][c].gemId === cell.gemId)
      ) {
        cell = randomGem()
      }
      board[r][c] = cell
    }
  }
  return board
}

function cloneBoard(board: Cell[][]): Cell[][] {
  return board.map(row => row.map(cell => ({ ...cell })))
}

function findMatches(board: Cell[][]): Set<string> {
  const matched = new Set<string>()
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c <= BOARD_SIZE - MIN_MATCH; c++) {
      const gem = board[r][c].gemId
      if (gem < 0) continue
      let len = 1
      while (c + len < BOARD_SIZE && board[r][c + len].gemId === gem) len++
      if (len >= MIN_MATCH) {
        for (let i = 0; i < len; i++) matched.add(`${r},${c + i}`)
      }
    }
  }
  for (let c = 0; c < BOARD_SIZE; c++) {
    for (let r = 0; r <= BOARD_SIZE - MIN_MATCH; r++) {
      const gem = board[r][c].gemId
      if (gem < 0) continue
      let len = 1
      while (r + len < BOARD_SIZE && board[r + len][c].gemId === gem) len++
      if (len >= MIN_MATCH) {
        for (let i = 0; i < len; i++) matched.add(`${r + i},${c}`)
      }
    }
  }
  return matched
}

function removeMatches(board: Cell[][], matches: Set<string>): Cell[][] {
  const b = cloneBoard(board)
  for (const key of matches) {
    const [r, c] = key.split(',').map(Number)
    b[r][c] = { gemId: -1, key: b[r][c].key }
  }
  return b
}

function applyGravity(board: Cell[][]): { board: Cell[][]; newCells: Set<string>; dropDistances: Map<string, number> } {
  const b = cloneBoard(board)
  const newCells = new Set<string>()
  const dropDistances = new Map<string, number>()

  for (let c = 0; c < BOARD_SIZE; c++) {
    const gems: Cell[] = []
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      if (b[r][c].gemId >= 0) gems.push(b[r][c])
    }
    const emptyCount = BOARD_SIZE - gems.length
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      const idx = BOARD_SIZE - 1 - r
      if (idx < gems.length) {
        // Existing gem that may have dropped
        const origRow = board.findIndex((row) => row[c].key === gems[idx].key)
        if (origRow !== r && origRow >= 0) {
          dropDistances.set(`${r},${c}`, r - origRow)
        }
        b[r][c] = gems[idx]
      } else {
        // New gem from top
        b[r][c] = randomGem()
        newCells.add(`${r},${c}`)
        dropDistances.set(`${r},${c}`, emptyCount)
      }
    }
  }
  return { board: b, newCells, dropDistances }
}

function swapCells(board: Cell[][], a: Position, b: Position): Cell[][] {
  const newBoard = cloneBoard(board)
  const temp = newBoard[a.row][a.col]
  newBoard[a.row][a.col] = newBoard[b.row][b.col]
  newBoard[b.row][b.col] = temp
  return newBoard
}

function areAdjacent(a: Position, b: Position): boolean {
  return (Math.abs(a.row - b.row) === 1 && a.col === b.col) ||
    (Math.abs(a.col - b.col) === 1 && a.row === b.row)
}

// Process all cascading matches
function processBoard(board: Cell[][]): { board: Cell[][]; totalPoints: number; cascades: number; allMatches: Set<string>[] } {
  let b = board
  let totalPoints = 0
  let cascades = 0
  const allMatches: Set<string>[] = []

  while (true) {
    const matches = findMatches(b)
    if (matches.size === 0) break
    cascades++
    allMatches.push(matches)
    const basePoints = matches.size * 10
    const multiplier = Math.min(cascades, 5)
    totalPoints += basePoints * multiplier
    const removed = removeMatches(b, matches)
    const { board: dropped } = applyGravity(removed)
    b = dropped
  }

  return { board: b, totalPoints, cascades, allMatches }
}

// ============================================================================
// GEM COMPONENT
// ============================================================================

function GemCell({
  cell, row, col, isSelected, isMatched, isNew, dropDistance, animState, swapDir,
  shimmerOffset, onPointerDown,
}: {
  cell: Cell; row: number; col: number
  isSelected: boolean; isMatched: boolean; isNew: boolean
  dropDistance: number; animState: 'idle' | 'swapping' | 'rejecting'
  swapDir: { dx: number; dy: number }
  shimmerOffset: number
  onPointerDown: (row: number, col: number, e: React.PointerEvent) => void
}) {
  const gem = GEMS[cell.gemId]
  if (!gem) return <div className="aspect-square" />

  let animClass = ''
  const style: React.CSSProperties & Record<string, string | number> = {
    '--gem-glow': gem.glow,
    animationDelay: `${shimmerOffset}ms`,
  }

  if (isMatched) {
    animClass = 'gem-matched'
  } else if (animState === 'swapping') {
    animClass = 'gem-swapping'
    const cellSize = 100 / BOARD_SIZE
    style['--swap-x'] = `${swapDir.dx * cellSize}%`
    style['--swap-y'] = `${swapDir.dy * cellSize}%`
    style['--lean-x'] = String(swapDir.dx)
    style['--lean-y'] = String(swapDir.dy)
  } else if (animState === 'rejecting') {
    animClass = 'gem-rejecting'
    const cellSize = 100 / BOARD_SIZE
    style['--swap-x'] = `${swapDir.dx * cellSize}%`
    style['--swap-y'] = `${swapDir.dy * cellSize}%`
  } else if (isNew || dropDistance > 0) {
    animClass = 'gem-dropping'
    style['--drop-from'] = `${-dropDistance * 100}%`
    style.animationDelay = `${(col * 30)}ms`
  } else if (isSelected) {
    animClass = 'gem-selecting'
  } else {
    animClass = 'gem-idle'
  }

  return (
    <div
      className="aspect-square p-[6%] cursor-pointer select-none touch-none"
      onPointerDown={(e) => onPointerDown(row, col, e)}
      role="button"
      aria-label={`${gem.label} at row ${row + 1}, column ${col + 1}`}
    >
      <div
        className={`w-full h-full rounded-xl transition-shadow duration-150 ${animClass}`}
        style={{
          ...style,
          background: `radial-gradient(circle at 35% 35%, ${gem.color}dd, ${gem.color}88, ${gem.color}44)`,
          boxShadow: isSelected
            ? `0 0 20px ${gem.glow}, 0 0 40px ${gem.glow}`
            : `0 2px 8px ${gem.glow}, inset 0 1px 2px rgba(255,255,255,0.3)`,
        } as React.CSSProperties}
      >
        <div
          className="w-full h-full rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
          }}
        />
      </div>
    </div>
  )
}

// ============================================================================
// GAME COMPONENT
// ============================================================================

type FloatingScore = { id: number; x: number; y: number; text: string; color: string }
let floatIdCounter = 0

export default function CrystalMatchPage() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard())
  const [selected, setSelected] = useState<Position | null>(null)
  const [score, setScore] = useState(0)
  const [displayScore, setDisplayScore] = useState(0) // animated score
  const [moves, setMoves] = useState(30)
  const [combo, setCombo] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [matchedCells, setMatchedCells] = useState<Set<string>>(new Set())
  const [newCells, setNewCells] = useState<Set<string>>(new Set())
  const [dropDistances, setDropDistances] = useState<Map<string, number>>(new Map())
  const [boardFlash, setBoardFlash] = useState(false)
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([])
  const [swappingCells, setSwappingCells] = useState<{ from: Position; to: Position } | null>(null)
  const [rejectingCells, setRejectingCells] = useState<{ from: Position; to: Position } | null>(null)
  const [winState, setWinState] = useState(false)
  const [scoreRolling, setScoreRolling] = useState(false)

  const dragStart = useRef<{ x: number; y: number; row: number; col: number } | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  // Shimmer offsets — staggered per position for ripple effect
  const shimmerOffsets = useMemo(() => {
    const offsets: number[][] = []
    for (let r = 0; r < BOARD_SIZE; r++) {
      offsets[r] = []
      for (let c = 0; c < BOARD_SIZE; c++) {
        // Radial wave from center
        const dist = Math.sqrt(Math.pow(r - 3.5, 2) + Math.pow(c - 3.5, 2))
        offsets[r][c] = Math.round(dist * 200) // ms offset
      }
    }
    return offsets
  }, [])

  // Animated score counter
  useEffect(() => {
    if (displayScore === score) return
    const step = Math.max(1, Math.ceil(Math.abs(score - displayScore) / 8))
    const timer = setTimeout(() => {
      setDisplayScore(prev => {
        if (prev < score) return Math.min(prev + step, score)
        return score
      })
    }, 30)
    return () => clearTimeout(timer)
  }, [displayScore, score])

  useEffect(() => {
    const saved = localStorage.getItem('crystal-match-best')
    if (saved) setBestScore(parseInt(saved, 10))
  }, [])

  const addFloatingScore = useCallback((text: string, color: string, x?: number, y?: number) => {
    const id = ++floatIdCounter
    setFloatingScores(prev => [...prev, { id, x: x ?? 50, y: y ?? 40, text, color }])
    setTimeout(() => setFloatingScores(prev => prev.filter(f => f.id !== id)), 950)
  }, [])

  const handleSwap = useCallback(
    async (from: Position, to: Position) => {
      if (isAnimating || gameOver || moves <= 0) return
      if (!areAdjacent(from, to)) return

      setIsAnimating(true)
      setSelected(null)

      const dx = to.col - from.col
      const dy = to.row - from.row

      // Stage 1: Anticipation + Swap animation (220ms)
      setSwappingCells({ from, to })
      await new Promise(r => setTimeout(r, 240))
      setSwappingCells(null)

      // Perform logical swap
      const swapped = swapCells(board, from, to)
      const matches = findMatches(swapped)

      if (matches.size === 0) {
        // Invalid swap — gems reject + board border flash
        setBoard(swapped)
        setRejectingCells({ from: to, to: from })
        setBoardFlash(true)
        await new Promise(r => setTimeout(r, 350))
        setBoard(board) // revert
        setRejectingCells(null)
        setBoardFlash(false)
        setIsAnimating(false)
        return
      }

      // Valid swap — apply to board
      setBoard(swapped)
      setMoves(m => m - 1)

      // Stage 2: Process cascading matches with visual steps
      let currentBoard = swapped
      let totalPoints = 0
      let cascadeCount = 0

      while (true) {
        const currentMatches = findMatches(currentBoard)
        if (currentMatches.size === 0) break

        cascadeCount++
        const basePoints = currentMatches.size * 10
        const multiplier = Math.min(cascadeCount, 5)
        const stepPoints = basePoints * multiplier
        totalPoints += stepPoints

        // Show matched gems pulsing
        setMatchedCells(currentMatches)
        await new Promise(r => setTimeout(r, 150))

        // Pop: remove matched gems
        const removed = removeMatches(currentBoard, currentMatches)
        setBoard(removed)

        // Floating score at match center
        const matchPositions = Array.from(currentMatches).map(k => k.split(',').map(Number))
        const avgCol = matchPositions.reduce((s, p) => s + p[1], 0) / matchPositions.length
        const avgRow = matchPositions.reduce((s, p) => s + p[0], 0) / matchPositions.length
        const pctX = ((avgCol + 0.5) / BOARD_SIZE) * 100
        const pctY = ((avgRow + 0.5) / BOARD_SIZE) * 100
        const comboColor = COMBO_COLORS[Math.min(cascadeCount - 1, COMBO_COLORS.length - 1)]
        addFloatingScore(`+${stepPoints}`, comboColor, pctX, pctY)

        await new Promise(r => setTimeout(r, 200))

        // Gravity: gems fall with stagger
        const { board: dropped, newCells: nc, dropDistances: dd } = applyGravity(removed)
        setMatchedCells(new Set())
        setNewCells(nc)
        setDropDistances(dd)
        setBoard(dropped)
        currentBoard = dropped

        // Staggered drop settling time
        await new Promise(r => setTimeout(r, 280))
        setNewCells(new Set())
        setDropDistances(new Map())
      }

      // Update score with rolling animation
      if (totalPoints > 0) {
        setScoreRolling(true)
        setScore(s => {
          const newScore = s + totalPoints
          setBestScore(prev => {
            const best = Math.max(prev, newScore)
            localStorage.setItem('crystal-match-best', String(best))
            return best
          })
          return newScore
        })
        setTimeout(() => setScoreRolling(false), 300)
      }

      // Combo display
      if (cascadeCount > 1) {
        setCombo(cascadeCount)
        setTimeout(() => setCombo(0), 2000)
      } else {
        setCombo(0)
      }

      // Check game over
      if (moves - 1 <= 0) {
        await new Promise(r => setTimeout(r, 500))
        if (score + totalPoints > bestScore) {
          setWinState(true)
        }
        setGameOver(true)
      }

      setIsAnimating(false)
    },
    [board, isAnimating, gameOver, moves, score, bestScore, addFloatingScore]
  )

  const handlePointerDown = useCallback(
    (row: number, col: number, e: React.PointerEvent) => {
      if (isAnimating || gameOver) return
      e.preventDefault()
      dragStart.current = { x: e.clientX, y: e.clientY, row, col }

      if (selected && areAdjacent(selected, { row, col })) {
        handleSwap(selected, { row, col })
      } else {
        setSelected({ row, col })
      }
    },
    [selected, isAnimating, gameOver, handleSwap]
  )

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStart.current || isAnimating || gameOver) return
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (Math.sqrt(dx * dx + dy * dy) > SWAP_THRESHOLD) {
        const { row, col } = dragStart.current
        let targetRow = row, targetCol = col
        if (Math.abs(dx) > Math.abs(dy)) { targetCol += dx > 0 ? 1 : -1 }
        else { targetRow += dy > 0 ? 1 : -1 }
        if (targetRow >= 0 && targetRow < BOARD_SIZE && targetCol >= 0 && targetCol < BOARD_SIZE) {
          handleSwap({ row, col }, { row: targetRow, col: targetCol })
        }
        dragStart.current = null
      }
    }
    const handlePointerUp = () => { dragStart.current = null }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isAnimating, gameOver, handleSwap])

  const resetGame = useCallback(() => {
    keyCounter = 0
    setBoard(createBoard())
    setSelected(null)
    setScore(0)
    setDisplayScore(0)
    setMoves(30)
    setCombo(0)
    setBestScore(prev => {
      const saved = localStorage.getItem('crystal-match-best')
      return saved ? parseInt(saved, 10) : prev
    })
    setGameOver(false)
    setIsAnimating(false)
    setMatchedCells(new Set())
    setNewCells(new Set())
    setDropDistances(new Map())
    setBoardFlash(false)
    setFloatingScores([])
    setSwappingCells(null)
    setRejectingCells(null)
    setWinState(false)
    setScoreRolling(false)
  }, [])

  // Get animation state for each cell
  const getCellAnimState = useCallback((r: number, c: number): { state: 'idle' | 'swapping' | 'rejecting'; dir: { dx: number; dy: number } } => {
    if (swappingCells) {
      const { from, to } = swappingCells
      if (from.row === r && from.col === c) {
        return { state: 'swapping', dir: { dx: to.col - from.col, dy: to.row - from.row } }
      }
      if (to.row === r && to.col === c) {
        return { state: 'swapping', dir: { dx: from.col - to.col, dy: from.row - to.row } }
      }
    }
    if (rejectingCells) {
      const { from, to } = rejectingCells
      if (from.row === r && from.col === c) {
        return { state: 'rejecting', dir: { dx: to.col - from.col, dy: to.row - from.row } }
      }
      if (to.row === r && to.col === c) {
        return { state: 'rejecting', dir: { dx: from.col - to.col, dy: from.row - to.row } }
      }
    }
    return { state: 'idle', dir: { dx: 0, dy: 0 } }
  }, [swappingCells, rejectingCells])

  const comboLabel = combo >= 5 ? 'INSANE!' : combo >= 4 ? 'Amazing!' : combo >= 3 ? 'Great!' : `${combo}x Cascade!`

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: GAME_STYLES }} />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#030712]/90 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/games" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Games
          </Link>
          <h1 className="text-sm font-medium text-white">Crystal Match</h1>
          <button
            onClick={resetGame}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-all"
            aria-label="Restart game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Score Bar */}
      <div className="max-w-lg mx-auto w-full px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-xs text-white/40">Score</div>
              <div className={`text-lg font-semibold text-white tabular-nums ${scoreRolling ? 'score-rolling' : ''}`}>
                {displayScore.toLocaleString()}
              </div>
            </div>
          </div>

          {combo > 1 && (
            <div key={combo} className="combo-enter px-3 py-1.5 rounded-full border"
              style={{
                background: `${COMBO_COLORS[Math.min(combo - 1, COMBO_COLORS.length - 1)]}20`,
                borderColor: `${COMBO_COLORS[Math.min(combo - 1, COMBO_COLORS.length - 1)]}40`,
                boxShadow: `0 0 16px ${COMBO_COLORS[Math.min(combo - 1, COMBO_COLORS.length - 1)]}30`,
              }}>
              <span className="text-sm font-bold" style={{ color: COMBO_COLORS[Math.min(combo - 1, COMBO_COLORS.length - 1)] }}>
                {comboLabel}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <div className="text-right">
              <div className="text-xs text-white/40">Moves</div>
              <div className={`text-lg font-semibold tabular-nums ${moves <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {moves}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1.5">
          <Trophy className="w-3 h-3 text-amber-400/60" />
          <span className="text-xs text-white/30">Best: {bestScore.toLocaleString()}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="relative w-full max-w-lg">
          <div
            ref={boardRef}
            className={`w-full aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.08] p-2 touch-none select-none ${boardFlash ? 'board-reject-flash' : ''}`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
            }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const { state: animState, dir } = getCellAnimState(r, c)
                return (
                  <GemCell
                    key={cell.key}
                    cell={cell}
                    row={r}
                    col={c}
                    isSelected={selected?.row === r && selected?.col === c}
                    isMatched={matchedCells.has(`${r},${c}`)}
                    isNew={newCells.has(`${r},${c}`)}
                    dropDistance={dropDistances.get(`${r},${c}`) ?? 0}
                    animState={animState}
                    swapDir={dir}
                    shimmerOffset={shimmerOffsets[r][c]}
                    onPointerDown={handlePointerDown}
                  />
                )
              })
            )}
          </div>

          {/* Floating Score Popups */}
          {floatingScores.map(fs => (
            <div
              key={fs.id}
              className="score-float absolute text-2xl font-bold pointer-events-none z-10"
              style={{
                left: `${fs.x}%`,
                top: `${fs.y}%`,
                color: fs.color,
                textShadow: `0 0 12px ${fs.color}, 0 0 24px ${fs.color}`,
                transform: 'translateX(-50%)',
              }}
            >
              {fs.text}
            </div>
          ))}
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          {winState && <div className="absolute inset-0 bg-amber-400/10 gameover-flash" />}
          <div className="w-full max-w-sm p-8 rounded-3xl bg-[#0a0f1a] border border-white/[0.1] text-center">
            <Trophy className={`w-12 h-12 mx-auto mb-4 ${winState ? 'text-amber-400 win-dance' : 'text-white/40'}`} />
            <h2 className="text-2xl font-semibold text-white mb-2">
              {winState ? 'New High Score!' : 'Game Over'}
            </h2>
            <div className="text-4xl font-bold text-white mb-1">{score.toLocaleString()}</div>
            <p className="text-sm text-white/40 mb-6">
              {winState ? 'Incredible performance!' : `Best: ${bestScore.toLocaleString()}`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 px-6 py-3 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
              >
                Play Again
              </button>
              <Link
                href="/games"
                className="flex-1 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all font-medium text-center"
              >
                More Games
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto w-full px-4 pb-6 text-center">
        <p className="text-xs text-white/20">Tap to select, then tap adjacent to swap. Or swipe to swap directly.</p>
      </div>
    </div>
  )
}
