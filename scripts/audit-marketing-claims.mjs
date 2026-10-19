#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const strict = process.argv.includes('--strict')

const includeDirs = ['app', 'components', 'lib', 'data']
const includeExts = new Set(['.ts', '.tsx', '.md', '.mdx', '.json'])

const ignore = [
  'node_modules',
  '.next',
  'lib/research/**',
  'components/v0-variants/**',
  'app/design-lab/**',
  'app/blog/**',
  'data/social-queue.json',
  'data/model-registry.json',
  'data/vault-manifest.json',
  'data/templates.json',
  'app/ai-architect/**',
  'app/ai-architecture/**',
  'data/ai-architecture/**',
  'data/inventories/**',
  'data/acos/**',
  'components/social-proof/**',
]

function normalize(relPath) {
  return relPath.replace(/\\/g, '/')
}

function isIgnored(relPath) {
  const normalized = normalize(relPath)
  return ignore.some((pattern) => {
    if (pattern.endsWith('/**')) {
      return normalized.startsWith(pattern.slice(0, -3))
    }
    return normalized === pattern
  })
}

const checks = [
  {
    id: 'fortunes',
    label: 'Fortune enterprise claims',
    regex: /\bFortune\s(?:100|500)\b/i,
  },
  {
    id: 'trust-language',
    label: 'Unqualified trust language',
    regex: /\btrusted by\b/i,
  },
  {
    id: 'performance-multipliers',
    label: 'Performance multiplier claims',
    regex: /\b\d+(?:\.\d+)?x\s+faster\b/i,
  },
  {
    id: 'success-rate',
    label: 'Numeric success-rate claim',
    regex: /\b\d+(?:\.\d+)?%\s*(?:client\s*)?success\s+rate\b/i,
  },
  {
    id: 'numeric-roi',
    label: 'Numeric ROI/revenue/efficiency claim',
    regex:
      /(?:\b\d+(?:\.\d+)?%|\$[0-9]+(?:\.[0-9]+)?[MK]?|\b\d+(?:\.\d+)?x)\s*(?:ROI|revenue|efficiency|productivity|gains?)/i,
  },
  {
    id: 'large-vanity-metric',
    label: 'Large vanity metric with audience/outcome noun',
    regex:
      /\b(?:\d{2,}K\+|\d{4,}\+)\s*.*\b(songs?|creators?|customers?|users?|students?|implementations?|enrollments?)\b/i,
  },
  {
    id: 'sla-uptime',
    label: 'Numeric SLA or Uptime claim',
    regex: /\b\d+(?:\.\d+)?%\s*(?:uptime|SLA|availability)\b/i,
  },
  {
    id: 'unbacked-benchmark',
    label: 'Unbacked benchmark claim',
    regex: /\b(?:unbacked|proven|guaranteed)\s+(?:benchmark|performance|speedup|throughput|results)\b/i,
  },
  {
    id: 'fake-receipt-financial',
    label: 'Unbacked receipt or financial claim',
    regex: /\b(?:unbacked|verified|guaranteed)\s+(?:receipts?|payouts?|earnings?|mrr|arr)\b/i,
  },
  {
    id: 'testimonial-claim',
    label: 'Unbacked testimonial or endorsement claim',
    regex: /\b(?:verified|guaranteed)\s+(?:testimonial|endorsement)\b/i,
  },
]

function hasEvidenceEscapeHatch(line, prevLine) {
  const evidencePattern = /evidence[:=]|evidence\/|\/evidence\b|\[evidence\]|\bdata-evidence\b/i
  return evidencePattern.test(line) || (prevLine && evidencePattern.test(prevLine))
}

function walk(dir, files = []) {
  const entries = fs.readdirSync(path.join(root, dir), { withFileTypes: true })
  for (const entry of entries) {
    const relPath = normalize(path.join(dir, entry.name))
    if (isIgnored(relPath)) continue
    if (entry.isDirectory()) {
      walk(relPath, files)
      continue
    }
    if (includeExts.has(path.extname(entry.name))) {
      files.push(relPath)
    }
  }
  return files
}

const files = includeDirs.flatMap((dir) => {
  if (!fs.existsSync(path.join(root, dir))) return []
  return walk(dir)
})

const findings = []

for (const relPath of files) {
  const absPath = path.join(root, relPath)
  const text = fs.readFileSync(absPath, 'utf8')
  const lines = text.split(/\r?\n/)

  lines.forEach((line, index) => {
    const prevLine = index > 0 ? lines[index - 1] : ''
    checks.forEach((check) => {
      if (check.regex.test(line)) {
        if (!hasEvidenceEscapeHatch(line, prevLine)) {
          findings.push({
            file: relPath,
            line: index + 1,
            rule: check.label,
            snippet: line.trim(),
          })
        }
      }
    })
  })
}

if (findings.length === 0) {
  console.log('claims-audit: no high-risk claim patterns detected in scoped files.')
  process.exit(0)
}

console.log(`claims-audit: found ${findings.length} potential claim(s) for review.`)
for (const finding of findings) {
  console.log(`- ${finding.file}:${finding.line} [${finding.rule}] ${finding.snippet}`)
}

if (strict) {
  process.exit(1)
}

console.log('claims-audit: non-strict mode, exiting 0 after reporting findings.')
process.exit(0)
