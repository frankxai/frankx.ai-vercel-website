/**
 * Shared Game Effects System
 *
 * Lightweight Canvas2D particle system, screen shake, flash effects,
 * and animation utilities for all Games Lab titles.
 *
 * Design philosophy:
 * - Every action deserves visual feedback
 * - Layer effects: particles + shake + flash = satisfying
 * - Performance-first: object pooling, max particle caps
 */

// ── Easing Functions ──────────────────────────────────
export const ease = {
  outQuad: (t: number) => t * (2 - t),
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  outElastic: (t: number) => {
    const p = 0.3
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1
  },
  outBounce: (t: number) => {
    if (t < 1 / 2.75) return 7.5625 * t * t
    if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
  },
  inOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
}

// ── Particle System ───────────────────────────────────
export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  alpha: number
  gravity: number
  decay: number // size shrink rate
  shape: 'circle' | 'square' | 'spark'
}

const MAX_PARTICLES = 200

export class ParticleSystem {
  particles: Particle[] = []

  /** Burst of particles from a point */
  burst(
    x: number, y: number,
    count: number,
    color: string,
    opts?: Partial<{
      speed: number
      size: number
      life: number
      gravity: number
      spread: number // radians, default full circle
      angle: number  // center angle for directional bursts
      shape: Particle['shape']
      colors: string[] // random pick from array
    }>
  ) {
    const {
      speed = 3, size = 3, life = 30, gravity = 0.05,
      spread = Math.PI * 2, angle = 0, shape = 'circle', colors
    } = opts || {}

    for (let i = 0; i < count && this.particles.length < MAX_PARTICLES; i++) {
      const a = angle - spread / 2 + Math.random() * spread
      const v = speed * (0.3 + Math.random() * 0.7)
      const c = colors ? colors[Math.floor(Math.random() * colors.length)] : color
      this.particles.push({
        x, y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        life,
        maxLife: life,
        size: size * (0.5 + Math.random() * 0.5),
        color: c,
        alpha: 1,
        gravity,
        decay: 0.02,
        shape,
      })
    }
  }

  /** Sparkle — random particles drifting gently */
  sparkle(x: number, y: number, w: number, h: number, color: string, count: number = 1) {
    for (let i = 0; i < count && this.particles.length < MAX_PARTICLES; i++) {
      this.particles.push({
        x: x + Math.random() * w,
        y: y + Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.5,
        life: 40 + Math.random() * 20,
        maxLife: 60,
        size: 1 + Math.random() * 2,
        color,
        alpha: 0.6,
        gravity: -0.01, // float up
        decay: 0,
        shape: 'spark',
      })
    }
  }

  /** Floating number text (for damage numbers, score popups) */
  floatingText: { x: number; y: number; text: string; color: string; life: number; maxLife: number }[] = []

  addFloatingText(x: number, y: number, text: string, color: string, life: number = 40) {
    this.floatingText.push({ x, y, text, color, life, maxLife: life })
  }

  /** Update all particles */
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.vx *= 0.98 // friction
      p.life--
      p.alpha = Math.max(0, p.life / p.maxLife)
      p.size = Math.max(0, p.size - p.decay)
      if (p.life <= 0) this.particles.splice(i, 1)
    }

    for (let i = this.floatingText.length - 1; i >= 0; i--) {
      const ft = this.floatingText[i]
      ft.y -= 0.8
      ft.life--
      if (ft.life <= 0) this.floatingText.splice(i, 1)
    }
  }

  /** Draw all particles */
  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color

      if (p.shape === 'spark') {
        // Glowing dot
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.size * 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      } else if (p.shape === 'square') {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1

    // Floating text
    for (const ft of this.floatingText) {
      const alpha = ft.life / ft.maxLife
      ctx.globalAlpha = alpha
      ctx.fillStyle = ft.color
      ctx.font = 'bold 12px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.shadowColor = ft.color
      ctx.shadowBlur = 4
      ctx.fillText(ft.text, ft.x, ft.y)
      ctx.shadowBlur = 0
    }
    ctx.globalAlpha = 1
  }

  clear() {
    this.particles = []
    this.floatingText = []
  }

  get count() { return this.particles.length }
}

