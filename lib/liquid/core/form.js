import { hasFinePointer, prefersReducedMotion } from './env.js';

const FIELD_SELECTOR = 'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, select';

/**
 * Returns the field's shell, creating one only when allowed. Inserting a
 * wrapper into React-managed DOM corrupts reconciliation, so React callers
 * pass `wrap: false` and render `<span className="liquid-field-shell">`
 * around the input themselves.
 */
function shellFor(field, allowWrap) {
  if (field.parentElement?.classList.contains('liquid-field-shell')) {
    return field.parentElement;
  }
  if (!allowWrap) return null;
  const shell = document.createElement('span');
  shell.className = 'liquid-field-shell';
  field.parentNode.insertBefore(shell, field);
  shell.appendChild(field);
  return shell;
}

function setFilled(shell, field) {
  const filled = field.value != null && String(field.value).length > 0;
  shell.classList.toggle('is-filled', filled);
}

/**
 * Attaches the liquid behaviour to every field inside `form`:
 * a focus bubble that tracks the caret, a border that swells on focus, and
 * validity that reads as a hue shift rather than a shouted error colour.
 *
 * Validation is never announced by colour alone — `aria-invalid` and the
 * form's own message elements stay authoritative.
 */
export function enhanceForm(form, options = {}) {
  if (!form || typeof window === 'undefined') return { destroy() {} };

  const { ripple = true, trackCaret = true, wrap = true } = options;
  const quiet = prefersReducedMotion();
  const cleanups = [];

  form.classList.add('liquid-form');

  form.querySelectorAll(FIELD_SELECTOR).forEach((field) => {
    const shell = shellFor(field, wrap);
    if (!shell) return;
    shell.dataset.liquidField = field.type || field.tagName.toLowerCase();
    setFilled(shell, field);

    const onFocus = () => shell.classList.add('is-focused');
    const onBlur = () => {
      shell.classList.remove('is-focused');
      setFilled(shell, field);
      if (field.value && typeof field.checkValidity === 'function') {
        const valid = field.checkValidity();
        shell.classList.toggle('is-valid', valid);
        shell.classList.toggle('is-invalid', !valid);
        field.setAttribute('aria-invalid', valid ? 'false' : 'true');
      }
    };
    const onInput = () => {
      setFilled(shell, field);
      if (shell.classList.contains('is-invalid') && field.checkValidity?.()) {
        shell.classList.remove('is-invalid');
        field.setAttribute('aria-invalid', 'false');
      }
    };

    field.addEventListener('focus', onFocus);
    field.addEventListener('blur', onBlur);
    field.addEventListener('input', onInput);
    cleanups.push(() => {
      field.removeEventListener('focus', onFocus);
      field.removeEventListener('blur', onBlur);
      field.removeEventListener('input', onInput);
    });

    // The focus bubble follows the pointer along the field so the surface
    // feels like it has weight under the cursor. Pointer-fine only.
    if (trackCaret && !quiet && hasFinePointer()) {
      const onMove = (event) => {
        const rect = shell.getBoundingClientRect();
        shell.style.setProperty('--liquid-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      };
      const onLeave = () => shell.style.removeProperty('--liquid-x');
      shell.addEventListener('pointermove', onMove, { passive: true });
      shell.addEventListener('pointerleave', onLeave, { passive: true });
      cleanups.push(() => {
        shell.removeEventListener('pointermove', onMove);
        shell.removeEventListener('pointerleave', onLeave);
      });
    }
  });

  if (ripple && !quiet) {
    const onSubmitPointer = (event) => {
      const button = event.target.closest('button[type="submit"], .liquid-button');
      if (!button) return;
      const rect = button.getBoundingClientRect();
      button.style.setProperty('--liquid-ripple-x', `${event.clientX - rect.left}px`);
      button.style.setProperty('--liquid-ripple-y', `${event.clientY - rect.top}px`);
      button.classList.remove('is-rippling');
      void button.offsetWidth;
      button.classList.add('is-rippling');
    };
    form.addEventListener('pointerdown', onSubmitPointer);
    cleanups.push(() => form.removeEventListener('pointerdown', onSubmitPointer));
  }

  return {
    destroy() {
      cleanups.forEach((fn) => fn());
      form.classList.remove('liquid-form');
    },
  };
}
