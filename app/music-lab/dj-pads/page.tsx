'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Pad Definitions ────────────────────────────────────────────────

interface PadDef {
  id: number
  name: string
  category: 'drums' | 'melody' | 'texture' | 'perc'
  key: string
}

const PADS: PadDef[] = [
  // Row 1 — Drums
  { id: 0,  name: 'Kick',     category: 'drums',   key: '1' },
  { id: 1,  name: 'Clap',     category: 'drums',   key: '2' },
  { id: 2,  name: 'Hi-Hat',   category: 'drums',   key: '3' },
  { id: 3,  name: 'Open Hat',  category: 'drums',   key: '4' },
  // Row 2 — Melody
  { id: 4,  name: 'Marimba',  category: 'melody',  key: 'Q' },
  { id: 5,  name: 'Steel',    category: 'melody',  key: 'W' },
  { id: 6,  name: 'Pluck',    category: 'melody',  key: 'E' },
  { id: 7,  name: 'Chord',    category: 'melody',  key: 'R' },
  // Row 3 — Texture
  { id: 8,  name: 'Flute',    category: 'texture',  key: 'A' },
  { id: 9,  name: 'Vocal',    category: 'texture',  key: 'S' },
  { id: 10, name: 'Pad',      category: 'texture',  key: 'D' },
  { id: 11, name: 'Bass',     category: 'texture',  key: 'F' },
  // Row 4 — Percussion / FX
  { id: 12, name: 'Bongo Hi', category: 'perc',     key: 'Z' },
  { id: 13, name: 'Bongo Lo', category: 'perc',     key: 'X' },
  { id: 14, name: 'Shaker',   category: 'perc',     key: 'C' },
  { id: 15, name: 'Rise',     category: 'perc',     key: 'V' },
]

const CATEGORY_COLORS: Record<string, { bg: string; glow: string; text: string; ring: string }> = {
  drums:   { bg: 'from-rose-500/15 to-red-600/8',     glow: 'rgba(244,63,94,0.4)',   text: 'text-rose-300',   ring: 'ring-rose-500/30' },
  melody:  { bg: 'from-cyan-500/15 to-blue-600/8',    glow: 'rgba(34,211,238,0.4)',  text: 'text-cyan-300',   ring: 'ring-cyan-500/30' },
  texture: { bg: 'from-purple-500/15 to-violet-600/8', glow: 'rgba(168,85,247,0.4)',  text: 'text-purple-300', ring: 'ring-purple-500/30' },
  perc:    { bg: 'from-amber-500/15 to-yellow-600/8',  glow: 'rgba(245,158,11,0.4)',  text: 'text-amber-300',  ring: 'ring-amber-500/30' },
}

// ─── Tropical House Sound Engine ────────────────────────────────────
//
// All sounds synthesized with Web Audio API.
// Tuned to C major at 110 BPM feel — tropical house sweet spot.
// Signal chain: source → gain → master → reverb/dry → compressor → out

class TropicalPadEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private reverb: ConvolverNode | null = null
  private compressor: DynamicsCompressorNode | null = null
  private noiseBuffer: AudioBuffer | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    this.ctx = new AudioContext({ sampleRate: 44100 })

    // Compressor
    this.compressor = this.ctx.createDynamicsCompressor()
    this.compressor.threshold.value = -12
    this.compressor.knee.value = 8
    this.compressor.ratio.value = 4
    this.compressor.attack.value = 0.003
    this.compressor.release.value = 0.15
    this.compressor.connect(this.ctx.destination)

    // Master
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.85

    // Reverb
    this.reverb = this.ctx.createConvolver()
    this.reverb.buffer = this.buildIR()

    const dry = this.ctx.createGain()
    dry.gain.value = 0.75
    const wet = this.ctx.createGain()
    wet.gain.value = 0.25

    this.master.connect(dry)
    this.master.connect(this.reverb)
    this.reverb.connect(wet)
    dry.connect(this.compressor)
    wet.connect(this.compressor)

    // Pre-generate noise buffer
    this.noiseBuffer = this.makeNoise()
  }

  private buildIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 2.5
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        const early = t < 0.05 ? 0.4 * (Math.random() * 2 - 1) * (1 - t / 0.05) : 0
        const late = Math.exp(-2.8 * t) * (Math.random() * 2 - 1)
        d[i] = (early + late) * 0.18
      }
    }
    return buf
  }

  private makeNoise(): AudioBuffer {
    const ctx = this.ctx!
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    return buf
  }

  private noise(): AudioBufferSourceNode {
    const src = this.ctx!.createBufferSource()
    src.buffer = this.noiseBuffer
    return src
  }

  trigger(padId: number, vel: number) {
    if (!this.ctx || !this.master) return
    switch (padId) {
      case 0:  this.kick(vel); break
      case 1:  this.clap(vel); break
      case 2:  this.hihat(vel, false); break
      case 3:  this.hihat(vel, true); break
      case 4:  this.marimba(vel); break
      case 5:  this.steelDrum(vel); break
      case 6:  this.pluck(vel); break
      case 7:  this.chord(vel); break
      case 8:  this.flute(vel); break
      case 9:  this.vocal(vel); break
      case 10: this.padSwell(vel); break
      case 11: this.bass(vel); break
      case 12: this.bongo(vel, true); break
      case 13: this.bongo(vel, false); break
      case 14: this.shaker(vel); break
      case 15: this.rise(vel); break
    }
  }

  // ── Drums ──

  private kick(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Sub body
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, now)
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.04)

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.95, now + 0.002)
    env.gain.setTargetAtTime(0.001, now + 0.08, 0.12)

    // Click transient
    const click = ctx.createOscillator()
    click.type = 'triangle'
    click.frequency.setValueAtTime(2500, now)
    click.frequency.exponentialRampToValueAtTime(80, now + 0.008)

    const clickEnv = ctx.createGain()
    clickEnv.gain.setValueAtTime(vel * 0.35, now)
    clickEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

    osc.connect(env); env.connect(this.master!)
    click.connect(clickEnv); clickEnv.connect(this.master!)

    osc.start(now); osc.stop(now + 0.6)
    click.start(now); click.stop(now + 0.03)
  }

  private clap(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    // Micro-burst layering
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.01
      const src = this.noise()
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 1.2

      const env = ctx.createGain()
      env.gain.setValueAtTime(0, t)
      env.gain.linearRampToValueAtTime(vel * 0.5, t + 0.001)
      env.gain.exponentialRampToValueAtTime(0.001, t + 0.035)

      src.connect(bp); bp.connect(env); env.connect(this.master!)
      src.start(t); src.stop(t + 0.05)
    }

    // Reverb tail
    const tail = this.noise()
    const tailBp = ctx.createBiquadFilter()
    tailBp.type = 'bandpass'; tailBp.frequency.value = 1500; tailBp.Q.value = 0.7

    const tailEnv = ctx.createGain()
    tailEnv.gain.setValueAtTime(vel * 0.35, now + 0.025)
    tailEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    tail.connect(tailBp); tailBp.connect(tailEnv); tailEnv.connect(this.master!)
    tail.start(now + 0.025); tail.stop(now + 0.3)
  }

  private hihat(vel: number, open: boolean) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const decay = open ? 0.3 : 0.04

    const src = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 7000; hp.Q.value = 0.8

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 10000; bp.Q.value = 1.0

    const env = ctx.createGain()
    env.gain.setValueAtTime(vel * 0.55, now)
    env.gain.exponentialRampToValueAtTime(0.001, now + decay)

    src.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.master!)
    src.start(now); src.stop(now + decay + 0.05)
  }

  // ── Melody ──

  private marimba(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = 523.25 // C5

    // Fundamental
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'; osc1.frequency.value = freq

    // 4th harmonic (slightly detuned for warmth)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'; osc2.frequency.value = freq * 4.01

    const g1 = ctx.createGain()
    g1.gain.setValueAtTime(0, now)
    g1.gain.linearRampToValueAtTime(vel * 0.55, now + 0.001)
    g1.gain.setTargetAtTime(0.001, now + 0.01, 0.12)

    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, now)
    g2.gain.linearRampToValueAtTime(vel * 0.15, now + 0.001)
    g2.gain.setTargetAtTime(0.001, now + 0.005, 0.06)

    osc1.connect(g1); g1.connect(this.master!)
    osc2.connect(g2); g2.connect(this.master!)

    osc1.start(now); osc1.stop(now + 0.8)
    osc2.start(now); osc2.stop(now + 0.4)
  }

  private steelDrum(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = 659.25 // E5

    // Inharmonic partials — the steel drum signature
    const ratios = [1, 2.4, 3.1, 4.7]
    const gains = [0.5, 0.25, 0.15, 0.08]

    for (let i = 0; i < ratios.length; i++) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq * ratios[i]

      const env = ctx.createGain()
      env.gain.setValueAtTime(0, now)
      env.gain.linearRampToValueAtTime(vel * gains[i], now + 0.001)
      env.gain.setTargetAtTime(0.001, now + 0.02, 0.15 - i * 0.02)

      osc.connect(env); env.connect(this.master!)
      osc.start(now); osc.stop(now + 1.0)
    }
  }

  private pluck(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = 783.99 // G5

    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = freq

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(4000 * vel, now)
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.15)
    filter.Q.value = 2

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.4, now + 0.001)
    env.gain.setTargetAtTime(0.001, now + 0.01, 0.08)

    osc.connect(filter); filter.connect(env); env.connect(this.master!)
    osc.start(now); osc.stop(now + 0.6)
  }

  private chord(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    // C major: C4 E4 G4
    const freqs = [261.63, 329.63, 392.0]

    for (const freq of freqs) {
      for (const det of [-3, 3]) {
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'
        osc.frequency.value = freq
        osc.detune.value = det

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(2500, now)
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.4)
        filter.Q.value = 1

        const env = ctx.createGain()
        env.gain.setValueAtTime(0, now)
        env.gain.linearRampToValueAtTime(vel * 0.12, now + 0.003)
        env.gain.setTargetAtTime(vel * 0.06, now + 0.05, 0.3)
        env.gain.setTargetAtTime(0.001, now + 0.4, 0.4)

        osc.connect(filter); filter.connect(env); env.connect(this.master!)
        osc.start(now); osc.stop(now + 2)
      }
    }
  }

  // ── Texture ──

  private flute(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = 1046.5 // C6

    // Tone
    const osc = ctx.createOscillator()
    osc.type = 'sine'; osc.frequency.value = freq

    // Vibrato (delayed)
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'; lfo.frequency.value = 5.5
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(0, now)
    lfoGain.gain.linearRampToValueAtTime(4, now + 0.15)
    lfo.connect(lfoGain); lfoGain.connect(osc.frequency)

    // Breath (noise component)
    const breath = this.noise()
    const breathBp = ctx.createBiquadFilter()
    breathBp.type = 'bandpass'; breathBp.frequency.value = freq; breathBp.Q.value = 5

    const breathEnv = ctx.createGain()
    breathEnv.gain.setValueAtTime(0, now)
    breathEnv.gain.linearRampToValueAtTime(vel * 0.06, now + 0.02)
    breathEnv.gain.setTargetAtTime(0.001, now + 0.1, 0.2)

    const toneEnv = ctx.createGain()
    toneEnv.gain.setValueAtTime(0, now)
    toneEnv.gain.linearRampToValueAtTime(vel * 0.3, now + 0.015)
    toneEnv.gain.setTargetAtTime(vel * 0.2, now + 0.1, 0.3)
    toneEnv.gain.setTargetAtTime(0.001, now + 0.5, 0.25)

    osc.connect(toneEnv); toneEnv.connect(this.master!)
    breath.connect(breathBp); breathBp.connect(breathEnv); breathEnv.connect(this.master!)
    lfo.start(now)

    osc.start(now); osc.stop(now + 1.2)
    breath.start(now); breath.stop(now + 0.6)
    lfo.stop(now + 1.2)
  }

  private vocal(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = 220 // A3

    // Sawtooth through formant filters ("Oh" vowel)
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'; osc.frequency.value = freq

    // F1: ~500Hz, F2: ~1000Hz for "Oh"
    const f1 = ctx.createBiquadFilter()
    f1.type = 'bandpass'; f1.frequency.value = 500; f1.Q.value = 12

    const f2 = ctx.createBiquadFilter()
    f2.type = 'bandpass'; f2.frequency.value = 1000; f2.Q.value = 10

    const g1 = ctx.createGain(); g1.gain.value = 0.7
    const g2 = ctx.createGain(); g2.gain.value = 0.4
    const mix = ctx.createGain()

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.45, now + 0.02)
    env.gain.setTargetAtTime(vel * 0.25, now + 0.1, 0.3)
    env.gain.setTargetAtTime(0.001, now + 0.4, 0.3)

    osc.connect(f1); osc.connect(f2)
    f1.connect(g1); f2.connect(g2)
    g1.connect(mix); g2.connect(mix)
    mix.connect(env); env.connect(this.master!)

    osc.start(now); osc.stop(now + 1.5)
  }

  private padSwell(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    // C major pad: C4 + E4 + G4
    const freqs = [261.63, 329.63, 392.0]

    for (const freq of freqs) {
      for (const det of [-6, 0, 6]) {
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'
        osc.frequency.value = freq
        osc.detune.value = det

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 800
        filter.Q.value = 0.5

        const env = ctx.createGain()
        env.gain.setValueAtTime(0, now)
        env.gain.linearRampToValueAtTime(vel * 0.06, now + 0.5)
        env.gain.setTargetAtTime(0.001, now + 1.5, 0.6)

        osc.connect(filter); filter.connect(env); env.connect(this.master!)
        osc.start(now); osc.stop(now + 4)
      }
    }
  }

  private bass(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = 65.41 // C2

    // Sub
    const sub = ctx.createOscillator()
    sub.type = 'sine'; sub.frequency.value = freq

    // Overtone
    const over = ctx.createOscillator()
    over.type = 'square'; over.frequency.value = freq

    const overFilter = ctx.createBiquadFilter()
    overFilter.type = 'lowpass'; overFilter.frequency.value = 200; overFilter.Q.value = 0.5

    const subEnv = ctx.createGain()
    subEnv.gain.setValueAtTime(0, now)
    subEnv.gain.linearRampToValueAtTime(vel * 0.7, now + 0.003)
    subEnv.gain.setTargetAtTime(0.001, now + 0.05, 0.1)

    const overEnv = ctx.createGain()
    overEnv.gain.setValueAtTime(0, now)
    overEnv.gain.linearRampToValueAtTime(vel * 0.2, now + 0.003)
    overEnv.gain.setTargetAtTime(0.001, now + 0.04, 0.08)

    sub.connect(subEnv); subEnv.connect(this.master!)
    over.connect(overFilter); overFilter.connect(overEnv); overEnv.connect(this.master!)

    sub.start(now); sub.stop(now + 0.8)
    over.start(now); over.stop(now + 0.5)
  }

  // ── Percussion / FX ──

  private bongo(vel: number, high: boolean) {
    const ctx = this.ctx!
    const now = ctx.currentTime
    const freq = high ? 400 : 220

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.03)

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.65, now + 0.001)
    env.gain.setTargetAtTime(0.001, now + 0.02, high ? 0.04 : 0.06)

    // Noise click
    const nSrc = this.noise()
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = freq * 2; bp.Q.value = 2

    const nEnv = ctx.createGain()
    nEnv.gain.setValueAtTime(vel * 0.2, now)
    nEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

    osc.connect(env); env.connect(this.master!)
    nSrc.connect(bp); bp.connect(nEnv); nEnv.connect(this.master!)

    osc.start(now); osc.stop(now + 0.4)
    nSrc.start(now); nSrc.stop(now + 0.04)
  }

  private shaker(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const src = this.noise()
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'; hp.frequency.value = 6000; hp.Q.value = 0.5

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'; bp.frequency.value = 9000; bp.Q.value = 1.5

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    // Double-bump envelope for shaker texture
    env.gain.linearRampToValueAtTime(vel * 0.35, now + 0.002)
    env.gain.linearRampToValueAtTime(vel * 0.1, now + 0.03)
    env.gain.linearRampToValueAtTime(vel * 0.3, now + 0.05)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    src.connect(hp); hp.connect(bp); bp.connect(env); env.connect(this.master!)
    src.start(now); src.stop(now + 0.2)
  }

  private rise(vel: number) {
    const ctx = this.ctx!
    const now = ctx.currentTime

    const src = this.noise()
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(200, now)
    filter.frequency.exponentialRampToValueAtTime(8000, now + 1.5)
    filter.Q.value = 3

    const env = ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vel * 0.5, now + 1.2)
    env.gain.linearRampToValueAtTime(0.001, now + 1.6)

    src.connect(filter); filter.connect(env); env.connect(this.master!)
    src.start(now); src.stop(now + 1.8)
  }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Page ───────────────────────────────────────────────────────────

