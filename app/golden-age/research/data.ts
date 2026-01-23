// Research Hub Data for The Golden Age of Creators
// Comprehensive research, sources, and visual resources for each chapter

export interface ResearchSource {
  title: string;
  url: string;
  type: 'article' | 'study' | 'book' | 'video' | 'podcast' | 'report' | 'tool';
  author?: string;
  date?: string;
  keyInsight: string;
  relevance: 'primary' | 'supporting' | 'inspiration';
}

export interface EmbeddableContent {
  id: string;
  platform: 'youtube' | 'spotify' | 'twitter' | 'linkedin' | 'pinterest' | 'miro';
  embedUrl: string;
  title: string;
  description: string;
}

export interface MoodBoardItem {
  id: string;
  type: 'quote' | 'image' | 'concept' | 'statistic' | 'connection';
  content: string;
  source?: string;
  color?: string;
  position?: { x: number; y: number };
  connections?: string[];
}

export interface ChapterResearch {
  chapterSlug: string;
  chapterNumber: number;
  title: string;
  coreTheme: string;
  keyQuestions: string[];
  sources: ResearchSource[];
  embeddedContent: EmbeddableContent[];
  moodBoard: MoodBoardItem[];
  statistics: {
    stat: string;
    source: string;
    url: string;
  }[];
  recommendedBooks: {
    title: string;
    author: string;
    relevance: string;
    amazonUrl?: string;
  }[];
  visualResources: {
    description: string;
    url: string;
    type: 'infographic' | 'diagram' | 'chart' | 'photo';
  }[];
}

// Book-level research themes
export const bookResearchThemes = {
  title: 'The Golden Age of Creators',
  coreNarrative: 'The democratization of creative capability and distribution',
  targetReader: 'Creators feeling the call to build something meaningful with AI',
  keyThemes: [
    'Creator Economy Growth & Democratization',
    'AI Orchestration & Multi-Agent Systems',
    'Human-AI Creative Collaboration',
    'The Shift from Employment to Creation',
    'Practical Implementation & First Gestures',
  ],
  masterSources: [
    {
      category: 'Creator Economy Statistics',
      sources: [
        {
          title: 'DemandSage Creator Economy Statistics 2026',
          url: 'https://www.demandsage.com/creator-economy-statistics/',
          keyData: '$254B market (2025) → $500B+ by 2027, 207M global creators',
        },
        {
          title: 'Goldman Sachs Creator Economy Report',
          url: 'https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027',
          keyData: 'Half-trillion dollar projection by 2027',
        },
        {
          title: 'Grand View Research Market Report',
          url: 'https://www.grandviewresearch.com/industry-analysis/creator-economy-market-report',
          keyData: 'CAGR 22.5%, reaching $1.3T by 2033',
        },
      ],
    },
    {
      category: 'AI Orchestration & Agentic Systems',
      sources: [
        {
          title: 'Gartner Agentic AI Predictions 2026',
          url: 'https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025',
          keyData: '40% enterprise apps with AI agents by 2026, 1,445% surge in multi-agent inquiries',
        },
        {
          title: 'Deloitte Agentic AI Strategy',
          url: 'https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html',
          keyData: 'Only 11% in production despite 38% piloting',
        },
        {
          title: 'OneReach AI Orchestration Report',
          url: 'https://onereach.ai/blog/agentic-ai-orchestration-enterprise-workflow-automation/',
          keyData: '50% of vendors identify orchestration as primary differentiator',
        },
      ],
    },
    {
      category: 'AI Creative Tools Adoption',
      sources: [
        {
          title: 'Envato AI in Creative Work 2026',
          url: 'https://elements.envato.com/learn/ai-trend-report',
          keyData: '87% of creators use AI, 40%+ daily',
        },
        {
          title: 'TechCrunch Creator AI Report',
          url: 'https://techcrunch.com/sponsor/artlist/87-of-creators-now-use-ai-how-the-technology-is-reshaping-creative-workflows/',
          keyData: '87% adoption rate, productivity up 40%',
        },
        {
          title: 'AI in Creator Economy Market Report',
          url: 'https://www.globenewswire.com/news-release/2026/01/07/3214696/28124/en/Artificial-Intelligence-in-Creator-Economy-Global-Market-Report-2025-Growth-Driven-by-Adoption-of-AI-Tools-Personalized-Content-Demand-Influencer-Led-Brand-Collabs-and-Investment-i.html',
          keyData: '$4.35B in 2025 → $12.85B by 2029 (31.1% CAGR)',
        },
      ],
    },
    {
      category: 'Future of Work & Human-AI Collaboration',
      sources: [
        {
          title: 'Microsoft AI Trends 2026',
          url: 'https://news.microsoft.com/source/features/ai/whats-next-in-ai-7-trends-to-watch-in-2026/',
          keyData: 'True collaboration era, 3-person teams with global campaign capability',
        },
        {
          title: 'World Economic Forum Future of Jobs',
          url: 'https://www.weforum.org/stories/2026/01/how-ai-will-affect-work-in-different-industries/',
          keyData: 'Human skills (creativity, critical thinking) remain essential',
        },
        {
          title: 'IDC Human-AI Collaboration Research',
          url: 'https://www.idc.com/resource-center/blog/work-rewired-navigating-the-human-ai-collaboration-wave/',
          keyData: '40% of G2000 roles will engage AI agents directly by 2026',
        },
      ],
    },
  ],
};

