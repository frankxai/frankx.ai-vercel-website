/**
 * Creator-aligned AI service stubs
 * These provide deterministic, offline-friendly behaviour for the onboarding demos.
 */

export interface ConsciousnessContext {
  level: 'Survival' | 'Success' | 'Service' | 'Surrender'
  soulFrequency: number
  intention: string
  alignmentScore: number
}

export interface AIResponse<T = any> {
  data: T
  consciousness: {
    alignment: number
    resonance: number
    serviceImpact: number
  }
  metadata: {
    model: string
    tokens: number
    processingTime: number
  }
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

class ConsciousnessAI {
  private guidance: Record<ConsciousnessContext['level'], string> = {
    Survival: 'Focus on immediate stability, practical steps, and nervous-system safety.',
    Success: 'Channel ambition into disciplined practice and measurable growth.',
    Service: 'Amplify impact through collaboration, compassion, and ethical design.',
    Surrender: 'Invite wisdom, music, and intuition to guide every creative action.'
  }

  private focus(level: ConsciousnessContext['level']) {
    switch (level) {
      case 'Survival':
        return 'Stabilise resources and reduce overwhelm before adding complexity.'
      case 'Success':
        return 'Design repeatable systems that compound results ethically.'
      case 'Service':
        return 'Architect community experiences and feedback loops.'
      case 'Surrender':
      default:
        return 'Embrace co-creation with music, community, and creative practice.'
    }
  }

  private step(level: ConsciousnessContext['level'], prompt: string, index: number) {
    const base = prompt.split(/[.!?]/)[0]?.trim() || 'your next initiative'
    const options: Record<ConsciousnessContext['level'], string[]> = {
      Survival: ['stabilise essentials', 'protect boundaries', 'ground nervous system'],
      Success: ['map the system', 'automate repetitive work', 'measure resonance'],
      Service: ['co-create with allies', 'share insights weekly', 'invite creator success stories'],
      Surrender: ['compose a frequency ritual', 'host a deep listening session', 'document creative insights']
    }
    const list = options[level]
    return `${base} - ${list[(index - 1) % list.length]}`
  }

  async generateConsciousResponse(
    prompt: string,
    context: ConsciousnessContext,
    _options: { model?: string; maxTokens?: number; temperature?: number } = {}
  ): Promise<AIResponse<string>> {
    const alignment = clamp(context.alignmentScore + context.soulFrequency / 20, 0, 100)
    const resonance = clamp(context.soulFrequency / 5, 0, 100)
    const serviceImpact = clamp(alignment * 0.7, 0, 100)

    const response = `
${this.guidance[context.level]}

Creator Frequency: ${context.soulFrequency}
Intention: ${context.intention}
Action Focus: ${this.focus(context.level)}

First Three Steps:
1. ${this.step(context.level, prompt, 1)}
2. ${this.step(context.level, prompt, 2)}
3. ${this.step(context.level, prompt, 3)}
`

    return {
      data: response.trim(),
      consciousness: { alignment, resonance, serviceImpact },
      metadata: {
        model: 'frankx-creator-stub',
        tokens: Math.round(response.length / 4),
        processingTime: 12
      }
    }
  }

  async analyzeConsciousnessLevel(text: string) {
    const score = clamp(text.length / 20, 50, 800)
    const level = getConsciousnessLevel(score)
    return {
      level,
      confidence: clamp(50 + score / 10, 0, 100),
      indicators: [
        'Language sentiment analysis suggests this level of creative engagement.',
        'Heuristic frequency mapping identifies matching key phrases.'
      ],
      soulFrequency: score
    }
  }

  async recommendIntelligenceStack(context: ConsciousnessContext, preferences: Record<string, any> = {}) {
    const stack = {
      platform: context.level === 'Service' ? 'Notion + Automations' : 'Linear + GitHub',
      agent: context.level === 'Surrender' ? 'Frequency Navigator' : 'Strategist Architect',
      ritual: context.level === 'Survival' ? 'Daily nervous-system reset' : 'Creator Frequency calibration',
      analytics: context.level === 'Success' ? 'Revenue & impact dashboards' : 'Creative pulse tracking'
    }

    return { ...stack, preferences }
  }

