#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { globSync } from 'glob'

const root = process.cwd()
const strict = process.argv.includes('--strict')

const include = [
  'app/**/*.{ts,tsx,md,mdx,json}',
  'components/**/*.{ts,tsx,md,mdx,json}',
  'lib/**/*.{ts,tsx,md,mdx,json}',
  'data/**/*.{json,md,mdx}',
]

const ignore = [
  '**/node_modules/**',
  '**/.next/**',
  'lib/research/**',
  'components/v0-variants/**',
  'app/design-lab/**',
  'app/blog/**',
  'data/social-queue.json',
  'data/model-registry.json',
  'data/vault-manifest.json',
  'data/templates.json',
]

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
      /\b(?:\d{2,}K\+|\d{4,}\+)\b.*\b(songs?|creators?|customers?|users?|students?|implementations?|enrollments?)\b/i,
  },
]

const files = include.flatMap((pattern) =>
  globSync(pattern, {
    cwd: root,
    nodir: true,
    ignore,
  })
)

const findings = []

for (const relPath of files) {
  const absPath = path.join(root, relPath)
  const text = fs.readFileSync(absPath, 'utf8')
  const lines = text.split(/\r?\n/)

  lines.forEach((line, index) => {
    checks.forEach((check) => {
      if (check.regex.test(line)) {
        findings.push({
          file: relPath,
          line: index + 1,
          rule: check.label,
          snippet: line.trim(),
        })
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
