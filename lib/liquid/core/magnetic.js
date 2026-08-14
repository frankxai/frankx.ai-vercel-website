import { hasFinePointer, prefersReducedMotion } from './env.js';

/**
 * Pulls an element toward the pointer within a radius, then releases it.
 * Transform-only, pointer-fine only, and inert under reduced motion — a
 * keyboard user must never depend on this to find the target.
 */
export function magnetize(element, options = {}) {
  if (!element || typeof window === 'undefined') return { destroy() {} };
  if (prefersReducedMotion() || !hasFinePointer()) return { destroy() {} };

  const { radius = 90, strength = 0.32, scale = 1.015 } = options;

  let frame = 0;
  let current = { x: 0, y: 0, s: 1 };
  let target = { x: 0, y: 0, s: 1 };
  let settled = true;

  function tick() {
    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;
    current.s += (target.s - current.s) * 0.16;

    element.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) scale(${current.s.toFixed(4)})`;

    const near =
      Math.abs(target.x - current.x) < 0.05 &&
      Math.abs(target.y - current.y) < 0.05 &&
      Math.abs(target.s - current.s) < 0.0005;

    if (near && settled) {
      element.style.transform = '';
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function ensureLoop() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  const onMove = (event) => {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const distance = Math.hypot(dx, dy);
    const reach = radius + Math.max(rect.width, rect.height) / 2;

    if (distance > reach) {
      target = { x: 0, y: 0, s: 1 };
      settled = true;
    } else {
      const pull = 1 - distance / reach;
      target = { x: dx * strength * pull, y: dy * strength * pull, s: 1 + (scale - 1) * pull };
      settled = false;
    }
    ensureLoop();
  };

  const onLeave = () => {
    target = { x: 0, y: 0, s: 1 };
    settled = true;
    ensureLoop();
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onLeave, { passive: true });
  element.addEventListener('blur', onLeave);

  return {
    destroy() {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onLeave);
      element.removeEventListener('blur', onLeave);
      element.style.transform = '';
    },
  };
}

/**
 * Convenience: magnetize every match inside a root, returns one handle.
 * @param {ParentNode} [root]
 */
export function magnetizeAll(root = document, selector = '[data-liquid-magnetic]', options) {
  const handles = Array.from(root.querySelectorAll(selector)).map((el) => magnetize(el, options));
  return { destroy: () => handles.forEach((h) => h.destroy()) };
}
