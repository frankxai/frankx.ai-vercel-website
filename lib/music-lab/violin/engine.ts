import { midiToFrequency } from './model'

export interface ViolinExpression {
  energy: number
  pressure: number
  vibrato: number
  room: number
}

interface ActiveVoice {
  token: number
  sources: AudioScheduledSourceNode[]
  nodes: AudioNode[]
  remainingSources: number
  cleanupTimer: ReturnType<typeof setTimeout> | null
  cleaned: boolean
  soft: OscillatorNode
  bright: OscillatorNode
  noise: AudioBufferSourceNode
  noteGain: GainNode
  softGain: GainNode
  brightGain: GainNode
  noiseGain: GainNode
  tone: BiquadFilterNode
  vibrato: OscillatorNode
  vibratoDepth: GainNode
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export class ViolinEngine {
  private context: AudioContext | null = null
  private input: GainNode | null = null
  private master: GainNode | null = null
  private wet: GainNode | null = null
  private graphNodes: AudioNode[] = []
  private noiseBuffer: AudioBuffer | null = null
  private voice: ActiveVoice | null = null
  private voices = new Set<ActiveVoice>()
  private strokeTimers = new Set<ReturnType<typeof setTimeout>>()
  private voiceToken = 0
  private gestureToken = 0
  private disposed = false

  get isReady() {
    return this.context?.state === 'running'
  }

  /** Must be called directly from a click, pointer, or keyboard gesture. */
  async init() {
    if (this.disposed) throw new Error('The violin audio engine has been disposed.')
    if (this.context && this.context.state !== 'closed') {
      if (this.context.state === 'suspended') await this.context.resume()
      return
    }

    this.disposed = false
    const context = new AudioContext({ latencyHint: 'interactive' })
    this.context = context

    const limiter = context.createDynamicsCompressor()
    limiter.threshold.value = -9
    limiter.knee.value = 10
    limiter.ratio.value = 5
    limiter.attack.value = 0.003
    limiter.release.value = 0.16
    limiter.connect(context.destination)

    const master = context.createGain()
    master.gain.value = 0.72
    master.connect(limiter)
    this.master = master

    const input = context.createGain()
    this.input = input

    const bodyLow = context.createBiquadFilter()
    bodyLow.type = 'peaking'
    bodyLow.frequency.value = 285
    bodyLow.Q.value = 1.1
    bodyLow.gain.value = 2.4

    const bodyMid = context.createBiquadFilter()
    bodyMid.type = 'peaking'
    bodyMid.frequency.value = 720
    bodyMid.Q.value = 1.4
    bodyMid.gain.value = 3.2

    const bodyHigh = context.createBiquadFilter()
    bodyHigh.type = 'peaking'
    bodyHigh.frequency.value = 2100
    bodyHigh.Q.value = 1.8
    bodyHigh.gain.value = 1.8

    input.connect(bodyLow)
    bodyLow.connect(bodyMid)
    bodyMid.connect(bodyHigh)

    const dry = context.createGain()
    dry.gain.value = 0.86
    bodyHigh.connect(dry)
    dry.connect(master)

    const reverb = context.createConvolver()
    reverb.buffer = this.buildRoomImpulse(context)
    bodyHigh.connect(reverb)

    const wet = context.createGain()
    wet.gain.value = 0.16
    reverb.connect(wet)
    wet.connect(master)
    this.wet = wet

    this.graphNodes = [
      input,
      bodyLow,
      bodyMid,
      bodyHigh,
      dry,
      reverb,
      wet,
      master,
      limiter,
    ]

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate)
    const noise = noiseBuffer.getChannelData(0)
    for (let index = 0; index < noise.length; index += 1) noise[index] = Math.random() * 2 - 1
    this.noiseBuffer = noiseBuffer
  }

  private buildRoomImpulse(context: AudioContext) {
    const length = Math.floor(context.sampleRate * 2.1)
    const impulse = context.createBuffer(2, length, context.sampleRate)

    for (let channel = 0; channel < 2; channel += 1) {
      const samples = impulse.getChannelData(channel)
      for (let index = 0; index < length; index += 1) {
        const time = index / context.sampleRate
        const early = time < 0.045 ? (1 - time / 0.045) * 0.18 : 0
        const tail = Math.exp(-3.1 * time) * 0.22
        samples[index] = (early + tail) * (Math.random() * 2 - 1) * (channel === 0 ? 1 : 0.96)
      }
    }

    return impulse
  }

