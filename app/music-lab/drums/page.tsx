'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Configuration ──────────────────────────────────────────────────

const STEPS = 16

interface DrumSound {
  name: string
  short: string
  color: string
  key: string
}

const SOUNDS: DrumSound[] = [
  { name: 'Kick',      short: 'KK', color: '#EF4444', key: '1' },
  { name: 'Snare',     short: 'SN', color: '#F97316', key: '2' },
  { name: 'Clap',      short: 'CP', color: '#EAB308', key: '3' },
  { name: 'HH Closed', short: 'CH', color: '#22C55E', key: '4' },
  { name: 'HH Open',   short: 'OH', color: '#06B6D4', key: '5' },
  { name: 'Tom Lo',    short: 'TL', color: '#3B82F6', key: '6' },
  { name: 'Tom Hi',    short: 'TH', color: '#8B5CF6', key: '7' },
  { name: 'Cymbal',    short: 'CY', color: '#EC4899', key: '8' },
]

function parsePattern(rows: string[]): boolean[][] {
  return rows.map(r => r.split('').map(c => c === 'x'))
}

const PRESET = parsePattern([
  'x...x...x...x...',  // Kick: four-on-the-floor
  '....x.......x...',  // Snare: 2 and 4
  '........x.......',  // Clap: accent on 3
  'x.x.x.x.x.x.x.x',  // CH: 8ths
  '.......x.......x',  // OH: and-of-4
  '..........x.....',  // Tom Lo
  '..............x.',  // Tom Hi
  'x...............',  // Cymbal: downbeat
])

function emptyPattern(): boolean[][] {
  return SOUNDS.map(() => Array(STEPS).fill(false))
}

// ─── 808 Drum Engine ────────────────────────────────────────────────
//
// Authentic TR-808 synthesis. The hi-hats use 6 square-wave
// oscillators at non-harmonic frequencies from the original circuit.
// Closed hi-hat chokes open hi-hat, like a real kit.

// Metallic hi-hat oscillator frequencies (from TR-808 analysis)
const HH_FREQS = [205.3, 304.4, 369.6, 522.7, 540.0, 800.0]

class DrumEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private openHHEnv: GainNode | null = null

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }
    this.ctx = new AudioContext({ sampleRate: 44100 })

    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -10
    comp.knee.value = 10
    comp.ratio.value = 6
    comp.attack.value = 0.002
    comp.release.value = 0.08
    comp.connect(this.ctx.destination)

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.85
    this.master.connect(comp)
  }

  private noise(dur: number): AudioBufferSourceNode {
    const ctx = this.ctx!
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    const src = ctx.createBufferSource()
    src.buffer = buf
    return src
  }

  play(soundIndex: number, time?: number) {
    if (!this.ctx || !this.master) return
    const t = time ?? this.ctx.currentTime
    switch (soundIndex) {
      case 0: this.kick(t); break
      case 1: this.snare(t); break
      case 2: this.clap(t); break
      case 3: this.hihatClosed(t); break
      case 4: this.hihatOpen(t); break
      case 5: this.tomLo(t); break
      case 6: this.tomHi(t); break
      case 7: this.cymbal(t); break
    }
  }

  private kick(t: number) {
    const ctx = this.ctx!
    // Sine body with pitch envelope
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(160, t)
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.03)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.85, t + 0.001)
    g.gain.setTargetAtTime(0.001, t + 0.02, 0.12)
    osc.connect(g); g.connect(this.master!)
    osc.start(t); osc.stop(t + 1)

    // Click transient
    const n = this.noise(0.008)
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 4000
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.3, t)
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.006)
    n.connect(hp); hp.connect(ng); ng.connect(this.master!)
    n.start(t); n.stop(t + 0.01)
  }

  private snare(t: number) {
    const ctx = this.ctx!
    // Body
    const osc = ctx.createOscillator(); osc.type = 'sine'
    osc.frequency.setValueAtTime(200, t)
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.02)
    const og = ctx.createGain()
    og.gain.setValueAtTime(0, t)
    og.gain.linearRampToValueAtTime(0.5, t + 0.001)
    og.gain.setTargetAtTime(0.001, t + 0.01, 0.04)
    osc.connect(og); og.connect(this.master!)
    osc.start(t); osc.stop(t + 0.4)

    // Noise (snare wires)
    const n = this.noise(0.2)
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3000; bp.Q.value = 1.5
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0, t)
    ng.gain.linearRampToValueAtTime(0.4, t + 0.001)
    ng.gain.setTargetAtTime(0.001, t + 0.01, 0.05)
    n.connect(bp); bp.connect(ng); ng.connect(this.master!)
    n.start(t); n.stop(t + 0.25)
  }

  private clap(t: number) {
    const ctx = this.ctx!
    // Multiple micro-bursts
    for (let i = 0; i < 3; i++) {
      const n = this.noise(0.006)
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 1.5
      const g = ctx.createGain()
      const start = t + i * 0.014
      g.gain.setValueAtTime(0.3, start)
      g.gain.exponentialRampToValueAtTime(0.001, start + 0.005)
      n.connect(bp); bp.connect(g); g.connect(this.master!)
      n.start(start); n.stop(start + 0.007)
    }
    // Tail
    const tail = this.noise(0.2)
    const tbp = ctx.createBiquadFilter(); tbp.type = 'bandpass'; tbp.frequency.value = 2500; tbp.Q.value = 1
    const tg = ctx.createGain()
    tg.gain.setValueAtTime(0.18, t + 0.04)
    tg.gain.setTargetAtTime(0.001, t + 0.05, 0.06)
    tail.connect(tbp); tbp.connect(tg); tg.connect(this.master!)
    tail.start(t + 0.04); tail.stop(t + 0.3)
  }

  private makeHHSource(t: number, dur: number): GainNode {
    const ctx = this.ctx!
    // 6 square-wave oscillators at non-harmonic frequencies (authentic 808)
    const mix = ctx.createGain(); mix.gain.value = 0.12
    for (const freq of HH_FREQS) {
      const osc = ctx.createOscillator(); osc.type = 'square'
      osc.frequency.value = freq
      osc.connect(mix)
      osc.start(t); osc.stop(t + dur)
    }
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7500
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 10000; bp.Q.value = 1
    mix.connect(hp); hp.connect(bp)

    const env = ctx.createGain()
    bp.connect(env)
    return env
  }

  private hihatClosed(t: number) {
    // Choke any ringing open hi-hat
    if (this.openHHEnv) {
      this.openHHEnv.gain.setValueAtTime(this.openHHEnv.gain.value, t)
      this.openHHEnv.gain.linearRampToValueAtTime(0, t + 0.008)
      this.openHHEnv = null
    }
    const env = this.makeHHSource(t, 0.08)
    env.gain.setValueAtTime(0.6, t)
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
    env.connect(this.master!)
  }

  private hihatOpen(t: number) {
    // Choke previous open hat
    if (this.openHHEnv) {
      this.openHHEnv.gain.setValueAtTime(this.openHHEnv.gain.value, t)
      this.openHHEnv.gain.linearRampToValueAtTime(0, t + 0.008)
    }
    const env = this.makeHHSource(t, 0.5)
    env.gain.setValueAtTime(0.5, t)
    env.gain.setTargetAtTime(0.001, t + 0.02, 0.12)
    env.connect(this.master!)
    this.openHHEnv = env
  }

  private tom(t: number, startFreq: number, endFreq: number) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator(); osc.type = 'sine'
    osc.frequency.setValueAtTime(startFreq, t)
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.04)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.6, t + 0.001)
    g.gain.setTargetAtTime(0.001, t + 0.02, 0.08)
    osc.connect(g); g.connect(this.master!)
    osc.start(t); osc.stop(t + 0.5)

    // Stick click
    const n = this.noise(0.005)
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2000
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.15, t)
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.004)
    n.connect(hp); hp.connect(ng); ng.connect(this.master!)
    n.start(t); n.stop(t + 0.008)
  }

  private tomLo(t: number) { this.tom(t, 200, 100) }
  private tomHi(t: number) { this.tom(t, 320, 220) }

  private cymbal(t: number) {
    const ctx = this.ctx!
    // Metallic oscillators (wider spread than hi-hat)
    const mix = ctx.createGain(); mix.gain.value = 0.06
    for (const freq of [296.7, 411.3, 543.2, 634.8, 829.5, 1048.6]) {
      const osc = ctx.createOscillator(); osc.type = 'square'
      osc.frequency.value = freq
      osc.connect(mix)
      osc.start(t); osc.stop(t + 2)
    }
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5000
    const env = ctx.createGain()
    env.gain.setValueAtTime(0.45, t)
    env.gain.setTargetAtTime(0.001, t + 0.03, 0.4)
    mix.connect(hp); hp.connect(env); env.connect(this.master!)
  }

  getTime() { return this.ctx?.currentTime ?? 0 }

  destroy() {
    if (this.ctx) { try { this.ctx.close() } catch { /* ok */ } }
    this.ctx = null
  }
}

