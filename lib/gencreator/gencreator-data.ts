import {
  Zap,
  Layers,
  Shield,
  Rocket,
  TrendingUp,
  Bot,
  Eye,
  Target,
  DollarSign,
  Battery,
  Network,
  FileText,
  Compass,
  Wrench,
  PenTool,
  BarChart3,
  Cog,
  Calendar,
  Users,
  Telescope,
  Share2,
  Music,
  Package,
  Mail,
  Code2,
  Search,
  Video,
  Palette,
  GitBranch,
  Globe,
  Sparkles,
} from 'lucide-react'

import type {
  Principle,
  HandbookChapter,
  Blueprint,
  SoulDimension,
  ManifestoLine,
  ProductTier,
  CommunitySpace,
  CommunityEvent,
  LearningTrack,
  LearningModule,
  ToolkitItem,
} from './gencreator-types'

// ── 12 GenCreator Principles ─────────────────────────────

export const principles: Principle[] = [
  {
    number: 1,
    title: 'Create Daily',
    tagline: 'Output is the only metric that matters.',
    description:
      'A GenCreator publishes, ships, and creates every single day. Not because discipline demands it, but because creation compounds. Day 1 is raw. Day 100 is dangerous. Day 1,000 is undeniable. The gap between amateurs and professionals is not talent — it is accumulated reps.',
    example:
      'Write one blog post, produce one track, ship one component. Every day. The streak is the strategy.',
    icon: Zap,
  },
  {
    number: 2,
    title: 'Stack Intelligence',
    tagline: 'Layer AI tools. Never use them in isolation.',
    description:
      'A single AI tool is a parlor trick. Stacked intelligence — where Claude writes, Suno composes, Gemini generates, and n8n orchestrates — is a production studio. The GenCreator builds systems where each AI multiplies the others, creating output no single tool could produce alone.',
    example:
      'Claude drafts the article. Gemini generates the hero image. n8n atomizes it into 6 social posts. Resend delivers the newsletter. One input, five outputs.',
    icon: Layers,
  },
  {
    number: 3,
    title: 'Own Your System',
    tagline: 'Build infrastructure you control, not platforms you rent.',
    description:
      'Platforms change terms, raise prices, and deprecate features. The GenCreator builds on open protocols: git repos, self-hosted workflows, personal domains, and exportable data. When you own the system, algorithm changes become irrelevant.',
    example:
      'Your blog lives on your domain. Your music is on Vercel Blob. Your workflows are n8n on Railway. Your audience is on your email list. Zero platform risk.',
    icon: Shield,
  },
  {
    number: 4,
    title: 'Ship Before Perfect',
    tagline: 'Iteration beats perfection. Publish, measure, improve.',
    description:
      'Perfection is the enemy of presence. The GenCreator ships v1, gathers signal, and iterates. Every piece of published work teaches something that unpublished work never can. The market gives better feedback than your inner critic.',
    example:
      'Launch the product with 3 features, not 30. Publish the article at 80% polish. The first version is for learning, not for legacy.',
    icon: Rocket,
  },
  {
    number: 5,
    title: 'Compound Creativity',
    tagline: 'Each creation makes the next one easier and better.',
    description:
      'A blog post becomes a newsletter. The newsletter becomes a course module. The course becomes a consulting framework. The GenCreator never creates in isolation — every output feeds the next. This is creative compounding, and it is the single greatest advantage of prolific creation.',
    example:
      'One deep research session yields: 1 blog post, 1 Twitter thread, 1 newsletter issue, 3 LinkedIn posts, and 1 YouTube script. Five assets from one hour of thinking.',
    icon: TrendingUp,
  },
  {
    number: 6,
    title: 'Automate the Boring',
    tagline: 'Humans create. Machines execute. Never reverse this.',
    description:
      'The GenCreator identifies every repetitive task in the creative workflow and eliminates it with automation. Formatting, scheduling, cross-posting, image resizing, SEO checks, email sequences — these are machine tasks. Humans handle taste, judgment, and originality.',
    example:
      'n8n workflow: blog post published → auto-generates social posts → schedules across platforms → sends newsletter → updates analytics dashboard. Zero manual steps after clicking "publish."',
    icon: Bot,
  },
  {
    number: 7,
    title: 'Build in Public',
    tagline: 'Transparency accelerates trust and feedback.',
    description:
      'The GenCreator shares the process, not just the product. Work-in-progress posts, behind-the-scenes breakdowns, failure postmortems, and revenue reports — these build audience trust faster than polished marketing. Authenticity is the ultimate differentiator.',
    example:
      'Monthly revenue report. Weekly build log. "Here\'s what I shipped this week" threads. Let people watch you build — they\'ll want to buy from someone they\'ve watched grow.',
    icon: Eye,
  },
  {
    number: 8,
    title: 'Master One, Touch Many',
    tagline: 'Deep expertise in one domain, broad awareness across all.',
    description:
      'The GenCreator goes deep in one vertical — AI architecture, music production, content systems — while maintaining working knowledge of adjacent domains. T-shaped expertise creates unique combinations. The intersection of deep and broad is where original work lives.',
    example:
      'Frank\'s depth: AI systems architecture. Frank\'s breadth: music production, content strategy, product design, SEO. The intersection: ACOS, a system that no pure architect or pure creator would build.',
    icon: Target,
  },
  {
    number: 9,
    title: 'Revenue is Validation',
    tagline: 'If people pay, the work matters. Revenue is signal.',
    description:
      'The GenCreator does not create for applause — they create for impact, and revenue is the clearest signal of impact. Free content builds audience. Paid products prove value. The transition from free to paid is the moment your work graduates from hobby to profession.',
    example:
      'Free: blog posts, open-source tools, social content. Paid: premium templates, guided systems, 1:1 support. The free work earns trust. The paid work earns a living.',
    icon: DollarSign,
  },
  {
    number: 10,
    title: 'Protect Your Energy',
    tagline: 'Creative output is proportional to input energy quality.',
    description:
      'The GenCreator treats energy as the primary resource — not time, not money, not followers. Sleep, movement, nutrition, and mental clarity directly determine creative output quality. A rested creator in 2 hours outproduces a burned-out creator in 12.',
    example:
      'Morning routine before opening any screen. Physical movement daily. Hard stop on work hours. Energy management is time management for creators.',
    icon: Battery,
  },
  {
    number: 11,
    title: 'Think in Systems',
    tagline: 'Every creation connects to your larger ecosystem.',
    description:
      'The GenCreator does not create isolated artifacts — they build interconnected systems. A blog feeds the newsletter. The newsletter feeds the product. The product feeds the community. The community feeds new content. Everything loops. Isolated creation is wasted creation.',
    example:
      'Blog post links to product. Product includes community access. Community generates content ideas. Content ideas become blog posts. The flywheel spins.',
    icon: Network,
  },
  {
    number: 12,
    title: 'Leave Artifacts',
    tagline: 'Make your work reusable. Templates, frameworks, systems.',
    description:
      'The GenCreator documents everything. Every workflow becomes a template. Every decision becomes a framework. Every system becomes a blueprint. Artifacts are the residue of excellent work, and they create passive value long after the original effort ends.',
    example:
      'ACOS is an artifact. This handbook is an artifact. Every blueprint in this collection is an artifact. The work you do today should help someone (including future you) tomorrow.',
    icon: FileText,
  },
]

