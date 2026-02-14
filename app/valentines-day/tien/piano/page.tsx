'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Music Theory Helpers ───────────────────────────────────────────

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

function midiToNote(midi: number): string {
  return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1)
}

function isBlack(midi: number): boolean {
  return [1, 3, 6, 8, 10].includes(midi % 12)
}

// QWERTY keyboard mapping (semitone offsets from base octave)
const KEY_MAP: Record<string, number> = {
  z: 0, s: 1, x: 2, d: 3, c: 4, v: 5, g: 6,
  b: 7, h: 8, n: 9, j: 10, m: 11,
  q: 12, '2': 13, w: 14, '3': 15, e: 16, r: 17, '5': 18,
  t: 19, '6': 20, y: 21, '7': 22, u: 23, i: 24,
}

// ─── Piano Audio Engine ─────────────────────────────────────────────
//
// Additive synthesis with:
// - Chorused fundamental (2 detuned oscillators)
// - 5 upper harmonics with inharmonicity
// - Per-harmonic decay rates (higher harmonics decay faster)
// - Note-dependent sustain (lower notes ring longer)
// - Hammer attack noise (bandpass-filtered burst)
// - Algorithmic reverb (impulse response)
// - Dynamic compression for clean output

class PianoEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private reverb: ConvolverNode | null = null
  private compressor: DynamicsCompressorNode | null = null
  private active = new Map<number, {
    nodes: (OscillatorNode | AudioBufferSourceNode)[]
    noteMaster: GainNode
  }>()

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    this.ctx = new AudioContext({ sampleRate: 44100 })

    // Compressor → destination
    this.compressor = this.ctx.createDynamicsCompressor()
    this.compressor.threshold.value = -18
    this.compressor.knee.value = 12
    this.compressor.ratio.value = 4
    this.compressor.connect(this.ctx.destination)

    // Master gain
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.32

    // Reverb impulse response
    this.reverb = this.ctx.createConvolver()
    this.reverb.buffer = this.generateIR()

    // Dry path
    const dry = this.ctx.createGain()
    dry.gain.value = 0.72

    // Wet (reverb) path
    const wet = this.ctx.createGain()
    wet.gain.value = 0.28

    // Routing: master → dry → compressor
    //          master → reverb → wet → compressor
    this.master.connect(dry)
    this.master.connect(this.reverb)
    this.reverb.connect(wet)
    dry.connect(this.compressor)
    wet.connect(this.compressor)
  }

  private generateIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 2.5
    const buf = ctx.createBuffer(2, len, rate)

    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        const early = t < 0.05 ? 0.5 * (Math.random() * 2 - 1) : 0
        const late = Math.exp(-3.2 * t) * (Math.random() * 2 - 1)
        d[i] = (early + late) * 0.35
      }
    }
    return buf
  }

  noteOn(midi: number, velocity = 0.75) {
    if (!this.ctx || !this.master) return
    if (this.active.has(midi)) this.noteOff(midi)

    const ctx = this.ctx
    const now = ctx.currentTime
    const freq = midiToFreq(midi)

    // Lower notes sustain longer
    const sustain = 0.8 + 1.5 * Math.max(0, 1 - (midi - 36) / 60)

    // Per-note gain bus
    const noteMaster = ctx.createGain()
    noteMaster.gain.value = velocity
    noteMaster.connect(this.master)

    const nodes: OscillatorNode[] = []

    // ── Fundamental with chorus (2 detuned oscillators) ──
    for (const detune of [-3, 3]) {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.detune.value = detune

      const peak = 0.5 * velocity
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(peak, now + 0.003)
      g.gain.setTargetAtTime(peak * 0.35, now + 0.003, 0.18)
      g.gain.setTargetAtTime(0.0001, now + 0.18, sustain)

      osc.connect(g)
      g.connect(noteMaster)
      osc.start(now)
      osc.stop(now + sustain * 4 + 0.5)
      nodes.push(osc)
    }

    // ── Upper harmonics ──
    const harmonics = [
      { ratio: 2, amp: 0.42, decay: sustain * 0.65 },
      { ratio: 3, amp: 0.24, decay: sustain * 0.5 },
      { ratio: 4, amp: 0.14, decay: sustain * 0.38 },
      { ratio: 5, amp: 0.08, decay: sustain * 0.28 },
      { ratio: 6, amp: 0.04, decay: sustain * 0.22 },
    ]

    for (const h of harmonics) {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      // Inharmonicity: upper partials are slightly sharp on real pianos
      osc.frequency.value = freq * h.ratio * (1 + 0.0003 * h.ratio * h.ratio)

      const peak = h.amp * velocity
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(peak, now + 0.003)
      g.gain.setTargetAtTime(peak * 0.3, now + 0.003, 0.1)
      g.gain.setTargetAtTime(0.0001, now + 0.1, h.decay)

      osc.connect(g)
      g.connect(noteMaster)
      osc.start(now)
      osc.stop(now + h.decay * 4 + 0.5)
      nodes.push(osc)
    }

    // ── Hammer attack noise ──
    try {
      const noiseLen = ctx.sampleRate * 0.025
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate)
      const nd = noiseBuf.getChannelData(0)
      for (let i = 0; i < noiseLen; i++) {
        nd[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.1))
      }
      const src = ctx.createBufferSource()
      src.buffer = noiseBuf

      const filt = ctx.createBiquadFilter()
      filt.type = 'bandpass'
      filt.frequency.value = Math.min(freq * 3, 8000)
      filt.Q.value = 1.5

      const ng = ctx.createGain()
      ng.gain.value = 0.07 * velocity

      src.connect(filt)
      filt.connect(ng)
      ng.connect(noteMaster)
      src.start(now)
    } catch {
      // Non-critical: continue without hammer noise
    }

    this.active.set(midi, { nodes, noteMaster })
  }

  noteOff(midi: number) {
    const note = this.active.get(midi)
    if (!note || !this.ctx) return

    const now = this.ctx.currentTime

    // Fade out via the note master gain
    note.noteMaster.gain.cancelScheduledValues(now)
    note.noteMaster.gain.setValueAtTime(note.noteMaster.gain.value, now)
    note.noteMaster.gain.setTargetAtTime(0.0001, now, 0.1)

    for (const osc of note.nodes) {
      try { osc.stop(now + 0.5) } catch { /* already stopped */ }
    }

    this.active.delete(midi)
  }

  destroy() {
    for (const [midi] of this.active) this.noteOff(midi)
    if (this.ctx) {
      try { this.ctx.close() } catch { /* ok */ }
      this.ctx = null
    }
  }
}

