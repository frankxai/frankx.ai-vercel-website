import type { StackLayer } from './types'

// The three-layer architecture of FrankX visual production.
// Asset layer creates the raw material. Composition layer assembles. Gate layer ships.
// Every visual that goes live walks all three.

export const visualStack: StackLayer[] = [
  {
    kind: 'asset',
    name: 'Asset Layer',
    purpose:
      'What gets made. Two velocity tiers: NB2 for premium hero work; Higgsfield for the cinematic and product-grade volume tier. The authoritative engine registry — with live install status, cost, and the full menu (InfoGenius/NB2, Higgsfield, fal.ai, GPT Image 2) — lives at lib/gen/backends.ts (public at /studio/engines). The higgsfield-* entries below are roles, not installed skills; Higgsfield is reached via its MCP server.',
    entries: [
      {
        tool: 'nb-image',
        role: 'Premium hero + book + album covers',
        whenToUse:
          'Hero imagery, book covers, album covers, anything that lives at the top of a page or stays on a feed for years.',
        whenNotToUse:
          'Bulk B-roll, ad-creative variants, anything where you need 20 attempts in 10 minutes.',
        produces: ['hero-still', 'cover', 'lifestyle-scene'],
      },
      {
        tool: 'higgsfield-product-photoshoot',
        role: 'Brand-grade product and lifestyle photography',
        whenToUse:
          'Workshop landing visuals, course covers, papa-hub imagery, anything that needs studio-shot polish without a studio.',
        whenNotToUse:
          'Pure text-to-image with no product or person — go to higgsfield-generate.',
        produces: ['product-shot', 'lifestyle-scene', 'hero-still'],
      },
      {
        tool: 'higgsfield-generate',
        role: 'Cinematic stills and 5–15s video clips',
        whenToUse:
          'B-roll, cinematic cutaways, ad creatives, image-to-video animations, quote cards. The high-velocity volume tier.',
        whenNotToUse:
          'Identity-faithful character work — train Soul ID first.',
        produces: ['b-roll', 'cinematic-clip', 'quote-card', 'thumbnail', 'carousel-frame'],
      },
      {
        tool: 'higgsfield-soul-id',
        role: 'Identity-faithful Frank-as-character training',
        whenToUse:
          'One-time training. After training, every higgsfield-generate call with --soul-id <id> produces faithful Frank-as-character output for B-roll where on-camera is impossible.',
        whenNotToUse:
          'One-shot face swaps — use higgsfield-generate with reference image.',
        produces: ['character-variant'],
      },
      {
        tool: 'higgsfield-marketplace-cards',
        role: 'Marketplace-compliant product listings',
        whenToUse:
          'Course Lemon Squeezy listings, Etsy/Amazon-style product cards, A+ content modules.',
        whenNotToUse: 'Generic brand product photography — use higgsfield-product-photoshoot.',
        produces: ['product-shot'],
      },
      {
        tool: 'music-video-batch',
        role: 'Lyric video generation across the 12k catalog',
        whenToUse:
          'Batch lyric videos for music releases. Composes with Higgsfield video for cinematic sections.',
        whenNotToUse: 'Single hero video — use HyperFrames + Higgsfield directly.',
        produces: ['cinematic-clip'],
      },
    ],
  },
  {
    kind: 'composition',
    name: 'Composition Layer',
    purpose:
      'How assets become videos. HyperFrames for caption-heavy short-form; Remotion for stateful long-form; the existing /talking-head-ship pipeline anchors brand standards.',
    entries: [
      {
        tool: 'hyperframes',
        role: 'HTML-native composition with deterministic seek',
        whenToUse:
          'Caption-heavy shorts, Reels, TikTok, lower-third overlays, Lottie/After Effects imports.',
        whenNotToUse: 'Stateful React UIs in video — use Remotion.',
        produces: ['cinematic-clip'],
      },
      {
        tool: 'remotion',
        role: 'React-native composition with full state',
        whenToUse:
          'Long-form talking-head, branded YouTube uploads, anything reusing existing React components.',
        whenNotToUse:
          'Quick captioned cuts where HTML is enough — use HyperFrames.',
        produces: ['cinematic-clip'],
      },
    ],
  },
  {
    kind: 'gate',
    name: 'Gate Layer',
    purpose:
      'What stops bad work from shipping. The vis curator decides which asset for which surface; visual-creation enforces the 6-step quality pipeline; brand-voice + design.md + taste.md are the final wall.',
    entries: [
      {
        tool: 'vis',
        role: 'Curation — which asset for which page or platform',
        whenToUse:
          'Before generating: ask vis what already exists. Before publishing: ask vis whether the asset matches the page conversion goal.',
        produces: [],
      },
      {
        tool: 'visual-creation',
        role: 'Quality pipeline — 6-step organic-first generation',
        whenToUse:
          'Every generation that will ship publicly. Council review and human approval are non-skippable.',
        produces: [],
      },
      {
        tool: 'brand-voice',
        role: 'Voice + AI-tone refusal list',
        whenToUse: 'Every caption, alt text, and on-image copy line.',
        produces: [],
      },
    ],
  },
]

export function getLayer(kind: StackLayer['kind']): StackLayer | undefined {
  return visualStack.find((l) => l.kind === kind)
}