// ── Screen Shake ──────────────────────────────────────
export class ScreenShake {
  private offsetX = 0
  private offsetY = 0
  private intensity = 0
  private duration = 0
  private elapsed = 0

  /** Trigger shake with intensity (pixels) and duration (frames) */
  trigger(intensity: number, duration: number = 8) {
    this.intensity = Math.max(this.intensity, intensity)
    this.duration = Math.max(this.duration, duration)
    this.elapsed = 0
  }

  update(): { x: number; y: number } {
    if (this.elapsed >= this.duration) {
      this.offsetX = 0
      this.offsetY = 0
      this.intensity = 0
      return { x: 0, y: 0 }
    }

    const progress = this.elapsed / this.duration
    const decay = 1 - ease.outQuad(progress)
    this.offsetX = (Math.random() * 2 - 1) * this.intensity * decay
    this.offsetY = (Math.random() * 2 - 1) * this.intensity * decay
    this.elapsed++

    return { x: this.offsetX, y: this.offsetY }
  }

  get active() { return this.elapsed < this.duration }
}

// ── Flash Effect ──────────────────────────────────────
export class FlashEffect {
  private alpha = 0
  private color = '#fff'
  private duration = 0
  private elapsed = 0

  trigger(color: string = '#fff', duration: number = 6) {
    this.color = color
    this.alpha = 0.4
    this.duration = duration
    this.elapsed = 0
  }

  update() {
    if (this.elapsed >= this.duration) { this.alpha = 0; return }
    this.alpha = 0.4 * (1 - this.elapsed / this.duration)
    this.elapsed++
  }

  draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
    if (this.alpha <= 0) return
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, w, h)
    ctx.globalAlpha = 1
  }

  get active() { return this.alpha > 0 }
}

// ── Neon Brand Colors ─────────────────────────────────
export const NEON = {
  cyan: '#43BFE3',
  violet: '#8B5CF6',
  purple: '#AB47C7',
  amber: '#F59E0B',
  emerald: '#10B981',
  rose: '#F43F5E',
  fuchsia: '#D946EF',
  lime: '#84CC16',
  white: '#E2E8F0',
} as const

/** Get array of brand neon colors for multi-color particle bursts */
export const NEON_BURST = [NEON.cyan, NEON.violet, NEON.amber, NEON.emerald, NEON.fuchsia]

// ── Interpolation Helpers ────────────────────────────
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
export const smoothstep = (a: number, b: number, t: number) => {
  const x = clamp((t - a) / (b - a), 0, 1)
  return x * x * (3 - 2 * x)
}

/** Smooth value interpolation — attach to any numeric value for eased transitions */
export class AnimatedValue {
  current: number
  target: number
  speed: number

  constructor(initial: number, speed: number = 0.1) {
    this.current = initial
    this.target = initial
    this.speed = speed
  }

  update(dt: number = 1) {
    this.current = lerp(this.current, this.target, 1 - Math.pow(1 - this.speed, dt))
    if (Math.abs(this.current - this.target) < 0.01) this.current = this.target
  }

  set(value: number) { this.target = value }
  snap(value: number) { this.current = this.target = value }
  get done() { return this.current === this.target }
}

// ── Timer / Sequencer ────────────────────────────────
export class GameTimer {
  private timers: { remaining: number; fn: () => void; repeat: number }[] = []

  /** Run fn after `frames` frames */
  after(frames: number, fn: () => void) {
    this.timers.push({ remaining: frames, fn, repeat: 0 })
  }

  /** Run fn every `frames` frames */
  every(frames: number, fn: () => void) {
    this.timers.push({ remaining: frames, fn, repeat: frames })
  }

  update() {
    for (let i = this.timers.length - 1; i >= 0; i--) {
      const t = this.timers[i]
      t.remaining--
      if (t.remaining <= 0) {
        t.fn()
        if (t.repeat > 0) {
          t.remaining = t.repeat
        } else {
          this.timers.splice(i, 1)
        }
      }
    }
  }

  clear() { this.timers = [] }
}

