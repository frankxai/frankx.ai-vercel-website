import type { Platform } from './types'

// 14 per-platform recipes. Each describes how content lands on that platform
// given any compatible producer input. Substrate read by all 8 L4 producers
// + the multimodal-orchestrator when planning dispatch.
//
// Pattern: extends the original 9 image-only recipes from
// lib/visual-intelligence/recipes.ts with 5 new platform recipes covering
// influencer + SE archetypes (newsletter, podcast, github, stories, blog).

export interface PlatformRecipe {
  platform: Platform
  goal: string
  inputs: string[]
  steps: string[]
  outputs: string[]
  qualityGates: string[]
  cadenceConstraint?: string // optional rhythm rule
}

export const platformRecipes: PlatformRecipe[] = [
  // ─────────────────────────────────────────────────────────────────────
  // INFLUENCER + SE platforms (NEW in 2026-05-13)
  // ─────────────────────────────────────────────────────────────────────
  {
    platform: 'newsletter',
    goal: 'Weekly AI Architect Newsletter section — 200-400 words, one big idea + supporting notes, opens with a question the reader is already asking.',
    inputs: [
      'Source from audio-producer (voice memo → idea distillation) OR prose-producer (text seed)',
      'Active forcing functions (workshop deadlines, launches) for "what mattered this week"',
      'Hook pattern from hook-learn analytics (best newsletter subject lines)',
    ],
    steps: [
      'Identify the "one big idea" — the strongest argument from the week\'s prose-producer + audio-producer outputs',
      'Open with a question (subject line + first paragraph): a question the reader is already asking',
      'Body: lead with the answer in one sentence, then earn the rest with proof (number, name, system)',
      'Close with 3 "short notes" — adjacent insights, each 1-2 sentences',
      'Add "Tool of the week" — a tactical resource Frank actually used',
      'Pass through brand-voice gate (refusal list)',
      'JSON-LD: NewsArticle schema',
    ],
    outputs: [
      'newsletter-section.md (200-400 words)',
      'subject-line-options.md (3-5 variants)',
      'tool-of-week.md (the tactical resource)',
    ],
    qualityGates: [
      'Subject line is a question the reader is already asking',
      'First paragraph answers it in 1 sentence',
      'No AI-tone phrases',
      'One specific number, name, or system per paragraph',
      'Total length: 200-400 words for section; 800-1500 for full issue',
    ],
    cadenceConstraint: 'Weekly send, Sunday morning. Reliability earns the open.',
  },
  {
    platform: 'podcast',
    goal: 'Audio long-form episode OR 90-second cross-promo snippet for Spotify/Apple Podcasts. Source: voice memo (snippet) or talking-head transcript (full episode).',
    inputs: [
      'Source from audio-producer (90s snippet) OR full voice memo conversation (full episode)',
      'Episode cover spec from vis-producer',
      'Hook line from hook-engineer (first 30 seconds)',
    ],
    steps: [
      'Pick episode type: snippet (90s) OR full (20-45 min)',
      'For snippet: identify the densest 90 seconds of source audio (highest insight-per-second)',
      'For full episode: outline 3-5 segments + intro hook + outro CTA',
      'Generate cover via vis-producer → NB2 brief (soul or tech spectrum depending on topic)',
      'Write episode metadata: title, description (200 chars), keywords (5-7)',
      'Extract audio file via ffmpeg if source is video',
      'Validate RSS feed structure if publishing',
    ],
    outputs: [
      'episode-spec.md (title + description + segment outline)',
      'audio-source.<ext> (extracted/source file ready for upload)',
      'cover-brief.md (vis-producer NB2 spec)',
      'rss-entry.xml (for self-hosted feed)',
    ],
    qualityGates: [
      'First 30 seconds: name the listener + promise the takeaway',
      'No throat-clearing intros ("hello and welcome to another episode...")',
      'Cover is brand-on (soul or tech spectrum consistent)',
      'Audio level normalized (LUFS check)',
      'Snippets: hook decides retention — front-load the value',
    ],
    cadenceConstraint: 'Bi-weekly minimum. Tuesday morning drops. Snippets daily as Bluesky/X cross-promo.',
  },
  {
    platform: 'github',
    goal: 'README sections, repo descriptions, social cards, semantic-versioned releases. Source: screen-producer (system demos) + prose-producer (long-form context).',
    inputs: [
      'Source from screen-producer (system demo + Mermaid diagram)',
      'Repo name + canonical URL',
      'Frank-built systems context (ACOS, IIS, VIS, Library OS, library-os repo)',
    ],
    steps: [
      'Repo description: the elevator pitch in <140 chars (becomes the first impression)',
      'README first paragraph: answer "what is this and why should I care" in 2 sentences',
      'Quick demo: animated GIF OR YouTube embed OR Mermaid diagram (text-as-image preferred)',
      'Core API snippet: shortest code that demonstrates the value',
      'Install + usage: copy-paste-and-go (no missing steps)',
      'Architecture section: Mermaid diagram (NEVER raster — git-diff-friendly)',
      'Roadmap or status badges (build, license, version, downloads)',
      'Link to tutorial blog post on frankx.ai',
    ],
    outputs: [
      'readme-section.md (the new content to add or replace)',
      'mermaid-diagram.md (architecture or flowchart)',
      'social-card-spec.md (PNG spec for repo social preview)',
      'release-notes.md (if release-triggered)',
    ],
    qualityGates: [
      'Mermaid > raster everywhere possible (PR-friendly diffs)',
      'External doc links verifiable (no invented URLs)',
      'Code snippets are runnable (not paraphrased)',
      'License clearly stated (MIT for Frank\'s OSS by default)',
      'Cross-link to frankx.ai counterpart',
    ],
    cadenceConstraint: 'Continuous — every meaningful commit matters. README updates pair with each minor version.',
  },
  {
    platform: 'stories',
    goal: 'Instagram Stories — ephemeral, lower-stakes, 24h surface. Behind-the-scenes, in-progress shots, quick reflections. Speed is the value.',
    inputs: [
      'Source: photo-utility / photo-food / photo-travel / b-roll-video',
      'Optional: 1-2 line text overlay (mood + context)',
      'Cadence: 3-7 per active day; off-days are fine',
    ],
    steps: [
      'Crop / format to 9:16 vertical (1080×1920)',
      'Add minimal text overlay: 2 lines max, in present tense',
      'Choose music or ambient audio if appropriate (Soul spectrum)',
      'Sequence drops if multiple: 3 max in one block (avoid story-fatigue)',
      'No deep production — speed is the brand signal',
    ],
    outputs: [
      'stories-frame.md (per-frame: image + overlay + duration)',
      'stories-sequence-spec.md (drop order if multi-frame)',
    ],
    qualityGates: [
      'Aspect 9:16',
      'Text overlay readable on small mobile screens',
      'Present-tense voice ("Here is what I am working on right now")',
      'No production lift above necessary — 5-min ship time max',
    ],
    cadenceConstraint: '3-7 per active day. 24h ephemeral — forgive inactivity.',
  },
  {
    platform: 'blog',
    goal: 'Long-form essay on frankx.ai/blog. The canonical home for an idea. 1500-3000 words. SEO-optimized. JSON-LD. Cross-linked to ≥3 internal pages.',
    inputs: [
      'Source from prose-producer (text seed expanded) OR audio-producer (transcript → long-form) OR screen-producer (tutorial)',
      'Hero image brief from vis-producer (NB2)',
      'Internal-link candidates from existing /blog corpus',
    ],
    steps: [
      'TL;DR in first 100 words (per CLAUDE.md SEO checklist)',
      'Question-based H2s (3-7)',
      'Body: one idea per paragraph, concrete examples, code blocks in JetBrains Mono',
      'FAQ section (5+ questions)',
      'Internal links (3+) to existing frankx.ai content',
      'Hero image (NB2 or Higgsfield) at 2K+ resolution',
      'JSON-LD: Article schema + FAQPage schema',
      'Meta title (<60 chars) + description (<160 chars)',
      'Sitemap entry with priority 0.7-0.9 + weekly changeFrequency',
    ],
    outputs: [
      'blog-draft.mdx (MDX with frontmatter)',
      'hero-image-brief.md (vis-producer spec)',
      'social-card-spec.md (Open Graph)',
      'internal-links.json (3+ verified)',
    ],
    qualityGates: [
      'TL;DR present (first 100 words)',
      'Question-based H2s',
      'FAQ section with 5+ entries',
      'JSON-LD validates',
      'Mobile-readable (paragraph lengths, line breaks)',
      'Brand-voice refusal list passes',
      'Read-aloud test passes',
    ],
    cadenceConstraint: '1-2 essays per week. Paired with LinkedIn thread + X thread on publish day.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // CREATOR platforms
  // ─────────────────────────────────────────────────────────────────────
  {
    platform: 'instagram',
    goal: 'Visual-first post with liner-note caption. Soul spectrum. Cover image carries the hook.',
    inputs: ['NB2 hero or album cover', 'Carousel concept (optional)', 'Voice opinion if paired'],
    steps: [
      'Generate hero in NB2 at 2K minimum',
      'If carousel: 4-6 variants via higgsfield-product-photoshoot or higgsfield-generate',
      'Caption: liner-note style, two lines max — mood + listener',
      'Reels variant if it earns one (HyperFrames + higgsfield-generate motion)',
    ],
    outputs: ['Instagram post (single, carousel, or Reel)', 'caption.md', 'cover-spec.md'],
    qualityGates: [
      'Soul spectrum consistent — no tech-spectrum bleed unless intentional',
      'Caption passes AI-tone refusal list',
      'Cover image is the hook',
      'No emoji as design element',
    ],
    cadenceConstraint: '4 posts + 2 stories per week. Album drops trigger Reel pipeline.',
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
    qualityGates: ['Captions readable at smallest device size', 'No dead-air > 3s without visual', 'Hook lands in first 2s'],
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
    platform: 'spotify',
    goal: 'Album/single cover at release-grade quality.',
    inputs: ['Track concept', 'Genre tag'],
    steps: [
      'Compose NB2 prompt with cinematic lighting + composition',
      'Generate at 2K minimum (mimeType-derived extension)',
      'Pass through visual-creation 6-step gate',
      'For lead tracks: pair with higgsfield-generate cinematic visualizer',
    ],
    outputs: ['1 cover (3000×3000 square) + optional visualizer'],
    qualityGates: ['Soul spectrum consistent', 'Cover legible at 32×32 thumbnail size', 'No text on cover (Spotify metadata handles it)'],
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
    cadenceConstraint: '1 video every 10-14 days. Quality over rhythm.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // INFLUENCER platforms
  // ─────────────────────────────────────────────────────────────────────
  {
    platform: 'linkedin',
    goal: 'Long-form thread or carousel teardown that earns saves and inbound DMs.',
    inputs: ['Hero image (NB2 or Higgsfield product-photoshoot)', 'Idea seed', 'Optional code snippet'],
    steps: [
      'Run brand-voice skill against the idea seed to generate the opening line',
      'Compose visual: NB2 hero or Higgsfield product-photoshoot in lifestyle_scene mode',
      'Build carousel frames: 1 hero + 6-9 explanation frames via higgsfield-generate (consistent grid)',
      'Pass through visual-creation 6-step gate',
      'Cross-post hook through hook-engineer skill',
    ],
    outputs: ['1 LinkedIn post (thread or carousel)', 'CRM-tagged post entry'],
    qualityGates: [
      'Opening line passes the AI-tone refusal list',
      'Hero image at 2K minimum',
      'Mention specific number, system, or proof in first 200 chars',
    ],
    cadenceConstraint: '3 posts per week — 1 long-form thread, 1 short insight, 1 carousel teardown.',
  },
  {
    platform: 'x',
    goal: 'Tight insight or threaded teardown.',
    inputs: ['Idea seed', 'Optional cinematic still'],
    steps: [
      'Compress to single sentence with number, name, or contradiction',
      'If thread: 5-9 tweets each earning the next',
      'Optional: higgsfield-generate cinematic still for visual punch',
    ],
    outputs: ['1 X post or thread'],
    qualityGates: ['First tweet passes AI-tone refusal list', 'Each tweet self-contained'],
    cadenceConstraint: 'Daily. 1 thread per week.',
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
    cadenceConstraint: '5 per week. Repurposed X drafts that need more breathing room.',
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
    cadenceConstraint: 'Daily per CIS MV1.',
  },
]

export function getRecipe(platform: Platform): PlatformRecipe | undefined {
  return platformRecipes.find((r) => r.platform === platform)
}

export function recipesByPlatforms(platforms: Platform[]): PlatformRecipe[] {
  return platformRecipes.filter((r) => platforms.includes(r.platform))
}
