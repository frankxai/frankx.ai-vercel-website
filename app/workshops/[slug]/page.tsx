'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Play,
  Rocket,
  Server,
  Terminal,
  Users,
  Zap,
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type Module = {
  number: number
  title: string
  duration: string
  description: string
  topics: string[]
}

type Workshop = {
  id: string
  title: string
  tagline: string
  description: string
  longDescription: string
  level: string
  duration: string
  modules: Module[]
  outcomes: string[]
  prerequisites: string[]
  tools: string[]
  icon: typeof Terminal
  color: string
  gradient: string
  heroGradient: string
  githubUrl: string
  nextWorkshop?: {
    title: string
    slug: string
  }
}

// ============================================================================
// WORKSHOP DATA
// ============================================================================

const workshops: Record<string, Workshop> = {
  'ai-coding-agents': {
    id: 'ai-coding-agents',
    title: 'AI Coding Agents Mastery',
    tagline: 'From Zero to AI-Powered Developer',
    description: 'Master the art of AI-assisted development with Claude Code, OpenCode, Cline, and the evolution framework.',
    longDescription: `This comprehensive workshop takes you from AI-curious to AI-empowered developer. You'll learn to set up and configure multiple coding agents, understand how they work internally, and master the evolution framework that transforms basic prompts into sophisticated multi-agent orchestration.

Whether you're a beginner or experienced developer, you'll discover how to leverage AI to write better code faster, automate repetitive tasks, and build systems that grow with your expertise.`,
    level: 'All Levels',
    duration: '2-3 days',
    modules: [
      {
        number: 0,
        title: 'Prerequisites',
        duration: '30 min',
        description: 'Set up your development environment and API keys.',
        topics: ['Node.js installation', 'API key configuration', 'Terminal setup', 'VS Code extensions'],
      },
      {
        number: 1,
        title: 'Foundations',
        duration: '1 hour',
        description: 'Understand how AI coding agents work internally.',
        topics: ['Agent architecture', 'LLM capabilities', 'Context windows', 'MCP protocol basics'],
      },
      {
        number: 2,
        title: 'Setup Guides',
        duration: '2 hours',
        description: 'Install and configure the top coding agents.',
        topics: ['Claude Code setup', 'OpenCode configuration', 'Cline for VS Code', 'Roo Code & Kilo Code'],
      },
      {
        number: 3,
        title: 'First Agent',
        duration: '2 hours',
        description: 'Build and customize your first AI coding assistant.',
        topics: ['Basic configuration', 'Prompt templates', 'Simple automations', 'Database connections'],
      },
      {
        number: 4,
        title: 'Advanced Patterns',
        duration: '3 hours',
        description: 'Master sophisticated agent capabilities.',
        topics: ['MCP servers', 'Custom tools', 'Multi-agent orchestration', 'Memory management'],
      },
      {
        number: 5,
        title: 'Evolution Framework',
        duration: '3 hours',
        description: 'Transform from user to builder with the evolution stack.',
        topics: ['CLAUDE.md mastery', 'skill.md creation', 'agent.md personas', 'Orchestration patterns'],
      },
    ],
    outcomes: [
      'Install and configure multiple AI coding agents',
      'Understand how agents work at a deep level',
      'Build custom skills and agent configurations',
      'Create MCP servers for your data sources',
      'Master multi-agent orchestration',
      'Develop your personal evolution framework',
    ],
    prerequisites: [
      'Basic programming knowledge (any language)',
      'Command line familiarity',
      'Text editor or IDE installed',
      'Willingness to experiment',
    ],
    tools: ['Claude Code', 'OpenCode', 'Cline', 'Roo Code', 'Kilo Code', 'MCP SDK'],
    icon: Terminal,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    heroGradient: 'from-cyan-500/30 via-blue-500/20 to-violet-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/ai-coding-agents',
    nextWorkshop: { title: 'MCP Server Architecture', slug: 'mcp-server-mastery' },
  },
  'personal-ai-assistant-setup': {
    id: 'personal-ai-assistant-setup',
    title: 'Personal AI Assistant Setup',
    tagline: 'Build Your Customized AI Environment',
    description: 'Create a complete, personalized AI development environment from scratch.',
    longDescription: `The perfect first workshop for anyone starting their AI journey. In just one day, you'll build a complete personalized AI assistant environment tailored to YOUR workflow.

You'll learn to configure Claude Code with optimized settings, create CLAUDE.md files that persist your context, build custom skills that package your expertise, and connect MCP servers for data access. By the end, you'll have an AI assistant that knows your coding style, follows your conventions, and grows with you.`,
    level: 'Beginner',
    duration: '1 day',
    modules: [
      {
        number: 1,
        title: 'Foundation Setup',
        duration: '1.5 hours',
        description: 'Get Claude Code running perfectly on your system.',
        topics: ['Installation', 'API configuration', 'First launch', 'Basic commands'],
      },
      {
        number: 2,
        title: 'Personal CLAUDE.md',
        duration: '1 hour',
        description: 'Create your personalized AI context file.',
        topics: ['Personal preferences', 'Coding conventions', 'Project templates', 'Global vs local context'],
      },
      {
        number: 3,
        title: 'Custom Skills',
        duration: '1.5 hours',
        description: 'Package your expertise into reusable skills.',
        topics: ['Identifying expertise', 'Skill structure', 'Best practices', 'Organization'],
      },
      {
        number: 4,
        title: 'MCP Connections',
        duration: '1 hour',
        description: 'Connect Claude to your tools and data.',
        topics: ['Essential servers', 'Configuration', 'Verification', 'Troubleshooting'],
      },
      {
        number: 5,
        title: 'Workflow Automations',
        duration: '1.5 hours',
        description: 'Create your personal automation library.',
        topics: ['Git commits', 'Code review', 'Documentation', 'Custom commands'],
      },
    ],
    outcomes: [
      'Configure Claude Code with optimized settings',
      'Create personalized CLAUDE.md files',
      'Build your first custom skills',
      'Connect MCP servers to your workflow',
      'Automate repetitive development tasks',
    ],
    prerequisites: [
      'Computer with internet access',
      'Basic terminal knowledge',
      'Anthropic API key (free tier works)',
    ],
    tools: ['Claude Code', 'MCP Servers', 'VS Code'],
    icon: Code2,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-500/5',
    heroGradient: 'from-blue-500/30 via-indigo-500/20 to-purple-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/personal-ai-assistant-setup',
    nextWorkshop: { title: 'AI Coding Agents Mastery', slug: 'ai-coding-agents' },
  },
  'mcp-server-mastery': {
    id: 'mcp-server-mastery',
    title: 'MCP Server Architecture',
    tagline: 'Build Production-Grade AI Integrations',
    description: 'Build production-grade Model Context Protocol servers for AI-to-data integration.',
    longDescription: `MCP (Model Context Protocol) is the open standard revolutionizing how AI connects to data. This workshop teaches you to build production-ready MCP servers from scratch.

You'll understand the protocol deeply, implement resources, tools, and prompts, handle authentication and security, and deploy servers to production. Whether you want to connect AI to your database, APIs, or custom data sources, this workshop gives you the skills.`,
    level: 'Intermediate',
    duration: '1-2 days',
    modules: [
      {
        number: 1,
        title: 'MCP Fundamentals',
        duration: '1 hour',
        description: 'Understand the protocol before building.',
        topics: ['Protocol architecture', 'Resources, Tools, Prompts', 'Transport mechanisms', 'Security model'],
      },
      {
        number: 2,
        title: 'First Server',
        duration: '2 hours',
        description: 'Build a complete MCP server from scratch.',
        topics: ['Server setup', 'Resource implementation', 'Tool creation', 'Testing'],
      },
      {
        number: 3,
        title: 'Advanced Patterns',
        duration: '2 hours',
        description: 'Production-ready implementation patterns.',
        topics: ['Resource templates', 'Input validation', 'Error handling', 'Logging'],
      },
      {
        number: 4,
        title: 'Production Deployment',
        duration: '2 hours',
        description: 'Deploy secure, scalable MCP servers.',
        topics: ['Authentication', 'Rate limiting', 'Docker deployment', 'Monitoring'],
      },
    ],
    outcomes: [
      'Understand MCP protocol fundamentals',
      'Build custom MCP servers from scratch',
      'Implement resources, tools, and prompts',
      'Handle authentication and security',
      'Deploy production-ready servers',
    ],
    prerequisites: [
      'JavaScript/TypeScript knowledge',
      'Basic understanding of APIs',
      'Command line proficiency',
      'Completed Personal AI Assistant Setup (recommended)',
    ],
    tools: ['MCP SDK', 'TypeScript', 'Node.js', 'Docker'],
    icon: Server,
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-500/5',
    heroGradient: 'from-violet-500/30 via-purple-500/20 to-pink-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/mcp-server-mastery',
    nextWorkshop: { title: 'Oracle GenAI Enterprise', slug: 'oracle-genai-enterprise' },
  },
  'prompt-engineering-mastery': {
    id: 'prompt-engineering-mastery',
    title: 'Prompt Engineering Mastery',
    tagline: 'The 5C Framework for AI Communication',
    description: 'From basic commands to advanced AI orchestration with systematic prompt engineering.',
    longDescription: `Why do some people get amazing results from AI while others struggle? The difference isn't the AI—it's the prompt. This workshop teaches the systematic 5C Framework (Context, Constraints, Command, Clarifications, Completion) that consistently produces excellent results.

You'll master advanced techniques like Chain-of-Thought prompting, Few-Shot learning, and Role prompting. By the end, you'll have a personal prompt template library tailored to your work.`,
    level: 'All Levels',
    duration: '2 days',
    modules: [
      {
        number: 1,
        title: 'Fundamentals',
        duration: '2 hours',
        description: 'How LLMs process your prompts.',
        topics: ['Tokenization', 'Attention mechanisms', 'Response generation', 'Key principles'],
      },
      {
        number: 2,
        title: 'The 5C Framework',
        duration: '2 hours',
        description: 'Master the systematic approach.',
        topics: ['Context setting', 'Constraints', 'Commands', 'Clarifications', 'Completion format'],
      },
      {
        number: 3,
        title: 'Advanced Techniques',
        duration: '3 hours',
        description: 'Professional prompt engineering.',
        topics: ['Chain-of-Thought', 'Few-Shot learning', 'Role prompting', 'Structured output'],
      },
      {
        number: 4,
        title: 'Domain-Specific',
        duration: '2 hours',
        description: 'Prompts for different tasks.',
        topics: ['Code generation', 'Code review', 'Documentation', 'Debugging'],
      },
      {
        number: 5,
        title: 'Template Building',
        duration: '2 hours',
        description: 'Build your prompt library.',
        topics: ['Template structure', 'Categories', 'Versioning', 'Testing'],
      },
      {
        number: 6,
        title: 'Multi-Turn Conversations',
        duration: '1.5 hours',
        description: 'Master extended AI conversations.',
        topics: ['Conversation design', 'Context management', 'Steering', 'Recovery'],
      },
    ],
    outcomes: [
      'Master the 5C Framework for prompts',
      'Use Chain-of-Thought and Few-Shot techniques',
      'Build domain-specific prompt templates',
      'Design effective multi-turn conversations',
      'Create your personal prompt library',
    ],
    prerequisites: [
      'Basic computer literacy',
      'Access to an AI system (Claude, ChatGPT, etc.)',
      'Curiosity about effective AI communication',
    ],
    tools: ['Claude', 'ChatGPT', 'Any LLM'],
    icon: Zap,
    color: 'text-yellow-400',
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    heroGradient: 'from-yellow-500/30 via-orange-500/20 to-red-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/prompt-engineering-mastery',
    nextWorkshop: { title: 'AI Coding Agents Mastery', slug: 'ai-coding-agents' },
  },
  'suno-music-creation': {
    id: 'suno-music-creation',
    title: 'Suno AI Music Creation',
    tagline: 'Transform Ideas into Cinematic Soundscapes',
    description: 'Create meditation music, motivation anthems, and creative flow tracks with AI.',
    longDescription: `What if you could turn "I want calming meditation music with healing frequencies" into a professional-quality track in under 60 seconds? That's exactly what you'll learn in this workshop.

Using the 5-Layer Prompt Architecture and Vibe OS methodology, you'll create four signature styles: Conscious Electronic for meditation, Epic Motivation for energy, Creative Flow for focus, and Frequency Healing for transformation. No musical training required.`,
    level: 'All Levels',
    duration: '1-2 days',
    modules: [
      {
        number: 1,
        title: 'Suno Fundamentals',
        duration: '1 hour',
        description: 'How Suno creates music from text.',
        topics: ['Suno v4.5 capabilities', 'Prompt to music pipeline', 'Quality settings', 'Parameters'],
      },
      {
        number: 2,
        title: '5-Layer Architecture',
        duration: '2 hours',
        description: 'Master the prompt engineering system.',
        topics: ['Foundation layer', 'Mood layer', 'Instrumentation', 'Production', 'Intention'],
      },
      {
        number: 3,
        title: 'Signature Styles',
        duration: '2 hours',
        description: 'Four core Vibe OS genres.',
        topics: ['Conscious Electronic', 'Epic Motivation', 'Creative Flow', 'Frequency Healing'],
      },
      {
        number: 4,
        title: 'Frequency Science',
        duration: '1 hour',
        description: 'The science behind transformative music.',
        topics: ['Solfeggio frequencies', '528Hz healing', 'Binaural beats', 'Tuning systems'],
      },
      {
        number: 5,
        title: 'Production Workflow',
        duration: '2 hours',
        description: 'From prompt to published track.',
        topics: ['Generation', 'Selection', 'Editing', 'Distribution'],
      },
      {
        number: 6,
        title: 'Music Business',
        duration: '1 hour',
        description: 'Monetizing AI-generated music.',
        topics: ['Licensing', 'Revenue streams', 'Ethics', 'Disclosure'],
      },
    ],
    outcomes: [
      'Master the 5-Layer Prompt Architecture',
      'Create 528Hz healing soundscapes',
      'Build epic motivation anthems',
      'Produce lo-fi creative flow tracks',
      'Understand frequency science',
      'Monetize your creations ethically',
    ],
    prerequisites: [
      'Suno account (free tier works)',
      'Basic computer skills',
      'NO musical training required',
    ],
    tools: ['Suno AI', 'Audacity', 'DistroKid'],
    icon: Cpu,
    color: 'text-pink-400',
    gradient: 'from-pink-500/20 to-pink-500/5',
    heroGradient: 'from-pink-500/30 via-rose-500/20 to-red-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/suno-music-creation',
    nextWorkshop: { title: "Creator's AI Toolkit", slug: 'creators-ai-toolkit' },
  },
  'creators-ai-toolkit': {
    id: 'creators-ai-toolkit',
    title: "Creator's AI Toolkit",
    tagline: 'Complete AI System for Content Creators',
    description: 'Build ideation engines, research pipelines, and distribution automation.',
    longDescription: `Modern content creators face impossible demands: publish consistently, research thoroughly, write authentically, distribute everywhere. AI can help—but only if used right.

This workshop teaches the Soul + Systems framework: AI amplifies your soul, it doesn't replace it. You'll build ideation engines, research pipelines, voice-matched writing assistants, and distribution automation while keeping your authentic voice.`,
    level: 'Beginner',
    duration: '2 days',
    modules: [
      {
        number: 1,
        title: 'Philosophy',
        duration: '1 hour',
        description: 'The Soul + Systems framework.',
        topics: ['AI as partner', '80/20 rule', 'Authenticity', 'Ethics'],
      },
      {
        number: 2,
        title: 'Ideation Engine',
        duration: '2 hours',
        description: 'Never run out of content ideas.',
        topics: ['Trend detection', 'Angle generation', 'Content calendars', 'Expansion method'],
      },
      {
        number: 3,
        title: 'Research Pipeline',
        duration: '2 hours',
        description: 'Go from topic to expertise in minutes.',
        topics: ['Source gathering', 'Synthesis', 'Competitive analysis', 'Fact verification'],
      },
      {
        number: 4,
        title: 'Writing Assistant',
        duration: '3 hours',
        description: 'Create content that sounds like YOU.',
        topics: ['Voice training', 'Draft generation', 'Platform adaptation', 'Editing'],
      },
      {
        number: 5,
        title: 'Visual Creation',
        duration: '2 hours',
        description: 'AI-powered visual content.',
        topics: ['Image prompts', 'Thumbnail systems', 'Brand consistency', 'Tools'],
      },
      {
        number: 6,
        title: 'Distribution',
        duration: '2 hours',
        description: 'Publish everywhere efficiently.',
        topics: ['Content cascade', 'Repurposing', 'Scheduling', 'Analytics'],
      },
    ],
    outcomes: [
      'Build an AI-powered ideation engine',
      'Create your personal Voice Guide',
      'Automate research and writing',
      'Maintain authentic voice at scale',
      'Master multi-platform distribution',
    ],
    prerequisites: [
      'Active content creation practice',
      'Access to AI tools (Claude, ChatGPT)',
      'Desire to scale without losing soul',
    ],
    tools: ['Claude', 'ChatGPT', 'Midjourney', 'Buffer'],
    icon: BookOpen,
    color: 'text-orange-400',
    gradient: 'from-orange-500/20 to-orange-500/5',
    heroGradient: 'from-orange-500/30 via-amber-500/20 to-yellow-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/creators-ai-toolkit',
    nextWorkshop: { title: 'Suno Music Creation', slug: 'suno-music-creation' },
  },
  'oracle-genai-enterprise': {
    id: 'oracle-genai-enterprise',
    title: 'Oracle GenAI for Enterprise',
    tagline: 'When and Why OCI vs Public AI',
    description: 'Enterprise AI decisions: Oracle GenAI Services, Dedicated Clusters, and compliance.',
    longDescription: `For enterprise architects facing critical AI infrastructure decisions. When should you use public APIs like OpenAI and Anthropic? When does Oracle GenAI Services make sense? When do you need Dedicated AI Clusters?

This workshop provides a decision framework based on data sovereignty, regulatory compliance, performance requirements, and cost optimization. You'll learn to implement enterprise RAG patterns and integrate OCI GenAI with modern coding agents.`,
    level: 'Advanced',
    duration: '2 days',
    modules: [
      {
        number: 1,
        title: 'AI Labs Landscape',
        duration: '1 hour',
        description: 'Compare major AI providers objectively.',
        topics: ['Anthropic', 'OpenAI', 'Meta', 'Cohere', 'Google', 'Comparison matrix'],
      },
      {
        number: 2,
        title: 'Oracle GenAI Services',
        duration: '1 hour',
        description: 'OCI GenAI Service overview.',
        topics: ['Available models', 'Architecture', 'API usage', 'Pricing'],
      },
      {
        number: 3,
        title: 'Dedicated AI Clusters',
        duration: '2 hours',
        description: 'When and how to use dedicated infrastructure.',
        topics: ['Use cases', 'Setup', 'Fine-tuning', 'Cost analysis'],
      },
      {
        number: 4,
        title: 'Coding Agent Integration',
        duration: '3 hours',
        description: 'Connect OCI GenAI with modern agents.',
        topics: ['MCP server for OCI', 'Hybrid architecture', 'Authentication', 'Patterns'],
      },
      {
        number: 5,
        title: 'Enterprise Patterns',
        duration: '3 hours',
        description: 'Production-ready enterprise AI.',
        topics: ['RAG implementation', 'Guardrails', 'Compliance', 'Monitoring'],
      },
    ],
    outcomes: [
      'Compare all major AI providers objectively',
      'Decide between public APIs and OCI GenAI',
      'Set up Dedicated AI Clusters',
      'Implement enterprise RAG patterns',
      'Integrate OCI GenAI with coding agents',
    ],
    prerequisites: [
      'Cloud architecture experience',
      'Understanding of AI/ML concepts',
      'OCI account (for hands-on labs)',
      'Enterprise context (regulations, compliance)',
    ],
    tools: ['OCI GenAI', 'OCI Console', 'Python SDK', 'MCP'],
    icon: Database,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-amber-500/5',
    heroGradient: 'from-amber-500/30 via-orange-500/20 to-red-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/oracle-genai-enterprise',
    nextWorkshop: { title: 'MCP Server Architecture', slug: 'mcp-server-mastery' },
  },
  'agentic-creator-evolution': {
    id: 'agentic-creator-evolution',
    title: 'Agentic Creator Evolution Path',
    tagline: 'From Beginner to AI Master',
    description: 'Progressive journey through four levels: Awakening, Building, Mastery, Teaching.',
    longDescription: `This isn't a workshop you complete—it's a path you walk. The Agentic Creator Evolution Path provides structured progression from AI beginner to master builder, with clear milestones and community support.

Four levels guide your journey: Awakening (first steps), Building (creating systems), Mastery (production excellence), and Teaching (giving back). Each level has specific goals, projects, and achievements.`,
    level: 'All Levels',
    duration: 'Ongoing',
    modules: [
      {
        number: 1,
        title: 'Level 1: Awakening',
        duration: 'Weeks 1-2',
        description: 'First steps into AI-augmented creation.',
        topics: ['First coding agent', '10 AI-assisted tasks', 'Prompting basics', 'Finding your use case'],
      },
      {
        number: 2,
        title: 'Level 2: Building',
        duration: 'Weeks 3-4',
        description: 'Creating your own systems.',
        topics: ['Custom agents', 'First MCP server', 'skill.md files', 'Workflow automation'],
      },
      {
        number: 3,
        title: 'Level 3: Mastery',
        duration: 'Weeks 5-8',
        description: 'Production-grade excellence.',
        topics: ['Agent orchestration', 'Production systems', 'Open source contribution', 'Advanced patterns'],
      },
      {
        number: 4,
        title: 'Level 4: Teaching',
        duration: 'Ongoing',
        description: 'Giving back and advancing the field.',
        topics: ['Workshop creation', 'Mentoring', 'Community leadership', 'Innovation'],
      },
    ],
    outcomes: [
      'Progress through structured skill levels',
      'Build portfolio of AI-augmented projects',
      'Join community of agentic creators',
      'Achieve milestone certifications',
      'Eventually mentor others',
    ],
    prerequisites: [
      'Commitment to learning',
      'Willingness to share progress',
      'Community participation',
    ],
    tools: ['All workshop tools', 'Community platform', 'Portfolio system'],
    icon: Rocket,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    heroGradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
    githubUrl: 'https://github.com/frankx-ai/workshops/tree/main/agentic-creator-evolution',
  },
}