// ─── Key Layout ─────────────────────────────────────────────────────

interface KeyInfo {
  midi: number
  note: string
  black: boolean
}

function buildKeys(baseOctave: number, octaves: number): KeyInfo[] {
  const start = (baseOctave + 1) * 12 // C of baseOctave
  const end = start + octaves * 12
  const keys: KeyInfo[] = []
  for (let m = start; m <= end; m++) {
    keys.push({ midi: m, note: midiToNote(m), black: isBlack(m) })
  }
  return keys
}

// ─── Piano Page ─────────────────────────────────────────────────────

export default function PianoPage() {
  const engineRef = useRef<PianoEngine | null>(null)
  const [pressed, setPressed] = useState<Set<number>>(new Set())
  const [octave, setOctave] = useState(3)
  const touchMap = useRef<Map<number, number>>(new Map())

  const keys = buildKeys(octave, 2)
  const whites = keys.filter(k => !k.black)
  const blacks = keys.filter(k => k.black)
  const ww = 100 / whites.length // white key width %

  // ── Engine lifecycle ──
  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new PianoEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => {
    return () => { engineRef.current?.destroy() }
  }, [])

  // ── Note on/off ──
  const noteOn = useCallback(async (midi: number) => {
    const eng = await getEngine()
    eng.noteOn(midi)
    setPressed(prev => new Set(prev).add(midi))
  }, [getEngine])

  const noteOff = useCallback((midi: number) => {
    engineRef.current?.noteOff(midi)
    setPressed(prev => {
      const next = new Set(prev)
      next.delete(midi)
      return next
    })
  }, [])

  // ── QWERTY keyboard ──
  useEffect(() => {
    const held = new Set<string>()

    function down(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey) return
      const k = e.key.toLowerCase()
      if (k in KEY_MAP && !held.has(k)) {
        e.preventDefault()
        held.add(k)
        noteOn((octave + 1) * 12 + KEY_MAP[k])
      }
      if (k === '[') setOctave(o => Math.max(1, o - 1))
      if (k === ']') setOctave(o => Math.min(6, o + 1))
    }

    function up(e: KeyboardEvent) {
      const k = e.key.toLowerCase()
      if (k in KEY_MAP) {
        held.delete(k)
        noteOff((octave + 1) * 12 + KEY_MAP[k])
      }
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [octave, noteOn, noteOff])

  // ── Touch: resolve MIDI from point ──
  function midiAt(x: number, y: number): number | null {
    const el = document.elementFromPoint(x, y)
    const v = el?.getAttribute('data-midi')
    return v ? parseInt(v, 10) : null
  }

  // ── Touch handlers (multi-touch + glissando) ──
  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]
      const midi = midiAt(t.clientX, t.clientY)
      if (midi !== null) {
        touchMap.current.set(t.identifier, midi)
        noteOn(midi)
      }
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]
      const midi = midiAt(t.clientX, t.clientY)
      const prev = touchMap.current.get(t.identifier)
      if (midi !== null && midi !== prev) {
        if (prev !== undefined) noteOff(prev)
        touchMap.current.set(t.identifier, midi)
        noteOn(midi)
      }
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]
      const midi = touchMap.current.get(t.identifier)
      if (midi !== undefined) {
        noteOff(midi)
        touchMap.current.delete(t.identifier)
      }
    }
  }

  // ── Black key position ──
  function blackPos(midi: number): number {
    const whitesBefore = keys.filter(k => !k.black && k.midi < midi).length
    return whitesBefore * ww - ww * 0.3
  }

  return (
    <div className="bg-[#0a0a0f] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-96 h-96 bg-rose-500/[0.03] rounded-full blur-[150px] top-1/4 left-1/3" />
        <div className="absolute w-72 h-72 bg-violet-500/[0.02] rounded-full blur-[100px] bottom-1/3 right-1/4" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-6 md:pt-10 pb-3 px-6">
        <p className="font-cursive text-3xl md:text-4xl text-rose-200/60 mb-2">
          For Tien
        </p>
        <p className="text-white/20 text-xs tracking-[0.25em] uppercase">
          Play something beautiful
        </p>
      </header>

      {/* Octave controls */}
      <div className="relative z-10 flex items-center justify-center gap-5 py-3">
        <button
          onClick={() => setOctave(o => Math.max(1, o - 1))}
          className="px-4 py-1.5 rounded-lg border border-white/8 text-white/35 text-xs tracking-wide hover:border-rose-400/25 hover:text-rose-200/50 transition-all active:scale-95"
          aria-label="Lower octave"
        >
          Lower
        </button>
        <span className="text-white/25 text-xs font-mono tracking-wider">
          C{octave} — C{octave + 2}
        </span>
        <button
          onClick={() => setOctave(o => Math.min(6, o + 1))}
          className="px-4 py-1.5 rounded-lg border border-white/8 text-white/35 text-xs tracking-wide hover:border-rose-400/25 hover:text-rose-200/50 transition-all active:scale-95"
          aria-label="Higher octave"
        >
          Higher
        </button>
      </div>

      {/* Piano */}
      <div className="flex-1 flex items-end pb-4 md:pb-8 px-1 md:px-4 relative z-10">
        {/* Piano body frame */}
        <div className="w-full rounded-t-xl bg-gradient-to-b from-[#1a1218] to-[#0f0a0d] border border-white/[0.06] border-b-0 p-2 pt-3 md:p-3 md:pt-4 shadow-[0_-4px_40px_rgba(244,114,182,0.05)]">
          <div
            className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            style={{ touchAction: 'none' }}
          >
            {/* White keys */}
            <div className="absolute inset-0 flex gap-[2px]">
              {whites.map((k) => {
                const active = pressed.has(k.midi)
                const isC = k.note.startsWith('C') && !k.note.includes('#')
                return (
                  <button
                    key={k.midi}
                    data-midi={k.midi}
                    className={`
                      relative flex-1 rounded-b-lg transition-colors duration-[40ms] outline-none
                      ${active
                        ? 'bg-gradient-to-b from-rose-100 to-rose-50 shadow-[0_0_24px_rgba(244,114,182,0.35),inset_0_-4px_8px_rgba(244,114,182,0.1)]'
                        : 'bg-gradient-to-b from-[#f5f2ef] to-[#e8e4e0] shadow-[inset_-1px_0_0_rgba(0,0,0,0.08),inset_0_-3px_6px_rgba(0,0,0,0.06)]'
                      }
                    `}
                    onPointerDown={(e) => {
                      if (e.pointerType === 'touch') return // handled by touch events
                      e.preventDefault()
                      noteOn(k.midi)
                    }}
                    onPointerUp={(e) => {
                      if (e.pointerType === 'touch') return
                      noteOff(k.midi)
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === 'touch') return
                      if (pressed.has(k.midi)) noteOff(k.midi)
                    }}
                  >
                    {isC && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-black/20 font-mono pointer-events-none">
                        {k.note}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Black keys */}
            {blacks.map((k) => {
              const active = pressed.has(k.midi)
              const left = blackPos(k.midi)
              return (
                <button
                  key={k.midi}
                  data-midi={k.midi}
                  className={`
                    absolute top-0 z-10 rounded-b-md outline-none transition-colors duration-[40ms]
                    ${active
                      ? 'bg-gradient-to-b from-[#4a1530] to-[#3d1228] shadow-[0_0_18px_rgba(244,114,182,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]'
                      : 'bg-gradient-to-b from-[#1a1a1e] to-[#111114] shadow-[2px_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]'
                    }
                  `}
                  style={{
                    left: `${left}%`,
                    width: `${ww * 0.62}%`,
                    height: '60%',
                  }}
                  onPointerDown={(e) => {
                    if (e.pointerType === 'touch') return
                    e.preventDefault()
                    noteOn(k.midi)
                  }}
                  onPointerUp={(e) => {
                    if (e.pointerType === 'touch') return
                    noteOff(k.midi)
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'touch') return
                    if (pressed.has(k.midi)) noteOff(k.midi)
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-5 md:pb-8 space-y-3">
        <p className="text-white/12 text-[10px] tracking-wide hidden md:block">
          Z–M lower octave · Q–U upper octave · [ ] shift octave
        </p>
        <Link
          href="/valentines-day/tien"
          className="inline-block text-rose-300/25 text-xs hover:text-rose-300/50 transition-colors"
        >
          Back to letter
        </Link>
      </div>
    </div>
  )
}
