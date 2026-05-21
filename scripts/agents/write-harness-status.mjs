#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const auditPath = path.join(root, '.frankx', 'machine', 'agent-harness-audit.json');
const outPath = path.join(root, 'docs', 'ops', 'AGENT-HARNESS-STATUS.md');

function runAuditIfNeeded() {
  if (existsSync(auditPath)) return;
  execFileSync(process.execPath, [path.join(root, 'scripts', 'agents', 'audit-harness.mjs')], {
    cwd: root,
    stdio: 'inherit',
    windowsHide: true,
  });
}

function readAudit() {
  runAuditIfNeeded();
  return JSON.parse(readFileSync(auditPath, 'utf8'));
}

function countBy(rows, key) {
  const counts = new Map();
  for (const row of rows) {
    const value = key(row);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function issueRows(repos) {
  return repos
    .filter((repo) => repo.issues.length > 0)
    .map((repo) => `| \`${repo.name}\` | ${repo.git.branch || '-'} | ${repo.issues.map((issue) => `\`${issue}\``).join('<br>')} |`)
    .join('\n');
}

const audit = readAudit();
const repos = audit.repos;
const activeRepos = repos.filter((repo) => repo.status.includes('active'));
const manifestRepos = repos.filter((repo) => repo.manifest.exists);
const riskRows = countBy(manifestRepos, (repo) => repo.manifest.risk || 'unknown')
  .map(([risk, count]) => `| ${risk} | ${count} |`)
  .join('\n');
const deployRows = countBy(manifestRepos, (repo) => repo.manifest.deployPolicy || 'unknown')
  .map(([policy, count]) => `| ${policy} | ${count} |`)
  .join('\n');

const markdown = `# Agent Harness Status

Generated: ${audit.generatedAt}

This is the operating picture for Frank's multi-agent repo network. It is generated from \`.agent-harness.json\` manifests plus live git/prompt-surface checks.

Machine-level entry points:

- \`C:\\Users\\frank\\AGENTS.md\` tells agents where to start before choosing a repo.
- \`C:\\Users\\frank\\.agent-harness\\\` is the live local global harness folder.
- \`C:\\Users\\frank\\claude-code-config\\harness\\\` is the private Git-tracked copy.

## Coverage

| Surface | Coverage |
| --- | ---: |
| Repos present | ${audit.totals.existing}/${audit.totals.repos} |
| Harness manifests | ${audit.totals.withHarnessManifest}/${audit.totals.repos} |
| Active repos | ${activeRepos.length}/${audit.totals.repos} |
| AGENTS.md | ${audit.totals.withAgents}/${audit.totals.repos} |
| CLAUDE.md | ${audit.totals.withClaude}/${audit.totals.repos} |
| Codex instructions | ${audit.totals.withCodexInstructions}/${audit.totals.repos} |
| Gemini prompts | ${audit.totals.withGeminiPrompt}/${audit.totals.repos} |
| Cursor rules | ${audit.totals.withCursorRules}/${audit.totals.repos} |
| Global Claude issues | ${audit.global.claude.issues.length} |
| Global Codex issues | ${audit.global.codex.issues.length} |

## Risk Split

| Risk | Repos |
| --- | ---: |
${riskRows}

## Deploy Policy Split

| Deploy policy | Repos |
| --- | ---: |
${deployRows}

## What This Enables

- Every active repo declares its risk class, health command, deploy policy, agent instruction files, and global-hook policy.
- Agents can stop guessing repo behavior from names, branch conventions, or stale memory.
- Global hooks stay lightweight and repo-agnostic; repo-specific behavior belongs to repo manifests and local commands.
- Production deploy risk is explicit before an agent edits or pushes.
- The same status model works for Claude Code, Codex, Gemini, Cursor, OpenCode, and launcher scripts.
- Manifest validation is schema-backed through \`schemas/agent-harness.schema.json\`.
- FrankX CI checks local harness manifest validity and prompt symmetry.
- Global aliases are explicit: \`SIS\` means \`Starlight-Intelligence-System\`, \`ACOS\` means \`agentic-creator-os\`, \`FrankX\` means private dev/content, and \`FrankX prod\` means the production deploy repo/worktree.

## Market Language

Use these phrases when explaining the system publicly:

- Production-aware agent harness
- Manifest-driven multi-agent governance
- Hook-safe automation layer
- Cross-agent prompt symmetry
- Repo-local risk and deploy contracts
- Agent-ready engineering substrate

Avoid vague claims like "AI-powered development" unless the mechanism is shown beside it.

## Current Issues

| Repo | Branch | Issues |
| --- | --- | --- |
${issueRows(repos) || '| - | - | None |'}

## Commands

\`\`\`bash
npm run agents:audit
npm run agents:status
npm run agents:prompt-check
npm run health
\`\`\`

PowerShell:

\`\`\`powershell
agent-audit
repo-audit
agent-push-status
agent-clean-status
\`\`\`
`;

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, markdown);
console.log(`Agent harness status written: ${outPath}`);
