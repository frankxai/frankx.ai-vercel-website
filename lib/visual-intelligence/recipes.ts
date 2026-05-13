import type { PlatformRecipe } from './types'

// Per-platform creation recipes. Each is a deterministic walk from input to output
// that the /visual-strategy command and visual-intelligence-orchestrator agent execute.

export const platformRecipes: PlatformRecipe[] = [
  {
    platform: 'linkedin',
    goal: 'Long-form thread or carousel teardown that earns saves and inbound DMs.',
    inputs: ['Hero image (NB2 or Higgsfield product-photoshoot)', 'Idea seed', 'Optional code snippet'],
    steps: [
      'Run brand-voice skill against the idea seed to generate the opening line',
      'Compose visual: NB2 hero or Higgsfield product-photoshoot in lifestyle_scene mode',
      'Build carousel frames: 1 hero + 6–9 explanation frames via higgsfield-generate (consistent grid)',
      'Pass through visual-creation 6-step gate',
      'Cross-post hook through hook-engineer skill',
    ],
    outputs: ['1 LinkedIn post (thread or carousel)', 'CRM-tagged post entry'],
    qualityGates: [
      'Opening line passes the AI-tone refusal list',
      'Hero image at 2K minimum',
      'Mention specific number, system, or proof in first 200 chars',
    ],
  },
  {
    platform: 'youtube-long',
    goal: '8–20 minute long-form video with paired blog post and Shorts cuts.',
    inputs: ['Topic brief', 'Talking-head A-roll (raw video)', 'Soul ID reference if cutaways needed'],
    steps: [
      'Transcribe via hyperframes-media (Whisper)',
      'Cut chapters via /talking-head-ship pipeline',
      'Generate B-roll via higgsfield-generate with --soul-id where Frank should appear off-camera',
      'Compose in Remotion with brand caption style',
      'Render, draft thumbnail in higgsfield-generate, write paired blog post',
      'Identify 3–5 Shorts cuts',
    ],
    outputs: ['1 long-form video', '1 paired blog post', '3–5 Shorts'],
    qualityGates: [
      'First 8 seconds names the system and the result',
      'Caption style matches design.md tokens',
      'Thumbnail passes brand-voice + design.md gate',
    ],
  },
  {
    platform: 'youtube-shorts',
    goal: 'Sub-60s captioned vertical with one insight and a clear hook.',
    inputs: ['Cut from /talking-head-ship', 'OR new talking-head clip', 'B-roll if cutaway needed'],
    steps: [
      'Pull hook pattern from hook-learn analytics',
      'Compose in HyperFrames with caption-style block from registry',
      'Insert higgsfield-generate b-roll cutaway if dead-air > 3s',
      'Add lower-third from HyperFrames registry',
      'Render and publish via /watch/shorts pipeline',
    ],
    outputs: ['1 Short with per-ID page entry'],
    qualityGates: [
      'Captions readable at smallest device size',
      'No dead-air > 3s without visual',
      'Hook lands in first 2s',
    ],
  },
  {
    platform: 'tiktok',
    goal: 'Same insight as Shorts, TikTok-native syntax.',
    inputs: ['Shorts cut as starting point'],
    steps: [
      'Re-cut hook for 3-second visual pattern interrupt',
      'Re-style captions to TikTok-native font/weight',
      'Re-color slightly warmer for TikTok feed feel',
      'Republish via HyperFrames render',
    ],
    outputs: ['1 TikTok with native caption styling'],
    qualityGates: ['Pattern interrupt in first 1s', 'Captions match TikTok-native sizing'],
  },
  {
    platform: 'instagram',
    goal: 'Visual-first post with liner-note caption.',
    inputs: ['NB2 hero or album cover', 'Carousel concept (optional)'],
    steps: [
      'Generate hero in NB2 at 2K minimum',
      'If carousel: 4–6 variants via higgsfield-product-photoshoot or higgsfield-generate',
      'Caption: liner-note style, two lines max — mood + listener',
      'Reels variant if it earns one (HyperFrames + higgsfield-generate motion)',
    ],
    outputs: ['1 Instagram post (single, carousel, or Reel)'],
    qualityGates: [
      'Soul spectrum (amber) consistent — no tech-spectrum bleed unless intentional',
      'Caption passes the AI-tone refusal list',
      'Cover image is the hook',
    ],
  },
  {
    platform: 'x',
    goal: 'Tight insight or threaded teardown.',
    inputs: ['Idea seed', 'Optional cinematic still'],
    steps: [
      'Compress to single sentence with number, name, or contradiction',
      'If thread: 5–9 tweets each earning the next',
      'Optional: higgsfield-generate cinematic still for visual punch',
    ],
    outputs: ['1 X post or thread'],
    qualityGates: ['First tweet passes AI-tone refusal list', 'Each tweet self-contained'],
  },
  {
    platform: 'threads',
    goal: 'Conversation-starter, lower-stakes than X.',
    inputs: ['Idea seed'],
    steps: [
      'Open with question or contrarian observation',
      'Reply-friendly format (open-ended, not closed)',
      'Optional quick higgsfield-generate visual',
    ],
    outputs: ['1 Threads post'],
    qualityGates: ['Open-ended phrasing', 'No corporate or AI-tone phrases'],
  },
  {
    platform: 'bluesky',
    goal: 'Mic-to-publish reflection per CIS MV1.',
    inputs: ['Voice memo', 'Optional thumbnail seed'],
    steps: [
      'Transcribe via hyperframes-media (Whisper)',
      'Lightly edit transcript for clarity',
      'Quick-generate thumbnail in higgsfield-generate (no deep production)',
      'Publish via CIS MV1 workflow',
    ],
    outputs: ['1 Bluesky post with thumbnail'],
    qualityGates: ['Same-day publish (speed is the value)', 'Reflection tone, not pitch'],
  },
  {
    platform: 'spotify',
    goal: 'Album/single cover at release-grade quality.',
    inputs: ['Track concept', 'Genre tag'],
    steps: [
      'Compose NB2 prompt with cinematic lighting + composition',
      'Generate at 2K minimum (mimeType-derived extension per the 2026-04-25 rule)',
      'Pass through visual-creation 6-step gate',
      'For lead tracks: pair with higgsfield-generate cinematic visualizer',
    ],
    outputs: ['1 cover (square 3000×3000) + optional visualizer'],
    qualityGates: [
      'Soul spectrum consistent',
      'Cover legible at 32×32 thumbnail size',
      'No text on cover (Spotify metadata handles it)',
    ],
  },
]

export function getRecipe(platform: PlatformRecipe['platform']): PlatformRecipe | undefined {
  return platformRecipes.find((r) => r.platform === platform)
}
