// Research page types for Perplexity Pages and deep-dive content

export interface ResearchPage {
  id: string
  title: string
  description: string
  url: string // Perplexity Page URL or internal link
  type: 'perplexity' | 'pdf' | 'internal'
  category: string
  tags: string[]
  dateAdded: string
  researchHours?: number
  thumbnail?: string
  summary?: string // 200-word summary for preview
}

export interface ResearchCategory {
  id: string
  name: string
  description: string
  icon: string
  pages: ResearchPage[]
}

export const RESEARCH_CATEGORIES: Record<string, ResearchCategory> = {
  'agentic-ai': {
    id: 'agentic-ai',
    name: 'Agentic AI Systems',
    description: 'Production deployment patterns, multi-agent orchestration, and real-world implementations',
    icon: 'Bot',
    pages: []
  },
  'generative-ai': {
    id: 'generative-ai',
    name: 'Generative AI',
    description: 'LLM architectures, prompt engineering, and creative automation workflows',
    icon: 'Sparkles',
    pages: []
  },
  'ai-music': {
    id: 'ai-music',
    name: 'AI Music Production',
    description: 'Suno techniques, composition patterns, and sonic experimentation',
    icon: 'Music',
    pages: []
  },
  'creative-systems': {
    id: 'creative-systems',
    name: 'Creative Systems',
    description: 'Workflows, tools, and methodologies for AI-powered creative work',
    icon: 'Lightbulb',
    pages: []
  }
}
