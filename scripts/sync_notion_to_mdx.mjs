#!/usr/bin/env node

import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

const DATABASE_ID = process.env.NOTION_BLOG_DB_ID
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images', 'notion')

// Ensure directories exist
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true })
}

/**
 * Download image from URL to local public directory
 */
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(IMAGE_DIR, filename)

    // Check if already exists
    if (fs.existsSync(filepath)) {
      console.log(`  ✓ Image already exists: ${filename}`)
      resolve(`/images/notion/${filename}`)
      return
    }

    const file = fs.createWriteStream(filepath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        console.log(`  ✓ Downloaded: ${filename}`)
        resolve(`/images/notion/${filename}`)
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      console.error(`  ✗ Failed to download ${filename}:`, err.message)
      reject(err)
    })
  })
}

/**
 * Extract tags from Notion multi-select property
 */
function extractTags(page) {
  const tags = page.properties.Tags?.multi_select || []
  return tags.map(tag => tag.name)
}

/**
 * Extract category from Notion select property
 */
function extractCategory(page) {
  return page.properties.Category?.select?.name || 'Uncategorized'
}

/**
 * Extract date from Notion date property
 */
function extractDate(page) {
  const dateObj = page.properties.Date?.date
  if (dateObj?.start) {
    return new Date(dateObj.start).toISOString().split('T')[0]
  }
  return new Date().toISOString().split('T')[0]
}

/**
 * Process Notion blocks and download images
 */
async function processContent(pageId) {
  const mdblocks = await n2m.pageToMarkdown(pageId)
  let content = n2m.toMarkdownString(mdblocks).parent

  // Find all image URLs in markdown
  const imageRegex = /!\[.*?\]\((https:\/\/.*?)\)/g
  const matches = [...content.matchAll(imageRegex)]

  for (const match of matches) {
    const imageUrl = match[1]
    const filename = `${pageId}-${Date.now()}-${path.basename(new URL(imageUrl).pathname)}`

    try {
      const localPath = await downloadImage(imageUrl, filename)
      content = content.replace(imageUrl, localPath)
    } catch (err) {
      console.error(`  ✗ Skipping image: ${err.message}`)
    }
  }

  return content
}

/**
 * Convert video URLs to embeds
 */
function processVideoEmbeds(content) {
  // YouTube
  content = content.replace(
    /https:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g,
    '<Video provider="youtube" videoId="$2" />'
  )

  // Vimeo
  content = content.replace(
    /https:\/\/(www\.)?vimeo\.com\/(\d+)/g,
    '<Video provider="vimeo" videoId="$2" />'
  )

  return content
}

/**
 * Sync a single Notion page to MDX
 */
async function syncPage(page) {
  const title = page.properties.Name?.title[0]?.plain_text || 'Untitled'
  const slug = page.properties.Slug?.rich_text[0]?.plain_text ||
                title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const description = page.properties.Description?.rich_text[0]?.plain_text || ''
  const author = page.properties.Author?.rich_text[0]?.plain_text || 'FrankX.ai'
  const featured = page.properties.Featured?.checkbox || false

  console.log(`\n📝 Processing: ${title}`)
  console.log(`   Slug: ${slug}`)

  try {
    // Get content and process images
    let content = await processContent(page.id)

    // Process video embeds
    content = processVideoEmbeds(content)

    // Build frontmatter
    const frontmatter = `---
title: "${title}"
description: "${description}"
date: "${extractDate(page)}"
author: "${author}"
tags: ${JSON.stringify(extractTags(page))}
category: "${extractCategory(page)}"
featured: ${featured}
source: "notion"
---

${content}`

    // Write MDX file
    const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
    fs.writeFileSync(filepath, frontmatter, 'utf8')
    console.log(`   ✅ Created: ${slug}.mdx`)

    // Update Notion status to "Published"
    await notion.pages.update({
      page_id: page.id,
      properties: {
        Status: {
          select: { name: 'Published' }
        }
      }
    })
    console.log(`   ✅ Updated Notion status to Published`)

    return { success: true, slug }
  } catch (error) {
    console.error(`   ✗ Error processing ${title}:`, error.message)
    return { success: false, slug, error: error.message }
  }
}

/**
 * Main sync function
 */
async function syncNotionBlog() {
  if (!DATABASE_ID) {
    console.error('❌ NOTION_BLOG_DB_ID environment variable not set')
    console.error('   Please add it to your .env.local file')
    process.exit(1)
  }

  if (!process.env.NOTION_API_KEY) {
    console.error('❌ NOTION_API_KEY environment variable not set')
    console.error('   Please add it to your .env.local file')
    process.exit(1)
  }

  console.log('\n🔄 Starting Notion → MDX sync...\n')

  try {
    // Query Notion database for "Ready to Publish" posts
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Ready to Publish'
        }
      }
    })

    const pages = response.results

    if (pages.length === 0) {
      console.log('✨ No posts marked "Ready to Publish"')
      console.log('   Update status in Notion to publish posts\n')
      return
    }

    console.log(`📚 Found ${pages.length} post(s) to sync`)

    const results = []
    for (const page of pages) {
      const result = await syncPage(page)
      results.push(result)
    }

    // Summary
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    console.log('\n' + '='.repeat(50))
    console.log(`✅ Successfully synced: ${successful} post(s)`)
    if (failed > 0) {
      console.log(`❌ Failed: ${failed} post(s)`)
    }
    console.log('='.repeat(50) + '\n')

  } catch (error) {
    console.error('\n❌ Sync failed:', error.message)
    if (error.code === 'object_not_found') {
      console.error('   Check that NOTION_BLOG_DB_ID is correct')
    } else if (error.code === 'unauthorized') {
      console.error('   Check that NOTION_API_KEY has access to the database')
    }
    process.exit(1)
  }
}

// Run sync
syncNotionBlog()
