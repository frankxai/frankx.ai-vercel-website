import type { DeliveryFormat, FormatId } from './types'

const MB = 1024 * 1024

// Verified 2026-06-03 against platform delivery guidelines.
// Doctrine: master once in 16:9 4K, derive all other formats as reframes/cuts.
export const formats: DeliveryFormat[] = [
  {
    id: 'youtube-full',
    label: 'YouTube — Full Music Video',
    aspect: '16:9',
    width: 3840,
    height: 2160,
    maxDurationSec: null,
    fps: 30,
    codec: 'H.264 High Profile (CABAC, closed GOP, 2-pass VBR)',
    container: 'mp4',
    maxFileBytes: null,
    derivedFromMaster: false, // this IS the master
    platforms: ['youtube'],
    notes: '4K SDR 35-45 Mbps. Audio AAC-LC 48kHz 384kbps stereo. The master every other format derives from.',
  },
  {
    id: 'short',
    label: 'Shorts / TikTok / Reels',
    aspect: '9:16',
    width: 1080,
    height: 1920,
    maxDurationSec: 180,
    fps: 30,
    codec: 'H.264',
    container: 'mp4',
    maxFileBytes: null,
    derivedFromMaster: true,
    platforms: ['youtube-shorts', 'tiktok', 'instagram'],
    notes: 'Hook in first 1-2s. On-beat cuts, captions burned in. Keep UI safe zones clear (top ~14%, bottom ~20%). 9-34s performs best.',
  },
  {
    id: 'canvas',
    label: 'Spotify Canvas',
    aspect: '9:16',
    width: 1080,
    height: 1920,
    maxDurationSec: 8,
    fps: 24,
    codec: 'H.264',
    container: 'mp4',
    maxFileBytes: 8 * MB,
    derivedFromMaster: true,
    platforms: ['spotify'],
    notes: 'Seamless loop (continuous / hard-cut / rebound). 3-8s, <=8MB. No CTAs/logos/text. A looping mood clip, not a trailer.',
  },
  {
    id: 'apple-artwork',
    label: 'Apple Music — Motion Artwork',
    aspect: '1:1 + 3:4',
    width: 3840,
    height: 3840,
    maxDurationSec: 35,
    fps: 24,
    codec: 'Apple ProRes 422 / 4444',
    container: 'mov',
    maxFileBytes: null,
    derivedFromMaster: true,
    platforms: ['apple-music'],
    notes: 'Deliver BOTH 1:1 (3840x3840) and 3:4 (2048x2732). 15-35s. First frame MUST match static cover; seamless loop; motion stays on the cover art.',
  },
  {
    id: 'visualizer',
    label: 'Visualizer Loop',
    aspect: '16:9 + 9:16',
    width: 1920,
    height: 1080,
    maxDurationSec: null,
    fps: 30,
    codec: 'H.264',
    container: 'mp4',
    maxFileBytes: null,
    derivedFromMaster: false,
    platforms: ['youtube', 'instagram', 'spotify'],
    notes: 'Audio-reactive (waveform/spectrum). Short seamless 4-12s loop repeated for track length, or full-length. WebGL/TypeGPU via HyperFrames.',
  },
  {
    id: 'square',
    label: 'Instagram Feed (1:1)',
    aspect: '1:1',
    width: 1080,
    height: 1080,
    maxDurationSec: 90,
    fps: 30,
    codec: 'H.264',
    container: 'mp4',
    maxFileBytes: null,
    derivedFromMaster: true,
    platforms: ['instagram'],
    notes: 'Center-crop of the 16:9 master. Feed teaser linking to the full video.',
  },
]

const formatMap = new Map(formats.map((f) => [f.id, f]))

export function getFormat(id: FormatId): DeliveryFormat {
  const f = formatMap.get(id)
  if (!f) throw new Error(`Unknown format: ${id}`)
  return f
}

// The standard ship set for a full release — master + the cheap derives.
export const FULL_RELEASE_FORMATS: FormatId[] = [
  'youtube-full',
  'short',
  'canvas',
  'apple-artwork',
  'square',
]

// The fast social set — just the vertical cut.
export const SOCIAL_FORMATS: FormatId[] = ['short', 'canvas']
