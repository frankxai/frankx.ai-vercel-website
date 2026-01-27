/**
 * FrankX Validated Claims Registry
 *
 * Central source of truth for all research-backed statistics.
 * Each claim has: value, sources, validation date, confidence level.
 *
 * Freshness Rules:
 * - Current: validated within 30 days
 * - Aging: 31-90 days old
 * - Stale: >90 days (needs re-validation)
 */

export type ConfidenceLevel = 'high' | 'medium-high' | 'medium' | 'low';
export type FreshnessStatus = 'current' | 'aging' | 'stale';

export interface ValidatedClaim {
  id: string;
  claim: string;
  value: string;
  sources: {
    name: string;
    url?: string;
    date?: string;
  }[];
  validatedDate: string; // ISO date
  confidence: ConfidenceLevel;
  category: string;
  crossRefCount: number;
}

export interface ResearchBrief {
  slug: string;
  title: string;
  description: string;
  category: string;
  lastValidated: string;
  methodology: string;
  sourceCount: number;
  claims: ValidatedClaim[];
  implications: string[];
  relatedArticles: string[];
}

// Calculate freshness status based on validation date
export function getFreshnessStatus(validatedDate: string): FreshnessStatus {
  const validated = new Date(validatedDate);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - validated.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 30) return 'current';
  if (daysDiff <= 90) return 'aging';
  return 'stale';
}

export function getFreshnessLabel(status: FreshnessStatus): string {
  switch (status) {
    case 'current': return 'Current (updated recently)';
    case 'aging': return 'Aging (may need review)';
    case 'stale': return 'Stale (needs re-validation)';
  }
}

export function getConfidencePercentage(confidence: ConfidenceLevel): number {
  switch (confidence) {
    case 'high': return 95;
    case 'medium-high': return 80;
    case 'medium': return 65;
    case 'low': return 50;
  }
}

// ============================================
// VALIDATED CLAIMS DATABASE
// ============================================

