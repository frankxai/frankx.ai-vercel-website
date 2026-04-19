/**
 * FrankX Prompt Library
 * Production-grade prompts for creators, developers, and conscious builders.
 * Tier system: Free → Premium (email) → Paid (product bundles)
 */

export type PromptDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type PromptTier = 'free' | 'premium' | 'paid'

export type PromptCategory =
  // Creative
  | 'writing'
  | 'music-creation'
  | 'image-generation'
  | 'creative'
  // Technical
  | 'coding'
  | 'ai-architecture'
  | 'agent-development'
  // Business & Marketing
  | 'business'
  | 'social-media'
  | 'marketing'
  // Personal Development
  | 'productivity'
  | 'personal-development'
  | 'spiritual'
  | 'learning'

export type AITool =
  | 'claude'
  | 'chatgpt'
  | 'midjourney'
  | 'suno'
  | 'dalle'
  | 'stable-diffusion'
  | 'cursor'
  | 'claude-code'
  | 'gemini'
  | 'copilot'
  | 'general'

export type ProductBundle = 'vibe-os' | 'gencreator-os' | 'agentic-creator-os' | null

export interface Prompt {
  id: string
  title: string
  description: string
  content: string
  category: PromptCategory
  tags: string[]
  aiTool: AITool
  difficulty: PromptDifficulty
  useCase: string
  tier: PromptTier
  productBundle: ProductBundle
  seoKeywords?: string[]
  createdAt: string
  updatedAt: string
}

export type CategoryGroup = 'creative' | 'technical' | 'business' | 'personal'

export interface CategoryInfo {
  id: PromptCategory
  name: string
  icon: string // Lucide icon name
  description: string
  color: string
  group: CategoryGroup
  seoTitle: string
  seoDescription: string
}

export const CATEGORY_GROUPS: Record<CategoryGroup, { name: string; description: string }> = {
  creative: { name: 'Creative', description: 'Content creation, music, and visual arts' },
  technical: { name: 'Technical', description: 'Coding, AI systems, and development' },
  business: { name: 'Business & Marketing', description: 'Strategy, social media, and growth' },
  personal: { name: 'Personal Development', description: 'Productivity, spirituality, and learning' },
}

export const CATEGORIES: CategoryInfo[] = [
  // CREATIVE GROUP
  {
    id: 'writing',
    name: 'Writing',
    icon: 'PenLine',
    description: 'Blog posts, articles, scripts, and creative writing.',
    color: '#8B5CF6',
    group: 'creative',
    seoTitle: 'AI Writing Prompts - Blog, Articles, Scripts',
    seoDescription: 'Professional AI writing prompts for Claude, ChatGPT. Create blogs, articles, scripts, and creative content.',
  },
  {
    id: 'music-creation',
    name: 'Music Creation',
    icon: 'Music',
    description: 'Suno prompts for AI-generated songs and soundscapes.',
    color: '#EC4899',
    group: 'creative',
    seoTitle: 'Suno AI Music Prompts - Songs, Beats, Soundscapes',
    seoDescription: 'Professional Suno AI prompts for creating songs, beats, ambient music, and transformational soundscapes.',
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    icon: 'Image',
    description: 'Midjourney, DALL-E, and Stable Diffusion prompts.',
    color: '#F59E0B',
    group: 'creative',
    seoTitle: 'AI Image Prompts - Midjourney, DALL-E, Stable Diffusion',
    seoDescription: 'Professional AI image generation prompts for Midjourney, DALL-E, and Stable Diffusion.',
  },
  {
    id: 'creative',
    name: 'Creative Ideation',
    icon: 'Sparkles',
    description: 'Brainstorming, ideation, and creative exploration.',
    color: '#F97316',
    group: 'creative',
    seoTitle: 'AI Brainstorming Prompts - Creative Ideation',
    seoDescription: 'AI prompts for creative brainstorming, ideation, and exploring new ideas.',
  },
  // TECHNICAL GROUP
  {
    id: 'coding',
    name: 'Coding',
    icon: 'Code2',
    description: 'Code generation, debugging, and technical assistance.',
    color: '#10B981',
    group: 'technical',
    seoTitle: 'AI Coding Prompts - Development, Debugging, Reviews',
    seoDescription: 'Professional AI coding prompts for code generation, debugging, reviews, and technical assistance.',
  },
  {
    id: 'ai-architecture',
    name: 'AI Architecture',
    icon: 'Brain',
    description: 'System design, prompt engineering, and AI infrastructure.',
    color: '#6366F1',
    group: 'technical',
    seoTitle: 'AI Architecture Prompts - System Design, Prompt Engineering',
    seoDescription: 'Professional prompts for AI system architecture, prompt engineering, and infrastructure design.',
  },
  {
    id: 'agent-development',
    name: 'Agent Development',
    icon: 'Bot',
    description: 'Claude Code, Cursor, Codex, and agentic AI development.',
    color: '#0EA5E9',
    group: 'technical',
    seoTitle: 'AI Agent Development Prompts - Claude Code, Cursor, Codex',
    seoDescription: 'Professional prompts for developing AI agents with Claude Code, Cursor, Codex, and agentic systems.',
  },
  // BUSINESS GROUP
  {
    id: 'business',
    name: 'Business Strategy',
    icon: 'TrendingUp',
    description: 'Strategy, planning, and professional communication.',
    color: '#3B82F6',
    group: 'business',
    seoTitle: 'AI Business Prompts - Strategy, Planning, Communication',
    seoDescription: 'Professional AI prompts for business strategy, planning, and professional communication.',
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: 'Share2',
    description: 'LinkedIn, Twitter, Instagram, and YouTube content.',
    color: '#E11D48',
    group: 'business',
    seoTitle: 'AI Social Media Prompts - LinkedIn, Twitter, Instagram',
    seoDescription: 'AI prompts for creating viral content on LinkedIn, Twitter, Instagram, and YouTube.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'Megaphone',
    description: 'Copywriting, email campaigns, and conversion optimization.',
    color: '#D946EF',
    group: 'business',
    seoTitle: 'AI Marketing Prompts - Copywriting, Email, Conversion',
    seoDescription: 'Professional AI prompts for copywriting, email campaigns, and conversion optimization.',
  },
  // PERSONAL GROUP
  {
    id: 'productivity',
    name: 'Productivity',
    icon: 'Zap',
    description: 'Task management, planning, and workflow optimization.',
    color: '#06B6D4',
    group: 'personal',
    seoTitle: 'AI Productivity Prompts - Task Management, Planning',
    seoDescription: 'AI prompts for productivity, task management, planning, and workflow optimization.',
  },
  {
    id: 'personal-development',
    name: 'Personal Development',
    icon: 'Target',
    description: 'Goal setting, habits, Ikigai, and life design.',
    color: '#14B8A6',
    group: 'personal',
    seoTitle: 'AI Personal Development Prompts - Goals, Habits, Ikigai',
    seoDescription: 'AI prompts for personal development, goal setting, habit formation, and Ikigai discovery.',
  },
  {
    id: 'spiritual',
    name: 'Spiritual Growth',
    icon: 'Compass',
    description: 'Consciousness, meditation, manifestation, and inner work.',
    color: '#A855F7',
    group: 'personal',
    seoTitle: 'AI Spiritual Prompts - Meditation, Manifestation, Consciousness',
    seoDescription: 'AI prompts for spiritual growth, meditation guidance, manifestation, and consciousness expansion.',
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: 'GraduationCap',
    description: 'Study guides, explanations, and skill development.',
    color: '#6366F1',
    group: 'personal',
    seoTitle: 'AI Learning Prompts - Study Guides, Skill Development',
    seoDescription: 'AI prompts for learning, study guides, skill development, and knowledge acquisition.',
  },
]

