import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  FAR_OPACITY,
  ORBIT_LENS_CQW,
  ORBIT_MIN_WIDTH,
  ORBIT_RX_CQW,
  ORBIT_RY_CQW,
  orbitPoint,
  orbitVars,
  restingPhase,
  wrapPhase,
} from '../../lib/orbital-glass/orbit.ts'
import { noHolds, wantedSpeed } from '../../lib/orbital-glass/holds.ts'

// Read the applied files, not reconstructed patches.
const root = new URL('../../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const cssSource = read('components/orbital-glass/orbital-glass.module.css')
// Rules are asserted against the code, not against prose that mentions them.
const css = cssSource.replace(/\/\*[\s\S]*?\*\//g, '')
const component = read('components/orbital-glass/OrbitalGlass.tsx')
const controller = read('components/orbital-glass/orbit-controller.ts')
const page = read('app/design-lab/orbital-glass/page.tsx')
const designSystem = read('lib/design-system.ts')

const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps

// ------------------------------------------------------------------ geometry

test('the orbit is a closed loop and wraps any finite phase', () => {
  const start = orbitPoint(0)
  const end = orbitPoint(1)
  assert.ok(close(start.x, end.x) && close(start.y, end.y))
  assert.ok(close(wrapPhase(-0.25), 0.75))
  assert.ok(close(wrapPhase(3.5), 0.5))
  const back = orbitPoint(-0.25)
  const same = orbitPoint(0.75)
  assert.ok(close(back.x, same.x) && close(back.y, same.y))
})

test('near side is the lower half: layer 2 in front of the lens, layer 0 behind it', () => {
  for (let step = 0; step < 200; step += 1) {
    const point = orbitPoint(step / 200)
    if (point.y > 1e-9) assert.equal(point.layer, 2)
    if (point.y < -1e-9) assert.equal(point.layer, 0)
    assert.ok(close(point.depth, point.y))
  }
})

test('depth is carried by opacity between FAR_OPACITY and 1, rising toward the viewer', () => {
  const far = orbitPoint(0.75)
  const near = orbitPoint(0.25)
  assert.ok(close(far.opacity, FAR_OPACITY, 1e-9), `far side should be ${FAR_OPACITY}, got ${far.opacity}`)
  assert.ok(close(near.opacity, 1, 1e-9))
  let last = -1
  for (let step = 0; step <= 100; step += 1) {
    // Walk from the far extreme (phase 0.75) round to the near extreme (phase 1.25).
    const point = orbitPoint(0.75 + step / 200)
    assert.ok(point.opacity >= FAR_OPACITY - 1e-9 && point.opacity <= 1 + 1e-9)
    assert.ok(point.opacity >= last - 1e-9, 'opacity must not fall while approaching the viewer')
    last = point.opacity
  }
})

test('resting phases are evenly spaced, distinct, and never on a horizontal tip', () => {
  for (let count = 3; count <= 8; count += 1) {
    const phases = Array.from({ length: count }, (_, index) => restingPhase(index, count))
    const sorted = [...phases].sort((a, b) => a - b)
    for (let index = 1; index < count; index += 1) {
      assert.ok(close(sorted[index] - sorted[index - 1], 1 / count, 1e-9), `uneven spacing at count ${count}`)
    }
    assert.equal(new Set(phases.map((phase) => phase.toFixed(6))).size, count)
    for (const phase of phases) {
      // A wide chip centred on a horizontal tip is pushed past the stage edge.
      // The near-side centre (|y| = 1) is fine: that is where odd counts start.
      const { x } = orbitPoint(phase)
      assert.ok(Math.abs(x) < 0.999999, `count ${count} puts a satellite on a horizontal tip`)
    }
  }
  assert.equal(restingPhase(0, 0), 0)
})

test('resting composition is symmetric about the vertical axis for every count', () => {
  for (let count = 2; count <= 9; count += 1) {
    const xs = Array.from({ length: count }, (_, index) => orbitPoint(restingPhase(index, count)).x)
    const left = [...xs].sort((a, b) => a - b)
    const right = xs.map((x) => -x).sort((a, b) => a - b)
    left.forEach((x, i) => assert.ok(close(x, right[i], 1e-9), `count ${count} is lopsided`))
  }
})

test('CSS vars use fixed precision, so server and client render the same string', () => {
  assert.deepEqual(orbitVars(orbitPoint(restingPhase(0, 6))), {
    '--og-x': '0.8660',
    '--og-y': '0.5000',
    '--og-o': '0.966',
    '--og-z': '2',
  })
})

// ------------------------------------------------- single source of truth

test('the CSS breakpoint equals ORBIT_MIN_WIDTH, and CSS never hard-codes the radii', () => {
  const widths = [...css.matchAll(/@container og-root \(min-width:\s*(\d+)px\)/g)].map((m) => Number(m[1]))
  assert.ok(widths.includes(ORBIT_MIN_WIDTH), `no container query at ORBIT_MIN_WIDTH (${ORBIT_MIN_WIDTH}px)`)
  assert.deepEqual(widths, [...widths].sort((a, b) => a - b), 'narrower queries must come first so the orbit wins at its width')
  assert.equal(widths.at(-1), ORBIT_MIN_WIDTH, 'the orbit query must be the last one')
  assert.doesNotMatch(css, new RegExp(`\\b${ORBIT_RX_CQW}cqw\\b`), 'rx lives in orbit.ts and arrives as --og-rx')
  assert.doesNotMatch(css, new RegExp(`\\b${ORBIT_RY_CQW}cqw\\b`), 'ry lives in orbit.ts and arrives as --og-ry')
  assert.match(css, /var\(--og-rx\)/)
  assert.match(css, /var\(--og-ry\)/)
  assert.doesNotMatch(css, new RegExp(`\\b${ORBIT_LENS_CQW}cqw\\b`), 'the lens size lives in orbit.ts and arrives as --og-lens')
  assert.match(css, /width:\s*var\(--og-lens\)/)
  assert.match(component, /'--og-rx': `\$\{ORBIT_RX_CQW\}cqw`/)
  assert.match(component, /'--og-lens': `\$\{ORBIT_LENS_CQW\}cqw`/)
})

// ---------------------------------------------------------- taste.md in CSS

test('glass keeps one recipe: chips and lens compose the vendored .liquid-glass', () => {
  assert.match(component, /\$\{styles\.lens\} liquid-glass/)
  assert.match(component, /\$\{styles\.chip\} liquid-glass/)
  const declarations = css.replace(/@supports[^{]+\{/g, '{')
  assert.doesNotMatch(declarations, /backdrop-filter:\s*blur\((?!8px)\d+px\)/, 'the only blur here is the lite-tier override')
})

test('no transition: all, and chips never transition transform or opacity', () => {
  assert.doesNotMatch(css, /transition(-property)?:\s*all\b/)
  assert.doesNotMatch(component + controller, /transition-all/)
  for (const block of css.match(/transition:[^;]+;/g) ?? []) {
    assert.doesNotMatch(block, /\b(transform|opacity|translate)\b/, `chip transition must not smooth GSAP: ${block}`)
  }
})

test('box-shadow is inset only: no drop shadow on glass', () => {
  for (const declaration of css.match(/box-shadow:[^;]+;/g) ?? []) {
    assert.match(declaration, /box-shadow:\s*inset\b/, declaration)
  }
})

test('nothing in the glass stack can become a backdrop root', () => {
  assert.doesNotMatch(css, /^\s*opacity\s*:/m, 'depth is surface alpha (--og-a), never element opacity')
  assert.doesNotMatch(css, /(^|[^-])filter\s*:/m, 'a filter on an ancestor stops backdrop-filter sampling')
  assert.doesNotMatch(css, /\b(mask(-image)?|mix-blend-mode|will-change)\s*:/)
  assert.match(css, /--og-a/)
})

test('the repo spectrum rule holds: both spectra replace the Arcanea-purple first tint', () => {
  assert.doesNotMatch(css, /brand-purple|ab47c7/i)
  for (const spectrum of ['tech', 'soul']) {
    const block = css.match(new RegExp(`\\[data-spectrum='${spectrum}'\\]\\s*\\{([^}]+)\\}`))
    assert.ok(block, `${spectrum} spectrum block missing`)
    assert.match(block[1], /--liquid-tint-1:/)
    assert.match(block[1], /--liquid-tint-2:/)
  }
})

// ----------------------------------------------------------- accessibility

test('chips and control keep a 44px target and a real focus ring', () => {
  assert.match(css, /min-height:\s*2\.75rem/)
  assert.match(css, /:focus-visible[\s\S]{0,200}outline:\s*2px solid/)
  assert.doesNotMatch(css, /outline:\s*(none|0)\b/)
  assert.match(css, /@media \(forced-colors: active\)[\s\S]*outline-color:\s*Highlight/)
})

test('preferences are honoured in CSS: transparency, motion, forced colours', () => {
  assert.match(css, /@media \(prefers-reduced-transparency: reduce\)[\s\S]*backdrop-filter:\s*none/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(css, /@media \(forced-colors: active\)/)
})

test('without backdrop-filter support a chip is still a near-opaque surface', () => {
  const base = css.match(/\.root \.slot \.chip \{[^}]*background:\s*rgb\(18 18 20 \/ calc\(([\d.]+) \* var\(--og-a\)\)\)/)
  assert.ok(base, 'base chip background must be declared outside @supports')
  assert.ok(Number(base[1]) >= 0.85, `fallback chip alpha ${base[1]} is too transparent to read over imagery`)
})

test('motion is optional, pausable and has a visible control', () => {
  assert.match(component, /prefersReducedMotion/)
  assert.match(component, /useSyncExternalStore/)
  assert.match(component, /Pause motion/)
  assert.match(component, /Resume motion/)
  assert.doesNotMatch(component, /aria-pressed/, 'a play/pause button that changes its label must not also be aria-pressed')
  for (const hook of ['pointerenter', 'focusin', 'IntersectionObserver', 'createFrameGovernor', 'ResizeObserver']) {
    assert.ok(controller.includes(hook), `controller is missing ${hook}`)
  }
  assert.match(css, /\.root\[data-state\] \.control\s*\{\s*display:\s*inline-flex/)
})

test('the backdrop and the accessible name are required props', () => {
  assert.match(component, /\n\s+backdrop: ReactNode/)
  assert.match(component, /\n\s+label: string/)
  assert.match(component, /role="group"/)
})

// ------------------------------------------------------------------ GSAP

test('GSAP writes only custom properties, transforms, dash offset and speed: no layout, no text', () => {
  assert.doesNotMatch(controller, /\b(left|top|right|bottom|width|height|margin|padding|fontSize)\s*:/)
  assert.match(controller, /style\.setProperty\(name, vars\[name\]\)/)
  for (const target of ['[data-og-backdrop]', '[data-og-slot]']) {
    assert.ok(controller.includes(target))
  }
  assert.doesNotMatch(controller + component + css, /sheen/i, 'the sheen was removed: a hard-edged bar across the lens')
  assert.doesNotMatch(controller, /strokeDashoffset|pathLength/, 'the path is static: a draw-in blinks off after hydration')
  assert.doesNotMatch(controller, /querySelector(All)?\([^)]*(chipTitle|chipDetail|lens p|<p|text)/)
})

test('the frame budget and reduced-motion reads come from the vendored liquid layer', () => {
  assert.match(controller, /from '@\/lib\/liquid\/core\/env\.js'/)
  assert.match(component, /from '@\/lib\/liquid\/core\/env\.js'/)
  assert.doesNotMatch(controller + component, /matchMedia\(/, 'do not re-implement what env.js already owns')
})

// ------------------------------------------------- static worst-case contrast

function luminance(rgb) {
  const channel = (value) => {
    const c = value / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2])
}
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
const mix = (top, bottom, alpha) => top.map((value, i) => value * alpha + bottom[i] * (1 - alpha))

test('worst-case chip text passes AA on a pure-white backdrop, far side, thinnest scrim', () => {
  // Parsed from the CSS so an edit that thins the scrim or the chip must also
  // pass here. The rendered-pixel check lives in the PR evidence; this is the
  // cheap guard that keeps the numbers honest between runs.
  const veil = css.match(/radial-gradient\(\s*[^,]+,\s*rgb\(10 10 11 \/ ([\d.]+)\),\s*rgb\(10 10 11 \/ ([\d.]+)\)/)
  const chip = css.match(/@supports[^{]+\{\s*\.root \.slot \.chip \{\s*background:\s*rgb\(18 18 20 \/ calc\(([\d.]+) \* var\(--og-a\)\)\)/)
  const detail = css.match(/\.chipDetail \{[^}]*color:\s*rgb\(255 255 255 \/ ([\d.]+)\)/)
  assert.ok(veil && chip && detail, 'could not parse veil, chip or detail colour from the CSS')

  const white = [255, 255, 255]
  const scrim = Math.min(Number(veil[1]), Number(veil[2]))
  const behindChip = mix([10, 10, 11], white, scrim)
  const surfaceAlpha = Number(chip[1]) * FAR_OPACITY
  const chipSurface = mix([18, 18, 20], behindChip, surfaceAlpha)
  const detailText = mix(white, chipSurface, Number(detail[1]))
  const titleText = mix(white, chipSurface, 0.95)

  assert.ok(ratio(luminance(titleText), luminance(chipSurface)) >= 4.5, 'title below AA')
  assert.ok(ratio(luminance(detailText), luminance(chipSurface)) >= 4.5, 'detail below AA')
})


// ----------------------------------------------- holds: the state machine

test('any single hold stops the orbit, none runs it, and a frozen orbit never runs', () => {
  assert.equal(wantedSpeed(noHolds()), 1)
  for (const key of ['user', 'hover', 'focus', 'offscreen', 'frozen']) {
    assert.equal(wantedSpeed({ ...noHolds(), [key]: true }), 0, `${key} must hold the orbit`)
  }
  const frozen = { ...noHolds(), frozen: true }
  assert.equal(wantedSpeed(frozen), 0)
})

test('hover and keyboard focus are independent holds', () => {
  // Focus on chip A, pointer passes over chip B and leaves: focus still holds.
  const afterPointerLeaves = { ...noHolds(), focus: true, hover: false }
  assert.equal(wantedSpeed(afterPointerLeaves), 0)
  // And the other way round.
  assert.equal(wantedSpeed({ ...noHolds(), hover: true, focus: false }), 0)
})

test('the controller uses separate holds, never revives a frozen orbit, and scopes every tween', () => {
  assert.doesNotMatch(controller, /hold\.chip|holds\.chip/, 'hover and focus must not share one flag')
  assert.match(controller, /holds\.hover = /)
  assert.match(controller, /holds\.focus = /)
  assert.match(controller, /if \(!timeline \|\| !context \|\| holds\.frozen\) return/, 'retarget() must refuse to run a frozen orbit')
  assert.match(controller, /const frozenAt = phase\.value[\s\S]{0,80}teardown\(\)[\s\S]{0,40}phase\.value = frozenAt[\s\S]{0,20}write\(\)/, 'a freeze keeps the ring in place: reverting the context would otherwise write the resting composition')
  assert.match(controller, /gsap\.context\(/)
  assert.match(controller, /context\?\.revert\(\)/)
  assert.match(controller, /stage\.focus\(\{ preventScroll: true \}\)/, 'focus must not fall to <body> when the control leaves')
  assert.match(component, /satellites\.map\(\(satellite\) => satellite\.id\)\.join\('\|'\)/, 'rebuild the controller when chips change, not only when their count does')
})

// ----------------------------------------------------------- geometry fit

// Chip boxes in CSS pixels. 240 is a chip carrying the longest detail line in
// the demo; 52 is a two-line chip (title row plus detail). Keep detail lines
// short: the ring is sized for chips about this wide.
const CHIP = { w: 240, h: 52 }
const MIN_LENS_GAP_PX = 12

function distanceFromOriginToChip(cx, cy) {
  const dx = Math.max(Math.abs(cx) - CHIP.w / 2, 0)
  const dy = Math.max(Math.abs(cy) - CHIP.h / 2, 0)
  return Math.hypot(dx, dy)
}

test('no chip touches the lens at any phase, at any container width the orbit runs', () => {
  for (const width of [ORBIT_MIN_WIDTH, 1104, 1440]) {
    const rx = (ORBIT_RX_CQW * width) / 100
    const ry = (ORBIT_RY_CQW * width) / 100
    const lensRadius = (ORBIT_LENS_CQW * width) / 200
    let worst = Infinity
    for (let step = 0; step < 720; step += 1) {
      const { x, y } = orbitPoint(step / 720)
      worst = Math.min(worst, distanceFromOriginToChip(x * rx, y * ry) - lensRadius)
    }
    assert.ok(worst >= MIN_LENS_GAP_PX, `at ${width}px a chip comes within ${worst.toFixed(1)}px of the lens (need ${MIN_LENS_GAP_PX})`)
  }
})

test('no chip leaves the stage at any phase', () => {
  for (const width of [ORBIT_MIN_WIDTH, 1104, 1440]) {
    const height = (width * 9) / 16
    const rx = (ORBIT_RX_CQW * width) / 100
    const ry = (ORBIT_RY_CQW * width) / 100
    for (let step = 0; step < 720; step += 1) {
      const { x, y } = orbitPoint(step / 720)
      assert.ok(Math.abs(x * rx) + CHIP.w / 2 <= width / 2, `chip clips the stage edge at ${width}px, phase ${step / 720}`)
      assert.ok(Math.abs(y * ry) + CHIP.h / 2 <= height / 2, `chip leaves the stage vertically at ${width}px`)
    }
  }
})

// ---------------------------------------------- tokens, order, and honesty

test('spectrum tints are the design system tokens of record', () => {
  assert.match(designSystem, /secondary: '#06b6d4'/)
  assert.match(designSystem, /secondary: '#fbbf24'/)
  const tech = css.match(/\[data-spectrum='tech'\]\s*\{([^}]+)\}/)[1]
  const soul = css.match(/\[data-spectrum='soul'\]\s*\{([^}]+)\}/)[1]
  assert.match(tech, /--liquid-tint-2:\s*#06b6d4/)
  assert.match(soul, /--liquid-tint-2:\s*#fbbf24/)
  assert.doesNotMatch(tech + soul, /brand-cyan|43bfe3/, 'the globals cyan is not the design system tech cyan')
})

test('the ring states its own order, and the lens reads out the active step for sighted users only', () => {
  assert.match(component, /String\(index \+ 1\)\.padStart\(2, '0'\)/)
  assert.match(component, /<ol className=\{styles\.ring\}/)
  assert.match(component, /className=\{styles\.chipIndex\} aria-hidden="true"/)
  assert.match(component, /className=\{styles\.reader\} aria-hidden="true"/)
  assert.match(component, /onFocus=\{\(\) => setActiveId\(satellite\.id\)\}/)
  assert.match(css, /@container og-root \(min-width: 960px\)[\s\S]*\.lens\[data-reading\] \.reader\s*\{\s*display:\s*block/)
})

test('copy on the lab page describes what the component actually does at each width', () => {
  assert.doesNotMatch(page, /with nothing moving/, 'reduced motion at >= 960px keeps the ring, at rest')
  assert.doesNotMatch(page, /tilted/, 'the ring is flattened, not tilted')
  assert.match(page, /holds still/)
  assert.match(page, /preload/, 'next/image priority is deprecated')
  assert.doesNotMatch(page, /\bpriority\b/)
})

test('chip details stay short enough for the ring', () => {
  const details = [...page.matchAll(/detail: '([^']+)'/g)].map((m) => m[1])
  assert.ok(details.length >= 3)
  for (const detail of details) assert.ok(detail.length <= 26, `"${detail}" is too long for a chip`)
  const bodies = [...page.matchAll(/body: '([^']+)'/g)].map((m) => m[1])
  for (const body of bodies) assert.ok(body.length <= 60, `"${body}" will not fit the lens`)
})
