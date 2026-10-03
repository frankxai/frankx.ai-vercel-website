'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const SLOP_PHRASES = [
  'unlock your potential',
  "in today's fast-paced",
  'elevate your',
  'seamless experience',
  'game-changer',
  'game changer',
  'delve into',
  'tapestry of',
  'digital landscape',
  'empower your journey',
  'next-level',
  'cutting-edge',
  'revolutionize your',
  'harness the power',
  'take it to the next level',
  'unleash your',
  'world of possibilities',
  'supercharge your',
  'nestled in',
  "it's not just about",
  'transformative journey',
  'welcome to the future',
];

const EMOJI = /\p{Extended_Pictographic}/u;

function decodeEntities(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(value) {
  return decodeEntities(String(value || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function withoutHidden(html) {
  return String(html || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
}

function styleText(html) {
  const blocks = [];
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = re.exec(String(html || '')))) blocks.push(match[1]);
  return blocks.join('\n');
}

function visibleText(html) {
  const source = withoutHidden(html);
  const attrs = [];
  const attrRe = /\b(?:alt|aria-label|placeholder|title|value)\s*=\s*("([^"]*)"|'([^']*)')/gi;
  let match;
  while ((match = attrRe.exec(source))) attrs.push(match[2] || match[3] || '');
  return decodeEntities(`${source.replace(/<[^>]+>/g, ' ')} ${attrs.join(' ')}`).replace(/\s+/g, ' ').trim();
}

function textBlocks(html, tag) {
  const blocks = [];
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  let match;
  while ((match = re.exec(withoutHidden(html)))) blocks.push(stripTags(match[1]));
  return blocks.filter(Boolean);
}

function isSentenceCase(value) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return false;
  const letters = text.replace(/[^A-Za-z]+/g, '');
  if (letters.length > 3 && letters === letters.toUpperCase()) return false;
  const words = text.split(' ').filter((word) => /[A-Za-z]/.test(word));
  if (!words.length) return false;
  const lexical = words.filter((word) => word.replace(/[^A-Za-z]/g, '').length > 2);
  const capitalized = (word) => /^[A-Z]/.test(word.replace(/^[^A-Za-z]+/, ''));
  if (lexical.length >= 3 && lexical.every(capitalized)) return false;
  const first = text.match(/[A-Za-z]/);
  return Boolean(first && first[0] === first[0].toUpperCase());
}

function attribute(html, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i');
  const match = String(html || '').match(re);
  return match ? (match[2] || match[3] || '').trim() : '';
}

function hasSlop(text) {
  const hay = String(text || '').toLowerCase();
  return SLOP_PHRASES.filter((phrase) => hay.includes(phrase));
}

function scoreFixture(html) {
  const source = String(html || '');
  const visible = visibleText(source);
  const css = styleText(source);
  const reasons = [];
  if (EMOJI.test(visible)) reasons.push('emoji');
  const slop = hasSlop(visible);
  if (slop.length) reasons.push('slop');
  const brand = attribute(source, 'data-brand');
  const specific = attribute(source, 'data-specific');
  if (!brand || !specific || !visible.includes(brand) || !visible.includes(specific)) reasons.push('brand');
  if (specific && hasSlop(specific).length) reasons.push('slop');
  const labels = [...textBlocks(source, 'h1'), ...textBlocks(source, 'button'), ...textBlocks(source, 'a')];
  if (!labels.length || labels.some((label) => !isSentenceCase(label))) reasons.push('sentence-case');
  const focusable = /<button\b/i.test(source)
    || /<a\b[^>]*\bhref\s*=/i.test(source)
    || /<input\b/i.test(source)
    || /<textarea\b/i.test(source)
    || /<select\b/i.test(source);
  const focusStyle = /:focus-visible\b|:focus\b/.test(css);
  if (!focusable || !focusStyle) reasons.push('focus');
  const reduced = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/i.test(css)
    && /animation\s*:\s*none|transition\s*:\s*none|scroll-behavior\s*:\s*auto/i.test(css);
  if (!reduced) reasons.push('reduced-motion');
  const unique = [...new Set(reasons)];
  return { verdict: unique.length ? 'reject' : 'accept', reasons: unique };
}

function decideDisposition(record) {
  const row = record || {};
  if (row.hold) return 'held';
  if (row.foreignBranch) return 'rejected';
  if (row.draft) return 'left-draft';
  const flags = Array.isArray(row.craftFlags) ? row.craftFlags : [];
  if (flags.length) return row.salvageable ? 'cherry-pick-follow-up' : 'rejected';
  if (row.dependabotMajor) return 'rejected';
  if (row.ci !== 'pass' || row.mergeGate !== 'pass') return 'rejected';
  if (!row.reviewProvider || row.reviewProvider === row.author) return 'rejected';
  return 'merged';
}

function brandVerdict(lookup) {
  const row = lookup || {};
  if (!row.designMd || !row.logo) return 'missing';
  const text = String(row.designText || '');
  const logoBytes = Number(row.logoBytes || 0);
  const logoPath = String(row.logo || '');
  const weakDesign = text.trim().length < 400
    || /\b(TODO|TBD|placeholder|lorem ipsum)\b/i.test(text)
    || EMOJI.test(text);
  const weakLogo = logoBytes < 400 || /placeholder|tmp|todo|bakeoff|comparison|exploration|proof/i.test(logoPath);
  return weakDesign || weakLogo ? 'iterate' : 'keep';
}

function checkerPath(filePath) {
  return /(^|\/)(craft-check\.cjs|pr-disposition\.cjs|test_craft_check\.cjs|test_repo_craft_check\.cjs)$/.test(filePath)
    || filePath.includes('/fixtures/craft/')
    || filePath.includes('/fixtures/disposition/')
    || filePath.includes('/fixtures/brand/');
}

function addedLines(diffText) {
  const added = [];
  let skip = false;
  for (const line of String(diffText || '').split(/\r?\n/)) {
    if (line.startsWith('diff --git ') || line.startsWith('+++ ')) {
      const file = line.startsWith('+++ ') ? line.slice(4).replace(/^b\//, '') : '';
      if (line.startsWith('+++ ')) skip = checkerPath(file.replace(/\\/g, '/'));
      continue;
    }
    if (!skip && line.startsWith('+') && !line.startsWith('+++')) added.push(line);
  }
  return added;
}

function craftDiffFlags(files, diffText) {
  const flags = [];
  const paths = (files || []).map((file) => String(file.path || file.filename || '').replace(/\\/g, '/'));
  if (paths.some((filePath) => /(^|\/)(pnpm-lock\.yaml|package-lock\.json|yarn\.lock)$/i.test(filePath))) {
    flags.push('lockfile');
  }
  const dist = paths.some((filePath) => filePath.includes('/dist/'));
  const docs = paths.some((filePath) => filePath.startsWith('docs/') || filePath.includes('/docs/') || filePath.endsWith('.md'));
  if (dist && docs) flags.push('dist');
  const added = addedLines(diffText);
  if (added.some((line) => line.toLowerCase().includes('whitespace-nowrap'))) flags.push('whitespace-nowrap');
  if (added.some((line) => EMOJI.test(line))) flags.push('emoji');
  if (added.some((line) => hasSlop(line).length)) flags.push('slop');
  if (added.some((line) => /higgsfield/i.test(line))) flags.push('higgsfield');
  return flags;
}

const DESIGN_SKILLS = [
  'emil-design-eng',
  'apple-design',
  'animate',
  'review-animations',
  'write-swift',
  'mobile-native',
  'animate-expo',
  'ask-sonner',
  'pick-ui-library',
  'emil-prototype',
];

function installedDesignSkills() {
  const root = path.join(os.homedir(), '.agents', 'skills');
  return new Set(DESIGN_SKILLS.filter((name) => fs.existsSync(path.join(root, name, 'SKILL.md'))));
}

function loadInstalledSelect() {
  try {
    return require(path.join(os.homedir(), '.codex', 'hooks', 'design-skill-router.cjs')).selectSkills;
  } catch {
    return null;
  }
}

function selectUiSkills(prompt, available, select) {
  const picker = select || loadInstalledSelect();
  if (typeof picker !== 'function') return [];
  const names = available || installedDesignSkills();
  const picked = picker(String(prompt || ''), names);
  return Array.isArray(picked) ? picked.slice(0, 4) : [];
}

function skillHint(skills) {
  const names = Array.isArray(skills) ? skills.slice(0, 4) : [];
  if (!names.length) return '';
  return `Read this brand's rules and the accessibility notes before generic taste. Design skills for this task, at most four: ${names.join(', ')}.`;
}

function readFixture(file) {
  return fs.readFileSync(file, 'utf8');
}

if (require.main === module) {
  const file = process.argv[2];
  if (!file) {
    process.stderr.write('usage: node craft-check.cjs <fixture>\n');
    process.exit(2);
  }
  const result = scoreFixture(readFixture(file));
  process.stdout.write(`${result.verdict}\n`);
  process.exit(result.verdict === 'accept' ? 0 : 1);
}

module.exports = {
  DESIGN_SKILLS,
  SLOP_PHRASES,
  brandVerdict,
  craftDiffFlags,
  decideDisposition,
  installedDesignSkills,
  scoreFixture,
  selectUiSkills,
  skillHint,
};
