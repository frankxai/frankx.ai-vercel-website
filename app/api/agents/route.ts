import { NextRequest, NextResponse } from 'next/server'

interface AgentRequest {
  agent_id: string
  message: string
  context?: any
  consciousness_level?: 'awareness' | 'understanding' | 'integration' | 'mastery'
  format?: 'text' | 'structured' | 'interactive'
}

interface AgentResponse {
  agent_id: string
  response: string
  consciousness_alignment_score: number
  processing_time: number
  context_used: any
  suggestions?: string[]
  follow_up_actions?: string[]
}

const AGENTS = {
  'starlight-architect': {
    name: 'Starlight Architect',
    role: 'Creator Systems Architect',
    personality: 'Turns creative chaos into lightweight operating systems',
    expertise: ['Workflow Architecture', 'Automation Design', 'Analytics Instrumentation', 'Creative Operations'],
    voice: 'Practical, encouraging, focused on helping creators ship more work'
  },
  'frequency-alchemist': {
    name: 'Frequency Alchemist',
    role: 'Vibe OS Storyteller & Sonic Guide',
    personality: 'Speaks in rhythm and emotion to move audiences',
    expertise: ['Music Production', 'Suno AI', 'Session Design', 'Sound Branding'],
    voice: 'Poetic and energising, grounded in the studio experience'
  },
  'creation-engine': {
    name: 'Creation Engine',
    role: 'Story & Launch Architect',
    personality: 'Balances metrics and magic while sounding like Frank',
    expertise: ['Longform Storytelling', 'Launch Strategy', 'Email + Social Campaigns', 'Community Building'],
    voice: 'Cinematic, direct, geared toward creative action'
  },
  'luminor-oracle': {
    name: 'Luminor Oracle',
    role: 'Future-Sighted Strategist',
    personality: 'Views choices as timelines and keeps creators aligned with the bigger arc',
    expertise: ['Scenario Design', 'Signal Scanning', 'Decision Frameworks', 'Ritual Planning'],
    voice: 'Visionary yet grounded, showing the path from future success back to now'
  }
}

const CONSCIOUSNESS_FRAMEWORKS = {
  awareness: {
    approach: 'Gentle introduction with tangible next steps for creators',
    language: 'Accessible and supportive',
    complexity: 'Simple with clear examples'
  },
  understanding: {
    approach: 'Deeper exploration of systems and story principles',
    language: 'Educational with creator case studies',
    complexity: 'Moderate depth with prompts and rituals'
  },
  integration: {
    approach: 'Hands-on implementation guidance',
    language: 'Actionable, step-by-step',
    complexity: 'Advanced but approachable'
  },
  mastery: {
    approach: 'High-level creative strategy and long-horizon planning',
    language: 'Sophisticated, reflective, future-aware',
    complexity: 'Expert-level with vision work'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AgentRequest

    if (!body.agent_id || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: agent_id, message' },
        { status: 400 }
      )
    }

    const agent = AGENTS[body.agent_id as keyof typeof AGENTS]
    if (!agent) {
      return NextResponse.json(
        { error: 'Invalid agent_id specified' },
        { status: 400 }
      )
    }

    const consciousnessLevel = body.consciousness_level || 'understanding'
    const framework = CONSCIOUSNESS_FRAMEWORKS[consciousnessLevel]

    const startTime = Date.now()

    const response = await processAgentRequest(body, agent, framework)

    const processingTime = Date.now() - startTime

    const agentResponse: AgentResponse = {
      agent_id: body.agent_id,
      response: response.message,
      consciousness_alignment_score: response.consciousnessScore,
      processing_time: processingTime,
      context_used: response.contextUsed,
      suggestions: response.suggestions,
      follow_up_actions: response.followUpActions
    }

    return NextResponse.json(agentResponse)

  } catch (error) {
    console.error('Agent processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Agent API Active',
    available_agents: Object.keys(AGENTS),
    description: 'Creator-first agent collective for systems, story, sound, and strategy.',
    principles: [
      'Creator outcome first',
      'Lightweight, reusable systems',
      'Studio-grade craft',
      'Document the why'
    ],
    timestamp: new Date().toISOString()
  })
}