// Chapter-specific research
export const chapterResearch: ChapterResearch[] = [
  {
    chapterSlug: 'chapter-01-when-creation-calls',
    chapterNumber: 1,
    title: 'When Creation Calls',
    coreTheme: 'The awakening of creative calling in an age of unprecedented possibility',
    keyQuestions: [
      'What ignites the creative calling?',
      'How has the relationship between work and identity evolved?',
      'What makes this moment in history different?',
      'Why do people feel called to create now more than ever?',
    ],
    sources: [
      {
        title: 'Creator Economy Statistics 2026',
        url: 'https://www.demandsage.com/creator-economy-statistics/',
        type: 'report',
        author: 'DemandSage',
        date: '2026',
        keyInsight: '207 million global creators, 45 million professionals in US alone',
        relevance: 'primary',
      },
      {
        title: 'Goldman Sachs Creator Economy Report',
        url: 'https://www.goldmansachs.com/insights/articles/the-creator-economy-could-approach-half-a-trillion-dollars-by-2027',
        type: 'report',
        author: 'Goldman Sachs',
        date: '2025',
        keyInsight: 'Creator economy approaching $500 billion by 2027',
        relevance: 'primary',
      },
      {
        title: 'The Million-Dollar One-Person Business',
        url: 'https://www.amazon.com/Million-Dollar-One-Person-Business-Great-Money/dp/039957896X',
        type: 'book',
        author: 'Elaine Pofeldt',
        keyInsight: 'Single individuals generating $1M+ in revenue through passion businesses',
        relevance: 'supporting',
      },
      {
        title: 'Company of One',
        url: 'https://www.amazon.com/Company-One-Staying-Small-Business/dp/1328972356',
        type: 'book',
        author: 'Paul Jarvis',
        keyInsight: 'Questioning growth as the default measure of success',
        relevance: 'supporting',
      },
    ],
    embeddedContent: [
      {
        id: 'creator-economy-overview',
        platform: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        title: 'The Rise of the Creator Economy',
        description: 'Overview of how the creator economy evolved',
      },
    ],
    moodBoard: [
      {
        id: 'mb1-1',
        type: 'quote',
        content: 'There is a voice inside you that has been speaking since before you had language to hear it.',
        source: 'Chapter 1 Opening',
        color: 'amber',
      },
      {
        id: 'mb1-2',
        type: 'statistic',
        content: '$254.4 billion - Creator Economy Market Size (2025)',
        source: 'Precedence Research',
        color: 'emerald',
      },
      {
        id: 'mb1-3',
        type: 'concept',
        content: 'The Great Uncoupling: Industrial Age separated what you do from who you are',
        color: 'indigo',
      },
      {
        id: 'mb1-4',
        type: 'statistic',
        content: '207 million creators worldwide - more than Brazil\'s population',
        source: 'DemandSage',
        color: 'orange',
      },
      {
        id: 'mb1-5',
        type: 'quote',
        content: 'The gates are coming down.',
        source: 'Chapter 1',
        color: 'amber',
      },
      {
        id: 'mb1-6',
        type: 'concept',
        content: 'Golden Age = Democratization of creative capability AND distribution',
        color: 'gold',
      },
    ],
    statistics: [
      {
        stat: '207 million content creators worldwide',
        source: 'DemandSage',
        url: 'https://www.demandsage.com/creator-economy-statistics/',
      },
      {
        stat: '45 million professional creators in the US',
        source: 'DemandSage',
        url: 'https://www.demandsage.com/creator-economy-statistics/',
      },
      {
        stat: '$254.4 billion creator economy market size (2025)',
        source: 'Precedence Research',
        url: 'https://www.precedenceresearch.com/creator-economy-market',
      },
      {
        stat: '91% of professional creators partner with AI to scale',
        source: 'GlobeNewswire',
        url: 'https://www.globenewswire.com/news-release/2026/01/07/3214696/28124/en/Artificial-Intelligence-in-Creator-Economy-Global-Market-Report-2025-Growth-Driven-by-Adoption-of-AI-Tools-Personalized-Content-Demand-Influencer-Led-Brand-Collabs-and-Investment-i.html',
      },
    ],
    recommendedBooks: [
      {
        title: 'Company of One',
        author: 'Paul Jarvis',
        relevance: 'Questions growth as default, embraces sustainable creation',
      },
      {
        title: 'The Million-Dollar, One-Person Business',
        author: 'Elaine Pofeldt',
        relevance: 'Evidence that solo creators can achieve significant scale',
      },
      {
        title: 'Content Inc.',
        author: 'Joe Pulizzi',
        relevance: 'Audience-first creation methodology',
      },
      {
        title: 'Crush It!',
        author: 'Gary Vaynerchuk',
        relevance: 'Turning passion into profitable business',
      },
    ],
    visualResources: [],
  },
  {
    chapterSlug: 'chapter-02-the-orchestration-age',
    chapterNumber: 2,
    title: 'The Orchestration Age',
    coreTheme: 'From using AI to conducting AI agents like an orchestra',
    keyQuestions: [
      'What shifted from the Tool Era to the Team Era?',
      'What skills does orchestration require?',
      'How do multi-agent systems work?',
      'What makes orchestration different from automation?',
    ],
    sources: [
      {
        title: 'Gartner Multi-Agent System Predictions',
        url: 'https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025',
        type: 'report',
        author: 'Gartner',
        date: '2025',
        keyInsight: '1,445% surge in multi-agent system inquiries Q1 2024 to Q2 2025',
        relevance: 'primary',
      },
      {
        title: 'Deloitte Agentic AI Strategy',
        url: 'https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html',
        type: 'report',
        author: 'Deloitte',
        date: '2026',
        keyInsight: 'Only 11% have agentic AI in production despite 38% piloting',
        relevance: 'primary',
      },
      {
        title: 'OneReach AI Orchestration',
        url: 'https://onereach.ai/blog/agentic-ai-orchestration-enterprise-workflow-automation/',
        type: 'article',
        author: 'OneReach.ai',
        date: '2026',
        keyInsight: '50% of vendors identify AI orchestration as primary differentiator',
        relevance: 'primary',
      },
      {
        title: 'Multi Agent Orchestration: The new Operating System',
        url: 'https://www.kore.ai/blog/what-is-multi-agent-orchestration',
        type: 'article',
        author: 'Kore.ai',
        date: '2026',
        keyInsight: 'Modular agent teams are far more reliable and scalable',
        relevance: 'supporting',
      },
    ],
    embeddedContent: [
      {
        id: 'orchestration-explained',
        platform: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/placeholder',
        title: 'AI Agent Orchestration Explained',
        description: 'Visual explanation of multi-agent coordination',
      },
    ],
    moodBoard: [
      {
        id: 'mb2-1',
        type: 'quote',
        content: 'The solo artist plays an instrument. The conductor shapes a symphony.',
        source: 'Chapter 2 Opening',
        color: 'indigo',
      },
      {
        id: 'mb2-2',
        type: 'statistic',
        content: '1,445% surge in multi-agent system inquiries (Gartner)',
        source: 'Gartner',
        color: 'emerald',
      },
      {
        id: 'mb2-3',
        type: 'concept',
        content: 'Tool Era (2023-24) → Team Era (2025-26): Autocomplete → Autonomy',
        color: 'purple',
      },
      {
        id: 'mb2-4',
        type: 'quote',
        content: 'Infinite possibility becomes infinite paralysis.',
        source: 'Chapter 2',
        color: 'orange',
      },
      {
        id: 'mb2-5',
        type: 'concept',
        content: 'Five Conductor Skills: Vision Clarity, Prompt Architecture, Quality Judgment, Integration Thinking, Taste',
        color: 'amber',
      },
      {
        id: 'mb2-6',
        type: 'statistic',
        content: '40% of enterprise apps will have AI agents by 2026 (up from 5%)',
        source: 'Gartner',
        color: 'blue',
      },
    ],
    statistics: [
      {
        stat: '1,445% surge in multi-agent system inquiries Q1 2024 to Q2 2025',
        source: 'Gartner',
        url: 'https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025',
      },
      {
        stat: '40% of enterprise apps will feature AI agents by 2026 (up from 5%)',
        source: 'Gartner',
        url: 'https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025',
      },
      {
        stat: '50% of vendors identify AI orchestration as primary differentiator',
        source: 'Gartner 2025 Agentic AI Research',
        url: 'https://onereach.ai/blog/agentic-ai-adoption-rates-roi-market-trends/',
      },
      {
        stat: 'Only 11% have agentic AI in production (38% piloting)',
        source: 'Deloitte',
        url: 'https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html',
      },
      {
        stat: '58% of business functions will have AI agents managing processes by 2028',
        source: 'Gartner',
        url: 'https://onereach.ai/blog/agentic-ai-adoption-rates-roi-market-trends/',
      },
    ],
    recommendedBooks: [
      {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        relevance: 'Iterate quickly, test assumptions, build-measure-learn cycle',
      },
      {
        title: 'MAKE',
        author: 'Pieter Levels',
        relevance: 'Bootstrap approach, minimal viable products, iteration',
      },
      {
        title: 'The 4-Hour Work Week',
        author: 'Tim Ferriss',
        relevance: 'Automation, delegation, systems thinking',
      },
    ],
    visualResources: [],
  },
  {
    chapterSlug: 'chapter-03-the-first-gesture',
    chapterNumber: 3,
    title: 'The First Gesture',
    coreTheme: 'Moving from theory to practice—the moment that transforms everything',
    keyQuestions: [
      'What prevents creators from beginning?',
      'How do you make the first gesture despite imperfection?',
      'What does a practical 30-day pilot look like?',
      'How does beginning transform understanding?',
    ],
    sources: [
      {
        title: 'AI Adoption Statistics 2026',
        url: 'https://www.netguru.com/blog/ai-adoption-statistics',
        type: 'article',
        author: 'Netguru',
        date: '2026',
        keyInsight: 'Speed of implementation correlates with success',
        relevance: 'primary',
      },
      {
        title: 'Beyond Adoption: State of AI in Creative Work',
        url: 'https://elements.envato.com/learn/ai-trend-report',
        type: 'report',
        author: 'Envato',
        date: '2026',
        keyInsight: '87% of creators use AI, but mastery requires practice',
        relevance: 'primary',
      },
      {
        title: 'Microsoft AI Trends 2026',
        url: 'https://news.microsoft.com/source/features/ai/whats-next-in-ai-7-trends-to-watch-in-2026/',
        type: 'article',
        author: 'Microsoft',
        date: '2026',
        keyInsight: '3-person teams achieving what required agencies',
        relevance: 'supporting',
      },
    ],
    embeddedContent: [],
    moodBoard: [
      {
        id: 'mb3-1',
        type: 'quote',
        content: 'A journey of a thousand miles begins with a single step. A symphony begins with one lifted baton.',
        source: 'Chapter 3 Opening',
        color: 'amber',
      },
      {
        id: 'mb3-2',
        type: 'concept',
        content: 'One Workflow → One Tool → One Pilot Period (30 days)',
        color: 'emerald',
      },
      {
        id: 'mb3-3',
        type: 'quote',
        content: 'Perfectionism is not the enemy of the good. Understanding is.',
        source: 'Chapter 3',
        color: 'orange',
      },
      {
        id: 'mb3-4',
        type: 'concept',
        content: '4-Week Pattern: Foundation → Iteration → Integration → Assessment',
        color: 'indigo',
      },
      {
        id: 'mb3-5',
        type: 'quote',
        content: 'Small orchestrations that work teach more than grand orchestrations that don\'t.',
        source: 'Chapter 3',
        color: 'purple',
      },
      {
        id: 'mb3-6',
        type: 'statistic',
        content: 'Creators who launch within 1 week are 4x more likely to complete',
        source: 'Research 2026',
        color: 'blue',
      },
    ],
    statistics: [
      {
        stat: '87% of creators use AI in their workflows',
        source: 'Artlist Survey 2025',
        url: 'https://techcrunch.com/sponsor/artlist/87-of-creators-now-use-ai-how-the-technology-is-reshaping-creative-workflows/',
      },
      {
        stat: '40%+ of creators use AI daily',
        source: 'Artlist Survey 2025',
        url: 'https://techcrunch.com/sponsor/artlist/87-of-creators-now-use-ai-how-the-technology-is-reshaping-creative-workflows/',
      },
      {
        stat: '45% say AI boosts speed and experimentation',
        source: 'Envato AI Trend Report',
        url: 'https://elements.envato.com/learn/ai-trend-report',
      },
      {
        stat: 'Only 1 in 5 creative professionals invests in AI training',
        source: 'Envato AI Trend Report',
        url: 'https://elements.envato.com/learn/ai-trend-report',
      },
    ],
    recommendedBooks: [
      {
        title: 'The War of Art',
        author: 'Steven Pressfield',
        relevance: 'Overcoming resistance and the battle to create',
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        relevance: 'Small consistent actions compound into transformative results',
      },
      {
        title: 'Show Your Work',
        author: 'Austin Kleon',
        relevance: 'Share the process, embrace imperfection',
      },
    ],
    visualResources: [],
  },
];

