#!/usr/bin/env node

/**
 * Simple link checker using native fetch API
 * No external dependencies required
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const issues = [];
const testedUrls = new Map();

const pagesToTest = [
  { path: '/', name: 'Homepage' },
  { path: '/products', name: 'Products' },
  { path: '/resources', name: 'Resources' },
  { path: '/blog', name: 'Blog' },
  { path: '/assessment', name: 'Assessment' },
  { path: '/enterprise', name: 'Enterprise' },
  { path: '/coaching', name: 'Coaching' },
  { path: '/courses', name: 'Courses' },
  { path: '/agentic-ai-center', name: 'Agentic AI Center' },
  { path: '/founder-playbook', name: 'Founder Playbook' },
  { path: '/realm', name: 'Realm' },
];

// Simple HTML parser to extract links
function extractLinks(html) {
  const links = [];
  // Match all <a ...href="..."> tags with their full content
  const linkRegex = /<a\s+([^>]*?)>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const attributes = match[1];
    const hrefMatch = /href=["']([^"']+)["']/i.exec(attributes);
    const targetMatch = /target=["']([^"']+)["']/i.exec(attributes);

    if (hrefMatch) {
      const href = hrefMatch[1];
      const hasTargetBlank = targetMatch && targetMatch[1] === '_blank';

      // Extract link text (simplified)
      const startPos = match.index + match[0].length;
      const endTagPos = html.indexOf('</a>', startPos);
      const text = endTagPos > startPos
        ? html.substring(startPos, endTagPos).replace(/<[^>]*>/g, '').trim()
        : '[No text]';

      links.push({ href, text, hasTargetBlank });
    }
  }

  return links;
}

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'FrankX-Link-Checker/1.0'
      },
      redirect: 'manual' // Don't follow redirects automatically
    });

    const text = response.ok ? await response.text() : null;

    return {
      status: response.status,
      ok: response.ok,
      text,
      redirected: response.status >= 300 && response.status < 400
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      error: error.message,
      redirected: false
    };
  }
}

async function checkInternalLink(href) {
  if (testedUrls.has(href)) {
    return testedUrls.get(href);
  }

  const url = `http://localhost:3000${href}`;
  const result = await fetchPage(url);
  testedUrls.set(href, result);

  return result;
}

async function checkPage(pagePath, pageName) {
  console.log(`\n=== Testing ${pageName} (${pagePath}) ===`);

  const url = `http://localhost:3000${pagePath}`;
  const result = await fetchPage(url);

  if (!result.ok) {
    issues.push({
      page: pageName,
      link: pagePath,
      href: pagePath,
      issue: `Page failed to load - Status: ${result.status}${result.error ? ` - ${result.error}` : ''}`,
      statusCode: result.status
    });
    console.log(`  ❌ Page failed to load (${result.status})`);
    return;
  }

  console.log(`  ✅ Page loaded successfully (${result.status})`);

  // Extract links from HTML
  const links = extractLinks(result.text);
  console.log(`  Found ${links.length} links`);

  let checkedCount = 0;
  let errorCount = 0;

  for (const link of links) {
    const { href, text, hasTargetBlank } = link;

    if (!href || href === '#') {
      continue;
    }

    // Skip non-HTTP links
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }

    // Check external links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!hasTargetBlank) {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: 'External link missing target="_blank"'
        });
        errorCount++;
      }
      continue;
    }

    // Internal link - test if it works
    if (href.startsWith('/')) {
      checkedCount++;
      const linkResult = await checkInternalLink(href);

      if (linkResult.status === 404) {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: 'Link returns 404 - Page not found',
          statusCode: 404
        });
        console.log(`  ❌ 404: ${href} ("${text.substring(0, 50)}")`);
        errorCount++;
      } else if (linkResult.status >= 400) {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: `Link returns error status: ${linkResult.status}`,
          statusCode: linkResult.status
        });
        console.log(`  ❌ Error ${linkResult.status}: ${href} ("${text.substring(0, 50)}")`);
        errorCount++;
      } else if (linkResult.redirected) {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: `Link redirects - Status: ${linkResult.status}`,
          statusCode: linkResult.status
        });
        console.log(`  ⚠️  Redirect ${linkResult.status}: ${href} ("${text.substring(0, 50)}")`);
        errorCount++;
      } else if (!linkResult.ok && linkResult.error) {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: `Failed to fetch link: ${linkResult.error}`
        });
        console.log(`  ❌ Fetch error: ${href} ("${text.substring(0, 50)}")`);
        errorCount++;
      }
    }
  }

  console.log(`  Checked ${checkedCount} internal links, found ${errorCount} issues`);
}

function generateReport() {
  let report = `FrankX.AI Link Checker Report
${'='.repeat(80)}
Generated: ${new Date().toISOString()}
Total Issues Found: ${issues.length}
${'='.repeat(80)}\n\n`;

  if (issues.length === 0) {
    report += '✅ No issues found! All links are working correctly.\n';
  } else {
    // Group by issue type
    const issuesByType = {
      '404 - Not Found': [],
      'External link missing target': [],
      'Redirects': [],
      'Other errors': []
    };

    issues.forEach(issue => {
      if (issue.statusCode === 404) {
        issuesByType['404 - Not Found'].push(issue);
      } else if (issue.issue.includes('target="_blank"')) {
        issuesByType['External link missing target'].push(issue);
      } else if (issue.issue.includes('redirect')) {
        issuesByType['Redirects'].push(issue);
      } else {
        issuesByType['Other errors'].push(issue);
      }
    });

    // Show issues by type first
    report += '=== ISSUES BY TYPE ===\n\n';

    for (const [type, typeIssues] of Object.entries(issuesByType)) {
      if (typeIssues.length > 0) {
        report += `${type}: ${typeIssues.length} issues\n`;
        report += '-'.repeat(80) + '\n';

        typeIssues.forEach((issue, index) => {
          report += `\n${index + 1}. Page: ${issue.page}\n`;
          report += `   Href: ${issue.href}\n`;
          report += `   Link text: "${issue.link.substring(0, 100)}${issue.link.length > 100 ? '...' : ''}"\n`;
          if (issue.statusCode) {
            report += `   Status code: ${issue.statusCode}\n`;
          }
        });
        report += '\n';
      }
    }

    // Group by page
    const issuesByPage = {};
    issues.forEach(issue => {
      if (!issuesByPage[issue.page]) {
        issuesByPage[issue.page] = [];
      }
      issuesByPage[issue.page].push(issue);
    });

    // Show issues by page
    report += '\n=== ISSUES BY PAGE ===\n\n';
    for (const [pageName, pageIssues] of Object.entries(issuesByPage)) {
      report += `${pageName}: ${pageIssues.length} issues\n`;
      report += '-'.repeat(80) + '\n';

      pageIssues.forEach((issue, index) => {
        report += `\n${index + 1}. ${issue.issue}\n`;
        report += `   Href: ${issue.href}\n`;
        report += `   Link text: "${issue.link.substring(0, 100)}${issue.link.length > 100 ? '...' : ''}"\n`;
        if (issue.statusCode) {
          report += `   Status code: ${issue.statusCode}\n`;
        }
      });
      report += '\n';
    }

    // Summary
    report += '\n=== SUMMARY ===\n';
    report += `Total pages tested: ${pagesToTest.length}\n`;
    report += `Total unique internal URLs checked: ${testedUrls.size}\n`;
    report += `Total issues found: ${issues.length}\n`;
    report += `  - 404 errors: ${issuesByType['404 - Not Found'].length}\n`;
    report += `  - External link issues: ${issuesByType['External link missing target'].length}\n`;
    report += `  - Redirects: ${issuesByType['Redirects'].length}\n`;
    report += `  - Other errors: ${issuesByType['Other errors'].length}\n`;
  }

  return report;
}

async function main() {
  console.log('FrankX.AI Link Checker');
  console.log('='.repeat(80));
  console.log('Checking server availability...');

  // Check if server is running
  const serverCheck = await fetchPage('http://localhost:3000');
  if (!serverCheck.ok) {
    console.error('❌ Development server is not running on http://localhost:3000');
    console.error('Please start it with: npm run dev');
    process.exit(1);
  }

  console.log('✅ Server is running on http://localhost:3000\n');

  // Test all pages
  for (const pageInfo of pagesToTest) {
    await checkPage(pageInfo.path, pageInfo.name);
  }

  // Generate and save report
  const report = generateReport();

  console.log('\n' + '='.repeat(80));
  console.log(report);
  console.log('='.repeat(80));

  // Save reports
  const reportDir = path.join(__dirname, '..');
  const reportJsonPath = path.join(reportDir, 'link-checker-report.json');
  const reportTxtPath = path.join(reportDir, 'link-checker-report.txt');

  fs.writeFileSync(reportJsonPath, JSON.stringify(issues, null, 2));
  fs.writeFileSync(reportTxtPath, report);

  console.log(`\nReports saved to:`);
  console.log(`  - ${reportJsonPath}`);
  console.log(`  - ${reportTxtPath}`);

  // Exit with appropriate code
  const critical404s = issues.filter(i => i.statusCode === 404);
  if (critical404s.length > 0) {
    console.error(`\n❌ Found ${critical404s.length} broken links (404s)`);
    process.exit(1);
  } else if (issues.length > 0) {
    console.warn(`\n⚠️  Found ${issues.length} non-critical issues`);
    process.exit(0);
  } else {
    console.log('\n✅ All links are working correctly!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
