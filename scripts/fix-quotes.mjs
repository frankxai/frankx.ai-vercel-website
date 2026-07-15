import fs from 'fs'
import path from 'path'

const blogDir = 'content/blog'
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))

for (const f of files) {
  const p = path.join(blogDir, f)
  let c = fs.readFileSync(p, 'utf8')
  
  let changed = false
  c = c.replace(/^image:\s*(.*)$/m, (match, val) => {
    // Strip all leading and trailing whitespace and quotes
    const cleanVal = val.trim().replace(/^["']+|["']+$/g, '')
    const newLine = `image: "${cleanVal}"`
    if (match !== newLine) {
      changed = true
      return newLine
    }
    return match
  })

  if (changed) {
    fs.writeFileSync(p, c)
    console.log('Normalized image line in:', f)
  }
}
console.log('Quote sweep complete.')
