export type PlaybackState = 'idle' | 'playing' | 'paused' | 'completed' | 'disposed'

export interface PlaybackTimelineEvent<T> {
  at: number
  duration: number
  value: T
}

export interface PlaybackSnapshot {
  state: PlaybackState
  position: number
  totalDuration: number
  activeIndex: number | null
  rate: number
}

export interface PlaybackClock {
  now: () => number
  setTimeout: (callback: () => void, delayMs: number) => unknown
  clearTimeout: (handle: unknown) => void
}

export interface PlaybackTimelineCallbacks<T> {
  onEvent: (
    event: PlaybackTimelineEvent<T>,
    index: number,
    remainingDuration: number,
    remainingMs: number,
  ) => void
  onInterrupt?: () => void
  onStateChange?: (snapshot: PlaybackSnapshot) => void
}

const EPSILON = 1e-7

const browserClock: PlaybackClock = {
  now: () => globalThis.performance?.now() ?? Date.now(),
  setTimeout: (callback, delayMs) => globalThis.setTimeout(callback, delayMs),
  clearTimeout: (handle) => globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>),
}

/**
 * A single-timer, monotonic playback cursor.
 *
 * Timeline units are caller-defined. Guitar uses beats and changes `rate` when
 * BPM changes; recorded takes use milliseconds at a rate of 1. Pausing stores
 * the exact cursor instead of letting wall time advance in the background.
 */
export class PlaybackTimeline<T> {
  private readonly events: PlaybackTimelineEvent<T>[]
  private readonly callbacks: PlaybackTimelineCallbacks<T>
  private readonly clock: PlaybackClock
  private readonly totalDuration: number
  private state: PlaybackState = 'idle'
  private position = 0
  private anchorMs = 0
  private activeIndex: number | null = null
  private rate: number
  private timer: unknown = null
  private scheduledBoundary: number | null = null

  constructor(
    events: PlaybackTimelineEvent<T>[],
    rate: number,
    callbacks: PlaybackTimelineCallbacks<T>,
    clock: PlaybackClock = browserClock,
  ) {
    if (!Number.isFinite(rate) || rate <= 0) throw new Error('Playback rate must be positive.')

    let previousAt = -Infinity
    this.events = events.map((event) => {
      if (!Number.isFinite(event.at) || event.at < 0) throw new Error('Timeline offsets must be non-negative.')
      if (!Number.isFinite(event.duration) || event.duration <= 0) throw new Error('Timeline durations must be positive.')
      if (event.at < previousAt) throw new Error('Timeline events must be ordered by offset.')
      previousAt = event.at
      return { ...event }
    })
    this.rate = rate
    this.callbacks = callbacks
    this.clock = clock
    this.totalDuration = this.events.reduce(
      (latest, event) => Math.max(latest, event.at + event.duration),
      0,
    )
  }

  getSnapshot(): PlaybackSnapshot {
    return {
      state: this.state,
      position: this.position,
      totalDuration: this.totalDuration,
      activeIndex: this.activeIndex,
      rate: this.rate,
    }
  }

  play() {
    if (this.state === 'disposed' || this.events.length === 0 || this.state === 'playing') return
    const resuming = this.state === 'paused'
    if (!resuming) {
      this.position = 0
    }
    // Pause already interrupted the active source. Clearing the marker lets a
    // resume re-emit only the remaining slice without a second stop callback.
    this.activeIndex = null

    this.state = 'playing'
    this.anchorMs = this.clock.now()
    this.refreshActive(true)
    this.scheduleNextBoundary()
    this.emitState()
  }

  pause() {
    if (this.state !== 'playing') return
    this.syncPosition()
    if (this.position >= this.totalDuration - EPSILON) {
      this.complete()
      return
    }

    this.clearTimer()
    this.callbacks.onInterrupt?.()
    this.activeIndex = this.findActiveIndex(this.position)
    this.state = 'paused'
    this.emitState()
  }

  stop() {
    if (this.state === 'disposed') return
    this.clearTimer()
    if (this.activeIndex !== null || this.state === 'playing' || this.state === 'paused') {
      this.callbacks.onInterrupt?.()
    }
    this.position = 0
    this.activeIndex = null
    this.state = 'idle'
    this.emitState()
  }

