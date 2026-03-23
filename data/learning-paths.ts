// Curated Learning Paths - Best Free Content from Top Creators
// This positions FrankX.AI as the trusted curator for AI learning
import { youtubeChannels } from '@/data/youtube-index'

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
        youtubeId: 'SUysp3sJHbA',
        title: 'Claude Code Tutorial #1 - Introduction & Setup',
        creator: 'Net Ninja',
        creatorChannel: youtubeChannels.netNinja.url,
        duration: 'See YouTube',
        level: 'beginner',
        description: 'Beginner walkthrough for setting up and starting with Claude Code.',
        tags: ['claude', 'tutorial', 'beginner'],
      },
      {
        id: 'claude-prompts',
        youtubeId: 'T9aRN5JkmL8',
        title: 'AI prompt engineering: A deep dive',
        creator: 'Anthropic',
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'intermediate',
        description: 'Prompt engineering concepts and practical techniques from Anthropic.',
        tags: ['prompts', 'claude', 'techniques'],
      },
      {
        id: 'claude-api',
        youtubeId: '6eBSHbLKuN0',
        title: 'Mastering Claude Code in 30 minutes',
        creator: 'Anthropic',
        creatorChannel: youtubeChannels.anthropic.url,
        duration: 'See YouTube',
        level: 'advanced',
        description: 'Official deep dive into Claude Code workflows and practical usage.',
        tags: ['claude-code', 'workflow', 'advanced'],
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
    name: youtubeChannels.anthropic.name,
    channel: youtubeChannels.anthropic.url,
    specialty: 'Claude tutorials',
    subscribers: 'Public channel',
  },
  {
    name: youtubeChannels.netNinja.name,
    channel: youtubeChannels.netNinja.url,
    specialty: 'Developer tutorials',
    subscribers: 'Public channel',
  },
  {
    name: youtubeChannels.kevinStratvert.name,
    channel: youtubeChannels.kevinStratvert.url,
    specialty: 'AI productivity tutorials',
    subscribers: 'Public channel',
  },
  {
    name: youtubeChannels.lexFridman.name,
    channel: youtubeChannels.lexFridman.url,
    specialty: 'AI long-form interviews',
    subscribers: 'Public channel',
  },
]
