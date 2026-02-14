'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Music Theory ───────────────────────────────────────────────────

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const DISPLAY_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

function midiToNote(midi: number): string {
  return NOTE_NAMES[midi % 12] + (Math.floor(midi / 12) - 1)
}

function midiToDisplay(midi: number): string {
  return DISPLAY_NAMES[midi % 12] + (Math.floor(midi / 12) - 1)
}

function isBlack(midi: number): boolean {
  return [1, 3, 6, 8, 10].includes(midi % 12)
}

// Stereo pan position: low notes left, high notes right (-1 to 1)
function midiToPan(midi: number): number {
  return ((midi - 48) / 48) * 0.7 // C3=left, C7=right, clamped
}

const KEY_MAP: Record<string, number> = {
  z: 0, s: 1, x: 2, d: 3, c: 4, v: 5, g: 6,
  b: 7, h: 8, n: 9, j: 10, m: 11,
  q: 12, '2': 13, w: 14, '3': 15, e: 16, r: 17, '5': 18,
  t: 19, '6': 20, y: 21, '7': 22, u: 23, i: 24,
}

// ─── Piano Audio Engine ─────────────────────────────────────────────
//
// Enhanced additive synthesis:
// - 3 chorused fundamental oscillators (wider, warmer)
// - 6 upper harmonics with inharmonicity + low-pass warmth
// - Stereo panning (low=left, high=right)
// - Longer, more natural sustain and release
// - Hammer attack noise with body resonance
// - Damper noise on release
// - Warm reverb (3s tail)
// - Sustain pedal support
// - Dynamic compression

class PianoEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private reverb: ConvolverNode | null = null
  private compressor: DynamicsCompressorNode | null = null
  private warmth: BiquadFilterNode | null = null
  sustain = false
  private sustainedNotes = new Set<number>()
  private active = new Map<number, {
    nodes: (OscillatorNode | AudioBufferSourceNode)[]
    noteMaster: GainNode
    panner: StereoPannerNode
  }>()

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    this.ctx = new AudioContext({ sampleRate: 44100 })

    // Compressor
    this.compressor = this.ctx.createDynamicsCompressor()
    this.compressor.threshold.value = -20
    this.compressor.knee.value = 15
    this.compressor.ratio.value = 3
    this.compressor.attack.value = 0.003
    this.compressor.release.value = 0.15
    this.compressor.connect(this.ctx.destination)

    // Warmth filter (gentle high-shelf rolloff)
    this.warmth = this.ctx.createBiquadFilter()
    this.warmth.type = 'lowshelf'
    this.warmth.frequency.value = 800
    this.warmth.gain.value = 3
    this.warmth.connect(this.compressor)

    // High-frequency softener
    const hiCut = this.ctx.createBiquadFilter()
    hiCut.type = 'lowpass'
    hiCut.frequency.value = 6000
    hiCut.Q.value = 0.5
    hiCut.connect(this.warmth)

    // Master gain
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.38

    // Reverb
    this.reverb = this.ctx.createConvolver()
    this.reverb.buffer = this.generateIR()

    // Dry/wet
    const dry = this.ctx.createGain()
    dry.gain.value = 0.68
    const wet = this.ctx.createGain()
    wet.gain.value = 0.32

    this.master.connect(dry)
    this.master.connect(this.reverb)
    this.reverb.connect(wet)
    dry.connect(hiCut)
    wet.connect(hiCut)
  }

  private generateIR(): AudioBuffer {
    const ctx = this.ctx!
    const rate = ctx.sampleRate
    const len = rate * 3 // 3-second reverb tail
    const buf = ctx.createBuffer(2, len, rate)

    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        // Early reflections (first 80ms)
        const early = t < 0.08
          ? 0.4 * (Math.random() * 2 - 1) * (1 - t / 0.08)
          : 0
        // Late diffuse tail with slower decay
        const late = Math.exp(-2.5 * t) * (Math.random() * 2 - 1)
        // Slight stereo decorrelation
        const stereo = ch === 0 ? 1.0 : 0.95
        d[i] = (early + late) * 0.3 * stereo
      }
    }
    return buf
  }

  noteOn(midi: number, velocity = 0.75) {
    if (!this.ctx || !this.master) return
    if (this.active.has(midi)) this.noteOff(midi)
    this.sustainedNotes.delete(midi)

    const ctx = this.ctx
    const now = ctx.currentTime
    const freq = midiToFreq(midi)

    // Note-dependent characteristics
    const sustain = 1.2 + 2.0 * Math.max(0, 1 - (midi - 36) / 60)
    const brightness = 0.6 + 0.4 * Math.min(1, (midi - 36) / 48) // high notes brighter
    const pan = midiToPan(midi)

    // Stereo panner
    const panner = ctx.createStereoPanner()
    panner.pan.value = pan
    panner.connect(this.master)

    // Per-note gain
    const noteMaster = ctx.createGain()
    noteMaster.gain.value = velocity
    noteMaster.connect(panner)

    const nodes: OscillatorNode[] = []

    // ── Fundamental: 3 chorused oscillators for warmth ──
    for (const detune of [-4, 0, 4]) {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.detune.value = detune

      const peak = 0.38 * velocity
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(peak, now + 0.002)
      // Natural piano decay: fast initial drop, then long sustain
      g.gain.setTargetAtTime(peak * 0.5, now + 0.002, 0.08)
      g.gain.setTargetAtTime(peak * 0.25, now + 0.08, 0.5)
      g.gain.setTargetAtTime(0.0001, now + 0.5, sustain)

      osc.connect(g)
      g.connect(noteMaster)
      osc.start(now)
      osc.stop(now + sustain * 5 + 1)
      nodes.push(osc)
    }

    // ── Upper harmonics ──
    const harmonics = [
      { ratio: 2,   amp: 0.45 * brightness, decay: sustain * 0.7  },
      { ratio: 3,   amp: 0.28 * brightness, decay: sustain * 0.55 },
      { ratio: 4,   amp: 0.16 * brightness, decay: sustain * 0.42 },
      { ratio: 5,   amp: 0.09 * brightness, decay: sustain * 0.32 },
      { ratio: 6,   amp: 0.05 * brightness, decay: sustain * 0.25 },
      { ratio: 7,   amp: 0.025 * brightness, decay: sustain * 0.2 },
    ]

    for (const h of harmonics) {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      // Inharmonicity
      osc.frequency.value = freq * h.ratio * (1 + 0.0004 * h.ratio * h.ratio)

      const peak = h.amp * velocity
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(peak, now + 0.002)
      g.gain.setTargetAtTime(peak * 0.35, now + 0.002, 0.06)
      g.gain.setTargetAtTime(0.0001, now + 0.06, h.decay)

      osc.connect(g)
      g.connect(noteMaster)
      osc.start(now)
      osc.stop(now + h.decay * 5 + 1)
      nodes.push(osc)
    }

    // ── Hammer noise ──
    try {
      const noiseLen = ctx.sampleRate * 0.03
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate)
      const nd = noiseBuf.getChannelData(0)
      for (let i = 0; i < noiseLen; i++) {
        nd[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.08))
      }
      const src = ctx.createBufferSource()
      src.buffer = noiseBuf

      const filt = ctx.createBiquadFilter()
      filt.type = 'bandpass'
      filt.frequency.value = Math.min(freq * 2.5, 7000)
      filt.Q.value = 1.2

      const ng = ctx.createGain()
      ng.gain.value = 0.09 * velocity

      src.connect(filt)
      filt.connect(ng)
      ng.connect(noteMaster)
      src.start(now)
    } catch { /* ok */ }

    // ── Body resonance (sub-harmonic warmth for lower notes) ──
    if (midi < 72) {
      try {
        const sub = ctx.createOscillator()
        const sg = ctx.createGain()
        sub.type = 'sine'
        sub.frequency.value = freq * 0.5 // sub-octave
        const subAmp = 0.06 * velocity * Math.max(0, 1 - (midi - 36) / 36)
        sg.gain.setValueAtTime(0, now)
        sg.gain.linearRampToValueAtTime(subAmp, now + 0.01)
        sg.gain.setTargetAtTime(0.0001, now + 0.01, sustain * 0.3)
        sub.connect(sg)
        sg.connect(noteMaster)
        sub.start(now)
        sub.stop(now + sustain * 2)
        nodes.push(sub)
      } catch { /* ok */ }
    }

    this.active.set(midi, { nodes, noteMaster, panner })
  }

  noteOff(midi: number) {
    // If sustain pedal is held, defer the release
    if (this.sustain) {
      this.sustainedNotes.add(midi)
      return
    }

    this.releaseNote(midi)
  }

  private releaseNote(midi: number) {
    const note = this.active.get(midi)
    if (!note || !this.ctx) return

    const now = this.ctx.currentTime

    // Smooth release (longer than before for more natural feel)
    note.noteMaster.gain.cancelScheduledValues(now)
    note.noteMaster.gain.setValueAtTime(note.noteMaster.gain.value, now)
    note.noteMaster.gain.setTargetAtTime(0.0001, now, 0.18)

    // Damper noise (subtle thud when key releases)
    try {
      const noiseLen = this.ctx.sampleRate * 0.015
      const buf = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < noiseLen; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.06)) * 0.03
      }
      const src = this.ctx.createBufferSource()
      src.buffer = buf
      src.connect(note.panner)
      src.start(now)
    } catch { /* ok */ }

    for (const osc of note.nodes) {
      try { osc.stop(now + 0.8) } catch { /* ok */ }
    }

    this.active.delete(midi)
  }

  releaseSustainedNotes() {
    for (const midi of this.sustainedNotes) {
      this.releaseNote(midi)
    }
    this.sustainedNotes.clear()
  }

  destroy() {
    for (const [midi] of this.active) this.releaseNote(midi)
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
  const start = (baseOctave + 1) * 12
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
  const [sustainOn, setSustainOn] = useState(false)
  const [lastNote, setLastNote] = useState<string | null>(null)
  const touchMap = useRef<Map<number, number>>(new Map())

  const keys = buildKeys(octave, 2)
  const whites = keys.filter(k => !k.black)
  const blacks = keys.filter(k => k.black)
  const ww = 100 / whites.length

  const getEngine = useCallback(async () => {
    if (!engineRef.current) engineRef.current = new PianoEngine()
    await engineRef.current.init()
    return engineRef.current
  }, [])

  useEffect(() => {
    return () => { engineRef.current?.destroy() }
  }, [])

  const noteOn = useCallback(async (midi: number) => {
    const eng = await getEngine()
    eng.noteOn(midi)
    setPressed(prev => new Set(prev).add(midi))
    setLastNote(midiToDisplay(midi))
  }, [getEngine])

  const noteOff = useCallback((midi: number) => {
    engineRef.current?.noteOff(midi)
    // Only remove from visual pressed if sustain is off
    if (!engineRef.current?.sustain) {
      setPressed(prev => {
        const next = new Set(prev)
        next.delete(midi)
        return next
      })
    }
  }, [])

  // Sustain pedal toggle
  const toggleSustain = useCallback(async () => {
    const eng = await getEngine()
    const newState = !eng.sustain
    eng.sustain = newState
    setSustainOn(newState)
    if (!newState) {
      eng.releaseSustainedNotes()
      setPressed(new Set())
    }
  }, [getEngine])

  // Keyboard input
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
      if (k === ' ') { e.preventDefault(); toggleSustain() }
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
  }, [octave, noteOn, noteOff, toggleSustain])

  // Touch helpers
  function midiAt(x: number, y: number): number | null {
    const el = document.elementFromPoint(x, y)
    const v = el?.getAttribute('data-midi')
    return v ? parseInt(v, 10) : null
  }

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

  function blackPos(midi: number): number {
    const whitesBefore = keys.filter(k => !k.black && k.midi < midi).length
    return whitesBefore * ww - ww * 0.3
  }

  return (
    <div className="bg-[#0a0a0f] min-h-[100dvh] flex flex-col overflow-hidden select-none">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] bg-rose-500/[0.025] rounded-full blur-[180px] top-1/4 left-1/3" />
        <div className="absolute w-80 h-80 bg-violet-500/[0.02] rounded-full blur-[120px] bottom-1/3 right-1/4" />
        <div className="absolute w-60 h-60 bg-amber-500/[0.015] rounded-full blur-[100px] top-1/2 left-1/4" />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-5 md:pt-8 pb-2 px-6">
        <p className="font-cursive text-3xl md:text-4xl text-rose-200/60 mb-1">
          For Tien
        </p>
        <p className="text-white/20 text-xs tracking-[0.25em] uppercase">
          Play something beautiful
        </p>
      </header>

      {/* Note display */}
      <div className="relative z-10 text-center h-10 flex items-center justify-center">
        {lastNote && (
          <span
            key={lastNote}
            className="text-rose-300/40 text-lg font-mono tracking-wider animate-[fadeIn_0.15s_ease-out]"
          >
            {lastNote}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-2">
        <button
          onClick={() => setOctave(o => Math.max(1, o - 1))}
          className="px-3.5 py-1.5 rounded-lg border border-white/8 text-white/30 text-xs tracking-wide hover:border-rose-400/20 hover:text-rose-200/45 transition-all active:scale-95"
          aria-label="Lower octave"
        >
          Lower
        </button>

        <span className="text-white/20 text-xs font-mono tracking-wider min-w-[80px] text-center">
          C{octave} — C{octave + 2}
        </span>

        <button
          onClick={() => setOctave(o => Math.min(6, o + 1))}
          className="px-3.5 py-1.5 rounded-lg border border-white/8 text-white/30 text-xs tracking-wide hover:border-rose-400/20 hover:text-rose-200/45 transition-all active:scale-95"
          aria-label="Higher octave"
        >
          Higher
        </button>

        <div className="w-px h-4 bg-white/8" />

        <button
          onClick={toggleSustain}
          className={`
            px-3.5 py-1.5 rounded-lg text-xs tracking-wide transition-all active:scale-95
            ${sustainOn
              ? 'border border-rose-400/30 bg-rose-500/10 text-rose-200/60'
              : 'border border-white/8 text-white/30 hover:border-rose-400/20 hover:text-rose-200/45'
            }
          `}
          aria-label="Toggle sustain pedal"
        >
          Sustain
        </button>
      </div>

      {/* Piano */}
      <div className="flex-1 flex items-end pb-3 md:pb-6 px-1 md:px-4 relative z-10">
        <div className="w-full rounded-t-xl bg-gradient-to-b from-[#1a1218] to-[#0f0a0d] border border-white/[0.06] border-b-0 p-1.5 pt-2.5 md:p-3 md:pt-4 shadow-[0_-4px_50px_rgba(244,114,182,0.04)]">
          <div
            className="relative w-full h-[220px] sm:h-[270px] md:h-[320px] lg:h-[370px]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            style={{ touchAction: 'none' }}
          >
            {/* White keys */}
            <div className="absolute inset-0 flex gap-[1.5px]">
              {whites.map((k) => {
                const active = pressed.has(k.midi)
                const isC = k.note.startsWith('C') && !k.note.includes('#')
                return (
                  <button
                    key={k.midi}
                    data-midi={k.midi}
                    className="relative flex-1 rounded-b-lg outline-none"
                    style={{
                      background: active
                        ? 'linear-gradient(to bottom, #fce4ec, #f8d7da)'
                        : 'linear-gradient(to bottom, #f7f4f1, #ebe7e3)',
                      boxShadow: active
                        ? '0 0 28px rgba(244,114,182,0.35), inset 0 -2px 4px rgba(244,114,182,0.12), 0 2px 0 rgba(0,0,0,0.1)'
                        : 'inset -1px 0 0 rgba(0,0,0,0.06), inset 0 -4px 8px rgba(0,0,0,0.05), 0 4px 0 rgba(0,0,0,0.08)',
                      transform: active ? 'translateY(2px)' : 'translateY(0)',
                      transition: 'transform 30ms ease-out, background 30ms ease-out, box-shadow 30ms ease-out',
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
                  >
                    {/* Active glow */}
                    {active && (
                      <span
                        className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-lg pointer-events-none"
                        style={{
                          background: 'linear-gradient(to top, rgba(244,114,182,0.15), transparent)',
                        }}
                      />
                    )}
                    {isC && (
                      <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] text-black/18 font-mono pointer-events-none">
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
                  className="absolute top-0 z-10 rounded-b-md outline-none"
                  style={{
                    left: `${left}%`,
                    width: `${ww * 0.62}%`,
                    height: '62%',
                    background: active
                      ? 'linear-gradient(to bottom, #4a1530, #3a1025)'
                      : 'linear-gradient(to bottom, #222226, #141416)',
                    boxShadow: active
                      ? '0 0 20px rgba(244,114,182,0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 0 rgba(0,0,0,0.3)'
                      : '2px 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.02)',
                    transform: active ? 'translateY(1px)' : 'translateY(0)',
                    transition: 'transform 30ms ease-out, background 30ms ease-out, box-shadow 30ms ease-out',
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
      <div className="relative z-10 text-center pb-4 md:pb-6 space-y-2">
        <p className="text-white/10 text-[10px] tracking-wide hidden md:block">
          Z–M lower · Q–U upper · [ ] octave · Space sustain
        </p>
        <Link
          href="/valentines-day/tien"
          className="inline-block text-rose-300/20 text-xs hover:text-rose-300/40 transition-colors"
        >
          Back to letter
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
