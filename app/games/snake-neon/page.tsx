'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Play, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { ParticleSystem, ScreenShake, FlashEffect, NEON } from '@/lib/games/effects'

// ── Constants ─────────────────────────────────────────
const GRID_SIZE = 20
const INITIAL_SPEED = 150 // ms per tick
const MIN_SPEED = 60
const SPEED_STEP = 3 // ms faster per food eaten

type Direction = 'up' | 'down' | 'left' | 'right'
type Point = { x: number; y: number }

// ── Neon colors for the snake body gradient ───────────
const NEON_COLORS = [
  '#43BFE3', // cyan
  '#8B5CF6', // violet
  '#AB47C7', // purple
  '#EC4899', // pink
  '#F59E0B', // amber
  '#10B981', // emerald
]

function getSegmentColor(index: number, total: number): string {
  if (total <= 1) return NEON_COLORS[0]
  const ratio = index / (total - 1)
  const colorIdx = Math.floor(ratio * (NEON_COLORS.length - 1))
  return NEON_COLORS[Math.min(colorIdx, NEON_COLORS.length - 1)]
}

export default function SnakeNeonPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameover'>('menu')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [canvasSize, setCanvasSize] = useState(360)

  // Game state refs (for the game loop)
  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }])
  const dirRef = useRef<Direction>('right')
  const nextDirRef = useRef<Direction>('right')
  const foodRef = useRef<Point>({ x: 15, y: 10 })
  const scoreRef = useRef(0)
  const speedRef = useRef(INITIAL_SPEED)
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const gameStateRef = useRef(gameState)
  const prevSnakeRef = useRef<Point[]>([])
  const lastTickTimeRef = useRef(0)
  const animFrameRef = useRef<number>(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const fxRef = useRef({
    particles: new ParticleSystem(),
    shake: new ScreenShake(),
    flash: new FlashEffect(),
  })

  // Sync gameState to ref
  useEffect(() => { gameStateRef.current = gameState }, [gameState])

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('snakeNeon-best')
    if (saved) setHighScore(parseInt(saved, 10))
  }, [])

  // Responsive canvas
  useEffect(() => {
    const updateSize = () => {
      const maxW = Math.min(window.innerWidth - 32, 480)
      // Make it square, divisible by GRID_SIZE for clean pixels
      const size = Math.floor(maxW / GRID_SIZE) * GRID_SIZE
      setCanvasSize(size)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const cellSize = canvasSize / GRID_SIZE

  // ── Spawn food not on snake ──────────────────────────
  const spawnFood = useCallback(() => {
    const snake = snakeRef.current
    let pos: Point
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snake.some(s => s.x === pos.x && s.y === pos.y))
    foodRef.current = pos
  }, [])

  // ── Draw frame ──────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cs = cellSize

    // Background
    ctx.fillStyle = '#0a0a1a'
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    // Subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cs, 0)
      ctx.lineTo(i * cs, canvasSize)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * cs)
      ctx.lineTo(canvasSize, i * cs)
      ctx.stroke()
    }

    const snake = snakeRef.current
    const food = foodRef.current
    const now = performance.now()

    // ── Interpolation: smooth slide between ticks ────
    const prev = prevSnakeRef.current
    const elapsed = now - lastTickTimeRef.current
    const tickProgress = lastTickTimeRef.current > 0 ? Math.min(elapsed / speedRef.current, 1) : 1
    const t = 1 - Math.pow(1 - tickProgress, 3) // outCubic easing

    // ── Food idle pulse ────
    const foodPulse = 0.35 + 0.05 * Math.sin(now * 0.004)
    const foodGlowSize = 1.5 + 0.3 * Math.sin(now * 0.003)
    const foodAlpha = 0.25 + 0.1 * Math.sin(now * 0.005)

    const fxPos = food.x * cs + cs / 2
    const fyPos = food.y * cs + cs / 2
    const foodGlow = ctx.createRadialGradient(fxPos, fyPos, 0, fxPos, fyPos, cs * foodGlowSize)
    foodGlow.addColorStop(0, `rgba(245, 158, 11, ${foodAlpha})`)
    foodGlow.addColorStop(1, 'rgba(245, 158, 11, 0)')
    ctx.fillStyle = foodGlow
    ctx.fillRect(food.x * cs - cs, food.y * cs - cs, cs * 3, cs * 3)

    // Food orb
    ctx.fillStyle = '#F59E0B'
    ctx.shadowColor = '#F59E0B'
    ctx.shadowBlur = 8 + 4 * Math.sin(now * 0.004)
    ctx.beginPath()
    ctx.arc(fxPos, fyPos, cs * foodPulse, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // ── Snake segments (interpolated, tail to head) ──
    for (let i = snake.length - 1; i >= 0; i--) {
      const seg = snake[i]
      const prevSeg = prev[i] || seg
      // Interpolate between previous and current grid positions
      const interpX = (prevSeg.x + (seg.x - prevSeg.x) * t) * cs
      const interpY = (prevSeg.y + (seg.y - prevSeg.y) * t) * cs

      const color = getSegmentColor(i, snake.length)
      const isHead = i === 0
      const size = isHead ? cs * 0.9 : cs * 0.8
      const offset = (cs - size) / 2

      // Glow effect
      ctx.shadowColor = color
      ctx.shadowBlur = isHead ? 12 : 4

      ctx.fillStyle = color
      const radius = isHead ? size * 0.35 : size * 0.25
      const x = interpX + offset
      const y = interpY + offset

      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.arcTo(x + size, y, x + size, y + size, radius)
      ctx.arcTo(x + size, y + size, x, y + size, radius)
      ctx.arcTo(x, y + size, x, y, radius)
      ctx.arcTo(x, y, x + size, y, radius)
      ctx.closePath()
      ctx.fill()

      ctx.shadowBlur = 0
    }

    // Snake trail (fading previous positions)
    if (snake.length > 2) {
      ctx.globalAlpha = 0.08
      for (let i = snake.length - 1; i >= 1; i--) {
        const seg = snake[i]
        ctx.fillStyle = getSegmentColor(i, snake.length)
        ctx.fillRect(seg.x * cs + cs * 0.15, seg.y * cs + cs * 0.15, cs * 0.7, cs * 0.7)
      }
      ctx.globalAlpha = 1
    }

    // Effects system: update and draw
    const effects = fxRef.current
    const shakeOff = effects.shake.update()
    if (shakeOff.x !== 0 || shakeOff.y !== 0) {
      ctx.save()
      ctx.translate(shakeOff.x, shakeOff.y)
    }
    effects.particles.update()
    effects.particles.draw(ctx)
    effects.flash.update()
    effects.flash.draw(ctx, canvasSize, canvasSize)
    if (shakeOff.x !== 0 || shakeOff.y !== 0) {
      ctx.restore()
    }
  }, [cellSize, canvasSize])

  // ── Game tick ───────────────────────────────────────
  const tick = useCallback(() => {
    if (gameStateRef.current !== 'playing') return

    // Save previous positions for smooth interpolation
    prevSnakeRef.current = snakeRef.current.map(s => ({ ...s }))
    lastTickTimeRef.current = performance.now()

    const snake = snakeRef.current
    dirRef.current = nextDirRef.current
    const dir = dirRef.current

    // Calculate new head
    const head = { ...snake[0] }
    if (dir === 'up') head.y -= 1
    else if (dir === 'down') head.y += 1
    else if (dir === 'left') head.x -= 1
    else if (dir === 'right') head.x += 1

    const fx = fxRef.current
    const cs = cellSize

    // Wall collision — sequential head-to-tail death explosion
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      const deathSnake = [...snake]
      deathSnake.forEach((seg, idx) => {
        setTimeout(() => {
          fx.particles.burst(seg.x * cs + cs / 2, seg.y * cs + cs / 2, 6,
            getSegmentColor(idx, deathSnake.length), {
            speed: 3, size: 2.5, life: 25,
            colors: [getSegmentColor(idx, deathSnake.length), NEON.rose, NEON.violet],
          })
        }, idx * 30)
      })
      fx.shake.trigger(8, 15)
      fx.flash.trigger('#f43f5e', 8)
      setGameState('gameover')
      return
    }

    // Self collision — sequential death
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      const deathSnake = [...snake]
      deathSnake.forEach((seg, idx) => {
        setTimeout(() => {
          fx.particles.burst(seg.x * cs + cs / 2, seg.y * cs + cs / 2, 6,
            getSegmentColor(idx, deathSnake.length), {
            speed: 3, size: 2.5, life: 25,
            colors: [getSegmentColor(idx, deathSnake.length), NEON.rose, NEON.violet],
          })
        }, idx * 30)
      })
      fx.shake.trigger(8, 15)
      fx.flash.trigger('#f43f5e', 8)
      setGameState('gameover')
      return
    }

    // Move snake
    const newSnake = [head, ...snake]
    const food = foodRef.current

    if (head.x === food.x && head.y === food.y) {
      // Ate food — don't remove tail
      scoreRef.current += 10
      setScore(scoreRef.current)

      // Food eat burst
      const eatX = food.x * cs + cs / 2
      const eatY = food.y * cs + cs / 2
      fx.particles.burst(eatX, eatY, 12, NEON.amber, {
        speed: 3, size: 2.5, life: 20, colors: [NEON.amber, '#fbbf24', NEON.emerald],
      })
      fx.particles.addFloatingText(eatX, eatY - 10, '+10', NEON.amber, 25)
      fx.flash.trigger(NEON.amber, 3)
      fx.shake.trigger(2, 4)

      // Update high score
      if (scoreRef.current > (parseInt(localStorage.getItem('snakeNeon-best') || '0', 10))) {
        localStorage.setItem('snakeNeon-best', String(scoreRef.current))
        setHighScore(scoreRef.current)
      }

      // Speed up
      speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_STEP)

      spawnFood()
    } else {
      // Normal move — remove tail
      newSnake.pop()
    }

    snakeRef.current = newSnake

    // Schedule next tick (render loop handles drawing)
    tickRef.current = setTimeout(tick, speedRef.current)
  }, [cellSize, spawnFood])

  // ── Start game ──────────────────────────────────────
  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }]
    prevSnakeRef.current = [{ x: 10, y: 10 }]
    lastTickTimeRef.current = performance.now()
    dirRef.current = 'right'
    nextDirRef.current = 'right'
    scoreRef.current = 0
    speedRef.current = INITIAL_SPEED
    setScore(0)
    fxRef.current.particles.clear()
    spawnFood()
    setGameState('playing')

    // Start game tick loop (render loop runs independently)
    if (tickRef.current) clearTimeout(tickRef.current)
    setTimeout(() => {
      tickRef.current = setTimeout(tick, speedRef.current)
    }, 50)
  }, [spawnFood, tick])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current)
    }
  }, [])

  // ── Continuous render loop (decoupled from tick) ────
  useEffect(() => {
    const loop = () => {
      draw()
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [draw, canvasSize])

  // ── Keyboard controls ───────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameState === 'menu' || gameState === 'gameover') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          startGame()
          return
        }
      }

      const opposites: Record<Direction, Direction> = {
        up: 'down', down: 'up', left: 'right', right: 'left',
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
      }

      const dir = keyMap[e.key]
      if (dir && gameState === 'playing') {
        e.preventDefault()
        // Prevent 180-degree turns
        if (dir !== opposites[dirRef.current]) {
          nextDirRef.current = dir
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [gameState, startGame])

  // ── Touch swipe controls ────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const opposites: Record<Direction, Direction> = {
      up: 'down', down: 'up', left: 'right', right: 'left',
    }

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

      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return

      let dir: Direction
      if (Math.abs(dx) > Math.abs(dy)) {
        dir = dx > 0 ? 'right' : 'left'
      } else {
        dir = dy > 0 ? 'down' : 'up'
      }

      if (gameState === 'playing' && dir !== opposites[dirRef.current]) {
        nextDirRef.current = dir
      }
    }

    canvas.addEventListener('touchstart', onStart, { passive: true })
    canvas.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      canvas.removeEventListener('touchstart', onStart)
      canvas.removeEventListener('touchend', onEnd)
    }
  }, [gameState])

  // ── D-Pad handler ───────────────────────────────────
  const handleDPad = (dir: Direction) => {
    if (gameState !== 'playing') return
    const opposites: Record<Direction, Direction> = {
      up: 'down', down: 'up', left: 'right', right: 'left',
    }
    if (dir !== opposites[dirRef.current]) {
      nextDirRef.current = dir
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <Link href="/games" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Snake Neon</h1>
          <p className="text-xs text-white/40">Classic snake, reimagined</p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="bg-white/5 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-[10px] uppercase text-white/40 tracking-wider">Score</div>
            <div className="text-lg font-bold text-cyan-400">{score}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-2 text-center min-w-[80px]">
            <div className="text-[10px] uppercase text-white/40 tracking-wider">Best</div>
            <div className="text-lg font-bold text-emerald-400">{highScore}</div>
          </div>
        </div>
        {gameState === 'playing' && (
          <div className="bg-white/5 rounded-lg px-4 py-2 text-center">
            <div className="text-[10px] uppercase text-white/40 tracking-wider">Length</div>
            <div className="text-lg font-bold text-violet-400">{snakeRef.current.length}</div>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 flex flex-col items-center px-4">
        <div className="relative" style={{ width: canvasSize, height: canvasSize }}>
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="rounded-xl border border-white/10 touch-none"
          />

          {/* Menu overlay */}
          {gameState === 'menu' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4 z-10">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Snake Neon
              </div>
              <p className="text-white/50 text-sm">Swipe or use arrow keys</p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-colors font-medium"
              >
                <Play className="w-5 h-5" /> Play
              </button>
            </div>
          )}

          {/* Game Over overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4 z-10">
              <p className="text-2xl font-bold text-rose-400">Game Over</p>
              <p className="text-white/60 text-sm">
                Score: {score} | Length: {snakeRef.current.length}
              </p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-colors font-medium"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          )}
        </div>

        {/* D-Pad for mobile (visible below canvas) */}
        <div className="mt-4 sm:hidden">
          <div className="grid grid-cols-3 gap-1 w-[156px] mx-auto">
            <div />
            <button
              onPointerDown={() => handleDPad('up')}
              className="w-12 h-12 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center"
            >
              <ChevronUp className="w-6 h-6 text-white/60" />
            </button>
            <div />
            <button
              onPointerDown={() => handleDPad('left')}
              className="w-12 h-12 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white/60" />
            </button>
            <div className="w-12 h-12 rounded-lg bg-white/[0.02] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            <button
              onPointerDown={() => handleDPad('right')}
              className="w-12 h-12 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white/60" />
            </button>
            <div />
            <button
              onPointerDown={() => handleDPad('down')}
              className="w-12 h-12 rounded-lg bg-white/5 active:bg-white/15 flex items-center justify-center"
            >
              <ChevronDown className="w-6 h-6 text-white/60" />
            </button>
            <div />
          </div>
        </div>

        {/* How to play */}
        <div className="mt-4 mb-8 w-full max-w-[480px] bg-white/[0.03] rounded-xl p-4 border border-white/5">
          <h2 className="text-sm font-semibold mb-2 text-white/70">How to Play</h2>
          <ul className="text-xs text-white/40 space-y-1">
            <li>Swipe on canvas, use D-pad, or arrow keys / WASD</li>
            <li>Eat the golden orbs to grow longer</li>
            <li>Speed increases as you eat — stay alert</li>
            <li>Don&apos;t hit the walls or yourself</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
