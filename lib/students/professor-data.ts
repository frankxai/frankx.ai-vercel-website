export interface WorkshopTemplate {
  id: string
  title: string
  format: '2-hour' | 'half-day' | 'full-day'
  description: string
  learningObjectives: string[]
  audience: string
  prerequisites: string[]
  agenda: { time: string; activity: string; tool?: string; toolHref?: string }[]
  materials: string[]
}

export interface SyllabusSuggestion {
  id: string
  title: string
  weeks: number
  description: string
  modules: { week: string; topic: string; tools: string[] }[]
}

export const workshopTemplates: WorkshopTemplate[] = [
  {
    id: '2-hour-intro',
    title: 'AI Foundations Workshop',
    format: '2-hour',
    description: 'A fast-paced introduction to the AI landscape. Students leave understanding models, agents, skills demand, and their own AI career direction.',
    audience: 'Students with basic tech literacy, career changers, professionals',
    learningObjectives: [
      'Understand the 2026 AI landscape: models, agents, MCP',
      'Identify the most in-demand AI skills and salary ranges',
      'Complete an AI skills self-assessment',
      'Discover their AI career direction using the Ikigai framework',
    ],
    prerequisites: ['Laptop or tablet with internet', 'Basic familiarity with AI chatbots (ChatGPT, Claude)'],
    agenda: [
      { time: '0:00-0:30', activity: 'State of AI 2026 Briefing — models, agents, MCP', tool: 'AI Briefing', toolHref: '/students/ai-briefing' },
      { time: '0:30-0:50', activity: 'AI Skills Assessment — find your level', tool: 'Assessment', toolHref: '/students/assess' },
      { time: '0:50-1:20', activity: 'AI Ikigai Workshop — find your AI purpose', tool: 'Ikigai Finder', toolHref: '/students/ikigai' },
      { time: '1:20-1:40', activity: 'AI Role Navigator — explore career paths', tool: 'Role Navigator', toolHref: '/students/roles' },
      { time: '1:40-2:00', activity: 'Q&A + Next Steps — resources and learning paths', tool: 'Ecosystem Map', toolHref: '/students/ecosystem' },
    ],
    materials: ['/students/ai-briefing', '/students/assess', '/students/ikigai', '/students/roles', '/students/ecosystem'],
  },
  {
    id: 'half-day',
    title: 'AI Builder Workshop',
    format: 'half-day',
    description: 'Hands-on half-day session. Students go beyond understanding to building — creating prompts, designing AI agent systems, and starting a 30/60/90 day plan.',
    audience: 'Students with basic programming skills, creators, technical professionals',
    learningObjectives: [
      'Everything from the 2-Hour Workshop',
      'Master prompt engineering patterns with hands-on practice',
      'Design a personal AI agent system (Center of Excellence)',
      'Create a 30/60/90 day AI skill development plan',
    ],
    prerequisites: ['Laptop with internet', 'Basic understanding of AI concepts', 'A Claude or ChatGPT account (free tier)'],
    agenda: [
      { time: '0:00-0:30', activity: 'State of AI 2026 Briefing', tool: 'AI Briefing', toolHref: '/students/ai-briefing' },
      { time: '0:30-0:50', activity: 'AI Skills Assessment', tool: 'Assessment', toolHref: '/students/assess' },
      { time: '0:50-1:20', activity: 'AI Ikigai — find your direction', tool: 'Ikigai Finder', toolHref: '/students/ikigai' },
      { time: '1:20-1:30', activity: 'Break', },
      { time: '1:30-2:15', activity: 'Prompt Engineering Practice — 28 prompts across 6 domains', tool: 'Prompt Library', toolHref: '/students/prompts' },
      { time: '2:15-3:15', activity: 'Build Your AI System — Center of Excellence design', tool: 'CoE Builder', toolHref: '/students/coe-builder' },
      { time: '3:15-3:30', activity: 'Break', },
      { time: '3:30-4:00', activity: 'Career Paths + 30/60/90 Plan', tool: 'Role Navigator', toolHref: '/students/roles' },
    ],
    materials: ['/students/ai-briefing', '/students/assess', '/students/ikigai', '/students/prompts', '/students/coe-builder', '/students/roles'],
  },
  {
    id: 'full-day',
    title: 'AI Mastery Intensive',
    format: 'full-day',
    description: 'Complete immersion. Students explore the full AI landscape, build systems, create with AI tools, and leave with a portfolio artifact and detailed career roadmap.',
    audience: 'Motivated students, bootcamp cohorts, corporate training groups',
    learningObjectives: [
      'Everything from the Half-Day Workshop',
      'Build a complete AI agent team with tools and workflows',
      'Create AI-generated content (music, writing, visuals)',
      'Explore the ACOS open-source agent system',
      'Present a portfolio artifact to peers',
    ],
    prerequisites: ['Laptop with internet', 'Claude or ChatGPT account', 'Willingness to present work to peers'],
    agenda: [
      { time: '9:00-9:30', activity: 'State of AI 2026 Briefing', tool: 'AI Briefing', toolHref: '/students/ai-briefing' },
      { time: '9:30-10:00', activity: 'AI Skills Assessment + Discussion', tool: 'Assessment', toolHref: '/students/assess' },
      { time: '10:00-10:45', activity: 'AI Ikigai Deep Dive', tool: 'Ikigai Finder', toolHref: '/students/ikigai' },
      { time: '10:45-11:00', activity: 'Break', },
      { time: '11:00-12:00', activity: 'Prompt Engineering Mastery', tool: 'Prompt Library', toolHref: '/students/prompts' },
      { time: '12:00-1:00', activity: 'Lunch Break', },
      { time: '1:00-2:00', activity: 'Build Your AI System (CoE)', tool: 'CoE Builder', toolHref: '/students/coe-builder' },
      { time: '2:00-3:00', activity: 'Creative AI Lab — Music, Writing, or Visuals', tool: 'Music Lab', toolHref: '/music-lab' },
      { time: '3:00-3:15', activity: 'Break', },
      { time: '3:15-4:00', activity: 'Explore ACOS — The Creator OS', tool: 'ACOS', toolHref: '/acos' },
      { time: '4:00-4:30', activity: 'Career Roadmap + Presentations', tool: 'Role Navigator', toolHref: '/students/roles' },
      { time: '4:30-5:00', activity: 'Q&A + Ecosystem Map + Next Steps', tool: 'Ecosystem Map', toolHref: '/students/ecosystem' },
    ],
    materials: ['/students/ai-briefing', '/students/assess', '/students/ikigai', '/students/prompts', '/students/coe-builder', '/students/roles', '/music-lab', '/acos', '/students/ecosystem'],
  },
]

