#!/usr/bin/env tsx
/**
 * CLI for publishing a newsletter issue.
 *
 * Usage:
 *   npx tsx scripts/newsletter-publish.ts <path/to/issue.mdx> [--dry-run] [--to=email]
 *
 * Reads the MDX, fans out to Resend (always), Beehiiv (if env configured), and
 * updates the experiment ledger. Substack imports automatically via the RSS feed.
 */
import { publishIssue } from '../lib/newsletter/publish'

async function main() {
  const args = process.argv.slice(2)
  const issuePath = args.find((a) => !a.startsWith('--'))
  if (!issuePath) {
    console.error('Usage: tsx scripts/newsletter-publish.ts <path/to/issue.mdx> [--dry-run] [--to=email]')
    process.exit(1)
  }

  const dryRun = args.includes('--dry-run')
  const toFlag = args.find((a) => a.startsWith('--to='))
  const to = toFlag?.split('=')[1]

  console.log(`📨 Publishing ${issuePath}${dryRun ? ' (DRY RUN)' : ''}`)
  const result = await publishIssue({ issuePath, dryRun, to })

  console.log('\n── Result ─────────────────────────')
  console.log(`Issue:    ${result.issueId}`)
  console.log(`Sent:     ${result.sentAt}`)
  console.log(`UTM:      ${result.utmCampaign}`)
  console.log(`Dry-run:  ${result.dryRun}`)
  console.log('\nPlatforms:')
  for (const [name, info] of Object.entries(result.platforms)) {
    if (!info) continue
    const status = info.ok ? '✓' : '✗'
    const detail = info.ok
      ? (info as { id?: string; url?: string }).id || (info as { url?: string }).url || ''
      : (info as { error?: string }).error || ''
    console.log(`  ${status} ${name.padEnd(8)} ${detail}`)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('Publish failed:', err)
  process.exit(1)
})