// ── 8 Handbook Chapters ──────────────────────────────────

export const chapters: HandbookChapter[] = [
  {
    number: 1,
    title: 'The GenCreator Identity',
    subtitle: 'Who you are becoming',
    description:
      'Define your creative identity at the intersection of human taste and AI capability. Understand what makes a GenCreator different from a traditional creator, a developer, or an AI hobbyist.',
    readTime: '12 min',
    topics: [
      'The GenCreator mindset',
      'Human + AI creative partnership',
      'Finding your creative intersection',
      'Identity vs. tools — the permanent differentiator',
    ],
    icon: Compass,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    number: 2,
    title: 'Your Creative Stack',
    subtitle: 'Tools, AI, workflows',
    description:
      'Build a production-grade creative stack. Choose tools that compound together, configure AI assistants for your specific workflow, and create the infrastructure that makes daily creation frictionless.',
    readTime: '18 min',
    topics: [
      'Core AI tools (Claude, Suno, Gemini, GPT)',
      'Automation layer (n8n, Make, Zapier)',
      'Publishing infrastructure (Vercel, GitHub, Resend)',
      'The ACOS approach to tool orchestration',
    ],
    icon: Wrench,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    number: 3,
    title: 'Content as Currency',
    subtitle: 'Publishing systems that compound',
    description:
      'Build content systems, not content pieces. Learn the atomization framework that turns one deep piece into 10 distribution-ready assets. Develop your content flywheel — the system that makes every piece of content feed the next.',
    readTime: '15 min',
    topics: [
      'The content atomization framework',
      'Blog → social → newsletter pipeline',
      'SEO-first content architecture',
      'Content compounding over time',
    ],
    icon: PenTool,
    color: 'from-purple-500 to-violet-500',
  },
  {
    number: 4,
    title: 'The Revenue Engine',
    subtitle: 'Products, services, monetization',
    description:
      'Transform creative output into revenue. From free content that builds audience to paid products that prove value. The GenCreator monetization ladder: audience → trust → products → recurring revenue.',
    readTime: '20 min',
    topics: [
      'The monetization ladder',
      'Digital product design',
      'Pricing psychology for creators',
      'From free content to paid ecosystem',
    ],
    icon: BarChart3,
    color: 'from-amber-500 to-orange-500',
  },
  {
    number: 5,
    title: 'System Architecture',
    subtitle: 'Building infrastructure that scales',
    description:
      'Design the technical foundation that lets you create at scale without burning out. From git-based content management to automated deployment pipelines — the engineering behind effortless creation.',
    readTime: '22 min',
    topics: [
      'Git-based content workflows',
      'Automated deployment pipelines',
      'Self-hosted vs. managed services',
      'The ACOS orchestration pattern',
    ],
    icon: Cog,
    color: 'from-rose-500 to-pink-500',
  },
  {
    number: 6,
    title: 'The Daily Practice',
    subtitle: 'Routines, rituals, energy management',
    description:
      'The daily operating system of a GenCreator. Morning creation blocks, energy management, deep work protocols, and the rituals that make prolific output sustainable — not exhausting.',
    readTime: '14 min',
    topics: [
      'The creator morning routine',
      'Deep work blocks and flow states',
      'Energy management over time management',
      'The Full Presence Activation protocol',
    ],
    icon: Calendar,
    color: 'from-teal-500 to-emerald-500',
  },
  {
    number: 7,
    title: 'Community & Network',
    subtitle: 'Building your circle',
    description:
      'No GenCreator builds alone. Learn to build authentic community, find mentors and collaborators, and create network effects that amplify everything you create.',
    readTime: '13 min',
    topics: [
      'Building authentic community',
      'The mentor-peer-apprentice triangle',
      'Collaboration over competition',
      'Network effects for solo creators',
    ],
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    number: 8,
    title: 'The Long Game',
    subtitle: 'Legacy, compounding, 10-year thinking',
    description:
      'Think beyond the next post, the next launch, the next quarter. The GenCreator plays infinite games — building assets that compound over years, systems that outlive trends, and a body of work that becomes undeniable.',
    readTime: '16 min',
    topics: [
      'Infinite games vs. finite games',
      'The 1,000-day compounding effect',
      'Building assets that appreciate',
      'Your creative legacy architecture',
    ],
    icon: Telescope,
    color: 'from-violet-500 to-fuchsia-500',
  },
]

