#!/usr/bin/env node
'use strict';

/**
 * Image Generation Pre-Check Hook v2.0 (PreToolUse)
 * Fires BEFORE mcp__nanobanana__generate_image calls.
 *
 * Enforces 5 quality gates:
 * 1. Model tier check (warn if not 'pro')
 * 2. Grounding check (warn if disabled)
 * 3. Batch rate limiter (warn if >5 in 30min)
 * 4. High-risk prompt pattern detection
 * 5. VIS registry dedup check (prevent regenerating existing images)
 */

const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '..', '..', 'data', 'image-generation-log.json');
const VIS_PATH = path.join(__dirname, '..', '..', 'data', 'visual-registry.json');
const BATCH_LIMIT = 5;
const BATCH_WINDOW_MS = 30 * 60 * 1000;

const HIGH_RISK_PATTERNS = [
  { pattern: /claude\s*\d/i, risk: 'Claude version — may hallucinate outdated version' },
  { pattern: /gpt-?\d/i, risk: 'GPT version — may hallucinate outdated version' },
  { pattern: /llama\s*\d/i, risk: 'Llama version — verify current version first' },
  { pattern: /anthropic\s+(ui|interface|dashboard)/i, risk: 'Anthropic UI — will fabricate interface' },
  { pattern: /openai\s+(ui|interface|dashboard)/i, risk: 'OpenAI UI — will fabricate interface' },
  { pattern: /\bui\b.*\binterface\b|\binterface\b.*\bui\b/i, risk: 'UI mockup — high hallucination risk' },
  { pattern: /blog\s*header|header\s*image/i, risk: 'Meta-instruction may render as text' },
  { pattern: /\boracle\b/i, risk: 'Oracle brand — unauthorized logo risk' },
  { pattern: /nvidia|microsoft|apple|meta\s+ai/i, risk: 'Third-party brand — unauthorized logo risk' },
  { pattern: /python\s*3\.\d|node\s*\d|react\s*\d/i, risk: 'Software version — verify current version' },
];

function checkVisRegistry(prompt) {
  try {
    const vis = JSON.parse(fs.readFileSync(VIS_PATH, 'utf-8'));
    if (!vis.images || !Array.isArray(vis.images)) return null;

    const promptWords = prompt.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const matches = vis.images.filter(img => {
      const imgText = [img.tags, img.description, img.alt, img.filename].filter(Boolean).join(' ').toLowerCase();
      const matchCount = promptWords.filter(w => imgText.includes(w)).length;
      return matchCount >= 3;
    });

    if (matches.length > 0) {
      return matches.slice(0, 3).map(m => m.path || m.filename).join(', ');
    }
  } catch { /* VIS may not exist */ }
  return null;
}

function main() {
  try {
    const input = JSON.parse(fs.readFileSync(0, 'utf-8'));
    const toolInput = input.tool_input || {};
    const prompt = toolInput.prompt || '';
    const modelTier = toolInput.model_tier || 'auto';

    const warnings = [];
    const info = [];

    // Gate 1: Model tier
    if (modelTier === 'nb2' || modelTier === 'flash') {
      warnings.push(`Model '${modelTier}' — use 'pro' for published content`);
    }

    // Gate 2: Grounding
    if (toolInput.enable_grounding === false) {
      warnings.push('Grounding DISABLED — enable for accuracy');
    }

    // Gate 3: Batch count
    let recentCount = 0;
    let pendingReviews = 0;
    try {
      const log = JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
      const cutoff = Date.now() - BATCH_WINDOW_MS;
      recentCount = log.entries.filter(e => new Date(e.timestamp).getTime() > cutoff).length;
      pendingReviews = log.entries.filter(e => e.council_review?.verdict === 'PENDING_REVIEW').length;
    } catch { /* ok */ }

    if (recentCount >= BATCH_LIMIT) {
      warnings.push(`${recentCount} images in 30min (limit: ${BATCH_LIMIT}). PAUSE and review.`);
    }
    if (pendingReviews > 5) {
      info.push(`${pendingReviews} images awaiting council review`);
    }

    // Gate 4: High-risk patterns
    const risks = HIGH_RISK_PATTERNS.filter(p => p.pattern.test(prompt));
    risks.forEach(r => warnings.push(`RISK: ${r.risk}`));

    // Gate 5: VIS dedup
    const visDupes = checkVisRegistry(prompt);
    if (visDupes) {
      info.push(`Similar images may exist in VIS: ${visDupes}`);
    }

    // Build output
    const parts = [];
    if (warnings.length > 0) {
      parts.push('IMAGE GENERATION WARNINGS:\n' + warnings.map(w => `- ${w}`).join('\n'));
    }
    if (info.length > 0) {
      parts.push(info.join(' | '));
    }
    parts.push('Pipeline: Study > Draft > Council > Test > Execute | Types: Atmospheric | Informational | Branded');

    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: parts.join('\n\n'),
      }
    }));
    process.exit(0);
  } catch {
    process.exit(0);
  }
}

main();
