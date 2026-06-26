#!/usr/bin/env node
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRANKX_ROOT = resolve(__dirname, '..');
const AIS_ROOT = resolve(FRANKX_ROOT, '..', 'Agent-Intelligence-System');

const requireAIS = process.env.SYNC_AIS_REQUIRED === '1';

function skipOptionalAIS(message) {
  if (requireAIS) {
    console.error(message);
    process.exit(1);
  }
  console.warn(`${message} Skipping optional AIS emission. Set SYNC_AIS_REQUIRED=1 to make this fatal.`);
  process.exit(0);
}

if (!existsSync(AIS_ROOT)) {
  skipOptionalAIS(
    `[sync-ais] Agent-Intelligence-System not found at ${AIS_ROOT}.\n` +
    `Clone it: git clone https://github.com/frankxai/agentic-intelligence-system ${AIS_ROOT}`
  );
}

const outDir = resolve(FRANKX_ROOT, 'public');

// Find core and emit paths
const corePathsToTry = [
  resolve(AIS_ROOT, 'packages/core/dist/index.js'),
  resolve(AIS_ROOT, 'packages/ais-core/dist/index.js'),
  resolve(AIS_ROOT, '.worktrees/plan-a/packages/ais-core/dist/index.js')
];
const aisCorePath = corePathsToTry.find(p => existsSync(p)) || null;

const emitPathsToTry = [
  resolve(AIS_ROOT, 'packages/emit/dist/index.js'),
  resolve(AIS_ROOT, 'packages/ais-emit/dist/index.js'),
  resolve(AIS_ROOT, '.worktrees/plan-a/packages/ais-emit/dist/index.js')
];
const aisEmitPath = emitPathsToTry.find(p => existsSync(p)) || null;

if (!aisCorePath || !aisEmitPath) {
  skipOptionalAIS(
    `[sync-ais] Required packages not built. Run build in Agent-Intelligence-System first.`
  );
}

// Find profile path
const profilePathsToTry = [
  resolve(AIS_ROOT, 'ais-profile.yaml'),
  resolve(AIS_ROOT, 'packages/core/canonical/ais-profile.yaml'),
  resolve(AIS_ROOT, 'packages/ais-core/canonical/ais-profile.yaml')
];
const profilePath = profilePathsToTry.find(p => existsSync(p)) || null;

if (!profilePath) {
  skipOptionalAIS(`[sync-ais] Profile ais-profile.yaml not found in ${AIS_ROOT}`);
}

// Dynamic import
const { loadSystemProfile } = await import(new URL(`file://${aisCorePath.replace(/\\/g, '/')}`));
const { generateLlmsText, generateAgentsJson, generateJsonLd } = await import(new URL(`file://${aisEmitPath.replace(/\\/g, '/')}`));

try {
  const profile = loadSystemProfile(profilePath);
  mkdirSync(outDir, { recursive: true });

  writeFileSync(resolve(outDir, 'llms.txt'), generateLlmsText(profile), 'utf8');
  writeFileSync(resolve(outDir, 'llms-full.txt'), generateLlmsText(profile), 'utf8');
  writeFileSync(resolve(outDir, 'agents.json'), generateAgentsJson(profile), 'utf8');
  writeFileSync(resolve(outDir, 'schema-graph.json'), generateJsonLd(profile), 'utf8');

  // Simple sitemap fallback
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://frankx.ai</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>\n`;
  writeFileSync(resolve(outDir, 'sitemap-extras.xml'), sitemapContent, 'utf8');

  console.log(`[sync-ais] Emitted AIS discovery assets to ${outDir}`);
} catch (error) {
  console.error('❌ [sync-ais] Error syncing AIS assets:', error.message);
  process.exit(1);
}