export default function DJPadsPage() {
  const engineRef = useRef<TropicalPadEngine | null>(null)
  const [activePads, setActivePads] = useState<Set<number>>(new Set())

  const getEngine = useCallback(async () => {
    if (!engineRef.current) {
      engineRef.current = new TropicalPadEngine()
    }
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  const triggerPad = useCallback(async (id: number) => {
    const eng = await getEngine()
    eng.trigger(id, 0.8)
    setActivePads(prev => new Set(prev).add(id))
    setTimeout(() => {
      setActivePads(prev => { const n = new Set(prev); n.delete(id); return n })
    }, 150)
  }, [getEngine])

  // Keyboard mapping
  useEffect(() => {
    const keyMap: Record<string, number> = {}
    for (const pad of PADS) keyMap[pad.key.toLowerCase()] = pad.id

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in keyMap) { e.preventDefault(); triggerPad(keyMap[k]) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [triggerPad])

  return (
    <div className="bg-[#060810] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-[200px] top-0 right-0" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[150px] bottom-0 left-0" />
        <div className="absolute w-[300px] h-[300px] bg-rose-500/[0.015] rounded-full blur-[128px] top-1/2 left-1/2" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-5 md:pt-7 pb-3 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white/80 tracking-tight">Tropical Pads</h1>
        <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase mt-1">
          110 BPM · C Major · Tropical House
        </p>
      </header>

      {/* Pad Grid */}
      <div className="flex-1 flex items-center justify-center px-3 md:px-8 py-2 relative z-10">
        <div className="w-full max-w-[560px] aspect-square grid grid-cols-4 gap-2 md:gap-3">
          {PADS.map(pad => {
            const colors = CATEGORY_COLORS[pad.category]
            const active = activePads.has(pad.id)
            return (
              <button
                key={pad.id}
                onPointerDown={e => { e.preventDefault(); triggerPad(pad.id) }}
                className={`relative rounded-xl border outline-none transition-all duration-75 ${
                  active
                    ? `bg-gradient-to-br ${colors.bg} border-white/15 scale-[0.96] ${colors.ring} ring-2`
                    : `bg-gradient-to-br ${colors.bg} border-white/[0.06] hover:border-white/10 active:scale-[0.96]`
                }`}
                style={{
                  boxShadow: active
                    ? `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow.replace('0.4', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.3)',
                  touchAction: 'none',
                }}
              >
                {/* Glow pulse on active */}
                {active && (
                  <span
                    className="absolute inset-0 rounded-xl pointer-events-none animate-[padPulse_0.3s_ease-out]"
                    style={{ background: `radial-gradient(circle, ${colors.glow.replace('0.4', '0.2')}, transparent 70%)` }}
                  />
                )}

                {/* Label */}
                <span className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none`}>
                  <span className={`text-[11px] md:text-sm font-medium tracking-wide ${colors.text} ${active ? 'opacity-90' : 'opacity-50'}`}>
                    {pad.name}
                  </span>
                  <span className="text-white/15 text-[8px] md:text-[9px] font-mono mt-0.5 hidden md:block">
                    {pad.key}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-4 md:pb-6 space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          1-4 drums · Q W E R melody · A S D F texture · Z X C V percussion
        </p>
        <Link href="/music-lab" className="inline-block text-cyan-300/18 text-[11px] hover:text-cyan-300/35 transition-colors">
          Music Lab
        </Link>
      </div>

      <style jsx>{`
        @keyframes padPulse {
          0% { opacity: 1; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
