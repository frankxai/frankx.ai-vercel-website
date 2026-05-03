#!/usr/bin/env node
/**
 * Validates every rail entry markdown file: required frontmatter fields,
 * canonical hub matches directory, ≥3 internal rail/canon/library links in
 * body, thesis sentence present.
 *
 * Run: node scripts/rails/validate-frontmatter.mjs
 * Exit 0 on green, 1 on any violation.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const REQUIRED = [
  'title', 'slug', 'hub', 'crossTags', 'thesisSentence',
  'dateWritten', 'datePublished', 'version', 'status',
  'traditions', 'themes', 'canonCited', 'description', 'keywords', 'aiInvolvement',
];

const VALID_HUBS = ['god', 'reality', 'consciousness', 'faith'];
const VALID_STATUS = ['draft', 'live', 'paused'];

const ENTRIES_DIR = path.join(process.cwd(), 'content', 'rails');
const errors = [];

if (!fs.existsSync(ENTRIES_DIR)) {
  console.log('No content/rails/ directory yet — skipping rail frontmatter validation.');
  process.exit(0);
}

for (const hub of fs.readdirSync(ENTRIES_DIR)) {
  const hubDir = path.join(ENTRIES_DIR, hub);
  if (!fs.statSync(hubDir).isDirectory()) continue;
  if (!VALID_HUBS.includes(hub)) {
    errors.push(`content/rails/${hub}/: not a valid hub directory`);
    continue;
  }
  for (const file of fs.readdirSync(hubDir)) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(hubDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data;
    const ctx = `content/rails/${hub}/${file}`;

    for (const k of REQUIRED) {
      if (data[k] === undefined || data[k] === null || data[k] === '') {
        errors.push(`${ctx}: missing required frontmatter field "${k}"`);
      }
    }

    if (!VALID_HUBS.includes(data.hub)) {
      errors.push(`${ctx}: invalid hub "${data.hub}" (must be one of ${VALID_HUBS.join('|')})`);
    } else if (data.hub !== hub) {
      errors.push(`${ctx}: frontmatter hub "${data.hub}" does not match directory "${hub}"`);
    }

    if (data.status && !VALID_STATUS.includes(data.status)) {
      errors.push(`${ctx}: invalid status "${data.status}" (must be one of ${VALID_STATUS.join('|')})`);
    }

    if (Array.isArray(data.crossTags)) {
      for (const tag of data.crossTags) {
        if (!VALID_HUBS.includes(tag)) {
          errors.push(`${ctx}: crossTags has invalid hub "${tag}"`);
        }
      }
    }

    if (typeof data.thesisSentence === 'string' && data.thesisSentence.split(/\s+/).length > 80) {
      errors.push(`${ctx}: thesisSentence is over 80 words — must fit AEO answer-block constraint`);
    }

    // Match internal links to /on-X/, /canon/, /library/
    const internalLinkRe = /\]\(\/(on-[a-z]+|canon|library)\b/g;
    const links = parsed.content.match(internalLinkRe) ?? [];
    if (links.length < 3) {
      errors.push(`${ctx}: only ${links.length} internal rail/canon/library links — need ≥3`);
    }

    if (data.aiInvolvement && !/claude|chatgpt|ai|gpt|llm/i.test(data.aiInvolvement)) {
      errors.push(`${ctx}: aiInvolvement does not name an AI partner — required by voice rules`);
    }
  }
}

if (errors.length) {
  console.error('Rail frontmatter validation FAILED:\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log('✓ Rail frontmatter validation passed');
