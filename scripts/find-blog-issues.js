import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = './content/blog';
const PUBLIC_DIR = './public';

// Simple frontmatter parser
function parseFrontmatter(content) {
  // Normalize CRLF to LF
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    frontmatter[key] = value;
  }

  return frontmatter;
}

function scan() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const issues = [];
  
  for (const file of files) {
    if (file === 'CONTENT_SCHEMA.md') continue; // Skip schema doc
    
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = parseFrontmatter(content);
    
    if (!fm) {
      issues.push({
        file,
        title: 'Unknown',
        date: '1970-01-01',
        errors: ['No frontmatter found']
      });
      continue;
    }
    
    const errors = [];
    const date = fm.date || '1970-01-01';
    
    if (!fm.title) errors.push('Missing title');
    if (!fm.description) errors.push('Missing description');
    
    // Check if category is missing or invalid
    if (!fm.category) {
      errors.push('Missing category');
    }
    
    if (!fm.image) {
      errors.push('Missing hero image ("image" field)');
    } else {
      // Resolve path
      let imageFile = fm.image;
      if (imageFile.startsWith('/')) {
        imageFile = imageFile.slice(1);
      }
      const imgPath = path.join(PUBLIC_DIR, imageFile);
      if (!fs.existsSync(imgPath)) {
        errors.push(`Hero image specified but file not found: ${fm.image}`);
      }
    }
    
    if (errors.length > 0) {
      issues.push({
        file,
        title: fm.title || file,
        date,
        errors,
        frontmatter: fm
      });
    }
  }
  
  // Sort issues by date descending
  issues.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  console.log(`\n=== Blog Content Audit Results ===`);
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Files with issues: ${issues.length}\n`);
  
  for (const issue of issues) {
    console.log(`File: ${issue.file} (${issue.date})`);
    console.log(`Title: ${issue.title}`);
    for (const err of issue.errors) {
      console.log(`  - \x1b[31m[ERR]\x1b[0m ${err}`);
    }
    console.log('');
  }
  
  // Output JSON for the agent
  fs.writeFileSync('./scripts/blog-audit-report.json', JSON.stringify(issues, null, 2));
}

scan();
