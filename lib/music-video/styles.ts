import type { MusicVideoStyle, StyleId } from './types'

// The 5 visual lanes. Each routes L1/L2/L3 to the engine that wins for that
// look (reasoned from the 2026 model matrix). The hero engine is the upgrade
// applied to 2-3 shots that carry the video; default posture = Veo 3.1 Std.
export const styles: MusicVideoStyle[] = [
  {
    id: 'cinematic',
    label: 'Realistic Cinematic',
    description: 'Photoreal, film-grade. Real locations, real light, real faces. The flagship release look.',
    keyframeEngine: 'nano-banana-pro',
    motionEngine: 'kling-3.0',
    heroEngine: 'veo-3.1-standard',
    assemblyEngine: 'hyperframes',
    emotionalArc: 'Tension builds across verses → release on the chorus. Wide establishing → intimate close on the hook.',
    hookDoctrine: 'Visual: a held, beautiful frame that resolves into motion. Motion: a single committed camera move (push-in or crane) timed to land on beat 1.',
  },
  {
    id: 'character',
    label: 'Character Narrative',
    description: 'A recurring artist/avatar carries a story across every shot. Identity must hold across 10-12 cuts.',
    keyframeEngine: 'nano-banana-pro',
    motionEngine: 'kling-3.0',
    heroEngine: 'veo-3.1-standard',
    assemblyEngine: 'hyperframes',
    emotionalArc: 'A protagonist journey — the character changes state from first frame to last. The face is the throughline.',
    hookDoctrine: 'Visual: the character revealed in the first 2s, looking at or away from camera with intent. Motion: subtle, human — a breath, a turn — not a gimmick.',
  },
  {
    id: 'anime',
    label: 'Anime / Animated',
    description: 'Stylized 2D/2.5D or anime-inflected. Expressive, saturated, motion-forward.',
    keyframeEngine: 'nano-banana',
    motionEngine: 'seedance-2.0',
    heroEngine: 'kling-3.0',
    assemblyEngine: 'hyperframes',
    emotionalArc: 'Energy escalation — color and motion intensity climb toward the drop/chorus.',
    hookDoctrine: 'Visual: a bold, graphic key pose with strong silhouette. Motion: a snappy ease-out that hits the downbeat; speed-lines or impact frames on accents.',
  },
  {
    id: 'abstract',
    label: 'Abstract / Visualizer',
    description: 'Non-representational. Light, particles, fluid, shader. Audio-reactive. Mood over narrative.',
    keyframeEngine: 'nano-banana',
    motionEngine: 'luma-ray3',
    heroEngine: 'runway-gen-4.5',
    assemblyEngine: 'hyperframes',
    emotionalArc: 'Immersive trance — the visual breathes WITH the track. Bloom on the kick, dissolve on the tail.',
    hookDoctrine: 'Visual: depth and bloom that invite you in. Motion: pulse/glow driven by the beat envelope (audio-reactive in HyperFrames/TypeGPU).',
  },
  {
    id: 'lyric',
    label: 'Lyric Typography',
    description: 'Type-driven. Synced lyrics over atmospheric b-roll or solid/gradient fields. No video-gen required for the type itself.',
    keyframeEngine: 'nano-banana',     // optional atmospheric b-roll plates
    motionEngine: null,                 // typography is a compositor job, never a gen job
    heroEngine: null,
    assemblyEngine: 'hyperframes',
    emotionalArc: 'The words ARE the story. Pacing follows the vocal phrasing; weight follows the emotion of the line.',
    hookDoctrine: 'Visual: the first lyric lands with kinetic weight (marker-sweep / scribble / burst). Motion: word-level reveal synced to the vocal onset via Whisper alignment.',
  },
]

const styleMap = new Map(styles.map((s) => [s.id, s]))

export function getStyle(id: StyleId): MusicVideoStyle {
  const s = styleMap.get(id)
  if (!s) throw new Error(`Unknown style: ${id}`)
  return s
}
