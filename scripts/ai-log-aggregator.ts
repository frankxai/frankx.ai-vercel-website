#!/usr/bin/env npx tsx
/**
 * AI Session Log Aggregator
 *
 * Cross-repository commit aggregation and intelligent session logging.
 * Part of the FrankX AI Session Logging System.
 *
 * Usage:
 *   npx tsx scripts/ai-log-aggregator.ts [options]
 *
 * Options:
 *   --since <time>     Time range (default: "24 hours ago")
 *   --project <name>   Focus on specific project
 *   --quick            Skip AI summarization
 *   --daily            24-hour report mode
 *   --weekly           7-day report mode
 *   --json             Output JSON instead of markdown
 */

import { execFileSync, ExecFileSyncOptions } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const REPOS_PATH = '/mnt/c/Users/Frank/.ai-logs/repos.yaml';
const GLOBAL_LOG_PATH = '/mnt/c/Users/Frank/docs/AI_GLOBAL_SESSIONS.md';
const SESSIONS_DIR = '/mnt/c/Users/Frank/.ai-logs/sessions';

interface Repository {
  name: string;
  path: string;
  category: string;
  priority: number;
  status: string;
  changelog?: boolean;
  private?: boolean;
  description?: string;
}

interface Commit {
  hash: string;
  message: string;
  author: string;
  date: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
  repo: string;
  category?: string;
}

interface RepoReport {
  name: string;
  commits: Commit[];
  stats: {
    totalCommits: number;
    filesChanged: number;
    insertions: number;
    deletions: number;
  };
}

interface SessionReport {
  timestamp: string;
  dateRange: { start: string; end: string };
  repos: RepoReport[];
  totals: {
    commits: number;
    repos: number;
    filesChanged: number;
    insertions: number;
    deletions: number;
  };
  categories: Record<string, number>;
  summary?: string;
}

// ============================================================================
// SAFE GIT EXECUTION (using execFileSync - no shell injection risk)
// ============================================================================

function safeGit(repoPath: string, args: string[]): string {
  const options: ExecFileSyncOptions = {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
    cwd: repoPath,
    stdio: ['pipe', 'pipe', 'pipe'],
  };

  try {
    return execFileSync('git', args, options) as string;
  } catch {
    return '';
  }
}

// ============================================================================
// REPOSITORY DISCOVERY
// ============================================================================

function loadRepositories(): Repository[] {
  // Hardcoded primary repositories for reliability
  const basePath = '/mnt/c/Users/Frank';
  const defaultRepos: Repository[] = [
    { name: 'FrankX', path: `${basePath}/FrankX`, category: 'website', priority: 1, status: 'active' },
    { name: 'FrankX-Production', path: `${basePath}/FrankX/.worktrees/vercel-ui-ux`, category: 'website', priority: 1, status: 'active' },
    { name: 'Arcanea', path: `${basePath}/Arcanea`, category: 'game', priority: 1, status: 'active' },
    { name: 'oracle-work', path: `${basePath}/oracle-work`, category: 'professional', priority: 2, status: 'active' },
    { name: 'claude-mem', path: `${basePath}/claude-mem`, category: 'tool', priority: 2, status: 'active' },
    { name: 'vibe-os', path: `${basePath}/vibe-os`, category: 'product', priority: 2, status: 'active' },
    { name: 'AI Architect Academy', path: `${basePath}/AI Architect Academy`, category: 'content', priority: 2, status: 'active' },
    { name: 'AI Music Academy', path: `${basePath}/AI Music Academy`, category: 'content', priority: 2, status: 'active' },
    { name: 'aicoe-core', path: `${basePath}/aicoe-core`, category: 'tool', priority: 2, status: 'active' },
    { name: 'oci-ai-architect', path: `${basePath}/oci-ai-architect`, category: 'professional', priority: 2, status: 'active' },
    { name: 'arcanea-core', path: `${basePath}/arcanea-core`, category: 'game', priority: 3, status: 'active' },
    { name: 'arcanea-mobile', path: `${basePath}/arcanea-mobile`, category: 'game', priority: 3, status: 'active' },
    { name: 'arcanea-opencode', path: `${basePath}/arcanea-opencode`, category: 'game', priority: 3, status: 'active' },
  ];

  return defaultRepos.filter(repo => fs.existsSync(path.join(repo.path, '.git')));
}

// ============================================================================
// GIT OPERATIONS
// ============================================================================

