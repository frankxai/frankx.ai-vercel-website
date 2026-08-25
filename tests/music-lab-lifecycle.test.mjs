import assert from 'node:assert/strict'
import test from 'node:test'

import { GuitarEngine } from '../lib/music-lab/guitar/engine.ts'
import { PlaybackTimeline } from '../lib/music-lab/playback-timeline.ts'

class FakeClock {
  nowMs = 0
  nextId = 1
  tasks = new Map()

  now = () => this.nowMs

  setTimeout = (callback, delayMs) => {
    const id = this.nextId++
    this.tasks.set(id, { at: this.nowMs + Math.max(0, delayMs), callback })
    return id
  }

  clearTimeout = (id) => {
    this.tasks.delete(id)
  }

  advance(ms) {
    const target = this.nowMs + ms
    while (true) {
      const next = [...this.tasks.entries()]
        .filter(([, task]) => task.at <= target)
        .sort((left, right) => left[1].at - right[1].at || left[0] - right[0])[0]
      if (!next) break
      const [id, task] = next
      this.tasks.delete(id)
      this.nowMs = task.at
      task.callback()
    }
    this.nowMs = target
  }

  get pendingCount() {
    return this.tasks.size
  }
}

const phrase = [
  { at: 0, duration: 1, value: 'C4' },
  { at: 1, duration: 1, value: 'D4' },
  { at: 2, duration: 1, value: 'E4' },
]

test('play → pause → wait → resume preserves the playback and visual position', () => {
  const clock = new FakeClock()
  const heard = []
  const snapshots = []
  const timeline = new PlaybackTimeline(phrase, 1 / 1000, {
    onEvent: (event, index, _remaining, remainingMs) => {
      heard.push({ note: event.value, index, remainingMs })
    },
    onStateChange: (snapshot) => snapshots.push(snapshot),
  }, clock)

  timeline.play()
  clock.advance(400)
  timeline.pause()
  const paused = timeline.getSnapshot()
  assert.equal(paused.state, 'paused')
  assert.equal(paused.activeIndex, 0)
  assert.equal(paused.position, 0.4)
  assert.equal(clock.pendingCount, 0)

  clock.advance(5_000)
  assert.deepEqual(timeline.getSnapshot(), paused)
  timeline.play()
  assert.equal(heard.at(-1).note, 'C4')
  assert.equal(heard.at(-1).remainingMs, 600)
  assert.equal(clock.pendingCount, 1)

  clock.advance(599)
  assert.equal(timeline.getSnapshot().activeIndex, 0)
  clock.advance(1)
  assert.equal(timeline.getSnapshot().activeIndex, 1)
  assert.equal(heard.at(-1).note, 'D4')
  assert.ok(snapshots.some((snapshot) => snapshot.state === 'paused'))
})

test('tempo mutation updates the active cursor and keeps exactly one drift-free timer', () => {
  const clock = new FakeClock()
  const heard = []
  let interrupts = 0
  const timeline = new PlaybackTimeline(phrase, 1 / 1000, {
    onEvent: (event, index, _remaining, remainingMs) => {
      heard.push({ note: event.value, index, remainingMs })
    },
    onInterrupt: () => { interrupts += 1 },
  }, clock)

  timeline.play()
  clock.advance(500)
  timeline.setRate(2 / 1000)

  assert.equal(timeline.getSnapshot().position, 0.5)
  assert.equal(timeline.getSnapshot().rate, 2 / 1000)
  assert.equal(clock.pendingCount, 1)
  assert.deepEqual(heard.map((entry) => entry.note), ['C4', 'C4'])
  assert.equal(heard.at(-1).remainingMs, 250)

  clock.advance(250)
  assert.equal(timeline.getSnapshot().activeIndex, 1)
  assert.deepEqual(heard.map((entry) => entry.note), ['C4', 'C4', 'D4'])
  assert.equal(clock.pendingCount, 1)
  assert.equal(interrupts, 2)
})

