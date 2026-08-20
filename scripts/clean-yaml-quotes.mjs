import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROD_ROOT = process.cwd()
const BLOG_DIR = path.join(PROD_ROOT, 'content/blog')

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

let errors = 0
for (const file of files) {
  const filePath = path.join(BLOG_DIR, file)
  let content = fs.readFileSync(filePath, 'utf8')
  
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (match) {
    let rawYaml = match[1]
    // Clean any backslash escaped quotes in YAML
    rawYaml = rawYaml.replace(/\\'/g, "'").replace(/\\\\'/g, "'").replace(/\\"/g, "'")
    content = `---\n${rawYaml}\n---` + content.slice(match[0].length)
    
    try {
      matter(content)
    } catch (e) {
      console.error(`gray-matter error in ${file}:`, e.message)
      errors++
    }
    fs.writeFileSync(filePath, content, 'utf8')
  }
}

console.log(`Finished checking all ${files.length} MDX files with gray-matter. Total errors: ${errors}`)
