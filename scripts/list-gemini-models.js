#!/usr/bin/env node
/**
 * Debug helper — lists Gemini image-gen models available to the configured key.
 * Uses the central library so it picks up keys the same way every other script does.
 *
 * Usage: node scripts/list-gemini-models.js
 *
 * SECURITY NOTE: A previous version of this file had a hardcoded API key in
 * source. That key has been removed. If it was ever pushed to a public repo,
 * rotate it in Google AI Studio.
 */

import { listImageModels } from './lib/nb-image.mjs';

const models = await listImageModels();
console.log('Image-capable models available to current key:\n');
for (const m of models) {
  console.log(`  ${m.name.padEnd(40)} → ${m.display}`);
}
