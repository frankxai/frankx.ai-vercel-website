'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── D Kurd Scale (most popular handpan tuning) ─────────────────────
//
// The hang drum (handpan) was invented in 2000 by PANArt in Bern.
// Each tone field produces a fundamental + octave + compound fifth
// due to the Helmholtz resonance of the tuned steel shell. This
// creates the instrument's characteristic ethereal, bell-like sound.
//
// D Kurd: D3 (ding), A3, Bb3, C4, D4, E4, F4, A4, C5
// 9 notes: center ding + 8 tone fields around the rim.

interface ToneField {
  note: string
  freq: number
  label: string
  key: string
  angle: number // degrees clockwise from top (ring notes only)
  isCenter: boolean
}

const TONES: ToneField[] = [
  { note: 'D3',  freq: 146.83, label: 'D',  key: ' ',  angle: 0,   isCenter: true },
  { note: 'A3',  freq: 220.00, label: 'A',  key: '1',  angle: 0,   isCenter: false },
  { note: 'Bb3', freq: 233.08, label: 'B\u266D', key: '2', angle: 45,  isCenter: false },
  { note: 'C4',  freq: 261.63, label: 'C',  key: '3',  angle: 90,  isCenter: false },
  { note: 'D4',  freq: 293.66, label: 'D',  key: '4',  angle: 135, isCenter: false },
  { note: 'E4',  freq: 329.63, label: 'E',  key: 'q',  angle: 180, isCenter: false },
  { note: 'F4',  freq: 349.23, label: 'F',  key: 'w',  angle: 225, isCenter: false },
  { note: 'A4',  freq: 440.00, label: 'A',  key: 'e',  angle: 270, isCenter: false },
  { note: 'C5',  freq: 523.25, label: 'C',  key: 'r',  angle: 315, isCenter: false },
]

// ─── Handpan Sound Engine ──────────────────────────────────────────
//
// Each tone field produces 5 layered components:
// 1. Fundamental (sine) — core pitch
// 2. Octave partial (2.003×, slightly sharp) — Helmholtz resonance
// 3. Compound fifth (3.01×) — overtone shimmer
// 4. High partial (5.97×) — metallic sparkle
// 5. Sub-harmonic bloom (0.5×) — warmth and body
// Plus a soft hand-strike noise transient.
//
// The octave partial decays SLOWER than the fundamental. This creates
// the handpan's characteristic tonal shift — you hear the fundamental
// first, then as it fades, the octave emerges and hangs in the air.

class HandpanEngine {
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
    comp.release.value = 0.15
    comp.connect(this.ctx.destination)

    // Long, warm reverb (cathedral-like — the handpan's natural habitat)
    const reverb = this.ctx.createConvolver()
    reverb.buffer = this.buildReverbIR()

    // Subtle warmth boost in the low-mids where the hang lives
    const warmth = this.ctx.createBiquadFilter()
    warmth.type = 'peaking'
    warmth.frequency.value = 280
    warmth.Q.value = 0.8
    warmth.gain.value = 3
    warmth.connect(comp)

