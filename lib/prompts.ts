/**
 * Prompt Library Data
 * Real, practical prompts for creators - no fabricated statistics.
 * Inspired by awesome-chatgpt-prompts, God of Prompt, and Anthropic's documentation.
 */

export type PromptDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type PromptCategory =
  | 'writing'
  | 'music-creation'
  | 'image-generation'
  | 'coding'
  | 'business'
  | 'learning'
  | 'productivity'
  | 'creative'

export type AITool =
  | 'claude'
  | 'chatgpt'
  | 'midjourney'
  | 'suno'
  | 'dalle'
  | 'stable-diffusion'
  | 'cursor'
  | 'general'

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
  createdAt: string
  updatedAt: string
}

export interface CategoryInfo {
  id: PromptCategory
  name: string
  emoji: string
  description: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'writing',
    name: 'Writing',
    emoji: '✍️',
    description: 'Blog posts, articles, scripts, and creative writing.',
    color: '#8B5CF6',
  },
  {
    id: 'music-creation',
    name: 'Music Creation',
    emoji: '🎵',
    description: 'Suno prompts for AI-generated songs and soundscapes.',
    color: '#EC4899',
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    emoji: '🎨',
    description: 'Midjourney, DALL-E, and Stable Diffusion prompts.',
    color: '#F59E0B',
  },
  {
    id: 'coding',
    name: 'Coding',
    emoji: '💻',
    description: 'Code generation, debugging, and technical assistance.',
    color: '#10B981',
  },
  {
    id: 'business',
    name: 'Business',
    emoji: '📈',
    description: 'Strategy, marketing, and professional communication.',
    color: '#3B82F6',
  },
  {
    id: 'learning',
    name: 'Learning',
    emoji: '📚',
    description: 'Study guides, explanations, and skill development.',
    color: '#6366F1',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    emoji: '⚡',
    description: 'Task management, planning, and workflow optimization.',
    color: '#06B6D4',
  },
  {
    id: 'creative',
    name: 'Creative',
    emoji: '✨',
    description: 'Brainstorming, ideation, and creative exploration.',
    color: '#F97316',
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
    createdAt: '2024-12-01T00:00:00.000Z',
    updatedAt: '2024-12-01T00:00:00.000Z',
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
    'suno-ambient-electronic',
    'blog-post-structure',
    'midjourney-professional-portrait',
    'code-review-assistant',
    'brainstorm-ideas',
    'explain-concept',
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

  return {
    totalPrompts,
    totalCategories,
    toolsUsed,
    difficultyDistribution,
  }
}

export type PromptLibraryStats = ReturnType<typeof getPromptStats>
