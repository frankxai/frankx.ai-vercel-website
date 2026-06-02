import type { PlatformPersona } from './types'

// Each platform gets ONE persona. A profile that tries to be everything is read as nothing.
// These are not aspirations — they are the operational rule used by content-social-distributor,
// the visual-intelligence skill, and the /visual-strategy command.

export const platformPersonas: PlatformPersona[] = [
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    persona: 'AI Architect — the enterprise-to-personal bridge story',
    voicePosture:
      'First-person, technically precise, enterprise-fluent. The enterprise CoE framework Frank built at Oracle EMEA, translated to personal use, free.',
    visualTreatment:
      'Cinematic stills with negative space for thread overlay, system diagrams in JetBrains Mono, carousel-format teardowns of real architectures.',
    cadence: '3 posts per week — 1 long-form thread, 1 short insight, 1 carousel teardown.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate', 'higgsfield-product-photoshoot'],
    hookPattern:
      'Specific number + counterintuitive claim. "Fortune 500s pay $2M for what costs €0 to deploy on a laptop." Lead with proof, never with adjectives.',
    exampleSurfaces: [
      '/intelligence-system',
      '/ai-architect/ai-coe-hub',
      '/blog/what-is-agentic-ai',
    ],
    forcingFunction: 'NLDigital 2026-05-19 / Madrid 2026-05-27 workshops drive demand thread frequency.',
    spectrum: 'tech',
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
      'First 8 seconds: state the system, name the result. "I built an investment intelligence system that costs €0/month and replaces a $300/month advisor. Here is the code."',
    exampleSurfaces: ['/watch', '/os', '/intelligence-system'],
    spectrum: 'tech',
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
    hookPattern: 'Pattern from hook-learn analytics: question + delayed payoff. "Here is the one rule that made my AI agent 3x more reliable. (It is not what you think.)"',
    exampleSurfaces: ['/watch/shorts'],
    spectrum: 'tech',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    persona: 'The Creator — same soul as Shorts, different syntax',
    voicePosture: 'Faster, looser, lower-fi. Caption-on, sound-on, vertical native.',
    visualTreatment:
      'HyperFrames composition tuned for TikTok caption ceiling + native font weight + Higgsfield Seedance for motion-heavy clips.',
    cadence: '5 per week, repurposed from Shorts cuts but with TikTok-native captions and sound choices.',
    primaryAssetSource: ['hyperframes', 'higgsfield-generate'],
    hookPattern:
      'Three-second visual hook BEFORE the verbal hook. Pattern interrupt → claim → payoff in <60s.',
    exampleSurfaces: ['/watch/shorts'],
    spectrum: 'tech',
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
      'Cover image carries the hook. First line of caption names the mood, second line names the listener. "For the 2 a.m. mix sessions. For the founders who code in the dark."',
    exampleSurfaces: ['/music', '/library'],
    spectrum: 'soul',
  },
  {
    platform: 'x',
    label: 'X',
    persona: 'The Thinker — tight insights, threaded teardowns',
    voicePosture: 'Condensed. Naval-density without the mysticism. Each tweet earns the next.',
    visualTreatment:
      'Cinematic 4K stills as quote cards (Higgsfield Cinema Studio) + occasional Code-screenshot embeds + diagrams from /studio/visual.',
    cadence: 'Daily. 1 thread per week.',
    primaryAssetSource: ['higgsfield-generate', 'nb-image'],
    hookPattern:
      'Single sentence with a number, a name, or a contradiction. "Vercel pays for a stub project nobody opened in 20 days. Cost spike was elsewhere."',
    exampleSurfaces: ['/blog'],
    spectrum: 'tech',
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
  },
  {
    platform: 'bluesky',
    label: 'Bluesky',
    persona: 'The Live-thinker — mic-to-publish, the CIS MV1 surface',
    voicePosture: 'Voice-first. Captured via mic, lightly edited, published same-day.',
    visualTreatment: 'Quick-generate thumbnail per post. No deep production — speed is the point.',
    cadence: 'Daily, per the CIS MV1 mic-to-publish workflow (Friday 2026-05-09 forcing function).',
    primaryAssetSource: ['higgsfield-generate', 'nb-image'],
    hookPattern: 'Reflection format. "Today I noticed…" / "I changed my mind about…"',
    exampleSurfaces: [],
    forcingFunction: 'CIS MV1 first publish: 2026-05-09. Mic → transcript → Bluesky.',
    spectrum: 'tech',
  },
  {
    platform: 'spotify',
    label: 'Spotify / Apple Music',
    persona: 'The Producer — the 12,000+ song catalog',
    voicePosture:
      'No voice. The cover and the music carry it. Track titles are the only copy that matters.',
    visualTreatment:
      'NB2 album/single covers (2K minimum, mimeType-derived ext per the 2026-04-25 regression rule) + Higgsfield cinematic visualizers for lead tracks.',
    cadence: 'Per release. 1–4 covers per week depending on catalog batch.',
    primaryAssetSource: ['nb-image', 'higgsfield-generate', 'music-video-batch'],
    hookPattern:
      'Cover-led. The hook is the visual. Track titles support; they do not lead.',
    exampleSurfaces: ['/music'],
    spectrum: 'soul',
  },
]

export function getPersona(platform: PlatformPersona['platform']): PlatformPersona | undefined {
  return platformPersonas.find((p) => p.platform === platform)
}

export function personasBySpectrum(spectrum: PlatformPersona['spectrum']): PlatformPersona[] {
  return platformPersonas.filter((p) => p.spectrum === spectrum)
}
