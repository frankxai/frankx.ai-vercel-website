import { createHash } from 'node:crypto'

// Rendered control markup from GlassProduct.tsx at bf3d078. This snapshot
// contains no distributable package, external resources or buyer data.
const specimen = `<main class="sl-surface sl-surface--glass g-specimen">
<div class="g-specimen-head">
<span>WORKSPACE PREVIEW</span>
<span class="sl-status sl-status--idle">
<span class="sl-status__dot" aria-hidden="true">
</span>Idle</span>
</div>
<h1>Try the workspace controls.</h1>
<p>Local state only. No agent or provider is connected.</p>
<div class="sl-field">
<label class="sl-field__label" for="_r_1_">Workspace name</label>
<input maxlength="80" id="_r_1_" class="sl-input" value="Research workspace">
</div>
<button type="button" class="sl-button sl-button--primary sl-button--md">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
<path d="M12 3 2.8 8 12 13l9.2-5L12 3ZM3.5 12.1 12 17l8.5-4.9M3.5 16.2 12 21l8.5-4.8">
</path>
</svg>Prepare local preview</button>
<p role="status" class="g-result">Change the name, then prepare a local preview.</p>
<div class="g-appearance">
<div class="g-theme">
<label for="product-theme">Theme</label>
<select id="product-theme">
<option value="midnight">Midnight</option>
<option value="daylight">Daylight</option>
<option value="ember">Ember</option>
</select>
</div>
<button type="button" class="sl-toggle" aria-pressed="true">
<span class="sl-toggle__track" aria-hidden="true">
<span>
</span>
</span>Glass material</button>
</div>
</main>`

// Semantic color values sampled from the same rendered source in all three themes.
const styles = `
:root { --sl-accent-ink: #102621; --sl-accent: #9bd8cd; --sl-bg: #101820; --sl-muted: #adc0c9; --sl-text: #f0f4f4; --sl-line: #5c727d; }
html[data-theme="daylight"] { --sl-accent-ink: #fff; --sl-accent: #164e47; --sl-bg: #f2f4f1; --sl-muted: #506360; --sl-text: #182a2b; --sl-line: #7d918b; }
html[data-theme="ember"] { --sl-accent-ink: #2b1b11; --sl-accent: #e2ad8a; --sl-bg: #211a18; --sl-muted: #cdb9ae; --sl-text: #f7eee8; --sl-line: #8a6c5b; }
* { box-sizing: border-box; }
body { margin: 0; color: var(--sl-text); background: var(--sl-bg); font: 16px/1.5 system-ui, sans-serif; }
.sl-surface { padding: clamp(18px, 4vw, 34px); border: 1px solid var(--sl-line); border-radius: 17px; }
.sl-surface--glass { background: linear-gradient(140deg, color-mix(in srgb, var(--sl-accent) 14%, var(--sl-bg)), var(--sl-bg) 75%); }
.g-specimen-head, .g-appearance { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.g-specimen-head { color: var(--sl-muted); font: 11px/1.5 ui-monospace, monospace; letter-spacing: .1em; }
.sl-status { display: inline-flex; align-items: center; gap: 6px; letter-spacing: normal; }
.sl-status__dot { height: 7px; width: 7px; border-radius: 50%; background: currentColor; }
.sl-status--complete { color: var(--sl-accent); }
h1 { margin: 22px 0 5px; font-size: clamp(21px, 4vw, 29px); line-height: 1.15; letter-spacing: -.03em; }
p { margin: 0; color: var(--sl-muted); }
.sl-field { display: grid; gap: 5px; margin: 20px 0 12px; }
label, .sl-toggle { font-size: 14px; }
button, input, select { min-height: 44px; max-width: 100%; border-radius: 8px; border: 1px solid var(--sl-line); color: var(--sl-text); background: var(--sl-bg); padding: 8px 12px; font: inherit; }
button, select { cursor: pointer; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid var(--sl-accent); outline-offset: 3px; }
.sl-button { display: inline-flex; align-items: center; gap: 8px; background: var(--sl-accent); color: var(--sl-accent-ink); border-color: transparent; font-weight: 600; }
.sl-button svg { width: 17px; height: 17px; }
.g-result { min-height: 42px; margin-top: 9px; overflow-wrap: anywhere; }
.g-appearance { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--sl-line); }
.g-theme { display: inline-flex; align-items: center; gap: 8px; }
.sl-toggle { display: inline-flex; align-items: center; gap: 7px; }
.sl-toggle__track { display: inline-flex; align-items: center; width: 25px; height: 15px; border: 1px solid currentColor; border-radius: 9px; padding: 2px; }
.sl-toggle__track span { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.sl-toggle[aria-pressed="true"] .sl-toggle__track { justify-content: flex-end; }
.sl-toggle[aria-pressed="true"] { border-color: var(--sl-accent); color: var(--sl-accent); }
@media (forced-colors: active) { button, input, select { border: 1px solid ButtonText; } }
`

// These handlers operate only on the five rendered controls inside the opaque
// frame. The buyer application never receives messages or state from it.
const interactions = `
const input = document.querySelector('input');
const badge = document.querySelector('.sl-status');
const result = document.querySelector('.g-result');
const material = document.querySelector('.sl-toggle');
function setPrepared(prepared) {
  badge.lastChild.textContent = prepared ? 'Complete' : 'Idle';
  badge.classList.toggle('sl-status--complete', prepared);
  result.textContent = prepared
    ? (input.value.trim() || 'Untitled workspace') + ' is ready in this demonstration.'
    : 'Change the name, then prepare a local preview.';
}
input.addEventListener('input', () => setPrepared(false));
document.querySelector('.sl-button').addEventListener('click', () => setPrepared(true));
document.querySelector('select').addEventListener('change', (event) => {
  document.documentElement.dataset.theme = event.target.value;
});
material.addEventListener('click', () => {
  const glass = material.getAttribute('aria-pressed') !== 'true';
  material.setAttribute('aria-pressed', String(glass));
  document.querySelector('.sl-surface').classList.toggle('sl-surface--glass', glass);
});
`
const digest = (value: string) => createHash('sha256').update(value).digest('base64')
const policy = `default-src 'none'; style-src 'sha256-${digest(styles)}'; script-src 'sha256-${digest(interactions)}'; base-uri 'none'; form-action 'none'`

export const glassEssentialPreview = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${policy}">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Glass Core Essential workspace specimen</title><style>${styles}</style></head>
<body>${specimen}<script>${interactions}</script></body></html>`
