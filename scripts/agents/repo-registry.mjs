#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const userHome = os.homedir();
const registryJsonPath = path.join(userHome, 'repo-registry.json');
const registryMdPath = path.join(userHome, 'REPO-REGISTRY.md');
const registryMirrorPath = path.join(userHome, 'claude-code-config', 'harness', 'repo-registry.json');

function readText(file) {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function tierFromHeading(heading) {
  if (/tier 1/i.test(heading)) return 'production';
  if (/tier 2/i.test(heading)) return 'utility';
  if (/tier 3/i.test(heading)) return 'template-study';
  return 'unknown';
}

function cleanCell(cell) {
  return cell
    .trim()
    .replaceAll('**', '')
    .replaceAll('✅', '')
    .trim();
}

function stripTicks(cell) {
  return cleanCell(cell).replaceAll('`', '').trim();
}

function parseMarkdownRegistry(text) {
  const repos = [];
  let currentTier = 'unknown';

  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith('## Tier')) {
      currentTier = tierFromHeading(line);
      continue;
    }
    if (!line.startsWith('| `')) continue;
    const cells = line.split('|').map((cell) => cell.trim());
    if (cells.length < 8) continue;
    const name = cells[1]?.match(/`([^`]+)`/)?.[1];
    if (!name || name === 'Repo') continue;

    repos.push({
      name,
      tier: currentTier,
      branch: stripTicks(cells[2]),
      purpose: cleanCell(cells[3]),
      deploysTo: cleanCell(cells[4]),
      healthCmd: stripTicks(cells[5]),
      agentStatus: cleanCell(cells[6]),
      status: cleanCell(cells[7]),
    });
  }

  return repos;
}

export function readRegistry() {
  if (existsSync(registryJsonPath)) {
    const parsed = JSON.parse(readText(registryJsonPath));
    return {
      source: registryJsonPath,
      repos: (parsed.repos || []).map((repo) => ({
        name: repo.name,
        branchHint: repo.branch || '',
        purpose: repo.purpose || '',
        deploysTo: repo.deploysTo || '',
        healthCmd: repo.healthCmd || '',
        agentsColumn: repo.agentStatus || '',
        status: repo.status || '',
        tier: repo.tier || 'unknown',
        path: path.join(userHome, repo.name),
      })),
    };
  }

  return {
    source: registryMdPath,
    repos: parseMarkdownRegistry(readText(registryMdPath)).map((repo) => ({
      ...repo,
      branchHint: repo.branch,
      agentsColumn: repo.agentStatus,
      path: path.join(userHome, repo.name),
    })),
  };
}

function registryJsonFromMarkdown() {
  const repos = parseMarkdownRegistry(readText(registryMdPath));
  return {
    version: 1,
    updated: new Date().toISOString().slice(0, 10),
    home: userHome,
    sourceMarkdown: registryMdPath,
    generatedBy: 'FrankX/scripts/agents/repo-registry.mjs',
    repos,
  };
}

function renderMarkdown(registry) {
  const groups = [
    ['production', 'Tier 1 — Production-deploying repos (treat as load-bearing)'],
    ['utility', 'Tier 2 — Active utility / sub-projects'],
    ['template-study', 'Tier 3 — Templates / starters / studies (low-touch)'],
    ['unknown', 'Tier 4 — Needs classification'],
  ];

  const lines = [
    "# Frank's Repo Registry",
    '',
    '_Generated from `C:\\Users\\frank\\repo-registry.json`. Edit JSON first, then run `npm run agents:registry-render` from FrankX._',
    '',
    `**Last verified:** ${registry.updated || new Date().toISOString().slice(0, 10)}`,
    `**Total repos audited:** ${(registry.repos || []).length}`,
    '**Machine harness:** `C:\\Users\\frank\\AGENTS.md` -> `C:\\Users\\frank\\.agent-harness\\` (tracked copy: `C:\\Users\\frank\\claude-code-config\\harness\\`)',
    '',
    '---',
    '',
    '## How to read this',
    '',
    'Global aliases before repo-local rules:',
    '',
    '- `SIS` / `Starlight` = `Starlight-Intelligence-System`',
    '- `ACOS` = `agentic-creator-os`',
    '- `FrankX` = private dev/content repo, not production',
    '- `FrankX prod` / `production` = `frankx.ai-vercel-website` or `frankx-prod-sync`',
    '- `Arcanea` = `Arcanea` unless a specific Arcanea repo is named',
    '',
  ];

  for (const [tier, heading] of groups) {
    const repos = (registry.repos || []).filter((repo) => (repo.tier || 'unknown') === tier);
    if (repos.length === 0) continue;
    lines.push(`## ${heading}`, '');
    lines.push('| Repo | Branch | Purpose | Deploys to | Health cmd | AGENTS.md | Status |');
    lines.push('| --- | --- | --- | --- | --- | --- | --- |');
    for (const repo of repos) {
      lines.push(`| \`${repo.name}\` | ${repo.branch || ''} | ${repo.purpose || ''} | ${repo.deploysTo || ''} | \`${repo.healthCmd || 'git status'}\` | ${repo.agentStatus || ''} | ${repo.status || ''} |`);
    }
    lines.push('');
  }

  lines.push('---', '', '## Update Rules', '');
  lines.push('- Edit `C:\\Users\\frank\\repo-registry.json` first.');
  lines.push('- Run `npm run agents:registry-render` from FrankX to regenerate this markdown view.');
  lines.push('- Run `npm run agents:manifest-check:all` after adding or removing repos.');
  lines.push('- Do not delete a repo row for 90 days after deprecation; move it to dormant/archive status first.');
  lines.push('', '_End of generated registry._', '');
  return lines.join('\n');
}