// ── 12 Blueprints ────────────────────────────────────────

export const blueprints: Blueprint[] = [
  {
    title: 'Blog-to-Social Atomizer',
    description:
      'Turn one blog post into 6+ social media assets automatically. Thread, carousel, newsletter snippet, LinkedIn post, quote graphics, and audio summary.',
    category: 'Content',
    difficulty: 'Beginner',
    timeEstimate: '30 min setup',
    tools: ['Claude', 'n8n', 'Canva'],
    icon: Share2,
  },
  {
    title: 'AI Music Production Pipeline',
    description:
      'End-to-end music production: prompt engineering, Suno generation, track selection, mastering, metadata, and distribution to streaming platforms.',
    category: 'Music',
    difficulty: 'Intermediate',
    timeEstimate: '2 hours setup',
    tools: ['Suno', 'Claude', 'DistroKid'],
    icon: Music,
  },
  {
    title: 'Digital Product Launch Sequence',
    description:
      'A complete launch system: landing page, email sequence, social campaign, pricing strategy, and post-launch iteration framework.',
    category: 'Product',
    difficulty: 'Intermediate',
    timeEstimate: '1 week',
    tools: ['Next.js', 'Resend', 'Gumroad'],
    icon: Package,
  },
  {
    title: 'Newsletter Growth Engine',
    description:
      'Build a newsletter that grows itself. Lead magnets, signup forms, welcome sequences, content calendar, and referral mechanics.',
    category: 'Growth',
    difficulty: 'Beginner',
    timeEstimate: '2 hours setup',
    tools: ['Resend', 'Next.js', 'Claude'],
    icon: Mail,
  },
  {
    title: 'ACOS Custom Agent Builder',
    description:
      'Design, build, and deploy custom AI agents for your specific creative workflow. Agent definition, skill mapping, tool integration, and testing.',
    category: 'System',
    difficulty: 'Advanced',
    timeEstimate: '3 hours',
    tools: ['Claude Code', 'ACOS', 'MCP'],
    icon: Code2,
  },
  {
    title: 'SEO Topic Cluster Strategy',
    description:
      'Build topic authority through pillar content and supporting clusters. Keyword research, content mapping, internal linking, and schema markup.',
    category: 'Content',
    difficulty: 'Intermediate',
    timeEstimate: '4 hours',
    tools: ['Claude', 'Search Console', 'Ahrefs'],
    icon: Search,
  },
  {
    title: 'Creator Revenue Dashboard',
    description:
      'Track all revenue streams in one place. Product sales, affiliate income, ad revenue, coaching — visualized with automated data collection.',
    category: 'Product',
    difficulty: 'Intermediate',
    timeEstimate: '3 hours setup',
    tools: ['n8n', 'Google Sheets', 'Notion'],
    icon: BarChart3,
  },
  {
    title: 'Video-to-Blog Repurposer',
    description:
      'Transform long-form video into written content. Transcription, AI-powered editing, SEO optimization, and image extraction for blog publication.',
    category: 'Content',
    difficulty: 'Beginner',
    timeEstimate: '1 hour setup',
    tools: ['Whisper', 'Claude', 'Next.js'],
    icon: Video,
  },
  {
    title: 'AI Art Portfolio Builder',
    description:
      'Build a professional portfolio of AI-generated art. Style development, prompt engineering, curation framework, and gallery deployment.',
    category: 'Music',
    difficulty: 'Beginner',
    timeEstimate: '2 hours',
    tools: ['Gemini', 'Midjourney', 'Vercel'],
    icon: Palette,
  },
  {
    title: 'n8n Workflow Automation Kit',
    description:
      'A starter kit of 5 essential n8n workflows for creators: content distribution, social monitoring, email automation, analytics collection, and backup systems.',
    category: 'System',
    difficulty: 'Advanced',
    timeEstimate: '4 hours',
    tools: ['n8n', 'Railway', 'Slack'],
    icon: GitBranch,
  },
  {
    title: 'Community Launch Playbook',
    description:
      'Launch a creator community from scratch. Platform selection, founding member strategy, content seeding, engagement mechanics, and growth tactics.',
    category: 'Growth',
    difficulty: 'Intermediate',
    timeEstimate: '1 week',
    tools: ['Discord', 'Notion', 'Resend'],
    icon: Globe,
  },
  {
    title: 'Personal Brand Architecture',
    description:
      'Design your complete brand system. Visual identity, voice guidelines, content pillars, positioning statement, and brand asset library.',
    category: 'Growth',
    difficulty: 'Beginner',
    timeEstimate: '3 hours',
    tools: ['Figma', 'Claude', 'Canva'],
    icon: Sparkles,
  },
]

// ── 7 Soul Dimensions ────────────────────────────────────