export const PROMPTS: Prompt[] = [
  // ============================================================================
  // WRITING PROMPTS
  // ============================================================================
  {
    id: 'blog-post-structure',
    title: 'Blog Post Structure Generator',
    description: 'Create a well-structured blog post outline with hook, body, and conclusion.',
    content: `Write a blog post about [TOPIC].

Structure it as follows:
1. Hook (1-2 sentences that grab attention)
2. Introduction (set up the problem/opportunity)
3. Main sections (3-5 key points with subheadings)
4. Practical examples or case studies
5. Conclusion with clear takeaway
6. Call to action

Tone: [conversational/professional/educational]
Target audience: [describe reader]
Word count: approximately [NUMBER] words`,
    category: 'writing',
    tags: ['blog', 'content', 'structure'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Content creators needing consistent blog post frameworks.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['blog post prompts', 'content structure ai', 'blog writing prompts'],
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'rewrite-improve',
    title: 'Text Rewriter & Improver',
    description: 'Improve existing text while maintaining the original meaning.',
    content: `Rewrite the following text to be more [clear/engaging/professional/concise]:

"""
[PASTE YOUR TEXT HERE]
"""

Requirements:
- Maintain the core message and facts
- Improve readability and flow
- Fix any grammatical issues
- Make it more [specify: compelling/accessible/authoritative]
- Keep approximately the same length unless instructed otherwise`,
    category: 'writing',
    tags: ['editing', 'rewriting', 'improvement'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Writers refining drafts or improving existing content.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'storytelling-framework',
    title: 'Story Framework Generator',
    description: 'Create compelling narratives using proven storytelling structures.',
    content: `Help me craft a story using the following framework:

Story type: [personal anecdote/case study/brand story/origin story]
Core message: [what should the reader take away?]
Emotional arc: [what should they feel at the end?]

Use this structure:
1. THE HOOK - Start in the middle of the action
2. THE CONTEXT - Just enough background
3. THE CONFLICT - What obstacle or challenge emerged
4. THE TURNING POINT - The moment of change
5. THE RESOLUTION - How it worked out
6. THE LESSON - The universal truth

Keep it under [NUMBER] words. Make it specific, not generic.`,
    category: 'writing',
    tags: ['storytelling', 'narrative', 'copywriting'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Marketers and writers creating compelling narratives.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // MUSIC CREATION (SUNO) PROMPTS
  // ============================================================================
  {
    id: 'suno-ambient-electronic',
    title: 'Ambient Electronic Track',
    description: 'Create atmospheric electronic music with Suno.',
    content: `[Ambient Electronic]
Ethereal synth pads, gentle pulse
Soft textures, floating melodies
Warm bassline, subtle progression
Cinematic atmosphere, dreamy

[Verse]
Weightless motion through digital space
Crystalline tones, gentle embrace

[Build]
Layers growing, frequencies align
Harmonic waves intertwine

[Drop]
Full spectrum bloom, controlled energy
Sustained beauty, refined`,
    category: 'music-creation',
    tags: ['ambient', 'electronic', 'atmospheric'],
    aiTool: 'suno',
    difficulty: 'Beginner',
    useCase: 'Creating focus music, meditation tracks, or background ambience.',
    tier: 'free',
    productBundle: 'vibe-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'suno-cinematic-epic',
    title: 'Cinematic Epic Score',
    description: 'Create powerful, movie-trailer-style music.',
    content: `[Epic Cinematic Orchestral]
Powerful strings, brass crescendo
Thundering percussion, heroic theme
Rising tension, triumphant release
Film score quality, emotional depth

[Intro - Quiet tension]
Distant drums echo through silence
A single voice calls out

[Verse - Building]
Strings swell with purpose and might
The journey unfolds tonight

[Chorus - Epic]
Rise above the storm and flame
Write your legend, stake your claim

[Bridge - Intense]
No retreat, no surrender now
This is our defining hour`,
    category: 'music-creation',
    tags: ['cinematic', 'orchestral', 'epic'],
    aiTool: 'suno',
    difficulty: 'Intermediate',
    useCase: 'Creating trailer music, game soundtracks, or dramatic content.',
    tier: 'premium',
    productBundle: 'vibe-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'suno-lofi-chill',
    title: 'Lo-Fi Chill Beat',
    description: 'Create relaxing lo-fi hip-hop beats.',
    content: `[Lo-Fi Hip Hop, Chill, Relaxed]
Dusty vinyl crackle, mellow keys
Jazzy chords, soft drums
Warm bass, lazy tempo 75bpm
Nostalgic, cozy, late night study vibes

[Intro]
Rain on windows, coffee steam rising

[Verse]
Sunset colors through the blinds
Easy breathing, peaceful mind
Nothing rushing, nowhere to be
Just this moment, feeling free

[Loop]
Gentle groove keeps flowing on
Night is young until the dawn`,
    category: 'music-creation',
    tags: ['lofi', 'chill', 'study'],
    aiTool: 'suno',
    difficulty: 'Beginner',
    useCase: 'Creating study music, relaxation tracks, or podcast backgrounds.',
    tier: 'free',
    productBundle: 'vibe-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'suno-custom-song',
    title: 'Custom Song Template',
    description: 'Flexible template for creating any style of song.',
    content: `[GENRE: specify your genre]
[STYLE TAGS: mood, energy level, instruments]
[TEMPO: slow/medium/fast or specific BPM]
[VOCAL STYLE: male/female/instrumental only]

Structure your lyrics:

[Intro]
Set the scene or mood

[Verse 1]
Tell the story, introduce the theme
4-8 lines of narrative

[Pre-Chorus]
Build tension toward the chorus

[Chorus]
The hook - catchy, memorable, emotional peak
Repeat key message

[Verse 2]
Develop the story, add new perspective

[Chorus]

[Bridge]
Contrast - different melody/rhythm
Emotional turning point

[Final Chorus]
Payoff - possibly with variation

[Outro]
Resolve and close`,
    category: 'music-creation',
    tags: ['template', 'songwriting', 'custom'],
    aiTool: 'suno',
    difficulty: 'Intermediate',
    useCase: 'Creating original songs in any genre with proper structure.',
    tier: 'paid',
    productBundle: 'vibe-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // IMAGE GENERATION PROMPTS
  // ============================================================================
  {
    id: 'midjourney-professional-portrait',
    title: 'Professional Portrait Style',
    description: 'Create high-quality professional headshot-style images.',
    content: `Professional headshot portrait of [SUBJECT DESCRIPTION],
studio lighting, shallow depth of field,
clean neutral background, sharp focus on eyes,
corporate professional style, high-end photography,
Canon EOS R5, 85mm lens, f/1.8,
natural skin texture, confident expression

--ar 3:4 --stylize 200 --quality 2`,
    category: 'image-generation',
    tags: ['portrait', 'professional', 'headshot'],
    aiTool: 'midjourney',
    difficulty: 'Beginner',
    useCase: 'Creating professional avatars or business imagery.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'midjourney-product-mockup',
    title: 'Product Photography Mockup',
    description: 'Create elegant product photography for e-commerce.',
    content: `[PRODUCT] product photography,
minimalist composition, soft studio lighting,
gradient background from [COLOR1] to [COLOR2],
subtle shadows, floating product arrangement,
commercial advertisement quality,
8K resolution, hyper-detailed,
luxury brand aesthetic, clean and modern

--ar 1:1 --stylize 100 --quality 2`,
    category: 'image-generation',
    tags: ['product', 'commercial', 'mockup'],
    aiTool: 'midjourney',
    difficulty: 'Intermediate',
    useCase: 'Creating product images for websites or marketing.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'midjourney-abstract-art',
    title: 'Abstract Digital Art',
    description: 'Create stunning abstract artwork for backgrounds or prints.',
    content: `Abstract digital art,
flowing organic shapes, ethereal lighting,
color palette: [PRIMARY COLOR] and [ACCENT COLOR],
soft gradients, subtle texture,
cosmic and dreamy atmosphere,
ultra-wide composition,
inspired by James Turrell and Olafur Eliasson,
high resolution, suitable for large print

--ar 16:9 --stylize 750 --chaos 30`,
    category: 'image-generation',
    tags: ['abstract', 'art', 'digital'],
    aiTool: 'midjourney',
    difficulty: 'Beginner',
    useCase: 'Creating backgrounds, wallpapers, or artistic content.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'dalle-illustration',
    title: 'Stylized Illustration',
    description: 'Create consistent illustration styles for content.',
    content: `A [SCENE DESCRIPTION] in a modern flat illustration style,
using a limited color palette of [2-4 COLORS],
clean lines, geometric shapes,
subtle textures and gradients,
suitable for website or app graphics,
white or transparent background,
vector art aesthetic, professional quality`,
    category: 'image-generation',
    tags: ['illustration', 'graphic-design', 'flat'],
    aiTool: 'dalle',
    difficulty: 'Beginner',
    useCase: 'Creating consistent illustrations for websites or presentations.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // CODING PROMPTS
  // ============================================================================
  {
    id: 'code-review-assistant',
    title: 'Code Review Assistant',
    description: 'Get thorough code reviews with actionable feedback.',
    content: `Review the following code for:

1. **Bugs & Edge Cases** - Logic errors, null checks, boundary conditions
2. **Performance** - Inefficiencies, unnecessary operations
3. **Security** - Vulnerabilities, input validation, data exposure
4. **Readability** - Naming, structure, documentation
5. **Best Practices** - Language idioms, design patterns

Code:
\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

For each issue found:
- Explain the problem
- Show the problematic code
- Provide the fixed version
- Rate severity (Critical/Medium/Low)`,
    category: 'coding',
    tags: ['review', 'debugging', 'quality'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Developers wanting thorough code reviews before commits.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'explain-code',
    title: 'Code Explainer',
    description: 'Get clear explanations of complex code.',
    content: `Explain this code in detail:

\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

Please explain:
1. **Overview** - What does this code accomplish?
2. **Line by Line** - Walk through the logic step by step
3. **Key Concepts** - What programming concepts are used?
4. **Flow** - How does data flow through this code?
5. **Potential Issues** - Any limitations or edge cases?

Adjust explanation depth for: [beginner/intermediate/advanced] developer`,
    category: 'coding',
    tags: ['learning', 'explanation', 'understanding'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Developers learning new codebases or concepts.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'typescript-component',
    title: 'React TypeScript Component',
    description: 'Generate well-typed React components with best practices.',
    content: `Create a React TypeScript component for:
[DESCRIBE COMPONENT FUNCTIONALITY]

Requirements:
- Functional component with hooks
- Full TypeScript types (no 'any')
- Props interface with JSDoc comments
- Sensible default props where appropriate
- Accessible (ARIA labels, keyboard navigation)
- Mobile-responsive if relevant
- Include example usage in comments

Tech stack: [React 18+, Next.js 14+, Tailwind CSS]

Optional features needed:
- [ ] Loading state
- [ ] Error handling
- [ ] Animation (Framer Motion)
- [ ] Form validation`,
    category: 'coding',
    tags: ['react', 'typescript', 'components'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Developers building React applications with TypeScript.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // BUSINESS PROMPTS
  // ============================================================================
  {
    id: 'email-professional',
    title: 'Professional Email Writer',
    description: 'Craft clear, professional emails for any situation.',
    content: `Write a professional email for this situation:

Context: [DESCRIBE THE SITUATION]
Recipient: [WHO ARE THEY AND YOUR RELATIONSHIP]
Goal: [WHAT DO YOU WANT TO ACHIEVE]
Tone: [formal/friendly-professional/casual-professional]

Requirements:
- Clear subject line
- Appropriate greeting
- Concise body (get to the point quickly)
- Specific ask or next step
- Professional sign-off

Avoid: jargon, passive-aggressive tone, ambiguity`,
    category: 'business',
    tags: ['email', 'communication', 'professional'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Professionals needing to communicate clearly and effectively.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'market-research',
    title: 'Market Research Framework',
    description: 'Analyze markets and competitive landscapes systematically.',
    content: `Conduct market research analysis for:

Product/Service: [DESCRIBE YOUR OFFERING]
Target Market: [DESCRIBE IDEAL CUSTOMER]

Analyze:

1. **Market Size & Trends**
   - Current market size
   - Growth projections
   - Key trends shaping the market

2. **Customer Analysis**
   - Primary pain points
   - Current solutions they use
   - Buying behavior and decision factors

3. **Competitive Landscape**
   - Direct competitors (3-5)
   - Indirect alternatives
   - Competitive advantages to leverage

4. **Opportunities & Threats**
   - Gaps in the market
   - Barriers to entry
   - Risks to consider

5. **Recommendations**
   - Go-to-market suggestions
   - Positioning recommendations
   - Quick wins to pursue`,
    category: 'business',
    tags: ['research', 'strategy', 'market'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Entrepreneurs and marketers validating ideas or entering markets.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'social-media-strategy',
    title: 'Social Media Content Strategy',
    description: 'Create a content strategy for your social presence.',
    content: `Create a social media content strategy for:

Brand/Business: [DESCRIBE]
Platform: [LinkedIn/Twitter/Instagram/TikTok]
Goal: [awareness/engagement/leads/sales]
Target audience: [WHO ARE THEY]

Provide:

1. **Content Pillars** (3-5 themes to rotate)
   - Theme name
   - Why it resonates with audience
   - Example post ideas

2. **Content Mix**
   - % educational vs entertaining vs promotional
   - Format recommendations (text/image/video/carousel)

3. **Posting Strategy**
   - Optimal posting frequency
   - Best times for this audience
   - Engagement tactics

4. **Voice & Style**
   - Tone guidelines
   - Do's and don'ts
   - Example phrases to use

5. **30-Day Content Calendar**
   - Week-by-week themes
   - Specific post ideas for each day`,
    category: 'business',
    tags: ['social-media', 'marketing', 'content'],
    aiTool: 'chatgpt',
    difficulty: 'Intermediate',
    useCase: 'Marketers and creators building consistent social presence.',
    tier: 'paid',
    productBundle: 'gencreator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // LEARNING PROMPTS
  // ============================================================================
  {
    id: 'explain-concept',
    title: 'Concept Explainer (Feynman Technique)',
    description: 'Understand any concept using the Feynman learning method.',
    content: `Explain [CONCEPT] using the Feynman Technique:

1. **Simple Explanation**
   Explain this as if to a 12-year-old. No jargon.

2. **Analogy**
   Compare it to something from everyday life.

3. **Core Components**
   Break it down into 3-5 fundamental parts.

4. **Common Misconceptions**
   What do people often get wrong about this?

5. **Practical Application**
   Give a real-world example of this in action.

6. **Test Your Understanding**
   Provide 3 questions to verify comprehension.

My current level: [beginner/intermediate/advanced]`,
    category: 'learning',
    tags: ['education', 'understanding', 'feynman'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Anyone learning new concepts and wanting deep understanding.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'learning-path',
    title: 'Learning Path Generator',
    description: 'Create a structured plan to learn any skill.',
    content: `Create a learning path to master [SKILL/TOPIC]:

My current level: [complete beginner/some knowledge/intermediate]
Time available: [X hours per week]
Timeline goal: [achieve basic proficiency in X months]
Learning style: [reading/video/hands-on projects/mix]

Provide:

1. **Prerequisites**
   - What should I know before starting?

2. **Phase 1: Foundations** (weeks 1-4)
   - Core concepts to master
   - Recommended resources (free and paid)
   - Practice exercises

3. **Phase 2: Building Skills** (weeks 5-8)
   - Intermediate topics
   - Hands-on projects to complete
   - Common mistakes to avoid

4. **Phase 3: Advanced Application** (weeks 9-12)
   - Advanced concepts
   - Real-world projects
   - How to continue growing

5. **Success Metrics**
   - How will I know I've achieved proficiency?
   - Portfolio pieces to create
   - Communities to join`,
    category: 'learning',
    tags: ['skill-development', 'planning', 'education'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Self-learners wanting structured guidance on new skills.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // PRODUCTIVITY PROMPTS
  // ============================================================================
  {
    id: 'weekly-planning',
    title: 'Weekly Planning Session',
    description: 'Structure your week for maximum productivity.',
    content: `Help me plan my week. Here's my context:

**This week's priorities:**
[LIST YOUR TOP 3 PRIORITIES]

**Ongoing commitments:**
[MEETINGS, RECURRING TASKS, ETC.]

**Projects in progress:**
[WHAT ARE YOU WORKING ON]

**Available hours:** [X hours for deep work]

Please help me:
1. Prioritize tasks using the Eisenhower Matrix
2. Suggest time blocks for deep work
3. Identify tasks that could be delegated or eliminated
4. Create a day-by-day action plan
5. Add buffer time for unexpected issues
6. Include breaks and renewal activities

Output a clean weekly schedule I can follow.`,
    category: 'productivity',
    tags: ['planning', 'organization', 'time-management'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Professionals wanting to plan effective weeks.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'meeting-notes',
    title: 'Meeting Notes Processor',
    description: 'Transform raw meeting notes into actionable summaries.',
    content: `Process these meeting notes into an actionable summary:

Raw Notes:
"""
[PASTE YOUR MESSY MEETING NOTES]
"""

Extract and organize:

1. **Meeting Summary** (2-3 sentences)
   - What was discussed? What was decided?

2. **Key Decisions Made**
   - List each decision clearly

3. **Action Items**
   | Task | Owner | Deadline |
   |------|-------|----------|

4. **Open Questions**
   - Unresolved items needing follow-up

5. **Next Steps**
   - What happens next? Any follow-up meetings?

Format for easy sharing with attendees.`,
    category: 'productivity',
    tags: ['meetings', 'notes', 'organization'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Anyone needing to turn messy notes into clear action items.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // CREATIVE PROMPTS
  // ============================================================================
  {
    id: 'brainstorm-ideas',
    title: 'Idea Brainstorming Session',
    description: 'Generate creative ideas using multiple thinking frameworks.',
    content: `Help me brainstorm ideas for: [YOUR CHALLENGE OR GOAL]

Use these frameworks to generate ideas:

1. **First Principles** (3 ideas)
   Break down the problem to fundamentals, rebuild from there.

2. **Analogy Method** (3 ideas)
   How do other industries/domains solve similar problems?

3. **Inversion** (3 ideas)
   What's the opposite approach? What if we did it backwards?

4. **Constraint Removal** (3 ideas)
   If money/time/resources were unlimited, what would we do?

5. **Combination** (3 ideas)
   What if we combined two unrelated concepts?

For each idea:
- One sentence description
- Key benefit
- Biggest challenge to implement

Then recommend: Which 2-3 ideas have the highest potential and why?`,
    category: 'creative',
    tags: ['brainstorming', 'ideation', 'creativity'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Anyone needing fresh ideas or solutions to problems.',
    tier: 'free',
    productBundle: null,
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },
  {
    id: 'content-repurposing',
    title: 'Content Repurposing Engine',
    description: 'Transform one piece of content into multiple formats.',
    content: `Take this content and repurpose it into multiple formats:

Original Content:
"""
[PASTE YOUR CONTENT - BLOG POST, VIDEO SCRIPT, ETC.]
"""

Transform into:

1. **Twitter/X Thread** (5-7 tweets)
   - Hook tweet
   - Key insights as individual tweets
   - Call to action

2. **LinkedIn Post** (150-300 words)
   - Professional angle
   - Storytelling format

3. **Newsletter Intro** (100 words)
   - Tease the main insight
   - Lead to full content

4. **Instagram Caption** (under 2200 characters)
   - Engaging opening line
   - Emoji use
   - Hashtag suggestions

5. **YouTube Description/Hook** (50 words)
   - First sentence that makes people watch

Keep the core message consistent across all formats.`,
    category: 'creative',
    tags: ['repurposing', 'content', 'multi-platform'],
    aiTool: 'chatgpt',
    difficulty: 'Intermediate',
    useCase: 'Content creators maximizing reach from single pieces of content.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
  },

  // ============================================================================
  // AGENT DEVELOPMENT PROMPTS
  // ============================================================================
  {
    id: 'claude-code-setup',
    title: 'Claude Code Project Setup',
    description: 'Initialize a project with optimal CLAUDE.md configuration for autonomous development.',
    content: `Create a CLAUDE.md configuration file for my project:

**Project Type:** [web app/CLI tool/library/API/monorepo]
**Tech Stack:** [list your technologies]
**Main Goals:** [what should the AI agent focus on]

Generate a CLAUDE.md that includes:

1. **Project Mission** - Clear one-liner about what this project does

2. **Code Standards**
   - Language-specific conventions
   - Naming patterns to follow
   - File/folder structure rules
   - Testing requirements

3. **Specialized Agents** (define 2-3 custom agents)
   - Name and role
   - Personality traits
   - Primary and secondary tools
   - Activation prompts

4. **Autonomy Guidelines**
   - What the agent CAN do without asking
   - What requires explicit permission
   - Error handling expectations

5. **Success Metrics**
   - How to measure quality
   - Definition of "done"

Make it production-grade and specific to my stack.`,
    category: 'agent-development',
    tags: ['claude-code', 'configuration', 'setup', 'CLAUDE.md'],
    aiTool: 'claude-code',
    difficulty: 'Intermediate',
    useCase: 'Developers setting up Claude Code for new projects with best practices.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['claude code setup', 'CLAUDE.md', 'ai coding agent', 'claude configuration'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'cursor-rules-generator',
    title: 'Cursor Rules File Generator',
    description: 'Create effective .cursorrules for consistent AI-assisted development.',
    content: `Generate a .cursorrules file for my project:

**Project Context:**
- Framework: [React/Next.js/Vue/etc.]
- Language: [TypeScript/JavaScript/Python/etc.]
- Style: [Tailwind/CSS Modules/styled-components]
- State: [Redux/Zustand/Context/etc.]

**Team Conventions:**
[Describe any specific patterns or rules your team follows]

Create rules that enforce:

1. **Code Style**
   - Consistent formatting preferences
   - Import ordering rules
   - Component structure patterns

2. **TypeScript Practices**
   - Type annotation requirements
   - Interface vs type usage
   - Strict null checking approach

3. **Project Patterns**
   - File naming conventions
   - Component architecture (containers/presentational, etc.)
   - API call patterns

4. **Documentation**
   - When to add comments
   - JSDoc requirements
   - README standards

5. **Testing**
   - Test file location
   - Testing library preferences
   - Coverage expectations

Output as a complete .cursorrules file I can use immediately.`,
    category: 'agent-development',
    tags: ['cursor', 'rules', 'configuration', 'ai-coding'],
    aiTool: 'cursor',
    difficulty: 'Intermediate',
    useCase: 'Teams standardizing their Cursor AI experience across developers.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['cursor rules', 'cursorrules', 'cursor ai', 'ai coding assistant'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'agentic-workflow-design',
    title: 'Agentic Workflow Architecture',
    description: 'Design multi-step autonomous workflows for complex development tasks.',
    content: `Design an agentic workflow for: [DESCRIBE COMPLEX TASK]

**Context:**
- Current pain point: [what takes too long manually]
- Desired outcome: [what success looks like]
- Human checkpoints: [where you need approval]

Create a workflow that includes:

1. **Task Decomposition**
   - Break the main task into autonomous sub-tasks
   - Define clear inputs/outputs for each step
   - Identify parallelizable vs sequential steps

2. **Agent Roles**
   - Researcher (information gathering)
   - Implementer (code writing)
   - Reviewer (quality checking)
   - Documenter (capturing decisions)

3. **State Management**
   - What context needs to persist between steps
   - How to handle failures and rollbacks
   - Checkpoint strategy for long workflows

4. **Human-in-the-Loop Points**
   - Critical decision gates
   - Approval requirements
   - Feedback integration

5. **Error Handling**
   - Retry strategies
   - Fallback approaches
   - Escalation to human

6. **Completion Criteria**
   - Success metrics
   - Quality gates
   - Documentation requirements

Output as an actionable workflow I can implement with Claude Code or similar tools.`,
    category: 'agent-development',
    tags: ['agentic', 'workflow', 'automation', 'orchestration'],
    aiTool: 'claude-code',
    difficulty: 'Advanced',
    useCase: 'Developers building sophisticated autonomous development pipelines.',
    tier: 'paid',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['agentic workflow', 'ai automation', 'autonomous coding', 'ai orchestration'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'mcp-server-design',
    title: 'MCP Server Architecture',
    description: 'Design a Model Context Protocol server for custom AI integrations.',
    content: `Design an MCP (Model Context Protocol) server for: [YOUR USE CASE]

**Integration Goals:**
- Data source: [database/API/file system/etc.]
- Key operations: [what should the AI be able to do]
- Security requirements: [authentication, permissions]

Provide a complete design:

1. **Resources** (read-only data exposure)
   - List resources to expose (URI patterns)
   - Schema for each resource type
   - Pagination/filtering strategies

2. **Tools** (actions the AI can take)
   - Tool definitions with input schemas
   - Validation requirements
   - Side effect descriptions

3. **Prompts** (predefined interaction patterns)
   - Common workflows as prompt templates
   - Context injection patterns
   - Dynamic prompt generation

4. **Server Configuration**
   - Transport (stdio/HTTP/WebSocket)
   - Authentication approach
   - Rate limiting strategy

5. **Error Handling**
   - Error response schemas
   - Retry guidance for clients
   - Graceful degradation

6. **TypeScript Implementation Skeleton**
   - Main server structure
   - Handler patterns
   - Type definitions

Output as a complete architectural design I can implement.`,
    category: 'agent-development',
    tags: ['mcp', 'protocol', 'integration', 'server'],
    aiTool: 'claude-code',
    difficulty: 'Advanced',
    useCase: 'Developers building custom MCP servers for AI integrations.',
    tier: 'paid',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['MCP server', 'model context protocol', 'ai integration', 'claude mcp'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'ai-coding-pair-session',
    title: 'AI Pair Programming Session',
    description: 'Structure an effective AI pair programming session for complex features.',
    content: `Set up an AI pair programming session for: [FEATURE/TASK]

**Session Context:**
- Feature goal: [what we're building]
- Codebase context: [relevant files, patterns]
- Time budget: [how long for this session]

Structure the session as:

1. **Context Priming** (5 min)
   - Share relevant code files
   - Explain current architecture
   - Define success criteria

2. **Design Discussion** (10 min)
   - Explore implementation approaches
   - Identify edge cases
   - Agree on patterns to use

3. **Implementation Cycles** (main work)
   - AI generates code in chunks
   - Human reviews and provides feedback
   - Iterate until quality is met

4. **Effective Prompting Patterns**
   - "Implement X following the pattern in Y"
   - "Review this for edge cases: [code]"
   - "Refactor to improve [specific quality]"

5. **Session Hygiene**
   - Regular commits with descriptive messages
   - Running tests after each chunk
   - Documenting decisions

6. **Wrap-up** (5 min)
   - Summary of changes
   - Outstanding TODOs
   - Follow-up tasks

Provide prompts I can use throughout the session.`,
    category: 'agent-development',
    tags: ['pair-programming', 'workflow', 'productivity', 'coding'],
    aiTool: 'general',
    difficulty: 'Intermediate',
    useCase: 'Developers wanting to maximize productivity in AI coding sessions.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['ai pair programming', 'coding with ai', 'developer productivity', 'ai assistant'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },

  // ============================================================================
  // AI ARCHITECTURE PROMPTS
  // ============================================================================
  {
    id: 'prompt-engineering-system',
    title: 'Production Prompt Engineering System',
    description: 'Design versioned, testable prompt systems for production AI applications.',
    content: `Design a prompt engineering system for: [YOUR AI APPLICATION]

**Application Context:**
- Use case: [what the AI does]
- Model: [Claude/GPT-4/etc.]
- Volume: [requests per day]
- Quality requirements: [accuracy, consistency needs]

Create a system that includes:

1. **Prompt Architecture**
   - System prompt structure
   - Dynamic context injection patterns
   - Few-shot example management
   - Output format specifications

2. **Version Control**
   - Prompt versioning strategy
   - A/B testing framework
   - Rollback procedures
   - Changelog format

3. **Testing Framework**
   - Unit tests for prompt behavior
   - Golden test sets
   - Regression detection
   - Quality metrics (accuracy, latency, cost)

4. **Optimization Patterns**
   - Token usage optimization
   - Caching strategies
   - Batching approaches
   - Model routing (different models for different tasks)

5. **Monitoring & Observability**
   - Logging structure
   - Quality dashboards
   - Drift detection
   - Cost tracking

6. **Implementation Template**
   - Folder structure
   - Configuration format
   - Deployment pipeline

Output as a production-ready architecture document.`,
    category: 'ai-architecture',
    tags: ['prompt-engineering', 'production', 'system-design', 'llm'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Engineers building production AI applications that need reliable prompts.',
    tier: 'paid',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['prompt engineering', 'ai architecture', 'llm production', 'prompt versioning'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'rag-pipeline-design',
    title: 'RAG Pipeline Architecture',
    description: 'Design a Retrieval-Augmented Generation system for knowledge-intensive applications.',
    content: `Design a RAG (Retrieval-Augmented Generation) pipeline for:

**Use Case:** [chatbot/search/Q&A/etc.]
**Knowledge Base:** [documents/database/API/etc.]
**Scale:** [document count, query volume]
**Quality Needs:** [precision, recall, latency requirements]

Create a complete RAG architecture:

1. **Ingestion Pipeline**
   - Document parsing strategy
   - Chunking approach (size, overlap, semantic)
   - Metadata extraction
   - Embedding model selection

2. **Vector Store Design**
   - Store selection (Pinecone/Weaviate/pgvector/etc.)
   - Index configuration
   - Partitioning strategy
   - Update/refresh patterns

3. **Retrieval Strategy**
   - Query processing (expansion, rewriting)
   - Hybrid search (vector + keyword)
   - Re-ranking approach
   - Context window management

4. **Generation Layer**
   - Prompt template with retrieved context
   - Citation handling
   - Hallucination prevention
   - Response formatting

5. **Quality Assurance**
   - Relevance scoring
   - Answer evaluation metrics
   - Feedback loop design
   - Human review integration

6. **Production Considerations**
   - Caching strategy
   - Error handling
   - Monitoring/logging
   - Cost optimization

Output as an implementable architecture with technology recommendations.`,
    category: 'ai-architecture',
    tags: ['rag', 'retrieval', 'vector-search', 'llm'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Engineers building knowledge-grounded AI applications.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['rag architecture', 'retrieval augmented generation', 'vector database', 'ai search'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'ai-evaluation-framework',
    title: 'AI Output Evaluation Framework',
    description: 'Create systematic evaluation methods for AI-generated content quality.',
    content: `Design an evaluation framework for: [YOUR AI APPLICATION]

**Context:**
- Output type: [text/code/structured data/etc.]
- Quality dimensions: [accuracy, helpfulness, safety, style]
- Stakeholders: [who defines "good"]

Create a comprehensive framework:

1. **Evaluation Dimensions**
   - Define 5-7 quality dimensions
   - Rubric for each (1-5 scale with descriptions)
   - Weighting by importance

2. **Automated Metrics**
   - Programmatic checks (format, length, keywords)
   - Reference-based metrics (BLEU, ROUGE, etc.)
   - Model-based evaluation (LLM as judge)
   - Consistency checks

3. **Human Evaluation Protocol**
   - Evaluator selection criteria
   - Task instructions
   - Annotation interface design
   - Inter-rater reliability targets

4. **Test Set Design**
   - Coverage across use cases
   - Edge cases and adversarial inputs
   - Golden answer creation
   - Periodic refresh strategy

5. **Reporting & Analysis**
   - Score aggregation methods
   - Trend visualization
   - Failure analysis workflow
   - Improvement prioritization

6. **Integration into Development**
   - Pre-deployment gates
   - Continuous monitoring
   - Regression alerts
   - Feedback to prompt improvement

Output as an actionable evaluation plan with templates.`,
    category: 'ai-architecture',
    tags: ['evaluation', 'quality', 'metrics', 'testing'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Teams needing systematic AI quality measurement.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['ai evaluation', 'llm testing', 'ai quality metrics', 'prompt evaluation'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'system-prompt-design',
    title: 'System Prompt Designer',
    description: 'Craft effective system prompts that guide AI behavior precisely.',
    content: `Design a system prompt for: [YOUR AI ASSISTANT/APPLICATION]

**Role & Purpose:**
- Primary function: [what should it do]
- Target users: [who will interact with it]
- Tone: [professional/friendly/expert/etc.]

Create a structured system prompt with:

1. **Identity & Role**
   - Who is the AI (name, expertise, personality)
   - What it specializes in
   - How it should present itself

2. **Capabilities & Boundaries**
   - What it CAN do (enumerate explicitly)
   - What it should NOT do (guardrails)
   - How to handle edge cases

3. **Response Formatting**
   - Default output structure
   - When to use lists vs prose
   - Length guidelines
   - Code/technical content handling

4. **Interaction Patterns**
   - How to ask clarifying questions
   - How to handle ambiguity
   - Multi-turn conversation management
   - Error acknowledgment style

5. **Knowledge & Context**
   - Background knowledge to assume
   - How to reference external info
   - Handling outdated information
   - Citation practices

6. **Safety & Alignment**
   - Content policies
   - Bias mitigation
   - Escalation triggers
   - User safety considerations

Output as a production-ready system prompt I can use directly.`,
    category: 'ai-architecture',
    tags: ['system-prompt', 'prompt-design', 'ai-behavior', 'llm'],
    aiTool: 'general',
    difficulty: 'Intermediate',
    useCase: 'Developers crafting reliable AI assistant behaviors.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['system prompt', 'ai prompt design', 'chatbot prompt', 'llm configuration'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },

  // ============================================================================
  // SOCIAL MEDIA PROMPTS
  // ============================================================================
  {
    id: 'linkedin-thought-leadership',
    title: 'LinkedIn Thought Leadership Post',
    description: 'Create engaging LinkedIn posts that establish authority and drive engagement.',
    content: `Create a LinkedIn thought leadership post about: [TOPIC]

**Your Angle:**
- Key insight: [the main point you want to make]
- Your experience: [why you're credible on this]
- Target reader: [who should care about this]

Write a post that follows this structure:

1. **Hook (first line)** - Stop the scroll
   - Counterintuitive statement, or
   - Bold claim, or
   - Relatable pain point

2. **Context (2-3 lines)**
   - Why this matters now
   - Personal connection to topic

3. **Body (main content)**
   - 3-5 key points
   - Use line breaks for readability
   - Include specific examples or data
   - Tell a mini-story if relevant

4. **Actionable Takeaway**
   - What should the reader DO with this?
   - Make it specific and achievable

5. **Engagement Hook (last line)**
   - Question to prompt comments
   - Or invite disagreement
   - Or ask for their experience

**Format Guidelines:**
- Total: 150-300 words
- Short paragraphs (1-2 sentences each)
- Use emojis sparingly (0-3 max)
- No hashtags in body (put at end if any)

Output the complete post ready to copy-paste.`,
    category: 'social-media',
    tags: ['linkedin', 'thought-leadership', 'personal-brand', 'engagement'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Professionals building their personal brand on LinkedIn.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['linkedin post', 'thought leadership', 'linkedin content', 'personal branding'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'twitter-thread-generator',
    title: 'Twitter/X Thread Creator',
    description: 'Transform ideas into viral Twitter threads that educate and engage.',
    content: `Create a Twitter/X thread about: [TOPIC]

**Thread Goal:**
- Main takeaway: [what reader should learn/feel]
- Type: [how-to/story/breakdown/insight/prediction]
- Tone: [educational/provocative/inspiring/casual]

Structure the thread:

1. **Tweet 1 (Hook)**
   - Must work standalone
   - Create curiosity gap
   - Promise value ("Here's what I learned...")

2. **Tweet 2-3 (Setup)**
   - Context or story beginning
   - Why this matters

3. **Tweets 4-8 (Body)**
   - One idea per tweet
   - Numbered list format works well
   - Include specific examples
   - Add visuals ideas where relevant

4. **Tweet 9 (Summary/Key Insight)**
   - Crystallize the main point
   - Make it quotable

5. **Tweet 10 (CTA)**
   - Follow for more
   - Retweet to help others
   - Drop your questions

**Format Rules:**
- Max 280 characters per tweet
- Use "1/" numbering
- Include 🧵 emoji in first tweet
- Add line breaks for readability
- Include 2-3 tweets that could standalone

Output as a complete thread with tweet separators.`,
    category: 'social-media',
    tags: ['twitter', 'thread', 'x', 'viral'],
    aiTool: 'chatgpt',
    difficulty: 'Intermediate',
    useCase: 'Creators wanting to grow their Twitter/X audience.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    seoKeywords: ['twitter thread', 'x thread', 'viral twitter', 'twitter growth'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'instagram-carousel-script',
    title: 'Instagram Carousel Script',
    description: 'Create educational carousel content that gets saved and shared.',
    content: `Create an Instagram carousel about: [TOPIC]

**Content Details:**
- Target audience: [who is this for]
- Main value: [what will they learn/gain]
- Your angle: [why you're the one to teach this]

Design a 10-slide carousel:

**Slide 1 - Cover**
- Bold headline (5-7 words max)
- Subheadline with promise
- Visual style suggestion

**Slide 2 - Hook/Problem**
- Relatable pain point
- "You're doing X wrong..." or "Stop doing Y..."

**Slides 3-8 - Content**
- One tip/point per slide
- Headline + supporting text format
- Specific, actionable advice
- Include examples or mini-case studies

**Slide 9 - Summary**
- Quick recap of all points
- Reinforce main message

**Slide 10 - CTA**
- Save for later
- Share with a friend who needs this
- Follow for more [topic] tips

**For Each Slide Provide:**
- Main headline
- Supporting text (1-2 sentences)
- Visual direction
- Design notes

**Caption (after slides):**
- 150-200 words
- Story or additional context
- Question for engagement
- 5-10 relevant hashtags`,
    category: 'social-media',
    tags: ['instagram', 'carousel', 'educational', 'visual-content'],
    aiTool: 'chatgpt',
    difficulty: 'Intermediate',
    useCase: 'Creators building educational content on Instagram.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    seoKeywords: ['instagram carousel', 'instagram content', 'social media design', 'ig carousel'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'youtube-script-framework',
    title: 'YouTube Video Script Framework',
    description: 'Write engaging YouTube scripts that keep viewers watching.',
    content: `Create a YouTube script for: [VIDEO TOPIC]

**Video Details:**
- Target length: [5-10 min / 10-20 min / 20+ min]
- Style: [tutorial/vlog/essay/review/story]
- Audience: [who and what do they already know]
- Goal: [educate/entertain/persuade/inspire]

Write a complete script:

**HOOK (first 30 seconds)** - CRUCIAL
- Pattern interrupt or surprising statement
- Promise of value ("By the end of this video...")
- Preview of what's coming
- Establish credibility quickly

**INTRO (30-60 seconds)**
- Brief context
- Why this matters now
- Your personal connection
- "Let's dive in" transition

**MAIN CONTENT (structured sections)**

For each section include:
- Section headline
- Key teaching points
- Examples, stories, or demonstrations
- Transition to next section
- Engagement prompts ("Have you ever...?")

**CLIMAX/KEY INSIGHT**
- The most important point
- Emotional payoff
- Make it memorable

**OUTRO (60 seconds)**
- Summary of key points
- Call to action (specific)
- Tease next video
- Thanks and sign-off

**Include:**
- [B-ROLL] suggestions
- [GRAPHIC] placeholders
- [CUT TO] transitions
- Estimated timestamps`,
    category: 'social-media',
    tags: ['youtube', 'video-script', 'content-creation', 'tutorial'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'YouTubers wanting structured, engaging scripts.',
    tier: 'paid',
    productBundle: 'gencreator-os',
    seoKeywords: ['youtube script', 'video script', 'youtube content', 'youtube tutorial'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'social-content-calendar',
    title: 'Weekly Social Content Calendar',
    description: 'Plan a week of cohesive content across multiple platforms.',
    content: `Create a weekly social media content calendar for:

**Brand/Creator:** [describe yourself or brand]
**Platforms:** [LinkedIn/Twitter/Instagram/YouTube/TikTok]
**Content Pillars:** [3-5 themes you focus on]
**Current Goal:** [awareness/engagement/leads/sales]

Generate a 7-day calendar with:

**For Each Day:**
- Primary platform focus
- Content type (post/story/reel/thread)
- Topic and angle
- Key message (1 sentence)
- CTA
- Best posting time
- Cross-posting adaptations

**Content Mix Targets:**
- 40% Educational (teach something)
- 30% Personal (story, behind-scenes)
- 20% Engagement (questions, polls)
- 10% Promotional (offers, launches)

**Format:**
| Day | Platform | Type | Topic | Key Message | CTA |
|-----|----------|------|-------|-------------|-----|
| Mon | LinkedIn | Post | ... | ... | ... |

**Include:**
- Content themes for each day
- Engagement strategy (reply time, DM approach)
- Hashtag strategy per platform
- Story ideas to complement feed
- One "evergreen" piece to repurpose

Output as a complete, actionable calendar.`,
    category: 'social-media',
    tags: ['content-calendar', 'planning', 'social-strategy', 'scheduling'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Creators wanting consistent, strategic social presence.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['content calendar', 'social media planning', 'content strategy', 'social schedule'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },

  // ============================================================================
  // MARKETING PROMPTS
  // ============================================================================
  {
    id: 'landing-page-copy',
    title: 'High-Converting Landing Page Copy',
    description: 'Write persuasive landing page copy that converts visitors.',
    content: `Write landing page copy for: [PRODUCT/SERVICE]

**Product Details:**
- What it is: [describe briefly]
- Who it's for: [target customer]
- Main benefit: [the transformation it provides]
- Price point: [pricing if relevant]

Create copy for each section:

**1. HERO SECTION**
- Headline (8-12 words, benefit-focused)
- Subheadline (expand on promise)
- CTA button text
- Social proof snippet

**2. PROBLEM SECTION**
- 3 pain points your audience feels
- Agitate each one (make them feel understood)
- Hint at the solution

**3. SOLUTION SECTION**
- Introduce your product as the answer
- 3 key benefits (not features)
- What makes you different

**4. FEATURES/HOW IT WORKS**
- 3-5 features with benefit-focused descriptions
- Use format: Feature → So What → Which Means

**5. SOCIAL PROOF**
- Testimonial templates (what to ask customers)
- Stats to highlight
- Logos/credentials to show

**6. OBJECTION HANDLING**
- FAQ section (5 common objections as questions)
- Answers that reassure and redirect

**7. FINAL CTA**
- Headline that restates value
- Urgency element (if authentic)
- Risk reversal (guarantee)
- Button text

**Tone:** [specify: confident, friendly, urgent, professional]`,
    category: 'marketing',
    tags: ['landing-page', 'copywriting', 'conversion', 'sales'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Marketers and founders launching products.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    seoKeywords: ['landing page copy', 'copywriting', 'sales page', 'conversion copy'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'email-sequence-nurture',
    title: 'Email Nurture Sequence',
    description: 'Create a welcome/nurture email sequence that builds trust and drives action.',
    content: `Create an email nurture sequence for: [YOUR OFFER/PRODUCT]

**Context:**
- Lead magnet/entry point: [how they joined your list]
- End goal: [what action should they take]
- Sequence length: [5-7 emails over X days]
- Brand voice: [describe tone]

Write each email with:

**Email 1 - Welcome (Day 0)**
- Deliver the promised value
- Set expectations
- Begin the relationship
- Simple CTA

**Email 2 - Quick Win (Day 1)**
- Provide immediate value
- Build credibility
- Share a story or insight
- Soft CTA

**Email 3 - The Problem (Day 3)**
- Dig into their pain points
- Show you understand deeply
- Hint at transformation
- Curiosity-building CTA

**Email 4 - The Solution (Day 5)**
- Present your approach/framework
- Case study or proof
- Address skepticism
- Stronger CTA

**Email 5 - Objection Handling (Day 7)**
- Tackle the main objection
- Social proof
- Risk reversal
- Clear CTA

**Email 6 - Last Chance (Day 10)**
- Create urgency (authentic)
- Summarize value
- Final push
- Direct CTA

**For Each Email Include:**
- Subject line (+ 2 alternatives)
- Preview text
- Full copy
- CTA link text
- P.S. line`,
    category: 'marketing',
    tags: ['email-marketing', 'nurture', 'automation', 'conversion'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Marketers building automated email funnels.',
    tier: 'paid',
    productBundle: 'gencreator-os',
    seoKeywords: ['email sequence', 'nurture sequence', 'email marketing', 'email funnel'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'product-launch-plan',
    title: 'Product Launch Strategy',
    description: 'Plan a complete product launch with pre-launch, launch, and post-launch phases.',
    content: `Create a product launch plan for: [YOUR PRODUCT]

**Product Details:**
- Product: [name and brief description]
- Price: [pricing structure]
- Launch date: [target date]
- Audience size: [email list, social following]
- Launch goal: [revenue target or units]

Design a 3-phase launch:

**PHASE 1: PRE-LAUNCH (2-4 weeks before)**

Week-by-week breakdown:
- Content themes to publish
- Audience warming activities
- Waitlist building tactics
- Behind-the-scenes sharing
- Beta tester recruitment

Deliverables:
- Launch announcement content
- Waitlist landing page copy
- Pre-launch email sequence (3-5 emails)

**PHASE 2: LAUNCH (5-7 days)**

Day-by-day breakdown:
- Day 1: Doors open (email + social)
- Day 2-3: Social proof push
- Day 4-5: Objection handling
- Day 6: Scarcity/urgency
- Day 7: Final call

Deliverables:
- Sales page copy outline
- Daily email templates
- Social post calendar
- FAQ document

**PHASE 3: POST-LAUNCH (1-2 weeks after)**

- Customer onboarding sequence
- Testimonial collection
- Upsell/cross-sell opportunities
- Launch retrospective framework
- Evergreen conversion strategy

**Metrics to Track:**
- List each KPI with target`,
    category: 'marketing',
    tags: ['launch', 'strategy', 'planning', 'sales'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Entrepreneurs and marketers launching products.',
    tier: 'paid',
    productBundle: 'gencreator-os',
    seoKeywords: ['product launch', 'launch strategy', 'product marketing', 'launch plan'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'headline-variations',
    title: 'Headline Variation Generator',
    description: 'Generate multiple headline options using proven copywriting formulas.',
    content: `Generate headline variations for: [WHAT YOU'RE PROMOTING]

**Context:**
- Product/Content: [describe what the headline is for]
- Target audience: [who should click]
- Main benefit: [the key promise]
- Tone: [urgent/curious/professional/fun]

Generate 20+ headlines using these formulas:

**How-To Headlines (3)**
- How to [achieve benefit] without [pain point]

**List Headlines (3)**
- [Number] ways to [achieve result]

**Question Headlines (3)**
- Are you making these [topic] mistakes?

**Curiosity Headlines (3)**
- The [unexpected adjective] way to [benefit]

**Proof Headlines (3)**
- [Authority/number] proves [claim]

**Fear/Problem Headlines (3)**
- Warning: [problem] is costing you [loss]

**Benefit-Direct Headlines (3)**
- Get [specific benefit] in [timeframe]

**Story Headlines (2)**
- How I [achieved result] after [struggle]

For each headline:
- Rate power (1-10)
- Identify primary emotion triggered
- Suggest A/B test pairing

Recommend top 3 for testing with reasoning.`,
    category: 'marketing',
    tags: ['headlines', 'copywriting', 'a/b-testing', 'conversion'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Marketers needing attention-grabbing headlines.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['headline generator', 'copywriting formulas', 'marketing headlines', 'ab testing'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },

  // ============================================================================
  // PERSONAL DEVELOPMENT PROMPTS
  // ============================================================================
  {
    id: 'ikigai-discovery',
    title: 'Ikigai Discovery Session',
    description: 'Find your Ikigai - the intersection of passion, mission, vocation, and profession.',
    content: `Guide me through discovering my Ikigai.

**First, help me explore each dimension:**

1. **What I LOVE (Passion)**
   - What activities make me lose track of time?
   - What would I do even if no one paid me?
   - What topics do I naturally gravitate toward?

2. **What I'm GOOD AT (Profession)**
   - What skills come naturally to me?
   - What do people consistently ask my help with?
   - What have I developed expertise in?

3. **What the World NEEDS (Mission)**
   - What problems do I feel called to solve?
   - What breaks my heart about the world?
   - Where do I see suffering I could address?

4. **What I can be PAID FOR (Vocation)**
   - What skills have market value?
   - What are people already paying for in this space?
   - What business models exist here?

**Based on my answers, help me find:**

1. **Intersections**
   - Passion + Mission = My Purpose
   - Passion + Profession = My Pleasure
   - Profession + Vocation = My Comfort
   - Vocation + Mission = My Contribution

2. **My Ikigai Statement**
   - A clear sentence describing my sweet spot
   - "I help [who] do [what] so that [result]"

3. **Action Steps**
   - 3 experiments to test this direction
   - Skills to develop
   - People to connect with

Make this introspective and profound.`,
    category: 'personal-development',
    tags: ['ikigai', 'purpose', 'career', 'life-design'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Anyone seeking clarity on their life purpose and direction.',
    tier: 'premium',
    productBundle: null,
    seoKeywords: ['ikigai', 'find your purpose', 'life purpose', 'career clarity'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'goal-setting-framework',
    title: 'Annual Goal Setting System',
    description: 'Set meaningful goals using a proven framework for clarity and achievement.',
    content: `Help me set powerful goals for the next 12 months.

**Current Situation:**
- What went well last year: [brief summary]
- What I want to change: [brief summary]
- Key life areas: [career/health/relationships/finances/personal growth]

Guide me through:

**1. VISION (Dream State)**
- If this year goes perfectly, what does my life look like?
- Describe a typical day in my ideal future
- What am I most proud of achieving?

**2. AUDIT (Current State)**
For each life area, rate 1-10:
- Career/Business:
- Health/Energy:
- Relationships:
- Finances:
- Personal Growth:
- Fun/Recreation:

**3. GOAL SETTING (The Bridge)**
For my top 3 priorities:
- Outcome goal (the destination)
- Process goals (weekly/daily actions)
- Identity shift (who I need to become)

Format each goal:
- SPECIFIC: Exactly what, measured how
- COMPELLING: Why this matters deeply
- ACTIONABLE: First steps this week
- TIME-BOUND: Key milestones

**4. SYSTEMS**
- Habits to install
- Habits to remove
- Weekly review ritual
- Accountability structure

**5. OBSTACLES**
- Predict top 3 obstacles
- Pre-decide how I'll handle each
- Identify support needed

Output as a complete goal-setting document.`,
    category: 'personal-development',
    tags: ['goals', 'planning', 'annual-review', 'productivity'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Anyone setting meaningful goals for a new chapter.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['goal setting', 'annual goals', 'life planning', 'goal framework'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'habit-design',
    title: 'Habit Design Workshop',
    description: 'Design new habits that stick using behavioral science principles.',
    content: `Help me design a new habit:

**The Habit I Want:**
- Behavior: [what exactly I want to do]
- Frequency: [daily/weekly/situational]
- Current status: [never done/tried and failed/inconsistent]
- Why it matters: [the deeper reason]

Design this habit using behavioral science:

**1. MAKE IT OBVIOUS (Cue)**
- When and where will I do this?
- What existing habit can I stack this onto?
- What environmental changes support this?
- Implementation intention: "I will [BEHAVIOR] at [TIME] in [LOCATION]"

**2. MAKE IT ATTRACTIVE (Craving)**
- How can I make this enjoyable?
- What reward can I pair with it?
- Who can I do this with?
- How do I frame this as something I GET to do?

**3. MAKE IT EASY (Response)**
- What's the 2-minute version?
- How do I reduce friction?
- How do I prepare my environment?
- What's the minimum viable version?

**4. MAKE IT SATISFYING (Reward)**
- How will I track progress?
- What immediate reward follows?
- How will I celebrate small wins?
- What's the identity reinforcement? ("I am a person who...")

**5. TROUBLESHOOTING**
- When I miss a day, I will...
- When I feel like skipping, I will...
- My accountability system is...

**30-Day Implementation Plan:**
- Week 1: [focus]
- Week 2: [focus]
- Week 3: [focus]
- Week 4: [focus]`,
    category: 'personal-development',
    tags: ['habits', 'behavior-change', 'atomic-habits', 'self-improvement'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Anyone building new habits or breaking old ones.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['habit building', 'atomic habits', 'behavior design', 'habit formation'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'morning-routine-design',
    title: 'Morning Routine Designer',
    description: 'Design a personalized morning routine that sets you up for peak performance.',
    content: `Design my ideal morning routine:

**My Context:**
- Wake time: [target wake time]
- First commitment: [when I need to be somewhere]
- Available time: [how long for morning routine]
- Energy pattern: [am I naturally a morning person?]
- Priorities: [what matters most: fitness/mindset/productivity/creativity]

Design a routine that includes:

**1. WAKE-UP RITUAL (first 5-10 min)**
- How to wake up without hitting snooze
- First action out of bed
- Hydration/energy boost

**2. BODY ACTIVATION (15-30 min)**
- Movement appropriate for my level
- Options for low-energy days
- What to avoid

**3. MIND PRIMING (10-20 min)**
- Mindfulness/meditation suggestion
- Journaling prompts
- Visualization practice

**4. FUEL (15-20 min)**
- Nutrition approach
- Prep strategies
- What to avoid in morning

**5. FOCUS BLOCK (remaining time)**
- Most important task identification
- Environment setup
- How to protect this time

**For Each Element Provide:**
- Why it matters
- How to do it
- Minimum viable version (busy days)
- Common mistakes to avoid

**Weekly Variation:**
- Weekday vs weekend adjustments
- How to maintain consistency
- Recovery days

**Troubleshooting:**
- When I oversleep...
- When I'm traveling...
- When motivation is low...`,
    category: 'personal-development',
    tags: ['morning-routine', 'productivity', 'wellness', 'habits'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Anyone wanting to start their day with intention.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['morning routine', 'morning ritual', 'productivity routine', 'morning habits'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },

  // ============================================================================
  // SPIRITUAL PROMPTS
  // ============================================================================
  {
    id: 'meditation-guidance',
    title: 'Personalized Meditation Guide',
    description: 'Create a custom meditation practice tailored to your needs and experience.',
    content: `Design a meditation practice for me:

**My Situation:**
- Experience level: [never/beginner/intermediate/advanced]
- Time available: [5/10/20/30+ minutes]
- Main goal: [stress relief/focus/sleep/spiritual growth/emotional healing]
- Challenges: [racing mind/physical discomfort/falling asleep/consistency]

Create a complete meditation guide:

**1. PREPARATION**
- Best time of day for my goal
- Environment setup
- Posture options
- Pre-meditation ritual

**2. THE PRACTICE (step by step)**
- Opening (settling in)
- Main technique (detailed instructions)
- How to handle distractions
- Closing (returning)

**3. TECHNIQUE OPTIONS**
Based on my goal, provide 3 techniques:
- Technique 1: [name] - best for [situation]
- Technique 2: [name] - best for [situation]
- Technique 3: [name] - best for [situation]

For each, give exact instructions.

**4. PROGRESSIVE PATH**
- Week 1-2: Foundation
- Week 3-4: Deepening
- Month 2: Expanding
- Month 3+: Advanced practices

**5. COMMON CHALLENGES**
- "I can't stop thinking" → [response]
- "I don't have time" → [response]
- "I keep forgetting" → [response]
- "Nothing is happening" → [response]

**6. INTEGRATION**
- Micro-practices throughout day
- How to bring benefits into daily life
- Signs of progress to notice

Include a sample guided meditation script.`,
    category: 'spiritual',
    tags: ['meditation', 'mindfulness', 'presence', 'inner-peace'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Anyone wanting to establish or deepen a meditation practice.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['meditation guide', 'how to meditate', 'meditation practice', 'mindfulness'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'journaling-prompts-deep',
    title: 'Deep Self-Discovery Journaling',
    description: 'Profound journaling prompts for self-exploration and inner work.',
    content: `Guide me through a deep journaling session on: [CHOOSE THEME]

**Themes available:**
- Self-understanding
- Healing and release
- Life purpose
- Relationships
- Fear and courage
- Gratitude and abundance
- Shadow work
- Future self

**For my chosen theme, provide:**

**1. WARM-UP (5 min)**
3 gentle prompts to start writing:
- [prompt 1]
- [prompt 2]
- [prompt 3]

**2. DEEP EXPLORATION (15-20 min)**
5 profound prompts that go beneath the surface:
- [prompt with follow-up questions]
- [prompt with follow-up questions]
- [prompt with follow-up questions]
- [prompt with follow-up questions]
- [prompt with follow-up questions]

**3. INTEGRATION (5 min)**
- What patterns do I notice in my responses?
- What surprised me?
- What wants attention?

**4. ACTION (2 min)**
- One small step I can take based on these insights
- One thing I'm releasing
- One thing I'm inviting in

**Journaling Guidelines:**
- Write without editing
- No judgment of what emerges
- Include emotions and body sensations
- Date your entry
- Return to read in [timeframe]

**Optional Ritual:**
- Creating sacred space
- Closing practice
- Self-compassion moment`,
    category: 'spiritual',
    tags: ['journaling', 'self-discovery', 'reflection', 'inner-work'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Those seeking deeper self-understanding through writing.',
    tier: 'premium',
    productBundle: null,
    seoKeywords: ['journaling prompts', 'self discovery', 'deep journaling', 'inner work'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'gratitude-practice',
    title: 'Advanced Gratitude Practice',
    description: 'Develop a transformative gratitude practice beyond simple lists.',
    content: `Design an advanced gratitude practice for me:

**My Current State:**
- Current gratitude practice: [none/basic lists/inconsistent]
- Life challenges right now: [brief description]
- Goal: [shift perspective/increase joy/manifest/heal]

Create a multi-dimensional gratitude practice:

**1. MORNING GRATITUDE (5 min)**
Not just "what am I grateful for" but:
- What am I grateful for that I usually take for granted?
- What challenge am I grateful for because of what it's teaching me?
- What about my body am I grateful for today?

**2. PRESENT-MOMENT GRATITUDE**
Micro-practices throughout the day:
- The 5-4-3-2-1 gratitude sense exercise
- "Thank you" internal whisper practice
- Beauty hunting habit

**3. EVENING REFLECTION (5 min)**
- What made me smile today?
- Who contributed to my day?
- What went "wrong" that I can find gold in?

**4. DEEP GRATITUDE PRACTICES**

Weekly practice:
- Gratitude letter writing
- Gratitude meditation script
- Gratitude for challenges exercise

Monthly practice:
- Gratitude inventory by life area
- Expressing gratitude to others
- Gratitude vision boarding

**5. GRATITUDE IN DIFFICULTY**
- Finding gratitude during hard times
- The "grateful anyway" practice
- Transmuting pain into appreciation

**6. MEASURABLE SHIFTS**
- Signs gratitude is working
- Journal prompts to track progress
- When to deepen the practice`,
    category: 'spiritual',
    tags: ['gratitude', 'abundance', 'positivity', 'mindset'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Anyone wanting to cultivate genuine gratitude.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['gratitude practice', 'gratitude journal', 'thankfulness', 'appreciation'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'manifestation-framework',
    title: 'Manifestation & Intention Setting',
    description: 'Create a practical manifestation practice grounded in action and belief.',
    content: `Help me create a manifestation practice for: [WHAT I WANT TO CREATE]

**My Desire:**
- What I want: [be specific]
- Why I want it: [deeper reason]
- Timeframe: [when by]
- Current belief level (1-10): [honest assessment]

Create a complete manifestation framework:

**1. CLARITY (The Vision)**
- Detailed description of the outcome
- How will I FEEL when this is real?
- Sensory details: what I'll see, hear, experience
- Write it as if it's already true

**2. BELIEF WORK (The Internal Shift)**
- Limiting beliefs to identify and release
- New beliefs to install
- Evidence from the past that I can do this
- Affirmations that feel true, not forced

**3. ALIGNMENT (The Energy)**
- Morning visualization practice (script)
- Acting "as if" in daily life
- Environment alignment
- People to surround myself with

**4. ACTION (The Bridge)**
- Inspired actions to take this week
- How to recognize opportunities
- Saying yes and saying no
- The balance of surrender and effort

**5. RELEASE (The Letting Go)**
- Detaching from the "how"
- Trust practices
- Handling doubt when it arises
- Signs to notice along the way

**6. DAILY PRACTICE**
- Morning ritual (10 min)
- Throughout-day anchors
- Evening reflection

**7. OBSTACLES**
- When nothing seems to be happening
- When old patterns return
- When doubt overwhelms

Include journaling prompts for each phase.`,
    category: 'spiritual',
    tags: ['manifestation', 'intention', 'law-of-attraction', 'visualization'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Conscious creators manifesting their desires.',
    tier: 'premium',
    productBundle: null,
    seoKeywords: ['manifestation', 'law of attraction', 'visualization', 'intention setting'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'shadow-work-guide',
    title: 'Shadow Work Exploration',
    description: 'Safely explore and integrate unconscious patterns for personal growth.',
    content: `Guide me through shadow work exploration:

**Current Trigger:**
- What's bothering me right now: [situation or pattern]
- Emotion I'm feeling: [name it]
- How long has this pattern existed: [history]

Create a safe shadow work session:

**1. PREPARATION**
- Creating emotional safety
- Grounding exercise
- Self-compassion anchor
- Knowing when to pause

**2. IDENTIFICATION**
Prompts to find the shadow:
- What do I judge harshly in others?
- What am I afraid people will discover about me?
- What patterns keep repeating in my life?
- When do I feel shame or guilt?

**3. EXPLORATION**
For the shadow aspect identified:
- When did I first learn to hide this part of myself?
- What was I protecting by suppressing this?
- How has this shadow served me?
- What is this part of me really wanting?

**4. DIALOGUE**
A conversation with the shadow:
- Give it a voice
- Ask what it needs
- Listen without judgment
- Find the gift it carries

**5. INTEGRATION**
- Accepting this part of myself
- Reclaiming the energy
- New ways to express this safely
- Commitment to self

**6. CLOSING RITUAL**
- Self-forgiveness practice
- Grounding back to present
- Self-care action
- Integration support

**Safety Notes:**
- When to seek professional support
- Signs of overwhelm
- Gentle vs deep shadow work
- Aftercare practices`,
    category: 'spiritual',
    tags: ['shadow-work', 'healing', 'psychology', 'integration'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Those ready for deep inner work and self-integration.',
    tier: 'paid',
    productBundle: null,
    seoKeywords: ['shadow work', 'inner child', 'psychological healing', 'self integration'],
    createdAt: '2024-12-20T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
  },

  // ============================================================================
  // SEO-OPTIMIZED PROMPTS (High-Volume Keywords)
  // ============================================================================
  {
    id: 'chatgpt-business-email',
    title: 'ChatGPT Business Email Writer',
    description: 'Generate professional business emails with ChatGPT for any workplace scenario.',
    content: `You are an expert business communication specialist. Write a professional email for this situation:

**Email Purpose:** [cold outreach/follow-up/request/thank you/complaint resolution]
**Recipient:** [their role and your relationship]
**Key Message:** [what you need to communicate]
**Desired Outcome:** [what action you want them to take]
**Tone:** [formal/friendly professional/urgent]

Write an email that includes:
1. Clear, compelling subject line
2. Appropriate greeting
3. Opening that establishes context
4. Body with your main points (be concise)
5. Clear call to action
6. Professional closing

Keep it under 200 words. Make every sentence count.`,
    category: 'business',
    tags: ['chatgpt', 'email', 'business', 'professional'],
    aiTool: 'chatgpt',
    difficulty: 'Beginner',
    useCase: 'Professionals needing to write effective business emails quickly.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['chatgpt prompts for email', 'chatgpt business email', 'ai email writer', 'professional email prompts'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'chatgpt-resume-optimizer',
    title: 'ChatGPT Resume & CV Optimizer',
    description: 'Optimize your resume for ATS systems and human recruiters using ChatGPT.',
    content: `Act as an expert career coach and resume writer. Review and optimize my resume:

**Current Resume:**
[PASTE YOUR RESUME HERE]

**Target Role:** [job title you're applying for]
**Industry:** [your target industry]
**Years of Experience:** [number]

Provide:

1. **ATS Optimization**
   - Keyword suggestions from typical job descriptions
   - Format improvements for ATS parsing
   - Section ordering recommendations

2. **Impact Enhancement**
   - Rewrite bullet points using action verbs + metrics
   - Transform duties into achievements
   - Quantify results where possible

3. **Tailoring Suggestions**
   - What to emphasize for this role
   - What to minimize or remove
   - Skills to highlight

4. **Revised Resume**
   - Complete rewritten version
   - Optimized for both ATS and human readers

Focus on results, not responsibilities.`,
    category: 'business',
    tags: ['chatgpt', 'resume', 'career', 'job-search'],
    aiTool: 'chatgpt',
    difficulty: 'Beginner',
    useCase: 'Job seekers wanting to improve their resume with AI assistance.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['chatgpt resume prompt', 'ai resume optimizer', 'chatgpt for job search', 'resume writing ai'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'suno-indie-folk',
    title: 'Suno Indie Folk Song',
    description: 'Create heartfelt indie folk songs with acoustic guitar and warm vocals.',
    content: `[Indie Folk, Acoustic, Warm]
Fingerpicked acoustic guitar, gentle strumming
Warm male/female vocals, intimate recording
Light percussion, tambourine, soft drums
Nostalgic, authentic, heartfelt

[Verse 1]
[Write about a specific memory or moment]
[Use concrete imagery - places, seasons, small details]
[Keep it conversational and genuine]

[Chorus]
[The emotional core - what this memory means]
[Singable, memorable melody]
[Universal feeling from specific story]

[Verse 2]
[Develop the narrative]
[Add another layer to the story]
[Build toward the bridge]

[Bridge]
[The twist or realization]
[Stripped back - just voice and guitar]
[The emotional peak]

[Final Chorus]
[Return with full arrangement]
[Slight variation in delivery]
[Resolve the emotional journey]

Style tags: indie folk, acoustic, singer-songwriter, warm, nostalgic, 90bpm`,
    category: 'music-creation',
    tags: ['suno', 'indie-folk', 'acoustic', 'singer-songwriter'],
    aiTool: 'suno',
    difficulty: 'Intermediate',
    useCase: 'Creating authentic indie folk songs with emotional depth.',
    tier: 'free',
    productBundle: 'vibe-os',
    seoKeywords: ['suno prompts', 'suno indie folk', 'ai folk music', 'suno acoustic'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'suno-synthwave-retro',
    title: 'Suno 80s Synthwave Track',
    description: 'Create retro synthwave music with neon vibes and driving beats.',
    content: `[Synthwave, 80s Retro, Electronic]
Analog synths, arpeggiated bassline
Gated reverb drums, punchy snare
Lush pads, neon atmosphere
Nostalgic, driving, cinematic

[Intro]
Distant synth pad swells
Arpeggiated sequence builds
Night city awakens

[Verse - Instrumental Build]
Driving bass pulse enters
Snare cuts through the haze
Synth lead dances above

[Chorus - Full Power]
All elements united
Soaring lead melody
Euphoric release

[Breakdown]
Strip to pads and bass
Space and atmosphere
Tension builds again

[Final Chorus - Epic]
Everything returns
Maximum energy
Triumphant finale

[Outro]
Fade into the night
Synths echo and decay
Credits roll

Style: synthwave, retrowave, 80s, electronic, instrumental, 118bpm, neon, outrun`,
    category: 'music-creation',
    tags: ['suno', 'synthwave', '80s', 'retro', 'electronic'],
    aiTool: 'suno',
    difficulty: 'Beginner',
    useCase: 'Creating retro synthwave tracks for content, gaming, or nostalgia.',
    tier: 'free',
    productBundle: 'vibe-os',
    seoKeywords: ['suno synthwave prompt', 'suno 80s music', 'ai synthwave', 'suno retro'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'suno-meditation-432hz',
    title: 'Suno 432Hz Meditation Music',
    description: 'Create healing meditation music tuned to 432Hz for deep relaxation.',
    content: `[Ambient Meditation, 432Hz Healing, Spiritual]
Crystal singing bowls, Tibetan bells
Soft drone pads, nature sounds
Binaural undertones, gentle breath
Healing, transcendent, sacred space

[Opening - 2 minutes]
Silence breaks with distant bell
Single tone establishes space
Breath syncs with slow pulse
Safe container created

[Deepening - 4 minutes]
Layers of harmony emerge
Each tone supports the other
Listener dissolves into sound
Mind releases thought

[Heart Opening - 3 minutes]
Warmest frequencies appear
Unconditional love vibration
Expansion beyond body
Connection to source

[Integration - 3 minutes]
Gently returning
Tones simplify
Body awareness returns
Peace remains

[Closing - 2 minutes]
Final bell
Silence holds the healing
Gratitude vibration
Return renewed

Style: meditation, 432hz, healing, ambient, spiritual, tibetan, binaural, 60bpm, no drums`,
    category: 'music-creation',
    tags: ['suno', 'meditation', 'healing', '432hz', 'ambient'],
    aiTool: 'suno',
    difficulty: 'Intermediate',
    useCase: 'Creating meditation and healing music for personal practice or wellness content.',
    tier: 'premium',
    productBundle: 'vibe-os',
    seoKeywords: ['suno meditation prompt', 'suno healing music', 'ai meditation music', '432hz music ai'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'claude-code-refactor',
    title: 'Claude Code Refactoring Assistant',
    description: 'Use Claude to refactor messy code into clean, maintainable architecture.',
    content: `I need help refactoring this code. Act as a senior software architect.

**Current Code:**
\`\`\`[language]
[PASTE YOUR CODE HERE]
\`\`\`

**Context:**
- What this code does: [brief description]
- Why it needs refactoring: [specific pain points]
- Constraints: [what must stay the same]

**Refactor for:**

1. **Readability**
   - Clear naming conventions
   - Logical function/method organization
   - Appropriate comments (explain WHY, not WHAT)

2. **Maintainability**
   - Single Responsibility Principle
   - DRY (Don't Repeat Yourself)
   - Clear interfaces between components

3. **Performance** (if relevant)
   - Identify inefficiencies
   - Optimize hot paths
   - Consider memory usage

4. **Testability**
   - Extract dependencies for mocking
   - Pure functions where possible
   - Clear input/output contracts

**Output:**
1. Refactored code with inline explanations
2. List of changes made and why
3. Potential future improvements
4. Any risks or breaking changes to watch for`,
    category: 'coding',
    tags: ['claude', 'refactoring', 'code-quality', 'architecture'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Developers improving legacy code or cleaning up technical debt.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['claude code refactor', 'ai code refactoring', 'claude programming', 'code cleanup ai'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'midjourney-album-cover',
    title: 'Midjourney Album Cover Art',
    description: 'Create professional album cover artwork for music releases.',
    content: `Album cover art for [GENRE] music:

**Album Details:**
- Artist/Band: [name]
- Album Title: [title]
- Genre: [specific genre/subgenre]
- Mood: [emotional tone of the music]
- Era/Aesthetic: [modern/retro/futuristic/timeless]

**Prompt Structure:**

[VISUAL CONCEPT], album cover art,
[GENRE] music aesthetic,
[COLOR PALETTE] color scheme,
[STYLE - photographic/illustrated/abstract/mixed media],
[COMPOSITION - centered/asymmetric/minimal/complex],
professional music industry quality,
high contrast, bold typography space,
[MOOD] atmosphere,
[ADDITIONAL STYLE REFERENCES]

--ar 1:1 --stylize [200-750] --quality 2

**Example Prompts:**

Indie Rock:
"Abandoned motel at twilight, neon sign flickering, album cover art, indie rock aesthetic, warm orange and cool blue color scheme, cinematic photography style, rule of thirds composition, nostalgic melancholy atmosphere --ar 1:1 --stylize 350 --q 2"

Electronic:
"Abstract geometric crystal formations, album cover art, electronic music aesthetic, iridescent purple and cyan, 3D rendered style, centered symmetric composition, futuristic transcendent atmosphere --ar 1:1 --stylize 500 --q 2"`,
    category: 'image-generation',
    tags: ['midjourney', 'album-cover', 'music', 'art'],
    aiTool: 'midjourney',
    difficulty: 'Intermediate',
    useCase: 'Musicians and artists creating professional album artwork.',
    tier: 'premium',
    productBundle: 'gencreator-os',
    seoKeywords: ['midjourney album cover', 'ai album art', 'midjourney music', 'album cover generator'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'chatgpt-meal-planner',
    title: 'ChatGPT Weekly Meal Planner',
    description: 'Create personalized weekly meal plans with shopping lists using ChatGPT.',
    content: `Create a personalized weekly meal plan for me:

**My Preferences:**
- Diet type: [omnivore/vegetarian/vegan/keto/paleo/etc.]
- Allergies/restrictions: [list any]
- Cooking skill: [beginner/intermediate/advanced]
- Time available: [quick meals only / enjoy cooking / mix]
- Budget: [budget-friendly / moderate / no limit]
- Household size: [number of people]

**Goals:**
- [lose weight / maintain / gain muscle / just eat healthier]
- [meal prep friendly / fresh daily / mix]

**Provide:**

1. **7-Day Meal Plan**
   For each day: Breakfast, Lunch, Dinner, Snacks
   Include estimated calories and prep time

2. **Shopping List** organized by section

3. **Meal Prep Guide** - what to prep on Sunday

4. **Quick Swaps** - alternatives for each meal

Format as an easy-to-follow weekly guide.`,
    category: 'productivity',
    tags: ['chatgpt', 'meal-planning', 'nutrition', 'health'],
    aiTool: 'chatgpt',
    difficulty: 'Beginner',
    useCase: 'Anyone wanting to plan healthy meals efficiently.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['chatgpt meal plan', 'ai meal planner', 'chatgpt nutrition', 'weekly meal plan ai'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'chatgpt-study-notes',
    title: 'ChatGPT Study Notes Generator',
    description: 'Transform any material into effective study notes using ChatGPT.',
    content: `Transform this material into effective study notes:

**Source Material:**
[PASTE YOUR TEXTBOOK CHAPTER, LECTURE NOTES, OR ARTICLE]

**Study Context:**
- Subject: [the topic/course]
- Exam type: [multiple choice/essay/practical]
- Learning style: [visual/reading/kinesthetic]

**Create study notes including:**

1. **Executive Summary** - main point in plain language
2. **Key Concepts** - bullet points with bolded terms
3. **Visual Aid** - concept map description
4. **Mnemonics** - memory tricks and acronyms
5. **Practice Questions** - 5 self-test questions with answers
6. **Quick Review Card** - 10 most important facts

Make it easy to review in 10 minutes.`,
    category: 'learning',
    tags: ['chatgpt', 'study', 'notes', 'education'],
    aiTool: 'chatgpt',
    difficulty: 'Beginner',
    useCase: 'Students wanting to create effective study materials quickly.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['chatgpt study notes', 'ai study helper', 'chatgpt for students', 'study prompts ai'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  {
    id: 'dalle-social-media-graphics',
    title: 'DALL-E Social Media Graphics',
    description: 'Create scroll-stopping social media graphics with DALL-E.',
    content: `Create a social media graphic:

**Details:**
- Platform: [Instagram/LinkedIn/Twitter]
- Post type: [quote card/announcement/tutorial preview]
- Brand colors: [list your colors]
- Mood: [professional/playful/inspiring]

**Prompt Templates:**

Quote Card:
"Minimalist [COLOR] gradient background, elegant typography space in center, subtle texture overlay, modern aesthetic, clean design, professional social media graphic --ar [ASPECT RATIO]"

Announcement:
"Dynamic [COLOR SCHEME] composition, celebratory elements, bold graphic shapes, excitement and movement, clear focal point for text overlay --ar [ASPECT RATIO]"

**Aspect Ratios:**
- Instagram Post: --ar 1:1
- Instagram Story: --ar 9:16
- LinkedIn: --ar 1.91:1
- Twitter: --ar 16:9`,
    category: 'image-generation',
    tags: ['dalle', 'social-media', 'graphics', 'marketing'],
    aiTool: 'dalle',
    difficulty: 'Beginner',
    useCase: 'Content creators making eye-catching social media visuals.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['dalle social media', 'ai social graphics', 'dalle marketing', 'social media image ai'],
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
  // ========================================
  // 2026 CUTTING-EDGE PROMPTS
  // Atom-of-Thoughts, Meta-Prompting, Contract-Style
  // ========================================
  {
    id: 'aot-parallel-reasoning',
    title: 'Atom-of-Thoughts Parallel Reasoner',
    description: 'Solve complex problems with structured parallel atomic reasoning chains.',
    content: `You are operating in ATOM-OF-THOUGHTS MODE. Solve this problem using parallel reasoning chains.

**PROBLEM TO SOLVE:**
[PASTE YOUR PROBLEM HERE]

**ATOMIC REASONING TASKS (execute all in parallel):**

ATOM 1: First Principles Analysis
- Break the problem into fundamental components
- Identify what is truly essential vs. assumed
- Question any "obvious" assumptions
- Deliverable: 3-5 fundamental truths

ATOM 2: Constraint Mapping
- List ALL constraints (time, resources, knowledge, political)
- Classify each as: [HARD CONSTRAINT] or [PREFERENCE]
- Identify which constraints are self-imposed vs. external
- Deliverable: Constraint matrix with priorities

ATOM 3: Analogical Reasoning
- Find 3+ analogous situations from different domains
- What worked in those situations? Why?
- What will not transfer? Why?
- Deliverable: 3 transferable insights

ATOM 4: Risk Analysis
- What could go wrong? (Brainstorm 10+ failure modes)
- Which failures are probable vs. catastrophic?
- What contingencies would mitigate top 3 risks?
- Deliverable: Risk matrix with mitigation strategies

ATOM 5: Outcome Generation
- Generate 5+ different solution approaches
- For each: estimate probability of success, resources needed
- Consider combinations and hybrids
- Deliverable: Ranked options with trade-offs

**SYNTHESIS PHASE:**
Review all atoms. Identify:
1. The single most promising approach
2. The biggest risk to address immediately
3. One unconventional idea worth exploring
4. The key assumption to test first

**OUTPUT FORMAT:**
<ATOM 1 FINDINGS>
<ATOM 2 FINDINGS>
<ATOM 3 FINDINGS>
<ATOM 4 FINDINGS>
<ATOM 5 FINDINGS>
---
<RECOMMENDED APPROACH with justification>
<NEXT STEPS for immediate execution>`,
    category: 'ai-architecture',
    tags: ['atom-of-thoughts', 'aot', 'parallel-reasoning', 'chain-of-thought', 'advanced-reasoning'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Complex problem-solving where multiple perspectives improve outcomes.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['atom of thoughts', 'parallel reasoning ai', 'aot prompting', 'chain of thought optimization'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z',
  },
  {
    id: 'meta-prompting-v2',
    title: 'Meta-Prompting v2 Generator',
    description: 'Generate optimized prompts for any AI task with context-aware template creation.',
    content: `You are a META-PROMPT GENERATOR. Your task is to create an optimized prompt for the specified AI task.

**TASK CONTEXT:**
[DESCRIBE THE TASK YOU WANT AI TO ACCOMPLISH]
[INCLUDE: desired output format, audience, constraints, tone]

**META-PROMPT GENERATION STEPS:**

1. DECOMPOSE THE TASK
   - What is the core objective?
   - What subtasks are required?
   - What decisions must be made during execution?
   - What outputs are expected?

2. IDENTIFY BEST PATTERN
   [ ] Chain of Thought (sequential reasoning)
   [ ] Tree of Thought (branching exploration)
   [ ] ReAct (reasoning + action loops)
   [ ] Atom-of-Thoughts (parallel processing)
   [ ] Constitutional AI (principle-constrained)
   [ ] Contract-Style (precise specifications)

3. DESIGN TEMPLATE SECTIONS
   - Role definition (if applicable)
   - Context establishment
   - Task specification
   - Constraint specification
   - Output format definition
   - Quality criteria

4. ADD UNCERTAINTY HANDLERS
   - What to do if task is ambiguous
   - When to ask for clarification
   - What to do if insufficient information
   - How to handle edge cases

5. OPTIMIZE FOR TARGET MODEL
   [ ] Claude (prefer prose, detailed reasoning)
   [ ] ChatGPT (clear structure, conversational)
   [ ] Gemini (fact-heavy, concise)
   [ ] General (universal clarity)

**OUTPUT YOUR META-PROMPT:**
\`\`\`
<YOUR GENERATED PROMPT HERE>
\`\`\`

**META-PROMPT METRICS:**
- Clarity Score (1-10): <estimate>
- Completeness Score (1-10): <estimate>
- Model Optimization: <which model it's tuned for>
- Estimated Effectiveness: <expected improvement over baseline>`,
    category: 'ai-architecture',
    tags: ['meta-prompting', 'prompt-generation', 'template-creator', 'ai-to-ai'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Creating production-quality prompts for specific AI tasks.',
    tier: 'paid',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['meta prompting', 'prompt generator', 'ai prompt template', 'meta-prompting v2'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z',
  },
  {
    id: 'contract-style-system',
    title: 'Contract-Style System Prompt',
    description: 'Enterprise-grade AI behavior specification with legal-precision contracts.',
    content: `You are operating under CONTRACT MODE. All interactions are governed by this behavioral contract.

**BEHAVIORAL CONTRACT**

1. IDENTITY & SCOPE
   - YOU ARE: [role/identity specification]
   - YOU ARE NOT: [explicit exclusions]
   - SCOPE: [what you can help with]
   - JURISDICTION: [when to defer or escalate]

2. OPERATIONAL RULES (shall/must)
   - Rule 1: [specific behavior requirement]
   - Rule 2: [specific behavior requirement]
   - Rule 3: [specific behavior requirement]
   - Rule N: [specific behavior requirement]

3. PROHIBITED ACTIONS (shall not/must not)
   - Prohibition 1: [specific forbidden action]
   - Prohibition 2: [specific forbidden action]
   - Prohibition N: [specific forbidden action]

4. QUALITY STANDARDS
   - Response must contain: [required elements]
   - Response must avoid: [forbidden patterns]
   - Response must achieve: [success metrics]

5. ESCALATION PROTOCOL
   - IF [condition 1]: THEN [action]
   - IF [condition 2]: THEN [action]
   - IF [condition N]: THEN [action]

6. UNCERTAINTY HANDLING
   - AMBIGUITY: [how to handle unclear requests]
   - INCOMPLETE: [how to handle partial information]
   - CONFLICTING: [how to handle contradictory requirements]

7. AMENDMENTS & DEVIATIONS
   - Only deviated via: [approval process]
   - Documentation required: [what to record]
   - Emergency procedures: [what to do in critical situations]

**CONTRACTUAL ENFORCEMENT:**
All provisions are binding. Violations must be flagged explicitly with reference to the violated clause.

**EFFECTIVE DATE:** [2026-01-28]
**VERSION:** 1.0
**APPROVAL:** [stakeholder acknowledgment]`,
    category: 'ai-architecture',
    tags: ['contract-style', 'system-prompt', 'legal-precision', 'enterprise', 'behavior-specification'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Enterprise deployments requiring consistent, auditable AI behavior.',
    tier: 'paid',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['contract prompting', 'system prompt enterprise', 'legal ai behavior', 'ai governance'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z',
  },
  {
    id: 'context-first-ordering',
    title: 'Context-First Ordered Response',
    description: 'Generate responses with attention-weighted information placement for 30% quality boost.',
    content: `You are operating in CONTEXT-FIRST MODE. Information placement follows attention-weighting principles.

**INPUT CONTEXT:**
[PROVIDE ALL BACKGROUND INFORMATION HERE]
[Priortize by importance - most critical first]

**ATTENTION WEIGHTING RULES:**

TIER 1 - HIGHEST ATTENTION (appears first, emphasized)
- Direct answer to the question
- Critical decision information
- Safety/accuracy warnings
- Time-sensitive content

TIER 2 - MEDIUM ATTENTION (appears second, structured)
- Supporting evidence and reasoning
- Context necessary for understanding
- Alternative perspectives
- Examples and illustrations

TIER 3 - LOWEST ATTENTION (appears third, summarized)
- Background information
- Nice-to-know details
- References and citations
- Extended context

**RESPONSE STRUCTURE:**

## 1. DIRECT RESPONSE [TIER 1]
[One sentence answer if possible]
[2-3 sentences maximum elaboration]

## 2. SUPPORTING CONTEXT [TIER 2]
### Key Reasoning
[Essential logical steps]

### Critical Evidence
[Most important data points]

### Important Considerations
[What affects the answer significantly]

## 3. ADDITIONAL CONTEXT [TIER 3]
### Background
[Brief context if needed]

### References
[Where to learn more]

### Related Topics
[Connected concepts]

**ATTENTION VERIFICATION:**
Before finalizing, verify:
- [ ] Tier 1 content is truly the first thing seen
- [ ] Each tier has appropriate emphasis (bold/key points)
- [ ] No important Tier 1 content buried in Tier 3
- [ ] Response length proportional to tier importance`,
    category: 'ai-architecture',
    tags: ['context-first', 'attention-weighting', 'information-ordering', 'response-optimization'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Creating responses where information hierarchy dramatically improves outcomes.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['context first prompting', 'attention weighting', 'information ordering ai', 'response structure'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z',
  },
  {
    id: 'self-consistency-loop',
    title: 'Self-Consistency Loop Generator',
    description: 'Generate multiple reasoning attempts with built-in verification and synthesis.',
    content: `You are operating in SELF-CONSISTENCY MODE. Multiple reasoning paths will be generated, verified, and synthesized.

**TARGET QUESTION:**
[THE QUESTION YOU NEED ANSWERED]

**SELF-CONSISTENCY PROTOCOL:**

**PASS 1 - Direct Approach**
[Generate initial answer using standard reasoning]
- Confidence: [1-10]
- Key assumptions: [list]
- Potential biases: [list]

**PASS 2 - Contrarian View**
[Challenge the Pass 1 conclusion from opposite perspective]
- What would prove Pass 1 wrong?
- What is the strongest counter-argument?
- What data contradicts Pass 1?

**PASS 3 - Systematic Review**
[Apply systematic analysis framework]
- Check each assumption for validity
- Verify each logical step
- Identify any gaps or fallacies

**PASS 4 - Simplified Test**
[Strip to bare essentials]
- What is the simplest version of this problem?
- What would a naive/beginner answer?
- Where might complexity be hiding errors?

**VERIFICATION PHASE:**
Compare all passes:
- Points of agreement (robust conclusions)
- Points of disagreement (requires resolution)
- Points of uncertainty (requires clarification)

**SYNTHESIS:**
Best Answer: [Consensus or majority view]
Confidence Level: [High/Medium/Low]
Remaining Uncertainties: [Open questions]
Key Insight: [The most important takeaway]
Follow-up Needed: [What would increase confidence?]`,
    category: 'ai-architecture',
    tags: ['self-consistency', 'multi-pass', 'verification', 'reasoning-loops'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Critical decisions where multiple perspectives reduce error rates.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['self consistency prompting', 'multi-pass reasoning', 'ai verification', 'reasoning loops'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z',
  },
  {
    id: 'explicit-scope-discipline',
    title: 'Explicit Scope Discipline Prompt',
    description: 'Prevent task drift and maintain focus with explicit boundary enforcement.',
    content: `You are operating in SCOPE-DISCIPLINE MODE. Task boundaries are explicit and monitored.

**ORIGINAL TASK:**
[THE EXACT TASK AS INITIALLY STATED]
[Original constraints]: [list]
[Original objectives]: [list]

**SCOPE BOUNDARIES:**

WITHIN SCOPE:
- [ ] Primary deliverable
- [ ] Necessary supporting tasks
- [ ] Core requirements met
- [ ] Success criteria achieved

OUT OF SCOPE (explicit exclusions):
- [ ] Feature Creep Prevention: [what NOT to add]
- [ ] Scope Expansion Prevention: [boundaries not to cross]
- [ ] Distraction Prevention: [unrelated topics to avoid]
- [ ] Solution Constraining: [method limitations]

**DISCIPLINE PROTOCOLS:**

1. DRIFT DETECTION
   IF I begin addressing a topic NOT in scope:
   → PAUSE
   → FLAG the drift
   → ASK: "Should this be added to scope?"
   → WAIT for authorization before proceeding

2. VALUE VS NOISE FILTER
   IF content does not directly advance objectives:
   → Is this essential? → Include with note
   → Is this helpful but optional? → Offer as "nice to know"
   → Is this tangential? → Exclude with brief note

3. FOCUS MAINTAINERS
   Every paragraph must answer: "Does this advance the original task?"
   If NO: Consider removing or repositioning

**EXIT CRITERIA:**
Task is complete when ALL of these are true:
- [ ] Primary deliverable produced
- [ ] Original constraints satisfied
- [ ] Success criteria met
- [ ] No scope violations detected in output
- [ ] Response is focused, not scattered

**DRIFT LOG:**
[Track any times scope was questioned or modified]
[Record: date, drift attempted, action taken]`,
    category: 'ai-architecture',
    tags: ['scope-discipline', 'anti-drift', 'focus-maintenance', 'task-boundaries'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Preventing feature creep and maintaining focus in complex projects.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['scope discipline prompting', 'anti drift', 'task focus ai', 'feature creep prevention'],
    createdAt: '2026-01-28T00:00:00.000Z',
    updatedAt: '2026-01-28T00:00:00.000Z',
  },

  // ============================================================================
  // AI CENTER OF EXCELLENCE — Personal & Creator CoE Prompts (Mar 2026)
  // ============================================================================

  {
    id: 'personal-ai-coe-blueprint',
    title: 'Personal AI Center of Excellence Blueprint',
    description: 'Design a comprehensive personal AI CoE across 7 life domains — the same framework enterprises pay consultants to build, adapted for individuals.',
    content: `You are an AI Center of Excellence architect. Your task is to design a personal AI CoE for an individual based on their goals and current capabilities.

## Context
I want to build my own AI Center of Excellence — a structured system that integrates AI across my personal and professional life, the way enterprises build AI CoE for their organizations.

## My Profile
- Primary role: [YOUR ROLE — e.g., software engineer, creator, founder, student]
- AI experience level: [beginner / intermediate / advanced]
- Top 3 goals for the next 90 days:
  1. [GOAL 1]
  2. [GOAL 2]
  3. [GOAL 3]

## Instructions
Design my Personal AI CoE across these 7 domains. For each domain, provide:

1. **Current State Assessment** — What most people do without AI in this domain
2. **AI-Augmented State** — What becomes possible with the right AI integration
3. **Recommended Stack** — Specific tools (name the actual products, 2026 versions)
4. **First Week Quick Win** — One action I can take in the next 7 days
5. **90-Day Milestone** — What "good" looks like after 3 months
6. **Compound Effect** — How this domain amplifies the others

### The 7 Domains:
1. **Creative Production** — Content, music, visual art, writing
2. **Knowledge & Research** — Learning, synthesis, staying current
3. **Health & Fitness** — Training, nutrition, sleep, recovery tracking
4. **Business Intelligence** — Market analysis, competitive research, decision-making
5. **Personal Operations** — Calendar, email, task management, automation
6. **Financial Intelligence** — Budgeting, investing, tax planning, opportunity spotting
7. **Family & Relationships** — Shared knowledge, education, travel planning, memories

## Output Format
For each domain, use this structure:

### Domain N: [Name]
**Current state:** [1 sentence]
**AI-augmented state:** [1 sentence]
**Stack:** [Tool 1] + [Tool 2] + [Tool 3]
**Quick win:** [Specific action with expected time: 30min]
**90-day milestone:** [Measurable outcome]
**Compound effect:** [How this feeds other domains]

After all 7 domains, provide:
- **Integration Map:** How the domains connect (which outputs feed which inputs)
- **Priority Sequence:** Which domain to build first, second, third (with reasoning)
- **Total weekly time investment:** Realistic hours per week to maintain the system`,
    category: 'ai-architecture',
    tags: ['ai-coe', 'personal-ai', 'systems-design', 'life-design', 'ai-strategy', 'center-of-excellence'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Building a structured AI integration system across all areas of your life — from creative work to health to finances.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['personal ai center of excellence', 'ai coe for individuals', 'ai life system', 'personal ai strategy', 'ai integration framework'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'ai-coe-maturity-assessment',
    title: 'AI CoE Maturity Self-Assessment',
    description: 'Score your current AI integration maturity across 7 dimensions using the enterprise CoE maturity model adapted for individuals. Get a radar chart and growth roadmap.',
    content: `You are an AI maturity assessment specialist. Evaluate my current AI integration maturity and produce a scored assessment with actionable growth paths.

## My Current AI Usage
Describe how you currently use AI (be specific about tools, frequency, and what you use them for):

[PASTE YOUR DESCRIPTION HERE — Example: "I use ChatGPT for writing emails and brainstorming. I've tried Midjourney a few times for images. I don't use AI for coding, health, or finances."]

## Assessment Framework
Score each dimension from 1-5 using these maturity levels:

| Level | Name | Definition |
|-------|------|------------|
| 1 | Exploring | Occasional, unstructured AI use. Copy-paste prompting. |
| 2 | Experimenting | Regular use in 1-2 domains. Starting to see patterns. |
| 3 | Integrating | AI embedded in daily workflows. Custom prompts and templates. |
| 4 | Orchestrating | Multi-tool systems. Automation between AI tools. Persistent memory. |
| 5 | Compounding | Self-improving systems. AI agents working autonomously. Measurable ROI. |

## The 7 Dimensions to Score:

1. **Prompt Sophistication** — How advanced are your prompts? (One-liners → structured multi-step → agent orchestration)
2. **Tool Breadth** — How many AI tools do you actively use? (1 tool → 3-5 tools → integrated ecosystem)
3. **Workflow Integration** — Is AI embedded in your workflows or separate? (Manual copy-paste → API integration → autonomous pipelines)
4. **Knowledge Management** — Do your AI interactions build on each other? (Ephemeral chats → saved prompts → persistent memory systems)
5. **Output Quality** — What quality do you achieve? (Raw AI output → edited → indistinguishable from expert human work)
6. **Domain Coverage** — How many life/work domains benefit from AI? (1 domain → 3-4 → all 7 CoE domains)
7. **Time ROI** — How much time does AI save you weekly? (Negligible → 2-5hrs → 10+ hrs with measurable value)

## Output Requirements

1. **Score Table** — Each dimension with score, evidence, and gap analysis
2. **ASCII Radar Chart** — Visual representation of the 7 scores
3. **Overall Maturity Level** — Weighted average with interpretation
4. **Top 3 Growth Levers** — The dimensions where small improvements yield biggest gains
5. **30-Day Action Plan** — Specific steps to move your lowest dimension up by 1 level
6. **Benchmark Context** — Where this score places you relative to typical professionals (top 50%, top 20%, top 5%)`,
    category: 'ai-architecture',
    tags: ['ai-coe', 'assessment', 'maturity-model', 'self-evaluation', 'ai-strategy'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Understanding where you stand in AI adoption and getting a clear roadmap for improvement.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['ai maturity assessment', 'ai coe maturity model', 'personal ai score', 'ai adoption level', 'ai readiness assessment'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'creator-ai-operations-manual',
    title: 'Creator AI Operations Manual Generator',
    description: 'Build a complete AI operations playbook for your creative practice — tool selection, workflow design, quality gates, and publishing pipelines.',
    content: `You are a creator operations architect. Design a complete AI operations manual for a content creator based on their creative practice and publishing cadence.

## My Creator Profile
- Content types I produce: [e.g., blog posts, YouTube videos, music, courses, newsletters]
- Publishing frequency: [e.g., 2 blog posts/week, 1 video/month, daily social]
- Current tools: [list your current tools]
- Biggest bottleneck: [what slows you down most]
- Revenue model: [how you monetize — ads, products, services, sponsorships]

## Build My AI Ops Manual

### Section 1: Content Production Pipeline
For each content type I produce, design a pipeline with these stages:
- **Ideation** → AI tool + prompt template for generating ideas
- **Research** → How AI gathers and synthesizes source material
- **Draft** → Which AI assists drafting and how (full generation vs. outline vs. editing)
- **Quality Gate** → Human checkpoints + AI review prompts
- **Publishing** → Automation for formatting, scheduling, distribution
- **Amplification** → AI-generated social posts, repurposing, SEO optimization

### Section 2: Tool Stack Architecture
Design a tool stack diagram showing:
- Primary AI tools (with specific use case for each)
- Integration points between tools (what passes data to what)
- Human-in-the-loop touchpoints
- Cost estimate per month

### Section 3: Prompt Library Structure
Create a categorized prompt library with:
- 3 production prompts per content type (the ones I'll use daily)
- Quality review prompt (for self-editing)
- Repurposing prompt (long-form → social → email)

### Section 4: Weekly Operations Rhythm
Design a weekly cadence:
| Day | Morning (1hr) | Afternoon (1hr) | AI Running in Background |
|-----|--------------|-----------------|--------------------------|

### Section 5: Quality Standards
Define measurable quality criteria:
- Brand voice consistency check (provide a rubric)
- Factual accuracy verification process
- Originality threshold (what % AI-generated is acceptable for each content type)
- SEO optimization checklist

### Section 6: Growth Metrics
3 metrics to track monthly that prove the AI ops system is working:
- Output volume change
- Time-per-piece change
- Revenue-per-piece change`,
    category: 'ai-architecture',
    tags: ['ai-coe', 'creator-ops', 'content-pipeline', 'workflow-design', 'operations-manual'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Content creators who want to systematize their AI-assisted workflow into a repeatable, scalable operation.',
    tier: 'free',
    productBundle: 'gencreator-os',
    seoKeywords: ['creator ai operations', 'content creation ai workflow', 'ai ops manual creator', 'ai content pipeline', 'creator ai system'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'ai-coe-founder-intelligence',
    title: 'Founder AI Intelligence System',
    description: 'Build a competitive intelligence and decision-support AI system for founders — market monitoring, competitor tracking, and strategic analysis on autopilot.',
    content: `You are a strategic intelligence architect for founders. Design a comprehensive AI-powered intelligence system that gives a solo founder or small team the analytical capabilities of a large corporation.

## My Business Context
- Company stage: [pre-revenue / early revenue / scaling / established]
- Industry: [YOUR INDUSTRY]
- Team size: [number]
- Monthly AI budget: [$ amount]
- Top 3 competitors: [COMPETITOR 1, COMPETITOR 2, COMPETITOR 3]
- Key decisions I need to make this quarter: [list 2-3]

## Design My Intelligence System

### Layer 1: Market Monitoring (Automated, Daily)
Set up automated intelligence gathering:
- **Competitor Watch** — What to monitor (pricing changes, feature launches, hiring, funding)
- **Industry Signals** — News sources, research papers, regulatory changes
- **Customer Voice** — Review sites, social mentions, forum discussions
- **Tool recommendation** — Specific tools + setup instructions for automated monitoring

### Layer 2: Analysis & Synthesis (AI-Assisted, Weekly)
Design weekly analysis workflows:
- **Competitive Position Map** — Prompt template for analyzing your position vs competitors
- **Opportunity Radar** — Framework for spotting gaps in the market
- **Risk Scanner** — Systematic threat identification prompt
- **Trend Synthesis** — Prompt that takes raw signals and produces actionable insights

Provide the exact prompts I should run weekly, including where to paste the monitored data.

### Layer 3: Decision Support (On-Demand)
Create decision frameworks:
- **Go/No-Go Evaluator** — Structured prompt for evaluating new opportunities
- **Pricing Strategy Analyzer** — Data-driven pricing decision support
- **Hire vs. Build vs. Buy** — Framework for resource allocation decisions
- **Pivot Detector** — Prompt that evaluates whether current strategy needs adjustment

### Layer 4: Reporting & Communication
- **Investor Update Generator** — Monthly metrics → narrative prompt
- **Board Memo Template** — Strategic situation → formal memo prompt
- **Team Brief Generator** — Intelligence findings → actionable team brief

### Integration Architecture
Show how these layers connect:
- What data flows from Layer 1 → Layer 2
- What triggers Layer 3 analysis
- How Layer 4 pulls from all layers
- Total time investment: hours per week at each layer`,
    category: 'business',
    tags: ['ai-coe', 'founder', 'competitive-intelligence', 'business-strategy', 'startup', 'decision-support'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Founders and small teams who want enterprise-grade competitive intelligence without the enterprise budget.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['founder ai intelligence', 'startup competitive intelligence ai', 'ai business intelligence founder', 'ai coe for startups', 'founder decision support ai'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'family-ai-coe-setup',
    title: 'Family AI Center of Excellence',
    description: 'Design an age-appropriate AI integration system for families — education, creativity, travel planning, shared knowledge, and digital safety.',
    content: `You are a family technology architect specializing in age-appropriate AI integration. Design a Family AI Center of Excellence that enhances learning, creativity, and connection while maintaining safety and healthy boundaries.

## My Family Profile
- Adults: [number and roles — e.g., 2 parents, 1 working in tech, 1 in education]
- Children: [ages and interests — e.g., daughter 10 (art, science), son 7 (Minecraft, reading)]
- Family values around technology: [e.g., limited screen time, education-first, creative use encouraged]
- Current AI/tech usage: [what do you already use as a family]

## Design Our Family AI CoE

### Domain 1: Education & Learning
For each child (by age group), recommend:
- **AI tutoring tools** — Specific recommendations with safety features
- **Learning projects** — AI-assisted projects that build skills (not replace learning)
- **Curiosity engine** — How to use AI to explore questions together as a family
- **Safety guardrails** — What supervision level for each age

### Domain 2: Creative Family Projects
Design 5 AI-assisted family activities:
- Each should take 30-60 minutes
- Each should produce something tangible (art, story, music, video)
- Each should involve ALL family members with age-appropriate roles
- Include the exact prompts to use

### Domain 3: Travel & Experience Planning
- **Trip Research Agent** — Prompt for planning family-friendly trips with budget awareness
- **Day Trip Generator** — "We have 4 hours on Saturday" → optimized local adventure plan
- **Memory Capture System** — How to use AI to organize and narrate family photos/videos

### Domain 4: Shared Family Knowledge Base
Design a family knowledge system:
- **Recipe Collection** — AI-organized family recipes with substitution suggestions
- **Health Records** — What's safe to track, what's not (privacy boundaries)
- **Family History** — Using AI to organize and preserve family stories
- **Learning Library** — Shared bookmarks, articles, videos curated by AI

### Domain 5: Digital Safety & Boundaries
- **Age-appropriate access rules** — What AI tools at what age
- **Conversation guidelines** — What topics children should and shouldn't explore with AI
- **Weekly family tech review** — 15-minute family discussion template
- **Red flags to watch for** — Signs of unhealthy AI dependency by age group

## Output Format
For each domain provide:
- Setup time (one-time)
- Weekly maintenance time
- Cost (monthly)
- Age-appropriateness matrix
- First activity to try this weekend`,
    category: 'personal-development',
    tags: ['ai-coe', 'family', 'education', 'parenting', 'digital-safety', 'family-ai'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Parents who want to thoughtfully integrate AI into family life — enhancing learning and creativity while maintaining safety.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['family ai center of excellence', 'ai for families', 'family ai tools', 'ai parenting guide', 'children ai safety'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'health-fitness-ai-coe',
    title: 'Health & Fitness AI Center of Excellence',
    description: 'Design an AI-powered health optimization system — training programming, nutrition planning, sleep analysis, and recovery tracking with measurable outcomes.',
    content: `You are a health optimization architect combining exercise science, nutrition research, and AI systems design. Build a comprehensive Health & Fitness AI CoE for an individual.

## My Health Profile
- Age: [AGE] | Gender: [M/F/Other] | Height: [HEIGHT] | Weight: [WEIGHT]
- Training experience: [beginner / intermediate / advanced]
- Current routine: [describe briefly]
- Primary goal: [fat loss / muscle gain / endurance / longevity / general health]
- Dietary preferences: [omnivore / vegetarian / vegan / keto / other]
- Available equipment: [home gym / commercial gym / bodyweight only]
- Known limitations: [injuries, conditions, time constraints]
- Wearable devices: [Apple Watch / Whoop / Oura / Garmin / none]

## Build My Health AI CoE

### Pillar 1: Training Intelligence
Design an AI-assisted training system:
- **Program Design Prompt** — Generate a periodized training program based on my profile
- **Exercise Selection Logic** — How AI picks exercises based on equipment, goals, recovery state
- **Progressive Overload Tracker** — Prompt to analyze training logs and recommend load increases
- **Deload Decision Engine** — When to reduce volume based on performance trends
- Provide the EXACT prompt I should use before every training week

### Pillar 2: Nutrition Engine
- **Meal Plan Generator** — Macro-aware meal planning prompt with grocery list output
- **Post-Workout Nutrition** — Timing and composition recommendations
- **Supplement Stack Analyzer** — Evidence-based supplement review prompt (cite studies)
- **Restaurant Navigator** — Prompt for making best choices when eating out
- Include calorie and macro targets based on my stated goal

### Pillar 3: Recovery & Sleep
- **Sleep Quality Analyzer** — Prompt for interpreting wearable sleep data
- **Recovery Score Calculator** — Subjective + objective markers combined
- **Stress-Recovery Balance** — How to use HRV data with AI interpretation
- **Active Recovery Prescriber** — What to do on rest days based on previous training load

### Pillar 4: Progress Tracking & Adaptation
- **Weekly Check-In Prompt** — Structured self-assessment (weight, energy, performance, mood)
- **Monthly Progress Report** — Prompt that takes 4 weekly check-ins and produces trend analysis
- **Plateau Breaker** — When progress stalls, this prompt analyzes possible causes and solutions
- **Quarterly Program Refresh** — Full program redesign based on 3 months of data

### Pillar 5: Longevity & Preventive Health
- **Blood Work Interpreter** — Prompt for understanding lab results (with caveats about medical advice)
- **Biomarker Trend Analyzer** — Tracking changes over time
- **Research Digest** — Prompt for summarizing latest exercise science papers relevant to my goals

## Integration
Show how these pillars connect — training data feeds nutrition, sleep quality affects training recommendations, all data flows into monthly reviews.`,
    category: 'personal-development',
    tags: ['ai-coe', 'health', 'fitness', 'nutrition', 'training', 'recovery', 'longevity'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Anyone serious about health and fitness who wants to apply systematic AI-assisted optimization to their training, nutrition, and recovery.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['health ai center of excellence', 'ai fitness system', 'ai training program', 'health optimization ai', 'ai nutrition planning'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'enterprise-to-personal-coe-translator',
    title: 'Enterprise-to-Personal AI CoE Translator',
    description: 'Take any enterprise AI Center of Excellence framework and translate it into a personal implementation — governance becomes habits, committees become automations.',
    content: `You are an expert at translating enterprise AI frameworks into personal systems. Your unique skill is seeing the structural parallels between how Fortune 500 companies organize AI adoption and how individuals can apply the same principles.

## The Enterprise Framework I Want to Translate
[PASTE an enterprise AI CoE framework, or describe one. Examples:
- "The 6 pillars of enterprise AI CoE: Strategy, Governance, Talent, Technology, Data, Ethics"
- "McKinsey's AI transformation playbook"
- "Oracle's AI Center of Excellence methodology"
- Or paste a specific framework document/slide]

## Translation Rules
Apply these mappings:

| Enterprise Concept | Personal Translation |
|---|---|
| AI Strategy Committee | Weekly 30-min self-review |
| Governance Framework | Personal AI usage rules (written, 1 page) |
| Talent Development | Skill-building schedule (2 hrs/week) |
| Technology Platform | Personal tool stack (under $50/month) |
| Data Infrastructure | Personal knowledge base (notes, files, memories) |
| Ethics Board | Values checklist before publishing AI-assisted work |
| Change Management | Habit formation (start with 1 domain, add 1 per month) |
| ROI Measurement | Time-saved tracking (simple spreadsheet) |
| Center of Excellence Team | You + your AI agents |
| Enterprise Use Cases | Life domains (creative, health, finance, learning) |
| Pilot Program | 2-week experiment with 1 tool in 1 domain |
| Production Deployment | Daily integrated workflow |
| MLOps Pipeline | Prompt library + saved workflows |
| Model Selection | Tool selection per task type |

## Output
For the framework I provided, produce:

1. **Side-by-Side Translation** — Each enterprise element → personal equivalent with explanation
2. **Implementation Timeline** — Enterprise: 6-18 months → Personal: 2-8 weeks
3. **Cost Comparison** — Enterprise: $500K-$5M → Personal: $0-$100/month
4. **What You Gain** — The actual enterprise capabilities this gives you
5. **What You Skip** — Enterprise complexity that individuals genuinely don't need
6. **First Week Playbook** — Day-by-day setup for the personal version

The key insight: enterprises need AI CoE because they have coordination problems between thousands of people. You need a personal AI CoE because you have coordination problems between dozens of tools, workflows, and life domains. The architecture is the same. The scale is different.`,
    category: 'ai-architecture',
    tags: ['ai-coe', 'enterprise-ai', 'personal-ai', 'framework-translation', 'ai-strategy'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Professionals who understand enterprise AI frameworks and want to apply the same rigor to their personal AI adoption.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['enterprise ai coe to personal', 'ai coe framework translation', 'personal ai governance', 'enterprise ai individual', 'ai center of excellence personal'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'ai-agent-orchestra-designer',
    title: 'Multi-Agent Orchestra Designer',
    description: 'Design a personal multi-agent system where specialized AI agents handle different life domains — with handoff protocols, shared memory, and orchestration logic.',
    content: `You are a multi-agent systems architect. Design a personal agent orchestra — a coordinated system of specialized AI agents that handle different domains of life and work, with clear protocols for communication, handoff, and shared context.

## My Context
- Domains I want agents for: [e.g., writing, research, code, health, finance, email]
- Primary AI platform: [Claude / ChatGPT / both / other]
- Technical skill level: [can I write code? use APIs? or GUI-only?]
- Budget: [monthly AI spend limit]

## Design My Agent Orchestra

### Agent Roster
For each domain, design a specialized agent:
- **Name** — A clear functional name (not cute names — operational clarity)
- **Role** — One-sentence mission statement
- **Capabilities** — What this agent can do (5-7 bullet points)
- **Tools/MCP Servers** — What external tools this agent needs access to
- **Input Format** — What information this agent expects to receive
- **Output Format** — What this agent produces
- **Quality Standard** — How to evaluate if this agent performed well
- **Failure Mode** — What happens when this agent can't complete a task

### Orchestration Protocol
Design the coordination layer:
- **Task Router** — Decision tree for "which agent handles this request?"
- **Handoff Protocol** — How Agent A passes work to Agent B (format, context, metadata)
- **Shared Memory** — What all agents can access (user preferences, past decisions, ongoing projects)
- **Conflict Resolution** — When two agents have conflicting recommendations
- **Escalation Path** — When should the human (me) be pulled in?

### Implementation Tiers
Design three implementation levels:

**Tier 1: Prompt-Based (Free, Start Today)**
- Each agent is a saved system prompt
- Manual switching between agents
- Shared context via copy-paste
- Time: 30 min to set up

**Tier 2: Platform-Native (Low Cost)**
- Claude Projects or ChatGPT Custom GPTs per agent
- Persistent memory within each agent
- Some automation via saved workflows
- Time: 2-3 hours to set up

**Tier 3: Agentic Infrastructure (Advanced)**
- Claude Code with MCP servers
- n8n or similar for automated routing
- Persistent cross-agent memory (knowledge graph)
- Automated daily/weekly agent runs
- Time: 1-2 days to set up, ongoing refinement

### Agent Interaction Map
Provide a text diagram showing:
- Which agents talk to which
- What data flows between them
- Frequency (real-time, daily, weekly, on-demand)
- Dependencies (which agents must run before others)`,
    category: 'agent-development',
    tags: ['ai-coe', 'multi-agent', 'orchestration', 'agent-design', 'personal-ai', 'acos'],
    aiTool: 'claude-code',
    difficulty: 'Advanced',
    useCase: 'Power users who want to design a coordinated system of AI agents that work together across different life and work domains.',
    tier: 'premium',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['personal multi-agent system', 'ai agent orchestra', 'multi-agent orchestration personal', 'acos agent design', 'personal ai agents'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },
  {
    id: 'ai-coe-weekly-review',
    title: 'AI CoE Weekly Operations Review',
    description: 'A structured weekly review prompt that evaluates your AI system performance, identifies improvements, and plans next week — the personal equivalent of an enterprise ops review.',
    content: `You are my AI operations analyst. Conduct a structured weekly review of my personal AI Center of Excellence.

## This Week's Data

### What I Used AI For This Week:
[List your AI interactions this week — be specific about tool, task, and outcome]
Example:
- Monday: Claude for blog post outline (good result, 30 min saved)
- Tuesday: ChatGPT for meal planning (mediocre, had to redo manually)
- Wednesday: Claude Code for refactoring auth module (excellent, 2 hours saved)
- Thursday: Midjourney for social media graphics (3 attempts needed)
- Friday: Claude for email drafting (good, sent with minor edits)

### Time Tracking:
- Total hours spent WITH AI: [N hours]
- Estimated hours WITHOUT AI: [N hours]
- Quality assessment: [better / same / worse than manual]

### What Didn't Work:
[Any frustrations, failed prompts, wasted time]

### What Surprised Me:
[Any unexpectedly good results or new capabilities discovered]

## Conduct the Review

### 1. Efficiency Score
Calculate my AI ROI:
- Hours saved = (estimated without) - (actual with AI)
- Quality delta = improvement in output quality (rate 1-10)
- Learning velocity = new techniques or tools discovered this week

### 2. Tool Utilization Audit
| Tool | Times Used | Success Rate | Best Use This Week | Underutilized For |
|------|-----------|-------------|--------------------|--------------------|

### 3. Prompt Performance
Identify:
- **Best prompt of the week** — What made it work?
- **Worst prompt of the week** — What went wrong? How to fix it?
- **Prompt to save** — Any prompt worth adding to my permanent library?

### 4. Domain Coverage Check
Rate my AI usage across the 7 CoE domains (used / unused / n/a):
□ Creative Production
□ Knowledge & Research
□ Health & Fitness
□ Business Intelligence
□ Personal Operations
□ Financial Intelligence
□ Family & Relationships

Flag any domain unused for 2+ consecutive weeks.

### 5. Next Week Plan
Based on this review:
- **Continue:** [What's working — keep doing]
- **Start:** [New AI workflow to try next week]
- **Stop:** [What's not worth the effort]
- **Improve:** [Specific prompt or workflow to refine]
- **Explore:** [New tool or technique to experiment with]

### 6. Compound Growth Indicator
Compare this week to last week:
- Am I using AI in more domains? (breadth)
- Am I getting better results in existing domains? (depth)
- Am I spending less time on setup/prompting? (efficiency)
- One-sentence trajectory: "My AI CoE is [accelerating / plateauing / declining] because..."`,
    category: 'productivity',
    tags: ['ai-coe', 'weekly-review', 'operations', 'self-assessment', 'continuous-improvement'],
    aiTool: 'general',
    difficulty: 'Beginner',
    useCase: 'Anyone running a personal AI system who wants to systematically improve their AI effectiveness week over week.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['ai weekly review', 'personal ai operations review', 'ai coe review', 'ai productivity review', 'ai system improvement'],
    createdAt: '2026-03-21T00:00:00.000Z',
    updatedAt: '2026-03-21T00:00:00.000Z',
  },

  // ============================================================================
  // MARCH 2026 EXPANSION — Fitness, Video, Voice, Research, CLAUDE.md
  // ============================================================================

  {
    id: 'claude-md-generator',
    title: 'CLAUDE.md Generator for Any Project',
    description: 'Generate a production-grade CLAUDE.md file for any codebase — with architecture decisions, deploy workflow, anti-patterns, and a decision protocol.',
    content: `You are an expert at writing CLAUDE.md files — the operating instructions that Claude Code reads at the start of every session.

## My Project
- Framework: [e.g., Next.js 15, App Router]
- Styling: [e.g., Tailwind CSS + shadcn/ui]
- Database: [e.g., Supabase PostgreSQL]
- Deployment: [e.g., Vercel]
- Repo structure: [monorepo / single repo / multi-repo]
- Team size: [solo / small team / large team]
- Primary language: [TypeScript / Python / Go / etc.]

## Generate My CLAUDE.md

Create a complete CLAUDE.md file with these sections:

1. **Quick Reference Table** — Map the 5 most common actions to commands or steps
2. **Deployment Workflow** — Exact numbered steps with code blocks
3. **Tech Stack** — Framework, styling, database, deployment in a clean list
4. **Brand/Voice Rules** — 3 non-negotiable constraints (if applicable)
5. **Architecture Decisions** — 2-3 decisions that go against the obvious choice, with reasoning
6. **Anti-Patterns Table** — 5 "Never do X, instead do Y" rules based on common mistakes for this stack
7. **File Structure** — Key directories only (not every file)
8. **Decision Protocol** — 4-question checklist before any structural change

Keep the total under 1,500 words. Front-load critical rules in the first 500 words.`,
    category: 'ai-architecture',
    tags: ['CLAUDE.md', 'claude-code', 'setup', 'configuration', 'ai-development'],
    aiTool: 'claude-code',
    difficulty: 'Beginner',
    useCase: 'Any developer starting a new project with Claude Code who wants a properly structured CLAUDE.md from day one.',
    tier: 'free',
    productBundle: 'agentic-creator-os',
    seoKeywords: ['CLAUDE.md generator', 'claude code setup', 'CLAUDE.md template', 'claude code configuration'],
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  },
  {
    id: 'ai-video-script-generator',
    title: 'AI Video Script Generator',
    description: 'Generate a complete video script with hook, segments, transitions, and CTA — optimized for YouTube, short-form, or educational content.',
    content: `You are a video production specialist. Generate a complete video script based on the brief below.

## Video Brief
- Topic: [YOUR TOPIC]
- Format: [YouTube long-form / YouTube Shorts / TikTok / Course module / Product demo]
- Target length: [30 seconds / 2 minutes / 5 minutes / 10 minutes / 15+ minutes]
- Audience: [developers / creators / beginners / executives]
- Tone: [educational / entertaining / inspirational / technical]
- Key message: [the one thing the viewer should remember]

## Generate Script

### HOOK (first 5 seconds)
Write 2-3 hook options. Each must:
- Create immediate curiosity or tension
- Use a specific number, claim, or question
- Be deliverable in under 5 seconds of speech

### SEGMENTS
For each segment, provide:
- **Segment title** (internal reference)
- **Duration** (estimated seconds)
- **Script** (word-for-word what to say)
- **Visual direction** (what should be on screen)
- **B-roll suggestion** (if applicable)

### TRANSITIONS
Between each segment, write a 1-sentence transition that bridges naturally.

### CTA (final 10 seconds)
- Primary CTA (subscribe / visit link / try tool)
- Verbal script for the CTA
- Screen graphic suggestion

### METADATA
- Suggested title (under 60 chars, optimized for YouTube search)
- Description (first 2 lines visible before "show more")
- 5 tags
- Thumbnail concept (1 sentence describing the ideal thumbnail)`,
    category: 'creative',
    tags: ['video', 'script', 'youtube', 'content-creation', 'production'],
    aiTool: 'general',
    difficulty: 'Intermediate',
    useCase: 'Content creators who want to produce professional video content with structured scripts, not improvised recordings.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['ai video script', 'youtube script generator', 'video content ai', 'ai video production'],
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  },
  {
    id: 'fitness-content-creator-system',
    title: 'Fitness Creator Content System',
    description: 'Build a complete AI-powered content system for fitness influencers — training guides, nutrition posts, client check-ins, and social content at scale.',
    content: `You are a fitness content strategist specializing in AI-powered content creation for fitness influencers and coaches.

## My Fitness Creator Profile
- Niche: [e.g., strength training, endurance, yoga, CrossFit, bodybuilding, general fitness]
- Audience size: [followers/subscribers count]
- Content platforms: [Instagram / YouTube / TikTok / Blog / Newsletter]
- Publishing frequency: [daily / 3x week / weekly]
- Monetization: [coaching / programs / sponsorships / products]
- Unique angle: [what makes your approach different]

## Build My Content System

### 1. Content Pillars (5 pillars)
Define 5 recurring content categories with:
- Pillar name and description
- Publishing frequency for each
- Content format (video / carousel / reel / blog / story)
- Example titles (3 per pillar)

### 2. Training Content Templates
Create 3 reusable templates:
- **Exercise Breakdown** — form cues, common mistakes, progressions
- **Workout of the Week** — structured program with sets/reps/rest
- **Science Spotlight** — research finding translated to practical advice

### 3. Nutrition Content Templates
Create 2 templates:
- **Meal Prep Guide** — macros, ingredients, prep steps, photo direction
- **Nutrition Myth Buster** — claim, evidence, practical takeaway

### 4. Client Success Template
- Before/after framing (ethical, consent-aware)
- Key metrics to highlight
- Client quote integration
- CTA to coaching application

### 5. Weekly Content Calendar
| Day | Platform | Content Type | Template | Time to Create |
Design a sustainable weekly rhythm that one person can maintain.

### 6. AI Acceleration Points
For each template, specify:
- What AI generates (first draft, outline, research summary)
- What the creator adds (personal experience, form demonstration, client stories)
- Quality check before posting`,
    category: 'social-media',
    tags: ['fitness', 'content-creation', 'social-media', 'coaching', 'creator'],
    aiTool: 'general',
    difficulty: 'Intermediate',
    useCase: 'Fitness influencers and online coaches who want to systematize their content production without sacrificing authenticity.',
    tier: 'free',
    productBundle: 'gencreator-os',
    seoKeywords: ['fitness content system', 'fitness influencer ai', 'fitness creator content', 'ai fitness content'],
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  },
  {
    id: 'research-paper-summarizer',
    title: 'Research Paper Summarizer for Practitioners',
    description: 'Summarize any research paper into a practitioner-friendly brief — key findings, methodology assessment, practical applications, and limitations.',
    content: `You are a research analyst who translates academic papers into actionable briefs for practitioners.

## The Paper
[PASTE the paper abstract, or the full text, or a link/DOI]

## Summarize for Practitioners

### 1. One-Line Summary
What did this study find? One sentence, no jargon.

### 2. Key Numbers
| Metric | Value | Context |
Extract the 3-5 most important quantitative findings.

### 3. Methodology Assessment
- Study type: [meta-analysis / RCT / observational / case study / review]
- Sample size: [N=?]
- Duration: [how long]
- Confidence level: [how much should I trust this?]
- Limitations the authors acknowledge:
- Limitations the authors missed:

### 4. Evidence Grade
Rate A-D:
- **A**: Meta-analysis or large RCT (strong evidence)
- **B**: Systematic review or peer-reviewed study (good evidence)
- **C**: Observational or small sample (directional evidence)
- **D**: Expert opinion or case study (preliminary)

### 5. Practical Applications
- Who should care about this finding?
- What should they do differently based on this?
- What should they NOT do based on this? (common misinterpretations)

### 6. One-Paragraph Brief
Write a paragraph I can share with my audience that accurately conveys this finding without oversimplifying or overclaiming.`,
    category: 'learning',
    tags: ['research', 'papers', 'science', 'evidence', 'learning'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Anyone who reads research papers and needs to translate findings into practical, shareable insights — especially fitness, health, and AI practitioners.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['research paper summarizer', 'academic paper summary ai', 'research to practice', 'evidence grading'],
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  },
  {
    id: 'voice-ai-product-narrator',
    title: 'Voice AI Product Narrator',
    description: 'Generate a complete narration script for product demos, course modules, or podcast intros — with voice direction for ElevenLabs or similar tools.',
    content: `You are a voice AI production specialist. Generate a narration script with voice direction optimized for text-to-speech platforms like ElevenLabs, OpenAI TTS, or Hume AI.

## Project Brief
- Content type: [product demo / course module / podcast intro / audiobook chapter / explainer video]
- Duration target: [30 seconds / 1 minute / 3 minutes / 5 minutes / 10+ minutes]
- Voice personality: [professional / warm / energetic / calm / authoritative / conversational]
- Audience: [technical / general / executive / student]
- Key message: [what the listener should take away]
- Brand voice notes: [any specific tone requirements]

## Generate Narration Package

### Script
Write the complete narration script with:
- **[PAUSE 0.5s]** markers for natural breathing points
- **[EMPHASIS]** markers for words that should be stressed
- **[SLOW]** and **[NORMAL]** markers for pacing changes
- Sentence lengths varied for natural rhythm (mix 5-word punches with 15-word explanations)
- No tongue-twisters or awkward consonant clusters (TTS struggle points)

### Voice Direction
- Recommended voice: [ElevenLabs voice name or OpenAI voice ID]
- Stability setting: [0.0-1.0 — lower = more expressive]
- Similarity boost: [0.0-1.0 — higher = more consistent]
- Style: [0.0-1.0 — higher = more stylistic interpretation]
- Speed: [0.8x / 1.0x / 1.2x recommended playback]

### Production Notes
- Total word count: [N words]
- Estimated duration at 150 WPM: [N minutes]
- Recommended background music: [genre/mood suggestion]
- Audio format: [mono/stereo, sample rate recommendation]

### Cost Estimate
- ElevenLabs: ~$[X] for this script at current per-character pricing
- OpenAI TTS: ~$[X] at $15/1M characters
- Self-hosted: [Coqui/Bark recommendation if applicable]`,
    category: 'creative',
    tags: ['voice-ai', 'narration', 'elevenlabs', 'audio', 'production'],
    aiTool: 'general',
    difficulty: 'Intermediate',
    useCase: 'Creators producing audio content — product demos, course narration, podcast intros — who want professional voice AI output.',
    tier: 'free',
    productBundle: null,
    seoKeywords: ['voice ai narration', 'elevenlabs script', 'tts narration prompt', 'ai voice production'],
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  },

]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getPromptsByCategory(category: PromptCategory): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.category === category)
}

export function getPromptsByTool(tool: AITool): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.aiTool === tool)
}

export function getPromptsByTier(tier: PromptTier): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.tier === tier)
}

export function getPromptsByProductBundle(bundle: ProductBundle): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.productBundle === bundle)
}

export function getPromptsByCategoryGroup(group: CategoryGroup): Prompt[] {
  const categoryIds = CATEGORIES.filter((cat) => cat.group === group).map((cat) => cat.id)
  return PROMPTS.filter((prompt) => categoryIds.includes(prompt.category))
}

export function getCategoriesByGroup(group: CategoryGroup): CategoryInfo[] {
  return CATEGORIES.filter((cat) => cat.group === group)
}

export function getPromptById(id: string): Prompt | undefined {
  return PROMPTS.find((prompt) => prompt.id === id)
}

export function searchPrompts(query: string): Prompt[] {
  if (!query.trim()) {
    return PROMPTS
  }

  const lower = query.toLowerCase()
  return PROMPTS.filter((prompt) =>
    prompt.title.toLowerCase().includes(lower) ||
    prompt.description.toLowerCase().includes(lower) ||
    prompt.tags.some((tag) => tag.toLowerCase().includes(lower)) ||
    prompt.content.toLowerCase().includes(lower)
  )
}

export function getFeaturedPrompts(): Prompt[] {
  // Return a curated selection of prompts across categories
  const featuredIds = [
    'personal-ai-coe-blueprint',
    'suno-ambient-electronic',
    'ai-coe-founder-intelligence',
    'midjourney-professional-portrait',
    'creator-ai-operations-manual',
    'ai-agent-orchestra-designer',
  ]
  return PROMPTS.filter((prompt) => featuredIds.includes(prompt.id))
}

export function getPromptStats() {
  const totalPrompts = PROMPTS.length
  const totalCategories = new Set(PROMPTS.map((prompt) => prompt.category)).size
  const toolsUsed = Array.from(new Set(PROMPTS.map((prompt) => prompt.aiTool)))
  const difficultyDistribution: Record<PromptDifficulty, number> = {
    Beginner: PROMPTS.filter((prompt) => prompt.difficulty === 'Beginner').length,
    Intermediate: PROMPTS.filter((prompt) => prompt.difficulty === 'Intermediate').length,
    Advanced: PROMPTS.filter((prompt) => prompt.difficulty === 'Advanced').length,
  }
  const tierDistribution: Record<PromptTier, number> = {
    free: PROMPTS.filter((prompt) => prompt.tier === 'free').length,
    premium: PROMPTS.filter((prompt) => prompt.tier === 'premium').length,
    paid: PROMPTS.filter((prompt) => prompt.tier === 'paid').length,
  }
  const categoryGroupCounts: Record<CategoryGroup, number> = {
    creative: getPromptsByCategoryGroup('creative').length,
    technical: getPromptsByCategoryGroup('technical').length,
    business: getPromptsByCategoryGroup('business').length,
    personal: getPromptsByCategoryGroup('personal').length,
  }

  return {
    totalPrompts,
    totalCategories,
    toolsUsed,
    difficultyDistribution,
    tierDistribution,
    categoryGroupCounts,
  }
}

export type PromptLibraryStats = ReturnType<typeof getPromptStats>