    const dry = this.ctx.createGain(); dry.gain.value = 0.55
    const wet = this.ctx.createGain(); wet.gain.value = 0.45

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.75
    this.master.connect(dry)
    this.master.connect(reverb)
    reverb.connect(wet)
    dry.connect(warmth)
    wet.connect(warmth)
  }

  private buildReverbIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 4
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        const early = t < 0.08 ? Math.exp(-20 * t) * 0.3 : 0
        const late = Math.exp(-2.2 * t) * (Math.random() * 2 - 1)
        const diffuse = Math.exp(-1.5 * t) * (Math.random() * 2 - 1) * 0.4
        d[i] = (early + late + diffuse) * 0.08
      }
    }
    return buf
  }

  play(freq: number, velocity: number = 0.8) {
    if (!this.ctx || !this.master) return
    const ctx = this.ctx
    const now = ctx.currentTime
    const vel = Math.max(0.2, Math.min(1, velocity))

    // Lower notes ring longer (3–5 seconds base decay)
    const decayBase = 3.0 + (440 - Math.min(freq, 440)) / 440 * 2.0

    // 1. Fundamental (pure sine — the core pitch)
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = freq
    const g1 = ctx.createGain()
    g1.gain.setValueAtTime(0, now)
    g1.gain.linearRampToValueAtTime(vel * 0.55, now + 0.003)
    g1.gain.setTargetAtTime(0.001, now + 0.02, decayBase)

    // 2. Octave partial (Helmholtz resonance — decays slower!)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 2.003
    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, now)
    g2.gain.linearRampToValueAtTime(vel * 0.32, now + 0.003)
    g2.gain.setTargetAtTime(0.001, now + 0.05, decayBase * 1.1)

    // 3. Compound fifth (3rd harmonic overtone)
    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = freq * 3.01
    const g3 = ctx.createGain()
    g3.gain.setValueAtTime(0, now)
    g3.gain.linearRampToValueAtTime(vel * 0.1, now + 0.002)
    g3.gain.setTargetAtTime(0.001, now + 0.01, decayBase * 0.5)

    // 4. High metallic shimmer (6th partial — very subtle)
    const osc4 = ctx.createOscillator()
    osc4.type = 'sine'
    osc4.frequency.value = freq * 5.97
    const g4 = ctx.createGain()
    g4.gain.setValueAtTime(0, now)
    g4.gain.linearRampToValueAtTime(vel * 0.035, now + 0.001)
    g4.gain.setTargetAtTime(0.001, now + 0.005, decayBase * 0.25)

    // 5. Sub-harmonic bloom (warmth, one octave below)
    const oscSub = ctx.createOscillator()
    oscSub.type = 'sine'
    oscSub.frequency.value = freq * 0.5
    const gSub = ctx.createGain()
    gSub.gain.setValueAtTime(0, now)
    gSub.gain.linearRampToValueAtTime(vel * 0.12, now + 0.005)
    gSub.gain.setTargetAtTime(0.001, now + 0.03, decayBase * 1.3)

    // 6. Hand-strike transient (soft, warm — not a sharp mallet hit)
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate)
    const nd = noiseBuf.getChannelData(0)
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1
    const nSrc = ctx.createBufferSource()
    nSrc.buffer = noiseBuf
    const nBp = ctx.createBiquadFilter()
    nBp.type = 'bandpass'
    nBp.frequency.value = freq * 1.5
    nBp.Q.value = 2.5
    const nEnv = ctx.createGain()
    nEnv.gain.setValueAtTime(vel * 0.1, now)
    nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

    // Connect everything
    osc1.connect(g1);    g1.connect(this.master!)
    osc2.connect(g2);    g2.connect(this.master!)
    osc3.connect(g3);    g3.connect(this.master!)
    osc4.connect(g4);    g4.connect(this.master!)
    oscSub.connect(gSub); gSub.connect(this.master!)
    nSrc.connect(nBp); nBp.connect(nEnv); nEnv.connect(this.master!)

    const stopTime = now + 8
    osc1.start(now); osc1.stop(stopTime)
    osc2.start(now); osc2.stop(stopTime)
    osc3.start(now); osc3.stop(stopTime)
    osc4.start(now); osc4.stop(now + 3)
    oscSub.start(now); oscSub.stop(stopTime)
    nSrc.start(now); nSrc.stop(now + 0.04)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Page ─────────────────────────────────────────────────────────