export const soulDimensions: SoulDimension[] = [
  {
    number: 1,
    name: 'Energy',
    symbol: '⚡',
    tagline: 'The engine of creation',
    description:
      'Physical vitality, presence, and the raw fuel that powers everything you create. Without energy, tools are useless and talent is dormant. The GenCreator treats energy as the primary resource — optimizing sleep, movement, nutrition, and recovery before optimizing workflows.',
    questions: [
      'How many hours of quality sleep did you average this week?',
      'Did you move your body today before opening a screen?',
      'What drains your energy that you could eliminate or delegate?',
      'When is your peak creative energy window?',
    ],
    color: 'from-amber-400 to-orange-500',
    glowColor: 'amber',
  },
  {
    number: 2,
    name: 'Mind',
    symbol: '🧠',
    tagline: 'Clarity, learning velocity, decision quality',
    description:
      'Mental clarity and the speed at which you acquire new skills. The GenCreator is a learning machine — consuming, processing, and applying new knowledge faster than peers because the stack amplifies every hour of study into days of output.',
    questions: [
      'What did you learn this week that changed how you work?',
      'Are you reading/consuming content that challenges you or confirms you?',
      'How quickly can you go from "I don\'t know how" to "I shipped it"?',
      'What mental model would simplify your biggest current problem?',
    ],
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'cyan',
  },
  {
    number: 3,
    name: 'Craft',
    symbol: '🔨',
    tagline: 'Technical mastery and creative skill',
    description:
      'The work itself. Your craft is the intersection of technical skill and creative taste. The GenCreator sharpens both — developing deep technical abilities while cultivating the aesthetic judgment that makes output exceptional, not just competent.',
    questions: [
      'What is the one skill that, if you mastered it, would 10x your output?',
      'When was the last time you practiced your craft without publishing?',
      'Can you articulate what makes your best work better than your average work?',
      'What craft would you practice even if no one ever saw the results?',
    ],
    color: 'from-emerald-400 to-teal-500',
    glowColor: 'emerald',
  },
  {
    number: 4,
    name: 'Voice',
    symbol: '📡',
    tagline: 'Authentic expression and communication',
    description:
      'Your unique signal in a world of noise. Voice is not just writing style — it is your perspective, your opinions, your willingness to say what others think but won\'t publish. The GenCreator develops a voice so distinct that readers recognize it before seeing the byline.',
    questions: [
      'If someone read your work without your name on it, would they know it was you?',
      'What opinion do you hold that most people in your space disagree with?',
      'Are you writing in your voice or in "professional content creator" voice?',
      'What would you say if you knew it would never be judged?',
    ],
    color: 'from-purple-400 to-violet-500',
    glowColor: 'violet',
  },
  {
    number: 5,
    name: 'Capital',
    symbol: '💎',
    tagline: 'Financial health and business sense',
    description:
      'Revenue, pricing, and the business of creation. Capital is not greed — it is the fuel that sustains creative freedom. The GenCreator builds multiple revenue streams, prices with confidence, and treats financial sustainability as a creative practice, not a necessary evil.',
    questions: [
      'How many months of runway do you have if all income stopped today?',
      'What is your hourly rate — and does your pricing reflect it?',
      'Which revenue stream has the highest leverage (most income per hour)?',
      'What would you create differently if money were irrelevant?',
    ],
    color: 'from-yellow-400 to-amber-500',
    glowColor: 'amber',
  },
  {
    number: 6,
    name: 'Circle',
    symbol: '🔗',
    tagline: 'Community, collaboration, relationships',
    description:
      'The people who amplify you. No GenCreator builds in isolation. Circle encompasses mentors who challenge you, peers who collaborate with you, and an audience that grows with you. The quality of your circle determines the ceiling of your creative output.',
    questions: [
      'Who are the 5 people you learn the most from right now?',
      'When was the last time you collaborated instead of competing?',
      'Do you have peers who will tell you when your work is not good enough?',
      'What community are you actively contributing to (not just consuming)?',
    ],
    color: 'from-indigo-400 to-blue-500',
    glowColor: 'blue',
  },
  {
    number: 7,
    name: 'Legacy',
    symbol: '∞',
    tagline: 'Long-term impact and systems that outlive you',
    description:
      'What remains after you stop. Legacy is not fame — it is the systems, templates, frameworks, and knowledge you leave behind. The GenCreator builds with permanence: open-source tools, documented processes, and a body of work that helps others long after you have moved on.',
    questions: [
      'If you stopped creating today, what would still provide value in 5 years?',
      'What system have you built that someone else could operate without you?',
      'Are you building assets or just producing outputs?',
      'What will your 1,000th creation look like if you maintain your current trajectory?',
    ],
    color: 'from-rose-400 to-pink-500',
    glowColor: 'rose',
  },
]

// ── Manifesto Lines ──────────────────────────────────────

export const manifestoLines: ManifestoLine[] = [
  { text: 'We are GenCreators.' , emphasis: true },
  { text: 'We create with AI, not despite it.' },
  { text: 'We ship daily. We compound relentlessly.' },
  { text: 'We build systems, not content pieces.' },
  { text: 'We own our infrastructure. We control our distribution.' },
  { text: 'We automate the boring and protect the creative.' },
  { text: 'We publish before perfect. We iterate in public.' },
  { text: 'We stack intelligence — layering tools into production studios.' },
  { text: 'We price our work with confidence. Revenue is validation.' },
  { text: 'We master one domain deeply. We touch many broadly.' },
  { text: 'We leave artifacts — templates, frameworks, systems.' },
  { text: 'We protect our energy because creation demands our best.' },
  { text: 'We think in decades, not in posts.' },
  { text: 'We are not content creators. We are not developers. We are not influencers.' , emphasis: true },
  { text: 'We are the new breed.' , emphasis: true },
  { text: 'Human taste. Machine scale. Permanent artifacts.' },
  { text: 'This is the GenCreator way.' , emphasis: true },
]

// ── Hub Stats ────────────────────────────────────────────

