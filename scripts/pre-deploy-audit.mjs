#!/usr/bin/env node

/**
 * Pre-Deploy Quality Gate Audit
 * Run: node scripts/pre-deploy-audit.mjs
 *
 * Checks: internal links, blog quality, products, nav/footer, brand compliance
 * Exits 0 if all pass, 1 if any FAIL
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const APP_DIR = join(ROOT, 'app');
const BLOG_DIR = join(ROOT, 'content', 'blog');
const PRODUCTS_FILE = join(ROOT, 'data', 'products.json');
const NAV_FILE = join(ROOT, 'components', 'NavigationMega.tsx');
const FOOTER_FILE = join(ROOT, 'components', 'Footer.tsx');
const AUDIT_DIR = join(ROOT, 'data', 'audit');
const OUTPUT_FILE = join(AUDIT_DIR, 'pre-deploy-results.json');

// ─── Utilities ───────────────────────────────────────────────────────────────

function walkDir(dir, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, results);
    } else {
      results.push(full);
    }
  }
  return results;
}

function getAppRoutes() {
  const pages = walkDir(APP_DIR).filter(f => f.endsWith('page.tsx'));
  return pages.map(p => {
    const rel = relative(APP_DIR, p).replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '');
    return '/' + rel;
  });
}

function routeMatchesHref(routes, href) {
  // Exact match
  if (routes.includes(href)) return true;
  // Dynamic route match: /books/[bookSlug] should match /books/anything
  for (const route of routes) {
    if (!route.includes('[')) continue;
    const pattern = route.replace(/\[[\w]+\]/g, '[^/]+');
    const re = new RegExp('^' + pattern + '$');
    if (re.test(href)) return true;
  }
  return false;
}

function extractHrefs(content) {
  const hrefs = new Set();
  // Match href="..." or href: '...' or href: "..."
  const patterns = [
    /href=["']([^"']+)["']/g,
    /href:\s*["']([^"']+)["']/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) {
      hrefs.add(m[1]);
    }
  }
  return [...hrefs];
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const kv = line.match(/^(\w+)\s*:\s*(.+)/);
    if (kv) {
      let val = kv[2].trim();
      // Strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[kv[1]] = val;
    }
  }
  return fm;
}

// ─── Check 1: Internal Links ────────────────────────────────────────────────

function checkInternalLinks(routes) {
  const allFiles = walkDir(APP_DIR).filter(f => f.endsWith('.tsx'));
  const broken = [];
  const checked = new Set();

  for (const file of allFiles) {
    const content = readFileSync(file, 'utf8');
    const hrefs = extractHrefs(content);
    for (const href of hrefs) {
      // Skip external, anchors, api routes, mailto, tel, javascript
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('/api/')) continue;
      // Strip anchor and query
      const clean = href.split('#')[0].split('?')[0];
      if (!clean || clean === '/') continue;
      // Normalize trailing slash
      const normalized = clean.endsWith('/') ? clean.slice(0, -1) : clean;

      const key = normalized + '|' + relative(ROOT, file);
      if (checked.has(key)) continue;
      checked.add(key);

      if (!routeMatchesHref(routes, normalized)) {
        broken.push({ href: normalized, file: relative(ROOT, file) });
      }
    }
  }

  const status = broken.length === 0 ? 'PASS' : broken.length <= 5 ? 'WARN' : 'FAIL';
  return { name: 'Internal Links', status, count: broken.length, issues: broken.slice(0, 30) };
}

// ─── Check 2: Blog Quality ─────────────────────────────────────────────────

function checkBlogQuality() {
  if (!existsSync(BLOG_DIR)) return { name: 'Blog Quality', status: 'FAIL', count: 0, issues: [{ error: 'Blog directory not found' }] };

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  const issues = [];

  for (const file of files) {
    const content = readFileSync(join(BLOG_DIR, file), 'utf8');
    const fm = parseFrontmatter(content);
    let score = 100;
    const problems = [];

    if (!fm.title) { score -= 30; problems.push('missing title'); }
    if (!fm.description) { score -= 25; problems.push('missing description'); }
    if (!fm.date) { score -= 25; problems.push('missing date'); }
    if (!fm.category && !fm.tags) { score -= 20; problems.push('missing category/tags'); }

    if (score < 50) {
      issues.push({ file, score, problems });
    }
  }

  const status = issues.length === 0 ? 'PASS' : 'WARN';
  return { name: 'Blog Quality', status, total: files.length, belowThreshold: issues.length, issues };
}

// ─── Check 3: Products ─────────────────────────────────────────────────────

function checkProducts(routes) {
  if (!existsSync(PRODUCTS_FILE)) return { name: 'Products', status: 'FAIL', count: 0, issues: [{ error: 'products.json not found' }] };

  const products = JSON.parse(readFileSync(PRODUCTS_FILE, 'utf8'));
  const issues = [];

  for (const product of products) {
    const slug = product.slug;
    const offer = product.offer || {};
    const problems = [];

    // Check product page exists
    const possiblePages = [
      `/products/${slug}`,
      `/${slug}`,
      `/books/${slug}`,
    ];
    const hasPage = possiblePages.some(p => routeMatchesHref(routes, p));
    // Also check if ctaPrimaryHref resolves
    const ctaHref = offer.ctaPrimaryHref;
    const blobKey = product.blobKey;

    if (!hasPage && !(ctaHref && ctaHref.startsWith('http'))) {
      // Check if ctaHref resolves to a page
      if (ctaHref) {
        const cleanCta = ctaHref.split('#')[0].split('?')[0];
        if (cleanCta && !cleanCta.startsWith('http') && !routeMatchesHref(routes, cleanCta.endsWith('/') ? cleanCta.slice(0, -1) : cleanCta)) {
          problems.push(`no page found (checked /products/${slug}, /${slug}, cta=${ctaHref})`);
        }
      } else {
        problems.push('no page and no ctaPrimaryHref');
      }
    }

    // Check download mechanism
    if (!blobKey && !ctaHref) {
      problems.push('no download mechanism (no blobKey, no ctaPrimaryHref)');
    }

    // Check checkout path
    const price = offer.primaryPrice;
    if (price === undefined || price === null) {
      // No price info at all
      if (!ctaHref) problems.push('no pricing or CTA defined');
    }

    if (problems.length > 0) {
      issues.push({ slug, problems });
    }
  }

  const status = issues.length === 0 ? 'PASS' : issues.length <= 3 ? 'WARN' : 'FAIL';
  return { name: 'Products', status, total: products.length, issueCount: issues.length, issues };
}

// ─── Check 4: Nav/Footer Links ──────────────────────────────────────────────

function checkNavFooter(routes) {
  const issues = [];

  for (const { label, filePath } of [
    { label: 'NavigationMega', filePath: NAV_FILE },
    { label: 'Footer', filePath: FOOTER_FILE },
  ]) {
    if (!existsSync(filePath)) {
      issues.push({ component: label, error: 'file not found' });
      continue;
    }
    const content = readFileSync(filePath, 'utf8');
    const hrefs = extractHrefs(content);

    for (const href of hrefs) {
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || href.startsWith('/api/')) continue;
      const clean = href.split('#')[0].split('?')[0];
      if (!clean || clean === '/') continue;
      const normalized = clean.endsWith('/') ? clean.slice(0, -1) : clean;

      if (!routeMatchesHref(routes, normalized)) {
        issues.push({ component: label, href: normalized });
      }
    }
  }

  const status = issues.length === 0 ? 'PASS' : issues.length <= 3 ? 'WARN' : 'FAIL';
  return { name: 'Nav/Footer Links', status, count: issues.length, issues: issues.slice(0, 30) };
}

// ─── Check 5: Brand Compliance ──────────────────────────────────────────────

function checkBrandCompliance() {
  const violations = [];
  const badTerm = 'AI Systems Architect';
  const extensions = ['.ts', '.tsx', '.json'];

  // Walk root-level directories that matter
  const dirs = ['app', 'components', 'lib', 'data', 'content'].map(d => join(ROOT, d));

  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    const files = walkDir(dir).filter(f => extensions.some(ext => f.endsWith(ext)));
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      if (content.includes(badTerm)) {
        // Find line numbers
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(badTerm)) {
            violations.push({ file: relative(ROOT, file), line: i + 1 });
          }
        }
      }
    }
  }

  const status = violations.length === 0 ? 'PASS' : 'FAIL';
  return { name: 'Brand Compliance', status, term: badTerm, count: violations.length, violations: violations.slice(0, 20) };
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const start = Date.now();
  console.log('\n  Pre-Deploy Quality Gate Audit\n  ─────────────────────────────\n');

  // Collect routes once
  const routes = getAppRoutes();
  console.log(`  Found ${routes.length} app routes\n`);

  // Run all checks
  const results = [
    checkInternalLinks(routes),
    checkBlogQuality(),
    checkProducts(routes),
    checkNavFooter(routes),
    checkBrandCompliance(),
  ];

  // Print summary table
  const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
  const statusIcon = { PASS: '\x1b[32mPASS\x1b[0m', WARN: '\x1b[33mWARN\x1b[0m', FAIL: '\x1b[31mFAIL\x1b[0m' };

  console.log('  ┌──────────────────────┬────────┬─────────────────────────────────┐');
  console.log('  │ Category             │ Status │ Detail                          │');
  console.log('  ├──────────────────────┼────────┼─────────────────────────────────┤');

  for (const r of results) {
    const detail = r.count !== undefined ? `${r.count} issues` :
                   r.belowThreshold !== undefined ? `${r.belowThreshold}/${r.total} below score 50` :
                   r.issueCount !== undefined ? `${r.issueCount}/${r.total} products with issues` :
                   '';
    console.log(`  │ ${pad(r.name, 20)} │ ${statusIcon[r.status]}   │ ${pad(detail, 31)} │`);
  }

  console.log('  └──────────────────────┴────────┴─────────────────────────────────┘');

  const elapsed = Date.now() - start;
  console.log(`\n  Completed in ${elapsed}ms`);

  // Print issue details for non-PASS
  for (const r of results) {
    if (r.status === 'PASS') continue;
    console.log(`\n  ── ${r.name} (${r.status}) ──`);
    for (const issue of (r.issues || r.violations || []).slice(0, 10)) {
      if (issue.href) console.log(`    ${issue.href}  →  ${issue.file || issue.component}`);
      else if (issue.slug) console.log(`    ${issue.slug}: ${issue.problems.join(', ')}`);
      else if (issue.line) console.log(`    ${issue.file}:${issue.line}`);
      else if (issue.score !== undefined) console.log(`    ${issue.file} (score ${issue.score}): ${issue.problems.join(', ')}`);
      else console.log(`    ${JSON.stringify(issue)}`);
    }
  }

  // Write detailed results
  mkdirSync(AUDIT_DIR, { recursive: true });
  const output = {
    timestamp: new Date().toISOString(),
    durationMs: elapsed,
    routeCount: routes.length,
    results,
  };
  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\n  Results written to data/audit/pre-deploy-results.json\n`);

  // Exit code
  const hasFail = results.some(r => r.status === 'FAIL');
  process.exit(hasFail ? 1 : 0);
}

main();
