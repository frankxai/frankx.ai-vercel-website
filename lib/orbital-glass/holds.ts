/**
 * What can stop the orbit, and the one rule that combines them. Pure, so the
 * rule is testable in Node without a browser or GSAP.
 *
 * Hover and keyboard focus are separate holds on purpose. With one shared
 * flag, hovering a second chip and then leaving it would release the hold a
 * focused chip still needed, and the orbit would carry that chip away.
 */
export interface Holds {
  /** The visitor pressed the pause button. */
  user: boolean
  /** A pointer is over a chip. */
  hover: boolean
  /** Keyboard focus is inside a chip. */
  focus: boolean
  /** The component is scrolled out of view. */
  offscreen: boolean
  /** The frame governor tripped. Permanent for this mount. */
  frozen: boolean
}

export function noHolds(): Holds {
  return { user: false, hover: false, focus: false, offscreen: false, frozen: false }
}

/** 1 when the orbit should run, 0 when anything holds it. A frozen orbit never runs again. */
export function wantedSpeed(holds: Holds): 0 | 1 {
  return holds.frozen || holds.user || holds.hover || holds.focus || holds.offscreen ? 0 : 1
}
