import { gsap } from 'gsap'
import { createFrameGovernor, hasFinePointer } from '@/lib/liquid/core/env.js'
import { noHolds, wantedSpeed } from '@/lib/orbital-glass/holds'
import { ORBIT_MIN_WIDTH, orbitPoint, orbitVars, restingPhase, wrapPhase } from '@/lib/orbital-glass/orbit'

export interface OrbitController {
  /** The visitor's own pause. Survives layout changes and re-creation. */
  setUserPaused(paused: boolean): void
  destroy(): void
}

interface OrbitOptions {
  /** Seconds per revolution. */
  period: number
}

/** Pixels the backdrop travels at the pointer's extreme. */
const PARALLAX_PX = 12

const NOOP: OrbitController = { setUserPaused() {}, destroy() {} }

/**
 * Runs the orbit. Everything GSAP touches here is a CSS custom property that
 * feeds `transform` or surface alpha, or the backdrop's own `transform`.
 * Never layout properties, never text.
 *
 * All tweens live in one `gsap.context`, so stopping reverts them in one call
 * and nothing keeps a reference to a node that has left the page.
 *
 * It starts from each satellite's resting position, which is what the server
 * rendered, so hydration never jumps. It stops, and restores that resting
 * composition, when the container drops below ORBIT_MIN_WIDTH.
 *
 * The frame governor measures the gap between frames, as the liquid field's
 * does. A browser that caps animation at 30 fps (a low-power mode) reads as
 * over budget and freezes the orbit, by design.
 */
