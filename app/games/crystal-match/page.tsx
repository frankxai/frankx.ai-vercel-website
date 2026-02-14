'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Trophy, Zap, Star } from 'lucide-react'

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

const GEMS = [
  { id: 0, color: '#a855f7', glow: 'rgba(168,85,247,0.5)', label: 'Amethyst' },   // purple
  { id: 1, color: '#22d3ee', glow: 'rgba(34,211,238,0.5)', label: 'Aqua' },        // cyan
  { id: 2, color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', label: 'Topaz' },       // amber
  { id: 3, color: '#10b981', glow: 'rgba(16,185,129,0.5)', label: 'Emerald' },     // green
  { id: 4, color: '#f43f5e', glow: 'rgba(244,63,94,0.5)', label: 'Ruby' },         // rose
  { id: 5, color: '#3b82f6', glow: 'rgba(59,130,246,0.5)', label: 'Sapphire' },    // blue
]

const BOARD_SIZE = 8
const MIN_MATCH = 3
const SWAP_THRESHOLD = 20 // px — minimum drag distance to trigger swap

type Cell = {
  gemId: number
  key: number // unique key for animation tracking
}

type Position = { row: number; col: number }

// ============================================================================
// GAME LOGIC (pure functions)
// ============================================================================

let keyCounter = 0
function nextKey() {
  return ++keyCounter
}

function randomGem(): Cell {
  return { gemId: Math.floor(Math.random() * GEMS.length), key: nextKey() }
}

function createBoard(): Cell[][] {
  const board: Cell[][] = []
  for (let r = 0; r < BOARD_SIZE; r++) {
    board[r] = []
    for (let c = 0; c < BOARD_SIZE; c++) {
      // Avoid initial matches of 3
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

  // Horizontal
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

  // Vertical
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

function applyGravity(board: Cell[][]): Cell[][] {
  const b = cloneBoard(board)
  for (let c = 0; c < BOARD_SIZE; c++) {
    // Collect non-empty cells from bottom up
    const gems: Cell[] = []
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      if (b[r][c].gemId >= 0) gems.push(b[r][c])
    }
    // Fill from bottom
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      const idx = BOARD_SIZE - 1 - r
      b[r][c] = idx < gems.length ? gems[idx] : randomGem()
    }
  }
  return b
}

function swapCells(board: Cell[][], a: Position, b: Position): Cell[][] {
  const newBoard = cloneBoard(board)
  const temp = newBoard[a.row][a.col]
  newBoard[a.row][a.col] = newBoard[b.row][b.col]
  newBoard[b.row][b.col] = temp
  return newBoard
}

function areAdjacent(a: Position, b: Position): boolean {
  return (
    (Math.abs(a.row - b.row) === 1 && a.col === b.col) ||
    (Math.abs(a.col - b.col) === 1 && a.row === b.row)
  )
}

// Process all cascading matches, returns [finalBoard, totalPoints, cascadeCount]
function processBoard(board: Cell[][]): [Cell[][], number, number] {
  let b = board
  let totalPoints = 0
  let cascades = 0

  while (true) {
    const matches = findMatches(b)
    if (matches.size === 0) break

    cascades++
    // Points: base per gem + cascade multiplier
    const basePoints = matches.size * 10
    const multiplier = Math.min(cascades, 5)
    totalPoints += basePoints * multiplier

    b = removeMatches(b, matches)
    b = applyGravity(b)
  }

  return [b, totalPoints, cascades]
}

// ============================================================================
// GEM COMPONENT
// ============================================================================

function GemCell({
  cell,
  row,
  col,
  isSelected,
  isMatched,
  onPointerDown,
}: {
  cell: Cell
  row: number
  col: number
  isSelected: boolean
  isMatched: boolean
  onPointerDown: (row: number, col: number, e: React.PointerEvent) => void
}) {
  const gem = GEMS[cell.gemId]
  if (!gem) return <div className="aspect-square" />

  return (
    <div
      className="aspect-square p-[6%] cursor-pointer select-none touch-none"
      onPointerDown={(e) => onPointerDown(row, col, e)}
      role="button"
      aria-label={`${gem.label} at row ${row + 1}, column ${col + 1}`}
    >
      <div
        className={`w-full h-full rounded-xl transition-all duration-200 ${
          isSelected ? 'scale-110 ring-2 ring-white/60' : 'scale-100'
        } ${isMatched ? 'animate-pulse scale-0 opacity-0' : ''}`}
        style={{
          background: `radial-gradient(circle at 35% 35%, ${gem.color}dd, ${gem.color}88, ${gem.color}44)`,
          boxShadow: isSelected
            ? `0 0 20px ${gem.glow}, 0 0 40px ${gem.glow}`
            : `0 2px 8px ${gem.glow}, inset 0 1px 2px rgba(255,255,255,0.3)`,
        }}
      >
        {/* Inner shine */}
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

export default function CrystalMatchPage() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard())
  const [selected, setSelected] = useState<Position | null>(null)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(30)
  const [combo, setCombo] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [matchedCells, setMatchedCells] = useState<Set<string>>(new Set())

  const dragStart = useRef<{ x: number; y: number; row: number; col: number } | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  // Load best score
  useEffect(() => {
    const saved = localStorage.getItem('crystal-match-best')
    if (saved) setBestScore(parseInt(saved, 10))
  }, [])

  const handleSwap = useCallback(
    async (from: Position, to: Position) => {
      if (isAnimating || gameOver || moves <= 0) return
      if (!areAdjacent(from, to)) return

      setIsAnimating(true)
      setSelected(null)

      // Perform swap
      const swapped = swapCells(board, from, to)
      const matches = findMatches(swapped)

      if (matches.size === 0) {
        // Invalid swap — briefly show then revert
        setBoard(swapped)
        await new Promise(r => setTimeout(r, 200))
        setBoard(board)
        setIsAnimating(false)
        return
      }

      // Valid swap
      setBoard(swapped)
      setMoves(m => m - 1)

      // Animate matches
      await new Promise(r => setTimeout(r, 100))
      setMatchedCells(matches)
      await new Promise(r => setTimeout(r, 300))

      // Process cascades
      const [finalBoard, points, cascadeCount] = processBoard(swapped)
      setMatchedCells(new Set())
      setBoard(finalBoard)
      setScore(s => {
        const newScore = s + points
        // Update best score
        setBestScore(prev => {
          const best = Math.max(prev, newScore)
          localStorage.setItem('crystal-match-best', String(best))
          return best
        })
        return newScore
      })
      setCombo(cascadeCount > 1 ? cascadeCount : 0)

      // Check game over
      if (moves - 1 <= 0) {
        await new Promise(r => setTimeout(r, 400))
        setGameOver(true)
      }

      // Clear combo display after a moment
      if (cascadeCount > 1) {
        setTimeout(() => setCombo(0), 1500)
      }

      setIsAnimating(false)
    },
    [board, isAnimating, gameOver, moves]
  )

  const handlePointerDown = useCallback(
    (row: number, col: number, e: React.PointerEvent) => {
      if (isAnimating || gameOver) return
      e.preventDefault()

      dragStart.current = { x: e.clientX, y: e.clientY, row, col }

      if (selected && areAdjacent(selected, { row, col })) {
        // Tap to swap with selected
        handleSwap(selected, { row, col })
      } else {
        setSelected({ row, col })
      }
    },
    [selected, isAnimating, gameOver, handleSwap]
  )

  // Global pointer move/up for swipe detection
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStart.current || isAnimating || gameOver) return

      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > SWAP_THRESHOLD) {
        const { row, col } = dragStart.current
        let targetRow = row
        let targetCol = col

        if (Math.abs(dx) > Math.abs(dy)) {
          targetCol += dx > 0 ? 1 : -1
        } else {
          targetRow += dy > 0 ? 1 : -1
        }

        // Bounds check
        if (targetRow >= 0 && targetRow < BOARD_SIZE && targetCol >= 0 && targetCol < BOARD_SIZE) {
          handleSwap({ row, col }, { row: targetRow, col: targetCol })
        }

        dragStart.current = null
      }
    }

    const handlePointerUp = () => {
      dragStart.current = null
    }

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
    setMoves(30)
    setCombo(0)
    setGameOver(false)
    setMatchedCells(new Set())
    setIsAnimating(false)
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#030712]/90 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/games"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
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
              <div className="text-lg font-semibold text-white tabular-nums">{score.toLocaleString()}</div>
            </div>
          </div>

          {combo > 1 && (
            <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 animate-bounce">
              <span className="text-sm font-bold text-amber-300">{combo}x Combo!</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <div className="text-right">
              <div className="text-xs text-white/40">Moves</div>
              <div className={`text-lg font-semibold tabular-nums ${moves <= 5 ? 'text-red-400' : 'text-white'}`}>
                {moves}
              </div>
            </div>
          </div>
        </div>

        {/* Best Score */}
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <Trophy className="w-3 h-3 text-amber-400/60" />
          <span className="text-xs text-white/30">Best: {bestScore.toLocaleString()}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <div
          ref={boardRef}
          className="w-full max-w-lg aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.08] p-2 touch-none select-none"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <GemCell
                key={cell.key}
                cell={cell}
                row={r}
                col={c}
                isSelected={selected?.row === r && selected?.col === c}
                isMatched={matchedCells.has(`${r},${c}`)}
                onPointerDown={handlePointerDown}
              />
            ))
          )}
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm p-8 rounded-3xl bg-[#0a0f1a] border border-white/[0.1] text-center">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Game Over!</h2>
            <div className="text-4xl font-bold text-white mb-1">{score.toLocaleString()}</div>
            <p className="text-sm text-white/40 mb-6">
              {score >= bestScore ? 'New high score!' : `Best: ${bestScore.toLocaleString()}`}
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

      {/* Touch hint (first time) */}
      <div className="max-w-lg mx-auto w-full px-4 pb-6 text-center">
        <p className="text-xs text-white/20">Tap to select, then tap adjacent to swap. Or swipe to swap directly.</p>
      </div>
    </div>
  )
}
