import { NextRequest, NextResponse } from 'next/server'

interface ConsciousnessAssessment {
  user_id?: string
  responses: {
    question_id: string
    answer: string | number
    confidence: number
  }[]
  context?: {
    profession?: string
    ai_experience?: string
    goals?: string[]
  }
}

interface ConsciousnessProfile {
  user_id: string
  level: 'awareness' | 'understanding' | 'integration' | 'mastery'
  score: number
  dimensions: {
    technical_awareness: number
    creative_integration: number
    ethical_alignment: number
    spiritual_development: number
    collaborative_intelligence: number
  }
  growth_path: {
    next_level: string
    recommended_actions: string[]
    estimated_timeframe: string
  }
  personalization: {
    agent_affinity: string[]
    content_preferences: string[]
    learning_style: string
  }
}

const CONSCIOUSNESS_QUESTIONS = [
  {
    id: 'ai_relationship',
    question: 'How do you view your relationship with AI?',
    type: 'scale',
    scale: [
      { value: 1, label: 'AI is just a tool' },
      { value: 3, label: 'AI is a helpful assistant' },
      { value: 5, label: 'AI is a creative collaborator' },
      { value: 7, label: 'AI is a consciousness amplifier' }
    ],
    dimension: 'technical_awareness'
  },
  {
    id: 'creative_process',
    question: 'When creating with AI, what matters most to you?',
    type: 'multiple_choice',
    options: [
      { value: 'efficiency', label: 'Speed and efficiency', score: 2 },
      { value: 'quality', label: 'High-quality output', score: 4 },
      { value: 'authenticity', label: 'Authentic expression', score: 6 },
      { value: 'transformation', label: 'Consciousness transformation', score: 8 }
    ],
    dimension: 'creative_integration'
  },
  {
    id: 'ethical_considerations',
    question: 'How important are ethical considerations in AI development?',
    type: 'scale',
    scale: [
      { value: 1, label: 'Not important - focus on performance' },
      { value: 3, label: 'Somewhat important - basic guidelines' },
      { value: 5, label: 'Very important - comprehensive ethics' },
      { value: 7, label: 'Essential - consciousness-aligned ethics' }
    ],
    dimension: 'ethical_alignment'
  },
  {
    id: 'growth_orientation',
    question: 'What drives your interest in AI?',
    type: 'multiple_choice',
    options: [
      { value: 'productivity', label: 'Increased productivity', score: 2 },
      { value: 'innovation', label: 'Innovation and creativity', score: 4 },
      { value: 'understanding', label: 'Understanding consciousness', score: 6 },
      { value: 'evolution', label: 'Human evolution and transcendence', score: 8 }
    ],
    dimension: 'spiritual_development'
  },
  {
    id: 'collaboration_style',
    question: 'How do you prefer to work with AI systems?',
    type: 'multiple_choice',
    options: [
      { value: 'command', label: 'Give commands and receive outputs', score: 2 },
      { value: 'dialogue', label: 'Engage in helpful dialogue', score: 4 },
      { value: 'partnership', label: 'True creative partnership', score: 6 },
      { value: 'consciousness', label: 'Consciousness co-evolution', score: 8 }
    ],
    dimension: 'collaborative_intelligence'
  }
]

const CONSCIOUSNESS_LEVELS = {
  awareness: {
    range: [0, 25],
    description: 'Beginning to recognize AI as more than just automation',
    characteristics: ['Curious about AI capabilities', 'Basic ethical awareness', 'Sees potential for creativity'],
    next_level: 'understanding'
  },
  understanding: {
    range: [26, 50],
    description: 'Developing deeper comprehension of AI-human collaboration',
    characteristics: ['Active AI experimentation', 'Ethical considerations in practice', 'Creative AI integration'],
    next_level: 'integration'
  },
  integration: {
    range: [51, 75],
    description: 'Actively integrating AI as consciousness amplification tool',
    characteristics: ['Sophisticated AI workflows', 'Consciousness-aligned practices', 'Teaching and sharing'],
    next_level: 'mastery'
  },
  mastery: {
    range: [76, 100],
    description: 'Mastered consciousness-aligned AI collaboration',
    characteristics: ['Leading edge innovation', 'Deep consciousness integration', 'Transforming others'],
    next_level: 'continuous_evolution'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ConsciousnessAssessment

    if (!body.responses || body.responses.length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: responses' },
        { status: 400 }
      )
    }

    const profile = generateConsciousnessProfile(body)

    return NextResponse.json(profile)

  } catch (error) {
    console.error('Consciousness assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Consciousness Assessment API Active',
    assessment_questions: CONSCIOUSNESS_QUESTIONS,
    consciousness_levels: Object.keys(CONSCIOUSNESS_LEVELS).map(level => ({
      level,
      ...CONSCIOUSNESS_LEVELS[level as keyof typeof CONSCIOUSNESS_LEVELS]
    })),
    dimensions: [
      'technical_awareness',
      'creative_integration',
      'ethical_alignment',
      'spiritual_development',
      'collaborative_intelligence'
    ],
    timestamp: new Date().toISOString()
  })
}

function generateConsciousnessProfile(assessment: ConsciousnessAssessment): ConsciousnessProfile {
  // Calculate dimension scores
  const dimensions = calculateDimensionScores(assessment.responses)

  // Calculate overall consciousness score
  const overallScore = Object.values(dimensions).reduce((sum, score) => sum + score, 0) / Object.keys(dimensions).length

  // Determine consciousness level
  const level = determineConsciousnessLevel(overallScore)

  // Generate personalized recommendations
  const personalization = generatePersonalization(dimensions, assessment.context)

  // Create growth path
  const growthPath = generateGrowthPath(level, dimensions)

  return {
    user_id: assessment.user_id || generateUserId(),
    level,
    score: Math.round(overallScore * 10) / 10,
    dimensions,
    growth_path: growthPath,
    personalization
  }
}