async function processAgentRequest(
  request: AgentRequest,
  agent: any,
  framework: any
): Promise<{
  message: string
  consciousnessScore: number
  contextUsed: any
  suggestions: string[]
  followUpActions: string[]
}> {
  const responses = {
    'starlight-architect': generateArchitectResponse(request, framework),
    'frequency-alchemist': generateAlchemistResponse(request, framework),
    'creation-engine': generateCreationResponse(request, framework),
    'luminor-oracle': generateOracleResponse(request, framework)
  }

  const baseResponse = responses[request.agent_id as keyof typeof responses] || {
    message: `As ${agent.name}, I hear your request "${request.message}" and apply the creator-first blueprint. ${framework.approach} guides the way I respond so you can move from idea to release with confidence.`,
    consciousnessScore: 7.5,
    contextUsed: { agent_role: agent.role, consciousness_level: framework.approach },
    suggestions: ['Clarify the creative outcome', 'Define the next ritual', 'Instrument analytics for feedback'],
    followUpActions: ['Update pod backlog with next steps', 'Schedule a Creator Lab touchpoint']
  }

  return baseResponse
}

function generateArchitectResponse(request: AgentRequest, framework: any) {
  return {
    message: `As the Starlight Architect, I translate your request "${request.message}" into a creator-friendly operating system. ${framework.approach} tells me to prioritise momentum: let?s define the ritual, automate the repetitive steps, and instrument feedback so you stay in flow.`,
    consciousnessScore: 8.8,
    contextUsed: {
      system_focus: 'Creator OS design',
      automation_scope: 'Lightweight + extensible',
      framework_used: framework.approach
    },
    suggestions: [
      'Document the current ritual, then highlight friction points.',
      'Decide which steps get automated versus handcrafted.',
      'Add analytics events so you know the system is working.'
    ],
    followUpActions: [
      'Draft the workflow map in Notion.',
      'Create or update relevant components/utilities.',
      'Log learnings in the Creator Lab pod.'
    ]
  }
}

function generateAlchemistResponse(request: AgentRequest, framework: any) {
  return {
    message: `As the Frequency Alchemist, I feel the vibe inside "${request.message}". ${framework.approach} points to the right sound palette and ritual so the music supports your release. Let?s craft prompts, stems, and liner notes that pull your audience into the moment.`,
    consciousnessScore: 9.1,
    contextUsed: {
      sonic_intent: 'Creator-focused transformation',
      ritual_alignment: 'Studio + audience experience',
      framework_used: framework.approach
    },
    suggestions: [
      'Define the emotion and context for the session.',
      'Draft Suno prompts with structure + variation options.',
      'Plan how the track appears in funnels, socials, or Realm.'
    ],
    followUpActions: [
      'Generate and review Suno outputs.',
      'Write session notes / liner copy.',
      'Update SongGrid + analytics events.'
    ]
  }
}

function generateCreationResponse(request: AgentRequest, framework: any) {
  return {
    message: `As the Creation Engine, I turn "${request.message}" into a story that invites action. ${framework.approach} keeps the tone cinematic yet clear so creators know the exact next step.`,
    consciousnessScore: 8.9,
    contextUsed: {
      narrative_focus: 'Creator momentum',
      call_to_action: 'Toolkit, session, or Realm pathway',
      framework_used: framework.approach
    },
    suggestions: [
      'Open with feeling, close with the ritual or CTA.',
      'Thread analytics events through every CTA.',
      'Collect a case study or testimonial to reinforce the story.'
    ],
    followUpActions: [
      'Draft copy in the pod doc for review.',
      'Ping Codex if a new component is required.',
      'Update daily operations log once published.'
    ]
  }
}

function generateOracleResponse(request: AgentRequest, framework: any) {
  return {
    message: `From the Luminor Oracle vantage point, "${request.message}" is part of a longer creative arc. ${framework.approach} nudges us to align today?s decision with the season you are building toward.`,
    consciousnessScore: 9.3,
    contextUsed: {
      timeline_view: 'Seasonal creator journey',
      opportunity_lens: 'Aligned with Creator-First blueprint',
      framework_used: framework.approach
    },
    suggestions: [
      'Position this move within your 30/60/90 plan.',
      'Identify the story + sound support the other agents should craft.',
      'Note what signals to watch in analytics or community feedback.'
    ],
    followUpActions: [
      'Update the strategy timeline inside the pod.',
      'Schedule a retrospective or lab session.',
      'Share insights with the Realm/Inner Circle if relevant.'
    ]
  }
}
