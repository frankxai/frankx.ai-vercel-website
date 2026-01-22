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
  {
    id: 'suno-music-creation',
    title: 'AI Music Production with Suno',
    slug: 'suno-music-creation',
    description: 'Create professional AI-generated music using Suno from beginner to advanced production.',
    icon: 'music',
    difficulty: 'beginner',
    estimatedHours: 6,
    color: 'violet',
    outcomes: [
      'Generate complete songs with Suno',
      'Write effective music prompts',
      'Understand genres and production terms',
      'Create music for specific moods and purposes',
    ],
    relatedGuides: ['/blog/suno-music-production-workflow', '/products/vibe-os'],
    videos: [
      {
        id: 'suno-basics',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Suno AI Tutorial - Make Your First Song',
        creator: 'AI Music Lab',
        creatorChannel: 'https://youtube.com/@ai-music-lab',
        duration: '18:45',
        level: 'beginner',
        description: 'Step-by-step guide to creating your first AI-generated song.',
        tags: ['suno', 'beginner', 'music'],
      },
      {
        id: 'suno-prompts',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Suno Prompt Engineering - Genre Deep Dive',
        creator: 'Music AI Pro',
        creatorChannel: 'https://youtube.com/@music-ai-pro',
        duration: '28:30',
        level: 'intermediate',
        description: 'How to write prompts for specific genres and moods.',
        tags: ['prompts', 'genres', 'production'],
      },
    ],
  },
  {
    id: 'chatgpt-productivity',
    title: 'ChatGPT for Productivity',
    slug: 'chatgpt-productivity',
    description: 'Use ChatGPT to 10x your productivity in work, learning, and creative projects.',
    icon: 'zap',
    difficulty: 'beginner',
    estimatedHours: 5,
    color: 'emerald',
    outcomes: [
      'Write better with AI assistance',
      'Analyze documents and data',
      'Automate repetitive tasks',
      'Build custom GPTs for your workflows',
    ],
    relatedGuides: ['/guides/openai-chatgpt-guide'],
    videos: [
      {
        id: 'chatgpt-basics',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'ChatGPT Complete Tutorial 2026',
        creator: 'Productivity AI',
        creatorChannel: 'https://youtube.com/@productivity-ai',
        duration: '35:00',
        level: 'beginner',
        description: 'Everything you need to know about ChatGPT for daily use.',
        tags: ['chatgpt', 'productivity', 'basics'],
      },
      {
        id: 'custom-gpts',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Build Custom GPTs - Complete Guide',
        creator: 'AI Builder',
        creatorChannel: 'https://youtube.com/@ai-builder',
        duration: '42:00',
        level: 'advanced',
        description: 'Create custom GPTs tailored to your specific needs.',
        tags: ['custom-gpts', 'automation', 'advanced'],
      },
    ],
  },
  {
    id: 'midjourney-visuals',
    title: 'AI Visual Art with Midjourney',
    slug: 'midjourney-visuals',
    description: 'Create stunning AI-generated visuals with Midjourney for any creative project.',
    icon: 'image',
    difficulty: 'beginner',
    estimatedHours: 7,
    color: 'cyan',
    outcomes: [
      'Generate professional-quality images',
      'Master Midjourney prompt structure',
      'Understand style parameters and settings',
      'Create consistent visual brands',
    ],
    relatedGuides: ['/guides/midjourney-guide'],
    videos: [
      {
        id: 'mj-basics',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Midjourney Complete Beginner Guide',
        creator: 'Visual AI Studio',
        creatorChannel: 'https://youtube.com/@visual-ai-studio',
        duration: '28:00',
        level: 'beginner',
        description: 'Get started with Midjourney from scratch.',
        tags: ['midjourney', 'beginner', 'visuals'],
      },
      {
        id: 'mj-prompts',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Advanced Midjourney Prompt Engineering',
        creator: 'AI Art Academy',
        creatorChannel: 'https://youtube.com/@ai-art-academy',
        duration: '45:00',
        level: 'intermediate',
        description: 'Deep dive into prompt techniques and parameters.',
        tags: ['prompts', 'advanced', 'techniques'],
      },
    ],
  },
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
