import type { BackingEvent, BackingKind } from './songs'

// Lead voices are Salamander grand piano samples (same source the Music Lab
// piano uses) pitch-shifted from the nearest recorded note. Everything else —
// drums, bass, pad — is synthesised, so the only network dependency is the
// piano, and a synth lead covers it if the CDN is unreachable.

const SAMPLE_CDN = 'https://tonejs.github.io/audio/salamander/'

const SAMPLE_NOTES: { name: string; midi: number }[] = [
  { name: 'A2', midi: 45 }, { name: 'C3', midi: 48 },
  { name: 'Ds3', midi: 51 }, { name: 'Fs3', midi: 54 },
  { name: 'A3', midi: 57 }, { name: 'C4', midi: 60 },
  { name: 'Ds4', midi: 63 }, { name: 'Fs4', midi: 66 },
  { name: 'A4', midi: 69 }, { name: 'C5', midi: 72 },
  { name: 'Ds5', midi: 75 }, { name: 'Fs5', midi: 78 },
  { name: 'A5', midi: 81 }, { name: 'C6', midi: 84 },
]

export type Bus = 'p1' | 'p2' | 'backing'

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12)

export class RhythmAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private reverbIn: GainNode | null = null
  private buses = new Map<Bus, GainNode>()
  private noiseBuf: AudioBuffer | null = null
  private samples = new Map<string, AudioBuffer>()

  samplesReady = false
  private disposed = false

  get context() { return this.ctx }
  get now() { return this.ctx ? this.ctx.currentTime : 0 }

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume()
      return
    }

    // Some Android and iOS devices refuse a forced sample rate and throw; the
    // hardware default is fine, everything here is rate-agnostic.
    let ctx: AudioContext
    try {
      ctx = new AudioContext({ sampleRate: 44100 })
    } catch {
      ctx = new AudioContext()
    }
    this.ctx = ctx

    const limiter = ctx.createDynamicsCompressor()
    limiter.threshold.value = -8
    limiter.knee.value = 10
    limiter.ratio.value = 4
    limiter.attack.value = 0.003
    limiter.release.value = 0.14
    limiter.connect(ctx.destination)

    const master = ctx.createGain()
    master.gain.value = 0.85
    master.connect(limiter)
    this.master = master

    const reverb = ctx.createConvolver()
    reverb.buffer = this.buildIR(ctx)
    const wet = ctx.createGain()
    wet.gain.value = 0.26
    reverb.connect(wet)
    wet.connect(master)

    const reverbIn = ctx.createGain()
    reverbIn.gain.value = 1
    reverbIn.connect(reverb)
    this.reverbIn = reverbIn

    for (const [bus, pan, gain] of [
      ['p1', -0.32, 1.0],
      ['p2', 0.32, 1.0],
      ['backing', 0, 0.72],
    ] as [Bus, number, number][]) {
      const g = ctx.createGain()
      g.gain.value = gain
      const p = ctx.createStereoPanner()
      p.pan.value = pan
      g.connect(p)
      p.connect(master)
      this.buses.set(bus, g)
    }

    const len = ctx.sampleRate * 2
    const noise = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = noise.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    this.noiseBuf = noise

    void this.loadSamples()
  }

  private buildIR(ctx: AudioContext): AudioBuffer {
    const rate = ctx.sampleRate
    const len = Math.floor(rate * 2.4)
    const buf = ctx.createBuffer(2, len, rate)
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch)
      for (let i = 0; i < len; i++) {
        const t = i / rate
        const early = t < 0.06 ? 0.35 * (Math.random() * 2 - 1) * (1 - t / 0.06) : 0
        const late = Math.exp(-2.8 * t) * (Math.random() * 2 - 1)
        d[i] = (early + late) * 0.2 * (ch === 0 ? 1 : 0.94)
      }
    }
    return buf
  }

  private async loadSamples() {
    const ctx = this.ctx
    if (!ctx) return
    const batch = 5
    for (let i = 0; i < SAMPLE_NOTES.length; i += batch) {
      if (this.disposed) return
      await Promise.all(SAMPLE_NOTES.slice(i, i + batch).map(async s => {
        try {
          const res = await fetch(`${SAMPLE_CDN}${s.name}.mp3`)
          if (!res.ok || this.disposed) return
          this.samples.set(s.name, await ctx.decodeAudioData(await res.arrayBuffer()))
        } catch {
          // Synth lead covers it.
        }
      }))
      // Playable as soon as any of the range has landed; the rest fills in.
      this.samplesReady = this.samples.size > 0
    }
  }

  setMasterVolume(v: number) {
    if (this.master) this.master.gain.value = Math.max(0, Math.min(1, v)) * 0.85
  }

  private bus(name: Bus): GainNode | null { return this.buses.get(name) ?? null }

  private noise(): AudioBufferSourceNode | null {
    if (!this.ctx || !this.noiseBuf) return null
    const src = this.ctx.createBufferSource()
    src.buffer = this.noiseBuf
    return src
  }

  private send(node: AudioNode, amount: number) {
    if (!this.ctx || !this.reverbIn || amount <= 0) return
    const g = this.ctx.createGain()
    g.gain.value = amount
    node.connect(g)
    g.connect(this.reverbIn)
  }

  // ─── Lead voices ──────────────────────────────────────────────────

  /** Player 1: sampled grand piano. Player 2: FM mallet so the two lines stay distinguishable. */
  lead(player: number, midi: number, when: number, vel = 0.85) {
    const ctx = this.ctx
    const bus = this.bus(player === 0 ? 'p1' : 'p2')
    if (!ctx || !bus) return
    const t = Math.max(when, ctx.currentTime)
    if (player === 0 && this.samplesReady) this.piano(midi, t, vel, bus)
    else if (player === 0) this.pluck(midi, t, vel, bus)
    else this.mallet(midi, t, vel, bus)
  }

  private nearestSample(midi: number) {
    let best: { name: string; midi: number } | null = null
    let bestDist = Infinity
    for (const s of SAMPLE_NOTES) {
      if (!this.samples.has(s.name)) continue
      const d = Math.abs(midi - s.midi)
      if (d < bestDist) { bestDist = d; best = s }
    }
    return best
  }

  private piano(midi: number, t: number, vel: number, out: GainNode) {
    const ctx = this.ctx!
    const sample = this.nearestSample(midi)
    if (!sample) { this.pluck(midi, t, vel, out); return }
    const buf = this.samples.get(sample.name)!

    const gain = ctx.createGain()
    gain.gain.value = 0.55 + vel * 0.7
    gain.connect(out)
    this.send(gain, 0.22)

    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 3200 + vel * 11000
    tone.Q.value = 0.5
    tone.connect(gain)

    const src = ctx.createBufferSource()
    src.buffer = buf
    src.playbackRate.value = Math.pow(2, (midi - sample.midi) / 12)
    src.connect(tone)
    src.start(t)
    src.stop(t + 4)
  }

  private pluck(midi: number, t: number, vel: number, out: GainNode) {
    const ctx = this.ctx!
    const f = freq(midi)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(vel * 0.5, t + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4)
    gain.connect(out)
    this.send(gain, 0.25)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(f * 7, t)
    filter.frequency.exponentialRampToValueAtTime(f * 2, t + 0.5)
    filter.connect(gain)

    for (const [ratio, level] of [[1, 1], [2, 0.32], [3, 0.14]] as [number, number][]) {
      const o = ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = f * ratio
      const g = ctx.createGain()
      g.gain.value = level
      o.connect(g); g.connect(filter)
      o.start(t); o.stop(t + 1.5)
    }
  }

  private mallet(midi: number, t: number, vel: number, out: GainNode) {
    const ctx = this.ctx!
    const f = freq(midi)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(vel * 0.46, t + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
    gain.connect(out)
    this.send(gain, 0.3)

    // FM: carrier at the fundamental, modulator a fourth above for a bell edge.
    const carrier = ctx.createOscillator()
    carrier.type = 'sine'
    carrier.frequency.value = f

    const mod = ctx.createOscillator()
    mod.type = 'sine'
    mod.frequency.value = f * 3.01
    const modDepth = ctx.createGain()
    modDepth.gain.setValueAtTime(f * 2.2 * vel, t)
    modDepth.gain.exponentialRampToValueAtTime(f * 0.05, t + 0.35)
    mod.connect(modDepth)
    modDepth.connect(carrier.frequency)

    const body = ctx.createOscillator()
    body.type = 'triangle'
    body.frequency.value = f * 2
    const bodyGain = ctx.createGain()
    bodyGain.gain.value = 0.18

    carrier.connect(gain)
    body.connect(bodyGain); bodyGain.connect(gain)

    for (const o of [carrier, mod, body]) { o.start(t); o.stop(t + 1.3) }
  }

  /** Failed note: the tone is swallowed, leaving only the stick sound. */
  miss(player: number) {
    const ctx = this.ctx
    const bus = this.bus(player === 0 ? 'p1' : 'p2')
    if (!ctx || !bus) return
    const t = ctx.currentTime
    const src = this.noise()
    if (!src) return
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 420
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.16, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
    src.connect(lp); lp.connect(g); g.connect(bus)
    src.start(t); src.stop(t + 0.1)
  }

  // ─── Backing ──────────────────────────────────────────────────────

  playBacking(ev: BackingEvent, when: number) {
    const bus = this.bus('backing')
    if (!this.ctx || !bus) return
    const t = Math.max(when, this.ctx.currentTime)
    const vel = ev.vel ?? 0.8
    switch (ev.kind) {
      case 'bass': if (ev.midi !== undefined) this.bass(ev.midi, t, ev.dur ?? 0.2, vel, bus); break
      case 'pad': if (ev.midis) this.pad(ev.midis, t, ev.dur ?? 1, vel, bus); break
      default: this.drum(ev.kind, t, vel, bus)
    }
  }

  private drum(kind: BackingKind, t: number, vel: number, out: GainNode) {
    const ctx = this.ctx!
    switch (kind) {
      case 'kick': {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.setValueAtTime(155, t)
        o.frequency.exponentialRampToValueAtTime(48, t + 0.045)
        const g = ctx.createGain()
        g.gain.setValueAtTime(vel * 1.1, t)
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
        o.connect(g); g.connect(out)
        o.start(t); o.stop(t + 0.42)
        break
      }
      case 'snare': {
        const n = this.noise(); if (!n) break
        const hp = ctx.createBiquadFilter()
        hp.type = 'highpass'; hp.frequency.value = 1400
        const g = ctx.createGain()
        g.gain.setValueAtTime(vel * 0.5, t)
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.17)
        n.connect(hp); hp.connect(g); g.connect(out)
        this.send(g, 0.22)
        n.start(t); n.stop(t + 0.2)

        const o = ctx.createOscillator()
        o.type = 'triangle'; o.frequency.value = 185
        const og = ctx.createGain()
        og.gain.setValueAtTime(vel * 0.35, t)
        og.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
        o.connect(og); og.connect(out)
        o.start(t); o.stop(t + 0.12)
        break
      }
      case 'clap': {
        for (let i = 0; i < 3; i++) {
          const n = this.noise(); if (!n) break
          const bp = ctx.createBiquadFilter()
          bp.type = 'bandpass'; bp.frequency.value = 1700; bp.Q.value = 1.1
          const g = ctx.createGain()
          const o = i * 0.011
          g.gain.setValueAtTime(vel * 0.36, t + o)
          g.gain.exponentialRampToValueAtTime(0.0001, t + o + 0.13)
          n.connect(bp); bp.connect(g); g.connect(out)
          if (i === 2) this.send(g, 0.3)
          n.start(t + o); n.stop(t + o + 0.15)
        }
        break
      }
      case 'hat':
      case 'shaker':
      case 'openhat':
      case 'ride': {
        const n = this.noise(); if (!n) break
        const hp = ctx.createBiquadFilter()
        hp.type = 'highpass'
        hp.frequency.value = kind === 'ride' ? 5200 : kind === 'shaker' ? 7800 : 8600
        const decay = kind === 'openhat' ? 0.28 : kind === 'ride' ? 0.5 : 0.045
        const level = kind === 'shaker' ? 0.12 : kind === 'ride' ? 0.16 : 0.2
        const g = ctx.createGain()
        g.gain.setValueAtTime(vel * level, t)
        g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
        n.connect(hp); hp.connect(g); g.connect(out)
        n.start(t); n.stop(t + decay + 0.02)
        break
      }
      default:
        break
    }
  }

  private bass(midi: number, t: number, dur: number, vel: number, out: GainNode) {
    const ctx = this.ctx!
    const f = freq(midi)

    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vel * 0.5, t + 0.012)
    g.gain.setValueAtTime(vel * 0.5, t + dur * 0.6)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    g.connect(out)

    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(f * 9, t)
    lp.frequency.exponentialRampToValueAtTime(f * 2.4, t + dur * 0.8)
    lp.Q.value = 4
    lp.connect(g)

    const saw = ctx.createOscillator()
    saw.type = 'sawtooth'; saw.frequency.value = f
    const sub = ctx.createOscillator()
    sub.type = 'sine'; sub.frequency.value = f / 2
    const subG = ctx.createGain(); subG.gain.value = 0.7

    saw.connect(lp)
    sub.connect(subG); subG.connect(g)
    saw.start(t); saw.stop(t + dur + 0.05)
    sub.start(t); sub.stop(t + dur + 0.05)
  }

  private pad(midis: number[], t: number, dur: number, vel: number, out: GainNode) {
    const ctx = this.ctx!
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(vel * 0.1, t + dur * 0.25)
    g.gain.linearRampToValueAtTime(0.0001, t + dur)
    g.connect(out)
    this.send(g, 0.5)

    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 2200
    lp.Q.value = 0.7
    lp.connect(g)

    for (const midi of midis) {
      for (const detune of [-6, 6]) {
        const o = ctx.createOscillator()
        o.type = 'sawtooth'
        o.frequency.value = freq(midi)
        o.detune.value = detune
        const og = ctx.createGain()
        og.gain.value = 0.16
        o.connect(og); og.connect(lp)
        o.start(t); o.stop(t + dur + 0.1)
      }
    }
  }

  async suspend() { if (this.ctx && this.ctx.state === 'running') await this.ctx.suspend() }
  async resume() { if (this.ctx && this.ctx.state === 'suspended') await this.ctx.resume() }

  destroy() {
    this.disposed = true
    if (this.ctx) { try { void this.ctx.close() } catch { /* already closed */ } }
    this.ctx = null
    this.master = null
    this.reverbIn = null
    this.buses.clear()
    this.samples.clear()
    this.samplesReady = false
  }
}