export const syllabusSuggestions: SyllabusSuggestion[] = [
  {
    id: 'intro-to-ai',
    title: 'Introduction to AI (4 weeks)',
    weeks: 4,
    description: 'Foundational course covering AI landscape, prompt engineering, and practical applications.',
    modules: [
      { week: 'Week 1', topic: 'The AI Landscape 2026', tools: ['AI Briefing', 'Assessment'] },
      { week: 'Week 2', topic: 'Prompt Engineering Fundamentals', tools: ['Prompt Library', 'Blog articles'] },
      { week: 'Week 3', topic: 'AI Career Paths & Skills', tools: ['Ikigai Finder', 'Role Navigator'] },
      { week: 'Week 4', topic: 'Build Your AI System', tools: ['CoE Builder', 'Ecosystem Map'] },
    ],
  },
  {
    id: 'ai-for-creatives',
    title: 'AI for Creative Professionals (6 weeks)',
    weeks: 6,
    description: 'Hands-on course combining AI tools with creative production — music, content, and visual art.',
    modules: [
      { week: 'Week 1-2', topic: 'AI Foundations + Creative Tools Overview', tools: ['AI Briefing', 'Ecosystem Map'] },
      { week: 'Week 3', topic: 'AI Music Production with Suno', tools: ['Music Lab', 'Prompt Library'] },
      { week: 'Week 4', topic: 'AI Content Systems', tools: ['GenCreator', 'Blog'] },
      { week: 'Week 5', topic: 'Building Your Creative AI Stack', tools: ['CoE Builder', 'ACOS'] },
      { week: 'Week 6', topic: 'Portfolio Presentation + Career Planning', tools: ['Role Navigator', 'Assessment'] },
    ],
  },
  {
    id: 'agentic-systems',
    title: 'Agentic AI Systems (8 weeks)',
    weeks: 8,
    description: 'Advanced course on multi-agent architectures, MCP, and production AI systems. Requires programming background.',
    modules: [
      { week: 'Week 1', topic: 'State of AI + Agent Landscape', tools: ['AI Briefing', 'Research Hub'] },
      { week: 'Week 2-3', topic: 'Prompt Engineering for Agents', tools: ['Prompt Library', 'Blog articles'] },
      { week: 'Week 4-5', topic: 'ACOS Deep Dive — Skills, Agents, Commands', tools: ['ACOS', 'CoE Builder'] },
      { week: 'Week 6', topic: 'MCP Server Architecture', tools: ['Research Hub', 'Blog: MCP Workshop'] },
      { week: 'Week 7', topic: 'Multi-Agent Orchestration', tools: ['Research Hub', 'AI Architecture'] },
      { week: 'Week 8', topic: 'Capstone: Build & Present Your Agent System', tools: ['ACOS', 'Assessment'] },
    ],
  },
]
