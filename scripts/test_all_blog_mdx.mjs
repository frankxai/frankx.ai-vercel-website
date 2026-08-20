import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'

const blogDir = 'content/blog'
const files = readdirSync(blogDir).filter(f => f.endsWith('.mdx'))

console.log(`Testing MDX evaluate on ${files.length} blog posts...`)

const errors = []

for (const file of files) {
  const fullPath = join(blogDir, file)
  const raw = readFileSync(fullPath, 'utf8')
  const { content } = matter(raw)
  try {
    await evaluate(content, {
      ...runtime,
      remarkPlugins: [remarkGfm],
      development: false,
      baseUrl: import.meta.url,
    })
  } catch (err) {
    errors.push({ file, error: err.message, line: err.line, column: err.column })
  }
}

if (errors.length === 0) {
  console.log(`✅ ALL ${files.length} MDX blog posts evaluated with ZERO errors!`)
} else {
  console.error(`❌ ${errors.length} files failed MDX evaluation:`)
  console.error(JSON.stringify(errors, null, 2))
}
