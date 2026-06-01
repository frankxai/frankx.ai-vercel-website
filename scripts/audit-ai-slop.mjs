#!/usr/bin/env node
/**
 * audit-ai-slop.mjs — taste.md refusal-list enforcement
 *
 * Scans app/, components/, content/, lib/ for the AI-slop phrases banned in
 * taste.md (the FrankX taste contract).
 *
 * Usage:
 *   node scripts/audit-ai-slop.mjs           # warn only, exit 0
 *   node scripts/audit-ai-slop.mjs --strict  # fail on hits, exit 1 (CI mode)
 *
 * Allowlist:
 *   - Files that legitimately discuss these phrases (taste.md, CLAUDE.md,
 *     AGENTS.md, design-lab brand demos, audit docs, the content scripts)
 *     are excluded — see ALLOW_FILES below.
 *   - Lines ending with "// ai-slop-allow" or matching `<!-- ai-slop-allow -->`
 *     are allowed (for legitimate quotation in editorial context).
 *
 * Refs: taste.md § "What we refuse" + § "The sound of the brand"
 *       docs/ops/2026-05-06-DESIGN-COPY-AUDIT.md (P0 #3)
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const STRICT = process.argv.includes('--strict')
const VERBOSE = process.argv.includes('--verbose')

// Patterns drawn directly from taste.md. Each is case-insensitive.
// `boundary` is a regex assembled around each phrase.
const REFUSAL_LIST = [
  { phrase: 'delve into', why: 'AI-slop tell — see taste.md' },
  { phrase: 'delves into', why: 'AI-slop tell' },
  { phrase: 'dive deep', why: 'AI-slop tell — pick a stronger verb' },
  { phrase: 'deep dive', why: 'AI-slop tell — pick a stronger verb' },
  { phrase: 'deeper dive', why: 'AI-slop tell' },
  { phrase: 'dive into', why: 'AI-slop tell — pick a stronger verb' },
  { phrase: 'dives into', why: 'AI-slop tell' },
  { phrase: "it's worth noting", why: 'AI-slop tell' },
  { phrase: 'in conclusion', why: 'AI-slop tell — let the reader conclude' },
  { phrase: 'navigate the landscape', why: 'AI-slop cliche' },
  { phrase: 'unleash', why: 'AI-slop tell — too marketing' },
  { phrase: 'unleashed', why: 'AI-slop tell' },
  { phrase: 'unleashes', why: 'AI-slop tell' },
  { phrase: 'harness the power', why: 'AI-slop cliche' },
  { phrase: 'unlock the power', why: 'AI-slop cliche' },
  { phrase: 'unlock your potential', why: 'Generic SaaS hero language — taste.md refusal list' },
  { phrase: 'empower your team', why: 'Generic SaaS hero language' },
  { phrase: 'take your.{1,30}to the next level', why: 'Generic SaaS hero language' },
  { phrase: 'next-level', why: 'AI-slop tell' },
  { phrase: 'cutting-edge solution', why: 'Generic SaaS language' },
  { phrase: 'game-changing', why: 'AI-slop cliche' },
  { phrase: 'revolutionary', why: 'AI-slop adjective (acceptable in technical historical context only)' },
  // Conversational "certainly" / "absolutely" only flagged at line start (chatbot tells)
  { phrase: '^\\s*certainly[,.!]', why: 'Chatbot tell at line start', isRegex: true },
  { phrase: '^\\s*absolutely[,.!]', why: 'Chatbot tell at line start', isRegex: true },
]

// Files & dirs the audit deliberately ignores.
const ALLOW_FILES = new Set([
  'taste.md',
  'CLAUDE.md',
  'AGENTS.md',
  'BRAND_IDENTITY.md',
  '.codex/instructions.md',
  'README.md',
  'AUDIT_STRATEGY.md',
  'OPS-INDEX.md',
])

// Path patterns where the audit is silenced (these files reference the patterns
// in meta/audit context, not as production copy).
const ALLOW_PATH_PATTERNS = [
  /^docs\/ops\//,                   // operational docs (audits, plans)
  /^docs\/cis\//,                   // content-intelligence design docs
  /^docs\/research\//,              // research notes
  /^docs\/superpowers\//,           // skill specs
  /^docs\/standards\//,             // standards specs
  /^docs\/planning\//,              // sprint plans
  /^docs\/workshops\//,             // workshop docs
  /^docs\/chronicle\//,             // chronicle docs
  /^scripts\/audit-/,               // self-reference (this script + cousins)
  /^scripts\/audit-marketing-claims/, // sibling auditor
  /^app\/design\/page\.tsx$/,       // /design page quotes the rules
  /^app\/design-lab\//,             // design-lab includes negative examples
  /^app\/llms\.txt\//,              // llms.txt route handler — concise AEO surface
  /^app\/llms-full\.txt\//,         // llms-full.txt route handler — lists refusal-list as voice signal
  /^lib\/voice\/frankx-voice\.ts$/, // canonical voice contract quotes banned phrases by design
  /^content\/2-ready-to-publish\//, // staged drafts (not yet shipped)
  /^v1-enterprise-backup\//,        // legacy backups
  /^_archive\//,                    // archived content
  /^\.archive/,                     // archived dot-folders
  /^\.frankx\/family\//,            // family archive prose
  /CLAUDE\.md$/,                    // any nested CLAUDE.md mem-context file
]

// Allow specific blog files where refusal-list discussion is legitimate
// (they teach others to avoid AI-slop, so they NEED to use the words).
const ALLOW_BLOG_SLUGS = new Set([
  'agentic-seo-publishing-masterplan',
  'ai-engineering-without-hype-willison',
  'how-to-write-claude-md-that-works',
  'ultimate-ai-coding-agent-setup-acos-claude-code-mcp',
  'acos-hooks-system-quality-gates', // teaches AI-slop detection — must quote the phrases
  'karpathys-ai-vision-deep-dive', // article title concept reference
  'building-deal-flow-pipelines-ai', // "Deep Dive" is a named pipeline stage
  'building-research-intelligence-system', // "Mode 2: Deep Dive" is a named workflow mode
  'prompt-engineering-2026-what-still-works', // teaches banned-word detection — must quote phrases in code examples
  'production-agent-patterns-aws-bedrock', // canonical "AWS Bedrock AgentCore Deep Dive" series-part title (SEO-locked)
])

const SCAN_DIRS = ['app', 'components', 'content', 'lib']
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mdx', '.md', '.mjs'])

function isAllowed(relPath) {
  if (ALLOW_FILES.has(path.basename(relPath))) return true
  for (const re of ALLOW_PATH_PATTERNS) {
    if (re.test(relPath)) return true
  }
  // Allow blog posts in the explicit allow-set
  const blogMatch = relPath.match(/^content\/blog\/(.+)\.mdx$/)
  if (blogMatch && ALLOW_BLOG_SLUGS.has(blogMatch[1])) return true
  return false
}

function lineAllowed(line) {
  return /\/\/\s*ai-slop-allow|<!--\s*ai-slop-allow\s*-->/.test(line)
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    if (e.name.startsWith('.') && e.name !== '.frankx') continue
    if (e.name === 'node_modules' || e.name === '.next' || e.name === '.git') continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      yield* walk(full)
    } else if (SCAN_EXTS.has(path.extname(e.name))) {
      yield full
    }
  }
}

function scanLine(line, lineNum, file, hits) {
  if (lineAllowed(line)) return
  for (const { phrase, why, isRegex } of REFUSAL_LIST) {
    const pattern = isRegex ? new RegExp(phrase, 'i') : new RegExp(`\\b${phrase}\\b`, 'i')
    if (pattern.test(line)) {
      hits.push({ file, line: lineNum, phrase, why, snippet: line.trim().slice(0, 140) })
    }
  }
}

async function main() {
  const root = process.cwd()
  const hits = []
  let scanned = 0

  for (const dir of SCAN_DIRS) {
    const dirPath = path.join(root, dir)
    try {
      await fs.access(dirPath)
    } catch {
      continue
    }
    for await (const file of walk(dirPath)) {
      const rel = path.relative(root, file).replace(/\\/g, '/')
      if (isAllowed(rel)) continue
      scanned++
      const text = await fs.readFile(file, 'utf8')
      const lines = text.split(/\r?\n/)
      for (let i = 0; i < lines.length; i++) {
        scanLine(lines[i], i + 1, rel, hits)
      }
    }
  }

  if (hits.length === 0) {
    console.log(`✓ ai-slop audit: ${scanned} files scanned, 0 hits`)
    process.exit(0)
  }

  console.log(`\nai-slop audit — ${hits.length} hit${hits.length === 1 ? '' : 's'} across ${new Set(hits.map((h) => h.file)).size} file${hits.length === 1 ? '' : 's'}\n`)

  // Group by file for readable output
  const byFile = new Map()
  for (const h of hits) {
    if (!byFile.has(h.file)) byFile.set(h.file, [])
    byFile.get(h.file).push(h)
  }
  for (const [file, items] of byFile) {
    console.log(`  ${file}`)
    for (const h of items) {
      console.log(`    L${h.line}  "${h.phrase}"  — ${h.why}`)
      if (VERBOSE) console.log(`           › ${h.snippet}`)
    }
  }

  console.log('\nFix patterns: rewrite with stronger verbs, or add `// ai-slop-allow` inline if legitimate quotation.\n')

  if (STRICT) {
    console.error(`✗ ai-slop audit: ${hits.length} violation${hits.length === 1 ? '' : 's'} (strict mode)`)
    process.exit(1)
  }
  console.warn(`⚠ ai-slop audit: ${hits.length} hit${hits.length === 1 ? '' : 's'} — non-blocking (re-run with --strict for CI gate)`)
  process.exit(0)
}

main().catch((err) => {
  console.error('ai-slop audit failed:', err)
  process.exit(2)
})
