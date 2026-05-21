#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const auditPath = path.join(root, '.frankx', 'machine', 'agent-harness-audit.json');
const githubPath = path.join(root, '.frankx', 'machine', 'github-harness-inventory.json');
const outPath = path.join(root, 'docs', 'ops', 'HARNESS-ROLLOUT-BOARD.md');

function runScript(script) {
  execFileSync(process.execPath, [path.join(root, 'scripts', 'agents', script)], {
    cwd: root,
    stdio: 'inherit',
    windowsHide: true,
  });
}

if (!existsSync(auditPath)) runScript('audit-harness.mjs');
if (!existsSync(githubPath)) runScript('github-harness-inventory.mjs');

const audit = JSON.parse(readFileSync(auditPath, 'utf8'));
const github = JSON.parse(readFileSync(githubPath, 'utf8'));

const laneMap = new Map([
  ['claude-code-config', 'Lane 1: Agent Substrate'],
  ['Starlight-Intelligence-System', 'Lane 1: Agent Substrate'],
  ['agentic-creator-os', 'Lane 1: Agent Substrate'],
  ['Arcanea', 'Lane 1: Agent Substrate'],
  ['frankx.ai-vercel-website', 'Lane 2: Production And Brand'],
  ['frankx-prod-sync', 'Lane 2: Production And Brand'],
  ['gencreator.ai', 'Lane 2: Production And Brand'],
  ['AnimeLegends.ai', 'Lane 2: Production And Brand'],
  ['vibeclubs.ai', 'Lane 2: Production And Brand'],
  ['arcanea.ai', 'Lane 2: Production And Brand'],
  ['arcanea-platform', 'Lane 2: Production And Brand'],
  ['library-os', 'Lane 3: Libraries And Templates'],
  ['arcanea-flow', 'Lane 3: Libraries And Templates'],
  ['arcanea-vault', 'Lane 3: Libraries And Templates'],
  ['arcanea-onchain', 'Lane 3: Libraries And Templates'],
  ['arcanea-nft-forge', 'Lane 3: Libraries And Templates'],
  ['arcanea-templates', 'Lane 3: Libraries And Templates'],
  ['arcanea-chat-template', 'Lane 3: Libraries And Templates'],
  ['arcanea-dashboard-template', 'Lane 3: Libraries And Templates'],
  ['arcanea-mcp-starter', 'Lane 3: Libraries And Templates'],
  ['cosmic-landing-template', 'Lane 3: Libraries And Templates'],
]);

function laneFor(repo) {
  return laneMap.get(repo.name) || (repo.status === 'dormant' ? 'Dormant / Archive' : 'Lane 4: Review Before Promotion');
}

function actionFor(repo) {
  if (!repo.exists) return 'missing local clone';
  if (!repo.manifest.exists) return 'add manifest';
  if (repo.manifest.deployPolicy === 'vercel-main') return 'hold for explicit production approval';
  if (repo.git.dirtyCount > 0) return `review ${repo.git.dirtyBucket || 'dirty'} tree (${repo.git.dirtyCount} files)`;
  if (repo.issues.includes('registry_working_branch_hint_stale')) return `normalize working branch hint (${repo.git.branch})`;
  if (repo.status === 'dormant') return 'keep dormant; no active prompt rollout';
  return 'ready for promotion review';
}

function priorityFor(repo) {
  if (repo.manifest.deployPolicy === 'vercel-main') return 'P0';
  if (repo.git.dirtyBucket === 'runaway' || repo.git.dirtyBucket === 'large') return 'P0';
  if (laneFor(repo).includes('Agent Substrate')) return 'P1';
  if (repo.git.dirtyCount > 0) return 'P1';
  if (repo.issues.length > 0) return 'P2';
  return 'P3';
}

const localRows = audit.repos
  .map((repo) => ({
    lane: laneFor(repo),
    priority: priorityFor(repo),
    repo,
    action: actionFor(repo),
  }))
  .sort((a, b) => (
    a.priority.localeCompare(b.priority) ||
    a.lane.localeCompare(b.lane) ||
    a.repo.name.localeCompare(b.repo.name)
  ));

const localTable = localRows
  .map(({ lane, priority, repo, action }) => {
    const issues = repo.issues.length ? repo.issues.map((issue) => `\`${issue}\``).join('<br>') : '-';
    return `| ${priority} | ${lane} | \`${repo.name}\` | ${repo.git.branch || '-'} | ${repo.git.dirtyCount ?? '-'} | ${repo.git.dirtyBucket || '-'} | ${issues} | ${action} |`;
  })
  .join('\n');

const githubRows = github.repos
  .filter((repo) => repo.shouldInspect)
  .slice(0, 60)
  .map((repo) => {
    const manifest = repo.harness.manifest ? 'Y' : 'N';
    const local = repo.hasLocal ? 'Y' : 'N';
    return `| \`${repo.nameWithOwner}\` | ${repo.classification} | ${repo.visibility} | ${repo.defaultBranchRef?.name || '-'} | ${local} | ${manifest} | ${repo.action} |`;
  })
  .join('\n');

const markdown = `# Harness Rollout Board

Generated: ${new Date().toISOString()}

This board turns the local harness audit and GitHub inventory into a promotion queue. It is intentionally conservative: "ready" means ready for review, not automatic push.

## Summary

| Surface | Count |
| --- | ---: |
| Local registry repos | ${audit.totals.repos} |
| Local harness manifests | ${audit.totals.withHarnessManifest} |
| Local repos with issues | ${audit.totals.issueCount} |
| GitHub repos visible | ${github.totals.githubRepos} |
| GitHub repos needing inspection | ${github.totals.shouldInspect} |
| GitHub default-branch manifests found | ${github.totals.remoteManifest} |

## Local Promotion Queue

| Priority | Lane | Repo | Branch | Dirty | Bucket | Issues | Next action |
| --- | --- | --- | --- | ---: | --- | --- | --- |
${localTable}

## GitHub Classification Queue

These repos are recent, non-archived, non-fork repos that need classification or default-branch harness review.

| Repo | Classification | Visibility | Default | Local | Manifest | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
${githubRows}

## Operating Notes

- Do not push \`main\` or production deploy branches without explicit approval.
- Dirty trees block promotion until the work is understood.
- Backups, forks, old studies, imports, and sensitive private dumps should not receive active prompts by default.
- Agent substrate repos should move first because they define behavior for every other repo.
`;

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, markdown);
console.log(`Harness rollout board written: ${outPath}`);
