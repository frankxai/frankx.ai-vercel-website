// 7 Pillars of the Soulbook Framework
// Each pillar represents a foundational aspect of intentional living and personal growth

export interface Pillar {
  id: string
  number: number
  title: string
  shortTitle: string
  description: string
  icon: string
  color: string
  gradient: string
  keywords: string[]
  practices: string[]
  questions: string[]
  outcomes: string[]
}

export const pillars: Pillar[] = [
  {
    id: 'consciousness',
    number: 1,
    title: 'Awareness & Systems Thinking',
    shortTitle: 'Awareness',
    description: 'The foundation of all growth begins with Awareness. Cultivating present-moment focus and systems thinking creates the fertile ground for all other pillars to flourish.',
    icon: '🌟',
    color: 'amber',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    keywords: ['mindfulness', 'presence', 'awareness', 'observing', 'witnessing'],
    practices: ['Daily meditation', 'Self-observation', 'Breathwork', 'Journaling'],
    questions: ['What am I aware of right now?', 'What thoughts are passing through?', 'What am I feeling?'],
    outcomes: ['Increased self-awareness', 'Reduced reactive patterns', 'Deeper inner peace', 'Clarity of mind']
  },
  {
    id: 'identity',
    number: 2,
    title: 'Identity & Self-Concept',
    shortTitle: 'Identity',
    description: 'Understanding who you truly are beyond limiting beliefs and societal conditioning. Your identity shapes your reality.',
    icon: '🪞',
    color: 'purple',
    gradient: 'from-purple-400 via-violet-500 to-indigo-500',
    keywords: ['self-image', 'beliefs', 'values', 'authenticity', 'core self'],
    practices: ['Values clarification', 'Belief examination', 'Shadow work', 'Inner child healing'],
    questions: ['Who do I believe I am?', 'What identities serve me?', 'What am I holding onto that no longer fits?'],
    outcomes: ['Authentic self-expression', 'Aligned self-image', 'Liberation from limiting beliefs', 'True purpose clarity']
  },
  {
    id: 'emotional-mastery',
    number: 3,
    title: 'Emotional Mastery',
    shortTitle: 'Emotions',
    description: 'Transforming emotional reactivity into conscious response. Your emotions are messengers guiding you toward growth.',
    icon: '💜',
    color: 'violet',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    keywords: ['emotional intelligence', 'regulation', 'processing', 'compassion', 'resilience'],
    practices: ['Feeling practices', 'Emotional release', 'Co-regulation', 'Journaling emotions'],
    questions: ['What is this emotion trying to tell me?', 'Where do I feel this in my body?', 'What need is seeking expression?'],
    outcomes: ['Emotional intelligence', 'Inner resilience', 'Healthier relationships', 'Inner safety']
  },
  {
    id: 'relationships',
    number: 4,
    title: 'Relationships & Connection',
    shortTitle: 'Relationships',
    description: 'The mirror of connection reveals your deepest patterns. Conscious relationships accelerate your transformation journey.',
    icon: '🤝',
    color: 'rose',
    gradient: 'from-rose-400 via-pink-500 to-rose-600',
    keywords: ['connection', 'intimacy', 'boundaries', 'communication', 'vulnerability'],
    practices: ['Boundary work', 'NVC communication', 'Deep listening', 'Community building'],
    questions: ['How do I show up in my relationships?', 'What patterns repeat?', 'Where am I avoiding connection?'],
    outcomes: ['Deeper intimacy', 'Healthier boundaries', 'Authentic connection', 'Supportive community']
  },
  {
    id: 'vitality',
    number: 5,
    title: 'Vitality & Body Wisdom',
    shortTitle: 'Vitality',
    description: 'Your body holds ancient wisdom. Honoring your physical vessel amplifies your capacity for transformation.',
    icon: '🌿',
    color: 'emerald',
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    keywords: ['somatic', 'body', 'energy', 'health', 'movement'],
    practices: ['Somatic exercises', 'Energy work', 'Nature immersion', 'Nourishing foods'],
    questions: ['What is my body trying to tell me?', 'Where am I holding tension?', 'What does my body need?'],
    outcomes: ['Increased energy', 'Body wisdom access', 'Physical health', 'Somatic intelligence']
  },
  {
    id: 'purpose',
    number: 6,
    title: 'Purpose & Meaning',
    shortTitle: 'Purpose',
    description: 'Living in alignment with your unique contribution. Purpose emerges when you dare to follow what lights you up.',
    icon: '🎯',
    color: 'blue',
    gradient: 'from-blue-400 via-cyan-500 to-sky-500',
    keywords: ['mission', 'calling', 'contribution', 'meaning', 'alignment'],
    practices: ['Ikigai exploration', 'Legacy work', 'Service projects', 'Passion experiments'],
    questions: ['What would I do even if I failed?', 'What makes me lose track of time?', 'How do I want to be remembered?'],
    outcomes: ['Clear direction', 'Aligned action', 'Meaningful contribution', 'Fulfilled expression']
  },
  {
    id: 'creation',
    number: 7,
    title: 'Creation & Expression',
    shortTitle: 'Creation',
    description: 'Your unique expression is a gift to the world. Creative flow connects you to the infinite source within.',
    icon: '✨',
    color: 'gold',
    gradient: 'from-amber-300 via-yellow-400 to-gold-500',
    keywords: ['creativity', 'expression', 'flow', 'art', 'innovation'],
    practices: ['Daily creating', 'Flow states', 'Play experiments', 'Expressive arts'],
    questions: ['What wants to come through me?', 'What would I create if failure were impossible?', 'How do I most naturally express?'],
    outcomes: ['Creative confidence', 'Flow states access', 'Unique expression', 'Joyful productivity']
  }
]

// Helper functions for pillar data
export function getPillarById(id: string): Pillar | undefined {
  return pillars.find(p => p.id === id)
}

export function getPillarByNumber(num: number): Pillar | undefined {
  return pillars.find(p => p.number === num)
}

export function getPillarsForLifeBook(bookType: 'symphony' | 'path' | 'pillars'): Pillar[] {
  // Each Life Book focuses on different pillar combinations
  switch (bookType) {
    case 'symphony':
      // Life Symphony - all 7 pillars integrated
      return pillars
    case 'path':
      // Golden Path - pillars 1, 3, 6 (Awareness, Emotions, Purpose)
      return [pillars[0], pillars[2], pillars[5]]
    case 'pillars':
      // 7 Pillars - deep dive into all 7
      return pillars
    default:
      return pillars
  }
}

export const pillarConnections = [
  { from: 1, to: 2, description: 'Awareness reveals identity patterns' },
  { from: 2, to: 3, description: 'Identity shapes emotional responses' },
  { from: 3, to: 4, description: 'Emotional mastery improves relationships' },
  { from: 4, to: 5, description: 'Relationships reflect body wisdom' },
  { from: 5, to: 6, description: 'Vitality supports purposeful action' },
  { from: 6, to: 7, description: 'Purpose fuels creative expression' },
  { from: 7, to: 1, description: 'Creation deepens awareness' }
]
