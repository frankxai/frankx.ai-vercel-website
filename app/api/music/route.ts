import { NextRequest, NextResponse } from 'next/server'

type ConsciousnessLevel = 'healing' | 'focus' | 'creativity' | 'transformation'

interface MusicRequest {
  type: 'generate' | 'analyze' | 'transform'
  prompt?: string
  frequency?: number
  bpm?: number
  duration?: number
  consciousness_level?: ConsciousnessLevel
  genre?: string
  mood?: string
  instrument_preferences?: string[]
}

interface MusicResponse {
  music_id: string
  title: string
  description: string
  suno_prompt: string
  frequency_analysis: {
    primary_frequency: number
    binaural_beats?: number
    consciousness_effect: string
  }
  metadata: {
    duration: number
    bpm: number
    key: string
    genre: string
    mood: string
  }
  consciousness_metrics: {
    transformation_potential: number
    healing_properties: number
    focus_enhancement: number
    creativity_boost: number
  }
  download_url?: string
  streaming_url?: string
}

type FrequencyDetails = {
  name: string
  effect: string
  consciousness: ConsciousnessLevel
}

const CONSCIOUSNESS_FREQUENCIES: Record<number, FrequencyDetails> = {
  // Solfeggio Frequencies
  396: { name: 'Liberation', effect: 'Release fear and guilt', consciousness: 'healing' },
  417: { name: 'Change', effect: 'Facilitate transformation', consciousness: 'transformation' },
  528: { name: 'Love', effect: 'DNA repair and healing', consciousness: 'healing' },
  639: { name: 'Connection', effect: 'Harmonious relationships', consciousness: 'creativity' },
  741: { name: 'Expression', effect: 'Creative expression', consciousness: 'creativity' },
  852: { name: 'Intuition', effect: 'Spiritual awakening', consciousness: 'transformation' },
  963: { name: 'Unity', effect: 'Higher consciousness', consciousness: 'transformation' },

  // Binaural Beats
  10: { name: 'Alpha', effect: 'Relaxed focus', consciousness: 'focus' },
  15: { name: 'Beta', effect: 'Active concentration', consciousness: 'focus' },
  40: { name: 'Gamma', effect: 'Peak awareness', consciousness: 'creativity' },
  6: { name: 'Theta', effect: 'Deep meditation', consciousness: 'healing' },
  2: { name: 'Delta', effect: 'Healing sleep', consciousness: 'healing' }
}

type MusicTemplate = {
  bpm_range: [number, number]
  frequencies: number[]
  genres: string[]
  moods: string[]
}