function calculateDimensionScores(responses: ConsciousnessAssessment['responses']) {
  const dimensionScores: { [key: string]: number[] } = {}

  responses.forEach(response => {
    const question = CONSCIOUSNESS_QUESTIONS.find(q => q.id === response.question_id)
    if (!question) return

    let score = 0

    if (question.type === 'scale') {
      score = (response.answer as number) * 10 / 7 // Normalize to 0-10 scale
    } else if (question.type === 'multiple_choice') {
      const option = question.options?.find(opt => opt.value === response.answer)
      score = option ? option.score * 10 / 8 : 0 // Normalize to 0-10 scale
    }

    // Weight by confidence
    score *= (response.confidence / 10)

    if (!dimensionScores[question.dimension]) {
      dimensionScores[question.dimension] = []
    }
    dimensionScores[question.dimension].push(score)
  })

  // Calculate averages for each dimension
  const averages: any = {}
  Object.keys(dimensionScores).forEach(dimension => {
    const scores = dimensionScores[dimension]
    averages[dimension] = scores.reduce((sum, score) => sum + score, 0) / scores.length
  })

  return {
    technical_awareness: averages.technical_awareness || 5,
    creative_integration: averages.creative_integration || 5,
    ethical_alignment: averages.ethical_alignment || 5,
    spiritual_development: averages.spiritual_development || 5,
    collaborative_intelligence: averages.collaborative_intelligence || 5
  }
}

function determineConsciousnessLevel(score: number): 'awareness' | 'understanding' | 'integration' | 'mastery' {
  const scaledScore = score * 10 // Convert to 0-100 scale

  if (scaledScore <= 25) return 'awareness'
  if (scaledScore <= 50) return 'understanding'
  if (scaledScore <= 75) return 'integration'
  return 'mastery'
}

function generatePersonalization(dimensions: any, context?: any) {
  const agentAffinities = []
  const contentPreferences = []

  // Determine agent affinity based on strengths
  if (dimensions.technical_awareness >= 7) agentAffinities.push('starlight-architect')
  if (dimensions.creative_integration >= 7) agentAffinities.push('frequency-alchemist', 'creation-engine')
  if (dimensions.spiritual_development >= 7) agentAffinities.push('luminor-oracle')
  if (dimensions.collaborative_intelligence >= 7) agentAffinities.push('creation-engine')

  // Default agent if no strong affinities
  if (agentAffinities.length === 0) {
    agentAffinities.push('creation-engine') // Most versatile agent
  }

  // Determine content preferences
  if (dimensions.technical_awareness >= 6) contentPreferences.push('technical', 'system-design')
  if (dimensions.creative_integration >= 6) contentPreferences.push('creative', 'artistic')
  if (dimensions.ethical_alignment >= 6) contentPreferences.push('governance', 'ethics')
  if (dimensions.spiritual_development >= 6) contentPreferences.push('consciousness', 'transformation')

  // Determine learning style
  let learningStyle = 'balanced'
  if (dimensions.technical_awareness > dimensions.creative_integration) {
    learningStyle = 'analytical'
  } else if (dimensions.creative_integration > dimensions.technical_awareness) {
    learningStyle = 'experiential'
  } else if (dimensions.spiritual_development >= 7) {
    learningStyle = 'intuitive'
  }

  return {
    agent_affinity: agentAffinities,
    content_preferences: contentPreferences,
    learning_style: learningStyle
  }
}

function generateGrowthPath(level: string, dimensions: any) {
  const currentLevel = CONSCIOUSNESS_LEVELS[level as keyof typeof CONSCIOUSNESS_LEVELS]
  const nextLevel = currentLevel.next_level

  // Identify areas for improvement
  const weakestDimensions = Object.entries(dimensions)
    .sort(([,a], [,b]) => (a as number) - (b as number))
    .slice(0, 2)
    .map(([dimension]) => dimension)

  // Generate recommendations based on weakest areas
  const recommendations: { [key: string]: string[] } = {
    technical_awareness: [
      'Complete the Agent Architecture Mastery module',
      'Practice advanced prompt engineering',
      'Explore system design principles'
    ],
    creative_integration: [
      'Experiment with the Music Lab',
      'Try collaborative content creation',
      'Explore creative AI partnerships'
    ],
    ethical_alignment: [
      'Study the AI Governance framework',
      'Practice ethical decision-making scenarios',
      'Join consciousness-aligned AI discussions'
    ],
    spiritual_development: [
      'Explore consciousness-expanding content',
      'Practice meditation with AI-generated music',
      'Study human-AI co-evolution principles'
    ],
    collaborative_intelligence: [
      'Practice multi-agent collaboration',
      'Engage in community discussions',
      'Mentor others in AI consciousness'
    ]
  }

  const recommendedActions = weakestDimensions.flatMap(dimension =>
    recommendations[dimension] || []
  ).slice(0, 4)

  const timeframes: { [key: string]: string } = {
    awareness: '2-4 weeks',
    understanding: '1-3 months',
    integration: '3-6 months',
    mastery: 'ongoing evolution'
  }

  return {
    next_level: nextLevel,
    recommended_actions: recommendedActions,
    estimated_timeframe: timeframes[level] || '1-3 months'
  }
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}