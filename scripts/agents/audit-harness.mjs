#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { readRegistry } from './repo-registry.mjs';

const root = process.cwd();
const userHome = os.homedir();
const outDir = path.join(root, '.frankx', 'machine');
const outPath = path.join(outDir, 'agent-harness-audit.json');
const manifestName = '.agent-harness.json';
const allowedRisk = new Set(['production', 'private', 'library', 'template', 'sensitive']);
const allowedDeployPolicy = new Set(['manual', 'none', 'vercel-main']);

function readText(file) {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function run(cmd, args, cwd, timeout = 3000) {
  try {
    return execFileSync(cmd, args, {
      cwd,
      timeout,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      windowsHide: true,
    }).trim();
  } catch {
    return '';
  }
}

function packageJson(repoPath) {
  const file = path.join(repoPath, 'package.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readText(file));
  } catch {
    return null;
  }
}

function readManifest(repoPath) {
  const file = path.join(repoPath, manifestName);
  if (!existsSync(file)) {
    return { exists: false, path: file, data: null, errors: [] };
  }
  try {
    return {
      exists: true,
      path: file,
      data: JSON.parse(readText(file)),
      errors: [],
    };
  } catch {
    return { exists: true, path: file, data: null, errors: ['invalid_json'] };
  }
}

function validateManifest(manifest) {
  const errors = [...manifest.errors];
  const data = manifest.data;
  if (!manifest.exists) {
    errors.push('missing_harness_manifest');
    return errors;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    errors.push('invalid_harness_manifest');
    return errors;
  }
  if (!allowedRisk.has(data.risk)) errors.push('invalid_manifest_risk');
  if (typeof data.health !== 'string' || data.health.trim() === '') errors.push('invalid_manifest_health');
  if (!Array.isArray(data.agentFiles) || data.agentFiles.some((file) => typeof file !== 'string' || file.trim() === '')) {
    errors.push('invalid_manifest_agentFiles');
  }
  if (!allowedDeployPolicy.has(data.deployPolicy)) errors.push('invalid_manifest_deployPolicy');
  if (typeof data.globalHooksAllowed !== 'boolean') errors.push('invalid_manifest_globalHooksAllowed');
  if (data.globalHooksAllowed === true) errors.push('global_hooks_allowed_by_manifest');
  if (data.globalHooks && data.globalHooks !== false) {
    if (typeof data.globalHooks !== 'object' || Array.isArray(data.globalHooks)) {
      errors.push('invalid_manifest_globalHooks');
    } else if (data.globalHooks.maxTimeoutMs > 2000) {
      errors.push('manifest_global_hook_timeout_too_large');
    }
  }
  return errors;
}

function promptSurfaces(repoPath) {
  const cursorRules = path.join(repoPath, '.cursor', 'rules');
  return {
    agents: existsSync(path.join(repoPath, 'AGENTS.md')),
    claude: existsSync(path.join(repoPath, 'CLAUDE.md')),
    codex: existsSync(path.join(repoPath, '.codex', 'instructions.md')),
    gemini: existsSync(path.join(repoPath, '.gemini', 'GEMINI.md')),
    cursor: existsSync(cursorRules),
    opencode: existsSync(path.join(repoPath, 'opencode.json')) || existsSync(path.join(repoPath, '.opencode')),
  };
}

function repoGit(repoPath) {
  if (!existsSync(path.join(repoPath, '.git'))) {
    return { isGit: false, branch: '', dirtyCount: null };
  }
  const branch = run('git', ['-c', 'core.fsmonitor=false', 'branch', '--show-current'], repoPath);
  const status = run('git', ['-c', 'core.fsmonitor=false', 'status', '--short'], repoPath, 5000);
  return {
    isGit: true,
    branch,
    dirtyCount: status ? status.split(/\r?\n/).filter(Boolean).length : 0,
  };
}

function dirtyBucket(dirtyCount) {
  if (dirtyCount === null || dirtyCount === undefined) return null;
  if (dirtyCount === 0) return 'clean';
  if (dirtyCount <= 25) return 'small';
  if (dirtyCount <= 200) return 'medium';
  if (dirtyCount <= 1000) return 'large';
  return 'runaway';
}

function repoRecord(repo) {
  const exists = existsSync(repo.path);
  const pkg = exists ? packageJson(repo.path) : null;
  const surfaces = exists ? promptSurfaces(repo.path) : {};
  const git = exists ? repoGit(repo.path) : { isGit: false, branch: '', dirtyCount: null };
  git.dirtyBucket = dirtyBucket(git.dirtyCount);
  const manifest = exists ? readManifest(repo.path) : { exists: false, path: path.join(repo.path, manifestName), data: null, errors: [] };
  const manifestIssues = exists ? validateManifest(manifest) : [];
  const scripts = pkg?.scripts || {};
  const manifestHealth = manifest.data?.health?.trim() || '';
  const manifestAgentFiles = Array.isArray(manifest.data?.agentFiles) ? manifest.data.agentFiles : [];
  const requiresAgentSurface = repo.status.includes('active') || manifestAgentFiles.includes('AGENTS.md') || manifestAgentFiles.includes('CLAUDE.md');
  const hasHealthScript = Boolean(
    manifestHealth ||
    repo.healthCmd ||
    scripts.health ||
      scripts['ops:health'] ||
      scripts.test ||
      scripts.build ||
      scripts['type-check'],
  );
  const issues = [];

  if (!exists) issues.push('missing_path');
  for (const issue of manifestIssues) issues.push(issue);
  for (const file of manifestAgentFiles) {
    if (exists && !existsSync(path.join(repo.path, file))) {
      issues.push(`missing_agent_file:${file}`);
    }
  }
  if (exists && requiresAgentSurface && !surfaces.agents) issues.push('missing_AGENTS.md');
  if (exists && requiresAgentSurface && !surfaces.claude) issues.push('missing_CLAUDE.md');
  if (exists && !hasHealthScript) issues.push('missing_health_or_test_script');
  if (git.isGit && git.dirtyBucket === 'medium') issues.push('dirty_worktree_medium');
  if (git.isGit && git.dirtyBucket === 'large') issues.push('dirty_worktree_large');
  if (git.isGit && git.dirtyBucket === 'runaway') issues.push('dirty_worktree_runaway');
  if (
    git.isGit &&
    repo.branchHint &&
    /\bworking:/i.test(repo.branchHint) &&
    git.branch &&
    !repo.branchHint.toLowerCase().includes(git.branch.toLowerCase())
  ) {
    issues.push('registry_working_branch_hint_stale');
  }

  return {
    name: repo.name,
    path: repo.path,
    status: repo.status,
    healthCmd: manifestHealth || repo.healthCmd,
    exists,
    manifest: {
      exists: manifest.exists,
      path: manifest.path,
      risk: manifest.data?.risk || null,
      deployPolicy: manifest.data?.deployPolicy || null,
      globalHooksAllowed: manifest.data?.globalHooksAllowed ?? null,
      agentFiles: manifestAgentFiles,
    },
    git,
    promptSurfaces: surfaces,
    packageManager: existsSync(path.join(repo.path, 'pnpm-lock.yaml')) ? 'pnpm' : existsSync(path.join(repo.path, 'package-lock.json')) ? 'npm' : null,
    hasHealthScript,
    issues,
  };
}

function flattenHooks(hooks) {
  const rows = [];
  for (const [eventName, groups] of Object.entries(hooks || {})) {
    for (const group of groups || []) {
      for (const hook of group.hooks || []) {
        rows.push({
          eventName,
          command: hook.command || '',
          timeout: typeof hook.timeout === 'number' ? hook.timeout : null,
          async: Boolean(hook.async),
        });
      }
    }
  }
  return rows;
}

function globalClaudeAudit() {
  const settingsPath = path.join(userHome, '.claude', 'settings.json');
  const result = {
    settingsPath,
    exists: existsSync(settingsPath),
    jsonValid: false,
    hooks: [],
    issues: [],
  };
  if (!result.exists) {
    result.issues.push('missing_global_claude_settings');
    return result;
  }
  try {
    const settings = JSON.parse(readText(settingsPath));
    result.jsonValid = true;
    result.hooks = flattenHooks(settings.hooks);
    for (const hook of result.hooks) {
      if (hook.timeout !== null && hook.timeout > 30) {
        result.issues.push(`hook_timeout_too_large:${hook.eventName}:${hook.timeout}`);
      }
      if (/Arcanea|FrankX|Starlight-Intelligence-System/i.test(hook.command) && hook.eventName !== 'SessionStart' && hook.eventName !== 'Stop') {
        result.issues.push(`repo_specific_global_hook:${hook.eventName}`);
      }
      if (/Arcanea/i.test(hook.command)) {
        result.issues.push(`arcanea_hook_global:${hook.eventName}`);
      }
    }
  } catch {
    result.issues.push('invalid_global_claude_settings_json');
  }
  return result;
}

function globalCodexAudit() {
  const configPath = path.join(userHome, '.codex', 'config.toml');
  const text = readText(configPath);
  const mcpServers = [...text.matchAll(/^\[mcp_servers\.([^\].]+)\]/gm)].map((m) => m[1]);
  const trustedProjects = [...text.matchAll(/^\[projects\.'([^']+)'\]/gm)].map((m) => m[1]);
  const issues = [];
  if (!existsSync(configPath)) issues.push('missing_codex_config');
  if (!mcpServers.includes('starlight-substrate')) issues.push('missing_starlight_substrate_mcp');
  if (!mcpServers.includes('memory-bus')) issues.push('missing_memory_bus_mcp');
  return {
    configPath,
    exists: existsSync(configPath),
    mcpServers,
    trustedProjects,
    issues,
  };
}

const registry = readRegistry();
const repos = registry.repos.map(repoRecord);
const summary = {
  generatedAt: new Date().toISOString(),
  repoRegistry: registry.source,
  totals: {
    repos: repos.length,
    existing: repos.filter((r) => r.exists).length,
    withAgents: repos.filter((r) => r.promptSurfaces.agents).length,
    withClaude: repos.filter((r) => r.promptSurfaces.claude).length,
    withCodexInstructions: repos.filter((r) => r.promptSurfaces.codex).length,
    withGeminiPrompt: repos.filter((r) => r.promptSurfaces.gemini).length,
    withCursorRules: repos.filter((r) => r.promptSurfaces.cursor).length,
    withHarnessManifest: repos.filter((r) => r.manifest.exists).length,
    issueCount: repos.reduce((sum, r) => sum + r.issues.length, 0),
  },
  global: {
    claude: globalClaudeAudit(),
    codex: globalCodexAudit(),
  },
  repos,
};

summary.recommendedNext = repos
  .filter((r) => r.exists)
  .filter((r) => r.issues.includes('missing_AGENTS.md') || r.issues.includes('missing_CLAUDE.md'))
  .sort((a, b) => {
    const active = Number(b.status.includes('active')) - Number(a.status.includes('active'));
    if (active !== 0) return active;
    const issueDelta = b.issues.length - a.issues.length;
    if (issueDelta !== 0) return issueDelta;
    return a.name.localeCompare(b.name);
  })
  .slice(0, 12)
  .map((r) => ({
    repo: r.name,
    missing: r.issues.filter((issue) => issue === 'missing_AGENTS.md' || issue === 'missing_CLAUDE.md'),
    healthCmd: r.healthCmd,
  }));

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`);

const rows = repos
  .filter((r) => r.issues.length > 0)
  .slice(0, 20)
  .map((r) => `- ${r.name}: ${r.issues.join(', ')}`)
  .join('\n');

console.log(`Agent harness audit written: ${outPath}`);
console.log(`Repos: ${summary.totals.existing}/${summary.totals.repos} present`);
console.log(`AGENTS.md: ${summary.totals.withAgents}/${summary.totals.repos}`);
console.log(`CLAUDE.md: ${summary.totals.withClaude}/${summary.totals.repos}`);
console.log(`Codex instructions: ${summary.totals.withCodexInstructions}/${summary.totals.repos}`);
console.log(`Gemini prompts: ${summary.totals.withGeminiPrompt}/${summary.totals.repos}`);
console.log(`Harness manifests: ${summary.totals.withHarnessManifest}/${summary.totals.repos}`);
console.log(`Global Claude issues: ${summary.global.claude.issues.length}`);
console.log(`Global Codex issues: ${summary.global.codex.issues.length}`);
if (rows) {
  console.log('\nTop repo issues:');
  console.log(rows);
}

if (summary.recommendedNext.length > 0) {
  console.log('\nNext harness rollout:');
  for (const item of summary.recommendedNext.slice(0, 8)) {
    console.log(`- ${item.repo}: ${item.missing.join(', ')}; verify with ${item.healthCmd || 'git status'}`);
  }
}