function getCommits(repoPath: string, since: string): Commit[] {
  const format = '%H|%s|%an|%aI';
  const output = safeGit(repoPath, [
    'log',
    `--since=${since}`,
    `--pretty=format:${format}`,
    '--no-merges'
  ]).trim();

  if (!output) return [];

  return output.split('\n').map(line => {
    const [fullHash, message, author, date] = line.split('|');
    const hash = fullHash.substring(0, 7);
    const stats = getCommitStats(repoPath, fullHash);

    return {
      hash,
      message: message || '',
      author: author || '',
      date: date || '',
      filesChanged: stats.files,
      insertions: stats.insertions,
      deletions: stats.deletions,
      repo: path.basename(repoPath),
      category: categorizeCommit(message || ''),
    };
  });
}

function getCommitStats(repoPath: string, hash: string): { files: number; insertions: number; deletions: number } {
  const output = safeGit(repoPath, ['diff', '--shortstat', `${hash}^`, hash]);

  const filesMatch = output.match(/(\d+) files? changed/);
  const insertMatch = output.match(/(\d+) insertions?\(\+\)/);
  const deleteMatch = output.match(/(\d+) deletions?\(-\)/);

  return {
    files: filesMatch ? parseInt(filesMatch[1]) : 0,
    insertions: insertMatch ? parseInt(insertMatch[1]) : 0,
    deletions: deleteMatch ? parseInt(deleteMatch[1]) : 0,
  };
}

function categorizeCommit(message: string): string {
  const lower = message.toLowerCase();
  if (lower.startsWith('feat')) return 'feature';
  if (lower.startsWith('fix')) return 'fix';
  if (lower.startsWith('docs')) return 'docs';
  if (lower.startsWith('refactor')) return 'refactor';
  if (lower.startsWith('test')) return 'test';
  if (lower.startsWith('chore')) return 'chore';
  if (lower.startsWith('style')) return 'style';
  if (lower.startsWith('perf')) return 'perf';
  return 'other';
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

function generateReport(repos: Repository[], since: string): SessionReport {
  const now = new Date();
  const repoReports: RepoReport[] = [];
  const categories: Record<string, number> = {};

  let totalCommits = 0;
  let totalFiles = 0;
  let totalInsertions = 0;
  let totalDeletions = 0;

  for (const repo of repos) {
    if (repo.status !== 'active') continue;

    const commits = getCommits(repo.path, since);
    if (commits.length === 0) continue;

    const stats = {
      totalCommits: commits.length,
      filesChanged: commits.reduce((sum, c) => sum + c.filesChanged, 0),
      insertions: commits.reduce((sum, c) => sum + c.insertions, 0),
      deletions: commits.reduce((sum, c) => sum + c.deletions, 0),
    };

    repoReports.push({ name: repo.name, commits, stats });

    totalCommits += stats.totalCommits;
    totalFiles += stats.filesChanged;
    totalInsertions += stats.insertions;
    totalDeletions += stats.deletions;

    for (const commit of commits) {
      const cat = commit.category || 'other';
      categories[cat] = (categories[cat] || 0) + 1;
    }
  }

  return {
    timestamp: now.toISOString(),
    dateRange: { start: since, end: now.toISOString() },
    repos: repoReports,
    totals: {
      commits: totalCommits,
      repos: repoReports.length,
      filesChanged: totalFiles,
      insertions: totalInsertions,
      deletions: totalDeletions,
    },
    categories,
  };
}

// ============================================================================
// OUTPUT FORMATTERS
// ============================================================================

function formatMarkdown(report: SessionReport): string {
  const lines: string[] = [];
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0].substring(0, 5);

  lines.push('\n---\n');
  lines.push(`## SESSION: Cross-Repo - ${date} ${time}`);
  lines.push(`**Date**: ${date} ${time}`);
  lines.push(`**Repos Active**: ${report.totals.repos}`);
  lines.push(`**Total Commits**: ${report.totals.commits}`);
  lines.push('');
  lines.push('### Summary');
  lines.push(`Development session spanning ${report.totals.repos} repositories with ${report.totals.commits} commits.`);
  lines.push(`Changed ${report.totals.filesChanged} files (+${report.totals.insertions} / -${report.totals.deletions} lines).`);
  lines.push('');
  lines.push('### Commits by Repository\n');

  for (const repo of report.repos) {
    lines.push(`#### ${repo.name} (${repo.stats.totalCommits} commits)`);
    lines.push('| Hash | Message | Files |');
    lines.push('|------|---------|-------|');

    for (const commit of repo.commits.slice(0, 10)) {
      const shortMsg = commit.message.length > 50 ? commit.message.substring(0, 47) + '...' : commit.message;
      lines.push(`| ${commit.hash} | ${shortMsg} | ${commit.filesChanged} |`);
    }
    if (repo.commits.length > 10) {
      lines.push(`| ... | *${repo.commits.length - 10} more* | ... |`);
    }
    lines.push('');
  }

  lines.push('### Metrics');
  lines.push(`- Commits: ${report.totals.commits}`);
  lines.push(`- Files: ${report.totals.filesChanged}`);
  lines.push(`- Lines: +${report.totals.insertions} / -${report.totals.deletions}`);
  lines.push('\n---\n');

  return lines.join('\n');
}

