#!/usr/bin/env node
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRANKX_ROOT = resolve(__dirname, '..');
const AIS_ROOT = resolve(FRANKX_ROOT, '..', 'Agent-Intelligence-System');

if (!existsSync(AIS_ROOT)) {
  console.error(
    `[sync-ais] Agent-Intelligence-System not found at ${AIS_ROOT}.\n` +
    `Clone it: git clone https://github.com/frankxai/agentic-intelligence-system ${AIS_ROOT}`
  );
  process.exit(1);
}

const outDir = resolve(FRANKX_ROOT, 'public');

// Check primary location, then worktree fallback (feature/plan-a-substrate)
const primaryEmitPath = resolve(AIS_ROOT, 'packages/ais-emit/dist/index.js');
const worktreeEmitPath = resolve(AIS_ROOT, '.worktrees/plan-a/packages/ais-emit/dist/index.js');
const aisEmitPath = existsSync(primaryEmitPath) ? primaryEmitPath : existsSync(worktreeEmitPath) ? worktreeEmitPath : null;

if (!aisEmitPath) {
  console.error(
    `[sync-ais] @frankx-ai/ais-emit not built. Run:\n` +
    `  cd ${AIS_ROOT} && pnpm --filter @frankx-ai/ais-core build && pnpm --filter @frankx-ai/ais-emit build`
  );
  process.exit(1);
}

const { aisEmit } = await import(new URL(`file://${aisEmitPath.replace(/\\/g, '/')}`))

// Resolve canonical dir: prefer primary packages location, fall back to worktree
const primaryCanonical = resolve(AIS_ROOT, 'packages/ais-core/canonical');
const worktreeCanonical = resolve(AIS_ROOT, '.worktrees/plan-a/packages/ais-core/canonical');
const canonical = existsSync(primaryCanonical) ? primaryCanonical : worktreeCanonical;

await aisEmit({
  canonical,
  site: 'frankx-ai',
  outDir,
});

console.log(`[sync-ais] Emitted to ${outDir}`);
