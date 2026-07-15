#!/usr/bin/env node
/**
 * 🧬 Sovereign Creator Flywheel Runner
 * 
 * Implements the programmatic flywheel loop:
 * Content Idea ─► ACOS Expansion ─► Affiliate Sync ─► Local Ledger Update ─► Trajectory Log
 * 
 * Usage:
 *   node scripts/flywheel-run.mjs --idea "How to use ElevenLabs for faceless channels"
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// File paths
const CATALOG_PATH = join(ROOT, 'data', 'affiliate', 'programs.json');
const LEDGER_PATH = join(ROOT, 'private', 'ledger.json');
const DRAFT_DIR = join(ROOT, 'content', 'blog');
const TRAJECTORY_SCRIPT = join(ROOT, 'scripts', 'workflow-trajectory.mjs');

// Parse CLI Arguments
const args = process.argv.slice(2);
const ideaFlagIndex = args.indexOf('--idea');
const rawIdea = ideaFlagIndex !== -1 && args[ideaFlagIndex + 1] 
  ? args[ideaFlagIndex + 1] 
  : "Using ElevenLabs for faceless Youtube channels and Higgsfield for B-roll";

console.log('=== SOVEREIGN CREATOR FLYWHEEL LOOP RUNNER ===');
console.log(`[1/5 Intake] Intake Seed: "${rawIdea}"`);

async function main() {
  const startTime = Date.now();
  
  // ── Step 2: ACOS Pipeline Generation & Expansion ──
  console.log('[2/5 ACOS] Simulating Prose Expansion & Voice Polishing...');
  // Simulates @content-polisher logic: structuring and cleaning the voice
  const slug = rawIdea.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const outPath = join(DRAFT_DIR, `${slug}.mdx`);
  
  let mdxContent = `---
title: "The Ultimate Guide: ${rawIdea}"
description: "How to combine modern AI voice models with responsive video tools for high-retention faceless production."
category: "Creator Systems"
badge: "ACOS PIPELINE"
date: "${new Date().toISOString().slice(0, 10)}"
---

# The Ultimate Guide: ${rawIdea}

Most creators treat AI as a cheap ghostwriter. In the Sovereign Creator Architecture, we invert this: we build compounding content assets that capture high-intent search volume and route it directly to active recurring programs.

## Why it matters

To scale video production, you must decouple creation time from final output duration. Running a local-first creative stack allows you to ship while preserving brand voice and platform ownership.

## The Production Setup

To execute this, we use two load-bearing AI tools:
1. **Voice Generation**: We clone our voice and generate narratives using ElevenLabs.
2. **Visual B-Roll**: We render high-retention video sequences using Higgsfield to match the pacing.

## Step-by-Step Walkthrough

1. Draft your narrative script locally.
2. Send the script to your voice generator to compile high-fidelity audio.
3. Batch render visuals to align with script events.
4. Assemble and ship.

_Built on SIP — Starlight Intelligence Protocol_
`;

  // ── Step 3: Affiliate Catalog Spoke Post Synchronization ──
  console.log('[3/5 Sync] Cross-referencing keywords with affiliate catalog...');
  if (!existsSync(CATALOG_PATH)) {
    console.error(`[ERROR] Catalog not found at ${CATALOG_PATH}`);
    process.exit(1);
  }
  
  const catalogRaw = await readFile(CATALOG_PATH, 'utf8');
  const catalog = JSON.parse(catalogRaw);
  const programs = catalog.programs;
  
  let linkInjectionsCount = 0;
  
  // Walk programs and replace mentions with affiliate links
  for (const prog of programs) {
    if (!prog.ourLink || prog.status !== 'active') continue;
    
    // Create regex matching aliases or tool name on word boundaries
    const aliases = prog.aliases || [prog.tool];
    const escapedAliases = aliases.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const rx = new RegExp(`\\b(${escapedAliases})\\b`, 'gi');
    
    if (rx.test(mdxContent)) {
      console.log(`  └─ Found mention of "${prog.tool}". Injecting affiliate link: ${prog.ourLink}`);
      // Replace with markdown link
      mdxContent = mdxContent.replace(rx, `[$1](${prog.ourLink})`);
      linkInjectionsCount++;
    }
  }
  
  await mkdir(DRAFT_DIR, { recursive: true });
  await writeFile(outPath, mdxContent, 'utf8');
  console.log(`[3/5 Sync] Saved monetized draft to: ${outPath} (${linkInjectionsCount} links injected)`);

  // ── Step 4: Local DPI Ledger Update ──
  console.log('[4/5 Ledger] Recording asset in local ledger...');
  await mkdir(dirname(LEDGER_PATH), { recursive: true });
  
  let ledger = {
    updatedAt: new Date().toISOString(),
    assets: [],
    transactions: []
  };
  
  if (existsSync(LEDGER_PATH)) {
    try {
      const ledgerRaw = await readFile(LEDGER_PATH, 'utf8');
      ledger = JSON.parse(ledgerRaw);
    } catch {
      console.warn('  └─ Existing ledger was empty or corrupted. Initializing new.');
    }
  }
  
  // Add new asset description
  const assetId = `asset_${slug}_${Date.now().toString().slice(-4)}`;
  const newAsset = {
    id: assetId,
    type: "Audience-as-Asset",
    name: `Blog Post: ${slug}`,
    targetPath: `/blog/${slug}`,
    monetizedLinks: linkInjectionsCount,
    status: "active",
    initialYieldEur: 0.00
  };
  
  ledger.assets = ledger.assets || [];
  ledger.assets.push(newAsset);
  
  // Add a transaction representing initial creation/pending state
  ledger.transactions = ledger.transactions || [];
  ledger.transactions.push({
    transactionId: `tx_${Date.now()}`,
    timestamp: new Date().toISOString(),
    assetId: assetId,
    amountEur: 0.00,
    category: "Audience-as-Asset",
    status: "pending",
    note: "Asset initialized in draft mode, awaiting traffic indexing."
  });
  
  ledger.updatedAt = new Date().toISOString();
  await writeFile(LEDGER_PATH, JSON.stringify(ledger, null, 2), 'utf8');
  console.log(`[4/5 Ledger] Updated private ledger at ${LEDGER_PATH} with asset: ${assetId}`);

  // ── Step 5: Trajectory Logging (ReasoningBank) ──
  console.log('[5/5 Trajectory] Recording run history in ReasoningBank...');
  const durationMs = Date.now() - startTime;
  
  const runId = `run_${Date.now()}`;
  const recordArgs = [
    `--workflow "creator-flywheel-workflow"`,
    `--runId "${runId}"`,
    `--outcome "success"`,
    `--summary "Ingested idea, expanded draft with ${linkInjectionsCount} affiliate links, logged in ledger"`,
    `--durationMs ${durationMs}`,
    `--findings ${linkInjectionsCount}`,
    `--lessonsLearned "Affiliate linkage increases asset capitalization | Local ledger updates maintain financial sanity"`
  ].join(' ');
  
  try {
    const { stdout } = await execAsync(`node "${TRAJECTORY_SCRIPT}" record ${recordArgs}`);
    console.log(`[5/5 Trajectory] Success: ${JSON.parse(stdout).recorded ? 'Recorded' : 'Failed'}`);
  } catch (err) {
    console.warn('  └─ Warning: Trajectory script record error:', err.message);
  }

  console.log('=== FLYWHEEL LOOP RUN COMPLETE ===');
}

main().catch(err => {
  console.error('[ERROR] Flywheel execution failed:', err);
  process.exit(1);
});
