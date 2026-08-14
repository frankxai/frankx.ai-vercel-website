import { isCompactViewport, prefersReducedMotion } from './env.js';

/**
 * Scroll-linked bubble drift. Each target rises against the scroll at its own
 * depth and squashes slightly with scroll velocity, the way a suspended bubble
 * lags its container.
 *
 * GSAP is optional and injected, never imported — this package stays
 * dependency-free so the static sites can use it too. Pass
 * `{ gsap, ScrollTrigger }` and the drift is authored on GSAP's ticker,
 * joining whatever scroll system the host page already owns instead of
 * starting a competing one.
 */
/**
 * @param {ParentNode} [root]
 * @param {{selector?: string, maxDrift?: number, gsap?: any, ScrollTrigger?: any}} [options]
 */
export function createBubbleDrift(root = document, options = {}) {
  if (typeof window === 'undefined') return { destroy() {} };

  const {
    selector = '[data-liquid-bubble]',
    maxDrift = 90,
    gsap = null,
    ScrollTrigger = null,
  } = options;

  const targets = Array.from(root.querySelectorAll(selector));
  if (!targets.length) return { destroy() {} };

  if (prefersReducedMotion()) {
    // Static composition still reads: bubbles just sit at their resting depth.
    targets.forEach((el) => el.style.removeProperty('transform'));
    return { destroy() {} };
  }

  const compact = isCompactViewport();
  const depthOf = (el) => {
    const raw = Number.parseFloat(el.dataset.liquidBubble ?? '');
    const depth = Number.isFinite(raw) ? raw : 0.5;
    return compact ? depth * 0.45 : depth;
  };

  if (gsap && ScrollTrigger) {
    const tweens = targets.map((el) =>
      gsap.to(el, {
        y: -maxDrift * depthOf(el),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    );
    return {
      destroy() {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      },
    };
  }

  let frame = 0;
  let lastY = window.scrollY;
  let velocity = 0;
  let queued = false;

  const entries = targets.map((el) => ({ el, depth: depthOf(el), visible: true }));

  const observer = new IntersectionObserver(
    (records) => {
      records.forEach((record) => {
        const entry = entries.find((e) => e.el === record.target);
        if (entry) entry.visible = record.isIntersecting;
      });
    },
    { rootMargin: '15%' }
  );
  entries.forEach((entry) => observer.observe(entry.el));

  function apply() {
    queued = false;
    const y = window.scrollY;
    velocity = Math.max(-60, Math.min(60, y - lastY));
    lastY = y;

    const viewport = window.innerHeight;
    // A viewport this small means layout has not settled (or the tab is not
    // being rendered). Measuring now produces absurd offsets; wait for the next event.
    if (!viewport || viewport < 2) return;

    entries.forEach((entry) => {
      if (!entry.visible) return;
      const rect = entry.el.getBoundingClientRect();
      // -1 entering from below, +1 leaving through the top. Clamped so a stale
      // or mid-layout measurement can never translate an element off the planet.
      const progress = Math.max(-1.5, Math.min(1.5, 1 - (rect.top + rect.height / 2) / viewport));
      const drift = -progress * maxDrift * entry.depth;
      const squash = 1 - Math.min(Math.abs(velocity) / 900, 0.05) * entry.depth;
      entry.el.style.transform = `translate3d(0, ${drift.toFixed(2)}px, 0) scaleY(${squash.toFixed(4)})`;
    });
  }

  const onScroll = () => {
    if (queued) return;
    queued = true;
    frame = requestAnimationFrame(apply);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  apply();

  return {
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      entries.forEach((entry) => entry.el.style.removeProperty('transform'));
    },
  };
}
