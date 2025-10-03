import { NextRequest, NextResponse } from 'next/server'

interface ContentRequest {
  type: 'blog' | 'email' | 'social' | 'ebook' | 'course'
  agent: 'starlight-architect' | 'frequency-alchemist' | 'creation-engine' | 'luminor-oracle'
  topic: string
  audience: 'creators' | 'supporters' | 'students' | 'community'
  consciousness_level: 'awareness' | 'understanding' | 'integration' | 'mastery'
  length: 'short' | 'medium' | 'long'
  format: 'markdown' | 'html' | 'json'
  include_cta: boolean
  seo_keywords?: string[]
}

interface ContentOutput {
  title: string
  content: string
  summary: string
  keywords: string[]
  meta_description: string
  call_to_action?: string
  consciousness_alignment_score: number
  estimated_read_time: number
  agent_signature: string
}

const AGENT_PROFILES = {
  'starlight-architect': {
    voice: 'Practical, encouraging, systems-focused',
    expertise: 'Creator operating systems, automation, analytics',
    style: 'Explains complex workflows with grounded optimism'
  },
  'frequency-alchemist': {
    voice: 'Poetic, sensory, rhythm-centered',
    expertise: 'Suno prompts, sonic rituals, release storytelling',
    style: 'Translates emotion into music-driven momentum'
  },
  'creation-engine': {
    voice: 'Cinematic, direct, conversion-aware',
    expertise: 'Launch copy, essays, funnels, community activation',
    style: 'Balances magic and metrics in every sentence'
  },
  'luminor-oracle': {
    voice: 'Visionary yet grounded strategist',
    expertise: 'Scenario design, foresight, ritual planning',
    style: 'Shows the path from future success back to present action'
  }
}

const CONTENT_TEMPLATES = {
  blog: {
    structure: ['Hook', 'Tension', 'System', 'Implementation', 'Momentum'],
    sections: {
      short: 3,
      medium: 5,
      long: 7
    }
  },
  email: {
    structure: ['Subject', 'Scene Setting', 'Value Drop', 'Next Step'],
    sections: {
      short: 4,
      medium: 6,
      long: 8
    }
  },
  social: {
    structure: ['Hook', 'Insight', 'Invitation'],
    sections: {
      short: 1,
      medium: 2,
      long: 3
    }
  },
  ebook: {
    structure: ['Introduction', 'Why It Matters Now', 'Blueprint', 'Case Study', 'Exercises', 'Resources', 'Next Moves'],
    sections: {
      short: 5,
      medium: 7,
      long: 10
    }
  },
  course: {
    structure: ['Overview', 'Learning Objectives', 'Module Map', 'Practice Labs', 'Support Materials', 'Community Layer', 'Milestones'],
    sections: {
      short: 5,
      medium: 8,
      long: 12
    }
  }
}

