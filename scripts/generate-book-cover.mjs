#!/usr/bin/env node
/**
 * generate-book-cover.mjs
 *
 * Thin wrapper over scripts/lib/nb-image.mjs for book covers specifically.
 * Reads the cover spec written by @visual-book-cover, applies book-cover
 * defaults (2:3 aspect, 2K size, NB2 model), and writes to public/images/books/.
 *
 * Usage:
 *   node scripts/generate-book-cover.mjs <book-slug> [--variant 1|2|3] [--model nb2|nbpro]
 *
 * Examples:
 *   node scripts/generate-book-cover.mjs golden-age-of-intelligence
 *   node scripts/generate-book-cover.mjs golden-age-of-intelligence --variant 2
 *   node scripts/generate-book-cover.mjs golden-age-of-intelligence --model nbpro
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateImage } from './lib/nb-image.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const slug = args[0];
if (!slug) {
  console.error('usage: node scripts/generate-book-cover.mjs <book-slug> [--variant N] [--model nb2|nbpro]');
  process.exit(2);
}

const variantIdx = args.indexOf('--variant');
const variant = variantIdx >= 0 ? parseInt(args[variantIdx + 1], 10) : 1;
const modelIdx = args.indexOf('--model');
const model = modelIdx >= 0 ? args[modelIdx + 1] : 'nb2';

const specPath = resolve(REPO_ROOT, `public/images/books/${slug}-cover.spec.md`);
if (!existsSync(specPath)) {
  console.error(`ERROR: spec file not found at ${specPath}`);
  console.error('       Run @visual-book-cover agent first to generate the spec.');
  process.exit(2);
}

const spec = readFileSync(specPath, 'utf8');
console.error(`✓ Spec loaded: ${specPath} (${spec.length} bytes)`);

function extractVariant(specText, n) {
  const re = new RegExp(`##\\s+(?:NB2?\\s+)?PROMPT[^\\n]*Variant\\s+${n}[^\\n]*\\n`, 'i');
  const m = specText.match(re);
  if (!m) return null;
  const start = m.index + m[0].length;
  const next = /\n##\s+/g; next.lastIndex = start;
  const nx = next.exec(specText);
  return specText
    .slice(start, nx ? nx.index : specText.length)
    .replace(/^\s*\*\*Paste[^\n]*\*\*\s*/im, '')
    .replace(/\*\*/g, '')
    .replace(/^---\s*$/gm, '')
    .trim();
}

let prompt = extractVariant(spec, variant);
if (!prompt) {
  console.error(`(could not isolate Variant ${variant}; sending full spec)`);
  prompt = spec;
}

const isPrimary = variant === 1;
const outName = isPrimary
  ? `${slug}-cover.png`             // .png extension is overwritten by mimeType from response
  : `${slug}-cover-v${variant}.png`;

const result = await generateImage({
  prompt,
  outputPath: resolve(REPO_ROOT, 'public/images/books', outName),
  model,
  aspectRatio: '2:3',
  imageSize: '2K',
  enforceDesignThinking: true,
  fallback: true,
});

console.log(JSON.stringify({ status: 'ok', slug, variant, ...result }, null, 2));