  setRate(rate: number) {
    if (!Number.isFinite(rate) || rate <= 0) throw new Error('Playback rate must be positive.')
    if (Math.abs(rate - this.rate) < EPSILON || this.state === 'disposed') return

    if (this.state === 'playing') {
      this.syncPosition()
      if (this.position >= this.totalDuration - EPSILON) {
        this.rate = rate
        this.complete()
        return
      }
      this.clearTimer()
      this.callbacks.onInterrupt?.()
      this.activeIndex = null
      this.rate = rate
      this.anchorMs = this.clock.now()
      this.refreshActive(true)
      this.scheduleNextBoundary()
    } else {
      this.rate = rate
    }
    this.emitState()
  }

  dispose() {
    if (this.state === 'disposed') return
    this.clearTimer()
    if (this.activeIndex !== null || this.state === 'playing' || this.state === 'paused') {
      this.callbacks.onInterrupt?.()
    }
    this.activeIndex = null
    this.state = 'disposed'
  }

  private syncPosition() {
    if (this.state !== 'playing') return
    const now = this.clock.now()
    const elapsedMs = Math.max(0, now - this.anchorMs)
    this.position = Math.min(this.totalDuration, this.position + elapsedMs * this.rate)
    this.anchorMs = now
  }

  private findActiveIndex(position: number) {
    let active: number | null = null
    for (let index = 0; index < this.events.length; index += 1) {
      const event = this.events[index]
      if (event.at > position + EPSILON) break
      if (position < event.at + event.duration - EPSILON) active = index
    }
    return active
  }

  private refreshActive(force: boolean) {
    const nextIndex = this.findActiveIndex(this.position)
    if (!force && nextIndex === this.activeIndex) return

    if (this.activeIndex !== null) this.callbacks.onInterrupt?.()
    this.activeIndex = nextIndex
    if (nextIndex === null) return

    const event = this.events[nextIndex]
    const remainingDuration = Math.max(0, event.at + event.duration - this.position)
    this.callbacks.onEvent(
      event,
      nextIndex,
      remainingDuration,
      remainingDuration / this.rate,
    )
  }

  private nextBoundary() {
    let boundary = Infinity
    for (const event of this.events) {
      if (event.at > this.position + EPSILON) boundary = Math.min(boundary, event.at)
      const end = event.at + event.duration
      if (end > this.position + EPSILON) boundary = Math.min(boundary, end)
    }
    return Number.isFinite(boundary) ? boundary : null
  }

  private scheduleNextBoundary() {
    this.clearTimer()
    if (this.state !== 'playing') return
    const boundary = this.nextBoundary()
    if (boundary === null) {
      this.complete()
      return
    }

    this.scheduledBoundary = boundary
    const delayMs = Math.max(0, (boundary - this.position) / this.rate)
    this.timer = this.clock.setTimeout(() => this.handleBoundary(), delayMs)
  }

  private handleBoundary() {
    this.timer = null
    if (this.state !== 'playing') return
    this.syncPosition()

    const boundary = this.scheduledBoundary
    this.scheduledBoundary = null
    if (boundary !== null && this.position + EPSILON < boundary) {
      this.scheduleNextBoundary()
      return
    }
    if (boundary !== null) this.position = Math.max(this.position, boundary)

    if (this.position >= this.totalDuration - EPSILON) {
      this.complete()
      return
    }

    this.refreshActive(false)
    this.scheduleNextBoundary()
    this.emitState()
  }

  private complete() {
    this.clearTimer()
    if (this.activeIndex !== null) this.callbacks.onInterrupt?.()
    this.position = this.totalDuration
    this.activeIndex = null
    this.state = 'completed'
    this.emitState()
  }

  private clearTimer() {
    if (this.timer !== null) this.clock.clearTimeout(this.timer)
    this.timer = null
    this.scheduledBoundary = null
  }

  private emitState() {
    this.callbacks.onStateChange?.(this.getSnapshot())
  }
}