export function createOrbitController(root: HTMLElement, { period }: OrbitOptions): OrbitController {
  const stage = root.querySelector<HTMLElement>('[data-og-stage]')
  const slots = Array.from(root.querySelectorAll<HTMLElement>('[data-og-slot]'))
  const backdrop = root.querySelector<HTMLElement>('[data-og-backdrop]')
  const control = root.querySelector<HTMLElement>('[data-og-control]')
  if (!stage || slots.length === 0) return NOOP

  const rests = slots.map((_, index) => restingPhase(index, slots.length))
  const phase = { value: 0 }
  const holds = noHolds()

  let context: gsap.Context | null = null
  let timeline: gsap.core.Timeline | null = null
  let speedTween: gsap.core.Tween | null = null
  let moveX: ((value: number) => void) | null = null
  let moveY: ((value: number) => void) | null = null
  let stageListening = false

  const applyVars = (el: HTMLElement, at: number) => {
    const vars = orbitVars(orbitPoint(at))
    for (const name of Object.keys(vars) as Array<keyof typeof vars>) {
      el.style.setProperty(name, vars[name])
    }
  }

  const write = () => {
    for (let i = 0; i < slots.length; i += 1) {
      applyVars(slots[i], wrapPhase(rests[i] + phase.value))
    }
  }

  const restoreVars = () => {
    for (let i = 0; i < slots.length; i += 1) applyVars(slots[i], rests[i])
  }

  // The pause control leaves the page when motion stops. If it holds keyboard
  // focus at that moment, hand focus to the stage instead of dropping it.
  const keepFocus = () => {
    if (control && document.activeElement === control) stage.focus({ preventScroll: true })
  }

  const retarget = () => {
    if (!timeline || !context || holds.frozen) return
    const target = timeline
    const to = wantedSpeed(holds)
    // Velocity eases rather than cutting, so the orbit settles under a hand
    // that is reaching for a chip instead of freezing in front of it.
    context.add(() => {
      speedTween?.kill()
      if (to > 0) target.paused(false)
      speedTween = gsap.to(target, {
        timeScale: to,
        duration: to === 0 ? 0.5 : 0.9,
        ease: to === 0 ? 'power2.out' : 'power2.inOut',
        onComplete: () => {
          if (to === 0) target.paused(true)
        },
      })
    })
    root.dataset.state = holds.user ? 'paused' : 'live'
  }

  // The backdrop drifts against the pointer, so what sits behind the glass
  // moves under it. Fine pointers only; the glass and its text never move for it.
  const onPointerMove = (event: PointerEvent) => {
    if (!moveX || !moveY) return
    const rect = stage.getBoundingClientRect()
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    moveX(-nx * PARALLAX_PX)
    moveY(-ny * PARALLAX_PX)
  }
  const onPointerLeave = () => {
    moveX?.(0)
    moveY?.(0)
  }
  const listenStage = () => {
    if (stageListening || !backdrop || !hasFinePointer()) return
    stageListening = true
    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('pointerleave', onPointerLeave)
  }
  const unlistenStage = () => {
    if (!stageListening) return
    stageListening = false
    stage.removeEventListener('pointermove', onPointerMove)
    stage.removeEventListener('pointerleave', onPointerLeave)
  }

  const teardown = () => {
    unlistenStage()
    speedTween?.kill()
    speedTween = null
    context?.revert()
    context = null
    timeline = null
    moveX = null
    moveY = null
  }

  const governor = createFrameGovernor({
    onBreach: () => {
      // Sustained frames over budget: keep the composition where it is and
      // stop for good. `frozen` also stops retarget() from reviving it.
      holds.frozen = true
      keepFocus()
      // Reverting the context rewinds the proxy tween and fires its onUpdate,
      // which would write the resting composition and snap every chip home on
      // a device that is already struggling. Put the frozen phase back.
      const frozenAt = phase.value
      teardown()
      phase.value = frozenAt
      write()
      root.dataset.tier = 'lite'
      delete root.dataset.state
    },
  })

  const onTick = (_time: number, deltaMs: number) => {
    // Only sample frames the orbit is actually responsible for.
    if (!timeline || holds.frozen || holds.offscreen || timeline.paused() || timeline.timeScale() < 0.95) return
    governor(deltaMs)
  }

  const start = () => {
    if (timeline || holds.frozen) return
    phase.value = 0
    context = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
      tl.fromTo(phase, { value: 0 }, { value: 1, duration: period, onUpdate: write }, 0)
      // A pause that predates this start must not let the orbit drift first.
      if (wantedSpeed(holds) === 0) tl.timeScale(0).paused(true)
      if (backdrop && hasFinePointer()) {
        moveX = gsap.quickTo(backdrop, 'x', { duration: 0.9, ease: 'power3.out' })
        moveY = gsap.quickTo(backdrop, 'y', { duration: 0.9, ease: 'power3.out' })
      }
      timeline = tl
    }, root)
    listenStage()
    retarget()
  }

  const stop = () => {
    if (!timeline) return
    keepFocus()
    teardown()
    restoreVars()
    delete root.dataset.state
  }

  // Chips are the only hover and focus targets: the orbit eases to a stop as a
  // pointer or keyboard reaches one, and resumes when it leaves. Hover and
  // focus are separate holds (see holds.ts).
  const hoverEnter = () => {
    holds.hover = true
    retarget()
  }
  const hoverLeave = () => {
    holds.hover = false
    retarget()
  }
  const focusIn = () => {
    holds.focus = true
    retarget()
  }
  const focusOut = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null
    if (next && slots.some((slot) => slot.contains(next))) return
    holds.focus = false
    retarget()
  }
  for (const slot of slots) {
    slot.addEventListener('pointerenter', hoverEnter)
    slot.addEventListener('pointerleave', hoverLeave)
    slot.addEventListener('focusin', focusIn)
    slot.addEventListener('focusout', focusOut)
  }

  const visibility = new IntersectionObserver(([entry]) => {
    holds.offscreen = !entry.isIntersecting
    retarget()
  })
  visibility.observe(root)

  const resize = new ResizeObserver(([entry]) => {
    if (entry.contentRect.width >= ORBIT_MIN_WIDTH) {
      start()
    } else if (timeline) {
      stop()
    } else if (holds.frozen) {
      restoreVars()
    }
  })
  resize.observe(root)

  gsap.ticker.add(onTick)

  return {
    setUserPaused(paused) {
      holds.user = paused
      retarget()
    },
    destroy() {
      gsap.ticker.remove(onTick)
      resize.disconnect()
      visibility.disconnect()
      for (const slot of slots) {
        slot.removeEventListener('pointerenter', hoverEnter)
        slot.removeEventListener('pointerleave', hoverLeave)
        slot.removeEventListener('focusin', focusIn)
        slot.removeEventListener('focusout', focusOut)
      }
      teardown()
      restoreVars()
      delete root.dataset.state
      delete root.dataset.tier
    },
  }
}
