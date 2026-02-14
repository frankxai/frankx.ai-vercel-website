'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── One Octave: C4 to C5 ──────────────────────────────────────────
//
// 8 white keys (C D E F G A B C) + 5 black keys (C# D# F# G# A#).
// Each white key gets a fun color. Black keys are dark with subtle tint.
// Note names are displayed large for learning.

interface KeyDef {
  note: string
  freq: number
  label: string
  isBlack: boolean
  color: string
  glow: string
  key: string // keyboard key
}

const KEYS: KeyDef[] = [
  { note: 'C4',  freq: 261.63, label: 'C',  isBlack: false, color: '#EF4444', glow: 'rgba(239,68,68,0.4)',   key: 'a' },
  { note: 'C#4', freq: 277.18, label: 'C#', isBlack: true,  color: '#991B1B', glow: 'rgba(153,27,27,0.4)',   key: 'w' },
  { note: 'D4',  freq: 293.66, label: 'D',  isBlack: false, color: '#F97316', glow: 'rgba(249,115,22,0.4)',  key: 's' },
  { note: 'D#4', freq: 311.13, label: 'D#', isBlack: true,  color: '#9A3412', glow: 'rgba(154,52,18,0.4)',   key: 'e' },
  { note: 'E4',  freq: 329.63, label: 'E',  isBlack: false, color: '#EAB308', glow: 'rgba(234,179,8,0.4)',   key: 'd' },
  { note: 'F4',  freq: 349.23, label: 'F',  isBlack: false, color: '#22C55E', glow: 'rgba(34,197,94,0.4)',   key: 'f' },
  { note: 'F#4', freq: 369.99, label: 'F#', isBlack: true,  color: '#166534', glow: 'rgba(22,101,52,0.4)',   key: 't' },
  { note: 'G4',  freq: 392.00, label: 'G',  isBlack: false, color: '#06B6D4', glow: 'rgba(6,182,212,0.4)',   key: 'g' },
  { note: 'G#4', freq: 415.30, label: 'G#', isBlack: true,  color: '#155E75', glow: 'rgba(21,94,117,0.4)',   key: 'y' },
  { note: 'A4',  freq: 440.00, label: 'A',  isBlack: false, color: '#3B82F6', glow: 'rgba(59,130,246,0.4)',  key: 'h' },
  { note: 'A#4', freq: 466.16, label: 'A#', isBlack: true,  color: '#1E3A8A', glow: 'rgba(30,58,138,0.4)',   key: 'u' },
  { note: 'B4',  freq: 493.88, label: 'B',  isBlack: false, color: '#8B5CF6', glow: 'rgba(139,92,246,0.4)',  key: 'j' },
  { note: 'C5',  freq: 523.25, label: 'C',  isBlack: false, color: '#EC4899', glow: 'rgba(236,72,153,0.4)', key: 'k' },
]

// ─── Kids Piano Sound Engine ────────────────────────────────────────
//
// Warm, friendly tone: sine fundamental + soft triangle overtone.
// Gentler than the concert grand, perfect for small ears.

class KidsPianoEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }
    this.ctx = new AudioContext({ sampleRate: 44100 })

    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -15
    comp.knee.value = 12
    comp.ratio.value = 3
    comp.attack.value = 0.003
    comp.release.value = 0.1
    comp.connect(this.ctx.destination)

    // Short, bright reverb
    const reverb = this.ctx.createConvolver()
    reverb.buffer = this.buildIR()

    const dry = this.ctx.createGain(); dry.gain.value = 0.65
    const wet = this.ctx.createGain(); wet.gain.value = 0.35

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.7
    this.master.connect(dry)
    this.master.connect(reverb)
    reverb.connect(wet)
    dry.connect(comp)
    wet.connect(comp)
  }

  private buildIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 1.2
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        d[i] = Math.exp(-5 * t) * (Math.random() * 2 - 1) * 0.12
      }
    }
    return buf
  }

  play(freq: number) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const now = ctx.currentTime

    // Warm sine fundamental
    const osc1 = ctx.createOscillator(); osc1.type = 'sine'
    osc1.frequency.value = freq
    const g1 = ctx.createGain()
    g1.gain.setValueAtTime(0, now)
    g1.gain.linearRampToValueAtTime(0.45, now + 0.003)
    g1.gain.setTargetAtTime(0.001, now + 0.02, 0.4)

    // Soft triangle overtone (warmth)
    const osc2 = ctx.createOscillator(); osc2.type = 'triangle'
    osc2.frequency.value = freq * 2.001
    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, now)
    g2.gain.linearRampToValueAtTime(0.12, now + 0.003)
    g2.gain.setTargetAtTime(0.001, now + 0.01, 0.25)

    // Gentle key click
    const osc3 = ctx.createOscillator(); osc3.type = 'sine'
    osc3.frequency.value = freq * 4
    const g3 = ctx.createGain()
    g3.gain.setValueAtTime(0.06, now)
    g3.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

    osc1.connect(g1); g1.connect(this.master!)
    osc2.connect(g2); g2.connect(this.master!)
    osc3.connect(g3); g3.connect(this.master!)
    osc1.start(now); osc1.stop(now + 2.5)
    osc2.start(now); osc2.stop(now + 1.5)
    osc3.start(now); osc3.stop(now + 0.02)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Sparkle Effect ─────────────────────────────────────────────────

