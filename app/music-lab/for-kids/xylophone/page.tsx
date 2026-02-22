'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Pentatonic Scale ───────────────────────────────────────────────
//
// C major pentatonic: C D E G A — every combination sounds beautiful.
// Two octaves gives 10 bars: C4 D4 E4 G4 A4 C5 D5 E5 G5 A5
// This is designed so kids can never hit a "wrong" note.

interface BarDef {
  note: string
  freq: number
  color: string
  glow: string
  label: string
  key: string
}

const BARS: BarDef[] = [
  { note: 'C4',  freq: 261.63, color: '#EF4444', glow: 'rgba(239,68,68,0.5)',   label: 'C',  key: 'a' },
  { note: 'D4',  freq: 293.66, color: '#F97316', glow: 'rgba(249,115,22,0.5)',  label: 'D',  key: 's' },
  { note: 'E4',  freq: 329.63, color: '#EAB308', glow: 'rgba(234,179,8,0.5)',   label: 'E',  key: 'd' },
  { note: 'G4',  freq: 392.00, color: '#22C55E', glow: 'rgba(34,197,94,0.5)',   label: 'G',  key: 'f' },
  { note: 'A4',  freq: 440.00, color: '#06B6D4', glow: 'rgba(6,182,212,0.5)',   label: 'A',  key: 'g' },
  { note: 'C5',  freq: 523.25, color: '#3B82F6', glow: 'rgba(59,130,246,0.5)',  label: 'C',  key: 'h' },
  { note: 'D5',  freq: 587.33, color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)',  label: 'D',  key: 'j' },
  { note: 'E5',  freq: 659.25, color: '#EC4899', glow: 'rgba(236,72,153,0.5)',  label: 'E',  key: 'k' },
  { note: 'G5',  freq: 783.99, color: '#F43F5E', glow: 'rgba(244,63,94,0.5)',   label: 'G',  key: 'l' },
  { note: 'A5',  freq: 880.00, color: '#D946EF', glow: 'rgba(217,70,239,0.5)',  label: 'A',  key: ';' },
]

// ─── Xylophone Sound Engine ─────────────────────────────────────────
//
// Synthesized xylophone: bright sine fundamental + metallic overtones.
// Quick attack (mallet strike), medium-fast decay (bars ring briefly).
// Slightly different decay times per register (lower = longer).

class XylophoneEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private reverb: ConvolverNode | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    this.ctx = new AudioContext({ sampleRate: 44100 })

    // Compressor (gentle, for kids — no harsh peaks)
    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -15
    comp.knee.value = 12
    comp.ratio.value = 3
    comp.attack.value = 0.003
    comp.release.value = 0.1
    comp.connect(this.ctx.destination)

    // Reverb (bright, short — like a playroom)
    this.reverb = this.ctx.createConvolver()
    this.reverb.buffer = this.buildIR()

    const dry = this.ctx.createGain(); dry.gain.value = 0.7
    const wet = this.ctx.createGain(); wet.gain.value = 0.3

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.8
    this.master.connect(dry)
    this.master.connect(this.reverb)
    this.reverb.connect(wet)
    dry.connect(comp)
    wet.connect(comp)
  }

  private buildIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 1.5
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        d[i] = Math.exp(-4 * t) * (Math.random() * 2 - 1) * 0.15
      }
    }
    return buf
  }

  play(freq: number) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const now = ctx.currentTime

    // Decay time scales with pitch (lower = longer)
    const decayTime = 0.08 + (880 - freq) / 880 * 0.12

    // Fundamental (sine — bright and clear)
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = freq

    const g1 = ctx.createGain()
    g1.gain.setValueAtTime(0, now)
    g1.gain.linearRampToValueAtTime(0.5, now + 0.001)
    g1.gain.setTargetAtTime(0.001, now + 0.01, decayTime)

    // 3rd partial (metallic ring, slightly detuned)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 3.01

    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, now)
    g2.gain.linearRampToValueAtTime(0.18, now + 0.001)
    g2.gain.setTargetAtTime(0.001, now + 0.005, decayTime * 0.6)

    // 5th partial (subtle shimmer)
    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = freq * 5.03

    const g3 = ctx.createGain()
    g3.gain.setValueAtTime(0, now)
    g3.gain.linearRampToValueAtTime(0.06, now + 0.001)
    g3.gain.setTargetAtTime(0.001, now + 0.003, decayTime * 0.3)

    // Mallet click (noise transient)
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate)
    const nd = noiseBuf.getChannelData(0)
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1

    const nSrc = ctx.createBufferSource()
    nSrc.buffer = noiseBuf

    const nBp = ctx.createBiquadFilter()
    nBp.type = 'bandpass'; nBp.frequency.value = freq * 2; nBp.Q.value = 2

    const nEnv = ctx.createGain()
    nEnv.gain.setValueAtTime(0.15, now)
    nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.008)

    osc1.connect(g1); g1.connect(this.master)
    osc2.connect(g2); g2.connect(this.master)
    osc3.connect(g3); g3.connect(this.master)
    nSrc.connect(nBp); nBp.connect(nEnv); nEnv.connect(this.master)

    osc1.start(now); osc1.stop(now + 1.5)
    osc2.start(now); osc2.stop(now + 0.8)
    osc3.start(now); osc3.stop(now + 0.5)
    nSrc.start(now); nSrc.stop(now + 0.025)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Sparkle Effect ─────────────────────────────────────────────────