test('repeated starts, pauses, and stops never create duplicate scheduler timers', () => {
  const clock = new FakeClock()
  const timeline = new PlaybackTimeline(phrase, 1 / 1000, { onEvent: () => {} }, clock)

  timeline.play()
  timeline.play()
  assert.equal(clock.pendingCount, 1)

  timeline.pause()
  timeline.pause()
  assert.equal(clock.pendingCount, 0)

  timeline.play()
  timeline.play()
  assert.equal(clock.pendingCount, 1)

  timeline.stop()
  timeline.stop()
  assert.equal(clock.pendingCount, 0)
  assert.equal(timeline.getSnapshot().state, 'idle')

  timeline.dispose()
  timeline.play()
  assert.equal(clock.pendingCount, 0)
  assert.equal(timeline.getSnapshot().state, 'disposed')
})

class FakeAudioParam {
  value = 0
  setValueAtTime(value) { this.value = value }
  linearRampToValueAtTime(value) { this.value = value }
  exponentialRampToValueAtTime(value) { this.value = value }
  setTargetAtTime(value) { this.value = value }
  cancelScheduledValues() {}
}

class FakeAudioNode {
  disconnected = false
  connect() { return this }
  disconnect() { this.disconnected = true }
}

class FakeSourceNode extends FakeAudioNode {
  onended = null
  frequency = new FakeAudioParam()
  detune = new FakeAudioParam()
  playbackRate = new FakeAudioParam()
  buffer = null
  type = 'sine'
  loop = false
  start() {}
  stop() {}
  setPeriodicWave() {}
}

class FakeAudioContext {
  state = 'running'
  currentTime = 0
  sampleRate = 1_000
  destination = new FakeAudioNode()
  nodes = [this.destination]
  resumeCount = 0
  suspendCount = 0
  closeCount = 0

  node(extra = {}) {
    const node = Object.assign(new FakeAudioNode(), extra)
    this.nodes.push(node)
    return node
  }

  createDynamicsCompressor() {
    return this.node({
      threshold: new FakeAudioParam(),
      knee: new FakeAudioParam(),
      ratio: new FakeAudioParam(),
      attack: new FakeAudioParam(),
      release: new FakeAudioParam(),
    })
  }

  createBiquadFilter() {
    return this.node({
      type: 'lowpass',
      frequency: new FakeAudioParam(),
      Q: new FakeAudioParam(),
      gain: new FakeAudioParam(),
    })
  }

  createGain() { return this.node({ gain: new FakeAudioParam() }) }
  createOscillator() {
    const source = new FakeSourceNode()
    this.nodes.push(source)
    return source
  }
  createBufferSource() {
    const source = new FakeSourceNode()
    this.nodes.push(source)
    return source
  }
  createBuffer(_channels, length) {
    return { getChannelData: () => new Float32Array(length) }
  }

  async resume() { this.resumeCount += 1; this.state = 'running' }
  async suspend() { this.suspendCount += 1; this.state = 'suspended' }
  async close() { this.closeCount += 1; this.state = 'closed' }
}

test('unmount destroys the one user-owned graph and every repeated voice without leaks', async () => {
  const context = new FakeAudioContext()
  let contextCreations = 0
  const engine = new GuitarEngine(() => {
    contextCreations += 1
    return context
  })

  assert.equal(engine.playPluck(440), false)
  assert.equal(contextCreations, 0)

  await engine.activate()
  await engine.activate()
  assert.equal(contextCreations, 1)

  assert.equal(engine.playPluck(440), true)
  assert.equal(engine.playPluck(493.88), true)
  assert.equal(engine.activeVoiceCount, 2)
  engine.stopAll()
  assert.equal(engine.activeVoiceCount, 0)

  await engine.suspend()
  assert.equal(context.state, 'suspended')
  await engine.activate()
  assert.equal(context.resumeCount, 1)
  assert.equal(contextCreations, 1)
  assert.equal(engine.playPluck(523.25), true)

  await engine.destroy()
  assert.equal(engine.activeVoiceCount, 0)
  assert.equal(context.closeCount, 1)
  assert.equal(engine.contextState, 'uninitialized')
  assert.ok(context.nodes.filter((node) => node !== context.destination).every((node) => node.disconnected))
  await assert.rejects(() => engine.activate(), /disposed/)
})
