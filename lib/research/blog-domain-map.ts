/**
 * Maps blog article slugs to related research domain slugs.
 * Used by RelatedResearch component to auto-generate cross-links.
 * Add new entries when publishing articles that relate to research domains.
 */
export const blogDomainMap: Record<string, string[]> = {
  'agentic-creator-os-complete-guide': ['multi-agent-systems', 'production-patterns'],
  'agentic-creator-os': ['multi-agent-systems', 'production-patterns', 'prompt-engineering'],
  'agentic-workflows-save-hours': ['production-patterns', 'ai-personal-productivity'],
  'creator-intelligence-systems-2026': ['ai-personal-productivity', 'creator-economy-ai'],
  'getting-started-agentic-creator-os': ['production-patterns', 'coding-assistants'],
  'golden-age-of-intelligence': ['enterprise-ai', 'multi-agent-systems'],
  'production-agentic-ai-systems': ['enterprise-ai', 'production-patterns'],
  'production-llm-agents-oci-part-1-architecture': ['enterprise-ai', 'production-patterns'],
  'production-llm-agents-oci-part-2-agent-patterns': ['multi-agent-systems', 'production-patterns'],
  'production-llm-agents-oci-part-3-operating-model': ['enterprise-ai', 'production-patterns'],
  'claude-code-2-1-mcp-revolution': ['mcp-ecosystem', 'coding-assistants'],
  'claude-opus-4-6-analysis-2026': ['generative-ai', 'coding-assistants'],
  'multi-agent-orchestration-patterns-2026': ['multi-agent-systems', 'production-patterns'],
  'observability-stack-multi-agent-systems-2026': ['multi-agent-systems', 'production-patterns'],
  'oracle-genai-agents-vs-langgraph-crewai-2026': ['enterprise-ai', 'multi-agent-systems'],
  'ultimate-guide-ai-coding-agents-2026': ['coding-assistants', 'mcp-ecosystem'],
  'prompt-engineering-mastery-workshop': ['prompt-engineering', 'ai-personal-productivity'],
  'building-research-intelligence-system': ['production-patterns', 'multi-agent-systems'],
  'agentic-ai-roadmap-2026': ['enterprise-ai', 'multi-agent-systems'],
  'what-is-agentic-ai': ['multi-agent-systems', 'production-patterns'],
  'mcp-server-architecture-workshop': ['mcp-ecosystem', 'production-patterns'],
  'mcp-server-integration-guide': ['mcp-ecosystem', 'coding-assistants'],
  'enterprise-agent-roadmap': ['enterprise-ai', 'multi-agent-systems'],
  'agentic-seo-publishing-masterplan': ['production-patterns', 'creator-economy-ai'],
  'acos-enterprise-deployment-guide': ['enterprise-ai', 'production-patterns'],
  'ai-guide-for-families-and-professionals': ['ai-adoption'],
  'intelligence-revolution-2025': ['enterprise-ai', 'ai-adoption'],
  'nvidia-ces-2026-physical-ai-revolution': ['generative-ai'],
  'agentic-ai-roadmap-2025': ['enterprise-ai', 'multi-agent-systems'],
  'production-agent-patterns-7-pillars': ['enterprise-ai', 'production-patterns'],
  'swarm-intelligence-multi-agent-orchestration': ['multi-agent-systems', 'production-patterns'],
  'build-your-own-jarvis-claude-code': ['coding-assistants', 'ai-personal-productivity'],
  'seo-aeo-optimization-acos': ['production-patterns', 'creator-economy-ai'],
  'ai-coe-launch': ['enterprise-ai', 'production-patterns'],
  'agi-2026-opportunities-students-creators': ['generative-ai', 'ai-adoption'],
  'production-agent-patterns-aws-bedrock': ['enterprise-ai', 'production-patterns'],
  'suno-music-production-workflow': ['ai-creative-tools', 'creator-economy-ai'],
  'suno-prompt-engineering-complete-guide': ['prompt-engineering', 'ai-creative-tools'],
  'building-custom-skills-acos': ['coding-assistants', 'production-patterns'],
  'agent-feed-privacy-first-ai-transparency': ['enterprise-ai', 'ai-security'],
}

export function getRelatedDomainsForBlog(slug: string): string[] {
  return blogDomainMap[slug] || []
}
