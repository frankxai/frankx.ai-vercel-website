import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const OUTPUT = path.join(ROOT, 'public', 'reading', 'search-index.json')
const EXCLUDE_DIRS = new Set(['.git', 'node_modules', '.next', 'reading-site', 'public'])
const TEXT_EXTS = new Set(['.md', '.markdown', '.txt', '.html'])

function walk(dir, list = []) {
  const ents = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of ents) {
    if (ent.name.startsWith('.DS_Store')) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (EXCLUDE_DIRS.has(ent.name)) continue
      walk(full, list)
    } else if (ent.isFile()) {
      const ext = path.extname(ent.name).toLowerCase()
      if (TEXT_EXTS.has(ext)) list.push(full)
    }
  }
  return list
}

function titleFrom(content, ext, file) {
  if (ext === '.md' || ext === '.markdown') {
    const m = content.match(/^#\s+(.+)$/m)
    if (m) return m[1].trim()
  }
  if (ext === '.html') {
    const m = content.match(/<title>(.*?)<\/title>/i)
    if (m) return m[1].trim()
  }
  return path.basename(file, ext).replace(/[_-]+/g, ' ')
}

function summarize(content) {
  const plain = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.slice(0, 300)
}

const files = walk(ROOT)
const items = []
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/')
  const ext = path.extname(file).toLowerCase()
  const raw = fs.readFileSync(file, 'utf8')
  const title = titleFrom(raw, ext, file)
  const snippet = summarize(raw)
  const webPath = `/reading/${rel.replace(/\.(md|markdown|txt|html)$/i, '.html')}`
  items.push({ title, path: webPath, snippet })
}

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
fs.writeFileSync(OUTPUT, JSON.stringify({ items }, null, 2), 'utf8')
console.log('Search index written to', OUTPUT, 'with', items.length, 'items')

