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
  'data/ai-architecture/**',
  'app/ai-architect/**',
  'app/ai-architecture/**',
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
    regex: /\bFortune\s*(?:100|500)\b/i,
  },
  {
    id: 'trust-language',
    label: 'Unqualified trust language',
    regex: /\btrusted by\b/i,
  },
  {
    id: 'performance-multipliers',
    label: 'Performance multiplier claims',
    regex: /\b\d+(?:\.\d+)?x\s+(?:faster|speedup|throughput|performance|boost|improvement)\b/i,
  },
  {
    id: 'benchmark-latency',
    label: 'Unbacked latency claims',
    regex: /\b\d+(?:\.\d+)?\s*(?:ms|milliseconds)\s+(?:latency|response time|ttfb)\b/i,
  },
  {
    id: 'benchmark-accuracy',
    label: 'Unbacked benchmark accuracy claims',
    regex: /\b\d+(?:\.\d+)?%\s*(?:accuracy|precision|recall|benchmark score)\b/i,
  },
  {
    id: 'success-rate',
    label: 'Numeric success-rate claim',
    regex: /\b\d+(?:\.\d+)?%\s*(?:client\s*)?success\s+rate\b/i,
  },
  {
    id: 'sla-uptime',
    label: 'Unbacked SLA / Uptime guarantees',
    regex: /(?:\b99\.\d+%\s*(?:uptime|availability|sla)\b|\b(?:24\/7|sub-second|zero downtime)\s*(?:SLA|guarantee|uptime)\b|\b\d+\s*hour\s+SLA\b)/i,
  },
  {
    id: 'numeric-roi',
    label: 'Numeric ROI/revenue/efficiency claim',
    regex: /(?:\b\d+(?:\.\d+)?%|\$[0-9]+(?:\.[0-9]+)?[MK]?|\b\d+(?:\.\d+)?x)\s*(?:ROI|revenue|mrr|arr|savings|saved|efficiency|productivity|gains?)/i,
  },
  {
    id: 'large-vanity-metric',
    label: 'Large vanity metric with audience/outcome noun',
    regex: /\b(?:\d{2,}K\+|\d{4,}\+)\b.*\b(songs?|creators?|customers?|users?|students?|implementations?|enrollments?|downloads?)\b/i,
  },
  {
    id: 'banned-headcount-fabrications',
    label: 'Banned fabricated headcount/volume claims',
    regex: /\b(?:12,000\+|12K\+|500\+\s+AI\s+songs|10K\+\s+creators|150\+\s+testimonials|50\+\s+proven\s+templates)\b/i,
  },
  {
    id: 'unbacked-testimonial-ratings',
    label: 'Unbacked testimonial quotes or rating claims',
    regex: /(?:\b150\+\s+testimonials\b|\b5-star rating\b|\b4\.\d\/5\s*(?:star|rating)?\b|★\s*★\s*★\s*★\s*★|\bCustomer satisfaction hit\b)/i,
  },
]

const evidencePatterns = [
  /(?:claims-evidence|evidenceUrl|evidence_url|data-evidence|evidence|proof|source|href)\s*[:=]\s*["'`]?([^\s"'`>]+)/i,
  /(?:\/\*|\/\/|<!--)\s*(?:claims-evidence|evidence|source)\s*:\s*(\S+)/i,
  /\[.*?\]\((https?:\/\/|\/|data\/|docs\/|scripts\/)[^\s\)]+\)/i,
  /href=["'](https?:\/\/|\/|data\/|docs\/|scripts\/)[^"']+["']/i,
  /https?:\/\/[^\s"'`>]+/i,
  /(?:arXiv:\d+\.\d+|arxiv\.org\/[^\s"'`>]+)/i,
  /(?:docs|data|scripts\/research-data)\/[^\s"'`>]+/i,
  /done\s*:\s*false/i,
  /CapCut/i,
]

function hasLinkedEvidence(lines, lineIndex) {
  const start = Math.max(0, lineIndex - 5)
  const end = Math.min(lines.length - 1, lineIndex + 5)
  for (let i = start; i <= end; i++) {
    const line = lines[i]
    for (const pattern of evidencePatterns) {
      if (pattern.test(line)) {
        return true
      }
    }
  }
  return false
}

function auditContent(relPath, text) {
  const lines = text.split(/\r?\n/)
  const findings = []

  lines.forEach((line, index) => {
    checks.forEach((check) => {
      if (check.regex.test(line)) {
        if (!hasLinkedEvidence(lines, index)) {
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

  return findings
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

export { checks, auditContent, hasLinkedEvidence }

// Only execute CLI runner when script is called directly
const isDirectCall = process.argv[1] && (
  process.argv[1] === import.meta.filename ||
  process.argv[1].endsWith('audit-marketing-claims.mjs')
)

if (isDirectCall) {
  const files = includeDirs.flatMap((dir) => {
    if (!fs.existsSync(path.join(root, dir))) return []
    return walk(dir)
  })

  const findings = []

  for (const relPath of files) {
    const absPath = path.join(root, relPath)
    const text = fs.readFileSync(absPath, 'utf8')
    const fileFindings = auditContent(relPath, text)
    findings.push(...fileFindings)
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
}
