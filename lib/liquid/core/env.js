const listeners = new Set();

let cachedTier = null;

const reduceQuery =
  typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
const finePointerQuery =
  typeof matchMedia === 'function' ? matchMedia('(pointer: fine)') : null;
const coarseWidthQuery =
  typeof matchMedia === 'function' ? matchMedia('(max-width: 767px)') : null;

export function prefersReducedMotion() {
  return Boolean(reduceQuery?.matches);
}

export function hasFinePointer() {
  return Boolean(finePointerQuery?.matches);
}

export function isCompactViewport() {
  return Boolean(coarseWidthQuery?.matches);
}

export function supportsWebGL2() {
  if (typeof document === 'undefined') return false;
  try {
    const probe = document.createElement('canvas');
    return Boolean(probe.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function supportsBackdropFilter() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return (
    CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
  );
}

/**
 * `full` earns the WebGL field, `lite` gets the CSS gradient stand-in,
 * `static` renders one frame and never starts a loop.
 */
export function resolveTier() {
  if (cachedTier) return cachedTier;
  if (typeof window === 'undefined') return 'static';
  if (prefersReducedMotion()) return 'static';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = navigator.deviceMemory ?? 4;
  const saveData = navigator.connection?.saveData === true;

  if (saveData) cachedTier = 'static';
  else if (!supportsWebGL2() || cores <= 2 || memory <= 2) cachedTier = 'lite';
  else cachedTier = 'full';

  return cachedTier;
}

export function devicePixelRatioCap(tier = resolveTier()) {
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  if (tier !== 'full') return 1;
  return Math.min(dpr, isCompactViewport() ? 1.5 : 2);
}

/** Fires when the reduced-motion preference flips mid-session. */
export function onMotionPreferenceChange(handler) {
  listeners.add(handler);
  const relay = () => {
    cachedTier = null;
    listeners.forEach((fn) => fn(prefersReducedMotion()));
  };
  reduceQuery?.addEventListener('change', relay);
  return () => {
    listeners.delete(handler);
    reduceQuery?.removeEventListener('change', relay);
  };
}

/**
 * Drops the caller to the next tier down when sustained frame cost exceeds
 * budget. Motion that costs the page its scroll performance is not motion we ship.
 */
export function createFrameGovernor({ budgetMs = 22, window: sampleWindow = 90, onBreach }) {
  let overruns = 0;
  let samples = 0;
  let tripped = false;

  return function sample(frameMs) {
    if (tripped) return true;
    samples += 1;
    if (frameMs > budgetMs) overruns += 1;
    if (samples < sampleWindow) return false;
    if (overruns / samples > 0.35) {
      tripped = true;
      onBreach?.();
      return true;
    }
    overruns = 0;
    samples = 0;
    return false;
  };
}
