import type { CaptureTypeMeta } from './types'

// 13 capture types — every file in _inbox/ maps to exactly one.
// The classifier reads mimeType + extension to infer the type;
// when ambiguous, multimodal pass decides.

export const captureTypes: CaptureTypeMeta[] = [
  {
    id: 'voice-memo',
    label: 'Voice memo',
    mimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-m4a', 'audio/ogg', 'audio/webm'],
    extensions: ['.m4a', '.mp3', '.wav', '.ogg', '.opus', '.webm'],
    inboxSubpath: 'voice/',
    primaryProducer: 'audio-producer',
    typicalSpectrumBias: null, // depends on content
    description:
      'Phone-recorded voice note. 1–15 min typical. Source for blog posts, podcast snippets, newsletter excerpts, Bluesky publishes.',
  },
  {
    id: 'talking-head-video',
    label: 'Talking-head video',
    mimeTypes: ['video/mp4', 'video/quicktime', 'video/x-matroska'],
    extensions: ['.mp4', '.mov', '.mkv'],
    inboxSubpath: 'video/talking-head/',
    primaryProducer: 'video-producer',
    typicalSpectrumBias: null,
    description:
      'Phone or camera capture of Frank speaking on camera. 1–10 min typical. Source for YouTube long-form + Shorts + TikTok + Reels.',
  },
  {
    id: 'b-roll-video',
    label: 'B-roll video',
    mimeTypes: ['video/mp4', 'video/quicktime', 'video/x-matroska'],
    extensions: ['.mp4', '.mov', '.mkv'],
    inboxSubpath: 'video/b-roll/',
    primaryProducer: 'video-producer',
    typicalSpectrumBias: null,
    description:
      'Silent or ambient capture (no on-camera speaking). 5–60 sec typical. Used as cutaways in longer compositions.',
  },
  {
    id: 'screen-record',
    label: 'Screen recording',
    mimeTypes: ['video/mp4', 'video/x-matroska', 'video/webm'],
    extensions: ['.mp4', '.mkv', '.webm'],
    inboxSubpath: 'screen/',
    primaryProducer: 'screen-producer',
    typicalSpectrumBias: 'tech',
    description:
      'Phone or desktop screen capture. 30 sec–10 min. Source for tutorial blogs, GitHub README sections, /watch/shorts dev content.',
  },
  {
    id: 'music-track',
    label: 'Music track',
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aiff'],
    extensions: ['.mp3', '.wav', '.flac', '.aif', '.aiff'],
    inboxSubpath: 'music/track/',
    primaryProducer: 'music-producer',
    typicalSpectrumBias: 'soul',
    description:
      'Suno export OR final mix from another DAW. 2–5 min typical. Source for Spotify drops, IG promo, music video pipeline.',
  },
  {
    id: 'music-seed',
    label: 'Music seed',
    mimeTypes: ['audio/mpeg', 'audio/mp4', 'audio/wav'],
    extensions: ['.m4a', '.mp3', '.wav'],
    inboxSubpath: 'music/seed/',
    primaryProducer: 'music-producer',
    typicalSpectrumBias: 'soul',
    description:
      'Phone field recording, hummed melody, found-sound clip, loop idea. 5–30 sec typical. Source for Suno prompts.',
  },
  {
    id: 'photo-hero',
    label: 'Hero photo',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'],
    inboxSubpath: 'image/hero/',
    primaryProducer: 'vis-producer',
    typicalSpectrumBias: null,
    description:
      'Deliberate composition meant as a hero image. Differentiated from photo-utility by intent + brand-fit signal.',
  },
  {
    id: 'photo-food',
    label: 'Food photo',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'],
    inboxSubpath: 'image/food/',
    primaryProducer: 'food-producer',
    typicalSpectrumBias: 'soul',
    description:
      'Restaurant or home-cooked food capture. Pairs with voice-memo for opinion. Source for IG, Threads, travel-blog.',
  },
  {
    id: 'photo-travel',
    label: 'Travel photo',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'],
    inboxSubpath: 'image/travel/',
    primaryProducer: 'travel-producer',
    typicalSpectrumBias: 'soul',
    description:
      'Location-tagged story shot. EXIF GPS expected. Source for IG carousel, blog entry, Stories.',
  },
  {
    id: 'photo-utility',
    label: 'Utility photo',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
    extensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'],
    inboxSubpath: 'image/utility/',
    primaryProducer: 'vis-producer',
    typicalSpectrumBias: 'tech',
    description:
      'Screenshot, reference photo, document scan, low-effort capture. Source for blog inline imagery, slack-style sharing.',
  },
  {
    id: 'document',
    label: 'Document',
    mimeTypes: ['application/pdf', 'text/markdown', 'text/plain', 'application/msword'],
    extensions: ['.pdf', '.md', '.txt', '.doc', '.docx'],
    inboxSubpath: 'document/',
    primaryProducer: 'prose-producer',
    typicalSpectrumBias: 'tech',
    description:
      'PDF, research note, transcript, dictation, brain dump. Source for blog drafts, newsletter excerpts, case studies.',
  },
  {
    id: 'quote',
    label: 'Quote',
    mimeTypes: ['text/markdown', 'text/plain'],
    extensions: ['.md', '.txt'],
    inboxSubpath: 'quote/',
    primaryProducer: 'prose-producer',
    typicalSpectrumBias: null,
    description:
      'Highlighted text from a book, podcast clip, conversation snippet. Short. Source for X posts, quote cards, library annotations.',
  },
  {
    id: 'architecture-snap',
    label: 'Architecture diagram',
    mimeTypes: ['image/png', 'image/svg+xml', 'image/jpeg'],
    extensions: ['.png', '.svg', '.jpg', '.excalidraw', '.drawio'],
    inboxSubpath: 'diagram/',
    primaryProducer: 'screen-producer',
    typicalSpectrumBias: 'tech',
    description:
      'Excalidraw, Whimsical, draw.io export, or hand-drawn sketch of a system architecture. Source for LinkedIn carousel, GitHub README, blog post diagram.',
  },
]

export function getCaptureType(id: CaptureTypeMeta['id']): CaptureTypeMeta | undefined {
  return captureTypes.find((c) => c.id === id)
}

// Mime + extension matcher — used by the watcher daemon and classifier
export function inferCaptureType(
  mimeType: string,
  extension: string,
): CaptureTypeMeta | undefined {
  // exact extension match wins (most reliable signal)
  const lowerExt = extension.toLowerCase()
  const byExt = captureTypes.find((c) => c.extensions.includes(lowerExt))
  if (byExt) return byExt

  // fall back to mime
  const byMime = captureTypes.find((c) => c.mimeTypes.includes(mimeType))
  return byMime
}