export default function HangDrumPage() {
  const engineRef = useRef<HandpanEngine | null>(null)
  const [activeTones, setActiveTones] = useState<Set<number>>(new Set())

  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new HandpanEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const hitTone = useCallback(async (index: number) => {
    const eng = await getEngine()
    eng.play(TONES[index].freq)
    setActiveTones(prev => new Set(prev).add(index))
    setTimeout(() => {
      setActiveTones(prev => { const n = new Set(prev); n.delete(index); return n })
    }, 600)
  }, [getEngine])

  // Keyboard mapping
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    TONES.forEach((tone, i) => { keyMap[tone.key] = i })

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k === ' ') { e.preventDefault(); hitTone(0); return }
      if (k in keyMap) { e.preventDefault(); hitTone(keyMap[k]) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [hitTone])

  // Precompute positions for the circular layout
  const ringRadius = 36 // % of container
  const positions = TONES.map((tone) => {
    if (tone.isCenter) return { x: 50, y: 50 }
    const rad = (tone.angle - 90) * Math.PI / 180
    return {
      x: 50 + ringRadius * Math.cos(rad),
      y: 50 + ringRadius * Math.sin(rad),
    }
  })

  return (
    <div className="bg-[#0a0812] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient glow — warm, meditative */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[250px] top-1/4 left-1/3" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/[0.015] rounded-full blur-[180px] bottom-1/4 right-1/4" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 md:pt-6 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
          Hang Drum
        </h1>
        <p className="text-white/25 text-xs mt-1">
          D Kurd Scale · Touch the tone fields
        </p>
      </header>

      {/* Handpan — circular layout */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10" style={{ touchAction: 'none' }}>
        <div className="relative w-full max-w-[min(80vw,80vh,520px)] aspect-square">
          {/* Drum body (nitrided steel appearance) */}
          <div
            className="absolute inset-[2%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 40% 35%, #2a2520 0%, #1a1614 40%, #0f0d0b 70%, #080706 100%)',
              boxShadow: 'inset 0 2px 30px rgba(0,0,0,0.8), 0 0 80px rgba(139,92,46,0.05), inset 0 -4px 20px rgba(255,200,100,0.02)',
            }}
          />

          {/* Concentric ring grooves (visual detail) */}
          {[20, 35, 50, 65].map(r => (
            <div
              key={r}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: `${50 - r/2}%`,
                border: '1px solid rgba(255,200,120,0.015)',
              }}
            />
          ))}

          {/* Tone fields */}
          {TONES.map((tone, i) => {
            const pos = positions[i]
            const active = activeTones.has(i)
            const size = tone.isCenter ? 22 : 15

            return (
              <button
                key={tone.note + i}
                onPointerDown={e => { e.preventDefault(); hitTone(i) }}
                className="absolute outline-none transition-all duration-200"
                aria-label={`${tone.note} - ${tone.label}`}
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) scale(${active ? 1.08 : 1})`,
                  borderRadius: '50%',
                  background: active
                    ? 'radial-gradient(circle at 45% 40%, #c4956a 0%, #8b6914 40%, #5a4520 70%)'
                    : 'radial-gradient(circle at 45% 40%, #3d3228 0%, #2a231c 50%, #1c1815 80%)',
                  boxShadow: active
                    ? '0 0 35px rgba(196,149,106,0.4), inset 0 2px 8px rgba(255,200,100,0.2), 0 0 70px rgba(196,149,106,0.12)'
                    : 'inset 0 2px 6px rgba(255,255,255,0.04), inset 0 -2px 4px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {/* Dimple indentation */}
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: '18%',
                    background: active
                      ? 'radial-gradient(circle at 50% 45%, rgba(255,200,100,0.12) 0%, transparent 70%)'
                      : 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.025) 0%, transparent 70%)',
                    boxShadow: active ? 'none' : 'inset 0 1px 3px rgba(0,0,0,0.2)',
                  }}
                />

                {/* Ripple animation on strike */}
                {active && (
                  <span className="absolute inset-[-15%] rounded-full pointer-events-none animate-[hangRipple_0.7s_ease-out_forwards]" style={{ border: '1.5px solid rgba(196,149,106,0.35)' }} />
                )}

                {/* Note label */}
                <span className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-35'}`}>
                  <span className={`font-semibold ${tone.isCenter ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'} text-amber-200/90`}>
                    {tone.label}
                  </span>
                  <span className="text-[7px] md:text-[8px] text-white/30 font-mono mt-0.5">
                    {tone.note}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 md:pb-5 space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          Space: Ding · 1 2 3 4: Low tones · Q W E R: High tones
        </p>
        <Link href="/music-lab" className="inline-block text-amber-300/18 text-[11px] hover:text-amber-300/35 transition-colors">
          Music Lab
        </Link>
      </div>

      <style jsx>{`
        @keyframes hangRipple {
          0% { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
