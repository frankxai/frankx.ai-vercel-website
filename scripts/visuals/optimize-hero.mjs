#!/usr/bin/env node
/**
 * scripts/visuals/optimize-hero.mjs
 *
 * Optimize a hero JPEG for web delivery. NB Pro outputs are 2-3MB at 16:9 2K;
 * this script downsamples + recompresses to ~600-900KB without visible quality loss
 * at typical blog-body widths.
 *
 * Usage:
 *   node scripts/visuals/optimize-hero.mjs <input.jpg> <output.jpg>
 *   node scripts/visuals/optimize-hero.mjs --batch <input1.jpg> <input2.jpg> ...
 *     (writes alongside as <name>.optimized.jpg)
 */
import sharp from 'sharp';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

async function optimize(input, output) {
  if (!existsSync(input)) throw new Error(`input not found: ${input}`);
  const before = statSync(input).size;
  await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true })   // typical max blog-body width
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(output);
  const after = statSync(output).size;
  const pct = ((1 - after / before) * 100).toFixed(0);
  console.log(`  ${input}`);
  console.log(`    → ${output}`);
  console.log(`    ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB  (-${pct}%)`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === '--batch') {
    for (const input of args.slice(1)) {
      const out = input.replace(/\.(jpg|jpeg)$/i, '.optimized.jpg');
      await optimize(resolve(input), resolve(out));
    }
  } else if (args.length === 2) {
    await optimize(resolve(args[0]), resolve(args[1]));
  } else {
    console.error('usage: node optimize-hero.mjs <input.jpg> <output.jpg>');
    console.error('       node optimize-hero.mjs --batch <file1.jpg> <file2.jpg> ...');
    process.exit(2);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
