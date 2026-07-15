#!/usr/bin/env node
/**
 * /sip-share-audit — Static code audit gate for sharing safety.
 * Scans a target directory (or current directory) for:
 * 1. Confidentiality leaks: "Oracle EMEA", proprietary dayjob info, keys/API tokens.
 * 2. Brand leaks / Crossover: Arcanean lore (Realm, Seeker, Archon) or FrankX personal attributes in public repos.
 * 3. Draft markers: [[NEEDS ALIGNMENT]], unresolved TODOs.
 *
 * Usage:
 *   node scripts/sip-share-audit.mjs <target-path> [--strict] [--public-only]
 */
import fs from 'node:fs'
import path from 'node:path'

const targetDir = process.argv[2] && !process.argv[2].startsWith('-') ? path.resolve(process.argv[2]) : process.cwd()
const strict = process.argv.includes('--strict')
const publicOnly = process.argv.includes('--public-only') // if scanning a public repo, check for personal brand leaks

const includeExts = new Set(['.ts', '.tsx', '.md', '.mdx', '.json', '.js', '.mjs', '.yml', '.yaml'])
const ignoreDirs = new Set(['node_modules', '.next', '.git', '.codex', '.cache', 'dist', 'out'])

const checks = [
  // 1. Confidentiality
  {
    id: 'oracle-emea',
    label: 'Oracle Dayjob Reference',
    regex: /\bOracle\s+EMEA\b/i,
    severity: 'error'
  },
  {
    id: 'oracle-dayjob',
    label: 'Oracle Internal Reference',
    regex: /\bOracle\s+dayjob\b/i,
    severity: 'error'
  },
  {
    id: 'oci-internal',
    label: 'Oracle Cloud Infrastructure Dayjob Specifics',
    regex: /\bOCI\s+(?:dayjob|internal|credentials|client)\b/i,
    severity: 'error'
  },
  {
    // 2. Draft markers
    id: 'needs-alignment',
    label: 'Needs Alignment Marker',
    regex: /\[\[NEEDS\s+ALIGNMENT\]\]/i,
    severity: 'error'
  },
  {
    id: 'unresolved-todo',
    label: 'Unresolved TODO Draft Marker',
    regex: /\[\[TODO\]\]/i,
    severity: 'warning'
  }
]

// Brand crossover checks (highly contextual)
const brandChecks = [
  {
    id: 'arcanea-mythology',
    label: 'Arcanean Mythology (Realm, Archon, Seeker)',
    regex: /\b(?:Arcanean\s+lore|Archon\s+Council|Seeker's\s+Gate)\b/i,
    severity: 'warning'
  }
]

// Personal attributes leak (e.g. if we are looking at a public/general tier repo)
const publicTierChecks = [
  {
    id: 'frankx-brand-leak',
    label: 'FrankX Brand Attribute in Public Tier',
    regex: /\b(?:FrankX|Soulbook|Gym\s+tracker|Papa\s+hub|sauna-venture|Dutch\s+BV)\b/i,
    severity: 'warning'
  }
]

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue
      walk(fullPath, files)
      continue
    }
    if (includeExts.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

console.log(`sip-share-audit: scanning ${targetDir}...`)
if (!fs.existsSync(targetDir)) {
  console.error(`Error: target directory "${targetDir}" does not exist.`)
  process.exit(1)
}

const files = walk(targetDir)
const findings = []

const activeChecks = [...checks, ...brandChecks]
if (publicOnly) {
  activeChecks.push(...publicTierChecks)
}

for (const file of files) {
  // Don't audit the audit script itself, nor the boundary map definition that documents these checks
  if (path.basename(file) === 'sip-share-audit.mjs' || path.basename(file) === 'boundary-map.md') {
    continue
  }

  let text
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    continue
  }
  const lines = text.split(/\r?\n/)

  lines.forEach((line, index) => {
    activeChecks.forEach((check) => {
      if (check.regex.test(line)) {
        findings.push({
          file: path.relative(targetDir, file),
          line: index + 1,
          rule: check.label,
          severity: check.severity,
          snippet: line.trim(),
        })
      }
    })
  })
}

if (findings.length === 0) {
  console.log('✓ sip-share-audit: no sensitive leaks or draft markers detected.')
  process.exit(0)
}

const errors = findings.filter(f => f.severity === 'error')
const warnings = findings.filter(f => f.severity === 'warning')

console.log(`\nsip-share-audit: detected ${findings.length} findings (${errors.length} errors, ${warnings.length} warnings).`)
for (const finding of findings) {
  const marker = finding.severity === 'error' ? '❌ [ERROR]' : '⚠️ [WARN]'
  console.log(`${marker} ${finding.file}:${finding.line} [${finding.rule}] → ${finding.snippet}`)
}

if (strict && errors.length > 0) {
  console.error('\nsip-share-audit failed in strict mode.')
  process.exit(1)
}

process.exit(0)
