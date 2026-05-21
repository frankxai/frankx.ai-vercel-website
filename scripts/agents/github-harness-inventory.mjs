#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const root = process.cwd();
const userHome = os.homedir();
const org = process.argv[2] || 'frankxai';
const outDir = path.join(root, '.frankx', 'machine');
const jsonOut = path.join(outDir, 'github-harness-inventory.json');
const mdOut = path.join(root, 'docs', 'ops', 'GITHUB-HARNESS-INVENTORY.md');
const registryPath = path.join(userHome, 'REPO-REGISTRY.md');

function run(cmd, args, timeout = 120000) {
  return execFileSync(cmd, args, {
    cwd: root,
    timeout,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  }).trim();
}

function readText(file) {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function registryNames() {
  const names = new Set();
  for (const line of readText(registryPath).split(/\r?\n/)) {
    if (!line.startsWith('| `')) continue;
    const cells = line.split('|').map((cell) => cell.trim());
    if (cells.length < 8) continue;
    const name = cells[1]?.match(/`([^`]+)`/)?.[1];
    const status = cells[7] || '';
    if (!name || name === 'Repo') continue;
    if (!/active|dormant|archive-candidate|template|fork/i.test(status)) continue;
    names.add(name.toLowerCase());
  }
  return names;
}

function localRepoNames() {
  const names = new Set();
  for (const entry of pathEntries(userHome)) {
    if (existsSync(path.join(userHome, entry, '.git'))) names.add(entry.toLowerCase());
  }
  return names;
}

function pathEntries(dir) {
  try {
    return execFileSync('powershell.exe', [
      '-NoProfile',
      '-Command',
      `Get-ChildItem -LiteralPath '${dir.replaceAll("'", "''")}' -Force -Directory | ForEach-Object { $_.Name }`,
    ], { encoding: 'utf8', windowsHide: true }).trim().split(/\r?\n/).filter(Boolean);
  } catch {
    return [];
  }
}

function hasRemoteFile(repo, file) {
  try {
    run('gh', ['api', `repos/${repo.nameWithOwner}/contents/${file}`, '--jq', '.path'], 15000);
    return true;
  } catch {
    return false;
  }
}

function classifyRepo(repo) {
  const name = repo.name.toLowerCase();
  if (/backup|documents|desktop|critical|oracle-work|strategy|goals|intelligence$|business/i.test(name)) {
    return { classification: 'backup-sensitive', action: 'classify-only; do not auto-activate agents' };
  }
  if (/template|starter|boilerplate|demo|study|tutorial|fork|copilot|lobe|nextjs-chat|morphic|v0-|payload|commerce/i.test(name)) {
    return { classification: 'study-or-template', action: 'manifest optional; AGENTS only if actively maintained' };
  }
  if (/frankx\.ai-vercel-website|frankx|gencreator|animelegends|vibeclubs|arcanea-ai-app|arcanea-platform|arcanea$|arcanea\.ai/i.test(name)) {
    return { classification: 'product-or-production', action: 'roll out manifest + AGENTS/CLAUDE; protect deploy policy' };
  }
  if (/starlight|sis|agentic-creator-os|acos|claude-code-config|settings|codex|gemini|opencode|agents|skills/i.test(name)) {
    return { classification: 'agent-substrate', action: 'roll out manifest + platform prompt symmetry' };
  }
  if (/library|prompt|engine|vault|flow|mcp|sdk|orchestrator|opencode|nft|infogenius|visual|voice|storage|records|author-os|creator-intelligence|sentinel/i.test(name)) {
    return { classification: 'library-or-tooling', action: 'roll out manifest; AGENTS/CLAUDE if active' };
  }
  if (/workshop|academy|guide|research|peak-performance|investor|reality|second-brain|vibe-os|sound|music/i.test(name)) {
    return { classification: 'content-or-program', action: 'classify risk; add AGENTS only if edited by agents' };
  }
  return { classification: 'needs-human-classification', action: 'inspect before harness rollout' };
}

const registry = registryNames();
const local = localRepoNames();
const repos = JSON.parse(run('gh', [
  'repo',
  'list',
  org,
  '--limit',
  '1000',
  '--json',
  'name,nameWithOwner,visibility,isPrivate,updatedAt,defaultBranchRef,url,isArchived,isFork',
]));

