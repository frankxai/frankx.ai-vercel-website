import type { ProducerMeta } from './types'

// 8 L4 producer specialists. Each reads the same substrate
// (personas, capture-types, inbox config) and produces per-platform output.
// Adding a producer is ~1 day of work — the pattern is the VIS shipping pattern.

export const producers: ProducerMeta[] = [
  {
    id: 'vis-producer',
    label: 'Visual Intelligence',
    status: 'shipped',
    shipped: '2026-05-13',
    description:
      'Image batch → per-platform strategy + variants + gap-fill briefs. Composes NB2 (premium hero), Higgsfield × 4 (cinematic + product + soul-id + marketplace-cards). The first producer; proved the shipping pattern.',
    acceptedCaptureTypes: ['photo-hero', 'photo-utility'],
    producedAssetTypes: [
      'hero-still',
      'cover',
      'carousel-frame',
      'thumbnail',
      'quote-card',
      'lifestyle-scene',
    ],
    targetPlatforms: [
      'linkedin',
      'instagram',
      'x',
      'youtube-long',
      'youtube-shorts',
      'tiktok',
      'spotify',
      'newsletter',
      'blog',
    ],
    skill: 'visual-intelligence',
    command: '/visual-strategy',
    agent: 'visual-intelligence-orchestrator',
    studioRoute: '/studio/visual',
    publicStatusBlurb: 'Live. Drop images, get a per-platform strategy.',
  },
  {
    id: 'video-producer',
    label: 'Video',
    status: 'partial',
    shipped: 'partial-existing',
    description:
      'Talking-head + B-roll → YouTube long-form + Shorts + TikTok + Reels. Uses the existing /talking-head-ship pipeline (Remotion + brand caption style). HyperFrames for caption-heavy variants. Higgsfield Soul ID for cutaways.',
    acceptedCaptureTypes: ['talking-head-video', 'b-roll-video'],
    producedAssetTypes: ['long-form-video', 'short-video', 'cinematic-clip', 'thumbnail'],
    targetPlatforms: ['youtube-long', 'youtube-shorts', 'tiktok', 'instagram'],
    skill: 'frankx-talking-head',
    command: '/talking-head-ship',
    studioRoute: '/studio/video',
    publicStatusBlurb: 'Live (existing /talking-head-ship). Substrate integration W20.',
  },
  {
    id: 'audio-producer',
    label: 'Audio',
    status: 'shipped',
    shipped: '2026-05-13',
    description:
      'Voice memo → blog draft + podcast snippet + newsletter excerpt. Whisper transcription, brand-voice gate, prose-producer hand-off for long-form blog. Highest-leverage producer — voice memos are Frank\'s most frequent capture.',
    acceptedCaptureTypes: ['voice-memo'],
    producedAssetTypes: ['blog-draft', 'podcast-snippet', 'newsletter-section', 'thread-post'],
    targetPlatforms: ['blog', 'podcast', 'newsletter', 'bluesky', 'x', 'threads', 'linkedin'],
    skill: 'audio-producer',
    command: '/audio-produce',
    studioRoute: '/studio/audio',
    publicStatusBlurb: 'Live. Voice memo → blog + podcast + newsletter excerpt.',
  },
  {
    id: 'music-producer',
    label: 'Music',
    status: 'shipped',
    shipped: '2026-06-03',
    description:
      'Music track → premium multi-format music video via the 3-layer stack (keyframe → motion → assembly) + cover + Spotify Canvas + Apple motion artwork. Design-thinking-first, cost-gated: every run produces a pre-flight card (cost + ROI + resonance) before a dollar is spent. Composes design-thinking + nb-image/Nano-Banana-Pro (keyframes) + Higgsfield generate_video / Veo (motion) + hyperframes (assembly). Catalog migrated from SIS (121 songs). Substrate: lib/music-video/.',
    acceptedCaptureTypes: ['music-track', 'music-seed'],
    producedAssetTypes: ['cover', 'cinematic-clip', 'long-form-video', 'short-video', 'carousel-post'],
    targetPlatforms: ['spotify', 'instagram', 'youtube-long', 'youtube-shorts', 'tiktok'],
    skill: 'music-video-producer',
    command: '/music-video',
    agent: 'music-producer',
    studioRoute: '/studio/music',
    publicStatusBlurb: 'Live. Song → cost-gated premium music video across 6 platform formats.',
  },
  {
    id: 'prose-producer',
    label: 'Prose',
    status: 'shipped',
    shipped: '2026-05-13',
    description:
      'Text seed (document, voice-memo transcript, idea note) → blog post + LinkedIn thread + X thread + newsletter section + Threads + Bluesky. Brand-voice gate applies. Pairs tightly with audio-producer.',
    acceptedCaptureTypes: ['document', 'quote'],
    producedAssetTypes: ['blog-draft', 'newsletter-section', 'thread-post'],
    targetPlatforms: ['blog', 'linkedin', 'x', 'threads', 'newsletter', 'bluesky'],
    skill: 'prose-producer',
    command: '/prose-produce',
    studioRoute: '/studio/prose',
    publicStatusBlurb: 'Live. Text seed → cross-platform with brand-voice gate.',
  },
  {
    id: 'screen-producer',
    label: 'Screen + Diagrams',
    status: 'shipped',
    shipped: '2026-05-13',
    description:
      'Screen-record + architecture-snap → tutorial blog + Short + GitHub README section + Mermaid diagram. The keystone for Solution-Engineer content; SE work routes through here for technical proof.',
    acceptedCaptureTypes: ['screen-record', 'architecture-snap'],
    producedAssetTypes: [
      'short-video',
      'blog-draft',
      'github-readme-section',
      'mermaid-diagram',
    ],
    targetPlatforms: ['github', 'blog', 'youtube-shorts', 'youtube-long', 'linkedin'],
    skill: 'screen-producer',
    command: '/screen-produce',
    studioRoute: '/studio/screen',
    publicStatusBlurb: 'Live. Screen-record → tutorial + README + Short. SE-specific keystone.',
  },
  {
    id: 'food-producer',
    label: 'Food',
    status: 'shipped',
    shipped: '2026-05-13',
    description:
      'Photo-food (+ optional voice-memo opinion) → IG post + Threads + running travel-blog entry. Small, fast specialist. Restaurant capture → ship in <10 min.',
    acceptedCaptureTypes: ['photo-food'],
    producedAssetTypes: ['carousel-post', 'thread-post'],
    targetPlatforms: ['instagram', 'threads', 'blog', 'stories'],
    skill: 'food-producer',
    command: '/food-produce',
    studioRoute: '/studio/food',
    publicStatusBlurb: 'Live. Restaurant photo + optional voice note → IG + Threads + travel-blog.',
  },
  {
    id: 'travel-producer',
    label: 'Travel',
    status: 'shipped',
    shipped: '2026-05-13',
    description:
      'Photo-travel (with EXIF GPS) → IG carousel + blog post + Stories. Location-rich, story-driven. Pairs with audio-producer for narrated travel logs.',
    acceptedCaptureTypes: ['photo-travel'],
    producedAssetTypes: ['carousel-post', 'blog-draft'],
    targetPlatforms: ['instagram', 'blog', 'stories', 'threads'],
    skill: 'travel-producer',
    command: '/travel-produce',
    studioRoute: '/studio/travel',
    publicStatusBlurb: 'Live. Travel photo with GPS → IG carousel + blog + Stories.',
  },
]

export function getProducer(id: ProducerMeta['id']): ProducerMeta | undefined {
  return producers.find((p) => p.id === id)
}

export function producersByStatus(status: ProducerMeta['status']): ProducerMeta[] {
  return producers.filter((p) => p.status === status)
}

export function producersAcceptingCaptureType(captureType: string): ProducerMeta[] {
  return producers.filter((p) => p.acceptedCaptureTypes.includes(captureType as never))
}
