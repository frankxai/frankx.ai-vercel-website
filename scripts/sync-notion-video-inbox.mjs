#!/usr/bin/env node
/**
 * Sync Notion "Video Inbox" database → data/video-staging.json
 *
 * Flow:
 *  1. iOS/Android share-sheet → Notion database (URL field)
 *  2. This script runs hourly via GitHub Action
 *  3. New rows appear in data/video-staging.json for Frank to curate
 *  4. Frank promotes chosen videos to data/video-vault-100.json with commentary
 *
 * Required env:
 *   NOTION_TOKEN        — integration token with read access
 *   NOTION_VIDEO_DB_ID  — the Video Inbox database ID
 *
 * Notion database expected schema:
 *   - "URL"        (url)       : YouTube URL
 *   - "Title"      (title)     : optional override
 *   - "Note"       (rich_text) : optional commentary seed
 *   - "Category"   (select)    : AI Foundations | Build & Ship | ... | Mindset & Growth
 *   - "Persona"    (select)    : builder | creator | architect | all
 *   - "Synced"     (checkbox)  : set to true after sync so we skip next time
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DB = process.env.NOTION_VIDEO_DB_ID
const STAGING_PATH = path.resolve('data/video-staging.json')

if (!NOTION_TOKEN || !NOTION_DB) {
  console.error('[sync-notion-video-inbox] Missing NOTION_TOKEN or NOTION_VIDEO_DB_ID')
  process.exit(1)
}

const YOUTUBE_ID_RE =
  /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

function extractYouTubeId(url) {
  if (!url) return null
  const m = url.match(YOUTUBE_ID_RE)
  return m ? m[1] : null
}

function inferFormat(url) {
  return url.includes('/shorts/') ? 'short' : 'long'
}

async function fetchNotionPages() {
  const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        property: 'Synced',
        checkbox: { equals: false },
      },
      page_size: 100,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Notion API ${res.status}: ${text}`)
  }
  const data = await res.json()
  return data.results || []
}

function parseNotionPage(page) {
  const props = page.properties || {}
  const urlProp = props.URL?.url
  if (!urlProp) return null
  const id = extractYouTubeId(urlProp)
  if (!id) return null

  const titleProp =
    props.Title?.title?.map((t) => t.plain_text).join('') || 'Untitled'
  const note =
    props.Note?.rich_text?.map((t) => t.plain_text).join('') || ''
  const category = props.Category?.select?.name || 'Uncategorized'
  const persona = props.Persona?.select?.name || 'all'

  return {
    id,
    title: titleProp,
    channel: '',
    url: urlProp,
    format: inferFormat(urlProp),
    commentary: note,
    category,
    persona,
    status: 'discovered',
    tags: [],
    notionPageId: page.id,
    discoveredAt: page.created_time,
  }
}

async function markSynced(pageId) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { Synced: { checkbox: true } },
    }),
  })
  if (!res.ok) {
    console.warn(`[sync-notion-video-inbox] Failed to mark ${pageId} synced`)
  }
}

async function loadStaging() {
  try {
    const raw = await fs.readFile(STAGING_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function main() {
  console.log('[sync-notion-video-inbox] Starting sync…')
  const pages = await fetchNotionPages()
  console.log(`[sync-notion-video-inbox] Found ${pages.length} unsynced Notion rows`)

  const staging = await loadStaging()
  const existingIds = new Set(staging.map((v) => v.id))
  const toAdd = []

  for (const page of pages) {
    const parsed = parseNotionPage(page)
    if (!parsed) {
      console.warn(`[sync-notion-video-inbox] Skipping page with invalid URL`)
      continue
    }
    if (existingIds.has(parsed.id)) {
      console.log(`[sync-notion-video-inbox] Skipping duplicate: ${parsed.id}`)
      await markSynced(parsed.notionPageId)
      continue
    }
    toAdd.push(parsed)
  }

  if (toAdd.length === 0) {
    console.log('[sync-notion-video-inbox] Nothing new to add')
    return
  }

  const updated = [...staging, ...toAdd]
  await fs.writeFile(STAGING_PATH, JSON.stringify(updated, null, 2) + '\n')
  console.log(
    `[sync-notion-video-inbox] Added ${toAdd.length} videos to ${STAGING_PATH}`
  )

  // Mark all as synced in Notion
  for (const video of toAdd) {
    await markSynced(video.notionPageId)
  }

  // Emit summary for GH Action
  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(
      process.env.GITHUB_OUTPUT,
      `added=${toAdd.length}\nids=${toAdd.map((v) => v.id).join(',')}\n`
    )
  }
}

main().catch((err) => {
  console.error('[sync-notion-video-inbox] FAILED:', err)
  process.exit(1)
})