function validateRegistry(registry) {
  const errors = [];
  const names = new Set();
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) errors.push('registry root must be an object');
  if (!Array.isArray(registry.repos)) errors.push('registry.repos must be an array');

  for (const [index, repo] of (registry.repos || []).entries()) {
    if (!repo.name || typeof repo.name !== 'string') errors.push(`repos[${index}].name is required`);
    if (names.has(repo.name)) errors.push(`duplicate repo: ${repo.name}`);
    names.add(repo.name);
    for (const key of ['tier', 'branch', 'purpose', 'deploysTo', 'healthCmd', 'agentStatus', 'status']) {
      if (key in repo && typeof repo[key] !== 'string') errors.push(`${repo.name || `repos[${index}]`}.${key} must be a string`);
    }
  }

  return errors;
}

function main() {
  const command = process.argv[2] || 'check';

  if (command === 'init') {
    const registry = registryJsonFromMarkdown();
    mkdirSync(path.dirname(registryJsonPath), { recursive: true });
    writeFileSync(registryJsonPath, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`Repo registry JSON written: ${registryJsonPath}`);
  } else if (command === 'render') {
    const registry = JSON.parse(readText(registryJsonPath));
    const errors = validateRegistry(registry);
    if (errors.length > 0) {
      console.error('Repo registry validation failed:');
      for (const error of errors) console.error(`- ${error}`);
      process.exit(1);
    }
    writeFileSync(registryMdPath, renderMarkdown(registry));
    console.log(`Repo registry markdown written: ${registryMdPath}`);
  } else if (command === 'mirror') {
    const registry = JSON.parse(readText(registryJsonPath));
    const errors = validateRegistry(registry);
    if (errors.length > 0) {
      console.error('Repo registry validation failed:');
      for (const error of errors) console.error(`- ${error}`);
      process.exit(1);
    }
    mkdirSync(path.dirname(registryMirrorPath), { recursive: true });
    writeFileSync(registryMirrorPath, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`Repo registry mirror written: ${registryMirrorPath}`);
  } else if (command === 'check') {
    const registry = existsSync(registryJsonPath) ? JSON.parse(readText(registryJsonPath)) : registryJsonFromMarkdown();
    const errors = validateRegistry(registry);
    if (errors.length > 0) {
      console.error('Repo registry validation failed:');
      for (const error of errors) console.error(`- ${error}`);
      process.exit(1);
    }
    console.log(`Repo registry OK (${registry.repos.length} repos, source: ${existsSync(registryJsonPath) ? registryJsonPath : registryMdPath})`);
  } else {
    console.error(`Unknown command: ${command}`);
    console.error('Usage: node scripts/agents/repo-registry.mjs [check|init|render|mirror]');
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