  private createWave(context: AudioContext, harmonics: number[]) {
    const real = new Float32Array(harmonics.length + 1)
    const imag = new Float32Array(harmonics.length + 1)
    harmonics.forEach((value, index) => {
      imag[index + 1] = value
    })
    return context.createPeriodicWave(real, imag, { disableNormalization: false })
  }

  async start(midi: number, expression: ViolinExpression): Promise<number> {
    const context = this.context
    const input = this.input
    if (!context || !input || context.state !== 'running' || this.disposed) return -1
    const gestureToken = ++this.gestureToken

    if (this.voice) {
      this.setPitch(midi)
      this.setExpression(expression)
      return gestureToken
    }

    const now = context.currentTime
    const frequency = midiToFrequency(midi)
    const token = ++this.voiceToken

    const noteGain = context.createGain()
    noteGain.gain.setValueAtTime(0.0001, now)
    noteGain.connect(input)

    const tone = context.createBiquadFilter()
    tone.type = 'lowpass'
    tone.Q.value = 0.9
    tone.connect(noteGain)

    const soft = context.createOscillator()
    soft.setPeriodicWave(this.createWave(context, [1, 0.48, 0.3, 0.17, 0.1, 0.06, 0.04]))
    soft.frequency.value = frequency

    const bright = context.createOscillator()
    bright.setPeriodicWave(this.createWave(context, [1, 0.72, 0.52, 0.38, 0.27, 0.19, 0.13, 0.09, 0.06]))
    bright.frequency.value = frequency

    const softGain = context.createGain()
    const brightGain = context.createGain()
    soft.connect(softGain)
    bright.connect(brightGain)
    softGain.connect(tone)
    brightGain.connect(tone)

    const noise = context.createBufferSource()
    noise.buffer = this.noiseBuffer
    noise.loop = true
    const noiseFilter = context.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = Math.min(6800, frequency * 5.2)
    noiseFilter.Q.value = 1.6
    const noiseGain = context.createGain()
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(noteGain)

    const vibrato = context.createOscillator()
    vibrato.type = 'sine'
    vibrato.frequency.value = 5.7
    const vibratoDepth = context.createGain()
    vibrato.connect(vibratoDepth)
    vibratoDepth.connect(soft.detune)
    vibratoDepth.connect(bright.detune)

    const voice: ActiveVoice = {
      token,
      sources: [soft, bright, noise, vibrato],
      nodes: [noteGain, tone, softGain, brightGain, noiseFilter, noiseGain, vibratoDepth],
      remainingSources: 4,
      cleanupTimer: null,
      cleaned: false,
      soft,
      bright,
      noise,
      noteGain,
      softGain,
      brightGain,
      noiseGain,
      tone,
      vibrato,
      vibratoDepth,
    }
    this.voice = voice
    this.voices.add(voice)
    for (const source of voice.sources) {
      source.onended = () => {
        voice.remainingSources -= 1
        if (voice.remainingSources <= 0) this.cleanupVoice(voice)
      }
    }

    this.setExpression(expression, true)
    soft.start(now)
    bright.start(now)
    noise.start(now)
    vibrato.start(now)
    return gestureToken
  }

  setPitch(midi: number) {
    if (!this.context || !this.voice) return
    const frequency = midiToFrequency(midi)
    const now = this.context.currentTime
    this.voice.soft.frequency.setTargetAtTime(frequency, now, 0.018)
    this.voice.bright.frequency.setTargetAtTime(frequency, now, 0.018)
  }

