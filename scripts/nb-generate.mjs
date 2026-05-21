#!/usr/bin/env node
/**
 * scripts/nb-generate.mjs
 *
 * The single CLI entry point for image generation. Every command, agent,
 * skill, and human can invoke this — it composes onto scripts/lib/nb-image.mjs
 * so the model registry, key loading, design-thinking gate, and mimeType
 * handling are all in one place.
 *
 * Usage:
 *   node scripts/nb-generate.mjs --prompt-file <path> --out <path> [opts]
 *   node scripts/nb-generate.mjs --prompt "<inline>" --out <path>     [opts]
 *   node scripts/nb-generate.mjs --spec <path-to-spec.md> --out <path> [opts]   # reads variant 1 prompt from spec
 *   node scripts/nb-generate.mjs --list-models                                   # debug
 *
 * Options:
 *   --model     nb2 | nbpro | nb1 | <full-gemini-id>     (default: nb2)
 *   --aspect    2:3 | 16:9 | 1:1 | 4:3 | 3:2             (default: 2:3)
 *   --size      1K | 2K | 4K                             (default: 2K)
 *   --variant   N                                        (extracts "Variant N" from --spec)
 *   --no-design-check                                    (skip design-thinking gate — prototype only)
 *   --no-fallback                                        (don't fall back to other models)
 *   --json                                               (emit only the result JSON, suppress logs)
 *
 * Examples:
 *   # From a book-cover spec (the visual-book-cover agent's output):
 *   node scripts/nb-generate.mjs \
 *     --spec public/images/books/golden-age-of-intelligence-cover.spec.md \
 *     --out public/images/books/golden-age-of-intelligence-cover.png \
 *     --aspect 2:3 --size 2K --model nb2
 *
 *   # Hero image with NB Pro (4K premium):
 *   node scripts/nb-generate.mjs \
 *     --prompt-file specs/hero.md \
 *     --out public/images/blog/my-post.png \
 *     --model nbpro --aspect 16:9 --size 4K
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateImage, listImageModels, MODELS } from './lib/nb-image.mjs';

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
function flag(name) { return process.argv.includes(name); }

async function main() {
  if (flag('--list-models')) {
    const list = await listImageModels();
    console.log(JSON.stringify(list, null, 2));
    return;
  }

  const out = arg('--out');
  if (!out) {
    console.error('ERROR: --out <path> is required');
    process.exit(2);
  }

  // Resolve prompt source
  let prompt = arg('--prompt');
  const promptFile = arg('--prompt-file');
  const specFile = arg('--spec');
  const variant = parseInt(arg('--variant', '1'), 10);

  if (!prompt && promptFile) {
    if (!existsSync(promptFile)) {
      console.error(`ERROR: prompt-file not found: ${promptFile}`);
      process.exit(2);
    }
    prompt = readFileSync(promptFile, 'utf8');
  }
  if (!prompt && specFile) {
    if (!existsSync(specFile)) {
      console.error(`ERROR: spec file not found: ${specFile}`);
      process.exit(2);
    }
    prompt = extractVariantFromSpec(readFileSync(specFile, 'utf8'), variant);
    if (!prompt) {
      console.error(`(could not isolate Variant ${variant}; sending full spec)`);
      prompt = readFileSync(specFile, 'utf8');
    }
  }
  if (!prompt) {
    console.error('ERROR: provide --prompt, --prompt-file, or --spec');
    process.exit(2);
  }

  const result = await generateImage({
    prompt,
    outputPath: resolve(out),
    model: arg('--model', 'nb2'),
    aspectRatio: arg('--aspect', '2:3'),
    imageSize: arg('--size', '2K'),
    enforceDesignThinking: !flag('--no-design-check'),
    fallback: !flag('--no-fallback'),
    verbose: !flag('--json'),
  });

  if (flag('--json')) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.error('');
    console.log(JSON.stringify({ status: 'ok', ...result }, null, 2));
  }
}

function extractVariantFromSpec(specText, n) {
  const headerRe = new RegExp(`##\\s+(?:NB2?\\s+)?PROMPT[^\\n]*Variant\\s+${n}[^\\n]*\\n`, 'i');
  const m = specText.match(headerRe);
  if (!m) return null;
  const start = m.index + m[0].length;
  const next = /\n##\s+/g;
  next.lastIndex = start;
  const nx = next.exec(specText);
  return specText
    .slice(start, nx ? nx.index : specText.length)
    .replace(/^\s*\*\*Paste[^\n]*\*\*\s*/im, '')
    .replace(/\*\*/g, '')
    .replace(/^---\s*$/gm, '')
    .trim();
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
