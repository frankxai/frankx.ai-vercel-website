#!/usr/bin/env node
'use strict';

/**
 * Image Generation Tracking Hook (PostToolUse)
 * Fires after mcp__nanobanana__generate_image calls.
 * Appends raw entry to data/image-generation-log.json.
 * Council scores and gate results are added by /create-visual command.
 */

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const LOG_PATH = path.join(__dirname, '..', '..', 'data', 'image-generation-log.json');

function main() {
  try {
    const input = JSON.parse(fs.readFileSync(0, 'utf-8'));
    const toolInput = input.tool_input || {};

    // Only track nanobanana image generation
    if (!input.tool_name || !input.tool_name.includes('generate_image')) {
      process.exit(0);
      return;
    }

    // Read existing log
    let log;
    try {
      log = JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
    } catch {
      log = {
        version: '1.0',
        description: 'Auto-populated log of all image generations via the Visual Creation pipeline',
        total_cost_usd: 0,
        total_images: 0,
        entries: []
      };
    }

    // Determine next ID
    const lastId = log.entries.length > 0
      ? parseInt(log.entries[log.entries.length - 1].id.replace('gen-', ''), 10)
      : 0;
    const nextId = `gen-${String(lastId + 1).padStart(3, '0')}`;

    // Estimate cost based on model tier
    const tier = toolInput.model_tier || 'standard';
    const costMap = { standard: 0.03, pro: 0.10, ultra: 0.25 };
    const cost = costMap[tier] || 0.05;

    // Get file size if output exists
    let fileSize = 0;
    const outputPath = toolInput.output_path || '';
    const fullOutputPath = outputPath.startsWith('/')
      ? outputPath
      : path.join(__dirname, '..', '..', outputPath);
    try {
      const stat = fs.statSync(fullOutputPath);
      fileSize = stat.size;
    } catch {
      // File may not exist yet at hook time
    }

    const entry = {
      id: nextId,
      timestamp: new Date().toISOString(),
      subject: '[auto-logged] ' + (toolInput.prompt || '').slice(0, 80),
      template_type: 'unknown',
      style: 'unknown',
      organizing_metaphor: '',
      prompt_excerpt: (toolInput.prompt || '').slice(0, 200),
      model: 'gemini-3-pro-image-preview',
      model_tier: tier,
      thinking_level: toolInput.thinking_level || 'default',
      resolution: toolInput.resolution || 'standard',
      aspect_ratio: toolInput.aspect_ratio || '1:1',
      cost_usd: cost,
      output_path: outputPath,
      file_size_bytes: fileSize,
      dimensions: '',
      council_review: {
        brand_guardian: 0,
        art_director: 0,
        storyteller: 0,
        weighted_score: 0,
        verdict: 'PENDING_REVIEW',
        vetoes: [],
        revision_cycle: 0
      },
      gates: {
        brand_alignment: false,
        color_balance: false,
        information_density: false,
        depth_layers: false,
        text_legibility: false,
        icon_quality: false,
        scroll_stop: false,
        organic_warmth: false
      },
      gates_passed: 0,
      gates_total: 8,
      status: 'auto-logged',
      step: 0,
      notes: 'Auto-logged by PostToolUse hook. Awaiting council review and gate scoring.'
    };

    log.entries.push(entry);
    log.total_images = log.entries.length;
    log.total_cost_usd = parseFloat(
      log.entries.reduce((sum, e) => sum + (e.cost_usd || 0), 0).toFixed(2)
    );

    fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + '\n');

    // Count pending reviews
    const pendingCount = log.entries.filter(e =>
      e.council_review?.verdict === 'PENDING_REVIEW'
    ).length;

    // Build post-generation context
    const context = [];
    context.push(`Image logged as ${nextId} (PENDING_REVIEW)`);
    if (pendingCount > 3) {
      context.push(`⚠️ ${pendingCount} images awaiting council review — run /create-visual council before generating more`);
    }
    if (tier !== 'pro') {
      context.push(`Note: Generated with '${tier}' tier — republish with 'pro' for production quality`);
    }

    // Output context for Claude
    const hookOutput = {
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext: context.join('\n'),
      }
    };
    console.log(JSON.stringify(hookOutput));

    // Auto-open generated image in Windows Photos for instant review
    if (fullOutputPath && fs.existsSync(fullOutputPath)) {
      const winPath = fullOutputPath.replace(/^\/mnt\/([a-z])\//, (_, drive) => `${drive.toUpperCase()}:\\`).replace(/\//g, '\\');
      execFile('explorer.exe', [winPath], { timeout: 5000 }, () => {});
    }

    process.exit(0);
  } catch {
    // Silent fail — tracking should never block generation
    process.exit(0);
  }
}

main();
