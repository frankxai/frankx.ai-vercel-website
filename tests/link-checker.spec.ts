import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

interface LinkIssue {
  page: string;
  link: string;
  href: string;
  issue: string;
  statusCode?: number;
}

const issues: LinkIssue[] = [];

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

async function checkInternalLinks(page: Page, pagePath: string, pageName: string) {
  console.log(`\n=== Testing ${pageName} (${pagePath}) ===`);

  // Navigate to the page
  const response = await page.goto(`http://localhost:3000${pagePath}`, {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  if (!response || response.status() !== 200) {
    issues.push({
      page: pageName,
      link: pagePath,
      href: pagePath,
      issue: `Page failed to load - Status: ${response?.status() || 'Unknown'}`,
      statusCode: response?.status()
    });
    return;
  }

  // Get all links on the page
  const links = await page.locator('a[href]').all();
  console.log(`Found ${links.length} links on ${pageName}`);

  for (const link of links) {
    const href = await link.getAttribute('href');
    const text = (await link.textContent())?.trim() || '[No text]';
    const target = await link.getAttribute('target');

    if (!href) {
      issues.push({
        page: pageName,
        link: text,
        href: '[missing]',
        issue: 'Missing href attribute'
      });
      continue;
    }

    // Skip non-HTTP links (mailto, tel, etc.)
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      continue;
    }

    // Check external links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      // External link should have target="_blank"
      if (!target || target !== '_blank') {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: 'External link missing target="_blank"'
        });
      }
      continue;
    }

    // Internal link - test if it works
    if (href.startsWith('/')) {
      try {
        const linkResponse = await page.request.get(`http://localhost:3000${href}`);
        const status = linkResponse.status();

        if (status === 404) {
          issues.push({
            page: pageName,
            link: text,
            href: href,
            issue: 'Link returns 404 - Page not found',
            statusCode: 404
          });
        } else if (status >= 400) {
          issues.push({
            page: pageName,
            link: text,
            href: href,
            issue: `Link returns error status: ${status}`,
            statusCode: status
          });
        } else if (status >= 300 && status < 400) {
          issues.push({
            page: pageName,
            link: text,
            href: href,
            issue: `Link redirects - Status: ${status}`,
            statusCode: status
          });
        }
      } catch (error) {
        issues.push({
          page: pageName,
          link: text,
          href: href,
          issue: `Failed to fetch link: ${error}`
        });
      }
    }
  }
}

test.describe('FrankX.AI Link Checker', () => {
  test('Check all internal links across key pages', async ({ page }) => {
    // Set a longer timeout for this test
    test.setTimeout(300000); // 5 minutes

    for (const pageInfo of pagesToTest) {
      await checkInternalLinks(page, pageInfo.path, pageInfo.name);
    }

    // Generate report
    const reportPath = path.join(process.cwd(), 'link-checker-report.json');
    const reportTxtPath = path.join(process.cwd(), 'link-checker-report.txt');

    fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));

    // Generate text report
    let report = `FrankX.AI Link Checker Report
Generated: ${new Date().toISOString()}
Total Issues Found: ${issues.length}\n\n`;

    if (issues.length === 0) {
      report += '✅ No issues found! All links are working correctly.\n';
    } else {
      // Group by page
      const issuesByPage: Record<string, LinkIssue[]> = {};
      issues.forEach(issue => {
        if (!issuesByPage[issue.page]) {
          issuesByPage[issue.page] = [];
        }
        issuesByPage[issue.page].push(issue);
      });

      for (const [pageName, pageIssues] of Object.entries(issuesByPage)) {
        report += `\n=== ${pageName} (${pageIssues.length} issues) ===\n`;
        pageIssues.forEach((issue, index) => {
          report += `\n${index + 1}. ${issue.issue}\n`;
          report += `   Link text: "${issue.link}"\n`;
          report += `   Href: ${issue.href}\n`;
          if (issue.statusCode) {
            report += `   Status code: ${issue.statusCode}\n`;
          }
        });
      }

      // Summary by issue type
      report += '\n\n=== Summary by Issue Type ===\n';
      const issueTypes: Record<string, number> = {};
      issues.forEach(issue => {
        const type = issue.issue.split('-')[0].trim();
        issueTypes[type] = (issueTypes[type] || 0) + 1;
      });

      for (const [type, count] of Object.entries(issueTypes)) {
        report += `${type}: ${count}\n`;
      }
    }

    fs.writeFileSync(reportTxtPath, report);

    console.log('\n' + report);
    console.log(`\nDetailed reports saved to:`);
    console.log(`  - ${reportPath}`);
    console.log(`  - ${reportTxtPath}`);

    // Take a screenshot if there are issues
    if (issues.length > 0) {
      await page.screenshot({
        path: 'link-checker-issues.png',
        fullPage: true
      });
      console.log('  - link-checker-issues.png');
    }

    // Fail the test if there are critical issues (404s)
    const critical404s = issues.filter(i => i.statusCode === 404);
    if (critical404s.length > 0) {
      throw new Error(`Found ${critical404s.length} broken links (404s)`);
    }
  });
});
