'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Trophy, Play } from 'lucide-react'
import { ParticleSystem, ScreenShake, FlashEffect, NEON, NEON_BURST } from '@/lib/games/effects'

// ============================================================================
// CONSTANTS
// ============================================================================

const LANE_WIDTH = 1.8
const LANES = [-LANE_WIDTH, 0, LANE_WIDTH]
const SPEED_INITIAL = 0.12
const SPEED_INCREMENT = 0.00003
const OBSTACLE_INTERVAL = 28 // distance between obstacle groups
const JUMP_VELOCITY = 0.22
const GRAVITY = 0.012
const SWIPE_THRESHOLD = 30
const PLAYER_SIZE = 0.5
const OBSTACLE_DEPTH = 0.6

type Obstacle = {
  id: number
  z: number
  lane: number // 0,1,2 = left, center, right
  type: 'barrier' | 'low' | 'tall'
}

type Coin = {
  id: number
  z: number
  lane: number
  collected: boolean
}

// ============================================================================
// GAME CANVAS (pure Canvas2D for performance + mobile compatibility)
// ============================================================================

function GameCanvas({
  onGameOver,
  onScoreUpdate,
  isPlaying,
}: {
  onGameOver: (finalScore: number, finalCoins: number) => void
  onScoreUpdate: (score: number, coins: number) => void
  isPlaying: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fxRef = useRef({
    particles: new ParticleSystem(),
    shake: new ScreenShake(),
    flash: new FlashEffect(),
  })
  const gameState = useRef({
    playerLane: 1,
    targetLane: 1,
    playerX: 0,
    playerY: 0,
    velocityY: 0,
    isJumping: false,
    isSliding: false,
    slideTimer: 0,
    speed: SPEED_INITIAL,
    distance: 0,
    score: 0,
    coins: 0,
    obstacles: [] as Obstacle[],
    coinItems: [] as Coin[],
    nextObstacleZ: 30,
    obstacleIdCounter: 0,
    alive: true,
    laneTransition: 0,
    nearMissIds: new Set<number>(),
    frameCount: 0,
    bankAngle: 0,
    prevPlayerX: 0,
  })

  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const animFrameRef = useRef<number>(0)

  // Spawn obstacles ahead
  const spawnObstacles = useCallback(() => {
    const gs = gameState.current
    while (gs.nextObstacleZ < gs.distance + 120) {
      // Random lane(s) for obstacles — never block all 3 lanes
      const numObstacles = Math.random() < 0.3 ? 2 : 1
      const lanesUsed = new Set<number>()

      for (let i = 0; i < numObstacles; i++) {
        let lane: number
        do {
          lane = Math.floor(Math.random() * 3)
        } while (lanesUsed.has(lane))
        lanesUsed.add(lane)

        const type: Obstacle['type'] =
          Math.random() < 0.3 ? 'low' : Math.random() < 0.5 ? 'tall' : 'barrier'

        gs.obstacles.push({
          id: gs.obstacleIdCounter++,
          z: gs.nextObstacleZ,
          lane,
          type,
        })
      }

      // Coins in free lanes
      for (let l = 0; l < 3; l++) {
        if (!lanesUsed.has(l) && Math.random() < 0.6) {
          gs.coinItems.push({
            id: gs.obstacleIdCounter++,
            z: gs.nextObstacleZ,
            lane: l,
            collected: false,
          })
        }
      }

      gs.nextObstacleZ += OBSTACLE_INTERVAL + Math.random() * 12
    }

    // Clean up passed obstacles
    gs.obstacles = gs.obstacles.filter(o => o.z > gs.distance - 10)
    gs.coinItems = gs.coinItems.filter(c => c.z > gs.distance - 10)
  }, [])

  // Check collisions + near misses + coin pickup
  const checkCollision = useCallback((w: number, h: number, centerX: number, horizon: number, groundY: number) => {
    const gs = gameState.current
    const fx = fxRef.current
    const px = LANES[gs.playerLane]
    const py = gs.playerY
    const pz = gs.distance

    // Player screen position for effects
    const playerScreenX = centerX + (gs.playerX / LANE_WIDTH) * (w * 0.22)
    const playerBaseY = groundY - 10

    for (const obs of gs.obstacles) {
      const ox = LANES[obs.lane]
      const oz = obs.z

      // Distance check
      if (Math.abs(oz - pz) > OBSTACLE_DEPTH + 0.3) continue
      if (Math.abs(ox - px) > PLAYER_SIZE + 0.3) continue

      // Height check
      if (obs.type === 'low' && py > 0.8) continue
      if (obs.type === 'low' && gs.isSliding) continue
      if (obs.type === 'barrier' && py > 1.2) continue

      // DEATH — particle explosion + shake + flash
      fx.particles.burst(playerScreenX, playerBaseY - 25, 30, NEON.purple, {
        speed: 5, size: 4, life: 40, colors: [NEON.purple, NEON.rose, NEON.violet],
      })
      fx.shake.trigger(10, 15)
      fx.flash.trigger('#f43f5e', 10)
      return true
    }

    // Near-miss detection
    for (const obs of gs.obstacles) {
      if (gs.nearMissIds.has(obs.id)) continue
      const ox = LANES[obs.lane]
      const oz = obs.z
      const zDist = oz - pz
      // Just passed (within 0.5-2.0 behind) and same lane ± 1
      if (zDist < -0.5 && zDist > -2.0 && Math.abs(ox - px) < PLAYER_SIZE + 0.8) {
        gs.nearMissIds.add(obs.id)
        gs.score += 25 // Near miss bonus
        fx.flash.trigger(NEON.violet, 4)
        fx.particles.burst(playerScreenX, playerBaseY - 30, 5, NEON.violet, {
          speed: 2, size: 2, life: 15, shape: 'spark',
        })
        fx.particles.addFloatingText(playerScreenX, playerBaseY - 50, 'CLOSE!', NEON.violet, 30)
      }
    }

    // Coin collection
    for (const coin of gs.coinItems) {
      if (coin.collected) continue
      const cx = LANES[coin.lane]
      const cz = coin.z
      if (Math.abs(cz - pz) < 1.0 && Math.abs(cx - px) < PLAYER_SIZE + 0.3) {
        coin.collected = true
        gs.coins++
        // Coin collect burst
        const coinScreenX = centerX + (cx / LANE_WIDTH) * (w * 0.22)
        fx.particles.burst(coinScreenX, playerBaseY - 30, 8, NEON.amber, {
          speed: 3, size: 2.5, life: 20, colors: [NEON.amber, '#fbbf24'],
        })
        fx.particles.addFloatingText(coinScreenX, playerBaseY - 50, '+1', NEON.amber, 25)
      }
    }

    return false
  }, [])

  // Main game loop
  useEffect(() => {
    if (!isPlaying) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Reset game state
    const gs = gameState.current
    gs.playerLane = 1
    gs.targetLane = 1
    gs.playerX = LANES[1]
    gs.playerY = 0
    gs.velocityY = 0
    gs.isJumping = false
    gs.isSliding = false
    gs.slideTimer = 0
    gs.speed = SPEED_INITIAL
    gs.distance = 0
    gs.score = 0
    gs.coins = 0
    gs.obstacles = []
    gs.coinItems = []
    gs.nextObstacleZ = 30
    gs.obstacleIdCounter = 0
    gs.alive = true
    gs.nearMissIds = new Set()
    gs.frameCount = 0
    gs.bankAngle = 0
    gs.prevPlayerX = LANES[1]
    fxRef.current.particles.clear()

    function resizeCanvas() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx!.scale(dpr, dpr)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    function gameLoop() {
      if (!canvas || !ctx || !gs.alive) return

      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height

      // Update
      gs.speed += SPEED_INCREMENT
      gs.distance += gs.speed
      gs.score = Math.floor(gs.distance * 10)

      // Player lane movement (smooth)
      const targetX = LANES[gs.playerLane]
      gs.playerX += (targetX - gs.playerX) * 0.15

      // Bank tilt — player leans into lane changes
      const lateralV = gs.playerX - gs.prevPlayerX
      gs.bankAngle += (lateralV * 150 - gs.bankAngle) * 0.12
      gs.prevPlayerX = gs.playerX

      // Jump physics
      if (gs.isJumping) {
        gs.playerY += gs.velocityY
        gs.velocityY -= GRAVITY
        if (gs.playerY <= 0) {
          gs.playerY = 0
          gs.velocityY = 0
          gs.isJumping = false
        }
      }

      // Slide timer
      if (gs.isSliding) {
        gs.slideTimer--
        if (gs.slideTimer <= 0) gs.isSliding = false
      }

      gs.frameCount++
      const fx = fxRef.current

      spawnObstacles()

      // ---- RENDER ----
      ctx.clearRect(0, 0, w, h)

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
      bgGrad.addColorStop(0, '#0a0118')
      bgGrad.addColorStop(0.5, '#0f0a24')
      bgGrad.addColorStop(1, '#030712')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      // Perspective settings
      const horizon = h * 0.35
      const groundY = h * 0.9
      const centerX = w / 2

      // Apply screen shake offset
      const shakeOffset = fx.shake.update()
      ctx.save()
      ctx.translate(shakeOffset.x, shakeOffset.y)

      // Check collisions (needs screen coords)
      if (checkCollision(w, h, centerX, horizon, groundY)) {
        // Let effects render one more frame for death explosion
        fx.particles.update()
        fx.particles.draw(ctx)
        fx.flash.update()
        fx.flash.draw(ctx, w, h)
        ctx.restore()
        gs.alive = false
        onGameOver(gs.score, gs.coins)
        return
      }

      onScoreUpdate(gs.score, gs.coins)

      // Grid lines (road)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)'
      ctx.lineWidth = 1
      const gridOffset = (gs.distance * 40) % 40

      // Horizontal grid lines
      for (let i = 0; i < 20; i++) {
        const t = (i * 40 - gridOffset) / 800
        if (t < 0) continue
        const y = horizon + (groundY - horizon) * (1 - Math.pow(1 - t, 2))
        if (y > groundY) continue
        ctx.globalAlpha = 0.3 * (1 - t)
        ctx.beginPath()
        ctx.moveTo(centerX - w * 0.6 * t - w * 0.2, y)
        ctx.lineTo(centerX + w * 0.6 * t + w * 0.2, y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Lane dividers
      for (let l = -1; l <= 1; l++) {
        ctx.strokeStyle = l === 0 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.12)'
        ctx.lineWidth = l === 0 ? 2 : 1
        ctx.beginPath()
        ctx.moveTo(centerX + l * 2, horizon)
        ctx.lineTo(centerX + l * (w * 0.25), groundY)
        ctx.stroke()
      }

      // Side walls (neon)
      for (const side of [-1, 1]) {
        const wallGrad = ctx.createLinearGradient(
          centerX + side * (w * 0.3),
          groundY,
          centerX + side * 4,
          horizon
        )
        wallGrad.addColorStop(0, 'rgba(34, 211, 238, 0.15)')
        wallGrad.addColorStop(1, 'rgba(34, 211, 238, 0)')
        ctx.strokeStyle = wallGrad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX + side * (w * 0.32), groundY)
        ctx.lineTo(centerX + side * 5, horizon)
        ctx.stroke()
      }

      // Helper: project 3D position to screen
      function project(laneX: number, z: number, yOffset: number = 0) {
        const relZ = z - gs.distance
        if (relZ <= 0) return null
        const t = Math.min(relZ / 80, 1)
        const perspective = 1 - Math.pow(1 - t, 2)
        const screenY = horizon + (groundY - horizon) * (1 - perspective) - yOffset * (1 - perspective) * 100
        const screenX = centerX + (laneX / LANE_WIDTH) * (w * 0.22) * (1 - perspective)
        const scale = (1 - perspective) * 0.8 + 0.05
        return { x: screenX, y: screenY, scale }
      }

      // Render obstacles (back to front)
      const sortedObs = [...gs.obstacles].sort((a, b) => b.z - a.z)
      for (const obs of sortedObs) {
        const p = project(LANES[obs.lane], obs.z)
        if (!p || p.scale < 0.02) continue

        const obsW = PLAYER_SIZE * 80 * p.scale
        const obsH = obs.type === 'tall' ? 100 * p.scale : obs.type === 'barrier' ? 60 * p.scale : 30 * p.scale

        ctx.fillStyle =
          obs.type === 'tall'
            ? 'rgba(244, 63, 94, 0.7)'
            : obs.type === 'barrier'
            ? 'rgba(245, 158, 11, 0.7)'
            : 'rgba(34, 211, 238, 0.5)'

        // Obstacle body
        const rx = p.x - obsW / 2
        const ry = p.y - obsH
        ctx.beginPath()
        ctx.roundRect(rx, ry, obsW, obsH, 4 * p.scale)
        ctx.fill()

        // Neon glow
        ctx.shadowColor =
          obs.type === 'tall' ? '#f43f5e' : obs.type === 'barrier' ? '#f59e0b' : '#22d3ee'
        ctx.shadowBlur = 12 * p.scale
        ctx.beginPath()
        ctx.roundRect(rx, ry, obsW, obsH, 4 * p.scale)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Render coins
      for (const coin of gs.coinItems) {
        if (coin.collected) continue
        const p = project(LANES[coin.lane], coin.z, 0.4)
        if (!p || p.scale < 0.02) continue

        const coinSize = 12 * p.scale
        ctx.fillStyle = 'rgba(245, 158, 11, 0.9)'
        ctx.shadowColor = '#f59e0b'
        ctx.shadowBlur = 10 * p.scale
        ctx.beginPath()
        ctx.arc(p.x, p.y - 20 * p.scale, coinSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Render player (with bank tilt rotation)
      const playerScreenX = centerX + (gs.playerX / LANE_WIDTH) * (w * 0.22)
      const playerBaseY = groundY - 10
      const jumpOffset = gs.playerY * 100
      const playerH = gs.isSliding ? 20 : 45
      const playerW = 28

      ctx.save()
      ctx.translate(playerScreenX, playerBaseY - playerH / 2 - jumpOffset)
      ctx.rotate(gs.bankAngle * Math.PI / 180)

      // Player glow
      ctx.shadowColor = '#a855f7'
      ctx.shadowBlur = 20
      ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'
      ctx.beginPath()
      ctx.roundRect(-playerW / 2, -playerH / 2, playerW, playerH, 6)
      ctx.fill()
      ctx.shadowBlur = 0

      // Player highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      ctx.beginPath()
      ctx.roundRect(-playerW / 2 + 4, -playerH / 2 + 3, playerW - 8, playerH * 0.4, 3)
      ctx.fill()

      ctx.restore()

      // Particle trail behind player (every 2nd frame)
      if (gs.frameCount % 2 === 0) {
        fx.particles.burst(
          playerScreenX + (Math.random() - 0.5) * 8,
          playerBaseY - 2 - jumpOffset,
          1, NEON.violet,
          { speed: 1.5, size: 2, life: 12, gravity: 0.02, shape: 'spark',
            angle: Math.PI / 2, spread: 0.5, colors: [NEON.violet, NEON.purple, NEON.cyan] }
        )
      }

      // Speed lines at edges (intensity scales with speed)
      const speedRatio = Math.min((gs.speed - SPEED_INITIAL) / 0.15, 1)
      if (speedRatio > 0.1 && gs.frameCount % 3 === 0) {
        const numLines = Math.floor(speedRatio * 3)
        for (let i = 0; i < numLines; i++) {
          const side = Math.random() < 0.5 ? 0 : 1
          const sx = side === 0 ? Math.random() * w * 0.15 : w - Math.random() * w * 0.15
          const sy = horizon + Math.random() * (groundY - horizon) * 0.6
          fx.particles.burst(sx, sy, 1, 'rgba(168,85,247,0.4)', {
            speed: 0.5, size: 1, life: 8, gravity: 0, shape: 'spark',
            angle: Math.PI / 2, spread: 0.2,
          })
        }
      }

      // Update & draw effects
      fx.particles.update()
      fx.particles.draw(ctx)
      fx.flash.update()
      fx.flash.draw(ctx, w, h)

      ctx.restore() // Undo shake offset

      animFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isPlaying, spawnObstacles, checkCollision, onGameOver, onScoreUpdate])

  // Touch/swipe controls
  useEffect(() => {
    const gs = gameState.current

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touchStart.current = { x: t.clientX, y: t.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current || !gs.alive) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStart.current.x
      const dy = t.clientY - touchStart.current.y
      touchStart.current = null

      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe — change lane
        if (dx > 0 && gs.playerLane < 2) gs.playerLane++
        else if (dx < 0 && gs.playerLane > 0) gs.playerLane--
      } else if (Math.abs(dy) > SWIPE_THRESHOLD) {
        if (dy < 0 && !gs.isJumping) {
          // Swipe up — jump
          gs.isJumping = true
          gs.velocityY = JUMP_VELOCITY
        } else if (dy > 0) {
          // Swipe down — slide
          gs.isSliding = true
          gs.slideTimer = 30
        }
      }
    }

    // Keyboard controls for desktop
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gs.alive) return
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          if (gs.playerLane > 0) gs.playerLane--
          break
        case 'ArrowRight':
        case 'd':
          if (gs.playerLane < 2) gs.playerLane++
          break
        case 'ArrowUp':
        case 'w':
        case ' ':
          if (!gs.isJumping) {
            gs.isJumping = true
            gs.velocityY = JUMP_VELOCITY
          }
          break
        case 'ArrowDown':
        case 's':
          gs.isSliding = true
          gs.slideTimer = 30
          break
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full touch-none"
      style={{ imageRendering: 'auto' }}
    />
  )
}

// ============================================================================
// PAGE
// ============================================================================

export default function NeonRunnerPage() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'over'>('menu')
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [finalCoins, setFinalCoins] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('neon-runner-best')
    if (saved) setBestScore(parseInt(saved, 10))
  }, [])

  const handleGameOver = useCallback(
    (s: number, c: number) => {
      setFinalScore(s)
      setFinalCoins(c)
      setGameState('over')
      const total = s + c * 50
      if (total > bestScore) {
        setBestScore(total)
        localStorage.setItem('neon-runner-best', String(total))
      }
    },
    [bestScore]
  )

  const handleScoreUpdate = useCallback((s: number, c: number) => {
    setScore(s)
    setCoins(c)
  }, [])

  const startGame = useCallback(() => {
    setScore(0)
    setCoins(0)
    setGameState('playing')
  }, [])

  return (
    <div className="h-[100dvh] bg-[#030712] flex flex-col overflow-hidden">
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

          {gameState === 'playing' && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white tabular-nums">{score.toLocaleString()}</span>
              <span className="text-sm font-medium text-amber-400 tabular-nums">{coins} coins</span>
            </div>
          )}

          <h1 className="text-sm font-medium text-white">Neon Runner</h1>
        </div>
      </header>

      {/* Game Area */}
      <div className="flex-1 relative">
        {gameState === 'playing' && (
          <GameCanvas
            isPlaying={true}
            onGameOver={handleGameOver}
            onScoreUpdate={handleScoreUpdate}
          />
        )}

        {/* Start Menu */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-violet-400 ml-1" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-2">Neon Runner</h2>
              <p className="text-sm text-white/40 mb-8 max-w-xs mx-auto">
                Swipe left/right to change lanes. Swipe up to jump. Swipe down to slide. Arrow keys on desktop.
              </p>

              {bestScore > 0 && (
                <div className="flex items-center justify-center gap-1.5 mb-6">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-sm text-white/40">Best: {bestScore.toLocaleString()}</span>
                </div>
              )}

              <button
                onClick={startGame}
                className="px-8 py-4 rounded-xl bg-violet-500 text-white font-medium text-lg hover:bg-violet-600 transition-colors active:scale-95"
              >
                Start Running
              </button>
            </div>
          </div>
        )}

        {/* Game Over */}
        {gameState === 'over' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6 z-30">
            <div className="w-full max-w-sm p-8 rounded-3xl bg-[#0a0f1a] border border-white/[0.1] text-center">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-4">Game Over</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-white/40 mb-1">Distance</div>
                  <div className="text-xl font-bold text-white">{finalScore.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xs text-white/40 mb-1">Coins</div>
                  <div className="text-xl font-bold text-amber-400">{finalCoins}</div>
                </div>
              </div>

              <p className="text-sm text-white/30 mb-6">
                {finalScore + finalCoins * 50 >= bestScore ? 'New high score!' : `Best: ${bestScore.toLocaleString()}`}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={startGame}
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
      </div>

      {/* Controls hint */}
      {gameState === 'playing' && (
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          <p className="text-[10px] text-white/15">Swipe or Arrow Keys</p>
        </div>
      )}
    </div>
  )
}