const enriched = repos.map((repo) => {
  const localName = repo.name.toLowerCase();
  const inRegistry = registry.has(localName);
  const hasLocal = local.has(localName);
  const recentlyUpdated = new Date(repo.updatedAt) >= new Date('2026-04-01T00:00:00Z');
  const shouldInspect = !repo.isArchived && !repo.isFork && recentlyUpdated;
  const classification = classifyRepo(repo);
  return {
    ...repo,
    inRegistry,
    hasLocal,
    shouldInspect,
    ...classification,
    harness: shouldInspect ? {
      manifest: hasRemoteFile(repo, '.agent-harness.json'),
      agents: hasRemoteFile(repo, 'AGENTS.md'),
      claude: hasRemoteFile(repo, 'CLAUDE.md'),
    } : null,
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  org,
  totals: {
    githubRepos: enriched.length,
    inRegistry: enriched.filter((repo) => repo.inRegistry).length,
    localClone: enriched.filter((repo) => repo.hasLocal).length,
    shouldInspect: enriched.filter((repo) => repo.shouldInspect).length,
    remoteManifest: enriched.filter((repo) => repo.harness?.manifest).length,
    remoteAgents: enriched.filter((repo) => repo.harness?.agents).length,
    remoteClaude: enriched.filter((repo) => repo.harness?.claude).length,
  },
  classifications: enriched.reduce((acc, repo) => {
    acc[repo.classification] = (acc[repo.classification] || 0) + 1;
    return acc;
  }, {}),
  repos: enriched,
};

const classificationRows = Object.entries(summary.classifications)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, count]) => `| ${name} | ${count} |`)
  .join('\n');

const inspectRows = enriched
  .filter((repo) => repo.shouldInspect && (!repo.inRegistry || !repo.harness?.manifest || !repo.harness?.agents))
  .slice(0, 80)
  .map((repo) => `| \`${repo.nameWithOwner}\` | ${repo.classification} | ${repo.action} | ${repo.visibility} | ${repo.defaultBranchRef?.name || '-'} | ${repo.inRegistry ? 'Y' : 'N'} | ${repo.hasLocal ? 'Y' : 'N'} | ${repo.harness?.manifest ? 'Y' : 'N'} | ${repo.harness?.agents ? 'Y' : 'N'} | ${repo.updatedAt} |`)
  .join('\n');

const markdown = `# GitHub Harness Inventory

Generated: ${summary.generatedAt}

Scope: \`${org}\` repositories visible to the authenticated GitHub account.

## Summary

| Metric | Count |
| --- | ---: |
| GitHub repos visible | ${summary.totals.githubRepos} |
| In local REPO-REGISTRY.md | ${summary.totals.inRegistry} |
| Local clones found | ${summary.totals.localClone} |
| Recent non-archived non-fork repos to inspect | ${summary.totals.shouldInspect} |
| Remote .agent-harness.json found | ${summary.totals.remoteManifest} |
| Remote AGENTS.md found | ${summary.totals.remoteAgents} |
| Remote CLAUDE.md found | ${summary.totals.remoteClaude} |

## Classification Split

| Classification | Repos |
| --- | ---: |
${classificationRows}

## Needs Classification Or Harness

| Repo | Classification | Recommended action | Visibility | Default | Registry | Local | Manifest | AGENTS | Updated |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${inspectRows || '| - | - | - | - | - | - | - | - | - | - |'}

## Interpretation

The local agent harness is mature for the 36 repos in \`REPO-REGISTRY.md\`. This inventory is broader: it exposes GitHub repos that may need classification, archival, or lightweight harness files if they are still operational.
`;

mkdirSync(outDir, { recursive: true });
mkdirSync(path.dirname(mdOut), { recursive: true });
writeFileSync(jsonOut, `${JSON.stringify(summary, null, 2)}\n`);
writeFileSync(mdOut, markdown);

console.log(`GitHub harness inventory written: ${mdOut}`);
console.log(`GitHub repos visible: ${summary.totals.githubRepos}`);
console.log(`Need inspection: ${summary.totals.shouldInspect}`);
console.log(`Remote manifests found: ${summary.totals.remoteManifest}`);
