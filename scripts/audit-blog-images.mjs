import fs from 'fs'
import path from 'path'

const blogDir = 'content/blog'
const mdxFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))

console.log(`Found ${mdxFiles.length} blog posts in content/blog/\n`)

const results = []
let svgCount = 0
let missingCount = 0
let pngJpgCount = 0

for (const file of mdxFiles) {
  const filePath = path.join(blogDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  
  // Extract title and image
  const titleMatch = content.match(/^title:\s*(["'])(.*?)\1/m) || content.match(/^title:\s*(.*?)$/m)
  const imageMatch = content.match(/^image:\s*(["'])(.*?)\1/m) || content.match(/^image:\s*(.*?)$/m)
  
  const title = titleMatch ? titleMatch[2] || titleMatch[1] : 'Untitled'
  const image = imageMatch ? imageMatch[2] || imageMatch[1] : null
  
  let exists = false
  if (image) {
    const diskPath = path.join('public', image)
    exists = fs.existsSync(diskPath)
  }
  
  const isSvg = image ? image.endsWith('.svg') : false
  if (isSvg) svgCount++
  if (image && !exists) missingCount++
  if (image && !isSvg && exists) pngJpgCount++
  
  results.push({
    file,
    title: title.trim(),
    image: image ? image.trim() : null,
    exists,
    isSvg
  })
}

console.log('=== SUMMARY ===')
console.log(`Total Blog Posts: ${results.length}`)
console.log(`Premium PNG/JPG images (existing): ${pngJpgCount}`)
console.log(`SVG images: ${svgCount}`)
console.log(`Missing images: ${missingCount}`)
console.log('===============\n')

console.log('=== DETAILS ===')
results.forEach((r, idx) => {
  const status = r.image 
    ? (r.exists ? (r.isSvg ? '⚠ SVG' : '✓ OK') : '✗ MISSING')
    : '⚠ NO IMAGE'
  console.log(`${(idx + 1).toString().padStart(3)}: [${status}] ${r.file} -> ${r.image || 'none'} (${r.title})`)
})
