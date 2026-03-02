'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FloatingElement } from '@/components/ui/AdvancedAnimations'

// ── Dot Grid with Cursor Repulsion ──

function DotGridCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef<number>(0)
  const dotsRef = useRef<{ x: number; y: number; ox: number; oy: number }[]>([])

  const SPACING = 40
  const DOT_RADIUS = 1.2
  const REPEL_RADIUS = 200
  const REPEL_STRENGTH = 8
  const RETURN_SPEED = 0.08

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.scale(dpr, dpr)

      // Rebuild dots
      const dots: typeof dotsRef.current = []
      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          dots.push({ x, y, ox: x, oy: y })
        }
      }
      dotsRef.current = dots
    }

    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas!.addEventListener('mousemove', handleMouse)
    canvas!.addEventListener('mouseleave', handleLeave)

    // Animation loop (throttled to ~30fps)
    let lastFrame = 0
    function animate(time: number) {
      if (time - lastFrame < 33) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = time

      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      ctx!.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const dots = dotsRef.current

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          const angle = Math.atan2(dy, dx)
          const targetX = dot.ox + Math.cos(angle) * force
          const targetY = dot.oy + Math.sin(angle) * force
          dot.x += (targetX - dot.x) * 0.15
          dot.y += (targetY - dot.y) * 0.15
        } else {
          dot.x += (dot.ox - dot.x) * RETURN_SPEED
          dot.y += (dot.oy - dot.y) * RETURN_SPEED
        }

        ctx!.beginPath()
        ctx!.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.04)'
        ctx!.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas!.removeEventListener('mousemove', handleMouse)
      canvas!.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

// ── Word-by-Word Reveal with Gradient ──

function NeonWordReveal({ line1, line2, gradientWord }: { line1: string; line2: string; gradientWord: string }) {
  const allWords = [...line1.split(' '), '|BREAK|', ...line2.split(' ')]

  return (
    <motion.h1
      className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.08] text-white"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.2 },
        },
      }}
    >
      {allWords.map((word, i) => {
        if (word === '|BREAK|') return <br key="br" />
        return (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 220, damping: 26 },
              },
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
            className={
              word.toLowerCase() === gradientWord.toLowerCase()
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'
                : undefined
            }
          >
            {word}
          </motion.span>
        )
      })}
    </motion.h1>
  )
}

// ── Product Mockup Glow ──

function ProductMockup() {
  return (
    <FloatingElement duration={8} offset={8}>
      <div
        className="relative w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
        style={{
          boxShadow: '0 0 120px 40px rgba(16,185,129,0.06), 0 0 60px 20px rgba(16,185,129,0.03)',
        }}
      >
        {/* Terminal mockup */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[10px] font-mono text-white/20">acos v10.2</span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="text-emerald-400/70">$ claude /acos-score</div>
          <div className="text-white/30">Analyzing 75 skills, 38 agents...</div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400/60">Score:</span>
            <span className="text-white/60">94.2</span>
            <span className="text-emerald-400/40">+2.1</span>
          </div>
          <div className="text-white/20">Session #176 | 59% avg success</div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-3">
            <div className="h-full w-[94%] bg-gradient-to-r from-emerald-500/60 to-cyan-500/60 rounded-full" />
          </div>
        </div>
      </div>
    </FloatingElement>
  )
}

// ── Main Hero ──

const staggerEase = [0.22, 1, 0.36, 1] as const

export function NeonGridHero() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 40])

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0b' }}
    >
      {/* Dot grid background */}
      {!shouldReduceMotion && (
        <DotGridCanvas className="absolute inset-0" />
      )}

      {/* Emerald radial bloom */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content: 60/40 split */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-12 lg:gap-16 items-center"
        style={shouldReduceMotion ? undefined : { opacity, y }}
      >
        {/* Left column — text (3 of 5 cols) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: staggerEase }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-sm text-emerald-400/80 font-medium">AI Architect & Creator</span>
          </motion.div>

          {/* Headline */}
          {shouldReduceMotion ? (
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.08] text-white">
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                intelligence
              </span>
              <br />
              that compounds.
            </h1>
          ) : (
            <NeonWordReveal
              line1="Building intelligence"
              line2="that compounds."
              gradientWord="intelligence"
            />
          )}

          {/* Subtitle */}
          <motion.p
            className="text-lg text-white/45 max-w-lg leading-relaxed"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.6, ease: staggerEase }}
          >
            Enterprise AI at Oracle. 12,000+ songs. 75+ open-source skills.
            Everything documented, everything shipped.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.8, ease: staggerEase }}
          >
            <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]">
              Explore the Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 h-12 text-sm font-medium transition-all">
              Read the Blog
            </button>
          </motion.div>
        </div>

        {/* Right column — floating product mockup (2 of 5 cols) */}
        <div className="lg:col-span-2 hidden lg:block">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.4 }}
          >
            <ProductMockup />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