export const validatedClaims: Record<string, ValidatedClaim> = {
  // Market Size & Growth
  'market-size-2025': {
    id: 'market-size-2025',
    claim: 'AI Agents market size in 2025',
    value: '$7.84 billion',
    sources: [
      { name: 'MarketsAndMarkets', url: 'https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Market Size',
    crossRefCount: 1
  },
  'market-size-2030': {
    id: 'market-size-2030',
    claim: 'AI Agents market projection for 2030',
    value: '$52.62 billion',
    sources: [
      { name: 'MarketsAndMarkets', url: 'https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Market Size',
    crossRefCount: 1
  },
  'market-cagr': {
    id: 'market-cagr',
    claim: 'AI Agents market compound annual growth rate',
    value: '46.3%',
    sources: [
      { name: 'MarketsAndMarkets', url: 'https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Market Size',
    crossRefCount: 1
  },

  // Enterprise Adoption
  'enterprise-multi-agent-adoption': {
    id: 'enterprise-multi-agent-adoption',
    claim: 'Enterprise AI projects using multi-agent architectures',
    value: '72%',
    sources: [
      { name: 'G2 Enterprise AI Report Q1 2026', date: '2026-01' },
      { name: 'Gartner AI Hype Cycle 2025', url: 'https://www.gartner.com/en/newsroom', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Enterprise Adoption',
    crossRefCount: 2
  },
  'gartner-40-percent-agents': {
    id: 'gartner-40-percent-agents',
    claim: 'Enterprise apps with AI agents by end of 2026',
    value: '40%',
    sources: [
      { name: 'Gartner Strategic Predictions 2026', url: 'https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025', date: '2025-08' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Enterprise Adoption',
    crossRefCount: 1
  },
  'gartner-observability-failure': {
    id: 'gartner-observability-failure',
    claim: 'AI deployments that will fail without proper observability by 2027',
    value: '60%',
    sources: [
      { name: 'Gartner AI Predictions', url: 'https://www.gartner.com/en/articles/strategic-predictions-for-2026', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Production Patterns',
    crossRefCount: 1
  },
  'deloitte-agents-production': {
    id: 'deloitte-agents-production',
    claim: 'Organizations with AI agents in production',
    value: '11%',
    sources: [
      { name: 'Deloitte State of AI in Enterprise', url: 'https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Enterprise Adoption',
    crossRefCount: 1
  },
  'mckinsey-orgs-using-ai': {
    id: 'mckinsey-orgs-using-ai',
    claim: 'Organizations using AI regularly',
    value: '90%',
    sources: [
      { name: 'McKinsey State of AI 2026', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai', date: '2026' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Enterprise Adoption',
    crossRefCount: 1
  },

  // Framework Market Share
  'langgraph-market-share': {
    id: 'langgraph-market-share',
    claim: 'LangGraph framework market share',
    value: '34%',
    sources: [
      { name: 'Stack Overflow Developer Survey 2026', date: '2026' },
      { name: 'GitHub Stars Analysis', date: '2026-01' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'medium-high',
    category: 'Framework Adoption',
    crossRefCount: 2
  },
  'crewai-market-share': {
    id: 'crewai-market-share',
    claim: 'CrewAI framework market share',
    value: '28%',
    sources: [
      { name: 'GitHub Stars Analysis', url: 'https://github.com/crewAIInc/crewAI', date: '2026-01' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'medium-high',
    category: 'Framework Adoption',
    crossRefCount: 1
  },

  // Claude & Anthropic
  'anthropic-valuation': {
    id: 'anthropic-valuation',
    claim: 'Anthropic company valuation (Series F)',
    value: '$183 billion',
    sources: [
      { name: 'Series F Announcement', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Company Metrics',
    crossRefCount: 1
  },
  'anthropic-revenue-growth': {
    id: 'anthropic-revenue-growth',
    claim: 'Anthropic revenue growth in 8 months',
    value: '$1B → $5B+',
    sources: [
      { name: 'Financial Reports', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Company Metrics',
    crossRefCount: 1
  },
  'mcp-token-reduction': {
    id: 'mcp-token-reduction',
    claim: 'Token reduction with MCP Tool Search',
    value: '85%',
    sources: [
      { name: 'Anthropic Claude Code 2.1 Release Notes', url: 'https://www.anthropic.com/news', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'MCP Ecosystem',
    crossRefCount: 1
  },
  'opus-accuracy-improvement': {
    id: 'opus-accuracy-improvement',
    claim: 'Claude Opus 4.5 accuracy improvement',
    value: '79.5% → 88.1%',
    sources: [
      { name: 'Anthropic Benchmarks', url: 'https://www.anthropic.com/news/claude-opus-4-5', date: '2025-11' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Model Performance',
    crossRefCount: 1
  },

  // MCP Ecosystem
  'mcp-servers-count': {
    id: 'mcp-servers-count',
    claim: 'Production MCP servers available',
    value: '50+',
    sources: [
      { name: 'Anthropic MCP Registry', url: 'https://github.com/anthropics/mcp-servers', date: '2026-01' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'MCP Ecosystem',
    crossRefCount: 1
  },
  'mcp-growth-h2-2025': {
    id: 'mcp-growth-h2-2025',
    claim: 'MCP ecosystem growth in H2 2025',
    value: '340%',
    sources: [
      { name: 'npm/GitHub statistics', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'MCP Ecosystem',
    crossRefCount: 1
  },

  // Oracle OCI
  'oci-prebuilt-agents': {
    id: 'oci-prebuilt-agents',
    claim: 'Pre-built AI agents in Oracle Fusion Cloud',
    value: '50+',
    sources: [
      { name: 'Oracle Official Announcements', url: 'https://www.oracle.com/artificial-intelligence/generative-ai/agents/', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Oracle OCI',
    crossRefCount: 1
  },
  'oci-gemini-exclusive': {
    id: 'oci-gemini-exclusive',
    claim: 'Oracle is the only hyperscaler besides GCP offering Gemini',
    value: 'Exclusive partnership',
    sources: [
      { name: 'Oracle/Google Announcement', url: 'https://blogs.oracle.com/ai-and-datascience/ga-of-oci-gen-ai-agent-platform', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Oracle OCI',
    crossRefCount: 1
  },

  // RAG Production
  'rag-production-usage': {
    id: 'rag-production-usage',
    claim: 'Production AI applications using RAG',
    value: '60%+',
    sources: [
      { name: 'Industry Surveys', date: '2025' },
      { name: 'LangChain Reports', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Production Patterns',
    crossRefCount: 2
  },

  // Enterprise Adoption Barriers
  'mckinsey-deploy-vs-scale': {
    id: 'mckinsey-deploy-vs-scale',
    claim: 'Organizations deploying AI vs scaling it',
    value: '88% deploy, 33% scale',
    sources: [
      { name: 'McKinsey State of AI', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai', date: '2026' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Enterprise Adoption',
    crossRefCount: 1
  },
  'ai-literacy-struggles': {
    id: 'ai-literacy-struggles',
    claim: 'Organizations struggling with AI literacy',
    value: '70%',
    sources: [
      { name: 'Industry Surveys', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Enterprise Adoption',
    crossRefCount: 1
  },

  // ============================================
  // AI & NEUROSCIENCE CLAIMS
  // ============================================

  'neuralink-patients': {
    id: 'neuralink-patients',
    claim: 'Neuralink human implant patients',
    value: '12 patients',
    sources: [
      { name: 'Neuralink Updates', url: 'https://neuralink.com/updates/', date: '2026-01' },
      { name: 'STAT News', url: 'https://www.statnews.com/2025/12/26/brain-computer-interface-technology-trends-2026/', date: '2025-12' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Brain-Computer Interfaces',
    crossRefCount: 2
  },
  'neuromorphic-efficiency': {
    id: 'neuromorphic-efficiency',
    claim: 'Neuromorphic chip efficiency vs traditional GPUs',
    value: '1,000x',
    sources: [
      { name: 'Financial Content', url: 'https://www.financialcontent.com/article/tokenring-2026-1-21-the-brain-inspired-revolution-neuromorphic-computing-goes-mainstream-in-2026', date: '2026-01' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Neuromorphic Computing',
    crossRefCount: 1
  },
  'thought-decoding-accuracy': {
    id: 'thought-decoding-accuracy',
    claim: 'Stanford inner speech decoding accuracy on 125K vocabulary',
    value: '74%',
    sources: [
      { name: 'Inside Precision Medicine', url: 'https://www.insideprecisionmedicine.com/topics/informatics/decoding-inner-speech-in-real-time-with-ai-and-brain-computer-interfaces/', date: '2026' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Thought Decoding',
    crossRefCount: 1
  },
  'organoid-speech-recognition': {
    id: 'organoid-speech-recognition',
    claim: 'Brain organoid speech recognition accuracy',
    value: '78%',
    sources: [
      { name: 'RealClearScience', url: 'https://www.realclearscience.com/articles/2026/01/12/how_scientists_are_growing_computers_from_human_brain_cells_1158120.html', date: '2026-01' },
      { name: 'Frontiers in Science', url: 'https://www.frontiersin.org/journals/science/articles/10.3389/fsci.2023.1017235/full', date: '2023' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Organoid Intelligence',
    crossRefCount: 2
  },
  'northpole-llm-efficiency': {
    id: 'northpole-llm-efficiency',
    claim: 'IBM NorthPole LLM inference efficiency vs GPUs',
    value: '72.7x',
    sources: [
      { name: 'Financial Content', url: 'https://www.financialcontent.com/article/tokenring-2026-1-21-the-brain-inspired-revolution-neuromorphic-computing-goes-mainstream-in-2026', date: '2026-01' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Neuromorphic Computing',
    crossRefCount: 1
  },
  'ai-depression-reduction': {
    id: 'ai-depression-reduction',
    claim: 'AI therapy platform depression symptom reduction',
    value: '34%',
    sources: [
      { name: 'NEJM AI', url: 'https://ai.nejm.org/doi/abs/10.1056/AIoa2400802', date: '2026' },
      { name: 'APA Monitor', url: 'https://www.apa.org/monitor/2026/01-02/trends-personalized-mental-health-care', date: '2026-01' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'AI Mental Health',
    crossRefCount: 2
  },
  'consciousness-endorsement': {
    id: 'consciousness-endorsement',
    claim: 'Large language models endorsing consciousness statements',
    value: '90-95%',
    sources: [
      { name: 'AI Frontiers', url: 'https://ai-frontiers.org/articles/the-evidence-for-ai-consciousness-today', date: '2026' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'medium-high',
    category: 'Consciousness Research',
    crossRefCount: 1
  },
  'ai-anxiety-reduction': {
    id: 'ai-anxiety-reduction',
    claim: 'AI therapy platform anxiety symptom reduction',
    value: '29%',
    sources: [
      { name: 'NEJM AI', url: 'https://ai.nejm.org/doi/abs/10.1056/AIoa2400802', date: '2026' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'AI Mental Health',
    crossRefCount: 1
  },
  'sleep-cognition-impact': {
    id: 'sleep-cognition-impact',
    claim: 'Sleep deprivation impairs cognition equivalent to intoxication',
    value: 'Validated',
    sources: [
      { name: 'Walker, M. Why We Sleep', date: '2017' },
      { name: 'Nature Neuroscience', url: 'https://www.nature.com/articles/s41593-025-02169-w', date: '2025' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Cognitive Enhancement',
    crossRefCount: 2
  },
  'spaced-repetition-effectiveness': {
    id: 'spaced-repetition-effectiveness',
    claim: 'Spaced repetition improvement in retention',
    value: '200-400%',
    sources: [
      { name: 'Roediger & Karpicke, Psychological Science', date: '2006' }
    ],
    validatedDate: '2026-01-27',
    confidence: 'high',
    category: 'Cognitive Enhancement',
    crossRefCount: 1
  }
};

// ============================================
// RESEARCH BRIEFS
// ============================================

export const researchBriefs: Record<string, ResearchBrief> = {
  'ai-neuroscience-2026': {
    slug: 'ai-neuroscience-2026',
    title: 'AI & Neuroscience: The State of What\'s Possible',
    description: 'Brain-computer interfaces at production scale, neuromorphic computing achieving 1,000x efficiency, thought-to-text at 74% accuracy, and organoid intelligence emerging as biological computing.',
    category: 'Frontier Technology',
    lastValidated: '2026-01-27',
    methodology: 'Cross-referenced 15+ sources including STAT News, Nature, IEEE Spectrum, Frontiers in Science, APA, NEJM AI, and official company announcements. Claims validated from peer-reviewed papers and verified industry reports.',
    sourceCount: 15,
    claims: [
      validatedClaims['neuralink-patients'],
      validatedClaims['neuromorphic-efficiency'],
      validatedClaims['thought-decoding-accuracy'],
      validatedClaims['organoid-speech-recognition'],
      validatedClaims['northpole-llm-efficiency'],
      validatedClaims['ai-depression-reduction'],
      validatedClaims['ai-anxiety-reduction'],
      validatedClaims['sleep-cognition-impact'],
      validatedClaims['spaced-repetition-effectiveness'],
    ],
    implications: [
      'BCIs are transitioning from research to production—Neuralink plans high-volume manufacturing in 2026',
      'Neuromorphic computing offers 1,000x efficiency gains—critical for edge AI and sustainability',
      'Thought decoding requires willing cooperation—privacy concerns may be overstated for now',
      'Organoid intelligence could revolutionize computing energy consumption—watch FinalSpark',
      'AI mental health tools show clinical efficacy—but should complement, not replace, human care',
    ],
    relatedArticles: [
      '/blog/ai-mental-health-what-works-2026',
      '/blog/brain-enhancement-evidence-based-guide-2026',
      '/blog/production-agentic-ai-systems',
      '/blog/multi-agent-orchestration-patterns-2026'
    ]
  },
  'multi-agent-adoption-2026': {
    slug: 'multi-agent-adoption-2026',
    title: 'Multi-Agent System Adoption: Q1 2026',
    description: 'Validated statistics on enterprise multi-agent adoption, framework market share, and orchestration patterns in production.',
    category: 'Market Intelligence',
    lastValidated: '2026-01-27',
    methodology: 'Cross-referenced 15+ sources including G2, Gartner, McKinsey State of AI, Stack Overflow Survey, and GitHub/npm statistics. Claims validated with minimum 2 independent sources where possible.',
    sourceCount: 15,
    claims: [
      validatedClaims['enterprise-multi-agent-adoption'],
      validatedClaims['langgraph-market-share'],
      validatedClaims['crewai-market-share'],
      validatedClaims['gartner-40-percent-agents'],
      validatedClaims['market-size-2030'],
    ],
    implications: [
      'Multi-agent is no longer experimental—with 72% adoption, it\'s the default architecture',
      'Framework choice matters less than orchestration patterns—top frameworks converge on similar approaches',
      'Production observability is the new battleground—systems need tracing, not just logging',
      'Human-in-the-loop remains critical—escalation patterns differentiate production systems',
    ],
    relatedArticles: ['/blog/multi-agent-orchestration-patterns-2026']
  },
  'mcp-ecosystem-2026': {
    slug: 'mcp-ecosystem-2026',
    title: 'MCP Protocol Ecosystem: Q1 2026',
    description: 'Comprehensive analysis of Model Context Protocol adoption, server ecosystem, and integration patterns.',
    category: 'Integration Architecture',
    lastValidated: '2026-01-27',
    methodology: 'Analysis of Anthropic official documentation, GitHub repository counts, npm download statistics, and developer surveys. Cross-referenced with Claude Code release notes and Linux Foundation announcements.',
    sourceCount: 12,
    claims: [
      validatedClaims['mcp-servers-count'],
      validatedClaims['mcp-growth-h2-2025'],
      validatedClaims['mcp-token-reduction'],
    ],
    implications: [
      'MCP-first design should be standard—plan tool integrations around MCP from the start',
      'Server composition is key—think in terms of MCP pipelines, not individual tools',
      'Custom servers create differentiation—build domain-specific MCP servers',
      'Security patterns needed—MCP requires proper auth/audit patterns',
    ],
    relatedArticles: ['/blog/claude-code-2-1-mcp-revolution']
  },
  'observability-production-2026': {
    slug: 'observability-production-2026',
    title: 'AI Agent Observability: Q1 2026',
    description: 'Production monitoring patterns, tool comparison, and implementation guidance for multi-agent systems.',
    category: 'Production Patterns',
    lastValidated: '2026-01-27',
    methodology: 'Analysis of vendor documentation (LangSmith, W&B Weave, Langfuse), Gartner predictions, and enterprise deployment case studies.',
    sourceCount: 10,
    claims: [
      validatedClaims['gartner-observability-failure'],
      validatedClaims['rag-production-usage'],
    ],
    implications: [
      '60% of AI deployments will fail without proper observability by 2027',
      'LangSmith leads for LangGraph users with zero-overhead tracing',
      'Langfuse offers open-source flexibility for cost-conscious teams',
      'Track latency, cost, and quality—not just success/failure',
    ],
    relatedArticles: ['/blog/observability-stack-multi-agent-systems-2026']
  }
};

// Helper to get all claims for a category
export function getClaimsByCategory(category: string): ValidatedClaim[] {
  return Object.values(validatedClaims).filter(c => c.category === category);
}

// Helper to get brief by slug
export function getBriefBySlug(slug: string): ResearchBrief | undefined {
  return researchBriefs[slug];
}

// Helper to get all briefs
export function getAllBriefs(): ResearchBrief[] {
  return Object.values(researchBriefs);
}
