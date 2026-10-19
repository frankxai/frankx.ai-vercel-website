import type { PlatformPersona } from './types'

// Canonical persona matrix for ALL content operations (not just images).
// Replaces lib/visual-intelligence/platform-personas.ts as source of truth.
// VIS file remains as a back-compat shim that re-exports from here.

export const platformPersonas: PlatformPersona[] = [
  // ─────────────────────────────────────────────────────────────────────
  // INFLUENCER + SE personas
  // ─────────────────────────────────────────────────────────────────────
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    persona: 'AI Architect — the former Oracle architecture bridge story',
    voicePosture:
      'First-person, technically precise, enterprise-fluent. Enterprise CoE frameworks translated to personal use, free.',
    visualTreatment:
      'Cinematic stills with negative space for thread overlay, system diagrams in JetBrains Mono, carousel-format teardowns of real architectures.',
    cadence: '3 posts per week — 1 long-form thread, 1 short insight, 1 carousel teardown.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate', 'higgsfield-product-photoshoot'],
    hookPattern:
      'Specific number + counterintuitive claim. "Enterprise CoE playbooks can be translated to a solo-builder system." Lead with proof, never with adjectives.',
    exampleSurfaces: [
      '/intelligence-system',
      '/ai-architect/ai-coe-hub',
      '/blog/what-is-agentic-ai',
    ],
    forcingFunction: 'NLDigital 2026-05-19 / Madrid 2026-05-27 workshops drive thread frequency.',
    spectrum: 'tech',
    archetype: 'influencer',
  },
  {
    platform: 'newsletter',
    label: 'Newsletter (Beehiiv)',
    persona: 'The Curator — weekly synthesis of what mattered',
    voicePosture:
      'Opinionated reading list. First-person, three-minute read, one big idea + three short notes + one tool of the week.',
    visualTreatment:
      'One hero image at top (NB2 or Higgsfield product-photoshoot lifestyle-scene), inline diagrams in JetBrains Mono, no decorative images mid-section.',
    cadence: 'Weekly, Sunday morning. Same time, every week. Reliability earns the open.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate'],
    hookPattern:
      'Subject line = a question the reader is already asking. First paragraph answers it in one sentence, then earns the rest.',
    exampleSurfaces: ['/blog'],
    spectrum: 'tech',
    archetype: 'influencer',
  },
  {
    platform: 'podcast',
    label: 'Podcast (RSS → Spotify/Apple)',
    persona: 'The Studio Host — audio long-form, conversational',
    voicePosture:
      'Studio voice. 20–45 minutes. Solo monologue OR guest conversation. The grown-up version of voice-memo content.',
    visualTreatment:
      'Per-episode cover (NB2, soul or tech spectrum depending on topic), waveform visualizer for Instagram/TikTok promo clips.',
    cadence: 'Bi-weekly minimum. Episode drops Tuesday morning.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate'],
    hookPattern:
      'First 30 seconds names the listener and promises the takeaway. "If you build AI systems for enterprises, this is the conversation you need." No throat-clearing.',
    exampleSurfaces: [],
    spectrum: 'bridge',
    archetype: 'influencer',
  },
  {
    platform: 'github',
    label: 'GitHub',
    persona: 'The Open-Source Builder — READMEs as primary marketing',
    voicePosture:
      'Technical, precise, with personality. The README is the sales page. Commit cadence is the trust signal.',
    visualTreatment:
      'Mermaid diagrams over screenshots. SVG architecture diagrams in repo. Hero image only for the social card.',
    cadence: 'Continuous — every meaningful commit matters. README updates pair with each minor version.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate', 'screen-record'],
    hookPattern:
      'Repo description = the elevator pitch. README first paragraph answers "what is this and why should I care" in 2 sentences.',
    exampleSurfaces: ['github.com/frankxai/library-os', 'github.com/frankxai/Starlight-Intelligence-System'],
    spectrum: 'tech',
    archetype: 'solution-engineer',
  },
  {
    platform: 'youtube-long',
    label: 'YouTube (long-form)',
    persona: 'The Builder — behind-the-scenes of shipped systems',
    voicePosture:
      'Studio voice. Walk-throughs of ACOS, IIS, Watch OS, Workshop OS. Show the code, narrate the why.',
    visualTreatment:
      'Talking-head A-roll + Soul-ID Frank for B-roll cutaways where you cannot be on camera + JetBrains code overlays.',
    cadence: '1 video every 10–14 days. Quality over rhythm. Each ships with a paired blog post.',
    primaryAssetSource: ['remotion', 'higgsfield-soul-id', 'higgsfield-generate'],
    hookPattern:
      'First 8 seconds: state the system, name the result. "I built an investment intelligence system that costs €0/month and replaces a $300/month advisor."',
    exampleSurfaces: ['/watch', '/os', '/intelligence-system'],
    spectrum: 'tech',
    archetype: 'solution-engineer',
  },
  {
    platform: 'youtube-shorts',
    label: 'YouTube Shorts',
    persona: 'The Creator — one insight, sub-60s, captioned',
    voicePosture: 'Tight. One idea per short. The hook is the title.',
    visualTreatment:
      'HyperFrames composition with caption-style block + Higgsfield 5–15s cinematic cutaway + brand lower-third.',
    cadence: '5 per week. Batch on Sunday from /watch/shorts pipeline.',
    primaryAssetSource: ['hyperframes', 'higgsfield-generate'],
    hookPattern:
      'Pattern from hook-learn analytics: question + delayed payoff. "Here is the one rule that made my AI agent 3x more reliable. (It is not what you think.)"',
    exampleSurfaces: ['/watch/shorts'],
    spectrum: 'tech',
    archetype: 'creator',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    persona: 'The Creator — same soul as Shorts, different syntax',
    voicePosture: 'Faster, looser, lower-fi. Caption-on, sound-on, vertical native.',
    visualTreatment:
      'HyperFrames composition tuned for TikTok caption ceiling + native font weight + Higgsfield Seedance for motion-heavy clips.',
    cadence: '5 per week, repurposed from Shorts cuts with TikTok-native captions and sound choices.',
    primaryAssetSource: ['hyperframes', 'higgsfield-generate'],
    hookPattern:
      'Three-second visual hook BEFORE the verbal hook. Pattern interrupt → claim → payoff in <60s.',
    exampleSurfaces: ['/watch/shorts'],
    spectrum: 'tech',
    archetype: 'creator',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    persona: 'The Aesthete — the 12k music catalog and generative art',
    voicePosture:
      'Visual-first. Caption is liner notes, not pitch. Soul spectrum dominant — this is the music side of the brand.',
    visualTreatment:
      'NB2 hero covers + Higgsfield carousel variants (4–6 frames per post) + occasional Reels from HyperFrames.',
    cadence: '4 posts + 2 stories per week. Album drops trigger Reel pipeline.',
    primaryAssetSource: ['nb-image', 'higgsfield-product-photoshoot', 'music-video-batch'],
    hookPattern:
      'Cover image carries the hook. First line of caption names the mood, second line names the listener.',
    exampleSurfaces: ['/music', '/library'],
    spectrum: 'soul',
    archetype: 'creator',
  },
  {
    platform: 'stories',
    label: 'Stories (Instagram)',
    persona: 'The Daily Notebook — ephemeral, lower production, behind-the-scenes',
    voicePosture:
      'Casual, immediate, present-tense. Voice memos and quick photos work here without polish. The everyday surface.',
    visualTreatment:
      'Vertical 9:16 native. Photo + caption overlay. Occasional 5–10s clip. No carousel logic — sequential drops.',
    cadence: '3–7 stories per day on active days. Off-days are fine; the surface forgives inactivity at 24h.',
    primaryAssetSource: ['higgsfield-generate', 'voice-memo'],
    hookPattern: 'Show, do not pitch. "Here is what I am working on right now" is the entire format.',
    exampleSurfaces: [],
    spectrum: 'soul',
    archetype: 'creator',
  },
  {
    platform: 'x',
    label: 'X',
    persona: 'The Thinker — tight insights, threaded teardowns',
    voicePosture: 'Condensed. Naval-density without the mysticism. Each tweet earns the next.',
    visualTreatment:
      'Cinematic 4K stills as quote cards (Higgsfield Cinema Studio) + Code-screenshot embeds + diagrams from /studio.',
    cadence: 'Daily. 1 thread per week.',
    primaryAssetSource: ['higgsfield-generate', 'nb-image'],
    hookPattern:
      'Single sentence with a number, a name, or a contradiction. "Vercel pays for a stub project nobody opened in 20 days. Cost spike was elsewhere."',
    exampleSurfaces: ['/blog'],
    spectrum: 'tech',
    archetype: 'influencer',
  },
  {
    platform: 'threads',
    label: 'Threads',
    persona: 'The Conversation-starter — lower-stakes, higher-frequency',
    voicePosture: 'Conversational. Questions over statements. Reply-bait done honestly.',
    visualTreatment: 'Mostly text. One quick Higgsfield generate per 3 posts maximum.',
    cadence: '5 per week. Repurposed X drafts that need more breathing room.',
    primaryAssetSource: ['higgsfield-generate'],
    hookPattern:
      'Open question or contrarian observation. "What is the one AI tool you tried and refused to keep using? I will go first."',
    exampleSurfaces: [],
    spectrum: 'tech',
    archetype: 'influencer',
  },
  {
    platform: 'bluesky',
    label: 'Bluesky',
    persona: 'The Live-thinker — mic-to-publish, the CIS MV1 surface',
    voicePosture: 'Voice-first. Captured via mic, lightly edited, published same-day.',
    visualTreatment: 'Quick-generate thumbnail per post. No deep production — speed is the point.',
    cadence: 'Daily, per the CIS MV1 mic-to-publish workflow.',
    primaryAssetSource: ['higgsfield-generate', 'nb-image'],
    hookPattern: 'Reflection format. "Today I noticed…" / "I changed my mind about…"',
    exampleSurfaces: [],
    forcingFunction: 'CIS MV1 — Mic → transcript → Bluesky.',
    spectrum: 'tech',
    archetype: 'influencer',
  },
  {
    platform: 'spotify',
    label: 'Spotify / Apple Music',
    persona: 'The Producer — the 12,000+ song catalog',
    voicePosture:
      'No voice. The cover and the music carry it. Track titles are the only copy that matters.',
    visualTreatment:
      'NB2 album/single covers (2K minimum, mimeType-derived ext) + Higgsfield cinematic visualizers for lead tracks.',
    cadence: 'Per release. 1–4 covers per week depending on catalog batch.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate', 'music-video-batch'],
    hookPattern:
      'Cover-led. The hook is the visual. Track titles support; they do not lead.',
    exampleSurfaces: ['/music'],
    spectrum: 'soul',
    archetype: 'creator',
  },
  {
    platform: 'blog',
    label: 'Blog (frankx.ai)',
    persona: 'The Long-form Author — primary essays, deep teardowns',
    voicePosture:
      'Editorial. The blog is the canonical surface; LinkedIn and Newsletter are companions. Long-form earns 8–15 minutes of attention.',
    visualTreatment:
      'NB2 hero + inline diagrams (Mermaid or NB2) + code blocks in JetBrains Mono. No stock photos, ever.',
    cadence: '1–2 essays per week. Paired with LinkedIn thread + X thread on publish day.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate'],
    hookPattern:
      'TL;DR in first 100 words (per CLAUDE.md SEO checklist). Question-based H2s. FAQ section.',
    exampleSurfaces: ['/blog/what-is-agentic-ai', '/blog/the-creative-os'],
    spectrum: 'tech',
    archetype: 'influencer',
  },
]

export function getPersona(platform: PlatformPersona['platform']): PlatformPersona | undefined {
  return platformPersonas.find((p) => p.platform === platform)
}

export function personasBySpectrum(spectrum: PlatformPersona['spectrum']): PlatformPersona[] {
  return platformPersonas.filter((p) => p.spectrum === spectrum)
}

export function personasByArchetype(archetype: PlatformPersona['archetype']): PlatformPersona[] {
  return platformPersonas.filter((p) => p.archetype === archetype)
}