// ─── Page ─────────────────────────────────────────────────────────

export default function DrumMachinePage() {
  const engineRef = useRef<DrumEngine | null>(null)
  const [pattern, setPattern] = useState<boolean[][]>(() => PRESET.map(r => [...r]))
  const patternRef = useRef(pattern)
  const [isPlaying, setIsPlaying] = useState(false)
  const isPlayingRef = useRef(false)
  const [displayStep, setDisplayStep] = useState(-1)
  const [bpm, setBpm] = useState(110)
  const bpmRef = useRef(110)
  const nextStepTimeRef = useRef(0)
  const currentStepRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [activeSounds, setActiveSounds] = useState<Set<number>>(new Set())

  useEffect(() => { patternRef.current = pattern }, [pattern])
  useEffect(() => { bpmRef.current = bpm }, [bpm])

  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new DrumEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => () => { engineRef.current?.destroy() }, [])

  // Toggle a cell in the pattern
  const toggleCell = useCallback((sound: number, step: number) => {
    setPattern(prev => {
      const next = prev.map(r => [...r])
      next[sound][step] = !next[sound][step]
      return next
    })
  }, [])

  // Audition a sound (click the label)
  const auditionSound = useCallback(async (soundIndex: number) => {
    const eng = await getEngine()
    eng.play(soundIndex)
    setActiveSounds(prev => new Set(prev).add(soundIndex))
    setTimeout(() => {
      setActiveSounds(prev => { const n = new Set(prev); n.delete(soundIndex); return n })
    }, 200)
  }, [getEngine])

  // ── Sequencer ──

  const scheduler = useCallback(() => {
    const eng = engineRef.current
    if (!eng || !isPlayingRef.current) return
    const LOOK_AHEAD = 0.1
    const now = eng.getTime()

    while (nextStepTimeRef.current < now + LOOK_AHEAD) {
      const step = currentStepRef.current
      const time = nextStepTimeRef.current

      // Schedule active sounds for this step
      for (let s = 0; s < SOUNDS.length; s++) {
        if (patternRef.current[s]?.[step]) {
          eng.play(s, time)
        }
      }

      // Schedule visual update
      const delay = Math.max(0, (time - now) * 1000)
      const capturedStep = step
      setTimeout(() => {
        if (isPlayingRef.current) setDisplayStep(capturedStep)
      }, delay)

      // Advance
      const secondsPerStep = 60.0 / bpmRef.current / 4
      nextStepTimeRef.current += secondsPerStep
      currentStepRef.current = (step + 1) % STEPS
    }
  }, [])

  const startSequencer = useCallback(async () => {
    const eng = await getEngine()
    isPlayingRef.current = true
    setIsPlaying(true)
    currentStepRef.current = 0
    nextStepTimeRef.current = eng.getTime() + 0.05
    timerRef.current = setInterval(scheduler, 25)
  }, [getEngine, scheduler])

  const stopSequencer = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
    setDisplayStep(-1)
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) stopSequencer()
    else startSequencer()
  }, [startSequencer, stopSequencer])

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  // Keyboard shortcuts
  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k === ' ') { e.preventDefault(); togglePlay(); return }
      // Number keys audition sounds
      const idx = SOUNDS.findIndex(s => s.key === k)
      if (idx !== -1) { e.preventDefault(); auditionSound(idx) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [togglePlay, auditionSound])

  return (
    <div className="bg-[#0a0812] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] bg-rose-500/[0.02] rounded-full blur-[200px] top-1/4 left-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-violet-500/[0.015] rounded-full blur-[150px] bottom-1/3 right-1/4" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 md:pt-6 pb-2 px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-1">FrankX Music Lab</p>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 via-orange-300 to-rose-300 bg-clip-text text-transparent">
          Drum Machine
        </h1>
        <p className="text-white/25 text-xs mt-1">
          808 · 16-Step Sequencer
        </p>
      </header>

      {/* Transport controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-3 px-4">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
              : 'bg-white/5 border border-white/15 text-white/60 hover:text-white/80 hover:border-white/25'
          }`}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>
          )}
        </button>

        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2">
          <button
            onClick={() => setBpm(b => Math.max(60, b - 5))}
            className="text-white/40 hover:text-white/70 text-lg font-bold w-6 h-6 flex items-center justify-center"
          >-</button>
          <span className="text-white/70 font-mono text-sm w-16 text-center">{bpm} BPM</span>
          <button
            onClick={() => setBpm(b => Math.min(180, b + 5))}
            className="text-white/40 hover:text-white/70 text-lg font-bold w-6 h-6 flex items-center justify-center"
          >+</button>
        </div>

        <button
          onClick={() => setPattern(emptyPattern())}
          className="text-white/30 text-[10px] tracking-wider uppercase hover:text-white/50 transition-colors px-3 py-2 border border-white/8 rounded-lg"
        >Clear</button>
        <button
          onClick={() => setPattern(PRESET.map(r => [...r]))}
          className="text-white/30 text-[10px] tracking-wider uppercase hover:text-white/50 transition-colors px-3 py-2 border border-white/8 rounded-lg"
        >Preset</button>
      </div>

      {/* Step indicators */}
      <div className="relative z-10 flex justify-center px-4">
        <div className="flex gap-[3px] md:gap-1">
          <div className="w-14 md:w-20" /> {/* Spacer for labels */}
          {Array.from({ length: STEPS }, (_, i) => (
            <div
              key={i}
              className="w-[22px] h-1.5 md:w-7 md:h-2 rounded-full transition-colors duration-75"
              style={{
                background: displayStep === i ? '#EF4444' : i % 4 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-start justify-center px-4 py-3 relative z-10 overflow-x-auto">
        <div className="flex flex-col gap-[3px] md:gap-1">
          {SOUNDS.map((sound, s) => (
            <div key={sound.name} className="flex items-center gap-[3px] md:gap-1">
              {/* Sound label (clickable for audition) */}
              <button
                onClick={() => auditionSound(s)}
                className={`w-14 md:w-20 h-[22px] md:h-7 flex items-center px-1.5 md:px-2 rounded-md transition-all text-left ${
                  activeSounds.has(s) ? 'bg-white/10' : 'bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-[9px] md:text-[11px] font-mono tracking-wide truncate" style={{ color: sound.color + (activeSounds.has(s) ? '' : '80') }}>
                  {sound.short}
                </span>
              </button>

              {/* Steps */}
              {Array.from({ length: STEPS }, (_, step) => {
                const active = pattern[s]?.[step] ?? false
                const isCurrent = displayStep === step
                return (
                  <button
                    key={step}
                    onClick={() => toggleCell(s, step)}
                    className="w-[22px] h-[22px] md:w-7 md:h-7 rounded-[4px] md:rounded-[5px] transition-all duration-75 outline-none"
                    style={{
                      background: active
                        ? sound.color + (isCurrent ? '' : 'cc')
                        : isCurrent
                          ? 'rgba(255,255,255,0.06)'
                          : step % 4 === 0
                            ? 'rgba(255,255,255,0.035)'
                            : 'rgba(255,255,255,0.018)',
                      boxShadow: active && isCurrent
                        ? `0 0 12px ${sound.color}50`
                        : active
                          ? `inset 0 1px 0 rgba(255,255,255,0.15)`
                          : 'none',
                      transform: active && isCurrent ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 md:pb-5 space-y-1.5">
        <p className="text-white/8 text-[9px] tracking-wide hidden md:block">
          Space: Play/Stop · 1-8: Audition sounds · Click grid to program
        </p>
        <Link href="/music-lab" className="inline-block text-rose-300/18 text-[11px] hover:text-rose-300/35 transition-colors">
          Music Lab
        </Link>
      </div>
    </div>
  )
}