// ============================================================================
// COMPONENTS
// ============================================================================

function ModuleCard({ module, index }: { module: Module; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm hover:border-white/20 transition-all">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-lg font-bold text-cyan-400 flex-shrink-0">
            {module.number}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <span className="flex items-center gap-1 text-sm text-zinc-500">
                <Clock className="w-4 h-4" />
                {module.duration}
              </span>
            </div>
            <p className="text-zinc-400 mb-3">{module.description}</p>
            <div className="flex flex-wrap gap-2">
              {module.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/5"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function WorkshopDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const workshop = workshops[slug]

  if (!workshop) {
    notFound()
  }

  const Icon = workshop.icon

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-b ${workshop.heroGradient} opacity-50`} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Workshops
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon and Badges */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${workshop.gradient} ${workshop.color}`}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Free Workshop
                </span>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-zinc-300 border border-white/10">
                  {workshop.level}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{workshop.title}</h1>
            <p className="text-xl text-cyan-400 mb-6">{workshop.tagline}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-zinc-400 mb-8">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {workshop.duration}
              </span>
              <span className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                {workshop.modules.length} modules
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {workshop.level}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-zinc-300 mb-8 max-w-3xl whitespace-pre-line">
              {workshop.longDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`${workshop.githubUrl}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:from-cyan-400 hover:to-violet-400 transition-all"
              >
                <Play className="w-5 h-5" />
                Start Workshop
              </Link>
              <a
                href={workshop.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {workshop.outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-white/5"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-300">{outcome}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Workshop Modules</h2>
          <div className="space-y-4">
            {workshop.modules.map((module, index) => (
              <ModuleCard key={module.number} module={module} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites & Tools */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Prerequisites */}
            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Prerequisites
              </h3>
              <ul className="space-y-2">
                {workshop.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2 text-zinc-400">
                    <span className="text-zinc-600 mt-1">•</span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-violet-400" />
                Tools You'll Use
              </h3>
              <div className="flex flex-wrap gap-2">
                {workshop.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Workshop CTA */}
      {workshop.nextWorkshop && (
        <section className="py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-zinc-500 mb-2">Continue your journey with</p>
            <h3 className="text-2xl font-bold text-white mb-4">{workshop.nextWorkshop.title}</h3>
            <Link
              href={`/workshops/${workshop.nextWorkshop.slug}`}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View Workshop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-zinc-400 mb-8">
            Join thousands of creators and developers transforming their workflow with AI.
          </p>
          <Link
            href={workshop.githubUrl}
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium text-lg hover:from-cyan-400 hover:to-violet-400 transition-all"
          >
            <Play className="w-5 h-5" />
            Begin {workshop.title}
          </Link>
        </div>
      </section>
    </div>
  )
}
