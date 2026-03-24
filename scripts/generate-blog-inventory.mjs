#!/usr/bin/env node
/**
 * Auto-generate blog article inventory from content/blog/*.mdx files
 *
 * Usage: node scripts/generate-blog-inventory.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUTPUT_FILE = path.join(ROOT, 'data', 'inventories', 'frankx', 'blog-articles.json');

// Simple frontmatter parser
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays (simple case)
    if (value.startsWith('[')) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        // Keep as string if parsing fails
      }
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    frontmatter[key] = value;
  }

  return frontmatter;
}

// Count words in content (excluding frontmatter and code blocks)
function countWords(content) {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');
  // Remove code blocks
  const withoutCode = withoutFrontmatter.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  const withoutInlineCode = withoutCode.replace(/`[^`]+`/g, '');
  // Remove markdown syntax
  const plainText = withoutInlineCode.replace(/[#*_\[\]()]/g, ' ');
  // Count words
  const words = plainText.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

// Calculate reading time
function calculateReadingTime(wordCount) {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Get file modification date
function getFileDate(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// Generate slug from filename
function generateSlug(filename) {
  return filename
    .replace(/^\d+-/, '')  // Remove leading numbers
    .replace(/\.mdx?$/, '')  // Remove extension
    .toLowerCase();
}

async function main() {
  console.log('📚 Generating blog article inventory...\n');

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all MDX files
  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .sort();

  console.log(`Found ${files.length} blog articles\n`);

  const articles = [];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = parseFrontmatter(content);
    const wordCount = countWords(content);
    const readingTime = calculateReadingTime(wordCount);
    const slug = generateSlug(file);

    const article = {
      id: slug,
      type: 'blog',
      title: frontmatter.title || file.replace(/\.mdx?$/, ''),
      description: frontmatter.description || frontmatter.excerpt || '',
      brand: 'frankx',
      status: frontmatter.draft === true ? 'draft' : 'published',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags :
            (frontmatter.tags ? [frontmatter.tags] : []),
      createdAt: frontmatter.date || frontmatter.publishedAt || getFileDate(filePath),
      updatedAt: frontmatter.lastUpdated || frontmatter.updatedAt || null,
      slug: slug,
      filePath: `content/blog/${file}`,
      wordCount: wordCount,
      readingTime: readingTime,
      category: frontmatter.category || 'General',
      series: frontmatter.series || null,
      seriesOrder: frontmatter.seriesOrder || null,
      featured: frontmatter.featured === true,
      seoTitle: frontmatter.seoTitle || frontmatter.title || null,
      seoDescription: frontmatter.seoDescription || frontmatter.description || null,
      ogImage: frontmatter.image || frontmatter.ogImage || null,
      author: frontmatter.author || 'Frank',
    };

    articles.push(article);
    console.log(`  ✓ ${article.title} (${wordCount} words)`);
  }

  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Create inventory object
  const inventory = {
    _generated: new Date().toISOString(),
    _source: 'content/blog/',
    _count: articles.length,
    articles: articles,
  };

  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(inventory, null, 2));

  console.log(`\n✅ Generated inventory with ${articles.length} articles`);
  console.log(`📁 Output: ${OUTPUT_FILE}`);

  // Print stats
  const totalWords = articles.reduce((sum, a) => sum + a.wordCount, 0);
  const categories = [...new Set(articles.map(a => a.category))];
  const tags = [...new Set(articles.flatMap(a => a.tags))];

  console.log(`\n📊 Stats:`);
  console.log(`   Total words: ${totalWords.toLocaleString()}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Unique tags: ${tags.length}`);
  console.log(`   Featured: ${articles.filter(a => a.featured).length}`);
}

main().catch(console.error);
