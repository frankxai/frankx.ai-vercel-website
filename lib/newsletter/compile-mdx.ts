import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Block, CompiledIssue, IssueFrontmatter } from './types'

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'newsletters')

export function readIssueFile(relativePath: string): CompiledIssue {
  const filePath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath)

  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)
  const frontmatter = parsed.data as IssueFrontmatter
  const blocks = parseBody(parsed.content)

  return { frontmatter, blocks, raw: parsed.content, filePath }
}

export function listIssuesForStream(streamId: string): CompiledIssue[] {
  const dir = path.join(CONTENT_ROOT, streamId)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => readIssueFile(path.join(dir, f)))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
}

/**
 * Parse the MDX body into a typed block tree.
 *
 * Conventions:
 * - First paragraph before any heading → intro block
 * - `## Heading` starts a section block
 * - `> quote` (single line, before/after section) → pullquote block
 * - `- item` lines under a heading → list block (folded into the current section as its items)
 * - ` ```lang ... ``` ` → code block
 * - `[label](url){.cta}` → cta block
 * - Trailing paragraph starting with `—` → signoff
 *
 * Intentionally minimal — Copywriter agents target these conventions directly.
 */
export function parseBody(content: string): Block[] {
  const blocks: Block[] = []
  const lines = content.split('\n')
  let i = 0
  let seenHeading = false

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    // Code fence
    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || 'text'
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing fence
      blocks.push({ type: 'code', language, body: codeLines.join('\n') })
      continue
    }

    // Heading → start a section
    if (line.startsWith('## ')) {
      seenHeading = true
      const heading = line.slice(3).trim()
      const { body, items, end } = collectSection(lines, i + 1)
      blocks.push({ type: 'section', heading, body, items })
      i = end
      continue
    }

    // Pull quote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [line.slice(2)]
      i++
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      const joined = quoteLines.join(' ').trim()
      const dashMatch = joined.match(/^(.*?)\s+—\s+(.+)$/)
      if (dashMatch) {
        blocks.push({ type: 'pullquote', body: dashMatch[1].trim(), author: dashMatch[2].trim() })
      } else {
        blocks.push({ type: 'pullquote', body: joined })
      }
      continue
    }

    // CTA: [label](url){.cta}
    const ctaMatch = line.match(/^\[([^\]]+)\]\(([^)]+)\)\{\.cta\}/)
    if (ctaMatch) {
      blocks.push({ type: 'cta', label: ctaMatch[1], href: ctaMatch[2] })
      i++
      continue
    }

    // Aside: lines starting with `:::aside`
    if (line.startsWith(':::aside')) {
      const asideLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith(':::')) {
        asideLines.push(lines[i])
        i++
      }
      i++
      blocks.push({ type: 'aside', body: asideLines.join('\n').trim() })
      continue
    }

    // Signoff: paragraph starting with `—`
    if (line.startsWith('—')) {
      const sigLines: string[] = [line]
      i++
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith('##')) {
        sigLines.push(lines[i])
        i++
      }
      blocks.push({ type: 'signoff', body: sigLines.join('\n').trim() })
      continue
    }

    // Otherwise: paragraph. If no heading seen yet, it's the intro.
    const paraLines: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      paraLines.push(lines[i])
      i++
    }
    const body = paraLines.join('\n').trim()
    blocks.push({ type: seenHeading ? 'section' : 'intro', body })
  }

  return blocks
}

function collectSection(
  lines: string[],
  start: number,
): { body: string; items?: string[]; end: number } {
  const bodyLines: string[] = []
  const items: string[] = []
  let i = start

  while (i < lines.length) {
    const line = lines[i]
    if (isBlockStart(line)) break
    if (line.startsWith('- ')) {
      items.push(line.slice(2).trim())
      i++
      continue
    }
    bodyLines.push(line)
    i++
  }

  return {
    body: bodyLines.join('\n').trim(),
    items: items.length ? items : undefined,
    end: i,
  }
}

function isBlockStart(line: string): boolean {
  return (
    line.startsWith('## ') ||
    line.startsWith('> ') ||
    line.startsWith('```') ||
    line.startsWith(':::') ||
    line.startsWith('—') ||
    /^\[[^\]]+\]\([^)]+\)\{\.cta\}/.test(line)
  )
}