function Sparkles({ color, active }: { color: string; active: boolean }) {
  if (!active) return null
  return (
    <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-[sparkle_0.5s_ease-out_forwards]"
          style={{
            background: color,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </span>
  )
}

// ─── Page ───────────────────────────────────────────────────────────

export default function XylophonePage() {
  const engineRef = useRef<XylophoneEngine | null>(null)
  const [activeBars, setActiveBars] = useState<Set<number>>(new Set())

  const getEngine = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = new XylophoneEngine()
    }
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const hitBar = useCallback(async (index: number) => {
    const eng = await getEngine()
    eng.play(BARS[index].freq)
    setActiveBars(prev => new Set(prev).add(index))
    setTimeout(() => {
      setActiveBars(prev => { const n = new Set(prev); n.delete(index); return n })
    }, 300)
  }, [getEngine])

  // Keyboard mapping
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    BARS.forEach((bar, i) => { keyMap[bar.key] = i })

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in keyMap) { e.preventDefault(); hitBar(keyMap[k]) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [hitBar])

  // Touch: glissando support
  function barAt(x: number, y: number): number | null {
    const el = document.elementFromPoint(x, y)
    const v = el?.getAttribute('data-bar')
    return v !== null && v !== undefined ? parseInt(v, 10) : null
  }

  const touchBars = useRef<Map<number, number>>(new Map())

  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]
      const idx = barAt(t.clientX, t.clientY)
      if (idx !== null) {
        touchBars.current.set(t.identifier, idx)
        hitBar(idx)
      }
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]
      const idx = barAt(t.clientX, t.clientY)
      const prev = touchBars.current.get(t.identifier)
      if (idx !== null && idx !== prev) {
        touchBars.current.set(t.identifier, idx)
        hitBar(idx)
      }
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      touchBars.current.delete(e.changedTouches[i].identifier)
    }
  }

  // Bar widths: longer bars = lower notes (like real xylophone)
  const maxWidth = 100
  const minWidth = 60

  return (
    <div className="bg-[#0a0812] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient — warm and playful */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[200px] top-0 left-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/[0.025] rounded-full blur-[150px] bottom-0 right-1/4" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[128px] top-1/2 right-1/3" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 md:pt-6 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab · For Kids</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Xylophone
        </h1>
        <p className="text-white/25 text-xs mt-1">
          Tap the bars! Every note sounds beautiful together.
        </p>
      </header>

      {/* Xylophone bars */}
      <div
        className="flex-1 flex flex-col items-center justify-center gap-1.5 md:gap-2 px-4 md:px-12 lg:px-24 py-3 relative z-10"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {BARS.map((bar, i) => {
          const active = activeBars.has(i)
          // Higher notes = shorter bars (reversed index since lower notes are first)
          const width = maxWidth - (i / (BARS.length - 1)) * (maxWidth - minWidth)

          return (
            <button
              key={bar.note}
              data-bar={i}
              onPointerDown={e => { if (e.pointerType !== 'touch') { e.preventDefault(); hitBar(i) } }}
              className="relative outline-none transition-all duration-75"
              style={{
                width: `${width}%`,
                height: 'calc((100% - 2rem) / 10)',
                minHeight: '42px',
                maxHeight: '64px',
                borderRadius: '12px',
                background: active
                  ? `linear-gradient(135deg, ${bar.color}, ${bar.color}dd)`
                  : `linear-gradient(135deg, ${bar.color}88, ${bar.color}55)`,
                boxShadow: active
                  ? `0 0 30px ${bar.glow}, 0 4px 15px ${bar.glow.replace('0.5', '0.3')}, inset 0 1px 0 rgba(255,255,255,0.25)`
                  : `inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.15)`,
                transform: active ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <Sparkles color={bar.color} active={active} />

              {/* Note label */}
              <span className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <span className={`text-white font-bold text-lg md:text-xl transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}>
                  {bar.label}
                </span>
                <span className={`text-white/40 text-[10px] font-mono ${active ? 'opacity-80' : 'opacity-30'}`}>
                  {bar.note}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 md:pb-5 space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          Keys: A S D F G H J K L ; · Slide your finger across the bars!
        </p>
        <Link href="/music-lab" className="inline-block text-purple-300/18 text-[11px] hover:text-purple-300/35 transition-colors">
          Music Lab
        </Link>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0% { opacity: 1; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1.5) translateY(-8px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
