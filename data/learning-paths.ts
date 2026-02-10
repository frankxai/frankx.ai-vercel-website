// Curated Learning Paths - Best Free Content from Top Creators
// This positions FrankX.AI as the trusted curator for AI learning

export interface VideoResource {
  id: string
  youtubeId: string
  title: string
  creator: string
  creatorChannel: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  description: string
  tags: string[]
}

export interface LearningPath {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  color: 'emerald' | 'cyan' | 'amber' | 'violet'
  videos: VideoResource[]
  relatedGuides: string[]
  outcomes: string[]
}

export const learningPaths: LearningPath[] = [
  {
    id: 'claude-mastery',
    title: 'Claude & Anthropic Mastery',
    slug: 'claude-mastery',
    description: 'Master Claude AI from basics to advanced prompt engineering and API integration.',
    icon: 'brain',
    difficulty: 'beginner',
    estimatedHours: 8,
    color: 'amber',
    outcomes: [
      'Craft effective prompts for any use case',
      'Understand Claude\'s capabilities and limitations',
      'Build applications with the Claude API',
      'Use Claude for coding, writing, and analysis',
    ],
    relatedGuides: ['/guides/claude-anthropic-guide'],
    videos: [
      {
        id: 'claude-intro',
        youtubeId: 'jvqFAi7vkBc',
        title: 'Claude AI Full Tutorial for Beginners',
        creator: 'AI Foundations',
        creatorChannel: 'https://youtube.com/@ai-foundations',
        duration: '24:30',
        level: 'beginner',
        description: 'Complete walkthrough of Claude\'s interface and core capabilities.',
        tags: ['claude', 'tutorial', 'beginner'],
      },
      {
        id: 'claude-prompts',
        youtubeId: 'T9aRN5JkmL8',
        title: 'Advanced Prompt Engineering with Claude',
        creator: 'Prompt Engineering',
        creatorChannel: 'https://youtube.com/@prompt-engineering',
        duration: '32:15',
        level: 'intermediate',
        description: 'Deep dive into prompt techniques that get better results.',
        tags: ['prompts', 'claude', 'techniques'],
      },
      {
        id: 'claude-api',
        youtubeId: 'jmBpGSbfz44',
        title: 'Building with Claude API - Complete Guide',
        creator: 'Code with AI',
        creatorChannel: 'https://youtube.com/@code-with-ai',
        duration: '45:00',
        level: 'advanced',
        description: 'Build applications using Claude\'s API with Python and TypeScript.',
        tags: ['api', 'coding', 'integration'],
      },
    ],
  },
  // Additional learning paths coming soon:
  // - Suno AI Music Production
  // - ChatGPT for Productivity
  // - Midjourney Visual Art
]

export const featuredCreators = [
  {
    name: 'AI Foundations',
    channel: 'https://youtube.com/@ai-foundations',
    specialty: 'AI Tutorials',
    subscribers: '500K+',
  },
  {
    name: 'Prompt Engineering',
    channel: 'https://youtube.com/@prompt-engineering',
    specialty: 'Prompt Techniques',
    subscribers: '200K+',
  },
  {
    name: 'AI Music Lab',
    channel: 'https://youtube.com/@ai-music-lab',
    specialty: 'Suno & AI Music',
    subscribers: '150K+',
  },
  {
    name: 'Visual AI Studio',
    channel: 'https://youtube.com/@visual-ai-studio',
    specialty: 'Midjourney & DALL-E',
    subscribers: '300K+',
  },
]