  setExpression(expression: ViolinExpression, attack = false) {
    if (!this.context || !this.voice) return
    const now = this.context.currentTime
    const energy = clamp(expression.energy)
    const pressure = clamp(expression.pressure)
    const vibrato = clamp(expression.vibrato)
    const target = 0.12 + energy * 0.54

    if (attack) {
      this.voice.noteGain.gain.cancelScheduledValues(now)
      this.voice.noteGain.gain.setValueAtTime(0.0001, now)
      this.voice.noteGain.gain.linearRampToValueAtTime(target, now + 0.035 + (1 - energy) * 0.035)
    } else {
      this.voice.noteGain.gain.setTargetAtTime(target, now, 0.025)
    }

    this.voice.softGain.gain.setTargetAtTime(0.78 - pressure * 0.32, now, 0.025)
    this.voice.brightGain.gain.setTargetAtTime(0.12 + pressure * 0.52, now, 0.025)
    this.voice.noiseGain.gain.setTargetAtTime(0.018 + pressure * energy * 0.075, now, 0.02)
    this.voice.tone.frequency.setTargetAtTime(2100 + pressure * 6200, now, 0.03)
    this.voice.vibratoDepth.gain.setTargetAtTime(vibrato * 34, now, 0.06)
    if (this.wet) this.wet.gain.setTargetAtTime(0.06 + clamp(expression.room) * 0.25, now, 0.08)
  }

  stop(release = 0.12) {
    this.gestureToken += 1
    this.clearStrokeTimers()
    const context = this.context
    const voice = this.voice
    if (!context || !voice) return

    this.voice = null

    if (release <= 0) {
      for (const source of voice.sources) {
        try { source.stop(context.currentTime) } catch { /* source may already be stopped */ }
      }
      this.cleanupVoice(voice)
      return
    }

    const now = context.currentTime
    const stopAt = now + Math.max(0.06, release) + 0.08
    voice.noteGain.gain.cancelScheduledValues(now)
    voice.noteGain.gain.setValueAtTime(Math.max(voice.noteGain.gain.value, 0.0001), now)
    voice.noteGain.gain.exponentialRampToValueAtTime(0.0001, stopAt - 0.03)

    for (const source of voice.sources) {
      try { source.stop(stopAt) } catch { /* source may already be stopped */ }
    }
    voice.cleanupTimer = globalThis.setTimeout(
      () => this.cleanupVoice(voice),
      (Math.max(0.06, release) + 0.2) * 1000,
    )
  }

  async playStroke(midi: number, expression: ViolinExpression, duration = 0.72) {
    const gestureToken = await this.start(midi, expression)
    if (gestureToken < 0) return false
    const timer = globalThis.setTimeout(() => {
      this.strokeTimers.delete(timer)
      if (this.voice && this.gestureToken === gestureToken) this.stop(0.14)
    }, duration * 1000)
    this.strokeTimers.add(timer)
    return true
  }

  setVolume(volume: number) {
    if (!this.context || !this.master) return
    this.master.gain.setTargetAtTime(clamp(volume) * 0.82, this.context.currentTime, 0.04)
  }

  async suspend() {
    this.stop(0)
    if (this.context?.state === 'running') await this.context.suspend()
  }

  async destroy() {
    if (this.disposed) return
    this.disposed = true
    this.stop(0)
    this.clearStrokeTimers()
    for (const voice of [...this.voices]) this.cleanupVoice(voice)

    const context = this.context
    for (const node of this.graphNodes) {
      try { node.disconnect() } catch { /* already disconnected */ }
    }
    this.graphNodes = []
    this.context = null
    this.input = null
    this.master = null
    this.wet = null
    this.noiseBuffer = null

    if (context && context.state !== 'closed') {
      try { await context.close() } catch { /* context already closed */ }
    }
  }

  private clearStrokeTimers() {
    for (const timer of this.strokeTimers) globalThis.clearTimeout(timer)
    this.strokeTimers.clear()
  }

  private cleanupVoice(voice: ActiveVoice) {
    if (voice.cleaned) return
    voice.cleaned = true
    if (voice.cleanupTimer !== null) globalThis.clearTimeout(voice.cleanupTimer)
    voice.cleanupTimer = null
    if (this.voice === voice) this.voice = null
    this.voices.delete(voice)

    for (const source of voice.sources) {
      source.onended = null
      try { source.disconnect() } catch { /* already disconnected */ }
    }
    for (const node of voice.nodes) {
      try { node.disconnect() } catch { /* already disconnected */ }
    }
  }
}