function KeySparkle({ color, active }: { color: string; active: boolean }) {
  if (!active) return null
  return (
    <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {[0, 1, 2, 3, 4].map(i => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full animate-[kidSparkle_0.5s_ease-out_forwards]"
          style={{
            background: color,
            left: `${10 + i * 20}%`,
            top: `${30 + (i % 2) * 25}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────

export default function KidsPianoPage() {
  const engineRef = useRef<KidsPianoEngine | null>(null)
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set())

  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new KidsPianoEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const hitKey = useCallback(async (index: number) => {
    const eng = await getEngine()
    eng.play(KEYS[index].freq)
    setActiveKeys(prev => new Set(prev).add(index))
    setTimeout(() => {
      setActiveKeys(prev => { const n = new Set(prev); n.delete(index); return n })
    }, 300)
  }, [getEngine])

  // Keyboard mapping
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    KEYS.forEach((k, i) => { keyMap[k.key] = i })

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in keyMap) { e.preventDefault(); hitKey(keyMap[k]) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [hitKey])

  const whiteKeys = KEYS.filter(k => !k.isBlack)
  const blackKeys = KEYS.filter(k => k.isBlack)

  // Black key positions relative to white keys
  // C# between C-D, D# between D-E, F# between F-G, G# between G-A, A# between A-B
  const blackKeyPositions = [
    { key: blackKeys[0], leftPercent: (0.5 / 8) * 100 }, // C#
    { key: blackKeys[1], leftPercent: (1.5 / 8) * 100 }, // D#
    { key: blackKeys[2], leftPercent: (3.5 / 8) * 100 }, // F#
    { key: blackKeys[3], leftPercent: (4.5 / 8) * 100 }, // G#
    { key: blackKeys[4], leftPercent: (5.5 / 8) * 100 }, // A#
  ]

  return (
    <div className="bg-[#0a0812] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] bg-pink-500/[0.025] rounded-full blur-[200px] top-1/4 left-1/3" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[150px] bottom-1/3 right-1/4" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 md:pt-6 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab · For Kids</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
          Piano
        </h1>
        <p className="text-white/25 text-xs mt-1">
          One octave · Tap the colorful keys!
        </p>
      </header>

      {/* Piano keys */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-12 relative z-10" style={{ touchAction: 'none' }}>
        <div className="relative w-full max-w-[600px]" style={{ height: 'min(55vh, 320px)' }}>
          {/* White keys */}
          <div className="absolute inset-0 flex gap-[3px] md:gap-1">
            {whiteKeys.map((wk, wi) => {
              const idx = KEYS.indexOf(wk)
              const active = activeKeys.has(idx)
              return (
                <button
                  key={wk.note}
                  onPointerDown={e => { e.preventDefault(); hitKey(idx) }}
                  className="relative flex-1 rounded-b-xl md:rounded-b-2xl outline-none transition-all duration-100"
                  style={{
                    background: active
                      ? `linear-gradient(180deg, ${wk.color}dd 0%, ${wk.color} 100%)`
                      : `linear-gradient(180deg, ${wk.color}40 0%, ${wk.color}25 100%)`,
                    boxShadow: active
                      ? `0 0 25px ${wk.glow}, inset 0 2px 0 rgba(255,255,255,0.2)`
                      : `inset 0 2px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.15)`,
                    transform: active ? 'scaleY(0.97)' : 'scaleY(1)',
                    transformOrigin: 'top',
                  }}
                >
                  <KeySparkle color={wk.color} active={active} />
                  <span className={`absolute bottom-3 md:bottom-5 inset-x-0 text-center pointer-events-none transition-opacity ${active ? 'opacity-100' : 'opacity-50'}`}>
                    <span className="text-white font-bold text-lg md:text-2xl block">{wk.label}</span>
                    <span className="text-white/30 text-[8px] md:text-[10px] font-mono">{wk.note}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Black keys */}
          {blackKeyPositions.map(({ key: bk, leftPercent }) => {
            const idx = KEYS.indexOf(bk)
            const active = activeKeys.has(idx)
            return (
              <button
                key={bk.note}
                onPointerDown={e => { e.preventDefault(); hitKey(idx) }}
                className="absolute top-0 outline-none transition-all duration-100 z-10"
                style={{
                  left: `calc(${leftPercent}% - 4%)`,
                  width: '8%',
                  height: '58%',
                  borderRadius: '0 0 8px 8px',
                  background: active
                    ? `linear-gradient(180deg, ${bk.color} 0%, ${bk.color}cc 100%)`
                    : `linear-gradient(180deg, #1a1520 0%, #0f0c12 100%)`,
                  boxShadow: active
                    ? `0 0 15px ${bk.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`
                    : `0 3px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  transform: active ? 'scaleY(0.96)' : 'scaleY(1)',
                  transformOrigin: 'top',
                }}
              >
                <span className={`absolute bottom-2 inset-x-0 text-center pointer-events-none transition-opacity ${active ? 'opacity-100' : 'opacity-30'}`}>
                  <span className="text-white font-bold text-[10px] md:text-xs">{bk.label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 md:pb-5 space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          A S D F G H J K: White keys · W E T Y U: Black keys
        </p>
        <Link href="/music-lab/for-kids" className="inline-block text-pink-300/18 text-[11px] hover:text-pink-300/35 transition-colors">
          More Kids Instruments
        </Link>
      </div>

      <style jsx>{`
        @keyframes kidSparkle {
          0% { opacity: 1; transform: scale(0) translateY(0); }
          50% { opacity: 1; transform: scale(1.8) translateY(-10px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-25px); }
        }
      `}</style>
    </div>
  )
}
