import type { ResearchPage } from './types/research'

/**
 * Research content hub - Perplexity Pages, PDFs, and deep-dive research
 * Each entry represents hours of research distilled into actionable insights
 */

export const researchPages: ResearchPage[] = [
  // Starter examples - add your actual Perplexity Pages and research here
  {
    id: 'langgraph-production',
    title: 'LangGraph Production Deployment Patterns',
    description: 'Complete guide to deploying LangGraph agents in production environments with monitoring, scaling, and error handling',
    url: 'https://www.perplexity.ai/page/your-page-url', // Replace with actual URL
    type: 'perplexity',
    category: 'agentic-ai',
    tags: ['langgraph', 'production', 'deployment', 'monitoring'],
    dateAdded: '2025-01-13',
    researchHours: 12,
    summary: 'Deep dive into production-grade LangGraph deployments covering state management, persistent checkpointing, horizontal scaling with Redis, comprehensive error handling, and observability patterns. Includes real-world examples from enterprise implementations and performance benchmarking data.'
  },
  {
    id: 'suno-advanced-techniques',
    title: 'Advanced Suno AI Composition Techniques',
    description: 'Professional music production workflows with Suno v4/v4.5 including prompt engineering, genre blending, and iterative refinement',
    url: 'https://www.perplexity.ai/page/your-page-url', // Replace with actual URL
    type: 'perplexity',
    category: 'ai-music',
    tags: ['suno', 'music-production', 'prompts', 'composition'],
    dateAdded: '2025-01-13',
    researchHours: 20,
    summary: 'Comprehensive guide to Suno AI music production covering prompt structure, style transfer techniques, vocal direction, instrumental layering, and genre fusion. Based on analysis of 500+ songs and patterns that consistently produce professional-quality results.'
  },
  {
    id: 'mcp-architecture-guide',
    title: 'Model Context Protocol (MCP) Architecture Guide',
    description: 'Building standardized AI-to-data integrations with MCP servers, resources, tools, and security best practices',
    url: 'https://www.perplexity.ai/page/your-page-url', // Replace with actual URL
    type: 'perplexity',
    category: 'agentic-ai',
    tags: ['mcp', 'architecture', 'integration', 'standards'],
    dateAdded: '2025-01-13',
    researchHours: 15,
    summary: 'Complete architectural overview of Model Context Protocol covering server implementation patterns, resource management, tool design, security considerations, and real-world integration examples. Includes comparison with traditional API approaches and migration strategies.'
  }
]

export function getAllResearchPages(): ResearchPage[] {
  return researchPages.sort((a, b) =>
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )
}

export function getResearchPagesByCategory(category: string): ResearchPage[] {
  return researchPages
    .filter(page => page.category === category)
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
}

export function getResearchPageById(id: string): ResearchPage | undefined {
  return researchPages.find(page => page.id === id)
}

export function getTotalResearchHours(): number {
  return researchPages.reduce((total, page) => total + (page.researchHours || 0), 0)
}
