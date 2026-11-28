/**
 * Geometry for orbital glass. Pure: no DOM, no GSAP, so Node can test it.
 *
 * One ellipse, flattened so it reads as a ring seen at an angle. A satellite
 * at `phase` 0..1 sits at angle 2π·phase, measured clockwise on screen from
 * the right-hand end. The half of the orbit below the centre line is the near
 * side; the half above it is the far side. Depth is carried by surface alpha
 * and layer, never by scale, so text stays crisp.
 */

/** Horizontal semi-axis of the orbit, in container-width percent (cqw). */
export const ORBIT_RX_CQW = 36

/**
 * Vertical semi-axis, same unit. Sized so a chip on the near or far side
 * clears the lens by a visible gap at ORBIT_MIN_WIDTH. A chip that only grazes
 * the lens reads as a collision.
 */
export const ORBIT_RY_CQW = 16

/** Diameter of the focal lens, in container-width percent (cqw). */
export const ORBIT_LENS_CQW = 21

/**
 * Below this container width the orbit is replaced by a static stack. Chips
 * keep a 44 px touch height, so on a narrow stage they crowd each other and
 * the lens; at 720 px the far-side chip's text was clipped by the lens.
 */
export const ORBIT_MIN_WIDTH = 960

/** Opacity of a satellite on the far side of the orbit. */
export const FAR_OPACITY = 0.78

export type OrbitLayer = 0 | 2

export interface OrbitPoint {
  /** cos(angle), -1..1. Multiply by the orbit's rx to get a length. */
  x: number
  /** sin(angle), -1..1. Positive is the near side. */
  y: number
  /** Same as y, named for what it means. -1 far, 1 near. */
  depth: number
  /** FAR_OPACITY on the far edge, 1 on the near edge. */
  opacity: number
  /** 0 paints behind the focal lens, 2 paints in front of it. */
  layer: OrbitLayer
}

/** Wrap any finite number into [0, 1). */
export function wrapPhase(phase: number): number {
  const wrapped = phase % 1
  return wrapped < 0 ? wrapped + 1 : wrapped
}

/**
 * Where satellite `index` of `count` rests when nothing is moving. Evenly
 * spaced, symmetric about the vertical axis, and never on a horizontal tip of
 * the ellipse, where a wide chip would be pushed past the stage edge.
 *
 * Even counts sit half a step off the tips. Odd counts would land one
 * satellite exactly on a tip that way, so they start at the near-side centre
 * instead and spread from there.
 */
export function restingPhase(index: number, count: number): number {
  if (count <= 0) return 0
  const step = 1 / count
  return wrapPhase(count % 2 === 0 ? (index + 0.5) * step : index * step + 0.25)
}

function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t))
  return c * c * (3 - 2 * c)
}

export function orbitPoint(phase: number): OrbitPoint {
  const angle = wrapPhase(phase) * Math.PI * 2
  const x = Math.cos(angle)
  const y = Math.sin(angle)
  const near = smoothstep((y + 1) / 2)
  return {
    x,
    y,
    depth: y,
    opacity: FAR_OPACITY + (1 - FAR_OPACITY) * near,
    layer: y > 0 ? 2 : 0,
  }
}

/** Fixed-precision CSS custom-property values for one point. */
export function orbitVars(point: OrbitPoint): Record<'--og-x' | '--og-y' | '--og-o' | '--og-z', string> {
  return {
    '--og-x': point.x.toFixed(4),
    '--og-y': point.y.toFixed(4),
    '--og-o': point.opacity.toFixed(3),
    '--og-z': String(point.layer),
  }
}
