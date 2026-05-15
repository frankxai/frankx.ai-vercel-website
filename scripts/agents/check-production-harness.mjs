#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function read(file) {
  try {
    return readFileSync(path.join(root, file), 'utf8');
  } catch {
    return '';
  }
}

function requireFile(file) {
  if (!existsSync(path.join(root, file))) failures.push(`${file}: missing`);
}

function requireText(file, pattern, description) {
  if (!pattern.test(read(file))) failures.push(`${file}: missing ${description}`);
}

for (const file of ['.agent-harness.json', 'AGENTS.md', 'CLAUDE.md', '.codex/instructions.md']) {
  requireFile(file);
}

if (existsSync(path.join(root, '.agent-harness.json'))) {
  let manifest;
  try {
    manifest = JSON.parse(read('.agent-harness.json'));
  } catch {
    failures.push('.agent-harness.json: invalid JSON');
  }
  if (manifest) {
    if (manifest.risk !== 'production') failures.push('.agent-harness.json: risk must be production');
    if (manifest.deployPolicy !== 'vercel-main') failures.push('.agent-harness.json: deployPolicy must be vercel-main');
    if (manifest.globalHooksAllowed !== false) failures.push('.agent-harness.json: globalHooksAllowed must be false');
    for (const file of ['AGENTS.md', 'CLAUDE.md', '.codex/instructions.md']) {
      if (!manifest.agentFiles?.includes(file)) failures.push(`.agent-harness.json: agentFiles missing ${file}`);
    }
  }
}

requireText('CLAUDE.md', /PRODUCTION|Deploys to frankx\.ai|git push origin main\s+# Deploys to frankx\.ai/i, 'production deploy warning');
requireText('CLAUDE.md', /AI Architect/i, 'AI Architect title rule');
requireText('CLAUDE.md', /Never rename working URLs|URL\/SEO Changes/i, 'SEO route safety rule');
requireText('.codex/instructions.md', /Do not push `main`|explicit ship\/deploy instruction/i, 'Codex production push block');
requireText('.codex/instructions.md', /production Vercel repo/i, 'Codex production identity');

if (failures.length > 0) {
  console.error('Production harness check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Production harness check passed.');
