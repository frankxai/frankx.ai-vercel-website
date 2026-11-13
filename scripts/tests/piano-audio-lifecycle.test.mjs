import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import vm from 'node:vm'
import test from 'node:test'
import assert from 'node:assert/strict'

const root = new URL('../../', import.meta.url)
const grand = readFileSync(new URL('app/music-lab/piano/page.tsx', root), 'utf8')
const guided = readFileSync(new URL('components/music/InteractivePiano.tsx', root), 'utf8')

function mockContext() {
  let context
  class Context {
    state = 'suspended'
    currentTime = 0
    sampleRate = 4
    destination = {}
    started = []
    resumeCalls = 0
    constructor() { context = this }
    async resume() { this.resumeCalls++; await Promise.resolve(); this.state = 'running' }
    createGain() { return this.node() }
    createDynamicsCompressor() { return this.node() }
    createBiquadFilter() { return this.node() }
    createConvolver() { return this.node() }
    createOscillator() { const n = this.node(); n.start = () => this.started.push(this.state); return n }
    createBuffer() { return { getChannelData: () => new Float32Array(12) } }
    node() {
      const param = { value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime() {} }
      return { gain: { ...param }, frequency: { ...param }, Q: { ...param }, threshold: {}, knee: {}, ratio: {}, attack: {}, release: {}, connect() {}, stop() {} }
    }
  }
  return { Context, get: () => context }
}

test('Grand Piano resumes a newly-created context on its first gesture', async () => {
  const mock = mockContext()
  const source = grand.slice(grand.indexOf('class GrandPianoEngine'), grand.indexOf('// ─── Key Layout'))
  const Engine = vm.runInNewContext(stripTypeScriptTypes(source) + '\nGrandPianoEngine', { AudioContext: mock.Context, SAMPLE_NOTES: [] })
  const engine = new Engine()
  await engine.init()
  assert.equal(mock.get().state, 'running')
  assert.equal(mock.get().resumeCalls, 1)
})

test('guided piano waits for audio resume before starting a voice', async () => {
  const mock = mockContext()
  const source = guided.slice(guided.indexOf('interface AudioEngine'), guided.indexOf('// ── Helper: stars badge'))
  const hook = vm.runInNewContext(stripTypeScriptTypes(source) + '\nuseAudio', {
    AudioContext: mock.Context,
    useRef: value => ({ current: value }), useCallback: callback => callback,
    useEffect() {}, useState: value => [value, () => {}],
    getVolume: () => 1, AbortController,
    GUIDED_PIANO_SAMPLES: [{ name: 'C4', frequency: 261.63 }],
    fetch: async () => { throw new Error('offline') }, GUIDED_SAMPLE_CDN: '',
  })
  const audio = hook()
  await audio.playNote(261.63)
  assert.deepEqual(Array.from(mock.get().started), ['running', 'running'])
})


test('Grand Piano resumes again after an interruption', async () => {
  const mock = mockContext()
  const source = grand.slice(grand.indexOf('class GrandPianoEngine'), grand.indexOf('// ─── Key Layout'))
  const Engine = vm.runInNewContext(stripTypeScriptTypes(source) + '\nGrandPianoEngine', { AudioContext: mock.Context, SAMPLE_NOTES: [] })
  const engine = new Engine()
  await engine.init()
  mock.get().state = 'interrupted'
  await engine.init()
  assert.equal(mock.get().state, 'running')
  assert.equal(mock.get().resumeCalls, 2)
})

test('guided audio fails without voices and recovers on the next gesture', async () => {
  const mock = mockContext()
  let blocked = true
  class BlockedContext extends mock.Context {
    async resume() { if (blocked) throw new Error('blocked'); await super.resume() }
  }
  const states = []
  const source = guided.slice(guided.indexOf('interface AudioEngine'), guided.indexOf('// ── Helper: stars badge'))
  const hook = vm.runInNewContext(stripTypeScriptTypes(source) + '\nuseAudio', {
    AudioContext: BlockedContext,
    useRef: value => ({ current: value }), useCallback: callback => callback,
    useEffect() {}, useState: value => [value, status => states.push(status)],
    getVolume: () => 1, AbortController,
    GUIDED_PIANO_SAMPLES: [{ name: 'C4', frequency: 261.63 }],
    fetch: async () => { throw new Error('offline') }, GUIDED_SAMPLE_CDN: '',
  })
  const audio = hook()
  assert.equal(await audio.playNote(261.63), false)
  assert.equal(mock.get().started.length, 0)
  assert.equal(states.at(-1), 'error')
  blocked = false
  assert.equal(await audio.playNote(261.63), true)
  assert.equal(states.at(-1), 'ready')
  assert.equal(mock.get().started.length, 2)
})


test('Grand Piano ignores a note released while audio startup is pending', async () => {
  const pendingNotes = { current: new Map() }
  let resolveEngine
  let voices = 0
  const ready = new Promise(resolve => { resolveEngine = resolve })
  const engine = { setMasterVolume() {}, noteOn() { voices++ } }
  const start = grand.indexOf('  const noteOn = useCallback(async')
  const end = grand.indexOf('  const noteOff = useCallback', start)
  const source = grand.slice(start, end)
  const noteOn = vm.runInNewContext(stripTypeScriptTypes(source) + '\nnoteOn', {
    useCallback: callback => callback, pendingNotes, getEngine: () => ready,
    volume: 1, setAudioError() {}, setPressed() {}, setLastNote() {}, midiToDisplay: () => 'C4',
  })
  const playing = noteOn(60)
  pendingNotes.current.delete(60)
  resolveEngine(engine)
  await playing
  assert.equal(voices, 0)
})