function formatTerminal(report: SessionReport): string {
  const lines: string[] = [];
  const w = 70;

  lines.push('═'.repeat(w));
  lines.push('  AI SESSION LOG - ' + new Date().toISOString().split('T')[0]);
  lines.push('═'.repeat(w));
  lines.push('');
  lines.push('  SUMMARY');
  lines.push('  ' + '─'.repeat(w - 4));
  lines.push(`  ${report.totals.repos} repos | ${report.totals.commits} commits | ${report.totals.filesChanged} files`);
  lines.push(`  +${report.totals.insertions} lines | -${report.totals.deletions} lines`);
  lines.push('');
  lines.push('  REPOSITORY ACTIVITY');
  lines.push('  ' + '─'.repeat(w - 4));

  const max = Math.max(...report.repos.map(r => r.stats.totalCommits), 1);
  for (const repo of report.repos) {
    const pct = repo.stats.totalCommits / max;
    const barLen = Math.round(pct * 20);
    const bar = '█'.repeat(barLen) + '░'.repeat(20 - barLen);
    const name = repo.name.substring(0, 18).padEnd(18);
    lines.push(`  ${name} ${bar}  ${repo.stats.totalCommits} commits`);
  }

  lines.push('');
  lines.push('═'.repeat(w));
  return lines.join('\n');
}

// ============================================================================
// FILE WRITERS
// ============================================================================

function appendToGlobalLog(markdown: string): void {
  try {
    fs.appendFileSync(GLOBAL_LOG_PATH, markdown);
    console.log(`✓ Appended to ${GLOBAL_LOG_PATH}`);
  } catch (error) {
    console.error(`✗ Failed to append: ${error}`);
  }
}

function saveSessionArchive(report: SessionReport): void {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const t = now.toTimeString().split(' ')[0].replace(/:/g, '-');

  const dir = path.join(SESSIONS_DIR, String(y), m);
  const file = path.join(dir, `session-${y}-${m}-${d}-${t}.json`);

  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(report, null, 2));
    console.log(`✓ Saved archive to ${file}`);
  } catch (error) {
    console.error(`✗ Failed to save archive: ${error}`);
  }
}

// ============================================================================
// MAIN
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  let since = '24 hours ago';
  let json = false;
  let project: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--since' && args[i + 1]) { since = args[i + 1]; i++; }
    else if (args[i] === '--daily') since = '24 hours ago';
    else if (args[i] === '--weekly') since = '7 days ago';
    else if (args[i] === '--json') json = true;
    else if (args[i] === '--project' && args[i + 1]) { project = args[i + 1]; i++; }
  }

  return { since, json, project };
}

async function main() {
  console.log('🔍 AI Session Log Aggregator\n');

  const { since, json, project } = parseArgs();

  console.log('📂 Loading repositories...');
  let repos = loadRepositories();

  if (project) {
    repos = repos.filter(r => r.name.toLowerCase().includes(project.toLowerCase()));
    console.log(`   Filtered to ${repos.length} repos matching "${project}"`);
  }

  console.log(`   Found ${repos.length} repositories\n`);

  console.log(`📊 Scanning commits since "${since}"...`);
  const report = generateReport(repos, since);

  if (report.totals.commits === 0) {
    console.log('\n⚠️  No commits found in the specified time range.');
    return;
  }

  console.log(`   Found ${report.totals.commits} commits across ${report.totals.repos} repos\n`);

  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatTerminal(report));
    appendToGlobalLog(formatMarkdown(report));
    saveSessionArchive(report);
  }

  console.log('\n✅ Session log complete!');
}

main().catch(console.error);
