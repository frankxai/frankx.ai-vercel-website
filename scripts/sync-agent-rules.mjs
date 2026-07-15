#!/usr/bin/env node
/**
 * Agent Rules Synchronization System (sync-agent-rules.mjs)
 *
 * This script establishes a single source of truth for all coding agents.
 * It parses the "LLM Behavioral Guardrails (Top Thinkers System)" section from
 * the root CLAUDE.md and generates aligned instructions for:
 *   - Cursor: .cursorrules
 *   - Cline: .clinerules
 *   - ACOS (Antigravity/Gemini): .claude/skills/coding-guardrails/SKILL.md
 *
 * After writing the rules, it runs `acos-status.mjs` to rebuild the cache.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CLAUDE_MD_PATH = path.join(ROOT, 'CLAUDE.md');
const CURSORRULES_PATH = path.join(ROOT, '.cursorrules');
const CLINERULES_PATH = path.join(ROOT, '.clinerules');
const ACOS_SKILL_DIR = path.join(ROOT, '.claude', 'skills', 'coding-guardrails');
const ACOS_SKILL_PATH = path.join(ACOS_SKILL_DIR, 'SKILL.md');

// Default backup rules if parsing fails
const DEFAULT_RULES = `## LLM Behavioral Guardrails (Top Thinkers System)

These guidelines enforce discipline, conceptual clarity, and simplicity:

### 1. Think Before Coding (Karpathy Rules)
* **Don't assume. Don't hide confusion. Surface tradeoffs.**
* State assumptions explicitly. If uncertain, ask.
* If multiple interpretations exist, present them - don't pick silently.
* If a simpler approach exists, push back and prioritize simplicity.

### 2. Feynman Alignment Protocol (Explain Simply)
* **What you cannot explain simply, you do not understand.**
* Before writing code, write a brief description of (a) the core problem in plain English, (b) the mental model/architecture of changes, and (c) the simplest possible solution.
* Avoid buzzwords, jargon, and hand-waving (e.g. do not say "streamline" or "optimize"; describe the exact mechanism).

### 3. Simplicity & Deep Design (Ousterhout & Hickey Rules)
* **Minimum code that solves the problem. Nothing speculative.**
* No speculative abstractions or configurability. No error handling for impossible scenarios.
* **Deep Modules**: Prefer simple interfaces with rich internals. Avoid creating cascades of shallow, single-use helper files/wrappers.
* **De-tangling**: Avoid "easy" copy-paste hacks that entangle components; keep concerns separated.

### 4. Surgical Changes & Readability (Torvalds Rules)
* **Touch only what you must. Clean up only your own mess.**
* Don't "improve" adjacent code, formatting, or comments. Don't refactor things that aren't broken.
* Match existing style, even if you would do it differently.
* If you notice unrelated dead code, mention it - don't delete it.
* **Self-Documenting Code**: Code is read much more than written. Use clear naming. Do not write comments narrating *what* code does; only explain *why* non-obvious choices were made.

### 5. Goal-Driven & Test-Driven (Beck Rules)
* **Define success criteria. Loop until verified.**
* Transform vague requests into verifiable targets.
* **Reproduce First**: Write a reproducing test or run code demonstrating a failure before implementing a bug fix.
* For multi-step tasks, state a brief plan and verification steps before writing code (e.g., \`1. [Step] -> verify: [check]\`).`;

function extractRules() {
  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    console.warn(`⚠️  Root CLAUDE.md not found at ${CLAUDE_MD_PATH}. Using default rules.`);
    return DEFAULT_RULES;
  }

  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf8');
  
  // Find the Top Thinkers Rules section
  const sectionStart = content.indexOf('## LLM Behavioral Guardrails (Top Thinkers System)');
  if (sectionStart === -1) {
    console.warn('⚠️  Could not find "## LLM Behavioral Guardrails (Top Thinkers System)" section in root CLAUDE.md. Using default rules.');
    return DEFAULT_RULES;
  }

  // Extract content up to the next line separator "---"
  const remaining = content.slice(sectionStart);
  const nextSeparator = remaining.slice(3).indexOf('---');
  
  if (nextSeparator === -1) {
    return remaining.trim();
  }
  
  return remaining.slice(0, nextSeparator + 3).trim();
}

function run() {
  console.log('🔄 Syncing agent rules across workspace...');
  const rules = extractRules();

  // 1. Write Cursor rules
  const cursorContent = `# Cursor Rules - Unified Coding Guardrails\n\n${rules}\n`;
  fs.writeFileSync(CURSORRULES_PATH, cursorContent);
  console.log(`✅ Shipped: ${CURSORRULES_PATH}`);

  // 2. Write Cline rules
  const clineContent = `# Cline Rules - Unified Coding Guardrails\n\n${rules}\n`;
  fs.writeFileSync(CLINERULES_PATH, clineContent);
  console.log(`✅ Shipped: ${CLINERULES_PATH}`);

  // 3. Write ACOS System Skill
  fs.mkdirSync(ACOS_SKILL_DIR, { recursive: true });
  const acosSkillContent = `---
name: coding-guardrails
description: "Unified LLM coding rules, simplicity guidelines, surgical changes, and thinking protocols for all AI agents. Triggers on: code rules, guardrails, coding guidelines, coding conventions, coding style, surgical changes, goal-driven."
---

# Coding Guardrails

The unified engineering guidelines and rules of the repository, shared across all agents to maintain maximum simplicity, surgical changes, and structured validation.

${rules}
`;
  fs.writeFileSync(ACOS_SKILL_PATH, acosSkillContent);
  console.log(`✅ Shipped ACOS Skill: ${ACOS_SKILL_PATH}`);

  // 4. Rebuild ACOS status cache so the new skill is registered
  try {
    console.log('⚡ Rebuilding ACOS status cache...');
    const statusScript = path.join(ROOT, 'scripts', 'acos-status.mjs');
    execSync(`node "${statusScript}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to run acos-status.mjs script:', error.message);
  }

  console.log('🎉 All agent rules are synchronized and active!');
}

run();
