'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Drum Kit Pieces ────────────────────────────────────────────────
//
// 6 drums arranged like a real kit. Each is a big, colorful circle
// that kids can tap. Sounds are warm and friendly, not harsh.
//
// Layout (visual arrangement):
//     [Hi-Hat]   [Tom Hi]   [Cymbal]
//         [Snare]   [Tom Lo]
//              [Kick]

interface DrumPiece {
  name: string
  label: string
  color: string
  glow: string
  key: string
  // Position as percentage of container
  x: number
  y: number
  size: number // % of container width
}

const DRUMS: DrumPiece[] = [
  { name: 'Hi-Hat',  label: 'TSS',  color: '#EAB308', glow: 'rgba(234,179,8,0.4)',   key: 'q', x: 18, y: 22, size: 20 },
  { name: 'Tom Hi',  label: 'TOM',  color: '#8B5CF6', glow: 'rgba(139,92,246,0.4)',  key: 'w', x: 50, y: 18, size: 22 },
  { name: 'Cymbal',  label: 'CRASH', color: '#F97316', glow: 'rgba(249,115,22,0.4)', key: 'e', x: 82, y: 22, size: 20 },
  { name: 'Snare',   label: 'SNAP', color: '#22C55E', glow: 'rgba(34,197,94,0.4)',   key: 'a', x: 32, y: 52, size: 24 },
  { name: 'Tom Lo',  label: 'BOOM', color: '#3B82F6', glow: 'rgba(59,130,246,0.4)',  key: 's', x: 68, y: 52, size: 24 },
  { name: 'Kick',    label: 'THUMP', color: '#EF4444', glow: 'rgba(239,68,68,0.4)',  key: 'd', x: 50, y: 82, size: 28 },
]

// ─── Kids Drum Sound Engine ─────────────────────────────────────────
//
// Warm, friendly drum sounds. Not harsh or startling.
// Lower volume, rounder tones, less high-frequency content.

class KidsDrumEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }
    this.ctx = new AudioContext({ sampleRate: 44100 })

    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.knee.value = 15
    comp.ratio.value = 4
    comp.attack.value = 0.003
    comp.release.value = 0.1
    comp.connect(this.ctx.destination)

    // Short warm reverb
    const reverb = this.ctx.createConvolver()
    reverb.buffer = this.buildIR()
    const dry = this.ctx.createGain(); dry.gain.value = 0.7
    const wet = this.ctx.createGain(); wet.gain.value = 0.3

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
    const len = rate * 0.8
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        d[i] = Math.exp(-6 * t) * (Math.random() * 2 - 1) * 0.1
      }
    }
    return buf
  }

  play(index: number) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const now = ctx.currentTime
    switch (index) {
      case 0: this.hihat(now); break
      case 1: this.tomHi(now); break
      case 2: this.cymbal(now); break
      case 3: this.snare(now); break
      case 4: this.tomLo(now); break
      case 5: this.kick(now); break
    }
  }

  private kick(t: number) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator(); osc.type = 'sine'
    osc.frequency.setValueAtTime(120, t)
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.04)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.7, t + 0.002)
    g.gain.setTargetAtTime(0.001, t + 0.02, 0.1)
    osc.connect(g); g.connect(this.master!)
    osc.start(t); osc.stop(t + 0.6)
  }

  private snare(t: number) {
    const ctx = this.ctx!
    // Body
    const osc = ctx.createOscillator(); osc.type = 'sine'
    osc.frequency.value = 180
    const og = ctx.createGain()
    og.gain.setValueAtTime(0, t)
    og.gain.linearRampToValueAtTime(0.4, t + 0.001)
    og.gain.setTargetAtTime(0.001, t + 0.01, 0.035)
    osc.connect(og); og.connect(this.master!)
    osc.start(t); osc.stop(t + 0.3)

    // Rattle (gentler than 808)
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    const n = ctx.createBufferSource(); n.buffer = buf
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 1
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0, t)
    ng.gain.linearRampToValueAtTime(0.25, t + 0.001)
    ng.gain.setTargetAtTime(0.001, t + 0.01, 0.04)
    n.connect(bp); bp.connect(ng); ng.connect(this.master!)
    n.start(t); n.stop(t + 0.15)
  }

  private hihat(t: number) {
    const ctx = this.ctx!
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    const n = ctx.createBufferSource(); n.buffer = buf
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 6000
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.35, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
    n.connect(hp); hp.connect(g); g.connect(this.master!)
    n.start(t); n.stop(t + 0.06)
  }

  private cymbal(t: number) {
    const ctx = this.ctx!
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    const n = ctx.createBufferSource(); n.buffer = buf
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 5000; bp.Q.value = 0.5
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.3, t)
    g.gain.setTargetAtTime(0.001, t + 0.02, 0.15)
    n.connect(bp); bp.connect(g); g.connect(this.master!)
    n.start(t); n.stop(t + 0.6)
  }

  private tomHi(t: number) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator(); osc.type = 'sine'
    osc.frequency.setValueAtTime(280, t)
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.5, t + 0.002)
    g.gain.setTargetAtTime(0.001, t + 0.02, 0.06)
    osc.connect(g); g.connect(this.master!)
    osc.start(t); osc.stop(t + 0.4)
  }

  private tomLo(t: number) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator(); osc.type = 'sine'
    osc.frequency.setValueAtTime(180, t)
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.05)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.55, t + 0.002)
    g.gain.setTargetAtTime(0.001, t + 0.02, 0.08)
    osc.connect(g); g.connect(this.master!)
    osc.start(t); osc.stop(t + 0.5)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Page ─────────────────────────────────────────────────────────

