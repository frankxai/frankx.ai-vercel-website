import fs from 'node:fs/promises'
import matter from 'gray-matter'
import { validateDraft } from './journal-capture.mjs'
import { journalDay } from '../lib/journal-policy.ts'

let count = 0
for (const file of await fs.readdir('content/journal')) {
  if (file.startsWith('_') || !/\.mdx?$/.test(file)) continue
  const markdown = await fs.readFile(`content/journal/${file}`, 'utf8')
  const { data, content } = matter(markdown)
  if (typeof data.published !== 'boolean') throw new Error(`${file}: published must be an explicit boolean`)
  if (data.published && data.date > journalDay()) throw new Error(`${file}: future publication requires a later approved release`)
  await validateDraft(matter.stringify(content, { ...data, published: false }))
  count++
}
console.log(`Journal: ${count} public-safe source files validated (including unpublished drafts).`)
