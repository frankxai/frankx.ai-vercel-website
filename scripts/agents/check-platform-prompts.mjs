#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readText(file) {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function collectPromptFiles() {
  const files = [
    'AGENTS.md',
    'CLAUDE.md',
    '.codex/instructions.md',
    '.gemini/GEMINI.md',
  ];
  const cursorDir = path.join(root, '.cursor', 'rules');
  if (existsSync(cursorDir)) {
    for (const entry of readdirSync(cursorDir, { withFileTypes: true })) {
      if (entry.isFile()) files.push(path.join('.cursor', 'rules', entry.name));
    }
  }
  return files.filter((file) => existsSync(path.join(root, file)));
}

const files = collectPromptFiles();
const docs = files.map((file) => ({
  file,
  text: readText(path.join(root, file)),
}));
const combined = docs.map((doc) => doc.text).join('\n\n');
const failures = [];

function requireIn(file, pattern, description) {
  const doc = docs.find((item) => item.file === file);
  if (!doc) {
    failures.push(`${file}: missing prompt file for ${description}`);
    return;
  }
  if (!pattern.test(doc.text)) failures.push(`${file}: missing ${description}`);
}

function forbidEverywhere(pattern, description) {
  for (const doc of docs) {
    const match = doc.text.match(pattern);
    if (match) failures.push(`${doc.file}: forbidden ${description}: ${match[0]}`);
  }
}

function forbidAffirmativeLine(pattern, description) {
  for (const doc of docs) {
    for (const line of doc.text.split(/\r?\n/)) {
      if (!pattern.test(line)) continue;
      if (/\b(never|no|not|do\s+not|does\s+not|nothing|without)\b/i.test(line)) continue;
      failures.push(`${doc.file}: forbidden ${description}: ${line.trim()}`);
    }
  }
}

requireIn('AGENTS.md', /frankx\.ai-vercel-website/i, 'production repo name');
requireIn('CLAUDE.md', /frankx\.ai-vercel-website/i, 'production repo name');
requireIn('AGENTS.md', /does\s+not\s+deploy\s+from\s+this\s+repo|ships\s+nothing\s+to\s+production/i, 'private repo deploy warning');
requireIn('AGENTS.md', /npm\s+run\s+health/i, 'health command');
requireIn('.codex/instructions.md', /npm\s+run\s+health/i, 'health command');
requireIn('AGENTS.md', /Do\s+not\s+push\s+`?main`?|explicit\s+ship\/deploy\s+approval/i, 'main/prod push policy');

if (!/AI Architect/i.test(combined)) {
  failures.push('prompt surface: missing approved title "AI Architect"');
}

forbidAffirmativeLine(/\bAI Systems Architect\b/i, 'title variant');
forbidAffirmativeLine(/\bSenior AI Architect\b/i, 'title variant');
forbidAffirmativeLine(/Pushing\s+to\s+`?frankxai\/FrankX`?\s+(alone\s+)?deploys/i, 'FrankX production deploy claim');
forbidAffirmativeLine(/Pushing\s+to\s+`?main`?\s+(here\s+)?(ships|deploys)\s+.*production/i, 'FrankX main deploy claim');
forbidAffirmativeLine(/force-push.*frankx\.ai-vercel-website|frankx\.ai-vercel-website.*force-push/i, 'production force-push claim');

if (failures.length > 0) {
  console.error('Platform prompt symmetry check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Platform prompt symmetry check passed (${files.length} prompt files).`);
