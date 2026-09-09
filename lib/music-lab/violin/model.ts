export type ViolinStringName = 'G' | 'D' | 'A' | 'E'

export type ViolinFinger = 0 | 1 | 2 | 3 | 4

export interface ViolinStringDefinition {
  name: ViolinStringName
  openMidi: number
  openNote: string
  description: string
}

export interface ViolinPosition {
  id: string
  string: ViolinStringName
  finger: ViolinFinger
  midi: number
  note: string
  keyboardKey: string
}

export interface ViolinPracticeEvent {
  positionId: string
  beats: number
  bow: 'down' | 'up' | 'either'
}

export interface ViolinLesson {
  id: string
  name: string
  description: string
  tempo: number
  events: ViolinPracticeEvent[]
}

export const VIOLIN_STRINGS: ViolinStringDefinition[] = [
  { name: 'G', openMidi: 55, openNote: 'G3', description: 'Low and warm' },
  { name: 'D', openMidi: 62, openNote: 'D4', description: 'Open and resonant' },
  { name: 'A', openMidi: 69, openNote: 'A4', description: 'Clear and singing' },
  { name: 'E', openMidi: 76, openNote: 'E5', description: 'Bright and focused' },
]

const FIRST_POSITION_NOTES: Record<ViolinStringName, Array<{ midi: number; note: string }>> = {
  G: [
    { midi: 55, note: 'G3' },
    { midi: 57, note: 'A3' },
    { midi: 59, note: 'B3' },
    { midi: 60, note: 'C4' },
    { midi: 62, note: 'D4' },
  ],
  D: [
    { midi: 62, note: 'D4' },
    { midi: 64, note: 'E4' },
    { midi: 66, note: 'F#4' },
    { midi: 67, note: 'G4' },
    { midi: 69, note: 'A4' },
  ],
  A: [
    { midi: 69, note: 'A4' },
    { midi: 71, note: 'B4' },
    { midi: 73, note: 'C#5' },
    { midi: 74, note: 'D5' },
    { midi: 76, note: 'E5' },
  ],
  E: [
    { midi: 76, note: 'E5' },
    { midi: 78, note: 'F#5' },
    { midi: 80, note: 'G#5' },
    { midi: 81, note: 'A5' },
    { midi: 83, note: 'B5' },
  ],
}

const KEYBOARD_ROWS: Record<ViolinStringName, string[]> = {
  G: ['1', '2', '3', '4', '5'],
  D: ['q', 'w', 'e', 'r', 't'],
  A: ['a', 's', 'd', 'f', 'g'],
  E: ['z', 'x', 'c', 'v', 'b'],
}

export const VIOLIN_POSITIONS: ViolinPosition[] = VIOLIN_STRINGS.flatMap((string) =>
  FIRST_POSITION_NOTES[string.name].map((position, finger) => ({
    id: `${string.name}-${finger}`,
    string: string.name,
    finger: finger as ViolinFinger,
    midi: position.midi,
    note: position.note,
    keyboardKey: KEYBOARD_ROWS[string.name][finger],
  })),
)

export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

export function getViolinPosition(positionId: string): ViolinPosition | undefined {
  return VIOLIN_POSITIONS.find((position) => position.id === positionId)
}

export function getKeyboardPosition(key: string): ViolinPosition | undefined {
  return VIOLIN_POSITIONS.find((position) => position.keyboardKey === key.toLowerCase())
}

export function validateViolinLesson(lesson: ViolinLesson): string[] {
  const errors: string[] = []

  if (!lesson.id.trim()) errors.push('Lesson id is required.')
  if (!lesson.name.trim()) errors.push('Lesson name is required.')
  if (lesson.tempo < 30 || lesson.tempo > 240) errors.push('Tempo must be between 30 and 240 BPM.')
  if (lesson.events.length === 0) errors.push('Lesson must contain at least one event.')

  lesson.events.forEach((event, index) => {
    if (!getViolinPosition(event.positionId)) {
      errors.push(`Event ${index + 1} references unknown position ${event.positionId}.`)
    }
    if (!Number.isFinite(event.beats) || event.beats <= 0) {
      errors.push(`Event ${index + 1} must have a positive beat duration.`)
    }
  })

  return errors
}