const MUSIC_TEMPLATES: Record<ConsciousnessLevel, MusicTemplate> = {
  healing: {
    bpm_range: [40, 60],
    frequencies: [396, 528, 852],
    genres: ['ambient', 'new age', 'healing'],
    moods: ['peaceful', 'calming', 'restorative']
  },
  focus: {
    bpm_range: [60, 80],
    frequencies: [10, 15, 40],
    genres: ['ambient', 'minimal', 'instrumental'],
    moods: ['focused', 'clear', 'concentrated']
  },
  creativity: {
    bpm_range: [90, 120],
    frequencies: [639, 741, 40],
    genres: ['electronic', 'experimental', 'world'],
    moods: ['inspiring', 'flowing', 'innovative']
  },
  transformation: {
    bpm_range: [30, 90],
    frequencies: [417, 852, 963],
    genres: ['cinematic', 'spiritual', 'transcendent'],
    moods: ['transformative', 'mystical', 'elevating']
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as MusicRequest

    if (!body.type) {
      return NextResponse.json(
        { error: 'Missing required field: type' },
        { status: 400 }
      )
    }

    switch (body.type) {
      case 'generate':
        return handleMusicGeneration(body)
      case 'analyze':
        return handleMusicAnalysis(body)
      case 'transform':
        return handleMusicTransformation(body)
      default:
        return NextResponse.json(
          { error: 'Invalid type. Must be: generate, analyze, or transform' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Music API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Music API Active',
    endpoints: {
      generate: 'Create consciousness-aligned music with Suno AI',
      analyze: 'Analyze existing music for consciousness properties',
      transform: 'Transform music for specific consciousness effects'
    },
    consciousness_frequencies: Object.entries(CONSCIOUSNESS_FREQUENCIES).map(([freq, data]) => ({
      frequency: Number(freq),
      ...data
    })),
    music_categories: Object.keys(MUSIC_TEMPLATES) as ConsciousnessLevel[],
    timestamp: new Date().toISOString()
  })
}

async function handleMusicGeneration(request: MusicRequest): Promise<NextResponse> {
  const consciousnessLevel: ConsciousnessLevel = request.consciousness_level ?? 'focus'
  const template = MUSIC_TEMPLATES[consciousnessLevel]

  // Generate optimal settings based on consciousness level
  const frequency = request.frequency || selectOptimalFrequency(consciousnessLevel)
  const bpm = request.bpm || generateOptimalBPM(template.bpm_range)
  const duration = request.duration || 300 // 5 minutes default

  // Generate Suno AI prompt
  const sunoPrompt = generateSunoPrompt({
    consciousness_level: consciousnessLevel,
    frequency,
    bpm,
    genre: request.genre || template.genres[0],
    mood: request.mood || template.moods[0],
    prompt: request.prompt
  })

  const musicResponse: MusicResponse = {
    music_id: generateMusicId(),
    title: generateMusicTitle(consciousnessLevel, frequency),
    description: generateMusicDescription(consciousnessLevel, frequency, bpm),
    suno_prompt: sunoPrompt,
    frequency_analysis: {
      primary_frequency: frequency,
      binaural_beats: frequency < 100 ? frequency : undefined,
      consciousness_effect: CONSCIOUSNESS_FREQUENCIES[frequency]?.effect || 'Consciousness enhancement'
    },
    metadata: {
      duration,
      bpm,
      key: generateOptimalKey(frequency),
      genre: request.genre || template.genres[0],
      mood: request.mood || template.moods[0]
    },
    consciousness_metrics: calculateConsciousnessMetrics(consciousnessLevel, frequency),
    // In production, these would be actual Suno API URLs
    streaming_url: `https://suno.ai/play/${generateMusicId()}`,
    download_url: `https://suno.ai/download/${generateMusicId()}`
  }

  return NextResponse.json(musicResponse)
}

async function handleMusicAnalysis(request: MusicRequest): Promise<NextResponse> {
  // This would analyze existing music files in production
  const analysisResponse = {
    music_id: generateMusicId(),
    analysis: {
      detected_frequency: 528,
      bpm: 72,
      key: 'C Major',
      mood: 'healing',
      consciousness_level: 'healing'
    },
    consciousness_metrics: {
      transformation_potential: 8.7,
      healing_properties: 9.2,
      focus_enhancement: 6.8,
      creativity_boost: 7.3
    },
    recommendations: [
      'Add binaural beats at 10Hz for enhanced focus',
      'Increase 528Hz presence for stronger healing effect',
      'Consider extending to 8-10 minutes for deeper transformation'
    ]
  }

  return NextResponse.json(analysisResponse)
}

async function handleMusicTransformation(request: MusicRequest): Promise<NextResponse> {
  // This would transform existing music in production
  const transformationResponse = {
    original_id: request.prompt || 'original_track',
    transformed_id: generateMusicId(),
    transformations_applied: [
      `Added ${request.frequency}Hz frequency enhancement`,
      `Adjusted BPM to ${request.bpm} for optimal consciousness state`,
      `Applied ${request.consciousness_level} consciousness template`
    ],
    before_after_metrics: {
      before: { transformation_potential: 6.5, healing_properties: 5.8 },
      after: { transformation_potential: 8.9, healing_properties: 9.1 }
    }
  }

  return NextResponse.json(transformationResponse)
}

function selectOptimalFrequency(consciousnessLevel: ConsciousnessLevel): number {
  const levelFrequencies: Record<ConsciousnessLevel, number[]> = {
    healing: [528, 396, 852],
    focus: [10, 15, 40],
    creativity: [639, 741, 40],
    transformation: [417, 852, 963]
  }

  const frequencies = levelFrequencies[consciousnessLevel] || levelFrequencies.focus
  return frequencies[Math.floor(Math.random() * frequencies.length)]
}

function generateOptimalBPM(range: number[]): number {
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0]
}

interface SunoPromptParams {
  consciousness_level: ConsciousnessLevel
  frequency: number
  bpm: number
  genre?: string
  mood?: string
  prompt?: string
}

function generateSunoPrompt(params: SunoPromptParams): string {
  const basePrompts: Record<ConsciousnessLevel, string> = {
    healing: `healing ambient music, ${params.bpm} bpm, ${params.frequency}Hz frequency healing, gentle nature sounds, peaceful meditation, restoration and renewal`,
    focus: `focused instrumental music, ${params.bpm} bpm, ${params.frequency}Hz concentration enhancement, minimal percussion, sustained attention, deep work soundtrack`,
    creativity: `creative flow music, ${params.bpm} bpm, ${params.frequency}Hz inspiration, innovative soundscapes, artistic expression, breakthrough creativity`,
    transformation: `transformational ambient, ${params.bpm} bpm, ${params.frequency}Hz consciousness expansion, spiritual awakening, profound change, transcendent journey`
  }

  let prompt = basePrompts[params.consciousness_level]

  if (params.genre) {
    prompt = `${params.genre} style, ${prompt}`
  }

  if (params.mood) {
    prompt += `, ${params.mood} mood`
  }

  if (params.prompt) {
    prompt += `, ${params.prompt}`
  }

  return prompt
}

function generateMusicTitle(consciousnessLevel: ConsciousnessLevel, frequency: number): string {
  const titles: Record<ConsciousnessLevel, string[]> = {
    healing: [`Healing Frequency ${frequency}Hz`, `Restoration at ${frequency}Hz`, `Cellular Renewal ${frequency}Hz`],
    focus: [`Focus Flow ${frequency}Hz`, `Concentration Current ${frequency}Hz`, `Deep Work ${frequency}Hz`],
    creativity: [`Creative Catalyst ${frequency}Hz`, `Innovation Wave ${frequency}Hz`, `Artistic Flow ${frequency}Hz`],
    transformation: [`Transformation ${frequency}Hz`, `Consciousness Shift ${frequency}Hz`, `Evolution Frequency ${frequency}Hz`]
  }

  const levelTitles = titles[consciousnessLevel] || titles.focus
  return levelTitles[Math.floor(Math.random() * levelTitles.length)]
}

function generateMusicDescription(consciousnessLevel: ConsciousnessLevel, frequency: number, bpm: number): string {
  const freqInfo = CONSCIOUSNESS_FREQUENCIES[frequency]
  return `Consciousness-aligned music designed for ${consciousnessLevel} at ${frequency}Hz. ${freqInfo?.effect || 'Enhances awareness'} through carefully crafted ${bpm} BPM rhythms that synchronize with natural brain states.`
}

function generateOptimalKey(frequency: number): string {
  // Map frequencies to musical keys for harmonic resonance
  const keyMappings: Record<number, string> = {
    396: 'G Major',
    417: 'A♭ Major',
    528: 'C Major',
    639: 'E♭ Major',
    741: 'F♯ Major',
    852: 'G♯ Major',
    963: 'B Major'
  }

  return keyMappings[frequency] || 'C Major'
}

function calculateConsciousnessMetrics(consciousnessLevel: ConsciousnessLevel, frequency: number) {
  const baseMetrics: Record<ConsciousnessLevel, { transformation_potential: number; healing_properties: number; focus_enhancement: number; creativity_boost: number }> = {
    healing: { transformation_potential: 8.5, healing_properties: 9.5, focus_enhancement: 6.0, creativity_boost: 7.0 },
    focus: { transformation_potential: 7.0, healing_properties: 6.5, focus_enhancement: 9.5, creativity_boost: 7.5 },
    creativity: { transformation_potential: 8.0, healing_properties: 7.0, focus_enhancement: 7.5, creativity_boost: 9.5 },
    transformation: { transformation_potential: 9.5, healing_properties: 8.5, focus_enhancement: 7.0, creativity_boost: 8.5 }
  }

  const metrics = baseMetrics[consciousnessLevel] || baseMetrics.focus

  // Adjust based on frequency
  const freqBonus = CONSCIOUSNESS_FREQUENCIES[frequency] ? 0.5 : 0

  return {
    transformation_potential: Math.min(10, metrics.transformation_potential + freqBonus),
    healing_properties: Math.min(10, metrics.healing_properties + freqBonus),
    focus_enhancement: Math.min(10, metrics.focus_enhancement + freqBonus),
    creativity_boost: Math.min(10, metrics.creativity_boost + freqBonus)
  }
}

function generateMusicId(): string {
  return `music_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}