export default function KidsDrumsPage() {
  const engineRef = useRef<KidsDrumEngine | null>(null)
  const [activeDrums, setActiveDrums] = useState<Set<number>>(new Set())

  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new KidsDrumEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const hitDrum = useCallback(async (index: number) => {
    const eng = await getEngine()
    eng.play(index)
    setActiveDrums(prev => new Set(prev).add(index))
    setTimeout(() => {
      setActiveDrums(prev => { const n = new Set(prev); n.delete(index); return n })
    }, 250)
  }, [getEngine])

  // Keyboard mapping
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    DRUMS.forEach((d, i) => { keyMap[d.key] = i })

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in keyMap) { e.preventDefault(); hitDrum(keyMap[k]) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [hitDrum])

  return (
    <div className="bg-[#0a0812] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[200px] top-1/4 left-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[150px] bottom-1/4 right-1/3" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 md:pt-6 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab · For Kids</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Drums
        </h1>
        <p className="text-white/25 text-xs mt-1">
          Tap the drums! Make some noise!
        </p>
      </header>

      {/* Drum kit */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10" style={{ touchAction: 'none' }}>
        <div className="relative w-full max-w-[min(85vw,85vh,500px)] aspect-square">
          {DRUMS.map((drum, i) => {
            const active = activeDrums.has(i)
            return (
              <button
                key={drum.name}
                onPointerDown={e => { e.preventDefault(); hitDrum(i) }}
                className="absolute outline-none transition-all duration-100"
                aria-label={drum.name}
                style={{
                  width: `${drum.size}%`,
                  height: `${drum.size}%`,
                  left: `${drum.x}%`,
                  top: `${drum.y}%`,
                  transform: `translate(-50%, -50%) scale(${active ? 1.12 : 1})`,
                  borderRadius: '50%',
                  background: active
                    ? `radial-gradient(circle at 45% 40%, ${drum.color}ee, ${drum.color}88 60%, ${drum.color}44 100%)`
                    : `radial-gradient(circle at 45% 40%, ${drum.color}50, ${drum.color}25 60%, ${drum.color}10 100%)`,
                  boxShadow: active
                    ? `0 0 40px ${drum.glow}, 0 0 80px ${drum.glow.replace('0.4', '0.15')}, inset 0 2px 0 rgba(255,255,255,0.2)`
                    : `inset 0 2px 4px rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Bounce ring on hit */}
                {active && (
                  <span
                    className="absolute inset-[-8%] rounded-full pointer-events-none animate-[drumBounce_0.3s_ease-out_forwards]"
                    style={{ border: `2px solid ${drum.color}40` }}
                  />
                )}

                {/* Label */}
                <span className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity ${active ? 'opacity-100' : 'opacity-50'}`}>
                  <span className="text-white font-bold text-sm md:text-lg">{drum.label}</span>
                  <span className="text-white/25 text-[8px] md:text-[9px] mt-0.5">{drum.name}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 md:pb-5 space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          Q W E: Top row · A S D: Bottom row
        </p>
        <Link href="/music-lab/for-kids" className="inline-block text-green-300/18 text-[11px] hover:text-green-300/35 transition-colors">
          More Kids Instruments
        </Link>
      </div>

      <style jsx>{`
        @keyframes drumBounce {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