export const hubStats = [
  { label: 'Principles', value: '12', icon: Zap, color: 'from-emerald-500 to-teal-500' },
  { label: 'Chapters', value: '8', icon: PenTool, color: 'from-cyan-500 to-blue-500' },
  { label: 'Blueprints', value: '12', icon: GitBranch, color: 'from-purple-500 to-violet-500' },
  { label: 'Tools', value: '13', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
]

// ── Blueprint Categories (for filtering) ─────────────────

export const blueprintCategories = [
  'All',
  'Content',
  'Music',
  'Product',
  'System',
  'Growth',
] as const

// ── Difficulty colors ────────────────────────────────────

export const difficultyColors: Record<string, string> = {
  Beginner: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  Intermediate: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  Advanced: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
}

// ── Product Tiers ───────────────────────────────────────

export const productTiers: ProductTier[] = [
  {
    name: 'Starter Kit',
    slug: 'starter',
    price: 'Free',
    priceDetail: 'forever',
    description: 'Everything you need to begin your GenCreator journey. No credit card required.',
    features: [
      'soul.md personal template',
      '3 beginner blueprints (PDF)',
      '12 principles quick-reference card',
      'Weekly GenCreator newsletter',
      'Community read-only access',
    ],
    cta: 'Get the Starter Kit',
  },
  {
    name: 'GenCreator Pro',
    slug: 'pro',
    price: '$19',
    priceDetail: '/month',
    description: 'The full operating system. All blueprints, the complete handbook, and community access.',
    features: [
      'Everything in Starter Kit',
      'All 12 blueprint worksheets (PDF + Notion)',
      'Complete 8-chapter handbook (PDF)',
      'Full community access + Discord',
      'Weekly live workshops',
      'Blueprint template library',
      'Monthly creator challenges',
      'Peer review circles (4-person pods)',
    ],
    highlighted: true,
    cta: 'Join GenCreator Pro',
    badge: 'Most Popular',
  },
  {
    name: 'GenCreator Mastery',
    slug: 'mastery',
    price: '$97',
    priceDetail: '/month',
    description: 'For serious creators building a sustainable practice. Includes coaching and AI agents.',
    features: [
      'Everything in Pro',
      'Monthly 1:1 coaching call with Frank',
      'Custom AI agent setup (Claude Code + ACOS)',
      'Blueprint Customizer — personalized action plans',
      'Priority community support',
      'Early access to new frameworks',
      'GenCreator Mastery certificate',
      'Private Mastery-only channel',
    ],
    cta: 'Apply for Mastery',
    badge: 'Limited Seats',
  },
]

// ── Community ───────────────────────────────────────────

import {
  MessageSquare,
  Rocket as RocketIcon,
  Trophy,
  Mic,
  BookMarked,
  Lightbulb,
  Clock,
  Award,
  Radio,
  UserCheck,
  Megaphone,
  Heart as HeartIcon,
} from 'lucide-react'

export const communitySpaces: CommunitySpace[] = [
  {
    name: '#introductions',
    description: 'Share your soul.md, your stack, and what you are building. First impressions matter — make yours count.',
    icon: UserCheck,
  },
  {
    name: '#daily-ships',
    description: 'Post what you shipped today. A blog post, a track, a component, a product update. The streak is the strategy.',
    icon: RocketIcon,
  },
  {
    name: '#blueprint-share',
    description: 'Share your customized blueprints, workflows, and automation setups. Learn from how others execute.',
    icon: Lightbulb,
  },
  {
    name: '#music-lab',
    description: 'AI music production, Suno prompts, track feedback, genre experiments, and collaborative playlists.',
    icon: Mic,
  },
  {
    name: '#code-review',
    description: 'Get feedback on your projects, components, and systems. Build in public with expert eyes on your work.',
    icon: Code2,
  },
  {
    name: '#content-workshop',
    description: 'Draft reviews, headline testing, SEO feedback, and content strategy discussions.',
    icon: BookMarked,
  },
]

export const communityEvents: CommunityEvent[] = [
  {
    name: 'Weekly Creator Challenge',
    frequency: 'Every Monday',
    description: 'A new challenge each week tied to a specific blueprint. Ship something real by Friday. Winners get featured.',
    icon: Trophy,
  },
  {
    name: 'Live Workshop',
    frequency: 'Every Wednesday',
    description: 'Deep-dive into a handbook chapter, blueprint walkthrough, or tool demo. Pro and Mastery members only.',
    icon: Radio,
  },
  {
    name: 'Monthly Showcase',
    frequency: 'First Friday',
    description: 'Top community creations highlighted. Creator spotlights, milestone celebrations, and community awards.',
    icon: Award,
  },
  {
    name: 'Office Hours with Frank',
    frequency: 'Every other Thursday',
    description: 'Open Q&A session. Bring your toughest creative or technical challenge. Mastery members get priority.',
    icon: MessageSquare,
  },
]

// ── Learning Tracks ─────────────────────────────────────

export const learningTracks: LearningTrack[] = [
  {
    number: 1,
    name: 'Foundation',
    tagline: 'Build the base',
    weeks: 'Weeks 1–4',
    description: 'Establish your GenCreator identity, build your soul.md, learn the principles, and ship your first blueprint. By week 4, you have a daily creation habit and a functioning creative stack.',
    modules: [
      {
        title: 'Week 1: The GenCreator Identity',
        description: 'Define who you are as a creator. Read Principles 1-6. Start your soul.md draft across all 7 dimensions.',
        deliverable: 'Published soul.md v1 + first daily ship',
      },
      {
        title: 'Week 2: Your Creative Stack',
        description: 'Set up your tools: Claude, Suno (optional), n8n, Vercel or equivalent. Configure your first automation.',
        deliverable: 'Working creative stack + one automated workflow',
      },
      {
        title: 'Week 3: First Blueprint Execution',
        description: 'Choose your first blueprint (recommend: Blog-to-Social Atomizer). Execute it end to end.',
        deliverable: 'Completed blueprint with published output',
      },
      {
        title: 'Week 4: The Daily Practice',
        description: 'Establish your morning creation routine. Read Handbook Ch 6. Build a 7-day shipping streak.',
        deliverable: '7 consecutive daily ships + energy audit',
      },
    ],
    color: 'from-emerald-500 to-teal-500',
    icon: Compass,
  },
  {
    number: 2,
    name: 'Builder',
    tagline: 'Scale your output',
    weeks: 'Weeks 5–8',
    description: 'Go from creating to building systems. Complete the handbook, set up your automation layer, and launch your first digital product. By week 8, you have revenue potential.',
    modules: [
      {
        title: 'Week 5: Content as Currency',
        description: 'Master the content atomization framework. Build your blog-to-newsletter-to-social pipeline.',
        deliverable: 'Functioning content pipeline producing 5+ assets per week',
      },
      {
        title: 'Week 6: The Revenue Engine',
        description: 'Design your first digital product. Pricing, packaging, landing page, and email sequence.',
        deliverable: 'Product landing page live + email capture active',
      },
      {
        title: 'Week 7: System Architecture',
        description: 'Build the infrastructure that scales. Git workflows, automated deployment, monitoring.',
        deliverable: 'Automated publish-to-deploy pipeline',
      },
      {
        title: 'Week 8: First Launch',
        description: 'Execute the Digital Product Launch blueprint. Full sequence: pre-launch, launch, post-launch.',
        deliverable: 'Product launched + first revenue or validated interest',
      },
    ],
    color: 'from-cyan-500 to-blue-500',
    icon: Wrench,
  },
  {
    number: 3,
    name: 'Master',
    tagline: 'Build your empire',
    weeks: 'Weeks 9–12',
    description: 'Graduate from creator to operator. Build custom AI agents, lead community initiatives, and design systems that scale without you. By week 12, your GenCreator practice is self-sustaining.',
    modules: [
      {
        title: 'Week 9: Custom AI Agents',
        description: 'Design and deploy your own Claude Code agents using ACOS patterns. Automate your unique workflow.',
        deliverable: 'One custom agent solving a real workflow bottleneck',
      },
      {
        title: 'Week 10: Community & Network',
        description: 'Build your circle. Launch or join a peer review pod. Start building in public with accountability.',
        deliverable: 'Active in community + peer pod established',
      },
      {
        title: 'Week 11: The Flywheel',
        description: 'Connect all systems: content → products → community → content. Build the self-reinforcing loop.',
        deliverable: 'Documented flywheel with all connections active',
      },
      {
        title: 'Week 12: Legacy Architecture',
        description: 'Design for the long game. Template your best work. Document your systems. Build assets that compound.',
        deliverable: 'Published template/framework + 12-week retrospective',
      },
    ],
    color: 'from-purple-500 to-violet-500',
    icon: Telescope,
  },
]

// ── Toolkit ─────────────────────────────────────────────

import {
  BrainCircuit,
  Workflow,
  Globe as GlobeIcon,
  Paintbrush,
  AudioWaveform,
  LineChart,
  Terminal,
  Cpu,
  Wand2,
  Rss,
  PenLine,
  ImageIcon,
} from 'lucide-react'

export const toolkitItems: ToolkitItem[] = [
  {
    name: 'Claude Code',
    description: 'AI pair programmer. Writes code, manages repos, deploys to production. The core of the ACOS stack.',
    category: 'AI',
    icon: Terminal,
    tag: 'Essential',
  },
  {
    name: 'Claude (Anthropic)',
    description: 'Long-form writing, research, analysis, and creative ideation. The thinking partner in your stack.',
    category: 'AI',
    icon: BrainCircuit,
    tag: 'Essential',
  },
  {
    name: 'Gemini (Google)',
    description: 'Image generation, multimodal analysis, and visual content creation. Flash for speed, Pro for quality.',
    category: 'AI',
    icon: Wand2,
    tag: 'Essential',
  },
  {
    name: 'Suno',
    description: 'AI music generation. Full tracks from text prompts — vocals, instruments, mastering. Commercial license included.',
    category: 'Audio',
    icon: AudioWaveform,
    tag: 'Music Creators',
  },
  {
    name: 'n8n',
    description: 'Visual workflow automation. Self-hosted on Railway. Connects everything: APIs, webhooks, email, AI, databases.',
    category: 'Automation',
    icon: Workflow,
    tag: 'Essential',
  },
  {
    name: 'Next.js + Vercel',
    description: 'React framework + deployment platform. Build and ship production websites with zero-config deployment.',
    category: 'Publishing',
    icon: GlobeIcon,
    tag: 'Essential',
  },
  {
    name: 'Resend',
    description: 'Developer-first email API. Newsletters, transactional email, and drip sequences with beautiful templates.',
    category: 'Publishing',
    icon: Rss,
    tag: 'Growth',
  },
  {
    name: 'Figma',
    description: 'Design tool for UI/UX, social graphics, and brand assets. Integrates with Claude Code via MCP.',
    category: 'Design',
    icon: Paintbrush,
    tag: 'Visual Creators',
  },
  {
    name: 'Canva',
    description: 'Quick graphic design for social posts, thumbnails, and marketing materials. AI-assisted templates.',
    category: 'Design',
    icon: ImageIcon,
    tag: 'Beginners',
  },
  {
    name: 'GitHub',
    description: 'Version control and collaboration. Git-based content management, CI/CD pipelines, and project boards.',
    category: 'Publishing',
    icon: GitBranch,
    tag: 'Essential',
  },
  {
    name: 'Notion',
    description: 'Knowledge base, project management, and content planning. The organizational layer of your stack.',
    category: 'Analytics',
    icon: PenLine,
    tag: 'Organization',
  },
  {
    name: 'OpenRouter',
    description: 'Multi-model AI gateway. Access GPT-4, Claude, Gemini, Llama, and more through a single API endpoint.',
    category: 'AI',
    icon: Cpu,
    tag: 'Advanced',
  },
  {
    name: 'Search Console',
    description: 'Google Search performance data. Track rankings, impressions, clicks, and discover content opportunities.',
    category: 'Analytics',
    icon: LineChart,
    tag: 'SEO',
  },
]

export const toolkitCategories = ['All', 'AI', 'Automation', 'Publishing', 'Design', 'Audio', 'Analytics'] as const

// ── Product Suite ───────────────────────────────────────

import type { GenCreatorProduct } from './gencreator-types'
import {
  Sparkles as SparklesIcon,
  FileText as FileTextIcon,
  Music as MusicIcon,
  Image as ImageIcon2,
  Bot as BotIcon,
  Workflow as WorkflowIcon,
  Code2 as Code2Icon,
  Users as UsersIcon,
  GraduationCap as GradCapIcon,
  Crown,
  Wrench as WrenchIcon,
} from 'lucide-react'

export const productSuite: GenCreatorProduct[] = [
  // ── Foundation (Free) ──
  {
    id: 'gencreator-os',
    name: 'GenCreator OS',
    slug: 'gencreator',
    tagline: 'The operating system for generative creators',
    description: 'Principles, handbook, blueprints, soul.md — the complete framework. Fork it, make it yours.',
    price: 'Free',
    priceNote: 'Open source',
    tier: 'free',
    category: 'systems',
    icon: SparklesIcon,
    color: 'emerald',
    features: [
      '12 creator principles',
      '8-chapter handbook',
      '12 actionable blueprints',
      'soul.md identity template',
      '7-dimension self-assessment',
    ],
    cta: 'Explore Framework',
    ctaHref: '/gencreator',
  },
  {
    id: 'acos-open-source',
    name: 'Agentic Creator OS',
    slug: 'acos',
    tagline: '75+ skills, 38 agents, 35+ commands for Claude Code',
    description: 'The technical engine. Auto-activating skills, intelligent routing, self-learning trajectories.',
    price: 'Free',
    priceNote: 'MIT License',
    tier: 'free',
    category: 'systems',
    icon: BotIcon,
    color: 'purple',
    features: [
      '75+ auto-activating skills',
      '38 specialized agents',
      '35+ creator commands',
      'Smart intent router',
      'Self-learning trajectory system',
    ],
    cta: 'Clone from GitHub',
    ctaHref: 'https://github.com/frankxai/agentic-creator-os',
  },

  // ── Creator Tools ($27–$67) ──
  {
    id: 'toolkit-pro',
    name: 'Toolkit Pro',
    slug: 'toolkit-pro',
    tagline: '50+ premium templates, prompt packs, and workflow configs',
    description: 'Plug-and-play templates for Claude Code, Cursor, and n8n. Skip the setup, start creating.',
    price: '$47',
    priceNote: 'One-time',
    tier: 'starter',
    category: 'tools',
    icon: WrenchIcon,
    color: 'cyan',
    features: [
      '50+ prompt templates (Claude, GPT, Gemini)',
      '20+ n8n workflow imports',
      '15+ content templates (blog, social, newsletter)',
      'ACOS skill pack presets',
      'Quarterly template updates',
    ],
    cta: 'Get Toolkit Pro',
    ctaHref: '/newsletter?ref=toolkit-pro',
    badge: 'Best Value',
    comingSoon: true,
  },
  {
    id: 'content-engine',
    name: 'Content Engine',
    slug: 'content-engine',
    tagline: 'Full content pipeline — article to social to newsletter',
    description: 'Pre-built n8n workflows and prompt chains that turn one piece of content into 10+ assets.',
    price: '$67',
    priceNote: 'One-time',
    tier: 'starter',
    category: 'tools',
    icon: FileTextIcon,
    color: 'amber',
    features: [
      'Blog-to-social atomizer workflow (n8n)',
      'Newsletter generation pipeline',
      'SEO content audit templates',
      'Social post prompt library (X, LinkedIn, IG)',
      'Content calendar automation',
    ],
    cta: 'Get Content Engine',
    ctaHref: '/newsletter?ref=content-engine',
    comingSoon: true,
  },
  {
    id: 'music-lab',
    name: 'Music Lab',
    slug: 'music-lab',
    tagline: 'Suno prompt packs and release workflows',
    description: 'Genre-specific prompt templates, production techniques, and distribution workflows. From idea to track.',
    price: '$27',
    priceNote: 'One-time',
    tier: 'starter',
    category: 'tools',
    icon: MusicIcon,
    color: 'orange',
    features: [
      '100+ genre-specific Suno prompts',
      'Production technique guides (15 genres)',
      'Release workflow templates',
      'Cover art generation prompts',
      'Commercial licensing guide',
    ],
    cta: 'Get Music Lab',
    ctaHref: '/newsletter?ref=music-lab',
    comingSoon: true,
  },
  {
    id: 'visual-studio',
    name: 'Visual Studio',
    slug: 'visual-studio',
    tagline: 'Image generation prompts and brand kit templates',
    description: 'Prompt library for Gemini, Midjourney, and DALL-E. Brand kit templates and thumbnail systems.',
    price: '$37',
    priceNote: 'One-time',
    tier: 'starter',
    category: 'tools',
    icon: ImageIcon2,
    color: 'rose',
    features: [
      '80+ image generation prompts',
      'Brand kit template (colors, fonts, assets)',
      'Thumbnail system (YouTube, blog, social)',
      'Character consistency guides',
      'Style reference library',
    ],
    cta: 'Get Visual Studio',
    ctaHref: '/newsletter?ref=visual-studio',
    comingSoon: true,
  },

  // ── Builder Systems ($97–$197) ──
  {
    id: 'acos-pro',
    name: 'ACOS Pro System',
    slug: 'acos-pro',
    tagline: 'Full ACOS mastery with guides, templates, and support',
    description: 'Everything open-source plus video walkthroughs, premium templates, and direct support from the creator.',
    price: '$197',
    priceNote: 'One-time',
    tier: 'builder',
    category: 'systems',
    icon: BotIcon,
    color: 'violet',
    features: [
      'Everything in ACOS open source',
      'Deep-dive setup walkthrough (2hr)',
      'Premium template library (20+)',
      'Custom agent configuration guide',
      'Quarterly skill pack updates',
      '1:1 async support (30 days)',
    ],
    cta: 'Get ACOS Pro',
    ctaHref: '/newsletter?ref=acos-pro',
    badge: 'Most Popular',
  },
  {
    id: 'ship-kit',
    name: 'Ship Kit',
    slug: 'ship-kit',
    tagline: 'Launch your first digital product in a weekend',
    description: 'Landing page templates, email sequences, pricing frameworks, and payment setup. Everything to go from idea to revenue.',
    price: '$147',
    priceNote: 'One-time',
    tier: 'builder',
    category: 'systems',
    icon: RocketIcon,
    color: 'emerald',
    features: [
      '5 landing page templates (Next.js)',
      'Email launch sequence (7-day)',
      'Pricing strategy framework',
      'Lemon Squeezy / Gumroad setup guides',
      'Post-launch optimization playbook',
    ],
    cta: 'Get Ship Kit',
    ctaHref: '/newsletter?ref=ship-kit',
    comingSoon: true,
  },
  {
    id: 'automation-hub',
    name: 'Automation Hub',
    slug: 'automation-hub',
    tagline: '20+ pre-built n8n workflows ready to import',
    description: 'Webhook patterns, API integrations, and notification systems. Plug into your stack and automate everything.',
    price: '$97',
    priceNote: 'One-time',
    tier: 'builder',
    category: 'systems',
    icon: WorkflowIcon,
    color: 'teal',
    features: [
      '20+ n8n workflow JSON imports',
      'Webhook pattern library',
      'Slack/email notification templates',
      'API integration guides (10+ services)',
      'Error handling & retry patterns',
    ],
    cta: 'Get Automation Hub',
    ctaHref: '/newsletter?ref=automation-hub',
    comingSoon: true,
  },
  {
    id: 'dev-stack',
    name: 'Dev Stack',
    slug: 'dev-stack',
    tagline: 'Full website-in-a-box with Next.js and Vercel',
    description: 'Starter kit with SEO templates, analytics setup, and deployment configs. Ship a production site in hours.',
    price: '$197',
    priceNote: 'One-time',
    tier: 'builder',
    category: 'systems',
    icon: Code2Icon,
    color: 'blue',
    features: [
      'Next.js starter kit (App Router)',
      'Vercel deployment config',
      'SEO template library',
      'Analytics setup (GA4, Search Console)',
      'CI/CD pipeline templates',
    ],
    cta: 'Get Dev Stack',
    ctaHref: '/newsletter?ref=dev-stack',
    comingSoon: true,
  },

  // ── Team & Community ($47/mo–$497) ──
  {
    id: 'inner-circle',
    name: 'Inner Circle',
    slug: 'inner-circle',
    tagline: 'Private community for serious generative creators',
    description: 'Monthly office hours, shared templates, peer review, and accountability pods. Build together, ship together.',
    price: '$47',
    priceNote: '/month',
    tier: 'scale',
    category: 'community',
    icon: UsersIcon,
    color: 'cyan',
    features: [
      'Private Discord community',
      'Monthly office hours with Frank',
      'Shared template library (growing)',
      'Peer review pods (4-person teams)',
      'Weekly creator challenges',
      'Early access to all new products',
    ],
    cta: 'Join Inner Circle',
    ctaHref: '/newsletter?ref=inner-circle',
    comingSoon: true,
  },
  {
    id: 'cohort',
    name: 'GenCreator Cohort',
    slug: 'cohort',
    tagline: '8 weeks from tool user to system builder',
    description: 'Guided program with live sessions, async support, and shipping accountability. Graduate with a running creator operation.',
    price: '$497',
    priceNote: 'Per cohort',
    tier: 'scale',
    category: 'community',
    icon: GradCapIcon,
    color: 'violet',
    features: [
      '8 weekly live sessions (90 min)',
      'All products included (Toolkit, Content Engine, ACOS Pro)',
      'Daily async support in private channel',
      'Shipping accountability (weekly demos)',
      'GenCreator Mastery certificate',
      'Lifetime Inner Circle membership',
    ],
    cta: 'Apply for Next Cohort',
    ctaHref: '/newsletter?ref=cohort',
    badge: 'Next: Q2 2026',
    comingSoon: true,
  },

  // ── Enterprise ──
  {
    id: 'architect',
    name: 'GenCreator Architect',
    slug: 'architect',
    tagline: '1:1 system design for your creator operation',
    description: 'Custom ACOS configuration, workflow architecture, and agent tuning for your specific domain. White-glove setup.',
    price: '$1,497',
    priceNote: 'One-time',
    tier: 'scale',
    category: 'services',
    icon: Crown,
    color: 'amber',
    features: [
      'Custom ACOS agent configuration',
      'Workflow architecture design',
      'n8n automation build-out',
      'Content pipeline setup',
      '90-day async support',
      'All products included',
    ],
    cta: 'Apply',
    ctaHref: 'mailto:hello@frankx.ai?subject=GenCreator%20Architect',
  },
]

export const productSuiteTiers = [
  { id: 'free', label: 'Foundation', color: 'emerald', description: 'Open source. Fork it.' },
  { id: 'starter', label: 'Creator Tools', color: 'cyan', description: '$27–$67 one-time' },
  { id: 'builder', label: 'Builder Systems', color: 'violet', description: '$97–$197 one-time' },
  { id: 'scale', label: 'Team & Scale', color: 'amber', description: '$47/mo–$1,497' },
] as const
