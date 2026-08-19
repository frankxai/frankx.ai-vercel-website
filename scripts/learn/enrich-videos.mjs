#!/usr/bin/env node
/**
 * enrich-videos.mjs — the video-intelligence pipeline for /learn portals.
 *
 * Turns each curated video into indexable substance: fetches the transcript,
 * drafts 3-5 key takeaways + a Frank-voice "AI Architect's take", and writes a
 * REVIEW FILE for Frank to edit before it lands in data/learning-paths.ts.
 *
 * WHY IT LIVES HERE BUT RUNS ELSEWHERE
 *   The site's CI/build sandbox has no YouTube network access (verified: HTTP
 *   000). Run this in an environment with network — Frank's Claude Code /
 *   Antigravity — not in the Vercel build.
 *
 * USAGE
 *   OPENROUTER_API_KEY=... node scripts/learn/enrich-videos.mjs <portal-slug>
 *   e.g. node scripts/learn/enrich-videos.mjs claude-mastery
 *
 * OUTPUT
 *   data/learn-enrichment/<slug>.draft.json — { [videoId]: { keyTakeaways,
 *   architectNote, transcriptUrl } }. Review, edit into Frank's voice, then
 *   paste the fields onto the matching videos in data/learning-paths.ts.
 *   Nothing is written to the live data file automatically — the human voice
 *   pass is the point.
 *
 * DESIGN NOTES
 *   - LLM route = OpenRouter per ~/.claude/CLAUDE.md (OPENROUTER_API_KEY +
 *     OPENROUTER_BASE_URL). Swap MODEL below as desired.
 *   - Transcript fetch uses YouTube's public timedtext endpoint; if a video
 *     has no public captions it is skipped and logged (not fabricated).
 *   - The architect-note prompt encodes Frank's voice constraints (results
 *     over claims, no hype) so drafts start on-brand.
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'data', 'learn-enrichment')
const MODEL = process.env.ENRICH_MODEL || 'anthropic/claude-opus-4-8'
const OPENROUTER_BASE = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'

const FORBIDDEN = [
  'revolutionary', 'transformative', 'unlock', 'harness', 'leverage',
  'game-changing', 'next-generation', 'cutting-edge', 'seamless',
]

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node scripts/learn/enrich-videos.mjs <portal-slug>')
  process.exit(1)
}
if (!process.env.OPENROUTER_API_KEY) {
  console.error('Set OPENROUTER_API_KEY (this drafts the takeaways + architect notes).')
  process.exit(1)
}

// ── Load the portal's videos by regex-reading the data file (no TS import
//    needed; keeps this runnable as plain node). ────────────────────────────
function loadVideos(portalSlug) {
  const src = fs.readFileSync(path.join(ROOT, 'data', 'learning-paths.ts'), 'utf8')
  const start = src.indexOf(`slug: '${portalSlug}'`)
  if (start === -1) throw new Error(`Portal '${portalSlug}' not found in data/learning-paths.ts`)
  // Grab the videos: [...] array within this entry (until the next top-level field after it).
  const videosIdx = src.indexOf('videos: [', start)
  const block = src.slice(videosIdx, src.indexOf('\n    ],', videosIdx))
  const videos = []
  const re = /id:\s*'([^']+)'[\s\S]*?youtubeId:\s*'([^']+)'[\s\S]*?title:\s*(?:'([^']*)'|"([^"]*)")/g
  let m
  while ((m = re.exec(block)) !== null) {
    videos.push({ id: m[1], youtubeId: m[2], title: m[3] || m[4] || '' })
  }
  return videos
}

// ── Transcript via YouTube timedtext (public captions only). ────────────────
async function fetchTranscript(youtubeId) {
  const listUrl = `https://www.youtube.com/api/timedtext?type=list&v=${youtubeId}`
  const list = await fetch(listUrl).then((r) => r.text()).catch(() => '')
  const langMatch = list.match(/lang_code="([^"]+)"/)
  const lang = langMatch ? langMatch[1] : 'en'
  const trackUrl = `https://www.youtube.com/api/timedtext?lang=${lang}&v=${youtubeId}`
  const xml = await fetch(trackUrl).then((r) => r.text()).catch(() => '')
  if (!xml) return null
  const text = xml
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;#39;/g, "'")
    .replace(/&amp;quot;/g, '"')
    .replace(/&amp;amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
  return text || null
}

// ── Draft takeaways + architect-note in Frank's voice. ──────────────────────
async function draft(video, transcript) {
  const system = [
    'You are drafting learning-portal enrichment in the voice of Frank (FrankX) — an AI Architect.',
    'Voice: results over claims, precise and technical, humble excellence, show don\'t tell.',
    'HARD BAN on hype words: ' + FORBIDDEN.join(', ') + ', and any spiritual/grandiose language.',
    'Return STRICT JSON only: { "keyTakeaways": string[3..5], "architectNote": string }.',
    'keyTakeaways: concrete points a viewer actually takes away from THIS video, grounded in the transcript.',
    'architectNote: 2-3 sentences of Frank\'s own judgment — what matters, what he\'d do differently, where the leverage is. Never repeat the takeaways.',
  ].join('\n')
  const user = `Video: "${video.title}"\n\nTranscript (may be truncated):\n${transcript.slice(0, 12000)}`

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    }),
  })
  if (!res.ok) throw new Error(`LLM ${res.status}: ${await res.text()}`)
  const json = await res.json()
  const content = json.choices?.[0]?.message?.content ?? '{}'
  return JSON.parse(content)
}

async function main() {
  const videos = loadVideos(slug)
  console.log(`[enrich] ${slug}: ${videos.length} videos`)
  const out = {}
  for (const v of videos) {
    process.stdout.write(`  · ${v.title.slice(0, 60)} … `)
    const transcript = await fetchTranscript(v.youtubeId)
    if (!transcript) {
      console.log('no public transcript — skipped')
      continue
    }
    try {
      const drafted = await draft(v, transcript)
      out[v.id] = {
        ...drafted,
        transcriptUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
      }
      console.log('drafted')
    } catch (e) {
      console.log(`draft failed: ${e.message}`)
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const outPath = path.join(OUT_DIR, `${slug}.draft.json`)
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2))
  console.log(`\n[enrich] wrote ${outPath}`)
  console.log('[enrich] Review + edit into your voice, then paste keyTakeaways/architectNote onto the matching videos in data/learning-paths.ts.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
