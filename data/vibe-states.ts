/**
 * Vibe OS state library — data port for the frankx.ai Vibe State Picker.
 *
 * Ported from vibe-os's VIBE_STATES dict (tools/vibe-prompt-generator.py):
 * https://github.com/frankxai/vibe-os
 *
 * Each state fixes the parameters that move outcome — BPM, key/mode,
 * instrumentation, timbre — the same fields the free Suno templates on
 * /music/templates are built from. This is a data port, not a re-implementation
 * of vibe-os's full prompt-generation engine; the `sunoPrompt` field below is
 * a hand-assembled style descriptor built from those fields, ready to paste
 * into Suno's custom mode.
 */

export type VibeStateCategory =
  | 'energy'
  | 'focus'
  | 'calm'
  | 'emotional'
  | 'goal'
  | 'processing'
  | 'social'

export interface VibeState {
  id: string
  name: string
  category: VibeStateCategory
  description: string
  bpmRange: [number, number]
  optimalBpm: number
  key: string
  mode: 'major' | 'minor' | 'mixed'
  timbre: string
  energy: string
  instruments: string[]
  musicStyle: string
  /** Ready-to-paste Suno custom-mode style prompt. */
  sunoPrompt: string
}

export const vibeStates: VibeState[] = [
  {
    id: 'morning_energy',
    name: 'Morning Energy',
    category: 'energy',
    description: 'Energizing wake-up music to start the day with positivity.',
    bpmRange: [110, 130],
    optimalBpm: 120,
    key: 'G Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'medium-high',
    instruments: ['acoustic guitar', 'piano', 'light percussion', 'strings'],
    musicStyle: 'acoustic pop',
    sunoPrompt:
      'uplifting acoustic pop, 120 BPM, G Major, acoustic guitar, piano, light percussion, strings, bright and warm, rising energy',
  },
  {
    id: 'high_energy',
    name: 'High Energy',
    category: 'energy',
    description: 'Peak energy for workouts, challenges, and maximum drive.',
    bpmRange: [140, 170],
    optimalBpm: 150,
    key: 'E Major',
    mode: 'major',
    timbre: 'powerful',
    energy: 'very high',
    instruments: ['driving drums', 'synth bass', 'power chords', 'brass'],
    musicStyle: 'EDM',
    sunoPrompt:
      'high-energy EDM, 150 BPM, E Major, driving drums, synth bass, power chords, brass, powerful and driving, explosive energy',
  },
  {
    id: 'workout',
    name: 'Workout Power',
    category: 'energy',
    description: 'Exercise-tempo music at the ceiling effect sports research points to.',
    bpmRange: [130, 160],
    optimalBpm: 145,
    key: 'D Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'high',
    instruments: ['driving drums', 'synth', 'bass', 'electronic elements'],
    musicStyle: 'workout EDM',
    sunoPrompt:
      'workout EDM, 145 BPM, D Major, driving drums, synth, bass, electronic elements, bright and powerful, relentless drive',
  },
  {
    id: 'deep_focus',
    name: 'Deep Focus',
    category: 'focus',
    description: 'Sustained concentration for knowledge work and study.',
    bpmRange: [80, 100],
    optimalBpm: 90,
    key: 'C Major',
    mode: 'major',
    timbre: 'warm',
    energy: 'low-medium',
    instruments: ['ambient synth pads', 'soft piano', 'minimal percussion', 'nature sounds'],
    musicStyle: 'lo-fi',
    sunoPrompt:
      'lo-fi study music, 90 BPM, C Major, ambient synth pads, soft piano, minimal percussion, warm and calm, no vocals',
  },
  {
    id: 'creative_flow',
    name: 'Creative Flow',
    category: 'focus',
    description: 'Mid-tempo, low-complexity texture for inspiration and exploration.',
    bpmRange: [90, 115],
    optimalBpm: 100,
    key: 'A Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'medium',
    instruments: ['piano', 'strings', 'light electronic textures', 'acoustic guitar'],
    musicStyle: 'cinematic ambient pop',
    sunoPrompt:
      'cinematic ambient pop, 100 BPM, A Major, piano, strings, light electronic textures, bright and flowing, gently building',
  },
  {
    id: 'relaxation',
    name: 'Deep Relaxation',
    category: 'calm',
    description: 'Stress relief and nervous-system regulation.',
    bpmRange: [60, 80],
    optimalBpm: 70,
    key: 'F Major',
    mode: 'major',
    timbre: 'soft',
    energy: 'low',
    instruments: ['soft piano', 'strings', 'ambient pads', 'harp'],
    musicStyle: 'ambient spa',
    sunoPrompt:
      'ambient spa music, 70 BPM, F Major, soft piano, strings, ambient pads, harp, soft and calm, no drums',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    category: 'calm',
    description: 'Deep meditative states and mindfulness.',
    bpmRange: [50, 70],
    optimalBpm: 60,
    key: 'D Minor',
    mode: 'mixed',
    timbre: 'soft',
    energy: 'very low',
    instruments: ['singing bowls', 'ambient drones', 'soft pads', 'flute'],
    musicStyle: 'meditation ambient',
    sunoPrompt:
      'meditation ambient, 60 BPM, D Minor, singing bowls, ambient drones, soft pads, flute, very soft, minimal, no percussion',
  },
  {
    id: 'sleep',
    name: 'Sleep Preparation',
    category: 'calm',
    description: 'Wind-down music for restful sleep — the lowest arousal floor in the library.',
    bpmRange: [40, 60],
    optimalBpm: 50,
    key: 'D Minor',
    mode: 'minor',
    timbre: 'soft',
    energy: 'very low',
    instruments: ['very soft piano', 'ambient drones', 'minimal strings'],
    musicStyle: 'sleep ambient',
    sunoPrompt:
      'sleep ambient, 50 BPM, D Minor, very soft piano, ambient drones, minimal strings, extremely gentle, no percussion, no vocals',
  },
  {
    id: 'confidence',
    name: 'Confidence Boost',
    category: 'emotional',
    description: 'Rising dynamics and brass timbre for self-assurance and personal power.',
    bpmRange: [115, 140],
    optimalBpm: 128,
    key: 'D Major',
    mode: 'major',
    timbre: 'powerful',
    energy: 'high',
    instruments: ['piano', 'brass', 'strings', 'drums'],
    musicStyle: 'anthemic cinematic',
    sunoPrompt:
      'anthemic cinematic, 128 BPM, D Major, piano, brass, strings, drums, powerful and rising, triumphant',
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    category: 'emotional',
    description: 'Cultivate appreciation and positive reflection.',
    bpmRange: [80, 100],
    optimalBpm: 90,
    key: 'G Major',
    mode: 'major',
    timbre: 'warm',
    energy: 'medium',
    instruments: ['acoustic guitar', 'piano', 'soft strings', 'light percussion'],
    musicStyle: 'acoustic folk',
    sunoPrompt:
      'acoustic folk, 90 BPM, G Major, acoustic guitar, piano, soft strings, light percussion, warm and balanced, understated',
  },
  {
    id: 'emotional_release',
    name: 'Emotional Release',
    category: 'emotional',
    description: 'Process and release difficult emotions without forcing resolution.',
    bpmRange: [60, 85],
    optimalBpm: 72,
    key: 'A Minor',
    mode: 'minor',
    timbre: 'warm',
    energy: 'low-medium',
    instruments: ['piano', 'strings', 'cello', 'soft vocals'],
    musicStyle: 'sad piano ballad',
    sunoPrompt:
      'sad piano ballad, 72 BPM, A Minor, piano, strings, cello, soft vocals, warm and vulnerable, slow build',
  },
  {
    id: 'joy',
    name: 'Pure Joy',
    category: 'emotional',
    description: 'Bright major-key amplification for happiness and celebration.',
    bpmRange: [120, 145],
    optimalBpm: 130,
    key: 'D Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'high',
    instruments: ['bright piano', 'acoustic guitar', 'strings', 'claps'],
    musicStyle: 'uplifting pop',
    sunoPrompt:
      'uplifting pop, 130 BPM, D Major, bright piano, acoustic guitar, strings, claps, bright and celebratory, feel-good',
  },
  {
    id: 'manifestation',
    name: 'Manifestation',
    category: 'goal',
    description: 'Ethereal, forward-leaning texture for visualizing outcomes.',
    bpmRange: [90, 110],
    optimalBpm: 100,
    key: 'E Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'medium',
    instruments: ['ethereal synths', 'strings', 'piano', 'bells'],
    musicStyle: 'cinematic new age',
    sunoPrompt:
      'cinematic new age, 100 BPM, E Major, ethereal synths, strings, piano, bells, bright and expansive, forward-moving',
  },
  {
    id: 'courage',
    name: 'Courage',
    category: 'goal',
    description: 'Building orchestral intensity for facing fear and taking bold action.',
    bpmRange: [100, 130],
    optimalBpm: 115,
    key: 'D Major',
    mode: 'major',
    timbre: 'powerful',
    energy: 'high',
    instruments: ['drums', 'strings', 'brass', 'choir'],
    musicStyle: 'epic orchestral',
    sunoPrompt:
      'epic orchestral, 115 BPM, D Major, drums, strings, brass, choir, powerful and heroic, building intensity',
  },
  {
    id: 'healing',
    name: 'Healing',
    category: 'goal',
    description: 'Slow, sparse texture supporting physical and emotional recovery.',
    bpmRange: [55, 75],
    optimalBpm: 65,
    key: 'F Major',
    mode: 'major',
    timbre: 'soft',
    energy: 'low',
    instruments: ['singing bowls', 'soft piano', 'harp', 'nature sounds'],
    musicStyle: 'healing ambient',
    sunoPrompt:
      'healing ambient, 65 BPM, F Major, singing bowls, soft piano, harp, nature sounds, soft and restorative, minimal percussion',
  },
  {
    id: 'grief_processing',
    name: 'Grief Processing',
    category: 'processing',
    description: 'Holds space for loss and mourning without rushing the feeling.',
    bpmRange: [50, 70],
    optimalBpm: 58,
    key: 'D Minor',
    mode: 'minor',
    timbre: 'soft',
    energy: 'low',
    instruments: ['solo cello', 'piano', 'strings', 'ambient pads'],
    musicStyle: 'cinematic elegy',
    sunoPrompt:
      'cinematic elegy, 58 BPM, D Minor, solo cello, piano, strings, ambient pads, soft and mournful, no percussion',
  },
  {
    id: 'anger_release',
    name: 'Anger Release',
    category: 'processing',
    description: 'Discharges intensity through sound rather than suppressing it.',
    bpmRange: [120, 150],
    optimalBpm: 135,
    key: 'E Minor',
    mode: 'minor',
    timbre: 'powerful',
    energy: 'high',
    instruments: ['driving drums', 'distorted guitar', 'synth bass', 'brass stabs'],
    musicStyle: 'industrial rock',
    sunoPrompt:
      'industrial rock, 135 BPM, E Minor, driving drums, distorted guitar, synth bass, brass stabs, powerful and abrasive, high tension',
  },
  {
    id: 'letting_go',
    name: 'Letting Go',
    category: 'processing',
    description: 'Release of control, deliberately left tonally unresolved.',
    bpmRange: [55, 75],
    optimalBpm: 65,
    key: 'A Minor',
    mode: 'mixed',
    timbre: 'soft',
    energy: 'low',
    instruments: ['soft piano', 'ambient pads', 'harp', 'strings'],
    musicStyle: 'ambient piano',
    sunoPrompt:
      'ambient piano, 65 BPM, A Minor, soft piano, ambient pads, harp, strings, soft and unresolved, gently drifting',
  },
  {
    id: 'nostalgia',
    name: 'Nostalgia',
    category: 'social',
    description: 'Bittersweet reflection on the past, warm but tinged with longing.',
    bpmRange: [85, 105],
    optimalBpm: 95,
    key: 'F Major',
    mode: 'mixed',
    timbre: 'warm',
    energy: 'medium',
    instruments: ['warm piano', 'strings', 'acoustic guitar', 'vinyl crackle texture'],
    musicStyle: 'nostalgic indie folk',
    sunoPrompt:
      'nostalgic indie folk, 95 BPM, F Major, warm piano, strings, acoustic guitar, vinyl crackle texture, warm and bittersweet',
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    category: 'focus',
    description: 'Playful, exploratory mental state for learning and discovery.',
    bpmRange: [95, 120],
    optimalBpm: 108,
    key: 'A Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'medium',
    instruments: ['pizzicato strings', 'light piano', 'woodwinds', 'playful percussion'],
    musicStyle: 'whimsical orchestral',
    sunoPrompt:
      'whimsical orchestral, 108 BPM, A Major, pizzicato strings, light piano, woodwinds, playful percussion, bright and exploratory',
  },
  {
    id: 'romantic_connection',
    name: 'Romantic Connection',
    category: 'social',
    description: 'Warmth and intimacy for closeness.',
    bpmRange: [70, 95],
    optimalBpm: 82,
    key: 'F Major',
    mode: 'major',
    timbre: 'warm',
    energy: 'low-medium',
    instruments: ['warm piano', 'strings', 'acoustic guitar', 'soft vocals'],
    musicStyle: 'romantic ballad',
    sunoPrompt:
      'romantic ballad, 82 BPM, F Major, warm piano, strings, acoustic guitar, soft vocals, warm and intimate',
  },
  {
    id: 'celebration',
    name: 'Celebration',
    category: 'social',
    description: 'Communal, festive joy for milestones and shared victories.',
    bpmRange: [110, 135],
    optimalBpm: 122,
    key: 'D Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'high',
    instruments: ['horns', 'upbeat percussion', 'piano', 'claps'],
    musicStyle: 'festive pop',
    sunoPrompt:
      'festive pop, 122 BPM, D Major, horns, upbeat percussion, piano, claps, bright and communal, high energy',
  },
  {
    id: 'anticipation',
    name: 'Anticipation',
    category: 'emotional',
    description: 'Building excitement and forward momentum before something arrives.',
    bpmRange: [100, 130],
    optimalBpm: 112,
    key: 'E Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'medium-high',
    instruments: ['building strings', 'synth arps', 'light percussion', 'piano'],
    musicStyle: 'trailer music',
    sunoPrompt:
      'building trailer music, 112 BPM, E Major, building strings, synth arps, light percussion, piano, bright and rising, forward momentum',
  },
  {
    id: 'awe',
    name: 'Awe',
    category: 'emotional',
    description: 'Expansive wonder in the face of something vast.',
    bpmRange: [60, 85],
    optimalBpm: 72,
    key: 'D Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'low-medium',
    instruments: ['choir', 'strings', 'organ', 'ambient pads'],
    musicStyle: 'choral ambient epic',
    sunoPrompt:
      'choral ambient epic, 72 BPM, D Major, choir, strings, organ, ambient pads, bright and expansive, slow build',
  },
  {
    id: 'playfulness',
    name: 'Playfulness',
    category: 'social',
    description: 'Light, bouncy energy that makes room for fun.',
    bpmRange: [115, 140],
    optimalBpm: 126,
    key: 'C Major',
    mode: 'major',
    timbre: 'bright',
    energy: 'medium-high',
    instruments: ['ukulele', 'xylophone', 'light percussion', 'bouncy bass'],
    musicStyle: 'quirky pop',
    sunoPrompt:
      'quirky pop, 126 BPM, C Major, ukulele, xylophone, light percussion, bouncy bass, bright and lighthearted, playful',
  },
]

export const vibeStateCategoryLabels: Record<VibeStateCategory, string> = {
  energy: 'Energy',
  focus: 'Focus',
  calm: 'Calm',
  emotional: 'Emotional',
  goal: 'Goal-directed',
  processing: 'Processing',
  social: 'Social',
}
