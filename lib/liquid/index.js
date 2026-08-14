/* Vendored from starlight-liquid v0.1.0. Do not edit here —
   change repos/starlight-liquid/src and re-run scripts/sync.mjs. */
export { createLiquidField } from './core/field.js';
export { enhanceForm } from './core/form.js';
export { magnetize, magnetizeAll } from './core/magnetic.js';
export { createBubbleDrift } from './core/scroll.js';
export {
  createFrameGovernor,
  hasFinePointer,
  isCompactViewport,
  onMotionPreferenceChange,
  prefersReducedMotion,
  resolveTier,
  supportsBackdropFilter,
  supportsWebGL2,
} from './core/env.js';

import { createLiquidField } from './core/field.js';
import { enhanceForm } from './core/form.js';
import { magnetizeAll } from './core/magnetic.js';
import { createBubbleDrift } from './core/scroll.js';

/**
 * One-call wiring for plain HTML pages: marks up whatever is already on the
 * page via data attributes. Next/React apps should use the components in
 * `src/react` instead so lifecycles stay scoped.
 */
export function autoMount(root = document, options = {}) {
  const handles = [];

  root.querySelectorAll('[data-liquid-field]').forEach((host) => {
    host.classList.add('liquid-field');
    const tints = host.dataset.liquidTints?.split(',').map((t) => t.trim());
    handles.push(
      createLiquidField(host, {
        ...options.field,
        ...(tints?.length ? { tints } : {}),
        ...(host.dataset.liquidIntensity
          ? { intensity: Number.parseFloat(host.dataset.liquidIntensity) }
          : {}),
      })
    );
  });

  root.querySelectorAll('[data-liquid-form]').forEach((form) => {
    handles.push(enhanceForm(form, options.form));
  });

  handles.push(magnetizeAll(root, '[data-liquid-magnetic]', options.magnetic));
  handles.push(createBubbleDrift(root, options.drift));

  return { destroy: () => handles.forEach((h) => h.destroy()) };
}
