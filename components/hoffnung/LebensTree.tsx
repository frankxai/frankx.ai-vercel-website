'use client'

import { useRef, useEffect, useCallback } from 'react'

interface LebensTreeProps {
  fullscreen?: boolean
  className?: string
}

// Tree structure definitions
interface Branch {
  x1: number; y1: number; x2: number; y2: number
  cx: number; cy: number // control point for bezier
  width: number
  depth: number
}

interface LeafParticle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; color: string
  life: number; maxLife: number
}

const SKY_COLORS = ['#38BDF8', '#7DD3FC', '#BAE6FD']
const AMBER_COLORS = ['#FCD34D', '#F59E0B', '#FBBF24']
const ALL_COLORS = [...SKY_COLORS, ...AMBER_COLORS]

function generateBranches(): Branch[] {
  const branches: Branch[] = []

  // Trunk
  branches.push({
    x1: 0.5, y1: 0.85, x2: 0.5, y2: 0.35,
    cx: 0.49, cy: 0.6, width: 6, depth: 0,
  })

  // Main branches (depth 1)
  const mainAngles = [-0.5, -0.3, -0.15, 0.15, 0.3, 0.5]
  mainAngles.forEach((angle, i) => {
    const startY = 0.35 + (i * 0.04)
    const endX = 0.5 + angle * 0.35
    const endY = 0.15 + Math.abs(angle) * 0.15
    branches.push({
      x1: 0.5, y1: startY, x2: endX, y2: endY,
      cx: 0.5 + angle * 0.15, cy: startY - 0.08, width: 3, depth: 1,
    })

    // Sub-branches (depth 2)
    const subCount = 2 + (i % 2)
    for (let j = 0; j < subCount; j++) {
      const t = 0.4 + (j * 0.25)
      const midX = 0.5 + angle * 0.15 * t + angle * 0.35 * t * t
      const midY = startY - 0.08 * t + (endY - startY + 0.08) * t * t
      const subAngle = angle + (j % 2 === 0 ? 0.12 : -0.08)
      branches.push({
        x1: midX, y1: midY, x2: midX + subAngle * 0.12, y2: midY - 0.06,
        cx: midX + subAngle * 0.06, cy: midY - 0.03, width: 1.5, depth: 2,
      })
    }
  })

  // Roots
  const rootAngles = [-0.3, -0.15, 0.15, 0.3]
  rootAngles.forEach((angle) => {
    branches.push({
      x1: 0.5, y1: 0.85, x2: 0.5 + angle * 0.3, y2: 0.95,
      cx: 0.5 + angle * 0.15, cy: 0.9, width: 2.5, depth: 1,
    })
  })

  return branches
}

const BRANCHES = generateBranches()

export function LebensTree({ fullscreen = false, className }: LebensTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1, y: -1 })
  const particlesRef = useRef<LeafParticle[]>([])
  const animFrameRef = useRef<number>(0)
  const prefersReducedMotion = useRef(false)

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
    ctx.clearRect(0, 0, w, h)

    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const hasInteraction = mx >= 0 && my >= 0

    // Draw branches
    BRANCHES.forEach((b) => {
      const x1 = b.x1 * w, y1 = b.y1 * h
      const x2 = b.x2 * w, y2 = b.y2 * h
      const cx = b.cx * w, cy = b.cy * h

      // Calculate distance from mouse to branch midpoint
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      const dist = hasInteraction
        ? Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2)
        : Infinity
      const maxDist = Math.min(w, h) * 0.2
      const proximity = Math.max(0, 1 - dist / maxDist)

      // Ambient breathing
      const breathe = prefersReducedMotion.current
        ? 0.7
        : 0.6 + Math.sin(time * 0.001 + b.x1 * 10) * 0.15

      const alpha = Math.min(1, breathe + proximity * 0.5)

      // Color: amber trunk, transitioning to sky at tips
      const depthFactor = b.depth / 2
      const r = Math.round(139 * (1 - depthFactor) + 56 * depthFactor)
      const g = Math.round(105 * (1 - depthFactor) + 189 * depthFactor)
      const bVal = Math.round(20 * (1 - depthFactor) + 248 * depthFactor)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.quadraticCurveTo(cx, cy, x2, y2)
      ctx.strokeStyle = `rgba(${r},${g},${bVal},${alpha})`
      ctx.lineWidth = b.width * (1 + proximity * 0.5)
      ctx.lineCap = 'round'
      ctx.stroke()

      // Glow effect on proximity
      if (proximity > 0.1 && !prefersReducedMotion.current) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.quadraticCurveTo(cx, cy, x2, y2)
        ctx.strokeStyle = `rgba(252,211,77,${proximity * 0.3})`
        ctx.lineWidth = b.width * 3
        ctx.filter = 'blur(8px)'
        ctx.stroke()
        ctx.filter = 'none'
      }
    })

    if (prefersReducedMotion.current) return

    // Spawn ambient leaf particles
    if (Math.random() < 0.02) {
      particlesRef.current.push({
        x: (0.2 + Math.random() * 0.6) * w,
        y: 0.1 * h + Math.random() * 0.3 * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.2 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.4,
        color: ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)],
        life: 0,
        maxLife: 200 + Math.random() * 200,
      })
    }

    // Spawn cursor-trail particles
    if (hasInteraction && Math.random() < 0.15) {
      particlesRef.current.push({
        x: mx + (Math.random() - 0.5) * 20,
        y: my + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 1,
        vy: -0.5 - Math.random() * 1,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.6 + Math.random() * 0.4,
        color: ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)],
        life: 0,
        maxLife: 60 + Math.random() * 60,
      })
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.life++
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.99
      p.vy *= 0.99

      const lifeRatio = p.life / p.maxLife
      const fadeAlpha = lifeRatio < 0.1
        ? lifeRatio * 10
        : lifeRatio > 0.7
          ? (1 - lifeRatio) / 0.3
          : 1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.opacity * fadeAlpha
      ctx.fill()
      ctx.globalAlpha = 1

      return p.life < p.maxLife
    })

    // Cursor glow
    if (hasInteraction) {
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 60)
      gradient.addColorStop(0, 'rgba(252,211,77,0.12)')
      gradient.addColorStop(0.5, 'rgba(56,189,248,0.04)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(mx - 60, my - 60, 120, 120)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check reduced motion preference
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 }
    }

    // Touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
    }
    const handleTouchEnd = () => {
      // Spawn a burst of particles at last touch point before clearing
      if (mouseRef.current.x >= 0) {
        const { x, y } = mouseRef.current
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8
          particlesRef.current.push({
            x, y,
            vx: Math.cos(angle) * 2,
            vy: Math.sin(angle) * 2,
            size: 2 + Math.random() * 3,
            opacity: 0.8,
            color: ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)],
            life: 0,
            maxLife: 80,
          })
        }
      }
      mouseRef.current = { x: -1, y: -1 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)

    // Animation loop
    const loop = (time: number) => {
      const rect = canvas.getBoundingClientRect()
      draw(ctx, rect.width, rect.height, time)
      animFrameRef.current = requestAnimationFrame(loop)
    }

    // For reduced motion: draw once static
    if (prefersReducedMotion.current) {
      const rect = canvas.getBoundingClientRect()
      draw(ctx, rect.width, rect.height, 0)
    } else {
      animFrameRef.current = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [draw])

  return (
    <div
      className={`${fullscreen ? 'fixed inset-0' : 'relative w-full aspect-[3/4] md:aspect-video'} bg-[#070B14] ${className || ''}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
      />
    </div>
  )
}