/** Chain timed callbacks: sequence([{delay: 5, fn: ()=>{}}, ...]) */
export function sequence(steps: { delay: number; fn: () => void }[]) {
  const timer = new GameTimer()
  let cumulative = 0
  for (const step of steps) {
    cumulative += step.delay
    timer.after(cumulative, step.fn)
  }
  return timer
}

// ── Hitstop ──────────────────────────────────────────
export class Hitstop {
  private remaining = 0

  /** Freeze for N frames */
  freeze(frames: number) { this.remaining = Math.max(this.remaining, frames) }

  /** Call each frame — returns true if game should skip entity updates */
  get shouldSkip(): boolean {
    if (this.remaining > 0) { this.remaining--; return true }
    return false
  }

  get active() { return this.remaining > 0 }
}

// ── Audio Stubs (Web Audio oscillator SFX) ───────────
export class GameAudio {
  private ctx: AudioContext | null = null
  muted = true

  private getCtx(): AudioContext | null {
    if (this.muted) return null
    if (!this.ctx) {
      try { this.ctx = new AudioContext() } catch { return null }
    }
    return this.ctx
  }

  /** Short UI blip */
  blip(freq: number = 440, dur: number = 0.06) {
    const ctx = this.getCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain).connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
    osc.start(); osc.stop(ctx.currentTime + dur)
  }

  /** Frequency sweep for transitions */
  sweep(f1: number, f2: number, dur: number = 0.2) {
    const ctx = this.getCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain).connect(ctx.destination)
    osc.frequency.setValueAtTime(f1, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(f2, ctx.currentTime + dur)
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
    osc.start(); osc.stop(ctx.currentTime + dur)
  }

  /** White noise burst for impacts */
  noise(dur: number = 0.08) {
    const ctx = this.getCtx()
    if (!ctx) return
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const src = ctx.createBufferSource()
    const gain = ctx.createGain()
    src.buffer = buf
    src.connect(gain).connect(ctx.destination)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
    src.start()
  }

  /** Victory chord */
  chord(freqs: number[], dur: number = 0.4) {
    for (const f of freqs) this.blip(f, dur)
  }
}

// ── Ambient Particle Presets ─────────────────────────
/** Slow-drifting dust motes */
export function ambientDust(ps: ParticleSystem, w: number, h: number, count: number = 2) {
  for (let i = 0; i < count && ps.count < 30; i++) {
    ps.particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.2,
      life: 80 + Math.random() * 40,
      maxLife: 120,
      size: 0.5 + Math.random() * 1,
      color: 'rgba(255,255,255,0.3)',
      alpha: 0.2,
      gravity: -0.005,
      decay: 0,
      shape: 'spark',
    })
  }
}

/** Pulsing glow aura around an entity */
export function ambientGlow(ps: ParticleSystem, x: number, y: number, r: number, color: string) {
  if (ps.count > 50) return
  const angle = Math.random() * Math.PI * 2
  ps.particles.push({
    x: x + Math.cos(angle) * r * 0.6,
    y: y + Math.sin(angle) * r * 0.6,
    vx: Math.cos(angle) * 0.2,
    vy: Math.sin(angle) * 0.2 - 0.3,
    life: 20 + Math.random() * 15,
    maxLife: 35,
    size: 1.5 + Math.random() * 1.5,
    color,
    alpha: 0.5,
    gravity: -0.01,
    decay: 0,
    shape: 'spark',
  })
}

/** Victory confetti burst */
export function confettiBurst(ps: ParticleSystem, x: number, y: number) {
  const colors = [NEON.cyan, NEON.violet, NEON.amber, NEON.emerald, NEON.rose, NEON.fuchsia, '#fff']
  ps.burst(x, y, 50, '', {
    speed: 6, size: 3, life: 60, gravity: 0.12,
    colors, shape: 'square',
  })
}

// ── Color Utilities ──────────────────────────────────
export function hexToRGBA(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function lerpColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16)
  const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16)
  const r = Math.round(lerp(r1, r2, t)), g = Math.round(lerp(g1, g2, t)), b = Math.round(lerp(b1, b2, t))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function pulseAlpha(time: number, speed: number = 0.003): number {
  return 0.5 + 0.5 * Math.sin(time * speed)
}