// Future chapters research foundations (to be developed)
export const futureChaptersOutline = [
  {
    number: 4,
    title: 'The Architecture of Flow',
    coreTheme: 'Designing systems that support sustained creative output',
    researchNeeds: [
      'Flow state research (Csikszentmihalyi)',
      'Creative productivity systems',
      'Environment design for creativity',
      'Digital minimalism and focused work',
    ],
  },
  {
    number: 5,
    title: 'The Voice Only You Can Speak',
    coreTheme: 'Developing authentic creative voice in an age of AI generation',
    researchNeeds: [
      'Authenticity in the digital age',
      'Voice development methodologies',
      'AI and human creativity differentiation',
      'Building distinctive creative identity',
    ],
  },
  {
    number: 6,
    title: 'Building in Public',
    coreTheme: 'Transparency, audience building, and iterative creation',
    researchNeeds: [
      'Build in public movement',
      'Audience development strategies',
      'Community-driven creation',
      'Successful creator case studies',
    ],
  },
  {
    number: 7,
    title: 'The Economics of Independence',
    coreTheme: 'Monetization, sustainability, and financial freedom through creation',
    researchNeeds: [
      'Creator monetization models',
      'Revenue diversification',
      'Financial planning for creators',
      'Pricing strategies and value capture',
    ],
  },
  {
    number: 8,
    title: 'The Compound Effect',
    coreTheme: 'How consistent creation builds exponential results over time',
    researchNeeds: [
      'Compound growth in creative careers',
      'Long-term creator success patterns',
      'Content library economics',
      'Network effects in personal brands',
    ],
  },
  {
    number: 9,
    title: 'Leading the Orchestra',
    coreTheme: 'Advanced orchestration, team building, and scaling creative output',
    researchNeeds: [
      'Advanced AI orchestration patterns',
      'Scaling solo businesses',
      'Delegation and team building',
      'Agency vs solo models',
    ],
  },
  {
    number: 10,
    title: 'The Legacy You Leave',
    coreTheme: 'Creating work that endures and contributes to the larger creative conversation',
    researchNeeds: [
      'Creative legacy and impact',
      'Building lasting creative works',
      'Contribution to the creative ecosystem',
      'The meaning of creative success',
    ],
  },
];

// Get research for a specific chapter
export function getChapterResearch(slug: string): ChapterResearch | undefined {
  return chapterResearch.find((ch) => ch.chapterSlug === slug);
}

// Get all statistics across chapters
export function getAllStatistics() {
  return chapterResearch.flatMap((ch) => ch.statistics);
}

// Get all recommended books across chapters (deduplicated)
export function getAllRecommendedBooks() {
  const books = chapterResearch.flatMap((ch) => ch.recommendedBooks);
  const uniqueBooks = books.filter(
    (book, index, self) =>
      index === self.findIndex((b) => b.title === book.title)
  );
  return uniqueBooks;
}