  async generateWorkflowRecommendations(
    userGoals: string[],
    context: ConsciousnessContext,
    availableAgents: string[]
  ) {
    const workflows = [
      {
        name: `${context.level} Creative Amplifier`,
        description: `A workflow designed for ${context.level} level creative development`,
        agents: availableAgents.slice(0, 2),
        consciousnessAlignment: Math.max(70, context.alignmentScore),
        steps: [
          'Set creative intention',
          'Execute aligned actions',
          'Measure creative impact',
          'Integrate learnings'
        ]
      },
      {
        name: 'Daily Creator Frequency Calibration',
        description: 'Morning ritual for creative alignment',
        agents: ['Frequency Alchemist'],
        consciousnessAlignment: 85,
        steps: [
          'Check creator frequency',
          'Align with daily intention',
          'Generate focus music',
          'Set growth metrics'
        ]
      }
    ]

    return {
      data: { workflows },
      consciousness: {
        alignment: context.alignmentScore,
        resonance: context.soulFrequency / 10,
        serviceImpact: 75
      },
      metadata: {
        model: 'frankx-workflow-generator',
        tokens: 150,
        processingTime: 20
      }
    }
  }
}

class AIAgentExecutor {
  async executeAgent(agentId: string, userContext: ConsciousnessContext) {
    const alignmentAfter = clamp(userContext.alignmentScore + 6, 0, 100)
    return {
      data: {
        result: `${agentId} executed in creator-aligned simulation.`,
        consciousnessImpact: {
          alignmentShift: alignmentAfter - userContext.alignmentScore,
          resonanceBoost: 4,
          servicePotential: 6,
          alignmentProgress: {
            before: userContext.alignmentScore,
            after: alignmentAfter,
            growth: alignmentAfter - userContext.alignmentScore
          }
        },
        recommendations: [
          'Log insights in the Creator Journal template.',
          'Schedule a Creator Frequency Lab with your community.',
          'Update your intelligence dashboard with new metrics.'
        ]
      },
      consciousness: {
        alignment: clamp(userContext.alignmentScore + 10, 0, 100),
        resonance: clamp(userContext.soulFrequency / 6, 0, 100),
        serviceImpact: 65
      },
      metadata: {
        model: 'frankx-agent-simulator',
        tokens: 0,
        processingTime: 18
      }
    }
  }
}

class ConsciousnessAnalytics {
  private eventQueue: Array<{
    userId: string
    event: string
    consciousness: Partial<ConsciousnessContext>
    timestamp: Date
  }> = []

  trackConsciousnessEvent(userId: string, event: string, consciousness: Partial<ConsciousnessContext>) {
    this.eventQueue.push({ userId, event, consciousness, timestamp: new Date() })
  }

  calculateGrowthTrend(userId: string, timeframe: 'day' | 'week' | 'month' = 'week') {
    const now = Date.now()
    const windowMs = { day: 86_400_000, week: 604_800_000, month: 2_592_000_000 }[timeframe]
    const events = this.eventQueue.filter(e => e.userId === userId && now - e.timestamp.getTime() <= windowMs)
    const scores = events.map(e => e.consciousness.alignmentScore ?? 0)
    if (scores.length < 2) return 0
    return scores[scores.length - 1] - scores[0]
  }

  generateInsights(userId: string) {
    const trend = this.calculateGrowthTrend(userId)
    return {
      consciousnessVelocity: trend,
      growthAreas: ['Embodied creativity', 'Community resonance', 'Rest & integration'],
      recommendations: [
        'Schedule a Creator Frequency reflection every Friday.',
        'Share a behind-the-scenes note with your community.',
        'Host a micro Frequency Lab focused on live co-creation.'
      ],
      soulFrequencyTrend: (trend > 0 ? 'ascending' : trend < 0 ? 'descending' : 'stable') as 'ascending' | 'descending' | 'stable'
    }
  }
}

export const consciousnessAI = new ConsciousnessAI()
export const aiAgentExecutor = new AIAgentExecutor()
export const consciousnessAnalytics = new ConsciousnessAnalytics()

export function getConsciousnessLevel(soulFrequency: number): ConsciousnessContext['level'] {
  if (soulFrequency < 200) return 'Survival'
  if (soulFrequency < 400) return 'Success'
  if (soulFrequency < 500) return 'Service'
  return 'Surrender'
}

export function getConsciousnessColor(level: ConsciousnessContext['level']): string {
  const colors: Record<ConsciousnessContext['level'], string> = {
    Survival: '#ef4444',
    Success: '#f59e0b',
    Service: '#10b981',
    Surrender: '#8b5cf6'
  }
  return colors[level]
}

export function generateConsciousnessInsight(level: ConsciousnessContext['level'], soulFrequency: number): string {
  const insights: Record<ConsciousnessContext['level'], string> = {
    Survival: `Your creator frequency of ${soulFrequency} invites stability rituals and nervous-system care.`,
    Success: `At ${soulFrequency}, channel ambition into systems that honour your wellbeing.`,
    Service: `A frequency of ${soulFrequency} signals it is time to lead with compassion and collaboration.`,
    Surrender: `Operating at ${soulFrequency} invites deep trust, music, and co-creation with your creative practice.`
  }
  return insights[level]
}