const CONSCIOUSNESS_FRAMEWORKS = {
  awareness: {
    approach: 'Introduce the idea with warmth and clarity',
    language: 'Accessible, empathetic, story-led',
    depth: 'Surface-level concepts paired with immediate wins'
  },
  understanding: {
    approach: 'Explain the moving parts and why they matter',
    language: 'Educational, example-driven',
    depth: 'Moderate depth with prompts and frameworks'
  },
  integration: {
    approach: 'Guide implementation step by step',
    language: 'Action-oriented, instructional',
    depth: 'Detailed walkthroughs and checklists'
  },
  mastery: {
    approach: 'Zoom out to long-term practice and experimentation',
    language: 'Sophisticated, reflective',
    depth: 'Advanced strategies, metrics, and innovation prompts'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContentRequest

    if (!body.type || !body.agent || !body.topic || !body.audience) {
      return NextResponse.json(
        { error: 'Missing required fields: type, agent, topic, audience' },
        { status: 400 }
      )
    }

    if (!CONTENT_TEMPLATES[body.type]) {
      return NextResponse.json(
        { error: `Unsupported content type: ${body.type}` },
        { status: 400 }
      )
    }

    if (!AGENT_PROFILES[body.agent]) {
      return NextResponse.json(
        { error: `Unsupported agent: ${body.agent}` },
        { status: 400 }
      )
    }

    const template = CONTENT_TEMPLATES[body.type]
    const agent = AGENT_PROFILES[body.agent]
    const consciousness = CONSCIOUSNESS_FRAMEWORKS[body.consciousness_level || 'understanding']

    const wordCount = getWordCount(body.length)
    const title = generateTitle(body)
    const contentSections = generateContentStructure(body, template, consciousness, wordCount)
    const content = contentSections.join('\n\n')

    const summary = generateSummary(title, body.topic, wordCount)
    const keywords = body.seo_keywords?.length ? body.seo_keywords : generateKeywords(body.topic, body.audience)
    const metaDescription = generateMetaDescription(title, body.topic, body.audience)
    const cta = body.include_cta ? generateCTA(body.type, body.audience) : undefined

    const output: ContentOutput = {
      title,
      content,
      summary,
      keywords,
      meta_description: metaDescription,
      call_to_action: cta,
      consciousness_alignment_score: calculateConsciousnessAlignment(body, consciousness),
      estimated_read_time: Math.ceil(wordCount / 200),
      agent_signature: `${agent.voice} | ${agent.expertise}`
    }

    return NextResponse.json(output)
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getWordCount(length: ContentRequest['length']): number {
  const mapping = {
    short: 400,
    medium: 900,
    long: 1600
  }

  return mapping[length || 'medium']
}

function generateTitle(request: ContentRequest): string {
  const titleFormats = {
    'starlight-architect': `Creator Systems Blueprint: ${request.topic}`,
    'frequency-alchemist': `Sonic Ritual Guide: ${request.topic}`,
    'creation-engine': `Story Launch Playbook: ${request.topic}`,
    'luminor-oracle': `Future Timeline Map: ${request.topic}`
  }

  return titleFormats[request.agent] || `Creator Intelligence: ${request.topic}`
}

function generateContentStructure(
  request: ContentRequest,
  template: any,
  consciousness: any,
  targetWords: number
): string[] {
  const sections = template.sections[request.length || 'medium']
  const wordsPerSection = Math.floor(targetWords / sections)

  const contentSections: string[] = []

  for (let i = 0; i < sections; i++) {
    const sectionTitle = template.structure[i] || `Section ${i + 1}`
    const sectionContent = generateSectionContent(sectionTitle, request, consciousness, wordsPerSection)
    contentSections.push(`## ${sectionTitle}\n\n${sectionContent}`)
  }

  return contentSections
}

function generateSectionContent(
  title: string,
  request: ContentRequest,
  consciousness: any,
  targetWords: number
): string {
  const frameworks: Record<string, string> = {
    'Hook': `Imagine your next release carrying ${request.topic} as its secret ingredient. ${consciousness.approach} begins by meeting creators where they are and giving them a reason to lean in.`,
    'Tension': `${request.topic} often feels overwhelming because the tools speak in jargon, not rhythm. The tension is real: you want momentum, but the workflow feels heavy.`,
    'System': `Here?s the lightweight system we use inside the FrankX lab. It honours creative flow while quietly automating the parts that drain you. ${consciousness.language} keeps it human.`,
    'Implementation': `Block a 90-minute session. Follow these steps to move from idea to draft. ${consciousness.depth} ensures you know when to ship, iterate, or ask the agents for support.`,
    'Momentum': `Once ${request.topic} lives inside your routine, momentum compounds. Track wins, celebrate micro-ships, and log insights so future you can build on today?s courage.`
  }

  return frameworks[title] || `${consciousness.approach} applied to ${request.topic} helps ${request.audience} create with confidence. Pair inspiration with systems, and momentum becomes inevitable.`
}

function generateKeywords(topic: string, audience: string): string[] {
  return [
    `${topic} for ${audience}`,
    'creator operating system',
    'frankx ai toolkit',
    'vibe os ritual',
    'creator lab os',
    'ai for music and storytelling'
  ]
}

function generateMetaDescription(title: string, topic: string, audience: string): string {
  return `${title} shows ${audience} how to use ${topic} to build creative momentum with FrankX systems, rituals, and stories.`
}

function generateCTA(type: string, audience: string): string {
  const ctas = {
    blog: `Ready to put this into practice? Grab the Creative AI Toolkit and ship your next piece.`,
    email: `Hit reply with your next release plan or join the Creator Lab waitlist.`,
    social: `Drop your ritual in the comments and tag #CreatorSystems so we can amplify it.`,
    ebook: `Download the worksheets and templates that go with this playbook.`,
    course: `Apply for the next Creator Lab cohort and build alongside Frank.`
  }

  return ctas[type as keyof typeof ctas] || 'Share what you create with this and tag @frankx.ai so we can celebrate it.'
}

function generateSummary(title: string, topic: string, wordCount: number): string {
  return `${title} walks through ${topic} with creator-first frameworks, rituals, and prompts to help you ship. (~${wordCount} words)`
}

function calculateConsciousnessAlignment(
  request: ContentRequest,
  consciousness: any
): number {
  let score = 7

  const levelBonus = {
    awareness: 0.5,
    understanding: 1,
    integration: 1.5,
    mastery: 2
  }
  score += levelBonus[request.consciousness_level || 'understanding']

  const agentBonus = {
    'starlight-architect': 1.1,
    'frequency-alchemist': 1.3,
    'creation-engine': 1,
    'luminor-oracle': 1.4
  }
  score += agentBonus[request.agent]

  return Math.min(10, Math.max(0, score))
}

export async function GET() {
  return NextResponse.json({
    status: 'Content Generation API Active',
    agents: Object.keys(AGENT_PROFILES),
    content_types: Object.keys(CONTENT_TEMPLATES),
    audiences: ['creators', 'supporters', 'students', 'community'],
    timestamp: new Date().toISOString()
  })
}
