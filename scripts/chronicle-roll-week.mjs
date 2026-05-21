#!/usr/bin/env node
/**
 * scripts/chronicle-roll-week.mjs
 *
 * Auto-rollup for the Starlight Chronicle / Changelog coupling.
 *
 * Mines git history across canonical FrankX-namespace repos for the past 7 days
 * (or a custom window), filters to conventional-commit prefixes that mean
 * "shipped/improved/fixed", and synthesises a fresh week entry into
 * data/changelog-entries.json.
 *
 * The Chronicle's Sunday Palace Review then reflects ON TOP of this auto-roll.
 * Changelog stays factual; Chronicle stays reflective.
 *
 * Why this design:
 *   - No per-repo hooks to install or maintain.
 *   - Git history is already the source of truth.
 *   - Cross-repo: walks sibling repos under ~/.
 *   - Re-entrant: running it twice in the same week updates the existing entry,
 *     does not duplicate.
 *   - Graceful: if a repo is missing/unreachable, it is noted and skipped, not
 *     fatal.
 *
 * Usage:
 *   node scripts/chronicle-roll-week.mjs                    # current ISO week
 *   node scripts/chronicle-roll-week.mjs --week 2026-W18    # a specific week
 *   node scripts/chronicle-roll-week.mjs --since "2026-04-26" --until "2026-05-03"
 *   node scripts/chronicle-roll-week.mjs --dry-run          # report, don't write
 *
 * Conventional-commit prefixes detected:
 *   feat:, feat(scope):  → type=shipped, impact=major|medium (heuristic)
 *   fix:,  fix(scope):   → type=fixed,   impact=medium|small
 *   ship:, release:      → type=shipped, impact=major
 *   docs:                → ignored unless --include-docs
 *   chore:, refactor:    → ignored
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const CHANGELOG_PATH = join(REPO_ROOT, 'data', 'changelog-entries.json');

// Canonical sibling repos under ~/. Add new ones here as they are blessed
// into the namespace. Each entry's `name` becomes the changelog entry tag
// so readers can see which repo a commit came from.
const CANONICAL_REPOS = [
  { name: 'frankx',                 path: join(homedir(), 'frankx') },
  { name: 'frankx.ai-vercel-website', path: join(homedir(), 'frankx.ai-vercel-website') },
  { name: 'library-os',             path: join(homedir(), 'library-os') },
  { name: 'starlight-intelligence-system', path: join(homedir(), 'Starlight-Intelligence-System') },
  { name: 'starlight-agent-lab',    path: join(homedir(), 'starlight-agent-lab') },
  { name: 'gencreator.ai',          path: join(homedir(), 'gencreator.ai') },
  { name: 'arcanea',                path: join(homedir(), 'Arcanea') },
];

// ---------- arg parsing ----------
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};
const has = (name) => args.includes(name);

const includeDocs = has('--include-docs');
const dryRun      = has('--dry-run');
const weekArg     = flag('--week');                     // "2026-W18"
const sinceArg    = flag('--since');                    // "2026-04-26"
const untilArg    = flag('--until');                    // "2026-05-03"

// ---------- date math ----------
function isoWeekRange(weekString) {
  // weekString = "2026-W18" → returns { since, until, weekId, label }
  const m = weekString.match(/^(\d{4})-W(\d{1,2})$/);
  if (!m) throw new Error(`Invalid week: ${weekString}. Expected YYYY-Www.`);
  const year = +m[1], week = +m[2];
  // ISO week 1 = week containing Jan 4 OR first Thursday
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const week1Mon = new Date(jan4);
  week1Mon.setUTCDate(jan4.getUTCDate() - jan4Day + 1);
  const targetMon = new Date(week1Mon);
  targetMon.setUTCDate(week1Mon.getUTCDate() + (week - 1) * 7);
  const targetSun = new Date(targetMon);
  targetSun.setUTCDate(targetMon.getUTCDate() + 6);
  return {
    since: targetMon.toISOString().slice(0, 10),
    until: targetSun.toISOString().slice(0, 10),
    weekId: `week-${year}-${String(week).padStart(2, '0')}`,
    label: `Week ${week}`,
    year,
    week,
  };
}

function currentIsoWeek(date = new Date()) {
  // Returns { weekId, label, year, week, since, until }
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return isoWeekRange(`${d.getUTCFullYear()}-W${weekNo}`);
}

let { since, until, weekId, label, year, week } =
  weekArg ? isoWeekRange(weekArg)
  : (sinceArg && untilArg) ? {
      since: sinceArg,
      until: untilArg,
      weekId: `range-${sinceArg}-${untilArg}`,
      label: `${sinceArg} → ${untilArg}`,
      year: +sinceArg.slice(0, 4),
      week: 0,
    }
  : currentIsoWeek();

// git log --since is exclusive of the start day midnight, so subtract a day
// to capture the Monday in full.
const sinceForGit = since;
const untilForGit = `${until} 23:59:59`;

// ---------- commit classification ----------
const PREFIX_MAP = [
  { re: /^ship:|^release:/i,           type: 'shipped',  impact: 'major'  },
  { re: /^feat\b/i,                    type: 'shipped',  impact: 'medium' },
  { re: /^fix\b/i,                     type: 'fixed',    impact: 'medium' },
  { re: /^perf\b/i,                    type: 'improved', impact: 'medium' },
  { re: /^refactor\b/i,                type: null,       impact: 'small'  },
  { re: /^chore\b/i,                   type: null,       impact: 'small'  },
  { re: /^docs\b/i,                    type: includeDocs ? 'improved' : null, impact: 'small' },
];

function classify(subject) {
  for (const p of PREFIX_MAP) if (p.re.test(subject)) return p;
  return { type: null, impact: 'small' };
}

function impactBoost(subject, files) {
  // Heuristic: commits touching app/, content/blog/, or with "ship" in subject
  // → bump impact to major. Use only when not already explicitly major.
  if (/\bship\b|launch|release|live|production/i.test(subject)) return 'major';
  if (files >= 30) return 'major';
  if (files >= 8) return 'medium';
  return 'small';
}

// ---------- mining ----------
function gitLogIn(repoPath) {
  if (!existsSync(join(repoPath, '.git'))) return [];
  try {
    const fmt = '%h%x1f%ai%x1f%s';
    const out = execSync(
      `git log --since="${sinceForGit}" --until="${untilForGit}" --pretty=format:"${fmt}" --shortstat`,
      { cwd: repoPath, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    if (!out.trim()) return [];

    // Parse: a header line (h\tdate\tsubject) followed (sometimes) by " 4 files changed, ..." line
    const lines = out.split('\n');
    const commits = [];
    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i];
      if (!ln.includes('')) continue;
      const [hash, date, subject] = ln.split('');
      // Look ahead for a stat line
      let files = 1;
      const next = lines[i + 1] || '';
      const m = next.match(/(\d+) files? changed/);
      if (m) { files = +m[1]; i += 1; }
      commits.push({ hash, date: date.slice(0, 10), subject, files });
    }
    return commits;
  } catch {
    return [];
  }
}

const allEntries = [];
const repoStatus = [];

for (const repo of CANONICAL_REPOS) {
  if (!existsSync(repo.path)) {
    repoStatus.push({ name: repo.name, status: 'missing' });
    continue;
  }
  if (!existsSync(join(repo.path, '.git'))) {
    repoStatus.push({ name: repo.name, status: 'no-git' });
    continue;
  }
  const commits = gitLogIn(repo.path);
  repoStatus.push({ name: repo.name, status: 'ok', commits: commits.length });

  for (const c of commits) {
    const cls = classify(c.subject);
    if (!cls.type) continue;
    const impact =
      /\bship\b|launch|release|live|production/i.test(c.subject) ? 'major'
      : c.files >= 30 ? 'major'
      : c.files >= 8  ? 'medium'
      : cls.impact;

    // Strip the prefix from the subject for a cleaner title
    const title = c.subject.replace(/^(\w+(\([^)]+\))?:\s*)/, '');
    allEntries.push({
      id: `cl-${c.date}-${c.hash}`,
      date: c.date,
      type: cls.type,
      title: title.length > 80 ? title.slice(0, 77) + '…' : title,
      description: `${c.subject} — ${repo.name}`,
      tags: [repo.name, ...detectTags(c.subject)],
      commit: c.hash,
      impact,
      repo: repo.name,
    });
  }
}

function detectTags(subject) {
  const t = [];
  const checks = [
    [/\b(rails|on-god|on-reality|on-consciousness|on-faith)\b/i, 'rails'],
    [/\b(workshop|ikigai|nldigital|madrid)\b/i, 'workshops'],
    [/\b(library|book)\b/i, 'library'],
    [/\b(watch|short|video)\b/i, 'watch'],
    [/\b(aco|talking-head|remotion)\b/i, 'aco'],
    [/\b(acos|agent)\b/i, 'acos'],
    [/\b(ana|alea)\b/i, 'characters'],
    [/\b(piano|music|suno)\b/i, 'music'],
    [/\b(meta|ecosystem|substrate)\b/i, 'meta'],
    [/\b(design|hero|brand)\b/i, 'design'],
  ];
  for (const [re, tag] of checks) if (re.test(subject)) t.push(tag);
  return t.slice(0, 3);
}

// ---------- aggregation ----------
allEntries.sort((a, b) => b.date.localeCompare(a.date));

const stats = {
  commits: allEntries.length,
  filesChanged: allEntries.length,   // approximation; precise count would require re-walking
  linesAdded: 0,                     // intentionally unset; not the chronicle's job
  newPages: allEntries.filter(e => e.type === 'shipped' && /\bpage\b/i.test(e.title)).length,
  imagesGenerated: allEntries.filter(e => /\bhero\b|\bimage\b|\bcover\b/i.test(e.title)).length,
};

const summary = (() => {
  const themes = {};
  // tags[0] is always the repo name; skip it when computing themes so the
  // summary surfaces topic-level themes (rails, library, design) not repos.
  for (const e of allEntries) for (const t of e.tags.slice(1)) themes[t] = (themes[t] || 0) + 1;
  const top = Object.entries(themes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(t => t[0]);
  if (top.length === 0) return `Quiet week. ${allEntries.length} entries.`;
  return `Themes: ${top.join(', ')}. ${allEntries.length} entries across ${repoStatus.filter(r => r.status === 'ok' && r.commits > 0).length} repos.`;
})();

const newWeek = {
  id: weekId,
  label,
  dateRange: `${since} → ${until}`,
  summary,
  stats,
  entries: allEntries,
};

// ---------- write ----------
const data = JSON.parse(readFileSync(CHANGELOG_PATH, 'utf8'));
const existingIdx = data.weeks.findIndex(w => w.id === weekId);
if (existingIdx >= 0) {
  data.weeks[existingIdx] = newWeek;
} else {
  data.weeks.unshift(newWeek);
}

if (dryRun) {
  console.log(JSON.stringify({ week: newWeek, repoStatus }, null, 2));
  console.log('--- DRY RUN — no write ---');
} else {
  writeFileSync(CHANGELOG_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log(`✓ Wrote ${weekId} → ${CHANGELOG_PATH}`);
  console.log(`  Entries: ${allEntries.length}`);
  console.log(`  Repos:   ${repoStatus.map(r => `${r.name}=${r.status}${r.commits != null ? `(${r.commits})` : ''}`).join(', ')}`);
}
