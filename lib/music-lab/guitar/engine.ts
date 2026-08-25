interface GuitarVoice {
  sources: AudioScheduledSourceNode[]
  nodes: AudioNode[]
  remainingSources: number
  cleaned: boolean
}

export type AudioContextFactory = () => AudioContext

const defaultContextFactory: AudioContextFactory = () => (
  new AudioContext({ latencyHint: 'interactive' })
)

export class GuitarEngine {
  private readonly createContext: AudioContextFactory
  private context: AudioContext | null = null
  private input: GainNode | null = null
  private master: GainNode | null = null
  private graphNodes: AudioNode[] = []
  private voices = new Set<GuitarVoice>()
  private disposed = false

  constructor(createContext: AudioContextFactory = defaultContextFactory) {
    this.createContext = createContext
  }

  get isReady() {
    return this.context?.state === 'running' && this.input !== null
  }

  get activeVoiceCount() {
    return this.voices.size
  }

  get contextState() {
    return this.context?.state ?? 'uninitialized'
  }

  /** Must be called directly from a click, pointer, or keyboard gesture. */
  async activate() {
    if (this.disposed) throw new Error('The guitar audio engine has been disposed.')
    if (!this.context || this.context.state === 'closed') this.buildGraph()
    if (this.context?.state === 'suspended') await this.context.resume()
    if (!this.context || this.context.state !== 'running') {
      throw new Error('The browser did not activate the audio context.')
    }
  }

  playPluck(frequency: number, durationMs = 720) {
    const context = this.context
    const input = this.input
    if (!context || !input || context.state !== 'running' || this.disposed) return false

    const now = context.currentTime
    const gain = context.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.52, now + 0.004)
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + Math.max(0.45, durationMs / 1000 + 0.55),
    )
    gain.connect(input)

    const tone = context.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.setValueAtTime(5600, now)
    tone.frequency.exponentialRampToValueAtTime(1700, now + 0.65)
    tone.Q.value = 0.65
    tone.connect(gain)

    const fundamental = context.createOscillator()
    fundamental.type = 'triangle'
    fundamental.frequency.value = frequency
    fundamental.connect(tone)

    const harmonic = context.createOscillator()
    harmonic.type = 'sine'
    harmonic.frequency.value = frequency * 2
    const harmonicGain = context.createGain()
    harmonicGain.gain.value = 0.18
    harmonic.connect(harmonicGain)
    harmonicGain.connect(tone)

    const pickBuffer = context.createBuffer(
      1,
      Math.floor(context.sampleRate * 0.028),
      context.sampleRate,
    )
    const pick = pickBuffer.getChannelData(0)
    for (let index = 0; index < pick.length; index += 1) {
      pick[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / pick.length, 3)
    }
    const pickSource = context.createBufferSource()
    pickSource.buffer = pickBuffer
    const pickGain = context.createGain()
    pickGain.gain.value = 0.16
    pickSource.connect(pickGain)
    pickGain.connect(tone)

    const voice: GuitarVoice = {
      sources: [fundamental, harmonic, pickSource],
      nodes: [gain, tone, harmonicGain, pickGain],
      remainingSources: 3,
      cleaned: false,
    }
    this.voices.add(voice)
    for (const source of voice.sources) {
      source.onended = () => {
        voice.remainingSources -= 1
        if (voice.remainingSources <= 0) this.cleanupVoice(voice)
      }
    }

    const stopAt = now + Math.max(0.6, durationMs / 1000 + 0.75)
    fundamental.start(now)
    harmonic.start(now)
    pickSource.start(now)
    fundamental.stop(stopAt)
    harmonic.stop(stopAt)
    return true
  }

  setVolume(volume: number) {
    if (!this.context || !this.master) return
    const next = Math.min(1, Math.max(0, volume))
    this.master.gain.setTargetAtTime(next, this.context.currentTime, 0.04)
  }

  stopAll() {
    const stopAt = this.context?.currentTime ?? 0
    for (const voice of [...this.voices]) {
      for (const source of voice.sources) {
        try { source.stop(stopAt) } catch { /* the source may already have ended */ }
      }
      this.cleanupVoice(voice)
    }
  }

  async suspend() {
    this.stopAll()
    if (this.context?.state === 'running') await this.context.suspend()
  }

  async destroy() {
    if (this.disposed) return
    this.disposed = true
    this.stopAll()

    const context = this.context
    for (const node of this.graphNodes) {
      try { node.disconnect() } catch { /* already disconnected */ }
    }
    this.graphNodes = []
    this.context = null
    this.input = null
    this.master = null

    if (context && context.state !== 'closed') {
      try { await context.close() } catch { /* already closed */ }
    }
  }

  private buildGraph() {
    const context = this.createContext()
    this.context = context

    const limiter = context.createDynamicsCompressor()
    limiter.threshold.value = -12
    limiter.ratio.value = 3
    limiter.connect(context.destination)

    const body = context.createBiquadFilter()
    body.type = 'peaking'
    body.frequency.value = 240
    body.Q.value = 0.8
    body.gain.value = 3
    body.connect(limiter)

    const master = context.createGain()
    master.gain.value = 0.82
    master.connect(body)
    this.master = master

    const input = context.createGain()
    input.connect(master)
    this.input = input

    this.graphNodes = [input, master, body, limiter]
  }

  private cleanupVoice(voice: GuitarVoice) {
    if (voice.cleaned) return
    voice.cleaned = true
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
